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
        position:"relative", overflow:"hidden", textAlign:"center",
        padding:"clamp(44px,8vw,88px) 24px clamp(40px,7vw,64px)",
        background:"radial-gradient(700px 300px at 50% 0%,rgba(59,130,246,.35),transparent 65%),linear-gradient(180deg,#0b1220,#111c36)",
        color:"#e5eaf5",
      }}>
        <div aria-hidden="true" style={{
          position:"absolute", left:0, right:0, bottom:26, height:1,
          background:"linear-gradient(90deg,transparent,rgba(148,163,184,.45),transparent)",
        }} />
        <div aria-hidden="true" style={{ position:"absolute", left:"8%", right:"8%", bottom:21, display:"flex", justifyContent:"space-between", pointerEvents:"none" }}>
          {[0,1,2,3,4,5,6].map(i => (
            <span key={i} style={{ width:i % 3 === 0 ? 11 : 7, height:i % 3 === 0 ? 11 : 7, marginTop:i % 3 === 0 ? -1 : 1, borderRadius:"50%", background:i % 3 === 0 ? "#fbbf24" : "rgba(148,163,184,.7)", boxShadow:i % 3 === 0 ? "0 0 14px rgba(251,191,36,.7)" : "none" }} />
          ))}
        </div>
        <div style={{ position:"relative", maxWidth:760, margin:"0 auto", paddingBottom:30 }}>
          <h1 style={{
            fontFamily:"'Rubik','Heebo','Comfortaa',sans-serif", fontSize:"clamp(2.2rem,7vw,4.2rem)",
            fontWeight:800, lineHeight:1.1, letterSpacing:"-.02em", marginBottom:20, color:"#ffffff",
          }}>
            {tx.heroTitle}<br />
            <span style={{ color:"#fbbf24" }}>{tx.heroTitleEm}</span>
          </h1>
          <p style={{ color:"#b6c2dc", fontSize:"clamp(.95rem,2.2vw,1.1rem)", maxWidth:520, margin:"0 auto", lineHeight:1.75 }}>{tx.heroSub}</p>
          <p style={{ color:"#7f8fb0", fontSize:".78rem", marginTop:22 }}>{tx.createdBy}</p>
        </div>
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
