import React, { useState, useMemo } from 'react';
import { 
  User, 
  Crown, 
  Sparkles, 
  BarChart3, 
  FolderPlus, 
  Folder, 
  Printer, 
  FileText, 
  ExternalLink, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  FolderCheck,
  ShieldCheck,
  Layers,
  Lock
} from 'lucide-react';
import { deleteProblemFromSupabase, saveProblemToSupabase } from '../lib/supabase';

export default function MyPage({
  user,
  userProfile,
  monthlyUsageCount = 0,
  problems = [],
  setProblems,
  userLogs = {},
  onSelectProblem,
  onOpenUpgrade,
  onLogout
}) {
  const plan = userProfile?.plan || 'free';
  const isPremium = plan === 'premium';
  const isStandard = plan === 'standard';
  const isPaid = isPremium || isStandard;

  // プランに応じた上限
  const monthlyLimit = isPremium ? 300 : isStandard ? 100 : 3;
  const historyLimit = isPremium ? 100 : isStandard ? 30 : 5;
  const usagePercentage = Math.min(100, Math.round((monthlyUsageCount / monthlyLimit) * 100));

  // 選択中フォルダ
  const [selectedFolder, setSelectedFolder] = useState('すべて');
  const [newFolderName, setNewFolderName] = useState('');
  const [showFolderInput, setShowFolderInput] = useState(false);

  // 登録済みフォルダ一覧の抽出
  const customFolders = useMemo(() => {
    const defaultFolders = ['微積分', 'ベクトル', '数列', '確率', '二次関数・図形', '要復習・苦手'];
    const usedFolders = problems.map(p => p.folder).filter(Boolean);
    return Array.from(new Set([...defaultFolders, ...usedFolders]));
  }, [problems]);

  // 表示する問題（上限数でスライスし、フォルダでフィルタ）
  const displayProblems = useMemo(() => {
    const limited = problems.slice(0, historyLimit);
    if (selectedFolder === 'すべて') return limited;
    return limited.filter(p => (p.folder || '未分類') === selectedFolder);
  }, [problems, historyLimit, selectedFolder]);

  // フォルダ変更処理
  const handleChangeFolder = async (problem, newFolder) => {
    const updated = { ...problem, folder: newFolder };
    setProblems(prev => prev.map(p => p.id === problem.id ? updated : p));
    await saveProblemToSupabase(updated);
  };

  // 問題削除処理
  const handleDeleteProblem = async (problemId) => {
    if (!window.confirm('この解析履歴を削除してもよろしいですか？')) return;
    setProblems(prev => prev.filter(p => p.id !== problemId));
    await deleteProblemFromSupabase(problemId);
  };

  // PDF・A4印刷実行
  const handlePrintWeaknessNotebook = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. 会員ステータス ＆ 月間解析利用ゲージ */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className={`p-3.5 rounded-2xl border ${
              isPremium 
                ? 'bg-[#E05A36]/15 border-[#E05A36]/40 text-[#E05A36]' 
                : isStandard 
                ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-400' 
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              {isPremium ? <Crown className="w-8 h-8" /> : isStandard ? <Sparkles className="w-8 h-8" /> : <User className="w-8 h-8" />}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'ゲスト'} さんのマイページ
                </h2>
                <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                  isPremium 
                    ? 'bg-[#E05A36]/20 border-[#E05A36]/50 text-orange-300' 
                    : isStandard 
                    ? 'bg-indigo-900/60 border-indigo-600/60 text-indigo-200' 
                    : 'bg-slate-800 border-slate-600 text-slate-300'
                }`}>
                  {isPremium ? 'プレミアム会員' : isStandard ? '一般会員' : '無料体験会員'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>登録メールアドレス: {user?.email || '未連携'}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  クラウド同期中
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isPremium && (
              <button
                onClick={onOpenUpgrade}
                className="py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#E05A36] to-amber-600 hover:from-[#C84826] hover:to-amber-700 shadow-lg shadow-[#E05A36]/20 transition flex items-center gap-1.5"
              >
                <Crown className="w-4 h-4 text-orange-200" />
                <span>{isStandard ? 'プレミアムへアップグレード' : '有料プランに登録'}</span>
              </button>
            )}
            <button
              onClick={onLogout}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition"
            >
              ログアウト
            </button>
          </div>
        </div>

        {/* 月間AI解析利用状況ゲージ */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                今月のAI解析利用状況
              </span>
              <span className="text-slate-200 font-mono font-bold">
                <span className="text-indigo-400 text-sm font-black">{monthlyUsageCount}</span> / {monthlyLimit} 問
                <span className="text-slate-400 text-[11px] ml-1.5 font-normal">（残り {Math.max(0, monthlyLimit - monthlyUsageCount)} 問）</span>
              </span>
            </div>

            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  usagePercentage >= 90 
                    ? 'bg-rose-500' 
                    : usagePercentage >= 70 
                    ? 'bg-amber-400' 
                    : 'bg-gradient-to-r from-indigo-500 to-[#E05A36]'
                }`}
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-400 pt-0.5">
              <span>毎月1日に解析枠がリセットされます</span>
              <span>利用率 {usagePercentage}%</span>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 flex flex-col justify-between">
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white block mb-1">現在の保存可能件数</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isPremium 
                  ? 'プレミアム会員：最大100件の履歴保存 ＆ フォルダ分類管理' 
                  : isStandard 
                  ? '一般会員：最大30件の履歴保存' 
                  : '無料体験会員：直近の履歴のみ'}
              </p>
            </div>
            <div className="text-right mt-2 text-xs font-mono font-bold text-slate-300">
              現在 {problems.length} 件保存中
            </div>
          </div>
        </div>
      </div>

      {/* 2. マイ弱点克服ノートのPDF一括出力 ＆ 印刷バナー */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-600/30 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 shrink-0 mt-0.5 sm:mt-0">
            <Printer className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">マイ弱点克服ノート A4印刷・PDF出力</h3>
              {isPremium ? (
                <span className="text-[10px] bg-emerald-950 border border-emerald-500/50 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  利用可能
                </span>
              ) : (
                <span className="text-[10px] bg-[#E05A36]/20 border border-[#E05A36]/50 text-orange-300 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  プレミアム限定
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              つまずきを記録した問題と4ステップ思考方針、連動公式をA4用紙に最適化した形式で印刷・PDF保存できます。試験直前の総復習プリントに最適です。
            </p>
          </div>
        </div>

        <button
          onClick={isPremium ? handlePrintWeaknessNotebook : onOpenUpgrade}
          className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition flex items-center gap-2 shadow-md ${
            isPremium
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black hover:shadow-amber-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40'
          }`}
        >
          {isPremium ? (
            <>
              <FileText className="w-4 h-4" />
              <span>A4弱点ノートを印刷・PDF出力</span>
            </>
          ) : (
            <>
              <Crown className="w-4 h-4 text-orange-400" />
              <span>プレミアムにアップグレードして出力</span>
            </>
          )}
        </button>
      </div>

      {/* 3. 解析履歴一覧 ＆ 弱点フォルダ管理 */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>解析履歴 ＆ 弱点フォルダ管理</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              過去にAI解析した問題の思考プロセスや連動公式をいつでも復習できます（表示上限: 直近{historyLimit}件）
            </p>
          </div>

          {/* 新規フォルダ追加 */}
          <div className="flex items-center gap-2">
            {showFolderInput ? (
              <div className="flex items-center gap-1.5 animate-in fade-in">
                <input
                  type="text"
                  placeholder="フォルダ名 (例: 複素数)"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => {
                    if (newFolderName.trim()) {
                      setSelectedFolder(newFolderName.trim());
                      setNewFolderName('');
                      setShowFolderInput(false);
                    }
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
                >
                  追加
                </button>
                <button
                  onClick={() => setShowFolderInput(false)}
                  className="px-2 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  取消
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowFolderInput(true)}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 hover:text-white transition flex items-center gap-1.5"
              >
                <FolderPlus className="w-3.5 h-3.5 text-indigo-400" />
                <span>フォルダ作成</span>
              </button>
            )}
          </div>
        </div>

        {/* フォルダ切り替えタブ */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedFolder('すべて')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition shrink-0 flex items-center gap-1.5 ${
              selectedFolder === 'すべて'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>すべて ({problems.length})</span>
          </button>
          {customFolders.map(folder => {
            const count = problems.filter(p => (p.folder || '未分類') === folder).length;
            return (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition shrink-0 flex items-center gap-1.5 ${
                  selectedFolder === folder
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/80'
                }`}
              >
                <FolderCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>{folder} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* 問題一覧カードリスト */}
        {displayProblems.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-300">該当する解析履歴がありません</p>
            <p className="text-xs text-slate-500 mt-1">「問題読み取り」から数学問題を撮影・解析するとここに保存されます</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayProblems.map((problem) => {
              const logs = userLogs[problem.id] || {};
              const stuckSteps = Object.entries(logs)
                .filter(([_, status]) => status === 'stuck')
                .map(([stepNum]) => stepNum);

              return (
                <div
                  key={problem.id}
                  className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition flex flex-col justify-between gap-4 shadow-md group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                          {problem.university || '入試問題'}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {problem.difficulty || '標準'}
                        </span>
                        {/* フォルダバッジ */}
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/60 flex items-center gap-1">
                          <Folder className="w-2.5 h-2.5 text-indigo-400" />
                          {problem.folder || '未分類'}
                        </span>
                      </div>

                      {/* 削除ボタン */}
                      <button
                        onClick={() => handleDeleteProblem(problem.id)}
                        title="履歴を削除"
                        className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-700/40 transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition line-clamp-2">
                      {problem.title || '無題の問題'}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {problem.goal || problem.question}
                    </p>

                    {/* つまずきステップのバッジ */}
                    {stuckSteps.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <span className="text-[10px] text-rose-400 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          要復習つまずき:
                        </span>
                        {stuckSteps.map(s => (
                          <span key={s} className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-950/80 border border-rose-800 text-rose-300">
                            Step {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    {/* フォルダ移動セレクト */}
                    <select
                      value={problem.folder || '未分類'}
                      onChange={(e) => handleChangeFolder(problem, e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-slate-300 text-[11px] px-2 py-1 rounded-lg focus:outline-none focus:border-indigo-500"
                    >
                      <option value="未分類">未分類</option>
                      {customFolders.map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => onSelectProblem(problem.id)}
                      className="py-1.5 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white font-bold transition flex items-center gap-1 text-[11px]"
                    >
                      <span>この問題を復習する</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
