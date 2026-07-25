/* A small library of plant species, so the alley reads as a real overgrown
   corner rather than a monoculture of one fatsia leaf.

   Convention: every component is anchored at its SOIL LINE — (x, y) is where
   the stem meets the ground — and grows UPWARD unless it is explicitly a
   trailing/hanging type. That makes them safe to drop into pots and beds
   without the guesswork that had the planter foliage growing downwards. */

/* Math.sin/cos are implementation-defined in ECMAScript, so Node and the
   browser can disagree in the last ULP. Interpolating raw results into path
   strings produced server/client markup that differed by one decimal and
   tripped React's hydration check — every number that reaches a `d` attribute
   goes through n() so both sides emit byte-identical paths. */
const n = (v: number) => Math.round(v * 100) / 100;

/** deterministic jitter so scattered plants differ without random() churn */
const wobble = (seed: number, spread = 1) =>
  n(((Math.sin(seed * 12.9898) * 43758.5453) % 1) * spread);

/* ---------- upright species ---------- */

/** Fan of blades. The cheapest way to soften where anything meets the ground. */
export function GrassTuft({
  x, y, size = 26, blades = 9, fill = "#3f6b3c", opacity = 1,
}: { x: number; y: number; size?: number; blades?: number; fill?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      {Array.from({ length: blades }).map((_, i) => {
        const t = i / (blades - 1) - 0.5;          // -0.5 .. 0.5
        const lean = t * size * 1.5;
        const h = size * (0.55 + 0.45 * (1 - Math.abs(t) * 1.4)) + wobble(i + x, 5);
        return (
          <path key={i} d={`M0,0 C${n(lean * 0.2)},${n(-h * 0.5)} ${n(lean * 0.6)},${n(-h * 0.8)} ${n(lean)},${n(-h)}`}
            fill="none" stroke={fill} strokeWidth={1.6} strokeLinecap="round" />
        );
      })}
    </g>
  );
}

