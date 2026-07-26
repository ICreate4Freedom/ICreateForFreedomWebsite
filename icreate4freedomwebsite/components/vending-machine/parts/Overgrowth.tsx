import { Fatsia } from "./Fatsia";
import { Fern, BroadLeaf, GrassTuft, Shrub, Cane, HangingVine, ClimbingIvy } from "./Flora";

/* MIDGROUND greenery — drawn behind the machine, at the wall bases and along
   the machine's right edge. The frame-crowding canopy lives in Foreground. */
export function Overgrowth() {
  return (
    <g>
      {/* the bed the machine backs onto */}
      <Fatsia x={452} y={300} size={96} rotate={252} fill="#3c7a41" sway />
      <Fatsia x={440} y={380} size={70} rotate={230} fill="#2f5e33" />
      <Cane x={424} y={598} size={104} lean={12} fill="#457c46" />
      <Cane x={436} y={600} size={78} lean={-8} fill="#356b3a" />
      <Fern x={410} y={596} size={70} rotate={12} fill="#3f7a44" />
      <Shrub x={462} y={602} size={54} fill="#2f5e33" tip="#427944" />
      <BroadLeaf x={398} y={600} size={48} rotate={-14} fill="#2f6135" />
      {/* moss at the machine's foot — on the ground plane, not on the base */}
      <ellipse cx="150" cy="619" rx="26" ry="5" fill="#3f5a34" opacity="0.7" />
      <GrassTuft x={132} y={621} size={17} fill="#3f5a34" />
      <GrassTuft x={168} y={620} size={13} fill="#4b7d45" />
      {/* ivy climbing the machine's right edge — the "reclaimed" read, kept to
          the edge so it never covers the window or the buttons */}
      <ClimbingIvy x={390} y={600} height={352} leaf={11} fill="#2f5e33" side={1} />
      <ClimbingIvy x={393} y={470} height={210} leaf={8} fill="#3c7a41" side={1} opacity={0.9} />
      {/* wayside weeds at the wall bases — cropped away on narrow screens */}
      <Shrub x={-244} y={602} size={44} fill="#2c5230" tip="#3b6b3c" />
      <Fern x={-190} y={604} size={46} rotate={-8} fill="#2f5e33" />
      <GrassTuft x={-150} y={604} size={22} fill="#3f6b3c" />
      <Fatsia x={-70} y={600} size={36} rotate={350} fill="#356b3a" />
      <GrassTuft x={-30} y={603} size={18} fill="#3a5f38" />
      <Cane x={508} y={602} size={72} lean={9} fill="#3f7143" />
      <Shrub x={556} y={603} size={38} fill="#2f5e33" tip="#427944" />
      <Fern x={706} y={602} size={52} rotate={6} fill="#2f5e33" />
      <GrassTuft x={748} y={603} size={20} fill="#3a5f38" />
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
      {/* Branch sweeping the top of frame. It arcs ABOVE the machine's header
          rather than across its face — the growth reads as hanging into the
          alley from the eaves, and nothing obscures the wordmark or the cans. */}
      <path d="M-300,-6 C-150,52 40,26 250,30 C430,34 580,60 780,52"
        fill="none" stroke="#22301f" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
      <path d="M-40,32 C60,10 150,18 236,8" fill="none" stroke="#22301f" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

      {/* Vines drape DOWN the frame's edges, flanking the machine (x 90..390)
          without ever crossing it. Morning-glory blooms on the right, as in
          the blue-house reference. */}
      <HangingVine x={-256} y={18} length={210} leaf={12} amp={16} phase={0.4} fill="#26512b" sway />
      <HangingVine x={-150} y={30} length={148} leaf={10} amp={11} phase={1.9} fill="#2f5e33" />
      <HangingVine x={-62} y={22} length={252} leaf={11} amp={14} phase={0.9} fill="#224827" sway
        flowers={3} petal="#6f5fb8" />
      <HangingVine x={22} y={40} length={126} leaf={9} amp={9} phase={2.6} fill="#2b5730" />
      <HangingVine x={440} y={26} length={238} leaf={12} amp={15} phase={1.2} fill="#24492a" sway
        flowers={4} petal="#7d6cc4" />
      <HangingVine x={534} y={40} length={160} leaf={10} amp={12} phase={2.2} fill="#2f5e33" />
      <HangingVine x={636} y={16} length={286} leaf={13} amp={18} phase={0.2} fill="#204225" sway />
      <HangingVine x={742} y={34} length={190} leaf={11} amp={13} phase={1.6} fill="#2b5730"
        flowers={2} petal="#8f7fd0" />

      {/* Canopy crowding the top corners — the strongest depth cue. Mixed
          species so the silhouette isn't one leaf shape repeated. */}
      <Fatsia x={-244} y={-46} size={168} rotate={158} fill="#1f4325" sway />
      <BroadLeaf x={-160} y={62} size={104} rotate={168} fill="#20452a" />
      <Fern x={-92} y={78} size={120} rotate={186} fill="#2a5730" />
      <Fatsia x={16} y={-58} size={118} rotate={196} fill="#1c3c21" />
      <Fern x={392} y={72} size={112} rotate={172} fill="#28522c" />
      <Fatsia x={486} y={-62} size={152} rotate={172} fill="#24492a" sway />
      <BroadLeaf x={596} y={70} size={118} rotate={192} fill="#1d4026" />
      <Fatsia x={700} y={-44} size={176} rotate={196} fill="#1b3a20" sway />
      <Fern x={776} y={64} size={104} rotate={200} fill="#26512b" />

      {/* Out-of-focus foliage right at the lens, bottom corners. */}
      <g opacity="0.5">
        <Fatsia x={-292} y={706} size={150} rotate={22} fill="#16321c" />
        <BroadLeaf x={-186} y={694} size={130} rotate={26} fill="#173318" />
        <Fern x={-96} y={700} size={124} rotate={14} fill="#16321c" />
        <Fern x={664} y={702} size={132} rotate={-18} fill="#16321c" />
        <Fatsia x={760} y={714} size={144} rotate={334} fill="#173318" />
      </g>
    </g>
  );
}
