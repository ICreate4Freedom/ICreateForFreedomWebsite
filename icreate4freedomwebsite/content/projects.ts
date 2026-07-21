/* The workbench. Replace the sample entries with real projects — each one
   becomes a card on /projects. `href` is optional; cards without it render
   as plain panels. */

export interface Project {
  name: string;
  description: string;
  href?: string;
  tags: string[];
  year: string;
}

export const PROJECTS: Project[] = [
  {
    name: "ICreate4Freedom",
    description:
      "This site. A vending machine in a quiet alley that vends pages instead of cans — hand-drawn SVG, no frameworks beyond Next.js.",
    tags: ["Next.js", "SVG", "TypeScript"],
    year: "2026",
  },
  {
    // SAMPLE — replace with a real project
    name: "Sample project",
    description:
      "Replace this entry in content/projects.ts. One honest sentence about what it is and why it exists beats a paragraph of features.",
    tags: ["sample"],
    year: "20XX",
  },
  {
    // SAMPLE — replace with a real project
    name: "Another sample",
    description:
      "Cards with an href become links; cards without one render as plain panels. Delete what you don't need.",
    tags: ["sample"],
    year: "20XX",
  },
];
