import { useState, useEffect } from "react";
import T from "../constants/theme";
import TX from "../constants/translations";
import { LEVEL_ORDER } from "../constants/events";
import { callClaude } from "../api/claude";
import Spinner from "../components/Spinner";

const ERA_COLORS = {
  "עולם עתיק": "#c9a84c",
  "ימי הביניים": "#7a6430",
  "המאה ה-18": "#4ca86a",
  "המאה ה-19": "#4c8ac9",
  "המאה ה-20": "#c94c4c",
  "Ancient World": "#c9a84c",
  "Middle Ages": "#7a6430",
  "18th Century": "#4ca86a",
  "19th Century": "#4c8ac9",
  "20th Century": "#c94c4c",
};

function extractSortYear(yearStr) {
  const str = String(yearStr);
  const isBCE = /לפנה"ס|BC/i.test(str);
  const match = str.match(/\b(\d{4})\b/) || str.match(/\d+/);
  if (!match) return 0;
  const year = parseInt(match[1] ?? match[0]);
  return isBCE ? -year : year;
}

const ERA_ORDER = {
  "עולם עתיק": 0, "ימי הביניים": 1, 'המאה ה-18': 2, "המאה ה-19": 3, "המאה ה-20": 4,
  "Ancient World": 0, "Middle Ages": 1, "18th Century": 2, "19th Century": 3, "20th Century": 4,
};

const THEMES_HE = [
  { id:"empires", label:"🏛 אימפריות", color:"#c9a84c" },
  { id:"wars", label:"⚔️ מלחמות", color:"#c94c4c" },
  { id:"science", label:"🔬 מדע וטכנולוגיה", color:"#4c8ac9" },
  { id:"revolutions", label:"🔥 מהפכות", color:"#c97a4c" },
  { id:"religions", label:"🕌 דתות ואמונות", color:"#8a6ac9" },
];

const THEMES_EN = [
  { id:"empires", label:"🏛 Empires", color:"#c9a84c" },
  { id:"wars", label:"⚔️ Wars", color:"#c94c4c" },
  { id:"science", label:"🔬 Science & Tech", color:"#4c8ac9" },
  { id:"revolutions", label:"🔥 Revolutions", color:"#c97a4c" },
  { id:"religions", label:"🕌 Religions", color:"#8a6ac9" },
];

