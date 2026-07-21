/* Acid-graphics pass from the moodboard's ANK poster: red spec tags with
   leader lines, machine-vision bounding boxes, crosshair registration marks.
   Pure decor — the parent group disables pointer events. ".vm-annotations"
   rests the whole layer at low opacity and wakes it while the cursor is in
   the scene (vending-machine.css). ".vm-wide-only" hides the machine's own
   tag on narrow screens, where the scene is cropped to just the machine and
   the tag would dangle off-frame. */
const MONO = "ui-monospace, monospace";

export function Annotations() {
  return (
    <g fontFamily={MONO} className="vm-annotations">
      {/* crosshair registration marks */}
      {[[-380, 110], [-150, 640], [520, 80], [900, 300], [790, 640]].map(([x, y], i) => (
        <g key={i} stroke="#fff" strokeWidth="1" opacity="0.35">
          <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
          <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
        </g>
      ))}

      {/* CRT pile: red tag + leader */}
      <text x="-320" y="424" fontSize="6" fill="#cde15a" opacity="0.8">A LOT OF OBJECTS</text>
      <rect x="-320" y="430" width="96" height="13" fill="#b3231d" />
      <text x="-272" y="439.5" textAnchor="middle" fontSize="7.5" fill="#fff">OBJ: crt_stack</text>
      <path d="M-272,443 L-272,458 L-260,466" fill="none" stroke="#b3231d" strokeWidth="1" />
      <rect x="-261" y="464" width="3" height="3" fill="#b3231d" />
      {/* detection box on the stacked CRT */}
      <rect x="-300" y="460" width="90" height="76" fill="none" stroke="#cde15a" strokeWidth="1" opacity="0.85" />
      <rect x="-300" y="452" width="46" height="9" fill="#cde15a" />
      <text x="-296" y="459" fontSize="6.5" fill="#10150f">CRT 0.94</text>

      {/* side-street tag: reads the city depth right of the machine */}
      <rect x="560" y="470" width="104" height="13" fill="#b3231d" />
      <text x="612" y="479.5" textAnchor="middle" fontSize="7.5" fill="#fff">路地 · SIDE ST</text>
      <path d="M612,483 L612,506 L624,520" fill="none" stroke="#b3231d" strokeWidth="1" />
      <rect x="622" y="518" width="3" height="3" fill="#b3231d" />

      {/* the machine itself */}
      <g className="vm-wide-only">
        <rect x="446" y="132" width="86" height="13" fill="#b3231d" />
        <text x="489" y="141.5" textAnchor="middle" fontSize="7.5" fill="#fff">自販機 VND-01</text>
        <path d="M446,138 L410,152 L396,158" fill="none" stroke="#b3231d" strokeWidth="1" />
        <rect x="394" y="156" width="3" height="3" fill="#b3231d" />
      </g>
    </g>
  );
}
