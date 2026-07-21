import { Fatsia } from "./Fatsia";

/* Golden-hour Japanese side street, spanning the full wide viewBox
   (-480..960). Layers back→front: sunset sky, sun glow in the gap between
   buildings, far roof silhouettes, then the near structures — a low house
   with a lit window and izakaya lantern on the left, a concrete-block wall
   with hedge overflow behind the machine, and on the right a second wall,
   the sunset gap (the payphone pole silhouettes against it), and a corner
   facade. Street floor: asphalt, curb, drain, manhole. Narrow screens crop
   to the machine: sky + roofline + block wall stay visible behind it. */
export function EnvironmentBack() {
  return (
    <g>
      <defs>
        <linearGradient id="vm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d4462" />
          <stop offset="0.45" stopColor="#7a5470" />
          <stop offset="0.7" stopColor="#c96f52" />
          <stop offset="0.88" stopColor="#eda05f" />
          <stop offset="1" stopColor="#f7c97e" />
        </linearGradient>
        <radialGradient id="vm-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#ffd98e" stopOpacity="0.7" />
          <stop offset="0.65" stopColor="#f2a65a" stopOpacity="0.28" />
          <stop offset="1" stopColor="#f2a65a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sky + sun pouring through the gap in the right block */}
      <rect x="-480" y="0" width="1440" height="420" fill="url(#vm-sky)" />
      <circle cx="615" cy="250" r="150" fill="url(#vm-sun)" />
      <circle cx="615" cy="250" r="22" fill="#fff6d8" opacity="0.85" />

      {/* thin evening clouds, lit from below */}
      {[[-300, 70, 380], [250, 40, 390], [700, 100, 240]].map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height="20" rx="10" fill="#554058" opacity="0.8" />
          <rect x={x + 14} y={y + 16} width={w - 28} height="4" rx="2" fill="#e09468" opacity="0.5" />
        </g>
      ))}
      {/* distant birds heading home */}
      <path d="M424,130 Q430,125 436,130 M464,146 Q470,141 476,146" fill="none" stroke="#241c26" strokeWidth="1.8" strokeLinecap="round" />

      {/* far roofline silhouettes (dip low inside the sunset gap) */}
      <path d="M-480,330 L-480,262 L-320,262 L-320,236 L-236,236 L-236,270 L-88,270 L-88,248 L40,248 L40,268 L240,268 L240,252 L430,252 L430,280 L560,280 L560,356 L610,356 L610,344 L680,344 L680,240 L800,240 L800,262 L960,262 L960,330 Z"
        fill="#241c26" />
      {/* tiny far utility pole inside the gap */}
      <g stroke="#241c26" strokeWidth="3">
        <line x1="612" y1="300" x2="612" y2="390" />
        <line x1="602" y1="312" x2="622" y2="312" />
      </g>

      {/* ===== left house: roof, eave, plaster + slat siding ===== */}
      <rect x="-480" y="200" width="428" height="28" fill="#322833" />
      <line x1="-480" y1="200" x2="-52" y2="200" stroke="#e8935a" strokeWidth="2" opacity="0.8" />
      <rect x="-480" y="228" width="428" height="18" fill="#241d22" />
      <rect x="-480" y="246" width="428" height="354" fill="#4a3f36" />
      {Array.from({ length: 26 }).map((_, i) => (
        <rect key={i} x={-478 + i * 16} y="462" width="13" height="136" fill={i % 2 ? "#3a2f28" : "#362b24"} />
      ))}
      <rect x="-480" y="454" width="428" height="8" fill="#2f2620" />
      {/* unlit window, then the lit frosted one */}
      <rect x="-430" y="300" width="50" height="68" fill="#241f22" stroke="#2a2126" strokeWidth="3" />
      <ellipse cx="-268" cy="334" rx="58" ry="42" fill="#ffce7e" opacity="0.15" />
      <rect x="-298" y="302" width="60" height="64" fill="#ffd9a0" opacity="0.9" />
      <g stroke="#2a2126" strokeWidth="3" fill="none">
        <rect x="-302" y="298" width="68" height="72" />
        <line x1="-268" y1="298" x2="-268" y2="370" />
        <line x1="-302" y1="334" x2="-234" y2="334" />
      </g>
      {/* izakaya lantern under the eave */}
      <line x1="-160" y1="246" x2="-160" y2="260" stroke="#2a2126" strokeWidth="2.5" />
      <ellipse cx="-160" cy="288" rx="34" ry="40" fill="#ff8c42" opacity="0.16" />
      <rect x="-170" y="258" width="20" height="7" rx="2" fill="#222" />
      <ellipse cx="-160" cy="288" rx="17" ry="24" fill="#e2571f" />
      <ellipse cx="-160" cy="288" rx="17" ry="24" fill="#ff8c42" opacity="0.45" />
      {[-14, -5, 4, 13].map((dy) => (
        <ellipse key={dy} cx="-160" cy={288 + dy} rx={17 * Math.sqrt(1 - (dy / 24) ** 2)} ry="1.8"
          fill="none" stroke="#a53c12" strokeWidth="1" opacity="0.7" />
      ))}
      <rect x="-168" y="310" width="16" height="6" rx="2" fill="#222" />

      {/* ===== center: concrete-block wall behind the machine ===== */}
      {/* far house behind the wall */}
      <rect x="40" y="268" width="390" height="66" fill="#241c26" />
      <rect x="-20" y="330" width="490" height="270" fill="#4e4a42" />
      <rect x="-20" y="330" width="490" height="12" fill="#5a564e" />
      <line x1="-20" y1="330" x2="470" y2="330" stroke="#d98a63" strokeWidth="1.5" opacity="0.5" />
      <g stroke="#423e37" strokeWidth="1" opacity="0.6">
        {[372, 414, 456, 498, 540, 582].map((y) => <line key={y} x1="-20" y1={y} x2="470" y2={y} />)}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 40} y1="342" x2={20 + i * 40} y2="600" />
        ))}
      </g>
      {/* hedge spilling over the wall cap */}
      <Fatsia x={10} y={332} size={44} rotate={196} fill="#2f5e33" sway />
      <Fatsia x={64} y={324} size={38} rotate={352} fill="#3c7a41" />
      <Fatsia x={150} y={330} size={42} rotate={188} fill="#356b3a" />
      <Fatsia x={255} y={322} size={36} rotate={8} fill="#2f5e33" />
      <Fatsia x={352} y={330} size={40} rotate={196} fill="#3c7a41" sway />
      <Fatsia x={432} y={326} size={44} rotate={350} fill="#356b3a" />
      {/* garden tree leaning out from behind the wall */}
      <path d="M-52,332 C-46,290 -60,240 -44,196 C-34,166 -46,140 -34,116 L-16,116 C-26,150 -12,178 -24,214 C-36,258 -20,296 -30,332 Z"
        fill="#3d2e24" stroke="#2b2019" strokeWidth="2" />
      <g>
        <ellipse cx="-64" cy="128" rx="58" ry="34" fill="#3c5a35" />
        <ellipse cx="8" cy="96" rx="64" ry="36" fill="#46683c" />
        <ellipse cx="-24" cy="70" rx="48" ry="28" fill="#3c5a35" />
        <path d="M56,74 C68,84 72,100 66,114" fill="none" stroke="#c9a24a" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
        <path d="M-66,52 C-50,42 -28,40 -10,46" fill="none" stroke="#c9a24a" strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />
      </g>

      {/* ===== right: wall segment, sunset gap, corner facade ===== */}
      <rect x="470" y="330" width="90" height="270" fill="#4e4a42" />
      <rect x="470" y="330" width="90" height="12" fill="#5a564e" />
      <g stroke="#423e37" strokeWidth="1" opacity="0.6">
        {[372, 414, 456, 498, 540, 582].map((y) => <line key={y} x1="470" y1={y} x2="560" y2={y} />)}
        {[500, 540].map((x) => <line key={x} x1={x} y1="342" x2={x} y2="600" />)}
      </g>
      {/* light spilling from the gap across the asphalt */}
      <polygon points="566,600 674,600 762,680 484,680" fill="#f2a65a" opacity="0.12" />
      {/* corner facade */}
      <rect x="680" y="190" width="280" height="30" fill="#322833" />
      <line x1="680" y1="190" x2="960" y2="190" stroke="#e8935a" strokeWidth="2" opacity="0.8" />
      <rect x="680" y="220" width="280" height="380" fill="#43382f" />
      <rect x="680" y="220" width="7" height="380" fill="#241d22" />
      <rect x="760" y="300" width="56" height="68" fill="#241f22" stroke="#2a2126" strokeWidth="3" />

      {/* pixel-moss: glitch tiles creeping across the walls */}
      {[[-372, 410], [-350, 452], [-180, 500], [90, 430], [230, 384], [724, 300], [762, 342]].map(([x, y], i) => (
        <g key={`px${i}`} fill="#2c4a2e" opacity="0.55">
          <rect x={x} y={y} width="10" height="10" />
          <rect x={x + 12} y={y + 4} width="8" height="8" opacity="0.7" />
          <rect x={x - 6} y={y + 12} width="7" height="7" opacity="0.5" />
          <rect x={x + 6} y={y + 14} width="9" height="9" opacity="0.8" />
        </g>
      ))}

      {/* power lines sagging across the alley, dark against the sky */}
      <g stroke="#17131a" strokeWidth="2.5" fill="none" opacity="0.9">
        <path d="M-480,96 C-160,140 300,150 656,152" />
        <path d="M-480,116 C-140,158 320,164 658,158" />
        <path d="M672,152 C780,138 880,118 960,104" />
        <path d="M672,158 C790,148 890,132 960,120" />
        <path d="M-60,205 C220,176 460,162 656,150" />
      </g>

      {/* beverage crates stacked beside the machine */}
      <g>
        <rect x="20" y="540" width="56" height="28" rx="2" fill="#2e5a8a" stroke="#1d3f66" strokeWidth="1.5" />
        {[34, 48, 62].map((x) => <rect key={x} x={x} y="546" width="8" height="16" rx="1" fill="#1d3f66" opacity="0.6" />)}
        <rect x="20" y="570" width="56" height="28" rx="2" fill="#a83c32" stroke="#7c2b24" strokeWidth="1.5" />
        {[34, 48, 62].map((x) => <rect key={x} x={x} y="576" width="8" height="16" rx="1" fill="#7c2b24" opacity="0.6" />)}
        <rect x="84" y="570" width="48" height="28" rx="2" fill="#a83c32" stroke="#7c2b24" strokeWidth="1.5" />
        {[96, 110].map((x) => <rect key={x} x={x} y="576" width="8" height="16" rx="1" fill="#7c2b24" opacity="0.6" />)}
      </g>

      {/* convex traffic mirror catching the sun */}
      <g>
        <rect x="807" y="318" width="6" height="284" rx="3" fill="#3b3630" stroke="#2a2622" strokeWidth="1" />
        <line x1="810" y1="318" x2="810" y2="304" stroke="#2a2622" strokeWidth="3" />
        <circle cx="810" cy="286" r="27" fill="#d96b2f" />
        <circle cx="810" cy="286" r="21" fill="#9fb3bd" />
        <ellipse cx="817" cy="280" rx="8" ry="5" fill="#f7c97e" opacity="0.8" />
      </g>

      {/* ===== street floor ===== */}
      <rect x="-480" y="600" width="1440" height="80" fill="#262019" />
      <rect x="-480" y="596" width="1440" height="7" fill="#4e4840" opacity="0.55" />
      <line x1="-480" y1="608" x2="960" y2="608" stroke="#17130f" strokeWidth="2" opacity="0.8" />
      {[-440, -350, -260, -170, 10, 440, 530, 700, 790, 880].map((x) => (
        <rect key={x} x={x} y="604" width="26" height="7" rx="1.5" fill="#17130f" opacity="0.9" />
      ))}
      <ellipse cx="-20" cy="646" rx="24" ry="8" fill="#1c1814" stroke="#3a332b" strokeWidth="1.5" />
      <ellipse cx="-20" cy="646" rx="14" ry="4.5" fill="none" stroke="#3a332b" strokeWidth="1" opacity="0.7" />
      <ellipse cx="240" cy="614" rx="190" ry="16" fill="#000" opacity="0.45" />
      {/* weeds at the wall bases */}
      {[[-420, 610, 30, 7], [-90, 612, 26, 6], [246, 614, 30, 7], [500, 610, 28, 6], [742, 612, 30, 7]].map(([x, y, rx, ry], i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#4a5a34" opacity="0.55" />
      ))}
    </g>
  );
}

