/* The reading room. Replace the samples with real essays; entries render
   newest-first in the order listed here. When real writing starts, this
   file is the natural seam to swap for MDX. */

export interface Post {
  title: string;
  date: string;
  summary: string;
  href?: string;
}

export const POSTS: Post[] = [
  {
    // SAMPLE — replace with a real essay
    title: "The first essay goes here",
    date: "20XX·XX",
    summary:
      "Replace this entry in content/writing.ts. A one-line summary under each title, like a label on a can.",
  },
  {
    // SAMPLE — replace with a real essay
    title: "A second essay title",
    date: "20XX·XX",
    summary: "Entries with an href become links; without one they render as upcoming.",
  },
];
