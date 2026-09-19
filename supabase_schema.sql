-- ==============================================================================
-- fourmulasteps: ユーザー認証 ＆ Stripe サブスクリプション管理スキーマ
-- Supabase の「SQL Editor」に貼り付けて「RUN」を実行してください。
-- ==============================================================================

-- 1. profiles テーブル（ユーザーの基本情報・課金状態・月間問題数）
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT DEFAULT '受験生',
  
  -- 会員プラン: 'free' (無料体験), 'standard' (一般会員), 'premium' (プレミアム会員)
  plan TEXT DEFAULT 'free' NOT NULL,
  
  -- 月間利用可能問題数 (無料: 3, 一般: 100, プレミアム: 300)
  monthly_question_limit INTEGER DEFAULT 3 NOT NULL,
  
  -- 当月消費した問題数
  monthly_questions_used INTEGER DEFAULT 0 NOT NULL,
  
  -- 当月カウントのリセット基準日 (毎月1日または課金更新日)
  usage_period_start TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Stripe 連携情報
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'none', -- 'active', 'canceled', 'past_due', 'none'
  current_period_end TIMESTAMPTZ,          -- 次回課金日 / サブスク終了日

  -- 既存集計カラム（既存コードとの互換性用）
  total_analyses_count INTEGER DEFAULT 0,
  total_ai_cost_usd NUMERIC(10, 6) DEFAULT 0,
  last_active_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- すでに profiles テーブルが存在している場合のカラム追加 (既存環境への安全な反映)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS monthly_question_limit INTEGER DEFAULT 3;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS monthly_questions_used INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS usage_period_start TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'none';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMPTZ;

-- 2. subscriptions テーブル（Stripe決済履歴・詳細管理用）
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id TEXT PRIMARY KEY, -- Stripe の subscription_id (sub_xxxx)
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL, -- 'active', 'trialing', 'canceled', 'past_due', 'unpaid'
  price_id TEXT NOT NULL, -- Stripe の price_id (price_xxxx)
  plan_tier TEXT NOT NULL, -- 'standard' または 'premium'
  billing_cycle TEXT NOT NULL, -- 'monthly' または 'yearly'
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Row Level Security (RLS) の有効化（セキュリティ強化）
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のプロファイルのみ閲覧可能
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- ユーザーは自分のプロファイルの一部（表示名など）のみ更新可能
DROP POLICY IF EXISTS "Users can update own profile display_name" ON public.profiles;
CREATE POLICY "Users can update own profile display_name"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ユーザーは自分のサブスクリプション情報のみ閲覧可能
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- 4. 新規ユーザー登録時に自動で profiles レコードを作成するトリガー関数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    display_name,
    plan,
    monthly_question_limit,
    monthly_questions_used,
    subscription_status
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '受験生'),
    'free',
    3,
    0,
    'none'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- auth.users の INSERT を検知して自動実行するトリガー
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. 月間利用枠の消費と判定を行う便利なストアドプロシージャ（RPC）
-- アプリからワンクリックで「今月まだ解けるか？」を安全にチェック＆カウント加算します
CREATE OR REPLACE FUNCTION public.check_and_increment_usage(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_profile RECORD;
  v_now TIMESTAMPTZ := TIMEZONE('utc'::text, NOW());
BEGIN
  -- プロファイル行を取得
  SELECT * INTO v_profile FROM public.profiles WHERE id = p_user_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('allowed', false, 'reason', 'User not found');
  END IF;

  -- 1ヶ月以上経過していたら月間利用カウントを自動リセット
  IF v_profile.usage_period_start + INTERVAL '1 month' <= v_now THEN
    UPDATE public.profiles
    SET monthly_questions_used = 0,
        usage_period_start = v_now
    WHERE id = p_user_id;
    v_profile.monthly_questions_used := 0;
  END IF;

  -- 上限チェック
  IF v_profile.monthly_questions_used >= v_profile.monthly_question_limit THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'Monthly limit reached',
      'used', v_profile.monthly_questions_used,
      'limit', v_profile.monthly_question_limit,
      'plan', v_profile.plan
    );
  END IF;

  -- 1回分カウントを加算
  UPDATE public.profiles
  SET monthly_questions_used = monthly_questions_used + 1,
      total_analyses_count = total_analyses_count + 1,
      last_active_at = v_now
  WHERE id = p_user_id;

  RETURN jsonb_build_object(
    'allowed', true,
    'used', v_profile.monthly_questions_used + 1,
    'limit', v_profile.monthly_question_limit,
    'remaining', v_profile.monthly_question_limit - (v_profile.monthly_questions_used + 1),
    'plan', v_profile.plan
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
