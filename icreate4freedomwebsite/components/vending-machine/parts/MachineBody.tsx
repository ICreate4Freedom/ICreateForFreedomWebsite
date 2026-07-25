import { CAN_H, SHELF_CAN_Y } from "../slots";

/* Static machine shell: body, base, PET bottle, header, rust, window + shelf
   strips. Product rows, coin column, and lower door render on top of this. */
export function MachineBody() {
  return (
    <g>
      {/* body + base */}
      <rect x="90" y="95" width="300" height="525" rx="8" fill="#e8e6de" stroke="#aaa494" strokeWidth="2" />
      <rect x="90" y="95" width="12" height="525" rx="6" fill="#d2cec2" />
      {/* sunset rim light on the sun-facing edge */}
      <rect x="386" y="98" width="3.5" height="520" rx="1.75" fill="#ffcf9a" opacity="0.28" />
      <rect x="90" y="600" width="300" height="20" rx="4" fill="#4a463e" />

      {/* Roof clutter, straight from the reference photo: a weed colony that
          took root in the drip tray, and the bottles someone left up there.
          The bottles used to stand alone and read as a floating mistake. */}
      <g>
        <rect x="96" y="88" width="288" height="9" rx="2" fill="#d7d3c7" stroke="#a9a394" strokeWidth="1" />
        <path d="M104,88 C126,84 148,90 172,86 C196,82 214,89 236,85" fill="none" stroke="#3f5f3c" strokeWidth="3" opacity="0.7" />
        {[[112, 88], [131, 88], [150, 88], [168, 88], [188, 88], [206, 88], [224, 88]].map(([x, y], i) => (
          <path key={i} d={`M${x},${y} c${i % 2 ? 5 : -5},-9 ${i % 2 ? 2 : -2},-16 0,-21 c${i % 2 ? -4 : 4},6 ${i % 2 ? -6 : 6},13 0,21 z`}
            fill={i % 3 === 0 ? "#4a7f47" : i % 3 === 1 ? "#3a6a3b" : "#5a9153"} opacity="0.92" />
        ))}
        {[[118, 86, 14], [146, 86, 11], [200, 86, 13]].map(([x, y, h], i) => (
          <path key={`b${i}`} d={`M${x},${y} l3,${-h} l3,${h}`} fill="none" stroke="#2f5233" strokeWidth="1.6" strokeLinecap="round" />
        ))}
      </g>
      {/* PET bottles someone left on top */}
      <g transform="translate(330, 58)">
        <rect x="0" y="6" width="11" height="24" rx="3.5" fill="#cfe4ee" opacity="0.85" />
        <rect x="2.5" y="0" width="6" height="7" rx="2" fill="#7fb3d5" />
      </g>
      <g transform="translate(348, 64)">
        <rect x="0" y="5" width="9" height="19" rx="3" fill="#e0ece6" opacity="0.7" />
        <rect x="2" y="0" width="5" height="6" rx="1.8" fill="#c98a4a" />
      </g>

      {/* header: white band, blue rules, italic wordmark */}
      <rect x="102" y="106" width="276" height="52" rx="4" fill="#f4f3ee" stroke="#c5c0b2" />
      <line x1="106" y1="112" x2="374" y2="112" stroke="#1e63b0" strokeWidth="2" />
      <line x1="106" y1="152" x2="374" y2="152" stroke="#1e63b0" strokeWidth="2" />
      <text x="240" y="141" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontStyle="italic" fontWeight="800" fontSize="23" fill="#1e63b0" textLength="252" lengthAdjust="spacingAndGlyphs">
        ICREATE4FREEDOM
      </text>
      {/* sub-brand strip */}
      <rect x="184" y="160" width="30" height="11" rx="2" fill="#b3231d" />
      <text x="199" y="168.5" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="7" fill="#fff">IC4F</text>
      <text x="238" y="169" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="8" fill="#6b675d">CAN · SELF SERVE</text>
      {/* rust along the seams */}
      {[[110, 158, 2], [126, 156, 1.5], [163, 159, 2.4], [235, 104, 1.6], [297, 157, 2], [318, 158, 1.4], [352, 105, 2.2], [368, 156, 1.7]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#8a5a2c" opacity="0.65" />
      ))}
      <rect x="366" y="180" width="3" height="70" rx="1.5" fill="#8a6a45" opacity="0.35" />

      {/* window: dark box, silver frame, shelf strips, glass sheen */}
      <rect x="104" y="178" width="200" height="208" rx="5" fill="#1e2429" stroke="#b9bdc2" strokeWidth="3" />
      {SHELF_CAN_Y.map((y) => (
        <rect key={y} x="107" y={y + CAN_H + 1} width="194" height="13" fill="#dfdcd3" stroke="#b6b1a3" strokeWidth="0.75" />
      ))}
      {/* divider between the two product groups sharing the top shelf, so the
          ME and DEV facings read as separate columns rather than one run */}
      <rect x="189.5" y={SHELF_CAN_Y[0] - 2} width="1.5" height={CAN_H + 3} fill="#8f949a" opacity="0.55" />
      <polygon points="104,178 168,178 118,386 104,386" fill="#fff" opacity="0.05" />
    </g>
  );
}