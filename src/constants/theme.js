// Every colour is a CSS variable, so the whole app switches between light and dark
// by changing data-theme on <html>. The values live in index.html (:root / [data-theme="dark"]).
const T = {
  bg: "var(--hm-bg)",
  surface: "var(--hm-surface)",
  surface2: "var(--hm-surface2)",
  surface3: "var(--hm-surface3)",
  gold: "var(--hm-accent)",
  goldLight: "var(--hm-accent-light)",
  goldDim: "var(--hm-accent-dim)",
  onAccent: "var(--hm-on-accent)",
  accentSoft: "var(--hm-accent-soft)",
  text: "var(--hm-text)",
  textDim: "var(--hm-text-dim)",
  textMuted: "var(--hm-text-muted)",
  red: "var(--hm-red)",
  redSoft: "var(--hm-red-soft)",
  green: "var(--hm-green)",
  greenSoft: "var(--hm-green-soft)",
  border: "var(--hm-border)",
  borderStrong: "var(--hm-border-strong)",
  navBg: "var(--hm-nav-bg)",
  logo: "var(--hm-logo)",
  modalHead: "var(--hm-modal-head)",
};

export const isDark = () => typeof document !== "undefined" && document.documentElement.dataset.theme === "dark";

export default T;