/* "After rain" pass, drawn directly on top of the ground band: a damp warm
   wash, the machine's lit face mirrored into the asphalt, glints under the
   lantern / live CRT / payphone, puddles that carry the sunset, and thin
   sheen streaks. Static — all motion stays in Atmosphere and the machine. */
export function WetGround() {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        {/* reflections die off quickly with distance from the object's base */}
        <linearGradient id="vm-reflFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="vm-reflMask">
          <rect x="-480" y="620" width="1440" height="60" fill="url(#vm-reflFade)" />
        </mask>
      </defs>

      {/* damp wash: evening warmth settling on the asphalt */}
      <rect x="-480" y="600" width="1440" height="80" fill="#2a1620" opacity="0.14" />

      {/* pool of light the lit machine throws on the wet ground */}
      <ellipse cx="240" cy="642" rx="210" ry="30" fill="#ffcf9a" opacity="0.08" />

      {/* the machine's face, mirrored: base sliver, blue door (wave + dark
          dispense notch), then the cream body fading with distance */}
      <g mask="url(#vm-reflMask)">
        <rect x="92" y="622" width="296" height="5" rx="2" fill="#4a463e" opacity="0.7" />
        <rect x="94" y="627" width="292" height="20" rx="3" fill="#2b7ccb" opacity="0.6" />
        <rect x="152" y="630" width="136" height="8" rx="3" fill="#14171b" opacity="0.6" />
        <path d="M104,641 C160,634 250,646 300,639 C336,634 366,640 386,637 L386,647 L104,647 Z" fill="#f2f5f8" opacity="0.4" />
        <rect x="94" y="647" width="292" height="22" rx="3" fill="#e8e6de" opacity="0.55" />
        {/* dry streaks interrupting the reflection */}
        <rect x="80" y="634" width="320" height="2" fill="#262019" opacity="0.7" />
        <rect x="80" y="653" width="320" height="2.5" fill="#262019" opacity="0.7" />
      </g>

      {/* warm glint under the izakaya lantern */}
      <ellipse cx="-160" cy="632" rx="8" ry="12" fill="#ff8c42" opacity="0.14" />
      <ellipse cx="-160" cy="628" rx="4.5" ry="7" fill="#e2571f" opacity="0.16" />
      {/* the lit window's smear */}
      <ellipse cx="-268" cy="630" rx="20" ry="6" fill="#ffd9a0" opacity="0.1" />

      {/* green spill from the one CRT still alive, and the payphone box */}
      <ellipse cx="-258" cy="612" rx="26" ry="5" fill="#8fd694" opacity="0.12" />
      <ellipse cx="653" cy="628" rx="18" ry="4" fill="#2f7d3f" opacity="0.12" />

      {/* puddles — every one carries a little sunset; the one in the gap's
          light gets a piece of open sky */}
      {[
        { cx: -60, cy: 650, rx: 46, ry: 7, rim: "#b07a88" },
        { cx: -330, cy: 660, rx: 38, ry: 6.5, rim: "#b07a88" },
        { cx: 520, cy: 644, rx: 34, ry: 6, rim: "#f2a65a" },
        { cx: 340, cy: 660, rx: 24, ry: 5, rim: "#d9c9a8" },
      ].map(({ cx, cy, rx, ry, rim }, i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#12181a" opacity="0.85" />
          <path d={`M${cx - rx},${cy - 1} C${cx - rx * 0.5},${cy - ry} ${cx + rx * 0.5},${cy - ry} ${cx + rx},${cy - 1}`}
            fill="none" stroke={rim} strokeWidth="1.5" opacity="0.3" />
        </g>
      ))}
      <ellipse cx="520" cy="644" rx="20" ry="3.5" fill="#d97b4f" opacity="0.3" />

      {/* thin sheen streaks across the asphalt */}
      {[[-420, 622, 130], [-180, 664, 170], [60, 671, 150], [420, 655, 180], [700, 640, 150], [-40, 612, 90]].map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height="1.5" rx="0.75" fill="#ffd9a0" opacity="0.08" />
      ))}
    </g>
  );
}

