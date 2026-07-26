"use client";

/*
  AudioProvider — the scene's ears.

  Lives in the root layout, not in the machine, for two reasons: the machine
  unmounts the moment a can vends, and the rain is supposed to outlast that.
  Mounted here, one AudioContext survives every client-side navigation, so
  stepping into a room muffles the weather rather than cutting it.

  Web Audio rather than <audio> elements, for three things elements can't do:
  a sample-exact loop (no encoder-padding tick every lap), a filter to shut the
  door on the rain, and one-shots scheduled on the audio clock — the can's
  landing is booked the instant the button is pressed, so the clunk cannot
  drift off the drop animation no matter what the main thread is doing.

  Nothing is fetched, decoded or created until the visitor asks for sound.

    rain ─▶ rainGain ─▶ door1 ─▶ door2 ─┐
                                        ├─▶ master ─▶ speakers
    one-shots ─▶ shotGain ──────────────┘

  The one-shots bypass the door: a vend can only happen out in the alley, so
  filtering them would only ever muffle a sound the visitor is standing next to.

  ---- on the shape of this file ----

  Everything that changes the graph goes through ONE function, `reconcile`,
  which drives the audio toward `wantOnRef` and is safe to call at any time
  from anywhere. An earlier version had a start() and a stop() mutating the
  graph independently, which broke in four ways that all came down to async
  work not knowing its intent had gone stale: unmuting never restarted the rain
  or restored the level; a stop already in flight suspended the context a beat
  after the visitor turned sound back on (and a suspended context silently
  swallows every one-shot); on a reload with sound remembered, the arming
  pointerdown and the toggle's own click raced, so muting started the audio;
  and returning to the tab restored the level even when sound was off.

  So: `wantOnRef` is the single source of truth, every await re-checks it
  before touching anything, and a pending fade-out is cancellable.
*/

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  RAIN,
  ONE_SHOTS,
  OUTSIDE_HZ,
  INSIDE_HZ,
  INSIDE_LEVEL,
  DOOR_S,
  FADE_IN_S,
  FADE_OUT_S,
  type OneShotName,
} from "./sounds";

const STORAGE_KEY = "i4f-sound";

interface AudioApi {
  /** whether the visitor has asked for sound (may be pending a gesture) */
  enabled: boolean;
  toggle: () => void;
  /** fire a one-shot, optionally `delay` seconds from now on the audio clock */
  play: (name: OneShotName, delay?: number) => void;
}

const AudioCtx = createContext<AudioApi>({
  enabled: false,
  toggle: () => {},
  play: () => {},
});

/** Safe everywhere, including outside the provider (play() is then a no-op). */
export const useSound = () => useContext(AudioCtx);

/* The visitor's answer to "do you want sound?" is browser state, not React
   state, so it's read as an external store — the same shape VendingMachine
   uses for prefers-reduced-motion. Rendering the server snapshot (off) during
   hydration and the real one immediately after is exactly what this hook is
   for, so a remembered preference never risks a mismatch. */
let prefCache: boolean | null = null;
const prefListeners = new Set<() => void>();

const subscribePref = (onChange: () => void) => {
  prefListeners.add(onChange);
  return () => prefListeners.delete(onChange);
};

const prefSnapshot = () => {
  if (prefCache === null) {
    try {
      prefCache = localStorage.getItem(STORAGE_KEY) === "on";
    } catch {
      prefCache = false; // private mode / storage disabled
    }
  }
  return prefCache;
};

const setPref = (on: boolean) => {
  prefCache = on;
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // the session still works, it just won't be remembered
  }
  prefListeners.forEach((notify) => notify());
};

interface Graph {
  ctx: AudioContext;
  master: GainNode;
  rainGain: GainNode;
  door: BiquadFilterNode[];
}

/** Ramp a param from wherever it actually is now, cancelling any ramp in flight. */
const ramp = (param: AudioParam, ctx: AudioContext, to: number, seconds: number) => {
  const t = ctx.currentTime;
  param.cancelScheduledValues(t);
  param.setValueAtTime(param.value, t);
  param.linearRampToValueAtTime(to, t + Math.max(seconds, 0.001));
};

