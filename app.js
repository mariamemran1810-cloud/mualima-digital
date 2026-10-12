/* ============ كرّاسة التحضير — المعلمة الرقمية | التفاعلات ============ */
"use strict";
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

/* ---------------- بيانات: أنواع التمهيد ---------------- */
const WARMUPS = [
  { ic:"🎩", t:"الطرائف", d:"سؤال يُحدث العجب والدهشة، تُستقبل إجابات الطلاب ثم يقال: «لكن هناك إجابة صحيحة»… ثم يُوضّح كيف. مثال: كيف نحوّل ماء البحر إلى ماء شرب دون تقطير؟" },
  { ic:"🎯", t:"إعلان أهداف الدرس", d:"يُكتب عنوان الدرس وأهدافه على السبورة، ويُخبر المتعلّم أنه في نهاية الحصة يتوقّع أن يتعلم ما يحقّق هذه الأهداف." },
  { ic:"🗺️", t:"خريطة المفاهيم", d:"عرض الدرس بشكل خريطة مفاهيم ويناقش الطلاب فيها مع التوضيح والمناقشة." },
  { ic:"🔤", t:"الكلمة الضائعة", d:"لعبة يعشقها الطلاب، تجذبهم للتفاعل، وقد تكون الكلمة الناتجة هي عنوان الدرس نفسه." },
  { ic:"🔠", t:"الأحرف المبعثرة", d:"يُسأل طالب ويُسجَّل الجواب على السبورة، ثم يُطلب من الصف أخذ أوائل الحروف لتكوّن كلمة = عنوان الدرس." },
  { ic:"🧩", t:"الصورة", d:"تقسيم الطلاب إلى مجموعات ومنح كل مجموعة صورة مقطّعة، وأسرع مجموعة تعيد تشكيلها." },
  { ic:"💬", t:"أجمل تعليق", d:"عرض صورة وتسجيل تعليقات الطلاب على السبورة بحيث تكون مدخلًا للدرس." },
  { ic:"💎", t:"الكنز", d:"توجيه الطلاب إلى الكنز المطلوب عبر أسئلة مُخفية في الصف، والكنز كل ما يتعلق بمضمون الدرس." },
  { ic:"🎟️", t:"اسحب واربح", d:"أوراق في صندوق، كل طالبة تختار بطاقة وتقراها على الصف — مفيد لقياس المعلومات السابقة قبل الخبرة الجديدة." },
  { ic:"❓", t:"الأسئلة التحفيزية", d:"طرح سؤال محفّز وتسجيل كل إجابة على السبورة دون حكم، ثم: «الإجابة الصحيحة سنعرفها من درس اليوم»." },
  { ic:"📖", t:"سرد القصص", d:"حكي قصة تدور أحداثها حول موضوع الدرس، ومن خلالها يستنتج الطلاب عنوان الدرس وعناصره." },
  { ic:"📰", t:"الأحداث الجارية", d:"قراءة خبر حديث من الصحف متعلق بالدرس ثم مناقشة الطلاب في تعريفه وعناصره." },
  { ic:"🕌", t:"الآيات والأحاديث", d:"بدء الدرس بآية كريمة أو حديث أو قول مأثور مرتبط بالموضوع، مثل: «يُكور الليل على النهار» لدرس حركة الأرض." },
  { ic:"🔬", t:"الأنشطة الاستقصائية", d:"نشاط عملي ممتع كتوزيع قطع متعفنة لفحصها بالميكروسكوب قبل درس «فطر عفن الخبز»." },
  { ic:"🔗", t:"ربط الدرس السابق بالحالي", d:"تذكير بما درسناه ثم الإعلان عن أوجه التشابه والاختلاف في درس اليوم." }
];

/* ---------------- بيانات: عناصر تحضير الدرس ---------------- */
const ELEMENTS = [
  { t:"تحديد الأهداف", c:[
    "أن تكون مرتبطة بالأهداف العامة للتربية، وللمرحلة، وللمادة.",
    "أن تشتمل على المجالات الرئيسة: المعرفي، الانفعالي، النفس-حركي (معرفة – مهارة – وجدانية).",
    "أن تصاغ صياغة سلوكية صحيحة: (أن + فعل إجرائي + المتعلم + وصف الخبرة التعلّمية المراد إتقانها)."
  ]},
  { t:"اختيار المحتوى", c:[
    "أن يسهم في تحقيق أهداف الدرس.",
    "أن يشمل الموضوع بصورة متوازنة بما يتلاءم مع زمن الحصة.",
    "أن يشتمل على موضوعات واضحة وصحيحة (أرقام، تواريخ، أسماء).",
    "أن تكون عناصره مرتّبة ترتيبًا منطقيًا.",
    "أن يشتمل على جوانب تتعلق بالقيم والمبادئ الإسلامية."
  ]},
  { t:"اختيار الأساليب والأنشطة", c:[
    "أن تكون متنوعة؛ فلا تقتصر على طريقة أو أسلوب دون آخر.",
    "أن تراعي الفروق الفردية للمتعلّمين وتكون متعدّدة المستويات.",
    "أن تشتمل على نشاط عملي في الفصل.",
    "أن تكون مرتبطة بموضوع وأهداف الدرس."
  ]},
  { t:"تحديد الاستراتيجية", c:[
    "التمهيد: مدخل ضروري يثير اهتمام المتعلمين ويجعلهم متشوقين لعرض الدرس.",
    "العرض: عرض عناصر الدرس بمشاركة المتعلمين بفاعلية، مع تعدد الأنشطة واستخدام الوسائل بصورة طبيعية.",
    "الخاتمة: تلخيص لأهم عناصر الدرس تُدوَّن على السبورة عند الحاجة حسب طبيعة المادة ومرحلة النمو."
  ]},
  { t:"اختيار الوسائل والأدوات التعليمية", c:[
    "أن تكون ملائمة لموضوع الدرس ولمستوى المتعلّم.",
    "أن تسهم في تحقيق أهداف الدرس وتوضيح المحتوى بفاعلية.",
    "أن تكون متنوعة ومبتكرة وتشجّع المتعلمين على استخدامها."
  ]},
  { t:"اختيار أساليب التقويم", c:[
    "أن يكون التقويم مرتبطًا بأهداف الدرس.",
    "أدوات تقيس مدى تعلّم الطلبة واستفادتهم من موضوع الدرس.",
    "تُوزَّع الأسئلة بما يضمن مشاركة جميع الطلاب على اختلاف مستوياتهم."
  ]}
];

