import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  ShieldCheck, 
  Crown, 
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { signUpWithEmail, signInWithEmail } from '../lib/supabase';
import { redirectToCheckout } from '../lib/stripeClient';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  initialMode = 'register',
  selectedPlan = null, // { tier: 'standard' | 'premium', cycle: 'monthly' | 'yearly' } or string 'standard' | 'premium'
  targetPlan = null,   // 互換性のため
  currentUser = null
}) {
  const [mode, setMode] = useState(initialMode); // 'register' | 'login' | 'checkout'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 選択中プランの状態
  const initialTier = (typeof selectedPlan === 'string' ? selectedPlan : selectedPlan?.tier) || 
                      (typeof targetPlan === 'string' ? targetPlan : targetPlan?.tier) || 
                      'premium';
  const initialCycle = (typeof selectedPlan === 'object' && selectedPlan?.cycle) || 'monthly';

  const [chosenTier, setChosenTier] = useState(initialTier);
  const [chosenCycle, setChosenCycle] = useState(initialCycle);
  const [parentalConsent, setParentalConsent] = useState(false);

  // initialMode または selectedPlan が変わったら同期
  useEffect(() => {
    const tier = (typeof selectedPlan === 'string' ? selectedPlan : selectedPlan?.tier) || 
                 (typeof targetPlan === 'string' ? targetPlan : targetPlan?.tier);
    if (tier) {
      setChosenTier(tier);
      setMode('checkout');
    } else {
      setMode(initialMode);
    }
    setErrorMsg('');
  }, [initialMode, selectedPlan, targetPlan, isOpen]);

  if (!isOpen) return null;

  const isPremium = chosenTier === 'premium';
  const isYearly = chosenCycle === 'yearly';

  const planName = isPremium ? 'プレミアム会員' : '一般会員';
  const planPriceText = isPremium 
    ? (isYearly ? '¥9,800 / 年（実質 約817円/月・2ヶ月無料）' : '¥980 / 月')
    : (isYearly ? '¥4,800 / 年（実質 400円/月・2ヶ月無料）' : '¥480 / 月');

  // 直接Stripe決済へ進む処理（ログイン済みユーザーまたはアカウント作成直後）
  const proceedToStripe = async (userEmail, userId) => {
    setLoading(true);
    try {
      await redirectToCheckout({
        tier: chosenTier,
        cycle: chosenCycle,
        userEmail: userEmail || currentUser?.email,
        userId: userId || currentUser?.id
      });
    } catch (err) {
      setErrorMsg(err.message || '決済画面の起動に失敗しました');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // ログイン済みユーザーがcheckoutモードで進む場合
    if (mode === 'checkout' && currentUser) {
      await proceedToStripe(currentUser.email, currentUser.id);
      return;
    }

    if (!email || !password) {
      setErrorMsg('メールアドレスとパスワードを入力してください');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('パスワードは6文字以上で設定してください');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'checkout') {
        // 未ログイン時の有料プラン登録
        let authUser = null;
        try {
          const signUpRes = await signUpWithEmail(email, password, displayName || '受験生');
          authUser = signUpRes?.user;
        } catch (signErr) {
          const msg = signErr.message || '';
          if (msg.includes('already registered') || msg.includes('User already registered')) {
            const signInRes = await signInWithEmail(email, password);
            authUser = signInRes?.user;
          } else {
            throw signErr;
          }
        }

        if (authUser) {
          if (onSuccess) onSuccess(authUser, { tier: chosenTier, cycle: chosenCycle });
          await proceedToStripe(authUser.email, authUser.id);
        }
      } else if (mode === 'register') {
        const result = await signUpWithEmail(email, password, displayName || '受験生');
        if (result?.user) {
          if (onSuccess) onSuccess(result.user, null);
          onClose();
        }
      } else {
        const result = await signInWithEmail(email, password);
        if (result?.user) {
          if (onSuccess) onSuccess(result.user, { tier: chosenTier, cycle: chosenCycle });
          onClose();
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      let msg = err.message || '認証エラーが発生しました';
      if (msg.includes('already registered') || msg.includes('User already registered')) {
        msg = 'このメールアドレスは既に登録されています。「ログイン」タブをお試しいただくか、正しいパスワードを入力してください。';
      } else if (msg.includes('Email not confirmed')) {
        msg = 'メールアドレスの確認が完了していません。確認リンクを開くか、正しい情報でログインしてください。';
      } else if (msg.includes('Invalid login credentials')) {
        msg = 'メールアドレスまたはパスワードが正しくありません。';
      } else if (msg.includes('Password should be at least')) {
        msg = 'パスワードは6文字以上で入力してください。';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white border border-[#DDD6CA] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition cursor-pointer z-10"
          aria-label="閉じる"
        >
          <X className="w-5 h-5" />
        </button>

        {/* モード切り替えタブ */}
        {mode === 'checkout' ? (
          <div className="px-6 pt-6 pb-4 border-b border-slate-200 bg-[#FAF9F5]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#D9532F] text-xs font-bold mb-2">
              <CreditCard className="w-3.5 h-3.5" />
              <span>有料プランお申し込み・アップグレード</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              数学の思考力を最短で引き上げるプラン選択
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              解法の盲点をなくす思考プロセス解説と類題演習を即座に解放できます。
            </p>
          </div>
        ) : (
          <div className="flex border-b border-slate-200 bg-[#FAF9F5]">
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`flex-1 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                mode === 'register'
                  ? 'border-[#D9532F] text-[#D9532F] bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              無料会員登録
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              className={`flex-1 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                mode === 'login'
                  ? 'border-[#D9532F] text-[#D9532F] bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              ログイン
            </button>
          </div>
        )}

        {/* モーダル本文 */}
        <div className="p-6 sm:p-7 max-h-[82vh] overflow-y-auto">
          {mode === 'checkout' && (
            <div className="space-y-4 mb-6">
              {/* 月払い / 年払い 切り替えスイッチ */}
              <div className="flex items-center justify-center p-1 bg-slate-100 rounded-xl border border-slate-200 max-w-xs mx-auto text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setChosenCycle('monthly')}
                  className={`flex-1 py-1.5 rounded-lg transition cursor-pointer ${
                    chosenCycle === 'monthly'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  月払い
                </button>
                <button
                  type="button"
                  onClick={() => setChosenCycle('yearly')}
                  className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                    chosenCycle === 'yearly'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>年払い</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#D9532F] text-white">
                    2ヶ月無料
                  </span>
                </button>
              </div>

              {/* 2プランの比較・選択カード */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* 一般会員 */}
                <div
                  onClick={() => setChosenTier('standard')}
                  className={`p-4 rounded-xl border-2 transition cursor-pointer relative flex flex-col justify-between ${
                    chosenTier === 'standard'
                      ? 'border-[#D9532F] bg-orange-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-900 text-sm">一般会員</span>
                      <input
                        type="radio"
                        name="plan"
                        checked={chosenTier === 'standard'}
                        onChange={() => setChosenTier('standard')}
                        className="accent-[#D9532F]"
                      />
                    </div>
                    <div className="font-black text-slate-900 text-lg font-mono">
                      {chosenCycle === 'monthly' ? '¥480' : '¥4,800'}
                      <span className="text-xs font-normal text-slate-500 font-sans ml-1">
                        / {chosenCycle === 'monthly' ? '月' : '年'}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>月100問のAI 4ステップ解析</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>基礎定着類題（1問）</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>弱点グラフ・履歴30件保存</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* プレミアム会員（推奨） */}
                <div
                  onClick={() => setChosenTier('premium')}
                  className={`p-4 rounded-xl border-2 transition cursor-pointer relative flex flex-col justify-between ${
                    chosenTier === 'premium'
                      ? 'border-[#D9532F] bg-orange-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#D9532F] text-white text-[10px] font-bold shadow-xs">
                    難関大志望に人気
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                        <span>プレミアム会員</span>
                      </span>
                      <input
                        type="radio"
                        name="plan"
                        checked={chosenTier === 'premium'}
                        onChange={() => setChosenTier('premium')}
                        className="accent-[#D9532F]"
                      />
                    </div>
                    <div className="font-black text-slate-900 text-lg font-mono">
                      {chosenCycle === 'monthly' ? '¥980' : '¥9,800'}
                      <span className="text-xs font-normal text-slate-500 font-sans ml-1">
                        / {chosenCycle === 'monthly' ? '月' : '年'}
                      </span>
                    </div>
                    {chosenCycle === 'yearly' && (
                      <span className="text-[11px] text-[#D9532F] font-semibold block mt-0.5">
                        月あたり実質 約817円
                      </span>
                    )}
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-center gap-1.5 font-semibold text-slate-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D9532F] shrink-0" />
                        <span>月300問（1日10問相当）</span>
                      </li>
                      <li className="flex items-center gap-1.5 font-semibold text-slate-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D9532F] shrink-0" />
                        <span>入試応用類題（第2類題）解放</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>超詳細・行間完全解説＆複数別解</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>マイ弱点ノートのPDF一括印刷</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 選択中プランのサマリー */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-500">選択中プラン: </span>
                  <span className="font-bold text-slate-900">{planName}</span>
                </div>
                <div className="font-black text-[#D9532F] font-mono text-sm">
                  {planPriceText}
                </div>
              </div>
            </div>
          )}

          {/* ログイン中ユーザーの場合の簡潔表示 */}
          {mode === 'checkout' && currentUser ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">ログイン中アカウントでお申し込み</p>
                  <p className="text-emerald-700 mt-0.5 font-mono">{currentUser.email}</p>
                  <p className="text-emerald-600 text-[11px] mt-1">
                    追加のアカウント入力は不要です。ボタンを押すとStripeの安全な決済画面へ直行します。
                  </p>
                </div>
              </div>

              {/* 未成年・保護者同意チェック */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-[#FAF9F5] text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={parentalConsent}
                  onChange={(e) => setParentalConsent(e.target.checked)}
                  className="mt-0.5 rounded text-[#D9532F] focus:ring-[#D9532F]"
                />
                <span className="leading-relaxed">
                  <strong>未成年のご利用について: </strong>
                  未成年の方は、保護者の方の同意を得た上でお申し込みください（保護者同意確認）。
                </span>
              </label>

              {/* 決済画面へ直行ボタン */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#D9532F] hover:bg-[#C84826] text-white font-bold text-sm rounded-xl shadow-md shadow-[#D9532F]/20 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>{loading ? '決済画面を準備中...' : `${planName}の決済へ進む（Stripe）`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* 安心・解約案内 */}
              <div className="pt-2 text-center space-y-1 text-slate-500 text-[11px]">
                <p className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
                  <span>Stripeによる安全な暗号化決済。いつでもマイページから1クリックで解約可能。</span>
                </p>
                <p>解約後も現在の契約期間満了日までは有料機能をご利用いただけます。</p>
              </div>
            </div>
          ) : (
            <>
              {mode !== 'checkout' && (
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#D9532F] text-xs font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{mode === 'register' ? 'クレカ不要・毎月3問無料' : 'FourmulaStepsへようこそ'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {mode === 'register' ? '無料登録して学習履歴を保存' : 'アカウントにログイン'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {mode === 'register' 
                      ? '無料登録で毎月3問のAI解析＋学習履歴や弱点ノートをクラウド保存できます。' 
                      : '登録したメールアドレスとパスワードでログインしてください。'}
                  </p>
                </div>
              )}

              {/* エラーメッセージ */}
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* フォーム */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode !== 'login' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      お名前・ニックネーム（任意）
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="例: 受験生A"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#D9532F] focus:ring-1 focus:ring-[#D9532F] transition font-sans"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    メールアドレス
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#D9532F] focus:ring-1 focus:ring-[#D9532F] transition font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    パスワード（6文字以上）
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#D9532F] focus:ring-1 focus:ring-[#D9532F] transition font-sans"
                    />
                  </div>
                </div>

                {/* 未成年・保護者同意チェック（有料申込時） */}
                {mode === 'checkout' && (
                  <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-[#FAF9F5] text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={parentalConsent}
                      onChange={(e) => setParentalConsent(e.target.checked)}
                      className="mt-0.5 rounded text-[#D9532F] focus:ring-[#D9532F]"
                    />
                    <span className="leading-relaxed">
                      <strong>未成年のご利用について: </strong>
                      未成年の方は、保護者の方の同意を得た上でお申し込みください。
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-4 bg-[#D9532F] hover:bg-[#C84826] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <span>
                    {loading 
                      ? '処理中...' 
                      : mode === 'checkout' 
                        ? 'アカウントを作成して決済へ進む' 
                        : mode === 'register' 
                          ? '無料登録して保存を始める' 
                          : 'ログインしてアプリへ'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* 下部リンク */}
              <div className="mt-5 text-center text-xs text-slate-500 space-y-2">
                {mode === 'checkout' ? (
                  <p>
                    すでにアカウントをお持ちの方は{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('login'); setErrorMsg(''); }}
                      className="text-[#D9532F] hover:underline font-bold cursor-pointer"
                    >
                      ログインしてお支払いへ
                    </button>
                  </p>
                ) : mode === 'register' ? (
                  <p>
                    すでにアカウントをお持ちの方は{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('login'); setErrorMsg(''); }}
                      className="text-[#D9532F] hover:underline font-bold cursor-pointer"
                    >
                      ログインはこちら
                    </button>
                  </p>
                ) : (
                  <p>
                    アカウントをお持ちでない方は{' '}
                    <button
                      type="button"
                      onClick={() => { 
                        setMode(chosenTier ? 'checkout' : 'register');
                        setErrorMsg(''); 
                      }}
                      className="text-[#D9532F] hover:underline font-bold cursor-pointer"
                    >
                      無料会員登録はこちら
                    </button>
                  </p>
                )}
                <div className="text-[11px] text-slate-400">
                  いつでもマイページから1クリックで自動更新停止・解約が可能です。
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
