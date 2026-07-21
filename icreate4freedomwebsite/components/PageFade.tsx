import { ViewTransition } from "react";

/* Route crossfade: every page wraps its root element in this. On navigation
   the old page's exit and the new page's enter run the asymmetric fade in
   globals.css (fast leave, gentle arrival — ~350ms total). `default="none"`
   keeps unrelated transitions from re-animating the page. Browsers without
   the View Transitions API simply swap instantly. */
export function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-fade" exit="page-fade" default="none">
      {children}
    </ViewTransition>
  );
}
