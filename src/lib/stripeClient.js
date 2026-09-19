import { STRIPE_PRICES } from '../config/stripe';

/**
 * Stripe Checkout 決済画面へリダイレクト
 * @param {Object} options
 * @param {'standard' | 'premium'} options.tier - 会員プラン
 * @param {'monthly' | 'yearly'} options.cycle - 支払い周期
 * @param {string} [options.userId] - Supabase ユーザーID
 * @param {string} [options.userEmail] - ユーザーのメールアドレス
 */
export async function redirectToCheckout({ tier, cycle, userId, userEmail }) {
  try {
    const priceId = STRIPE_PRICES[tier]?.[cycle];
    if (!priceId) {
      throw new Error(`Invalid tier or billing cycle: ${tier}, ${cycle}`);
    }

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId: userId || null,
        userEmail: userEmail || null,
        returnUrl: window.location.origin
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    if (data.url) {
      // Stripe Checkout の公式決済ページへ遷移
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL returned from server.');
    }
  } catch (err) {
    console.error('redirectToCheckout failed:', err);
    alert(`決済画面の読み込みに失敗しました: ${err.message}`);
  }
}

/**
 * Stripe カスタマーポータル（解約・カード変更画面）へ遷移
 * @param {string} customerId - Stripe の顧客ID (cus_xxxx)
 */
export async function redirectToCustomerPortal(customerId) {
  try {
    const response = await fetch('/api/customer-portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        returnUrl: window.location.origin
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No portal URL returned');
    }
  } catch (err) {
    console.error('redirectToCustomerPortal failed:', err);
    alert(`ポータル画面の読み込みに失敗しました: ${err.message}`);
  }
}
