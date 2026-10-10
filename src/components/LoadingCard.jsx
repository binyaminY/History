import T from "../constants/theme";
import Spinner from "./Spinner";

export default function LoadingCard({ text, sub }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"40px 20px", textAlign:"center" }}>
      <Spinner size={48} />
      <div style={{ fontSize:".92rem", fontWeight:700, color:T.text }}>{text}</div>
      {sub && <div style={{ fontSize:".78rem", color:T.textMuted }}>{sub}</div>}
    </div>
  );
}
