import type { Metadata } from "next";
import { Room } from "@/components/room/Room";
import { PROJECTS } from "@/content/projects";

export const metadata: Metadata = { title: "Projects — ICreate4Freedom" };

export default function ProjectsPage() {
  return (
    <Room slotId="projects" lede="The workbench. Things I've built, one honest sentence each.">
      <ul className="space-y-4">
        {PROJECTS.map((p) => {
          const card = (
            <div className="rounded-lg border border-[var(--room-line)] bg-[var(--room-surface)] p-6 motion-safe:transition-colors group-hover:border-[var(--room-accent)]">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-mincho text-xl font-bold">{p.name}</h2>
                <span className="shrink-0 font-mono text-xs text-[var(--room-muted)]">{p.year}</span>
              </div>
              <p className="mt-2 leading-relaxed text-[var(--room-muted)]">{p.description}</p>
              <p className="mt-4 font-mono text-xs tracking-wider text-[var(--room-accent)]">
                {p.tags.join(" · ")}
              </p>
            </div>
          );
          return (
            <li key={p.name}>
              {p.href ? (
                <a href={p.href} className="group block" target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ul>
    </Room>
  );
}
