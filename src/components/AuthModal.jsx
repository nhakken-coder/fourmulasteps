import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { signUpWithEmail, signInWithEmail } from '../lib/supabase';

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'register' }) {
  const [mode, setMode] = useState(initialMode); // 'register' or 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

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
      if (mode === 'register') {
        const result = await signUpWithEmail(email, password, displayName || '受験生');
        if (result?.user) {
          onSuccess(result.user);
          onClose();
        }
      } else {
        const result = await signInWithEmail(email, password);
        if (result?.user) {
          onSuccess(result.user);
          onClose();
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      // 分かりやすい日本語メッセージに変換
      let msg = err.message || '認証エラーが発生しました';
      if (msg.includes('already registered') || msg.includes('User already registered')) {
        msg = 'このメールアドレスは既に登録されています。「ログイン」タブをお試しください。';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="閉じる"
        >
          <X className="w-5 h-5" />
        </button>

        {/* タブ切り替え */}
        <div className="flex border-b border-slate-800 bg-slate-900/50">
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMsg(''); }}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition ${
              mode === 'register'
                ? 'border-[#E05A36] text-[#E05A36] bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            無料会員登録（体験）
          </button>
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition ${
              mode === 'login'
                ? 'border-[#E05A36] text-[#E05A36] bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ログイン
          </button>
        </div>

        {/* モーダル本文 */}
        <div className="p-6 sm:p-7">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E05A36]/10 border border-[#E05A36]/30 text-[#E05A36] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{mode === 'register' ? 'クレカ登録不要・月3問無料' : 'FourmulaStepsへようこそ'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {mode === 'register' ? '無料登録してアプリを体験' : 'アカウントにログイン'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {mode === 'register' 
                ? '登録後、すぐに4ステップAI解法アプリを無料でお試しいただけます。' 
                : '登録したメールアドレスとパスワードでログインしてください。'}
            </p>
          </div>

          {/* 特典バナー（登録時のみ） */}
          {mode === 'register' && (
            <div className="mb-5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>無料プランで毎月3問までAI徹底解析</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>登録は30秒・クレジットカード不要</span>
              </div>
            </div>
          )}

          {/* エラーメッセージ */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* フォーム */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  お名前・ニックネーム（任意）
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="例: 受験生A"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#E05A36] focus:ring-1 focus:ring-[#E05A36] transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#E05A36] focus:ring-1 focus:ring-[#E05A36] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                パスワード（6文字以上）
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#E05A36] focus:ring-1 focus:ring-[#E05A36] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-[#E05A36] hover:bg-[#C84826] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#E05A36]/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? '処理中...' : (mode === 'register' ? '無料登録して体験を始める' : 'ログインしてアプリへ')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 下部リンク */}
          <div className="mt-5 text-center text-xs text-slate-400">
            {mode === 'register' ? (
              <p>
                すでにアカウントをお持ちの方は{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(''); }}
                  className="text-[#E05A36] hover:underline font-semibold"
                >
                  ログインはこちら
                </button>
              </p>
            ) : (
              <p>
                アカウントをお持ちでない方は{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMsg(''); }}
                  className="text-[#E05A36] hover:underline font-semibold"
                >
                  無料会員登録はこちら
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
