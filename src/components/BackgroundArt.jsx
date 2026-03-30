const G = "#d4a84a";

const STARS = [
  [55,45,1.8],[130,25,1.2],[195,75,2],[310,18,1.5],[460,55,1.2],[615,38,2.2],
  [760,12,1.5],[910,52,1],[1060,28,2],[1210,42,1.5],[1360,18,1.2],[1430,65,1],
  [85,195,1],[230,175,1.8],[390,148,2],[535,215,1.2],[705,168,1.5],[860,185,1],
  [1010,155,2],[1160,195,1.5],[1330,172,1.2],[42,395,2],[168,378,1],[328,418,1.5],
  [485,368,1.2],[648,408,2],[808,388,1.5],[968,428,1],[1128,398,2],[1288,375,1.5],
  [1428,418,1],[72,598,1.5],[205,578,1],[358,618,2],[508,588,1.5],[658,608,1],
  [828,578,2],[988,618,1.5],[1148,588,1],[1308,612,2],[1418,578,1.2],
  [102,798,1],[268,778,1.5],[428,818,1],[588,788,2],[748,808,1.5],
  [908,778,1],[1068,818,2],[1228,792,1.5],[1408,808,1],
];

const ORION = {
  stars:[[502,302],[522,282],[542,302],[512,332],[532,332],[492,362],[552,362],[517,252]],
  lines:[[0,1],[1,2],[0,3],[2,4],[3,5],[4,6],[1,7]],
};

/* ── Commander silhouettes ── */

// Napoleon Bonaparte – standing with bicorn hat, military coat, hand in jacket
function Napoleon({ x, y, scale = 1, op = 0.11 }) {
  const s = scale;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} fill={G} opacity={op}>
      {/* Bicorn hat */}
      <path d="M -32 -185 Q -18 -215 0 -212 Q 18 -215 32 -185 Q 16 -180 0 -182 Q -16 -180 -32 -185 Z"/>
      {/* Head */}
      <ellipse cx="0" cy="-158" rx="22" ry="26"/>
      {/* Neck */}
      <rect x="-8" y="-134" width="16" height="16" rx="3"/>
      {/* Military coat body */}
      <path d="M -30 -118 Q -42 -40 -38 60 L 38 60 Q 42 -40 30 -118 Q 14 -110 0 -110 Q -14 -110 -30 -118 Z"/>
      {/* Epaulettes */}
      <ellipse cx="-34" cy="-112" rx="14" ry="6" transform="rotate(-15 -34 -112)"/>
      <ellipse cx="34" cy="-112" rx="14" ry="6" transform="rotate(15 34 -112)"/>
      {/* Hand in jacket (Napoleon's pose) */}
      <path d="M -30 -60 Q -10 -55 0 -58 Q 10 -55 8 -40 Q 0 -36 -8 -40 Q -18 -44 -22 -55 Z"/>
      {/* Left arm down */}
      <path d="M -30 -100 Q -46 -60 -44 -20 Q -36 -18 -32 -24 Q -28 -60 -20 -90 Z"/>
      {/* Legs */}
      <path d="M -20 60 Q -22 110 -18 160 L -2 160 Q -4 110 -2 60 Z"/>
      <path d="M 20 60 Q 22 110 18 160 L 2 160 Q 4 110 2 60 Z"/>
      {/* Boots */}
      <path d="M -18 155 Q -24 160 -28 175 L -2 175 Q 0 160 -2 155 Z"/>
      <path d="M 18 155 Q 24 160 28 175 L 2 175 Q 0 160 2 155 Z"/>
    </g>
  );
}

