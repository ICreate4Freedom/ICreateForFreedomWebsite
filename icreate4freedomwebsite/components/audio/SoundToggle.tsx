"use client";

/*
  The only control the scene has. Sits at the right end of the footer strip on
  every page, in the same monospace register as the fallback nav, so it reads
  as part of the machine's signage rather than as browser chrome.

  Deliberately quiet: sound is off until asked for, and this is the asking.
*/

import { useSound } from "./AudioProvider";

export function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      title={enabled ? "Turn sound off" : "Turn sound on — it's raining"}
      className="absolute right-3 flex items-center gap-1.5 rounded px-1.5 py-1 text-neutral-500 transition-colors hover:text-neutral-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-neutral-400"
    >
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {/* speaker cone */}
        <path
          d="M7.4 2.6 4.2 5.4H2.1v5.2h2.1l3.2 2.8z"
          fill="currentColor"
        />
        {enabled ? (
          // two arcs of sound leaving the cone
          <>
            <path d="M10.1 5.6a3.4 3.4 0 0 1 0 4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M12.3 3.6a6.3 6.3 0 0 1 0 8.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </>
        ) : (
          <path d="M10.4 6.1l3.4 3.8M13.8 6.1l-3.4 3.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        )}
      </svg>
      <span className="sr-only">{enabled ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
