import T from "../constants/theme";

export default function Btn({ onClick, disabled, children, variant = "primary", style: extra = {} }) {
  const base = {
    border:"none", borderRadius:10, padding:"10px 20px",
    fontWeight:700, fontSize:".86rem", cursor: disabled ? "not-allowed" : "pointer",
    transition:"all .2s", opacity: disabled ? .5 : 1, fontFamily:"inherit",
  };
  const styles = {
    primary: { background: T.gold, color:"#0c0a08" },
    secondary: { background:"transparent", color:T.text, border:`1px solid ${T.borderStrong}` },
    generate: { width:"100%", background:"linear-gradient(135deg,#c9a84c,#a07830)", color:"#0c0a08", borderRadius:11, padding:14, fontSize:".92rem", display:"flex", alignItems:"center", justifyContent:"center", gap:9 },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...styles[variant], ...extra }}>{children}</button>;
}
