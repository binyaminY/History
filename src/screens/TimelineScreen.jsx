import { useState } from "react";
import T from "../constants/theme";
import TX from "../constants/translations";
import { LEVEL_ORDER } from "../constants/events";

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
    .sort((a,b) => parseInt(a.year) - parseInt(b.year));

  // Group by era
  const grouped = items.reduce((acc, e) => {
    if (!acc[e.era]) acc[e.era] = [];
    acc[e.era].push(e);
    return acc;
  }, {});

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"26px 28px" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.65rem", marginBottom:6 }}>{tx.tlTitle}</h2>
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
        {Object.entries(grouped).map(([era, eraEvents]) => {
          const eraColor = ERA_COLORS[era] || T.gold;
          return (
            <div key={era} style={{ marginBottom:40 }}>
              {/* Era header */}
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                <div style={{ width:12, height:12, borderRadius:"50%", background:eraColor, flexShrink:0, boxShadow:`0 0 12px ${eraColor}88` }} />
                <div style={{ fontSize:".78rem", fontWeight:700, color:eraColor, letterSpacing:".12em", textTransform:"uppercase" }}>{era}</div>
                <div style={{ flex:1, height:1, background:`linear-gradient(to ${isHe?"left":"right"},${eraColor}44,transparent)` }} />
              </div>

              {/* Events in this era */}
              <div style={{ position:"relative", [isHe?"paddingRight":"paddingLeft"]:28 }}>
                {/* Vertical line */}
                <div style={{
                  position:"absolute", [isHe?"right":"left"]:5,
                  top:0, bottom:0, width:2,
                  background:`linear-gradient(to bottom,${eraColor}88,${eraColor}22)`,
                  borderRadius:2,
                }} />

                {eraEvents.map((e, idx) => (
                  <div key={e.id} style={{ position:"relative", marginBottom: idx < eraEvents.length-1 ? 14 : 0 }}>
                    {/* Dot */}
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

                    {/* Card */}
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
      </div>
    </div>
  );
}
