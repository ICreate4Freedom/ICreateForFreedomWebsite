/* Right column: temp sticker, big white flap, price display, coin slot,
   coin-return dial. The LED display is the machine's voice: idle price,
   hovered slot + price, an occasional marquee invitation, vend progress. */

export interface LedDisplay {
  text: string;
  marquee?: boolean; // scroll long text across the LED (idle invitation)
}

export function CoinColumn({ display, arriving = false }: { display: LedDisplay; arriving?: boolean }) {
  const long = display.text.length > 8;
  return (
    <g>
      <defs>
        <clipPath id="vm-ledClip"><rect x="318" y="270" width="54" height="16" rx="2" /></clipPath>
      </defs>
      <rect x="308" y="178" width="74" height="208" rx="5" fill="#eceae3" stroke="#b6b1a3" />
      <rect x="318" y="186" width="54" height="15" rx="2" fill="#2273c4" />
      <text x="345" y="196.5" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="#fff">冷 · RECYCLE</text>
      <rect x="316" y="208" width="58" height="52" rx="5" fill="#f7f6f2" stroke="#c9c4b7" strokeWidth="1.5" />
      <line x1="322" y1="252" x2="368" y2="252" stroke="#c9c4b7" strokeWidth="1.5" />
      <rect x="318" y="270" width="54" height="16" rx="2" fill="#181b1f" />
      <g clipPath="url(#vm-ledClip)" className={arriving ? "vm-arrive-led" : undefined}>
        {display.marquee ? (
          <text className="vm-marquee" x="318" y="281.5" fontFamily="ui-monospace, monospace" fontSize="8" fill="#7CFC00">
            {display.text}
          </text>
        ) : (
          <text x="345" y="281.5" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={long ? 6.2 : 9} fill="#7CFC00">
            {display.text}
          </text>
        )}
      </g>
      <rect x="340" y="294" width="10" height="26" rx="3" fill="#3a3d42" />
      <circle cx="345" cy="345" r="15" fill="#c2bdb1" stroke="#8f8a7e" strokeWidth="2" />
      <rect x="341.5" y="334" width="7" height="22" rx="3" fill="#8f8a7e" />
    </g>
  );
}
