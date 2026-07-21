import { Fatsia } from "./Fatsia";

/* --- small storefront helpers ------------------------------------------ */

/* Corrugated roller shutter (シャッター) — the closed-shop texture. */
function Shutter({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const rows = Math.max(1, Math.floor(h / 7));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#191b1d" />
      {Array.from({ length: rows }).map((_, i) => (
        <rect key={i} x={x} y={y + i * 7} width={w} height="3.5" fill="#23272a" opacity="0.9" />
      ))}
      <rect x={x} y={y + h - 7} width={w} height="7" rx="1" fill="#0e1012" />
    </g>
  );
}

/* A tapered plant pot; `lit` warms the machine-facing side. */
function Pot({ x, y, w, h, body, rim, lit = false }: { x: number; y: number; w: number; h: number; body: string; rim: string; lit?: boolean }) {
  const inset = h * 0.16;
  return (
    <g>
      <path d={`M${x},${y} L${x + w},${y} L${x + w - inset},${y + h} L${x + inset},${y + h} Z`} fill={body} />
      {lit && <path d={`M${x},${y} L${x + w * 0.4},${y} L${x + w * 0.4 - inset},${y + h} L${x + inset},${y + h} Z`} fill="#000" opacity="0.28" />}
      <rect x={x - 2.5} y={y - 4} width={w + 5} height="6" rx="1.5" fill={rim} />
    </g>
  );
}

/* Wall-mounted meter box on the café's side wall. */
function MeterBox({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="24" height="18" rx="1" fill="#15171a" stroke="#0b0d0f" strokeWidth="1" />
      <rect x={x + 3} y={y + 4} width="11" height="6" fill="#2b2f33" />
      <circle cx={x + 19} cy={y + 6} r="2" fill="#33393f" />
    </g>
  );
}

/* A dim, distant office/skyline window; `lit` gives it a quiet glow. */
function Win({ x, y, w = 22, h = 26, lit = false, warm = false }: { x: number; y: number; w?: number; h?: number; lit?: boolean; warm?: boolean }) {
  return (
    <rect x={x} y={y} width={w} height={h}
      fill={lit ? (warm ? "#a8814a" : "#5f757e") : "#141a1e"}
      stroke="#0f1214" strokeWidth="1.5" opacity={lit ? 0.85 : 1} />
  );
}

/* --- the scene --------------------------------------------------------- */

/* A quiet night nook: the vending machine is the one bright thing — the star
   — nestled against a simple closed café and half-embraced by potted plants.
   Everything else recedes into supporting shadow: a roller-shuttered neighbour
   on the left, and on the right the alley opens onto a dark city skyline with
   a small, dim phone booth set back down the lane (Payphone.tsx). Narrow
   screens crop to the machine, its awning, and the nearest plants. */
