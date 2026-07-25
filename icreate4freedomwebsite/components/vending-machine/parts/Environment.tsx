import { Fatsia } from "./Fatsia";
import { Shrub, Fern, Cane, GrassTuft, BroadLeaf, ClimbingIvy, HangingVine } from "./Flora";

function Shutter({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="#1a2022" />
      {Array.from({ length: Math.floor(height / 8) }).map((_, index) => (
        <g key={index}>
          <rect x={x} y={y + index * 8} width={width} height="3.6" fill="#2e3536" opacity="0.76" />
          <line x1={x} y1={y + index * 8 + 5} x2={x + width} y2={y + index * 8 + 5} stroke="#0d1214" strokeWidth="1" />
        </g>
      ))}
      <rect x={x} y={y + height - 8} width={width} height="8" fill="#0e1315" />
    </g>
  );
}

function Window({ x, y, width, height, warm = false }: { x: number; y: number; width: number; height: number; warm?: boolean }) {
  const pane = warm ? "#9b7749" : "#37515a";
  return (
    <g>
      <rect x={x - 5} y={y - 5} width={width + 10} height={height + 10} fill="#1a1f20" />
      <rect x={x - 2} y={y - 2} width={width + 4} height={height + 4} fill="#a7aaa3" opacity="0.35" />
      <rect x={x} y={y} width={width} height={height} fill={pane} opacity={warm ? 0.62 : 0.5} />
      <line x1={x + width / 2} y1={y} x2={x + width / 2} y2={y + height} stroke="#172023" strokeWidth="2" />
      <line x1={x} y1={y + height / 2} x2={x + width} y2={y + height / 2} stroke="#172023" strokeWidth="2" />
      <rect x={x - 7} y={y + height + 4} width={width + 14} height="5" rx="1" fill="#5b615c" opacity="0.7" />
    </g>
  );
}

function Door({ x, y, width = 64, height = 184, warm = false }: { x: number; y: number; width?: number; height?: number; warm?: boolean }) {
  return (
    <g>
      <rect x={x - 8} y={y - 8} width={width + 16} height={height + 8} fill="#1a2020" />
      <rect x={x - 4} y={y - 4} width={width + 8} height={height + 4} fill="#4d554f" opacity="0.5" />
      <rect x={x} y={y} width={width} height={height} fill={warm ? "#4d3c2d" : "#263033"} />
      <rect x={x + 7} y={y + 12} width={width - 14} height={height * 0.42} fill={warm ? "#9f7948" : "#30454b"} opacity={warm ? 0.48 : 0.42} />
      <rect x={x + 7} y={y + height * 0.55} width={width - 14} height={height * 0.26} fill="#161b1b" opacity="0.68" />
      <line x1={x + width / 2} y1={y + 8} x2={x + width / 2} y2={y + height - 10} stroke="#1a1e1d" strokeWidth="1.4" />
      <circle cx={x + width - 11} cy={y + height * 0.56} r="2.5" fill="#c29d61" opacity="0.78" />
      <rect x={x - 12} y={y - 15} width={width + 24} height="5" rx="1" fill="#252d2c" />
    </g>
  );
}

function AirUnit({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const fanLines = Array.from({ length: 12 });
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M7,39 L10,46 L44,46 L48,39" fill="none" stroke="#6a706b" strokeWidth="2.5" opacity="0.76" />
      <rect width="62" height="40" rx="2" fill="#b8b9b1" opacity="0.82" />
      <rect x="3" y="3" width="56" height="34" fill="#d0d0c7" opacity="0.3" />
      <circle cx="19" cy="20" r="12" fill="#68706d" stroke="#4a514e" strokeWidth="1.5" />
      <circle cx="19" cy="20" r="8" fill="none" stroke="#bac0b8" strokeWidth="0.8" opacity="0.78" />
      {fanLines.map((_, index) => {
        const angle = index * 30;
        return <line key={angle} x1="19" y1="8" x2="19" y2="32" transform={`rotate(${angle} 19 20)`} stroke="#bac0b8" strokeWidth="0.75" opacity="0.7" />;
      })}
      <circle cx="19" cy="20" r="2.8" fill="#454b48" />
      {[10, 16, 22, 28].map((offset) => <line key={offset} x1="40" y1={offset} x2="54" y2={offset} stroke="#69706b" strokeWidth="1.25" />)}
      <rect x="56" y="9" width="2" height="22" fill="#8d928b" opacity="0.68" />
      <path d="M52,40 C57,58 48,70 54,88" fill="none" stroke="#444c49" strokeWidth="2" />
    </g>
  );
}

