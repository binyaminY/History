import { useEffect, useRef } from "react";
import T from "../constants/theme";

export const TEXT_SIZES = [100, 112, 125, 140, 160];

export const DEFAULT_PREFS = {
  size: 1,            // index into TEXT_SIZES
  contrast: false,    // high contrast colours
  motion: false,      // stop animations and transitions
  art: true,          // decorative background illustrations
  links: false,       // always underline links
  font: false,        // plain, highly legible font
  spacing: 0,         // 0 normal, 1 wide
  focus: false,       // thicker keyboard focus ring
};

const STR = {
  he: {
    title: "הגדרות נגישות והצגה",
    close: "סגור הגדרות",
    theme: "מצב תצוגה", system: "לפי המערכת", light: "בהיר", dark: "כהה",
    size: "גודל טקסט", smaller: "הקטן טקסט", larger: "הגדל טקסט",
    contrast: "ניגודיות גבוהה", contrastHint: "צבעים חדים וגבולות בולטים",
    font: "גופן קריא", fontHint: "גופן פשוט וברור במקום גופן דקורטיבי",
    spacing: "ריווח טקסט מורחב", spacingHint: "יותר רווח בין שורות ומילים",
    links: "קו תחתון לקישורים", linksHint: "סימון קישורים גם בלי צבע",
    focus: "הדגשת פוקוס מקלדת", focusHint: "מסגרת עבה סביב האלמנט הנבחר",
    motion: "הפסקת אנימציות", motionHint: "ללא תנועה, מעברים או הבהובים",
    art: "איורי רקע", artHint: "הצג את האיורים הדקורטיביים ברקע",
    reset: "איפוס כל ההגדרות",
    helpTitle: "ניווט במקלדת",
    help: ["Tab – מעבר בין אלמנטים", "Enter / רווח – הפעלה", "Esc – סגירת חלון", "קישור \"דלג לתוכן\" מופיע בלחיצה הראשונה על Tab"],
    note: "ההגדרות נשמרות במכשיר הזה בלבד.",
  },
  en: {
    title: "Accessibility & display settings",
    close: "Close settings",
    theme: "Colour mode", system: "System", light: "Light", dark: "Dark",
    size: "Text size", smaller: "Smaller text", larger: "Larger text",
    contrast: "High contrast", contrastHint: "Sharper colours and stronger borders",
    font: "Readable font", fontHint: "A plain, clear font instead of decorative ones",
    spacing: "Wider text spacing", spacingHint: "More space between lines and words",
    links: "Underline links", linksHint: "Mark links without relying on colour",
    focus: "Stronger keyboard focus", focusHint: "A thick outline around the focused item",
    motion: "Stop animations", motionHint: "No movement, transitions or flashing",
    art: "Background illustrations", artHint: "Show the decorative artwork behind the page",
    reset: "Reset all settings",
    helpTitle: "Keyboard navigation",
    help: ["Tab – move between items", "Enter / Space – activate", "Esc – close a window", "A \"Skip to content\" link appears on the first Tab"],
    note: "Settings are saved on this device only.",
  },
};

function Switch({ checked, onChange, label, hint, id }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:14, padding:"12px 0", borderBottom:`1px solid ${T.border}` }}>
      <div style={{ minWidth:0 }}>
        <div id={id} style={{ fontSize:".93rem", fontWeight:700, color:T.text }}>{label}</div>
        <div style={{ fontSize:".78rem", color:T.textMuted, marginTop:2, lineHeight:1.5 }}>{hint}</div>
      </div>
      <button type="button" role="switch" aria-checked={checked} aria-labelledby={id} onClick={() => onChange(!checked)} style={{
        flexShrink:0, width:50, height:28, borderRadius:14, padding:3, cursor:"pointer",
        background: checked ? T.gold : T.surface3, border:`2px solid ${checked ? T.gold : T.borderStrong}`,
        display:"flex", justifyContent: checked ? "flex-end" : "flex-start", transition:"background .2s",
      }}>
        <span style={{ width:18, height:18, borderRadius:"50%", background: checked ? T.onAccent : T.textMuted, display:"block" }} />
      </button>
    </div>
  );
}