/* ---------------- بيانات: الخطة الأسبوعية ---------------- */
const WEEKS = [
  {m:"أكتوبر", w:"الأول",   t:"تمهيد: مراجعة العمليات على الأعداد"},
  {m:"أكتوبر", w:"الثاني",  t:"معادلة — حل المعادلة (الجمع والطرح)"},
  {m:"أكتوبر", w:"الثالث",  t:"حل المعادلة (الضرب والقسمة)"},
  {m:"أكتوبر", w:"الرابع",  t:"حل المعادلات (أكثر من عملية)"},
  {m:"نوفمبر", w:"الخامس",  t:"حل مشكلات باستخدام المعادلات"},
  {m:"نوفمبر", w:"السادس",  t:"التحقق من صحة حل المعادلة"},
  {m:"نوفمبر", w:"السابع",  t:"الأنماط العددية — الحد العام"},
  {m:"نوفمبر", w:"الثامن",  t:"النسبة — كتابة النسب"},
  {m:"ديسمبر", w:"التاسع",  t:"النسب بين قياسين"},
  {m:"ديسمبر", w:"العاشر",  t:"التناسب الطردي والعكسي"},
  {m:"ديسمبر", w:"الحادي عشر", t:"مقياس الرسم — المسافة الفعلية"},
  {m:"ديسمبر", w:"الثاني عشر", t:"النسبة المئوية (ككسر وعدد عشري)"},
  {m:"يناير",  w:"الثالث عشر", t:"النسبة المئوية من كمية"},
  {m:"يناير",  w:"الرابع عشر", t:"مسائل: ربح — خسارة — خصم — عمولة"},
  {m:"يناير",  w:"الخامس عشر", t:"الصورة المعيارية للعدد"},
  {m:"يناير",  w:"السادس عشر", t:"مبادئ الهندسة — المنصفات"},
  {m:"فبراير", w:"السابع عشر", t:"أنواع المثلثات — مجموع زوايا المثلث"},
  {m:"فبراير", w:"الثامن عشر", t:"الزاوية الخارجة للمثلث"},
  {m:"فبراير", w:"التاسع عشر", t:"الأشكال الرباعية وأنواعها"},
  {m:"فبراير", w:"العشرون",  t:"المضلعات — مراجعة شاملة"}
];

/* ---------------- بيانات: أهداف الوحدات ---------------- */
const UNITS = [
  { t:"الوحدة الأولى: المعادلات الجبرية", l:[
    "يحلّ المعادلات التي تتضمن الجمع أو الطرح",
    "يحلّ المعادلات التي تتضمن عمليتي الضرب أو القسمة",
    "يحلّ المعادلات التي تتضمن أكثر من عملية",
    "يحلّ مشكلات باستخدام معادلات الدرجة الأولى في مجهول واحد",
    "يتحقق من صحة حل المعادلة"
  ]},
  { t:"الوحدة الثانية: النسب والتناسب والنسبة المئوية", l:[
    "يستخدم النسب للمقارنة بين كميتين",
    "يكتب النسب ككسر عادي في أبسط صورة",
    "يكتب النسب بين قياسين",
    "يحلّ مسائل لفظية تتضمن النسبة والتناسب الطردي والعكسي",
    "يحسب المسافة الفعلية بين مكانين على الخريطة",
    "يعبر عن كمية كنسبة مئوية أو ككسر أو كعدد عشري",
    "يحلّ مسائل على النسبة المئوية والربح والخسارة",
    "يكتب عدداً في الصورة المعيارية"
  ]},
  { t:"الوحدة الثالثة: مبادئ الهندسة", l:[
    "ينشئ منصف زاوية ومنصف عمودي ومستقيمات عمودية أو متوازية",
    "يسمّي أنواع المثلثات",
    "يجد قياسات الزوايا المجهولة للمثلث",
    "يستخدم خواص الزاوية الخارجة للمثلث",
    "يعرف أنواع الشكل الرباعي المختلفة",
    "يستخدم خواص زوايا المستقيمات المتوازية"
  ]},
  { t:"الوحدة الرابعة: المضلعات", l:[
    "يسمّي أنواع المضلعات حتى ١٠ أضلاع",
    "ينشئ أشكالاً رباعية ومضلعات"
  ]}
];

