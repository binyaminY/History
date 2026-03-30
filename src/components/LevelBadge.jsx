import { LEVEL_COLORS } from "../constants/events";
import T from "../constants/theme";

export default function LevelBadge({ level }) {
  const color = LEVEL_COLORS[level] || T.gold;
  return (
    <span style={{
      fontSize: ".62rem", padding: "2px 7px", borderRadius: 10,
      background: color + "22", color, border: `1px solid ${color}55`, fontWeight: 700,
    }}>{level}</span>
  );
}
