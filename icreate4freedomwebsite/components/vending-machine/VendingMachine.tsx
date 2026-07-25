"use client";

import { useState, useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { SLOTS, SHELF_CAN_Y, DROP_LAND_Y, dropCanX, MACHINE_TRANSFORM, type Slot } from "./slots";
import { SmallCan } from "./parts/SmallCan";
import { ProductRow } from "./parts/ProductRow";
import { MachineBody } from "./parts/MachineBody";
import { CoinColumn, type LedDisplay } from "./parts/CoinColumn";
import { LowerDoor } from "./parts/LowerDoor";
import { EnvironmentBack, WetGround, Atmosphere } from "./parts/Environment";
import { Overgrowth, Foreground } from "./parts/Overgrowth";
import { Bicycle } from "./parts/Bicycle";
import { RainBack, RainFront, RainHaze } from "./parts/Rain";

const DROP_MS = 700;    // can fall duration
const SETTLE_MS = 150;  // beat after the can lands, before the route changes
const IDLE_MS = 6000;   // quiet time before the LED starts inviting

/* B1 — the arrival beat plays once per hard load: true until the first
   mount's effect runs, so client-side returns to the machine skip it.
   (Server-side this is never mutated, so SSR always renders the beat.) */
let arrivedThisLoad = false;

const REDUCED_MQ = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MQ);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const reducedSnapshot = () => window.matchMedia(REDUCED_MQ).matches;

export default function VendingMachine() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [dispensing, setDispensing] = useState<Slot | null>(null);
  const [idle, setIdle] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, reducedSnapshot, () => false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // captured once per mount: true only on the first mount of a hard load
  const [arriving] = useState(() => !arrivedThisLoad);

  const armIdle = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), IDLE_MS);
  };

  useEffect(() => {
    arrivedThisLoad = true;
    // only four pages exist — prefetch them all so touch users (who never
    // hover) get instant vends too
    SLOTS.forEach((slot) => router.prefetch(slot.route));
    armIdle();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hover = (slot: Slot) => {
    setHovered(slot.id);
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
  };

  const leave = () => {
    setHovered(null);
    armIdle();
  };

  const press = (slot: Slot) => {
    if (dispensing) return;
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (reduced) { router.push(slot.route); return; } // no animation, just go
    setDispensing(slot);
    timer.current = setTimeout(() => router.push(slot.route), DROP_MS + SETTLE_MS);
  };

  const hoveredSlot = hovered ? SLOTS.find((s) => s.id === hovered) ?? null : null;
  const display: LedDisplay = dispensing
    ? { text: "VENDING" }
    : hoveredSlot
      ? { text: `${hoveredSlot.id.toUpperCase()} ¥${hoveredSlot.price}` }
      : idle
        ? reduced
          ? { text: "PICK A CAN" }
          : { text: "いらっしゃいませ ・ PICK A CAN", marquee: true }
        : { text: "¥000" };

  const dropDist = dispensing ? DROP_LAND_Y - SHELF_CAN_Y[dispensing.shelf] : 0;

  return (
    <div className="flex h-[calc(100dvh-2.5rem)] w-full items-center justify-center overflow-hidden select-none bg-[#08090e]">
      {/* The SVG always fills the viewport edge to edge — no letterboxing.
          "slice" trades height for width, so visible height = 1080 / aspect:
          every window up to ~2.0 shows the machine's full 525-unit height, and
          past that the crop eats the base plinth and road from the bottom
          while the header and all four button rows stay clear (they sit above
          y=400). Narrow screens crop horizontally to the machine alone, which
          is the phone framing. */}
      <svg
        viewBox="-300 0 1080 680"
        preserveAspectRatio="xMidYMid slice"
        className="vm-scene h-full w-full"
        aria-label="ICreate4Freedom navigation — a vending machine in a Japanese side street, reclaimed by plants; each button vends a page"
      >
        <defs>
          {/* falling can is visible only inside the window and the opening */}
          <clipPath id="vm-canPath">
            <rect x="104" y="178" width="200" height="208" rx="5" />
            <rect x="150" y="504" width="140" height="42" rx="6" />
          </clipPath>
        </defs>

        {/* the street, behind everything: decor only, quiet for screen readers */}
        <g aria-hidden="true">
          <EnvironmentBack />
          <RainBack />
          <Overgrowth />
          <WetGround />
        </g>

        {/* THE MACHINE. Scaled as one unit — the clip paths below are
            userSpaceOnUse, so vm-canPath / vm-doorClip / vm-ledClip inherit this
            transform along with the geometry they clip, and no part coordinate
            has to change. The product rows must stay inside this group or their
            hit areas would drift away from the cans they draw. */}
        <g transform={MACHINE_TRANSFORM}>
          <g aria-hidden="true">
            <MachineBody />
          </g>

          {SLOTS.map((slot) => (
            <ProductRow
              key={slot.id}
              slot={slot}
              hovered={hovered === slot.id}
              pressed={dispensing?.id === slot.id}
              disabled={!!dispensing}
              onHover={() => hover(slot)}
              onLeave={leave}
              onPress={() => press(slot)}
            />
          ))}

          <g aria-hidden="true">
            <CoinColumn display={display} arriving={arriving} />
            <LowerDoor />

            {dispensing && (
              <g clipPath="url(#vm-canPath)">
                <g
                  style={{
                    animation: `vm-drop ${DROP_MS / 1000}s cubic-bezier(0.6, 0, 1, 1) forwards`,
                    "--vm-drop-dist": `${dropDist}px`,
                  } as CSSProperties}
                >
                  <SmallCan x={dropCanX(dispensing)} y={SHELF_CAN_Y[dispensing.shelf]} slot={dispensing} lit />
                </g>
              </g>
            )}
          </g>
        </g>

        {/* Everything in FRONT of the machine. This layer is what makes the
            scene read as a photograph rather than a flat elevation — leaves
            crowd the lens and the bicycle leans across the lower door, exactly
            as in the reference shots. pointer-events:none keeps every one of
            these shapes from swallowing a vend click. */}
        <g aria-hidden="true" style={{ pointerEvents: "none" }}>
          <Bicycle />
          <Foreground />
          <RainFront />
          <RainHaze />
          <Atmosphere arriving={arriving} />

          {/* arrival shade: the alley starts dim and breathes open */}
          {arriving && (
            <rect x="-480" y="0" width="1440" height="680" fill="#08090e"
              className="vm-arrive-shade" />
          )}
        </g>
      </svg>
    </div>
  );
}