export function EnvironmentBack() {
  return (
    <g>
      <defs>
        <linearGradient id="vm-nightsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#080912" />
          <stop offset="0.55" stopColor="#12101c" />
          <stop offset="1" stopColor="#201925" />
        </linearGradient>
        <radialGradient id="vm-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffeccb" stopOpacity="0.32" />
          <stop offset="0.45" stopColor="#f2dcb4" stopOpacity="0.12" />
          <stop offset="1" stopColor="#f2dcb4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vm-winglow" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#c99a58" stopOpacity="0.7" />
          <stop offset="1" stopColor="#a06f38" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* deep night sky — a sliver above the shopfront, open over the city */}
      <rect x="-480" y="0" width="1440" height="620" fill="url(#vm-nightsky)" />
      <ellipse cx="120" cy="90" rx="520" ry="80" fill="#33263a" opacity="0.18" />
      <ellipse cx="740" cy="340" rx="360" ry="240" fill="#241c2c" opacity="0.35" />

      {/* upper-left alley gap: distant rooftops */}
      <path d="M-480,150 L-480,64 L-392,64 L-392,120 L-300,120 L-300,88 L-232,88 L-232,150 Z" fill="#0d0e16" />
      {[[-452, 84, true], [-360, 100, false], [-274, 106, true]].map(([x, y, lit], i) => (
        <rect key={i} x={x as number} y={y as number} width="8" height="10" fill={lit ? "#c99a58" : "#171a24"} opacity={lit ? 0.6 : 1} />
      ))}

      {/* ========= RIGHT: a Japanese alley opening onto the night city ====== */}
      {/* far layered skyline silhouettes with a few scattered lights */}
      <path d="M812,600 L812,138 L856,138 L856,100 L900,100 L900,156 L960,156 L960,600 Z" fill="#0f141b" />
      <rect x="912" y="58" width="34" height="542" fill="#0c1016" />
      {[[820, 158, true], [840, 210, false], [864, 124, false], [868, 200, true], [918, 110, false], [918, 220, true], [938, 160, false]].map(([x, y, lit], i) => (
        <rect key={`fw${i}`} x={x as number} y={y as number} width="7" height="9" fill={lit ? "#b89a5e" : "#141a20"} opacity={lit ? 0.55 : 1} />
      ))}

      {/* a mid building across a side street, receding, with dim windows */}
      <rect x="512" y="196" width="224" height="404" fill="#11161c" />
      <g stroke="#0c1116" strokeWidth="1" opacity="0.6">
        {[250, 310, 370, 430].map((y) => <line key={y} x1="512" y1={y} x2="736" y2={y} />)}
      </g>
      {([[528, 230, false], [600, 232, true], [672, 230, false], [560, 300, true], [690, 362, false]] as [number, number, boolean][]).map(([x, y, lit], i) => (
        <Win key={`sb${i}`} x={x} y={y} w={20} h={24} lit={lit} />
      ))}
      {/* dim warm glow of shops from the far end of the side street */}
      <ellipse cx="624" cy="596" rx="150" ry="66" fill="#a06f38" opacity="0.1" />
      {[[560, 556, false], [600, 552, true], [648, 558, false], [688, 552, true]].map(([x, y, warm], i) => (
        <rect key={`ss${i}`} x={x as number} y={y as number} width="16" height="7" rx="1" fill={warm ? "#d99a4e" : "#b8443a"} opacity="0.3" />
      ))}

      {/* the office tower — dark and quiet, receding, not competing */}
      <rect x="736" y="120" width="212" height="480" fill="#1b221d" />
      <rect x="736" y="120" width="212" height="6" fill="#252e27" />
      <g stroke="#141a16" strokeWidth="2" opacity="0.7">
        {[168, 216, 264, 312, 360, 408, 456].map((y) => <line key={y} x1="736" y1={y} x2="948" y2={y} />)}
      </g>
      {/* a sparse scatter of dim lit windows among the dark */}
      {Array.from({ length: 6 }).flatMap((_, c) =>
        Array.from({ length: 7 }).map((_, r) => {
          const x = 748 + c * 32;
          const y = 138 + r * 48;
          const lit = (c * 5 + r * 3) % 5 === 0;
          const warm = (c + r) % 2 === 0;
          return (
            <rect key={`ow${c}-${r}`} x={x} y={y} width="18" height="26"
              fill={lit ? (warm ? "#9a7742" : "#566a72") : "#0f1418"} opacity={lit ? 0.7 : 1} />
          );
        })
      )}
      {/* red aviation warning lights down the tower's corner (atmospheric) */}
      {[150, 216, 282, 348, 414, 480].map((y) => (
        <g key={y}>
          <circle cx={740} cy={y} r="4" fill="#d63328" opacity="0.22" />
          <circle cx={740} cy={y} r="1.6" fill="#e85446" />
        </g>
      ))}
      {/* rooftop water tank + antenna */}
      <rect x="856" y="98" width="40" height="22" rx="2" fill="#161d18" />
      {[862, 872, 882, 890].map((x) => <line key={x} x1={x} y1="98" x2={x} y2="120" stroke="#0d1210" strokeWidth="1" />)}
      <line x1="908" y1="120" x2="908" y2="82" stroke="#101613" strokeWidth="2" />
      <circle cx="908" cy="82" r="1.8" fill="#e85446" />

      {/* the faint glow of shops across the way, low in the gap */}
      <ellipse cx="620" cy="600" rx="200" ry="90" fill="#a06f38" opacity="0.09" />

      {/* ===== LEFT: shuttered neighbour the CRT pile leans against ===== */}
      <rect x="-480" y="150" width="516" height="450" fill="#131417" />
      <Shutter x={-440} y={168} w={470} h={432} />
      <rect x="28" y="150" width="10" height="450" fill="#0a0c0e" />
      <rect x="38" y="150" width="3" height="450" fill="#2c2620" opacity="0.55" />

      {/* ===== CENTER: the simple café the machine belongs to ===== */}
      <rect x="42" y="80" width="430" height="540" fill="#16130e" />
      {/* hard right corner: a shadowed side-wall so the café keeps its own
          mass against the city, with a couple of quiet meters on it */}
      <rect x="472" y="120" width="26" height="500" fill="#0b0906" />
      <rect x="470" y="120" width="3" height="500" fill="#382d20" opacity="0.6" />
      <rect x="482" y="150" width="7" height="470" fill="#0d0b07" />
      {[220, 360].map((y) => <MeterBox key={y} x={476} y={y} />)}

      {/* a dim warm café window beside the machine — soft ambient, not a
          second bright light */}
      <ellipse cx="436" cy="380" rx="52" ry="90" fill="url(#vm-winglow)" opacity="0.5" />
      <rect x="410" y="330" width="52" height="118" rx="2" fill="#8a6836" opacity="0.55" />
      <rect x="410" y="330" width="52" height="118" rx="2" fill="none" stroke="#0f0c08" strokeWidth="3" />
      <line x1="436" y1="330" x2="436" y2="448" stroke="#0f0c08" strokeWidth="1.25" />
      <line x1="410" y1="389" x2="462" y2="389" stroke="#0f0c08" strokeWidth="1.25" />

      {/* backlit nameplate — quiet, one line */}
      <rect x="86" y="20" width="336" height="30" rx="2" fill="#14110b" stroke="#241b12" strokeWidth="1.5" />
      <text x="254" y="41" textAnchor="middle" fontFamily="ui-serif, Georgia, serif" fontStyle="italic" fontSize="16" fill="#c9a06a" opacity="0.62">
        café ICREATE
      </text>

      {/* simple striped awning with a clean straight edge */}
      <g>
        <rect x="52" y="54" width="404" height="24" fill="#1a120d" />
        {Array.from({ length: 13 }).map((_, i) => (
          <rect key={i} x={52 + i * 31} y="54" width="15" height="24" fill={i % 2 ? "#5a2620" : "#3a322a"} opacity="0.75" />
        ))}
        <rect x="52" y="52" width="404" height="4" fill="#241a14" />
        <rect x="52" y="78" width="404" height="4" fill="#120c08" />
      </g>

      {/* the machine's glow on the wall behind it — the beacon */}
      <ellipse cx="240" cy="330" rx="330" ry="370" fill="url(#vm-halo)" />

      {/* a single drain pipe on the shop wall left of the machine */}
      <rect x="70" y="80" width="9" height="520" fill="#14110c" />
      {[200, 380].map((y) => <rect key={y} x="67" y={y} width="15" height="5" rx="1.5" fill="#241d15" />)}

      {/* a little pixel-moss, kept faint */}
      {[[-330, 500], [-150, 490], [486, 420]].map(([x, y], i) => (
        <g key={`px${i}`} fill="#2c4a2e" opacity="0.4">
          <rect x={x} y={y} width="9" height="9" />
          <rect x={x + 11} y={y + 4} width="7" height="7" opacity="0.7" />
          <rect x={x + 5} y={y + 13} width="8" height="8" opacity="0.8" />
        </g>
      ))}

      {/* a few overhead wires crossing the alley, dark against the sky */}
      <g stroke="#0a0810" strokeWidth="2.5" fill="none" opacity="0.85">
        <path d="M-480,80 C-160,130 300,128 520,110" />
        <path d="M-40,150 C220,122 440,112 520,116" />
        <path d="M520,110 C660,102 820,124 960,152" />
      </g>

      {/* ===== the potted-plant nest, left of the machine ===== */}
      <path d="M48,600 C40,520 58,470 46,404 C40,360 56,300 46,236 C42,196 70,150 120,116 C170,84 240,92 300,104"
        fill="none" stroke="#241a12" strokeWidth="5" strokeLinecap="round" />
      <path d="M46,300 C24,262 14,232 22,206" fill="none" stroke="#241a12" strokeWidth="3" strokeLinecap="round" />
      <rect x="-6" y="556" width="96" height="46" fill="#2a2926" stroke="#171613" strokeWidth="1.5" />
      {[22, 50].map((x) => <rect key={x} x={x} y="562" width="16" height="34" rx="1" fill="#1c1b18" opacity="0.6" />)}
      <Pot x={-14} y={520} w={40} h={40} body="#7a4028" rim="#8f4d31" lit />
      <Pot x={34} y={524} w={44} h={40} body="#3f4a5e" rim="#4a5670" lit />
      <Pot x={70} y={544} w={34} h={34} body="#b7ac96" rim="#c6bca6" lit />
      <Pot x={6} y={560} w={50} h={44} body="#8a5636" rim="#9c6440" lit />
      <Pot x={58} y={568} w={40} h={38} body="#41506e" rim="#c8d0dc" lit />
      <Fatsia x={12} y={520} size={64} rotate={198} fill="#22482a" sway />
      <Fatsia x={62} y={512} size={54} rotate={344} fill="#2f5e33" />
      <Fatsia x={-8} y={540} size={48} rotate={176} fill="#356b3a" sway />
      <Fatsia x={96} y={548} size={44} rotate={20} fill="#27522b" />
      <Fatsia x={40} y={556} size={40} rotate={300} fill="#3c7a41" />
      <Fatsia x={40} y={300} size={34} rotate={250} fill="#2f5e33" />
      <Fatsia x={34} y={214} size={30} rotate={214} fill="#356b3a" />
      <Fatsia x={92} y={150} size={40} rotate={196} fill="#3c7a41" sway />
      <Fatsia x={168} y={112} size={44} rotate={172} fill="#2f5e33" sway />
      <Fatsia x={244} y={104} size={38} rotate={158} fill="#356b3a" />
      <Fatsia x={80} y={540} size={30} rotate={12} fill="#4b8a4f" />

      {/* ===== street floor: raised tiled plinth + road ===== */}
      <rect x="-480" y="600" width="1440" height="80" fill="#100d08" />
      <rect x="40" y="600" width="452" height="20" fill="#211d16" />
      <rect x="40" y="600" width="452" height="4" fill="#322b20" opacity="0.7" />
      <rect x="40" y="618" width="452" height="4" fill="#000" opacity="0.5" />
      <line x1="-480" y1="626" x2="960" y2="626" stroke="#0a0805" strokeWidth="2" opacity="0.8" />
      {[-360, -250, 300, 780].map((x) => (
        <rect key={x} x={x} y="632" width="30" height="8" rx="1.5" fill="#0a0805" opacity="0.9" />
      ))}
      <ellipse cx="150" cy="656" rx="26" ry="8" fill="#151009" stroke="#2e281f" strokeWidth="1.5" />
      <ellipse cx="150" cy="656" rx="15" ry="4.5" fill="none" stroke="#2e281f" strokeWidth="1" opacity="0.6" />
      <ellipse cx="240" cy="618" rx="188" ry="14" fill="#000" opacity="0.5" />
      {[[-410, 622, 26, 6], [470, 620, 22, 6]].map(([x, y, rx, ry], i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#2c3a22" opacity="0.55" />
      ))}
    </g>
  );
}

