const G = "#c9a84c";

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
  stars: [[502,302],[522,282],[542,302],[512,332],[532,332],[492,362],[552,362],[517,252]],
  lines: [[0,1],[1,2],[0,3],[2,4],[3,5],[4,6],[1,7]],
};

export default function BackgroundArt() {
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:0,
      pointerEvents:"none", overflow:"hidden",
    }}>
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
        <rect width="1440" height="900" fill="url(#mapgrid)" opacity="0.07"/>

        {/* Stars */}
        <g fill={G} opacity="0.22">
          {STARS.map(([x,y,r],i) => <circle key={i} cx={x} cy={y} r={r}/>)}
        </g>

        {/* Orion constellation */}
        <g opacity="0.1">
          <g stroke={G} strokeWidth="0.7" fill="none">
            {ORION.lines.map(([a,b],i) => (
              <line key={i}
                x1={ORION.stars[a][0]} y1={ORION.stars[a][1]}
                x2={ORION.stars[b][0]} y2={ORION.stars[b][1]}
              />
            ))}
          </g>
          <g fill={G}>
            {ORION.stars.map(([x,y],i) => <circle key={i} cx={x} cy={y} r={i<3?2.5:1.8}/>)}
          </g>
        </g>

        {/* Egyptian Pyramid – bottom left */}
        <g opacity="0.11" stroke={G} fill="none" strokeWidth="1.5">
          <polygon points="55,875 240,590 425,875"/>
          <line x1="240" y1="590" x2="240" y2="875"/>
          <line x1="147" y1="732" x2="333" y2="732"/>
          {/* Small pyramid behind */}
          <polygon points="430,875 510,760 590,875" strokeWidth="1"/>
        </g>

        {/* Greek Parthenon – top left */}
        <g opacity="0.1" stroke={G} fill="none" strokeWidth="1.2">
          <polygon points="75,125 275,48 475,125"/>
          <rect x="70" y="125" width="410" height="18"/>
          {[100,148,196,244,292,340,388,430].map((cx,i) => (
            <rect key={i} x={cx} y="143" width="11" height="110"/>
          ))}
          <rect x="68" y="253" width="414" height="10"/>
          <rect x="58" y="263" width="434" height="8"/>
        </g>

        {/* Compass Rose – right center */}
        <g transform="translate(1200,430)" opacity="0.11">
          {[0,45,90,135,180,225,270,315].map((deg,i) => {
            const r = (deg * Math.PI) / 180;
            const len = i % 2 === 0 ? 82 : 52;
            const x = Math.sin(r) * len;
            const y = -Math.cos(r) * len;
            const r1 = ((deg-10)*Math.PI)/180;
            const r2 = ((deg+10)*Math.PI)/180;
            return (
              <path key={i} fill={G}
                d={`M ${Math.sin(r1)*17} ${-Math.cos(r1)*17} L ${x} ${y} L ${Math.sin(r2)*17} ${-Math.cos(r2)*17} Z`}
              />
            );
          })}
          <circle cx="0" cy="0" r="14" fill="none" stroke={G} strokeWidth="1.5"/>
          <circle cx="0" cy="0" r="5" fill={G}/>
          <circle cx="0" cy="0" r="100" fill="none" stroke={G} strokeWidth="0.5" strokeDasharray="5,9"/>
          <circle cx="0" cy="0" r="110" fill="none" stroke={G} strokeWidth="0.3" strokeDasharray="2,12"/>
        </g>

        {/* Ancient Sailing Ship – center */}
        <g transform="translate(780,460)" opacity="0.09" stroke={G} fill="none" strokeWidth="1.3">
          <path d="M -85 18 Q -70 42 0 48 Q 70 42 85 18 Z"/>
          <line x1="0" y1="-85" x2="0" y2="28"/>
          <line x1="-12" y1="-20" x2="12" y2="-20"/>
          <path d="M -52 -74 Q 0 -52 52 -74 Q 0 -8 -52 -74 Z"/>
          <path d="M 0 -85 L 22 -68 L 0 -52"/>
          <path d="M -120 58 Q -80 50 -40 58 Q 0 66 40 58 Q 80 50 120 58" strokeWidth="0.8"/>
        </g>

        {/* Colosseum arches – bottom right */}
        <g transform="translate(1250,800)" opacity="0.1" stroke={G} fill="none" strokeWidth="1.2">
          <ellipse cx="0" cy="0" rx="175" ry="80"/>
          <ellipse cx="0" cy="0" rx="130" ry="58"/>
          {Array.from({length:10}).map((_,i) => {
            const a = (i * 36 - 90) * Math.PI / 180;
            const x = Math.cos(a) * 152;
            const y = Math.sin(a) * 69;
            return <ellipse key={i} cx={x} cy={y} rx="9" ry="16" fill={G} opacity="0.4"/>;
          })}
          <line x1="-175" y1="-28" x2="175" y2="-28"/>
        </g>

        {/* Medieval Castle – top center */}
        <g transform="translate(850,105)" opacity="0.1" stroke={G} fill="none" strokeWidth="1.2">
          {/* Main tower */}
          <rect x="-22" y="-88" width="44" height="88"/>
          {[-22,-12,-2,10].map(x => <rect key={x} x={x} y="-100" width="9" height="14"/>)}
          {/* Left wing */}
          <rect x="-88" y="-56" width="66" height="56"/>
          {[-88,-78,-68,-58].map(x => <rect key={x} x={x} y="-67" width="8" height="13"/>)}
          {/* Right wing */}
          <rect x="22" y="-56" width="66" height="56"/>
          {[22,32,42,56].map(x => <rect key={x} x={x} y="-67" width="8" height="13"/>)}
          {/* Gate arch */}
          <path d="M -11 0 L -11 -32 Q 0 -44 11 -32 L 11 0"/>
          {/* Moat */}
          <path d="M -95 8 Q 0 20 95 8" fill="none" strokeDasharray="4,4"/>
        </g>

        {/* Viking Longship – top right */}
        <g transform="translate(1080,175)" opacity="0.09" stroke={G} fill="none" strokeWidth="1.1">
          <path d="M -95 12 Q -80 28 0 32 Q 80 28 95 12 Q 72 -4 0 -4 Q -72 -4 -95 12 Z"/>
          <path d="M 95 12 Q 118 -4 108 -18"/>
          <path d="M -95 12 Q -118 -4 -108 -18"/>
          <line x1="0" y1="-72" x2="0" y2="16"/>
          <path d="M -48 -62 Q 0 -42 48 -62 Q 0 -14 -48 -62 Z"/>
          {[-70,-50,-30,30,50,70].map(x => (
            <line key={x} x1={x} y1="18" x2={x * 1.15} y2="38"/>
          ))}
        </g>

        {/* ── Famous Historical Figures (silhouettes) ── */}

        {/* Napoleon – iconic bicorn hat, left side */}
        <g transform="translate(580,620)" opacity="0.08" fill={G}>
          {/* Head */}
          <ellipse cx="0" cy="-30" rx="18" ry="20"/>
          {/* Bicorn hat */}
          <path d="M -28 -46 Q -14 -72 0 -70 Q 14 -72 28 -46 Q 14 -42 0 -44 Q -14 -42 -28 -46 Z"/>
          {/* Body / coat */}
          <path d="M -22 -10 Q -30 30 -26 70 L 26 70 Q 30 30 22 -10 Q 10 -4 0 -4 Q -10 -4 -22 -10 Z"/>
          {/* Epaulettes */}
          <ellipse cx="-24" cy="-8" rx="10" ry="5"/>
          <ellipse cx="24" cy="-8" rx="10" ry="5"/>
          {/* Arms crossed */}
          <path d="M -22 10 Q 0 20 22 10 Q 0 30 -22 10 Z"/>
        </g>

        {/* Abraham Lincoln – top hat, right area */}
        <g transform="translate(1320,520)" opacity="0.08" fill={G}>
          {/* Head */}
          <ellipse cx="0" cy="-28" rx="16" ry="19"/>
          {/* Top hat */}
          <rect x="-14" y="-82" width="28" height="48" rx="2"/>
          <rect x="-20" y="-36" width="40" height="7" rx="3"/>
          {/* Beard */}
          <path d="M -10 -10 Q -12 5 -6 12 Q 0 15 6 12 Q 12 5 10 -10 Q 4 -6 0 -6 Q -4 -6 -10 -10 Z"/>
          {/* Body / coat */}
          <path d="M -20 -8 Q -28 35 -24 80 L 24 80 Q 28 35 20 -8 Q 8 -2 0 -2 Q -8 -2 -20 -8 Z"/>
        </g>

        {/* Cleopatra – Egyptian queen profile, top area */}
        <g transform="translate(380,320)" opacity="0.08" fill={G}>
          {/* Head with Nemes headdress */}
          <ellipse cx="0" cy="-10" rx="16" ry="18"/>
          {/* Nemes (headdress cloth sides) */}
          <path d="M -16 -20 Q -30 10 -24 40 Q -14 42 -12 20 Q -14 0 -16 -20 Z"/>
          <path d="M 16 -20 Q 22 0 16 20 Q 14 42 20 40 Q 28 10 16 -20 Z"/>
          {/* Crown/Uraeus */}
          <path d="M -8 -28 Q 0 -45 8 -28 Q 4 -22 0 -24 Q -4 -22 -8 -28 Z"/>
          {/* Neck & shoulders */}
          <rect x="-8" y="8" width="16" height="12" rx="2"/>
          <path d="M -22 20 Q -28 60 -20 90 L 20 90 Q 28 60 22 20 Q 8 16 0 16 Q -8 16 -22 20 Z"/>
          {/* Broad collar necklace */}
          <path d="M -22 22 Q 0 36 22 22 Q 14 46 0 48 Q -14 46 -22 22 Z" fillOpacity="0.6"/>
        </g>

        {/* Julius Caesar – Roman laurel wreath, bottom area */}
        <g transform="translate(1050,680)" opacity="0.08" fill={G}>
          {/* Head */}
          <ellipse cx="0" cy="-22" rx="17" ry="20"/>
          {/* Laurel wreath */}
          {[-30,-20,-10,0,10,20,30].map((x,i) => (
            <ellipse key={i} cx={x} cy={-40+(Math.abs(i-3)*2)} rx="7" ry="5"
              transform={`rotate(${(i-3)*12} ${x} ${-40+(Math.abs(i-3)*2)})`} fillOpacity="0.9"/>
          ))}
          {/* Roman toga */}
          <path d="M -20 -2 Q -32 40 -26 85 L 26 85 Q 32 40 20 -2 Q 8 4 0 4 Q -8 4 -20 -2 Z"/>
          {/* Toga drape */}
          <path d="M -20 -2 Q -10 20 10 15 Q 20 10 20 -2" fill="none" stroke={G} strokeWidth="1.5"/>
        </g>

        {/* Leonardo da Vinci – Renaissance man with beret, center-left */}
        <g transform="translate(200,500)" opacity="0.08" fill={G}>
          {/* Long beard */}
          <path d="M -14 5 Q -18 30 -10 55 Q 0 62 10 55 Q 18 30 14 5 Q 6 10 0 10 Q -6 10 -14 5 Z"/>
          {/* Head */}
          <ellipse cx="0" cy="-18" rx="17" ry="20"/>
          {/* Beret */}
          <ellipse cx="0" cy="-36" rx="22" ry="10"/>
          <path d="M -22 -36 Q -18 -52 0 -54 Q 18 -52 22 -36"/>
          {/* Body */}
          <path d="M -20 5 Q -26 42 -22 80 L 22 80 Q 26 42 20 5 Q 8 10 0 10 Q -8 10 -20 5 Z"/>
        </g>

        {/* Stonehenge – bottom center */}
        <g transform="translate(680,858)" opacity="0.1" stroke={G} fill={G}>
          {[-72,-48,-24,0,24,48,72].map((x,i) => (
            <rect key={i} x={x-5} y={-45+(i%2)*12} width="10" height={45-(i%2)*12}/>
          ))}
          <rect x="-68" y="-52" width="58" height="8"/>
          <rect x="-2" y="-52" width="58" height="8"/>
        </g>

        {/* Decorative outer border */}
        <rect x="12" y="12" width="1416" height="876"
          fill="none" stroke={G} strokeWidth="0.7" opacity="0.07"
          strokeDasharray="22,10"/>
        <rect x="20" y="20" width="1400" height="860"
          fill="none" stroke={G} strokeWidth="0.3" opacity="0.05"
          strokeDasharray="4,16"/>
      </svg>
    </div>
  );
}