function parseTimelineJson(raw) {
  const clean = raw.replace(/```json|```/gi, "").trim();
  const arrStart = clean.indexOf("[");
  if (arrStart !== -1) {
    try {
      const parsed = JSON.parse(clean.slice(arrStart));
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
  }
  try {
    const parsed = JSON.parse(clean);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {}
  return null;
}

function AITimeline({ themeId, themeLabel, themeColor, isHe, lang }) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const load = () => {
    const cacheKey = `hm_theme_v1_${themeId}_${lang}`;
    const cached = (() => { try { return JSON.parse(localStorage.getItem(cacheKey)); } catch { return null; } })();
    if (cached && Array.isArray(cached) && cached.length > 0) {
      setItems(cached); setLoading(false); return;
    }
    setLoading(true); setError(false); setItems(null);

    const themeNames = {
      empires: isHe ? "אימפריות גדולות בהיסטוריה" : "great empires throughout history",
      wars: isHe ? "מלחמות ועימותים מכריעים בהיסטוריה" : "decisive wars and conflicts throughout history",
      science: isHe ? "המצאות ופריצות דרך מדעיות בהיסטוריה" : "scientific inventions and breakthroughs throughout history",
      revolutions: isHe ? "מהפכות פוליטיות וחברתיות בהיסטוריה" : "political and social revolutions throughout history",
      religions: isHe ? "דתות ותנועות אמונה בהיסטוריה" : "religions and belief movements throughout history",
    };

    const themeName = themeNames[themeId] || themeLabel;

    callClaude(
      isHe
        ? "אתה היסטוריון מומחה. ענה תמיד בעברית. אל תשתמש במרכאות כפולות בתוך ערכי JSON — השתמש במרכאות בודדות."
        : "You are an expert historian. Never use double-quote characters inside JSON string values — use single quotes instead.",
      isHe
        ? `צור ציר זמן היסטורי מקיף של הנושא: ${themeName}. כלול בין 10 ל-15 אירועים מרכזיים מהתקופה הקדומה ביותר שיש תיעוד עליה ועד ימינו. כל אירוע חייב להיות ממוין כרונולוגית. החזר JSON בלבד — מערך עם 10-15 אובייקטים:\n[{ "year": "...", "title": "...", "description": "2-3 משפטים על האירוע וחשיבותו." }]`
        : `Create a comprehensive historical timeline of the topic: ${themeName}. Include between 10 and 15 key events from the earliest recorded period to today. Events must be in chronological order. Return JSON only — an array with 10-15 objects:\n[{ "year": "...", "title": "...", "description": "2-3 sentences about the event and its significance." }]`,
      2000
    ).then(raw => {
      const arr = parseTimelineJson(raw);
      if (arr) {
        localStorage.setItem(cacheKey, JSON.stringify(arr));
        setItems(arr);
      } else {
        setError(true);
      }
      setLoading(false);
    }).catch(() => { setError(true); setLoading(false); });
  };

  useEffect(() => { load(); }, [themeId, lang]);

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", gap:10, color:T.textMuted, fontSize:".84rem", padding:"20px 0" }}>
      <Spinner size={18} />
      {isHe ? `טוען ציר זמן: ${themeLabel}...` : `Loading timeline: ${themeLabel}...`}
    </div>
  );

  if (error) return (
    <div style={{ color:T.textMuted, fontSize:".84rem", padding:"20px 0" }}>
      {isHe ? "שגיאה בטעינת ציר הזמן. נסה שוב." : "Error loading timeline. Try again."}
      <button onClick={() => { setError(false); load(); }} style={{
        marginRight:10, marginLeft:10, background:"transparent", border:`1px solid ${T.border}`,
        borderRadius:8, padding:"3px 10px", color:T.gold, cursor:"pointer", fontSize:".8rem", fontFamily:"inherit",
      }}>{isHe ? "נסה שוב" : "Retry"}</button>
    </div>
  );

  return (
    <div style={{ position:"relative", [isHe?"paddingRight":"paddingLeft"]:28 }}>
      <div style={{
        position:"absolute", [isHe?"right":"left"]:5,
        top:0, bottom:0, width:2,
        background:`linear-gradient(to bottom,${themeColor}88,${themeColor}22)`,
        borderRadius:2,
      }} />
      {items.map((item, idx) => (
        <div key={idx} style={{ position:"relative", marginBottom: idx < items.length-1 ? 18 : 0 }}>
          <div style={{
            position:"absolute",
            [isHe?"right":"left"]:-1,
            top:18,
            width:14, height:14, borderRadius:"50%",
            background:T.surface,
            border:`2.5px solid ${themeColor}`,
            boxShadow:`0 0 0 3px ${T.bg}`,
            zIndex:1,
          }} />
          <div style={{
            background:T.surface,
            border:`1px solid ${T.border}`,
            borderRadius:13, padding:"15px 18px",
          }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:6, flexWrap:"wrap" }}>
              <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1rem", fontWeight:700, lineHeight:1.3 }}>{item.title}</div>
              <div style={{
                background:`${themeColor}18`, border:`1px solid ${themeColor}44`,
                borderRadius:8, padding:"3px 10px",
                fontSize:".72rem", color:themeColor, fontWeight:700, whiteSpace:"nowrap", flexShrink:0,
              }}>📅 {item.year}</div>
            </div>
            <div style={{ fontSize:".84rem", color:T.textDim, lineHeight:1.7 }}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TimelineScreen({ lang, events, level, onOpenEvent }) {
  const [filter, setFilter] = useState("all");
  const [mode, setMode] = useState("events"); // "events" | "ai"
  const [selectedTheme, setSelectedTheme] = useState(null);
  const isHe = lang === "he";
  const tx = TX[lang];
  const themes = isHe ? THEMES_HE : THEMES_EN;

  const filters = [
    { k:"all", l:tx.filterAll },
    { k:"war", l:tx.filterWar },
    { k:"revolution", l:tx.filterRev },
    { k:"politics", l:tx.filterPol },
    { k:"science", l:tx.filterSci },
  ];

  const currentLevelNum = LEVEL_ORDER[level] ?? 1;
  const items = [...events]
    .filter(e => (LEVEL_ORDER[e.level]??0) <= currentLevelNum && (filter==="all" || e.tags.includes(filter)))
    .sort((a,b) => extractSortYear(a.year) - extractSortYear(b.year));

  const grouped = items.reduce((acc, e) => {
    if (!acc[e.era]) acc[e.era] = [];
    acc[e.era].push(e);
    return acc;
  }, {});

  const sortedEras = Object.keys(grouped).sort(
    (a, b) => (ERA_ORDER[a] ?? 99) - (ERA_ORDER[b] ?? 99)
  );

  const activeTheme = themes.find(t => t.id === selectedTheme);

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"26px 28px" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.65rem", marginBottom:6 }}>{tx.tlTitle}</h2>

        {/* Mode toggle */}
        <div style={{ display:"flex", gap:6, marginBottom:22, background:T.surface2, border:`1px solid ${T.border}`, borderRadius:12, padding:4, width:"fit-content" }}>
          <button onClick={() => setMode("events")} style={{
            padding:"7px 18px", borderRadius:9, border:"none", fontFamily:"inherit",
            background: mode==="events" ? T.gold : "transparent",
            color: mode==="events" ? "#0c0a08" : T.textDim,
            cursor:"pointer", fontSize:".8rem", fontWeight: mode==="events" ? 700 : 500,
            transition:"all .2s",
          }}>{isHe ? "🏛 אירועים" : "🏛 Events"}</button>
          <button onClick={() => setMode("ai")} style={{
            padding:"7px 18px", borderRadius:9, border:"none", fontFamily:"inherit",
            background: mode==="ai" ? T.gold : "transparent",
            color: mode==="ai" ? "#0c0a08" : T.textDim,
            cursor:"pointer", fontSize:".8rem", fontWeight: mode==="ai" ? 700 : 500,
            transition:"all .2s",
          }}>{isHe ? "✨ ציר נושאי AI" : "✨ AI Theme Timeline"}</button>
        </div>

        {mode === "events" && (
          <>
            <p style={{ color:T.textMuted, fontSize:".82rem", marginBottom:22 }}>
              {isHe ? `${items.length} אירועים` : `${items.length} events`}
            </p>

            {/* Filters */}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:32 }}>
              {filters.map(f => (
                <button key={f.k} onClick={() => setFilter(f.k)} style={{
                  padding:"6px 14px", borderRadius:20, fontFamily:"inherit",
                  border:`1px solid ${filter===f.k ? T.gold : T.border}`,
                  background: filter===f.k ? "rgba(201,168,76,.12)" : "transparent",
                  color: filter===f.k ? T.gold : T.textDim,
                  fontSize:".78rem", cursor:"pointer", fontWeight: filter===f.k ? 700 : 400,
                  transition:"all .2s",
                }}>{f.l}</button>
              ))}
            </div>

            {/* Timeline grouped by era */}
            {sortedEras.map(era => {
              const eraEvents = grouped[era];
              const eraColor = ERA_COLORS[era] || T.gold;
              return (
                <div key={era} style={{ marginBottom:40 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                    <div style={{ width:12, height:12, borderRadius:"50%", background:eraColor, flexShrink:0, boxShadow:`0 0 12px ${eraColor}88` }} />
                    <div style={{ fontSize:".78rem", fontWeight:700, color:eraColor, letterSpacing:".12em", textTransform:"uppercase" }}>{era}</div>
                    <div style={{ flex:1, height:1, background:`linear-gradient(to ${isHe?"left":"right"},${eraColor}44,transparent)` }} />
                  </div>

                  <div style={{ position:"relative", [isHe?"paddingRight":"paddingLeft"]:28 }}>
                    <div style={{
                      position:"absolute", [isHe?"right":"left"]:5,
                      top:0, bottom:0, width:2,
                      background:`linear-gradient(to bottom,${eraColor}88,${eraColor}22)`,
                      borderRadius:2,
                    }} />

                    {eraEvents.map((e, idx) => (
                      <div key={e.id} style={{ position:"relative", marginBottom: idx < eraEvents.length-1 ? 14 : 0 }}>
                        <div style={{
                          position:"absolute",
                          [isHe?"right":"left"]:-1,
                          top:18,
                          width:14, height:14, borderRadius:"50%",
                          background:T.surface,
                          border:`2.5px solid ${eraColor}`,
                          boxShadow:`0 0 0 3px ${T.bg}`,
                          zIndex:1,
                        }} />

                        <div
                          onClick={() => onOpenEvent(e.id)}
                          style={{
                            background:T.surface,
                            border:`1px solid ${T.border}`,
                            borderRadius:13, padding:"15px 18px",
                            cursor:"pointer", transition:"all .2s",
                          }}
                          onMouseEnter={el => { el.currentTarget.style.border=`1px solid ${eraColor}66`; el.currentTarget.style.background=T.surface2; }}
                          onMouseLeave={el => { el.currentTarget.style.border=`1px solid ${T.border}`; el.currentTarget.style.background=T.surface; }}
                        >
                          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:6 }}>
                            <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1rem", fontWeight:700, lineHeight:1.3 }}>{e.name}</div>
                            <div style={{
                              background:`${eraColor}18`, border:`1px solid ${eraColor}44`,
                              borderRadius:8, padding:"3px 10px",
                              fontSize:".72rem", color:eraColor, fontWeight:700, whiteSpace:"nowrap", flexShrink:0,
                            }}>📅 {e.year}</div>
                          </div>
                          <div style={{ fontSize:".82rem", color:T.textDim, lineHeight:1.65, marginBottom:10 }}>
                            {e.desc.substring(0, 130)}...
                          </div>
                          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                            <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                              {e.tags.map(tag => (
                                <span key={tag} style={{ fontSize:".62rem", padding:"2px 7px", borderRadius:20, background:T.surface3, color:T.textMuted, border:`1px solid ${T.border}` }}>{tag}</span>
                              ))}
                            </div>
                            <button
                              onClick={ev => { ev.stopPropagation(); onOpenEvent(e.id); }}
                              style={{
                                padding:"4px 12px", fontSize:".72rem", background:"transparent",
                                border:`1px solid ${eraColor}55`, borderRadius:8,
                                color:eraColor, cursor:"pointer", fontFamily:"inherit",
                              }}
                            >{tx.details} →</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {mode === "ai" && (
          <div>
            <p style={{ color:T.textMuted, fontSize:".82rem", marginBottom:20 }}>
              {isHe ? "בחר נושא וה-AI יצור ציר זמן מקיף מהעת העתיקה ועד היום" : "Choose a topic and AI will generate a full timeline from ancient times to today"}
            </p>

            {/* Theme selector */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:32 }}>
              {themes.map(t => (
                <button key={t.id} onClick={() => setSelectedTheme(t.id)} style={{
                  padding:"9px 18px", borderRadius:20, fontFamily:"inherit",
                  border:`1px solid ${selectedTheme===t.id ? t.color : T.border}`,
                  background: selectedTheme===t.id ? `${t.color}18` : "transparent",
                  color: selectedTheme===t.id ? t.color : T.textDim,
                  fontSize:".82rem", cursor:"pointer", fontWeight: selectedTheme===t.id ? 700 : 400,
                  transition:"all .2s",
                }}>{t.label}</button>
              ))}
            </div>

            {/* AI Timeline */}
            {activeTheme && (
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
                  <div style={{ width:12, height:12, borderRadius:"50%", background:activeTheme.color, flexShrink:0, boxShadow:`0 0 12px ${activeTheme.color}88` }} />
                  <div style={{ fontSize:".78rem", fontWeight:700, color:activeTheme.color, letterSpacing:".12em", textTransform:"uppercase" }}>{activeTheme.label}</div>
                  <div style={{ flex:1, height:1, background:`linear-gradient(to ${isHe?"left":"right"},${activeTheme.color}44,transparent)` }} />
                </div>
                <AITimeline
                  key={activeTheme.id + lang}
                  themeId={activeTheme.id}
                  themeLabel={activeTheme.label}
                  themeColor={activeTheme.color}
                  isHe={isHe}
                  lang={lang}
                />
              </div>
            )}

            {!selectedTheme && (
              <div style={{
                textAlign:"center", padding:"48px 24px",
                border:`1px dashed ${T.border}`, borderRadius:16,
                color:T.textMuted, fontSize:".88rem",
              }}>
                {isHe ? "👆 בחר נושא כדי להתחיל" : "👆 Choose a topic to begin"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
