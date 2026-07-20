/* Scene behind the machine: wood-slat wall, lattice junk, tree trunk,
   paper lantern, mossy ground. */
export function EnvironmentBack() {
  return (
    <g>
      <rect width="480" height="680" fill="#141a14" />
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x={i * 30} y="0" width="27" height="620"
          fill={i % 3 === 0 ? "#1a221a" : i % 3 === 1 ? "#161d16" : "#121812"} />
      ))}
      <g stroke="#3d4438" strokeWidth="2" opacity="0.6">
        {[0, 14, 28, 42].map((o) => <line key={`a${o}`} x1={4 + o} y1="430" x2={34 + o} y2="600" />)}
        {[0, 14, 28, 42].map((o) => <line key={`b${o}`} x1={46 - o} y1="430" x2={8 - o} y2="600" />)}
      </g>
      <path d="M398,620 C404,500 392,420 402,320 C410,230 396,150 404,60 L428,60 C422,160 434,240 426,330 C418,430 432,520 424,620 Z"
        fill="#54402e" stroke="#3d2e20" strokeWidth="2" />
      <g>
        <line x1="448" y1="30" x2="448" y2="58" stroke="#2a2a2a" strokeWidth="2" />
        <rect x="438" y="56" width="20" height="7" rx="2" fill="#222" />
        <ellipse cx="448" cy="92" rx="26" ry="30" fill="#e2571f" />
        <ellipse cx="448" cy="92" rx="26" ry="30" fill="#ff8c42" opacity="0.45" />
        {[-18, -8, 2, 12, 22].map((dy) => (
          <ellipse key={dy} cx="448" cy={92 + dy} rx={26 * Math.sqrt(1 - (dy / 30) ** 2)} ry="2"
            fill="none" stroke="#a53c12" strokeWidth="1" opacity="0.7" />
        ))}
        <rect x="438" y="120" width="20" height="6" rx="2" fill="#222" />
      </g>
      <rect x="0" y="600" width="480" height="80" fill="#20241d" />
      <ellipse cx="240" cy="614" rx="190" ry="16" fill="#000" opacity="0.45" />
      {[[60, 640, 30, 8], [200, 655, 44, 9], [380, 636, 26, 7]].map(([x, y, rx, ry], i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#3f5a34" opacity="0.6" />
      ))}
    </g>
  );
}

/* Front-most atmosphere: dappled sunlight + vignette. MUST stay
   pointer-events:none or it will swallow clicks on the machine. */
export function Atmosphere() {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <filter id="vm-softLight" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <radialGradient id="vm-vignette" cx="0.5" cy="0.42" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <g filter="url(#vm-softLight)" fill="#fff6cf">
        <ellipse cx="120" cy="120" rx="60" ry="34" opacity="0.16" />
        <ellipse cx="290" cy="70" rx="80" ry="30" opacity="0.14" />
        <ellipse cx="200" cy="300" rx="46" ry="70" opacity="0.10" />
        <ellipse cx="330" cy="430" rx="54" ry="40" opacity="0.12" />
        <ellipse cx="90" cy="500" rx="40" ry="26" opacity="0.10" />
      </g>
      <rect width="480" height="680" fill="url(#vm-vignette)" />
    </g>
  );
}