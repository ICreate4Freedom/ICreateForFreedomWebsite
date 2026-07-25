/* Rain.
   The scene's ground was always painted as "after rain" (puddles, reflections,
   wet sheen) — this makes the rain actually fall.

   Structure: each layer draws its streaks ONCE into <defs>, then repeats that
   band four times with <use> and slides the whole group down by exactly one
   band height. Because the pattern is periodic, the loop is seamless, and the
   browser animates 3 groups instead of ~140 individual lines.

   Layers run at different speeds, thicknesses and opacities to read as depth:
   the far layers sit behind the machine, the near one in front of it. */

const TILE = 340; // band height; must match --vm-rain-tile in the CSS

/* Exact-integer LCG. Math.imul, >>>, and division by 2^32 are all exactly
   specified, so Node and the browser produce bit-identical values — unlike
   Math.random (varies per call) or raw Math.sin (implementation-defined in the
   last ULP), either of which would reintroduce a hydration mismatch. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const n = (v: number) => Math.round(v * 10) / 10;

interface BandProps {
  id: string;
  seed: number;
  count: number;
  len: number;
  lean: number;   // horizontal drift over the streak's length (wind)
  width: number;
  color: string;
  opacity: number;
}

/** One band of streaks, defined once and reused by the animated layer. */
function Band({ id, seed, count, len, lean, width, color, opacity }: BandProps) {
  const rand = lcg(seed);
  const lines = [];
  for (let i = 0; i < count; i++) {
    // spread across the full scene width, not just the visible crop
    const x = n(-500 + rand() * 1480);
    const y = n(rand() * TILE);
    const l = n(len * (0.7 + rand() * 0.6));
    lines.push(<line key={i} x1={x} y1={y} x2={n(x + lean)} y2={n(y + l)} />);
  }
  return (
    <g id={id} stroke={color} strokeWidth={width} strokeLinecap="round" opacity={opacity}>
      {lines}
    </g>
  );
}

/** Repeats a band down the scene so the slide loops without a visible seam. */
function Layer({ id, className }: { id: string; className: string }) {
  return (
    <g className={className}>
      {[-1, 0, 1, 2].map((k) => (
        <use key={k} href={`#${id}`} y={k * TILE} />
      ))}
    </g>
  );
}

/** Rain BEHIND the machine: the two distant, slower, dimmer curtains. */
export function RainBack() {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <Band id="vm-rain-far" seed={7} count={74} len={22} lean={-4} width={0.8} color="#b9d4e2" opacity={0.16} />
        <Band id="vm-rain-mid" seed={41} count={46} len={34} lean={-6} width={1.1} color="#cfe4ee" opacity={0.22} />
      </defs>
      <Layer id="vm-rain-far" className="vm-rain vm-rain--far" />
      <Layer id="vm-rain-mid" className="vm-rain vm-rain--mid" />
    </g>
  );
}

/** Rain IN FRONT of the machine, plus eaves drips and puddle ripples. */
export function RainFront() {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <Band id="vm-rain-near" seed={113} count={24} len={54} lean={-9} width={1.9} color="#e4f1f7" opacity={0.3} />
      </defs>
      <Layer id="vm-rain-near" className="vm-rain vm-rain--near" />

      {/* Drips running off the awning's drip edge (y≈136) and the machine's
          roofline (y≈95). Staggered so they never fall in unison. */}
      {[
        [96, 138, 0], [148, 138, 0.9], [206, 138, 0.35], [268, 138, 1.4],
        [332, 138, 0.7], [412, 138, 1.1], [446, 138, 0.2],
      ].map(([x, y, delay], i) => (
        <line key={i} className="vm-drip" x1={x} y1={y} x2={x - 1.5} y2={y + 9}
          stroke="#dceaf2" strokeWidth="1.6" strokeLinecap="round"
          style={{ animationDelay: `${delay}s` }} />
      ))}

      {/* Ripples opening in the standing water. Positions sit on the road band
          and on the puddles WetGround already draws. */}
      {[
        [-188, 656, 0], [-96, 668, 1.5], [42, 664, 0.8], [196, 658, 2.1],
        [318, 668, 1.2], [524, 654, 0.4], [668, 666, 1.8],
      ].map(([x, y, delay], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <ellipse className="vm-ripple" rx="11" ry="3.2" fill="none"
            stroke="#cfe4ee" strokeWidth="1" style={{ animationDelay: `${delay}s` }} />
        </g>
      ))}
    </g>
  );
}

/** Cool haze that sits over everything — air full of water. */
export function RainHaze() {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <linearGradient id="vm-rainHaze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9dc4d8" stopOpacity="0.13" />
          <stop offset="0.55" stopColor="#8fb6cc" stopOpacity="0.06" />
          <stop offset="1" stopColor="#7fa6bd" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="-480" y="0" width="1440" height="680" fill="url(#vm-rainHaze)" />
    </g>
  );
}
