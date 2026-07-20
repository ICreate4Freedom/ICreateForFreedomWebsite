/* CRT monitors going back to the forest, left of the machine — straight off
   the moodboard. One screen is still faintly alive. */
export function CrtPile() {
  return (
    <g>
      {/* cable slack running into the grass */}
      <path d="M-244,598 C-220,614 -186,606 -160,620 C-138,630 -116,622 -102,630"
        fill="none" stroke="#2b2f26" strokeWidth="3" strokeLinecap="round" />
      {/* base CRT — alive */}
      <g>
        <rect x="-300" y="528" width="92" height="74" rx="6" fill="#454b44" stroke="#2e332d" strokeWidth="2" />
        <rect x="-288" y="538" width="60" height="50" rx="3" fill="#0c120c" />
        <text x="-258" y="570" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="13" fill="#8fd694" opacity="0.9">^_^</text>
        {[548, 560, 572].map((y) => (
          <line key={y} x1="-286" y1={y} x2="-230" y2={y} stroke="#8fd694" strokeWidth="1" opacity="0.1" />
        ))}
        <ellipse cx="-258" cy="563" rx="34" ry="26" fill="#8fd694" opacity="0.05" />
        <line x1="-222" y1="544" x2="-222" y2="576" stroke="#2e332d" strokeWidth="3" />
        <circle cx="-218" cy="586" r="2.5" fill="#7CFC00" opacity="0.8" />
      </g>
      {/* stacked CRT — dead */}
      <g transform="translate(-292, 470) rotate(-3)">
        <rect width="74" height="60" rx="5" fill="#3c423b" stroke="#272c26" strokeWidth="2" />
        <rect x="9" y="8" width="50" height="40" rx="3" fill="#10150f" />
        <polygon points="9,8 26,8 14,48 9,48" fill="#fff" opacity="0.05" />
        <circle cx="66" cy="50" r="2" fill="#59524a" />
      </g>
      {/* side CRT — dead, cracked */}
      <g transform="translate(-198, 548) rotate(2)">
        <rect width="80" height="56" rx="5" fill="#49504a" stroke="#30352f" strokeWidth="2" />
        <rect x="10" y="8" width="56" height="38" rx="3" fill="#0d130d" />
        <path d="M20,14 L44,34 L36,20" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.12" />
      </g>
      {/* laptop, lid open, QR block on screen */}
      <g transform="translate(-112, 560) rotate(-4)">
        <rect width="46" height="32" rx="2" fill="#1a1d18" stroke="#383c36" strokeWidth="1.5" />
        {[[6, 5], [12, 5], [24, 5], [30, 5], [6, 11], [18, 11], [30, 11], [6, 17], [30, 17], [12, 23], [24, 23], [30, 23]].map(([qx, qy], i) => (
          <rect key={i} x={qx} y={qy} width="5" height="5" fill="#cfd8c9" opacity="0.85" />
        ))}
        <rect x="-4" y="32" width="54" height="9" rx="2" fill="#2b2f2a" stroke="#383c36" strokeWidth="1" />
      </g>
      {/* keyboard sinking into the grass */}
      <g transform="translate(-176, 594) rotate(-5)">
        <path d="M0,0 L54,0 L58,12 L-4,12 Z" fill="#56594e" opacity="0.9" />
        {[3, 6, 9].map((y) => <line key={y} x1="0" y1={y} x2="55" y2={y} stroke="#3c3f36" strokeWidth="1" />)}
      </g>
      {/* grass reclaiming the bottoms */}
      {[[-298, 604], [-244, 606], [-190, 608], [-120, 604], [-64, 606]].map(([x, y], i) => (
        <path key={i} d={`M${x},${y} l3,-14 l3,14 l4,-10 l4,10 l4,-13 l4,13`}
          fill="none" stroke="#3f5a34" strokeWidth="2" strokeLinecap="round" />
      ))}
    </g>
  );
}