function Lantern({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Wall-mounted cage lamp: backplate, gooseneck arm, metal cap, and a
          warm glass body. The silhouette stays legible at small sizes. */}
      <rect x="-27" y="-10" width="8" height="24" rx="1.5" fill="#252d2c" />
      <circle cx="-23" cy="-4" r="1.1" fill="#758078" opacity="0.7" />
      <circle cx="-23" cy="8" r="1.1" fill="#758078" opacity="0.7" />
      <path d="M-19,0 H-4 C3,0 6,5 6,11 V15" fill="none" stroke="#252d2c" strokeWidth="3" strokeLinecap="round" />
      <path d="M-1,13 H15 L12,19 H2 Z" fill="#292a24" />
      <rect x="2" y="19" width="10" height="20" rx="3" fill="#d6a55e" opacity="0.78" />
      <rect x="0" y="17" width="14" height="24" rx="4" fill="none" stroke="#242925" strokeWidth="2" />
      <line x1="0" y1="25" x2="14" y2="25" stroke="#725630" strokeWidth="1" />
      <line x1="0" y1="33" x2="14" y2="33" stroke="#725630" strokeWidth="1" />
      <path d="M2,42 H12" stroke="#282a24" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="7" cy="29" rx="20" ry="27" fill="#d6a55e" opacity="0.1" />
    </g>
  );
}

function Balcony({ x, y, width }: { x: number; y: number; width: number }) {
  return (
    <g>
      <rect x={x - 7} y={y - 6} width={width + 14} height="7" fill="#454a46" />
      <line x1={x} y1={y} x2={x + width} y2={y} stroke="#252c2a" strokeWidth="3" />
      <line x1={x + 2} y1={y} x2={x + 2} y2={y + 35} stroke="#252c2a" strokeWidth="2.5" />
      <line x1={x + width - 2} y1={y} x2={x + width - 2} y2={y + 35} stroke="#252c2a" strokeWidth="2.5" />
      {Array.from({ length: Math.floor(width / 16) - 1 }).map((_, index) => <line key={index} x1={x + 16 + index * 16} y1={y} x2={x + 16 + index * 16} y2={y + 34} stroke="#2b312f" strokeWidth="1.3" />)}
      <line x1={x} y1={y + 33} x2={x + width} y2={y + 33} stroke="#252c2a" strokeWidth="2" />
    </g>
  );
}

/* Potted plant. The foliage is drawn BEFORE the pot and anchored on the soil
   line at the rim, so it grows up out of the pot and the pot occludes the stem
   bases — previously the leaves were rotated ~180° and grew down into the pot.
   `kind` picks a species so no two planters on the street look alike. */
function Planter({
  x, y, body, leaf, kind = "shrub", scale = 1,
}: { x: number; y: number; body: string; leaf: string; kind?: "shrub" | "fern" | "cane" | "grass"; scale?: number }) {
  const w = 34 * scale, h = 42 * scale;
  const soil = y + 1;          // just below the rim
  const cx = x + w / 2;
  return (
    <g>
      {/* foliage first — the pot then overlaps the stems */}
      {kind === "shrub" && (
        <>
          <Shrub x={cx} y={soil} size={38 * scale} fill={leaf} tip="#548f52" />
          <GrassTuft x={cx - 11 * scale} y={soil} size={19 * scale} fill="#4b7d45" />
          <GrassTuft x={cx + 12 * scale} y={soil} size={15 * scale} fill="#3d6b3b" />
        </>
      )}
      {kind === "fern" && (
        <>
          <Fern x={cx - 7 * scale} y={soil} size={44 * scale} rotate={-16} fill={leaf} />
          <Fern x={cx + 6 * scale} y={soil} size={40 * scale} rotate={15} fill="#427a44" />
          <Fern x={cx} y={soil} size={34 * scale} rotate={0} fill="#2f5e33" />
          <GrassTuft x={cx - 3 * scale} y={soil} size={14 * scale} fill="#4b7d45" />
        </>
      )}
      {kind === "cane" && (
        <>
          <Cane x={cx - 6 * scale} y={soil} size={66 * scale} lean={-9} fill={leaf} />
          <Cane x={cx + 4 * scale} y={soil} size={54 * scale} lean={8} fill="#3f7143" />
          <Shrub x={cx + 1 * scale} y={soil} size={20 * scale} fill="#2f5e33" tip="#3f7143" />
        </>
      )}
      {kind === "grass" && (
        <>
          <GrassTuft x={cx} y={soil} size={40 * scale} blades={13} fill={leaf} />
          <GrassTuft x={cx - 8 * scale} y={soil} size={27 * scale} fill="#4b7d45" />
          <BroadLeaf x={cx + 8 * scale} y={soil} size={26 * scale} rotate={22} fill="#2f6135" />
        </>
      )}
      {/* the pot */}
      <path d={`M${x},${y} L${x + w},${y} L${x + w - 5 * scale},${y + h} L${x + 5 * scale},${y + h} Z`}
        fill={body} stroke="#191d1b" strokeWidth="1.2" />
      <path d={`M${x + 3 * scale},${y + 8 * scale} L${x + w - 3 * scale},${y + 8 * scale}`}
        stroke="#000" strokeOpacity="0.18" strokeWidth="1.5" />
      <rect x={x - 2 * scale} y={y - 3 * scale} width={w + 4 * scale} height={6 * scale} rx="2" fill="#514639" />
      {/* damp ring where the pot meets the pavement */}
      <ellipse cx={cx} cy={y + h} rx={w * 0.5} ry={3 * scale} fill="#0b1015" opacity="0.45" />
    </g>
  );
}

