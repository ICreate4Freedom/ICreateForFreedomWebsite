import type { Metadata } from "next";
import { Room } from "@/components/room/Room";

export const metadata: Metadata = { title: "About — ICreate4Freedom" };

/* Bracketed [ ... ] spans are placeholders — replace them with your own
   words. Everything else is true to the site. */
export default function AboutPage() {
  return (
    <Room slotId="about" lede="Software engineer. I make things with care, mostly for the web.">
      <div className="space-y-6 leading-relaxed">
        <p>
          Hello — I&apos;m Michael. I build software the way this site was
          built: slowly, deliberately, and with an unreasonable amount of
          affection for small details. [Replace with your own opening — one
          honest paragraph about who you are.]
        </p>
        <p>
          I lived in Japan for a while. The vending machines tucked into quiet
          residential streets — humming alone at night, half-swallowed by
          someone&apos;s garden — never left me. This site is that memory,
          kept running.
        </p>
        <p>
          [A paragraph about now: what you&apos;re working on, what you care
          about, where you&apos;re headed.]
        </p>
      </div>

      <section className="mt-14 border-t border-[var(--room-line)] pt-8">
        <h2 className="font-mono text-xs tracking-[0.2em] text-[var(--room-muted)]">
          CURRENTLY
        </h2>
        <p className="mt-3 leading-relaxed">
          [One line — a job, a study, a project, a season of life.]
        </p>
      </section>
    </Room>
  );
}
