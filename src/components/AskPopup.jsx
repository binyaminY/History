import { useState, useEffect } from "react";
import T from "../constants/theme";
import TX from "../constants/translations";

const SHOW_DELAY_MS = 2500;
const PICK_COUNT = 3;
const YELLOW = "#facc15";
const YELLOW_BORDER = "#eab308";
const YELLOW_TEXT = "#422006";

function pickRandom(list, n) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

// One bubble about one random topic: its explanation and a few prepared questions.
// A click gives an instant answer without the AI.
export default function AskPopup({ lang, enabled, events = [], onPick, onOpenChat }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  const [card, setCard] = useState(null);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Wait a moment after the page opens, then show the card once per visit.
  useEffect(() => {
    if (!enabled) return;
    const timer = setTimeout(() => setReady(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [enabled]);

  useEffect(() => {
    if (!events.length) return;
    let active = true;
    const event = events[Math.floor(Math.random() * events.length)];
    import("../constants/faq/index.js").then(m => {
      if (!active) return;
      setCard({ event, questions: pickRandom(m.topicQuestions(event.id, lang), PICK_COUNT) });
    });
    return () => { active = false; };
  }, [lang, events]);

  const pos = { position:"fixed", bottom:"max(16px, env(safe-area-inset-bottom))", insetInlineEnd:16, zIndex:900 };

  if (!enabled) return null;

  if (dismissed) {
    // After the bubble is closed, a small yellow button keeps the chat one tap away.
    return (
      <button onClick={onOpenChat} aria-label={tx.askPopupOpen} style={{ ...pos, width:52, height:52, borderRadius:26, border:`1px solid ${YELLOW_BORDER}`, background:YELLOW, color:YELLOW_TEXT, fontSize:"1.4rem", cursor:"pointer", boxShadow:"0 6px 20px rgba(0,0,0,.25)" }}>
        🤖
      </button>
    );
  }

  if (!ready || !card) return null;

  const { event, questions } = card;
  const chip = { background:"#ffffff", border:`1px solid ${YELLOW_BORDER}`, borderRadius:12, padding:"9px 12px", fontSize:".84rem", color:YELLOW_TEXT, cursor:"pointer", fontFamily:"inherit", textAlign: isHe ? "right" : "left", lineHeight:1.5 };

  return (
    <div role="dialog" aria-label={tx.askPopupTitle} dir={isHe ? "rtl" : "ltr"} style={{
      ...pos, width:"min(340px, calc(100vw - 32px))", background:YELLOW,
      border:`1px solid ${YELLOW_BORDER}`, borderRadius:16, padding:"16px 16px 14px",
      boxShadow:"0 14px 40px rgba(0,0,0,.3)", animation:"hm-pop .35s ease-out", color:YELLOW_TEXT,
    }}>
      <style>{`@keyframes hm-pop { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: none; } }`}</style>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:6 }}>
        <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.02rem", fontWeight:900 }}>
          💬 {event.name}
        </div>
        <button onClick={() => setDismissed(true)} aria-label={tx.askPopupClose} style={{ background:"transparent", border:"none", color:YELLOW_TEXT, fontSize:"1.2rem", cursor:"pointer", lineHeight:1, padding:2 }}>×</button>
      </div>
      <div style={{ fontSize:".84rem", lineHeight:1.6, marginBottom:12 }}>{event.desc}</div>

      <div style={{ fontSize:".76rem", fontWeight:800, marginBottom:6 }}>{tx.askPopupBody}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
        {questions.map(item => (
          <button key={item.id} onClick={() => onPick(item)} style={chip}>→ {item.q}</button>
        ))}
      </div>

      <button onClick={onOpenChat} style={{ marginTop:12, width:"100%", background:"#ffffff", color:YELLOW_TEXT, border:`1px solid ${YELLOW_BORDER}`, borderRadius:12, padding:"11px 12px", fontSize:".9rem", fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>
        {tx.askPopupOpen}
      </button>
    </div>
  );
}
