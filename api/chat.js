import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { system, userMsg, maxTokens = 1000 } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userMsg },
      ],
    });
    let text = completion.choices[0]?.message?.content || "";
    // Fix Hebrew abbreviation quotes like לפנה"ס
    text = text.replace(/([א-ת])"([א-ת])/g, "$1'$2");
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
