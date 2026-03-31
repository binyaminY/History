export async function callClaude(system, userMsg, maxTokens = 1000) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system, userMsg, maxTokens }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data.text;
    } catch (err) {
      if (attempt === 2) throw err;
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
}
