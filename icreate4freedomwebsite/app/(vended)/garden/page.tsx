import type { Metadata } from "next";
import { Room } from "@/components/room/Room";
import { GARDEN_NOTES, type GrowthStage } from "@/content/garden";

export const metadata: Metadata = { title: "Garden — ICreate4Freedom" };

const STAGE_COLOR: Record<GrowthStage, string> = {
  seedling: "#9ad29e",
  budding: "#79b97f",
  evergreen: "#4d8f53",
};

export default function GardenPage() {
  return (
    <Room slotId="garden" lede="A digital garden. Notes are plants — some are seedlings, some evergreen.">
      <ul className="space-y-8">
        {GARDEN_NOTES.map((note) => (
          <li key={note.title} className="border-l-2 pl-5" style={{ borderColor: STAGE_COLOR[note.stage] }}>
            <p className="font-mono text-[0.65rem] tracking-[0.2em]" style={{ color: STAGE_COLOR[note.stage] }}>
              {note.stage.toUpperCase()} · PLANTED {note.planted.toUpperCase()}
            </p>
            <h2 className="mt-1.5 font-mincho text-xl font-bold">{note.title}</h2>
            <p className="mt-2 leading-relaxed text-[var(--room-muted)]">{note.summary}</p>
          </li>
        ))}
      </ul>
    </Room>
  );
}