/* Japanese pillar post box — the red 〒 box from the blue-house reference.
   The one strong warm accent on the right, balancing the shop lanterns. */
function PostBox({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x + 11} y={y + 62} width="10" height="42" fill="#5e2018" />
      <rect x={x + 4} y={y + 98} width="24" height="7" rx="2" fill="#2a201c" />
      <rect x={x} y={y + 10} width="32" height="58" rx="3" fill="#a8331f" />
      <path d={`M${x},${y + 16} a16,14 0 0 1 32,0 z`} fill="#b93b23" />
      <rect x={x} y={y + 10} width="7" height="58" fill="#8d2a19" opacity="0.5" />
      <rect x={x + 5} y={y + 22} width="22" height="4" rx="1.5" fill="#3a1109" />
      <text x={x + 16} y={y + 42} textAnchor="middle" fontFamily="ui-sans-serif, sans-serif" fontSize="10" fill="#f2ded4" opacity="0.8">〒</text>
      <rect x={x + 6} y={y + 48} width="20" height="11" rx="1.5" fill="#f0e6d8" opacity="0.55" />
      <ellipse cx={x + 16} cy={y + 105} rx="17" ry="3.5" fill="#0b1015" opacity="0.5" />
    </g>
  );
}

/* A smaller, unlit machine further down the row — Japanese streets rarely
   have just one. Kept dim so it reads as company for the hero, not a rival. */
function SideMachine({ x, y, width = 76, height = 210 }: { x: number; y: number; width?: number; height?: number }) {
  return (
    <g opacity="0.92">
      <rect x={x} y={y} width={width} height={height} rx="3" fill="#3f4a4a" stroke="#222b2b" strokeWidth="1.5" />
      <rect x={x} y={y} width="6" height={height} fill="#4b5757" opacity="0.6" />
      <rect x={x + 5} y={y + 6} width={width - 10} height="16" rx="1.5" fill="#8d3630" />
      <text x={x + width / 2} y={y + 18} textAnchor="middle" fontFamily="ui-sans-serif, sans-serif" fontWeight="700" fontSize="9" fill="#e9d9cf" opacity="0.8">たばこ</text>
      {/* dim product window with a few facings */}
      <rect x={x + 6} y={y + 28} width={width - 12} height="96" rx="2" fill="#131a1c" stroke="#5d6a68" strokeWidth="1" />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect x={x + 8} y={y + 58 + row * 24} width={width - 16} height="5" fill="#4e5a58" opacity="0.7" />
          {[0, 1, 2, 3].map((c) => (
            <rect key={c} x={x + 10 + c * 15} y={y + 36 + row * 24} width="11" height="20" rx="1.5"
              fill={["#6d7f86", "#7d6a58", "#5f7a63", "#7a6f80"][(row + c) % 4]} opacity="0.55" />
          ))}
        </g>
      ))}
      <rect x={x + 6} y={y + 132} width={width - 12} height="10" rx="1.5" fill="#1b2224" />
      <circle cx={x + width - 16} cy={y + 156} r="7" fill="#2a3234" stroke="#525d5c" strokeWidth="1" />
      <rect x={x + 10} y={y + 150} width="26" height="12" rx="2" fill="#232b2c" />
      <rect x={x + 8} y={y + 176} width={width - 16} height="22" rx="2" fill="#10161a" />
      <rect x={x} y={y + height - 8} width={width} height="8" fill="#2a3230" />
    </g>
  );
}

/* Convex road mirror — the fixture that tells you instantly this is a narrow
   Japanese side street with a blind corner. */
function TrafficMirror({ x, y, r = 26 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <rect x={x - 3} y={y} width="6" height={604 - y} fill="#4a4f4c" />
      <rect x={x - 5} y="596" width="10" height="8" rx="1.5" fill="#313835" />
      <path d={`M${x},${y + 14} L${x - r * 0.5},${y - 4}`} stroke="#4a4f4c" strokeWidth="3" fill="none" />
      <circle cx={x - r * 0.55} cy={y - r * 0.72} r={r + 4} fill="#d4711f" opacity="0.9" />
      <circle cx={x - r * 0.55} cy={y - r * 0.72} r={r} fill="#5d7078" />
      <circle cx={x - r * 0.55} cy={y - r * 0.72} r={r} fill="url(#vm-mirrorSheen)" />
      <path d={`M${x - r * 0.55 - r * 0.6},${y - r * 0.72 - r * 0.3} a${r * 0.8},${r * 0.8} 0 0 1 ${r * 0.9},${-r * 0.4}`}
        fill="none" stroke="#cfe0e6" strokeWidth="2.5" opacity="0.35" />
    </g>
  );
}

/* Laundry pole across a balcony — everyday life, and it breaks the balcony's
   straight rail line. */
