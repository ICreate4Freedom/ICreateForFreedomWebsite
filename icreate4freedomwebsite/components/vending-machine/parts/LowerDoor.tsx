/* Blue lower door: gradient panel, white wave, clipped wordmark, dispense
   opening. Owns its own defs (gradient + clip) so it stays self-contained. */
export function LowerDoor() {
  return (
    <g>
      <defs>
        <linearGradient id="vm-doorBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b7ccb" /><stop offset="1" stopColor="#1c5493" />
        </linearGradient>
        {/* runs to y=592, just above the base band — the panel used to stop at
            556 and leave a bare cream slab across the machine's lower third */}
        <clipPath id="vm-doorClip"><rect x="104" y="396" width="282" height="196" rx="6" /></clipPath>
      </defs>
      <rect x="104" y="396" width="282" height="196" rx="6" fill="url(#vm-doorBlue)" stroke="#164a82" />
      <g clipPath="url(#vm-doorClip)">
        <path d="M84,486 C160,432 250,536 300,478 C336,438 380,462 410,442 L410,600 L84,600 Z" fill="#f2f5f8" />
        <path d="M84,506 C168,458 246,548 306,496 C342,462 384,482 410,466 L410,600 L84,600 Z" fill="#2b7ccb" opacity="0.35" />
        <text x="115" y="428" fontFamily="ui-sans-serif, system-ui, sans-serif" fontStyle="italic" fontWeight="800" fontSize="26" fill="#f2f5f8" opacity="0.9">
          ICREATE4FREEDOM
        </text>
        {/* scuffed kick plate along the bottom, where shoes and bike pedals land */}
        <rect x="104" y="570" width="282" height="22" fill="#123f70" opacity="0.55" />
        <line x1="104" y1="570" x2="386" y2="570" stroke="#0e3159" strokeWidth="1.5" />
        {[132, 178, 236, 300, 352].map((x) => (
          <rect key={x} x={x} y="574" width="18" height="2" rx="1" fill="#9db8d2" opacity="0.22" />
        ))}
      </g>
      <rect x="150" y="504" width="140" height="42" rx="6" fill="#14171b" stroke="#b9bdc2" strokeWidth="2" />
      <text x="220" y="500" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="#dfe6ee" opacity="0.85">PUSH</text>
    </g>
  );
}