// Alexander the Great – Greek warrior with Corinthian helmet, spear, shield
function Alexander({ x, y, scale = 1, op = 0.1 }) {
  const s = scale;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} fill={G} opacity={op}>
      {/* Corinthian helmet with tall crest */}
      <path d="M -20 -200 Q -22 -175 -22 -160 L 22 -160 Q 22 -175 20 -200 Q 10 -215 0 -216 Q -10 -215 -20 -200 Z"/>
      {/* Helmet crest */}
      <path d="M -4 -216 Q -6 -240 0 -260 Q 6 -240 4 -216 Z"/>
      {/* Cheek guards */}
      <path d="M -22 -175 Q -26 -165 -22 -155 L -18 -155 L -18 -172 Z"/>
      <path d="M 22 -175 Q 26 -165 22 -155 L 18 -155 L 18 -172 Z"/>
      {/* Face/head */}
      <ellipse cx="0" cy="-148" rx="18" ry="20"/>
      {/* Breastplate / cuirass */}
      <path d="M -28 -128 Q -34 -60 -30 20 L 30 20 Q 34 -60 28 -128 Q 14 -122 0 -122 Q -14 -122 -28 -128 Z"/>
      {/* Pteruges (armor skirt strips) */}
      {[-24,-16,-8,0,8,16,24].map((cx,i) => (
        <rect key={i} x={cx-4} y="20" width="7" height="30" rx="2"/>
      ))}
      {/* Shield (left arm) */}
      <ellipse cx="-55" cy="-60" rx="30" ry="36" transform="rotate(-10 -55 -60)"/>
      <ellipse cx="-55" cy="-60" rx="22" ry="28" transform="rotate(-10 -55 -60)"
        fill="none" stroke={G} strokeWidth="3" opacity="0.6"/>
      {/* Spear (right arm raised) */}
      <line x1="40" y1="80" x2="80" y2="-220" stroke={G} strokeWidth="4"/>
      {/* Spear tip */}
      <polygon points="80,-220 72,-200 88,-200"/>
      {/* Legs */}
      <path d="M -16 50 Q -18 110 -14 170 L 2 170 Q 0 110 -2 50 Z"/>
      <path d="M 16 50 Q 18 110 14 170 L -2 170 Q 0 110 2 50 Z"/>
      {/* Greaves (leg armor) */}
      <path d="M -14 120 Q -20 130 -18 155 Q -10 158 -2 155 Q 0 130 -2 120 Z"/>
      <path d="M 14 120 Q 20 130 18 155 Q 10 158 2 155 Q 0 130 2 120 Z"/>
    </g>
  );
}

// Julius Caesar – Roman general, raised arm, toga, laurel
function Caesar({ x, y, scale = 1, op = 0.1 }) {
  const s = scale;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} fill={G} opacity={op}>
      {/* Laurel wreath */}
      {[-28,-18,-8,0,8,18,28].map((lx,i) => (
        <ellipse key={i} cx={lx} cy={-162+(Math.abs(i-3)*3)} rx="9" ry="6"
          transform={`rotate(${(i-3)*14} ${lx} ${-162+(Math.abs(i-3)*3)})`}/>
      ))}
      {/* Head */}
      <ellipse cx="0" cy="-140" rx="22" ry="26"/>
      {/* Neck */}
      <rect x="-8" y="-116" width="16" height="14" rx="3"/>
      {/* Toga body */}
      <path d="M -28 -102 Q -36 -20 -30 80 L 30 80 Q 36 -20 28 -102 Q 14 -96 0 -96 Q -14 -96 -28 -102 Z"/>
      {/* Toga drape over left shoulder */}
      <path d="M -28 -102 Q -50 -80 -54 -40 Q -50 0 -38 20 Q -30 10 -28 -20 Q -24 -60 -14 -90 Z"/>
      {/* Right arm raised (oratory pose) */}
      <path d="M 28 -90 Q 50 -110 64 -140 Q 56 -148 48 -138 Q 36 -110 20 -82 Z"/>
      {/* Hand */}
      <ellipse cx="62" cy="-144" rx="10" ry="8" transform="rotate(30 62 -144)"/>
      {/* Legs under toga */}
      <path d="M -14 80 Q -16 130 -12 175 L 2 175 Q 0 130 -2 80 Z"/>
      <path d="M 14 80 Q 16 130 12 175 L -2 175 Q 0 130 2 80 Z"/>
      {/* Sandals */}
      <path d="M -12 170 Q -18 175 -22 185 L 2 185 Q 0 175 -2 170 Z"/>
      <path d="M 12 170 Q 18 175 22 185 L -2 185 Q 0 175 2 170 Z"/>
    </g>
  );
}