/** Fern frond: a curving rachis with paired pinnae that shorten toward the tip. */
export function Fern({
  x, y, size = 54, rotate = 0, fill = "#39703c", opacity = 1,
}: { x: number; y: number; size?: number; rotate?: number; fill?: string; opacity?: number }) {
  const pairs = 9;
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} opacity={opacity}>
      <path d={`M0,0 C${n(size * 0.1)},${n(-size * 0.4)} ${n(size * 0.22)},${n(-size * 0.75)} ${n(size * 0.2)},${n(-size)}`}
        fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" />
      {Array.from({ length: pairs }).map((_, i) => {
        const t = (i + 1) / (pairs + 1);
        const px = n(size * (0.1 * (t * 4) * (1 - t) + 0.2 * t * t));
        const py = n(-size * t);
        const len = size * 0.3 * (1 - t * 0.8);
        return (
          <g key={i}>
            <path d={`M${px},${py} q${n(-len * 0.6)},${n(-len * 0.25)} ${n(-len)},${n(-len * 0.1)}`}
              fill="none" stroke={fill} strokeWidth={1.5} strokeLinecap="round" />
            <path d={`M${px},${py} q${n(len * 0.6)},${n(-len * 0.25)} ${n(len)},${n(-len * 0.1)}`}
              fill="none" stroke={fill} strokeWidth={1.5} strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}

/** Broad ovate leaf (hosta/aspidistra) — the flat mass that reads at any size. */
export function BroadLeaf({
  x, y, size = 40, rotate = 0, fill = "#2f6135", opacity = 1,
}: { x: number; y: number; size?: number; rotate?: number; fill?: string; opacity?: number }) {
  const w = size * 0.42;
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} opacity={opacity}>
      <path d={`M0,0 C${n(-w)},${n(-size * 0.42)} ${n(-w * 0.8)},${n(-size * 0.85)} 0,${n(-size)} C${n(w * 0.8)},${n(-size * 0.85)} ${n(w)},${n(-size * 0.42)} 0,0 Z`}
        fill={fill} />
      <line x1="0" y1="0" x2="0" y2={n(-size * 0.92)} stroke="#1d3a22" strokeWidth="0.9" opacity="0.45" />
      {[0.3, 0.5, 0.7].map((t) => (
        <g key={t} stroke="#1d3a22" strokeWidth="0.6" opacity="0.3">
          <path d={`M0,${n(-size * t)} q${n(-w * 0.4)},${n(-size * 0.06)} ${n(-w * 0.55)},${n(-size * 0.14)}`} fill="none" />
          <path d={`M0,${n(-size * t)} q${n(w * 0.4)},${n(-size * 0.06)} ${n(w * 0.55)},${n(-size * 0.14)}`} fill="none" />
        </g>
      ))}
    </g>
  );
}

/** Rounded shrub: overlapping leaf clusters forming a mound. Fills pots and beds. */
export function Shrub({
  x, y, size = 40, fill = "#356b3a", tip = "#4c8a4d", opacity = 1,
}: { x: number; y: number; size?: number; fill?: string; tip?: string; opacity?: number }) {
  const blobs = [
    [0, -size * 0.72, size * 0.42], [-size * 0.34, -size * 0.5, size * 0.34],
    [size * 0.34, -size * 0.52, size * 0.35], [-size * 0.18, -size * 0.26, size * 0.3],
    [size * 0.2, -size * 0.24, size * 0.29], [0, -size * 0.44, size * 0.36],
  ];
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      {blobs.map(([bx, by, r], i) => (
        <circle key={i} cx={n(bx)} cy={n(by)} r={n(r)} fill={i % 3 === 0 ? tip : fill} opacity={0.95} />
      ))}
      {[-0.5, 0, 0.5].map((t, i) => (
        <line key={i} x1={n(t * size * 0.3)} y1="0" x2={n(t * size * 0.5)} y2={n(-size * 0.5)}
          stroke="#243d24" strokeWidth="1.2" opacity="0.5" />
      ))}
    </g>
  );
}

