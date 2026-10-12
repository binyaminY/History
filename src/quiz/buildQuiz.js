// Builds a six-question multiple-choice quiz about one topic from the data the site already has.
// No AI is involved, so a quiz opens instantly and never counts against the daily limits.

const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pick = (list, n) => shuffle(list).slice(0, n);

// First sentence of an answer, kept short enough to read as one option.
function firstSentence(text, max = 130) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  const m = clean.match(/^(.+?[.!?])(\s|$)/);
  let s = m ? m[1] : clean;
  if (s.length > max) s = s.slice(0, max).replace(/\s+\S*$/, "") + "…";
  return s;
}

// Puts the correct answer among the wrong ones at a random place.
function makeQuestion(question, correct, wrong, explanation) {
  const options = shuffle([correct, ...wrong]);
  return { question, options, correct: options.indexOf(correct), explanation };
}

const TEXT = {
  he: {
    years: (n) => `באילו שנים מתרחש הנושא "${n}"?`,
    era: (n) => `לאיזו תקופה שייך הנושא "${n}"?`,
    fact: (n) => `איזו מהעובדות הבאות נכונה לגבי "${n}"?`,
    yearsExp: (n, y) => `${n}: ${y}.`,
    eraExp: (n, e) => `${n} שייך לתקופה: ${e}.`,
  },
  en: {
    years: (n) => `Which years does the topic "${n}" cover?`,
    era: (n) => `Which period does "${n}" belong to?`,
    fact: (n) => `Which of these facts is true about "${n}"?`,
    yearsExp: (n, y) => `${n}: ${y}.`,
    eraExp: (n, e) => `${n} belongs to: ${e}.`,
  },
};

// topicQuestions(topicId) returns that topic's prepared questions: [{ q, a }].
export function buildQuiz({ lang, event, events, topicQuestions }) {
  const t = TEXT[lang] || TEXT.he;
  const others = events.filter(e => e.id !== event.id);
  const out = [];

  // 1. Years
  const otherYears = [...new Set(others.map(e => e.year).filter(y => y !== event.year))];
  out.push(makeQuestion(t.years(event.name), event.year, pick(otherYears, 3), t.yearsExp(event.name, event.year)));

  // 2. Period
  const otherEras = [...new Set(others.map(e => e.era).filter(x => x !== event.era))];
  out.push(makeQuestion(t.era(event.name), event.era, pick(otherEras, 3), t.eraExp(event.name, event.era)));

  // 3. A true fact about the topic, against facts of other topics
  const fact = pick(event.quick || [], 1)[0];
  const otherFacts = others.flatMap(e => e.quick || []);
  if (fact && otherFacts.length >= 3) {
    out.push(makeQuestion(t.fact(event.name), fact, pick(otherFacts, 3), `${event.name}: ${fact}`));
  }

  // 4-6. Prepared questions of this topic; the wrong options are answers from other topics
  const own = topicQuestions(event.id).filter(q => q.q && q.a);
  const pool = others.flatMap(e => topicQuestions(e.id)).filter(q => q.a);
  const usedStarts = new Set();
  for (const row of shuffle(own)) {
    if (out.length >= 6) break;
    const correct = firstSentence(row.a);
    if (usedStarts.has(row.q.slice(0, 25))) continue;
    const wrong = [];
    for (const cand of shuffle(pool)) {
      const text = firstSentence(cand.a);
      if (text !== correct && !wrong.includes(text)) wrong.push(text);
      if (wrong.length === 3) break;
    }
    if (wrong.length < 3) continue;
    usedStarts.add(row.q.slice(0, 25));
    out.push(makeQuestion(row.q, correct, wrong, row.a));
  }

  return shuffle(out).slice(0, 6);
}
