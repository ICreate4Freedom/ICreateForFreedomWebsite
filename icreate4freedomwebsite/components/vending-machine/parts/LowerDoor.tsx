/* Blue lower door: gradient panel, white wave, clipped wordmark, dispense
   opening. Owns its own defs (gradient + clip) so it stays self-contained. */
export function LowerDoor() {
  return (
    <g>
      <defs>
        <linearGradient id="vm-doorBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b7ccb" /><stop offset="1" stopColor="#1c5493" />
        </linearGradient>
        <clipPath id="vm-doorClip"><rect x="104" y="396" width="282" height="160" rx="6" /></clipPath>
      </defs>
      <rect x="104" y="396" width="282" height="160" rx="6" fill="url(#vm-doorBlue)" stroke="#164a82" />
      <g clipPath="url(#vm-doorClip)">
        <path d="M84,486 C160,432 250,536 300,478 C336,438 380,462 410,442 L410,566 L84,566 Z" fill="#f2f5f8" />
        <path d="M84,506 C168,458 246,548 306,496 C342,462 384,482 410,466 L410,566 L84,566 Z" fill="#2b7ccb" opacity="0.35" />
        <text x="126" y="428" fontFamily="ui-sans-serif, system-ui, sans-serif" fontStyle="italic" fontWeight="800" fontSize="26" fill="#f2f5f8" opacity="0.9">
          ICREATE4FR
        </text>
      </g>
      <rect x="150" y="504" width="140" height="42" rx="6" fill="#14171b" stroke="#b9bdc2" strokeWidth="2" />
      <text x="220" y="500" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="#dfe6ee" opacity="0.85">PUSH</text>
    </g>
  );
}