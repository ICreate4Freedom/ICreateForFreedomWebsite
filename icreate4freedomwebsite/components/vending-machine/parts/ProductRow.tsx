import type { KeyboardEvent } from "react";
import { CAN_H, CAN_STEP, SHELF_CAN_Y, groupWidth, groupCenter, type Slot } from "../slots";
import { SmallCan } from "./SmallCan";

interface Props {
  slot: Slot;
  hovered: boolean;
  pressed: boolean;   // true while this row's can is dropping
  disabled: boolean;  // true while ANY dispense is in flight
  onHover: () => void;
  onLeave: () => void;
  onPress: () => void;
}

export function ProductRow({ slot, hovered, pressed, disabled, onHover, onLeave, onPress }: Props) {
  const y = SHELF_CAN_Y[slot.shelf];
  const cx = groupCenter(slot);
  const onKeyDown = (e: KeyboardEvent<SVGGElement>) => {
    if (!disabled && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onPress(); }
  };
  return (
    <g
      role="link"
      aria-label={`Vend ${slot.route}`}
      tabIndex={disabled ? -1 : 0}
      style={{ cursor: disabled ? "default" : "pointer", outline: "none" }}
      onMouseEnter={onHover} onMouseLeave={onLeave}
      onFocus={onHover} onBlur={onLeave}
      onClick={() => !disabled && onPress()}
      onKeyDown={onKeyDown}
    >
      {/* can facings — the middle one hides while its falling clone is live */}
      {Array.from({ length: slot.count }).map((_, i) => (
        !(pressed && i === Math.floor(slot.count / 2)) && (
          <SmallCan key={i} x={slot.x + i * CAN_STEP} y={y} slot={slot} lit={hovered} />
        )
      ))}
      {hovered && (
        <rect x={slot.x - 4} y={y - 6} width={groupWidth(slot) + 8} height={CAN_H + 10} rx="7"
          fill="none" stroke="#ffe9a8" strokeWidth="1.5" strokeOpacity="0.85" />
      )}
      {/* selection button on the white strip below the shelf */}
      <g transform={`translate(${cx - 19}, ${y + 41}) ${pressed ? "translate(0,1)" : ""}`}>
        <rect width="38" height="10" rx="3" fill={hovered ? "#3b3f46" : "#2b2e33"} stroke="#15161a" strokeWidth="0.75" />
        <circle cx="7" cy="5" r="2.4" fill={pressed ? "#7CFC00" : hovered ? "#ffd75e" : "#59524a"} />
        <text x="23" y="7.5" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fill={hovered ? "#fff" : "#9aa0a8"}>
          {slot.id.toUpperCase()}
        </text>
      </g>
    </g>
  );
}