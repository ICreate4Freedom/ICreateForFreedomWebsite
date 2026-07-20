import { CAN_W, CAN_H, type Slot } from "../slots";

export function SmallCan({ x, y, slot, lit }: { x: number; y: number; slot: Slot; lit?: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={CAN_W} height={CAN_H} rx="5" fill={slot.can} />
      <rect width="7" height={CAN_H} rx="4" fill={slot.canDark} opacity="0.5" />
      <rect x="17" y="3" width="3.5" height={CAN_H - 6} rx="1.75" fill="#fff" opacity={lit ? 0.55 : 0.25} />
      <rect x="1.5" y="-2.5" width={CAN_W - 3} height="5" rx="2.5" fill="#c6c6c6" />
      <text x={CAN_W / 2} y={CAN_H / 2 + 3.5} textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="8" fill={slot.text}>
        {slot.label}
      </text>
    </g>
  );
}