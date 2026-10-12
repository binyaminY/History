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
import SettingsPanel, { TEXT_SIZES, DEFAULT_PREFS } from "./components/SettingsPanel";
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [prefs, setPrefs] = useState(() => {
    const base = { ...DEFAULT_PREFS };
    try {
      base.motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      base.contrast = window.matchMedia("(prefers-contrast: more)").matches;
      const old = Number(localStorage.getItem("hm_text_size"));
      if (Number.isInteger(old) && old >= 0 && old < TEXT_SIZES.length) base.size = old;
      const saved = JSON.parse(localStorage.getItem("hm_prefs") || "null");
      if (saved && typeof saved === "object") {
        for (const k of Object.keys(DEFAULT_PREFS)) if (typeof saved[k] === typeof DEFAULT_PREFS[k]) base[k] = saved[k];
        if (!(base.size >= 0 && base.size < TEXT_SIZES.length)) base.size = DEFAULT_PREFS.size;
      }
    } catch {}
    return base;
  });
  const setPref = (k, v) => setPrefs(p => ({ ...p, [k]: v }));

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

  // Light / dark: a saved choice wins, otherwise follow the system until the user picks one.
  const [theme, setThemeState] = useState(() => document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  const applyTheme = (t) => {
    document.documentElement.dataset.theme = t;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t === "dark" ? "#0b1220" : "#2563eb");
    setThemeState(t);
  };
  const [themePref, setThemePrefState] = useState(() => {
    try { const v = localStorage.getItem("hm_theme"); return v === "dark" || v === "light" ? v : "system"; } catch { return "system"; }
  });
  const setThemePref = (v) => {
    setThemePrefState(v);
    try { v === "system" ? localStorage.removeItem("hm_theme") : localStorage.setItem("hm_theme", v); } catch {}
    applyTheme(v === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : v);
  };
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (ev) => {
      let stored = null;
      try { stored = localStorage.getItem("hm_theme"); } catch {}
      if (!stored) applyTheme(ev.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Display preferences become data attributes on <html>; the CSS below reacts to them.
  useEffect(() => {
    const d = document.documentElement;
    d.style.fontSize = TEXT_SIZES[prefs.size] + "%";
    d.dataset.contrast = prefs.contrast ? "high" : "normal";
    d.dataset.motion = prefs.motion ? "reduce" : "normal";
    d.dataset.art = prefs.art ? "on" : "off";
    d.dataset.links = prefs.links ? "underline" : "normal";
    d.dataset.font = prefs.font ? "readable" : "normal";
    d.dataset.spacing = prefs.spacing ? "wide" : "normal";
    d.dataset.focus = prefs.focus ? "strong" : "normal";
    try { localStorage.setItem("hm_prefs", JSON.stringify(prefs)); } catch {}
  }, [prefs]);

  const resetPrefs = () => {
    setPrefs({ ...DEFAULT_PREFS });
    setThemePref("system");
  };

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
      <a href="#main" className="hm-skip" onClick={ev => { ev.preventDefault(); document.getElementById("main")?.focus(); }}>{isHe ? "דלג לתוכן הראשי" : "Skip to main content"}</a>
      <BackgroundArt />
      <style>{`
        @keyframes hm-spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: var(--hm-border-strong); border-radius: 3px; }
        button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        input, textarea, select { font-size: 16px; }
        :focus-visible { outline: 3px solid var(--hm-accent); outline-offset: 2px; }
        .hm-skip { position: absolute; top: -60px; inset-inline-start: 12px; z-index: 1000; background: var(--hm-accent); color: var(--hm-on-accent); padding: 10px 16px; border-radius: 10px; font-weight: 700; text-decoration: none; }
        .hm-skip:focus { top: 8px; }
        .hm-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
        }
        html[data-motion="reduce"] *, html[data-motion="reduce"] *::before, html[data-motion="reduce"] *::after {
          animation: none !important; transition: none !important; scroll-behavior: auto !important;
        }
        html[data-art="off"] .hm-art { display: none !important; }
        html[data-links="underline"] a { text-decoration: underline !important; text-underline-offset: 3px; }
        html[data-font="readable"] body, html[data-font="readable"] body * { font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important; }
        html[data-spacing="wide"] body * { line-height: 1.9 !important; word-spacing: .14em !important; }
        html[data-spacing="wide"][lang="en"] body * { letter-spacing: .04em !important; }
        html[data-focus="strong"] :focus-visible { outline: 4px solid var(--hm-accent) !important; outline-offset: 3px !important; box-shadow: 0 0 0 7px var(--hm-bg) !important; }
        html[data-contrast="high"] body * { border-color: var(--hm-text) !important; }
        html[data-contrast="high"] button, html[data-contrast="high"] [role="button"] { border-width: 2px !important; }
        @media (max-width: 640px) {
          .hm-nav { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; position: static !important; padding-top: max(10px, env(safe-area-inset-top)) !important; padding-bottom: 10px !important; }
          .hm-tabs {
            position: fixed !important; bottom: 0; left: 0; right: 0; z-index: 400;
            flex-wrap: nowrap !important; gap: 0 !important; border-radius: 0 !important;
            padding: 6px 4px calc(6px + env(safe-area-inset-bottom)) !important;
            background: var(--hm-nav-bg) !important; border: none !important; border-top: 1px solid var(--hm-border-strong) !important;
            box-shadow: 0 -6px 20px rgba(15,23,42,.12);
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
        background:T.navBg, backdropFilter:"blur(20px)",
        position:"sticky", top:0, zIndex:100, flexWrap:"wrap", gap:8,
      }}>
        <button onClick={() => { setModal(null); go("home"); setChatTopic(null); }}
          aria-label={isHe ? "חזרה לדף הבית" : "Back to home"}
          style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none", padding:0, cursor:"pointer", fontFamily:"inherit" }}>
          <img src={logoMark} alt="" aria-hidden="true" style={{ height:40, width:"auto", display:"block" }} />
          <span style={{ fontFamily:"Georgia,'Times New Roman',serif", fontSize:"1.3rem", fontWeight:600, color:T.logo, letterSpacing:"-.01em" }}>history with ben</span>
        </button>
        <div className="hm-tabs" style={{ display:"flex", gap:3, background:T.surface2, border:`1px solid ${T.border}`, borderRadius:11, padding:3, flexWrap:"wrap", justifyContent:"center" }}>
          {navTabs.map(tab => (
            <button key={tab.id} aria-current={screen===tab.id ? "page" : undefined} onClick={() => { go(tab.id); setChatTopic(null); }} style={{
              padding:"6px 13px", borderRadius:8, border:"none",
              background: screen===tab.id ? T.gold : "transparent",
              color: screen===tab.id ? T.onAccent : T.textDim,
              cursor:"pointer", fontSize:".8rem", fontWeight: screen===tab.id ? 700 : 500,
              transition:"all .2s", whiteSpace:"nowrap", fontFamily:"inherit",
            }}>{tab.label}</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <a href={PROMO_URL} target="_blank" rel="noopener noreferrer" aria-label={tx.promoAria} style={{
            display:"inline-flex", alignItems:"center", gap:6, whiteSpace:"nowrap",
            background:T.gold, color:T.onAccent, borderRadius:20, padding:"6px 14px",
            fontSize:".79rem", fontWeight:700, textDecoration:"none", fontFamily:"inherit",
          }}>
            <span aria-hidden="true">▶</span>{tx.promo}
          </a>
          <button onClick={() => setSettingsOpen(true)} aria-haspopup="dialog" aria-expanded={settingsOpen}
            aria-label={isHe ? "הגדרות נגישות והצגה" : "Accessibility and display settings"} style={{
            background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:20,
            padding:"5px 13px", fontSize:".79rem", fontWeight:700, color:T.gold, cursor:"pointer", fontFamily:"inherit",
            display:"inline-flex", alignItems:"center", gap:6, whiteSpace:"nowrap",
          }}><span aria-hidden="true">⚙️</span>{isHe ? "הגדרות" : "Settings"}</button>
          <button onClick={() => setLang(l => l==="he"?"en":"he")} lang={isHe ? "en" : "he"} style={{
            background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:20,
            padding:"5px 13px", fontSize:".79rem", color:T.gold, cursor:"pointer", fontFamily:"inherit",
          }}>{tx.langToggle}</button>
        </div>
      </nav>

      <main id="main" tabIndex={-1} style={{ flex:1, display:"flex", flexDirection:"column", outline:"none", position:"relative", zIndex:1 }}>
      {screen === "home" && <HomeScreen lang={lang} events={events} level={level} onOpenEvent={openModal} />}
      {screen === "timeline" && <TimelineScreen lang={lang} events={events} level={level} onOpenEvent={openModal} />}
      {screen === "chat" && <ChatScreen key={lang + (chatTopic?.id || "")} lang={lang} topic={chatTopic && { ...chatTopic, name: events.find(x => x.id === chatTopic.id)?.name || chatTopic.name }} onClearTopic={() => setChatTopic(null)} events={events} startItem={startItem} onStartConsumed={() => setStartItem(null)} />}
      {screen === "saved" && <SavedScreen lang={lang} events={events} saved={saved} onRemove={removeItem} />}
      {screen === "quiz" && <QuizScreen lang={lang} events={events} onOpenEvent={openModal} />}
      </main>

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

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} isHe={isHe}
        prefs={prefs} setPref={setPref} themePref={themePref} setThemePref={setThemePref} onReset={resetPrefs} />

      <AskPopup
        lang={lang}
        events={events}
        enabled={screen !== "chat" && screen !== "quiz" && !modal}
        onPick={item => { setStartItem(item); setChatTopic(null); go("chat"); }}
        onOpenChat={() => { setChatTopic(null); go("chat"); }}
      />

      <div className="hm-sr" role="status" aria-live="polite">{toast}</div>
      {toast && <div className="hm-toast" aria-hidden="true" style={{
        position:"fixed", bottom:90, left:"50%", transform:"translateX(-50%)",
        background:T.surface3, border:`1px solid ${T.borderStrong}`, borderRadius:10,
        padding:"9px 17px", fontSize:".82rem", color:T.text, zIndex:999, whiteSpace:"nowrap",
        pointerEvents:"none",
      }}>{toast}</div>}
    </div>
  );
}
