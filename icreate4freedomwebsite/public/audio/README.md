# Scene audio

Two files, both **Creative Commons 0** (public domain) — no attribution is
owed, but the provenance is recorded here anyway. Levels, and the timestamps
that carve the vend take into separate sounds, live in
[`components/audio/sounds.ts`](../../components/audio/sounds.ts) — tune them
there, not here. A missing file disables just that sound; the site keeps
working, silently, in its place.

| file | source | license | size |
|---|---|---|---|
| `rain-loop.mp3` | ["Gentle rain on metal roof" by wlabarron](https://freesound.org/people/wlabarron/sounds/509113/) — Freesound #509113 | CC0 | 225KB, 10.4s, mono |
| `vend.mp3` | ["Vending machine" by Emma7073](https://freesound.org/people/Emma7073/sounds/250194/) — Freesound #250194 | CC0 | 160KB, 6.7s |

Both are Freesound's 128kbps preview encodes, which are fine at these levels
and a fraction of the originals' size. Higher-quality originals need a
Freesound account: log in and hit Download on the pages above.

## Why only two files

`vend.mp3` is one continuous take of a machine being used — coins, button,
then the can coming down. Rather than cutting it into separate files, the
player plays **regions** of it by timestamp (`offset` / `duration` in
`sounds.ts`), so `press` and `clunk` come from the same decode. Re-timing a hit
is a number change, not a re-export — useful, since there's no `ffmpeg` on this
machine.

Region boundaries were placed off the file's RMS envelope: the button and motor
sit at 3.74–4.12s, and the can's fall and landing at 4.12–4.75s.

## Replacing them

Keep the filenames and it just works. If a replacement take has its events at
different timestamps, update `offset` / `duration` in `sounds.ts` to match, and
re-check `RAIN.gain` — the current 3.4 is a *boost*, tuned to this particular
quiet recording, and a louder one will need far less.

Good rain material is uniform: no thunder, birds, traffic or voices, and no
fade at either end. This take holds within 1.26x of its own level end to end,
which is why it loops without a seam.

```bash
# if you install ffmpeg (brew install ffmpeg), this is the encode to match
ffmpeg -i raw-rain.wav -ac 1 -b:a 112k -t 30 rain-loop.mp3
```
