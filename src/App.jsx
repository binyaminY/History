import { useState, useEffect } from "react";
import T from "./constants/theme";
import TX from "./constants/translations";
import EVENTS from "./constants/events";
import EventModal from "./components/EventModal";
import HomeScreen from "./screens/HomeScreen";
import TimelineScreen from "./screens/TimelineScreen";
import ChatScreen from "./screens/ChatScreen";
import SavedScreen from "./screens/SavedScreen";
import QuizScreen from "./screens/QuizScreen";
import BackgroundArt from "./components/BackgroundArt";

export default function App() {
  const [lang, setLang] = useState("he");
  const [level, setLevel] = useState("intermediate");
  const [screen, setScreen] = useState("home");
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hm_react_saved") || "[]"); } catch { return []; }
  });
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);
  const [chatInitQ, setChatInitQ] = useState(null);

  const isHe = lang === "he";
  const tx = TX[lang];
  const events = EVENTS[lang];

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(""), 2400); return () => clearTimeout(t); }
  }, [toast]);

  useEffect(() => {
    try { localStorage.setItem("hm_react_saved", JSON.stringify(saved)); } catch {}
  }, [saved]);

  const saveEvent = (id) => {
    const e = events.find(x => x.id === id);
    if (!e) return;
    if (saved.find(s => s.id === "ev-"+id)) { setToast(tx.alreadySaved); return; }
    setSaved(s => [...s, { type:tx.typeEvent, name:e.name, id:"ev-"+id }]);
    setToast(tx.saveSuccess);
  };

  const removeItem = (idx) => setSaved(s => s.filter((_,i) => i !== idx));

  const openEventAndGoChat = (id) => {
    const e = events.find(x => x.id === id);
    if (!e) return;
    setModal(null);
    setChatInitQ(tx.askAbout + e.name);
    setScreen("chat");
  };

  const navTabs = [
    { id:"home", label:tx.navExplore },
    { id:"timeline", label:tx.navTimeline },
    { id:"chat", label:tx.navChat },
    { id:"saved", label:tx.navSaved },
    { id:"quiz", label:tx.navQuiz },
  ];

  const levels = [
    { v:"beginner", l:tx.levelBeginner },
    { v:"intermediate", l:tx.levelIntermediate },
    { v:"advanced", l:tx.levelAdvanced },
  ];

  const modalEvent = modal ? events.find(e => e.id === modal) : null;

  return (
    <div style={{
      background:T.bg, color:T.text,
      fontFamily: isHe ? "'Comfortaa','Nunito',sans-serif" : "'Nunito','Comfortaa',sans-serif",
      minHeight:"100vh", display:"flex", flexDirection:"column",
      direction: isHe ? "rtl" : "ltr", position:"relative",
    }}>
      <BackgroundArt />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes hm-spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,.35); border-radius: 3px; }
        button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        input, textarea, select { font-size: 16px; }
      `}</style>

      <nav style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"13px 24px", paddingTop:"max(13px, calc(13px + env(safe-area-inset-top)))",
        paddingInlineStart:"max(24px, calc(24px + env(safe-area-inset-left)))",
        paddingInlineEnd:"max(24px, calc(24px + env(safe-area-inset-right)))",
        borderBottom:`1px solid ${T.border}`,
        background:"rgba(12,10,8,.97)", backdropFilter:"blur(20px)",
        position:"sticky", top:0, zIndex:100, flexWrap:"wrap", gap:8,
      }}>
        <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.35rem", fontWeight:900, color:T.gold }}>
          History<span style={{ color:T.text }}>Mind</span>
        </div>
        <div style={{ display:"flex", gap:3, background:T.surface2, border:`1px solid ${T.border}`, borderRadius:11, padding:3, flexWrap:"wrap", justifyContent:"center" }}>
          {navTabs.map(tab => (
            <button key={tab.id} onClick={() => { setScreen(tab.id); setChatInitQ(null); }} style={{
              padding:"6px 13px", borderRadius:8, border:"none",
              background: screen===tab.id ? T.gold : "transparent",
              color: screen===tab.id ? "#0c0a08" : T.textDim,
              cursor:"pointer", fontSize:".8rem", fontWeight: screen===tab.id ? 700 : 500,
              transition:"all .2s", whiteSpace:"nowrap", fontFamily:"inherit",
            }}>{tab.label}</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button onClick={() => setLang(l => l==="he"?"en":"he")} style={{
            background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:20,
            padding:"5px 13px", fontSize:".79rem", color:T.gold, cursor:"pointer", fontFamily:"inherit",
          }}>{tx.langToggle}</button>
          <div style={{ display:"flex", alignItems:"center", gap:7, background:T.surface2, border:`1px solid ${T.border}`, borderRadius:20, padding:"5px 11px" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:T.gold, flexShrink:0 }} />
            <select value={level} onChange={e => setLevel(e.target.value)} style={{
              background:"transparent", border:"none", color:T.textDim, fontSize:"16px", cursor:"pointer", outline:"none", fontFamily:"inherit",
            }}>
              {levels.map(l => <option key={l.v} value={l.v}>{l.l}</option>)}
            </select>
          </div>
        </div>
      </nav>

      {screen === "home" && <HomeScreen lang={lang} events={events} level={level} onOpenEvent={id => setModal(id)} />}
      {screen === "timeline" && <TimelineScreen lang={lang} events={events} level={level} onOpenEvent={id => setModal(id)} />}
      {screen === "chat" && <ChatScreen key={lang+level+(chatInitQ||"")} lang={lang} level={level} initialQuestion={chatInitQ} />}
      {screen === "saved" && <SavedScreen lang={lang} saved={saved} onRemove={removeItem} />}
      {screen === "quiz" && <QuizScreen lang={lang} events={events} level={level} />}

      {modalEvent && (
        <EventModal
          event={modalEvent}
          lang={lang}
          isHe={isHe}
          onClose={() => setModal(null)}
          onSave={() => { saveEvent(modal); setModal(null); }}
          onAsk={() => openEventAndGoChat(modal)}
        />
      )}

      {toast && <div style={{
        position:"fixed", bottom:90, left:"50%", transform:"translateX(-50%)",
        background:T.surface3, border:`1px solid ${T.borderStrong}`, borderRadius:10,
        padding:"9px 17px", fontSize:".82rem", color:T.text, zIndex:999, whiteSpace:"nowrap",
        pointerEvents:"none",
      }}>{toast}</div>}
    </div>
  );
}
