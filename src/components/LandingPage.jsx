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
  ChevronDown,
  ShieldCheck,
  Zap,
  FileText
} from 'lucide-react';

import { redirectToCheckout } from '../lib/stripeClient';
import AuthModal from './AuthModal';

export default function LandingPage({ onLaunchApp, onOpenFormulas, user }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeStepTab, setActiveStepTab] = useState(1);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('register'); // 'register' | 'login' | 'checkout'
  const [selectedPlanForAuth, setSelectedPlanForAuth] = useState(null); // { tier, cycle }

  // 無料体験ボタン押下時: 登録済みならアプリへ、未登録なら無料会員登録モーダルを表示
  const handleFreeExperience = () => {
    setSelectedPlanForAuth(null);
    if (user?.email) {
      onLaunchApp();
    } else {
      setAuthModalMode('register');
      setShowAuthModal(true);
    }
  };

  // ログインボタン押下時
  const handleLoginClick = () => {
    setSelectedPlanForAuth(null);
    setAuthModalMode('login');
    setShowAuthModal(true);
  };

  // 有料プラン申し込み時
  const handleSubscribe = async (tier) => {
    if (!user?.email) {
      // 未ログインの場合は、有料プラン専用の会員登録＆決済直結モーダルを開く
      setSelectedPlanForAuth({
        tier,
        cycle: billingCycle
      });
      setAuthModalMode('checkout');
      setShowAuthModal(true);
      return;
    }

    // 既にログイン済みの場合はそのままStripe決済画面へ
    setIsCheckingOut(true);
    try {
      await redirectToCheckout({
        tier,
        cycle: billingCycle,
        userId: user?.id,
        userEmail: user?.email
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  // 認証完了後の処理
  const handleAuthSuccess = async (authUser, plan) => {
    setShowAuthModal(false);
    const targetPlan = plan || selectedPlanForAuth;
    if (targetPlan) {
      // 有料プランの場合、即座にStripe決済画面へリダイレクト
      setIsCheckingOut(true);
      try {
        await redirectToCheckout({
          tier: targetPlan.tier,
          cycle: targetPlan.cycle,
          userId: authUser?.id,
          userEmail: authUser?.email
        });
      } finally {
        setIsCheckingOut(false);
      }
    } else {
      // 無料会員登録・通常ログインの場合、そのままアプリへ
      onLaunchApp(authUser);
    }
  };

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
      q: "無料体験と有料プランの違いは何ですか？",
      a: "無料体験では3問まで基本の4ステップ解説をお試しいただけます。月額480円の一般会員は月100問のAI解析と基礎定着類題・弱点グラフが利用でき、月額980円のプレミアム会員は月300問に加えて「途中式を1行も飛ばさない超詳細解説」「入試応用類題」「複数別解」「マイ弱点ノートのPDF一括出力」など全ての難関大対策機能が無制限でご利用いただけます。"
    },
    {
      q: "いつでも解約できますか？",
      a: "はい。契約期間の縛りは一切ございません。マイページからいつでもワンクリックで自動更新を停止・解約いただけます。解約後も現在の契約期間満了日までは有料機能をご利用いただけます。"
    },
    {
      q: "なぜ「4つの手順」で解けるようになるのですか？",
      a: "数学でペンが止まる原因の多くは「公式を知らないこと」ではなく、「問題文の条件をどう数式に落とし込み、何を目指して変形するかの思考手順が整理できていないこと」にあります。fourmulastepsは、この無意識の思考回路を4段階に言語化することで、初見問題でも再現できる本質的な解答力を養います。"
    }
  ];

  const stepsPreviewData = {
    1: {
      name: "理解する",
      tag: "ゴール設定",
      desc: "何を求める問題なのか、最終的な到達点を言語化する。",
      content: "求めるもの: a + 1/a の最小値、およびそのときの a の値。\nゴール: 不等式を用いて下限値を求め、等号成立条件を確認する。"
    },
    2: {
      name: "集める",
      tag: "条件・公式整理",
      desc: "問題文の前提条件と、引き出せる数学公式を特定する。",
      content: "前提条件: a > 0（正の実数）\n想起する公式: 相加平均・相乗平均の大小関係\n公式の形: x > 0, y > 0 のとき、(x + y)/2 ≧ √(xy)  ⇒  x + y ≧ 2√(xy)"
    },
    3: {
      name: "形にする",
      tag: "定式化",
      desc: "集めた公式に問題の文字を当てはめ、解法の骨格を組み立てる。",
      content: "x = a, y = 1/a とおく。\na > 0 かつ 1/a > 0 なので相加・相乗平均の前提条件を満たす。\n積が定数になる構造に着目: a × (1/a) = 1"
    },
    4: {
      name: "動かす",
      tag: "式変形・結論",
      desc: "ゴールに向けて厳密に式を変形し、答えを導き出す。",
      content: "a + 1/a ≧ 2√(a × 1/a) = 2√1 = 2\n等号成立条件: a = 1/a かつ a > 0 より a² = 1 ⇒ a = 1\n結論: a = 1 のとき、最小値 2 をとる。"
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-slate-800 font-sans antialiased break-words selection:bg-[#E05A36] selection:text-white">
      {/* グローバルヘッダー */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FBF9F4]/90 border-b border-[#E8E2D7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-sm">
              4S
            </span>
            <span className="text-lg font-black tracking-tight text-slate-900">
              fourmula<span className="text-[#D9532F]">steps</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-600">
            <a href="#problem" className="hover:text-slate-900 transition">開発背景</a>
            <a href="#method" className="hover:text-slate-900 transition">4ステップ思考法</a>
            <a href="#features" className="hover:text-slate-900 transition">4大機能</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition">使い方</a>
            <a href="#pricing" className="hover:text-slate-900 transition">料金プラン</a>
            <a href="#faq" className="hover:text-slate-900 transition">Q&A</a>
          </nav>

          <div className="flex items-center gap-2.5">
            {user?.email ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {user.user_metadata?.full_name || user.email}
                </span>
                <button
                  type="button"
                  onClick={onLaunchApp}
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#D9532F] hover:bg-[#C84826] rounded-xl shadow-sm transition active:scale-95 flex items-center gap-1.5"
                >
                  <span>アプリを開く</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="px-3 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                >
                  ログイン
                </button>
                <button
                  type="button"
                  onClick={handleFreeExperience}
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#D9532F] hover:bg-[#C84826] rounded-xl shadow-sm transition active:scale-95 flex items-center gap-1.5"
                >
                  <span>無料で体験</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 1. Hero セクション（ウォームベージュ背景） */}
      <section className="py-12 sm:py-20 lg:py-24 border-b border-[#E8E2D7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 左カラム：コピー＆CTA */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2DBD0] text-slate-700 text-xs font-semibold mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#D9532F]" />
                <span>理解する → 集める → 形にする → 動かす</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-slate-900 leading-[1.2] mb-6">
                <span className="inline-block">解法の丸暗記は、</span>
                <span className="inline-block">もう終わり。</span>
                <br />
                <span className="inline-block text-2xl sm:text-4xl lg:text-[2.6rem] mt-2">
                  <span className="inline-block">数学の初見問題が解ける</span>
                  <span className="inline-block text-[#D9532F]">「4ステップ思考法」</span>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                <span className="inline-block">問題文をスマホで撮るだけ。</span>
                <span className="inline-block">AIがどんな難問も</span>
                <span className="inline-block font-bold text-slate-800">「理解する・集める・形にする・動かす」</span>
                <span className="inline-block">の4手順に分解し、解答の思考プロセスを完全に可視化します。</span>
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <button
                  type="button"
                  onClick={handleFreeExperience}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-[#D9532F] hover:bg-[#C84826] rounded-xl shadow-md shadow-[#D9532F]/20 transition active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-orange-200" />
                  <span>今すぐ無料で体験する</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenFormulas}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-[#DDD6CA] rounded-xl shadow-xs transition"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>公式集を見る（全213）</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#D9532F]" /> 無料会員登録ですぐ体験（クレカ不要・月3問）</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#D9532F]" /> スマホ撮影・手書き対応</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#D9532F]" /> 高校数学全範囲（数ⅠA〜ⅢC）</span>
              </div>
            </div>

            {/* 右カラム：アプリ画面プレビューカード */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-[#DDD6CA] shadow-xl p-5 relative overflow-hidden text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-[11px] font-semibold text-slate-500">AI思考プロセス解析</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#D9532F] border border-orange-200">
                    数Ⅱ・不等式の証明
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-4">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">解析問題</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                    a &gt; 0 のとき、不等式 a + 1/a ≧ 2 を証明し、等号が成立する条件を求めよ。
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-1 mb-3 bg-slate-100 p-1 rounded-lg">
                  {[1, 2, 3, 4].map((stepNum) => {
                    const step = stepsPreviewData[stepNum];
                    const isActive = activeStepTab === stepNum;
                    return (
                      <button
                        key={stepNum}
                        type="button"
                        onClick={() => setActiveStepTab(stepNum)}
                        className={`py-1.5 text-center rounded text-[11px] font-bold transition ${
                          isActive 
                            ? 'bg-slate-900 text-white shadow-xs' 
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {stepNum}. {step.name}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#FAF9F5] border border-[#EBE4D8] rounded-xl p-3.5 mb-4 min-h-[120px]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">
                      手順 {activeStepTab}【{stepsPreviewData[activeStepTab].name}】
                    </span>
                    <span className="text-[10px] font-medium text-[#D9532F] bg-orange-100/80 px-2 py-0.5 rounded-full">
                      {stepsPreviewData[activeStepTab].tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    {stepsPreviewData[activeStepTab].desc}
                  </p>
                  <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                    {stepsPreviewData[activeStepTab].content}
                  </pre>
                </div>

                <div className="border border-indigo-100 bg-indigo-50/50 rounded-xl p-3 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 mb-0.5">
                      <Lightbulb className="w-3 h-3" />
                      思考定着・類題（AI自動生成）
                    </span>
                    <p className="text-xs text-slate-700 font-medium">
                      x &gt; 0 のとき、4x + 9/x の最小値を求めよ。
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleFreeExperience}
                    className="shrink-0 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-200 px-2.5 py-1 rounded-lg shadow-xs"
                  >
                    解く →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem セクション（ディープネイビー背景でハイコントラスト） */}
      <section id="problem" className="py-20 sm:py-28 bg-[#0F172A] text-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold text-[#E05A36] tracking-widest uppercase bg-[#E05A36]/10 px-3 py-1 rounded-full border border-[#E05A36]/20">
              PROBLEM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3">
              <span className="inline-block">公式は覚えた。なのに、</span>
              <span className="inline-block">初見問題で手が止まる。</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              <span className="inline-block">問題集を何周解いても初見問題が解けないのは、</span>
              <span className="inline-block">あなたの才能不足ではありません。</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-md">
              <span className="text-2xl font-black text-[#E05A36] block mb-2 font-mono">01</span>
              <h3 className="text-base font-bold text-white mb-2">
                公式の形を丸暗記しただけで、いつ使うか判断できない
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                公式の文字式を暗記しているだけで、「問題文のどの条件を見て、どの公式を取り出すのか」の変換ルールが身についていません。
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-md">
              <span className="text-2xl font-black text-[#E05A36] block mb-2 font-mono">02</span>
              <h3 className="text-base font-bold text-white mb-2">
                解説を見ても「なぜその解法を思いつくのか」が分からない
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                市販の解答は「完成された美しい答案」だけが載っており、解く人が頭の中で行った試行錯誤や手順が省略されています。
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-md">
              <span className="text-2xl font-black text-[#E05A36] block mb-2 font-mono">03</span>
              <h3 className="text-base font-bold text-white mb-2">
                式変形の飛躍についていけず、自分の思考の穴が特定できない
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                途中式が数行飛ばされていると、「ゴール設定を誤ったのか」「計算ミスなのか」自分の思考の穴がどこにあるか分かりません。
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-md">
              <span className="text-2xl font-black text-[#E05A36] block mb-2 font-mono">04</span>
              <h3 className="text-base font-bold text-white mb-2">
                解説を読んで納得したつもりでも、類題になるとまた解けない
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                「読んだだけ」では解法の定着は起きません。すぐに条件の違う類題を自力で解くアウトプットがなければ、本番で再現できません。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Method セクション（ウォームベージュ背景） */}
      <section id="method" className="py-16 sm:py-24 border-b border-[#E8E2D7] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-[11px] font-bold text-[#D9532F] tracking-widest uppercase bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
                THE METHOD
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-4 leading-snug">
                <span className="inline-block">解答力は「ひらめき」ではなく、</span>
                <span className="inline-block">再現できる4つの手順。</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
              一流の受験生が無意識に行っている思考プロセスを4段階に体系化。初見の難問でも、迷わずペンを動かせるようになります。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-[#E2DBD0] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-slate-300 block mb-3 font-mono">1</span>
                <h3 className="text-lg font-bold text-slate-900 mb-1">【理解する】</h3>
                <span className="text-xs font-semibold text-[#D9532F] block mb-3">何を求めるのか明確にする</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  問題文の文末を真っ先に確認。「求める値」「示すべき結論」を特定し、解答の最終ゴールを言語化します。
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                ゴールを見失わない基盤作り
              </div>
            </div>

            <div className="bg-white border border-[#E2DBD0] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-slate-300 block mb-3 font-mono">2</span>
                <h3 className="text-lg font-bold text-slate-900 mb-1">【集める】</h3>
                <span className="text-xs font-semibold text-[#D9532F] block mb-3">条件と公式を整理する</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  与えられた条件・図形の性質・使用できそうな数学公式（全213）を抽出し、解法の武器を揃えます。
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                必要な材料の完全リストアップ
              </div>
            </div>

            <div className="bg-white border border-[#E2DBD0] p-6 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-slate-300 block mb-3 font-mono">3</span>
                <h3 className="text-lg font-bold text-slate-900 mb-1">【形にする】</h3>
                <span className="text-xs font-semibold text-[#D9532F] block mb-3">立式して方針を決める</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  集めた公式と条件を結びつけ、ゴールに到達するための「式」や「解答の道筋（方針）」を構築します。
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                公式と問題をつなぐ架け橋
              </div>
            </div>

            <div className="bg-[#0F172A] text-white border border-slate-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-[#E05A36] block mb-3 font-mono">4</span>
                <h3 className="text-lg font-bold text-white mb-1">【動かす】</h3>
                <span className="text-xs font-semibold text-[#E05A36] block mb-3">式を変形してゴールへ運ぶ</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  手順1で決めたゴールへ向かって、手順3で立てた式を整理・変形し、厳密な論理で答えを導きます。
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-[#E05A36] font-medium">
                迷いのない着実な式変形
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features セクション（ウォームベージュ系、白カードでクリーン） */}
      <section id="features" className="py-16 sm:py-24 bg-[#F8F6F0] border-b border-[#E8E2D7] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold text-[#D9532F] tracking-widest uppercase bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
              FEATURES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-3">
              <span className="inline-block">4ステップ思考を支える、</span>
              <span className="inline-block">4つの機能</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              <span className="inline-block">あなたの毎日の自習と受験勉強を、</span>
              <span className="inline-block">劇的に効率化するAI学習システム。</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-[#E2DBD0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 text-[#D9532F] flex items-center justify-center mb-5">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#D9532F] uppercase tracking-wide">機能 01</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2.5">
                  スマホで撮るだけ！AI画像・写真解析
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  問題集や模試、手書きのノートをカメラで撮影してアップロードするだけ。AIが一瞬で数式を認識し、4つの思考手順に構造化された解説を出力します。
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D9532F]" /> 手書き数式や図形問題にも柔軟対応</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D9532F]" /> テキスト直接入力・キーボード入力も可能</div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#E2DBD0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-5">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">機能 02</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2.5">
                  思考定着 類題2問自動生成＆別解アプローチ
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  解説を読んだ直後に、同じ思考回路を使う類題（数値替え・応用パターン）を自動生成。さらに別解アプローチも提示し、多角的な数学的視野を広げます。
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-600" /> 類題1（基礎定着）＋ 類題2（発展応用）</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-600" /> 別解アプローチ（ベクトル/幾何/微積の別ルート）</div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#E2DBD0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mb-5">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide">機能 03</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2.5">
                  つまずき箇所を客観視できる自己診断
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  「理解で詰まったのか」「公式不足か」「立式か」「計算変形か」をワンクリックで記録。自分の思考の弱点傾向がグラフ化され、克服課題が明確になります。
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                <span className="text-[10px] font-bold text-slate-400 block mb-2">つまずき診断ボタンイメージ</span>
                <div className="flex gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium">① 理解</span>
                  <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium">② 集める</span>
                  <span className="px-2.5 py-1 rounded bg-rose-50 border border-rose-200 text-rose-700 font-bold">③ 形にする (苦手)</span>
                  <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium">④ 動かす</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#E2DBD0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 flex items-center justify-center mb-5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">機能 04</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2.5">
                  大学入試数学公式集（213公式）完全連動
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  数Ⅰ・Aから数Ⅲ・Cまで、入試必須の全213公式を内蔵。AI解説に登場した公式をクリックすると、使い方や導出・注意点へ瞬時にアクセスできます。
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 font-medium">数Ⅰ・A (48)</span>
                <span className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 font-medium">数Ⅱ・B (65)</span>
                <span className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 font-medium">数Ⅲ・C (100)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works セクション（ウォームベージュ背景） */}
      <section id="how-it-works" className="py-16 sm:py-24 border-b border-[#E8E2D7] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold text-[#D9532F] tracking-widest uppercase bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
              HOW IT WORKS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-3">
              <span className="inline-block">使い方は、</span>
              <span className="inline-block">3ステップだけ。</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              <span className="inline-block">面倒な会員登録なしで、</span>
              <span className="inline-block">今すぐブラウザから使い始められます。</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-[#E2DBD0] shadow-xs text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-slate-900 text-white font-bold text-xs mb-4">
                STEP 01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">問題を撮影または入力</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                スマホで問題集の写真を撮るか、問題文を入力して「AI思考プロセス解析」を実行。数秒で解析完了します。
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#E2DBD0] shadow-xs text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-[#D9532F] text-white font-bold text-xs mb-4">
                STEP 02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">4つの手順を追体験・自己診断</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                【理解する・集める・形にする・動かす】の順に解説を読み進め、つまずいた箇所をチェックして自分の癖を把握。
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#E2DBD0] shadow-xs text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-700 text-white font-bold text-xs mb-4">
                STEP 03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">自動生成された類題で定着</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                AIが自動生成した類似問題に自力で挑戦。「学んだ解法を別の問題で再現できるか」を即座に確認します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pricing セクション（ディープネイビー背景で高級感と説得力を演出） */}
      <section id="pricing" className="py-20 sm:py-28 bg-[#0F172A] text-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold text-[#E05A36] tracking-widest uppercase bg-[#E05A36]/10 px-3 py-1 rounded-full border border-[#E05A36]/20">
              PRICING
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3">
              <span className="inline-block">分かりやすく透明な</span>
              <span className="inline-block">料金プラン</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              <span className="inline-block">まずは無料でお試し。</span>
              <span className="inline-block">あなたの目標・学習量に合わせて、</span>
              <span className="inline-block">いつでもアップグレード・解約が可能です。</span>
            </p>

            {/* 月払い / 年払い 切り替えトグル */}
            <div className="mt-8 inline-flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition ${
                  billingCycle === 'monthly'
                    ? 'bg-[#E05A36] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                月払い
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-[#E05A36] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>年払い</span>
                <span className="px-1.5 py-0.5 text-[10px] bg-amber-400 text-slate-950 rounded-full font-black">
                  2ヶ月分お得
                </span>
              </button>
            </div>
          </div>

          {/* 3つの料金カード */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-12">
            {/* 1. 無料体験プラン */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">体験プラン</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">無料体験</h3>
                <p className="text-xs text-slate-400 mb-6">
                  まずは「4ステップ思考法」の解法プロセスを体験したい方に。
                </p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white font-mono">¥0</span>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">登録不要・完全無料</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-slate-500 shrink-0" />
                    <span><strong>体験用 AI問題解析 3問</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>基本 4ステップ思考法解説</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>公式ライブラリ（全213公式）閲覧</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={handleFreeExperience}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition"
                >
                  無料で体験してみる
                </button>
              </div>
            </div>

            {/* 2. 一般会員プラン */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">学校課題・定期テスト対策</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">一般会員</h3>
                <p className="text-xs text-slate-400 mb-6">
                  毎日の自習や宿題、定期テストの疑問を素早く解消したい方に。
                </p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white font-mono">
                      ¥{billingCycle === 'monthly' ? '480' : '4,800'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      / {billingCycle === 'monthly' ? '月' : '年'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <span className="text-[11px] text-amber-400 mt-1 block">
                      月あたり実質 400円（年間960円お得）
                    </span>
                  )}
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5 font-semibold text-white">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>月間 100問のAI解析</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>標準 4ステップ思考法解説</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>思考定着 類題1問自動生成（基礎）</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>別解アプローチ 1パターン提示</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>つまずきステップの割合グラフ表示</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>直近30件の解析履歴保存</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>公式集（全213公式）完全連動</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  disabled={isCheckingOut}
                  onClick={() => handleSubscribe('standard')}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition disabled:opacity-50"
                >
                  {isCheckingOut ? '決済画面を準備中...' : '一般会員を始める'}
                </button>
              </div>
            </div>

            {/* 3. プレミアム会員プラン（おすすめハイライト） */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-[#E05A36] rounded-2xl p-7 flex flex-col justify-between relative shadow-2xl shadow-[#E05A36]/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E05A36] text-white text-[11px] font-black uppercase px-3.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" />
                一番人気・受験対策におすすめ
              </div>

              <div>
                <span className="text-xs font-bold text-[#E05A36] uppercase tracking-wide">共通テスト・難関大入試突破</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">プレミアム会員</h3>
                <p className="text-xs text-slate-300 mb-6">
                  初見問題の再現力と別解アプローチ、弱点克服を徹底的に極めたい受験生に。
                </p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white font-mono">
                      ¥{billingCycle === 'monthly' ? '980' : '9,800'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      / {billingCycle === 'monthly' ? '月' : '年'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <span className="text-[11px] text-amber-400 mt-1 block">
                      月あたり実質 約816円（年間1,960円お得）
                    </span>
                  )}
                </div>

                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2.5 font-bold text-amber-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>月間 300問のたっぷりAI解析</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-semibold text-white">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>超詳細・行間完全解説モード（途中式全展開）</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>思考定着 類題2問（基礎確認 ＋ 入試応用）</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>複数ルートの別解網羅（ベクトル/幾何/代数等）</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>マイ弱点克服ノートのPDF一括出力・印刷</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#E05A36] shrink-0" />
                    <span>解析履歴の無制限保存 ＆ 弱点フォルダ分け</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  disabled={isCheckingOut}
                  onClick={() => handleSubscribe('premium')}
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-[#E05A36] hover:bg-[#C84826] rounded-xl shadow-lg shadow-[#E05A36]/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-orange-200" />
                  <span>{isCheckingOut ? '決済画面を準備中...' : 'プレミアム会員を始める'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 全機能比較表のトグル展開 */}
          <div className="text-center">
            <button
              onClick={() => setShowComparisonTable(!showComparisonTable)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white font-medium py-2 px-4 rounded-lg bg-slate-900 border border-slate-800 transition"
            >
              <span>{showComparisonTable ? '機能比較表を閉じる' : '全プランの詳しい機能比較表を見る'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showComparisonTable ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showComparisonTable && (
            <div className="mt-8 overflow-x-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl animate-fade-in text-left">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 font-bold text-white">機能・サービス項目</th>
                    <th className="py-3 px-4 font-bold text-slate-300">無料体験</th>
                    <th className="py-3 px-4 font-bold text-slate-300">一般会員</th>
                    <th className="py-3 px-4 font-bold text-[#E05A36]">プレミアム会員</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">月間AI解析問題数</td>
                    <td className="py-3 px-4">体験用 3問</td>
                    <td className="py-3 px-4 font-bold text-white">100問 /月</td>
                    <td className="py-3 px-4 font-bold text-[#E05A36]">300問 /月</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">4ステップ思考法解説</td>
                    <td className="py-3 px-4">基本解説</td>
                    <td className="py-3 px-4">標準解説</td>
                    <td className="py-3 px-4 text-amber-300 font-semibold">超詳細・行間完全解説</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">思考定着 類題自動生成</td>
                    <td className="py-3 px-4 text-slate-600">-</td>
                    <td className="py-3 px-4">1問（基礎定着）</td>
                    <td className="py-3 px-4 text-white font-semibold">2問（基礎 ＋ 入試実戦）</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">別解アプローチ提示</td>
                    <td className="py-3 px-4 text-slate-600">-</td>
                    <td className="py-3 px-4">1パターン</td>
                    <td className="py-3 px-4 text-white font-semibold">複数ルート網羅（ベクトル/幾何等）</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">弱点診断・つまずき分析</td>
                    <td className="py-3 px-4 text-slate-600">-</td>
                    <td className="py-3 px-4">つまずき割合グラフ</td>
                    <td className="py-3 px-4 text-white font-semibold">つまずき割合グラフ ＋ 処方箋アドバイス</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">解析履歴の保存</td>
                    <td className="py-3 px-4 text-slate-600">-</td>
                    <td className="py-3 px-4">直近 30件</td>
                    <td className="py-3 px-4 text-white font-semibold">無制限（フォルダ分類可能）</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">マイ弱点ノートPDF出力・印刷</td>
                    <td className="py-3 px-4 text-slate-600">-</td>
                    <td className="py-3 px-4 text-slate-600">-</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">◯ A4印刷対応PDF一括生成</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">公式集（全213公式）</td>
                    <td className="py-3 px-4">閲覧可能</td>
                    <td className="py-3 px-4">完全連動</td>
                    <td className="py-3 px-4 text-white">公式マスター状態管理連動</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* 7. FAQ セクション（ウォームベージュ系、Claude案に倣い左見出し・右リストの2カラム構成） */}
      <section id="faq" className="py-16 sm:py-24 bg-[#F8F6F0] border-b border-[#E8E2D7] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* 左側：タイトル */}
            <div className="lg:col-span-4 text-left">
              <span className="text-[11px] font-bold text-[#D9532F] tracking-widest uppercase bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
                よくある質問
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                サービスの利用方法や料金プランなど、学習者の皆様からよく寄せられる質問にお答えします。
              </p>
            </div>

            {/* 右側：アコーディオンリスト */}
            <div className="lg:col-span-8 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-xl border border-[#E2DBD0] overflow-hidden transition shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-slate-800 hover:text-slate-900"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-[#D9532F] shrink-0" />
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-slate-800' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAF9F5]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. 最終CTAエリア（ディープネイビー背景で力強く引き締め） */}
      <section className="py-20 sm:py-28 relative overflow-hidden text-center bg-[#0F172A] text-white">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
            <span className="inline-block">4ステップ思考法で、</span>
            <span className="inline-block">数学の壁を突破しよう。</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed mb-9">
            <span className="inline-block">もう解法の丸暗記に悩む必要はありません。</span>
            <span className="inline-block">今日からあなたの勉強に</span>
            <span className="inline-block">「再現可能な思考力」を取り入れましょう。</span>
          </p>

          <button
            type="button"
            onClick={handleFreeExperience}
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-bold text-white bg-[#D9532F] hover:bg-[#C84826] rounded-xl shadow-2xl shadow-[#D9532F]/40 transition transform hover:-translate-y-0.5 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-orange-200" />
            <span>今すぐ無料で体験する</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 9. グローバルフッター（ディープネイビー） */}
      <footer className="py-8 bg-[#090E1A] border-t border-slate-800 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">fourmula<span className="text-[#D9532F]">steps</span></span>
            <span>- 高校数学 4ステップ思考法プラットフォーム</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#problem" className="hover:text-white transition">開発背景</a>
            <a href="#method" className="hover:text-white transition">思考法</a>
            <a href="#features" className="hover:text-white transition">機能</a>
            <a href="#pricing" className="hover:text-white transition">料金プラン</a>
            <a href="#faq" className="hover:text-white transition">Q&A</a>
            <button 
              type="button"
              onClick={handleFreeExperience} 
              className="text-[#D9532F] hover:underline font-bold"
            >
              アプリを起動
            </button>
          </div>
        </div>
      </footer>

      {/* 会員登録・ログイン・有料決済直結モーダル */}
      <AuthModal
        isOpen={showAuthModal}
        initialMode={authModalMode}
        selectedPlan={selectedPlanForAuth}
        onClose={() => {
          setShowAuthModal(false);
          setSelectedPlanForAuth(null);
        }}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
