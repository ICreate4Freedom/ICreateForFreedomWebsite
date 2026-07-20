interface Props {
  x: number; y: number;
  size?: number; rotate?: number; fill?: string;
  sway?: boolean; reduced?: boolean;
}

/* Fatsia japonica leaf. Outer <g> positions it; inner <g> carries the sway
   animation so the CSS transform doesn't clobber the placement transform. */
export function Fatsia({ x, y, size = 80, rotate = 0, fill = "#3c7a41", sway = false, reduced = false }: Props) {
  const lobes = [-72, -48, -24, 0, 24, 48, 72];
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <g style={sway && !reduced ? { animation: "vm-sway 7s ease-in-out infinite", transformOrigin: "0px 0px" } : undefined}>
        {lobes.map((a) => {
          const len = size * (1 - Math.abs(a) / 220);
          return (
            <path key={a} transform={`rotate(${a})`} fill={fill}
              d={`M0,0 C${len * 0.16},${-len * 0.3} ${len * 0.16},${-len * 0.85} 0,${-len} C${-len * 0.16},${-len * 0.85} ${-len * 0.16},${-len * 0.3} 0,0`} />
          );
        })}
        {lobes.map((a) => (
          <line key={`v${a}`} x1="0" y1="0" x2="0" y2={-size * (1 - Math.abs(a) / 220) * 0.85}
            transform={`rotate(${a})`} stroke="#243" strokeWidth="0.8" opacity="0.35" />
        ))}
        <circle r={size * 0.05} fill={fill} />
      </g>
    </g>
  );
}