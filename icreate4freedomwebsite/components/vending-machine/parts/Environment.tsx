/* Scene behind the machine: wood-slat wall, ground, tree trunks, power
   lines, lantern, lattice junk. Spans the full wide viewBox (-480..960) —
   narrow screens crop to the machine, wide screens see the whole alley. */
export function EnvironmentBack() {
  return (
    <g>
      <rect x="-480" width="1440" height="680" fill="#141a14" />
      {Array.from({ length: 48 }).map((_, i) => (
        <rect key={i} x={-480 + i * 30} y="0" width="27" height="620"
          fill={i % 3 === 0 ? "#1a221a" : i % 3 === 1 ? "#161d16" : "#121812"} />
      ))}
      {/* pixel-moss: glitch tiles creeping across the wall */}
      {[[-372, 210], [-350, 250], [-180, 120], [520, 180], [560, 214], [820, 260]].map(([x, y], i) => (
        <g key={`px${i}`} fill="#2c4a2e" opacity="0.55">
          <rect x={x} y={y} width="10" height="10" />
          <rect x={x + 12} y={y + 4} width="8" height="8" opacity="0.7" />
          <rect x={x - 6} y={y + 12} width="7" height="7" opacity="0.5" />
          <rect x={x + 6} y={y + 14} width="9" height="9" opacity="0.8" />
        </g>
      ))}
      {/* power lines sagging across the alley (pass behind the machine) */}
      <g stroke="#0d110d" strokeWidth="2.5" fill="none" opacity="0.9">
        <path d="M-480,96 C-160,140 300,150 656,152" />
        <path d="M-480,116 C-140,158 320,164 658,158" />
        <path d="M672,152 C780,138 880,118 960,104" />
        <path d="M672,158 C790,148 890,132 960,120" />
      </g>
      {/* lattice junk leaning left of the machine */}
      <g stroke="#3d4438" strokeWidth="2" opacity="0.6">
        {[0, 14, 28, 42].map((o) => <line key={`a${o}`} x1={4 + o} y1="430" x2={34 + o} y2="600" />)}
        {[0, 14, 28, 42].map((o) => <line key={`b${o}`} x1={46 - o} y1="430" x2={8 - o} y2="600" />)}
      </g>
      {/* tree trunks: the near one right of the machine, filler on the far sides */}
      <path d="M-364,620 C-358,480 -370,360 -362,220 C-356,120 -366,60 -360,0 L-332,0 C-338,90 -328,200 -336,320 C-344,460 -330,540 -338,620 Z"
        fill="#4a3828" stroke="#382a1e" strokeWidth="2" opacity="0.9" />
      <path d="M836,620 C842,500 830,380 840,240 C846,140 836,60 842,0 L868,0 C862,110 872,230 864,350 C856,470 870,540 862,620 Z"
        fill="#4a3828" stroke="#382a1e" strokeWidth="2" opacity="0.9" />
      <path d="M398,620 C404,500 392,420 402,320 C410,230 396,150 404,60 L428,60 C422,160 434,240 426,330 C418,430 432,520 424,620 Z"
        fill="#54402e" stroke="#3d2e20" strokeWidth="2" />
      {/* paper lantern, hanging from a branch of the near trunk */}
      <g>
        <path d="M424,70 C433,60 443,57 452,60" stroke="#3d2e20" strokeWidth="4" fill="none" />
        <rect x="438" y="56" width="20" height="7" rx="2" fill="#222" />
        <ellipse cx="448" cy="92" rx="26" ry="30" fill="#e2571f" />
        <ellipse cx="448" cy="92" rx="26" ry="30" fill="#ff8c42" opacity="0.45" />
        {[-18, -8, 2, 12, 22].map((dy) => (
          <ellipse key={dy} cx="448" cy={92 + dy} rx={26 * Math.sqrt(1 - (dy / 30) ** 2)} ry="2"
            fill="none" stroke="#a53c12" strokeWidth="1" opacity="0.7" />
        ))}
        <rect x="438" y="120" width="20" height="6" rx="2" fill="#222" />
      </g>
      {/* ground */}
      <rect x="-480" y="600" width="1440" height="80" fill="#20241d" />
      <ellipse cx="240" cy="614" rx="190" ry="16" fill="#000" opacity="0.45" />
      {[[60, 640, 30, 8], [200, 655, 44, 9], [380, 636, 26, 7], [-300, 646, 48, 9], [-120, 634, 30, 7], [-430, 660, 36, 8], [560, 650, 40, 8], [720, 636, 30, 7], [880, 652, 36, 8]].map(([x, y, rx, ry], i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#3f5a34" opacity="0.6" />
      ))}
    </g>
  );
}

