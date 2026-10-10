import { useState, useEffect, useRef } from "react";
import T from "../constants/theme";
import TX from "../constants/translations";
import { askHistoryAI } from "../api/claude";
import Spinner from "../components/Spinner";

const MAX_QUESTION = 300;
const HISTORY_TURNS = 4;
const HISTORY_ITEM_CHARS = 400;

const escapeHtml = (str) => str
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export default function ChatScreen({ lang, topic = null, onClearTopic }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);
  useEffect(() => { inputRef.current?.focus(); }, [topic]);

  const send = async (text) => {
    const question = (text ?? input).trim().slice(0, MAX_QUESTION);
    if (!question || loading) return;
    const history = messages
      .filter(m => !m.error && !m.loading)
      .slice(-HISTORY_TURNS)
      .map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text.slice(0, HISTORY_ITEM_CHARS) }));
    setMessages(m => [...m, { role:"user", text:question }, { role:"ai", text:"", loading:true }]);
    setInput(""); setLoading(true);
    try {
      const answer = await askHistoryAI({ lang, topic: topic?.name, question, history });
      setMessages(m => [...m.slice(0, -1), { role:"ai", text:answer }]);
    } catch (err) {
      setMessages(m => [...m.slice(0, -1), { role:"ai", text: err?.userMessage || tx.error, error:true }]);
    }
    setLoading(false);
  };

  const renderText = (text) => escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, `<strong style="color:${T.gold}">$1</strong>`)
    .replace(/\n/g, "<br/>");

  const suggestions = topic ? tx.topicSugg : tx.chatSugg;
  const chip = { background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:20, padding:"8px 16px", fontSize:".82rem", color:T.gold, cursor:"pointer", fontFamily:"inherit" };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}>
      {topic && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, padding:"10px 20px", background:"rgba(37,99,235,.08)", borderBottom:`1px solid ${T.border}`, flexWrap:"wrap" }}>
          <div style={{ fontSize:".85rem", color:T.text }}>
            📌 {tx.topicLabel} <strong style={{ color:T.gold }}>{topic.name}</strong>
          </div>
          <button onClick={onClearTopic} style={{ background:"transparent", border:`1px solid ${T.borderStrong}`, borderRadius:16, padding:"4px 12px", fontSize:".76rem", color:T.textDim, cursor:"pointer", fontFamily:"inherit" }}>
            {tx.topicClear} ×
          </button>
        </div>
      )}

      <div style={{ flex:1, overflowY:"auto", padding:"20px 26px", display:"flex", flexDirection:"column", gap:13 }}>
        {messages.length === 0 && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"30px 20px", maxWidth:580, margin:"0 auto", width:"100%" }}>
            <div style={{ fontSize:"2.2rem", marginBottom:14 }}>🤖</div>
            <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.4rem", fontWeight:900, color:T.gold, marginBottom:10 }}>
              {topic ? `${tx.topicWelcome} ${topic.name}` : tx.chatWelcomeTitle}
            </div>
            <div style={{ fontSize:".95rem", color:T.textDim, lineHeight:1.8, marginBottom:24 }}>{tx.chatWelcomeBody}</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
              {suggestions.map((s, j) => <button key={j} onClick={() => send(s)} style={chip}>→ {s}</button>)}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ maxWidth:640, alignSelf: msg.role==="user" ? (isHe?"flex-start":"flex-end") : (isHe?"flex-end":"flex-start") }}>
            <div style={{
              padding:"12px 16px", fontSize:".9rem", lineHeight:1.75,
              background: msg.role==="user" ? T.gold : T.surface,
              color: msg.role==="user" ? "#ffffff" : (msg.error ? T.red : T.text),
              border: msg.role==="ai" ? `1px solid ${T.border}` : "none",
              borderRadius: msg.role==="user"
                ? (isHe ? "15px 15px 15px 4px" : "15px 15px 4px 15px")
                : (isHe ? "15px 15px 4px 15px" : "15px 15px 15px 4px"),
            }}>
              {msg.loading
                ? <div style={{ display:"flex", gap:8, alignItems:"center" }}><Spinner size={16}/><span style={{ fontSize:".8rem", color:T.gold }}>{tx.thinking}</span></div>
                : <span dangerouslySetInnerHTML={{ __html: renderText(msg.text) }} />}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div style={{ borderTop:`1px solid ${T.border}`, padding:"12px 20px", paddingBottom:"max(12px, calc(12px + env(safe-area-inset-bottom)))", background:T.surface, flexShrink:0 }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:12, padding:"7px 10px", maxWidth:640, margin:"0 auto" }}>
          <button onClick={() => send()} disabled={loading || !input.trim()} aria-label={tx.send}
            style={{ background:T.gold, color:"#ffffff", border:"none", borderRadius:8, width:40, height:40, minWidth:40, cursor: loading || !input.trim() ? "default" : "pointer", opacity: loading || !input.trim() ? .5 : 1, display:"grid", placeItems:"center", flexShrink:0, fontSize:"1rem", order: isHe ? 1 : 0 }}>
            {isHe ? "◄" : "►"}
          </button>
          <textarea
            ref={inputRef}
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1} maxLength={MAX_QUESTION} placeholder={topic ? tx.topicPlaceholder : tx.chatPlaceholder}
            dir={isHe ? "rtl" : "ltr"}
            style={{ flex:1, background:"transparent", border:"none", outline:"none", color:T.text, fontSize:"16px", resize:"none", maxHeight:100, minHeight:36, textAlign: isHe?"right":"left", fontFamily:"inherit", minWidth:0, lineHeight:1.5, padding:"6px 0" }}
          />
        </div>
        <div style={{ maxWidth:640, margin:"6px auto 0", display:"flex", justifyContent:"space-between", fontSize:".7rem", color:T.textMuted }}>
          <span>{tx.aiNote}</span>
          <span>{input.length}/{MAX_QUESTION}</span>
        </div>
      </div>
    </div>
  );
}
