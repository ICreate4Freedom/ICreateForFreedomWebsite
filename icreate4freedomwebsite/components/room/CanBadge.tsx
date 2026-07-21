import type { Slot } from "@/components/vending-machine/slots";

/* The can you vended, standalone — same proportions as the machine's cans
   (SmallCan) but self-contained for use in room headers. Decorative. */
export function CanBadge({ slot, height = 44 }: { slot: Slot; height?: number }) {
  return (
    <svg viewBox="0 -3 24 44" height={height} width={(height * 24) / 44} aria-hidden="true">
      <rect width="24" height="38" rx="5" fill={slot.can} />
      <rect width="7" height="38" rx="4" fill={slot.canDark} opacity="0.5" />
      <rect x="17" y="3" width="3.5" height="32" rx="1.75" fill="#fff" opacity="0.35" />
      <rect x="1.5" y="-2.5" width="21" height="5" rx="2.5" fill="#c6c6c6" />
      <text x="12" y="22.5" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="8" fill={slot.text}>
        {slot.label}
      </text>
    </svg>
  );
}