export function AudioProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const enabled = useSyncExternalStore(subscribePref, prefSnapshot, () => false);

  /** The single source of truth for what the audio should be doing. */
  const wantOnRef = useRef(false);
  const graphRef = useRef<Graph | null>(null);
  const graphPromiseRef = useRef<Promise<Graph> | null>(null);
  const buffersPromiseRef = useRef<Promise<void> | null>(null);
  const buffersRef = useRef<Record<string, AudioBuffer>>({});
  const rainSrcRef = useRef<AudioBufferSourceNode | null>(null);
  const fadeOutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* Kept in a ref as well as in `pathname` so the graph can be built already
     muffled, without every navigation rebuilding the callbacks. */
  const insideRef = useRef(false);

  /* ---- the door ---------------------------------------------------------- */

  const applyDoor = useCallback((inside: boolean, immediate = false) => {
    const graph = graphRef.current;
    if (!graph) return;
    const seconds = immediate ? 0 : DOOR_S;

    for (const filter of graph.door) {
      // frequency is perceived logarithmically, so sweep it exponentially —
      // a linear sweep spends most of its time already sounding shut
      const t = graph.ctx.currentTime;
      filter.frequency.cancelScheduledValues(t);
      filter.frequency.setValueAtTime(filter.frequency.value, t);
      filter.frequency.exponentialRampToValueAtTime(
        inside ? INSIDE_HZ : OUTSIDE_HZ,
        t + Math.max(seconds, 0.001),
      );
    }
    ramp(graph.rainGain.gain, graph.ctx, RAIN.gain * (inside ? INSIDE_LEVEL : 1), seconds);
  }, []);

  useEffect(() => {
    const inside = pathname !== "/";
    insideRef.current = inside;
    applyDoor(inside);
  }, [pathname, applyDoor]);

  /* ---- the graph --------------------------------------------------------- */

  /** Builds the node graph. Synchronous on purpose: the AudioContext has to be
      constructed while the page still has user activation, so no await may come
      before it. Deduped, so concurrent callers share one graph. */
  const ensureGraph = useCallback(() => {
    if (graphPromiseRef.current) return graphPromiseRef.current;

    const ctx = new AudioContext();

    const master = ctx.createGain();
    master.gain.value = 0; // faded up only once the rain is actually running
    master.connect(ctx.destination);

    /* Two cascaded lowpasses, not one. A single biquad rolls off at 12dB/oct,
       which still leaves the rain bright enough to sound like an open window;
       24dB/oct is what a shut door sounds like. */
    const door = [ctx.createBiquadFilter(), ctx.createBiquadFilter()];
    for (const filter of door) {
      filter.type = "lowpass";
      filter.frequency.value = OUTSIDE_HZ;
      filter.Q.value = 0.6;
    }
    door[0].connect(door[1]).connect(master);

    const rainGain = ctx.createGain();
    rainGain.gain.value = RAIN.gain;
    rainGain.connect(door[0]);

    const graph: Graph = { ctx, master, rainGain, door };
    graphRef.current = graph;
    // if they switched sound on from inside a room, start already muffled
    applyDoor(insideRef.current, true);

    graphPromiseRef.current = Promise.resolve(graph);
    return graphPromiseRef.current;
  }, [applyDoor]);

  /** Fetch + decode every file, once. A file that 404s disables its own sound
      and nothing else. */
  const ensureBuffers = useCallback((ctx: AudioContext) => {
    if (buffersPromiseRef.current) return buffersPromiseRef.current;
    // de-duplicated: the one-shots share a file, so it's fetched once
    const paths = [...new Set([RAIN.src, ...Object.values(ONE_SHOTS).map((s) => s.src)])];
    buffersPromiseRef.current = Promise.all(
      paths.map(async (path) => {
        try {
          const res = await fetch(path);
          if (!res.ok) return;
          buffersRef.current[path] = await ctx.decodeAudioData(await res.arrayBuffer());
        } catch {
          // leave it absent; play()/startRain() skip what isn't there
        }
      }),
    ).then(() => undefined);
    return buffersPromiseRef.current;
  }, []);

  const startRain = useCallback((graph: Graph) => {
    const buffer = buffersRef.current[RAIN.src];
    if (!buffer || rainSrcRef.current) return; // already running, or no file
    const src = graph.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    if (buffer.duration > RAIN.trim * 2 + 0.5) {
      src.loopStart = RAIN.trim;
      src.loopEnd = buffer.duration - RAIN.trim;
    }
    src.connect(graph.rainGain);
    src.start(0, src.loopStart || 0);
    rainSrcRef.current = src;
  }, []);

  const stopRain = useCallback(() => {
    rainSrcRef.current?.stop();
    rainSrcRef.current = null;
  }, []);

  /* ---- the one reconciler ------------------------------------------------- */

  /** Drives the audio toward `wantOnRef`. Idempotent and interruption-safe:
      every await re-checks intent, so a visitor who mutes while the files are
      still downloading gets silence, and one who unmutes during the fade-out
      keeps their rain. */
  const reconcile = useCallback(async () => {
    // a fade-out that hasn't landed yet is stale the moment intent changes
    if (fadeOutTimer.current) {
      clearTimeout(fadeOutTimer.current);
      fadeOutTimer.current = null;
    }

    if (!wantOnRef.current) {
      const graph = graphRef.current;
      if (!graph) return;
      ramp(graph.master.gain, graph.ctx, 0, FADE_OUT_S);
      fadeOutTimer.current = setTimeout(() => {
        fadeOutTimer.current = null;
        if (wantOnRef.current) return; // turned back on during the fade
        stopRain();
        void graph.ctx.suspend();
      }, FADE_OUT_S * 1000 + 60);
      return;
    }

    /* Building a context before the visitor has ever interacted just gets one
       that browsers refuse to start. Bail; the arming listener calls back on
       the first gesture. `userActivation` is unsupported in some browsers, in
       which case we go ahead — a suspended context is recoverable, and the
       gesture path resumes it. */
    if (!graphRef.current && navigator.userActivation?.hasBeenActive === false) return;

    const graph = await ensureGraph();
    if (!wantOnRef.current) return;

    await ensureBuffers(graph.ctx);
    if (!wantOnRef.current) return;

    await graph.ctx.resume();
    if (!wantOnRef.current) {
      // muted while the context was waking up — put it straight back to sleep
      void graph.ctx.suspend();
      return;
    }

    startRain(graph);
    ramp(graph.master.gain, graph.ctx, document.hidden ? 0 : 1, FADE_IN_S);
  }, [ensureGraph, ensureBuffers, startRain, stopRain]);

  /* Intent changes in exactly one place, and the reconciler follows it. */
  useEffect(() => {
    wantOnRef.current = enabled;
    void reconcile();
  }, [enabled, reconcile]);

  const toggle = useCallback(() => setPref(!prefSnapshot()), []);

  /* A visitor who already opted in shouldn't have to find the toggle again.
     Autoplay policy still applies on a fresh load, so the rain waits — armed —
     for the first click or keypress, whatever it lands on. reconcile() is
     idempotent, so it doesn't matter that this may fire on the same gesture
     that toggles sound off: intent wins either way. */
  useEffect(() => {
    if (!enabled) return;
    const arm = () => void reconcile();
    window.addEventListener("pointerdown", arm);
    window.addEventListener("keydown", arm);
    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, [enabled, reconcile]);

  /* Rain in a tab nobody is looking at is just noise from a stranger's browser.
     Ducking the master (rather than suspending the context) keeps any scheduled
     one-shot on its timeline, so nothing is left half-played. Returning to the
     tab restores the level only if sound is actually meant to be on. */
  useEffect(() => {
    const onVisibility = () => {
      const graph = graphRef.current;
      if (!graph) return;
      const audible = !document.hidden && wantOnRef.current;
      ramp(graph.master.gain, graph.ctx, audible ? 1 : 0, 0.4);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* The provider only unmounts on a full teardown (and on React's dev-mode
     double-invoke). Drop every handle with the context so a later reconcile
     builds a fresh graph instead of reviving a closed one. */
  useEffect(
    () => () => {
      if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
      const graph = graphRef.current;
      graphRef.current = null;
      graphPromiseRef.current = null;
      buffersPromiseRef.current = null;
      buffersRef.current = {};
      rainSrcRef.current = null;
      void graph?.ctx.close();
    },
    [],
  );

  /* ---- one-shots --------------------------------------------------------- */

  const play = useCallback((name: OneShotName, delay = 0) => {
    const graph = graphRef.current;
    const shot = ONE_SHOTS[name];
    const buffer = buffersRef.current[shot.src];
    if (!graph || !buffer || graph.ctx.state !== "running") return;

    const src = graph.ctx.createBufferSource();
    src.buffer = buffer;
    // a few cents either way so repeat vends never sound like a copy-paste
    src.detune.value = (Math.random() - 0.5) * 70;
    const gain = graph.ctx.createGain();
    gain.gain.value = shot.gain;
    src.connect(gain).connect(graph.master);
    /* Plays one slice of the take. A region that would run past the end of the
       buffer is clamped, so a shorter replacement recording truncates rather
       than throwing. */
    const duration = Math.min(shot.duration, Math.max(0, buffer.duration - shot.offset));
    if (duration <= 0) return;
    src.start(graph.ctx.currentTime + delay, shot.offset, duration);
  }, []);

  return (
    <AudioCtx.Provider value={{ enabled, toggle, play }}>
      {children}
    </AudioCtx.Provider>
  );
}
