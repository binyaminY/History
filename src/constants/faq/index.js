import a from "./a.js";
import b from "./b.js";
import c from "./c.js";
import d from "./d.js";
import moreA from "./more-a.js";
import moreB from "./more-b.js";
import moreC from "./more-c.js";
import moreD from "./more-d.js";

// Each topic's prepared entries: the originals first, then the extra ones.
const merged = {};
for (const part of [a, b, c, d, moreA, moreB, moreC, moreD]) {
  for (const [topic, rows] of Object.entries(part)) merged[topic] = [...(merged[topic] || []), ...rows];
}
const DATA = merged;

const toItem = (topic, row, i, lang) => ({
  id: `${topic}-${i}`,
  topic,
  q: lang === "he" ? row[0] : row[2],
  a: lang === "he" ? row[1] : row[3],
});

export function topicQuestions(topic, lang) {
  return (DATA[topic] || []).map((row, i) => toItem(topic, row, i, lang));
}

export function allQuestions(lang) {
  return Object.entries(DATA).flatMap(([topic, rows]) => rows.map((row, i) => toItem(topic, row, i, lang)));
}

const STOP = new Set([
  "מה", "מי", "למה", "איך", "מתי", "איפה", "כמה", "האם", "של", "את", "על", "עם", "זה", "זו", "היה", "הייתה", "היו", "הוא", "היא", "הם", "אל", "גם", "או", "לא", "כן", "כל",
  "what", "who", "why", "how", "when", "where", "which", "was", "were", "is", "are", "the", "a", "an", "of", "did", "do", "in", "to", "and", "on", "for", "it", "its",
]);

// Light normalization: lowercase, drop punctuation, and strip one Hebrew prefix letter.
function tokens(text) {
  return String(text)
    .toLowerCase()
    .replace(/["'״׳?!.,:;()\-–—]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map(t => (t.length > 3 && /^[הובלמשכ]/.test(t) ? t.slice(1) : t))
    .filter(t => t.length > 1 && !STOP.has(t));
}

// Returns prepared questions ordered by how many of the query's words they share.
export function searchQuestions(query, lang, topic = null) {
  const q = tokens(query);
  if (q.length === 0) return [];
  const pool = topic ? topicQuestions(topic, lang) : allQuestions(lang);
  return pool
    .map(item => {
      const t = new Set(tokens(item.q));
      const hits = q.filter(w => t.has(w) || [...t].some(x => x.length > 3 && w.length > 3 && (x.startsWith(w) || w.startsWith(x)))).length;
      return { ...item, score: hits / Math.max(q.length, 1) };
    })
    .filter(item => item.score > 0)
    .sort((x, y) => y.score - x.score);
}

export function queryWordCount(query) {
  return tokens(query).length;
}
