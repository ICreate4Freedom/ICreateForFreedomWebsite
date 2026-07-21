import { Shippori_Mincho } from "next/font/google";

/* Shared shell for every vended room. Loads the mincho display face only on
   these routes (latin subset — headings are English); the per-slot palette
   itself is set by <Room> from slots.ts. */

const mincho = Shippori_Mincho({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
});

export default function VendedLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${mincho.variable} contents`}>{children}</div>;
}
