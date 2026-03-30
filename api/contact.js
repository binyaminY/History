export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, message } = req.body;
  if (!message?.trim()) return res.status(400).json({ error: "empty" });

  const to = Buffer.from("YmVueW9uYTEyQGdtYWlsLmNvbQ==", "base64").toString();

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "HistoryWithBen <onboarding@resend.dev>",
        to,
        subject: `הודעה חדשה מ-HistoryWithBen${name ? ` — ${name}` : ""}`,
        text: message,
      }),
    });
    if (!resp.ok) throw new Error(await resp.text());
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
