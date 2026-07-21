import { Fatsia } from "./Fatsia";

export function Pot() {
  return <path d="M396,566 L444,566 L436,624 L404,624 Z" fill="#a4552e" stroke="#7c3f21" strokeWidth="2" />;
}

/* Fatsia clusters + the vine creeping up the machine's right edge. */
export function Overgrowth() {
  return (
    <g>
      <Fatsia x={70} y={40} size={92} rotate={150} fill="#2f5e33" sway />
      <Fatsia x={150} y={16} size={78} rotate={188} fill="#3c7a41" sway />
      <Fatsia x={250} y={34} size={64} rotate={168} fill="#27522b" />
      <Fatsia x={452} y={300} size={96} rotate={252} fill="#3c7a41" sway />
      <Fatsia x={440} y={380} size={70} rotate={230} fill="#2f5e33" />
      <Fatsia x={420} y={540} size={62} rotate={318} fill="#356b3a" />
      <Fatsia x={392} y={470} size={48} rotate={280} fill="#4b8a4f" />
      <path d="M386,600 C394,520 374,470 388,400 C398,346 380,300 388,252" fill="none" stroke="#2f5e33" strokeWidth="4" strokeLinecap="round" />
      {[[384, 560], [390, 470], [382, 380], [390, 300]].map(([x, y], i) => (
        <Fatsia key={i} x={x} y={y} size={26} rotate={i % 2 ? 300 : 60} fill="#356b3a" />
      ))}
      {/* wayside canopy + bushes — cropped away on narrow screens */}
      <Fatsia x={-420} y={30} size={86} rotate={165} fill="#2f5e33" sway />
      <Fatsia x={-320} y={8} size={72} rotate={190} fill="#356b3a" />
      <Fatsia x={-215} y={28} size={95} rotate={155} fill="#3c7a41" sway />
      <Fatsia x={-105} y={12} size={66} rotate={200} fill="#27522b" />
      <Fatsia x={-20} y={26} size={78} rotate={172} fill="#2f5e33" />
      <Fatsia x={545} y={16} size={70} rotate={195} fill="#356b3a" />
      <Fatsia x={650} y={32} size={88} rotate={160} fill="#3c7a41" sway />
      <Fatsia x={770} y={12} size={75} rotate={185} fill="#2f5e33" />
      <Fatsia x={890} y={28} size={92} rotate={150} fill="#356b3a" sway />
      <Fatsia x={-430} y={598} size={46} rotate={352} fill="#356b3a" />
      <Fatsia x={-340} y={604} size={40} rotate={8} fill="#2f5e33" />
      <Fatsia x={-70} y={600} size={36} rotate={350} fill="#356b3a" />
      <Fatsia x={500} y={602} size={38} rotate={10} fill="#2f5e33" />
      <Fatsia x={880} y={600} size={44} rotate={355} fill="#2f5e33" />
    </g>
  );
}