import T from "../constants/theme";
import TX from "../constants/translations";
import SectionLabel from "../components/SectionLabel";

export default function SavedScreen({ lang, saved, onRemove }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  return (
    <div style={{ flex:1, overflowY:"auto", padding:"26px 28px" }}>
      <div style={{ maxWidth:740, margin:"0 auto" }}>
        <SectionLabel>{isHe ? "הספרייה שלך" : "Your Library"}</SectionLabel>
        <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.65rem", marginBottom:20 }}>{tx.savedTitle}</h2>
        {saved.length === 0 ? (
          <div style={{ textAlign:"center", padding:"52px 20px", color:T.textMuted }}>
            <div style={{ fontSize:"2.8rem", marginBottom:13, opacity:.4 }}>🔖</div>
            <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.15rem", color:T.textDim, marginBottom:7 }}>{tx.savedEmpty}</div>
            <p>{tx.savedEmptySub}</p>
          </div>
        ) : saved.map((item, i) => (
          <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:11, padding:"15px 17px", marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:".69rem", color:T.goldDim, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", marginBottom:3 }}>{item.type}</div>
              <div style={{ fontSize:".86rem", color:T.text }}>{item.name}</div>
            </div>
            <button onClick={() => onRemove(i)} style={{ background:"none", border:"none", color:T.textMuted, cursor:"pointer", fontSize:".95rem" }}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}
