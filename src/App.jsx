import { useState, useEffect, useRef } from "react";
import T from "./constants/theme";
import TX from "./constants/translations";
import EVENTS from "./constants/events";
import EventModal from "./components/EventModal";
import HomeScreen from "./screens/HomeScreen";
import TimelineScreen from "./screens/TimelineScreen";
import SavedScreen from "./screens/SavedScreen";
import ChatScreen from "./screens/ChatScreen";
import QuizScreen from "./screens/QuizScreen";
import BackgroundArt from "./components/BackgroundArt";
import AskPopup from "./components/AskPopup";
import { PROMO_URL } from "./constants/links";
import logoMark from "./images/logo-mark.png";

const SCREENS = ["home", "timeline", "chat", "saved", "quiz"];

// "#/timeline" opens a screen and "#/topic/egypt" opens a topic, so every view has its own link.
function parseHash() {
  const h = typeof window === "undefined" ? "" : window.location.hash.replace(/^#\/?/, "");
  const [a, b] = h.split("/");
  if (a === "topic" && b) return { screen: "home", modal: decodeURIComponent(b) };
  if (SCREENS.includes(a)) return { screen: a, modal: null };
  return { screen: "home", modal: null };
}

const TEXT_SIZES = [100, 112, 125, 140];
const DEFAULT_SIZE = 1;

export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("hm_lang") === "en" ? "en" : "he"; } catch { return "he"; }
  });
  const level = "beginner";
  const [screen, setScreen] = useState(() => parseHash().screen);
  const [saved, setSaved] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("hm_react_saved") || "[]");
      return Array.isArray(parsed) ? parsed.filter(x => x && typeof x.id === "string") : [];
    } catch { return []; }
  });
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(() => parseHash().modal);
  const pushedRef = useRef(false);
  const [chatTopic, setChatTopic] = useState(null);
  const [startItem, setStartItem] = useState(null);
  const [sizeIdx, setSizeIdx] = useState(() => {
    try {
      const v = Number(localStorage.getItem("hm_text_size"));
      return Number.isInteger(v) && v >= 0 && v < TEXT_SIZES.length ? v : DEFAULT_SIZE;
    } catch { return DEFAULT_SIZE; }
  });

  const isHe = lang === "he";
  const tx = TX[lang];
  const events = EVENTS[lang];

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(""), 2400); return () => clearTimeout(t); }
  }, [toast]);

  useEffect(() => {
    try { localStorage.setItem("hm_react_saved", JSON.stringify(saved)); } catch {}
  }, [saved]);

  useEffect(() => {
    try { localStorage.setItem("hm_lang", lang); } catch {}
  }, [lang]);

  // Browser back and forward, and links that arrive with a hash, drive the same state.
  useEffect(() => {
    const onHash = () => {
      const r = parseHash();
      setModal(r.modal);
      if (!r.modal) setScreen(r.screen);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (id) => {
    setScreen(id);
    try { window.history.replaceState(null, "", `#/${id}`); } catch {}
  };

  const openModal = (id) => {
    pushedRef.current = true;
    window.location.hash = `/topic/${id}`;
  };

  const closeModal = () => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      setModal(null);
      try { window.history.replaceState(null, "", `#/${screen}`); } catch {}
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isHe ? "rtl" : "ltr";
  }, [lang, isHe]);

  useEffect(() => {
    document.documentElement.style.fontSize = TEXT_SIZES[sizeIdx] + "%";
    try { localStorage.setItem("hm_text_size", String(sizeIdx)); } catch {}
  }, [sizeIdx]);

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
    pushedRef.current = false;
    setModal(null);
    setChatTopic({ id: e.id, name: e.name });
    go("chat");
  };

  const navTabs = [
    { id:"home", label:tx.navExplore },
    { id:"timeline", label:tx.navTimeline },
    { id:"chat", label:tx.navChat },
    { id:"saved", label:tx.navSaved },
    { id:"quiz", label:tx.navQuiz },
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
        @keyframes hm-spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(37,99,235,.35); border-radius: 3px; }
        button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        input, textarea, select { font-size: 16px; }
        :focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
        @media (max-width: 640px) {
          .hm-nav { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; position: static !important; padding-top: max(10px, env(safe-area-inset-top)) !important; padding-bottom: 10px !important; }
          .hm-tabs {
            position: fixed !important; bottom: 0; left: 0; right: 0; z-index: 400;
            flex-wrap: nowrap !important; gap: 0 !important; border-radius: 0 !important;
            padding: 6px 4px calc(6px + env(safe-area-inset-bottom)) !important;
            background: rgba(255,255,255,.98) !important; border: none !important; border-top: 1px solid #e2e8f0 !important;
            box-shadow: 0 -6px 20px rgba(15,23,42,.08);
          }
          .hm-tabs button { flex: 1; padding: 9px 2px !important; font-size: .72rem !important; }
          html { scroll-padding-bottom: 90px; }
          body { padding-bottom: calc(62px + env(safe-area-inset-bottom)); }
          .hm-fab { bottom: calc(76px + env(safe-area-inset-bottom)) !important; }
          .hm-toast { bottom: 130px !important; }
        }
      `}</style>

      <nav className="hm-nav" aria-label={tx.navAria} style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"13px 24px", paddingTop:"max(13px, calc(13px + env(safe-area-inset-top)))",
        paddingInlineStart:"max(24px, calc(24px + env(safe-area-inset-left)))",
        paddingInlineEnd:"max(24px, calc(24px + env(safe-area-inset-right)))",
        borderBottom:`1px solid ${T.border}`,
        background:"rgba(255,255,255,.98)", backdropFilter:"blur(20px)",
        position:"sticky", top:0, zIndex:100, flexWrap:"wrap", gap:8,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src={logoMark} alt="" aria-hidden="true" style={{ height:40, width:"auto", display:"block" }} />
          <span style={{ fontFamily:"Georgia,'Times New Roman',serif", fontSize:"1.3rem", fontWeight:600, color:"#1e3a5f", letterSpacing:"-.01em" }}>history with ben</span>
        </div>
        <div className="hm-tabs" style={{ display:"flex", gap:3, background:T.surface2, border:`1px solid ${T.border}`, borderRadius:11, padding:3, flexWrap:"wrap", justifyContent:"center" }}>
          {navTabs.map(tab => (
            <button key={tab.id} onClick={() => { go(tab.id); setChatTopic(null); }} style={{
              padding:"6px 13px", borderRadius:8, border:"none",
              background: screen===tab.id ? T.gold : "transparent",
              color: screen===tab.id ? "#ffffff" : T.textDim,
              cursor:"pointer", fontSize:".8rem", fontWeight: screen===tab.id ? 700 : 500,
              transition:"all .2s", whiteSpace:"nowrap", fontFamily:"inherit",
            }}>{tab.label}</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <a href={PROMO_URL} target="_blank" rel="noopener noreferrer" aria-label={tx.promoAria} style={{
            display:"inline-flex", alignItems:"center", gap:6, whiteSpace:"nowrap",
            background:T.gold, color:"#ffffff", borderRadius:20, padding:"6px 14px",
            fontSize:".79rem", fontWeight:700, textDecoration:"none", fontFamily:"inherit",
          }}>
            <span aria-hidden="true">▶</span>{tx.promo}
          </a>
          <div role="group" aria-label={isHe ? "גודל טקסט" : "Text size"} style={{ display:"flex", alignItems:"center", gap:2, background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:20, padding:2 }}>
            <button onClick={() => setSizeIdx(i => Math.max(0, i - 1))} disabled={sizeIdx === 0}
              aria-label={isHe ? "הקטן טקסט" : "Smaller text"} style={{
              background:"transparent", border:"none", borderRadius:16, width:30, height:28,
              color: sizeIdx === 0 ? T.textMuted : T.gold, cursor: sizeIdx === 0 ? "default" : "pointer",
              fontSize:".78rem", fontWeight:700, fontFamily:"inherit",
            }}>A−</button>
            <button onClick={() => setSizeIdx(i => Math.min(TEXT_SIZES.length - 1, i + 1))} disabled={sizeIdx === TEXT_SIZES.length - 1}
              aria-label={isHe ? "הגדל טקסט" : "Larger text"} style={{
              background:"transparent", border:"none", borderRadius:16, width:30, height:28,
              color: sizeIdx === TEXT_SIZES.length - 1 ? T.textMuted : T.gold, cursor: sizeIdx === TEXT_SIZES.length - 1 ? "default" : "pointer",
              fontSize:"1.02rem", fontWeight:700, fontFamily:"inherit",
            }}>A+</button>
          </div>
          <button onClick={() => setLang(l => l==="he"?"en":"he")} style={{
            background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:20,
            padding:"5px 13px", fontSize:".79rem", color:T.gold, cursor:"pointer", fontFamily:"inherit",
          }}>{tx.langToggle}</button>
        </div>
      </nav>

      {screen === "home" && <HomeScreen lang={lang} events={events} level={level} onOpenEvent={openModal} />}
      {screen === "timeline" && <TimelineScreen lang={lang} events={events} level={level} onOpenEvent={openModal} />}
      {screen === "chat" && <ChatScreen key={lang + (chatTopic?.id || "")} lang={lang} topic={chatTopic && { ...chatTopic, name: events.find(x => x.id === chatTopic.id)?.name || chatTopic.name }} onClearTopic={() => setChatTopic(null)} events={events} startItem={startItem} onStartConsumed={() => setStartItem(null)} />}
      {screen === "saved" && <SavedScreen lang={lang} events={events} saved={saved} onRemove={removeItem} />}
      {screen === "quiz" && <QuizScreen lang={lang} events={events} onOpenEvent={openModal} />}

      {modalEvent && (
        <EventModal
          event={modalEvent}
          lang={lang}
          isHe={isHe}
          onClose={closeModal}
          onSave={() => { saveEvent(modal); closeModal(); }}
          onAsk={() => openEventAndGoChat(modal)}
        />
      )}

      <AskPopup
        lang={lang}
        events={events}
        enabled={screen !== "chat" && screen !== "quiz" && !modal}
        onPick={item => { setStartItem(item); setChatTopic(null); go("chat"); }}
        onOpenChat={() => { setChatTopic(null); go("chat"); }}
      />

      {toast && <div className="hm-toast" style={{
        position:"fixed", bottom:90, left:"50%", transform:"translateX(-50%)",
        background:T.surface3, border:`1px solid ${T.borderStrong}`, borderRadius:10,
        padding:"9px 17px", fontSize:".82rem", color:T.text, zIndex:999, whiteSpace:"nowrap",
        pointerEvents:"none",
      }}>{toast}</div>}
    </div>
  );
}