/* ---------------- بيانات: تحضيرات الدروس ---------------- */
const LESSONS = [
  {
    n:1, title:"المعادلات — مفهوم المعادلة",
    obj:{
      k:"أن تعرف الطالبة مفهوم المعادلة، والمتغير، والحد، والحدود المتشابهة، وتمييز المعادلة من الجملة الرياضية المفتوحة والمغلقة.",
      s:"أن تحلّ الطالبة معادلات بسيطة تتضمن الجمع والطرح، وأن تعبّر عن المسائل اللفظية في صورة معادلات.",
      a:"أن تشارك الطالبة بفاعلية في النقاش الجماعي، وتقدّر أهمية المعادلات في حل مشكلات الحياة اليومية."
    },
    warm:"طرح سؤال: ما العدد الذي إذا أضفنا إليه ٥ أصبح الناتج ١٢؟ — تسجيل إجابات الطالبات — الانتقال للتعريف: «هذا ما نسمّيه معادلة».",
    concepts:["المعادلة: جملة رياضية تحتوي على علامة المساواة","المتغير: رمز يمثل عدداً مجهولاً","الحد: عدد أو متغير أو حاصل ضربهما","الحدود المتشابهة: حدود تحتوي على المتغير نفسه بنفس الأس"],
    table:[
      ["التمهيد","طرح المشكلة المحفزة وعرض الأهداف","المشاركة بالإجابات والتوقعات","٥"],
      ["العرض والتقديم","شرح مفهوم المعادلة بأمثلة من الحياة، وعرض فيديو قصير","المتابعة والتسجيل والملاحظة","١٥"],
      ["التطبيق","توزيع أوراق عمل على المجموعات وتوجيه النقاش","حل التمارين بشكل تعاوني","١٥"],
      ["التقويم","طرح أسئلة فردية للتأكد من الفهم","الإجابة الفردية والمشاركة","١٠"]
    ],
    hw:"حلّ تمارين (١-٥) من الكتاب — كتابة ٣ مواقف حياتية يمكن تمثيلها بمعادلات.",
    diff:"للمتأخرات: بطاقات تعليمية ملوّنة بأمثلة إضافية — للمتفوقات: تحدٍّ: حلّ المعادلة ذهنياً."
  },
  {
    n:2, title:"حلّ المعادلات التي تتضمن الجمع والطرح",
    obj:{
      k:"أن تتعرّف الطالبة على خاصية الجمع والمساواة وخاصية الطرح والمساواة، وقاعدة حفظ التوازن.",
      s:"أن تحلّ الطالبة معادلات تتضمن الجمع والطرح بخطوات متسلسلة، وأن تتتحقق من صحة الحل بالتعويض.",
      a:"أن تتحلّى الطالبة بالدقّة في تنفيذ خطوات الحل، وتقدّر دور الرياضيات في تنظيم التفكير المنطقي."
    },
    warm:"مراجعة سريعة — نشاط الميزان: نضع مجهولاً (س) ورقم ٣ في كفة، والرقم ٨ في الكفة الأخرى — نسأل: ماذا نضيف لنتوازن؟",
    concepts:["خاصية الجمع للمساواة: إذا أضفنا العدد نفسه لطرفي المعادلة تبقى متكافئة","خاصية الطرح للمساواة: إذا طرحنا العدد نفسه تبقى متكافئة","التحقق: التعويض بقيمة المتغير في المعادلة الأصلية"],
    examples:["س + ٧ = ١٥","ص − ٤ = ١٠"],
    hw:"في الحصة: حلّ تمارين (١-٨) — للمنزل: حلّ تمارين (٩-١٢)."
  },
  {
    n:3, title:"حلّ المعادلات التي تتضمن الضرب والقسمة",
    obj:{
      k:"أن تتعرّف الطالبة على خاصيتي الضرب والقسمة للمساواة.",
      s:"أن تحلّ الطالبة معادلات تتضمن الضرب والقسمة، وأن تطبّق المعاملة بالمقلوب.",
      a:"أن تطوّر الطالبة ثقة بنفسها في حل المعادلات، وتقدّر أهمية التحقق."
    },
    warm:"مراجعة سريعة لحلّ معادلات الحصة السابقة.",
    concepts:["خاصية الضرب للمساواة","خاصية القسمة للمساواة","المعاملة بالمقلوب للتخلّص من الكسر"],
    examples:["٣س = ٢١","ص ÷ ٤ = ٦"],
    hw:"حلّ تمارين الضرب والقسمة من الكتاب."
  },
  {
    n:4, title:"حلّ المعادلات التي تتضمن أكثر من عملية",
    obj:{
      k:"التعرّف على خطوات حلّ المعادلات متعدّدة العمليات.",
      s:"حلّ المعادلات باستخدام العمليات الأربع بترتيب صحيح.",
      a:"الالتزام بالدقّة والصبر في حلّ المعادلات."
    },
    warm:"لعبة سريعة: أكملي المعادلة.",
    concepts:["استراتيجية الحل: أولاً الضرب/القسمة، ثم الجمع/الطرح"],
    examples:["٢س + ٣ = ١١"],
    hw:"حلّ ٦ معادلات متدرّجة الصعوبة."
  },
  {
    n:5, title:"حلّ مشكلات باستخدام المعادلات",
    obj:{
      k:"تحديد المتغير، وكتابة المعادلة من المسألة اللفظية.",
      s:"حلّ مشكلات حياتية باستخدام المعادلات من الدرجة الأولى.",
      a:"تقدير دور الرياضيات في حلّ مشكلات الحياة."
    },
    warm:"عرض مسألة حياتية: «اشترت فاطمة ٣ كتب…».",
    concepts:["نموذج ٤ خطوات: افهمي — خططي — حلي — تحققي"],
    exampleFull:{
      q:"يزيد عمر سارة على عمر فاطمة بـ ٥ سنوات، ومجموع عمريهما ٢٣. فما عمر كل منهما؟",
      steps:["ليكن عمر فاطمة = س، وعمر سارة = س + ٥","المعادلة: س + (س + ٥) = ٢٣","٢س + ٥ = ٢٣ ← ٢س = ١٨ ← س = ٩","إذن: عمر فاطمة ٩ سنوات، وعمر سارة ١٤ سنة"]
    },
    hw:"حلّ ٥ مسائل لفظية من الكتاب."
  }
];