function Laundry({ x, y, width }: { x: number; y: number; width: number }) {
  const items = [
    { o: 0.12, w: 16, h: 30, fill: "#8d9aa2" },
    { o: 0.34, w: 13, h: 22, fill: "#a8907c" },
    { o: 0.54, w: 18, h: 34, fill: "#6f8290" },
    { o: 0.78, w: 11, h: 19, fill: "#93a08d" },
  ];
  return (
    <g>
      <line x1={x} y1={y} x2={x + width} y2={y} stroke="#6d7570" strokeWidth="2" />
      {items.map((it, i) => {
        const ix = x + width * it.o;
        return (
          <g key={i} opacity="0.72">
            <path d={`M${ix},${y + 1} l${it.w / 2},${it.h * 0.16} l${it.w / 2},${-it.h * 0.16} l0,${it.h} l${-it.w},0 z`} fill={it.fill} />
            <line x1={ix} y1={y + 1} x2={ix} y2={y + 4} stroke="#4c5450" strokeWidth="1" />
          </g>
        );
      })}
    </g>
  );
}

/* A compact, lived-in Japanese side street at blue hour. The environment
   frames the machine but never competes with it: ordinary infrastructure,
   low-rise facades, small light sources, and rain-darkened surfaces do the
   storytelling rather than novelty props. */