/** Nandina / bamboo: thin canes with narrow leaflets. Adds vertical accents. */
export function Cane({
  x, y, size = 70, lean = 6, fill = "#4a7f47", opacity = 1,
}: { x: number; y: number; size?: number; lean?: number; fill?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      <path d={`M0,0 C${n(lean * 0.3)},${n(-size * 0.4)} ${n(lean * 0.7)},${n(-size * 0.7)} ${n(lean)},${n(-size)}`}
        fill="none" stroke="#5c7a4a" strokeWidth="2" strokeLinecap="round" />
      {[0.42, 0.6, 0.78, 0.94].map((t, i) => {
        const nx = n(lean * t), ny = n(-size * t), l = size * 0.26 * (1 - t * 0.4);
        return (
          <g key={i}>
            <path d={`M${nx},${ny} q${n(-l * 0.5)},${n(-l * 0.4)} ${n(-l)},${n(-l * 0.5)}`} fill="none" stroke={fill} strokeWidth="1.7" strokeLinecap="round" />
            <path d={`M${nx},${ny} q${n(l * 0.5)},${n(-l * 0.4)} ${n(l)},${n(-l * 0.5)}`} fill="none" stroke={fill} strokeWidth="1.7" strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}

/* ---------- trailing / hanging species ---------- */

/** Five-petal trumpet, the morning glory from the blue-house reference. */
function Bloom({ x, y, r = 5, petal = "#7d6cc4", eye = "#efe6d8" }: { x: number; y: number; r?: number; petal?: string; eye?: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy={n(-r * 0.62)} rx={n(r * 0.52)} ry={n(r * 0.68)}
          transform={`rotate(${a})`} fill={petal} />
      ))}
      <circle r={n(r * 0.34)} fill={eye} opacity="0.9" />
    </g>
  );
}

/**
 * Vine that hangs DOWN from its anchor, with round leaves alternating along a
 * gently waving stem and optional flowers. Used to drape the frame's edges —
 * it deliberately never crosses the machine's face.
 */
export function HangingVine({
  x, y, length = 140, leaf = 9, fill = "#2f5e33", amp = 12, phase = 0,
  flowers = 0, petal = "#7d6cc4", sway = false, opacity = 1,
}: {
  x: number; y: number; length?: number; leaf?: number; fill?: string;
  amp?: number; phase?: number; flowers?: number; petal?: string;
  sway?: boolean; opacity?: number;
}) {
  const seg = Math.max(4, Math.round(length / 18));
  const at = (t: number) => [n(amp * Math.sin(t * Math.PI * 1.6 + phase)), n(t * length)] as const;
  const stem = Array.from({ length: seg + 1 }, (_, i) => at(i / seg))
    .map(([px, py], i) => `${i ? "L" : "M"}${px},${py}`)
    .join(" ");
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      {/* inner group carries the sway so it can't clobber the placement */}
      <g className={sway ? "vm-sway" : undefined}>
        <path d={stem} fill="none" stroke="#2b4a2c" strokeWidth="1.8" strokeLinecap="round" />
        {Array.from({ length: seg }).map((_, i) => {
          const t = (i + 0.5) / seg;
          const [px, py] = at(t);
          const side = i % 2 ? 1 : -1;
          const s = leaf * (0.7 + 0.3 * Math.sin(t * Math.PI));
          return (
            <path key={i}
              d={`M${px},${py} c${n(side * s * 0.9)},${n(-s * 0.5)} ${n(side * s * 1.5)},${n(s * 0.25)} ${n(side * s * 0.55)},${n(s * 1.05)} c${n(-side * s * 0.5)},${n(-s * 0.2)} ${n(-side * s * 0.7)},${n(-s * 0.5)} ${n(-side * s * 0.55)},${n(-s * 1.05)} z`}
              fill={fill} />
          );
        })}
        {Array.from({ length: flowers }).map((_, i) => {
          const t = (i + 1) / (flowers + 1);
          const [px, py] = at(t);
          return <Bloom key={i} x={n(px + (i % 2 ? 6 : -6))} y={n(py + 4)} r={n(leaf * 0.62)} petal={petal} />;
        })}
      </g>
    </g>
  );
}

/** Ivy climbing a vertical edge: stem hugs the line, leaves fan off one side. */
export function ClimbingIvy({
  x, y, height = 160, leaf = 8, fill = "#2f5e33", side = 1, opacity = 1,
}: { x: number; y: number; height?: number; leaf?: number; fill?: string; side?: 1 | -1; opacity?: number }) {
  const seg = Math.max(5, Math.round(height / 20));
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      <path d={`M0,0 C${n(side * 7)},${n(-height * 0.3)} ${n(side * -5)},${n(-height * 0.6)} ${n(side * 4)},${n(-height)}`}
        fill="none" stroke="#2b4a2c" strokeWidth="2" strokeLinecap="round" />
      {Array.from({ length: seg }).map((_, i) => {
        const t = (i + 0.5) / seg;
        const py = n(-height * t);
        const px = n(side * (7 * Math.sin(t * Math.PI * 1.4)));
        const s = leaf * (0.75 + 0.25 * Math.cos(t * Math.PI));
        const dir = i % 2 ? side : side * 0.45;
        return (
          <path key={i}
            d={`M${px},${py} c${n(dir * s)},${n(-s * 0.75)} ${n(dir * s * 1.6)},${n(-s * 0.1)} ${n(dir * s * 0.7)},${n(s * 0.8)} c${n(-dir * s * 0.4)},${n(-s * 0.25)} ${n(-dir * s * 0.55)},${n(-s * 0.4)} ${n(-dir * s * 0.7)},${n(-s * 0.8)} z`}
            fill={fill} />
        );
      })}
    </g>
  );
}
