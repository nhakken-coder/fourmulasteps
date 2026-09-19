import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Supabase クライアント（サーバーサイド更新用）
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ilhboivwtlalfxqbowsh.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 価格IDからプラン種別と問題上限を特定
const PRICE_MAP = {
  'price_1UFZQqFLbsxTsQET013NZkH7': { tier: 'standard', cycle: 'monthly', limit: 100 },
  'price_1UFZRJFLbsxTsQETs8qGgzrw': { tier: 'standard', cycle: 'yearly', limit: 100 },
  'price_1UFZRKFLbsxTsQETf6jvqx17': { tier: 'premium', cycle: 'monthly', limit: 300 },
  'price_1UFZRLFLbsxTsQETpuR20bQ9': { tier: 'premium', cycle: 'yearly', limit: 300 }
};

// Vercel Serverless Function で Raw Body を受け取るための設定
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper: Raw body の取得
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let event;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const rawBody = await getRawBody(req);

    if (webhookSecret) {
      const signature = req.headers['stripe-signature'];
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      // 開発・テスト時のフォールバック
      event = JSON.parse(rawBody.toString('utf8'));
    }
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Stripe Webhook Received: ${event.type}`);

  try {
    switch (event.type) {
      // 1. 決済完了時（初回サブスクリプション契約）
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.client_reference_id || session.metadata?.userId;
        const priceId = session.metadata?.priceId;

        if (!userId) {
          console.warn('checkout.session.completed: No userId found in session');
          break;
        }

        const planInfo = PRICE_MAP[priceId] || { tier: 'standard', limit: 100 };

        // サブスクリプション詳細の取得
        let currentPeriodEnd = null;
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();

          // subscriptions テーブルに詳細を保存
          await supabase.from('subscriptions').upsert({
            id: subscription.id,
            user_id: userId,
            status: subscription.status,
            price_id: priceId || subscription.items.data[0]?.price.id,
            plan_tier: planInfo.tier,
            billing_cycle: planInfo.cycle || 'monthly',
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString()
          });
        }

        // profiles テーブルを更新してプラン適用
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            plan: planInfo.tier,
            monthly_question_limit: planInfo.limit,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            subscription_status: 'active',
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);

        if (profileError) {
          console.error('Failed to update profile:', profileError);
        } else {
          console.log(`Successfully upgraded user ${userId} to ${planInfo.tier}`);
        }
        break;
      }

      // 2. サブスクリプション更新時（定期決済成功、プラン変更など）
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const priceId = subscription.items.data[0]?.price.id;
        const planInfo = PRICE_MAP[priceId] || { tier: 'standard', limit: 100 };
        const currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();

        // 顧客IDから該当ユーザーを検索
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', subscription.customer)
          .maybeSingle();

        if (userProfile) {
          await supabase
            .from('profiles')
            .update({
              plan: subscription.status === 'active' ? planInfo.tier : 'free',
              monthly_question_limit: subscription.status === 'active' ? planInfo.limit : 3,
              subscription_status: subscription.status,
              current_period_end: currentPeriodEnd,
              updated_at: new Date().toISOString()
            })
            .eq('id', userProfile.id);
        }
        break;
      }

      // 3. サブスクリプション解約時（契約満了による停止）
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;

        const { data: userProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', subscription.customer)
          .maybeSingle();

        if (userProfile) {
          await supabase
            .from('profiles')
            .update({
              plan: 'free',
              monthly_question_limit: 3,
              subscription_status: 'canceled',
              updated_at: new Date().toISOString()
            })
            .eq('id', userProfile.id);

          console.log(`User ${userProfile.id} downgraded to free due to subscription cancellation.`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: error.message });
  }
}