/* ---------------- بيانات: معمل المعادلات ---------------- */
const LAB = [
  { label:"مثال ١: س + ٧ = ١٥", eq:"س + ٧ = ١٥", steps:[
    {k:"الهدف", v:"نريد إزالة العدد ٧ من الطرف الأيسر"},
    {k:"الخطوة", v:"س + ٧ − ٧ = ١٥ − ٧  (نطبّق خاصية الطرح للمساواة)"},
    {k:"الناتج", v:"س = ٨"},
    {k:"التحقق", v:"٨ + ٧ = ١٥ ✓"}
  ]},
  { label:"مثال ٢: ص − ٤ = ١٠", eq:"ص − ٤ = ١٠", steps:[
    {k:"الهدف", v:"نريد إزالة العدد ٤ من الطرف الأيسر"},
    {k:"الخطوة", v:"ص − ٤ + ٤ = ١٠ + ٤  (نطبّق خاصية الجمع للمساواة)"},
    {k:"الناتج", v:"ص = ١٤"},
    {k:"التحقق", v:"١٤ − ٤ = ١٠ ✓"}
  ]},
  { label:"مثال ٣: ٣س = ٢١", eq:"٣س = ٢١", steps:[
    {k:"الهدف", v:"المضروب فيه ٣ — نقسم الطرفين على ٣"},
    {k:"الخطوة", v:"٣س ÷ ٣ = ٢١ ÷ ٣  (خاصية القسمة للمساواة)"},
    {k:"الناتج", v:"س = ٧"},
    {k:"التحقق", v:"٣ × ٧ = ٢١ ✓"}
  ]},
  { label:"مثال ٤: ص ÷ ٤ = ٦", eq:"ص ÷ ٤ = ٦", steps:[
    {k:"الهدف", v:"نريد إزالة القسمة على ٤ — نضرب الطرفين في ٤"},
    {k:"الخطوة", v:"(ص ÷ ٤) × ٤ = ٦ × ٤"},
    {k:"الناتج", v:"ص = ٢٤"},
    {k:"التحقق", v:"٢٤ ÷ ٤ = ٦ ✓"}
  ]},
  { label:"مثال ٥: ٢س + ٣ = ١١", eq:"٢س + ٣ = ١١", steps:[
    {k:"الخطوة ١", v:"٢س + ٣ − ٣ = ١١ − ٣"},
    {k:"الخطوة ٢", v:"٢س = ٨"},
    {k:"الخطوة ٣", v:"٢س ÷ ٢ = ٨ ÷ ٢"},
    {k:"الناتج", v:"س = ٤"},
    {k:"التحقق", v:"٢(٤) + ٣ = ١١ ✓"}
  ]}
];

/* ---------------- بيانات: الأدوات الرقمية ---------------- */
const TOOLS = [
  { ic:"🔷", t:"GeoGebra", d:"رسم المعادلات والخطوط البيانية", u:"https://www.geogebra.org", h:"geogebra.org" },
  { ic:"📈", t:"Desmos", d:"حاسبة بيانية تفاعلية", u:"https://www.desmos.com", h:"desmos.com" },
  { ic:"🧪", t:"PhET Math", d:"محاكاة ميزان المعادلات", u:"https://phet.colorado.edu/ar", h:"phet.colorado.edu" },
  { ic:"🎯", t:"Kahoot", d:"اختبارات تفاعلية ممتعة", u:"https://kahoot.com", h:"kahoot.com" },
  { ic:"📝", t:"Quizizz", d:"اختبارات فردية ممتعة", u:"https://quizizz.com", h:"quizizz.com" },
  { ic:"🏫", t:"Google Classroom", d:"إدارة الفصل الرقمي", u:"https://classroom.google.com", h:"classroom.google.com" },
  { ic:"🎨", t:"Canva", d:"تصميم أوراق العمل والعروض", u:"https://www.canva.com", h:"canva.com" },
  { ic:"🧮", t:"Microsoft Math Solver", d:"حلّ المعادلات خطوة بخطوة", u:"https://mathsolver.microsoft.com", h:"mathsolver.microsoft.com" }
];