/* Front-most atmosphere: golden-hour dapples + vignette over the full scene.
   MUST stay pointer-events:none or it will swallow clicks on the machine.
   `arriving` fades the dapples in on the first load (B1 arrival beat). */
export function Atmosphere({ arriving = false }: { arriving?: boolean }) {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <filter id="vm-softLight" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <radialGradient id="vm-vignette" cx="0.5" cy="0.42" r="0.75">
          <stop offset="0.4" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <g className={arriving ? "vm-arrive-dapples" : undefined} filter="url(#vm-softLight)" fill="#ffd9a0">
        <ellipse cx="120" cy="120" rx="60" ry="34" opacity="0.16" />
        <ellipse cx="290" cy="70" rx="80" ry="30" opacity="0.14" />
        <ellipse cx="200" cy="300" rx="46" ry="70" opacity="0.10" />
        <ellipse cx="330" cy="430" rx="54" ry="40" opacity="0.12" />
        <ellipse cx="90" cy="500" rx="40" ry="26" opacity="0.10" />
        <ellipse cx="-350" cy="180" rx="70" ry="36" opacity="0.10" />
        <ellipse cx="-160" cy="90" rx="90" ry="32" opacity="0.12" />
        <ellipse cx="-240" cy="480" rx="55" ry="40" opacity="0.09" />
        <ellipse cx="540" cy="140" rx="80" ry="34" opacity="0.12" />
        <ellipse cx="700" cy="420" rx="60" ry="46" opacity="0.10" />
        <ellipse cx="860" cy="200" rx="70" ry="30" opacity="0.10" />
      </g>
      <rect x="-480" width="1440" height="680" fill="url(#vm-vignette)" />
    </g>
  );
}
