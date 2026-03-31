import { useState, useEffect, useRef, useCallback } from "react";
import T from "../constants/theme";
import TX from "../constants/translations";
import { callClaude } from "../api/claude";
import Spinner from "../components/Spinner";

export default function ChatScreen({ lang, level, initialQuestion = null }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  const levelInstr = {
    beginner: isHe ? "Respond ONLY in Hebrew. Explain simply, like to a curious 14-year-old." : "Respond in English. Explain simply, like to a curious 14-year-old.",
    intermediate: isHe ? "Respond ONLY in Hebrew. Be clear, suitable for a high school student." : "Respond in English. Be clear, suitable for a high school student.",
    advanced: isHe ? "Respond ONLY in Hebrew. Be academically rigorous." : "Respond in English. Be academically rigorous.",
  }[level] || "";

  const [messages, setMessages] = useState([{
    role:"ai", text:`**${tx.chatWelcomeTitle}**\n\n${tx.chatWelcomeBody}`, suggestions: tx.chatSugg,
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const sentInitial = useRef(false);
  useEffect(() => {
    if (initialQuestion && !sentInitial.current) {
      sentInitial.current = true;
      send(initialQuestion);
    }
  }, [initialQuestion]);

  const send = useCallback(async (text) => {
    const t = text || input;
    if (!t.trim() || loading) return;
    const newHistory = [...history, { role:"user", content:t }];
    setHistory(newHistory);
    setMessages(m => [...m, { role:"user", text:t }, { role:"ai", text:"", loading:true }]);
    setInput(""); setLoading(true);
    try {
      const aiText = await callClaude(
        `You are HistoryWithBen AI, an expert history teacher. ${levelInstr} Answer clearly, give historical context, explain why it matters. End with 2-3 follow-up questions: "${tx.suggestLabel} • q1 • q2". Max 250 words.`,
        t
      );
      setHistory(h => [...h, { role:"assistant", content:aiText }]);
      let mainText = aiText, suggs = [];
      if (aiText.includes(tx.suggestLabel)) {
        const parts = aiText.split(tx.suggestLabel);
        mainText = parts[0];
        suggs = parts[1].split("•").map(s => s.trim()).filter(Boolean);
      }
      setMessages(m => [...m.slice(0,-1), { role:"ai", text:mainText, suggestions:suggs }]);
    } catch {
      setMessages(m => [...m.slice(0,-1), { role:"ai", text:tx.error }]);
    }
    setLoading(false);
  }, [input, loading, history, levelInstr, tx]);

  const renderText = (text) => text
    .replace(/\*\*(.*?)\*\*/g, `<strong style="color:${T.gold}">$1</strong>`)
    .replace(/\n/g, "<br/>");

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}>
      <div style={{ flex:1, overflowY:"auto", padding:"20px 26px", display:"flex", flexDirection:"column", gap:13 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ maxWidth:640, alignSelf: msg.role==="user" ? (isHe?"flex-start":"flex-end") : (isHe?"flex-end":"flex-start") }}>
            <div style={{
              padding:"12px 16px", fontSize:".87rem", lineHeight:1.75,
              background: msg.role==="user" ? T.gold : T.surface,
              color: msg.role==="user" ? "#0c0a08" : T.text,
              border: msg.role==="ai" ? `1px solid ${T.border}` : "none",
              borderRadius: msg.role==="user"
                ? (isHe ? "15px 15px 15px 4px" : "15px 15px 4px 15px")
                : (isHe ? "15px 15px 4px 15px" : "15px 15px 15px 4px"),
            }}>
              {msg.loading
                ? <div style={{ display:"flex", gap:8, alignItems:"center" }}><Spinner size={16}/><span style={{ fontSize:".8rem", color:T.gold }}>{tx.thinking}</span></div>
                : <span dangerouslySetInnerHTML={{ __html: renderText(msg.text) }} />
              }
            </div>
            {msg.suggestions?.length > 0 && (
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:7, justifyContent: isHe?"flex-end":"flex-start" }}>
                {msg.suggestions.map((s,j) => (
                  <button key={j} onClick={() => send(s)} style={{ background:"transparent", border:`1px solid ${T.borderStrong}`, borderRadius:20, padding:"4px 10px", fontSize:".74rem", color:T.gold, cursor:"pointer" }}>→ {s}</button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ borderTop:`1px solid ${T.border}`, padding:"13px 20px", paddingBottom:"max(13px, calc(13px + env(safe-area-inset-bottom)))", paddingInlineStart:"max(20px, calc(20px + env(safe-area-inset-left)))", paddingInlineEnd:"max(20px, calc(20px + env(safe-area-inset-right)))", background:T.surface, flexShrink:0 }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:12, padding:"7px 10px", maxWidth:640, margin:"0 auto" }}>
          <button onClick={() => send()} disabled={loading} style={{ background:T.gold, color:"#0c0a08", border:"none", borderRadius:8, width:40, height:40, minWidth:40, cursor:"pointer", display:"grid", placeItems:"center", flexShrink:0, fontSize:"1rem", order: isHe ? 1 : 0 }}>{isHe ? "◄" : "►"}</button>
          <textarea
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1} placeholder={tx.chatPlaceholder}
            dir={isHe ? "rtl" : "ltr"}
            style={{ flex:1, background:"transparent", border:"none", outline:"none", color:T.text, fontSize:"16px", resize:"none", maxHeight:100, minHeight:36, textAlign: isHe?"right":"left", fontFamily:"inherit", minWidth:0, lineHeight:1.5, padding:"6px 0" }}
          />
        </div>
      </div>
    </div>
  );
}