/* ---------------- بيانات: ٤٦ معيار تقييم ---------------- */
const EVAL = [
  "المهارة في عرض الدرس وإدارة الصف","قدرة المعلم على جذب انتباه الطلاب","ضبط الفصل وتفاعل الطلاب",
  "استخدام الحوافز التشجيعية","الالتزام باستخدام اللغة العربية الفصحى ووضوح الصوت","البعد عن استخدام الألفاظ والتعابير العامية",
  "تجنّب الأخطاء اللغوية عند التحدث أو الكتابة","وضوح الصوت ومناسبته للموقف التربوي","الإلمام بالمادة العلمية والاهتمام بالنمو المعرفي",
  "الدقّة عند استخدام المصطلحات العلمية","ملاءمة توزيع المنهج للزمن","الالتزام بتدريس جميع المواضيع المقرّرة في المنهج",
  "تكامل التحضير ومطابقته للأسس التربوية","مناسبة طريقة العرض","الإعداد الكتابي اليومي للدروس",
  "وضوح الأهداف الخاصة وتحقيقها","تحديد الأهداف الخاصة للدرس","توظيف المهارات والمعارف السابقة عند عرض الدرس",
  "توظيف الثواب والعقاب للتربية وليس للانتقام","الإلمام بالأسس التربوية في إعداد الدروس وتطبيقها","تحديد الطريقة المناسبة لموضوع الدرس",
  "الدقّة في تحديد الأهداف السلوكية","تحديد الوسائل والأمثلة والنشاطات المساعدة على التعليم","استخدام السبورة والكتب المدرسية والوسائل التعليمية",
  "تنظيم السبورة","وضوح الخط","متابعة أنشطة الكتاب",
  "الاستخدام الأمثل للوسائل التعليمية","الاهتمام بالطلاب ومتابعة تقويمهم","تنظيم سجل متابعة الطلاب",
  "متابعة الطلاب سلوكياً وعلمياً","رعاية الطلاب المتفوقين","الاهتمام بالواجبات والتطبيقات والعناية بتصحيحها",
  "التصحيح المستمر وحلّ الواجبات والتطبيقات داخل الصف","مستوى تحصيل الطلاب العلمي","استجابة الطلاب لأسئلة المدرّس ومشاركتهم في النقاش",
  "المؤشرات الإيجابية لنتائج الطلاب في الاختبارات التحصيلية","إجراء الاختبارات القصيرة والوقوف على مستوياتهم من خلال النتائج","تقبّل التوجيه",
  "تقبّل النقد","جودة صياغة أسئلة الاختبارات وتقدير الدرجات","توفّر الشروط الواجب مراعاتها في أسئلة التقويم",
  "المهارة في تقدير الدرجات وتوزيعها","السلوك العام (القدوة الحسنة)","تنفيذ التوجيهات وتحمّل المسؤولية",
  "المحافظة على أوقات الدوام والحصص"
];

/* ---------------- بيانات: الاختبار السريع ---------------- */
const QUIZ = [
  { q:"كم دقيقة يُخصَّص للتمهيد في تحضير الدرس الأول؟",
    o:["٥ دقائق ✓","١٠ دقائق","١٥ دقيقة","٢٠ دقيقة"], a:0,
    fb:"في جدول سير الحصة: التمهيد ٥ دقائق، العرض ١٥، التطبيق ١٥، التقويم ١٠." },
  { q:"أيٌّ ممّا يلي ليس عنصراً من عناصر تحضير الدرس؟",
    o:["تحديد الأهداف","اختيار المحتوى","كتابة التقرير الأسبوعي ✓","اختيار أساليب التقويم"], a:2,
    fb:"عناصر التحضير الستّة: الأهداف، المحتوى، الأساليب والأنشطة، الاستراتيجية، الوسائل، التقويم." },
  { q:"ما الخاصية المستخدمة في حلّ المعادلة: س + ٧ = ١٥؟",
    o:["خاصية الطرح للمساواة ✓","خاصية الضرب للمساواة","خاصية القسمة للمساواة","لا شيء مما سبق"], a:0,
    fb:"نطرح ٧ من طرفي المعادلة: س + ٧ − ٧ = ١٥ − ٧ ← س = ٨." },
  { q:"كم عدد أسس تقييم المعلّم في هذه الكرّاسة؟",
    o:["٢٤ معياراً","٣٦ معياراً","٤٦ معياراً ✓","٥٠ معياراً"], a:2,
    fb:"الكرّاسة تضمّ ٤٦ معياراً تبدأ بمهارة العرض وتنتهي بالمحافظة على أوقات الدوام." },
  { q:"أي نوع من التخطيط يُعدّ مناسبًا للأحداث الطارئة والمستجدّات؟",
    o:["التخطيط الذهني","التخطيط اليومي الكتابي ✓","التخطيط السنوي","لا أحد من هذه الأنواع"], a:1,
    fb:"«التخطيط اليومي يجعل المعلم مدركاً لما سيؤديه أولاً بأول، ويمكنه الإضافة أو الحذف أو التعديل على ضوء المستجدات»." }
];

/* ================= العرض ================= */

