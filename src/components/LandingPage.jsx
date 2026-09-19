import React, { useState } from 'react';
import { 
  Sparkles, 
  Camera, 
  BookOpen, 
  ArrowRight, 
  BarChart2, 
  Lightbulb, 
  HelpCircle, 
  Check,
  ChevronDown
} from 'lucide-react';

export default function LandingPage({ onLaunchApp, onOpenFormulas }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [previewTab, setPreviewTab] = useState('steps');

  const faqs = [
    {
      q: "スマートフォンでもパソコンでも使えますか？",
      a: "はい。iPhone、Androidスマートフォンのブラウザはもちろん、iPadやパソコン（Mac / Windows）の大画面でも快適にご利用いただけます。スマートフォンのカメラから直接問題の写真を撮って解析することも可能です。"
    },
    {
      q: "どの数学の範囲に対応していますか？",
      a: "高校数学全範囲（数学I・A・数学II・B・数学III・C）に対応しています。教科書の基本例題から、共通テスト、国公立・難関私大入試の応用・発展問題まで、幅広く4ステップに分解して解説します。"
    },
    {
      q: "手書きの途中式やノートの写真でも解析できますか？",
      a: "はい。最新のAI画像認識機能により、活字の問題集だけでなく、手書きのノートや模試の問題用紙の写真も高精度にテキスト化し、4つの思考手順へ分解します。"
    },
    {
      q: "利用料金はかかりますか？",
      a: "現在、すべての基本機能（問題のAI解析、4ステップ思考法トレース、類似問題の自動生成、公式ライブラリ閲覧、弱点診断）を無料でご利用いただけます。"
    },
    {
      q: "なぜ「4つの手順」で解けるようになるのですか？",
      a: "数学でペンが止まる原因の多くは「公式を知らないこと」ではなく、「問題文の条件をどう数式に落とし込み、何を目指して変形するかの思考手順が整理できていないこと」にあります。fourmulastepsは、この無意識の思考回路を4段階に言語化することで、初見問題でも再現できる本質的な解答力を養います。"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* グローバルヘッダー */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">4</span>
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white">fourmula<span className="text-cyan-400">steps</span></span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full">
                高校数学 4ステップ思考法
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#problem" className="hover:text-cyan-400 transition">数学の壁</a>
            <a href="#method" className="hover:text-cyan-400 transition">4ステップ思考法</a>
            <a href="#features" className="hover:text-cyan-400 transition">4大機能</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition">使い方</a>
            <a href="#faq" className="hover:text-cyan-400 transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenFormulas}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>公式集</span>
            </button>
            <button
              onClick={onLaunchApp}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-indigo-500/25 transition transform active:scale-95"
            >
              <span>アプリを体験</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* メインヒーローエリア */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* 背景の装飾グロー */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-600/10 blur-2xl pointer-events-none rounded-full" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 上部バッジ */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>解法の丸暗記から、初見問題が解ける再現力へ</span>
          </div>

          {/* メインキャッチコピー */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight mb-6">
            解法の丸暗記は、もう終わり。<br />
            数学の初見問題が解ける<br className="sm:hidden" />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              「4ステップ思考法」
            </span>
          </h1>

          {/* サブコピー */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed mb-10">
            問題文をスマホで撮るだけ。最新のAIがどんな難問も
            <span className="text-white font-semibold">「理解する・集める・形にする・動かす」</span>
            の4手順に分解し、解答の思考プロセスを完全に可視化します。
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-cyan-200" />
              <span>今すぐ無料で体験する</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenFormulas}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>入試数学公式集（全100選）を見る</span>
            </button>
          </div>

          {/* インタラクティブUIプレビューモックアップ */}
          <div className="relative mx-auto max-w-4xl rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-sm text-left">
            {/* ウィンドウバー */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">fourmulasteps AI 解法アナライザー</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setPreviewTab('steps')}
                  className={`px-3 py-1 rounded font-medium transition ${previewTab === 'steps' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  4ステップ解説
                </button>
                <button
                  onClick={() => setPreviewTab('similar')}
                  className={`px-3 py-1 rounded font-medium transition ${previewTab === 'similar' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  思考定着 類題2問
                </button>
              </div>
            </div>

            {/* プレビュー本体 */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  例題（難関大・2次レベル）
                </span>
                <p className="text-sm font-semibold text-slate-200 mt-2">
                  正の実数 x, y が x + 2y = 4 を満たすとき、xy の最大値とそのときの x, y の値を求めよ。
                </p>
              </div>

              {previewTab === 'steps' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800/80 hover:border-indigo-500/50 transition">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-1">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px]">1</span>
                      <span>手順1【理解する】ゴール</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      求めるべきは積 xy の最大値、およびその達成条件（x, y の値）。
                    </p>
                  </div>

                  <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/50 transition">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">2</span>
                      <span>手順2【集める】前提条件</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      条件①: 正の実数 (x &gt; 0, y &gt; 0)、条件②: x + 2y = 4。使える手札を整理。
                    </p>
                  </div>

                  <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800/80 hover:border-teal-500/50 transition">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-300 mb-1">
                      <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-[10px]">3</span>
                      <span>手順3【形にする】定式化</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      相加平均・相乗平均の大小関係、または 1文字消去で2次関数 f(x) に変換。
                    </p>
                  </div>

                  <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800/80 hover:border-emerald-500/50 transition">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-1">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px]">4</span>
                      <span>手順4【動かす】式変形・結論</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      (x + 2y)/2 ≧ √(2xy) より xy ≦ 2。等号成立 x=2, y=1 で最大値 2。
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <div className="bg-slate-950/90 p-4 rounded-xl border border-indigo-900/40">
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        思考定着 類題1（変形・基礎）
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">AI自動生成</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      正の実数 a, b が 2a + 3b = 12 を満たすとき、ab の最大値とそのときの a, b の値を求めよ。
                    </p>
                  </div>
                  <div className="bg-slate-950/90 p-4 rounded-xl border border-cyan-900/40">
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                        思考定着 類題2（発展・別解アプローチ）
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">AI自動生成</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      本問を相加相乗平均ではなく、2次関数の平方完成（1文字消去法）を用いて解き、同一の最大値に至ることを検証せよ。
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 受験生が抱える数学の悩み（Problem） */}
      <section id="problem" className="py-16 sm:py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-rose-400 tracking-wider uppercase bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              数学でペンが止まる本当の理由
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3">
              こんな悩みを抱えていませんか？
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              問題集を何周解いても初見問題が解けないのは、あなたの才能不足ではありません。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 shadow-md flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold">
                ✕
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  公式を覚えたのに、入試問題になると手が止まる
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  公式の形を丸暗記しているだけで、「問題文のどの条件を見て、どの公式を取り出すのか」の変換ルールが身についていません。
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 shadow-md flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold">
                ✕
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  解説を見ても「なぜその解法を思いつくのか」が謎のまま
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  市販の解答は「完成された美しい答案」だけが載っており、解く人が頭の中で行った試行錯誤や手順が省略されています。
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 shadow-md flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold">
                ✕
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  式変形の飛躍についていけず、自分のミスが特定できない
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  途中式が数行飛ばされていると、「ゴール設定を誤ったのか」「計算ミスなのか」自分の思考の穴がどこにあるか分かりません。
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 shadow-md flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold">
                ✕
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  解説を読んで納得したつもりでも、類題になるとまた解けない
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  「読んだだけ」では解法の定着は起きません。すぐに条件の違う類題を自力で解くアウトプットがなければ、本番で再現できません。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 解決策：4ステップ思考法（Core Method） */}
      <section id="method" className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              The fourmulasteps Method
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3">
              あらゆる数学の難問を突破する「4つの手順」
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              数学の解答はひらめきではありません。一流の受験生が頭の中で無意識に行っている思考を、誰でも再現できる4つのステップに形式化しました。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative bg-slate-900/80 p-6 rounded-2xl border border-indigo-500/30 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 font-black flex items-center justify-center text-lg mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-white mb-1">【理解する】</h3>
                <span className="text-xs font-semibold text-indigo-400 block mb-3">何を求めるのか明確にする</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  問題文の文末を真っ先に確認。「求める値」「示すべき結論」を特定し、解答の最終ゴールを言語化します。
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-indigo-300 font-medium">
                ゴールを見失わない基盤作り
              </div>
            </div>

            <div className="relative bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/30 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center text-lg mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-white mb-1">【集める】</h3>
                <span className="text-xs font-semibold text-cyan-400 block mb-3">条件を箇条書きで整理する</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  問題文で与えられたすべての数値、範囲、前提、図形的性質を洗い出し、「使える手札①②③」として可視化します。
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-cyan-300 font-medium">
                見落としと勘違いをゼロに
              </div>
            </div>

            <div className="relative bg-slate-900/80 p-6 rounded-2xl border border-teal-500/30 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 font-black flex items-center justify-center text-lg mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-white mb-1">【形にする】</h3>
                <span className="text-xs font-semibold text-teal-400 block mb-3">条件を数式・文字に変換</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  日本語の条件を、文字の設定や方程式、適切な公式と照合し、数学の言葉（数式）へと定式化します。
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-teal-300 font-medium">
                公式と問題をつなぐ架け橋
              </div>
            </div>

            <div className="relative bg-slate-900/80 p-6 rounded-2xl border border-emerald-500/30 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-lg mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-white mb-1">【動かす】</h3>
                <span className="text-xs font-semibold text-emerald-400 block mb-3">式を変形してゴールへ運ぶ</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  手順1で決めたゴールへ向かって、手順3で立てた式を整理・変形し、厳密な論理で答えを導きます。
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-emerald-300 font-medium">
                迷いのない着実な式変形
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4大主要機能（Key Features） */}
      <section id="features" className="py-16 sm:py-24 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Features
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3">
              fourmulasteps を支える4つの強力な機能
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              あなたの毎日の自習と受験勉強を、劇的に効率化するAI学習システム。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 機能1 */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 p-7 rounded-2xl border border-slate-700/80 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-5">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">機能 01</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2.5">
                  スマホで撮るだけ！AI画像・写真解析
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  問題集や模試、手書きのノートをカメラで撮影してアップロードするだけ。AIが一瞬で数式を認識し、4つの思考手順に構造化された解説を出力します。PCからのドラッグ＆ドロップやクリップボード貼り付けにも対応。
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> 手書き数式や図形問題にも柔軟対応</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> テキスト直接入力・キーボード入力も可能</li>
              </ul>
            </div>

            {/* 機能2 */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 p-7 rounded-2xl border border-slate-700/80 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">機能 02</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2.5">
                  思考定着 類題自動生成 ＆ 別解アプローチ
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  解説を読んだ直後に、本問の解法パターンを定着させる「類似問題2問」をAIが自動生成。さらに、1つの解法に固執せず多角的な視野を養う「別解・検算アプローチ」も同時に提供します。
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> 類題1（変形基礎）と類題2（発展検証）の2段階</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> 類似問題専用タブでサクサク演習</li>
              </ul>
            </div>

            {/* 機能3 */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-950/40 p-7 rounded-2xl border border-slate-700/80 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-600/20 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-5">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wide">機能 03</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2.5">
                  自分の弱点を客観視できる「つまずき診断」
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  演習中、4つの手順のどこで思考が止まったかをワンタップで記録。自分が「条件整理でつまずいているのか」「公式の定式化が苦手なのか」を客観的に診断し、弱点に応じた具体的な学習アドバイスを提示します。
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-teal-400" /> 4手順ごとのつまずき率を自動集計</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-teal-400" /> 思考プロセス別の具体的克服アクションを提示</li>
              </ul>
            </div>

            {/* 機能4 */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 p-7 rounded-2xl border border-slate-700/80 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">機能 04</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2.5">
                  大学入試数学公式集との完全連動
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  高校数学全分野（数I・A・II・B・III・C）の重要公式ライブラリを標準搭載。AIが解析した問題に関連する公式を自動で紐づけ、タップするだけで公式の定義・前提条件・使い所を即座に参照できます。
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> 全100種類以上の厳選された入試必須公式</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> 分野別フィルター・キーワード検索機能付き</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 使い方の3ステップ（How It Works） */}
      <section id="how-it-works" className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3">
              使い方はシンプル。3つのステップ
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              面倒な会員登録なしで、今すぐブラウザから使い始められます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center relative">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-black text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-500/10">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-2">問題を撮影または入力</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                スマホで問題集の写真を撮るか、問題文を入力して「AI思考プロセス解析」を実行。数秒で解析完了します。
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center relative">
              <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 font-black text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/10">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-2">4つの手順を追体験・自己診断</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                【理解する・集める・形にする・動かす】の順に解説を読み進め、つまずいた箇所をチェックして自分の癖を把握。
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center relative">
              <div className="w-14 h-14 rounded-2xl bg-teal-600/20 border border-teal-500/30 text-teal-400 font-black text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-teal-500/10">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-2">自動生成された類題で定着</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                AIが自動生成した類似問題に自力で挑戦。「学んだ解法を別の問題で再現できるか」を即座に確認します。
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onLaunchApp}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20 transition active:scale-95"
            >
              <span>アプリを起動して試す</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* よくある質問（FAQ） */}
      <section id="faq" className="py-16 sm:py-24 bg-slate-900/50 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3">
              よくある質問
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              サービス利用に関する疑問にお答えします。
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-slate-200 hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 最終CTAエリア */}
      <section className="py-20 sm:py-28 relative overflow-hidden text-center bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/60 border-t border-slate-800">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-cyan-300 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/10">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5">
            4ステップ思考法で、<br className="sm:hidden" />
            数学の壁を突破しよう。
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed mb-10">
            もう解法の丸暗記に悩む必要はありません。今日からあなたの勉強に「再現可能な思考力」を取り入れましょう。
          </p>

          <button
            onClick={onLaunchApp}
            className="inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-2xl shadow-indigo-500/30 transition transform hover:-translate-y-0.5 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-cyan-200" />
            <span>今すぐ無料で体験する（登録不要）</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* グローバルフッター */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">fourmula<span className="text-cyan-400">steps</span></span>
            <span>- 高校数学 4ステップ思考法プラットフォーム</span>
          </div>
          <div>
            © {new Date().getFullYear()} fourmulasteps. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
