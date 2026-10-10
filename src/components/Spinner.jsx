import T from "../constants/theme";

export default function Spinner({ size = 20 }) {
  return (
    <div style={{
      width: size, height: size,
      border: `2px solid ${T.border}`,
      borderTopColor: T.gold,
      borderRadius: "50%",
      animation: "hm-spin .8s linear infinite",
      flexShrink: 0,
    }} />
  );
}
