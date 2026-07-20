import { Fatsia } from "./Fatsia";

/* Public phone being swallowed by vines on a utility pole — the moodboard's
   green payphone. Right of the machine, past the tree. */
export function Payphone() {
  return (
    <g>
      {/* pole, crossarm, insulators */}
      <rect x="654" y="128" width="14" height="492" fill="#3b3630" stroke="#2a2622" strokeWidth="1.5" />
      <rect x="620" y="146" width="82" height="8" rx="2" fill="#3b3630" stroke="#2a2622" strokeWidth="1.5" />
      {[628, 688].map((x) => <rect key={x} x={x} y="139" width="7" height="8" rx="2" fill="#5a5148" />)}
      {/* enamel sign */}
      <g>
        <rect x="672" y="176" width="16" height="46" rx="2" fill="#ddd8c8" stroke="#8a8570" />
        <text x="680" y="192" textAnchor="middle" fontFamily="ui-sans-serif, sans-serif" fontSize="11" fill="#b3231d">電</text>
        <text x="680" y="212" textAnchor="middle" fontFamily="ui-sans-serif, sans-serif" fontSize="11" fill="#b3231d">話</text>
        <circle cx="675" cy="219" r="1.5" fill="#8a5a2c" opacity="0.7" />
      </g>
      {/* phone box */}
      <rect x="618" y="298" width="70" height="96" rx="8" fill="#2f7d3f" stroke="#1f5c2e" strokeWidth="2.5" />
      <rect x="618" y="298" width="12" height="96" rx="6" fill="#256833" />
      <rect x="632" y="308" width="46" height="18" rx="3" fill="#12351a" />
      <text x="655" y="320" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="#7fce8b">TEL</text>
      {[0, 1, 2].map((col) => [0, 1, 2, 3].map((row) => (
        <rect key={`${col}.${row}`} x={638 + col * 12} y={334 + row * 11} width="8" height="7" rx="1.5" fill="#1c4a26" />
      )))}
      <rect x="676" y="334" width="5" height="14" rx="2" fill="#12351a" />
      <rect x="672" y="376" width="12" height="8" rx="2" fill="#12351a" />
      {/* handset + drooping cord */}
      <rect x="604" y="304" width="11" height="58" rx="5.5" fill="#1f5c2e" stroke="#143f1e" strokeWidth="1.5" />
      <circle cx="609.5" cy="309" r="7" fill="#1f5c2e" stroke="#143f1e" strokeWidth="1.5" />
      <circle cx="609.5" cy="357" r="7" fill="#1f5c2e" stroke="#143f1e" strokeWidth="1.5" />
      <path d="M610,364 C596,392 622,406 608,432 C600,448 618,458 610,472"
        fill="none" stroke="#143f1e" strokeWidth="2.5" />
      {/* vines up the pole and across the box */}
      <path d="M660,618 C650,548 670,500 656,440 C646,392 666,348 654,300 C648,268 662,232 654,196"
        fill="none" stroke="#2f5e33" strokeWidth="4" strokeLinecap="round" />
      <path d="M686,394 C700,362 680,332 692,306" fill="none" stroke="#356b3a" strokeWidth="3" strokeLinecap="round" />
      {[[658, 566, 22, 300], [652, 478, 26, 60], [664, 414, 20, 320], [650, 336, 24, 40], [658, 246, 20, 300], [690, 372, 18, 80], [688, 312, 16, 320]].map(([x, y, size, rotate], i) => (
        <Fatsia key={i} x={x} y={y} size={size} rotate={rotate} fill="#356b3a" />
      ))}
      {/* undergrowth at the base */}
      <Fatsia x={640} y={614} size={42} rotate={352} fill="#2f5e33" />
      <Fatsia x={676} y={610} size={34} rotate={12} fill="#356b3a" />
    </g>
  );
}
