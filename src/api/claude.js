export default async function handler(req, res) {
  const { system, userMsg } = req.body;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userMsg }
        ],
      }),
    });

    const data = await response.json();
    
    // כאן הקסם: אנחנו יוצרים שדה בשם text כדי שהקוד שלך (claude.js) יעבוד
    const aiText = data.choices[0].message.content;
    res.status(200).json({ text: aiText });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}