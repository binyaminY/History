async function postChat(payload) {
  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 429 || res.status === 503 || res.status === 400) {
        throw Object.assign(new Error(data.error || `HTTP ${res.status}`), { noRetry: true, userMessage: data.error });
      }
      if (!res.ok) throw Object.assign(new Error(data.error || `HTTP ${res.status}`), { userMessage: data.error });
      if (typeof data.text !== "string") throw new Error("Empty response");
      return data.text;
    } catch (err) {
      lastErr = err;
      if (err.noRetry) break;
      if (attempt < 1) await new Promise(r => setTimeout(r, 800));
    }
  }
  throw lastErr;
}

// Short history Q&A. The server owns the instructions; we only send the question.
export function askHistoryAI({ lang, topic, question, history = [] }) {
  return postChat({ kind: "chat", lang, topic: topic || "", question, history });
}

export function callClaude(system, userMsg, maxTokens = 400, lang = "he") {
  return postChat({ kind: "quiz", lang, system, userMsg, maxTokens });
}
