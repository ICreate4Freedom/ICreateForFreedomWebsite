import { Fatsia } from "./Fatsia";

export function Pot() {
  return <path d="M396,566 L444,566 L436,624 L404,624 Z" fill="#a4552e" stroke="#7c3f21" strokeWidth="2" />;
}

/* Fatsia clusters + the vine creeping up the machine's right edge. */
export function Overgrowth({ reduced }: { reduced: boolean }) {
  return (
    <g>
      <Fatsia x={70} y={40} size={92} rotate={150} fill="#2f5e33" sway reduced={reduced} />
      <Fatsia x={150} y={16} size={78} rotate={188} fill="#3c7a41" sway reduced={reduced} />
      <Fatsia x={250} y={34} size={64} rotate={168} fill="#27522b" reduced={reduced} />
      <Fatsia x={452} y={300} size={96} rotate={252} fill="#3c7a41" sway reduced={reduced} />
      <Fatsia x={440} y={380} size={70} rotate={230} fill="#2f5e33" reduced={reduced} />
      <Fatsia x={420} y={540} size={62} rotate={318} fill="#356b3a" reduced={reduced} />
      <Fatsia x={392} y={470} size={48} rotate={280} fill="#4b8a4f" reduced={reduced} />
      <path d="M386,600 C394,520 374,470 388,400 C398,346 380,300 388,252" fill="none" stroke="#2f5e33" strokeWidth="4" strokeLinecap="round" />
      {[[384, 560], [390, 470], [382, 380], [390, 300]].map(([x, y], i) => (
        <Fatsia key={i} x={x} y={y} size={26} rotate={i % 2 ? 300 : 60} fill="#356b3a" reduced={reduced} />
      ))}
    </g>
  );
}