// Genghis Khan – Mongolian warrior with bow, on horseback suggestion
function GenghisKhan({ x, y, scale = 1, op = 0.09 }) {
  const s = scale;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} fill={G} opacity={op}>
      {/* Mongolian helmet with peak */}
      <path d="M -20 -185 Q -22 -165 -22 -155 L 22 -155 Q 22 -165 20 -185 Q 10 -200 0 -202 Q -10 -200 -20 -185 Z"/>
      <path d="M -22 -165 Q -30 -160 -28 -150 L -20 -150 Z"/>
      <path d="M 22 -165 Q 30 -160 28 -150 L 20 -150 Z"/>
      {/* Topknot / plume */}
      <path d="M -3 -202 Q -5 -225 0 -235 Q 5 -225 3 -202 Z"/>
      {/* Head */}
      <ellipse cx="0" cy="-135" rx="20" ry="22"/>
      {/* Armored body */}
      <path d="M -26 -114 Q -32 -40 -28 55 L 28 55 Q 32 -40 26 -114 Q 12 -108 0 -108 Q -12 -108 -26 -114 Z"/>
      {/* Scale armor detail */}
      <path d="M -26 -100 Q 0 -90 26 -100" fill="none" stroke={G} strokeWidth="2" opacity="0.5"/>
      <path d="M -28 -70 Q 0 -60 28 -70" fill="none" stroke={G} strokeWidth="2" opacity="0.5"/>
      <path d="M -28 -40 Q 0 -30 28 -40" fill="none" stroke={G} strokeWidth="2" opacity="0.5"/>
      {/* Left arm drawing bow */}
      <path d="M -26 -90 Q -60 -100 -72 -80 Q -60 -60 -26 -70 Z"/>
      {/* Bow */}
      <path d="M -72 -110 Q -90 -80 -72 -50" fill="none" stroke={G} strokeWidth="3"/>
      {/* Bowstring */}
      <line x1="-72" y1="-110" x2="-72" y2="-50" stroke={G} strokeWidth="1.5"/>
      {/* Arrow */}
      <line x1="-72" y1="-80" x2="-20" y2="-85" stroke={G} strokeWidth="2"/>
      <polygon points="-20,-85 -30,-80 -30,-90"/>
      {/* Right arm back pulling string */}
      <path d="M 26 -90 Q 50 -95 58 -80 Q 50 -66 26 -72 Z"/>
      {/* Legs */}
      <path d="M -14 55 Q -16 105 -12 150 L 2 150 Q 0 105 -2 55 Z"/>
      <path d="M 14 55 Q 16 105 12 150 L -2 150 Q 0 105 2 55 Z"/>
      {/* Boots */}
      <path d="M -12 145 Q -20 155 -22 168 L 2 168 Q 2 155 0 145 Z"/>
      <path d="M 12 145 Q 20 155 22 168 L -2 168 Q -2 155 0 145 Z"/>
    </g>
  );
}

// Saladin – Islamic general with turban, sword
function Saladin({ x, y, scale = 1, op = 0.09 }) {
  const s = scale;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} fill={G} opacity={op}>
      {/* Turban */}
      <ellipse cx="0" cy="-165" rx="28" ry="16"/>
      <path d="M -28 -165 Q -26 -185 0 -190 Q 26 -185 28 -165 Q 14 -162 0 -163 Q -14 -162 -28 -165 Z"/>
      {/* Turban wrap detail */}
      <path d="M -28 -165 Q -10 -158 10 -162 Q 26 -168 28 -165" fill="none" stroke={G} strokeWidth="2" opacity="0.6"/>
      {/* Head */}
      <ellipse cx="0" cy="-142" rx="20" ry="24"/>
      {/* Beard */}
      <path d="M -14 -122 Q -16 -100 -8 -90 Q 0 -86 8 -90 Q 16 -100 14 -122 Q 6 -118 0 -118 Q -6 -118 -14 -122 Z"/>
      {/* Chainmail / robe body */}
      <path d="M -28 -110 Q -36 -30 -32 75 L 32 75 Q 36 -30 28 -110 Q 14 -104 0 -104 Q -14 -104 -28 -110 Z"/>
      {/* Surcoat detail line */}
      <line x1="0" y1="-104" x2="0" y2="75" stroke={G} strokeWidth="1.5" opacity="0.4"/>
      {/* Sword raised (right arm) */}
      <path d="M 28 -95 Q 50 -105 58 -120 Q 52 -130 44 -118 Q 30 -100 20 -88 Z"/>
      <line x1="55" y1="-124" x2="90" y2="-200" stroke={G} strokeWidth="5"/>
      {/* Sword crossguard */}
      <line x1="44" y1="-168" x2="70" y2="-152" stroke={G} strokeWidth="4"/>
      {/* Shield (left) */}
      <path d="M -28 -90 Q -56 -70 -62 -40 Q -56 -10 -28 -5 Q -16 -30 -18 -70 Z"/>
      <path d="M -28 -88 Q -50 -72 -55 -44 Q -50 -18 -28 -8" fill="none" stroke={G} strokeWidth="1.5" opacity="0.5"/>
      {/* Legs */}
      <path d="M -16 75 Q -18 130 -14 180 L 0 180 Q -2 130 -4 75 Z"/>
      <path d="M 16 75 Q 18 130 14 180 L 0 180 Q 2 130 4 75 Z"/>
    </g>
  );
}

