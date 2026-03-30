import "dotenv/config";
import express from "express";
import Groq from "groq-sdk";

const app = express();
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
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
    // Fix Hebrew abbreviation quotes like לפנה"ס (quote between Hebrew letters)
    text = text.replace(/([א-ת])"([א-ת])/g, "$1'$2");
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
