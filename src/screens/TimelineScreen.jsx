import { useState } from "react";
import T, { isDark } from "../constants/theme";
import TX, { tagLabel } from "../constants/translations";
import { LEVEL_ORDER } from "../constants/events";

const ERA_COLORS = {
  "עולם עתיק": "#b45309",
  "ימי הביניים": "#7c3aed",
  "המאה ה-15–16": "#db2777",
  "המאה ה-18": "#16a34a",
  "המאה ה-19": "#2563eb",
  "המאה ה-20": "#dc2626",
  "המאה ה-21": "#0891b2",
  "Ancient World": "#b45309",
  "Middle Ages": "#7c3aed",
  "15th–16th Century": "#db2777",
  "18th Century": "#16a34a",
  "19th Century": "#2563eb",
  "20th Century": "#dc2626",
  "21st Century": "#0891b2",
};

const DARK_SHIFT = {
  "#b45309": "#fbbf24", "#7c3aed": "#a78bfa", "#db2777": "#f472b6", "#16a34a": "#4ade80",
  "#2563eb": "#60a5fa", "#dc2626": "#f87171", "#0891b2": "#22d3ee",
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
  "עולם עתיק": 0, "ימי הביניים": 1, "המאה ה-15–16": 2, "המאה ה-18": 3, "המאה ה-19": 4, "המאה ה-20": 5, "המאה ה-21": 6,
  "Ancient World": 0, "Middle Ages": 1, "15th–16th Century": 2, "18th Century": 3, "19th Century": 4, "20th Century": 5, "21st Century": 6,
};

export default function TimelineScreen({ lang, events, level, onOpenEvent }) {
  const [filter, setFilter] = useState("all");
  const isHe = lang === "he";
  const tx = TX[lang];

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

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"26px 28px" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.65rem", marginBottom:6 }}>{tx.tlTitle}</h2>
        <p style={{ color:T.textMuted, fontSize:".82rem", marginBottom:22 }}>
          {tx.eventsCount(items.length)}
        </p>

        {/* Filters */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:32 }}>
          {filters.map(f => (
            <button key={f.k} onClick={() => setFilter(f.k)} style={{
              padding:"6px 14px", borderRadius:20, fontFamily:"inherit",
              border:`1px solid ${filter===f.k ? T.gold : T.border}`,
              background: filter===f.k ? T.accentSoft : "transparent",
              color: filter===f.k ? T.gold : T.textDim,
              fontSize:".78rem", cursor:"pointer", fontWeight: filter===f.k ? 700 : 400,
              transition:"all .2s",
            }}>{f.l}</button>
          ))}
        </div>

        {/* Timeline grouped by era */}
        {sortedEras.map(era => {
          const eraEvents = grouped[era];
          const baseColor = ERA_COLORS[era] || "#2563eb";
          const eraColor = isDark() ? (DARK_SHIFT[baseColor] || baseColor) : baseColor;
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
                      role="button" tabIndex={0} aria-label={e.name}
                      onClick={() => onOpenEvent(e.id)}
                      onKeyDown={ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); onOpenEvent(e.id); } }}
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
                        {e.desc}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                          {e.tags.map(tag => (
                            <span key={tag} style={{ fontSize:".62rem", padding:"2px 7px", borderRadius:20, background:T.surface3, color:T.textMuted, border:`1px solid ${T.border}` }}>{tagLabel(lang, tag)}</span>
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
      </div>
    </div>
  );
}