// بطاقات التمهيد
$("#warmupGrid").innerHTML = WARMUPS.map(w => `
  <article class="warm-card reveal" data-idea="${w.t}">
    <span class="w-ic">${w.ic}</span>
    <h4>${w.t}</h4>
    <p>${w.d}</p>
  </article>`).join("");

// الأكورديون: عناصر التحضير
$("#elementsAcc").innerHTML = ELEMENTS.map((e, i) => `
  <div class="acc-item reveal">
    <button class="acc-head" aria-expanded="false">
      <span class="acc-n">${i + 1}</span>
      <h3>${e.t}</h3>
      <span class="acc-arrow">▾</span>
    </button>
    <div class="acc-body">
      <div class="acc-inner">
        <ul class="check-list">${e.c.map(x => `<li>${x}</li>`).join("")}</ul>
      </div>
    </div>
  </div>`).join("");

// الأسابيع
$("#weeksGrid").innerHTML = WEEKS.map((w, i) => `
  <article class="week-card reveal" data-i="${i}" data-month="${w.m}">
    <button class="week-check" aria-label="تمّ تنفيذ الأسبوع ${i + 1}">✓</button>
    <div>
      <div class="week-meta"><span class="w-month">${w.m}</span><span class="w-num">الأسبوع ${w.w}</span></div>
      <div class="w-topic">${w.t}</div>
    </div>
  </article>`).join("");

// الوحدات
$("#unitsGrid").innerHTML = UNITS.map(u => `
  <div class="unit"><h4>${u.t}</h4><ul>${u.l.map(x => `<li>${x}</li>`).join("")}</ul></div>`).join("");

// تبويبات الدروس
$("#lessonTabs").innerHTML = LESSONS.map((l, i) =>
  `<button class="tab-btn ${i === 0 ? "active" : ""}" data-tab="l${l.n}">الدرس ${l.n}</button>`).join("");

$("#lessonPanels").innerHTML = LESSONS.map((l, i) => `
  <div class="tab-panel ${i === 0 ? "active" : ""}" data-panel="l${l.n}">
    <div class="lesson-head">
      <h3>الدرس رقم (${l.n}): ${l.title}</h3>
      <span class="chip">⏱️ زمن الحصة: ٤٥ دقيقة</span>
      <span class="chip">📖 وحدة المعادلات الجبرية</span>
    </div>
    <div class="objectives">
      <div class="obj k"><h4>🎯 معرفي</h4><p>${l.obj.k}</p></div>
      <div class="obj s"><h4>🛠️ مهاري</h4><p>${l.obj.s}</p></div>
      <div class="obj a"><h4>💜 وجداني</h4><p>${l.obj.a}</p></div>
    </div>
    <div class="lesson-block"><h4>🔔 التمهيد</h4><p>${l.warm}</p></div>
    <div class="lesson-block"><h4>📖 المفاهيم والمصطلحات</h4>
      <ul class="check-list">${l.concepts.map(c => `<li>${c}</li>`).join("")}</ul>
    </div>
    ${l.table ? `
    <div class="lesson-block"><h4>⏰ سير الحصة</h4>
      <table class="session-table">
        <thead><tr><th>المرحلة</th><th>دور المعلمة</th><th>دور الطالبات</th><th>الزمن (د)</th></tr></thead>
        <tbody>${l.table.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join("")}</tbody>
      </table>
    </div>` : ""}
    ${l.examples ? `
    <div class="lesson-block"><h4>✍️ أمثلة محلولة</h4>
      <ul class="check-list">${l.examples.map(x => `<li>${x}</li>`).join("")}</ul>
      <p style="margin-top:8px">💡 تابعي الحلّ خطوة بخطوة في «معمل المعادلات» بالأسفل.</p>
    </div>` : ""}
    ${l.exampleFull ? `
    <div class="lesson-block"><h4>✍️ مثال محلول</h4>
      <p><b>المسألة:</b> ${l.exampleFull.q}</p>
      <ul class="check-list" style="margin-top:8px">${l.exampleFull.steps.map(x => `<li>${x}</li>`).join("")}</ul>
    </div>` : ""}
    <div class="lesson-block"><h4>📝 الواجب المنزلي</h4><p>${l.hw}</p></div>
    ${l.diff ? `<div class="lesson-block"><h4>🔁 التمييز والإثراء</h4><p>${l.diff}</p></div>` : ""}
  </div>`).join("");

// معمل المعادلات
$("#labList").innerHTML = LAB.map((e, i) =>
  `<button class="${i === 0 ? "on" : ""}" data-i="${i}">${e.label}</button>`).join("");

// الأدوات
$("#toolsGrid").innerHTML = TOOLS.map(t => `
  <article class="tool-card reveal">
    <span class="t-ic">${t.ic}</span>
    <h4>${t.t}</h4>
    <p>${t.d}</p>
    <a class="tool-link" href="${t.u}" target="_blank" rel="noopener">${t.h} ↗</a>
  </article>`).join("");

// التقييم
$("#evalGrid").innerHTML = EVAL.map((e, i) => `
  <label class="eval-item" data-i="${i}">
    <span class="box">✓</span>
    <span class="e-text"><span class="e-num">${i + 1}.</span> ${e}</span>
  </label>`).join("");