/* "After rain" pass, drawn directly on top of the ground band: a damp cool
   wash, the machine's lit face mirrored into the asphalt, glints under the
   lantern / live CRT / payphone, puddles, and thin sheen streaks. Static —
   all motion stays in Atmosphere and the machine itself. */
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

      {/* damp wash: cools and darkens the dry asphalt */}
      <rect x="-480" y="600" width="1440" height="80" fill="#0d1420" opacity="0.16" />

      {/* pool of light the lit machine throws on the wet ground */}
      <ellipse cx="240" cy="642" rx="210" ry="30" fill="#fff6cf" opacity="0.09" />

      {/* the machine's face, mirrored: base sliver, blue door (wave + dark
          dispense notch), then the cream body fading with distance */}
      <g mask="url(#vm-reflMask)">
        <rect x="92" y="622" width="296" height="5" rx="2" fill="#4a463e" opacity="0.7" />
        <rect x="94" y="627" width="292" height="20" rx="3" fill="#2b7ccb" opacity="0.6" />
        <rect x="152" y="630" width="136" height="8" rx="3" fill="#14171b" opacity="0.6" />
        <path d="M104,641 C160,634 250,646 300,639 C336,634 366,640 386,637 L386,647 L104,647 Z" fill="#f2f5f8" opacity="0.4" />
        <rect x="94" y="647" width="292" height="22" rx="3" fill="#e8e6de" opacity="0.55" />
        {/* dry streaks interrupting the reflection */}
        <rect x="80" y="634" width="320" height="2" fill="#20241d" opacity="0.7" />
        <rect x="80" y="653" width="320" height="2.5" fill="#20241d" opacity="0.7" />
      </g>

      {/* warm glint under the paper lantern */}
      <ellipse cx="450" cy="630" rx="9" ry="14" fill="#ff8c42" opacity="0.16" />
      <ellipse cx="450" cy="626" rx="5" ry="8" fill="#e2571f" opacity="0.18" />

      {/* green spill from the one CRT still alive, and the payphone box */}
      <ellipse cx="-258" cy="612" rx="26" ry="5" fill="#8fd694" opacity="0.12" />
      <ellipse cx="653" cy="628" rx="18" ry="4" fill="#2f7d3f" opacity="0.12" />

      {/* puddles: cool rims far from the machine, a warm rim in its light */}
      {[
        { cx: -60, cy: 650, rx: 46, ry: 7, rim: "#8fa8bf" },
        { cx: -330, cy: 660, rx: 38, ry: 6.5, rim: "#8fa8bf" },
        { cx: 520, cy: 644, rx: 34, ry: 6, rim: "#8fa8bf" },
        { cx: 340, cy: 660, rx: 24, ry: 5, rim: "#d9c9a8" },
      ].map(({ cx, cy, rx, ry, rim }, i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#12181a" opacity="0.85" />
          <path d={`M${cx - rx},${cy - 1} C${cx - rx * 0.5},${cy - ry} ${cx + rx * 0.5},${cy - ry} ${cx + rx},${cy - 1}`}
            fill="none" stroke={rim} strokeWidth="1.5" opacity="0.3" />
        </g>
      ))}

      {/* thin sheen streaks across the asphalt */}
      {[[-420, 622, 130], [-180, 664, 170], [60, 671, 150], [420, 655, 180], [700, 640, 150], [-40, 612, 90]].map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height="1.5" rx="0.75" fill="#fff" opacity="0.07" />
      ))}
    </g>
  );
}

/* Front-most atmosphere: dappled sunlight + vignette over the full scene.
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
      <g className={arriving ? "vm-arrive-dapples" : undefined} filter="url(#vm-softLight)" fill="#fff6cf">
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