export default function BackgroundArt() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
      <svg width="100%" height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="mapgrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke={G} strokeWidth="0.4"/>
          </pattern>
        </defs>

        {/* Map grid */}
        <rect width="1440" height="900" fill="url(#mapgrid)" opacity="0.06"/>

        {/* Stars */}
        <g fill={G} opacity="0.2">
          {STARS.map(([x,y,r],i) => <circle key={i} cx={x} cy={y} r={r}/>)}
        </g>

        {/* Orion constellation */}
        <g opacity="0.09">
          <g stroke={G} strokeWidth="0.7" fill="none">
            {ORION.lines.map(([a,b],i) => (
              <line key={i}
                x1={ORION.stars[a][0]} y1={ORION.stars[a][1]}
                x2={ORION.stars[b][0]} y2={ORION.stars[b][1]}/>
            ))}
          </g>
          <g fill={G}>{ORION.stars.map(([x,y],i) => <circle key={i} cx={x} cy={y} r={i<3?2.5:1.8}/>)}</g>
        </g>

        {/* ── Military Commanders ── */}

        {/* Napoleon – right side */}
        <Napoleon x={1300} y={700} scale={1.1} op={0.12}/>

        {/* Alexander the Great – left side */}
        <Alexander x={130} y={680} scale={1.0} op={0.11}/>

        {/* Julius Caesar – center-right bottom */}
        <Caesar x={900} y={720} scale={0.85} op={0.09}/>

        {/* Genghis Khan – top left */}
        <GenghisKhan x={200} y={310} scale={0.8} op={0.09}/>

        {/* Saladin – top right */}
        <Saladin x={1240} y={310} scale={0.8} op={0.09}/>

        {/* Compass Rose */}
        <g transform="translate(720,480)" opacity="0.07">
          {[0,45,90,135,180,225,270,315].map((deg,i) => {
            const r = (deg*Math.PI)/180;
            const len = i%2===0 ? 70 : 44;
            const x = Math.sin(r)*len, y = -Math.cos(r)*len;
            const r1 = ((deg-10)*Math.PI)/180, r2 = ((deg+10)*Math.PI)/180;
            return (
              <path key={i} fill={G}
                d={`M ${Math.sin(r1)*15} ${-Math.cos(r1)*15} L ${x} ${y} L ${Math.sin(r2)*15} ${-Math.cos(r2)*15} Z`}/>
            );
          })}
          <circle cx="0" cy="0" r="12" fill="none" stroke={G} strokeWidth="1.5"/>
          <circle cx="0" cy="0" r="4" fill={G}/>
          <circle cx="0" cy="0" r="85" fill="none" stroke={G} strokeWidth="0.5" strokeDasharray="5,9"/>
        </g>

        {/* Decorative border */}
        <rect x="12" y="12" width="1416" height="876"
          fill="none" stroke={G} strokeWidth="0.6" opacity="0.06" strokeDasharray="22,10"/>
      </svg>
    </div>
  );
}