// الاختبار
$("#quizBody").innerHTML = QUIZ.map((q, i) => `
  <div class="q-item" data-i="${i}">
    <h4>${i + 1}. ${q.q}</h4>
    <div class="q-opts">${q.o.map((o, j) => `<button class="q-opt" data-j="${j}">${o}</button>`).join("")}</div>
    <p class="q-fb"></p>
  </div>`).join("") + `<p class="quiz-score" id="quizScore" hidden></p>`;

// أزرار فلتر الشهور
const MONTHS = ["الكل", ...new Set(WEEKS.map(w => w.m))];
$("#monthFilter").innerHTML = MONTHS.map((m, i) =>
  `<button class="${i === 0 ? "on" : ""}" data-m="${m}">${m}</button>`).join("");

/* ================= التفاعلات ================= */

// 1) الوضع الليلي
const themeBtn = $("#themeToggle");
const savedTheme = store.get("mualima-theme", null);
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  store.set("mualima-theme", next);
});

// 2) القائمة الجوّالة
const nav = $("#mainNav");
$("#navToggle").addEventListener("click", () => nav.classList.toggle("open"));
nav.addEventListener("click", e => { if (e.target.tagName === "A") nav.classList.remove("open"); });

// 3) شريط التقدّم + زر العودة
const prog = $("#scrollProgress"), toTop = $("#toTop");
addEventListener("scroll", () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  toTop.classList.toggle("show", h.scrollTop > 500);
}, { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

// 4) الظهور عند التمرير + تتبّع القسم النشط
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: .12 });
$$(".reveal").forEach(el => io.observe(el));

const spy = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      $$(".main-nav a").forEach(a =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id], section.hero[id]").forEach(s => spy.observe(s));

// 5) العدّادات
const cio = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target, dur = 1400, t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    cio.unobserve(el);
  });
}, { threshold: .6 });
$$(".counter").forEach(c => cio.observe(c));

// 6) التبويبات العامة
$$("[data-tabs]").forEach(box => {
  box.addEventListener("click", e => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    $$(".tab-btn", box).forEach(b => b.classList.toggle("active", b === btn));
    $$(".tab-panel", box).forEach(p =>
      p.classList.toggle("active", p.dataset.panel === btn.dataset.tab));
  });
});

// 7) الأكورديون
$("#elementsAcc").addEventListener("click", e => {
  const head = e.target.closest(".acc-head");
  if (!head) return;
  const item = head.parentElement, body = $(".acc-body", item), open = item.classList.contains("open");
  $$(".acc-item").forEach(i => {
    i.classList.remove("open");
    $(".acc-body", i).style.maxHeight = null;
    $(".acc-head", i).setAttribute("aria-expanded", "false");
  });
  if (!open) {
    item.classList.add("open");
    body.style.maxHeight = body.scrollHeight + "px";
    head.setAttribute("aria-expanded", "true");
  }
});

// 8) مولّد أفكار التمهيد
const ideaCard = $("#ideaCard");
$("#randomIdeaBtn").addEventListener("click", () => {
  const pick = WARMUPS[Math.floor(Math.random() * WARMUPS.length)];
  $("#ideaTitle").textContent = `${pick.ic} ${pick.t}`;
  $("#ideaDesc").textContent = pick.d;
  ideaCard.classList.remove("shake"); void ideaCard.offsetWidth; ideaCard.classList.add("shake");
  $$(".warm-card").forEach(c => c.classList.toggle("flash", c.dataset.idea === pick.t));
});
$("#warmupGrid").addEventListener("click", e => {
  const card = e.target.closest(".warm-card");
  if (!card) return;
  const w = WARMUPS.find(x => x.t === card.dataset.idea);
  $("#ideaTitle").textContent = `${w.ic} ${w.t}`;
  $("#ideaDesc").textContent = w.d;
  $$(".warm-card").forEach(c => c.classList.remove("flash"));
  card.classList.add("flash");
  ideaCard.scrollIntoView({ behavior: "smooth", block: "center" });
});

// 9) مؤقّت الحصة
(function timer() {
  const TOTAL = 45 * 60, CIRC = 2 * Math.PI * 54;
  let left = TOTAL, running = false, iv = null;
  const disp = $("#timerDisplay"), ring = $("#timerRing"), phase = $("#timerPhase"),
        box = $(".timer-box"), startBtn = $("#timerStart");
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const draw = () => {
    disp.textContent = fmt(left);
    ring.style.strokeDashoffset = CIRC * (1 - left / TOTAL);
  };
  const stop = () => { clearInterval(iv); running = false; startBtn.textContent = "▶ بدء"; };
  const beep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, .25, .5].forEach((d, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 880; o.type = "sine";
        g.gain.setValueAtTime(.001, ctx.currentTime + d);
        g.gain.exponentialRampToValueAtTime(.3, ctx.currentTime + d + .02);
        g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + d + .2);
        o.start(ctx.currentTime + d); o.stop(ctx.currentTime + d + .22);
      });
    } catch {}
  };
  draw();
  startBtn.addEventListener("click", () => {
    if (running) { stop(); return; }
    if (left <= 0) left = TOTAL;
    running = true; startBtn.textContent = "⏸ إيقاف";
    iv = setInterval(() => {
      left--; draw();
      if (left <= 0) {
        stop(); box.classList.add("done"); beep();
        phase.textContent = "انتهى الوقت! 🎉";
      }
    }, 1000);
  });
  $("#timerReset").addEventListener("click", () => {
    stop(); left = TOTAL; box.classList.remove("done");
    phase.textContent = "الحصة كاملة"; draw();
    $$(".timer-presets button").forEach(b => b.classList.remove("on"));
  });
  $$(".timer-presets button").forEach(b => b.addEventListener("click", () => {
    stop(); box.classList.remove("done");
    left = +b.dataset.min * 60; phase.textContent = b.dataset.phase; draw();
    $$(".timer-presets button").forEach(x => x.classList.toggle("on", x === b));
  }));
})();