export function EnvironmentBack() {
  return (
    <g>
      <defs>
        <linearGradient id="vm-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#091119" />
          <stop offset="0.56" stopColor="#172329" />
          <stop offset="1" stopColor="#252422" />
        </linearGradient>
        <linearGradient id="vm-plaster" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4b4c44" />
          <stop offset="0.52" stopColor="#333834" />
          <stop offset="1" stopColor="#282e2c" />
        </linearGradient>
        <linearGradient id="vm-rightFacade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3c4744" />
          <stop offset="1" stopColor="#252f31" />
        </linearGradient>
        <linearGradient id="vm-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#333735" />
          <stop offset="1" stopColor="#0b1115" />
        </linearGradient>
        <linearGradient id="vm-awning" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#65543d" />
          <stop offset="1" stopColor="#302a23" />
        </linearGradient>
        <radialGradient id="vm-machineHalo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff0d0" stopOpacity="0.2" />
          <stop offset="0.58" stopColor="#dfc38e" stopOpacity="0.06" />
          <stop offset="1" stopColor="#dfc38e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vm-mirrorSheen" cx="0.36" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#cfe2e8" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#5d7078" stopOpacity="0.1" />
          <stop offset="1" stopColor="#1d2a2e" stopOpacity="0.5" />
        </radialGradient>
        <pattern id="vm-wallTexture" width="52" height="46" patternUnits="userSpaceOnUse">
          <path d="M4,10 l11,-2 M30,14 l7,1 M10,34 l5,-1 M38,38 l9,-1" stroke="#d0c9b2" strokeWidth="0.75" opacity="0.16" />
          <circle cx="23" cy="31" r="1.2" fill="#eee5ce" opacity="0.11" />
        </pattern>
      </defs>

      <rect x="-480" y="0" width="1440" height="680" fill="url(#vm-night)" />

      {/* Utility wires cross the small street, as they do in the references. */}
      <path d="M-480,0 H960 V132 C770,108 642,119 506,139 C178,187 -154,166 -480,191 Z" fill="#101a20" opacity="0.66" />
      <g fill="none" stroke="#090e12" strokeLinecap="round">
        <path d="M-480,64 C-190,98 125,120 448,91 C654,72 811,91 960,124" strokeWidth="3" />
        <path d="M-480,95 C-156,122 140,139 487,110 C683,93 816,112 960,149" strokeWidth="2.2" />
        <path d="M-322,27 C-92,70 176,76 410,56 C640,38 792,61 960,88" strokeWidth="1.5" opacity="0.84" />
      </g>
      {[-284, 502, 738].map((x) => <circle key={x} cx={x} cy={x === 502 ? 110 : 89} r="3" fill="#171e20" />)}

      {/* Closed neighbouring shop. It stays quiet so the machine remains the
          beacon, but it is broken up with real fittings — a shuttered bay is
          only half the wall, the rest carries a service door, meters, crates
          and a noren, so it reads as a building rather than a flat panel. */}
      <rect x="-480" y="150" width="530" height="454" fill="#222728" />
      <rect x="-480" y="145" width="530" height="11" fill="#111618" />

      {/* The shuttered bay, built as a real shopfront: two jambs and a lintel,
          with the shutter filling the opening exactly so it is centred by
          construction. Previously the shutter floated with 54 units of bare
          wall on one side and 12 on the other, and no jamb at all — at the
          frame's edge it just ran into the dark and read as cut off. */}
      <rect x="-292" y="184" width="210" height="14" rx="2" fill="#161c1d" />
      <rect x="-292" y="196" width="16" height="408" fill="#2c3331" />
      <rect x="-288" y="200" width="3" height="400" fill="#3d4643" opacity="0.55" />
      <rect x="-98" y="196" width="16" height="408" fill="#2c3331" />
      <rect x="-94" y="200" width="3" height="400" fill="#3d4643" opacity="0.55" />
      {/* opening -276..-98 → shutter is exactly the opening, so it is centred */}
      <Shutter x={-276} y={196} width={178} height={408} />
      {/* pull handle and lock, centred on the shutter */}
      <rect x="-197" y="566" width="20" height="4" rx="2" fill="#5a6462" opacity="0.8" />
      <circle cx="-187" cy="552" r="3" fill="#0c1113" />
      {/* a notice taped to the closed shutter */}
      <g transform="rotate(-1.5 -187 300)">
        <rect x="-211" y="272" width="48" height="60" rx="1" fill="#d9d2bd" opacity="0.5" stroke="#7b7460" strokeWidth="0.8" />
        {[284, 294, 304, 314, 324].map((ly, i) => (
          <line key={ly} x1="-205" y1={ly} x2={-205 + (i % 2 ? 26 : 34)} y2={ly} stroke="#4b4a3e" strokeWidth="0.9" opacity="0.55" />
        ))}
      </g>
      <rect x="28" y="150" width="18" height="454" fill="#151a1a" />
      <rect x="38" y="155" width="3" height="449" fill="#67533a" opacity="0.42" />

      {/* ---- the little tea shop next to the shutter ----
           Modelled on the green-door reference: timber post-and-beam front, a
           lit doorway behind a noren, a hand-lettered vertical sign, a chalk
           menu, small framed notices, and the clutter of a place that is
           actually open. This half used to be a bare grey panel. */}
      <rect x="-84" y="150" width="114" height="454" fill="#2b302c" />
      <rect x="-84" y="150" width="114" height="454" fill="url(#vm-wallTexture)" opacity="0.4" />
      <line x1="-84" y1="150" x2="-84" y2="604" stroke="#141a1a" strokeWidth="3" />
      {/* timber frame */}
      <g fill="#3f3527">
        <rect x="-84" y="150" width="9" height="454" />
        <rect x="21" y="150" width="9" height="454" />
        <rect x="-84" y="358" width="114" height="8" />
        <rect x="-84" y="196" width="114" height="9" />
      </g>
      {/* fascia board with hand-lettered shop name */}
      <rect x="-86" y="205" width="118" height="34" fill="#26332f" stroke="#171f1c" strokeWidth="1.5" />
      <text x="-27" y="228" textAnchor="middle" fontFamily="ui-serif, Georgia, serif" fontSize="17" fill="#cbbf9e" opacity="0.88">茶房 ねこ</text>
      {/* warm interior glow behind the doorway */}
      <rect x="-70" y="386" width="76" height="218" fill="#c98f45" opacity="0.16" />
      <Door x={-62} y={410} width={58} height={194} warm />
      {/* noren curtain over the doorway */}
      <g>
        <rect x="-70" y="392" width="74" height="26" fill="#2b4a5c" />
        <text x="-33" y="410" textAnchor="middle" fontFamily="ui-serif, Georgia, serif" fontSize="13" fill="#dfe8ea" opacity="0.75">ゆ</text>
        {[-52, -14].map((x) => <line key={x} x1={x} y1="394" x2={x} y2="418" stroke="#16242f" strokeWidth="1.5" />)}
        <rect x="-72" y="388" width="78" height="5" rx="1.5" fill="#3b3229" />
      </g>
      {/* vertical hanging sign board, lit from the lamp above */}
      <g>
        <rect x="-118" y="250" width="30" height="104" rx="2" fill="#e7dcc2" opacity="0.9" stroke="#8d8468" strokeWidth="1.5" />
        <rect x="-120" y="246" width="34" height="7" rx="2" fill="#3b3229" />
        {["茶", "と", "本"].map((ch, i) => (
          <text key={ch} x="-103" y={280 + i * 30} textAnchor="middle" fontFamily="ui-serif, Georgia, serif" fontSize="19" fill="#2f3a33">{ch}</text>
        ))}
        <line x1="-103" y1="238" x2="-103" y2="247" stroke="#2a2f2b" strokeWidth="1.5" />
      </g>
      {/* chalk menu board leaning by the door */}
      <g transform="rotate(-3 -104 470)">
        <rect x="-124" y="428" width="42" height="58" rx="2" fill="#5c4a33" />
        <rect x="-120" y="432" width="34" height="50" rx="1" fill="#1e2a26" />
        {[440, 449, 458, 467, 476].map((y, i) => (
          <line key={y} x1="-116" y1={y} x2={-116 + (i % 2 ? 20 : 26)} y2={y} stroke="#a8c7b0" strokeWidth="1.4" opacity={0.75} />
        ))}
      </g>
      {/* small framed notices beside the door */}
      {[[-80, 288, 22, 26], [-80, 322, 22, 20]].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx="1" fill="#d9d2bd" opacity="0.55" stroke="#7b7460" strokeWidth="0.8" />
          {[0.3, 0.55, 0.8].map((t) => (
            <line key={t} x1={x + 3} y1={y + h * t} x2={x + w - 4} y2={y + h * t} stroke="#4b4a3e" strokeWidth="0.7" opacity="0.5" />
          ))}
        </g>
      ))}
      {/* wall lamp over the sign */}
      <Lantern x={-96} y={222} />
      {/* a pair of red paper lanterns strung outside */}
      {[[-140, 262, 13], [-166, 272, 10]].map(([lx, ly, r], i) => (
        <g key={i}>
          <line x1={lx} y1={ly - 26} x2={lx} y2={ly - r - 2} stroke="#2a2a26" strokeWidth="1.2" />
          <ellipse cx={lx} cy={ly} rx={r} ry={r * 1.24} fill="#c2452a" />
          <ellipse cx={lx} cy={ly} rx={r} ry={r * 1.24} fill="#ff8352" opacity="0.32" />
          {[-0.55, 0, 0.55].map((t) => (
            <ellipse key={t} cx={lx} cy={Math.round((ly + r * 1.24 * t) * 100) / 100}
              rx={Math.round(r * Math.sqrt(1 - t * t) * 0.98 * 100) / 100} ry="1"
              fill="none" stroke="#8d2c18" strokeWidth="0.9" opacity="0.75" />
          ))}
          <rect x={lx - r * 0.34} y={ly + r * 1.2} width={r * 0.68} height="3" rx="1" fill="#2a2a26" />
        </g>
      ))}
      {/* meter box + conduit */}
      <rect x="6" y="300" width="24" height="36" rx="2" fill="#3d4441" />
      <rect x="10" y="306" width="16" height="12" rx="1.5" fill="#8b9089" opacity="0.5" />
      <path d="M18,336 C15,386 23,436 19,496" fill="none" stroke="#333b38" strokeWidth="2.5" />
      {/* stacked beer crates, a bucket, and a shop cat on top */}
      {[[-72, 550], [-72, 524], [-40, 550]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="34" height="24" rx="2" fill={i === 1 ? "#4a3b2a" : "#3f4a3c"} stroke="#1d2320" strokeWidth="1.2" />
          <line x1={x + 3} y1={y + 7} x2={x + 31} y2={y + 7} stroke="#1d2320" strokeWidth="1" opacity="0.6" />
          <line x1={x + 17} y1={y + 2} x2={x + 17} y2={y + 22} stroke="#1d2320" strokeWidth="1" opacity="0.5" />
        </g>
      ))}
      {/* the cat: a silhouette curled on the crate stack */}
      <g fill="#15191a">
        <ellipse cx="-55" cy="516" rx="17" ry="8" />
        <circle cx="-42" cy="510" r="7" />
        <path d="M-47,505 l1,-6 l5,3 z M-39,505 l4,-5 l2,6 z" />
        <path d="M-71,518 c-7,-2 -9,-9 -3,-11 c3,-1 4,2 2,4 c-2,2 0,5 3,5 z" />
      </g>
      <circle cx="-44" cy="510" r="1" fill="#c8d76a" opacity="0.85" />
      <circle cx="-40" cy="510" r="1" fill="#c8d76a" opacity="0.85" />
      {/* galvanised bucket by the crates */}
      <path d="M-20,578 L0,578 L-3,600 L-17,600 Z" fill="#59615c" stroke="#2b322e" strokeWidth="1.2" />
      <path d="M-20,578 Q-10,568 0,578" fill="none" stroke="#2b322e" strokeWidth="1.2" />
      {/* ivy taking the shop's corner post */}
      <ClimbingIvy x={26} y={600} height={250} leaf={9} fill="#2c5230" side={-1} opacity={0.95} />
      <HangingVine x={-86} y={205} length={132} leaf={9} amp={10} phase={1.1} fill="#2a5730" opacity={0.95} />
      {/* a second bicycle parked further down the alley, small and dim */}
      <g stroke="#2b3331" strokeWidth="2" fill="none" opacity="0.7">
        <circle cx="-208" cy="578" r="19" />
        <circle cx="-156" cy="578" r="19" />
        <path d="M-208,578 L-186,552 L-162,552 M-186,552 L-156,578 M-192,545 L-176,545" />
      </g>
      <rect x="-236" y="534" width="110" height="5" fill="#2e3935" opacity="0.54" />

      {/* Building behind the machine: plaster wall, fascia, awning, pipes, and
          one real condenser mounted to the adjacent service wall. */}
      <rect x="46" y="92" width="436" height="512" fill="url(#vm-plaster)" />
      <rect x="46" y="92" width="436" height="512" fill="url(#vm-wallTexture)" opacity="0.62" />
      <rect x="46" y="82" width="436" height="13" fill="#191d1c" />
      <path d="M56,101 H471 L452,136 H75 Z" fill="url(#vm-awning)" />
      <path d="M74,136 H452" stroke="#171918" strokeWidth="4" />
      {[92, 152, 212, 272, 332, 392].map((x) => <line key={x} x1={x} y1="101" x2={x - 10} y2="136" stroke="#8d7656" strokeWidth="1" opacity="0.4" />)}
      {/* Brackets tying the awning back to the wall. Without these the machine
          occludes the awning's middle and the two visible ends read as a pair
          of floating wedges rather than one canopy passing behind. */}
      {[[62, 74], [456, 448]].map(([xTop, xBot], i) => (
        <g key={i} stroke="#20241f" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d={`M${xTop},101 L${xBot},137`} />
          <path d={`M${xTop},101 L${xTop + (i ? -4 : 4)},152`} />
          <path d={`M${xTop + (i ? -3 : 3)},128 L${xBot},137`} strokeWidth="2" opacity="0.7" />
        </g>
      ))}
      <rect x="62" y="146" width="9" height="458" fill="#1f2723" />
      {[218, 376, 520].map((y) => <rect key={y} x="58" y={y} width="17" height="5" rx="2" fill="#4a5048" />)}
      <path d="M76,174 C99,188 92,208 87,226 C81,249 89,267 82,292" fill="none" stroke="#5a6259" strokeWidth="2" opacity="0.55" />
      <AirUnit x={402} y={160} scale={0.82} />
      <path d="M450,207 C466,234 456,271 462,301 C469,337 457,383 464,414" fill="none" stroke="#3c4a45" strokeWidth="2.2" />
      <Window x={413} y={290} width={35} height={62} warm />

      {/* Right: a recognisable low-rise apartment / shop facade. Windows have
          sills, doors meet the pavement, and the balcony and stair structure
          give it enough construction logic to read as a building. */}
      <rect x="492" y="128" width="468" height="476" fill="url(#vm-rightFacade)" />
      <rect x="492" y="128" width="468" height="476" fill="url(#vm-wallTexture)" opacity="0.32" />
      <rect x="492" y="118" width="468" height="11" fill="#1a2222" />
      {[171, 214, 257, 300, 343, 386].map((y) => <line key={y} x1="500" y1={y} x2="951" y2={y} stroke="#63706a" strokeWidth="1" opacity="0.22" />)}
      <rect x="502" y="137" width="158" height="467" fill="#48534c" opacity="0.34" />
      <rect x="664" y="137" width="287" height="467" fill="#1e282a" opacity="0.54" />
      <Window x={529} y={183} width={68} height={54} />
      <Balcony x={517} y={246} width={92} />
      <Door x={529} y={420} width={66} height={184} />
      <AirUnit x={610} y={308} scale={0.78} />
      <Lantern x={650} y={190} />
      <Window x={696} y={184} width={76} height={56} warm />
      <Balcony x={684} y={250} width={102} />
      <Laundry x={690} y={258} width={94} />
      <Door x={698} y={412} width={68} height={192} warm />

      {/* ---- right-side street furniture ----
           The gap between the two buildings, a second machine keeping the hero
           company, a projecting bar sign, the post box, and the convex mirror
           that marks a blind corner. All kept dimmer and cooler than the hero
           machine so the eye still lands on it first. */}

      {/* narrow gap between the buildings, with a light somewhere down it */}
      <rect x="482" y="150" width="12" height="454" fill="#070c0e" />
      <ellipse cx="488" cy="540" rx="12" ry="52" fill="#c79a55" opacity="0.13" />
      <rect x="482" y="150" width="12" height="8" fill="#141a1a" />

      {/* projecting illuminated sign over the walkway */}
      <g>
        <rect x="600" y="232" width="6" height="40" fill="#39423f" />
        <rect x="604" y="236" width="46" height="30" rx="2" fill="#1f2a2e" stroke="#4d5a5c" strokeWidth="1.2" />
        <rect x="607" y="239" width="40" height="24" rx="1.5" fill="#e0c98c" opacity="0.5" />
        <text x="627" y="256" textAnchor="middle" fontFamily="ui-serif, Georgia, serif" fontSize="13" fill="#2c2b25" opacity="0.85">酒処</text>
      </g>

      <SideMachine x={596} y={394} />
      {/* its cold spill onto the pavement */}
      <ellipse cx="634" cy="606" rx="52" ry="10" fill="#9fd0d8" opacity="0.07" />

      {/* stoops under the two doorways */}
      {[[522, 80], [692, 82]].map(([sx, sw], i) => (
        <g key={i}>
          <rect x={sx} y="596" width={sw} height="9" rx="1.5" fill="#4a534d" />
          <rect x={sx + 3} y="592" width={sw - 6} height="5" rx="1.5" fill="#59635c" opacity="0.8" />
        </g>
      ))}

      <PostBox x={730} y={498} />
      <TrafficMirror x={772} y={330} />

      {/* drip stain under the condenser */}
      <path d="M628,350 C626,392 632,432 629,470" fill="none" stroke="#2c3936" strokeWidth="3" opacity="0.5" />
      <ellipse cx="629" cy="604" rx="9" ry="3" fill="#0d1417" opacity="0.5" />

      {/* kerb bollards down the pavement edge */}
      {[560, 700, 764].map((bx) => (
        <g key={bx}>
          <rect x={bx} y="574" width="5" height="30" rx="2.5" fill="#48514d" />
          <rect x={bx} y="580" width="5" height="3" fill="#c8cbc2" opacity="0.45" />
        </g>
      ))}
      <Window x={742} y={300} width={48} height={44} />

      {/* The machine's glow, painted after every facade so it spills onto both
          sides of the street. Painted mid-stack it was sliced by the right
          facade, leaving a hard vertical seam and light that stopped dead. */}
      <ellipse cx="240" cy="340" rx="315" ry="300" fill="url(#vm-machineHalo)" />

      {/* Pavement runs the full width with a curb, so every door opens onto a
          footpath instead of straight onto the road. */}
      <rect x="-480" y="604" width="1440" height="76" fill="url(#vm-road)" />
      <rect x="-480" y="604" width="1440" height="18" fill="#2c2c29" />
      {/* plinths where the buildings meet the pavement */}
      <rect x="-480" y="596" width="530" height="10" fill="#1b201f" />
      <rect x="46" y="596" width="436" height="10" fill="#20241f" />
      <rect x="492" y="596" width="468" height="10" fill="#1b2323" />
      <line x1="-480" y1="623" x2="960" y2="623" stroke="#111719" strokeWidth="3" />
      <line x1="-480" y1="629" x2="960" y2="629" stroke="#52615b" strokeWidth="1" opacity="0.34" />
      {/* paving joints */}
      {[-444, -366, -288, -210, -132, -54, 24, 102, 180, 258, 336, 414, 492, 570, 648, 726, 804, 882].map((x) => (
        <line key={x} x1={x} y1="604" x2={x} y2="622" stroke="#1f2422" strokeWidth="1" opacity="0.5" />
      ))}
      {[-372, -226, -78, 476, 624, 812].map((x) => <rect key={x} x={x} y="636" width="64" height="2" rx="1" fill="#8ca19a" opacity="0.14" />)}
      <ellipse cx="240" cy="621" rx="188" ry="13" fill="#000" opacity="0.36" />
      <Planter x={-8} y={556} body="#6f4e39" leaf="#31593b" kind="fern" />
      <Planter x={34} y={566} body="#5b6564" leaf="#2c4d34" kind="grass" scale={0.9} />
      <Planter x={470} y={566} body="#72503b" leaf="#2c5235" kind="cane" />
      <Planter x={516} y={572} body="#4d5b52" leaf="#31573a" kind="shrub" scale={0.85} />
      <Planter x={676} y={568} body="#63665b" leaf="#31573a" kind="fern" scale={0.95} />
      <GrassTuft x={128} y={604} size={16} fill="#3a5f38" opacity={0.8} />
      <GrassTuft x={352} y={604} size={13} fill="#3a5f38" opacity={0.7} />
    </g>
  );
}

