import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Gemini 2.5 Flash の推定コスト算出 (USD)
 * 入力: $0.075 / 100万トークン
 * 出力: $0.300 / 100万トークン
 */
export function calculateGeminiCost(promptTokens = 0, candidatesTokens = 0) {
  const promptCost = (promptTokens / 1_000_000) * 0.075;
  const outputCost = (candidatesTokens / 1_000_000) * 0.30;
  return Number((promptCost + outputCost).toFixed(6));
}

/**
 * USDから日本円（1ドル = 155円換算想定）へ変換
 */
export function usdToJpy(usd = 0) {
  return Number((usd * 155).toFixed(4));
}

/**
 * 現在のログインユーザーを取得（セッションのみ確認、匿名自動ログインは行わない）
 */
export async function getCurrentUser() {
  if (!supabase) return null;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
  } catch (err) {
    console.warn('getCurrentUser error:', err);
    return null;
  }
}

/**
 * メールアドレスとパスワードで新規会員登録（無料体験）
 */
export async function signUpWithEmail(email, password, displayName = '受験生') {
  if (!supabase) throw new Error('Supabaseが設定されていません');

  const origin = typeof window !== 'undefined' && window.location.origin 
    ? window.location.origin 
    : 'https://fourmulasteps-app.vercel.app';

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: displayName
      },
      emailRedirectTo: `${origin}/#app`
    }
  });

  if (error) throw error;
  if (data?.user) {
    await ensureProfile(data.user, displayName);
  }
  return data;
}

/**
 * メールアドレスとパスワードでログイン
 */
export async function signInWithEmail(email, password) {
  if (!supabase) throw new Error('Supabaseが設定されていません');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  if (data?.user) {
    await ensureProfile(data.user);
  }
  return data;
}

/**
 * ログアウト
 */
export async function signOutUser() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) console.warn('signOut error:', error.message);
}

/**
 * ユーザーセッションを取得、未認証の場合は匿名ログインを実行
 */
export async function getOrCreateUser() {
  if (!supabase) return null;

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await ensureProfile(session.user);
      return session.user;
    }

    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.warn('Supabase anonymous sign-in failed:', error.message);
      return null;
    }
    if (data?.user) {
      await ensureProfile(data.user);
    }
    return data?.user || null;
  } catch (err) {
    console.warn('Supabase auth error:', err);
    return null;
  }
}

/**
 * プロファイル行が存在することを確認し、なければ新規作成
 */
async function ensureProfile(user, displayName = '受験生') {
  if (!supabase || !user) return;
  try {
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (!data) {
      await supabase.from('profiles').insert({
        id: user.id,
        email: user.email || 'guest@fourmulasteps.app',
        display_name: displayName || user.user_metadata?.full_name || '受験生',
        last_active_at: new Date().toISOString()
      });
    }
  } catch (err) {
    console.warn('ensureProfile error:', err);
  }
}

/**
 * ユーザープロファイル（利用回数・弱点克服・累計コスト等）を取得
 */
