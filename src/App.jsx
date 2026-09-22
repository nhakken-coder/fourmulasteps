import React, { useState, useEffect, useRef, useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { GoogleGenAI } from '@google/genai';
import { Capacitor } from '@capacitor/core';
import { Camera as CapCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { 
  FOURMULA_STEPS_SYSTEM_INSTRUCTION, 
  FOURMULA_STEPS_USER_PROMPT, 
  FOURMULA_STEPS_RESPONSE_SCHEMA 
} from './prompts/fourmulaStepsPrompt';
import { MATH_FORMULAS, findFormulaInCollection } from './data/mathFormulas';
import { GEMINI_API_KEY, GEMINI_MODEL } from './config';
import LandingPage from './components/LandingPage';
import MyPage from './components/MyPage';
import AuthModal from './components/AuthModal';
import LegalModal from './components/LegalModal';
import { 
  supabase,
  isSupabaseConfigured, 
  saveProblemToSupabase, 
  fetchProblemsFromSupabase, 
  saveStepLogToSupabase, 
  fetchStepLogsFromSupabase,
  recordAiUsageLog,
  recordWeaknessLog,
  fetchUserProfile,
  getCurrentUser,
  signOutUser,
  fetchMonthlyUsageCount
} from './lib/supabase';
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Lightbulb, 
  Sparkles,
  Camera,
  Image as ImageIcon,
  Target,
  BookmarkCheck,
  BarChart2,
  CheckCircle2,
  HelpCircle,
  XCircle,
  AlertTriangle,
  Trash2,
  Upload,
  Search,
  Library,
  X,
  PlusCircle,
  LogOut,
  User,
  Lock,
  Printer,
  Crown,
  Edit3
} from 'lucide-react';

/**
 * 文字列内のエスケープされた改行（\n, \\n）やスラッシュ改行（/n）を
 * 正常な改行文字（\n）へ統一正規化する関数。
 * ※ LaTeXの \neq, \nu, \notin などのコマンドを破壊しないよう、\nの直後に英字が続く場合は除外。
 */
export function normalizeLineBreaks(str) {
  if (!str) return '';
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/\/n/g, '\n')
    .replace(/\\\\n/g, '\n')
    .replace(/\\n(?![a-zA-Z])/g, '\n');
}

const MathText = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (text === null || text === undefined || text === '') {
      containerRef.current.innerHTML = '';
      return;
    }

    let targetText = normalizeLineBreaks(String(text).trim());

    // $ も $$ も含まないが、LaTeXのバックスラッシュ記法（\vec, \frac, \text 等）を含む場合、
    // 全体を数式として扱う（複数行テキストを除く）
    if (!targetText.includes('$')) {
      const hasLatex = /\\[a-zA-Z]+|\^|_|\\{/.test(targetText);
      const hasJapanese = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(targetText);
      if (hasLatex && !hasJapanese && !targetText.includes('\n')) {
        targetText = `$$${targetText}$$`;
      }
    }

    const parts = targetText.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);
    containerRef.current.innerHTML = '';

    parts.forEach(part => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim();
        const div = document.createElement('div');
        div.className = "my-2 text-center text-indigo-300 font-mono text-base overflow-x-auto py-1";
        try {
          katex.render(math, div, { displayMode: true, throwOnError: false });
        } catch {
          div.innerText = part;
        }
        containerRef.current.appendChild(div);
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1).trim();
        const span = document.createElement('span');
        span.className = "px-0.5 text-indigo-200 font-medium";
        try {
          katex.render(math, span, { displayMode: false, throwOnError: false });
        } catch {
          span.innerText = part;
        }
        containerRef.current.appendChild(span);
      } else if (part.trim() !== '' || part.includes('\n')) {
        const normalizedPart = normalizeLineBreaks(part);
        const hasRawLatex = /\\[a-zA-Z]+/.test(normalizedPart);
        const hasJapanese = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(normalizedPart);
        if (hasRawLatex && !hasJapanese && !normalizedPart.includes('\n')) {
          const div = document.createElement('div');
          div.className = "my-1 text-center text-indigo-300 font-mono text-base overflow-x-auto py-1";
          try {
            katex.render(normalizedPart.trim(), div, { displayMode: true, throwOnError: false });
            containerRef.current.appendChild(div);
            return;
          } catch {
            // pass
          }
        }

        // 改行（\n）ごとに行分割し、<br /> を確実に挟みながらテキストを追加
        const lines = normalizedPart.split('\n');
        lines.forEach((line, index) => {
          if (line) {
            const span = document.createElement('span');
            span.innerText = line;
            containerRef.current.appendChild(span);
          }
          if (index < lines.length - 1) {
            containerRef.current.appendChild(document.createElement('br'));
          }
        });
      }
    });
  }, [text]);

  return <span ref={containerRef} className="leading-relaxed inline whitespace-pre-line break-words" />;
};

/**
 * 大学入試数学公式集（全219公式）から公式情報を取得・紐付ける関数
 */
