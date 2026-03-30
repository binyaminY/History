import { useState, useEffect } from "react";
import T from "../constants/theme";
import TX from "../constants/translations";
import EVENTS, { LEVEL_ORDER } from "../constants/events";
import SectionLabel from "../components/SectionLabel";
import LevelBadge from "../components/LevelBadge";
import Spinner from "../components/Spinner";
import { callClaude } from "../api/claude";

function DailyEvent({ lang, isHe, onOpenEvent }) {
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const dateStr = `${day}/${month}`;
    const cacheKey = `hm_daily_${dateStr}_${lang}`;
    const cached = (() => { try { return JSON.parse(localStorage.getItem(cacheKey)); } catch { return null; } })();

    if (cached) { setDaily(cached); setLoading(false); return; }

    callClaude(
      isHe
        ? "You are a history expert. Respond ONLY in Hebrew. Do not use double quote characters inside text values."
        : "You are a history expert. Do not use double quote characters inside text values.",
      isHe
        ? `היום הוא ${day} ב${["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"][month-1]}. ספר על אירוע היסטורי חשוב שקרה בתאריך זה בהיסטוריה. החזר JSON בלבד: {"title":"שם האירוע","year":"השנה","summary":"תיאור מעניין ומפורט של 3-4 משפטים","significance":"מדוע זה חשוב ומה השפעתו"}`
        : `Today is ${["January","February","March","April","May","June","July","August","September","October","November","December"][month-1]} ${day}. Tell about an important historical event that happened on this date in history. Return JSON only: {"title":"event name","year":"the year","summary":"interesting detailed description of 3-4 sentences","significance":"why this matters and its impact"}`,
      500
    ).then(raw => {
      try {
        const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
        localStorage.setItem(cacheKey, JSON.stringify(parsed));
        setDaily(parsed);
      } catch { setDaily(null); }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [lang]);

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const monthNames = isHe
    ? ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"]
    : ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <div style={{
      background:"linear-gradient(135deg, rgba(201,168,76,.08), rgba(201,168,76,.03))",
      border:`1px solid ${T.borderStrong}`,
      borderRadius:16, padding:"20px 24px", marginBottom:28,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
        <div style={{ background:"rgba(201,168,76,.15)", border:`1px solid ${T.borderStrong}`, borderRadius:10, padding:"6px 12px", display:"flex", flexDirection:"column", alignItems:"center", minWidth:48 }}>
          <div style={{ fontSize:"1.3rem", fontWeight:900, color:T.gold, lineHeight:1 }}>{day}</div>
          <div style={{ fontSize:".6rem", color:T.goldDim, fontWeight:600, textTransform:"uppercase" }}>{monthNames[month].substring(0,3)}</div>
        </div>
        <div>
          <div style={{ fontSize:".68rem", color:T.gold, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase" }}>
            {isHe ? "האירוע היומי" : "Event of the Day"}
          </div>
          <div style={{ fontSize:".76rem", color:T.textMuted }}>{isHe ? "מה קרה היום בהיסטוריה?" : "What happened today in history?"}</div>
        </div>
      </div>

      {loading ? (
        <div style={{ display:"flex", alignItems:"center", gap:10, color:T.textMuted, fontSize:".84rem" }}>
          <Spinner size={16} />
          {isHe ? "טוען אירוע יומי..." : "Loading daily event..."}
        </div>
      ) : daily ? (
        <div>
          <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:8, flexWrap:"wrap" }}>
            <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.15rem", fontWeight:700, color:T.text }}>{daily.title}</div>
            {daily.year && <span style={{ fontSize:".78rem", color:T.gold, fontWeight:600 }}>· {daily.year}</span>}
          </div>
          <div style={{ fontSize:".87rem", color:T.textDim, lineHeight:1.8, marginBottom:10 }}>{daily.summary}</div>
          {daily.significance && (
            <div style={{ fontSize:".82rem", color:T.textMuted, lineHeight:1.7, borderTop:`1px solid ${T.border}`, paddingTop:10 }}>
              <span style={{ color:T.gold, fontWeight:600 }}>{isHe ? "חשיבות: " : "Significance: "}</span>{daily.significance}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default function HomeScreen({ lang, events, level, onOpenEvent }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  const currentLevelNum = LEVEL_ORDER[level] ?? 1;
  const filtered = events.filter(e => (LEVEL_ORDER[e.level] ?? 0) <= currentLevelNum);

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{
        background:"linear-gradient(135deg,#0c0a08,#1a1208 50%,#0c0a08)",
        borderBottom:`1px solid ${T.border}`, padding:"48px 28px 32px", textAlign:"center",
      }}>
        <div style={{ display:"inline-block", background:"rgba(201,168,76,.12)", border:`1px solid ${T.borderStrong}`, color:T.gold, fontSize:".7rem", fontWeight:600, padding:"4px 13px", borderRadius:20, marginBottom:16, letterSpacing:".1em", textTransform:"uppercase" }}>
          {tx.heroTag}
        </div>
        <h1 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"clamp(1.7rem,5vw,3rem)", fontWeight:900, marginBottom:10, lineHeight:1.18 }}>
          {tx.heroTitle}<br /><em style={{ color:T.gold }}>{tx.heroTitleEm}</em>
        </h1>
        <p style={{ color:T.textDim, fontSize:".9rem", maxWidth:460, margin:"0 auto 0", lineHeight:1.7 }}>{tx.heroSub}</p>
        <p style={{ color:T.textMuted, fontSize:".72rem", marginTop:14, opacity:.7 }}>
          האפליקציה נוסדה על ידי בנימין יונה וחברו העיראקי היקר מר אלעד יחיא
        </p>
      </div>

      <div style={{ padding:"24px 28px", maxWidth:1040, margin:"0 auto" }}>
        <DailyEvent lang={lang} isHe={isHe} onOpenEvent={onOpenEvent} />

        <SectionLabel>{tx.exploreLabel} <span style={{ fontSize:".65rem", fontWeight:400, letterSpacing:0, color:T.textMuted, marginRight:6 }}>{tx.exploreHint}</span></SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:13 }}>
          {filtered.map(e => (
            <div key={e.id} onClick={() => onOpenEvent(e.id)} style={{
              background:T.surface, border:`1px solid ${T.border}`,
              borderRadius:12, padding:17, cursor:"pointer", transition:"all .2s",
            }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
                <div style={{ fontSize:".67rem", color:T.goldDim, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase" }}>{e.era}</div>
                <LevelBadge level={e.level} />
              </div>
              <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:".94rem", marginBottom:5, lineHeight:1.35 }}>{e.name}</div>
              <div style={{ fontSize:".74rem", color:T.textMuted }}>📅 {e.year}</div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:8 }}>
                {e.tags.map(tag => (
                  <span key={tag} style={{ fontSize:".65rem", padding:"2px 7px", borderRadius:20, background:T.surface3, color:T.textMuted, border:`1px solid ${T.border}` }}>{tag}</span>
                ))}
              </div>
              <button onClick={ev => { ev.stopPropagation(); onOpenEvent(e.id); }} style={{
                marginTop:10, padding:"4px 9px", fontSize:".71rem", background:"transparent",
                border:`1px solid ${T.borderStrong}`, borderRadius:8, color:T.textDim, cursor:"pointer",
              }}>{tx.details}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
