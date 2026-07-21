/*
  slots.ts — the single source of truth for the whole site's navigation.
  Adding a page = add a route folder under app/(vended)/ + one entry here.
  No "use client": this is importable by server components too (footer nav,
  route metadata, sitemaps).
*/

/** Dusk-room palette a slot's page renders in — the can's color as the
    light source in a dark room. Hand-tuned; accents pass AA on their bg. */
export interface RoomPalette {
  bg: string;       // page background (near-black, tinted toward the can)
  surface: string;  // cards / raised panels
  line: string;     // hairlines and borders
  accent: string;   // links, highlights (lightened can color)
  text: string;     // body text
  muted: string;    // secondary text, tags
}

export interface Slot {
  id: string;       // stable key, also shown on the selection button
  label: string;    // text printed on the cans
  route: string;    // Next.js route this slot vends
  price: number;    // yen shown on the LED display while hovering
  shelf: 0 | 1 | 2; // which shelf row
  x: number;        // x of the row's first can inside the window
  count: number;    // how many can facings in the row
  can: string;      // can body color
  canDark: string;  // can shading color
  text: string;     // can label color
  room: RoomPalette;
}

export const SLOTS: Slot[] = [
  { id: "about",    label: "ME",   route: "/about",    price: 100, shelf: 0, x: 112, count: 3, can: "#e9e7df", canDark: "#b7b2a4", text: "#4a463e",
    room: { bg: "#171610", surface: "#201e16", line: "#38352a", accent: "#e9e7df", text: "#ece9dd", muted: "#9c968a" } },
  { id: "projects", label: "DEV",  route: "/projects", price: 120, shelf: 0, x: 210, count: 3, can: "#2e6fb7", canDark: "#1d4a7e", text: "#eaf2fb",
    room: { bg: "#0d1521", surface: "#131e2e", line: "#263850", accent: "#6da7e0", text: "#e8f0f8", muted: "#8fa5bc" } },
  { id: "garden",   label: "GROW", route: "/garden",   price: 110, shelf: 1, x: 114, count: 7, can: "#3f7d44", canDark: "#2a5530", text: "#e9f5ea",
    room: { bg: "#0e1a11", surface: "#152418", line: "#2a4030", accent: "#79b97f", text: "#e9f5ea", muted: "#8fa894" } },
  { id: "writing",  label: "INK",  route: "/writing",  price: 130, shelf: 2, x: 114, count: 7, can: "#c8651c", canDark: "#93481a", text: "#fdf0e3",
    room: { bg: "#1a120a", surface: "#261a0f", line: "#453222", accent: "#e09554", text: "#f7ece1", muted: "#b39a85" } },
];

/** "about" → "About" — accessible name for a slot's link */
export const slotName = (s: Slot) => s.id[0].toUpperCase() + s.id.slice(1);

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