export default function SettingsPanel({ open, onClose, isHe, prefs, setPref, themePref, setThemePref, onReset }) {
  const s = STR[isHe ? "he" : "en"];
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Escape closes, Tab stays inside, and focus returns to the settings button afterwards.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement;
    const onKey = (ev) => {
      if (ev.key === "Escape") { onClose(); return; }
      if (ev.key !== "Tab" || !panelRef.current) return;
      const f = [...panelRef.current.querySelectorAll('button:not([disabled]), input, a[href], [tabindex]:not([tabindex="-1"])')];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      if (opener && typeof opener.focus === "function" && document.contains(opener)) opener.focus();
    };
  }, [open]);

  if (!open) return null;

  const seg = (active) => ({
    flex:1, padding:"9px 6px", fontSize:".85rem", fontWeight:700, fontFamily:"inherit", cursor:"pointer", borderRadius:10,
    background: active ? T.gold : "transparent", color: active ? T.onAccent : T.text,
    border:`1px solid ${active ? T.gold : T.borderStrong}`,
  });
  const sizeLabel = TEXT_SIZES[prefs.size] + "%";

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:700, background:"rgba(15,23,42,.5)", display:"flex", justifyContent:"flex-end" }}>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="hm-settings-title" onClick={ev => ev.stopPropagation()}
        dir={isHe ? "rtl" : "ltr"} style={{
        width:"min(400px,100%)", height:"100%", overflowY:"auto", background:T.bg, color:T.text,
        borderInlineStart:`1px solid ${T.borderStrong}`, padding:"20px 22px calc(28px + env(safe-area-inset-bottom))",
        boxShadow:"-12px 0 40px rgba(0,0,0,.25)",
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, marginBottom:6 }}>
          <h2 id="hm-settings-title" style={{ fontSize:"1.15rem", fontWeight:800 }}>{s.title}</h2>
          <button ref={closeRef} onClick={onClose} aria-label={s.close} style={{
            background:T.surface3, border:`1px solid ${T.border}`, borderRadius:10, width:38, height:38, cursor:"pointer", color:T.text, fontSize:"1rem",
          }}><span aria-hidden="true">✕</span></button>
        </div>

        {/* Theme */}
        <div role="radiogroup" aria-label={s.theme} style={{ padding:"14px 0", borderBottom:`1px solid ${T.border}` }}>
          <div style={{ fontSize:".93rem", fontWeight:700, marginBottom:10 }}>{s.theme}</div>
          <div style={{ display:"flex", gap:8 }}>
            {[["system", s.system], ["light", s.light], ["dark", s.dark]].map(([k, label]) => (
              <button key={k} role="radio" aria-checked={themePref === k} onClick={() => setThemePref(k)} style={seg(themePref === k)}>{label}</button>
            ))}
          </div>
        </div>

        {/* Text size */}
        <div style={{ padding:"14px 0", borderBottom:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
            <label htmlFor="hm-size" style={{ fontSize:".93rem", fontWeight:700 }}>{s.size}</label>
            <span aria-hidden="true" style={{ fontSize:".85rem", color:T.textDim, fontWeight:700 }}>{sizeLabel}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={() => setPref("size", Math.max(0, prefs.size - 1))} disabled={prefs.size === 0} aria-label={s.smaller}
              style={{ ...seg(false), flex:"0 0 44px", opacity: prefs.size === 0 ? .45 : 1, fontSize:".95rem" }}>A−</button>
            <input id="hm-size" type="range" min={0} max={TEXT_SIZES.length - 1} step={1} value={prefs.size}
              aria-valuetext={sizeLabel} onChange={ev => setPref("size", Number(ev.target.value))}
              style={{ flex:1, accentColor:"var(--hm-accent)", height:28 }} />
            <button onClick={() => setPref("size", Math.min(TEXT_SIZES.length - 1, prefs.size + 1))} disabled={prefs.size === TEXT_SIZES.length - 1} aria-label={s.larger}
              style={{ ...seg(false), flex:"0 0 44px", opacity: prefs.size === TEXT_SIZES.length - 1 ? .45 : 1, fontSize:"1.15rem" }}>A+</button>
          </div>
        </div>

        <Switch id="hm-s-contrast" checked={prefs.contrast} onChange={v => setPref("contrast", v)} label={s.contrast} hint={s.contrastHint} />
        <Switch id="hm-s-font" checked={prefs.font} onChange={v => setPref("font", v)} label={s.font} hint={s.fontHint} />
        <Switch id="hm-s-spacing" checked={prefs.spacing === 1} onChange={v => setPref("spacing", v ? 1 : 0)} label={s.spacing} hint={s.spacingHint} />
        <Switch id="hm-s-links" checked={prefs.links} onChange={v => setPref("links", v)} label={s.links} hint={s.linksHint} />
        <Switch id="hm-s-focus" checked={prefs.focus} onChange={v => setPref("focus", v)} label={s.focus} hint={s.focusHint} />
        <Switch id="hm-s-motion" checked={prefs.motion} onChange={v => setPref("motion", v)} label={s.motion} hint={s.motionHint} />
        <Switch id="hm-s-art" checked={prefs.art} onChange={v => setPref("art", v)} label={s.art} hint={s.artHint} />

        <button onClick={onReset} style={{
          marginTop:18, width:"100%", padding:"12px", borderRadius:12, cursor:"pointer", fontFamily:"inherit",
          fontWeight:700, fontSize:".9rem", background:"transparent", color:T.text, border:`1px solid ${T.borderStrong}`,
        }}>{s.reset}</button>

        <div style={{ marginTop:22, fontSize:".82rem", color:T.textDim, lineHeight:1.7 }}>
          <div style={{ fontWeight:700, color:T.text, marginBottom:4 }}>{s.helpTitle}</div>
          <ul style={{ paddingInlineStart:18 }}>{s.help.map(h => <li key={h}>{h}</li>)}</ul>
          <p style={{ marginTop:10, color:T.textMuted }}>{s.note}</p>
        </div>
      </div>
    </div>
  );
}
