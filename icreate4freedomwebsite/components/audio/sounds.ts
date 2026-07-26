/*
  sounds.ts — the scene's audio manifest.

  Mirrors slots.ts in spirit: one place to name every sound, its file, the slice
  of that file it plays and its resting level, so mixing the scene never means
  hunting through component code. Levels are linear gain, tuned against each
  other rather than against the system volume — rain sits low enough to read as
  weather outside a window, the clunk is the loudest thing on the site because
  it is the payoff.

  One-shots play REGIONS of a buffer rather than separate files. The vend
  recording is a single continuous take of a machine being used, so the button
  and the drop are cut from it by timestamp instead of by an audio editor: one
  request, one decode, and re-timing a hit is a number change here rather than
  a re-export. Regions were placed off the file's RMS envelope, so they can be
  nudged by ear without touching any component.

  Files are fetched only once the visitor turns sound on, so a silent visit
  costs zero bytes. Any file that 404s is skipped without breaking the rest.

  Both recordings are Creative Commons 0 (public domain) — see
  public/audio/README.md for provenance. No attribution is owed, though the
  sources are recorded there anyway.
*/

export const RAIN = {
  src: "/audio/rain-loop.mp3",
  /* The recording is quiet — peak 0.038, RMS 0.0073 — so this is a boost, not
     an attenuation. Lands the loop around -32dBFS: present, never foreground. */
  gain: 3.4,
  /* MP3/AAC encoders pad the head and tail of a file with a few ms of silence,
     which a naive loop turns into an audible tick once per lap. Looping just
     inside the padding removes it. Rain is noise-like and this take holds a
     near-constant level (1.26x variation end to end), so the seam is inaudible. */
  trim: 0.06,
} as const;

const VEND_SRC = "/audio/vend.mp3";

export interface OneShot {
  src: string;
  gain: number;
  /** seconds into the file where this sound starts */
  offset: number;
  /** seconds of it to play */
  duration: number;
}

/** Sounds fired at a moment rather than held. */
export const ONE_SHOTS = {
  /** the selection button going down, and the machine waking up behind it */
  press: { src: VEND_SRC, gain: 2.2, offset: 3.74, duration: 0.38 },
  /* the can hitting the tray and settling — the payoff. Not one clean thump:
     the take is a clatter of hits at 4.175 / 4.255 / 4.32 / 4.42 / 4.56 as the
     can tumbles and rocks to a stop. Lined up so the FIRST hit is the can's
     touchdown, which puts the loudest one (4.255) on the bounce keyframe and
     lets the rest ring out under the route change. */
  clunk: { src: VEND_SRC, gain: 1, offset: 4.16, duration: 0.6 },
} satisfies Record<string, OneShot>;

export type OneShotName = keyof typeof ONE_SHOTS;

/* vm-drop reaches the floor of its travel at the 70% keyframe and only bounces
   after that, so the can is SEEN to hit at 0.7 x DROP_MS — not at the end of
   the animation, which is where an earlier version put the sound, 210ms late.
   The clunk region also opens 15ms before its own first transient, to keep that
   attack's leading edge, so it is scheduled that much earlier again. Both are
   expressed against DROP_MS, so re-timing the drop re-times the sound with it. */
export const IMPACT_FRACTION = 0.7;
export const CLUNK_LEAD_S = 0.015;

// ---- the door between outside and inside ----

/** Lowpass cutoff (Hz) with the visitor out in the alley: effectively open. */
export const OUTSIDE_HZ = 18000;
/** Cutoff once they've stepped into a room — rain heard through a shut door. */
export const INSIDE_HZ = 420;
/** How much the rain also drops in level indoors. */
export const INSIDE_LEVEL = 0.55;
/** Seconds the door takes to swing. Slightly slower than the route crossfade,
    so the sound settles just after the picture does. */
export const DOOR_S = 0.7;

/** Seconds the rain takes to come up when sound is switched on / off. */
export const FADE_IN_S = 1.6;
export const FADE_OUT_S = 0.5;
