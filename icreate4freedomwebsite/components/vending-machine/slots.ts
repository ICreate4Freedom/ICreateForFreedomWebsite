/*
  slots.ts — the single source of truth for the whole site's navigation.
  Adding a page = add a route folder under app/(vended)/ + one entry here.
  No "use client": this is importable by server components too (footer nav,
  route metadata, sitemaps).
*/

export interface Slot {
  id: string;       // stable key, also shown on the selection button
  label: string;    // text printed on the cans
  route: string;    // Next.js route this slot vends
  shelf: 0 | 1 | 2; // which shelf row
  x: number;        // x of the row's first can inside the window
  count: number;    // how many can facings in the row
  can: string;      // can body color
  canDark: string;  // can shading color
  text: string;     // can label color
}

export const SLOTS: Slot[] = [
  { id: "about",    label: "ME",   route: "/about",    shelf: 0, x: 112, count: 3, can: "#e9e7df", canDark: "#b7b2a4", text: "#4a463e" },
  { id: "projects", label: "DEV",  route: "/projects", shelf: 0, x: 210, count: 3, can: "#2e6fb7", canDark: "#1d4a7e", text: "#eaf2fb" },
  { id: "garden",   label: "GROW", route: "/garden",   shelf: 1, x: 114, count: 7, can: "#3f7d44", canDark: "#2a5530", text: "#e9f5ea" },
  { id: "writing",  label: "INK",  route: "/writing",  shelf: 2, x: 114, count: 7, can: "#c8651c", canDark: "#93481a", text: "#fdf0e3" },
];

// ---- machine geometry (shared by parts + animation math) ----
export const CAN_W = 24;
export const CAN_H = 38;
export const CAN_STEP = 26;
export const SHELF_CAN_Y = [184, 254, 324] as const; // can-top y per shelf
export const DROP_LAND_Y = 498;                       // where a vended can lands

export const groupWidth = (s: Slot) => s.count * CAN_STEP - 2;
export const groupCenter = (s: Slot) => s.x + groupWidth(s) / 2;
/** x of the can facing that visually "drops" (the row's middle facing) */
export const dropCanX = (s: Slot) => s.x + Math.floor(s.count / 2) * CAN_STEP;