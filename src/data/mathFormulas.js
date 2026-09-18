/**
 * 大学入試数学公式集（数学Ⅰ・A・Ⅱ・B・Ⅲ）統合データベース
 * 収録公式数: 213
 */

export const MATH_FORMULAS = [
  {
    "id": "formula_1",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "たすきがけの因数分解",
    "latex": "acx^2+(ad+bc)x+bd=(ax+b)(cx+d)",
    "summary": "2次式 $acx^2+(ad+bc)x+bd$ の形をした式は、$x^2$ の係数 $ac$ と定数項 $bd$ を斜め(たすき)に掛けて足すと1次の係数 $ad+bc$ になるような $a,b,c,d$ を探すことで因数分解できる。整数の組をいくつか試して、掛け算した和が中央の係数と一致するか確かめるのがコツ。",
    "body": "2次式 $acx^2+(ad+bc)x+bd$ の形をした式は、$x^2$ の係数 $ac$ と定数項 $bd$ を斜め(たすき)に掛けて足すと1次の係数 $ad+bc$ になるような $a,b,c,d$ を探すことで因数分解できる。整数の組をいくつか試して、掛け算した和が中央の係数と一致するか確かめるのがコツ。\n\n$$acx^2+(ad+bc)x+bd=(ax+b)(cx+d)$$"
  },
  {
    "id": "formula_2",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "2次式の因数分解公式(基本形)",
    "latex": "a^2+2ab+b^2=(a+b)^2",
    "summary": "たすきがけを使う前に押さえておくべき基本の因数分解公式。左辺を展開すれば右辺になることは容易に確認できる。",
    "body": "たすきがけを使う前に押さえておくべき基本の因数分解公式。左辺を展開すれば右辺になることは容易に確認できる。\n\n$$a^2+2ab+b^2=(a+b)^2$$\n\n$$a^2-2ab+b^2=(a-b)^2$$\n\n$$a^2-b^2=(a+b)(a-b)$$\n\n$$x^2+(a+b)x+ab=(x+a)(x+b)$$\n\n複数の文字を含む式では、まず共通因数でくくり、次数の低い文字について整理してから上記の公式やたすきがけを適用するとよい。"
  },
  {
    "id": "formula_3",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "二次方程式の解の公式",
    "latex": "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
    "summary": "因数分解できない2次方程式 $ax^2+bx+c=0$($a\\neq0$)を解くための一般公式。平方完成した式を $x$ について解くことで導かれる。根号の中身 $b^2-4ac$(判別式)の符号で実数解の個数が決まる。",
    "body": "因数分解できない2次方程式 $ax^2+bx+c=0$($a\\neq0$)を解くための一般公式。平方完成した式を $x$ について解くことで導かれる。根号の中身 $b^2-4ac$(判別式)の符号で実数解の個数が決まる。\n\n$$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$$\n\n$$b^2-4ac>0\\Rightarrow\\text{異なる2つの実数解}\\qquad b^2-4ac=0\\Rightarrow\\text{重解}\\qquad b^2-4ac<0\\Rightarrow\\text{実数解なし}$$\n\n(著者補記:定番公式のため追加。$b=2b'$ の形のときは $x=\\dfrac{-b'\\pm\\sqrt{b'^2-ac}}{a}$ という簡略版も使える。)"
  },
  {
    "id": "formula_4",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "循環小数の表し方",
    "latex": "0.333\\cdots=0.\\dot{3}\\qquad 0.148148148\\cdots=0.\\dot{1}4\\dot{8}",
    "summary": "小数点以下のある位置から同じ数字の並びが無限に繰り返される小数を循環小数という。表記は、繰り返される部分(循環節)の最初と最後の数字の上に点を打つ。",
    "body": "小数点以下のある位置から同じ数字の並びが無限に繰り返される小数を循環小数という。表記は、繰り返される部分(循環節)の最初と最後の数字の上に点を打つ。\n\n$$0.333\\cdots=0.\\dot{3}\\qquad 0.148148148\\cdots=0.\\dot{1}4\\dot{8}$$"
  },
  {
    "id": "formula_5",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "循環小数を既約分数に直す方法",
    "latex": "x=0.\\dot{a}\\ \\Rightarrow\\ 10x-x=a\\ \\Rightarrow\\ x=\\frac{a}{9}",
    "summary": "循環小数 $x$ を分数に直すには、循環節の長さ($n$桁)に応じて $10^n x$ を作り、もとの $x$ との差を取ることで循環する小数部分を消去し、整数係数の方程式として $x$ を解く。最後に約分を忘れないこと。",
    "body": "循環小数 $x$ を分数に直すには、循環節の長さ($n$桁)に応じて $10^n x$ を作り、もとの $x$ との差を取ることで循環する小数部分を消去し、整数係数の方程式として $x$ を解く。最後に約分を忘れないこと。\n\n手順の例(循環節が1桁の場合):\n$$x=0.\\dot{a}\\ \\Rightarrow\\ 10x-x=a\\ \\Rightarrow\\ x=\\frac{a}{9}$$"
  },
  {
    "id": "formula_6",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "絶対値の定義",
    "latex": "|X|=\\begin{cases}X & (X\\geq 0)\\\\ -X & (X<0)\\end{cases}",
    "summary": "絶対値は「原点からの距離」を表すため、中身の符号によって場合分けが必要になる。",
    "body": "絶対値は「原点からの距離」を表すため、中身の符号によって場合分けが必要になる。\n\n$$|X|=\\begin{cases}X & (X\\geq 0)\\\\ -X & (X<0)\\end{cases}$$"
  },
  {
    "id": "formula_7",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "絶対値を含む基本不等式",
    "latex": "|x|<A \\iff -A<x<A",
    "summary": "$A$ を正の定数とするとき、絶対値不等式は次のように場合分けなしで同値変形できる。",
    "body": "$A$ を正の定数とするとき、絶対値不等式は次のように場合分けなしで同値変形できる。\n\n$$|x|<A \\iff -A<x<A$$\n\n$$|x|>A \\iff x<-A\\ \\text{または}\\ A<x$$"
  },
  {
    "id": "formula_8",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "一次式を含む絶対値不等式",
    "latex": "|ax+b|\\leq c \\iff -c\\leq ax+b\\leq c",
    "summary": "中身が1次式 $ax+b$($a\\neq0$)のときも、上記と同じ考え方で連立不等式に直せる。",
    "body": "中身が1次式 $ax+b$($a\\neq0$)のときも、上記と同じ考え方で連立不等式に直せる。\n\n$$|ax+b|\\leq c \\iff -c\\leq ax+b\\leq c$$\n\n$$|ax+b|\\geq c \\iff ax+b\\leq -c\\ \\text{または}\\ c\\leq ax+b$$\n\nなお絶対値が2つ以上ある不等式では、各絶対値の中身が0になる点(零点)で定義域を区切り、区間ごとに絶対値記号を外して解いた後、区間条件との共通部分をとって最後に合わせる、という手順になる。"
  },
  {
    "id": "formula_9",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "ルートの分母の有理化(分母が1項)",
    "latex": "\\frac{b}{k\\sqrt{a}}=\\frac{b}{k\\sqrt{a}}\\times\\frac{\\sqrt{a}}{\\sqrt{a}}=\\frac{b\\sqrt{a}}{ka}",
    "summary": "分母・分子に同じ無理数を掛けて、分母を有理数(分母に根号がない形)にする操作。",
    "body": "分母・分子に同じ無理数を掛けて、分母を有理数(分母に根号がない形)にする操作。\n\n$$\\frac{b}{k\\sqrt{a}}=\\frac{b}{k\\sqrt{a}}\\times\\frac{\\sqrt{a}}{\\sqrt{a}}=\\frac{b\\sqrt{a}}{ka}$$"
  },
  {
    "id": "formula_10",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "ルートの分母の有理化(分母が2項)",
    "latex": "\\frac{c}{\\sqrt{a}+\\sqrt{b}}=\\frac{c(\\sqrt{a}-\\sqrt{b})}{a-b}\\qquad\\frac{c}{\\sqrt{a}-\\sqrt{b}}=\\frac{c(\\sqrt{a}+\\sqrt{b})}{a-b}",
    "summary": "分母が $\\sqrt{a}\\pm\\sqrt{b}$ の形のときは、和と差の積 $(\\sqrt{a}+\\sqrt{b})(\\sqrt{a}-\\sqrt{b})=a-b$ を利用して根号を消す。",
    "body": "分母が $\\sqrt{a}\\pm\\sqrt{b}$ の形のときは、和と差の積 $(\\sqrt{a}+\\sqrt{b})(\\sqrt{a}-\\sqrt{b})=a-b$ を利用して根号を消す。\n\n$$\\frac{c}{\\sqrt{a}+\\sqrt{b}}=\\frac{c(\\sqrt{a}-\\sqrt{b})}{a-b}\\qquad\\frac{c}{\\sqrt{a}-\\sqrt{b}}=\\frac{c(\\sqrt{a}+\\sqrt{b})}{a-b}$$"
  },
  {
    "id": "formula_11",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "ルートの分母の有理化(分母が3項)",
    "latex": "\\frac{d}{\\sqrt{a}+\\sqrt{b}+\\sqrt{c}}=\\frac{d}{(\\sqrt{a}+\\sqrt{b})+\\sqrt{c}}\\times\\frac{(\\sqrt{a}+\\sqrt{b})-\\sqrt{c}}{(\\sqrt{a}+\\sqrt{b})-\\sqrt{c}}",
    "summary": "分母が $\\sqrt{a}+\\sqrt{b}+\\sqrt{c}$ のような3項の場合は、まず2項をひとまとめにして「2項の公式」を2段階に分けて適用する。",
    "body": "分母が $\\sqrt{a}+\\sqrt{b}+\\sqrt{c}$ のような3項の場合は、まず2項をひとまとめにして「2項の公式」を2段階に分けて適用する。\n\n$$\\frac{d}{\\sqrt{a}+\\sqrt{b}+\\sqrt{c}}=\\frac{d}{(\\sqrt{a}+\\sqrt{b})+\\sqrt{c}}\\times\\frac{(\\sqrt{a}+\\sqrt{b})-\\sqrt{c}}{(\\sqrt{a}+\\sqrt{b})-\\sqrt{c}}$$\n\nとして分母を有理化した後、残った2項の根号をさらに有理化する。"
  },
  {
    "id": "formula_12",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "対称式の基本変形(2変数)",
    "latex": "x^2+y^2=(x+y)^2-2xy",
    "summary": "文字を入れ替えても形が変わらない式を対称式といい、すべての対称式は基本対称式 $x+y,\\ xy$ で表せる。",
    "body": "文字を入れ替えても形が変わらない式を対称式といい、すべての対称式は基本対称式 $x+y,\\ xy$ で表せる。\n\n$$x^2+y^2=(x+y)^2-2xy$$\n\n$$x^3+y^3=(x+y)^3-3xy(x+y)=(x+y)(x^2-xy+y^2)$$\n\n$$x^4+y^4=(x^2+y^2)^2-2(xy)^2$$\n\n分数形($1/x$ を用いる形)でも同じ考え方が使える。\n\n$$x^2+\\frac{1}{x^2}=\\left(x+\\frac{1}{x}\\right)^2-2\\qquad x^3+\\frac{1}{x^3}=\\left(x+\\frac{1}{x}\\right)^3-3\\left(x+\\frac{1}{x}\\right)$$"
  },
  {
    "id": "formula_13",
    "subject": "数学Ⅰ",
    "category": "数式",
    "name": "対称式の基本変形(3変数)",
    "latex": "x^2+y^2+z^2=(x+y+z)^2-2(xy+yz+zx)",
    "summary": "3変数の基本対称式は $x+y+z,\\ xy+yz+zx,\\ xyz$ の3つ。",
    "body": "3変数の基本対称式は $x+y+z,\\ xy+yz+zx,\\ xyz$ の3つ。\n\n$$x^2+y^2+z^2=(x+y+z)^2-2(xy+yz+zx)$$\n\n$$x^3+y^3+z^3-3xyz=(x+y+z)(x^2+y^2+z^2-xy-yz-zx)$$\n\n(右辺を移項すれば $x^3+y^3+z^3=(x+y+z)(x^2+y^2+z^2-xy-yz-zx)+3xyz$ となる。)\n\n---"
  },
  {
    "id": "formula_14",
    "subject": "数学Ⅰ",
    "category": "論理と集合",
    "name": "ド・モルガンの法則(2つの集合)",
    "latex": "\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}\\qquad \\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}",
    "summary": "「和集合の補集合」は「補集合どうしの共通部分」に、「共通部分の補集合」は「補集合どうしの和集合」になる、という集合と補集合に関する基本法則。",
    "body": "「和集合の補集合」は「補集合どうしの共通部分」に、「共通部分の補集合」は「補集合どうしの和集合」になる、という集合と補集合に関する基本法則。\n\n$$\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}\\qquad \\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$$"
  },
  {
    "id": "formula_15",
    "subject": "数学Ⅰ",
    "category": "論理と集合",
    "name": "ド・モルガンの法則(3つ以上・一般化)",
    "latex": "\\overline{A\\cup B\\cup C}=\\overline{A}\\cap\\overline{B}\\cap\\overline{C}\\qquad \\overline{A\\cap B\\cap C}=\\overline{A}\\cup\\overline{B}\\cup\\overline{C}",
    "summary": "集合が3つ以上、あるいは $n$個になっても同じ規則がそのまま成り立つ。",
    "body": "集合が3つ以上、あるいは $n$個になっても同じ規則がそのまま成り立つ。\n\n$$\\overline{A\\cup B\\cup C}=\\overline{A}\\cap\\overline{B}\\cap\\overline{C}\\qquad \\overline{A\\cap B\\cap C}=\\overline{A}\\cup\\overline{B}\\cup\\overline{C}$$\n\n$$\\overline{A_1\\cup A_2\\cup\\cdots\\cup A_n}=\\overline{A_1}\\cap\\overline{A_2}\\cap\\cdots\\cap\\overline{A_n}$$\n\n$$\\overline{A_1\\cap A_2\\cap\\cdots\\cap A_n}=\\overline{A_1}\\cup\\overline{A_2}\\cup\\cdots\\cup\\overline{A_n}$$\n\n(記号:$A\\cup B$＝和集合、$A\\cap B$＝共通部分、$\\overline{A}$＝補集合。集合の相等 $A=B$ は $A\\subset B$ かつ $B\\subset A$ を示して証明する。)"
  },
  {
    "id": "formula_16",
    "subject": "数学Ⅰ",
    "category": "論理と集合",
    "name": "命題の逆・裏・対偶",
    "latex": "\\text{逆:}\\ q\\Rightarrow p\\qquad \\text{裏:}\\ \\overline{p}\\Rightarrow\\overline{q}\\qquad \\text{対偶:}\\ \\overline{q}\\Rightarrow\\overline{p}",
    "summary": "命題「$p\\Rightarrow q$」($p$:仮定、$q$:結論)に対して、否定を組み合わせた3つの命題が定義される。命題とその対偶は常に真偽が一致し、逆と裏も互いに真偽が一致する(逆や裏は元の命題と真偽が一致するとは限らない)。",
    "body": "命題「$p\\Rightarrow q$」($p$:仮定、$q$:結論)に対して、否定を組み合わせた3つの命題が定義される。命題とその対偶は常に真偽が一致し、逆と裏も互いに真偽が一致する(逆や裏は元の命題と真偽が一致するとは限らない)。\n\n$$\\text{逆:}\\ q\\Rightarrow p\\qquad \\text{裏:}\\ \\overline{p}\\Rightarrow\\overline{q}\\qquad \\text{対偶:}\\ \\overline{q}\\Rightarrow\\overline{p}$$\n\n条件の否定に関するド・モルガン型の関係も命題論理でよく使う。\n\n$$\\overline{p\\ \\text{かつ}\\ q}\\iff \\overline{p}\\ \\text{または}\\ \\overline{q}\\qquad \\overline{p\\ \\text{または}\\ q}\\iff \\overline{p}\\ \\text{かつ}\\ \\overline{q}$$\n\n「すべての $x$ について $p$」の否定は「ある $x$ について $\\overline{p}$」であり、その逆(存在命題の否定は全称命題)も成り立つ。"
  },
  {
    "id": "formula_17",
    "subject": "数学Ⅰ",
    "category": "論理と集合",
    "name": "必要条件と十分条件",
    "latex": "p\\Rightarrow q\\ \\text{が真}\\ \\iff\\ P\\subset Q",
    "summary": "命題 $p\\Rightarrow q$ が真であるとき、$p$ は $q$ の**十分条件**、$q$ は $p$ の**必要条件**であるという。条件 $p,q$ を満たすものの集合をそれぞれ $P,Q$ とすると、この関係は集合の包含関係と対応する。",
    "body": "命題 $p\\Rightarrow q$ が真であるとき、$p$ は $q$ の**十分条件**、$q$ は $p$ の**必要条件**であるという。条件 $p,q$ を満たすものの集合をそれぞれ $P,Q$ とすると、この関係は集合の包含関係と対応する。\n\n$$p\\Rightarrow q\\ \\text{が真}\\ \\iff\\ P\\subset Q$$\n\n$p\\Rightarrow q$ と $q\\Rightarrow p$ がともに真であるとき、$p,q$ は同値であるといい、$p$ は $q$ の**必要十分条件**である。\n\n$$p\\iff q$$"
  },
  {
    "id": "formula_18",
    "subject": "数学Ⅰ",
    "category": "論理と集合",
    "name": "背理法",
    "latex": "",
    "summary": "証明したい命題 $A$ の否定を仮定し、そこから矛盾を導くことで、仮定が誤り、すなわち $A$ が正しいと結論づける証明方法。「〜は無理数である」といった否定的な主張の証明や、「少なくとも1つは〜」の形の命題の証明で特に有効。手順は次の4段階になる。",
    "body": "証明したい命題 $A$ の否定を仮定し、そこから矛盾を導くことで、仮定が誤り、すなわち $A$ が正しいと結論づける証明方法。「〜は無理数である」といった否定的な主張の証明や、「少なくとも1つは〜」の形の命題の証明で特に有効。手順は次の4段階になる。\n\n1. 命題 $A$ の否定を仮定する\n2. その仮定のもとで計算・論理推論を行う\n3. 矛盾(既知の事実と矛盾する結論)を導く\n4. 仮定が誤りだったと結論し、$A$ が真であると確定する\n\n---"
  },
  {
    "id": "formula_19",
    "subject": "数学Ⅰ",
    "category": "2次関数",
    "name": "2次関数の基本形とグラフ(頂点・軸)",
    "latex": "y=a(x-p)^2+q\\qquad \\text{頂点:}(p,q)\\quad \\text{軸:}x=p",
    "summary": "$y=ax^2$($a\\neq0$)のグラフを $x$軸方向に $p$、$y$軸方向に $q$ だけ平行移動すると、頂点 $(p,q)$、軸 $x=p$ の放物線になる。",
    "body": "$y=ax^2$($a\\neq0$)のグラフを $x$軸方向に $p$、$y$軸方向に $q$ だけ平行移動すると、頂点 $(p,q)$、軸 $x=p$ の放物線になる。\n\n$$y=a(x-p)^2+q\\qquad \\text{頂点:}(p,q)\\quad \\text{軸:}x=p$$"
  },
  {
    "id": "formula_20",
    "subject": "数学Ⅰ",
    "category": "2次関数",
    "name": "2次関数の一般形と平方完成",
    "latex": "y=ax^2+bx+c=a\\left(x+\\frac{b}{2a}\\right)^2+\\frac{4ac-b^2}{4a}",
    "summary": "一般形 $y=ax^2+bx+c$($a\\neq0$)は平方完成によって基本形に変形でき、頂点と軸の座標が次のように得られる。",
    "body": "一般形 $y=ax^2+bx+c$($a\\neq0$)は平方完成によって基本形に変形でき、頂点と軸の座標が次のように得られる。\n\n$$y=ax^2+bx+c=a\\left(x+\\frac{b}{2a}\\right)^2+\\frac{4ac-b^2}{4a}$$\n\n$$\\text{頂点:}\\left(-\\frac{b}{2a},\\ \\frac{4ac-b^2}{4a}\\right)\\qquad \\text{軸:}x=-\\frac{b}{2a}$$\n\nグラフの平行移動を式で表す場合は、移動後の $x,y$ に対して「$x$ を $x-p$ に、$y$ を $y-q$ に置き換える」という操作でも同じ結果が得られる。\n\n---"
  },
  {
    "id": "formula_21",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "三角比の定義(単位円)",
    "latex": "\\cos\\theta=x\\qquad \\sin\\theta=y\\qquad \\tan\\theta=\\frac{y}{x}=\\frac{\\sin\\theta}{\\cos\\theta}",
    "summary": "原点中心・半径1の単位円周上に、$x$軸正方向から角 $\\theta$ だけ回転した点 $P(x,y)$ をとると、$\\cos\\theta,\\sin\\theta,\\tan\\theta$ は次のように定義される($\\tan\\theta$ は直線 $OP$ の傾きに相当し、$\\cos\\theta\\neq0$ が必要)。",
    "body": "原点中心・半径1の単位円周上に、$x$軸正方向から角 $\\theta$ だけ回転した点 $P(x,y)$ をとると、$\\cos\\theta,\\sin\\theta,\\tan\\theta$ は次のように定義される($\\tan\\theta$ は直線 $OP$ の傾きに相当し、$\\cos\\theta\\neq0$ が必要)。\n\n$$\\cos\\theta=x\\qquad \\sin\\theta=y\\qquad \\tan\\theta=\\frac{y}{x}=\\frac{\\sin\\theta}{\\cos\\theta}$$\n\n$\\theta=90^\\circ$ では $x=0$ となるため $\\tan90^\\circ$ は定義できない。"
  },
  {
    "id": "formula_22",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "特殊角の三角比表",
    "latex": "",
    "summary": "$1:1:\\sqrt2$ の直角二等辺三角形と $1:2:\\sqrt3$ の直角三角形を覚えておけば、以下の表は自力で導ける。",
    "body": "$1:1:\\sqrt2$ の直角二等辺三角形と $1:2:\\sqrt3$ の直角三角形を覚えておけば、以下の表は自力で導ける。\n\n| $\\theta$ | $0^\\circ$ | $30^\\circ$ | $45^\\circ$ | $60^\\circ$ | $90^\\circ$ | $120^\\circ$ | $135^\\circ$ | $150^\\circ$ | $180^\\circ$ |\n|---|---|---|---|---|---|---|---|---|---|\n| $\\sin\\theta$ | $0$ | $\\dfrac12$ | $\\dfrac{1}{\\sqrt2}$ | $\\dfrac{\\sqrt3}{2}$ | $1$ | $\\dfrac{\\sqrt3}{2}$ | $\\dfrac{1}{\\sqrt2}$ | $\\dfrac12$ | $0$ |\n| $\\cos\\theta$ | $1$ | $\\dfrac{\\sqrt3}{2}$ | $\\dfrac{1}{\\sqrt2}$ | $\\dfrac12$ | $0$ | $-\\dfrac12$ | $-\\dfrac{1}{\\sqrt2}$ | $-\\dfrac{\\sqrt3}{2}$ | $-1$ |\n| $\\tan\\theta$ | $0$ | $\\dfrac{1}{\\sqrt3}$ | $1$ | $\\sqrt3$ | 定義なし | $-\\sqrt3$ | $-1$ | $-\\dfrac{1}{\\sqrt3}$ | $0$ |"
  },
  {
    "id": "formula_23",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "三角比の相互関係",
    "latex": "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}",
    "summary": "単位円上の点の座標に関する三平方の定理から、$\\sin,\\cos$ の間に基本恒等式が成り立つ。これを $\\cos^2\\theta$ で割ると $\\tan$ を含む式が得られる。",
    "body": "単位円上の点の座標に関する三平方の定理から、$\\sin,\\cos$ の間に基本恒等式が成り立つ。これを $\\cos^2\\theta$ で割ると $\\tan$ を含む式が得られる。\n\n$$\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$$\n\n$$\\sin^2\\theta+\\cos^2\\theta=1$$\n\n$$1+\\tan^2\\theta=\\frac{1}{\\cos^2\\theta}\\quad(\\cos\\theta\\neq0)$$"
  },
  {
    "id": "formula_24",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "三角比の変換公式",
    "latex": "\\sin(90^\\circ-\\theta)=\\cos\\theta,\\quad \\cos(90^\\circ-\\theta)=\\sin\\theta,\\quad \\tan(90^\\circ-\\theta)=\\frac{1}{\\tan\\theta}",
    "summary": "直角三角形の回転や単位円上の対称性から、次の変換公式が導かれる。",
    "body": "直角三角形の回転や単位円上の対称性から、次の変換公式が導かれる。\n\n$$\\sin(90^\\circ-\\theta)=\\cos\\theta,\\quad \\cos(90^\\circ-\\theta)=\\sin\\theta,\\quad \\tan(90^\\circ-\\theta)=\\frac{1}{\\tan\\theta}$$\n\n$$\\sin(90^\\circ+\\theta)=\\cos\\theta,\\quad \\cos(90^\\circ+\\theta)=-\\sin\\theta,\\quad \\tan(90^\\circ+\\theta)=-\\frac{1}{\\tan\\theta}$$\n\n$$\\sin(180^\\circ-\\theta)=\\sin\\theta,\\quad \\cos(180^\\circ-\\theta)=-\\cos\\theta,\\quad \\tan(180^\\circ-\\theta)=-\\tan\\theta$$"
  },
  {
    "id": "formula_25",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "三角形の面積公式(三角比を利用)",
    "latex": "S=\\frac12 ab\\sin\\theta",
    "summary": "2辺の長さ $a,b$ とその間の角 $\\theta$ が分かっているとき、底辺 $\\times$ 高さ $\\div2$ の高さ部分を $a\\sin\\theta$ と表すことで、次の面積公式が得られる。3辺しか分かっていない場合は、先に余弦定理で $\\cos\\theta$ を求め、$\\sin^2\\theta+\\cos^2\\theta=1$ から $\\sin\\theta$ を出して用いる。",
    "body": "2辺の長さ $a,b$ とその間の角 $\\theta$ が分かっているとき、底辺 $\\times$ 高さ $\\div2$ の高さ部分を $a\\sin\\theta$ と表すことで、次の面積公式が得られる。3辺しか分かっていない場合は、先に余弦定理で $\\cos\\theta$ を求め、$\\sin^2\\theta+\\cos^2\\theta=1$ から $\\sin\\theta$ を出して用いる。\n\n$$S=\\frac12 ab\\sin\\theta$$"
  },
  {
    "id": "formula_26",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "正弦定理",
    "latex": "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R",
    "summary": "三角形ABCの外接円の半径を $R$ とすると、各辺とその対角の正弦の比はすべて外接円の直径 $2R$ に等しい。外接円の半径を求めたいときや、角度から辺の比を求めたいときに使う。",
    "body": "三角形ABCの外接円の半径を $R$ とすると、各辺とその対角の正弦の比はすべて外接円の直径 $2R$ に等しい。外接円の半径を求めたいときや、角度から辺の比を求めたいときに使う。\n\n$$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$$"
  },
  {
    "id": "formula_27",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "余弦定理",
    "latex": "a^2=b^2+c^2-2bc\\cos A\\qquad b^2=c^2+a^2-2ca\\cos B\\qquad c^2=a^2+b^2-2ab\\cos C",
    "summary": "三角形の1辺の2乗を、他の2辺とその間の角の余弦で表す定理。「2辺と間の角」から残りの辺を求める場合や、「3辺」から角度を求める場合(下の変形式)に使う。$\\angle A=90^\\circ$ の場合はそのまま三平方の定理に一致する。",
    "body": "三角形の1辺の2乗を、他の2辺とその間の角の余弦で表す定理。「2辺と間の角」から残りの辺を求める場合や、「3辺」から角度を求める場合(下の変形式)に使う。$\\angle A=90^\\circ$ の場合はそのまま三平方の定理に一致する。\n\n$$a^2=b^2+c^2-2bc\\cos A\\qquad b^2=c^2+a^2-2ca\\cos B\\qquad c^2=a^2+b^2-2ab\\cos C$$\n\n角度を求めるときは次のように変形して使う(例:$\\angle B$ を求める場合)。\n\n$$\\cos B=\\frac{c^2+a^2-b^2}{2ca}$$"
  },
  {
    "id": "formula_28",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "ヘロンの公式",
    "latex": "s=\\frac{a+b+c}{2}\\qquad S=\\sqrt{s(s-a)(s-b)(s-c)}",
    "summary": "3辺の長さ $a,b,c$ だけから三角形の面積を直接求められる公式。$s$ は半周長。",
    "body": "3辺の長さ $a,b,c$ だけから三角形の面積を直接求められる公式。$s$ は半周長。\n\n$$s=\\frac{a+b+c}{2}\\qquad S=\\sqrt{s(s-a)(s-b)(s-c)}$$"
  },
  {
    "id": "formula_29",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "三角形の内接円の半径",
    "latex": "S=\\frac12 r(a+b+c)\\quad\\Longrightarrow\\quad r=\\frac{2S}{a+b+c}",
    "summary": "三角形の面積 $S$ と3辺の長さ $a,b,c$ が分かっているとき、内接円の半径 $r$ は次の式で求まる(内接円の中心から3辺までの距離がすべて $r$ であることから、三角形の面積を3つの小三角形の面積の和として表すと導ける)。",
    "body": "三角形の面積 $S$ と3辺の長さ $a,b,c$ が分かっているとき、内接円の半径 $r$ は次の式で求まる(内接円の中心から3辺までの距離がすべて $r$ であることから、三角形の面積を3つの小三角形の面積の和として表すと導ける)。\n\n$$S=\\frac12 r(a+b+c)\\quad\\Longrightarrow\\quad r=\\frac{2S}{a+b+c}$$"
  },
  {
    "id": "formula_30",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "正四面体の公式",
    "latex": "\\text{底面積:}\\ \\frac{\\sqrt3}{4}a^2\\qquad \\text{高さ:}\\ h=\\frac{\\sqrt6}{3}a",
    "summary": "1辺の長さを $a$ とする正四面体について、底面(正三角形)の重心に頂点から下ろした垂線の性質(頂点から底面重心までの距離:底面重心から底面の頂点までの距離 $=2:1$ の中線の性質)を用いると、高さ・体積・内接球/外接球の半径が次のように求まる。",
    "body": "1辺の長さを $a$ とする正四面体について、底面(正三角形)の重心に頂点から下ろした垂線の性質(頂点から底面重心までの距離:底面重心から底面の頂点までの距離 $=2:1$ の中線の性質)を用いると、高さ・体積・内接球/外接球の半径が次のように求まる。\n\n$$\\text{底面積:}\\ \\frac{\\sqrt3}{4}a^2\\qquad \\text{高さ:}\\ h=\\frac{\\sqrt6}{3}a$$\n\n$$\\text{体積:}\\ V=\\frac13\\times\\frac{\\sqrt3}{4}a^2\\times\\frac{\\sqrt6}{3}a=\\frac{\\sqrt2}{12}a^3$$\n\n$$\\text{内接球の半径:}\\ r=\\frac{\\sqrt6}{12}a\\ \\left(=\\frac{h}{4}\\right)\\qquad \\text{外接球の半径:}\\ R=\\frac{\\sqrt6}{4}a\\ \\left(=\\frac{3h}{4}\\right)$$"
  },
  {
    "id": "formula_31",
    "subject": "数学Ⅰ",
    "category": "三角比(sin・cos・tan)",
    "name": "扇形の弧の長さと面積(補足)",
    "latex": "l=2\\pi r\\times\\frac{a}{360}\\qquad S=\\pi r^2\\times\\frac{a}{360}",
    "summary": "半径 $r$、中心角 $a^\\circ$(度数法)の扇形について、円全体に対する中心角の割合をかければ弧の長さ・面積が求まる。",
    "body": "半径 $r$、中心角 $a^\\circ$(度数法)の扇形について、円全体に対する中心角の割合をかければ弧の長さ・面積が求まる。\n\n$$l=2\\pi r\\times\\frac{a}{360}\\qquad S=\\pi r^2\\times\\frac{a}{360}$$\n\n弧度法で中心角を $\\theta$(ラジアン)とすると、次のように簡潔な形になり、$S=\\dfrac12 lr$ という関係も成り立つ。\n\n$$l=r\\theta\\qquad S=\\frac12 r^2\\theta=\\frac12 lr$$"
  },
  {
    "id": "formula_32",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "順列の公式",
    "latex": "_nP_r = n(n-1)(n-2)\\cdots(n-r+1) = \\frac{n!}{(n-r)!}",
    "summary": "異なる $n$ 個のものから $r$ 個を取り出し、順序をつけて並べる場合の数。「並べ方」を数えるときに使う。",
    "body": "異なる $n$ 個のものから $r$ 個を取り出し、順序をつけて並べる場合の数。「並べ方」を数えるときに使う。\n\n$$_nP_r = n(n-1)(n-2)\\cdots(n-r+1) = \\frac{n!}{(n-r)!}$$"
  },
  {
    "id": "formula_33",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "組み合わせの公式",
    "latex": "_nC_r = \\frac{{}_nP_r}{r!} = \\frac{n!}{r!(n-r)!}",
    "summary": "異なる $n$ 個のものから $r$ 個を、順序を区別せずに選び出す場合の数。「選び方」を数えるときに使う。",
    "body": "異なる $n$ 個のものから $r$ 個を、順序を区別せずに選び出す場合の数。「選び方」を数えるときに使う。\n\n$$_nC_r = \\frac{{}_nP_r}{r!} = \\frac{n!}{r!(n-r)!}$$"
  },
  {
    "id": "formula_34",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "階乗",
    "latex": "n! = n(n-1)(n-2)\\cdots 3\\cdot2\\cdot1, \\qquad 0! = 1",
    "summary": "$1$ から $n$ までの整数をすべて掛け合わせたもの。順列・組み合わせの計算の基礎となる。",
    "body": "$1$ から $n$ までの整数をすべて掛け合わせたもの。順列・組み合わせの計算の基礎となる。\n\n$$n! = n(n-1)(n-2)\\cdots 3\\cdot2\\cdot1, \\qquad 0! = 1$$"
  },
  {
    "id": "formula_35",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "組み合わせの性質①(対称性)",
    "latex": "_nC_r = {}_nC_{n-r}",
    "summary": "「$r$ 個選ぶ」ことと「残す $n-r$ 個を選ぶ」ことは同じ選び方の数になる、という対称性を表す。",
    "body": "「$r$ 個選ぶ」ことと「残す $n-r$ 個を選ぶ」ことは同じ選び方の数になる、という対称性を表す。\n\n$$_nC_r = {}_nC_{n-r}$$"
  },
  {
    "id": "formula_36",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "組み合わせの性質②(パスカルの三角形の関係式)",
    "latex": "_nC_r = {}_{n-1}C_{r-1} + {}_{n-1}C_r",
    "summary": "ある1つの要素に着目し、「それを選ぶ場合」と「選ばない場合」に分けて数え上げる漸化式。パスカルの三角形の構造の根拠になる。",
    "body": "ある1つの要素に着目し、「それを選ぶ場合」と「選ばない場合」に分けて数え上げる漸化式。パスカルの三角形の構造の根拠になる。\n\n$$_nC_r = {}_{n-1}C_{r-1} + {}_{n-1}C_r$$"
  },
  {
    "id": "formula_37",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "円順列(補足)",
    "latex": "(n-1)!",
    "summary": "異なる $n$ 個のものを円形に並べる場合の数。回転して同じ配置になるものは1通りとみなすため、通常の順列を $n$ で割る。",
    "body": "異なる $n$ 個のものを円形に並べる場合の数。回転して同じ配置になるものは1通りとみなすため、通常の順列を $n$ で割る。\n\n$$(n-1)!$$"
  },
  {
    "id": "formula_38",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "じゅず順列(補足)",
    "latex": "\\frac{(n-1)!}{2}",
    "summary": "円順列のうち、裏返して一致するもの(鏡映)も同一視する場合の数。ネックレスのような対称性を持つ配置に使う。",
    "body": "円順列のうち、裏返して一致するもの(鏡映)も同一視する場合の数。ネックレスのような対称性を持つ配置に使う。\n\n$$\\frac{(n-1)!}{2}$$"
  },
  {
    "id": "formula_39",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "重複順列(補足)",
    "latex": "n^r",
    "summary": "異なる $n$ 個のものから重複を許して $r$ 個を選び、順序をつけて並べる場合の数。",
    "body": "異なる $n$ 個のものから重複を許して $r$ 個を選び、順序をつけて並べる場合の数。\n\n$$n^r$$"
  },
  {
    "id": "formula_40",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "同じものを含む順列(補足)",
    "latex": "\\frac{n!}{p!\\,q!\\,r!\\cdots} \\qquad (p+q+r+\\cdots = n)",
    "summary": "$n$ 個の中に同じものが $p$ 個、$q$ 個、$r$ 個、…とある場合の、それら全部を並べる場合の数。",
    "body": "$n$ 個の中に同じものが $p$ 個、$q$ 個、$r$ 個、…とある場合の、それら全部を並べる場合の数。\n\n$$\\frac{n!}{p!\\,q!\\,r!\\cdots} \\qquad (p+q+r+\\cdots = n)$$"
  },
  {
    "id": "formula_41",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "重複組み合わせ(補足)",
    "latex": "_{n+r-1}C_r",
    "summary": "異なる $n$ 種類のものから、重複を許して $r$ 個を選ぶ場合の数。",
    "body": "異なる $n$ 種類のものから、重複を許して $r$ 個を選ぶ場合の数。\n\n$$_{n+r-1}C_r$$"
  },
  {
    "id": "formula_42",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "二項定理(補足)",
    "latex": "(a+b)^n = \\sum_{k=0}^{n} {}_nC_k\\, a^{n-k}b^{k}",
    "summary": "$(a+b)^n$ を展開したときの各項の係数を組み合わせの数で表す定理。確率の反復試行の計算にもつながる。",
    "body": "$(a+b)^n$ を展開したときの各項の係数を組み合わせの数で表す定理。確率の反復試行の計算にもつながる。\n\n$$(a+b)^n = \\sum_{k=0}^{n} {}_nC_k\\, a^{n-k}b^{k}$$"
  },
  {
    "id": "formula_43",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "確率の加法定理(補足)",
    "latex": "P(A\\cup B) = P(A) + P(B) \\quad (A\\cap B=\\emptyset)",
    "summary": "事象 $A$ と事象 $B$ が同時に起こりえない(排反である)とき、どちらか一方が起こる確率は個々の確率の和になる。",
    "body": "事象 $A$ と事象 $B$ が同時に起こりえない(排反である)とき、どちらか一方が起こる確率は個々の確率の和になる。\n\n$$P(A\\cup B) = P(A) + P(B) \\quad (A\\cap B=\\emptyset)$$\n\n一般の(排反とは限らない)場合は次の形になる。\n\n$$P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$$"
  },
  {
    "id": "formula_44",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "確率の乗法定理・独立試行の確率(補足)",
    "latex": "P(A\\cap B) = P(A)\\,P_A(B)",
    "summary": "事象 $A$ が起こったという条件のもとで $B$ が起こる確率(条件付き確率)を用いた一般式と、$A$、$B$ が互いに影響しない(独立である)場合の式。",
    "body": "事象 $A$ が起こったという条件のもとで $B$ が起こる確率(条件付き確率)を用いた一般式と、$A$、$B$ が互いに影響しない(独立である)場合の式。\n\n$$P(A\\cap B) = P(A)\\,P_A(B)$$\n$$P(A\\cap B) = P(A)\\,P(B) \\quad (A,B\\text{が独立のとき})$$"
  },
  {
    "id": "formula_45",
    "subject": "数学A",
    "category": "場合の数・確率",
    "name": "反復試行の確率(補足)",
    "latex": "_nC_r\\, p^r (1-p)^{n-r}",
    "summary": "1回の試行で事象 $A$ が起こる確率が $p$ のとき、その試行を $n$ 回繰り返してちょうど $r$ 回 $A$ が起こる確率。二項定理の係数がそのまま使われる。",
    "body": "1回の試行で事象 $A$ が起こる確率が $p$ のとき、その試行を $n$ 回繰り返してちょうど $r$ 回 $A$ が起こる確率。二項定理の係数がそのまま使われる。\n\n$$_nC_r\\, p^r (1-p)^{n-r}$$\n\n---"
  },
  {
    "id": "formula_46",
    "subject": "数学A",
    "category": "平面図形",
    "name": "角の二等分線の性質",
    "latex": "AB:AC = BP:PC",
    "summary": "三角形の内角の二等分線は、対辺をその二等分線をはさむ2辺の長さの比に内分する、という性質。三角形の辺の比を求める基本ツール。",
    "body": "三角形の内角の二等分線は、対辺をその二等分線をはさむ2辺の長さの比に内分する、という性質。三角形の辺の比を求める基本ツール。\n\n線分 $AP$ が $\\angle A$ を二等分し、$P$ が辺 $BC$ 上にあるとき、\n\n$$AB:AC = BP:PC$$"
  },
  {
    "id": "formula_47",
    "subject": "数学A",
    "category": "平面図形",
    "name": "三角形の重心",
    "latex": "AG:GL = BG:GM = CG:GN = 2:1",
    "summary": "三角形の3本の中線(各頂点と対辺の中点を結ぶ線分)は必ず1点で交わり、その交点を重心という。重心は各中線を頂点側から $2:1$ に内分する。",
    "body": "三角形の3本の中線(各頂点と対辺の中点を結ぶ線分)は必ず1点で交わり、その交点を重心という。重心は各中線を頂点側から $2:1$ に内分する。\n\n頂点 $A,B,C$ から対辺の中点 $L,M,N$ への中線の交点を $G$ とすると、\n\n$$AG:GL = BG:GM = CG:GN = 2:1$$"
  },
  {
    "id": "formula_48",
    "subject": "数学A",
    "category": "平面図形",
    "name": "三角形の外心",
    "latex": "OA = OB = OC \\;(=R,\\ \\text{外接円の半径})",
    "summary": "三角形の3辺それぞれの垂直二等分線は1点で交わり、その交点を外心という。外心は3頂点から等距離にあり、三角形の外接円の中心になる。",
    "body": "三角形の3辺それぞれの垂直二等分線は1点で交わり、その交点を外心という。外心は3頂点から等距離にあり、三角形の外接円の中心になる。\n\n$$OA = OB = OC \\;(=R,\\ \\text{外接円の半径})$$\n\n**補足:外接円の半径の公式**\n外心と直接結びつく実用公式として、正弦定理・面積公式から導かれる外接円の半径がある(辺の長さや面積から半径を求める際に使う)。\n\n$$R = \\frac{a}{2\\sin A} = \\frac{abc}{4S}$$\n($a,b,c$:三角形の3辺、$S$:三角形の面積)"
  },
  {
    "id": "formula_49",
    "subject": "数学A",
    "category": "平面図形",
    "name": "三角形の内心",
    "latex": "AI:ID = BA:BD",
    "summary": "三角形の3つの内角の二等分線は1点で交わり、その交点を内心という。内心は3辺までの距離が等しく、内接円の中心になる。頂点 $A$ からの二等分線と辺 $BC$ の交点を $D$ とすると、三角形 $ABD$ に対して二等分線の性質を再適用することで次が成り立つ。",
    "body": "三角形の3つの内角の二等分線は1点で交わり、その交点を内心という。内心は3辺までの距離が等しく、内接円の中心になる。頂点 $A$ からの二等分線と辺 $BC$ の交点を $D$ とすると、三角形 $ABD$ に対して二等分線の性質を再適用することで次が成り立つ。\n\n$$AI:ID = BA:BD$$\n\n**補足:内接円の半径の公式**\n内心と組み合わせてよく使う実用公式として、三角形の面積を半周長と内接円の半径で表す式がある。\n\n$$S = r\\cdot s, \\qquad s=\\frac{a+b+c}{2}\\ (\\text{半周長})$$"
  },
  {
    "id": "formula_50",
    "subject": "数学A",
    "category": "平面図形",
    "name": "三角形の垂心",
    "latex": "",
    "summary": "三角形の各頂点から対辺(またはその延長)に下ろした3本の垂線は1点で交わり、その交点を垂心という。座標や具体的な長さの公式というより、「3垂線が1点に集まる」という共点性の定理である。",
    "body": "三角形の各頂点から対辺(またはその延長)に下ろした3本の垂線は1点で交わり、その交点を垂心という。座標や具体的な長さの公式というより、「3垂線が1点に集まる」という共点性の定理である。"
  },
  {
    "id": "formula_51",
    "subject": "数学A",
    "category": "平面図形",
    "name": "三角形の傍心(補足)",
    "latex": "r_A = \\frac{S}{s-a}",
    "summary": "1つの内角の二等分線と、他の2つの頂点における外角の二等分線は1点で交わり、その交点を傍心という。三角形には傍心が3つ存在し、それぞれが1つの傍接円(三角形の1辺と他の2辺の延長に接する円)の中心になる。頂点 $A$ 側の傍心を $I_A$、その傍接円の半径を $r_A$ とすると、",
    "body": "1つの内角の二等分線と、他の2つの頂点における外角の二等分線は1点で交わり、その交点を傍心という。三角形には傍心が3つ存在し、それぞれが1つの傍接円(三角形の1辺と他の2辺の延長に接する円)の中心になる。頂点 $A$ 側の傍心を $I_A$、その傍接円の半径を $r_A$ とすると、\n\n$$r_A = \\frac{S}{s-a}$$"
  },
  {
    "id": "formula_52",
    "subject": "数学A",
    "category": "平面図形",
    "name": "中線定理",
    "latex": "AB^2 + AC^2 = 2(AM^2 + BM^2)",
    "summary": "三角形の1辺の中点と対頂点を結ぶ中線の長さと、他の2辺の長さの関係を表す定理。中線の長さを求めるときによく使う(一般には**アポロニウスの定理**とも呼ばれる)。",
    "body": "三角形の1辺の中点と対頂点を結ぶ中線の長さと、他の2辺の長さの関係を表す定理。中線の長さを求めるときによく使う(一般には**アポロニウスの定理**とも呼ばれる)。\n\n辺 $BC$ の中点を $M$ とすると、\n\n$$AB^2 + AC^2 = 2(AM^2 + BM^2)$$"
  },
  {
    "id": "formula_53",
    "subject": "数学A",
    "category": "平面図形",
    "name": "チェバの定理",
    "latex": "\\frac{AR}{RB}\\cdot\\frac{BP}{PC}\\cdot\\frac{CQ}{QA} = 1",
    "summary": "三角形の頂点から対辺(またはその延長)に引いた3本の直線(セビアン)が1点で交わるための、辺の分点比に関する条件。",
    "body": "三角形の頂点から対辺(またはその延長)に引いた3本の直線(セビアン)が1点で交わるための、辺の分点比に関する条件。\n\n三角形 $ABC$ の内部(または外部)の点 $O$ を通る直線 $AO,BO,CO$ が、辺 $BC,CA,AB$(またはその延長)とそれぞれ $P,Q,R$ で交わるとき、\n\n$$\\frac{AR}{RB}\\cdot\\frac{BP}{PC}\\cdot\\frac{CQ}{QA} = 1$$\n\n**チェバの定理の逆**\n辺 $BC,CA,AB$(またはその延長)上の点 $P,Q,R$(うち1個または3個が辺上にある)について上の等式が成り立てば、直線 $AP,BQ,CR$ は1点で交わる(または平行である)。"
  },
  {
    "id": "formula_54",
    "subject": "数学A",
    "category": "平面図形",
    "name": "メネラウスの定理",
    "latex": "\\frac{AR}{RB}\\cdot\\frac{BP}{PC}\\cdot\\frac{CQ}{QA} = 1",
    "summary": "三角形の3辺(またはその延長)を、三角形の頂点を通らない1本の直線が横切るとき、その分点比が満たす関係式。三角形の外部の直線と辺の比を扱うときに使う。",
    "body": "三角形の3辺(またはその延長)を、三角形の頂点を通らない1本の直線が横切るとき、その分点比が満たす関係式。三角形の外部の直線と辺の比を扱うときに使う。\n\n直線 $\\ell$ が辺 $BC,CA,AB$(またはその延長)とそれぞれ $P,Q,R$ で交わるとき、\n\n$$\\frac{AR}{RB}\\cdot\\frac{BP}{PC}\\cdot\\frac{CQ}{QA} = 1$$\n\n**メネラウスの定理の逆**\n点 $P,Q,R$(うち1個または3個が辺の延長上にある)について上の等式が成り立てば、$P,Q,R$ は同一直線上にある。"
  },
  {
    "id": "formula_55",
    "subject": "数学A",
    "category": "平面図形",
    "name": "トレミーの定理",
    "latex": "AC \\cdot BD = AB\\cdot CD + AD\\cdot BC",
    "summary": "円に内接する四角形において、対角線の積と対辺の積の関係を表す定理。",
    "body": "円に内接する四角形において、対角線の積と対辺の積の関係を表す定理。\n\n四角形 $ABCD$ が円に内接するとき、\n\n$$AC \\cdot BD = AB\\cdot CD + AD\\cdot BC$$\n\n(「対辺の積の和＝対角線の積」と覚える)"
  },
  {
    "id": "formula_56",
    "subject": "数学A",
    "category": "平面図形",
    "name": "接弦定理",
    "latex": "\\angle BAT = \\angle ACB",
    "summary": "円の接線と弦が作る角が、その角の内部に含まれる弧に対する円周角に等しいという定理。円と接線が絡む角度計算で使う。",
    "body": "円の接線と弦が作る角が、その角の内部に含まれる弧に対する円周角に等しいという定理。円と接線が絡む角度計算で使う。\n\n点 $A$ における接線 $AT$ と弦 $AB$ が作る角、および弧 $AB$ 上の点 $C$ に対する円周角について、\n\n$$\\angle BAT = \\angle ACB$$\n\n**接弦定理の逆**\n直線 $AB$ に対して点 $T$(半直線 $AT$)と点 $C$ が同じ側にあり、$\\angle BAT = \\angle ACB$ が成り立てば、直線 $AT$ は点 $A$ で円に接する。"
  },
  {
    "id": "formula_57",
    "subject": "数学A",
    "category": "平面図形",
    "name": "方べきの定理",
    "latex": "PA\\cdot PB = PC\\cdot PD",
    "summary": "円と2直線(弦・割線・接線)の交点にできる線分の積が一定になるという定理。3つのパターンがある。",
    "body": "円と2直線(弦・割線・接線)の交点にできる線分の積が一定になるという定理。3つのパターンがある。\n\n**Ⅰ:円内で2弦が交わる場合**　弦 $AB,CD$ の交点を $P$ とすると、\n$$PA\\cdot PB = PC\\cdot PD$$\n\n**Ⅱ:円外で2弦の延長が交わる場合**　弦 $AB,CD$ の延長の交点を $P$ とすると、\n$$PA\\cdot PB = PC\\cdot PD$$\n\n**Ⅲ:接線と割線の場合**　円外の点 $P$ からの接線の接点を $T$、割線と円の交点を $A,B$ とすると、\n$$PA\\cdot PB = PT^2$$\n\n**逆(Ⅰ・Ⅱ)**:$PA\\cdot PB = PC\\cdot PD$ が成り立てば、4点 $A,B,C,D$ は同一円周上にある。\n\n**逆(Ⅲ)**:$PA\\cdot PB = PT^2$ が成り立てば、直線 $PT$ は三角形 $TAB$ の外接円に接する。\n\n**補足:円に内接する四角形の性質**\n方べきの定理・トレミーの定理としばしば併用される基本性質として、円に内接する四角形の対角の和は $180^\\circ$ になる、という性質がある。\n\n$$\\angle A + \\angle C = 180^\\circ, \\qquad \\angle B + \\angle D = 180^\\circ$$\n\n---"
  },
  {
    "id": "formula_58",
    "subject": "数学A",
    "category": "整数",
    "name": "約数の個数の公式",
    "latex": "(a+1)(b+1)(c+1)\\cdots",
    "summary": "自然数を素因数分解した結果から、正の約数の個数を求める公式。各素因数の指数に1を足して掛け合わせる。",
    "body": "自然数を素因数分解した結果から、正の約数の個数を求める公式。各素因数の指数に1を足して掛け合わせる。\n\n$N = p^a q^b r^c \\cdots$($p,q,r,\\ldots$は異なる素数)と素因数分解できるとき、$N$の正の約数の個数は\n\n$$(a+1)(b+1)(c+1)\\cdots$$"
  },
  {
    "id": "formula_59",
    "subject": "数学A",
    "category": "整数",
    "name": "約数の総和の公式(補足)",
    "latex": "(1+p+p^2+\\cdots+p^a)(1+q+q^2+\\cdots+q^b)(1+r+\\cdots+r^c)\\cdots",
    "summary": "約数の個数と対になる公式で、正の約数すべての和を求める。個数の公式とセットで頻出。",
    "body": "約数の個数と対になる公式で、正の約数すべての和を求める。個数の公式とセットで頻出。\n\n$$(1+p+p^2+\\cdots+p^a)(1+q+q^2+\\cdots+q^b)(1+r+\\cdots+r^c)\\cdots$$"
  },
  {
    "id": "formula_60",
    "subject": "数学A",
    "category": "整数",
    "name": "合同式(mod)の定義",
    "latex": "a \\equiv b \\pmod{m} \\iff a-b \\text{ が } m \\text{ の倍数}",
    "summary": "2つの整数 $a,b$ を正の整数 $m$ で割った余りが等しいことを表す記法。整数問題で余りの規則性を扱う際の基本言語。",
    "body": "2つの整数 $a,b$ を正の整数 $m$ で割った余りが等しいことを表す記法。整数問題で余りの規則性を扱う際の基本言語。\n\n$$a \\equiv b \\pmod{m} \\iff a-b \\text{ が } m \\text{ の倍数}$$"
  },
  {
    "id": "formula_61",
    "subject": "数学A",
    "category": "整数",
    "name": "合同式の性質(加法・減法・乗法・べき乗)",
    "latex": "a+c \\equiv b+d \\pmod m",
    "summary": "合同式は通常の等式と同じように加減乗ができ、べき乗を取ることもできる、という性質。",
    "body": "合同式は通常の等式と同じように加減乗ができ、べき乗を取ることもできる、という性質。\n\n$a\\equiv b\\pmod m,\\ c\\equiv d\\pmod m$ のとき、\n\n$$a+c \\equiv b+d \\pmod m$$\n$$a-c \\equiv b-d \\pmod m$$\n$$ac \\equiv bd \\pmod m$$\n$$a^n \\equiv b^n \\pmod m \\quad (n\\text{は自然数})$$"
  },
  {
    "id": "formula_62",
    "subject": "数学A",
    "category": "整数",
    "name": "合同式の除法(約分)の性質",
    "latex": "ax \\equiv ay \\pmod m \\implies x \\equiv y \\pmod m",
    "summary": "合同式では、両辺を同じ数で割ることは常には許されず、割る数が法と互いに素であるときに限り成立する、という注意点。",
    "body": "合同式では、両辺を同じ数で割ることは常には許されず、割る数が法と互いに素であるときに限り成立する、という注意点。\n\n$a$ と $m$ が互いに素であるとき、\n\n$$ax \\equiv ay \\pmod m \\implies x \\equiv y \\pmod m$$"
  },
  {
    "id": "formula_63",
    "subject": "数学A",
    "category": "整数",
    "name": "ユークリッドの互除法(割り算と最大公約数の関係)",
    "latex": "\\gcd(a,b) = \\gcd(b,r)",
    "summary": "2つの自然数の最大公約数は、割り算の余りに関して不変であるという性質。互除法の理論的根拠となる。",
    "body": "2つの自然数の最大公約数は、割り算の余りに関して不変であるという性質。互除法の理論的根拠となる。\n\n$a$ を $b$ で割った商を $q$、余りを $r$ とすると、\n\n$$\\gcd(a,b) = \\gcd(b,r)$$"
  },
  {
    "id": "formula_64",
    "subject": "数学A",
    "category": "整数",
    "name": "ユークリッドの互除法(アルゴリズム)",
    "latex": "a = bq_1+r_1,\\quad b=r_1q_2+r_2,\\quad r_1=r_2q_3+r_3,\\ \\ldots,\\ \\ r_{n-1}=r_n q_{n+1}+0",
    "summary": "2つの自然数の最大公約数を、割り算を繰り返すことで効率よく求める手続き。余りが0になったときの割る数が最大公約数になる。",
    "body": "2つの自然数の最大公約数を、割り算を繰り返すことで効率よく求める手続き。余りが0になったときの割る数が最大公約数になる。\n\n$$a = bq_1+r_1,\\quad b=r_1q_2+r_2,\\quad r_1=r_2q_3+r_3,\\ \\ldots,\\ \\ r_{n-1}=r_n q_{n+1}+0$$\n\nこのとき $\\gcd(a,b) = r_n$"
  },
  {
    "id": "formula_65",
    "subject": "数学A",
    "category": "整数",
    "name": "一次不定方程式の整数解(補足)",
    "latex": "x = x_0+bt,\\qquad y = y_0-at \\qquad (t\\text{は任意の整数})",
    "summary": "$\\gcd(a,b)=d$ のとき、$ax+by=d$ を満たす整数 $x,y$ が存在すること(ユークリッドの互除法を逆にたどる＝拡張ユークリッドの互除法で具体的に求められる)、およびそれを用いた一般の一次不定方程式の解法。",
    "body": "$\\gcd(a,b)=d$ のとき、$ax+by=d$ を満たす整数 $x,y$ が存在すること(ユークリッドの互除法を逆にたどる＝拡張ユークリッドの互除法で具体的に求められる)、およびそれを用いた一般の一次不定方程式の解法。\n\n$a,b$ を互いに素な整数とし、$ax_0+by_0=c$ の1つの整数解を $(x_0,y_0)$ とするとき、$ax+by=c$ の整数解は\n\n$$x = x_0+bt,\\qquad y = y_0-at \\qquad (t\\text{は任意の整数})$$\n\nで与えられる。"
  },
  {
    "id": "formula_66",
    "subject": "数学Ⅱ",
    "category": "式と証明",
    "name": "立方の和・差の因数分解公式",
    "latex": "a^3 + b^3 = (a+b)(a^2 - ab + b^2)",
    "summary": "2つの数(式)の3乗の和・差を因数分解するときに使う。因数分解した際の第2因数($a^2 \\mp ab + b^2$)の符号がaとbの和・差の符号と逆になる点に注意する。",
    "body": "2つの数(式)の3乗の和・差を因数分解するときに使う。因数分解した際の第2因数($a^2 \\mp ab + b^2$)の符号がaとbの和・差の符号と逆になる点に注意する。\n\n$$a^3 + b^3 = (a+b)(a^2 - ab + b^2)$$\n\n$$a^3 - b^3 = (a-b)(a^2 + ab + b^2)$$"
  },
  {
    "id": "formula_67",
    "subject": "数学Ⅱ",
    "category": "式と証明",
    "name": "3乗の展開公式(完全立方式)",
    "latex": "(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3",
    "summary": "2項の和・差を3乗した形を展開するときに使う。係数が1, 3, 3, 1と二項係数(パスカルの三角形の4段目)になっている点が二項定理と対応している。",
    "body": "2項の和・差を3乗した形を展開するときに使う。係数が1, 3, 3, 1と二項係数(パスカルの三角形の4段目)になっている点が二項定理と対応している。\n\n$$(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$$\n\n$$(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$$"
  },
  {
    "id": "formula_68",
    "subject": "数学Ⅱ",
    "category": "式と証明",
    "name": "3変数の対称式の因数分解公式",
    "latex": "a^3+b^3+c^3-3abc=(a+b+c)(a^2+b^2+c^2-ab-bc-ca)",
    "summary": "$a^3+b^3+c^3-3abc$ の形が出てきたときに使う因数分解公式。右辺の第2因数は $a,b,c$ の対称式になっている。$a+b+c=0$ のとき $a^3+b^3+c^3=3abc$ となることも覚えておくと計算が速い。",
    "body": "$a^3+b^3+c^3-3abc$ の形が出てきたときに使う因数分解公式。右辺の第2因数は $a,b,c$ の対称式になっている。$a+b+c=0$ のとき $a^3+b^3+c^3=3abc$ となることも覚えておくと計算が速い。\n\n$$a^3+b^3+c^3-3abc=(a+b+c)(a^2+b^2+c^2-ab-bc-ca)$$"
  },
  {
    "id": "formula_69",
    "subject": "数学Ⅱ",
    "category": "式と証明",
    "name": "二項定理",
    "latex": "(a+b)^n = \\sum_{r=0}^{n} {}_n\\mathrm{C}_r\\, a^{n-r} b^{r}",
    "summary": "$(a+b)^n$ を展開したときの一般項の係数を求める公式。各項の係数は「n個の $(a+b)$ のうち、どこから $b$ を何個選ぶか」の組合せの数 ${}_n\\mathrm{C}_r$ になる。",
    "body": "$(a+b)^n$ を展開したときの一般項の係数を求める公式。各項の係数は「n個の $(a+b)$ のうち、どこから $b$ を何個選ぶか」の組合せの数 ${}_n\\mathrm{C}_r$ になる。\n\n$$(a+b)^n = \\sum_{r=0}^{n} {}_n\\mathrm{C}_r\\, a^{n-r} b^{r}$$\n\n一般項(第 $r+1$ 項)は次の式で表される。\n\n$$T_{r+1} = {}_n\\mathrm{C}_r\\, a^{n-r} b^{r}$$"
  },
  {
    "id": "formula_70",
    "subject": "数学Ⅱ",
    "category": "式と証明",
    "name": "恒等式の性質と解き方",
    "latex": "ax^2+bx+c=0 \\ (\\text{恒等式}) \\iff a=0,\\ b=0,\\ c=0",
    "summary": "恒等式とは、変数にどんな値を代入しても常に成り立つ等式のこと(特定の値でしか成り立たない「方程式」と対比される)。未定係数を求める問題では、次の2つの解法を使う。",
    "body": "恒等式とは、変数にどんな値を代入しても常に成り立つ等式のこと(特定の値でしか成り立たない「方程式」と対比される)。未定係数を求める問題では、次の2つの解法を使う。\n\n**性質(係数比較の根拠)**: $P(x)=0$ が恒等式ならば各項の係数はすべて0であり、$P(x)=Q(x)$ が恒等式ならば同じ次数の項の係数が一致する。\n\n$$ax^2+bx+c=0 \\ (\\text{恒等式}) \\iff a=0,\\ b=0,\\ c=0$$\n\n$$ax^2+bx+c=Ax^2+Bx+C \\ (\\text{恒等式}) \\iff a=A,\\ b=B,\\ c=C$$\n\n**解法1(係数比較法)**: 両辺を展開・整理し、同じ次数の項の係数を比較して連立方程式を立てる。\n**解法2(数値代入法)**: 変数に具体的な数値を代入して連立方程式を作る。ただし代入だけでは必要条件しか出ないため、最後に「実際に恒等式になるか」の確認(十分性の確認)が必要。"
  },
  {
    "id": "formula_71",
    "subject": "数学Ⅱ",
    "category": "式と証明",
    "name": "相加平均と相乗平均の大小関係(AM-GM不等式)",
    "latex": "\\frac{a+b}{2} \\geq \\sqrt{ab} \\quad (a\\geq 0,\\ b\\geq 0,\\ \\text{等号は } a=b\\text{ のとき})",
    "summary": "最大値・最小値問題で頻出。2つの非負の数について、算術平均(相加平均)が幾何平均(相乗平均)以上になることを示す不等式。$(\\sqrt a - \\sqrt b)^2 \\ge 0$ を展開すると証明できる。等号は $a=b$ のときのみ成立する。",
    "body": "最大値・最小値問題で頻出。2つの非負の数について、算術平均(相加平均)が幾何平均(相乗平均)以上になることを示す不等式。$(\\sqrt a - \\sqrt b)^2 \\ge 0$ を展開すると証明できる。等号は $a=b$ のときのみ成立する。\n\n$$\\frac{a+b}{2} \\geq \\sqrt{ab} \\quad (a\\geq 0,\\ b\\geq 0,\\ \\text{等号は } a=b\\text{ のとき})$$\n\n同値変形として $a+b \\ge 2\\sqrt{ab}$ の形もよく使う。例えば $x>0$ のとき $x+\\dfrac{3}{x}\\ge 2\\sqrt{3}$(等号は $x=\\sqrt3$)のように、和の最小値を求める場面で使う。\n\n**補足(3変数版)**: 3つの非負の数についても同様の不等式が成り立ち、体積・相加相乗の複合問題で使われることがある。\n\n$$\\frac{a+b+c}{3} \\geq \\sqrt[3]{abc} \\quad (a,b,c\\geq 0,\\ \\text{等号は } a=b=c\\text{ のとき})$$\n\n---"
  },
  {
    "id": "formula_72",
    "subject": "数学Ⅱ",
    "category": "方程式",
    "name": "2次方程式の解と係数の関係",
    "latex": "ax^2+bx+c=0 \\ (\\alpha,\\beta\\text{ が解}) \\implies \\alpha+\\beta=-\\frac{b}{a},\\quad \\alpha\\beta=\\frac{c}{a}",
    "summary": "2次方程式を実際に解かなくても、解の和・積を係数だけから求められる公式。対称式($\\alpha^2+\\beta^2$ など)の値を求める問題で重宝する。",
    "body": "2次方程式を実際に解かなくても、解の和・積を係数だけから求められる公式。対称式($\\alpha^2+\\beta^2$ など)の値を求める問題で重宝する。\n\n$$ax^2+bx+c=0 \\ (\\alpha,\\beta\\text{ が解}) \\implies \\alpha+\\beta=-\\frac{b}{a},\\quad \\alpha\\beta=\\frac{c}{a}$$\n\n対称式変形の代表例:\n\n$$\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta$$\n\n$$\\alpha^3+\\beta^3=(\\alpha+\\beta)^3-3\\alpha\\beta(\\alpha+\\beta)$$"
  },
  {
    "id": "formula_73",
    "subject": "数学Ⅱ",
    "category": "方程式",
    "name": "3次方程式の解と係数の関係",
    "latex": "ax^3+bx^2+cx+d=0 \\ (\\alpha,\\beta,\\gamma\\text{ が解}) \\implies\n\\begin{cases}\n\\alpha+\\beta+\\gamma=-\\dfrac{b}{a} \\\\[4pt]\n\\alpha\\beta+\\beta\\gamma+\\gamma\\alpha=\\dfrac{c}{a} \\\\[4pt]\n\\alpha\\beta\\gamma=-\\dfrac{d}{a}\n\\end{cases}",
    "summary": "2次の場合と同じ考え方を3次に拡張したもの。解の1次・2次・3次の対称式が係数と対応する。",
    "body": "2次の場合と同じ考え方を3次に拡張したもの。解の1次・2次・3次の対称式が係数と対応する。\n\n$$ax^3+bx^2+cx+d=0 \\ (\\alpha,\\beta,\\gamma\\text{ が解}) \\implies\n\\begin{cases}\n\\alpha+\\beta+\\gamma=-\\dfrac{b}{a} \\\\[4pt]\n\\alpha\\beta+\\beta\\gamma+\\gamma\\alpha=\\dfrac{c}{a} \\\\[4pt]\n\\alpha\\beta\\gamma=-\\dfrac{d}{a}\n\\end{cases}$$"
  },
  {
    "id": "formula_74",
    "subject": "数学Ⅱ",
    "category": "方程式",
    "name": "剰余の定理",
    "latex": "P(x)\\text{ を }(x-\\alpha)\\text{ で割った余り} = P(\\alpha)",
    "summary": "整式 $P(x)$ を1次式で割ったときの余りを、実際に割り算をせずに代入だけで求められる定理。$P(x)=(x-\\alpha)Q(x)+R$ という等式が成り立つことから導かれる。",
    "body": "整式 $P(x)$ を1次式で割ったときの余りを、実際に割り算をせずに代入だけで求められる定理。$P(x)=(x-\\alpha)Q(x)+R$ という等式が成り立つことから導かれる。\n\n$$P(x)\\text{ を }(x-\\alpha)\\text{ で割った余り} = P(\\alpha)$$\n\n割る式の1次の係数が1でない場合($ax+b$ で割る場合)は、次のように拡張される。\n\n$$P(x)\\text{ を }(ax+b)\\text{ で割った余り} = P\\!\\left(-\\frac{b}{a}\\right)$$"
  },
  {
    "id": "formula_75",
    "subject": "数学Ⅱ",
    "category": "方程式",
    "name": "因数定理",
    "latex": "P(x)\\text{ が }(x-\\alpha)\\text{ を因数にもつ} \\iff P(\\alpha)=0",
    "summary": "剰余の定理において余りが0になる特別な場合。整式が特定の1次式を因数に持つかどうかを判定するのに使う、必要十分条件の定理。",
    "body": "剰余の定理において余りが0になる特別な場合。整式が特定の1次式を因数に持つかどうかを判定するのに使う、必要十分条件の定理。\n\n$$P(x)\\text{ が }(x-\\alpha)\\text{ を因数にもつ} \\iff P(\\alpha)=0$$"
  },
  {
    "id": "formula_76",
    "subject": "数学Ⅱ",
    "category": "方程式",
    "name": "因数の候補を絞る公式(有理根定理)",
    "latex": "\\alpha = \\pm\\frac{a_n\\text{ の約数}}{a_0\\text{ の約数}} = \\pm\\frac{\\text{定数項の約数}}{\\text{最高次の係数の約数}}",
    "summary": "整数係数の多項式 $P(x)=a_0x^n+\\cdots+a_n$ について、$P(\\alpha)=0$ となる有理数の候補 $\\alpha$ を効率よく絞り込むための公式。最高次の係数が1のときは「定数項の約数(±)」のみが候補になる。",
    "body": "整数係数の多項式 $P(x)=a_0x^n+\\cdots+a_n$ について、$P(\\alpha)=0$ となる有理数の候補 $\\alpha$ を効率よく絞り込むための公式。最高次の係数が1のときは「定数項の約数(±)」のみが候補になる。\n\n$$\\alpha = \\pm\\frac{a_n\\text{ の約数}}{a_0\\text{ の約数}} = \\pm\\frac{\\text{定数項の約数}}{\\text{最高次の係数の約数}}$$"
  },
  {
    "id": "formula_77",
    "subject": "数学Ⅱ",
    "category": "方程式",
    "name": "組み立て除法(合成除法)",
    "latex": "b_0=a_0,\\quad b_1=a_1+\\alpha b_0,\\quad b_2=a_2+\\alpha b_1,\\quad R=a_3+\\alpha b_2",
    "summary": "多項式を1次式 $(x-\\alpha)$ で割る計算を、筆算より簡便に行うための計算手順。3次式 $a_0x^3+a_1x^2+a_2x+a_3$ を例にすると、商の係数と余りは次の漸化式で求まる。",
    "body": "多項式を1次式 $(x-\\alpha)$ で割る計算を、筆算より簡便に行うための計算手順。3次式 $a_0x^3+a_1x^2+a_2x+a_3$ を例にすると、商の係数と余りは次の漸化式で求まる。\n\n$$b_0=a_0,\\quad b_1=a_1+\\alpha b_0,\\quad b_2=a_2+\\alpha b_1,\\quad R=a_3+\\alpha b_2$$"
  },
  {
    "id": "formula_78",
    "subject": "数学Ⅱ",
    "category": "方程式",
    "name": "複2次式の解法(4次方程式)",
    "latex": "ax^4+bx^2+c=0 \\ \\xrightarrow{\\ X=x^2\\ }\\ aX^2+bX+c=0",
    "summary": "$x$ の奇数次の項がない4次方程式($ax^4+bx^2+c=0$ の形)を解く手法。$x^2=X$ と置換すると2次方程式に帰着でき、そのあと $X=x^2$ に戻して $x$ を求める。",
    "body": "$x$ の奇数次の項がない4次方程式($ax^4+bx^2+c=0$ の形)を解く手法。$x^2=X$ と置換すると2次方程式に帰着でき、そのあと $X=x^2$ に戻して $x$ を求める。\n\n$$ax^4+bx^2+c=0 \\ \\xrightarrow{\\ X=x^2\\ }\\ aX^2+bX+c=0$$"
  },
  {
    "id": "formula_79",
    "subject": "数学Ⅱ",
    "category": "方程式",
    "name": "相反方程式の解法",
    "latex": "a\\left(x^2+\\frac{1}{x^2}\\right)+b\\left(x+\\frac1x\\right)+c=0",
    "summary": "係数が左右対称になっている方程式(相反方程式、例: $ax^4+bx^3+cx^2+bx+a=0$)を解く手法。$x=0$ が解でないことを確認したうえで $x^2$ で両辺を割り、$t=x+\\dfrac1x$ と置換して次数を下げる。",
    "body": "係数が左右対称になっている方程式(相反方程式、例: $ax^4+bx^3+cx^2+bx+a=0$)を解く手法。$x=0$ が解でないことを確認したうえで $x^2$ で両辺を割り、$t=x+\\dfrac1x$ と置換して次数を下げる。\n\n$$a\\left(x^2+\\frac{1}{x^2}\\right)+b\\left(x+\\frac1x\\right)+c=0$$\n\n$$t=x+\\frac1x \\implies x^2+\\frac{1}{x^2}=t^2-2$$\n\n$$a(t^2-2)+bt+c=0$$\n\nこの $t$ の2次方程式を解き、得られた $t$ を再び $t=x+\\dfrac1x$(すなわち $x^2-tx+1=0$)に代入して $x$ を求める。\n\n---"
  },
  {
    "id": "formula_80",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "弧度法(ラジアン)の定義と度数との変換",
    "latex": "180^\\circ = \\pi\\ [\\mathrm{rad}], \\qquad 1\\ [\\mathrm{rad}] = \\frac{180^\\circ}{\\pi}\\ (\\fallingdotseq 57.3^\\circ)",
    "summary": "角度の単位を「弧の長さ/半径」の比で表す方法。単位円上で弧の長さが半径と等しくなる中心角を1ラジアンと定める。円周率 $\\pi$ を使うことで、後の微積分の公式が簡潔になる。",
    "body": "角度の単位を「弧の長さ/半径」の比で表す方法。単位円上で弧の長さが半径と等しくなる中心角を1ラジアンと定める。円周率 $\\pi$ を使うことで、後の微積分の公式が簡潔になる。\n\n$$180^\\circ = \\pi\\ [\\mathrm{rad}], \\qquad 1\\ [\\mathrm{rad}] = \\frac{180^\\circ}{\\pi}\\ (\\fallingdotseq 57.3^\\circ)$$\n\n$$x^\\circ \\ \\longrightarrow\\ \\frac{\\pi}{180}x\\ [\\mathrm{rad}], \\qquad \\theta\\ [\\mathrm{rad}]\\ \\longrightarrow\\ \\frac{180^\\circ}{\\pi}\\,\\theta$$\n\n**代表的な対応**:\n\n$$0^\\circ=0,\\quad 30^\\circ=\\frac{\\pi}{6},\\quad 45^\\circ=\\frac{\\pi}{4},\\quad 60^\\circ=\\frac{\\pi}{3},\\quad 90^\\circ=\\frac{\\pi}{2},\\quad 180^\\circ=\\pi,\\quad 360^\\circ=2\\pi$$"
  },
  {
    "id": "formula_81",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "扇形の弧の長さと面積",
    "latex": "l = r\\theta",
    "summary": "半径 $r$、中心角 $\\theta$(弧度法)の扇形について、弧の長さと面積を求める公式。弧度法を使うと度数法より式がシンプルになるのが利点。",
    "body": "半径 $r$、中心角 $\\theta$(弧度法)の扇形について、弧の長さと面積を求める公式。弧度法を使うと度数法より式がシンプルになるのが利点。\n\n$$l = r\\theta$$\n\n$$S=\\frac12 r^2\\theta = \\frac12 rl$$"
  },
  {
    "id": "formula_82",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "三角関数のグラフの特徴(周期・値域・対称性)",
    "latex": "",
    "summary": "$y=\\sin\\theta,\\ y=\\cos\\theta,\\ y=\\tan\\theta$ の基本グラフの性質をまとめたもの。周期・値域・偶奇性(対称性)を把握しておくとグラフの概形をすぐに描ける。",
    "body": "$y=\\sin\\theta,\\ y=\\cos\\theta,\\ y=\\tan\\theta$ の基本グラフの性質をまとめたもの。周期・値域・偶奇性(対称性)を把握しておくとグラフの概形をすぐに描ける。\n\n| 関数 | 定義域 | 周期 | 値域 | 対称性 |\n|---|---|---|---|---|\n| $y=\\sin\\theta$ | 実数全体 | $2\\pi$ | $-1\\le y\\le1$ | 原点対称(奇関数): $\\sin(-\\theta)=-\\sin\\theta$ |\n| $y=\\cos\\theta$ | 実数全体 | $2\\pi$ | $-1\\le y\\le1$ | $y$軸対称(偶関数): $\\cos(-\\theta)=\\cos\\theta$ |\n| $y=\\tan\\theta$ | $\\theta\\neq\\dfrac{\\pi}{2}+n\\pi$ | $\\pi$ | 実数全体 | 原点対称(奇関数): $\\tan(-\\theta)=-\\tan\\theta$、漸近線 $\\theta=\\dfrac{\\pi}{2}+n\\pi$ |"
  },
  {
    "id": "formula_83",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "三角関数のグラフの変形(振幅・周期・平行移動)",
    "latex": "y=a\\sin(k\\theta-p)+q \\quad \\left(\\text{振幅}|a|,\\ \\text{周期}\\ \\frac{2\\pi}{|k|},\\ \\text{位相のずれ}\\ \\frac{p}{k},\\ \\text{中心線 } y=q\\right)",
    "summary": "基本のグラフを変形して複雑なグラフを描くときの考え方。$a$ は縦方向の拡大率(振幅)、$k$ は横方向の縮小率(周期を変える)、$p$ は横方向の平行移動量にあたる。",
    "body": "基本のグラフを変形して複雑なグラフを描くときの考え方。$a$ は縦方向の拡大率(振幅)、$k$ は横方向の縮小率(周期を変える)、$p$ は横方向の平行移動量にあたる。\n\n$$y=a\\sin(k\\theta-p)+q \\quad \\left(\\text{振幅}|a|,\\ \\text{周期}\\ \\frac{2\\pi}{|k|},\\ \\text{位相のずれ}\\ \\frac{p}{k},\\ \\text{中心線 } y=q\\right)$$"
  },
  {
    "id": "formula_84",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "三角関数の相互関係",
    "latex": "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}",
    "summary": "1つの角に対する $\\sin,\\cos,\\tan$ の値のうち、1つが分かれば他の2つを導出できる関係式。三平方の定理(ピタゴラスの定理)を単位円に当てはめたものが基本。",
    "body": "1つの角に対する $\\sin,\\cos,\\tan$ の値のうち、1つが分かれば他の2つを導出できる関係式。三平方の定理(ピタゴラスの定理)を単位円に当てはめたものが基本。\n\n$$\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$$\n\n$$\\sin^2\\theta+\\cos^2\\theta=1$$\n\n$$1+\\tan^2\\theta=\\frac{1}{\\cos^2\\theta}$$"
  },
  {
    "id": "formula_85",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "三角関数の周期性・対称性・角のシフト公式",
    "latex": "\\sin(\\theta+2n\\pi)=\\sin\\theta,\\quad \\cos(\\theta+2n\\pi)=\\cos\\theta,\\quad \\tan(\\theta+2n\\pi)=\\tan\\theta",
    "summary": "角を $2n\\pi,\\ \\pi,\\ \\dfrac{\\pi}{2}$ だけずらしたときや、符号を反転($-\\theta$)、補角($\\pi-\\theta$)、余角($\\dfrac{\\pi}{2}-\\theta$)をとったときに、三角関数の値がどう変化するかをまとめた公式群。加法定理から導出できるが、単位円をイメージして覚えるのが速い。",
    "body": "角を $2n\\pi,\\ \\pi,\\ \\dfrac{\\pi}{2}$ だけずらしたときや、符号を反転($-\\theta$)、補角($\\pi-\\theta$)、余角($\\dfrac{\\pi}{2}-\\theta$)をとったときに、三角関数の値がどう変化するかをまとめた公式群。加法定理から導出できるが、単位円をイメージして覚えるのが速い。\n\n**周期性**($n$ は整数):\n$$\\sin(\\theta+2n\\pi)=\\sin\\theta,\\quad \\cos(\\theta+2n\\pi)=\\cos\\theta,\\quad \\tan(\\theta+2n\\pi)=\\tan\\theta$$\n\n**負角**:\n$$\\sin(-\\theta)=-\\sin\\theta,\\quad \\cos(-\\theta)=\\cos\\theta,\\quad \\tan(-\\theta)=-\\tan\\theta$$\n\n**$\\pi$ のシフト**:\n$$\\sin(\\theta+\\pi)=-\\sin\\theta,\\quad \\cos(\\theta+\\pi)=-\\cos\\theta,\\quad \\tan(\\theta+\\pi)=\\tan\\theta$$\n\n**$\\dfrac{\\pi}{2}$ のシフト**:\n$$\\sin\\left(\\theta+\\frac{\\pi}{2}\\right)=\\cos\\theta,\\quad \\cos\\left(\\theta+\\frac{\\pi}{2}\\right)=-\\sin\\theta,\\quad \\tan\\left(\\theta+\\frac{\\pi}{2}\\right)=-\\frac{1}{\\tan\\theta}$$\n\n**余角** ($\\dfrac{\\pi}{2}-\\theta$):\n$$\\sin\\left(\\frac{\\pi}{2}-\\theta\\right)=\\cos\\theta,\\quad \\cos\\left(\\frac{\\pi}{2}-\\theta\\right)=\\sin\\theta,\\quad \\tan\\left(\\frac{\\pi}{2}-\\theta\\right)=\\frac{1}{\\tan\\theta}$$\n\n**補角** ($\\pi-\\theta$):\n$$\\sin(\\pi-\\theta)=\\sin\\theta,\\quad \\cos(\\pi-\\theta)=-\\cos\\theta,\\quad \\tan(\\pi-\\theta)=-\\tan\\theta$$"
  },
  {
    "id": "formula_86",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "加法定理",
    "latex": "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta",
    "summary": "2つの角の和・差に対する三角関数の値を、それぞれの角の $\\sin,\\cos,\\tan$ で表す公式。三角関数の公式群の中で最も基本となり、2倍角・3倍角・和積・合成などはすべてここから導かれる。",
    "body": "2つの角の和・差に対する三角関数の値を、それぞれの角の $\\sin,\\cos,\\tan$ で表す公式。三角関数の公式群の中で最も基本となり、2倍角・3倍角・和積・合成などはすべてここから導かれる。\n\n$$\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$$\n\n$$\\sin(\\alpha-\\beta)=\\sin\\alpha\\cos\\beta-\\cos\\alpha\\sin\\beta$$\n\n$$\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$$\n\n$$\\cos(\\alpha-\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$$\n\n$$\\tan(\\alpha+\\beta)=\\frac{\\tan\\alpha+\\tan\\beta}{1-\\tan\\alpha\\tan\\beta}\\quad(\\cos\\alpha\\cos\\beta\\neq0,\\ 1-\\tan\\alpha\\tan\\beta\\neq0)$$\n\n$$\\tan(\\alpha-\\beta)=\\frac{\\tan\\alpha-\\tan\\beta}{1+\\tan\\alpha\\tan\\beta}\\quad(\\cos\\alpha\\cos\\beta\\neq0,\\ 1+\\tan\\alpha\\tan\\beta\\neq0)$$"
  },
  {
    "id": "formula_87",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "2倍角の公式",
    "latex": "\\sin2\\alpha=2\\sin\\alpha\\cos\\alpha",
    "summary": "加法定理で $\\beta=\\alpha$ とおくことで導かれる公式。$\\cos2\\alpha$ は $\\sin^2\\theta+\\cos^2\\theta=1$ を使って3通りの形に書き換えられ、問題に応じて使い分ける。",
    "body": "加法定理で $\\beta=\\alpha$ とおくことで導かれる公式。$\\cos2\\alpha$ は $\\sin^2\\theta+\\cos^2\\theta=1$ を使って3通りの形に書き換えられ、問題に応じて使い分ける。\n\n$$\\sin2\\alpha=2\\sin\\alpha\\cos\\alpha$$\n\n$$\\cos2\\alpha=\\cos^2\\alpha-\\sin^2\\alpha=2\\cos^2\\alpha-1=1-2\\sin^2\\alpha$$\n\n$$\\tan2\\alpha=\\frac{2\\tan\\alpha}{1-\\tan^2\\alpha}\\quad(\\tan^2\\alpha\\neq1)$$"
  },
  {
    "id": "formula_88",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "次数下げの公式",
    "latex": "\\sin^2\\alpha=\\frac{1-\\cos2\\alpha}{2}",
    "summary": "2倍角の公式($\\cos2\\alpha=1-2\\sin^2\\alpha$、$\\cos2\\alpha=2\\cos^2\\alpha-1$)を逆に解いた形。$\\sin^2,\\cos^2$ の2次式を1次式(角は2倍)に変換できるため、積分計算などで多用される。",
    "body": "2倍角の公式($\\cos2\\alpha=1-2\\sin^2\\alpha$、$\\cos2\\alpha=2\\cos^2\\alpha-1$)を逆に解いた形。$\\sin^2,\\cos^2$ の2次式を1次式(角は2倍)に変換できるため、積分計算などで多用される。\n\n$$\\sin^2\\alpha=\\frac{1-\\cos2\\alpha}{2}$$\n\n$$\\cos^2\\alpha=\\frac{1+\\cos2\\alpha}{2}$$"
  },
  {
    "id": "formula_89",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "半角の公式",
    "latex": "\\sin^2\\frac{\\alpha}{2}=\\frac{1-\\cos\\alpha}{2}",
    "summary": "角を半分にしたときの三角関数の2乗を表す公式。次数下げの公式で $\\alpha \\to \\dfrac{\\alpha}{2}$ と置き換えると得られる。",
    "body": "角を半分にしたときの三角関数の2乗を表す公式。次数下げの公式で $\\alpha \\to \\dfrac{\\alpha}{2}$ と置き換えると得られる。\n\n$$\\sin^2\\frac{\\alpha}{2}=\\frac{1-\\cos\\alpha}{2}$$\n\n$$\\cos^2\\frac{\\alpha}{2}=\\frac{1+\\cos\\alpha}{2}$$\n\n$$\\tan^2\\frac{\\alpha}{2}=\\frac{1-\\cos\\alpha}{1+\\cos\\alpha}\\quad(\\cos\\alpha\\neq-1)$$"
  },
  {
    "id": "formula_90",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "3倍角の公式",
    "latex": "\\sin3\\alpha=3\\sin\\alpha-4\\sin^3\\alpha",
    "summary": "角を3倍にしたときの $\\sin,\\cos$ を、元の角の $\\sin,\\cos$ だけで表す公式。加法定理($3\\alpha=2\\alpha+\\alpha$)と2倍角の公式を組み合わせて導出できる。",
    "body": "角を3倍にしたときの $\\sin,\\cos$ を、元の角の $\\sin,\\cos$ だけで表す公式。加法定理($3\\alpha=2\\alpha+\\alpha$)と2倍角の公式を組み合わせて導出できる。\n\n$$\\sin3\\alpha=3\\sin\\alpha-4\\sin^3\\alpha$$\n\n$$\\cos3\\alpha=4\\cos^3\\alpha-3\\cos\\alpha$$"
  },
  {
    "id": "formula_91",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "積和公式(積→和)",
    "latex": "\\sin\\alpha\\cos\\beta=\\frac12\\{\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta)\\}",
    "summary": "三角関数の「積」の形を「和・差」の形に変換する公式。加法定理の4本の式を足し引きすることで導出できる。積分で三角関数の積を扱うときなどに使う。",
    "body": "三角関数の「積」の形を「和・差」の形に変換する公式。加法定理の4本の式を足し引きすることで導出できる。積分で三角関数の積を扱うときなどに使う。\n\n$$\\sin\\alpha\\cos\\beta=\\frac12\\{\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta)\\}$$\n\n$$\\cos\\alpha\\sin\\beta=\\frac12\\{\\sin(\\alpha+\\beta)-\\sin(\\alpha-\\beta)\\}$$\n\n$$\\cos\\alpha\\cos\\beta=\\frac12\\{\\cos(\\alpha+\\beta)+\\cos(\\alpha-\\beta)\\}$$\n\n$$\\sin\\alpha\\sin\\beta=-\\frac12\\{\\cos(\\alpha+\\beta)-\\cos(\\alpha-\\beta)\\}$$"
  },
  {
    "id": "formula_92",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "和積公式(和→積)",
    "latex": "\\sin A+\\sin B=2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}",
    "summary": "三角関数の「和・差」の形を「積」の形に変換する公式。積和公式で $\\alpha+\\beta=A,\\ \\alpha-\\beta=B$ と置き換えると導ける。方程式 $\\sin A\\pm\\sin B=0$ 型の問題などで威力を発揮する。",
    "body": "三角関数の「和・差」の形を「積」の形に変換する公式。積和公式で $\\alpha+\\beta=A,\\ \\alpha-\\beta=B$ と置き換えると導ける。方程式 $\\sin A\\pm\\sin B=0$ 型の問題などで威力を発揮する。\n\n$$\\sin A+\\sin B=2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$$\n\n$$\\sin A-\\sin B=2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}$$\n\n$$\\cos A+\\cos B=2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$$\n\n$$\\cos A-\\cos B=-2\\sin\\frac{A+B}{2}\\sin\\frac{A-B}{2}$$"
  },
  {
    "id": "formula_93",
    "subject": "数学Ⅱ",
    "category": "三角関数",
    "name": "三角関数の合成",
    "latex": "a\\sin\\theta+b\\cos\\theta=\\sqrt{a^2+b^2}\\,\\sin(\\theta+\\alpha)",
    "summary": "$a\\sin\\theta+b\\cos\\theta$ の形を、単一の $\\sin$(または $\\cos$)にまとめる公式。座標平面上の点 $(a,b)$ を極座標表示すると考えると覚えやすい。最大値・最小値問題でこの合成が必須になる。",
    "body": "$a\\sin\\theta+b\\cos\\theta$ の形を、単一の $\\sin$(または $\\cos$)にまとめる公式。座標平面上の点 $(a,b)$ を極座標表示すると考えると覚えやすい。最大値・最小値問題でこの合成が必須になる。\n\n$$a\\sin\\theta+b\\cos\\theta=\\sqrt{a^2+b^2}\\,\\sin(\\theta+\\alpha)$$\n\n$$\\left(\\cos\\alpha=\\frac{a}{\\sqrt{a^2+b^2}},\\quad \\sin\\alpha=\\frac{b}{\\sqrt{a^2+b^2}}\\right)$$\n\n$\\cos$ 型に合成する場合は次のようになる。\n\n$$a\\sin\\theta+b\\cos\\theta=\\sqrt{a^2+b^2}\\,\\cos(\\theta-\\beta)$$\n\n$$\\left(\\sin\\beta=\\frac{a}{\\sqrt{a^2+b^2}},\\quad \\cos\\beta=\\frac{b}{\\sqrt{a^2+b^2}}\\right)$$\n\n---"
  },
  {
    "id": "formula_94",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "対数の定義",
    "latex": "a > 0,\\ a \\neq 1,\\ M > 0 \\quad のとき \\quad a^p = M \\iff \\log_a M = p",
    "summary": "指数 $a^p = M$ の「指数 $p$」を $M$ の側から呼び直したものが対数である。$a$ を底、$M$ を真数という。",
    "body": "指数 $a^p = M$ の「指数 $p$」を $M$ の側から呼び直したものが対数である。$a$ を底、$M$ を真数という。\n\n$$a > 0,\\ a \\neq 1,\\ M > 0 \\quad のとき \\quad a^p = M \\iff \\log_a M = p$$"
  },
  {
    "id": "formula_95",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "対数の基本性質",
    "latex": "\\log_a a = 1, \\qquad \\log_a 1 = 0, \\qquad \\log_a a^p = p \\quad (a>0,\\ a\\neq1)",
    "summary": "定義から直ちに従う3つの基本公式。",
    "body": "定義から直ちに従う3つの基本公式。\n\n$$\\log_a a = 1, \\qquad \\log_a 1 = 0, \\qquad \\log_a a^p = p \\quad (a>0,\\ a\\neq1)$$"
  },
  {
    "id": "formula_96",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "積の対数",
    "latex": "\\log_a MN = \\log_a M + \\log_a N \\qquad (a>0,\\ a\\neq1,\\ M>0,\\ N>0)",
    "summary": "真数の積は、対数の和に分解できる。",
    "body": "真数の積は、対数の和に分解できる。\n\n$$\\log_a MN = \\log_a M + \\log_a N \\qquad (a>0,\\ a\\neq1,\\ M>0,\\ N>0)$$"
  },
  {
    "id": "formula_97",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "商の対数",
    "latex": "\\log_a \\frac{M}{N} = \\log_a M - \\log_a N \\qquad (a>0,\\ a\\neq1,\\ M>0,\\ N>0)",
    "summary": "真数の商は、対数の差に分解できる。",
    "body": "真数の商は、対数の差に分解できる。\n\n$$\\log_a \\frac{M}{N} = \\log_a M - \\log_a N \\qquad (a>0,\\ a\\neq1,\\ M>0,\\ N>0)$$"
  },
  {
    "id": "formula_98",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "累乗の対数",
    "latex": "\\log_a M^r = r\\log_a M \\qquad (a>0,\\ a\\neq1,\\ M>0,\\ r\\text{は実数})",
    "summary": "真数の指数(実数)は、対数の係数として前に出せる。",
    "body": "真数の指数(実数)は、対数の係数として前に出せる。\n\n$$\\log_a M^r = r\\log_a M \\qquad (a>0,\\ a\\neq1,\\ M>0,\\ r\\text{は実数})$$"
  },
  {
    "id": "formula_99",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "底の変換公式",
    "latex": "\\log_a b = \\frac{\\log_c b}{\\log_c a} \\qquad (a,b,c>0,\\ a\\neq1,\\ b\\neq1,\\ c\\neq1)",
    "summary": "異なる底の対数を、共通の底 $c$ の対数の比に書き換える公式。$c=10$(常用対数)や $c=e$(自然対数)にそろえて計算するときに使う。",
    "body": "異なる底の対数を、共通の底 $c$ の対数の比に書き換える公式。$c=10$(常用対数)や $c=e$(自然対数)にそろえて計算するときに使う。\n\n$$\\log_a b = \\frac{\\log_c b}{\\log_c a} \\qquad (a,b,c>0,\\ a\\neq1,\\ b\\neq1,\\ c\\neq1)$$\n\n特に $c=b$ とすると、逆数の関係が得られる。\n\n$$\\log_a b = \\frac{1}{\\log_b a}$$"
  },
  {
    "id": "formula_100",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "対数の連鎖公式",
    "latex": "\\log_a b \\cdot \\log_b c = \\log_a c \\qquad (a,b,c>0,\\ a\\neq1,\\ b\\neq1)",
    "summary": "底の変換公式を繰り返し適用すると得られる、途中の底が約分されて消える公式。",
    "body": "底の変換公式を繰り返し適用すると得られる、途中の底が約分されて消える公式。\n\n$$\\log_a b \\cdot \\log_b c = \\log_a c \\qquad (a,b,c>0,\\ a\\neq1,\\ b\\neq1)$$"
  },
  {
    "id": "formula_101",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "対数指数の等式",
    "latex": "a^{\\log_b c} = c^{\\log_b a} \\qquad (a,b,c>0,\\ b\\neq1)",
    "summary": "$a^{\\log_b c}$ の形の式を入れ替えても値が変わらないという性質。両辺の $\\log_b$ をとると等しいことで確認できる。",
    "body": "$a^{\\log_b c}$ の形の式を入れ替えても値が変わらないという性質。両辺の $\\log_b$ をとると等しいことで確認できる。\n\n$$a^{\\log_b c} = c^{\\log_b a} \\qquad (a,b,c>0,\\ b\\neq1)$$"
  },
  {
    "id": "formula_102",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "べき乗の底の対数",
    "latex": "\\log_{a^n} b = \\frac{1}{n}\\log_a b \\qquad (a>0,\\ a\\neq1,\\ n\\neq0,\\ b>0)",
    "summary": "底が $a^n$ であるとき、通常の底 $a$ の対数の $\\frac{1}{n}$ 倍になる。",
    "body": "底が $a^n$ であるとき、通常の底 $a$ の対数の $\\frac{1}{n}$ 倍になる。\n\n$$\\log_{a^n} b = \\frac{1}{n}\\log_a b \\qquad (a>0,\\ a\\neq1,\\ n\\neq0,\\ b>0)$$"
  },
  {
    "id": "formula_103",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "対数関数の定義域・値域とグラフの特徴",
    "latex": "y=\\log_a x, \\qquad x\\in(0,\\infty),\\ y\\in\\mathbb{R}",
    "summary": "$y=\\log_a x\\ (a>0,\\ a\\neq1)$ の基本性質。定義域は真数条件から正の実数全体、値域は実数全体になる。グラフは必ず $(1,0)$ を通り、$(a,1)$ も通る。$y$ 軸(直線 $x=0$)がグラフの漸近線になる。",
    "body": "$y=\\log_a x\\ (a>0,\\ a\\neq1)$ の基本性質。定義域は真数条件から正の実数全体、値域は実数全体になる。グラフは必ず $(1,0)$ を通り、$(a,1)$ も通る。$y$ 軸(直線 $x=0$)がグラフの漸近線になる。\n\n$$y=\\log_a x, \\qquad x\\in(0,\\infty),\\ y\\in\\mathbb{R}$$"
  },
  {
    "id": "formula_104",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "対数関数の単調性",
    "latex": "a>1\\ のとき\\quad 0<p<q \\iff \\log_a p<\\log_a q",
    "summary": "底が1より大きいか小さいかで、増加・減少が入れ替わる。",
    "body": "底が1より大きいか小さいかで、増加・減少が入れ替わる。\n\n$$a>1\\ のとき\\quad 0<p<q \\iff \\log_a p<\\log_a q$$\n$$0<a<1\\ のとき\\quad 0<p<q \\iff \\log_a p>\\log_a q$$"
  },
  {
    "id": "formula_105",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "対数関数と指数関数の対称性",
    "latex": "",
    "summary": "$y=\\log_a x$ は $y=a^x$ の逆関数であるため、両者のグラフは直線 $y=x$ に関して線対称になる。",
    "body": "$y=\\log_a x$ は $y=a^x$ の逆関数であるため、両者のグラフは直線 $y=x$ に関して線対称になる。"
  },
  {
    "id": "formula_106",
    "subject": "数学Ⅱ",
    "category": "対数(log)",
    "name": "対数関数のグラフの平行移動・対称移動",
    "latex": "y = \\log_a(x-p) + q",
    "summary": "基本形 $y=\\log_a x$ からの変形パターン。",
    "body": "基本形 $y=\\log_a x$ からの変形パターン。\n\n- 平行移動($x$方向に$p$、$y$方向に$q$):\n$$y = \\log_a(x-p) + q$$\n- $x$軸対称移動:\n$$y = -\\log_a x = \\log_{1/a} x$$\n- $y$軸対称移動:\n$$y = \\log_a(-x)$$\n- 原点対称移動:\n$$y = -\\log_a(-x) = \\log_{1/a}(-x)$$\n\n---"
  },
  {
    "id": "formula_107",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "微分係数の定義",
    "latex": "f'(a) = \\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}",
    "summary": "関数 $y=f(x)$ 上の点 $x=a$ における瞬間の変化率(接線の傾き)を、極限を使って定義したもの。",
    "body": "関数 $y=f(x)$ 上の点 $x=a$ における瞬間の変化率(接線の傾き)を、極限を使って定義したもの。\n\n$$f'(a) = \\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}$$"
  },
  {
    "id": "formula_108",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "導関数の定義",
    "latex": "f'(x) = \\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h} = \\lim_{\\Delta x\\to0}\\frac{\\Delta y}{\\Delta x}",
    "summary": "微分係数を各点 $x$ について考えたものが導関数。$x$ の関数として接線の傾き全体を表す。",
    "body": "微分係数を各点 $x$ について考えたものが導関数。$x$ の関数として接線の傾き全体を表す。\n\n$$f'(x) = \\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h} = \\lim_{\\Delta x\\to0}\\frac{\\Delta y}{\\Delta x}$$"
  },
  {
    "id": "formula_109",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "べき関数の微分公式",
    "latex": "(x^n)' = nx^{n-1} \\qquad (n\\text{は実数})",
    "summary": "$x^n$ の微分は、指数を前に下ろして指数を1減らす、多項式微分の中心公式。",
    "body": "$x^n$ の微分は、指数を前に下ろして指数を1減らす、多項式微分の中心公式。\n\n$$(x^n)' = nx^{n-1} \\qquad (n\\text{は実数})$$"
  },
  {
    "id": "formula_110",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "定数関数の微分公式",
    "latex": "(k)' = 0 \\qquad (k\\text{は定数})",
    "summary": "定数関数の変化率は常に0である。",
    "body": "定数関数の変化率は常に0である。\n\n$$(k)' = 0 \\qquad (k\\text{は定数})$$"
  },
  {
    "id": "formula_111",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "微分の線形性(定数倍・和・差)",
    "latex": "(kf(x))' = kf'(x)",
    "summary": "微分は線形演算であり、定数倍・和・差をそのまま分配できる。",
    "body": "微分は線形演算であり、定数倍・和・差をそのまま分配できる。\n\n$$(kf(x))' = kf'(x)$$\n$$\\{f(x)+g(x)\\}' = f'(x)+g'(x), \\qquad \\{f(x)-g(x)\\}' = f'(x)-g'(x)$$\n$$\\{kf(x)+lg(x)\\}' = kf'(x)+lg'(x) \\qquad (k,l\\text{は定数})$$"
  },
  {
    "id": "formula_112",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "積の微分公式",
    "latex": "\\{f(x)g(x)\\}' = f'(x)g(x)+f(x)g'(x)",
    "summary": "2つの関数の積を微分するときの公式。",
    "body": "2つの関数の積を微分するときの公式。\n\n$$\\{f(x)g(x)\\}' = f'(x)g(x)+f(x)g'(x)$$"
  },
  {
    "id": "formula_113",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "商の微分公式(補足)",
    "latex": "\\left\\{\\frac{f(x)}{g(x)}\\right\\}' = \\frac{f'(x)g(x)-f(x)g'(x)}{\\{g(x)\\}^2} \\qquad (g(x)\\neq0)",
    "summary": "積の微分公式と対になる公式。受験数学で頻出のため補う。",
    "body": "積の微分公式と対になる公式。受験数学で頻出のため補う。\n\n$$\\left\\{\\frac{f(x)}{g(x)}\\right\\}' = \\frac{f'(x)g(x)-f(x)g'(x)}{\\{g(x)\\}^2} \\qquad (g(x)\\neq0)$$"
  },
  {
    "id": "formula_114",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "累乗の微分公式(合成型)",
    "latex": "\\{(ax+b)^n\\}' = n(ax+b)^{n-1}\\cdot a",
    "summary": "1次式のべき乗を微分するときの公式。合成関数の微分の特別な場合にあたる。",
    "body": "1次式のべき乗を微分するときの公式。合成関数の微分の特別な場合にあたる。\n\n$$\\{(ax+b)^n\\}' = n(ax+b)^{n-1}\\cdot a$$\n\nより一般に、関数 $f(x)$ のべき乗については次のようになる。\n\n$$\\{f(x)^n\\}' = n\\{f(x)\\}^{n-1}f'(x)$$"
  },
  {
    "id": "formula_115",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "合成関数の微分公式(連鎖律・補足)",
    "latex": "y=f(u),\\ u=g(x)\\ のとき \\quad \\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx} = f'(g(x))\\,g'(x)",
    "summary": "累乗の微分公式の背後にある一般原理であり、受験数学で必須のため補う。",
    "body": "累乗の微分公式の背後にある一般原理であり、受験数学で必須のため補う。\n\n$$y=f(u),\\ u=g(x)\\ のとき \\quad \\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx} = f'(g(x))\\,g'(x)$$"
  },
  {
    "id": "formula_116",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "接線の方程式",
    "latex": "y - f(a) = f'(a)(x-a)",
    "summary": "曲線 $y=f(x)$ 上の点 $(a, f(a))$ における接線は、傾きが微分係数 $f'(a)$ に等しい直線として求まる(点傾斜形の応用)。",
    "body": "曲線 $y=f(x)$ 上の点 $(a, f(a))$ における接線は、傾きが微分係数 $f'(a)$ に等しい直線として求まる(点傾斜形の応用)。\n\n$$y - f(a) = f'(a)(x-a)$$"
  },
  {
    "id": "formula_117",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "法線の方程式",
    "latex": "y - f(a) = -\\frac{1}{f'(a)}(x-a) \\qquad (f'(a)\\neq0)",
    "summary": "接線と垂直に交わる直線。傾きの積が $-1$ になる性質(垂直条件)を使い、接線の傾きの逆数の符号違いを傾きとする。",
    "body": "接線と垂直に交わる直線。傾きの積が $-1$ になる性質(垂直条件)を使い、接線の傾きの逆数の符号違いを傾きとする。\n\n$$y - f(a) = -\\frac{1}{f'(a)}(x-a) \\qquad (f'(a)\\neq0)$$"
  },
  {
    "id": "formula_118",
    "subject": "数学Ⅱ",
    "category": "微分",
    "name": "2直線の垂直条件",
    "latex": "m_1 \\perp m_2 \\iff m_1 m_2 = -1",
    "summary": "接線・法線の関係を導く基礎になる、傾きに関する一般公式。",
    "body": "接線・法線の関係を導く基礎になる、傾きに関する一般公式。\n\n$$m_1 \\perp m_2 \\iff m_1 m_2 = -1$$\n\n---"
  },
  {
    "id": "formula_119",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "不定積分の定義",
    "latex": "F'(x)=f(x)\\ のとき \\quad \\int f(x)\\,dx = F(x)+C",
    "summary": "微分すると $f(x)$ になる関数(原始関数)全体を表したもの。$C$ は積分定数。",
    "body": "微分すると $f(x)$ になる関数(原始関数)全体を表したもの。$C$ は積分定数。\n\n$$F'(x)=f(x)\\ のとき \\quad \\int f(x)\\,dx = F(x)+C$$"
  },
  {
    "id": "formula_120",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "べき関数の不定積分",
    "latex": "\\int x^n\\,dx = \\frac{1}{n+1}x^{n+1}+C \\qquad (n\\neq-1)",
    "summary": "べき関数の積分公式。微分公式 $(x^n)'=nx^{n-1}$ の逆演算にあたる。",
    "body": "べき関数の積分公式。微分公式 $(x^n)'=nx^{n-1}$ の逆演算にあたる。\n\n$$\\int x^n\\,dx = \\frac{1}{n+1}x^{n+1}+C \\qquad (n\\neq-1)$$"
  },
  {
    "id": "formula_121",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "不定積分の線形性",
    "latex": "\\int kf(x)\\,dx = k\\int f(x)\\,dx",
    "summary": "定数倍・和・差をそのまま分配できる、積分の線形性。",
    "body": "定数倍・和・差をそのまま分配できる、積分の線形性。\n\n$$\\int kf(x)\\,dx = k\\int f(x)\\,dx$$\n$$\\int\\{f(x)+g(x)\\}\\,dx = \\int f(x)\\,dx+\\int g(x)\\,dx, \\qquad \\int\\{f(x)-g(x)\\}\\,dx = \\int f(x)\\,dx-\\int g(x)\\,dx$$"
  },
  {
    "id": "formula_122",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "定積分の定義(微積分学の基本定理)",
    "latex": "\\int_a^b f(x)\\,dx = \\big[F(x)\\big]_a^b = F(b)-F(a)",
    "summary": "不定積分 $F(x)$ を使って、区間 $[a,b]$ での積分の値を端点の値の差として計算する定理。",
    "body": "不定積分 $F(x)$ を使って、区間 $[a,b]$ での積分の値を端点の値の差として計算する定理。\n\n$$\\int_a^b f(x)\\,dx = \\big[F(x)\\big]_a^b = F(b)-F(a)$$"
  },
  {
    "id": "formula_123",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "定積分の線形性",
    "latex": "\\int_a^b kf(x)\\,dx = k\\int_a^b f(x)\\,dx",
    "summary": "不定積分と同様、定積分も定数倍・和・差を分配できる。",
    "body": "不定積分と同様、定積分も定数倍・和・差を分配できる。\n\n$$\\int_a^b kf(x)\\,dx = k\\int_a^b f(x)\\,dx$$\n$$\\int_a^b\\{f(x)+g(x)\\}\\,dx = \\int_a^b f(x)\\,dx+\\int_a^b g(x)\\,dx, \\qquad \\int_a^b\\{f(x)-g(x)\\}\\,dx = \\int_a^b f(x)\\,dx-\\int_a^b g(x)\\,dx$$"
  },
  {
    "id": "formula_124",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "定積分の区間に関する性質",
    "latex": "\\int_a^a f(x)\\,dx = 0, \\qquad \\int_b^a f(x)\\,dx = -\\int_a^b f(x)\\,dx, \\qquad \\int_a^c f(x)\\,dx+\\int_c^b f(x)\\,dx = \\int_a^b f(x)\\,dx",
    "summary": "積分区間の端点が一致する・向きが逆・区間を分割する場合の公式。面積を分割して計算する際によく使う。",
    "body": "積分区間の端点が一致する・向きが逆・区間を分割する場合の公式。面積を分割して計算する際によく使う。\n\n$$\\int_a^a f(x)\\,dx = 0, \\qquad \\int_b^a f(x)\\,dx = -\\int_a^b f(x)\\,dx, \\qquad \\int_a^c f(x)\\,dx+\\int_c^b f(x)\\,dx = \\int_a^b f(x)\\,dx$$"
  },
  {
    "id": "formula_125",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "曲線とx軸で囲まれた面積",
    "latex": "S = \\int_a^b f(x)\\,dx \\qquad (a\\leq x\\leq b,\\ f(x)\\geq0)",
    "summary": "区間で $f(x)\\geq0$ のとき、面積はそのまま定積分で求まる。",
    "body": "区間で $f(x)\\geq0$ のとき、面積はそのまま定積分で求まる。\n\n$$S = \\int_a^b f(x)\\,dx \\qquad (a\\leq x\\leq b,\\ f(x)\\geq0)$$"
  },
  {
    "id": "formula_126",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "2曲線間の面積",
    "latex": "S = \\int_a^b\\{f(x)-g(x)\\}\\,dx \\qquad (a\\leq x\\leq b,\\ f(x)\\geq g(x))",
    "summary": "上側の関数から下側の関数を引いて積分すると、2曲線に挟まれた面積になる。",
    "body": "上側の関数から下側の関数を引いて積分すると、2曲線に挟まれた面積になる。\n\n$$S = \\int_a^b\\{f(x)-g(x)\\}\\,dx \\qquad (a\\leq x\\leq b,\\ f(x)\\geq g(x))$$"
  },
  {
    "id": "formula_127",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "面積関数の導関数",
    "latex": "S'(x) = f(x) \\qquad (f\\text{は連続関数})",
    "summary": "$x$ までの面積を表す関数 $S(x)$ を微分すると、元の関数 $f(x)$ に戻る。微積分学の基本定理の別の側面。",
    "body": "$x$ までの面積を表す関数 $S(x)$ を微分すると、元の関数 $f(x)$ に戻る。微積分学の基本定理の別の側面。\n\n$$S'(x) = f(x) \\qquad (f\\text{は連続関数})$$"
  },
  {
    "id": "formula_128",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "1/6公式(基本形)",
    "latex": "\\int_\\alpha^\\beta (x-\\alpha)(x-\\beta)\\,dx = -\\frac{1}{6}(\\beta-\\alpha)^3",
    "summary": "2次関数と$x$軸(または直線)の交点による因数分解形 $(x-\\alpha)(x-\\beta)$ の定積分を、係数計算なしで求める公式。面積計算の高速化に必須。",
    "body": "2次関数と$x$軸(または直線)の交点による因数分解形 $(x-\\alpha)(x-\\beta)$ の定積分を、係数計算なしで求める公式。面積計算の高速化に必須。\n\n$$\\int_\\alpha^\\beta (x-\\alpha)(x-\\beta)\\,dx = -\\frac{1}{6}(\\beta-\\alpha)^3$$"
  },
  {
    "id": "formula_129",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "1/6公式(放物線と直線)",
    "latex": "S = \\frac{|a|}{6}(\\beta-\\alpha)^3",
    "summary": "放物線 $y=ax^2+bx+c$ と直線 $y=px+q$ の交点の$x$座標が $\\alpha,\\beta\\ (\\alpha<\\beta)$ のとき、囲まれた面積は次の式になる。",
    "body": "放物線 $y=ax^2+bx+c$ と直線 $y=px+q$ の交点の$x$座標が $\\alpha,\\beta\\ (\\alpha<\\beta)$ のとき、囲まれた面積は次の式になる。\n\n$$S = \\frac{|a|}{6}(\\beta-\\alpha)^3$$"
  },
  {
    "id": "formula_130",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "1/6公式(放物線と放物線)",
    "latex": "S = \\frac{|a_1-a_2|}{6}(\\beta-\\alpha)^3",
    "summary": "2つの放物線(2次の係数がそれぞれ $a_1,a_2$)の交点の$x$座標が $\\alpha,\\beta\\ (\\alpha<\\beta)$ のとき。",
    "body": "2つの放物線(2次の係数がそれぞれ $a_1,a_2$)の交点の$x$座標が $\\alpha,\\beta\\ (\\alpha<\\beta)$ のとき。\n\n$$S = \\frac{|a_1-a_2|}{6}(\\beta-\\alpha)^3$$"
  },
  {
    "id": "formula_131",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "1/3公式(放物線と接線)",
    "latex": "S = \\frac{|a|}{3}|k-\\alpha|^3",
    "summary": "放物線が直線と $x=\\alpha$ で接する(重解になる)とき、差 $f(x)-(\\text{接線})=a(x-\\alpha)^2$ となることを利用した面積公式。",
    "body": "放物線が直線と $x=\\alpha$ で接する(重解になる)とき、差 $f(x)-(\\text{接線})=a(x-\\alpha)^2$ となることを利用した面積公式。\n\n$$S = \\frac{|a|}{3}|k-\\alpha|^3$$"
  },
  {
    "id": "formula_132",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "1/12公式(放物線と2本の接線)",
    "latex": "S_2 = \\frac{|a|}{12}(\\beta-\\alpha)^3, \\qquad S_1 : S_2 = 2 : 1",
    "summary": "放物線に外部の1点から引いた2本の接線(接点の$x$座標が $\\alpha,\\beta$)と放物線に囲まれた面積の公式。放物線と弦(1/6公式の面積)との比が2:1になる性質も重要。",
    "body": "放物線に外部の1点から引いた2本の接線(接点の$x$座標が $\\alpha,\\beta$)と放物線に囲まれた面積の公式。放物線と弦(1/6公式の面積)との比が2:1になる性質も重要。\n\n$$S_2 = \\frac{|a|}{12}(\\beta-\\alpha)^3, \\qquad S_1 : S_2 = 2 : 1$$\n\n(ここで $S_1$は放物線と弦(1/6公式)の面積、$S_2$は放物線と2接線に囲まれた面積)"
  },
  {
    "id": "formula_133",
    "subject": "数学Ⅱ",
    "category": "積分",
    "name": "1/12公式(3次関数と接線)",
    "latex": "S = \\frac{|a|}{12}(\\beta-\\alpha)^4",
    "summary": "3次関数が接線と $x=\\alpha$ で接し(2重解)、$x=\\beta$ で交わる(単純解)とき、差が $a(x-\\alpha)^2(x-\\beta)$ の形になることを使う面積公式。",
    "body": "3次関数が接線と $x=\\alpha$ で接し(2重解)、$x=\\beta$ で交わる(単純解)とき、差が $a(x-\\alpha)^2(x-\\beta)$ の形になることを使う面積公式。\n\n$$S = \\frac{|a|}{12}(\\beta-\\alpha)^4$$"
  },
  {
    "id": "formula_134",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "ベクトルの加法の性質",
    "latex": "\\vec{a}+\\vec{b}=\\vec{b}+\\vec{a}, \\qquad (\\vec{a}+\\vec{b})+\\vec{c}=\\vec{a}+(\\vec{b}+\\vec{c})",
    "summary": "実数の加法と同様、交換法則・結合法則が成り立つ。零ベクトルと逆ベクトルの性質も基本。",
    "body": "実数の加法と同様、交換法則・結合法則が成り立つ。零ベクトルと逆ベクトルの性質も基本。\n\n$$\\vec{a}+\\vec{b}=\\vec{b}+\\vec{a}, \\qquad (\\vec{a}+\\vec{b})+\\vec{c}=\\vec{a}+(\\vec{b}+\\vec{c})$$\n$$\\vec{a}+\\vec{0}=\\vec{a}, \\qquad \\vec{a}+(-\\vec{a})=\\vec{0}$$"
  },
  {
    "id": "formula_135",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "ベクトルの実数倍の性質",
    "latex": "k(l\\vec{a})=(kl)\\vec{a}, \\qquad (k+l)\\vec{a}=k\\vec{a}+l\\vec{a}, \\qquad k(\\vec{a}+\\vec{b})=k\\vec{a}+k\\vec{b}",
    "summary": "スカラー倍に関する結合則・分配則。",
    "body": "スカラー倍に関する結合則・分配則。\n\n$$k(l\\vec{a})=(kl)\\vec{a}, \\qquad (k+l)\\vec{a}=k\\vec{a}+l\\vec{a}, \\qquad k(\\vec{a}+\\vec{b})=k\\vec{a}+k\\vec{b}$$"
  },
  {
    "id": "formula_136",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "ベクトルの平行条件",
    "latex": "\\vec{a}\\neq\\vec{0},\\ \\vec{b}\\neq\\vec{0}\\ のとき \\quad \\vec{a}\\parallel\\vec{b} \\iff \\vec{b}=k\\vec{a}\\ (k\\text{は実数})",
    "summary": "2つのベクトルが平行であることを表す条件。成分がわかっているときは、たすき掛けした差が0になることで判定できる。",
    "body": "2つのベクトルが平行であることを表す条件。成分がわかっているときは、たすき掛けした差が0になることで判定できる。\n\n$$\\vec{a}\\neq\\vec{0},\\ \\vec{b}\\neq\\vec{0}\\ のとき \\quad \\vec{a}\\parallel\\vec{b} \\iff \\vec{b}=k\\vec{a}\\ (k\\text{は実数})$$\n\n成分 $\\vec{a}=(a_1,a_2),\\ \\vec{b}=(b_1,b_2)$ のときの平行条件:\n\n$$a_1b_2-a_2b_1=0$$"
  },
  {
    "id": "formula_137",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "一次独立なベクトルによる分解の一意性",
    "latex": "\\vec{a},\\vec{b}\\ が非零・非平行のとき \\quad \\vec{p}=s\\vec{a}+t\\vec{b}\\ (s,t\\text{は一意})",
    "summary": "零ベクトルでなく互いに平行でない2つのベクトルを使うと、平面上の任意のベクトルはただ一通りに表せる。",
    "body": "零ベクトルでなく互いに平行でない2つのベクトルを使うと、平面上の任意のベクトルはただ一通りに表せる。\n\n$$\\vec{a},\\vec{b}\\ が非零・非平行のとき \\quad \\vec{p}=s\\vec{a}+t\\vec{b}\\ (s,t\\text{は一意})$$\n$$s\\vec{a}+t\\vec{b}=s'\\vec{a}+t'\\vec{b} \\iff s=s',\\ t=t', \\qquad s\\vec{a}+t\\vec{b}=\\vec{0} \\iff s=t=0$$"
  },
  {
    "id": "formula_138",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "成分表示による演算",
    "latex": "\\vec{a}=(a_1,a_2),\\ \\vec{b}=(b_1,b_2)\\ のとき",
    "summary": "座標(成分)で与えられたベクトルの和・差・実数倍の計算法。",
    "body": "座標(成分)で与えられたベクトルの和・差・実数倍の計算法。\n\n$$\\vec{a}=(a_1,a_2),\\ \\vec{b}=(b_1,b_2)\\ のとき$$\n$$\\vec{a}+\\vec{b}=(a_1+b_1,\\ a_2+b_2), \\qquad \\vec{a}-\\vec{b}=(a_1-b_1,\\ a_2-b_2), \\qquad k\\vec{a}=(ka_1,\\ ka_2)$$"
  },
  {
    "id": "formula_139",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "ベクトルの大きさ",
    "latex": "|\\vec{a}|=\\sqrt{a_1^2+a_2^2}, \\qquad |\\overrightarrow{AB}|=\\sqrt{(b_1-a_1)^2+(b_2-a_2)^2}",
    "summary": "成分から大きさ(長さ)を求める公式。2点間の距離公式のベクトル版でもある。",
    "body": "成分から大きさ(長さ)を求める公式。2点間の距離公式のベクトル版でもある。\n\n$$|\\vec{a}|=\\sqrt{a_1^2+a_2^2}, \\qquad |\\overrightarrow{AB}|=\\sqrt{(b_1-a_1)^2+(b_2-a_2)^2}$$"
  },
  {
    "id": "formula_140",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "内積の定義",
    "latex": "\\vec{a}\\cdot\\vec{b}=|\\vec{a}||\\vec{b}|\\cos\\theta \\qquad (\\vec{a},\\vec{b}\\neq\\vec{0})",
    "summary": "2つのベクトルのなす角 $\\theta$ を使った内積の定義。図形的な意味(一方をもう一方の方向に射影した長さの積)を持つ。",
    "body": "2つのベクトルのなす角 $\\theta$ を使った内積の定義。図形的な意味(一方をもう一方の方向に射影した長さの積)を持つ。\n\n$$\\vec{a}\\cdot\\vec{b}=|\\vec{a}||\\vec{b}|\\cos\\theta \\qquad (\\vec{a},\\vec{b}\\neq\\vec{0})$$"
  },
  {
    "id": "formula_141",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "内積の成分表示",
    "latex": "\\vec{a}=(a_1,a_2),\\ \\vec{b}=(b_1,b_2)\\ のとき \\quad \\vec{a}\\cdot\\vec{b}=a_1b_1+a_2b_2",
    "summary": "角度を使わず、成分だけから内積を計算できる公式。平面・空間どちらでも同じ形になる。",
    "body": "角度を使わず、成分だけから内積を計算できる公式。平面・空間どちらでも同じ形になる。\n\n$$\\vec{a}=(a_1,a_2),\\ \\vec{b}=(b_1,b_2)\\ のとき \\quad \\vec{a}\\cdot\\vec{b}=a_1b_1+a_2b_2$$\n$$\\vec{a}=(a_1,a_2,a_3),\\ \\vec{b}=(b_1,b_2,b_3)\\ のとき \\quad \\vec{a}\\cdot\\vec{b}=a_1b_1+a_2b_2+a_3b_3$$"
  },
  {
    "id": "formula_142",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "なす角の公式",
    "latex": "\\cos\\theta = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|} \\qquad (0^\\circ\\leq\\theta\\leq180^\\circ,\\ \\vec{a},\\vec{b}\\neq\\vec{0})",
    "summary": "内積の定義式を $\\cos\\theta$ について解いたもの。",
    "body": "内積の定義式を $\\cos\\theta$ について解いたもの。\n\n$$\\cos\\theta = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|} \\qquad (0^\\circ\\leq\\theta\\leq180^\\circ,\\ \\vec{a},\\vec{b}\\neq\\vec{0})$$"
  },
  {
    "id": "formula_143",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "垂直条件・平行条件(内積による表現)",
    "latex": "\\vec{a}\\perp\\vec{b} \\iff \\vec{a}\\cdot\\vec{b}=0",
    "summary": "$\\cos\\theta=0$ なら垂直、$\\cos\\theta=\\pm1$ なら平行という関係を使った判定条件。",
    "body": "$\\cos\\theta=0$ なら垂直、$\\cos\\theta=\\pm1$ なら平行という関係を使った判定条件。\n\n$$\\vec{a}\\perp\\vec{b} \\iff \\vec{a}\\cdot\\vec{b}=0$$\n$$\\vec{a}\\parallel\\vec{b} \\iff \\vec{a}\\cdot\\vec{b}=\\pm|\\vec{a}||\\vec{b}|$$"
  },
  {
    "id": "formula_144",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "内積の演算法則",
    "latex": "\\vec{a}\\cdot\\vec{b}=\\vec{b}\\cdot\\vec{a}, \\qquad (\\vec{a}+\\vec{b})\\cdot\\vec{c}=\\vec{a}\\cdot\\vec{c}+\\vec{b}\\cdot\\vec{c}, \\qquad (k\\vec{a})\\cdot\\vec{b}=\\vec{a}\\cdot(k\\vec{b})=k(\\vec{a}\\cdot\\vec{b})",
    "summary": "内積の交換法則・分配法則・スカラー倍。実数の掛け算に近い感覚で計算できる。",
    "body": "内積の交換法則・分配法則・スカラー倍。実数の掛け算に近い感覚で計算できる。\n\n$$\\vec{a}\\cdot\\vec{b}=\\vec{b}\\cdot\\vec{a}, \\qquad (\\vec{a}+\\vec{b})\\cdot\\vec{c}=\\vec{a}\\cdot\\vec{c}+\\vec{b}\\cdot\\vec{c}, \\qquad (k\\vec{a})\\cdot\\vec{b}=\\vec{a}\\cdot(k\\vec{b})=k(\\vec{a}\\cdot\\vec{b})$$"
  },
  {
    "id": "formula_145",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "内積と大きさの関係・内積の不等式",
    "latex": "\\vec{a}\\cdot\\vec{a}=|\\vec{a}|^2, \\qquad -|\\vec{a}||\\vec{b}|\\leq\\vec{a}\\cdot\\vec{b}\\leq|\\vec{a}||\\vec{b}|",
    "summary": "自分自身との内積が大きさの2乗になる関係と、内積が取りうる値の範囲(コーシー・シュワルツの不等式に相当)。",
    "body": "自分自身との内積が大きさの2乗になる関係と、内積が取りうる値の範囲(コーシー・シュワルツの不等式に相当)。\n\n$$\\vec{a}\\cdot\\vec{a}=|\\vec{a}|^2, \\qquad -|\\vec{a}||\\vec{b}|\\leq\\vec{a}\\cdot\\vec{b}\\leq|\\vec{a}||\\vec{b}|$$"
  },
  {
    "id": "formula_146",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "三角形の面積公式(ベクトル)",
    "latex": "S=\\frac{1}{2}\\sqrt{|\\vec{a}|^2|\\vec{b}|^2-(\\vec{a}\\cdot\\vec{b})^2}",
    "summary": "$\\triangle OAB$ で $\\overrightarrow{OA}=\\vec{a},\\ \\overrightarrow{OB}=\\vec{b}$ とするとき、三角比を使わずに内積だけで面積を求める公式。成分がわかれば、たすき掛けの絶対値の半分としても求まる。",
    "body": "$\\triangle OAB$ で $\\overrightarrow{OA}=\\vec{a},\\ \\overrightarrow{OB}=\\vec{b}$ とするとき、三角比を使わずに内積だけで面積を求める公式。成分がわかれば、たすき掛けの絶対値の半分としても求まる。\n\n$$S=\\frac{1}{2}\\sqrt{|\\vec{a}|^2|\\vec{b}|^2-(\\vec{a}\\cdot\\vec{b})^2}$$\n\n成分 $\\vec{a}=(a_1,a_2),\\ \\vec{b}=(b_1,b_2)$ のとき:\n\n$$S=\\frac{1}{2}|a_1b_2-a_2b_1|$$"
  },
  {
    "id": "formula_147",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "内分点の位置ベクトル",
    "latex": "\\vec{p}=\\frac{n\\vec{a}+m\\vec{b}}{m+n}",
    "summary": "線分ABを $m:n$ に内分する点Pの位置ベクトル。",
    "body": "線分ABを $m:n$ に内分する点Pの位置ベクトル。\n\n$$\\vec{p}=\\frac{n\\vec{a}+m\\vec{b}}{m+n}$$"
  },
  {
    "id": "formula_148",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "外分点の位置ベクトル",
    "latex": "\\vec{q}=\\frac{-n\\vec{a}+m\\vec{b}}{m-n} \\qquad (m\\neq n)",
    "summary": "線分ABを $m:n$ に外分する点Qの位置ベクトル。$m=n$ のときは外分点が存在しない($m\\neq n$ が条件)。",
    "body": "線分ABを $m:n$ に外分する点Qの位置ベクトル。$m=n$ のときは外分点が存在しない($m\\neq n$ が条件)。\n\n$$\\vec{q}=\\frac{-n\\vec{a}+m\\vec{b}}{m-n} \\qquad (m\\neq n)$$"
  },
  {
    "id": "formula_149",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "重心の位置ベクトル",
    "latex": "\\vec{g}=\\frac{\\vec{a}+\\vec{b}+\\vec{c}}{3}",
    "summary": "$\\triangle ABC$ の3頂点の位置ベクトルの平均が、重心の位置ベクトルになる。",
    "body": "$\\triangle ABC$ の3頂点の位置ベクトルの平均が、重心の位置ベクトルになる。\n\n$$\\vec{g}=\\frac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$$"
  },
  {
    "id": "formula_150",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "直線のベクトル方程式",
    "latex": "\\vec{p}=\\vec{a}+t\\vec{d}",
    "summary": "直線を「通る点」と「方向」または「法線」で表す3通りの表し方。",
    "body": "直線を「通る点」と「方向」または「法線」で表す3通りの表し方。\n\n- 定点 $A(\\vec{a})$ を通り方向ベクトル $\\vec{d}\\ (\\neq\\vec{0})$ に平行な直線:\n$$\\vec{p}=\\vec{a}+t\\vec{d}$$\n- 異なる2点 $A(\\vec{a}),\\ B(\\vec{b})$ を通る直線(共線条件):\n$$\\vec{p}=(1-t)\\vec{a}+t\\vec{b}, \\qquad すなわち\\ \\vec{p}=s\\vec{a}+t\\vec{b}\\ (s+t=1)$$\n- 定点 $A(\\vec{a})$ を通り法線ベクトル $\\vec{n}\\ (\\neq\\vec{0})$ に垂直な直線:\n$$\\vec{n}\\cdot(\\vec{p}-\\vec{a})=0$$"
  },
  {
    "id": "formula_151",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "ベクトルの終点の存在範囲",
    "latex": "",
    "summary": "$\\vec{p}=s\\vec{a}+t\\vec{b}$ の $s,t$ に条件を付けたときに、点Pが描く図形。図形問題の頻出パターン。",
    "body": "$\\vec{p}=s\\vec{a}+t\\vec{b}$ の $s,t$ に条件を付けたときに、点Pが描く図形。図形問題の頻出パターン。\n\n| 図形 | 条件 |\n|---|---|\n| 直線AB | $s+t=1$ |\n| 線分AB | $s+t=1,\\ s\\geq0,\\ t\\geq0$ |\n| $\\triangle OAB$ の周と内部 | $0\\leq s+t\\leq1,\\ s\\geq0,\\ t\\geq0$ |\n| 平行四辺形OACBの周と内部 | $0\\leq s\\leq1,\\ 0\\leq t\\leq1$ |"
  },
  {
    "id": "formula_152",
    "subject": "数学B",
    "category": "ベクトル",
    "name": "円のベクトル方程式",
    "latex": "中心C(\\vec{c}),\\ 半径r:\\qquad |\\vec{p}-\\vec{c}|=r \\quad または \\quad (\\vec{p}-\\vec{c})\\cdot(\\vec{p}-\\vec{c})=r^2",
    "summary": "中心と半径による表し方、および直径の両端を使った表し方(直径に対する円周角が直角であることに対応)。",
    "body": "中心と半径による表し方、および直径の両端を使った表し方(直径に対する円周角が直角であることに対応)。\n\n$$中心C(\\vec{c}),\\ 半径r:\\qquad |\\vec{p}-\\vec{c}|=r \\quad または \\quad (\\vec{p}-\\vec{c})\\cdot(\\vec{p}-\\vec{c})=r^2$$\n$$線分ABを直径とする円:\\qquad (\\vec{p}-\\vec{a})\\cdot(\\vec{p}-\\vec{b})=0$$\n\n---"
  },
  {
    "id": "formula_153",
    "subject": "数学B",
    "category": "数列",
    "name": "等差数列の定義",
    "latex": "a_{n+1}-a_n=d \\qquad (\\text{一定})",
    "summary": "隣り合う項の差が常に一定 $d$(公差)であるという数列の定義。",
    "body": "隣り合う項の差が常に一定 $d$(公差)であるという数列の定義。\n\n$$a_{n+1}-a_n=d \\qquad (\\text{一定})$$"
  },
  {
    "id": "formula_154",
    "subject": "数学B",
    "category": "数列",
    "name": "等差数列の一般項",
    "latex": "a_n=a+(n-1)d",
    "summary": "初項 $a$、公差 $d$ から、$n$項目を直接求める公式。",
    "body": "初項 $a$、公差 $d$ から、$n$項目を直接求める公式。\n\n$$a_n=a+(n-1)d$$"
  },
  {
    "id": "formula_155",
    "subject": "数学B",
    "category": "数列",
    "name": "等差数列の和",
    "latex": "S_n=\\frac{1}{2}n(a+l) \\qquad (l\\text{は末項})",
    "summary": "初項と末項がわかる場合、公差がわかる場合の2通りの和の公式(実質は同じ式を書き換えたもの)。",
    "body": "初項と末項がわかる場合、公差がわかる場合の2通りの和の公式(実質は同じ式を書き換えたもの)。\n\n$$S_n=\\frac{1}{2}n(a+l) \\qquad (l\\text{は末項})$$\n$$S_n=\\frac{1}{2}n\\{2a+(n-1)d\\}$$"
  },
  {
    "id": "formula_156",
    "subject": "数学B",
    "category": "数列",
    "name": "等差中項",
    "latex": "b=\\frac{a+c}{2}",
    "summary": "$a,b,c$ がこの順に等差数列をなすとき、真ん中の項は両端の平均になる。",
    "body": "$a,b,c$ がこの順に等差数列をなすとき、真ん中の項は両端の平均になる。\n\n$$b=\\frac{a+c}{2}$$"
  },
  {
    "id": "formula_157",
    "subject": "数学B",
    "category": "数列",
    "name": "調和数列の条件",
    "latex": "\\frac{1}{a_{n+1}}-\\frac{1}{a_n}=d \\quad (\\text{一定})",
    "summary": "各項の逆数をとった数列が等差数列になっているとき、元の数列を調和数列という。",
    "body": "各項の逆数をとった数列が等差数列になっているとき、元の数列を調和数列という。\n\n$$\\frac{1}{a_{n+1}}-\\frac{1}{a_n}=d \\quad (\\text{一定})$$"
  },
  {
    "id": "formula_158",
    "subject": "数学B",
    "category": "数列",
    "name": "等比数列の定義",
    "latex": "a_{n+1}=ra_n \\qquad \\left(a_n\\neq0\\ のとき\\ \\frac{a_{n+1}}{a_n}=r\\right)",
    "summary": "隣り合う項の比が常に一定 $r$(公比)であるという数列の定義。",
    "body": "隣り合う項の比が常に一定 $r$(公比)であるという数列の定義。\n\n$$a_{n+1}=ra_n \\qquad \\left(a_n\\neq0\\ のとき\\ \\frac{a_{n+1}}{a_n}=r\\right)$$"
  },
  {
    "id": "formula_159",
    "subject": "数学B",
    "category": "数列",
    "name": "等比数列の一般項",
    "latex": "a_n=ar^{n-1}",
    "summary": "初項 $a$、公比 $r$ から、$n$項目を直接求める公式。",
    "body": "初項 $a$、公比 $r$ から、$n$項目を直接求める公式。\n\n$$a_n=ar^{n-1}$$"
  },
  {
    "id": "formula_160",
    "subject": "数学B",
    "category": "数列",
    "name": "等比中項",
    "latex": "b^2=ac",
    "summary": "$a,b,c$ がこの順に等比数列をなすときの関係式(出典サイトは $b=\\sqrt{ac}$ としていたが、これは $a,c$ が正の場合に限る式であり、一般には $b^2=ac$ が正しい表現である)。",
    "body": "$a,b,c$ がこの順に等比数列をなすときの関係式(出典サイトは $b=\\sqrt{ac}$ としていたが、これは $a,c$ が正の場合に限る式であり、一般には $b^2=ac$ が正しい表現である)。\n\n$$b^2=ac$$"
  },
  {
    "id": "formula_161",
    "subject": "数学B",
    "category": "数列",
    "name": "等比数列の和",
    "latex": "r\\neq1\\ のとき\\quad S_n=\\frac{a(1-r^n)}{1-r}=\\frac{a(r^n-1)}{r-1}",
    "summary": "公比が1かどうかで場合分けが必要な点に注意(公比1のときは単純な等差の和になる)。",
    "body": "公比が1かどうかで場合分けが必要な点に注意(公比1のときは単純な等差の和になる)。\n\n$$r\\neq1\\ のとき\\quad S_n=\\frac{a(1-r^n)}{1-r}=\\frac{a(r^n-1)}{r-1}$$\n$$r=1\\ のとき\\quad S_n=na$$"
  },
  {
    "id": "formula_162",
    "subject": "数学B",
    "category": "数列",
    "name": "Σ(シグマ)の定義",
    "latex": "\\sum_{k=1}^{n}a_k=a_1+a_2+\\cdots+a_n",
    "summary": "数列の和を、和の記号を使って簡潔に表したもの。",
    "body": "数列の和を、和の記号を使って簡潔に表したもの。\n\n$$\\sum_{k=1}^{n}a_k=a_1+a_2+\\cdots+a_n$$"
  },
  {
    "id": "formula_163",
    "subject": "数学B",
    "category": "数列",
    "name": "Σの基本公式",
    "latex": "\\sum_{k=1}^{n}a=na \\qquad (a\\text{は定数})",
    "summary": "数列の和の計算でもっとも基本となる5つの公式。特に $k,k^2,k^3$ の和は暗記必須。",
    "body": "数列の和の計算でもっとも基本となる5つの公式。特に $k,k^2,k^3$ の和は暗記必須。\n\n$$\\sum_{k=1}^{n}a=na \\qquad (a\\text{は定数})$$\n$$\\sum_{k=1}^{n}k=\\frac{1}{2}n(n+1)$$\n$$\\sum_{k=1}^{n}k^2=\\frac{1}{6}n(n+1)(2n+1)$$\n$$\\sum_{k=1}^{n}k^3=\\left\\{\\frac{1}{2}n(n+1)\\right\\}^2$$\n$$\\sum_{k=1}^{n}ar^{k-1}=\\frac{a(1-r^n)}{1-r}=\\frac{a(r^n-1)}{r-1} \\qquad (r\\neq1)$$"
  },
  {
    "id": "formula_164",
    "subject": "数学B",
    "category": "数列",
    "name": "Σの性質(線形性)",
    "latex": "\\sum_{k=1}^{n}(a_k+b_k)=\\sum_{k=1}^{n}a_k+\\sum_{k=1}^{n}b_k, \\qquad \\sum_{k=1}^{n}pa_k=p\\sum_{k=1}^{n}a_k",
    "summary": "Σも積分と同様に線形演算であり、和の分配・定数倍・線形結合ができる。",
    "body": "Σも積分と同様に線形演算であり、和の分配・定数倍・線形結合ができる。\n\n$$\\sum_{k=1}^{n}(a_k+b_k)=\\sum_{k=1}^{n}a_k+\\sum_{k=1}^{n}b_k, \\qquad \\sum_{k=1}^{n}pa_k=p\\sum_{k=1}^{n}a_k$$\n$$\\sum_{k=1}^{n}(pa_k+qb_k)=p\\sum_{k=1}^{n}a_k+q\\sum_{k=1}^{n}b_k \\qquad (p,q\\text{は定数})$$"
  },
  {
    "id": "formula_165",
    "subject": "数学B",
    "category": "数列",
    "name": "階差数列の定義",
    "latex": "b_n=a_{n+1}-a_n",
    "summary": "ある数列の「隣り合う項の差」を新しい数列として並べたもの。",
    "body": "ある数列の「隣り合う項の差」を新しい数列として並べたもの。\n\n$$b_n=a_{n+1}-a_n$$"
  },
  {
    "id": "formula_166",
    "subject": "数学B",
    "category": "数列",
    "name": "階差数列を用いた一般項の公式",
    "latex": "n\\geq2\\ のとき\\quad a_n=a_1+\\sum_{k=1}^{n-1}b_k",
    "summary": "階差数列 $\\{b_n\\}$ から元の数列 $\\{a_n\\}$ の一般項を復元する公式。$n=1$ の場合は別途、求めた式に代入して成り立つか確認する必要がある(公式は $n\\geq2$ でのみ保証される)。",
    "body": "階差数列 $\\{b_n\\}$ から元の数列 $\\{a_n\\}$ の一般項を復元する公式。$n=1$ の場合は別途、求めた式に代入して成り立つか確認する必要がある(公式は $n\\geq2$ でのみ保証される)。\n\n$$n\\geq2\\ のとき\\quad a_n=a_1+\\sum_{k=1}^{n-1}b_k$$\n\n漸化式 $a_{n+1}=a_n+f(n)$ の形も、$f(n)$ を階差数列とみなして同じ公式で解ける。"
  },
  {
    "id": "formula_167",
    "subject": "数学B",
    "category": "数列",
    "name": "部分分数分解の基本形",
    "latex": "\\frac{1}{(x+a)(x+b)}=\\frac{1}{b-a}\\left(\\frac{1}{x+a}-\\frac{1}{x+b}\\right) \\qquad (a\\neq b,\\ x\\neq-a,-b)",
    "summary": "分数の和を計算しやすくするために、1つの分数を2つ以上の分数の差(または和)に分解する変形。数列の和(特にΣの中に分数式がある場合)で必須のテクニック。",
    "body": "分数の和を計算しやすくするために、1つの分数を2つ以上の分数の差(または和)に分解する変形。数列の和(特にΣの中に分数式がある場合)で必須のテクニック。\n\n$$\\frac{1}{(x+a)(x+b)}=\\frac{1}{b-a}\\left(\\frac{1}{x+a}-\\frac{1}{x+b}\\right) \\qquad (a\\neq b,\\ x\\neq-a,-b)$$\n\nより一般の1次分子の場合:\n\n$$\\frac{px+q}{(ax+b)(cx+d)}=\\frac{A}{ax+b}+\\frac{B}{cx+d}$$\n\n重根の場合:\n\n$$\\frac{px+q}{(ax+b)^2}=\\frac{A}{ax+b}+\\frac{B}{(ax+b)^2}$$"
  },
  {
    "id": "formula_168",
    "subject": "数学B",
    "category": "数列",
    "name": "部分分数分解を利用した和の計算(テレスコーピング)",
    "latex": "\\sum_{k=1}^{n}\\frac{1}{k(k+1)}=\\sum_{k=1}^{n}\\left(\\frac{1}{k}-\\frac{1}{k+1}\\right)=1-\\frac{1}{n+1}=\\frac{n}{n+1}",
    "summary": "部分分数分解すると、和の計算過程で中間の項が次々と打ち消し合い、最初と最後の項だけが残る。",
    "body": "部分分数分解すると、和の計算過程で中間の項が次々と打ち消し合い、最初と最後の項だけが残る。\n\n$$\\sum_{k=1}^{n}\\frac{1}{k(k+1)}=\\sum_{k=1}^{n}\\left(\\frac{1}{k}-\\frac{1}{k+1}\\right)=1-\\frac{1}{n+1}=\\frac{n}{n+1}$$\n\n分母が3因数の場合は、2段階の部分分数分解を使う。\n\n$$\\frac{1}{k(k+1)(k+2)}=\\frac{1}{2}\\left\\{\\frac{1}{k(k+1)}-\\frac{1}{(k+1)(k+2)}\\right\\}$$\n\n---"
  },
  {
    "id": "formula_169",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン1:等差数列型",
    "latex": "a_{n+1}-a_n=d \\quad \\Longrightarrow \\quad a_n=a_1+(n-1)d",
    "summary": "差が定数になる最も基本的な形。",
    "body": "差が定数になる最も基本的な形。\n\n$$a_{n+1}-a_n=d \\quad \\Longrightarrow \\quad a_n=a_1+(n-1)d$$"
  },
  {
    "id": "formula_170",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン2:等比数列型",
    "latex": "a_{n+1}=ra_n \\quad \\Longrightarrow \\quad a_n=a_1r^{n-1}",
    "summary": "比が定数になる形。",
    "body": "比が定数になる形。\n\n$$a_{n+1}=ra_n \\quad \\Longrightarrow \\quad a_n=a_1r^{n-1}$$"
  },
  {
    "id": "formula_171",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン3:階差数列型",
    "latex": "a_{n+1}=a_n+f(n) \\quad \\Longrightarrow \\quad a_n=a_1+\\sum_{k=1}^{n-1}f(k) \\quad (n\\geq2)",
    "summary": "差が $n$ の関数になっている形。差の数列を作って和をとる。",
    "body": "差が $n$ の関数になっている形。差の数列を作って和をとる。\n\n$$a_{n+1}=a_n+f(n) \\quad \\Longrightarrow \\quad a_n=a_1+\\sum_{k=1}^{n-1}f(k) \\quad (n\\geq2)$$"
  },
  {
    "id": "formula_172",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン4:特性方程式型($a_{n+1}=pa_n+q$)",
    "latex": "特性方程式:\\ \\alpha=p\\alpha+q \\quad (p\\neq1のとき\\ \\alpha=\\frac{q}{1-p})",
    "summary": "最頻出パターン。方程式 $\\alpha=p\\alpha+q$(特性方程式)の解 $\\alpha$ を使い、両辺から $\\alpha$ を引くと等比数列の形に帰着する。",
    "body": "最頻出パターン。方程式 $\\alpha=p\\alpha+q$(特性方程式)の解 $\\alpha$ を使い、両辺から $\\alpha$ を引くと等比数列の形に帰着する。\n\n$$特性方程式:\\ \\alpha=p\\alpha+q \\quad (p\\neq1のとき\\ \\alpha=\\frac{q}{1-p})$$\n$$a_{n+1}-\\alpha=p(a_n-\\alpha) \\quad \\Longrightarrow \\quad a_n-\\alpha=(a_1-\\alpha)p^{n-1}$$"
  },
  {
    "id": "formula_173",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン5:階差併用型($a_{n+1}=pa_n+f(n)$)",
    "latex": "a_{n+2}-a_{n+1}=p(a_{n+1}-a_n)+\\{f(n+1)-f(n)\\}",
    "summary": "$n$ を $n+1$ にした式ともとの式の差をとることで、$b_n=a_{n+1}-a_n$ に関する等比型の漸化式に帰着できる(ただし $f(n)$ が扱いやすい形のときに有効。多項式型の $f(n)$ では、両辺を $p^{n}$ で割って等差数列に帰着させる方法もよく使われる)。",
    "body": "$n$ を $n+1$ にした式ともとの式の差をとることで、$b_n=a_{n+1}-a_n$ に関する等比型の漸化式に帰着できる(ただし $f(n)$ が扱いやすい形のときに有効。多項式型の $f(n)$ では、両辺を $p^{n}$ で割って等差数列に帰着させる方法もよく使われる)。\n\n$$a_{n+2}-a_{n+1}=p(a_{n+1}-a_n)+\\{f(n+1)-f(n)\\}$$"
  },
  {
    "id": "formula_174",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン6:指数型($a_{n+1}=pa_n+q^n$)",
    "latex": "\\frac{a_{n+1}}{q^{n+1}}=\\frac{p}{q}\\cdot\\frac{a_n}{q^n}+\\frac{1}{q}",
    "summary": "両辺を $q^{n+1}$ で割ることで、$b_n=\\dfrac{a_n}{q^n}$ についての定数項付き漸化式(パターン4)に帰着する。",
    "body": "両辺を $q^{n+1}$ で割ることで、$b_n=\\dfrac{a_n}{q^n}$ についての定数項付き漸化式(パターン4)に帰着する。\n\n$$\\frac{a_{n+1}}{q^{n+1}}=\\frac{p}{q}\\cdot\\frac{a_n}{q^n}+\\frac{1}{q}$$"
  },
  {
    "id": "formula_175",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン7:分数漸化式(逆数型、$a_{n+1}=\\dfrac{a_n}{pa_n+q}$)",
    "latex": "\\frac{1}{a_{n+1}}=\\frac{pa_n+q}{a_n}=q\\cdot\\frac{1}{a_n}+p \\quad \\Longrightarrow \\quad b_{n+1}=qb_n+p",
    "summary": "両辺の逆数をとると、$b_n=\\dfrac{1}{a_n}$ についての線形漸化式(パターン4)に帰着する。",
    "body": "両辺の逆数をとると、$b_n=\\dfrac{1}{a_n}$ についての線形漸化式(パターン4)に帰着する。\n\n$$\\frac{1}{a_{n+1}}=\\frac{pa_n+q}{a_n}=q\\cdot\\frac{1}{a_n}+p \\quad \\Longrightarrow \\quad b_{n+1}=qb_n+p$$"
  },
  {
    "id": "formula_176",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン8:対数型($a_{n+1}=pa_n^{\\,q}$、$a_n>0$)",
    "latex": "\\log a_{n+1}=\\log p+q\\log a_n \\quad \\Longrightarrow \\quad b_{n+1}=qb_n+\\log p",
    "summary": "両辺の対数をとると、$b_n=\\log a_n$ についての線形漸化式(パターン4)に帰着する。",
    "body": "両辺の対数をとると、$b_n=\\log a_n$ についての線形漸化式(パターン4)に帰着する。\n\n$$\\log a_{n+1}=\\log p+q\\log a_n \\quad \\Longrightarrow \\quad b_{n+1}=qb_n+\\log p$$"
  },
  {
    "id": "formula_177",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン9:係数可変型(隣接2項間、係数が$n$の関数)",
    "latex": "",
    "summary": "$a_{n+1}=f(n)a_n+q$ のように、掛かる係数自体が $n$ に依存する形。適切な式($n$の関数)で両辺を割って係数を定数化してから解くのが基本方針。",
    "body": "$a_{n+1}=f(n)a_n+q$ のように、掛かる係数自体が $n$ に依存する形。適切な式($n$の関数)で両辺を割って係数を定数化してから解くのが基本方針。"
  },
  {
    "id": "formula_178",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン10:隣接3項間漸化式(3項間で特性方程式を使う型)",
    "latex": "特性方程式:\\ px^2+qx+r=0 \\quad (解\\ \\alpha,\\beta)",
    "summary": "$pa_{n+2}+qa_{n+1}+ra_n=0$ の形。特性方程式 $px^2+qx+r=0$ の解 $\\alpha,\\beta$ を使って、2通りの等比型に変形できる。",
    "body": "$pa_{n+2}+qa_{n+1}+ra_n=0$ の形。特性方程式 $px^2+qx+r=0$ の解 $\\alpha,\\beta$ を使って、2通りの等比型に変形できる。\n\n$$特性方程式:\\ px^2+qx+r=0 \\quad (解\\ \\alpha,\\beta)$$\n$$a_{n+2}-\\alpha a_{n+1}=\\beta(a_{n+1}-\\alpha a_n), \\qquad a_{n+2}-\\beta a_{n+1}=\\alpha(a_{n+1}-\\beta a_n)$$\n\n- **解 $\\alpha,\\beta$ が異なる2つの実数のとき**:上の2式はそれぞれ公比 $\\beta$、$\\alpha$ の等比数列を表す式になるので、2式から $a_{n+1}$ を消去して $a_n$ の一般項を求める。\n- **解の一方が $\\alpha=1$ のとき**:$a_{n+1}-a_n=(a_2-a_1)\\beta^{n-1}$ となり、パターン3(階差数列型)に帰着する。\n- **重解($\\alpha=\\beta$)のとき**:$a_{n+1}-\\alpha a_n=(a_2-\\alpha a_1)\\alpha^{n-1}$ となり、パターン6(指数型)に帰着する。"
  },
  {
    "id": "formula_179",
    "subject": "数学B",
    "category": "漸化式(数列の応用)の解法パターン",
    "name": "パターン11:連立漸化式",
    "latex": "a_{n+1}+\\alpha b_{n+1}=\\beta(a_n+\\alpha b_n)",
    "summary": "2つの数列 $\\{a_n\\},\\{b_n\\}$ が互いに絡み合う形。主に2つの解法がある。",
    "body": "2つの数列 $\\{a_n\\},\\{b_n\\}$ が互いに絡み合う形。主に2つの解法がある。\n\n- **解法1(線形結合で等比化)**:適当な定数 $\\alpha$ を見つけて $a_{n+1}+\\alpha b_{n+1}=\\beta(a_n+\\alpha b_n)$ の形に変形し、$c_n=a_n+\\alpha b_n$ を等比数列として解く。\n$$a_{n+1}+\\alpha b_{n+1}=\\beta(a_n+\\alpha b_n)$$\n- **解法2(一方を消去して隣接3項間に帰着)**:一方の式を使ってもう一方の数列を消去し、$a_n$(または$b_n$)だけの隣接3項間漸化式(パターン10)に帰着させる。\n\n---"
  },
  {
    "id": "formula_180",
    "subject": "数学B",
    "category": "数学的帰納法",
    "name": "数学的帰納法の基本原理",
    "latex": "",
    "summary": "自然数 $n$ に関する命題 $P(n)$ が、すべての $n\\geq n_0$ で成り立つことを示すための証明法。ドミノ倒しのように、最初の1個が倒れ、かつ「1個倒れれば次も倒れる」ことを示せば、すべてが倒れることが保証される。",
    "body": "自然数 $n$ に関する命題 $P(n)$ が、すべての $n\\geq n_0$ で成り立つことを示すための証明法。ドミノ倒しのように、最初の1個が倒れ、かつ「1個倒れれば次も倒れる」ことを示せば、すべてが倒れることが保証される。\n\n- **[1]** $n=n_0$(通常は $n=1$)のとき $P(n)$ が成り立つことを示す。\n- **[2]** $n=k\\ (k\\geq n_0)$ のとき $P(n)$ が成り立つと仮定し、その仮定のもとで $n=k+1$ のときも $P(n)$ が成り立つことを示す。\n\n[1]・[2]が両方示せれば、すべての $n\\geq n_0$ について $P(n)$ が成り立つと結論できる。"
  },
  {
    "id": "formula_181",
    "subject": "数学B",
    "category": "数学的帰納法",
    "name": "適用パターン1:等式の証明",
    "latex": "",
    "summary": "和の公式などの等式を証明する際の典型パターン。$n=k$ での等式を仮定し、両辺に $k+1$項目を加えて $n=k+1$ の場合の右辺の形に変形する。",
    "body": "和の公式などの等式を証明する際の典型パターン。$n=k$ での等式を仮定し、両辺に $k+1$項目を加えて $n=k+1$ の場合の右辺の形に変形する。\n\n例:$\\displaystyle\\sum_{i=1}^{n}i^2=\\frac{1}{6}n(n+1)(2n+1)$ の証明。"
  },
  {
    "id": "formula_182",
    "subject": "数学B",
    "category": "数学的帰納法",
    "name": "適用パターン2:倍数性の証明",
    "latex": "",
    "summary": "「ある式が整数 $m$ の倍数である」ことを証明するパターン。$n=k$ のとき式が $m$ の倍数、すなわち $m$ 倍の整数で表せると仮定し、$n=k+1$ のときの式を $m\\times(\\text{整数})$ の形に変形する。",
    "body": "「ある式が整数 $m$ の倍数である」ことを証明するパターン。$n=k$ のとき式が $m$ の倍数、すなわち $m$ 倍の整数で表せると仮定し、$n=k+1$ のときの式を $m\\times(\\text{整数})$ の形に変形する。\n\n例:$7^n-2n-1$ が4の倍数であることの証明。"
  },
  {
    "id": "formula_183",
    "subject": "数学B",
    "category": "数学的帰納法",
    "name": "適用パターン3:不等式の証明",
    "latex": "",
    "summary": "$N>M$ を示すために、差 $N-M$ を作り、それが正であることを $n=k$ の仮定を使って示すパターン。ある値以上の $n$($n\\geq n_0$)でのみ成り立つ不等式によく使う。",
    "body": "$N>M$ を示すために、差 $N-M$ を作り、それが正であることを $n=k$ の仮定を使って示すパターン。ある値以上の $n$($n\\geq n_0$)でのみ成り立つ不等式によく使う。\n\n例:$n\\geq5$ のとき $n^2<2^n$ であることの証明。"
  },
  {
    "id": "formula_184",
    "subject": "数学B",
    "category": "数学的帰納法",
    "name": "適用パターン4:漸化式から一般項を推測して証明する",
    "latex": "",
    "summary": "漸化式で定義された数列の一般項が直接求めにくいとき、①初項からいくつか計算して規則性を推測し、②推測した一般項の式を立て、③数学的帰納法でその推測が正しいことを証明する、という3段階の手順。",
    "body": "漸化式で定義された数列の一般項が直接求めにくいとき、①初項からいくつか計算して規則性を推測し、②推測した一般項の式を立て、③数学的帰納法でその推測が正しいことを証明する、という3段階の手順。\n\n例:$a_{n+1}=\\dfrac{a_n}{1+3a_n}$ から一般項 $a_n=\\dfrac{1}{3n-2}$ を推測し、帰納法で証明する。"
  },
  {
    "id": "formula_185",
    "subject": "数学Ⅲ",
    "category": "複素数平面",
    "name": "虚数単位と複素数の定義",
    "latex": "i^2=-1,\\qquad \\alpha=a+bi\\ \\longleftrightarrow\\ \\mathrm{A}(a,b)",
    "summary": "虚数単位 $i$ は2乗すると $-1$ になる数として定義され、複素数は実数 $a,b$ を用いて $a+bi$ の形で表される。複素数平面では複素数 $\\alpha=a+bi$ を点 $\\mathrm{A}(a,b)$ に対応させる。",
    "body": "虚数単位 $i$ は2乗すると $-1$ になる数として定義され、複素数は実数 $a,b$ を用いて $a+bi$ の形で表される。複素数平面では複素数 $\\alpha=a+bi$ を点 $\\mathrm{A}(a,b)$ に対応させる。\n\n$$i^2=-1,\\qquad \\alpha=a+bi\\ \\longleftrightarrow\\ \\mathrm{A}(a,b)$$"
  },
  {
    "id": "formula_186",
    "subject": "数学Ⅲ",
    "category": "複素数平面",
    "name": "3点の共線条件(原点を含む場合)",
    "latex": "\\mathrm O,\\ \\alpha,\\ \\beta\\ \\text{が同一直線上}\\iff \\beta=k\\alpha\\ (k\\ \\text{は実数})",
    "summary": "原点 $\\mathrm O$、点 $\\alpha$、点 $\\beta$($\\alpha\\neq0$)が一直線上にあるための条件は、$\\beta$ が $\\alpha$ の実数倍で表されることである。",
    "body": "原点 $\\mathrm O$、点 $\\alpha$、点 $\\beta$($\\alpha\\neq0$)が一直線上にあるための条件は、$\\beta$ が $\\alpha$ の実数倍で表されることである。\n\n$$\\mathrm O,\\ \\alpha,\\ \\beta\\ \\text{が同一直線上}\\iff \\beta=k\\alpha\\ (k\\ \\text{は実数})$$"
  },
  {
    "id": "formula_187",
    "subject": "数学Ⅲ",
    "category": "複素数平面",
    "name": "複素数の和・差",
    "latex": "\\alpha+\\beta=(a+c)+(b+d)i,\\qquad \\alpha-\\beta=(a-c)+(b-d)i",
    "summary": "$\\alpha=a+bi,\\ \\beta=c+di$ のとき、和・差は実部・虚部をそれぞれ加減して求める(複素数平面上ではベクトルの和・差に対応)。",
    "body": "$\\alpha=a+bi,\\ \\beta=c+di$ のとき、和・差は実部・虚部をそれぞれ加減して求める(複素数平面上ではベクトルの和・差に対応)。\n\n$$\\alpha+\\beta=(a+c)+(b+d)i,\\qquad \\alpha-\\beta=(a-c)+(b-d)i$$"
  },
  {
    "id": "formula_188",
    "subject": "数学Ⅲ",
    "category": "複素数平面",
    "name": "共役複素数の定義と性質",
    "latex": "\\alpha+\\bar\\alpha=2a\\ (\\text{実数}),\\quad \\overline{\\alpha\\pm\\beta}=\\bar\\alpha\\pm\\bar\\beta,\\quad \\overline{\\alpha\\beta}=\\bar\\alpha\\bar\\beta,\\quad \\overline{\\left(\\frac{\\alpha}{\\beta}\\right)}=\\frac{\\bar\\alpha}{\\bar\\beta}\\ (\\beta\\neq0),\\quad \\overline{\\bar\\alpha}=\\alpha",
    "summary": "$\\alpha=a+bi$ に対し共役複素数を $\\bar\\alpha=a-bi$ と定める。共役をとる操作は四則演算と両立し、次の性質が成り立つ。",
    "body": "$\\alpha=a+bi$ に対し共役複素数を $\\bar\\alpha=a-bi$ と定める。共役をとる操作は四則演算と両立し、次の性質が成り立つ。\n\n$$\\alpha+\\bar\\alpha=2a\\ (\\text{実数}),\\quad \\overline{\\alpha\\pm\\beta}=\\bar\\alpha\\pm\\bar\\beta,\\quad \\overline{\\alpha\\beta}=\\bar\\alpha\\bar\\beta,\\quad \\overline{\\left(\\frac{\\alpha}{\\beta}\\right)}=\\frac{\\bar\\alpha}{\\bar\\beta}\\ (\\beta\\neq0),\\quad \\overline{\\bar\\alpha}=\\alpha$$"
  },
  {
    "id": "formula_189",
    "subject": "数学Ⅲ",
    "category": "複素数平面",
    "name": "複素数の絶対値",
    "latex": "|\\alpha|=|a+bi|=\\sqrt{a^2+b^2},\\qquad \\alpha\\bar\\alpha=|\\alpha|^2,\\qquad |\\alpha\\beta|=|\\alpha||\\beta|,\\qquad \\left|\\frac{\\alpha}{\\beta}\\right|=\\frac{|\\alpha|}{|\\beta|}",
    "summary": "$\\alpha=a+bi$ の絶対値は原点からの距離として定義され、$\\alpha\\bar\\alpha$ が絶対値の2乗に等しいという関係が頻繁に用いられる。",
    "body": "$\\alpha=a+bi$ の絶対値は原点からの距離として定義され、$\\alpha\\bar\\alpha$ が絶対値の2乗に等しいという関係が頻繁に用いられる。\n\n$$|\\alpha|=|a+bi|=\\sqrt{a^2+b^2},\\qquad \\alpha\\bar\\alpha=|\\alpha|^2,\\qquad |\\alpha\\beta|=|\\alpha||\\beta|,\\qquad \\left|\\frac{\\alpha}{\\beta}\\right|=\\frac{|\\alpha|}{|\\beta|}$$"
  },
  {
    "id": "formula_190",
    "subject": "数学Ⅲ",
    "category": "複素数平面",
    "name": "2点間の距離",
    "latex": "\\mathrm{AB}=|\\beta-\\alpha|",
    "summary": "複素数平面上の2点 $\\alpha,\\ \\beta$ 間の距離は、差の絶対値で与えられる。",
    "body": "複素数平面上の2点 $\\alpha,\\ \\beta$ 間の距離は、差の絶対値で与えられる。\n\n$$\\mathrm{AB}=|\\beta-\\alpha|$$"
  },
  {
    "id": "formula_191",
    "subject": "数学Ⅲ",
    "category": "複素数平面",
    "name": "複素数の極形式",
    "latex": "z=r(\\cos\\theta+i\\sin\\theta)\\qquad (0\\le\\theta<2\\pi\\ \\text{または}\\ -\\pi<\\theta\\le\\pi)",
    "summary": "複素数 $z$ を原点からの距離 $r=|z|$ と偏角 $\\theta=\\arg z$ を用いて表したものを極形式という。",
    "body": "複素数 $z$ を原点からの距離 $r=|z|$ と偏角 $\\theta=\\arg z$ を用いて表したものを極形式という。\n\n$$z=r(\\cos\\theta+i\\sin\\theta)\\qquad (0\\le\\theta<2\\pi\\ \\text{または}\\ -\\pi<\\theta\\le\\pi)$$"
  },
  {
    "id": "formula_192",
    "subject": "数学Ⅲ",
    "category": "複素数平面",
    "name": "極形式による積と商",
    "latex": "z_1z_2=r_1r_2\\{\\cos(\\theta_1+\\theta_2)+i\\sin(\\theta_1+\\theta_2)\\},\\qquad |z_1z_2|=r_1r_2,\\ \\ \\arg(z_1z_2)=\\theta_1+\\theta_2",
    "summary": "極形式で表された複素数どうしの積・商は、絶対値の積・商と偏角の和・差で計算できる。",
    "body": "極形式で表された複素数どうしの積・商は、絶対値の積・商と偏角の和・差で計算できる。\n\n$$z_1z_2=r_1r_2\\{\\cos(\\theta_1+\\theta_2)+i\\sin(\\theta_1+\\theta_2)\\},\\qquad |z_1z_2|=r_1r_2,\\ \\ \\arg(z_1z_2)=\\theta_1+\\theta_2$$\n\n$$\\frac{z_1}{z_2}=\\frac{r_1}{r_2}\\{\\cos(\\theta_1-\\theta_2)+i\\sin(\\theta_1-\\theta_2)\\},\\qquad \\left|\\frac{z_1}{z_2}\\right|=\\frac{r_1}{r_2},\\ \\ \\arg\\!\\left(\\frac{z_1}{z_2}\\right)=\\theta_1-\\theta_2$$"
  },
  {
    "id": "formula_193",
    "subject": "数学Ⅲ",
    "category": "複素数平面",
    "name": "ド・モアブルの定理",
    "latex": "(\\cos\\theta+i\\sin\\theta)^n=\\cos n\\theta+i\\sin n\\theta\\qquad (n\\ \\text{は整数})",
    "summary": "極形式で表された複素数の整数乗は、偏角を整数倍するだけで求まる。回転や累乗の計算に頻用される。",
    "body": "極形式で表された複素数の整数乗は、偏角を整数倍するだけで求まる。回転や累乗の計算に頻用される。\n\n$$(\\cos\\theta+i\\sin\\theta)^n=\\cos n\\theta+i\\sin n\\theta\\qquad (n\\ \\text{は整数})$$"
  },
  {
    "id": "formula_194",
    "subject": "数学Ⅲ",
    "category": "複素数平面",
    "name": "1の $n$ 乗根",
    "latex": "z_k=\\cos\\frac{2k\\pi}{n}+i\\sin\\frac{2k\\pi}{n}\\qquad (k=0,1,2,\\dots,n-1)",
    "summary": "方程式 $z^n=1$ の解は、単位円周上に等間隔に並ぶ $n$ 個の点(正 $n$ 角形の頂点)に対応する。",
    "body": "方程式 $z^n=1$ の解は、単位円周上に等間隔に並ぶ $n$ 個の点(正 $n$ 角形の頂点)に対応する。\n\n$$z_k=\\cos\\frac{2k\\pi}{n}+i\\sin\\frac{2k\\pi}{n}\\qquad (k=0,1,2,\\dots,n-1)$$\n\n---"
  },
  {
    "id": "formula_195",
    "subject": "数学Ⅲ",
    "category": "2次曲線",
    "name": "放物線",
    "latex": "y^2=4px\\qquad (p\\neq0)",
    "summary": "#### 放物線の標準形(軸がx軸)",
    "body": "#### 放物線の標準形(軸がx軸)\n焦点 $\\mathrm F(p,0)$ と準線 $x=-p$ からの距離が等しい点の軌跡が放物線であり、次の標準形で表される。\n\n$$y^2=4px\\qquad (p\\neq0)$$\n\n#### 放物線の標準形(軸がy軸)\n軸をy軸にとった場合の標準形。焦点 $(0,p)$、準線 $y=-p$ をもつ。\n\n$$x^2=4py\\qquad (p\\neq0)$$\n\n#### $y=ax^2$ の焦点と準線\n2次関数のグラフを標準形に変形することで、焦点・準線を係数 $a$ から直接求められる。\n\n$$y=ax^2\\ (a\\neq0)\\ \\text{の焦点}\\left(0,\\ \\frac{1}{4a}\\right),\\ \\text{準線}\\ y=-\\frac{1}{4a}$$\n\n#### 放物線の接線の方程式\n放物線 $y^2=4px$ 上の点 $(x_1,y_1)$ における接線は次で与えられる(判別式 $=0$ の条件から導出)。\n\n$$y_1y=2p(x+x_1)$$\n\n#### 放物線の媒介変数表示\n$y$ 軸に平行な直線群との交点を利用すると、放物線は次のように媒介変数表示できる。\n\n$$x=pt^2,\\qquad y=2pt$$"
  },
  {
    "id": "formula_196",
    "subject": "数学Ⅲ",
    "category": "2次曲線",
    "name": "楕円",
    "latex": "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\quad(a>b>0),\\qquad c=\\sqrt{a^2-b^2},\\quad \\mathrm F(c,0),\\ \\mathrm F'(-c,0)",
    "summary": "#### 楕円の標準形と焦点(横長)",
    "body": "#### 楕円の標準形と焦点(横長)\n2定点(焦点)からの距離の和が一定値 $2a$ である点の軌跡が楕円である。焦点がx軸上にある場合($a>b>0$)は次の通り。\n\n$$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\quad(a>b>0),\\qquad c=\\sqrt{a^2-b^2},\\quad \\mathrm F(c,0),\\ \\mathrm F'(-c,0)$$\n\n#### 焦点がy軸上にある楕円(縦長)\n$b>a>0$ の場合、焦点はy軸上に位置する。\n\n$$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\quad(b>a>0),\\qquad c=\\sqrt{b^2-a^2},\\quad \\mathrm F(0,c),\\ \\mathrm F'(0,-c)$$\n\n#### 楕円の面積\n楕円は円を一方向に $b/a$ 倍だけ拡大縮小した図形とみなせ、面積は次のようになる。\n\n$$S=\\pi ab$$\n\n#### 楕円の接線の方程式\n楕円上の点 $(x_1,y_1)$ における接線は次で与えられる。\n\n$$\\frac{x_1x}{a^2}+\\frac{y_1y}{b^2}=1$$\n\n#### 楕円の媒介変数表示\n単位円 $(\\cos\\theta,\\sin\\theta)$ を $x$ 方向に $a$ 倍、$y$ 方向に $b$ 倍したものが楕円になる。\n\n$$x=a\\cos\\theta,\\qquad y=b\\sin\\theta$$"
  },
  {
    "id": "formula_197",
    "subject": "数学Ⅲ",
    "category": "2次曲線",
    "name": "双曲線",
    "latex": "|\\mathrm{PF}-\\mathrm{PF'}|=\\text{一定}",
    "summary": "#### 双曲線の定義",
    "body": "#### 双曲線の定義\n2定点 $\\mathrm F,\\mathrm F'$(焦点)からの距離の差が一定である点 $\\mathrm P$ の軌跡を双曲線という。\n\n$$|\\mathrm{PF}-\\mathrm{PF'}|=\\text{一定}$$\n\n#### 双曲線の標準形(焦点がx軸上)\n中心が原点、頂点 $(\\pm a,0)$、焦点 $\\mathrm F(c,0),\\mathrm F'(-c,0)$($c=\\sqrt{a^2+b^2}$)をもつ双曲線。\n\n$$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1\\quad(a>0,b>0),\\qquad |\\mathrm{PF}-\\mathrm{PF'}|=2a$$\n\n#### 双曲線の漸近線\n$x\\to\\pm\\infty$ で双曲線が限りなく近づく2直線。\n\n$$y=\\pm\\frac{b}{a}x\\quad\\left(\\text{すなわち}\\ \\frac{x}{a}\\pm\\frac{y}{b}=0\\right)$$\n\n#### 双曲線の接線の方程式(焦点がx軸上)\n点 $(x_1,y_1)$ における接線。\n\n$$\\frac{x_1x}{a^2}-\\frac{y_1y}{b^2}=1$$\n\n#### 双曲線の媒介変数表示(焦点がx軸上)\n三角関数の関係 $\\dfrac{1}{\\cos^2\\theta}-\\tan^2\\theta=1$ を利用した表示。\n\n$$x=\\frac{a}{\\cos\\theta},\\qquad y=b\\tan\\theta$$\n\n#### 双曲線の標準形(焦点がy軸上)\n頂点 $(0,\\pm b)$、焦点 $\\mathrm F(0,c),\\mathrm F'(0,-c)$($c=\\sqrt{a^2+b^2}$)をもつ双曲線。\n\n$$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=-1\\quad(a>0,b>0),\\qquad |\\mathrm{PF}-\\mathrm{PF'}|=2b$$\n\n#### 双曲線の接線の方程式(焦点がy軸上)\n\n$$\\frac{x_1x}{a^2}-\\frac{y_1y}{b^2}=-1$$\n\n#### 双曲線の媒介変数表示(焦点がy軸上)\n\n$$x=a\\tan\\theta,\\qquad y=\\frac{b}{\\cos\\theta}$$\n\n#### 双曲線の接線の傾き(微分による導出)\n$\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ を陰関数として $x$ で微分すると、点 $(x_1,y_1)$ における接線の傾きが得られる。\n\n$$y'=\\frac{b^2x_1}{a^2y_1}$$"
  },
  {
    "id": "formula_198",
    "subject": "数学Ⅲ",
    "category": "2次曲線",
    "name": "離心率と2次曲線",
    "latex": "\\mathrm{PF}:\\mathrm{PH}=e:1\\qquad(e>0\\ \\text{は定数})",
    "summary": "#### 離心率の定義",
    "body": "#### 離心率の定義\n点 $\\mathrm P$ から焦点 $\\mathrm F$ までの距離と、定直線(準線)$l$ までの距離 $\\mathrm{PH}$ の比が一定値 $e$(離心率)になるとき、点 $\\mathrm P$ の軌跡は2次曲線になる。\n\n$$\\mathrm{PF}:\\mathrm{PH}=e:1\\qquad(e>0\\ \\text{は定数})$$\n\n#### 離心率による2次曲線の分類\n離心率の値によって曲線の種類が決まる。\n\n$$0<e<1\\Rightarrow\\text{楕円},\\qquad e=1\\Rightarrow\\text{放物線},\\qquad e>1\\Rightarrow\\text{双曲線}$$\n\n#### 楕円の離心率\n標準形の楕円($a>b>0$)における離心率は焦点距離 $c=\\sqrt{a^2-b^2}$ を用いて表される。\n\n$$e=\\frac{c}{a}=\\frac{\\sqrt{a^2-b^2}}{a}\\qquad(0<e<1)$$\n\n#### 双曲線の離心率\n標準形の双曲線における離心率は $c=\\sqrt{a^2+b^2}$ を用いて表される。\n\n$$e=\\frac{c}{a}=\\frac{\\sqrt{a^2+b^2}}{a}\\qquad(e>1)$$"
  },
  {
    "id": "formula_199",
    "subject": "数学Ⅲ",
    "category": "2次曲線",
    "name": "極方程式",
    "latex": "x=r\\cos\\theta,\\quad y=r\\sin\\theta,\\qquad r=\\sqrt{x^2+y^2}\\ (r\\neq0)",
    "summary": "#### 直交座標と極座標の変換",
    "body": "#### 直交座標と極座標の変換\n点 $\\mathrm P$ の直交座標 $(x,y)$ と極座標 $(r,\\theta)$ の間の関係。\n\n$$x=r\\cos\\theta,\\quad y=r\\sin\\theta,\\qquad r=\\sqrt{x^2+y^2}\\ (r\\neq0)$$\n\n#### 極座標における2点間の距離\n極 $\\mathrm O$ に対する2点 $\\mathrm A(r_1,\\theta_1),\\ \\mathrm B(r_2,\\theta_2)$ の距離は、$\\triangle\\mathrm{OAB}$ に余弦定理を適用して求まる。\n\n$$\\mathrm{AB}=\\sqrt{r_1^2+r_2^2-2r_1r_2\\cos(\\theta_2-\\theta_1)}$$\n\n#### 極座標における三角形の面積\n同じ2点 $\\mathrm A,\\mathrm B$ と極 $\\mathrm O$ がつくる三角形の面積。\n\n$$S=\\frac12 r_1r_2\\,|\\sin(\\theta_2-\\theta_1)|$$\n\n#### 直線の極方程式\n極 $\\mathrm O$ を通り始線と角 $\\alpha$ をなす直線と、点 $\\mathrm A(a,\\alpha)$ を通り $\\mathrm{OA}$ に垂直な直線。\n\n$$\\theta=\\alpha,\\qquad r\\cos(\\theta-\\alpha)=a\\ (a>0)$$\n\n#### 円の極方程式\n中心の位置によって3通りの代表的な形がある。\n\n$$r=a\\ (\\text{中心}\\ \\mathrm O,\\ \\text{半径}\\ a),\\qquad r=2a\\cos\\theta\\ (\\text{中心}\\ (a,0),\\ \\text{半径}\\ a)$$\n\n$$r^2-2rr_0\\cos(\\theta-\\theta_0)+r_0^2=a^2\\quad(\\text{中心}\\ (r_0,\\theta_0),\\ \\text{半径}\\ a)$$\n\n#### 2次曲線の極方程式(離心率による統一表示)\n焦点を極にとると、離心率 $e$ を用いて楕円・放物線・双曲線を1つの式で統一的に表せる。ここで $l$ は焦点から準線までの距離。\n\n$$r=\\frac{el}{1-e\\cos\\theta}\\ \\ (\\text{準線が極の左側}),\\qquad r=\\frac{el}{1+e\\cos\\theta}\\ \\ (\\text{準線が極の右側})$$\n\n$$0<e<1:\\text{楕円},\\quad e=1:\\text{放物線},\\quad e>1:\\text{双曲線}$$\n\n#### 極方程式で表された曲線の面積\n$r=f(\\theta)\\ (\\alpha\\le\\theta\\le\\beta)$ で表される曲線と2つの動径 $\\theta=\\alpha,\\theta=\\beta$ とで囲まれた図形の面積は、扇形の面積 $\\frac12 r^2\\,d\\theta$ を積分して求める。\n\n$$S=\\frac12\\int_\\alpha^\\beta r^2\\,d\\theta$$"
  },
  {
    "id": "formula_200",
    "subject": "数学Ⅲ",
    "category": "2次曲線",
    "name": "媒介変数で表される曲線(サイクロイド系)",
    "latex": "x=a(\\theta-\\sin\\theta),\\qquad y=a(1-\\cos\\theta)",
    "summary": "#### サイクロイド",
    "body": "#### サイクロイド\n半径 $a$ の円が直線上を滑ることなく転がるとき、円周上の定点 $\\mathrm P$ が描く軌跡。円が角 $\\theta$ だけ回転した状態を表す。\n\n$$x=a(\\theta-\\sin\\theta),\\qquad y=a(1-\\cos\\theta)$$\n\n#### トロコイド\n半径 $a$ の円が直線上を滑らずに転がるとき、円の中心から距離 $b$ にある点が描く曲線($a=b$ のときサイクロイドに一致)。\n\n$$x=a\\theta-b\\sin\\theta,\\qquad y=a-b\\cos\\theta$$\n\n#### エピサイクロイド(外サイクロイド)\n半径 $b$ の円が半径 $a$ の定円の外側に接しながら滑らずに転がるときに描かれる曲線。\n\n$$x=(a+b)\\cos\\theta-b\\cos\\frac{a+b}{b}\\theta,\\qquad y=(a+b)\\sin\\theta-b\\sin\\frac{a+b}{b}\\theta$$\n\n#### カージオイド(心臓形)\nエピサイクロイドで $a=b$ とした特別な場合。極方程式でも簡潔に表せる。\n\n$$x=a(2\\cos\\theta-\\cos2\\theta),\\qquad y=a(2\\sin\\theta-\\sin2\\theta),\\qquad r=a(1+\\cos\\theta)$$\n\n#### ハイポサイクロイド(内サイクロイド)\n半径 $b$ の円が半径 $a$ の定円の内側に接しながら滑らずに転がるときに描かれる曲線。\n\n$$x=(a-b)\\cos\\theta+b\\cos\\frac{a-b}{b}\\theta,\\qquad y=(a-b)\\sin\\theta-b\\sin\\frac{a-b}{b}\\theta$$\n\n#### アステロイド(星芒形)\nハイポサイクロイドで $a=4b$ とした特別な場合。三角関数の3倍角公式を用いて整理すると次の簡潔な形になる。\n\n$$x=a\\cos^3\\theta,\\qquad y=a\\sin^3\\theta$$\n\n#### リサージュ曲線\n$m,n$ を自然数とするとき、2方向の単振動を合成して得られる曲線群。\n\n$$x=\\sin m\\theta,\\qquad y=\\sin n\\theta$$\n\n#### アルキメデスの渦巻線\n動径が角 $\\theta$ に比例して増加していく螺旋。\n\n$$r=a\\theta\\ (a>0,\\ \\theta\\ge0),\\qquad x=\\theta\\cos\\theta,\\ \\ y=\\theta\\sin\\theta$$\n\n#### 正葉曲線\n$n$ を自然数とする極方程式で表される花弁状の曲線。\n\n$$r=\\sin n\\theta$$\n\n#### サイクロイド1アーチと x 軸で囲まれた面積\n$0\\le\\theta\\le2\\pi$ の1アーチ分について、置換積分と半角公式 $\\cos^2\\theta=\\dfrac{1+\\cos2\\theta}{2}$ を用いて計算すると、転がる円の面積 $\\pi a^2$ のちょうど3倍になる。\n\n$$S=3\\pi a^2$$\n\n---"
  },
  {
    "id": "formula_201",
    "subject": "数学Ⅲ",
    "category": "極限",
    "name": "数列の極限",
    "latex": "\\lim_{n\\to\\infty}a_n=\\alpha\\ (\\text{収束}),\\qquad \\lim_{n\\to\\infty}a_n=\\infty,\\qquad \\lim_{n\\to\\infty}a_n=-\\infty,\\qquad \\{(-1)^n\\}\\ (\\text{振動の例})",
    "summary": "#### 数列の収束・発散・振動",
    "body": "#### 数列の収束・発散・振動\n$n\\to\\infty$ のときの数列 $\\{a_n\\}$ の挙動は、収束・正の無限大への発散・負の無限大への発散・振動のいずれかに分類される。\n\n$$\\lim_{n\\to\\infty}a_n=\\alpha\\ (\\text{収束}),\\qquad \\lim_{n\\to\\infty}a_n=\\infty,\\qquad \\lim_{n\\to\\infty}a_n=-\\infty,\\qquad \\{(-1)^n\\}\\ (\\text{振動の例})$$\n\n#### 数列の極限の四則演算\n$\\displaystyle\\lim_{n\\to\\infty}a_n=\\alpha,\\ \\lim_{n\\to\\infty}b_n=\\beta$(ともに収束)のとき、和・差・定数倍・積・商について極限を分配できる。\n\n$$\\lim_{n\\to\\infty}(a_n\\pm b_n)=\\alpha\\pm\\beta,\\qquad \\lim_{n\\to\\infty}ka_n=k\\alpha,\\qquad \\lim_{n\\to\\infty}a_nb_n=\\alpha\\beta,\\qquad \\lim_{n\\to\\infty}\\frac{a_n}{b_n}=\\frac{\\alpha}{\\beta}\\ (\\beta\\neq0)$$\n\n不定形($\\infty-\\infty,\\ 0\\times\\infty,\\ \\dfrac{\\infty}{\\infty},\\ \\dfrac{0}{0}$)となる場合は、この公式をそのまま使えず式変形が必要になる点に注意する。\n\n#### 数列の極限と大小関係・はさみうちの原理\n不等式 $a_n\\le b_n\\le c_n$ が成り立つとき、両端の数列の極限の関係から中央の数列の極限を決定できる。\n\n$$a_n\\le b_n\\ (\\text{すべての}n)\\ ,\\ \\lim a_n=\\alpha,\\ \\lim b_n=\\beta\\ \\Longrightarrow\\ \\alpha\\le\\beta$$\n\n$$a_n\\le b_n\\le c_n,\\quad \\lim_{n\\to\\infty}a_n=\\lim_{n\\to\\infty}c_n=\\alpha\\ \\Longrightarrow\\ \\lim_{n\\to\\infty}b_n=\\alpha\\quad(\\text{はさみうちの原理})$$\n\n#### 無限等比数列の極限\n公比 $r$ の値によって数列 $\\{r^n\\}$ の極限の状態が決まる。\n\n$$\\lim_{n\\to\\infty}r^n=\\begin{cases}\\infty & (r>1)\\\\ 1 & (r=1)\\\\ 0 & (|r|<1)\\\\ \\text{振動(極限なし)} & (r\\le-1)\\end{cases}\\qquad(\\text{収束条件:}-1<r\\le1)$$\n\n#### 隣接2項間漸化式の極限\n$a_{n+1}=pa_n+q$($p\\neq1$)の形の漸化式は、特性方程式 $\\alpha=p\\alpha+q$ の解 $\\alpha$ を用いて $a_n-\\alpha$ が公比 $p$ の等比数列になることを利用し、一般項を求めてから極限を計算する。\n\n$$a_{n+1}-\\alpha=p(a_n-\\alpha)\\ \\Longrightarrow\\ a_n-\\alpha=(a_1-\\alpha)p^{n-1}$$"
  },
  {
    "id": "formula_202",
    "subject": "数学Ⅲ",
    "category": "極限",
    "name": "無限級数",
    "latex": "\\sum_{n=1}^{\\infty}a_n=\\lim_{n\\to\\infty}S_n",
    "summary": "#### 無限級数の収束と発散",
    "body": "#### 無限級数の収束と発散\n無限級数 $\\displaystyle\\sum_{n=1}^{\\infty}a_n$ の収束・発散は、部分和 $S_n=a_1+\\cdots+a_n$ の $n\\to\\infty$ での極限によって定義される。\n\n$$\\sum_{n=1}^{\\infty}a_n=\\lim_{n\\to\\infty}S_n$$\n\n#### 収束の必要条件\n無限級数が収束するならば、その一般項は0に収束する。この対偶を用いると、一般項が0に収束しない級数は発散すると判定できる(逆は成り立たない:一般項が0に収束しても発散する級数が存在する)。\n\n$$\\sum_{n=1}^{\\infty}a_n\\ \\text{が収束}\\ \\Longrightarrow\\ \\lim_{n\\to\\infty}a_n=0\\qquad\\left(\\text{対偶:}\\lim_{n\\to\\infty}a_n\\neq0\\Rightarrow\\sum a_n\\ \\text{は発散}\\right)$$\n\n#### 無限等比級数の収束条件と和\n初項 $a$、公比 $r$ の無限等比級数は、$a=0$ または $|r|<1$ のとき収束する。\n\n$$\\sum_{n=1}^{\\infty}ar^{n-1}=a+ar+ar^2+\\cdots=\\frac{a}{1-r}\\qquad(|r|<1,\\ \\text{または}\\ a=0\\ \\text{のとき}\\ 0)$$\n\n$|r|\\ge1$(かつ $a\\neq0$)のときは発散する。"
  },
  {
    "id": "formula_203",
    "subject": "数学Ⅲ",
    "category": "極限",
    "name": "関数の極限(補足)",
    "latex": "e=\\lim_{n\\to\\infty}\\left(1+\\frac1n\\right)^n=\\lim_{h\\to0}(1+h)^{\\frac1h}",
    "summary": "#### ネイピア数 $e$ の定義",
    "body": "#### ネイピア数 $e$ の定義\n自然対数の底 $e$ は、次の2つの同値な極限として定義される($e=2.71828\\cdots$)。指数関数・対数関数の微分の基礎となる。\n\n$$e=\\lim_{n\\to\\infty}\\left(1+\\frac1n\\right)^n=\\lim_{h\\to0}(1+h)^{\\frac1h}$$\n\n#### 三角関数の重要な極限公式\n図形的な面積比較(扇形と三角形の面積の大小関係)から証明される、微分係数の計算に不可欠な極限公式。\n\n$$\\lim_{x\\to0}\\frac{\\sin x}{x}=1,\\qquad \\lim_{x\\to0}\\frac{\\tan x}{x}=1,\\qquad \\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac12$$\n\n#### 指数・対数関数の重要な極限公式\n$e$ の定義から導かれる、指数関数・対数関数を微分する際の基礎公式。\n\n$$\\lim_{x\\to0}\\frac{e^x-1}{x}=1,\\qquad \\lim_{x\\to0}\\frac{\\log(1+x)}{x}=1,\\qquad \\lim_{x\\to\\infty}\\left(1+\\frac1x\\right)^x=e$$\n\n---"
  },
  {
    "id": "formula_204",
    "subject": "数学Ⅲ",
    "category": "微分法の応用",
    "name": "基本的な微分公式(商・逆三角関数・陰関数)",
    "latex": "\\left(\\frac{f(x)}{g(x)}\\right)'=\\frac{f'(x)g(x)-f(x)g'(x)}{\\{g(x)\\}^2}\\quad(g(x)\\neq0)",
    "summary": "分数関数の微分は商の微分公式、逆三角関数の微分は定義域に注意した公式、陰関数($x,y$ が分離できない関係式)の微分は $y$ を $x$ の関数とみなして両辺を $x$ で微分する(合成関数の微分を用いる)ことで求める。",
    "body": "分数関数の微分は商の微分公式、逆三角関数の微分は定義域に注意した公式、陰関数($x,y$ が分離できない関係式)の微分は $y$ を $x$ の関数とみなして両辺を $x$ で微分する(合成関数の微分を用いる)ことで求める。\n\n$$\\left(\\frac{f(x)}{g(x)}\\right)'=\\frac{f'(x)g(x)-f(x)g'(x)}{\\{g(x)\\}^2}\\quad(g(x)\\neq0)$$\n\n$$(\\sin^{-1}x)'=\\frac{1}{\\sqrt{1-x^2}},\\qquad (\\cos^{-1}x)'=-\\frac{1}{\\sqrt{1-x^2}}\\quad(-1<x<1)$$\n\n$$(\\tan^{-1}x)'=\\frac{1}{1+x^2}$$\n\n$$F(x,y)=0\\ \\text{の陰関数微分:両辺を}x\\text{で微分し}\\ \\frac{dy}{dx}\\ \\text{について解く(例:}x^2+y^2=r^2\\ \\Rightarrow\\ y'=-\\frac{x}{y}\\text{)}$$"
  },
  {
    "id": "formula_205",
    "subject": "数学Ⅲ",
    "category": "微分法の応用",
    "name": "平均値の定理",
    "latex": "\\frac{f(b)-f(a)}{b-a}=f'(c)\\quad\\text{を満たす}\\ c\\ \\text{が}\\ a<c<b\\ \\text{に存在する}",
    "summary": "関数 $f(x)$ が閉区間 $[a,b]$ で連続、開区間 $(a,b)$ で微分可能ならば、区間内のどこかの点における接線の傾きが、区間の両端を結ぶ直線の傾き(平均変化率)に一致する点 $c$ が少なくとも1つ存在する。ロピタルの定理や関数の増減の厳密な議論の基礎となる。",
    "body": "関数 $f(x)$ が閉区間 $[a,b]$ で連続、開区間 $(a,b)$ で微分可能ならば、区間内のどこかの点における接線の傾きが、区間の両端を結ぶ直線の傾き(平均変化率)に一致する点 $c$ が少なくとも1つ存在する。ロピタルの定理や関数の増減の厳密な議論の基礎となる。\n\n$$\\frac{f(b)-f(a)}{b-a}=f'(c)\\quad\\text{を満たす}\\ c\\ \\text{が}\\ a<c<b\\ \\text{に存在する}$$"
  },
  {
    "id": "formula_206",
    "subject": "数学Ⅲ",
    "category": "微分法の応用",
    "name": "ロピタルの定理",
    "latex": "\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}\\qquad\\left(\\frac00\\ \\text{または}\\ \\frac{\\infty}{\\infty}\\ \\text{型で、右辺が存在するとき}\\right)",
    "summary": "$\\dfrac00$ 型または $\\dfrac{\\infty}{\\infty}$ 型の不定形の極限を、分子・分母をそれぞれ微分した式の極限に置き換えて計算できる(右辺の極限が存在する場合に限り成立する)。大学受験では検算・裏付けとして使うのが安全である。",
    "body": "$\\dfrac00$ 型または $\\dfrac{\\infty}{\\infty}$ 型の不定形の極限を、分子・分母をそれぞれ微分した式の極限に置き換えて計算できる(右辺の極限が存在する場合に限り成立する)。大学受験では検算・裏付けとして使うのが安全である。\n\n$$\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}\\qquad\\left(\\frac00\\ \\text{または}\\ \\frac{\\infty}{\\infty}\\ \\text{型で、右辺が存在するとき}\\right)$$"
  },
  {
    "id": "formula_207",
    "subject": "数学Ⅲ",
    "category": "微分法の応用",
    "name": "曲線の凹凸と変曲点",
    "latex": "f''(x)>0\\ \\Rightarrow\\ \\text{グラフは下に凸},\\qquad f''(x)<0\\ \\Rightarrow\\ \\text{グラフは上に凸}",
    "summary": "第2次導関数の符号によって、グラフの凹凸(下に凸・上に凸)が決まる。符号が変化する点が変曲点である。",
    "body": "第2次導関数の符号によって、グラフの凹凸(下に凸・上に凸)が決まる。符号が変化する点が変曲点である。\n\n$$f''(x)>0\\ \\Rightarrow\\ \\text{グラフは下に凸},\\qquad f''(x)<0\\ \\Rightarrow\\ \\text{グラフは上に凸}$$\n\n$$f''(x)=0\\ \\text{かつその前後で符号が変わる点}\\ (x,f(x))\\ \\text{が変曲点}$$"
  },
  {
    "id": "formula_208",
    "subject": "数学Ⅲ",
    "category": "微分法の応用",
    "name": "速度・加速度",
    "latex": "\\vec v=\\left(\\frac{dx}{dt},\\ \\frac{dy}{dt}\\right),\\qquad |\\vec v|=\\sqrt{\\left(\\frac{dx}{dt}\\right)^2+\\left(\\frac{dy}{dt}\\right)^2}\\ (\\text{速さ}),\\qquad \\vec a=\\left(\\frac{d^2x}{dt^2},\\ \\frac{d^2y}{dt^2}\\right)",
    "summary": "平面上を運動する点の座標が時刻 $t$ の関数 $(x(t),y(t))$ で表されるとき、位置ベクトルを時刻で微分すると速度ベクトル、さらに微分すると加速度ベクトルが得られる。",
    "body": "平面上を運動する点の座標が時刻 $t$ の関数 $(x(t),y(t))$ で表されるとき、位置ベクトルを時刻で微分すると速度ベクトル、さらに微分すると加速度ベクトルが得られる。\n\n$$\\vec v=\\left(\\frac{dx}{dt},\\ \\frac{dy}{dt}\\right),\\qquad |\\vec v|=\\sqrt{\\left(\\frac{dx}{dt}\\right)^2+\\left(\\frac{dy}{dt}\\right)^2}\\ (\\text{速さ}),\\qquad \\vec a=\\left(\\frac{d^2x}{dt^2},\\ \\frac{d^2y}{dt^2}\\right)$$\n\n---"
  },
  {
    "id": "formula_209",
    "subject": "数学Ⅲ",
    "category": "積分法の応用",
    "name": "置換積分法",
    "latex": "\\int f(g(x))\\,g'(x)\\,dx=\\int f(u)\\,du\\quad(u=g(x))",
    "summary": "被積分関数の中に合成関数の形が見えるとき、変数を $u=g(x)$ とおき換えることで積分を簡単にする手法。定積分では積分区間も $u$ の範囲に置き換える。",
    "body": "被積分関数の中に合成関数の形が見えるとき、変数を $u=g(x)$ とおき換えることで積分を簡単にする手法。定積分では積分区間も $u$ の範囲に置き換える。\n\n$$\\int f(g(x))\\,g'(x)\\,dx=\\int f(u)\\,du\\quad(u=g(x))$$\n\n$$\\int_a^b f(g(x))g'(x)\\,dx=\\int_{g(a)}^{g(b)}f(u)\\,du$$\n\n代表例として $\\sqrt{a^2-x^2}$ を含む積分では $x=a\\sin\\theta$、$\\sqrt{a^2+x^2}$ を含む積分では $x=a\\tan\\theta$ とおく置換がよく使われる。"
  },
  {
    "id": "formula_210",
    "subject": "数学Ⅲ",
    "category": "積分法の応用",
    "name": "部分積分法",
    "latex": "\\int f(x)g'(x)\\,dx=f(x)g(x)-\\int f'(x)g(x)\\,dx",
    "summary": "積の形の関数を積分する際、一方を微分し他方を積分することで、より計算しやすい積分に帰着させる手法。",
    "body": "積の形の関数を積分する際、一方を微分し他方を積分することで、より計算しやすい積分に帰着させる手法。\n\n$$\\int f(x)g'(x)\\,dx=f(x)g(x)-\\int f'(x)g(x)\\,dx$$\n\n$$\\int_a^b f(x)g'(x)\\,dx=\\Big[f(x)g(x)\\Big]_a^b-\\int_a^b f'(x)g(x)\\,dx$$\n\n$\\displaystyle\\int x\\sin x\\,dx,\\ \\int xe^x\\,dx$ のような多項式×初等関数の積分や、$\\displaystyle\\int \\log x\\,dx=\\int 1\\cdot\\log x\\,dx$ のように「1をかけて部分積分」する形が典型例である。"
  },
  {
    "id": "formula_211",
    "subject": "数学Ⅲ",
    "category": "積分法の応用",
    "name": "区分求積法",
    "latex": "\\lim_{n\\to\\infty}\\frac1n\\sum_{k=1}^{n}f\\!\\left(\\frac{k}{n}\\right)=\\int_0^1 f(x)\\,dx",
    "summary": "区間 $[0,1]$(一般には $[a,b]$)を $n$ 等分し、各小区間の関数値の和(リーマン和)の $n\\to\\infty$ での極限が定積分に一致するという原理。数列の和の極限を定積分に変換する際に用いる。",
    "body": "区間 $[0,1]$(一般には $[a,b]$)を $n$ 等分し、各小区間の関数値の和(リーマン和)の $n\\to\\infty$ での極限が定積分に一致するという原理。数列の和の極限を定積分に変換する際に用いる。\n\n$$\\lim_{n\\to\\infty}\\frac1n\\sum_{k=1}^{n}f\\!\\left(\\frac{k}{n}\\right)=\\int_0^1 f(x)\\,dx$$\n\n$$\\lim_{n\\to\\infty}\\frac{b-a}{n}\\sum_{k=1}^{n}f\\!\\left(a+\\frac{(b-a)k}{n}\\right)=\\int_a^b f(x)\\,dx$$"
  },
  {
    "id": "formula_212",
    "subject": "数学Ⅲ",
    "category": "積分法の応用",
    "name": "回転体の体積",
    "latex": "V=\\pi\\int_a^b \\{f(x)\\}^2\\,dx\\quad(\\text{x軸のまわりに回転}),\\qquad V=\\pi\\int_c^d \\{g(y)\\}^2\\,dy\\quad(\\text{y軸のまわりに回転})",
    "summary": "曲線をx軸(またはy軸)のまわりに回転させてできる立体の体積は、断面(半径 $|f(x)|$ の円)の面積を積分することで求める。",
    "body": "曲線をx軸(またはy軸)のまわりに回転させてできる立体の体積は、断面(半径 $|f(x)|$ の円)の面積を積分することで求める。\n\n$$V=\\pi\\int_a^b \\{f(x)\\}^2\\,dx\\quad(\\text{x軸のまわりに回転}),\\qquad V=\\pi\\int_c^d \\{g(y)\\}^2\\,dy\\quad(\\text{y軸のまわりに回転})$$\n\n媒介変数表示 $x=x(t),\\ y=y(t)$ の曲線をx軸のまわりに回転させる場合は、次のように置換して計算する。\n\n$$V=\\pi\\int y^2\\,\\frac{dx}{dt}\\,dt$$"
  },
  {
    "id": "formula_213",
    "subject": "数学Ⅲ",
    "category": "積分法の応用",
    "name": "曲線の長さ(弧長)",
    "latex": "L=\\int_a^b\\sqrt{1+\\{f'(x)\\}^2}\\,dx\\qquad(y=f(x),\\ a\\le x\\le b)",
    "summary": "曲線の微小部分の長さ $ds=\\sqrt{dx^2+dy^2}$ を積分することで曲線の全長が得られる。表示方法に応じて3通りの形がある。",
    "body": "曲線の微小部分の長さ $ds=\\sqrt{dx^2+dy^2}$ を積分することで曲線の全長が得られる。表示方法に応じて3通りの形がある。\n\n$$L=\\int_a^b\\sqrt{1+\\{f'(x)\\}^2}\\,dx\\qquad(y=f(x),\\ a\\le x\\le b)$$\n\n$$L=\\int_\\alpha^\\beta\\sqrt{\\left(\\frac{dx}{dt}\\right)^2+\\left(\\frac{dy}{dt}\\right)^2}\\,dt\\qquad(x=x(t),\\ y=y(t),\\ \\alpha\\le t\\le\\beta)$$\n\n$$L=\\int_\\alpha^\\beta\\sqrt{r^2+\\left(\\frac{dr}{d\\theta}\\right)^2}\\,d\\theta\\qquad(r=f(\\theta),\\ \\alpha\\le\\theta\\le\\beta\\ \\text{の極方程式})$$"
  }
];


/**
 * 公式名やキーワードから公式集を検索・マッチングする関数
 */
export function findFormulaInCollection(queryName) {
  if (!queryName) return null;
  const q = queryName.trim().toLowerCase();

  // 1. 完全一致
  let found = MATH_FORMULAS.find(f => f.name.toLowerCase() === q);
  if (found) return found;

  // 2. 部分一致（公式名に含まれる、または公式名が含まれる）
  found = MATH_FORMULAS.find(f => {
    const fn = f.name.toLowerCase();
    return q.includes(fn) || fn.includes(q);
  });
  if (found) return found;

  // 3. キーワード分解一致（例: 相加相乗 -> 相加・相乗）
  const cleanQ = q.replace(/[・\s\(\)\[\]:：]/g, "");
  found = MATH_FORMULAS.find(f => {
    const cleanFn = f.name.toLowerCase().replace(/[・\s\(\)\[\]:：]/g, "");
    return cleanQ.includes(cleanFn) || cleanFn.includes(cleanQ);
  });
  if (found) return found;

  return null;
}
