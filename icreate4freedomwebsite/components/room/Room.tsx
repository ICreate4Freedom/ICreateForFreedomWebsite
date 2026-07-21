import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { SLOTS, slotName, type Slot } from "@/components/vending-machine/slots";
import { PageFade } from "@/components/PageFade";
import { CanBadge } from "./CanBadge";

/* A room of the alley: every vended page renders inside this shell. It sets
   the slot's dusk palette as CSS variables (--room-*), draws the receipt
   header (the can you vended + its slot tag), and ends with the PUSH-flap
   exit. Content-first: the room is quiet on purpose. */

interface RoomProps {
  slotId: string;
  lede?: string;
  children: ReactNode;
}

function slotTag(slot: Slot) {
  const n = SLOTS.indexOf(slot) + 1;
  return `SLOT 0${n} · ${slot.label} · ¥${slot.price}`;
}

export function Room({ slotId, lede, children }: RoomProps) {
  const slot = SLOTS.find((s) => s.id === slotId);
  if (!slot) throw new Error(`Room: unknown slot "${slotId}"`);
  const vars = {
    "--room-bg": slot.room.bg,
    "--room-surface": slot.room.surface,
    "--room-line": slot.room.line,
    "--room-accent": slot.room.accent,
    "--room-text": slot.room.text,
    "--room-muted": slot.room.muted,
  } as CSSProperties;
  return (
    <PageFade>
      <main
        style={vars}
        className="min-h-[calc(100dvh-2.5rem)] bg-[var(--room-bg)] px-6 py-16 text-[var(--room-text)] sm:py-24"
      >
        <article className="mx-auto w-full max-w-2xl">
          <header className="mb-14">
            <div className="flex items-end gap-4">
              <CanBadge slot={slot} />
              <p className="pb-1 font-mono text-xs tracking-[0.2em] text-[var(--room-muted)]">
                {slotTag(slot)}
              </p>
            </div>
            <h1 className="mt-6 font-mincho text-4xl font-bold sm:text-5xl">
              {slotName(slot)}
            </h1>
            {lede && (
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-[var(--room-muted)]">
                {lede}
              </p>
            )}
          </header>

          {children}

          {/* the way out — the same flap you collected the can from */}
          <footer className="mt-20 flex justify-center">
            <Link href="/" className="group inline-flex flex-col items-center gap-1.5">
              <span className="font-mono text-[0.65rem] tracking-[0.25em] text-[var(--room-muted)]">
                PUSH
              </span>
              <span className="flex h-11 w-52 items-center justify-center rounded-md border-2 border-[#b9bdc2]/40 bg-black/30 font-mono text-xs tracking-wider text-[var(--room-text)] motion-safe:transition-transform group-hover:translate-y-0.5 group-active:translate-y-1">
                ← BACK TO THE MACHINE
              </span>
            </Link>
          </footer>
        </article>
      </main>
    </PageFade>
  );
}
