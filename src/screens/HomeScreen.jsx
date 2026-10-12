import { useState } from "react";
import T from "../constants/theme";
import TX, { tagLabel } from "../constants/translations";
import { LEVEL_ORDER } from "../constants/events";
import eventImageUrl from "../constants/eventImages";
import SectionLabel from "../components/SectionLabel";

export default function HomeScreen({ lang, events, level, onOpenEvent }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  const currentLevelNum = LEVEL_ORDER[level] ?? 1;
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("all");
  const eras = [...new Set(events.map(e => e.era))];
  const q = query.trim().toLowerCase();
  const filtered = events
    .filter(e => (LEVEL_ORDER[e.level] ?? 0) <= currentLevelNum)
    .filter(e => era === "all" || e.era === era)
    .filter(e => !q || `${e.name} ${e.desc} ${e.era} ${e.year} ${(e.quick || []).join(" ")}`.toLowerCase().includes(q));

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{
        background:"linear-gradient(135deg,#ffffff,#f3f4f6 50%,#ffffff)",
        borderBottom:`1px solid ${T.border}`, padding:"48px 28px 32px", textAlign:"center",
      }}>
        <h1 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"clamp(1.7rem,5vw,3rem)", fontWeight:900, marginBottom:10, lineHeight:1.18 }}>
          {tx.heroTitle}<br /><em style={{ color:T.gold }}>{tx.heroTitleEm}</em>
        </h1>
        <div style={{ display:"inline-block", background:"rgba(37,99,235,.12)", border:`1px solid ${T.borderStrong}`, color:T.gold, fontSize:".78rem", fontWeight:600, padding:"5px 16px", borderRadius:20, marginBottom:14, letterSpacing:".04em" }}>
          {tx.heroTag}
        </div>
        <p style={{ color:T.textDim, fontSize:".9rem", maxWidth:460, margin:"0 auto 0", lineHeight:1.7 }}>{tx.heroSub}</p>
        <p style={{ color:T.textDim, fontSize:".88rem", marginTop:16 }}>
          {tx.createdBy}
        </p>
      </div>

      <div style={{ padding:"24px 28px", maxWidth:1040, margin:"0 auto" }}>

        <input
          type="search" value={query} onChange={ev => setQuery(ev.target.value)}
          placeholder={tx.searchTopics} aria-label={tx.searchTopics}
          style={{ width:"100%", padding:"12px 16px", fontSize:"16px", fontFamily:"inherit", color:T.text, background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:12, outline:"none", marginBottom:12 }}
        />
        <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:8, marginBottom:14 }}>
          {[["all", tx.allEras], ...eras.map(x => [x, x])].map(([key, label]) => (
            <button key={key} onClick={() => setEra(key)} aria-pressed={era === key} style={{
              flexShrink:0, padding:"6px 14px", fontSize:".78rem", fontFamily:"inherit", cursor:"pointer", borderRadius:20,
              background: era === key ? T.gold : T.surface, color: era === key ? "#ffffff" : T.textDim,
              border:`1px solid ${era === key ? T.gold : T.borderStrong}`, fontWeight: era === key ? 700 : 500, whiteSpace:"nowrap",
            }}>{label}</button>
          ))}
        </div>
        <SectionLabel>{tx.exploreLabel} <span style={{ fontSize:".65rem", fontWeight:400, letterSpacing:0, color:T.textMuted, marginRight:6 }}>{tx.exploreHint}</span></SectionLabel>
        {filtered.length === 0 && <div style={{ textAlign:"center", color:T.textMuted, padding:"40px 0", fontSize:".9rem" }}>{tx.noTopics}</div>}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:13 }}>
          {filtered.map(e => (
            <div key={e.id} role="button" tabIndex={0} aria-label={e.name}
              onClick={() => onOpenEvent(e.id)}
              onKeyDown={ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); onOpenEvent(e.id); } }}
              style={{
              background:T.surface, border:`1px solid ${T.border}`,
              borderRadius:12, overflow:"hidden", cursor:"pointer", transition:"all .2s",
            }}>
              {eventImageUrl(e.image) && (
                <img src={eventImageUrl(e.image)} alt={e.name} loading="lazy" style={{
                  width:"100%", height:140, objectFit:"cover", display:"block",
                }} />
              )}
              <div style={{ padding:17 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
                  <div style={{ fontSize:".67rem", color:T.goldDim, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase" }}>{e.era}</div>
                </div>
                <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:".94rem", marginBottom:5, lineHeight:1.35 }}>{e.name}</div>
                <div style={{ fontSize:".74rem", color:T.textMuted }}>📅 {e.year}</div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:8 }}>
                  {e.tags.map(tag => (
                    <span key={tag} style={{ fontSize:".65rem", padding:"2px 7px", borderRadius:20, background:T.surface3, color:T.textMuted, border:`1px solid ${T.border}` }}>{tagLabel(lang, tag)}</span>
                  ))}
                </div>
                <button onClick={ev => { ev.stopPropagation(); onOpenEvent(e.id); }} style={{
                  marginTop:10, padding:"4px 9px", fontSize:".71rem", background:"transparent",
                  border:`1px solid ${T.borderStrong}`, borderRadius:8, color:T.textDim, cursor:"pointer",
                }}>{tx.details}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
