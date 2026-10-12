import Groq from "groq-sdk";

// The 20b model produced inaccurate, garbled Hebrew, so chat also uses 120b;
// answers stay short through the prompt and the token cap.
const CHAT_MODEL = process.env.GROQ_CHAT_MODEL || "openai/gpt-oss-120b";

const IP_DAILY_LIMIT = Number(process.env.IP_DAILY_LIMIT_CHAT || 15);
const GLOBAL_DAILY_LIMIT = Number(process.env.GLOBAL_DAILY_LIMIT || 300);

const CHAT_MAX_QUESTION = 300;
const CHAT_MAX_TOPIC = 120;
const CHAT_MAX_HISTORY = 4;
const CHAT_MAX_HISTORY_ITEM = 400;
const CHAT_MAX_TOKENS = 300;

const MESSAGES = {
  he: {
    ipLimit: "הגעת למכסה היומית של שאלות. נסה שוב מחר.",
    globalLimit: "המכסה היומית של האתר מלאה. נסה שוב מחר.",
    unavailable: "ה-AI לא זמין כרגע.",
    noImages: "אני עונה רק על שאלות בהיסטוריה, בטקסט קצר. אני לא יוצר תמונות או סרטונים.",
    empty: "לא הצלחתי לענות. נסה לנסח את השאלה בקצרה.",
  },
  en: {
    ipLimit: "You have reached today's question limit. Please try again tomorrow.",
    globalLimit: "The site's daily limit is full. Please try again tomorrow.",
    unavailable: "The AI is not available right now.",
    noImages: "I only answer history questions in short text. I do not create images or videos.",
    empty: "I could not answer that. Try asking more briefly.",
  },
};

// Requests to generate media are answered locally and never reach Groq.
const MEDIA_REQUEST = /(צייר|תצייר|לצייר|ציור של|צור תמונה|תיצור תמונה|ליצור תמונה|תן לי תמונה|שלח תמונה|תמונה של|סרטון|וידאו|\bdraw\b|\bpaint\b|generate (an? )?(image|picture|photo|video)|create (an? )?(image|picture|photo|video)|make (an? )?(image|picture|photo|video)|(image|picture|photo) of|\bvideo\b)/i;

function chatSystemPrompt(lang, topic) {
  const language = lang === "he" ? "Hebrew" : "English";
  return [
    "You are a history assistant on the website HistoryWithBen.",
    `Always answer in ${language}.`,
    "Answer only questions about history. Be brief: 2 to 4 sentences, at most 70 words, plain text, no headings, no long lists.",
    "Do not write code, tables, essays, translations of long texts, or anything unrelated to history.",
    "If the request is not about history, reply in one sentence that you only answer history questions.",
    topic ? `The user is asking in the context of this topic: "${topic}".` : "",
  ].filter(Boolean).join(" ");
}

async function redisPipeline(commands) {
  const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`rate store ${res.status}`);
  return res.json();
}

function clientIp(req) {
  const fwd = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return fwd || req.socket?.remoteAddress || "unknown";
}

function parseHistory(history, maxItems, maxLen) {
  if (history === undefined) return [];
  if (!Array.isArray(history) || history.length > maxItems) return null;
  const out = [];
  for (const m of history) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") return null;
    if (m.content.length > maxLen) return null;
    out.push({ role: m.role, content: m.content });
  }
  return out;
}

function parseChat(body) {
  const lang = body.lang === "en" ? "en" : "he";
  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question || question.length > CHAT_MAX_QUESTION) return null;
  const topic = typeof body.topic === "string" ? body.topic.trim().slice(0, CHAT_MAX_TOPIC) : "";
  const past = parseHistory(body.history, CHAT_MAX_HISTORY, CHAT_MAX_HISTORY_ITEM);
  if (!past) return null;
  return {
    kind: "chat", lang, question,
    model: CHAT_MODEL, tokens: CHAT_MAX_TOKENS,
    messages: [{ role: "system", content: chatSystemPrompt(lang, topic) }, ...past, { role: "user", content: question }],
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const body = req.body && typeof req.body === "object" ? req.body : null;
  if (!body) return res.status(400).json({ error: "Invalid request" });

  // Only the chat question is accepted. The instructions given to the model live on the server,
  // so the endpoint cannot be used as a free general-purpose AI.
  const input = body.kind === "chat" ? parseChat(body) : null;
  if (!input) return res.status(400).json({ error: "Invalid request" });
  const msg = MESSAGES[input.lang];

  if (MEDIA_REQUEST.test(input.question)) {
    return res.json({ text: msg.noImages });
  }

  if (!process.env.GROQ_API_KEY || !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return res.status(503).json({ error: msg.unavailable });
  }

  try {
    const day = new Date().toISOString().slice(0, 10);
    const ipKey = `rl:ip:chat:${clientIp(req)}:${day}`;
    const globalKey = `rl:global:${day}`;
    const replies = await redisPipeline([
      ["INCR", ipKey],
      ["EXPIRE", ipKey, 172800, "NX"],
      ["INCR", globalKey],
      ["EXPIRE", globalKey, 172800, "NX"],
    ]);
    if (!Array.isArray(replies) || replies.some(r => r.error || typeof r.result === "undefined")) {
      return res.status(503).json({ error: msg.unavailable });
    }
    if (Number(replies[0].result) > IP_DAILY_LIMIT) return res.status(429).json({ error: msg.ipLimit });
    if (Number(replies[2].result) > GLOBAL_DAILY_LIMIT) return res.status(429).json({ error: msg.globalLimit });

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      model: input.model,
      max_tokens: input.tokens,
      messages: input.messages,
      ...(input.model.startsWith("openai/gpt-oss") ? { reasoning_effort: "low" } : {}),
    });
    let text = (completion.choices[0]?.message?.content || "").trim();
    text = text.replace(/([א-ת])"([א-ת])/g, "$1'$2");
    if (!text) text = msg.empty;
    return res.json({ text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: msg.unavailable });
  }
}
