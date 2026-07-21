import { Fatsia } from "./Fatsia";

export function Pot() {
  return <path d="M396,566 L444,566 L436,624 L404,624 Z" fill="#a4552e" stroke="#7c3f21" strokeWidth="2" />;
}

/* Fatsia clusters + the vine creeping up the machine's right edge.
   (The old top-of-frame canopy is gone — greenery now spills from the
   gardens and walls drawn in EnvironmentBack.) */
export function Overgrowth() {
  return (
    <g>
      <Fatsia x={452} y={300} size={96} rotate={252} fill="#3c7a41" sway />
      <Fatsia x={440} y={380} size={70} rotate={230} fill="#2f5e33" />
      <Fatsia x={420} y={540} size={62} rotate={318} fill="#356b3a" />
      <Fatsia x={392} y={470} size={48} rotate={280} fill="#4b8a4f" />
      {/* moss at the machine's foot — on the ground plane, not on the base */}
      <ellipse cx="150" cy="619" rx="26" ry="5" fill="#3f5a34" opacity="0.7" />
      <path d="M128,621 l3,-12 l3,12 l4,-9 l4,9 l4,-11 l4,11" fill="none" stroke="#3f5a34" strokeWidth="2" strokeLinecap="round" />
      <path d="M386,600 C394,520 374,470 388,400 C398,346 380,300 388,252" fill="none" stroke="#2f5e33" strokeWidth="4" strokeLinecap="round" />
      {[[384, 560], [390, 470], [382, 380], [390, 300]].map(([x, y], i) => (
        <Fatsia key={i} x={x} y={y} size={26} rotate={i % 2 ? 300 : 60} fill="#356b3a" />
      ))}
      {/* wayside weeds at the wall bases — cropped away on narrow screens */}
      <Fatsia x={-430} y={598} size={46} rotate={352} fill="#356b3a" />
      <Fatsia x={-340} y={604} size={40} rotate={8} fill="#2f5e33" />
      <Fatsia x={-70} y={600} size={36} rotate={350} fill="#356b3a" />
      <Fatsia x={500} y={602} size={38} rotate={10} fill="#2f5e33" />
      <Fatsia x={880} y={600} size={44} rotate={355} fill="#2f5e33" />
    </g>
  );
}