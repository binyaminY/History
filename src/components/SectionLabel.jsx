import T from "../constants/theme";

export default function SectionLabel({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:13 }}>
      <span style={{ fontSize:".7rem", fontWeight:600, letterSpacing:".12em", color:T.textMuted, textTransform:"uppercase" }}>{children}</span>
      <div style={{ flex:1, height:1, background:T.border }} />
    </div>
  );
}