export function enrichFormulaWithCollection(formulaInput) {
  if (!formulaInput) return null;
  const name = typeof formulaInput === 'string' ? formulaInput : (formulaInput.name || '');
  const matched = findFormulaInCollection(name);

  if (matched) {
    const rawLatex = matched.latex || formulaInput.latex || "";
    return {
      id: matched.id,
      name: matched.name,
      subject: matched.subject || formulaInput.subject || "数学B",
      category: matched.category || formulaInput.category || "ベクトル",
      desc: matched.latex ? `$$${matched.latex}$$` : normalizeLineBreaks(formulaInput.desc || matched.summary),
      latex: rawLatex,
      summary: normalizeLineBreaks(matched.summary || ""),
      body: normalizeLineBreaks(matched.body || ""),
      isFromCollection: true
    };
  }

  const rawDesc = formulaInput.desc || formulaInput.latex || "";
  const rawLatex = formulaInput.latex || (rawDesc.includes('\\') ? rawDesc : "");
  const formattedDesc = (rawDesc && !rawDesc.includes('$') && rawDesc.includes('\\')) ? `$$${rawDesc}$$` : normalizeLineBreaks(rawDesc);

  const autoBody = (formulaInput.body && formulaInput.body !== rawLatex && !formulaInput.body.startsWith('\\vec'))
    ? normalizeLineBreaks(formulaInput.body)
    : `【公式のポイントと活用法】\n本問の解法において参照された数学公式です。\n数式の条件や等式変形を正しく適用し、未知数の決定や証明を進める重要なステップとなります。`;

  return {
    id: formulaInput.id || `custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name,
    subject: formulaInput.subject || "数学",
    category: formulaInput.category || "公式",
    desc: formattedDesc,
    latex: rawLatex,
    summary: "",
    body: autoBody,
    isFromCollection: false
  };
}

const initialProblems = [
  {
    id: 1,
    title: "整数と素数に関する証明",
    university: "京都大学 改題",
    difficulty: "難関",
    isSample: true,
    goal: "$n$ が素数であることを背理法で証明する（合成数 $n=ab$ とおいて矛盾を導く）",
    question: "$n$ を $2$ 以上の自然数とする。$2^n - 1$ が素数であるとき、$n$ も素数であることを証明せよ。",
    imageUrl: null,
    steps: [
      {
        step: 1,
        title: "手順1：何を求めるのかを明確に把握する",
        badge: "【理解する】最終目的の言語化と方向性",
        content: "【求めるべき結論（ゴール）】\n「$n$ が素数であること」を証明する。\n\n【目指す解法のベクトル】\n「$n$ は素数である」を直接示すのは難しいため、対偶または背理法を用い、『$n$ が合成数 ($n=ab$) であると仮定したとき、$2^n-1$ が合成数になってしまい【仮定：$2^n-1$ は素数】に矛盾する』というゴールを目指して数式を変形していく。"
      },
      {
        step: 2,
        title: "手順2：問題文で与えられたすべての条件を整理する",
        badge: "【集める】前提・数値・制約の箇条書き",
        content: "ゴール（矛盾の導出）に向けて、使える手札（前提条件）を整理する。\n・条件①：$2^n - 1$ は素数である（崩してはいけない前提）\n・否定仮定：$n$ は合成数である（$\\exists a, b \\in \\mathbb{N}, 1 < a < n, 1 < b < n$ を満たし $n = ab$ とおける）"
      },
      {
        step: 3,
        title: "手順3：その条件を数式に変換する",
        badge: "【形にする】文字設定と条件の定式化",
        content: "【変形の目的】$2^n - 1$ が合成数（1とそれ自身以外の約数を持つ）であることを示す式へ変換する。\n\n$n = ab$ を $2^n - 1$ に代入：\n$$2^n - 1 = 2^{ab} - 1 = (2^a)^b - 1$$\nここで $X = 2^a$ とおくと、$X^b - 1$ という代数式に帰着できる。"
      },
      {
        step: 4,
        title: "手順4：整理した式を解答の方向へ変形する",
        badge: "【動かす】ゴール達成への式変形・結論",
        content: "【ゴール直前の変形】因数分解公式 $$X^b - 1 = (X - 1)(X^{b-1} + X^{b-2} + \\dots + 1)$$ を適用する。\n$$2^n - 1 = (2^a - 1)(2^{a(b-1)} + \\dots + 1)$$\n$1 < a < n$ より $1 < 2^a - 1 < 2^n - 1$ となり、$2^n - 1$ は $2^a - 1$ という1より大きい約数を持つ。これは「$2^n - 1$ が素数である」という条件①に矛盾する。\nよって、$n$ は素数である。（証明終）"
      }
    ],
    formulas: [
      enrichFormulaWithCollection({
        name: "背理法",
        subject: "数学Ⅰ",
        category: "論理と集合",
        desc: "命題 $A$ の否定を仮定し、そこから矛盾を導くことで原命題 $A$ が真であると結論する証明方法。"
      }),
      enrichFormulaWithCollection({
        name: "高次式の因数分解公式（xⁿ−1の因数分解）",
        subject: "数学Ⅱ",
        category: "式と証明",
        desc: "$$x^n - 1 = (x - 1)(x^{n-1} + x^{n-2} + \\dots + 1)$$ を用いて $2^n - 1 = (2^a)^b - 1$ を約数分解する。"
      })
    ].filter(Boolean),
    alternativeSolution: "【別解・アプローチ：対偶による証明と合同式（位数）の視点】\n\n1. 対偶による直接証明：\n元の命題「$2^n - 1$ が素数 $\\implies n$ が素数」の対偶は、「$n$ が合成数 $\\implies 2^n - 1$ が合成数」です。\n$n = ab$ ($1 < a < n, 1 < b < n$) とおくと、高次因数分解公式より\n$$2^n - 1 = (2^a - 1)\\left((2^a)^{b-1} + (2^a)^{b-2} + \\dots + 1\\right)$$\nとなり、$1 < 2^a - 1 < 2^n - 1$ より $2^n - 1$ は $2^a - 1$ という真の約数を持ちます。したがって $2^n - 1$ は合成数となり、対偶が真であるため元の命題も真であることが示されます。\n\n2. 発展的視点（合同式と位数）：\n素数 $p$ が $2^n - 1$ の約数であるとき、$2^n \\equiv 1 \\pmod p$ が成り立ちます。フェルマーの小定理より $2^{p-1} \\equiv 1 \\pmod p$ であり、$\\text{mod } p$ における $2$ の位数 $d$ は $n$ の約数となります。位数論の観点からも、指数 $n$ が素数であることの必然性が深く理解できます。",
    similarProblems: [
      {
        title: "フェルマー数に関する類似問題（対の重要テーマ）",
        question: "$n$ を自然数とする。$2^n + 1$ が素数であるとき、$n$ は $2$ の累乗（すなわちある非負整数 $k$ を用いて $n = 2^k$）であることを証明せよ。",
        hint: "【理解する】$n$ が2の累乗でない（奇数の因数をもつ）と仮定して矛盾を導く方針を立てる。\n【集める】$n = a \\cdot b$ ($a \\ge 1, b \\ge 3, b$ は奇数) とおく。\n【形にする】$2^n + 1 = (2^a)^b + 1$ と変形し、奇数乗和の因数分解公式 $X^b + 1 = (X+1)(X^{b-1} - X^{b-2} + \\dots + 1)$ の適用を準備する。\n【動かす】$1 < 2^a + 1 < 2^n + 1$ より $2^n + 1$ が約数を持つことを示し、素数である前提に矛盾させる。",
        approach: "背理法を用いる。$n$ が $2$ の累乗でないと仮定すると、$n$ は $3$ 以上の奇数の約数 $b$ をもつので、$n = a \\cdot b$ ($a \\ge 1, b \\ge 3, b$ は奇数) と書ける。\nここで $X = 2^a$ とおくと、$b$ が奇数であることから次の因数分解が成り立つ：\n$$2^n + 1 = (2^a)^b + 1 = (2^a + 1)\\left((2^a)^{b-1} - (2^a)^{b-2} + \\dots - 2^a + 1\\right)$$\n$a \\ge 1$ かつ $b \\ge 3$ より、$1 < 2^a + 1 < 2^n + 1$ であり、右辺の2つの因数はともに $1$ より大きい整数である。\nこれは $2^n + 1$ が素数であることに矛盾する。\nよって、$n$ は $2$ の累乗である。（証明終）"
      },
      {
        title: "複2次式の因数分解を用いた素数判定",
        question: "自然数 $n$ に対し、$n^4 + 4$ が素数となるような $n$ をすべて求めよ。",
        hint: "【理解する】$n^4 + 4$ が素数となる自然数 $n$ の値を決定する。\n【集める】$n \\ge 1$（自然数）。$n^4 + 4$ を積の形に変形できないか考える。\n【形にする】複2次式の変形により、$n^4 + 4 = (n^2 + 2)^2 - (2n)^2 = (n^2 + 2n + 2)(n^2 - 2n + 2)$ へ因数分解する。\n【動かす】2つの因数の大小を評価し、素数となるためには小さい方の因数が $1$ でなければならない条件から $n$ を求める。",
        approach: "$n^4 + 4 = (n^2 + 2)^2 - (2n)^2 = (n^2 + 2n + 2)(n^2 - 2n + 2)$ と因数分解できる。\n$n \\ge 1$ のとき：\n$$n^2 + 2n + 2 > n^2 - 2n + 2 = (n-1)^2 + 1 \\ge 1$$\n積が素数となるためには、小さい方の因数が $1$ でなければならない。\n$$(n-1)^2 + 1 = 1 \\iff (n-1)^2 = 0 \\iff n = 1$$\n$n = 1$ のとき $n^4 + 4 = 1 + 4 = 5$ となり、これは素数である。\nしたがって、求める自然数は $n = 1$ のみである。"
      }
    ]
  }
];

// 万が一の画面クラッシュを防ぐエラー境界コンポーネント
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("FourmulaSteps ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF9F4] text-slate-800 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4 text-2xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">画面の読み込みでエラーが発生しました</h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
            以前のバージョンのキャッシュが残っている可能性があります。下のボタンから最新版へ更新してください。
          </p>
          <div className="bg-white p-4 rounded-xl border border-rose-200 text-xs text-rose-700 font-mono mb-6 max-w-lg text-left overflow-x-auto shadow-2xs">
            {this.state.error?.message || String(this.state.error)}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                window.location.href = window.location.pathname + '?t=' + Date.now() + '#app';
                window.location.reload();
              }}
              className="px-5 py-2.5 bg-[#D9532F] hover:bg-[#C84826] text-white font-bold rounded-xl text-sm transition shadow-xs cursor-pointer"
            >
              アプリを再読み込み
            </button>
            <button
              onClick={() => {
                window.location.href = window.location.pathname + '?t=' + Date.now();
                window.location.reload();
              }}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 font-bold text-slate-700 rounded-xl text-sm border border-slate-200 transition cursor-pointer shadow-2xs"
            >
              トップへ戻る
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function FourmulaStepsAppInner() {
  const [viewMode, setViewMode] = useState(() => {
    // ネイティブアプリ（iOS/Android）の場合は常に直接アプリ画面を開く
    if (Capacitor.isNativePlatform()) {
      return 'app';
    }
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash === '#app' || search.includes('view=app') || hash.includes('app')) {
        return 'app';
      }
    }
    return 'lp';
  });
  const [activeTab, setActiveTab] = useState('solve');
  const [problems, setProblems] = useState(initialProblems);
  const [selectedProblemId, setSelectedProblemId] = useState(1);
  const [openStep, setOpenStep] = useState(1);
  const [showAlt, setShowAlt] = useState(false);
  const [openSimilarProblems, setOpenSimilarProblems] = useState([]);
  const [inputMode, setInputMode] = useState('image');
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePayload, setImagePayload] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // オンボーディング・ガイド
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fourmulasteps_onboarded_v2') !== 'true';
    }
    return false;
  });

  // 法的表記モーダル用ステート
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [legalTab, setLegalTab] = useState('terms');

  // 無料枠上限案内モーダル
  const [showLimitModal, setShowLimitModal] = useState(false);

  // 公式集連携用ステート
  const [expandedFormulaIds, setExpandedFormulaIds] = useState([]);
  const [librarySubjectFilter, setLibrarySubjectFilter] = useState('all');
  const [librarySearchQuery, setLibrarySearchQuery] = useState('');
  const [selectedLibraryFormula, setSelectedLibraryFormula] = useState(null);
  const [expandedLibraryFormulaId, setExpandedLibraryFormulaId] = useState(null);

  const toggleFormulaExpand = (idx) => {
    setExpandedFormulaIds(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const openFormulaInLibrary = (formula) => {
    const matched = findFormulaInCollection(formula.name) || formula;
    setSelectedLibraryFormula(matched);
  };

  const filteredLibraryFormulas = useMemo(() => {
    return MATH_FORMULAS.filter(formula => {
      const matchSubject = librarySubjectFilter === 'all' || formula.subject === librarySubjectFilter;
      if (!matchSubject) return false;
      if (!librarySearchQuery.trim()) return true;
      const q = librarySearchQuery.toLowerCase();
      return (
        formula.name.toLowerCase().includes(q) ||
        formula.category.toLowerCase().includes(q) ||
        formula.latex.toLowerCase().includes(q) ||
        formula.summary.toLowerCase().includes(q)
      );
    });
  }, [librarySubjectFilter, librarySearchQuery]);

  const sanitizeApiKey = (key) => {
    if (!key) return '';
    // 全角英数を半角に変換
    let s = key.replace(/[！-～]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
    // 全角スペースや不可視Unicode、制御文字を除去し、ASCII印字可能文字(0x21-0x7E)のみ残す
    return s.replace(/[^\x21-\x7E]/g, '');
  };

  const getEffectiveApiKey = () => {
    // 1. src/config.js または .env で設定された埋め込みキーを最優先
    let key = GEMINI_API_KEY;
    // 2. 過去にブラウザに保存されたキーをフォールバックとして参照
    if (!key) {
      try {
        key = localStorage.getItem('fourmulasteps_gemini_api_key') || '';
      } catch {}
    }
    return sanitizeApiKey(key);
  };

  const [userLogs, setUserLogs] = useState({
    1: { 1: 'ok', 2: 'ok', 3: 'stuck', 4: 'stuck' }
  });

  const [userProfile, setUserProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [monthlyUsageCount, setMonthlyUsageCount] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeTargetPlan, setUpgradeTargetPlan] = useState('premium');

  const [paymentNotice, setPaymentNotice] = useState(null); // { message, plan }

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    try {
      localStorage.setItem('fourmulasteps_onboarded_v2', 'true');
    } catch (e) {
      // ignore
    }
  };

  const openLegalModalWithTab = (tab = 'terms') => {
    setLegalTab(tab);
    setShowLegalModal(true);
  };

  const handleDeleteProblem = async (problemId, e) => {
    if (e) e.stopPropagation();
    if (problems.length <= 1) {
      alert('少なくとも1問の問題を残しておく必要があります。');
      return;
    }
    const targetProblem = problems.find(p => p.id === problemId);
    const title = targetProblem?.title || 'この問題';
    if (!window.confirm(`「${title}」を一覧から削除してもよろしいですか？`)) {
      return;
    }

    const nextProblems = problems.filter(p => p.id !== problemId);
    setProblems(nextProblems);

    if (selectedProblemId === problemId) {
      setSelectedProblemId(nextProblems[0].id);
    }

    if (isSupabaseConfigured && targetProblem?.supabase_id) {
      try {
        await supabase.from('math_problems').delete().eq('id', targetProblem.supabase_id);
      } catch (err) {
        console.warn('Failed to delete problem from Supabase:', err);
      }
    }
  };

  // 認証状態の監視
  useEffect(() => {
    getCurrentUser().then(user => {
      if (user) setCurrentUser(user);
    });

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setCurrentUser(session?.user || null);
        if (session?.user) {
          fetchUserProfile().then(p => p && setUserProfile(p));
          fetchMonthlyUsageCount().then(c => setMonthlyUsageCount(c));
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  // 決済完了（payment=success）の検出
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      setViewMode('app');
      window.location.hash = '#app';
      setPaymentNotice('有料プランのお支払いが完了しました！アプリをお楽しみください。');

      // WebhookによるSupabaseプロファイル反映をリフレッシュ（即時＋2秒後）
      fetchUserProfile().then(p => p && setUserProfile(p));
      fetchMonthlyUsageCount().then(c => setMonthlyUsageCount(c));
      const timer = setTimeout(() => {
        fetchUserProfile().then(p => p && setUserProfile(p));
      }, 2500);

      // URLクエリをクリーンアップ
      try {
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
      } catch (e) {
        // ignore
      }

      return () => clearTimeout(timer);
    }
  }, []);

  // 問題データ、ステップログ、プロファイル、当月利用数を同期・ロード
  useEffect(() => {
    let isMounted = true;
    const loadInitialData = async () => {
      try {
        const [remoteProblems, remoteLogs, profile, usageCount] = await Promise.all([
          fetchProblemsFromSupabase(),
          fetchStepLogsFromSupabase(),
          fetchUserProfile(),
          fetchMonthlyUsageCount()
        ]);
        if (!isMounted) return;

        if (remoteProblems && remoteProblems.length > 0) {
          setProblems(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newOnes = remoteProblems.filter(p => !existingIds.has(p.id));
            return [...newOnes, ...prev];
          });
        }
        if (remoteLogs && Object.keys(remoteLogs).length > 0) {
          setUserLogs(prev => ({
            ...prev,
            ...remoteLogs
          }));
        }
        if (profile) setUserProfile(profile);
        if (typeof usageCount === 'number') setMonthlyUsageCount(usageCount);
      } catch (err) {
        console.warn('Initial data load error:', err);
      }
    };

    loadInitialData();
    return () => { isMounted = false; };
  }, []);

  // URLハッシュ（#app / #lp）の監視
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window === 'undefined') return;
      if (window.location.hash === '#app') {
        setViewMode('app');
      } else if (window.location.hash === '#lp' || window.location.hash === '') {
        setViewMode('lp');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentProblem = problems.find(p => p.id === selectedProblemId) || problems[0];

  const handleStepLog = (problemId, stepNumber, status) => {
    setUserLogs(prev => ({
      ...prev,
      [problemId]: {
        ...(prev[problemId] || {}),
        [stepNumber]: status
      }
    }));
    if (isSupabaseConfigured) {
      saveStepLogToSupabase(problemId, stepNumber, status);
      const targetProb = problems.find(p => p.id === problemId);
      const formulaName = targetProb?.formulas?.[0]?.name || null;
      recordWeaknessLog({
        problemId,
        stepNumber,
        status,
        category: targetProb?.university || '大学入試',
        formulaName
      });
    }
  };

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('画像ファイル（PNG、JPEG、HEIC、WebP等）を選択してください。');
      return;
    }
    setErrorMsg('');
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      const base64Data = result.split(',')[1];
      setSelectedImage(result);
      setImagePayload({
        base64: base64Data,
        mimeType: file.type || 'image/jpeg'
      });
      setInputMode('image');
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handlePaste = (e) => {
      if (e.clipboardData && e.clipboardData.items) {
        for (const item of e.clipboardData.items) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
              processImageFile(file);
              setActiveTab('scan');
              break;
            }
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleTakePhoto = async () => {
    try {
      setErrorMsg('');
      if (Capacitor.isNativePlatform()) {
        const photo = await CapCamera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera,
        });

        if (photo && photo.base64String) {
          const mimeType = photo.format ? `image/${photo.format}` : 'image/jpeg';
          const previewUrl = `data:${mimeType};base64,${photo.base64String}`;
          setSelectedImage(previewUrl);
          setImagePayload({
            base64: photo.base64String,
            mimeType: mimeType
          });
          setInputMode('image');
          return;
        }
      }
    } catch (err) {
      console.warn('Capacitor camera capture skipped or unavailable, using native file input:', err);
    }
    // WebブラウザまたはCapacitor非対応時の確実なカメラ呼び出しフォールバック
    cameraInputRef.current?.click();
  };

  const handlePickPhoto = async () => {
    try {
      setErrorMsg('');
      if (Capacitor.isNativePlatform()) {
        const photo = await CapCamera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source: CameraSource.Photos,
        });

        if (photo && photo.base64String) {
          const mimeType = photo.format ? `image/${photo.format}` : 'image/jpeg';
          const previewUrl = `data:${mimeType};base64,${photo.base64String}`;
          setSelectedImage(previewUrl);
          setImagePayload({
            base64: photo.base64String,
            mimeType: mimeType
          });
          setInputMode('image');
          return;
        }
      }
    } catch (err) {
      console.warn('Capacitor photo pick skipped or unavailable, using native file input:', err);
    }
    // WebブラウザまたはCapacitor非対応時の確実なアルバム・ファイル選択フォールバック
    fileInputRef.current?.click();
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePayload(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    const plan = userProfile?.plan || 'free';
    const monthlyLimit = plan === 'premium' ? 300 : plan === 'standard' ? 100 : 3;

    if (monthlyUsageCount >= monthlyLimit) {
      setUpgradeTargetPlan(plan === 'standard' ? 'premium' : 'standard');
      setShowUpgradeModal(true);
      setErrorMsg(`今月のAI解析上限（${monthlyLimit}問）に達しました。プレミアムプランにアップグレードすると月300問までご利用いただけます。`);
      return;
    }

    const cleanApiKey = getEffectiveApiKey();
    if (!cleanApiKey) {
      setErrorMsg('AI解析に必要な API キーが設定されていません。src/config.js または .env ファイルに API キーを記述してください。');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg('');

    try {
      let rawText = '';
      let serverData = null;
      let promptTokens = 0;
      let candidatesTokens = 0;
      const startTime = Date.now();

      // 1. Vercel Serverless Function (/api/analyze) の呼び出しを優先試行
      try {
        const apiRes = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: inputMode,
            text: inputText,
            imageBase64: imagePayload?.base64,
            imageMimeType: imagePayload?.mimeType
          })
        });
        if (apiRes.ok) {
          const apiJson = await apiRes.json();
          if (apiJson.data && typeof apiJson.data === 'object') {
            serverData = apiJson.data;
          } else if (apiJson.rawText) {
            rawText = apiJson.rawText;
          }
          if (apiJson.usage) {
            promptTokens = apiJson.usage.promptTokens || 0;
            candidatesTokens = apiJson.usage.candidatesTokens || 0;
          }
        }
      } catch {
        // Vercel環境外またはローカル時はクライアントSDKフォールバックへ
      }

      // 2. サーバーレス関数で未取得の場合はクライアントSDKで直接解析
      if (!serverData && !rawText) {
        const ai = new GoogleGenAI({ apiKey: cleanApiKey });

        let contents = [];
        if (inputMode === 'image' && imagePayload) {
          contents = [
            FOURMULA_STEPS_USER_PROMPT,
            {
              inlineData: {
                data: imagePayload.base64,
                mimeType: imagePayload.mimeType
              }
            }
          ];
        } else {
          contents = [
            `【問題文】\n${inputText}`,
            FOURMULA_STEPS_USER_PROMPT
          ];
        }

        const response = await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: contents,
          config: {
            systemInstruction: FOURMULA_STEPS_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: FOURMULA_STEPS_RESPONSE_SCHEMA,
            temperature: 0.2
          }
        });

        rawText = response.text || '';
        const meta = response.usageMetadata || {};
        promptTokens = meta.promptTokenCount || 0;
        candidatesTokens = meta.candidatesTokenCount || 0;
      }
      const latencyMs = Date.now() - startTime;

      rawText = rawText.trim();
      if (rawText.startsWith('```')) {
        rawText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
      }

      // 多層フォールバック機構を備えたJSONパーサー
      const parseProblemData = (text) => {
        // 1. 標準パース
        try {
          return JSON.parse(text);
        } catch {}

        // 2. LaTeX不正エスケープの修復パース
        try {
          const repaired = text.replace(/\\(?:(u[0-9a-fA-F]{4})|(["\\/bfnrt])|([\s\S]))/g, (match, unicode, valid, other) => {
            if (unicode || valid) return match;
            return '\\\\' + (other || '');
          });
          return JSON.parse(repaired);
        } catch {}

        // 3. バックスラッシュ一括二重化パース
        try {
          const sanitized = text
            .replace(/\r\n/g, '\n')
            .replace(/\\(?!["])/g, '\\\\');
          return JSON.parse(sanitized);
        } catch {}

        // 4. 正規表現によるフィールド個別抽出（万能フォールバック）
        const extractField = (fieldName) => {
          const reg = new RegExp(`"${fieldName}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's');
          const match = text.match(reg);
          if (match) {
            return normalizeLineBreaks(
              match[1]
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '\\')
            );
          }
          const regLoose = new RegExp(`"${fieldName}"\\s*:\\s*"([\\s\\S]*?)"(?=\\s*,|\\s*})`, 'm');
          const matchLoose = text.match(regLoose);
          if (matchLoose) {
            return normalizeLineBreaks(matchLoose[1].replace(/\\"/g, '"'));
          }
          return '';
        };

        const result = {
          title: extractField('title') || 'AI解析問題',
          goalSummary: extractField('goalSummary') || '問題の最終目的の解明',
          questionText: extractField('questionText') || '（数式解析）',
          step1: extractField('step1'),
          step2: extractField('step2'),
          step3: extractField('step3'),
          step4: extractField('step4'),
          formulas: [],
          alternative: extractField('alternative') || '別解なし',
          similarProblems: []
        };

        try {
          const formulasMatch = text.match(/"formulas"\s*:\s*(\[[^\]]*\])/s);
          if (formulasMatch) {
            const fixedFormulas = formulasMatch[1].replace(/\\(?!["])/g, '\\\\');
            result.formulas = JSON.parse(fixedFormulas);
          }
        } catch {
          result.formulas = [];
        }

        // 類似問題（2問）の抽出（ブラケット深度追跡 + 個別オブジェクト抽出）
        try {
          const simIdx = text.indexOf('"similarProblems"');
          if (simIdx !== -1) {
            const startBracket = text.indexOf('[', simIdx);
            if (startBracket !== -1) {
              let depth = 0;
              let endBracket = -1;
              let inString = false;
              let escape = false;
              for (let i = startBracket; i < text.length; i++) {
                const c = text[i];
                if (escape) {
                  escape = false;
                  continue;
                }
                if (c === '\\') {
                  escape = true;
                  continue;
                }
                if (c === '"') {
                  inString = !inString;
                  continue;
                }
                if (!inString) {
                  if (c === '[') depth++;
                  else if (c === ']') {
                    depth--;
                    if (depth === 0) {
                      endBracket = i;
                      break;
                    }
                  }
                }
              }

              if (endBracket !== -1) {
                const arrayString = text.substring(startBracket, endBracket + 1);
                try {
                  const sanitizedArray = arrayString
                    .replace(/\r\n/g, '\n')
                    .replace(/\\(?!["])/g, '\\\\');
                  const parsed = JSON.parse(sanitizedArray);
                  if (Array.isArray(parsed) && parsed.length > 0) {
                    result.similarProblems = parsed;
                  }
                } catch {
                  const objectMatches = arrayString.match(/\{[\s\S]*?\}(?=\s*,\s*\{|\s*\])/g);
                  if (objectMatches && objectMatches.length > 0) {
                    const extracted = objectMatches.map(objStr => {
                      const getProp = (prop) => {
                        const m = objStr.match(new RegExp(`"${prop}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's'));
                        return m ? normalizeLineBreaks(m[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\')) : '';
                      };
                      return {
                        title: getProp('title') || '類似問題',
                        question: getProp('question') || '',
                        hint: getProp('hint') || '',
                        approach: getProp('approach') || ''
                      };
                    }).filter(item => item.question);
                    if (extracted.length > 0) {
                      result.similarProblems = extracted;
                    }
                  }
                }
              }
            }
          }
        } catch {
          result.similarProblems = [];
        }

        return result;
      };

      // 全テキストフィールドを再帰的にサニタイズ（/n や \n を正規化）
      const sanitizeAllStrings = (obj) => {
        if (!obj || typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) {
          return obj.map(item => sanitizeAllStrings(item));
        }
        const cleaned = {};
        for (const [key, val] of Object.entries(obj)) {
          if (typeof val === 'string') {
            cleaned[key] = normalizeLineBreaks(val);
          } else if (typeof val === 'object' && val !== null) {
            cleaned[key] = sanitizeAllStrings(val);
          } else {
            cleaned[key] = val;
          }
        }
        return cleaned;
      };

      const rawParsedData = serverData || parseProblemData(rawText);
      const data = sanitizeAllStrings(rawParsedData);

      // 類似問題が2問未満だった場合の思考定着フォールバック
      let finalSimilarProblems = (data.similarProblems && Array.isArray(data.similarProblems))
        ? [...data.similarProblems]
        : [];

      if (finalSimilarProblems.length === 0) {
        finalSimilarProblems = [
          {
            title: `${data.title || "本問"}の思考定着 類題1（同型・応用）`,
            question: `本問「${data.title || "解析問題"}」で用いた思考プロセス（fourmulasteps）を適用する類似問題：\n本問の条件・構造を変形した問題に取り組み、同様の思考手順（理解・収集・定式化・式変形）を用いて結論を導出せよ。`,
            hint: "【理解する】何を示すべきかゴールを明確にする。\n【集める】前提条件を箇条書きにする。\n【形にする】文字でおいて数式に変換する。\n【動かす】結論に向けて式を変形する。",
            approach: "本問の手順1〜4で用いた解法体系および公式と同様の論理展開を適用して解きます。"
          },
          {
            title: `${data.title || "本問"}の思考定着 類題2（発展・検算）`,
            question: `本問の別解アプローチまたは逆の命題について考察せよ。\n異なる切り口から同一の結論に至る道筋を立てよ。`,
            hint: "対偶または別解アプローチを用いて、別角度から条件を式変形してください。",
            approach: "本問の「別解・検算アプローチ」で提示された方針を参考に、式変形・確認を行います。"
          }
        ];
      } else if (finalSimilarProblems.length === 1) {
        finalSimilarProblems.push({
          title: `${data.title || "本問"}の思考定着 類題2（発展・検算）`,
          question: `本問の別解アプローチまたは逆の命題について考察せよ。\n異なる切り口から同一の結論に至る道筋を立てよ。`,
          hint: "対偶または別解アプローチを用いて、別角度から条件を式変形してください。",
          approach: "本問の「別解・検算アプローチ」で提示された方針を参考に、式変形・確認を行います。"
        });
      }


      const newId = Date.now();
      const newProblem = {
        id: newId,
        title: data.title || "AI解析問題",
        university: "ユーザー解析問題",
        difficulty: "AI解析",
        goal: data.goalSummary || "問題の最終目的の解明",
        question: data.questionText || inputText || "（画像の解法）",
        imageUrl: selectedImage,
        steps: [
          { 
            step: 1, 
            title: "手順1：何を求めるのかを明確に把握する", 
            badge: "【理解する】最終目的の言語化と方向性", 
            content: data.step1 || "" 
          },
          { 
            step: 2, 
            title: "手順2：問題文で与えられたすべての条件を整理する", 
            badge: "【集める】前提・数値・制約の箇条書き", 
            content: data.step2 || "" 
          },
          { 
            step: 3, 
            title: "手順3：その条件を数式に変換する", 
            badge: "【形にする】文字設定と条件の定式化", 
            content: data.step3 || "" 
          },
          { 
            step: 4, 
            title: "手順4：整理した式を解答の方向へ変形する", 
            badge: "【動かす】ゴール達成に向けた式変形・結論", 
            content: data.step4 || "" 
          }
        ],
        formulas: (data.formulas && Array.isArray(data.formulas) && data.formulas.length > 0)
          ? data.formulas.map(enrichFormulaWithCollection).filter(Boolean)
          : [],
        alternativeSolution: data.alternative || "別解なし",
        similarProblems: finalSimilarProblems
      };

      setProblems([newProblem, ...problems]);
      setSelectedProblemId(newId);

      // Supabaseが有効な場合はクラウドへ保存
      if (isSupabaseConfigured) {
        saveProblemToSupabase(newProblem);
      }

      // AI使用履歴・トークン消費・推定コストを記録
      recordAiUsageLog({
        problemId: newId,
        model: GEMINI_MODEL,
        inputType: inputMode,
        promptTokens,
        candidatesTokens,
        latencyMs,
        status: 'success'
      }).then(() => {
        fetchUserProfile().then(p => p && setUserProfile(p));
        setMonthlyUsageCount(prev => prev + 1);
      });

      setExpandedFormulaIds([]);
      setOpenSimilarProblems([0, 1]);
      setIsAnalyzing(false);
      setActiveTab('solve');
      setShowAlt(true);
      setInputText('');
      setSelectedImage(null);
      setImagePayload(null);
    } catch (err) {
      console.error(err);
      setErrorMsg(`解析エラー: ${err.message || 'APIキーまたは画像形式を確認してください。'}`);
      setIsAnalyzing(false);
    }
  };

  const STEP_THEMES = {
    1: {
      name: '理解する',
      sub: '最終目的の言語化と方向性',
      border: 'border-[#EBE4D8]',
      borderActive: 'border-slate-300',
      bgActive: 'bg-[#FAF9F5]',
      bgInactive: 'bg-white',
      numBgActive: 'bg-slate-900 text-white',
      numBgInactive: 'bg-slate-100 text-slate-700 border border-slate-200',
      badge: 'bg-orange-100/80 text-[#D9532F] border-orange-200/60',
      textAccent: 'text-[#D9532F]',
    },
    2: {
      name: '集める',
      sub: '前提・数値・制約の整理',
      border: 'border-[#EBE4D8]',
      borderActive: 'border-slate-300',
      bgActive: 'bg-[#FAF9F5]',
      bgInactive: 'bg-white',
      numBgActive: 'bg-slate-900 text-white',
      numBgInactive: 'bg-slate-100 text-slate-700 border border-slate-200',
      badge: 'bg-sky-100/80 text-sky-800 border-sky-200/60',
      textAccent: 'text-sky-700',
    },
    3: {
      name: '形にする',
      sub: '文字設定と条件の定式化',
      border: 'border-[#EBE4D8]',
      borderActive: 'border-slate-300',
      bgActive: 'bg-[#FAF9F5]',
      bgInactive: 'bg-white',
      numBgActive: 'bg-slate-900 text-white',
      numBgInactive: 'bg-slate-100 text-slate-700 border border-slate-200',
      badge: 'bg-amber-100/80 text-amber-800 border-amber-200/60',
      textAccent: 'text-amber-700',
    },
    4: {
      name: '動かす',
      sub: 'ゴール達成への式変形・結論',
      border: 'border-[#EBE4D8]',
      borderActive: 'border-slate-300',
      bgActive: 'bg-[#FAF9F5]',
      bgInactive: 'bg-white',
      numBgActive: 'bg-slate-900 text-white',
      numBgInactive: 'bg-slate-100 text-slate-700 border border-slate-200',
      badge: 'bg-emerald-100/80 text-emerald-800 border-emerald-200/60',
      textAccent: 'text-emerald-700',
    },
  };

  const calculateAnalysis = () => {
    const stats = {
      1: { ok: 0, hint: 0, stuck: 0, total: 0 },
      2: { ok: 0, hint: 0, stuck: 0, total: 0 },
      3: { ok: 0, hint: 0, stuck: 0, total: 0 },
      4: { ok: 0, hint: 0, stuck: 0, total: 0 },
    };

    Object.values(userLogs).forEach(log => {
      [1, 2, 3, 4].forEach(s => {
        if (log[s] === 'ok') {
          stats[s].ok += 1;
          stats[s].total += 1;
        } else if (log[s] === 'hint') {
          stats[s].hint += 1;
          stats[s].total += 1;
        } else if (log[s] === 'stuck') {
          stats[s].stuck += 1;
          stats[s].total += 1;
        }
      });
    });

    return stats;
  };

  const analysisStats = calculateAnalysis();

  if (viewMode === 'lp') {
    return (
      <LandingPage
        user={currentUser}
        onLaunchApp={(authUser) => {
          if (authUser) setCurrentUser(authUser);
          setViewMode('app');
          if (typeof window !== 'undefined') {
            window.location.hash = '#app';
            window.scrollTo(0, 0);
          }
        }}
        onOpenFormulas={() => {
          setViewMode('app');
          setActiveTab('formulas');
          if (typeof window !== 'undefined') {
            window.location.hash = '#app';
            window.scrollTo(0, 0);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-slate-800 font-sans pb-24">
      {/* アプリトップヘッダー（LPと明確に識別できるスレートネイビーのツールバー） */}
      <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md mb-6">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 space-y-3">
          {/* 上段: ロゴ・LP戻るボタン & ユーザー情報 */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setViewMode('lp');
                  if (typeof window !== 'undefined') {
                    window.location.hash = '#lp';
                    window.scrollTo(0, 0);
                  }
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition flex items-center gap-1.5 shadow-2xs shrink-0 cursor-pointer"
                title="公式紹介LPページへ戻る"
              >
                <span>←</span>
                <span>公式LPへ</span>
              </button>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#D9532F] text-white font-black px-2 py-0.5 rounded text-xs sm:text-sm tracking-wider shrink-0">4STEPS</span>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight shrink-0">
                    fourmulasteps
                  </h1>
                  {isSupabaseConfigured && (
                    <span 
                      title="学習履歴や登録問題が安全にクラウドへ自動保存されています"
                      className="text-[10px] text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-medium shrink-0 whitespace-nowrap cursor-help"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      クラウド同期中
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">高校数学 4ステップ思考法プラットフォーム（初見問題が解ける再現プロセス）</p>
              </div>
            </div>

            {/* ログインユーザー情報・ログアウト */}
            {currentUser?.email ? (
              <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs shrink-0 whitespace-nowrap shadow-2xs">
                <button
                  onClick={() => setActiveTab('mypage')}
                  className="flex items-center gap-2 text-left hover:opacity-80 transition cursor-pointer"
                  title="マイページを開く"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span className="text-slate-200 font-semibold max-w-[140px] sm:max-w-[200px] truncate">
                    {currentUser.user_metadata?.full_name || currentUser.email.split('@')[0]}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 border ${
                    userProfile?.plan === 'premium' 
                      ? 'bg-orange-500/20 text-orange-300 border-orange-500/40' 
                      : userProfile?.plan === 'standard' 
                      ? 'bg-slate-700 text-slate-200 border-slate-600' 
                      : 'bg-slate-700/80 text-slate-300 border-slate-600'
                  }`}>
                    {userProfile?.plan === 'premium' ? 'プレミアム会員' : userProfile?.plan === 'standard' ? '一般会員' : '無料体験会員'}
                  </span>
                </button>
                <button
                  onClick={async () => {
                    await signOutUser();
                    setCurrentUser(null);
                    setUserProfile(null);
                    setViewMode('lp');
                  }}
                  title="ログアウトしてLPに戻る"
                  className="text-slate-400 hover:text-rose-400 p-1 ml-0.5 rounded hover:bg-slate-700/60 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}
          </div>

          {/* 下段: ナビゲーションタブ */}
          <div className="flex items-center justify-between bg-slate-800/90 p-1.5 rounded-xl border border-slate-700/80 text-xs sm:text-sm flex-wrap gap-1.5 shadow-inner">
            <div className="flex items-center gap-1 flex-wrap">
              <button
                onClick={() => setActiveTab('solve')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  activeTab === 'solve' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                演習・解説
              </button>
              <button
                onClick={() => setActiveTab('similar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  activeTab === 'similar' ? 'bg-emerald-500 text-white font-bold shadow-xs' : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                類似問題
              </button>
              <button
                onClick={() => setActiveTab('formulas')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  activeTab === 'formulas' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <Library className="w-4 h-4 text-slate-400" />
                公式集 ({MATH_FORMULAS.length})
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  activeTab === 'analysis' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <BarChart2 className="w-4 h-4 text-slate-400" />
                弱点分析
              </button>
              <button
                onClick={() => setActiveTab('mypage')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  activeTab === 'mypage' ? 'bg-[#D9532F] text-white font-bold shadow-xs' : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <User className="w-4 h-4 text-orange-200" />
                マイページ
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowOnboarding(true)}
                className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-700/60 transition flex items-center gap-1 cursor-pointer"
                title="使い方スタートガイドを表示"
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">ガイド</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('scan');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shadow-xs ${
                  activeTab === 'scan'
                    ? 'bg-[#C84826] text-white ring-2 ring-orange-200'
                    : 'bg-[#D9532F] hover:bg-[#C84826] text-white shadow'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>新しい問題を解析</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 space-y-6">
        {/* 決済成功ウェルカムバナー */}
        {paymentNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 shadow-xs flex items-center justify-between gap-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{paymentNotice}</p>
                <p className="text-xs text-slate-600">
                  会員ステータス：{userProfile?.plan === 'premium' ? 'プレミアム会員（月300問）' : '一般会員（月100問）'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setPaymentNotice(null)}
              className="text-xs px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg transition cursor-pointer"
            >
              閉じる
            </button>
          </div>
        )}

        {activeTab === 'solve' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">

              {/* 問題入力クイックアクションバナー */}
              <div className="bg-white border border-[#E2DBD0] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-[#D9532F] border border-orange-100 flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-[#D9532F]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">問題を提示</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      問題用紙の撮影、保存画像、またはテキスト直接入力から即座に分解・解説します
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      setInputMode('image');
                      setActiveTab('scan');
                      setTimeout(() => handleTakePhoto(), 100);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#D9532F] hover:bg-[#C84826] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>撮影して解析</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputMode('image');
                      setActiveTab('scan');
                      setTimeout(() => handlePickPhoto(), 100);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium rounded-xl transition cursor-pointer shadow-2xs"
                  >
                    <ImageIcon className="w-4 h-4 text-slate-500" />
                    <span>画像選択</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputMode('text');
                      setActiveTab('scan');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-slate-600" />
                    <span>テキスト入力</span>
                  </button>
                </div>
              </div>

              {/* 問題文 */}
              <div className="bg-white rounded-2xl p-6 border border-[#DDD6CA] shadow-xs space-y-4">
                {/* 体験サンプル問題の案内バナー */}
                {(currentProblem.isSample || currentProblem.id === 1) && (
                  <div className="p-3 bg-[#FAF9F5] border border-orange-200/80 rounded-xl flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#D9532F] shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold text-[#D9532F]">【体験サンプル問題】</span>
                      4ステップ思考法（理解・集める・形にする・動かす）を体感していただくための見本です。自力で解く必要はありませんので、下の手順アコーディオンを開いて思考の流れをご確認ください。
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded bg-orange-50 text-[#D9532F] border border-orange-200 font-bold">
                      {currentProblem.difficulty || "標準"}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      {currentProblem.university || "大学入試"}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    {currentProblem.title}
                  </h2>
                </div>

                <div className="text-sm text-slate-800 leading-relaxed font-sans bg-[#FAF9F5] p-5 rounded-xl border border-[#EBE4D8]">
                  <MathText text={currentProblem.question} />
                  {currentProblem.imageUrl && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-2">
                        <img 
                          src={currentProblem.imageUrl} 
                          alt="添付問題画像" 
                          className="max-h-96 mx-auto object-contain rounded"
                        />
                      </div>
                    </div>
                  )}

                  {/* 思考定着 類似問題（2問）へのクイックアクセスバナー */}
                  <div className="mt-4 pt-3 border-t border-[#EBE4D8] flex items-center justify-between gap-3 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/80 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs text-emerald-900 font-medium">
                        本問の思考手順・公式を定着させる類似問題（2問）が用意されています
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('similar')}
                      className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-lg shadow-xs transition cursor-pointer flex items-center gap-1"
                    >
                      <span>類題２問へ</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 4ステップアコーディオン */}
              <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-[#DDD6CA] shadow-xs space-y-4">
                <div className="flex flex-col gap-3 pb-3 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D9532F]"></span>
                      fourmulasteps 思考プロセス
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">各ステップの自力再現度を記録</span>
                  </div>

                  {/* 4ステップ凡例とクリックナビゲーション */}
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>思考プロセス 4つの手順（クリックで開閉）</span>
                      <span className="text-[#D9532F] font-semibold">現在Step {openStep || 1}を閲覧中</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium flex-wrap bg-slate-100 p-1.5 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setOpenStep(1)}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                          openStep === 1
                            ? 'bg-slate-900 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        }`}
                      >
                        <span>① 理解する</span>
                        <span className="text-[10px] opacity-80 hidden sm:inline">（目的）</span>
                      </button>
                      <span className="text-slate-400">→</span>
                      <button
                        type="button"
                        onClick={() => setOpenStep(2)}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                          openStep === 2
                            ? 'bg-slate-900 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        }`}
                      >
                        <span>② 集める</span>
                        <span className="text-[10px] opacity-80 hidden sm:inline">（条件）</span>
                      </button>
                      <span className="text-slate-400">→</span>
                      <button
                        type="button"
                        onClick={() => setOpenStep(3)}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                          openStep === 3
                            ? 'bg-slate-900 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        }`}
                      >
                        <span>③ 形にする</span>
                        <span className="text-[10px] opacity-80 hidden sm:inline">（数式化）</span>
                      </button>
                      <span className="text-slate-400">→</span>
                      <button
                        type="button"
                        onClick={() => setOpenStep(4)}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                          openStep === 4
                            ? 'bg-slate-900 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        }`}
                      >
                        <span>④ 動かす</span>
                        <span className="text-[10px] opacity-80 hidden sm:inline">（変形）</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentProblem.steps.map((s) => {
                    const isOpen = openStep === s.step;
                    const logStatus = userLogs[currentProblem.id]?.[s.step];
                    const theme = STEP_THEMES[s.step] || STEP_THEMES[1];
                    const cleanTitle = s.title.replace(/^手順\d+[：:]\s*/, '').replace(/^Step\s*\d+[：:]\s*/i, '');

                    return (
                      <div 
                        key={s.step} 
                        className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                          isOpen 
                            ? 'border-slate-300 bg-[#FAF9F5] shadow-xs' 
                            : 'border-slate-200 bg-white hover:bg-slate-50/70'
                        }`}
                      >
                        <button 
                          onClick={() => setOpenStep(isOpen ? null : s.step)} 
                          className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-3.5">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isOpen ? theme.numBgActive : theme.numBgInactive}`}>
                              S{s.step}
                            </span>
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${theme.badge}`}>
                                  Step {s.step} 【{theme.name}】
                                </span>
                                <span className="text-xs text-slate-500 hidden sm:inline">
                                  {theme.sub}
                                </span>
                              </div>
                              <h4 className="font-bold text-sm text-slate-900">
                                {cleanTitle}
                              </h4>
                            </div>
                          </div>
                          {isOpen ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-2 border-t border-[#EBE4D8] text-sm text-slate-800 space-y-4">
                            <div className="whitespace-pre-line leading-relaxed font-sans bg-white p-4 sm:p-5 rounded-xl border border-slate-200 text-slate-800 shadow-2xs">
                              <MathText text={s.content} />
                            </div>

                            {/* 自力再現・つまずき3択チェッカー */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 gap-2.5 border-t border-[#EBE4D8]">
                              <span className="text-xs text-slate-600 font-medium">
                                このステップの自力再現度：
                              </span>
                              <div className="flex items-center gap-2 flex-wrap">
                                <button
                                  type="button"
                                  onClick={() => handleStepLog(currentProblem.id, s.step, 'ok')}
                                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition font-bold border cursor-pointer ${
                                    logStatus === 'ok'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-400'
                                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>自力でできた</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleStepLog(currentProblem.id, s.step, 'hint')}
                                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition font-bold border cursor-pointer ${
                                    logStatus === 'hint'
                                      ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-400'
                                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                  }`}
                                >
                                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                                  <span>ヒントを見て解けた</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleStepLog(currentProblem.id, s.step, 'stuck')}
                                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition font-bold border cursor-pointer ${
                                    logStatus === 'stuck'
                                      ? 'bg-rose-50 text-rose-800 border-rose-300 ring-2 ring-rose-400'
                                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                  }`}
                                >
                                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                  <span>つまずいた</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 別解・検算アプローチ（回答・手順4の直後：初期状態は閉じた状態） */}
              <div id="alternative-section" className="bg-white rounded-2xl p-6 border border-[#DDD6CA] shadow-xs">
                <button 
                  type="button"
                  onClick={() => setShowAlt(!showAlt)} 
                  className="w-full flex items-center justify-between text-left cursor-pointer gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-200 shrink-0">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-slate-900">別解・検算アプローチ</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                          4ステップ確認後に開くことを推奨
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">別角度からの解法と検算のポイント</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-700 font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition cursor-pointer">
                    {showAlt ? '折りたたむ ▲' : '表示する ▼'}
                  </span>
                </button>
                {showAlt && (
                  <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-800 bg-[#FAF9F5] p-5 rounded-xl border border-[#EBE4D8] leading-relaxed font-sans whitespace-pre-line animate-in fade-in duration-200">
                    {userProfile?.plan === 'free' ? (
                      <div className="p-4 bg-white rounded-xl border border-amber-200 text-center space-y-3">
                        <div className="text-amber-700 font-bold text-sm flex items-center justify-center gap-2">
                          <Lock className="w-4 h-4" />
                          <span>別解・検算アプローチは有料会員限定機能です</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          別解の全ルート網羅や検算のテクニックを確認するには、一般会員またはプレミアム会員へアップグレードしてください。
                        </p>
                        <button
                          onClick={() => {
                            setUpgradeTargetPlan('standard');
                            setShowUpgradeModal(true);
                          }}
                          className="py-2 px-4 bg-[#D9532F] hover:bg-[#C84826] text-white font-bold rounded-lg text-xs transition cursor-pointer shadow-xs"
                        >
                          有料プランで別解を確認する
                        </button>
                      </div>
                    ) : (
                      <MathText text={currentProblem.alternativeSolution || "別解アプローチが設定されていません。"} />
                    )}
                  </div>
                )}
              </div>

              {/* 別解の後に類似問題作成（2問） */}
              <div id="similar-problems-section" className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        思考プロセス定着 類似問題（2問）
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                          演習
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500">本問の思考手順（fourmulasteps）と公式を応用・定着させるための類題2題</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-700 font-mono px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 font-semibold">
                    {currentProblem.similarProblems?.length || 0}問 収録
                  </span>
                </div>

                {currentProblem.similarProblems && currentProblem.similarProblems.length > 0 ? (
                  <div className="space-y-4 pt-1">
                    {currentProblem.similarProblems.map((sim, idx) => {
                      const isLocked = idx > 0 && userProfile?.plan !== 'premium';
                      if (isLocked) {
                        return (
                          <div key={idx} className="bg-[#FAF9F5] border border-orange-200 rounded-xl p-5 text-center space-y-3 shadow-2xs">
                            <div className="flex items-center justify-center gap-2 text-[#D9532F] font-bold text-sm">
                              <Lock className="w-4 h-4" />
                              <span>類似問題 2（実戦・応用発展題）はプレミアム会員限定です</span>
                            </div>
                            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                              基礎定着から難関大実戦レベルまで引き上げる第2の類題演習と解法アプローチは、プレミアム会員のみご利用いただけます。
                            </p>
                            <button
                              onClick={() => {
                                setUpgradeTargetPlan('premium');
                                setShowUpgradeModal(true);
                              }}
                              className="py-2 px-5 bg-[#D9532F] hover:bg-[#C84826] text-white font-bold rounded-lg text-xs shadow-xs transition inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <Crown className="w-3.5 h-3.5" />
                              <span>プレミアムで応用類題を解放する</span>
                            </button>
                          </div>
                        );
                      }

                      const isOpen = openSimilarProblems.includes(idx);
                      return (
                        <div key={idx} className="bg-[#FAF9F5] border border-slate-200 rounded-xl p-5 space-y-3.5 transition shadow-2xs">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              類似問題 {idx + 1}
                            </span>
                            <span className="text-sm font-bold text-slate-900 flex-1">
                              {sim.title}
                            </span>
                          </div>

                          {/* 類似問題の問題文 */}
                          <div className="text-sm text-slate-800 leading-relaxed font-sans bg-white p-4 rounded-xl border border-slate-200">
                            <MathText text={sim.question} />
                          </div>

                          {/* アクションボタン */}
                          <div className="pt-1 flex items-center justify-between gap-3 flex-wrap">
                            <button
                              type="button"
                              onClick={() => {
                                setOpenSimilarProblems(prev =>
                                  prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                                );
                              }}
                              className="text-xs text-slate-700 hover:text-slate-900 flex items-center gap-1.5 font-medium transition cursor-pointer py-1.5 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs"
                            >
                              <Lightbulb className="w-4 h-4 text-amber-500" />
                              <span>{isOpen ? '思考ヒント・解法要点を閉じる' : '思考ヒント・解法要点を見る'}</span>
                              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setInputText(sim.question);
                                setInputMode('text');
                                setActiveTab('scan');
                              }}
                              className="text-xs text-[#D9532F] hover:text-[#C84826] flex items-center gap-1.5 font-bold bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
                              title="この類題をAI解析に送ってfourmulastepsで分解する"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#D9532F]" />
                              <span>AIで4手順分解する</span>
                            </button>
                          </div>

                          {isOpen && (
                            <div className="space-y-3 pt-3 border-t border-slate-200 text-xs">
                              {sim.hint && (
                                <div className="bg-orange-50/60 p-4 rounded-xl border border-orange-200/80 text-slate-800 leading-relaxed">
                                  <div className="font-bold text-[#D9532F] mb-1.5 flex items-center gap-1.5 text-xs">
                                    <Target className="w-4 h-4 text-[#D9532F]" />
                                    fourmulasteps 着眼点（思考ヒント）
                                  </div>
                                  <div className="whitespace-pre-line text-xs font-sans leading-relaxed text-slate-700">
                                    <MathText text={sim.hint} />
                                  </div>
                                </div>
                              )}
                              {sim.approach && (
                                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80 text-slate-800 leading-relaxed">
                                  <div className="font-bold text-emerald-800 mb-1.5 flex items-center gap-1.5 text-xs">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    解法の要点・略解
                                  </div>
                                  <div className="whitespace-pre-line text-xs font-sans leading-relaxed text-slate-700">
                                    <MathText text={sim.approach} />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">類似問題は設定されていません</p>
                )}
              </div>
            </div>

            {/* 右側パネル */}
            <div className="space-y-6">
              {/* 登録問題セレクター & 新規問題追加 */}
              <div className="bg-white rounded-2xl p-5 border border-[#DDD6CA] shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-700" />
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                      登録問題一覧（{problems.length}問）
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setInputMode('image');
                      setActiveTab('scan');
                    }}
                    className="text-[11px] text-[#D9532F] hover:text-[#C84826] flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    新規追加
                  </button>
                </div>

                {/* 問題セレクター */}
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {problems.map((p) => {
                    const isSelected = p.id === selectedProblemId;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProblemId(p.id)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between gap-2 group ${
                          isSelected
                            ? 'bg-orange-50/80 border-[#D9532F] text-slate-900 font-bold shadow-2xs'
                            : 'bg-[#FAF9F5] border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="truncate flex-1 min-w-0">
                          <div className="truncate flex items-center gap-1.5">
                            {(p.isSample || p.id === 1) && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-100 text-[#D9532F] border border-orange-200 shrink-0 font-bold">
                                見本
                              </span>
                            )}
                            <span className="truncate">{p.title}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                            {p.university || "大学入試"} / {p.difficulty || "標準"}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#D9532F]"></span>
                          )}
                          {problems.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => handleDeleteProblem(p.id, e)}
                              className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-slate-100 transition opacity-80 group-hover:opacity-100 cursor-pointer"
                              title="この問題を削除"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setInputMode('image');
                    setActiveTab('scan');
                    setTimeout(() => handleTakePhoto(), 100);
                  }}
                  className="w-full py-2 px-3 bg-[#D9532F] hover:bg-[#C84826] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>カメラで新問題を撮影・解析</span>
                </button>
              </div>

              {/* 大学入試数学公式集からの参照セクション */}
              <div className="bg-white rounded-2xl p-5 border border-[#DDD6CA] shadow-xs space-y-3">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <BookmarkCheck className="w-5 h-5 text-slate-700" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">大学入試数学公式集</h4>
                      <p className="text-[10px] text-slate-500">回答で参照された公式</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-700 font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {currentProblem.formulas?.length || 0}公式 参照中
                  </span>
                </div>

                {currentProblem.formulas && currentProblem.formulas.length > 0 ? (
                  <div className="space-y-3">
                    {currentProblem.formulas.map((f, idx) => {
                      const isExpanded = expandedFormulaIds.includes(idx);
                      return (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#FAF9F5] border border-slate-200 text-xs transition">
                          {/* 科目・カテゴリ・収録バッジ */}
                          <div className="flex items-center justify-between gap-1.5 mb-1.5 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white">
                                {f.subject || "数学"}
                              </span>
                              {f.category && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                                  {f.category}
                                </span>
                              )}
                            </div>
                            {f.isFromCollection && (
                              <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3" /> 公式集収録
                              </span>
                            )}
                          </div>

                          {/* 公式名 */}
                          <div className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D9532F]"></span>
                            <MathText text={f.name} />
                          </div>

                          {/* 数式プレビュー */}
                          {(f.latex || f.desc) && (
                            <div className="text-slate-900 bg-white p-3 rounded-lg border border-slate-200 mb-2 overflow-x-auto text-center shadow-2xs">
                              <MathText text={
                                f.latex 
                                  ? (f.latex.startsWith('$') ? f.latex : `$$${f.latex}$$`) 
                                  : (f.desc.startsWith('$') ? f.desc : (f.desc.includes('\\') ? `$$${f.desc}$$` : f.desc))
                              } />
                            </div>
                          )}

                          {/* 公式集の解説・本文（展開アコーディオン） */}
                          {f.body && (
                            <div className="mt-1">
                              <button
                                type="button"
                                onClick={() => toggleFormulaExpand(idx)}
                                className="w-full py-1.5 px-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-between text-[11px] transition cursor-pointer"
                              >
                                <span className="flex items-center gap-1 font-medium">
                                  <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                                  公式集の解説・証明
                                </span>
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>

                              {isExpanded && (
                                <div className="mt-2 p-3 bg-white rounded-lg border border-slate-200 text-slate-700 text-xs leading-relaxed space-y-2">
                                  <div className="whitespace-pre-line font-sans">
                                    <MathText text={f.body} />
                                  </div>
                                  <div className="pt-2 border-t border-slate-200 flex justify-end">
                                    <button
                                      type="button"
                                      onClick={() => openFormulaInLibrary(f)}
                                      className="text-[11px] text-[#D9532F] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                                    >
                                      <Library className="w-3 h-3" />
                                      公式集で詳しく確認する
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">公式集からの参照公式はありません</p>
                )}
              </div>

              {/* 解説クイックナビゲーション */}
              <div className="bg-white rounded-2xl p-5 border border-[#DDD6CA] shadow-xs space-y-3">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <BookmarkCheck className="w-4 h-4 text-slate-700" />
                  解説クイックナビ
                </h4>
                <div className="space-y-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('alternative-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9F5] hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      別解・検算アプローチ
                    </span>
                    <span className="text-[10px] text-slate-500">表示へ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('similar-problems-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-800 border border-emerald-200 transition cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      思考定着 類似問題（2問）
                    </span>
                    <span className="text-[10px] text-emerald-800 font-bold px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-300">
                      {currentProblem.similarProblems?.length || 0}問
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 思考定着 類似問題（2問）専用タブ画面 */}
        {activeTab === 'similar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      思考プロセス定着演習
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      思考定着 類似問題（2問）
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    対象問題：{currentProblem.title}（{currentProblem.university || "大学入試"}）
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('solve')}
                  className="self-start sm:self-auto text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl border border-slate-200 transition cursor-pointer flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4 text-slate-700" />
                  <span>本問の解説に戻る</span>
                </button>
              </div>

              {/* 類似問題リスト */}
              {currentProblem.similarProblems && currentProblem.similarProblems.length > 0 ? (
                <div className="space-y-6">
                  {currentProblem.similarProblems.map((sim, idx) => {
                    const isLocked = idx > 0 && userProfile?.plan !== 'premium';
                    if (isLocked) {
                      return (
                        <div key={idx} className="bg-[#FAF9F5] border border-orange-200 rounded-xl p-8 text-center space-y-4 shadow-2xs">
                          <div className="flex items-center justify-center gap-2 text-[#D9532F] font-bold text-base">
                            <Lock className="w-5 h-5" />
                            <span>類似問題 2（実戦・応用発展題）はプレミアム会員限定です</span>
                          </div>
                          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                            基礎定着から難関大実戦レベルまで引き上げる第2の類題演習と解法アプローチは、プレミアム会員のみご利用いただけます。
                          </p>
                          <button
                            onClick={() => {
                              setUpgradeTargetPlan('premium');
                              setShowUpgradeModal(true);
                            }}
                            className="py-2.5 px-6 bg-[#D9532F] hover:bg-[#C84826] text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition inline-flex items-center gap-2 cursor-pointer"
                          >
                            <Crown className="w-4 h-4" />
                            <span>プレミアムで応用類題を解放する</span>
                          </button>
                        </div>
                      );
                    }

                    const isOpen = openSimilarProblems.includes(idx);
                    return (
                      <div key={idx} className="bg-[#FAF9F5] border border-slate-200 rounded-xl p-6 space-y-4 shadow-2xs">
                        <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-200 pb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              類似問題 {idx + 1}
                            </span>
                            <h3 className="text-base font-bold text-slate-900">
                              {sim.title}
                            </h3>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">
                            fourmulasteps 類題
                          </span>
                        </div>

                        {/* 問題文 */}
                        <div className="space-y-1.5">
                          <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                            <Target className="w-4 h-4 text-slate-600" />
                            <span>問題文</span>
                          </div>
                          <div className="text-sm text-slate-800 leading-relaxed font-sans bg-white p-5 rounded-xl border border-slate-200">
                            <MathText text={sim.question} />
                          </div>
                        </div>

                        {/* トグルとAI解析ボタン */}
                        <div className="pt-1 flex items-center justify-between gap-3 flex-wrap">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenSimilarProblems(prev =>
                                prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                              );
                            }}
                            className="text-xs text-slate-700 hover:text-slate-900 flex items-center gap-1.5 font-medium transition cursor-pointer py-1.5 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs"
                          >
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <span>{isOpen ? '思考ヒント・解法要点を閉じる' : '思考ヒント・解法要点を見る'}</span>
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setInputText(sim.question);
                              setInputMode('text');
                              setActiveTab('scan');
                            }}
                            className="text-xs text-[#D9532F] hover:text-[#C84826] flex items-center gap-1.5 font-bold bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
                            title="この類題をAI解析に送ってfourmulastepsで分解する"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#D9532F]" />
                            <span>この類題をAIで4手順分解する</span>
                          </button>
                        </div>

                        {isOpen && (
                          <div className="space-y-4 pt-3 border-t border-slate-200 text-xs">
                            {sim.hint && (
                              <div className="bg-orange-50/60 p-4 rounded-xl border border-orange-200/80 text-slate-800 leading-relaxed">
                                <div className="font-bold text-[#D9532F] mb-2 flex items-center gap-1.5 text-xs">
                                  <Target className="w-4 h-4 text-[#D9532F]" />
                                  fourmulasteps 着眼点（思考ヒント）
                                </div>
                                <div className="whitespace-pre-line text-xs font-sans leading-relaxed text-slate-700">
                                  <MathText text={sim.hint} />
                                </div>
                              </div>
                            )}
                            {sim.approach && (
                              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80 text-slate-800 leading-relaxed">
                                <div className="font-bold text-emerald-800 mb-2 flex items-center gap-1.5 text-xs">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  解法の要点・略解
                                </div>
                                <div className="whitespace-pre-line text-xs font-sans leading-relaxed text-slate-700">
                                  <MathText text={sim.approach} />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <p>類似問題が登録されていません。</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 大学入試数学公式集（全219公式）画面 */}
        {activeTab === 'formulas' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#DDD6CA] shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Library className="w-5 h-5 text-slate-700" />
                    大学入試数学公式集（全219公式データベース）
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    数学Ⅰ・A・Ⅱ・B・Ⅲの全分野を網羅。各問題の回答で参照された公式の確認や、復習・導出・別表現の確認に活用できます。
                  </p>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start md:self-auto shrink-0">
                  該当: {filteredLibraryFormulas.length} / {MATH_FORMULAS.length} 公式
                </span>
              </div>

              {/* 検索バーと科目フィルター */}
              <div className="space-y-4 mb-6">
                {/* 検索入力 */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={librarySearchQuery}
                    onChange={(e) => setLibrarySearchQuery(e.target.value)}
                    placeholder="公式名・分野・キーワードで検索（例：因数分解、相加相乗、解の公式、区分求積法、極形式...）"
                    className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#D9532F] focus:ring-1 focus:ring-[#D9532F] font-sans placeholder-slate-400"
                  />
                  {librarySearchQuery && (
                    <button
                      type="button"
                      onClick={() => setLibrarySearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* 科目フィルターボタン */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <span className="text-slate-500 text-[11px] shrink-0 font-medium">科目:</span>
                  {[
                    { id: 'all', label: `すべて (${MATH_FORMULAS.length})` },
                    { id: '数学Ⅰ', label: `数学Ⅰ (${MATH_FORMULAS.filter(f => f.subject === '数学Ⅰ').length})` },
                    { id: '数学A', label: `数学A (${MATH_FORMULAS.filter(f => f.subject === '数学A').length})` },
                    { id: '数学Ⅱ', label: `数学Ⅱ (${MATH_FORMULAS.filter(f => f.subject === '数学Ⅱ').length})` },
                    { id: '数学B', label: `数学B (${MATH_FORMULAS.filter(f => f.subject === '数学B').length})` },
                    { id: '数学Ⅲ', label: `数学Ⅲ (${MATH_FORMULAS.filter(f => f.subject === '数学Ⅲ').length})` },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setLibrarySubjectFilter(sub.id)}
                      className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition text-xs border cursor-pointer ${
                        librarySubjectFilter === sub.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                          : 'bg-[#FAF9F5] text-slate-700 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 公式一覧グリッド */}
              {filteredLibraryFormulas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLibraryFormulas.map((formula) => {
                    const isExpanded = expandedLibraryFormulaId === formula.id;
                    return (
                      <div
                        key={formula.id}
                        className="bg-[#FAF9F5] border border-slate-200 hover:border-slate-300 rounded-2xl p-4 flex flex-col justify-between transition shadow-2xs"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white">
                                {formula.subject}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                                {formula.category}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">
                              {formula.id}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#D9532F]"></span>
                            <MathText text={formula.name} />
                          </h3>

                          {formula.latex && (
                            <div className="text-slate-900 font-mono bg-white p-3 rounded-xl border border-slate-200 mb-2 overflow-x-auto text-xs text-center shadow-2xs">
                              <MathText text={`$$${formula.latex}$$`} />
                            </div>
                          )}

                          {formula.summary && (
                            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                              <MathText text={formula.summary} />
                            </p>
                          )}
                        </div>

                        {/* 詳細展開ボタン */}
                        <div className="pt-2 border-t border-slate-200">
                          <button
                            type="button"
                            onClick={() => setExpandedLibraryFormulaId(isExpanded ? null : formula.id)}
                            className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-between text-xs transition cursor-pointer"
                          >
                            <span className="flex items-center gap-1 font-medium">
                              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                              {isExpanded ? '解説・本文を閉じる' : '解説・本文を展開'}
                            </span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {isExpanded && (
                            <div className="mt-3 p-3.5 bg-white rounded-xl border border-slate-200 text-slate-700 text-xs leading-relaxed space-y-2 whitespace-pre-line font-sans shadow-2xs">
                              <MathText text={formula.body || formula.summary} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <Library className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">該当する公式が見つかりませんでした。</p>
                  <button
                    type="button"
                    onClick={() => { setLibrarySearchQuery(''); setLibrarySubjectFilter('all'); }}
                    className="mt-3 text-xs text-[#D9532F] hover:underline font-bold cursor-pointer"
                  >
                    検索条件をリセットする
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 思考プロセス分析（弱点診断）画面 */}
        {activeTab === 'analysis' && (() => {
          const localAnalyzedCount = problems.filter(p => p.difficulty === 'AI解析' || (!p.isSample && p.id !== 1)).length;
          const totalAnalyzed = Math.max(userProfile?.total_problems_analyzed || 0, localAnalyzedCount);
          const localPracticedCount = Object.values(userLogs).reduce((acc, log) => acc + Object.keys(log || {}).length, 0);
          const totalPracticed = Math.max(userProfile?.total_steps_practiced || 0, localPracticedCount);

          return (
            <div className="space-y-6">
              {/* ユーザー学習ステータス & 利用サマリーカード */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#DDD6CA] shadow-xs flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#D9532F] text-xs font-bold mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>AI解析問題数</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900 font-mono">
                      {totalAnalyzed} <span className="text-sm font-normal text-slate-500">問</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#D9532F]" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#DDD6CA] shadow-xs flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-700 text-xs font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>演習ステップ数</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900 font-mono">
                      {totalPracticed} <span className="text-sm font-normal text-slate-500">回</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* つまずき診断＆学習アドバイス */}
              <div className="bg-white rounded-2xl p-6 border border-[#DDD6CA] shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-slate-700" />
                  fourmulasteps つまずき診断＆弱点克服アドバイス
                </h2>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  「知識（公式）」と「解答を組み立てる手順」は別物です。
                  4つの手順（理解する→集める→形にする→動かす）のどこで思考が止まっているかを可視化し、弱点を克服して再現可能な解答力を養います。
                </p>

                <div className="space-y-6">
                  {[
                    { 
                      step: 1, 
                      title: "手順1【理解する】何を求めるのかを明確に把握する", 
                      stuckReason: "何を求められているのか分からない・最終ゴールの言語化不足",
                      advice: "問題文の文末（「〜を求めよ」「〜を証明せよ」）を真っ先に確認し、「求めるべき値」や「証明の結論」を解答用紙の1行目に大きく明記する習慣をつけましょう。"
                    },
                    { 
                      step: 2, 
                      title: "手順2【集める】問題文で与えられたすべての条件を整理する", 
                      stuckReason: "問題文の前提条件や数値・図形的制約の整理不足",
                      advice: "問題文の数式や数値を一度文章から切り離し、「使える手札①②③」として箇条書きで可視化するノート作りを意識してください。"
                    },
                    { 
                      step: 3, 
                      title: "手順3【形にする】その条件を数式に変換する", 
                      stuckReason: "当てはめるべき公式や文字設定（定式化）が思いつかない",
                      advice: "日本語の条件を、手順1のゴールを見据えて数式（方程式・関数・文字定義）に置き換えるパターンを大学入試数学公式集で復習しましょう。"
                    },
                    { 
                      step: 4, 
                      title: "手順4【動かす】整理した式を解答の方向へ変形する", 
                      stuckReason: "闇雲な式展開・微分や、計算が複雑すぎて行き詰まる",
                      advice: "「手順1のゴールにたどり着くための変形」を常に意識してください。無目的に手を動かすのではなく、解答の構造を定めてから計算を進めるのが理想です。"
                    }
                  ].map((item) => {
                    const stat = analysisStats[item.step];
                    const total = stat.total || 0;
                    const ok = stat.ok || 0;
                    const hint = stat.hint || 0;
                    const stuck = stat.stuck || 0;
                    const stuckRate = total > 0 ? Math.round((stuck / total) * 100) : 0;

                    return (
                      <div key={item.step} className="bg-[#FAF9F5] p-5 rounded-xl border border-slate-200 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{item.title}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                              自力: {ok}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                              ヒント: {hint}
                            </span>
                            <span className={`text-[11px] px-2 py-0.5 rounded font-bold border ${
                              stuckRate > 50 ? 'bg-rose-50 text-rose-800 border-rose-300' :
                              stuckRate > 0 ? 'bg-rose-50 text-rose-700 border-rose-200' :
                              'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                              つまずき: {stuck} ({stuckRate}%)
                            </span>
                          </div>
                        </div>

                        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-3 overflow-hidden">
                          <div 
                            className={`h-2.5 rounded-full transition-all duration-500 ${
                              stuckRate > 50 ? 'bg-rose-500' :
                              stuckRate > 0 ? 'bg-amber-500' :
                              'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.max(stuckRate, 5)}%` }}
                          ></div>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-2xs">
                          <div className="text-slate-800 font-semibold flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>つまずきの主な原因: {item.stuckReason}</span>
                          </div>
                          <div className="text-slate-700 leading-relaxed font-sans pt-1 border-t border-slate-100">
                            <strong className="text-[#D9532F]">【処方箋アドバイス】: </strong>
                            <MathText text={item.advice} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* 写真/テキスト解析画面 */}
        {activeTab === 'scan' && (
          <div className="bg-white rounded-2xl p-6 border border-[#DDD6CA] shadow-xs max-w-2xl mx-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D9532F]" />
              fourmulasteps 解答法 AI解析
            </h2>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              「公式は覚えたのに、どこから手をつけていいかわからない」受験生のための思考プロセス体系化。
              闇雲に計算を始める前に、解答の構造を4つの手順に分解し、大学入試数学公式集に紐づけて解説します。
            </p>

            {/* fourmulasteps 思考の流れバナー */}
            <div className="grid grid-cols-4 gap-1.5 p-2 bg-[#FAF9F5] rounded-xl border border-slate-200 text-center mb-5">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] text-slate-900 font-bold block">① 理解する</span>
                <span className="text-[9px] text-slate-500 block">何を求めるか</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] text-slate-900 font-bold block">② 集める</span>
                <span className="text-[9px] text-slate-500 block">すべての条件</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] text-[#D9532F] font-bold block">③ 形にする</span>
                <span className="text-[9px] text-slate-500 block">数式へ変換</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] text-emerald-700 font-bold block">④ 動かす</span>
                <span className="text-[9px] text-slate-500 block">解答へ変形</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
                <button 
                  onClick={() => setInputMode('image')} 
                  className={`pb-2 border-b-2 cursor-pointer transition ${inputMode === 'image' ? 'border-[#D9532F] text-[#D9532F]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  画像添付
                </button>
                <button 
                  onClick={() => setInputMode('text')} 
                  className={`pb-2 border-b-2 cursor-pointer transition ${inputMode === 'text' ? 'border-[#D9532F] text-[#D9532F]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  テキスト入力
                </button>
              </div>

              {inputMode === 'image' ? (
                <div className="space-y-3">
                  {/* 隠しインプット（Web/PWA/Capacitor完全対応） */}
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {!selectedImage ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={handleTakePhoto}
                          className="flex flex-col items-center justify-center gap-2 p-5 bg-[#FAF9F5] hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-2xl transition cursor-pointer text-slate-800 group shadow-2xs"
                        >
                          <div className="p-3 rounded-xl bg-white text-slate-700 group-hover:text-[#D9532F] border border-slate-200 shadow-2xs transition">
                            <Camera className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-slate-900">カメラで撮影</span>
                          <span className="text-[10px] text-slate-500">問題用紙を直接撮る</span>
                        </button>

                        <button
                          type="button"
                          onClick={handlePickPhoto}
                          className="flex flex-col items-center justify-center gap-2 p-5 bg-[#FAF9F5] hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-2xl transition cursor-pointer text-slate-800 group shadow-2xs"
                        >
                          <div className="p-3 rounded-xl bg-white text-slate-700 group-hover:text-[#D9532F] border border-slate-200 shadow-2xs transition">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-slate-900">アルバムから選択</span>
                          <span className="text-[10px] text-slate-500">保存済み写真を使用</span>
                        </button>
                      </div>

                      {/* ドラッグ＆ドロップ / ファイル選択エリア */}
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            processImageFile(e.dataTransfer.files[0]);
                          }
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-300 hover:border-[#D9532F] rounded-2xl p-5 text-center bg-[#FAF9F5] hover:bg-orange-50/20 transition cursor-pointer space-y-2"
                      >
                        <div className="flex justify-center text-slate-400">
                          <Upload className="w-6 h-6 text-slate-500" />
                        </div>
                        <div className="text-xs text-slate-700 font-bold">
                          ファイルを指定してアップロード、または画像をドラッグ＆ドロップ
                        </div>
                        <div className="text-[10px] text-slate-400">
                          クリップボードからの貼り付け（Cmd+V / Ctrl+V）にも対応
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#FAF9F5] border border-slate-200 rounded-2xl p-4 space-y-3 shadow-2xs">
                      <div className="relative flex justify-center bg-white rounded-xl p-2 border border-slate-200 overflow-hidden">
                        <img
                          src={selectedImage}
                          alt="選択された問題画像"
                          className="max-h-56 w-auto object-contain rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleTakePhoto}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl transition cursor-pointer shadow-2xs"
                          >
                            <Camera className="w-3.5 h-3.5 text-slate-600" />
                            <span>再撮影</span>
                          </button>
                          <button
                            type="button"
                            onClick={handlePickPhoto}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl transition cursor-pointer shadow-2xs"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-slate-600" />
                            <span>選び直す</span>
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={handleClearImage}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>削除</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="例：袋には白い球が8個、赤い球が2個入っており..."
                  className="w-full h-32 bg-white border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#D9532F] focus:ring-1 focus:ring-[#D9532F] font-sans placeholder-slate-400"
                />
              )}

              {monthlyUsageCount >= (userProfile?.plan === 'premium' ? 300 : userProfile?.plan === 'standard' ? 100 : 3) && (
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-3">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#D9532F] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">今月のAI解析枠をすべて活用いただきました！</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        思考プロセスの定着には継続的な解析が効果的です。一般プラン（月100問）またはプレミアムプラン（月300問）にアップグレードすると、すぐに続けて解析できます。
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        setUpgradeTargetPlan(userProfile?.plan === 'standard' ? 'premium' : 'standard');
                        setShowUpgradeModal(true);
                      }}
                      className="px-4 py-2 bg-[#D9532F] hover:bg-[#C84826] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                    >
                      プラン詳細・アップグレードを見る
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('solve')}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      過去の問題や類題を復習する
                    </button>
                  </div>
                </div>
              )}

              {errorMsg && monthlyUsageCount < (userProfile?.plan === 'premium' ? 300 : userProfile?.plan === 'standard' ? 100 : 3) && (
                <div className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 font-mono break-words">
                  {errorMsg}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || (!inputText && !selectedImage)}
                className="w-full py-3.5 bg-[#D9532F] hover:bg-[#C84826] text-white font-bold rounded-xl transition shadow-xs disabled:opacity-50 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {isAnalyzing ? "AIがゴール・公式・別解を抽出中..." : "fourmulasteps で解法を分解・生成する"}
              </button>
            </div>
          </div>
        )}

        {/* マイページ画面 */}
        {activeTab === 'mypage' && (
          <MyPage
            user={currentUser}
            userProfile={userProfile}
            monthlyUsageCount={monthlyUsageCount}
            problems={problems}
            setProblems={setProblems}
            userLogs={userLogs}
            onSelectProblem={(problemId) => {
              setSelectedProblemId(problemId);
              setActiveTab('solve');
            }}
            onOpenUpgrade={() => {
              setUpgradeTargetPlan(userProfile?.plan === 'standard' ? 'premium' : 'standard');
              setShowUpgradeModal(true);
            }}
            onOpenLegal={openLegalModalWithTab}
            onLogout={async () => {
              await signOutUser();
              setCurrentUser(null);
              setUserProfile(null);
              setViewMode('lp');
            }}
          />
        )}

        {/* 公式詳細モーダル */}
        {selectedLibraryFormula && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-[#DDD6CA] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
              {/* モーダルヘッダー */}
              <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-[#FAF9F5]">
                <div className="flex items-center gap-2">
                  <Library className="w-5 h-5 text-slate-700" />
                  <span className="font-bold text-sm text-slate-900">大学入試数学公式集 詳細</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLibraryFormula(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* モーダルコンテンツ */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-900 text-white">
                    {selectedLibraryFormula.subject || "数学"}
                  </span>
                  {selectedLibraryFormula.category && (
                    <span className="px-2.5 py-0.5 rounded text-xs bg-slate-100 text-slate-700 border border-slate-200">
                      {selectedLibraryFormula.category}
                    </span>
                  )}
                  {selectedLibraryFormula.id && (
                    <span className="text-[11px] font-mono text-slate-400 ml-auto">
                      ID: {selectedLibraryFormula.id}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D9532F]"></span>
                  <MathText text={selectedLibraryFormula.name} />
                </h3>

                {selectedLibraryFormula.latex && (
                  <div className="p-4 bg-[#FAF9F5] rounded-xl border border-slate-200 overflow-x-auto text-center py-5 shadow-inner text-slate-900 font-mono">
                    <MathText text={`$$${selectedLibraryFormula.latex}$$`} />
                  </div>
                )}

                <div className="bg-[#FAF9F5] p-5 rounded-xl border border-slate-200 text-slate-800 leading-relaxed space-y-3 whitespace-pre-line font-sans text-xs sm:text-sm shadow-2xs">
                  <div className="font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center gap-1.5 text-xs sm:text-sm">
                    <BookOpen className="w-4 h-4 text-slate-700" />
                    <span>【公式の解説・証明・活用法】</span>
                  </div>
                  <div className="pt-1 text-slate-700 leading-relaxed">
                    <MathText text={
                      (selectedLibraryFormula.body && selectedLibraryFormula.body !== selectedLibraryFormula.latex && !selectedLibraryFormula.body.startsWith('\\vec'))
                        ? selectedLibraryFormula.body 
                        : (selectedLibraryFormula.summary && selectedLibraryFormula.summary !== selectedLibraryFormula.latex && !selectedLibraryFormula.summary.startsWith('\\vec')
                            ? selectedLibraryFormula.summary 
                            : (selectedLibraryFormula.desc && !selectedLibraryFormula.desc.startsWith('\\vec')
                                ? selectedLibraryFormula.desc 
                                : "この公式の証明・解法のポイント・入試活用法は、下記の公式集一覧または関連問題の解説ステップをご参照ください。"))
                    } />
                  </div>
                </div>
              </div>

              {/* モーダルフッター */}
              <div className="p-4 border-t border-slate-200 bg-[#FAF9F5] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedLibraryFormula.subject) {
                      setLibrarySubjectFilter(selectedLibraryFormula.subject);
                    }
                    setActiveTab('formulas');
                    setSelectedLibraryFormula(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                >
                  <Library className="w-3.5 h-3.5 text-slate-600" />
                  公式集でこの科目を一覧
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLibraryFormula(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}

        {/* アップグレード / 認証モーダル */}
        <AuthModal
          isOpen={showUpgradeModal}
          initialMode="checkout"
          targetPlan={upgradeTargetPlan}
          onClose={() => setShowUpgradeModal(false)}
          onSuccess={(newPlan) => {
            setShowUpgradeModal(false);
            setUserProfile(prev => ({ ...(prev || {}), plan: newPlan }));
          }}
        />

        {/* プレミアム特典: マイ弱点克服ノート A4印刷用レイアウト（ブラウザ印刷時のみ表示） */}
        <div className="print-only-notebook p-8 max-w-4xl mx-auto text-black hidden print:block">
          <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
            <div>
              <div className="text-xs font-bold tracking-widest text-gray-500 uppercase">fourmulasteps Premium</div>
              <h1 className="text-2xl font-black mt-1">マイ弱点克服ノート</h1>
              <p className="text-xs text-gray-600 mt-0.5">つまずきステップの思考プロセス ＆ 連動公式まとめ</p>
            </div>
            <div className="text-right text-xs text-gray-600">
              <div>出力日: {new Date().toLocaleDateString('ja-JP')}</div>
              <div>ユーザー: {currentUser?.user_metadata?.full_name || currentUser?.email || '会員'}</div>
              <div>会員プラン: {userProfile?.plan === 'premium' ? 'プレミアム会員' : '一般会員'}</div>
            </div>
          </div>

          <div className="space-y-6">
            {problems.filter(p => {
              const logs = userLogs[p.id] || {};
              return Object.values(logs).some(s => s === 'stuck');
            }).length === 0 ? (
              <div className="p-6 border border-dashed border-gray-400 rounded-lg text-center text-sm text-gray-600">
                つまずきとして記録された問題はありません。日々の演習で「ここでつまずいた」を記録すると、ここに弱点特訓ノートが生成されます。
              </div>
            ) : (
              problems
                .filter(p => {
                  const logs = userLogs[p.id] || {};
                  return Object.values(logs).some(s => s === 'stuck');
                })
                .map((p, idx) => (
                  <div key={p.id} className="border border-gray-400 rounded-lg p-5 break-inside-avoid space-y-3 mb-6 bg-white">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-bold text-base">【問題 {idx + 1}】 {p.title || '無題'}</span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded border border-gray-300">
                        {p.university || '大学入試'} / {p.difficulty || '標準'}
                      </span>
                    </div>

                    <div className="text-xs font-serif bg-gray-50 p-3 rounded border border-gray-200 leading-relaxed whitespace-pre-wrap">
                      {p.question}
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="font-bold text-gray-800">■ 目指すべきゴール（最終目的・解法方針）:</div>
                      <div className="pl-3 text-gray-700">{p.goal}</div>
                    </div>

                    {p.steps && p.steps.length > 0 && (
                      <div className="text-xs space-y-1.5 pt-1">
                        <div className="font-bold text-gray-800">■ 4ステップ思考プロセスとつまずき箇所:</div>
                        {p.steps.map((st) => {
                          const isStuck = userLogs[p.id]?.[st.step] === 'stuck';
                          return (
                            <div 
                              key={st.step} 
                              className={`p-2 rounded text-xs border ${
                                isStuck 
                                  ? 'bg-red-50 border-red-300 font-bold text-red-900' 
                                  : 'bg-gray-50 border-gray-200 text-gray-800'
                              }`}
                            >
                              <span className="font-bold">Step {st.step} [{st.title}]: </span>
                              <span>{st.action}</span>
                              {isStuck && <span className="text-red-600 font-black ml-2">★ 要復習（つまずき）</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {p.formulas && p.formulas.length > 0 && (
                      <div className="text-xs pt-1 border-t border-gray-200">
                        <span className="font-bold text-gray-800">■ 連動公式: </span>
                        <span className="text-gray-700">{p.formulas.map(f => f.name).join('、')}</span>
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>
      </main>

      {/* アプリ共通フッター */}
      <footer className="max-w-5xl mx-auto px-4 mt-12 pt-6 pb-8 border-t border-[#E2DBD0] text-center space-y-3 no-print">
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 flex-wrap">
          <button
            type="button"
            onClick={() => openLegalModalWithTab('terms')}
            className="hover:text-slate-800 transition cursor-pointer"
          >
            利用規約
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => openLegalModalWithTab('privacy')}
            className="hover:text-slate-800 transition cursor-pointer"
          >
            プライバシーポリシー
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => openLegalModalWithTab('tokusho')}
            className="hover:text-slate-800 transition cursor-pointer"
          >
            特定商取引法に基づく表記
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setShowOnboarding(true)}
            className="hover:text-[#D9532F] transition cursor-pointer font-medium"
          >
            使い方ガイド
          </button>
        </div>
        <p className="text-[11px] text-slate-400">
          © {new Date().getFullYear()} fourmulasteps. All rights reserved.
        </p>
      </footer>

      {/* 初回オンボーディングモーダル */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#DDD6CA] rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={handleCloseOnboarding}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#D9532F] text-white font-black px-2 py-0.5 rounded text-xs">4STEPS</span>
              <span className="text-xs text-[#D9532F] font-bold">fourmulasteps へようこそ！</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-3">
              初見問題が解ける「4ステップ思考法」へ
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              数学の難問に出会ったとき、「何をすればいいか分からない」という悩みを解消するためのプラットフォームです。すべての問題を以下の4手順に分解して思考します。
            </p>

            <div className="space-y-2.5 mb-5 bg-[#FAF9F5] p-4 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold shrink-0">① 理解する</span>
                <span className="text-slate-700">問題が求めている最終ゴールと、解法や方針の方向性を言語化します。</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold shrink-0">② 集める</span>
                <span className="text-slate-700">問題文に与えられた条件や前提・制約を手札として箇条書きにします。</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="px-2 py-0.5 rounded bg-[#D9532F] text-white font-bold shrink-0">③ 形にする</span>
                <span className="text-slate-700">集めた条件を数式や文字に置き換え、ゴールに向けた式を組み立てます。</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="px-2 py-0.5 rounded bg-emerald-700 text-white font-bold shrink-0">④ 動かす</span>
                <span className="text-slate-700">公式を適用して式変形を実行し、解答のゴールへ導きます。</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-50/80 border border-orange-200/80 text-xs text-slate-800 mb-5 leading-relaxed">
              💡 画面上の「体験サンプル問題」ですぐに4ステップ思考の構造をご確認いただけます。また、右上の「＋ 新しい問題を解析」からご自身の問題を撮影・入力して即座に解析できます。
            </div>

            <button
              type="button"
              onClick={handleCloseOnboarding}
              className="w-full py-3 bg-[#D9532F] hover:bg-[#C84826] text-white font-bold text-sm rounded-xl transition shadow-xs cursor-pointer"
            >
              アプリをはじめる
            </button>
          </div>
        </div>
      )}

      {/* 法的表示モーダル（利用規約・プライバシーポリシー・特商法表記） */}
      <LegalModal
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
        initialTab={legalTab}
      />

      {/* 印刷用スタイル */}
      <style>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          header, nav, button, input, select, .no-print {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print-only-notebook {
            display: block !important;
          }
          @page {
            margin: 15mm;
          }
        }
      `}</style>
    </div>
  );
}

export default function FourmulaStepsApp() {
  return (
    <ErrorBoundary>
      <FourmulaStepsAppInner />
    </ErrorBoundary>
  );
}
