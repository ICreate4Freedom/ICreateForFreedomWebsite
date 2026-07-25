/* Acid-graphics pass from the moodboard's ANK poster: red spec tags with
   leader lines, machine-vision bounding boxes, crosshair registration marks.
   Pure decor — the parent group disables pointer events. ".vm-annotations"
   rests the whole layer at low opacity and wakes it while the cursor is in
   the scene (vending-machine.css). ".vm-wide-only" hides the machine's own
   tag on narrow screens, where the scene is cropped to just the machine and
   the tag would dangle off-frame.

   Coordinates target the scene's UNSCALED space; the machine is drawn inside
   MACHINE_TRANSFORM, so tags aimed at it point at its scaled edges (x 81..399,
   y 64..620) rather than its authoring coordinates. */
const MONO = "ui-monospace, monospace";

export function Annotations() {
  return (
    <g fontFamily={MONO} className="vm-annotations">
      {/* crosshair registration marks */}
      {[[-214, 120], [-96, 648], [470, 96], [688, 336], [612, 650]].map(([x, y], i) => (
        <g key={i} stroke="#fff" strokeWidth="1" opacity="0.35">
          <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
          <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
        </g>
      ))}

      {/* shuttered shop opposite */}
      <text x="-244" y="292" fontSize="6" fill="#cde15a" opacity="0.8">CLOSED · 定休日</text>
      <rect x="-244" y="298" width="92" height="13" fill="#b3231d" />
      <text x="-198" y="307.5" textAnchor="middle" fontSize="7.5" fill="#fff">OBJ: shutter</text>
      <path d="M-198,311 L-198,330 L-186,340" fill="none" stroke="#b3231d" strokeWidth="1" />
      <rect x="-187" y="338" width="3" height="3" fill="#b3231d" />

      {/* detection box on the crates — machine vision reading the alley */}
      <rect x="-76" y="518" width="76" height="60" fill="none" stroke="#cde15a" strokeWidth="1" opacity="0.85" />
      <rect x="-76" y="510" width="56" height="9" fill="#cde15a" />
      <text x="-72" y="517" fontSize="6.5" fill="#10150f">CRATES 0.91</text>

      {/* side-street tag: reads the city depth right of the machine */}
      <rect x="524" y="470" width="104" height="13" fill="#b3231d" />
      <text x="576" y="479.5" textAnchor="middle" fontSize="7.5" fill="#fff">路地 · SIDE ST</text>
      <path d="M576,483 L576,506 L588,520" fill="none" stroke="#b3231d" strokeWidth="1" />
      <rect x="586" y="518" width="3" height="3" fill="#b3231d" />

      {/* the machine itself — leader lands on its scaled right edge (x≈399) */}
      <g className="vm-wide-only">
        <rect x="452" y="150" width="86" height="13" fill="#b3231d" />
        <text x="495" y="159.5" textAnchor="middle" fontSize="7.5" fill="#fff">自販機 VND-01</text>
        <path d="M452,156 L424,166 L404,172" fill="none" stroke="#b3231d" strokeWidth="1" />
        <rect x="402" y="170" width="3" height="3" fill="#b3231d" />
      </g>
    </g>
  );
}