export function WetGround() {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <linearGradient id="vm-reflectionFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.44" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="vm-reflectionMask">
          <rect x="-480" y="622" width="1440" height="58" fill="url(#vm-reflectionFade)" />
        </mask>
      </defs>
      <rect x="-480" y="622" width="1440" height="58" fill="#0b1720" opacity="0.2" />
      <g mask="url(#vm-reflectionMask)">
        {/* matches the machine's footprint (x 90..390) */}
        <rect x="92" y="628" width="296" height="13" fill="#d0cfbf" opacity="0.3" />
        <rect x="100" y="642" width="280" height="16" fill="#2b6fae" opacity="0.23" />
        <path d="M106,657 C166,651 252,665 308,657 C340,652 370,658 386,655 L386,666 L106,666 Z" fill="#e6e8e4" opacity="0.16" />
      </g>
      {[
        { cx: -188, cy: 657, rx: 72, ry: 7, rim: "#5f7681" },
        { cx: 42, cy: 666, rx: 48, ry: 5, rim: "#a48154" },
        { cx: 524, cy: 654, rx: 58, ry: 6, rim: "#5f7681" },
        { cx: 790, cy: 666, rx: 70, ry: 6, rim: "#9a7747" },
      ].map(({ cx, cy, rx, ry, rim }) => (
        <g key={cx}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#0a1015" opacity="0.72" />
          <path d={`M${cx - rx},${cy - 1} C${cx - rx * 0.4},${cy - ry} ${cx + rx * 0.4},${cy - ry} ${cx + rx},${cy - 1}`}
            fill="none" stroke={rim} strokeWidth="1.2" opacity="0.28" />
        </g>
      ))}
      {[-420, -250, -70, 460, 620, 810].map((x) => <rect key={x} x={x} y="642" width="118" height="1.5" rx="0.75" fill="#d9e9e8" opacity="0.08" />)}
    </g>
  );
}

export function Atmosphere({ arriving = false }: { arriving?: boolean }) {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <filter id="vm-softLight" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <radialGradient id="vm-vignette" cx="0.5" cy="0.45" r="0.82">
          <stop offset="0.34" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.42" />
        </radialGradient>
        <radialGradient id="vm-beacon" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe8c2" stopOpacity="0.12" />
          <stop offset="1" stopColor="#ffe8c2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className={arriving ? "vm-arrive-dapples" : undefined}>
        <ellipse cx="240" cy="342" rx="270" ry="292" fill="url(#vm-beacon)" filter="url(#vm-softLight)" />
      </g>
      <rect x="-480" width="1440" height="680" fill="url(#vm-vignette)" />
    </g>
  );
}
