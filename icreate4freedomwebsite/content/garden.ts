/* The digital garden. Notes grow: seedling → budding → evergreen.
   Replace the samples in place; `planted` is a display string on purpose —
   this is a garden, not a database. */

export type GrowthStage = "seedling" | "budding" | "evergreen";

export interface GardenNote {
  title: string;
  stage: GrowthStage;
  planted: string;
  summary: string;
}

export const GARDEN_NOTES: GardenNote[] = [
  {
    title: "How this garden works",
    stage: "evergreen",
    planted: "July 2026",
    summary:
      "Notes here aren't posts — they're plants. Seedlings are rough ideas, budding notes are taking shape, evergreens are worth returning to. Things get replanted, pruned, and occasionally die. That's fine.",
  },
  {
    // SAMPLE — replace with a real note
    title: "A seedling looks like this",
    stage: "seedling",
    planted: "20XX",
    summary: "A sentence or two capturing an idea before it's ready. Replace me in content/garden.ts.",
  },
  {
    // SAMPLE — replace with a real note
    title: "A budding note looks like this",
    stage: "budding",
    planted: "20XX",
    summary: "Something half-grown — a technique you're testing, an opinion forming. Replace me.",
  },
  {
    // SAMPLE — replace with a real note
    title: "An evergreen looks like this",
    stage: "evergreen",
    planted: "20XX",
    summary: "A note that stays useful — a reference, a principle, a recipe. Replace me.",
  },
];
