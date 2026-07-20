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

/* Front-most atmosphere: dappled sunlight + vignette over the full scene.
   MUST stay pointer-events:none or it will swallow clicks on the machine. */
export function Atmosphere() {
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
      <g filter="url(#vm-softLight)" fill="#fff6cf">
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