// 10) الخطة الأسبوعية
(function plan() {
  let done = store.get("mualima-weeks", []);
  const cards = $$(".week-card"), pct = $("#planPct"), bar = $("#planBar");
  const save = () => store.set("mualima-weeks", done);
  const render = () => {
    cards.forEach((c, i) => c.classList.toggle("done", done.includes(i)));
    const p = Math.round(done.length / WEEKS.length * 100);
    pct.textContent = p + "%"; bar.style.width = p + "%";
  };
  $("#weeksGrid").addEventListener("click", e => {
    const btn = e.target.closest(".week-check");
    if (!btn) return;
    const i = +btn.closest(".week-card").dataset.i;
    done = done.includes(i) ? done.filter(x => x !== i) : [...done, i];
    save(); render();
  });
  $("#monthFilter").addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    $$("#monthFilter button").forEach(x => x.classList.toggle("on", x === b));
    cards.forEach(c =>
      c.classList.toggle("hidden", b.dataset.m !== "الكل" && c.dataset.month !== b.dataset.m));
  });
  $("#planReset").addEventListener("click", () => { done = []; save(); render(); });
  render();
})();

// 11) معمل المعادلات
(function lab() {
  let cur = 0, step = 0;
  const eq = $("#labEq"), steps = $("#labSteps"), next = $("#labNext");
  const render = () => {
    const ex = LAB[cur];
    eq.textContent = ex.eq;
    steps.innerHTML = ex.steps.slice(0, step).map(s =>
      `<li class="${s.k === "التحقق" ? "ok" : ""}"><span class="k">${s.k}:</span> ${s.v}</li>`).join("");
    next.disabled = step >= ex.steps.length;
    next.textContent = step >= ex.steps.length ? "اكتمل الحل ✓" : "الخطوة التالية ←";
  };
  $("#labList").addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    cur = +b.dataset.i; step = 1;
    $$("#labList button").forEach(x => x.classList.toggle("on", x === b));
    render();
  });
  next.addEventListener("click", () => { if (step < LAB[cur].steps.length) { step++; render(); } });
  render();
})();

// 12) أسس التقييم
(function evalGrid() {
  let checked = store.get("mualima-eval", []);
  const items = $$(".eval-item"), ring = $("#evalRing"), count = $("#evalCount");
  const render = () => {
    items.forEach((it, i) => it.classList.toggle("checked", checked.includes(i)));
    const p = checked.length / EVAL.length * 100;
    ring.setAttribute("stroke-dasharray", `${p}, 100`);
    count.textContent = checked.length;
  };
  $("#evalGrid").addEventListener("click", e => {
    const it = e.target.closest(".eval-item");
    if (!it) return;
    e.preventDefault();
    const i = +it.dataset.i;
    checked = checked.includes(i) ? checked.filter(x => x !== i) : [...checked, i];
    store.set("mualima-eval", checked); render();
  });
  $("#evalSearch").addEventListener("input", e => {
    const q = e.target.value.trim();
    items.forEach((it, i) =>
      it.classList.toggle("hidden", q && !EVAL[i].includes(q)));
  });
  $("#evalReset").addEventListener("click", () => {
    checked = []; store.set("mualima-eval", checked); render();
  });
  render();
})();

// 13) الاختبار السريع
(function quiz() {
  const answers = {};
  $("#quizBody").addEventListener("click", e => {
    const opt = e.target.closest(".q-opt");
    if (!opt) return;
    const item = opt.closest(".q-item"), i = +item.dataset.i, j = +opt.dataset.j;
    if (answers[i] !== undefined) return;
    answers[i] = j;
    const q = QUIZ[i];
    $$(".q-opt", item).forEach((b, k) => {
      b.disabled = true;
      if (k === q.a) b.classList.add("right");
      if (k === j && j !== q.a) b.classList.add("wrong");
    });
    $(".q-fb", item).textContent = (j === q.a ? "✔ إجابة صحيحة! " : "✘ الإجابة الصحيحة: " + q.o[q.a].replace(" ✓", "") + " — ") + q.fb;
    const done = Object.keys(answers).length;
    if (done === QUIZ.length) {
      const score = QUIZ.reduce((s, q, k) => s + (answers[k] === q.a ? 1 : 0), 0);
      const el = $("#quizScore");
      el.hidden = false;
      el.textContent = `نتيجتك: ${score} من ${QUIZ.length} — ${score === QUIZ.length ? "ممتازة! 🌟" : "استعيدي الكرّاسة وحاولي مجدداً 💪"}`;
    }
  });
})();

// 14) الطباعة
$("#printBtn").addEventListener("click", () => window.print());
