import { Fatsia } from "./Fatsia";

export function Pot() {
  return <path d="M396,566 L444,566 L436,624 L404,624 Z" fill="#a4552e" stroke="#7c3f21" strokeWidth="2" />;
}

/* MIDGROUND greenery — drawn behind the machine, at the wall bases and along
   the machine's right edge. The frame-crowding canopy lives in Foreground. */
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
      <Fatsia x={-262} y={598} size={46} rotate={352} fill="#356b3a" />
      <Fatsia x={-190} y={604} size={40} rotate={8} fill="#2f5e33" />
      <Fatsia x={-70} y={600} size={36} rotate={350} fill="#356b3a" />
      <Fatsia x={500} y={602} size={38} rotate={10} fill="#2f5e33" />
      <Fatsia x={700} y={600} size={44} rotate={355} fill="#2f5e33" />
    </g>
  );
}

/* FOREGROUND — the layer that was missing entirely. Everything here paints in
   FRONT of the machine, which is what turns a flat elevation into a photograph:
   the reference shots all have leaves crowding the lens and a bike leaning
   across the machine's lower half. Rendered inside a pointer-events:none group
   so it can never intercept a vend click. */
export function Foreground() {
  return (
    <g>
      {/* vine crossing the machine's face, tying it into the alley */}
      <path d="M404,168 C356,150 300,168 258,150 C214,131 168,152 118,138"
        fill="none" stroke="#2b5730" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      {[[368, 158], [300, 156], [232, 146], [160, 144]].map(([x, y], i) => (
        <Fatsia key={i} x={x} y={y} size={22} rotate={i % 2 ? 148 : 205} fill="#3c7a41" />
      ))}

      {/* canopy crowding the top corners — the strongest depth cue */}
      <Fatsia x={-206} y={-42} size={168} rotate={158} fill="#1f4325" sway />
      <Fatsia x={-96} y={-70} size={140} rotate={182} fill="#28522c" sway />
      <Fatsia x={36} y={-56} size={116} rotate={196} fill="#1c3c21" />
      <Fatsia x={468} y={-64} size={150} rotate={172} fill="#24492a" sway />
      <Fatsia x={604} y={-40} size={176} rotate={196} fill="#1b3a20" sway />
      <Fatsia x={742} y={-72} size={128} rotate={210} fill="#28522c" />

      {/* branch the canopy hangs from, sweeping across the top of frame */}
      <path d="M-280,-10 C-140,54 60,30 250,58 C420,82 560,44 720,66"
        fill="none" stroke="#22301f" strokeWidth="5" strokeLinecap="round" opacity="0.8" />

      {/* out-of-focus leaves right at the lens, bottom corners */}
      <g opacity="0.55">
        <Fatsia x={-268} y={706} size={150} rotate={22} fill="#16321c" />
        <Fatsia x={-120} y={724} size={120} rotate={352} fill="#1b3a20" />
        <Fatsia x={700} y={716} size={140} rotate={334} fill="#16321c" />
      </g>
    </g>
  );
}
