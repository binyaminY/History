import { useState } from "react";
import T from "../constants/theme";

export default function ContactModal({ isHe, onClose }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const send = async () => {
    if (!message.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.8)", backdropFilter:"blur(8px)",
      zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:T.surface, border:`1px solid ${T.borderStrong}`,
        borderRadius:20, maxWidth:480, width:"100%",
        boxShadow:"0 24px 80px rgba(0,0,0,.6)",
      }}>
        {/* Header */}
        <div style={{
          padding:"22px 24px 18px",
          borderBottom:`1px solid ${T.border}`,
          display:"flex", justifyContent:"space-between", alignItems:"center",
        }}>
          <div>
            <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.1rem", fontWeight:700 }}>
              {isHe ? "✉️ צור קשר" : "✉️ Contact Us"}
            </div>
            <div style={{ fontSize:".75rem", color:T.textMuted, marginTop:4 }}>
              {isHe ? "נשמח לשמוע ממך!" : "We'd love to hear from you!"}
            </div>
          </div>
          <button onClick={onClose} style={{
            background:T.surface3, border:`1px solid ${T.border}`, borderRadius:10,
            width:32, height:32, cursor:"pointer", color:T.textMuted, fontSize:"1rem",
            display:"grid", placeItems:"center",
          }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding:"22px 24px" }}>
          {status === "done" ? (
            <div style={{ textAlign:"center", padding:"24px 0" }}>
              <div style={{ fontSize:"2.5rem", marginBottom:12 }}>✅</div>
              <div style={{ fontWeight:700, fontSize:"1rem", marginBottom:6 }}>
                {isHe ? "ההודעה נשלחה!" : "Message sent!"}
              </div>
              <div style={{ color:T.textMuted, fontSize:".85rem" }}>
                {isHe ? "נחזור אליך בהקדם." : "We'll get back to you soon."}
              </div>
            </div>
          ) : (
            <>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={isHe ? "שמך (אופציונלי)" : "Your name (optional)"}
                style={{
                  width:"100%", background:T.surface2, border:`1px solid ${T.border}`,
                  borderRadius:10, padding:"11px 14px", color:T.text, fontFamily:"inherit",
                  fontSize:"16px", outline:"none", marginBottom:12,
                  textAlign: isHe ? "right" : "left",
                }}
              />
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={isHe ? "כתוב את הודעתך כאן..." : "Write your message here..."}
                rows={5}
                style={{
                  width:"100%", background:T.surface2, border:`1px solid ${T.border}`,
                  borderRadius:10, padding:"11px 14px", color:T.text, fontFamily:"inherit",
                  fontSize:"16px", outline:"none", resize:"vertical", minHeight:120,
                  textAlign: isHe ? "right" : "left",
                }}
              />
              {status === "error" && (
                <div style={{ color:T.red, fontSize:".8rem", marginTop:8 }}>
                  {isHe ? "שגיאה בשליחה. נסה שוב." : "Error sending. Try again."}
                </div>
              )}
              <button
                onClick={send}
                disabled={!message.trim() || status === "sending"}
                style={{
                  marginTop:14, width:"100%", padding:"12px",
                  background: message.trim() ? T.gold : T.surface3,
                  color: message.trim() ? "#0c0a08" : T.textMuted,
                  border:"none", borderRadius:10, fontSize:".95rem",
                  fontWeight:700, cursor: message.trim() ? "pointer" : "default",
                  fontFamily:"inherit", transition:"all .2s",
                }}
              >
                {status === "sending"
                  ? (isHe ? "שולח..." : "Sending...")
                  : (isHe ? "שלח הודעה ✉️" : "Send Message ✉️")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
