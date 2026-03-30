/**
 * HistoryMind — Full React JSX
 * Features: Explore, Timeline, AI Chat, Quiz (MC + Open), Bookmarks
 * Bilingual: Hebrew (RTL) / English (LTR)
 * AI: Anthropic Claude API (claude-sonnet-4-20250514)
 *
 * Usage: drop into a Claude artifact or any React app.
 * The Anthropic API key is handled by the claude.ai environment.
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────────────────────
const T = {
  bg: "#0c0a08",
  surface: "#161410",
  surface2: "#1e1a16",
  surface3: "#26211b",
  gold: "#c9a84c",
  goldLight: "#e8c97a",
  goldDim: "#7a6430",
  text: "#f0ead8",
  textDim: "#9a9080",
  textMuted: "#5a5448",
  red: "#c94c4c",
  green: "#4ca86a",
  border: "rgba(201,168,76,0.15)",
  borderStrong: "rgba(201,168,76,0.35)",
};

// ─────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────
const TX = {
  he: {
    navExplore: "🏛 חקור",
    navTimeline: "📅 ציר זמן",
    navChat: "💬 שאל AI",
    navSaved: "🔖 שמור",
    navQuiz: "📝 שאלון",
    heroTag: "למידת היסטוריה מבוססת AI",
    heroTitle: "הבן את ההיסטוריה,",
    heroTitleEm: "לא רק תשנן אותה.",
    heroSub: "חקור אירועים, שאל כל שאלה, וגלה קשרים נסתרים בין תקופות שונות.",
    heroCTA: "💬 שאל שאלה",
    exploreLabel: "חקור אירועים",
    exploreHint: "(לחץ לסימון)",
    tlTitle: "גלה דרך הזמן",
    filterAll: "הכל", filterWar: "⚔️ מלחמות", filterRev: "🔥 מהפכות",
    filterPol: "🏛 פוליטיקה", filterSci: "🔬 מדע",
    details: "פרטים", addLink: "+ חבר", selected: "✓ נבחר",
    chatWelcomeTitle: "ברוך הבא ל-HistoryMind AI 🏛",
    chatWelcomeBody: "שאל אותי כל שאלה על ההיסטוריה — מציביליזציות עתיקות ועד לאירועים מודרניים.",
    chatSugg: ["מדוע נפלה האימפריה הרומית?", "מה גרם למלחמת העולם הראשונה?", "מי היה נפוליאון?"],
    chatPlaceholder: "שאל כל שאלה על ההיסטוריה...",
    thinking: "ה-AI חושב...",
    suggestLabel: "חקור עוד:",
    savedTitle: "פריטים שמורים",
    savedEmpty: "לא שמרת כלום עדיין",
    savedEmptySub: "סמן אירועים כדי למצוא אותם כאן.",
    saveSuccess: "🔖 נשמר!",
    alreadySaved: "כבר שמור!",
    typeEvent: "אירוע",
    quizTitle: "בחן את עצמך 📝",
    quizIntro: "בחר אירוע היסטורי וה-AI ייצר שאלון עם שאלות אמריקאיות ושאלות פתוחות. בסוף תקבל ציון מ-AI עם ניתוח מפורט.",
    quizPickLabel: "בחר אירוע לשאלון:",
    quizOn: "שאלון על: ",
    quizBack: "← חזור",
    quizMC: "🔘 אמריקאית",
    quizOpen: "🖊 פתוחה",
    quizQuestion: "שאלה",
    quizOf: "מתוך",
    quizLoadingText: "ה-AI מכין שאלה...",
    quizLoadingSubMC: "מכין שאלה אמריקאית",
    quizLoadingSubOpen: "מכין שאלה פתוחה לחשיבה עמוקה",
    quizSubmit: "הגש תשובה ✓",
    quizOpenPlaceholder: "כתוב את תשובתך כאן... (2-4 משפטים)",
    quizNext: "שאלה הבאה ←",
    quizFinish: "סיום וציון 🏆",
    quizGrading: "ה-AI מעריך את תשובתך...",
    quizPoints: "נקודות",
    quizCorrect: "נכון! +2 נקודות",
    quizWrong: "לא נכון.",
    quizAnalyzing: "ה-AI מנתח את ביצועיך...",
    quizAgain: "שחק שוב 🔄",
    quizResultLabels: ["המשך ללמוד!", "יש מקום לשיפור", "עבודה טובה!", "מצוין!"],
    quizError: "שגיאה בטעינת שאלה.",
    quizTryAgain: "נסה שוב",
    levelBeginner: "מתחיל", levelIntermediate: "בינוני", levelAdvanced: "מתקדם",
    langToggle: "🌐 English",
    error: "שגיאה. נסה שוב.",
    quickMode: "⚡ מצב מהיר",
    modalAdd: "+ הוסף לשמורים",
    modalAsk: "💬 שאל AI",
    askAbout: "ספר לי עוד על ",
  },
  en: {
    navExplore: "🏛 Explore",
    navTimeline: "📅 Timeline",
    navChat: "💬 Ask AI",
    navSaved: "🔖 Saved",
    navQuiz: "📝 Quiz",
    heroTag: "AI-Powered History Learning",
    heroTitle: "Understand history,",
    heroTitleEm: "not just memorize it.",
    heroSub: "Explore events, ask any question, and discover hidden connections across time.",
    heroCTA: "💬 Ask a Question",
    exploreLabel: "Explore Events",
    exploreHint: "(click to select)",
    tlTitle: "Explore Through Time",
    filterAll: "All", filterWar: "⚔️ Wars", filterRev: "🔥 Revolutions",
    filterPol: "🏛 Politics", filterSci: "🔬 Science",
    details: "Details", addLink: "+ Select", selected: "✓ Selected",
    chatWelcomeTitle: "Welcome to HistoryMind AI 🏛",
    chatWelcomeBody: "Ask me anything about history — from ancient civilizations to modern events.",
    chatSugg: ["Why did the Roman Empire fall?", "What caused World War I?", "Who was Napoleon?"],
    chatPlaceholder: "Ask any history question...",
    thinking: "AI is thinking...",
    suggestLabel: "Explore further:",
    savedTitle: "Saved Items",
    savedEmpty: "Nothing saved yet",
    savedEmptySub: "Bookmark events to find them here.",
    saveSuccess: "🔖 Saved!",
    alreadySaved: "Already saved!",
    typeEvent: "Event",
    quizTitle: "Test Yourself 📝",
    quizIntro: "Choose a historical event. AI will generate a quiz with multiple-choice AND open-ended questions. You get an AI-graded score with detailed analysis.",
    quizPickLabel: "Choose an event for your quiz:",
    quizOn: "Quiz on: ",
    quizBack: "← Back",
    quizMC: "🔘 Multiple Choice",
    quizOpen: "🖊 Open-Ended",
    quizQuestion: "Question",
    quizOf: "of",
    quizLoadingText: "AI is preparing a question...",
    quizLoadingSubMC: "Generating a multiple-choice question",
    quizLoadingSubOpen: "Generating an open-ended question",
    quizSubmit: "Submit Answer ✓",
    quizOpenPlaceholder: "Write your answer here... (2-4 sentences)",
    quizNext: "Next Question →",
    quizFinish: "Finish & Grade 🏆",
    quizGrading: "AI is grading your answer...",
    quizPoints: "points",
    quizCorrect: "Correct! +2 points",
    quizWrong: "Incorrect.",
    quizAnalyzing: "AI is analyzing your performance...",
    quizAgain: "Play Again 🔄",
    quizResultLabels: ["Keep learning!", "Room to improve", "Good job!", "Excellent!"],
    quizError: "Error loading question.",
    quizTryAgain: "Try again",
    levelBeginner: "Beginner", levelIntermediate: "Intermediate", levelAdvanced: "Advanced",
    langToggle: "🌐 עברית",
    error: "Error. Please try again.",
    quickMode: "⚡ Quick Mode",
    modalAdd: "+ Save",
    modalAsk: "💬 Ask AI",
    askAbout: "Tell me more about ",
  }
};

// ─────────────────────────────────────────────────────────────
// EVENTS DATA
// ─────────────────────────────────────────────────────────────
const EVENTS = {
  he: [
    { id:"egypt", name:"מצרים העתיקה", year:'3100–30 לפנה"ס', era:"עולם עתיק", tags:["civilization","africa"], level:"beginner", desc:'אחת הציביליזציות הגדולות בהיסטוריה, שנשלטה על ידי פרעונים לאורך 3,000 שנה. המצרים בנו פירמידות, פיתחו כתב היפרוגליפי ויצרו מערכת ממשל מורכבת.', quick:['נשלטה על ידי פרעונים לאורך 3,000 שנה','בנו פירמידות ופיתחו כתב היפרוגליפי','נכבשה על ידי רומא ב-30 לפנה"ס'] },
    { id:"greece", name:"יוון הקלאסית", year:'500–323 לפנה"ס', era:"עולם עתיק", tags:["civilization","europe"], level:"beginner", desc:"תקופת הזוהר של אתונה. כאן נולדה הדמוקרטיה, הפילוסופיה, הדרמה והאולימפיאדה.", quick:["כאן נולדה הדמוקרטיה","סוקרטס, אפלטון, אריסטו","השפיעה על כל תרבות מערבית"] },
    { id:"rome", name:"האימפריה הרומית", year:'27 לפנה"ס – 476 לספירה', era:"עולם עתיק", tags:["civilization","europe"], level:"beginner", desc:'אחת האימפריות הגדולות בהיסטוריה. בשיאה שלטה על 70 מיליון איש מבריטניה ועד מסופוטמיה.', quick:["שלטה על רוב העולם הידוע","הניחה יסודות למשפט ושפה מערבית","נפלה ב-476 לספירה"] },
    { id:"alexander", name:"אלכסנדר הגדול", year:'336–323 לפנה"ס', era:"עולם עתיק", tags:["war","politics"], level:"intermediate", desc:"מלך מוקדוניה שכבש אימפריה מיוון ועד הודו בתוך 13 שנה. מסעותיו הפיצו תרבות יוונית.", quick:['כבש ממוקדוניה ועד הודו','הפיץ תרבות יוונית','מת בגיל 32'] },
    { id:"islam", name:"עלייתה של האסלאם", year:"610–750", era:"ימי הביניים", tags:["religion","middle east"], level:"beginner", desc:"מוחמד ייסד את הדת האסלאמית בשנת 610. תוך מאה שנה פשטה מספרד ועד פרס.", quick:["ייסוד האסלאם ב-610","התפשטות מספרד ועד פרס","שמרה על ידע מדעי קדום"] },
    { id:"crusades", name:"מסעי הצלב", year:"1096–1291", era:"ימי הביניים", tags:["war","religion","middle east"], level:"intermediate", desc:"מסעות צבאיים לכיבוש ארץ הקודש. הותירו צלקות ביחסים בין דתות.", quick:["8 מסעות עיקריים","ירושלים נכבשה ואבדה","עיצבו יחסים נוצרים-מוסלמים לדורות"] },
    { id:"blackdeath", name:"המוות השחור", year:"1347–1351", era:"ימי הביניים", tags:["science","europe"], level:"beginner", desc:"מגיפת הדבר הקשה ביותר בהיסטוריה — הרגה שליש מאוכלוסיית אירופה.", quick:["הרגה שליש מאירופה","שינתה כלכלה וחברה","האיצה את סוף ימי הביניים"] },
    { id:"french_rev", name:"המהפכה הצרפתית", year:"1789–1799", era:"המאה ה-18", tags:["revolution","europe","politics"], level:"beginner", desc:"תקופה שהפילה את המלוכה, כוננה רפובליקה, והסתיימה בעלייתו של נפוליאון.", quick:["הפילה את המלוכה","הפיצה חירות, שוויון ואחווה","הובילה לנפוליאון"] },
    { id:"napoleon", name:"נפוליאון ואירופה", year:"1799–1815", era:"המאה ה-19", tags:["war","europe","politics"], level:"intermediate", desc:"נפוליאון בונפרטה כבש את רוב אירופה והפיץ את ערכי המהפכה.", quick:["כבש את רוב אירופה","הפיץ קוד משפטי","הובס בוואטרלו ב-1815"] },
    { id:"industrial", name:"המהפכה התעשייתית", year:"1760–1840", era:"המאה ה-19", tags:["science","global"], level:"beginner", desc:"המעבר מייצור ידני לממוכן. הקיטור, הרכבת, בתי החרושת שינו את אופן החיים.", quick:["החלה בבריטניה","מנוע הקיטור שינה הכל","יצרה את המעמד הפועל"] },
    { id:"ww1", name:"מלחמת העולם הראשונה", year:"1914–1918", era:"המאה ה-20", tags:["war","europe","global"], level:"beginner", desc:"המלחמה הגדולה — סיימה ארבע אימפריות ושתלה זרעים למלחמת העולם השנייה.", quick:["הופעלה ע\"י רצח פרדיננד","ארבע אימפריות קרסו","הסכם ורסאי שתל זרעים למלה\"ע 2"] },
    { id:"holocaust", name:"השואה", year:"1941–1945", era:"המאה ה-20", tags:["war","europe","genocide"], level:"beginner", desc:"הרצח השיטתי של שישה מיליון יהודים על ידי המשטר הנאצי.", quick:["שישה מיליון יהודים נרצחו","מחנות ריכוז ומוות","הובילה לאו\"ם ולזכויות אדם"] },
    { id:"ww2", name:"מלחמת העולם השנייה", year:"1939–1945", era:"המאה ה-20", tags:["war","europe","global"], level:"beginner", desc:"הסכסוך הקטלני ביותר בהיסטוריה — 70–85 מיליון הרוגים.", quick:["70–85 מיליון הרוגים","גרמניה הנאצית נגד בעלות-הברית","הסתיים ב-1945"] },
    { id:"dday", name:'מבצע נורמנדי (D-Day)', year:"6 ביוני 1944", era:"המאה ה-20", tags:["war","europe"], level:"intermediate", desc:"156,000 חיילים פלשו לחופי נורמנדי — הפלישה הגדולה ביותר בהיסטוריה.", quick:["156,000 חיילים ב-5 חופים","פתח חזית מערבית","נחשב לנקודת המפנה של מלה\"ע 2"] },
    { id:"israel", name:"הקמת מדינת ישראל", year:"1948", era:"המאה ה-20", tags:["politics","middle east"], level:"beginner", desc:"ב-14 במאי 1948 הכריז דוד בן-גוריון על הקמת מדינת ישראל.", quick:["הוכרזה ב-14 במאי 1948","קשורה לשואה ולציונות","גררה מלחמת עצמאות"] },
    { id:"coldwar", name:"המלחמה הקרה", year:"1947–1991", era:"המאה ה-20", tags:["politics","war","global"], level:"beginner", desc:'מאבק גיאופוליטי בין ארה"ב לברה"מ — מרוץ גרעיני, מרוץ חלל, מלחמות פרוקסי.', quick:['ארה"ב נגד ברה"מ','מלחמות פרוקסי בקוריאה ווייטנאם','הסתיים עם פירוק ברה"מ'] },
    { id:"moonlanding", name:"נחיתה על הירח", year:"1969", era:"המאה ה-20", tags:["science","global"], level:"beginner", desc:"ב-20 ביולי 1969 ניל ארמסטרונג הפך לאדם הראשון על הירח.", quick:["ניל ארמסטרונג — ראשון על הירח",'ניצחון ארה"ב במרוץ החלל',"600 מיליון צפו בשידור חי"] },
    { id:"berlin_wall", name:"נפילת חומת ברלין", year:"1989", era:"המאה ה-20", tags:["revolution","politics","europe"], level:"beginner", desc:"ב-9 בנובמבר 1989 נפלה חומת ברלין — סמל לקץ המלחמה הקרה.", quick:["עמדה 28 שנה","סמל לקץ המלחמה הקרה","הובילה לאיחוד גרמניה"] },
    { id:"ussr_collapse", name:"קריסת ברית המועצות", year:"1991", era:"המאה ה-20", tags:["revolution","politics","global"], level:"intermediate", desc:'פירוק ברה"מ ב-25 בדצמבר 1991 — 15 מדינות עצמאיות וקץ המלחמה הקרה.', quick:["15 מדינות חדשות קמו","סיים את עידן המלחמה הקרה","משבר כלכלי ורפורמות גורבצ'וב"] },
    { id:"nelson_mandela", name:"נלסון מנדלה וסיום האפרטהייד", year:"1990–1994", era:"המאה ה-20", tags:["politics","revolution","africa"], level:"beginner", desc:"לאחר 27 שנות כלא, מנדלה הוביל את דרום אפריקה לדמוקרטיה ב-1994.", quick:["27 שנות כלא","הוביל מעבר לדמוקרטיה","נבחר לנשיא ב-1994"] },
  ],
  en: [
    { id:"egypt", name:"Ancient Egypt", year:"3100–30 BC", era:"Ancient World", tags:["civilization","africa"], level:"beginner", desc:"One of the greatest civilizations in history, ruled by pharaohs for over 3,000 years. Egyptians built the pyramids and developed hieroglyphic writing.", quick:["Ruled by pharaohs for 3,000 years","Built pyramids and hieroglyphic writing","Conquered by Rome in 30 BC"] },
    { id:"greece", name:"Classical Greece", year:"500–323 BC", era:"Ancient World", tags:["civilization","europe"], level:"beginner", desc:"The golden age of Athens. Democracy, philosophy, drama and the Olympics were born here.", quick:["Birthplace of democracy","Socrates, Plato, Aristotle","Immeasurable influence on Western civilization"] },
    { id:"rome", name:"The Roman Empire", year:"27 BC – 476 AD", era:"Ancient World", tags:["civilization","europe"], level:"beginner", desc:"One of history's greatest empires, ruling 70 million people from Britain to Mesopotamia at its peak.", quick:["Ruled most of the known world","Laid foundations for law and Western culture","Fell in 476 AD"] },
    { id:"alexander", name:"Alexander the Great", year:"336–323 BC", era:"Ancient World", tags:["war","politics"], level:"intermediate", desc:"King of Macedon who conquered an empire from Greece to India in just 13 years, spreading Hellenistic culture.", quick:["Conquered from Macedonia to India","Spread Greek culture","Died at 32"] },
    { id:"islam", name:"Rise of Islam", year:"610–750 AD", era:"Middle Ages", tags:["religion","middle east"], level:"beginner", desc:"Muhammad founded Islam in 610 AD. Within a century the faith spread from Spain to Persia.", quick:["Islam founded in 610 AD","Spread from Spain to Persia","Preserved ancient scientific knowledge"] },
    { id:"crusades", name:"The Crusades", year:"1096–1291", era:"Middle Ages", tags:["war","religion","middle east"], level:"intermediate", desc:"Military expeditions to recapture the Holy Land. Left deep scars on religious relations.", quick:["8 major Crusades","Jerusalem captured and lost multiple times","Shaped Christian-Muslim relations for centuries"] },
    { id:"blackdeath", name:"The Black Death", year:"1347–1351", era:"Middle Ages", tags:["science","europe"], level:"beginner", desc:"The deadliest pandemic in history, killing a third of Europe — about 25 million people.", quick:["Killed a third of Europe","Transformed economics and society","Accelerated the end of the Middle Ages"] },
    { id:"french_rev", name:"French Revolution", year:"1789–1799", era:"18th Century", tags:["revolution","europe","politics"], level:"beginner", desc:"Radical transformation that overthrew the monarchy, established a republic, and ended with Napoleon's rise.", quick:["Overthrew the monarchy","Spread liberty, equality, fraternity","Led to Napoleon"] },
    { id:"napoleon", name:"Napoleon and Europe", year:"1799–1815", era:"19th Century", tags:["war","europe","politics"], level:"intermediate", desc:"Napoleon Bonaparte conquered most of Europe and spread the values of the French Revolution.", quick:["Conquered most of Europe","Spread legal code still in use","Defeated at Waterloo 1815"] },
    { id:"industrial", name:"Industrial Revolution", year:"1760–1840", era:"19th Century", tags:["science","global"], level:"beginner", desc:"The shift from manual to mechanized production. Steam, railways, factories changed everything.", quick:["Began in Britain","Steam engines transformed production","Created the working class"] },
    { id:"ww1", name:"World War I", year:"1914–1918", era:"20th Century", tags:["war","europe","global"], level:"beginner", desc:"The Great War ended four empires and planted seeds for WWII through the Treaty of Versailles.", quick:["Triggered by Franz Ferdinand's assassination","Four empires collapsed","Treaty of Versailles planted WWII seeds"] },
    { id:"holocaust", name:"The Holocaust", year:"1941–1945", era:"20th Century", tags:["war","europe","genocide"], level:"beginner", desc:"The systematic murder of six million Jews by the Nazi regime.", quick:["Six million Jews murdered","Concentration and death camps","Led to the UN and human rights framework"] },
    { id:"ww2", name:"World War II", year:"1939–1945", era:"20th Century", tags:["war","europe","global"], level:"beginner", desc:"The deadliest conflict in history — 70–85 million deaths. Nazi Germany vs the Allied powers.", quick:["70–85 million deaths","Nazi Germany vs Allied powers","Ended in 1945"] },
    { id:"dday", name:"D-Day: Normandy Invasion", year:"June 6, 1944", era:"20th Century", tags:["war","europe"], level:"intermediate", desc:"The largest seaborne invasion: 156,000 Allied troops stormed Normandy beaches, opening the Western Front.", quick:["156,000 troops on 5 beaches","Opened the Western Front","Turning point of WWII in Europe"] },
    { id:"israel", name:"Establishment of Israel", year:"1948", era:"20th Century", tags:["politics","middle east"], level:"beginner", desc:"On May 14, 1948, David Ben-Gurion proclaimed the State of Israel.", quick:["Declared May 14, 1948","Connected to Holocaust and Zionism","Immediately triggered war"] },
    { id:"coldwar", name:"The Cold War", year:"1947–1991", era:"20th Century", tags:["politics","war","global"], level:"beginner", desc:"Geopolitical struggle between USA and USSR — nuclear arms race, space race, proxy wars.", quick:["USA vs. USSR","Proxy wars in Korea and Vietnam","Ended with Soviet collapse"] },
    { id:"moonlanding", name:"Moon Landing", year:"1969", era:"20th Century", tags:["science","global"], level:"beginner", desc:"On July 20, 1969, Neil Armstrong became the first human to walk on the Moon.", quick:["Neil Armstrong — first on the Moon","US victory in the Space Race","600 million watched live"] },
    { id:"berlin_wall", name:"Fall of the Berlin Wall", year:"1989", era:"20th Century", tags:["revolution","politics","europe"], level:"beginner", desc:"On November 9, 1989, the Berlin Wall fell after 28 years — symbol of the Cold War's end.", quick:["Stood for 28 years","Symbol of Cold War's end","Led to German reunification"] },
    { id:"ussr_collapse", name:"Collapse of Soviet Union", year:"1991", era:"20th Century", tags:["revolution","politics","global"], level:"intermediate", desc:"The USSR dissolved on December 25, 1991 — 15 independent republics and end of the Cold War.", quick:["15 new nations emerged","Ended the Cold War era","Economic crisis and Gorbachev's reforms"] },
    { id:"nelson_mandela", name:"Nelson Mandela & End of Apartheid", year:"1990–1994", era:"20th Century", tags:["politics","revolution","africa"], level:"beginner", desc:"After 27 years in prison, Mandela led South Africa to multiracial democracy in 1994.", quick:["27 years in prison","Led transition to democracy","Elected President in 1994"] },
  ]
};

const LEVEL_COLORS = { beginner: "#4ca86a", intermediate: "#c9a84c", advanced: "#c94c4c" };
const LEVEL_ORDER = { beginner: 0, intermediate: 1, advanced: 2 };

// ─────────────────────────────────────────────────────────────
// API HELPER
// ─────────────────────────────────────────────────────────────
async function callClaude(system, userMsg, maxTokens = 1000) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system, userMsg, maxTokens }),
  });
  const data = await res.json();
  return data.text || "";
}

// ─────────────────────────────────────────────────────────────
// SMALL SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────
function Spinner({ size = 20 }) {
  return (
    <div style={{
      width: size, height: size,
      border: `2px solid ${T.border}`,
      borderTopColor: T.gold,
      borderRadius: "50%",
      animation: "hm-spin .8s linear infinite",
      flexShrink: 0,
    }} />
  );
}

function LoadingCard({ text, sub }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"40px 20px", textAlign:"center" }}>
      <Spinner size={48} />
      <div style={{ fontSize:".92rem", fontWeight:700, color:T.text }}>{text}</div>
      {sub && <div style={{ fontSize:".78rem", color:T.textMuted }}>{sub}</div>}
    </div>
  );
}

function LevelBadge({ level }) {
  const color = LEVEL_COLORS[level] || T.gold;
  return (
    <span style={{
      fontSize: ".62rem", padding: "2px 7px", borderRadius: 10,
      background: color + "22", color, border: `1px solid ${color}55`, fontWeight: 700,
    }}>{level}</span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:13 }}>
      <span style={{ fontSize:".7rem", fontWeight:600, letterSpacing:".12em", color:T.textMuted, textTransform:"uppercase" }}>{children}</span>
      <div style={{ flex:1, height:1, background:T.border }} />
    </div>
  );
}

function Btn({ onClick, disabled, children, variant = "primary", style: extra = {} }) {
  const base = {
    border:"none", borderRadius:10, padding:"10px 20px",
    fontWeight:700, fontSize:".86rem", cursor: disabled ? "not-allowed" : "pointer",
    transition:"all .2s", opacity: disabled ? .5 : 1, fontFamily:"inherit",
  };
  const styles = {
    primary: { background: T.gold, color:"#0c0a08" },
    secondary: { background:"transparent", color:T.text, border:`1px solid ${T.borderStrong}` },
    generate: { width:"100%", background:"linear-gradient(135deg,#c9a84c,#a07830)", color:"#0c0a08", borderRadius:11, padding:14, fontSize:".92rem", display:"flex", alignItems:"center", justifyContent:"center", gap:9 },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...styles[variant], ...extra }}>{children}</button>;
}

// ─────────────────────────────────────────────────────────────
// EVENT DETAIL MODAL
// ─────────────────────────────────────────────────────────────
function EventModal({ event: e, lang, isHe, onClose, onSave, onAsk }) {
  if (!e) return null;
  const tx = TX[lang];
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.82)", backdropFilter:"blur(6px)",
      zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:20,
    }}>
      <div onClick={ev => ev.stopPropagation()} style={{
        background:T.surface, border:`1px solid ${T.borderStrong}`,
        borderRadius:18, padding:28, maxWidth:560, width:"100%", maxHeight:"80vh", overflowY:"auto",
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16, gap:10 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
              <span style={{ fontSize:".7rem", color:T.gold, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase" }}>{e.era}</span>
              <LevelBadge level={e.level} />
            </div>
            <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.4rem", lineHeight:1.25 }}>{e.name}</div>
          </div>
          <button onClick={onClose} style={{ background:T.surface3, border:"none", borderRadius:8, width:30, height:30, cursor:"pointer", color:T.textMuted, fontSize:"1rem", display:"grid", placeItems:"center" }}>✕</button>
        </div>
        <div style={{ color:T.textDim, fontSize:".82rem", marginBottom:16 }}>📅 {e.year}</div>
        <div style={{ color:T.textDim, fontSize:".87rem", lineHeight:1.8, marginBottom:18 }}>{e.desc}</div>
        <div style={{ background:T.surface3, border:`1px solid ${T.border}`, borderRadius:9, padding:"12px 14px" }}>
          <div style={{ fontSize:".69rem", color:T.gold, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>{tx.quickMode}</div>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:5 }}>
            {e.quick.map((q, i) => (
              <li key={i} style={{ fontSize:".8rem", color:T.textDim, paddingRight: isHe?14:0, paddingLeft: isHe?0:14, position:"relative" }}>
                <span style={{ position:"absolute", [isHe?"right":"left"]:0, color:T.goldDim }}>{isHe?"←":"→"}</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:20, flexWrap:"wrap" }}>
          <Btn onClick={onSave} variant="primary">{tx.modalAdd}</Btn>
          <Btn onClick={onAsk} variant="secondary">{tx.modalAsk}</Btn>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREENS
// ─────────────────────────────────────────────────────────────

// ── HOME ────────────────────────────────────────────────────
function HomeScreen({ lang, events, level, onOpenEvent }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  const currentLevelNum = LEVEL_ORDER[level] ?? 1;
  const filtered = events.filter(e => (LEVEL_ORDER[e.level] ?? 0) <= currentLevelNum);

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{
        background:"linear-gradient(135deg,#0c0a08,#1a1208 50%,#0c0a08)",
        borderBottom:`1px solid ${T.border}`, padding:"48px 28px 32px", textAlign:"center",
      }}>
        <div style={{ display:"inline-block", background:"rgba(201,168,76,.12)", border:`1px solid ${T.borderStrong}`, color:T.gold, fontSize:".7rem", fontWeight:600, padding:"4px 13px", borderRadius:20, marginBottom:16, letterSpacing:".1em", textTransform:"uppercase" }}>
          {tx.heroTag}
        </div>
        <h1 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"clamp(1.7rem,5vw,3rem)", fontWeight:900, marginBottom:10, lineHeight:1.18 }}>
          {tx.heroTitle}<br /><em style={{ color:T.gold }}>{tx.heroTitleEm}</em>
        </h1>
        <p style={{ color:T.textDim, fontSize:".9rem", maxWidth:460, margin:"0 auto 0", lineHeight:1.7 }}>{tx.heroSub}</p>
      </div>

      <div style={{ padding:"24px 28px", maxWidth:1040, margin:"0 auto" }}>
        <SectionLabel>{tx.exploreLabel} <span style={{ fontSize:".65rem", fontWeight:400, letterSpacing:0, color:T.textMuted, marginRight:6 }}>{tx.exploreHint}</span></SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:13 }}>
          {filtered.map(e => (
            <div key={e.id} onClick={() => onOpenEvent(e.id)} style={{
              background:T.surface, border:`1px solid ${T.border}`,
              borderRadius:12, padding:17, cursor:"pointer", transition:"all .2s",
            }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
                <div style={{ fontSize:".67rem", color:T.goldDim, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase" }}>{e.era}</div>
                <LevelBadge level={e.level} />
              </div>
              <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:".94rem", marginBottom:5, lineHeight:1.35 }}>{e.name}</div>
              <div style={{ fontSize:".74rem", color:T.textMuted }}>📅 {e.year}</div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:8 }}>
                {e.tags.map(tag => (
                  <span key={tag} style={{ fontSize:".65rem", padding:"2px 7px", borderRadius:20, background:T.surface3, color:T.textMuted, border:`1px solid ${T.border}` }}>{tag}</span>
                ))}
              </div>
              <button onClick={ev => { ev.stopPropagation(); onOpenEvent(e.id); }} style={{
                marginTop:10, padding:"4px 9px", fontSize:".71rem", background:"transparent",
                border:`1px solid ${T.borderStrong}`, borderRadius:8, color:T.textDim, cursor:"pointer",
              }}>{tx.details}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TIMELINE ────────────────────────────────────────────────
function TimelineScreen({ lang, events, level, onOpenEvent }) {
  const [filter, setFilter] = useState("all");
  const isHe = lang === "he";
  const tx = TX[lang];
  const filters = [
    { k:"all", l:tx.filterAll }, { k:"war", l:tx.filterWar },
    { k:"revolution", l:tx.filterRev }, { k:"politics", l:tx.filterPol }, { k:"science", l:tx.filterSci },
  ];
  const currentLevelNum = LEVEL_ORDER[level] ?? 1;
  const items = [...events]
    .filter(e => (LEVEL_ORDER[e.level]??0) <= currentLevelNum && (filter==="all" || e.tags.includes(filter)))
    .sort((a,b) => parseInt(a.year) - parseInt(b.year));

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"26px 28px" }}>
      <div style={{ maxWidth:840, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.65rem", marginBottom:18 }}>{tx.tlTitle}</h2>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:26 }}>
          {filters.map(f => (
            <button key={f.k} onClick={() => setFilter(f.k)} style={{
              padding:"5px 12px", borderRadius:20,
              border:`1px solid ${filter===f.k ? T.gold : T.border}`,
              background: filter===f.k ? "rgba(201,168,76,.08)" : "transparent",
              color: filter===f.k ? T.gold : T.textDim, fontSize:".77rem", cursor:"pointer",
            }}>{f.l}</button>
          ))}
        </div>
        <div style={{ position:"relative", [isHe?"paddingRight":"paddingLeft"]:42 }}>
          <div style={{ position:"absolute", [isHe?"right":"left"]:14, top:0, bottom:0, width:2, background:`linear-gradient(to bottom,transparent,${T.goldDim} 5%,${T.goldDim} 95%,transparent)` }} />
          {items.map(e => (
            <div key={e.id} style={{ position:"relative", marginBottom:20 }}>
              <div style={{ position:"absolute", [isHe?"right":"left"]:-30, top:15, width:12, height:12, borderRadius:"50%", background:T.gold, border:`3px solid ${T.bg}`, boxShadow:`0 0 0 2px ${T.goldDim}` }} />
              <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:11, padding:"15px 17px" }}>
                <div style={{ fontSize:".72rem", color:T.gold, fontWeight:600, marginBottom:3 }}>{e.year}</div>
                <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:".94rem", marginBottom:5 }}>{e.name}</div>
                <div style={{ fontSize:".8rem", color:T.textDim, lineHeight:1.55 }}>{e.desc.substring(0,110)}...</div>
                <button onClick={() => onOpenEvent(e.id)} style={{ marginTop:8, padding:"3px 9px", fontSize:".71rem", background:"transparent", border:`1px solid ${T.borderStrong}`, borderRadius:8, color:T.textDim, cursor:"pointer" }}>{tx.details}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CHAT ────────────────────────────────────────────────────
function ChatScreen({ lang, level, initialQuestion = null }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  const levelInstr = {
    beginner: isHe ? "Respond ONLY in Hebrew. Explain simply, like to a curious 14-year-old." : "Respond in English. Explain simply, like to a curious 14-year-old.",
    intermediate: isHe ? "Respond ONLY in Hebrew. Be clear, suitable for a high school student." : "Respond in English. Be clear, suitable for a high school student.",
    advanced: isHe ? "Respond ONLY in Hebrew. Be academically rigorous." : "Respond in English. Be academically rigorous.",
  }[level] || "";

  const [messages, setMessages] = useState([{
    role:"ai", text:`**${tx.chatWelcomeTitle}**\n\n${tx.chatWelcomeBody}`, suggestions: tx.chatSugg,
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  useEffect(() => {
    if (initialQuestion) {
      setInput(initialQuestion);
      setTimeout(() => send(initialQuestion), 100);
    }
  }, []);

  const send = useCallback(async (text) => {
    const t = text || input;
    if (!t.trim() || loading) return;
    const newHistory = [...history, { role:"user", content:t }];
    setHistory(newHistory);
    setMessages(m => [...m, { role:"user", text:t }, { role:"ai", text:"", loading:true }]);
    setInput(""); setLoading(true);
    try {
      const aiText = await callClaude(
        `You are HistoryMind AI, an expert history teacher. ${levelInstr} Answer clearly, give historical context, explain why it matters. End with 2-3 follow-up questions: "${tx.suggestLabel} • q1 • q2". Max 250 words.`,
        t
      );
      setHistory(h => [...h, { role:"assistant", content:aiText }]);
      let mainText = aiText, suggs = [];
      if (aiText.includes(tx.suggestLabel)) {
        const parts = aiText.split(tx.suggestLabel);
        mainText = parts[0];
        suggs = parts[1].split("•").map(s => s.trim()).filter(Boolean);
      }
      setMessages(m => [...m.slice(0,-1), { role:"ai", text:mainText, suggestions:suggs }]);
    } catch {
      setMessages(m => [...m.slice(0,-1), { role:"ai", text:tx.error }]);
    }
    setLoading(false);
  }, [input, loading, history, levelInstr, tx]);

  const renderText = (text) => text
    .replace(/\*\*(.*?)\*\*/g, `<strong style="color:${T.gold}">$1</strong>`)
    .replace(/\n/g, "<br/>");

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", height:"calc(100vh - 60px)" }}>
      <div style={{ flex:1, overflowY:"auto", padding:"20px 26px", display:"flex", flexDirection:"column", gap:13 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ maxWidth:640, alignSelf: msg.role==="user" ? (isHe?"flex-start":"flex-end") : (isHe?"flex-end":"flex-start") }}>
            <div style={{
              padding:"12px 16px", fontSize:".87rem", lineHeight:1.75,
              background: msg.role==="user" ? T.gold : T.surface,
              color: msg.role==="user" ? "#0c0a08" : T.text,
              border: msg.role==="ai" ? `1px solid ${T.border}` : "none",
              borderRadius: msg.role==="user"
                ? (isHe ? "15px 15px 15px 4px" : "15px 15px 4px 15px")
                : (isHe ? "15px 15px 4px 15px" : "15px 15px 15px 4px"),
            }}>
              {msg.loading
                ? <div style={{ display:"flex", gap:8, alignItems:"center" }}><Spinner size={16}/><span style={{ fontSize:".8rem", color:T.gold }}>{tx.thinking}</span></div>
                : <span dangerouslySetInnerHTML={{ __html: renderText(msg.text) }} />
              }
            </div>
            {msg.suggestions?.length > 0 && (
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:7, justifyContent: isHe?"flex-end":"flex-start" }}>
                {msg.suggestions.map((s,j) => (
                  <button key={j} onClick={() => send(s)} style={{ background:"transparent", border:`1px solid ${T.borderStrong}`, borderRadius:20, padding:"4px 10px", fontSize:".74rem", color:T.gold, cursor:"pointer" }}>→ {s}</button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ borderTop:`1px solid ${T.border}`, padding:"13px 20px", background:T.surface }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:12, padding:"7px 10px", maxWidth:640, margin:"0 auto" }}>
          <button onClick={() => send()} disabled={loading} style={{ background:T.gold, color:"#0c0a08", border:"none", borderRadius:8, width:32, height:32, cursor:"pointer", display:"grid", placeItems:"center", flexShrink:0, fontSize:".95rem" }}>➤</button>
          <textarea
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1} placeholder={tx.chatPlaceholder}
            style={{ flex:1, background:"transparent", border:"none", outline:"none", color:T.text, fontSize:".87rem", resize:"none", maxHeight:100, textAlign: isHe?"right":"left", fontFamily:"inherit" }}
          />
        </div>
      </div>
    </div>
  );
}

