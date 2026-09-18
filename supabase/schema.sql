-- ====================================================================
-- fourmulasteps Supabase データベーススキーマ定義
-- ユーザー情報・弱点克服分析・AI使用履歴およびコスト追跡
-- ====================================================================

-- 1. profiles テーブル（ユーザー属性、利用指標、弱点集計、累計AIコスト）
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    display_name text default '受験生',
    total_problems_analyzed integer not null default 0,
    total_steps_practiced integer not null default 0,
    step1_stuck_count integer not null default 0,
    step2_stuck_count integer not null default 0,
    step3_stuck_count integer not null default 0,
    step4_stuck_count integer not null default 0,
    total_tokens_used integer not null default 0,
    total_ai_cost_usd numeric(12, 6) not null default 0.000000,
    last_active_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. problems テーブル（問題データ）
create table if not exists public.problems (
    id bigint primary key,
    user_id uuid references auth.users(id) on delete cascade,
    title text not null default 'AI解析問題',
    university text default '大学入試',
    difficulty text default '標準',
    goal text default '',
    question text not null,
    image_url text,
    steps jsonb not null default '[]'::jsonb,
    formulas jsonb not null default '[]'::jsonb,
    alternative_solution text default '',
    similar_problems jsonb not null default '[]'::jsonb,
    is_public boolean not null default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. user_step_logs テーブル（思考手順1〜4の達成度ログ）
create table if not exists public.user_step_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    problem_id bigint not null,
    step_number int not null check (step_number between 1 and 4),
    status text not null check (status in ('ok', 'stuck')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint user_step_logs_unique unique (user_id, problem_id, step_number)
);

-- 4. ai_usage_logs テーブル（AI利用履歴・トークン消費・推定コスト明細）
create table if not exists public.ai_usage_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    problem_id bigint,
    model text not null default 'gemini-2.5-flash',
    input_type text not null check (input_type in ('image', 'text')),
    prompt_tokens integer not null default 0,
    candidates_tokens integer not null default 0,
    total_tokens integer not null default 0,
    estimated_cost_usd numeric(12, 6) not null default 0.000000,
    latency_ms integer not null default 0,
    status text not null default 'success',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. user_weakness_logs テーブル（単元・公式ごとの弱点克服記録）
create table if not exists public.user_weakness_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    problem_id bigint,
    category text default '数学全般',
    formula_name text,
    stuck_step integer check (stuck_step between 1 and 4),
    is_resolved boolean not null default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- インデックス作成
create index if not exists idx_problems_user_id on public.problems(user_id);
create index if not exists idx_user_step_logs_user_id on public.user_step_logs(user_id);
create index if not exists idx_user_step_logs_problem_id on public.user_step_logs(problem_id);
create index if not exists idx_ai_usage_logs_user_id on public.ai_usage_logs(user_id);
create index if not exists idx_user_weakness_logs_user_id on public.user_weakness_logs(user_id);

-- RLS（Row Level Security）有効化
alter table public.profiles enable row level security;
alter table public.problems enable row level security;
alter table public.user_step_logs enable row level security;
alter table public.ai_usage_logs enable row level security;
alter table public.user_weakness_logs enable row level security;

-- profiles ポリシー
create policy "ユーザーは自身のプロファイルを閲覧可能"
    on public.profiles for select
    using (auth.uid() = id);

create policy "ユーザーは自身のプロファイルを更新可能"
    on public.profiles for update
    using (auth.uid() = id);

create policy "ユーザーは自身のプロファイルを登録可能"
    on public.profiles for insert
    with check (auth.uid() = id);

-- problems ポリシー
create policy "公開問題または自身の問題を閲覧可能"
    on public.problems for select
    using (is_public = true or auth.uid() = user_id);

create policy "ユーザーは自身の問題を登録可能"
    on public.problems for insert
    with check (auth.uid() = user_id);

create policy "ユーザーは自身の問題を更新可能"
    on public.problems for update
    using (auth.uid() = user_id);

create policy "ユーザーは自身の問題を削除可能"
    on public.problems for delete
    using (auth.uid() = user_id);

-- user_step_logs ポリシー
create policy "ユーザーは自身のステップログを管理可能"
    on public.user_step_logs for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ai_usage_logs ポリシー
create policy "ユーザーは自身のAI使用履歴を管理可能"
    on public.ai_usage_logs for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- user_weakness_logs ポリシー
create policy "ユーザーは自身の弱点記録を管理可能"
    on public.user_weakness_logs for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- 6. Storage バケット（problem-images）
insert into storage.buckets (id, name, public)
values ('problem-images', 'problem-images', true)
on conflict (id) do nothing;

create policy "誰でも画像を閲覧可能"
    on storage.objects for select
    using (bucket_id = 'problem-images');

create policy "認証ユーザーは画像をアップロード可能"
    on storage.objects for insert
    with check (bucket_id = 'problem-images' and auth.role() = 'authenticated');
