import { useState } from "react";
import T from "../constants/theme";
import TX from "../constants/translations";
import Btn from "./Btn";
import Spinner from "./Spinner";
import { callClaude } from "../api/claude";

export default function EventModal({ event: e, lang, isHe, onClose, onSave, onAsk }) {
  if (!e) return null;
  const tx = TX[lang];
  const [expanded, setExpanded] = useState(false);
  const [deepInfo, setDeepInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDeepInfo = async () => {
    setLoading(true);
    setExpanded(true);
    try {
      const text = await callClaude(
        isHe
          ? "אתה פרופסור להיסטוריה. כתוב בעברית בלבד. כתוב סיכום מפורט, מעמיק ומעניין."
          : "You are a history professor. Write a detailed, in-depth and engaging summary.",
        isHe
          ? `כתוב סיכום מקיף ומפורט על "${e.name}" (${e.year}). כלול: דמויות מפתח, גורמים וסיבות, השפעה היסטורית, עובדות מעניינות ומפתיעות, ומורשת עד היום. כתוב לפחות 300 מילים בצורה מרתקת.`
          : `Write a comprehensive and detailed summary of "${e.name}" (${e.year}). Include: key figures, causes and factors, historical impact, interesting and surprising facts, and legacy to this day. Write at least 300 words in an engaging way.`,
        1500
      );
      setDeepInfo(text);
    } catch {
      setDeepInfo(isHe ? "שגיאה בטעינת המידע. נסה שוב." : "Error loading info. Try again.");
    }
    setLoading(false);
  };

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.85)", backdropFilter:"blur(8px)",
      zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:20,
    }}>
      <div onClick={ev => ev.stopPropagation()} style={{
        background:T.surface, border:`1px solid ${T.borderStrong}`,
        borderRadius:20, maxWidth:700, width:"100%", maxHeight:"90vh", overflowY:"auto",
        boxShadow:"0 24px 80px rgba(0,0,0,.6)",
      }}>
        {/* Header */}
        <div style={{
          background:"linear-gradient(135deg, #1a1208, #0c0a08)",
          borderBottom:`1px solid ${T.borderStrong}`,
          padding:"28px 28px 22px",
          borderRadius:"20px 20px 0 0",
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:".68rem", color:T.gold, fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", background:"rgba(201,168,76,.1)", padding:"3px 10px", borderRadius:20, border:`1px solid ${T.borderStrong}` }}>{e.era}</span>
                {e.tags.map(tag => (
                  <span key={tag} style={{ fontSize:".62rem", padding:"2px 8px", borderRadius:20, background:T.surface3, color:T.textMuted, border:`1px solid ${T.border}` }}>{tag}</span>
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
          <div style={{ fontSize:".92rem", color:T.text, lineHeight:1.9, marginBottom:20, padding:"16px 18px", background:"rgba(201,168,76,.04)", borderRadius:12, border:`1px solid ${T.border}` }}>
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

          {/* Deep info button / content */}
          {!expanded && (
            <button onClick={loadDeepInfo} style={{
              width:"100%", background:"linear-gradient(135deg,rgba(201,168,76,.12),rgba(201,168,76,.06))",
              border:`1px solid ${T.borderStrong}`, borderRadius:12, padding:"15px 20px",
              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10,
              marginBottom:8, fontFamily:"inherit",
            }}>
              <span style={{ fontSize:"1.1rem" }}>📖</span>
              <span style={{ fontSize:".95rem", fontWeight:700, color:T.gold }}>
                {isHe ? "למידע מקיף" : "Comprehensive Info"}
              </span>
            </button>
          )}

          {expanded && (
            <div style={{ background:T.surface2, border:`1px solid ${T.border}`, borderRadius:12, padding:"18px 20px", marginBottom:16 }}>
              <div style={{ fontSize:".68rem", color:T.gold, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", marginBottom:12 }}>📖 {isHe ? "סיכום מקיף" : "Comprehensive Summary"}</div>
              {loading ? (
                <div style={{ display:"flex", alignItems:"center", gap:10, color:T.textMuted, fontSize:".86rem", padding:"10px 0" }}>
                  <Spinner size={18} />
                  {isHe ? "ה-AI מכין סיכום מפורט..." : "AI is preparing detailed summary..."}
                </div>
              ) : (
                <div style={{ fontSize:".88rem", color:T.textDim, lineHeight:1.9 }}>
                  {deepInfo.split("\n").map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <div key={i} style={{ height: 8 }} />;
                    // Bullet lines: start with * or -
                    const isBullet = /^[*\-•]\s/.test(trimmed);
                    const text = trimmed.replace(/^[*\-•]\s*/, "");
                    // Bold: **text**
                    const parts = text.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
                      p.startsWith("**") && p.endsWith("**")
                        ? <strong key={j} style={{ color: T.gold, fontWeight: 700 }}>{p.slice(2, -2)}</strong>
                        : p
                    );
                    if (isBullet) return (
                      <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:6 }}>
                        <span style={{ color:T.gold, fontWeight:700, flexShrink:0, marginTop:2 }}>›</span>
                        <span>{parts}</span>
                      </div>
                    );
                    return <p key={i} style={{ marginBottom:10 }}>{parts}</p>;
                  })}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div style={{ display:"flex", gap:10, marginTop:8, flexWrap:"wrap" }}>
            <Btn onClick={onSave} variant="primary">{tx.modalAdd}</Btn>
            <Btn onClick={onAsk} variant="secondary">{tx.modalAsk}</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
