export async function callClaude(system, userMsg, maxTokens = 400, history = []) {
  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system, userMsg, maxTokens, history }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 429) throw Object.assign(new Error(data.error || "limit"), { noRetry: true });
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      if (typeof data.text !== "string") throw new Error("Empty response");
      return data.text;
    } catch (err) {
      lastErr = err;
      if (err.noRetry) break;
      if (attempt < 1) await new Promise(r => setTimeout(r, 1000));
    }
  }
  throw lastErr;
}
