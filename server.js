import "dotenv/config";
import express from "express";
import handler from "./api/chat.js";

const app = express();
app.use(express.json({ limit: "100kb" }));
app.post("/api/chat", handler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