export async function fetchUserProfile() {
  if (!supabase) return null;
  try {
    const user = await getOrCreateUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.warn('fetchUserProfile error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('fetchUserProfile exception:', err);
    return null;
  }
}

/**
 * AI使用履歴およびトークン消費・コストを記録
 */
export async function recordAiUsageLog({
  problemId = null,
  model = 'gemini-3.6-flash',
  inputType = 'text',
  promptTokens = 0,
  candidatesTokens = 0,
  latencyMs = 0,
  status = 'success'
}) {
  const totalTokens = promptTokens + candidatesTokens;
  const estimatedCostUsd = calculateGeminiCost(promptTokens, candidatesTokens);

  // ローカルストレージにもバックアップ記録（Supabase未設定時も確認可能にする）
  try {
    const localHistory = JSON.parse(localStorage.getItem('fourmulasteps_ai_history') || '[]');
    localHistory.unshift({
      id: Date.now(),
      model,
      inputType,
      promptTokens,
      candidatesTokens,
      totalTokens,
      estimatedCostUsd,
      latencyMs,
      status,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('fourmulasteps_ai_history', JSON.stringify(localHistory.slice(0, 50)));
  } catch {}

  if (!supabase) return { totalTokens, estimatedCostUsd };

  try {
    const user = await getOrCreateUser();
    if (!user) return { totalTokens, estimatedCostUsd };

    // 1. ai_usage_logs に明細をインサート
    await supabase.from('ai_usage_logs').insert({
      user_id: user.id,
      problem_id: problemId,
      model,
      input_type: inputType,
      prompt_tokens: promptTokens,
      candidates_tokens: candidatesTokens,
      total_tokens: totalTokens,
      estimated_cost_usd: estimatedCostUsd,
      latency_ms: latencyMs,
      status
    });

    // 2. profiles の集計値を更新
    const { data: prof } = await supabase
      .from('profiles')
      .select('total_problems_analyzed, total_tokens_used, total_ai_cost_usd')
      .eq('id', user.id)
      .single();

    if (prof) {
      await supabase.from('profiles').update({
        total_problems_analyzed: (prof.total_problems_analyzed || 0) + 1,
        total_tokens_used: (prof.total_tokens_used || 0) + totalTokens,
        total_ai_cost_usd: Number(((prof.total_ai_cost_usd || 0) + estimatedCostUsd).toFixed(6)),
        last_active_at: new Date().toISOString()
      }).eq('id', user.id);
    }

    return { totalTokens, estimatedCostUsd };
  } catch (err) {
    console.warn('recordAiUsageLog error:', err);
    return { totalTokens, estimatedCostUsd };
  }
}

/**
 * 弱点克服のためのログ（つまずき情報）を記録
 */
export async function recordWeaknessLog({
  problemId,
  stepNumber,
  status,
  category = '数学全般',
  formulaName = null
}) {
  if (!supabase) return;
  try {
    const user = await getOrCreateUser();
    if (!user) return;

    if (status === 'stuck') {
      await supabase.from('user_weakness_logs').insert({
        user_id: user.id,
        problem_id: problemId,
        category,
        formula_name: formulaName,
        stuck_step: stepNumber,
        is_resolved: false
      });

      // profiles の各手順 stuck カウントを更新
      const stepKey = `step${stepNumber}_stuck_count`;
      const { data: prof } = await supabase
        .from('profiles')
        .select(`total_steps_practiced, ${stepKey}`)
        .eq('id', user.id)
        .single();

      if (prof) {
        await supabase.from('profiles').update({
          total_steps_practiced: (prof.total_steps_practiced || 0) + 1,
          [stepKey]: (prof[stepKey] || 0) + 1,
          last_active_at: new Date().toISOString()
        }).eq('id', user.id);
      }
    } else if (status === 'ok') {
      // 解決済みとしてマーク
      await supabase
        .from('user_weakness_logs')
        .update({ is_resolved: true })
        .match({ user_id: user.id, problem_id: problemId, stuck_step: stepNumber });

      const { data: prof } = await supabase
        .from('profiles')
        .select('total_steps_practiced')
        .eq('id', user.id)
        .single();

      if (prof) {
        await supabase.from('profiles').update({
          total_steps_practiced: (prof.total_steps_practiced || 0) + 1,
          last_active_at: new Date().toISOString()
        }).eq('id', user.id);
      }
    }
  } catch (err) {
    console.warn('recordWeaknessLog error:', err);
  }
}

/**
 * 最近のAI使用履歴を取得
 */
export async function fetchAiUsageHistory() {
  if (!supabase) {
    try {
      return JSON.parse(localStorage.getItem('fourmulasteps_ai_history') || '[]');
    } catch {
      return [];
    }
  }
  try {
    const user = await getOrCreateUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('ai_usage_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) {
      console.warn('fetchAiUsageHistory error:', error.message);
      return [];
    }
    return (data || []).map(row => ({
      id: row.id,
      model: row.model,
      inputType: row.input_type,
      promptTokens: row.prompt_tokens,
      candidatesTokens: row.candidates_tokens,
      totalTokens: row.total_tokens,
      estimatedCostUsd: row.estimated_cost_usd,
      latencyMs: row.latency_ms,
      status: row.status,
      createdAt: row.created_at
    }));
  } catch (err) {
    console.warn('fetchAiUsageHistory error:', err);
    return [];
  }
}

/**
 * 問題を Supabase に保存
 */
export async function saveProblemToSupabase(problem) {
  if (!supabase) return null;
  try {
    const user = await getOrCreateUser();
    if (!user) return null;

    const payload = {
      id: problem.id,
      user_id: user.id,
      title: problem.title,
      university: problem.university || '大学入試',
      difficulty: problem.difficulty || '標準',
      goal: problem.goal || '',
      question: problem.question,
      image_url: problem.imageUrl || null,
      steps: problem.steps || [],
      formulas: problem.formulas || [],
      alternative_solution: problem.alternativeSolution || '',
      similar_problems: problem.similarProblems || [],
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('problems')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Failed to save problem to Supabase:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('saveProblemToSupabase error:', err);
    return null;
  }
}

/**
 * Supabase からユーザーの問題一覧を取得
 */
export async function fetchProblemsFromSupabase() {
  if (!supabase) return [];
  try {
    const user = await getOrCreateUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch problems from Supabase:', error.message);
      return [];
    }

    return (data || []).map(row => ({
      id: row.id,
      title: row.title,
      university: row.university,
      difficulty: row.difficulty,
      goal: row.goal,
      question: row.question,
      imageUrl: row.image_url,
      steps: row.steps,
      formulas: row.formulas,
      alternativeSolution: row.alternative_solution,
      similarProblems: row.similar_problems
    }));
  } catch (err) {
    console.error('fetchProblemsFromSupabase error:', err);
    return [];
  }
}

/**
 * ステップ達成状況ログを保存
 */
export async function saveStepLogToSupabase(problemId, stepNumber, status) {
  if (!supabase) return null;
  try {
    const user = await getOrCreateUser();
    if (!user) return null;

    const { error } = await supabase
      .from('user_step_logs')
      .upsert({
        user_id: user.id,
        problem_id: problemId,
        step_number: stepNumber,
        status,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,problem_id,step_number' });

    if (error) {
      console.error('Failed to save step log to Supabase:', error.message);
    }
  } catch (err) {
    console.error('saveStepLogToSupabase error:', err);
  }
}

/**
 * ステップログ一覧を取得
 */
export async function fetchStepLogsFromSupabase() {
  if (!supabase) return {};
  try {
    const user = await getOrCreateUser();
    if (!user) return {};

    const { data, error } = await supabase
      .from('user_step_logs')
      .select('*');

    if (error) {
      console.error('Failed to fetch step logs:', error.message);
      return {};
    }

    const logs = {};
    (data || []).forEach(row => {
      if (!logs[row.problem_id]) logs[row.problem_id] = {};
      logs[row.problem_id][row.step_number] = row.status;
    });
    return logs;
  } catch (err) {
    console.error('fetchStepLogsFromSupabase error:', err);
    return {};
  }
}

/**
 * 問題画像を Supabase Storage にアップロード
 */
export async function uploadProblemImageToSupabase(fileOrBlob, fileName) {
  if (!supabase) return null;
  try {
    const user = await getOrCreateUser();
    if (!user) return null;

    const path = `${user.id}/${Date.now()}_${fileName || 'problem.jpg'}`;
    const { data, error } = await supabase.storage
      .from('problem-images')
      .upload(path, fileOrBlob, {
        contentType: fileOrBlob.type || 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error('Image upload failed:', error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('problem-images')
      .getPublicUrl(data.path);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error('uploadProblemImageToSupabase error:', err);
    return null;
  }
}