// ── SAVED ────────────────────────────────────────────────────
function SavedScreen({ lang, saved, onRemove }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  return (
    <div style={{ flex:1, overflowY:"auto", padding:"26px 28px" }}>
      <div style={{ maxWidth:740, margin:"0 auto" }}>
        <SectionLabel>{isHe ? "הספרייה שלך" : "Your Library"}</SectionLabel>
        <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.65rem", marginBottom:20 }}>{tx.savedTitle}</h2>
        {saved.length === 0 ? (
          <div style={{ textAlign:"center", padding:"52px 20px", color:T.textMuted }}>
            <div style={{ fontSize:"2.8rem", marginBottom:13, opacity:.4 }}>🔖</div>
            <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.15rem", color:T.textDim, marginBottom:7 }}>{tx.savedEmpty}</div>
            <p>{tx.savedEmptySub}</p>
          </div>
        ) : saved.map((item, i) => (
          <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:11, padding:"15px 17px", marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:".69rem", color:T.goldDim, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", marginBottom:3 }}>{item.type}</div>
              <div style={{ fontSize:".86rem", color:T.text }}>{item.name}</div>
            </div>
            <button onClick={() => onRemove(i)} style={{ background:"none", border:"none", color:T.textMuted, cursor:"pointer", fontSize:".95rem" }}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── QUIZ ────────────────────────────────────────────────────
function QuizScreen({ lang, events, level }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  const TOTAL_Q = 6;
  const Q_TYPES = ["mc","mc","mc","mc","open","open"];

  const [phase, setPhase] = useState("start"); // start | active | results
  const [eventId, setEventId] = useState(null);
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [qPhase, setQPhase] = useState("loading"); // loading | question | feedback | grading
  const [feedback, setFeedback] = useState(null);
  const [openInput, setOpenInput] = useState("");
  const [resultAnalysis, setResultAnalysis] = useState("");

  const levelInstr = {
    beginner: isHe ? "Respond ONLY in Hebrew. Simple language for a 14-year-old." : "Respond in English. Simple language for a 14-year-old.",
    intermediate: isHe ? "Respond ONLY in Hebrew. High school level." : "Respond in English. High school level.",
    advanced: isHe ? "Respond ONLY in Hebrew. Academic level." : "Respond in English. Academic level.",
  }[level] || "";

  const startQuiz = (id) => {
    setEventId(id); setQNum(0); setScore(0); setMaxScore(0);
    setAnswers([]); setPhase("active"); setQPhase("loading");
    loadQuestion(id, 0, []);
  };

  const loadQuestion = async (eid, num, prevAnswers) => {
    setQPhase("loading"); setCurrentQ(null); setFeedback(null); setOpenInput("");
    const e = events.find(x => x.id === eid);
    const qtype = Q_TYPES[num];
    const prevQs = prevAnswers.map(a => a.question).join(" | ");

    const systemPrompt = qtype === "open"
      ? `You are a history quiz generator. ${levelInstr} Generate ONE open-ended question. Return ONLY valid JSON: {"question":"...","ideal_answer":"...","key_points":["...","...","..."]}`
      : `You are a history quiz generator. ${levelInstr} Generate ONE multiple-choice question. Return ONLY valid JSON: {"question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"correct":0,"explanation":"2-3 sentences."} Don't repeat: ${prevQs||"none"}`;

    try {
      const raw = await callClaude(
        systemPrompt,
        `Question ${num+1} of ${TOTAL_Q} about: ${e?.name} (${e?.year}). Context: ${e?.desc}`,
        600
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setCurrentQ({ ...parsed, type: qtype });
      setQPhase("question");
    } catch {
      setCurrentQ({ question: tx.quizError, type: qtype, options:[], correct:0, explanation:"" });
      setQPhase("question");
    }
  };

  const selectOption = (idx) => {
    if (!currentQ) return;
    const isRight = idx === currentQ.correct;
    const gained = isRight ? 2 : 0;
    setScore(s => s + gained); setMaxScore(s => s + 2);
    setAnswers(a => [...a, { question:currentQ.question, type:"mc", correct:isRight }]);
    setFeedback({ isRight, explanation: currentQ.explanation, correctIdx: currentQ.correct, chosen: idx });
    setQPhase("feedback");
  };

  const submitOpen = async () => {
    if (!openInput.trim() || !currentQ) return;
    setQPhase("grading");
    try {
      const raw = await callClaude(
        `You are a history teacher grading an open answer. ${levelInstr} Return ONLY valid JSON: {"score":0,"max":3,"feedback":"2-3 sentences of specific encouraging feedback."}  Score: 3=excellent, 2=good, 1=partial, 0=off-topic.`,
        `Question: ${currentQ.question}\nKey points: ${(currentQ.key_points||[]).join(", ")}\nStudent: ${openInput}`,
        400
      );
      const graded = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setScore(s => s + graded.score); setMaxScore(s => s + (graded.max||3));
      setAnswers(a => [...a, { question:currentQ.question, type:"open", score:graded.score, max:graded.max||3 }]);
      setFeedback({ open:true, score:graded.score, max:graded.max||3, feedbackText:graded.feedback });
      setQPhase("feedback");
    } catch {
      setMaxScore(s => s + 3);
      setAnswers(a => [...a, { question:currentQ.question, type:"open", score:0, max:3 }]);
      setQPhase("feedback");
      setFeedback({ open:true, score:0, max:3, feedbackText: tx.error });
    }
  };

  const nextQuestion = () => {
    const next = qNum + 1;
    if (next >= TOTAL_Q) { finishQuiz(); return; }
    setQNum(next);
    loadQuestion(eventId, next, answers);
  };

  const finishQuiz = async () => {
    setPhase("results"); setResultAnalysis("");
    const e = events.find(x => x.id === eventId);
    const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const sum = answers.map((a,i) => a.type==="mc" ? `Q${i+1}(MC):${a.correct?"ok":"wrong"}` : `Q${i+1}(Open):${a.score}/${a.max}`).join(", ");
    try {
      const fb = await callClaude(
        `You are a history teacher giving final quiz feedback. ${levelInstr} Be encouraging, mention 1-2 strengths and 1 area to study. 3-4 sentences max.`,
        `Student took quiz on: ${e?.name}. Score: ${score}/${maxScore} (${pct}%). Results: ${sum}`,
        400
      );
      setResultAnalysis(fb);
    } catch {
      setResultAnalysis(tx.error);
    }
  };

  const reset = () => { setPhase("start"); setEventId(null); setQNum(0); setScore(0); setMaxScore(0); setAnswers([]); setCurrentQ(null); setFeedback(null); setResultAnalysis(""); };

  const pct = maxScore > 0 ? Math.round((score/maxScore)*100) : 0;
  const emoji = pct>=85?"🏆":pct>=65?"🎯":pct>=45?"📚":"💡";
  const resultLabel = tx.quizResultLabels[pct>=85?3:pct>=65?2:pct>=45?1:0];
  const letters = isHe ? ["א","ב","ג","ד"] : ["A","B","C","D"];

  if (phase === "start") return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <SectionLabel>{isHe ? "מערכת שאלונים AI" : "AI Quiz System"}</SectionLabel>
        <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.7rem", marginBottom:8 }}>{tx.quizTitle}</h2>
        <p style={{ color:T.textDim, fontSize:".88rem", lineHeight:1.7, marginBottom:24 }}>{tx.quizIntro}</p>
        <SectionLabel>{tx.quizPickLabel}</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:10 }}>
          {events.map(e => (
            <button key={e.id} onClick={() => startQuiz(e.id)} style={{
              background:T.surface, border:`1px solid ${T.border}`, borderRadius:12,
              padding:"14px 16px", cursor:"pointer", textAlign: isHe?"right":"left", fontFamily:"inherit", transition:"all .2s",
            }}>
              <div style={{ fontSize:".88rem", fontWeight:700, color:T.text, marginBottom:4 }}>{e.name}</div>
              <div style={{ fontSize:".72rem", color:T.goldDim }}>📅 {e.year}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (phase === "results") return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:18, padding:"32px 28px", textAlign:"center" }}>
          <div style={{ fontSize:"3rem", marginBottom:12 }}>{emoji}</div>
          <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.4rem", marginBottom:8 }}>{resultLabel}</h2>
          <div style={{ fontSize:"2.5rem", fontWeight:900, color:T.gold, marginBottom:16 }}>{score}/{maxScore} · {pct}%</div>
          {resultAnalysis
            ? <p style={{ color:T.textDim, fontSize:".87rem", lineHeight:1.8, textAlign: isHe?"right":"left" }}>{resultAnalysis}</p>
            : <LoadingCard text={tx.quizAnalyzing} />
          }
          <Btn onClick={reset} variant="generate" style={{ marginTop:20 }}>{tx.quizAgain}</Btn>
        </div>
      </div>
    </div>
  );

  // active
  const e = events.find(x => x.id === eventId);
  const qtype = Q_TYPES[qNum];
  const isLastQ = qNum + 1 >= TOTAL_Q;

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        {/* Topbar */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, flexWrap:"wrap" }}>
          <button onClick={reset} style={{ background:T.surface2, border:`1px solid ${T.border}`, borderRadius:8, padding:"6px 12px", fontSize:".78rem", color:T.textDim, cursor:"pointer", fontFamily:"inherit" }}>{tx.quizBack}</button>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4, minWidth:100 }}>
            <div style={{ height:6, background:T.surface3, borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${(qNum/TOTAL_Q)*100}%`, background:`linear-gradient(90deg,${T.goldDim},${T.gold})`, borderRadius:3, transition:"width .5s ease" }} />
            </div>
            <div style={{ fontSize:".68rem", color:T.textMuted }}>{tx.quizQuestion} {qNum+1} {tx.quizOf} {TOTAL_Q} · {qtype==="open" ? tx.quizOpen : tx.quizMC}</div>
          </div>
          <div style={{ background:"rgba(201,168,76,.15)", border:`1px solid ${T.borderStrong}`, borderRadius:20, padding:"4px 12px", fontSize:".8rem", color:T.gold, fontWeight:700, whiteSpace:"nowrap" }}>{score}/{maxScore}</div>
        </div>

        <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.1rem", color:T.gold, marginBottom:18, fontWeight:700 }}>{tx.quizOn}{e?.name}</div>

        {/* Loading */}
        {qPhase === "loading" && <LoadingCard text={tx.quizLoadingText} sub={qtype==="open" ? tx.quizLoadingSubOpen : tx.quizLoadingSubMC} />}

        {/* Question */}
        {(qPhase === "question" || qPhase === "feedback" || qPhase === "grading") && currentQ && (
          <>
            <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:14, padding:"22px 24px", marginBottom:18 }}>
              <div style={{ fontSize:".72rem", color:T.goldDim, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>{tx.quizQuestion} {qNum+1}</div>
              <div style={{ fontSize:"1rem", lineHeight:1.65, color:T.text, fontWeight:600 }}>{currentQ.question}</div>
            </div>

            {currentQ.type === "open" ? (
              qPhase === "question" ? (
                <>
                  <textarea
                    value={openInput} onChange={e => setOpenInput(e.target.value)}
                    rows={4} placeholder={tx.quizOpenPlaceholder}
                    style={{ width:"100%", background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:12, padding:"14px 16px", color:T.text, fontFamily:"inherit", fontSize:".88rem", lineHeight:1.7, resize:"vertical", minHeight:100, outline:"none", textAlign: isHe?"right":"left" }}
                  />
                  <Btn onClick={submitOpen} variant="generate" style={{ marginTop:12 }}>{tx.quizSubmit}</Btn>
                </>
              ) : qPhase === "grading" ? (
                <LoadingCard text={tx.quizGrading} />
              ) : null
            ) : (
              qPhase === "question" && (currentQ.options||[]).map((opt, idx) => (
                <button key={idx} onClick={() => selectOption(idx)} style={{
                  width:"100%", background:T.surface, border:`1px solid ${T.border}`,
                  borderRadius:11, padding:"14px 18px", cursor:"pointer",
                  fontSize:".88rem", color:T.text, textAlign: isHe?"right":"left",
                  fontFamily:"inherit", lineHeight:1.5, display:"flex", alignItems:"center", gap:12, marginBottom:10, transition:"all .2s",
                }}>
                  <div style={{ width:26, height:26, borderRadius:"50%", background:T.surface3, border:`1px solid ${T.border}`, fontSize:".75rem", fontWeight:700, display:"grid", placeItems:"center", flexShrink:0, color:T.textMuted }}>{letters[idx]}</div>
                  <span>{opt.replace(/^[A-Da-d]\)\s*/,"").replace(/^[א-ד]\)\s*/,"")}</span>
                </button>
              ))
            )}

            {/* Feedback */}
            {qPhase === "feedback" && feedback && (
              <>
                {!feedback.open ? (
                  // MC feedback - show correct/wrong options
                  <>
                    {(currentQ.options||[]).map((opt, idx) => {
                      const isCorrect = idx === feedback.correctIdx;
                      const isChosen = idx === feedback.chosen;
                      const wrongChosen = isChosen && !isCorrect;
                      return (
                        <div key={idx} style={{
                          width:"100%", background: isCorrect ? "rgba(76,168,106,.1)" : wrongChosen ? "rgba(201,76,76,.1)" : T.surface,
                          border:`1px solid ${isCorrect ? "#4ca86a" : wrongChosen ? T.red : T.border}`,
                          borderRadius:11, padding:"14px 18px",
                          fontSize:".88rem", color: isCorrect ? "#4ca86a" : wrongChosen ? T.red : T.textDim,
                          textAlign: isHe?"right":"left", display:"flex", alignItems:"center", gap:12, marginBottom:10,
                        }}>
                          <div style={{ width:26, height:26, borderRadius:"50%", background: isCorrect ? "#4ca86a" : wrongChosen ? T.red : T.surface3, fontSize:".75rem", fontWeight:700, display:"grid", placeItems:"center", flexShrink:0, color: (isCorrect||wrongChosen) ? "#fff" : T.textMuted }}>{letters[idx]}</div>
                          <span>{opt.replace(/^[A-Da-d]\)\s*/,"").replace(/^[א-ד]\)\s*/,"")}</span>
                        </div>
                      );
                    })}
                    <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:14, padding:"20px 22px", marginTop:8 }}>
                      <div style={{ fontSize:"1.8rem", marginBottom:8 }}>{feedback.isRight ? "✅" : "❌"}</div>
                      <div style={{ fontSize:"1rem", fontWeight:700, marginBottom:10, color: feedback.isRight ? "#4ca86a" : T.red }}>{feedback.isRight ? tx.quizCorrect : tx.quizWrong}</div>
                      <div style={{ color:T.textDim, fontSize:".87rem", lineHeight:1.75 }}>{feedback.explanation}</div>
                    </div>
                  </>
                ) : (
                  <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:14, padding:"20px 22px" }}>
                    <div style={{ fontSize:"1.8rem", marginBottom:8 }}>{feedback.score >= 2 ? "✅" : feedback.score === 1 ? "🟡" : "❌"}</div>
                    <div style={{ fontSize:"1rem", fontWeight:700, marginBottom:10, color: feedback.score >= 2 ? "#4ca86a" : T.red }}>{["⭐","⭐⭐","⭐⭐⭐"][Math.max(0,feedback.score-1)] || "—"} {feedback.score}/{feedback.max} {tx.quizPoints}</div>
                    <div style={{ color:T.textDim, fontSize:".87rem", lineHeight:1.75 }}>{feedback.feedbackText}</div>
                  </div>
                )}
                <Btn onClick={nextQuestion} variant="generate" style={{ marginTop:16 }}>{isLastQ ? tx.quizFinish : tx.quizNext}</Btn>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────
export default function HistoryMind() {
  const [lang, setLang] = useState("he");
  const [level, setLevel] = useState("intermediate");
  const [screen, setScreen] = useState("home");
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hm_react_saved") || "[]"); } catch { return []; }
  });
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null); // event id
  const [chatInitQ, setChatInitQ] = useState(null);

  const isHe = lang === "he";
  const tx = TX[lang];
  const events = EVENTS[lang];

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(""), 2400); return () => clearTimeout(t); }
  }, [toast]);

  useEffect(() => {
    try { localStorage.setItem("hm_react_saved", JSON.stringify(saved)); } catch {}
  }, [saved]);

  const showToast = (msg) => setToast(msg);

  const saveEvent = (id) => {
    const e = events.find(x => x.id === id);
    if (!e) return;
    if (saved.find(s => s.id === "ev-"+id)) { showToast(tx.alreadySaved); return; }
    setSaved(s => [...s, { type:tx.typeEvent, name:e.name, id:"ev-"+id }]);
    showToast(tx.saveSuccess);
  };

  const removeItem = (idx) => setSaved(s => s.filter((_,i) => i !== idx));

  const openEventAndGoChat = (id) => {
    const e = events.find(x => x.id === id);
    if (!e) return;
    setModal(null);
    setChatInitQ(tx.askAbout + e.name);
    setScreen("chat");
  };

  const navTabs = [
    { id:"home", label:tx.navExplore },
    { id:"timeline", label:tx.navTimeline },
    { id:"chat", label:tx.navChat },
    { id:"saved", label:tx.navSaved },
    { id:"quiz", label:tx.navQuiz },
  ];

  const levels = [
    { v:"beginner", l:tx.levelBeginner },
    { v:"intermediate", l:tx.levelIntermediate },
    { v:"advanced", l:tx.levelAdvanced },
  ];

  const modalEvent = modal ? events.find(e => e.id === modal) : null;

  return (
    <div style={{
      background:T.bg, color:T.text,
      fontFamily: isHe ? "'Comfortaa','Nunito',sans-serif" : "'Nunito','Comfortaa',sans-serif",
      minHeight:"100vh", display:"flex", flexDirection:"column",
      direction: isHe ? "rtl" : "ltr",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes hm-spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,.35); border-radius: 3px; }
      `}</style>

      {/* NAV */}
      <nav style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"13px 24px", borderBottom:`1px solid ${T.border}`,
        background:"rgba(12,10,8,.97)", backdropFilter:"blur(20px)",
        position:"sticky", top:0, zIndex:100, flexWrap:"wrap", gap:8,
      }}>
        <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.35rem", fontWeight:900, color:T.gold }}>
          History<span style={{ color:T.text }}>Mind</span>
        </div>
        <div style={{ display:"flex", gap:3, background:T.surface2, border:`1px solid ${T.border}`, borderRadius:11, padding:3, flexWrap:"wrap", justifyContent:"center" }}>
          {navTabs.map(tab => (
            <button key={tab.id} onClick={() => { setScreen(tab.id); setChatInitQ(null); }} style={{
              padding:"6px 13px", borderRadius:8, border:"none",
              background: screen===tab.id ? T.gold : "transparent",
              color: screen===tab.id ? "#0c0a08" : T.textDim,
              cursor:"pointer", fontSize:".8rem", fontWeight: screen===tab.id ? 700 : 500,
              transition:"all .2s", whiteSpace:"nowrap", fontFamily:"inherit",
            }}>{tab.label}</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button onClick={() => setLang(l => l==="he"?"en":"he")} style={{
            background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:20,
            padding:"5px 13px", fontSize:".79rem", color:T.gold, cursor:"pointer", fontFamily:"inherit",
          }}>{tx.langToggle}</button>
          <div style={{ display:"flex", alignItems:"center", gap:7, background:T.surface2, border:`1px solid ${T.border}`, borderRadius:20, padding:"5px 11px" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:T.gold, flexShrink:0 }} />
            <select value={level} onChange={e => setLevel(e.target.value)} style={{
              background:"transparent", border:"none", color:T.textDim, fontSize:".77rem", cursor:"pointer", outline:"none", fontFamily:"inherit",
            }}>
              {levels.map(l => <option key={l.v} value={l.v}>{l.l}</option>)}
            </select>
          </div>
        </div>
      </nav>

      {/* SCREENS */}
      {screen === "home" && <HomeScreen lang={lang} events={events} level={level} onOpenEvent={id => setModal(id)} />}
      {screen === "timeline" && <TimelineScreen lang={lang} events={events} level={level} onOpenEvent={id => setModal(id)} />}
      {screen === "chat" && <ChatScreen key={lang+level+(chatInitQ||"")} lang={lang} level={level} initialQuestion={chatInitQ} />}
      {screen === "saved" && <SavedScreen lang={lang} saved={saved} onRemove={removeItem} />}
      {screen === "quiz" && <QuizScreen lang={lang} events={events} level={level} />}

      {/* MODAL */}
      {modalEvent && (
        <EventModal
          event={modalEvent}
          lang={lang}
          isHe={isHe}
          onClose={() => setModal(null)}
          onSave={() => { saveEvent(modal); setModal(null); }}
          onAsk={() => openEventAndGoChat(modal)}
        />
      )}

      {/* TOAST */}
      {toast && <div style={{
        position:"fixed", bottom:90, left:"50%", transform:"translateX(-50%)",
        background:T.surface3, border:`1px solid ${T.borderStrong}`, borderRadius:10,
        padding:"9px 17px", fontSize:".82rem", color:T.text, zIndex:999, whiteSpace:"nowrap",
        pointerEvents:"none",
      }}>{toast}</div>}
    </div>
  );
}
