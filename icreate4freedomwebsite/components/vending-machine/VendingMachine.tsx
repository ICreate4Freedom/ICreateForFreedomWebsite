"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { SLOTS, SHELF_CAN_Y, DROP_LAND_Y, dropCanX, type Slot } from "./slots";
import { SmallCan } from "./parts/SmallCan";
import { ProductRow } from "./parts/ProductRow";
import { MachineBody } from "./parts/MachineBody";
import { CoinColumn } from "./parts/CoinColumn";
import { LowerDoor } from "./parts/LowerDoor";
import { EnvironmentBack, Atmosphere } from "./parts/Environment";
import { Overgrowth, Pot } from "./parts/Overgrowth";
import { Bicycle } from "./parts/Bicycle";

const DROP_MS = 850;

export default function VendingMachine() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [dispensing, setDispensing] = useState<Slot | null>(null);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => {
      mq.removeEventListener("change", fn);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const hover = (slot: Slot) => {
    setHovered(slot.id);
    router.prefetch(slot.route); // destination is loaded before the can lands
  };

  const press = (slot: Slot) => {
    if (dispensing) return;
    if (reduced) { router.push(slot.route); return; } // no animation, just go
    setDispensing(slot);
    timer.current = setTimeout(() => router.push(slot.route), DROP_MS);
  };

  const dropDist = dispensing ? DROP_LAND_Y - SHELF_CAN_Y[dispensing.shelf] : 0;

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <svg
        viewBox="0 0 480 680"
        style={{ width: "min(94vw, 480px)", height: "auto" }}
        aria-label="ICreate4Freedom navigation — a vending machine reclaimed by plants; each button vends a page"
      >
        <defs>
          {/* falling can is visible only inside the window and the opening */}
          <clipPath id="vm-canPath">
            <rect x="104" y="178" width="200" height="208" rx="5" />
            <rect x="150" y="504" width="140" height="42" rx="6" />
          </clipPath>
        </defs>

        <EnvironmentBack />
        <MachineBody />

        {SLOTS.map((slot) => (
          <ProductRow
            key={slot.id}
            slot={slot}
            hovered={hovered === slot.id}
            pressed={dispensing?.id === slot.id}
            disabled={!!dispensing}
            onHover={() => hover(slot)}
            onLeave={() => setHovered(null)}
            onPress={() => press(slot)}
          />
        ))}

        <CoinColumn displayText={dispensing ? "..." : "¥000"} />
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
          <Overgrowth reduced={reduced} />
        </g>

        <Atmosphere />
      </svg>
    </div>
  );
}