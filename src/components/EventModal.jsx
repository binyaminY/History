import { useState } from "react";
import T from "../constants/theme";
import TX, { tagLabel } from "../constants/translations";
import Btn from "./Btn";

export default function EventModal({ event: e, lang, isHe, onClose, onSave, onAsk }) {
  if (!e) return null;
  const tx = TX[lang];

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(15,23,42,.55)", backdropFilter:"blur(6px)",
      zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:20,
    }}>
      <div onClick={ev => ev.stopPropagation()} style={{
        background:T.surface, border:`1px solid ${T.borderStrong}`,
        borderRadius:20, maxWidth:700, width:"100%", maxHeight:"90vh", overflowY:"auto",
        boxShadow:"0 24px 80px rgba(15,23,42,.25)",
      }}>
        {/* Header */}
        <div style={{
          background:"linear-gradient(135deg, #dbeafe, #eff6ff)",
          borderBottom:`1px solid ${T.borderStrong}`,
          padding:"28px 28px 22px",
          borderRadius:"20px 20px 0 0",
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:".68rem", color:T.gold, fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", background:"rgba(37,99,235,.1)", padding:"3px 10px", borderRadius:20, border:`1px solid ${T.borderStrong}` }}>{e.era}</span>
                {e.tags.map(tag => (
                  <span key={tag} style={{ fontSize:".62rem", padding:"2px 8px", borderRadius:20, background:T.surface3, color:T.textMuted, border:`1px solid ${T.border}` }}>{tagLabel(lang, tag)}</span>
                ))}
              </div>
              <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.9rem", fontWeight:900, lineHeight:1.2, marginBottom:8 }}>{e.name}</div>
              <div style={{ color:T.gold, fontSize:".88rem", fontWeight:600 }}>📅 {e.year}</div>
            </div>
            <button onClick={onClose} style={{ background:T.surface3, border:`1px solid ${T.border}`, borderRadius:10, width:34, height:34, cursor:"pointer", color:T.textMuted, fontSize:"1rem", display:"grid", placeItems:"center", flexShrink:0 }}>✕</button>
          </div>
        </div>

        <div style={{ padding:"24px 28px" }}>
          {/* Description */}
          <div style={{ fontSize:".92rem", color:T.text, lineHeight:1.9, marginBottom:20, padding:"16px 18px", background:"rgba(37,99,235,.04)", borderRadius:12, border:`1px solid ${T.border}` }}>
            {e.desc}
          </div>

          {/* Quick facts */}
          <div style={{ background:T.surface3, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 16px", marginBottom:22 }}>
            <div style={{ fontSize:".68rem", color:T.gold, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", marginBottom:10 }}>⚡ {tx.quickMode}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {e.quick.map((q, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                  <span style={{ color:T.gold, fontSize:"1.1rem", lineHeight:1, flexShrink:0 }}>›</span>
                  <span style={{ fontSize:".86rem", color:T.textDim, lineHeight:1.7 }}>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Extended summary as one plain text bubble */}
          {e.deep && (
            <div style={{ background:T.surface2, border:`1px solid ${T.border}`, borderRadius:12, padding:"18px 20px", marginBottom:16 }}>
              <div style={{ fontSize:".9rem", color:T.textDim, lineHeight:1.95, whiteSpace:"pre-line" }}>
                {e.deep}
              </div>
            </div>
          )}

          {/* Ask the AI about this topic */}
          <button type="button" onClick={onAsk} style={{
            width:"100%", background:"#facc15",
            border:"1px solid #eab308", borderRadius:12, padding:"14px 18px", marginBottom:14,
            cursor:"pointer", display:"flex", alignItems:"center", gap:12, fontFamily:"inherit", textAlign: isHe ? "right" : "left",
          }}>
            <span style={{ fontSize:"1.5rem", flexShrink:0 }}>🤖</span>
            <span style={{ flex:1 }}>
              <span style={{ display:"block", fontSize:".9rem", fontWeight:700, color:"#422006", marginBottom:3 }}>{tx.askBannerTitle}</span>
              <span style={{ display:"block", fontSize:".8rem", color:"#713f12" }}>{tx.askBannerBody}</span>
            </span>
            <span style={{ color:"#422006", fontSize:"1.1rem", flexShrink:0 }}>{isHe ? "‹" : "›"}</span>
          </button>
          {/* Actions */}
          <div style={{ display:"flex", gap:10, marginTop:8, flexWrap:"wrap" }}>
            <Btn onClick={onSave} variant="primary">{tx.modalAdd}</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
