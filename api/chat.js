import Groq from "groq-sdk";

const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const IP_DAILY_LIMIT = Number(process.env.IP_DAILY_LIMIT || 10);
const GLOBAL_DAILY_LIMIT = Number(process.env.GLOBAL_DAILY_LIMIT || 200);
const MAX_SYSTEM = 3000;
const MAX_USER = 3000;
const MAX_HISTORY = 6;
const MAX_HISTORY_ITEM = 1000;
const MAX_TOKENS_CAP = 600;

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

function parseBody(body) {
  if (!body || typeof body !== "object") return null;
  const { system, userMsg, history = [], maxTokens } = body;
  if (typeof system !== "string" || system.length > MAX_SYSTEM) return null;
  if (typeof userMsg !== "string" || !userMsg.trim() || userMsg.length > MAX_USER) return null;
  if (!Array.isArray(history) || history.length > MAX_HISTORY) return null;
  const past = [];
  for (const m of history) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") return null;
    if (m.content.length > MAX_HISTORY_ITEM) return null;
    past.push({ role: m.role, content: m.content });
  }
  const tokens = Number(maxTokens) > 0 ? Math.min(Math.floor(Number(maxTokens)), MAX_TOKENS_CAP) : 400;
  return { system, userMsg, past, tokens };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.GROQ_API_KEY || !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return res.status(503).json({ error: "AI is not available right now" });
  }

  const input = parseBody(req.body);
  if (!input) return res.status(400).json({ error: "Invalid request" });

  try {
    const day = new Date().toISOString().slice(0, 10);
    const ipKey = `rl:ip:${clientIp(req)}:${day}`;
    const globalKey = `rl:global:${day}`;
    const replies = await redisPipeline([
      ["INCR", ipKey],
      ["EXPIRE", ipKey, 172800, "NX"],
      ["INCR", globalKey],
      ["EXPIRE", globalKey, 172800, "NX"],
    ]);
    if (replies.some(r => r.error || typeof r.result === "undefined")) {
      return res.status(503).json({ error: "AI is not available right now" });
    }
    const ipCount = Number(replies[0].result);
    const globalCount = Number(replies[2].result);
    if (ipCount > IP_DAILY_LIMIT) {
      return res.status(429).json({ error: "הגעת למכסה היומית של השאלות. נסה שוב מחר." });
    }
    if (globalCount > GLOBAL_DAILY_LIMIT) {
      return res.status(429).json({ error: "המכסה היומית של האתר מלאה. נסה שוב מחר." });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      model: MODEL,
      max_tokens: input.tokens,
      messages: [
        { role: "system", content: input.system },
        ...input.past,
        { role: "user", content: input.userMsg },
      ],
      ...(MODEL.startsWith("openai/gpt-oss") ? { reasoning_effort: "low" } : {}),
    });
    let text = completion.choices[0]?.message?.content || "";
    text = text.replace(/([א-ת])"([א-ת])/g, "$1'$2");
    return res.json({ text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "AI request failed" });
  }
}
