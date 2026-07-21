"use client";

import { useState, useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { SLOTS, SHELF_CAN_Y, DROP_LAND_Y, dropCanX, type Slot } from "./slots";
import { SmallCan } from "./parts/SmallCan";
import { ProductRow } from "./parts/ProductRow";
import { MachineBody } from "./parts/MachineBody";
import { CoinColumn, type LedDisplay } from "./parts/CoinColumn";
import { LowerDoor } from "./parts/LowerDoor";
import { EnvironmentBack, WetGround, Atmosphere } from "./parts/Environment";
import { Overgrowth, Pot } from "./parts/Overgrowth";
import { Bicycle } from "./parts/Bicycle";
import { CrtPile } from "./parts/CrtPile";
import { Payphone } from "./parts/Payphone";
import { Annotations } from "./parts/Annotations";

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
    <div className="h-[calc(100dvh-2.5rem)] w-full overflow-hidden select-none bg-[#0b0e0b]">
      {/* wide viewBox: machine stays at 0..480, alley extends to the sides;
          "slice" fills the viewport — narrow screens crop to the machine */}
      <svg
        viewBox="-480 0 1440 680"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-label="ICreate4Freedom navigation — a vending machine reclaimed by plants; each button vends a page"
      >
        <defs>
          {/* falling can is visible only inside the window and the opening */}
          <clipPath id="vm-canPath">
            <rect x="104" y="178" width="200" height="208" rx="5" />
            <rect x="150" y="504" width="140" height="42" rx="6" />
          </clipPath>
        </defs>

        {/* scene + machine shell: decor only, quiet for screen readers */}
        <g aria-hidden="true">
          <EnvironmentBack />
          <WetGround />
          <CrtPile />
          <Payphone />
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

          {/* front decor — never intercepts clicks */}
          <g style={{ pointerEvents: "none" }}>
            <Pot />
            <Bicycle />
            <Overgrowth />
            <Annotations />
          </g>

          <Atmosphere arriving={arriving} />

          {/* arrival shade: the alley starts dim and breathes open */}
          {arriving && (
            <rect x="-480" y="0" width="1440" height="680" fill="#0b0e0b"
              className="vm-arrive-shade" style={{ pointerEvents: "none" }} />
          )}
        </g>
      </svg>
    </div>
  );
}