/* "After rain" pass on the road: a damp cool wash at night and the lit
   machine mirrored into the wet asphalt — the star's reflection. Quiet
   elsewhere. Static. */
export function WetGround() {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <linearGradient id="vm-reflFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="vm-reflMask">
          <rect x="-480" y="622" width="1440" height="58" fill="url(#vm-reflFade)" />
        </mask>
      </defs>

      <rect x="-480" y="622" width="1440" height="58" fill="#0e1420" opacity="0.2" />
      <ellipse cx="240" cy="648" rx="205" ry="28" fill="#ffe0b0" opacity="0.09" />

      {/* the machine's lit face mirrored into the asphalt */}
      <g mask="url(#vm-reflMask)">
        <rect x="92" y="624" width="296" height="5" rx="2" fill="#4a463e" opacity="0.65" />
        <rect x="94" y="629" width="292" height="20" rx="3" fill="#2b7ccb" opacity="0.55" />
        <rect x="152" y="632" width="136" height="8" rx="3" fill="#14171b" opacity="0.6" />
        <path d="M104,643 C160,636 250,648 300,641 C336,636 366,642 386,639 L386,649 L104,649 Z" fill="#f2f5f8" opacity="0.38" />
        <rect x="94" y="649" width="292" height="22" rx="3" fill="#e8e6de" opacity="0.5" />
        <rect x="80" y="636" width="320" height="2" fill="#100d08" opacity="0.7" />
        <rect x="80" y="655" width="320" height="2.5" fill="#100d08" opacity="0.7" />
      </g>
      {/* faint warm smear from the café window */}
      <ellipse cx="436" cy="640" rx="24" ry="8" fill="#c99a58" opacity="0.1" />
      {/* green spill from the one CRT still alive */}
      <ellipse cx="-258" cy="616" rx="26" ry="5" fill="#8fd694" opacity="0.11" />

      {/* a couple of puddles, quiet */}
      {[
        { cx: 120, cy: 660, rx: 44, ry: 6.5, rim: "#e0a35c" },
        { cx: -60, cy: 652, rx: 40, ry: 6.5, rim: "#5a6a86" },
        { cx: -330, cy: 662, rx: 36, ry: 6, rim: "#5a6a86" },
      ].map(({ cx, cy, rx, ry, rim }, i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#0d1214" opacity="0.85" />
          <path d={`M${cx - rx},${cy - 1} C${cx - rx * 0.5},${cy - ry} ${cx + rx * 0.5},${cy - ry} ${cx + rx},${cy - 1}`}
            fill="none" stroke={rim} strokeWidth="1.4" opacity="0.28" />
        </g>
      ))}
      {[[-420, 632, 130], [-180, 668, 160], [60, 672, 150], [420, 660, 150]].map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height="1.5" rx="0.75" fill="#ffe0b0" opacity="0.06" />
      ))}
    </g>
  );
}

/* Front-most atmosphere at night: a warm beacon bloom around the machine and
   a deep vignette pulling the edges into shadow, so the star stands alone.
   MUST stay pointer-events:none. `arriving` fades it in on first load. */
export function Atmosphere({ arriving = false }: { arriving?: boolean }) {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <filter id="vm-softLight" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <radialGradient id="vm-vignette" cx="0.5" cy="0.44" r="0.7">
          <stop offset="0.3" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id="vm-beacon" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe8c2" stopOpacity="0.17" />
          <stop offset="1" stopColor="#ffe8c2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className={arriving ? "vm-arrive-dapples" : undefined}>
        <ellipse cx="240" cy="340" rx="285" ry="305" fill="url(#vm-beacon)" filter="url(#vm-softLight)" />
      </g>
      <rect x="-480" width="1440" height="680" fill="url(#vm-vignette)" />
    </g>
  );
}
