import { Fatsia } from "./Fatsia";

function Shutter({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="#1a2022" />
      {Array.from({ length: Math.floor(height / 8) }).map((_, index) => (
        <g key={index}>
          <rect x={x} y={y + index * 8} width={width} height="3.6" fill="#2e3536" opacity="0.76" />
          <line x1={x} y1={y + index * 8 + 5} x2={x + width} y2={y + index * 8 + 5} stroke="#0d1214" strokeWidth="1" />
        </g>
      ))}
      <rect x={x} y={y + height - 8} width={width} height="8" fill="#0e1315" />
    </g>
  );
}

function Window({ x, y, width, height, warm = false }: { x: number; y: number; width: number; height: number; warm?: boolean }) {
  const pane = warm ? "#9b7749" : "#37515a";
  return (
    <g>
      <rect x={x - 5} y={y - 5} width={width + 10} height={height + 10} fill="#1a1f20" />
      <rect x={x - 2} y={y - 2} width={width + 4} height={height + 4} fill="#a7aaa3" opacity="0.35" />
      <rect x={x} y={y} width={width} height={height} fill={pane} opacity={warm ? 0.62 : 0.5} />
      <line x1={x + width / 2} y1={y} x2={x + width / 2} y2={y + height} stroke="#172023" strokeWidth="2" />
      <line x1={x} y1={y + height / 2} x2={x + width} y2={y + height / 2} stroke="#172023" strokeWidth="2" />
      <rect x={x - 7} y={y + height + 4} width={width + 14} height="5" rx="1" fill="#5b615c" opacity="0.7" />
    </g>
  );
}

function Door({ x, y, width = 64, height = 184, warm = false }: { x: number; y: number; width?: number; height?: number; warm?: boolean }) {
  return (
    <g>
      <rect x={x - 8} y={y - 8} width={width + 16} height={height + 8} fill="#1a2020" />
      <rect x={x - 4} y={y - 4} width={width + 8} height={height + 4} fill="#4d554f" opacity="0.5" />
      <rect x={x} y={y} width={width} height={height} fill={warm ? "#4d3c2d" : "#263033"} />
      <rect x={x + 7} y={y + 12} width={width - 14} height={height * 0.42} fill={warm ? "#9f7948" : "#30454b"} opacity={warm ? 0.48 : 0.42} />
      <rect x={x + 7} y={y + height * 0.55} width={width - 14} height={height * 0.26} fill="#161b1b" opacity="0.68" />
      <line x1={x + width / 2} y1={y + 8} x2={x + width / 2} y2={y + height - 10} stroke="#1a1e1d" strokeWidth="1.4" />
      <circle cx={x + width - 11} cy={y + height * 0.56} r="2.5" fill="#c29d61" opacity="0.78" />
      <rect x={x - 12} y={y - 15} width={width + 24} height="5" rx="1" fill="#252d2c" />
    </g>
  );
}

function AirUnit({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const fanLines = Array.from({ length: 12 });
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M7,39 L10,46 L44,46 L48,39" fill="none" stroke="#6a706b" strokeWidth="2.5" opacity="0.76" />
      <rect width="62" height="40" rx="2" fill="#b8b9b1" opacity="0.82" />
      <rect x="3" y="3" width="56" height="34" fill="#d0d0c7" opacity="0.3" />
      <circle cx="19" cy="20" r="12" fill="#68706d" stroke="#4a514e" strokeWidth="1.5" />
      <circle cx="19" cy="20" r="8" fill="none" stroke="#bac0b8" strokeWidth="0.8" opacity="0.78" />
      {fanLines.map((_, index) => {
        const angle = index * 30;
        return <line key={angle} x1="19" y1="8" x2="19" y2="32" transform={`rotate(${angle} 19 20)`} stroke="#bac0b8" strokeWidth="0.75" opacity="0.7" />;
      })}
      <circle cx="19" cy="20" r="2.8" fill="#454b48" />
      {[10, 16, 22, 28].map((offset) => <line key={offset} x1="40" y1={offset} x2="54" y2={offset} stroke="#69706b" strokeWidth="1.25" />)}
      <rect x="56" y="9" width="2" height="22" fill="#8d928b" opacity="0.68" />
      <path d="M52,40 C57,58 48,70 54,88" fill="none" stroke="#444c49" strokeWidth="2" />
    </g>
  );
}

function Lantern({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Wall-mounted cage lamp: backplate, gooseneck arm, metal cap, and a
          warm glass body. The silhouette stays legible at small sizes. */}
      <rect x="-27" y="-10" width="8" height="24" rx="1.5" fill="#252d2c" />
      <circle cx="-23" cy="-4" r="1.1" fill="#758078" opacity="0.7" />
      <circle cx="-23" cy="8" r="1.1" fill="#758078" opacity="0.7" />
      <path d="M-19,0 H-4 C3,0 6,5 6,11 V15" fill="none" stroke="#252d2c" strokeWidth="3" strokeLinecap="round" />
      <path d="M-1,13 H15 L12,19 H2 Z" fill="#292a24" />
      <rect x="2" y="19" width="10" height="20" rx="3" fill="#d6a55e" opacity="0.78" />
      <rect x="0" y="17" width="14" height="24" rx="4" fill="none" stroke="#242925" strokeWidth="2" />
      <line x1="0" y1="25" x2="14" y2="25" stroke="#725630" strokeWidth="1" />
      <line x1="0" y1="33" x2="14" y2="33" stroke="#725630" strokeWidth="1" />
      <path d="M2,42 H12" stroke="#282a24" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="7" cy="29" rx="20" ry="27" fill="#d6a55e" opacity="0.1" />
    </g>
  );
}

function Balcony({ x, y, width }: { x: number; y: number; width: number }) {
  return (
    <g>
      <rect x={x - 7} y={y - 6} width={width + 14} height="7" fill="#454a46" />
      <line x1={x} y1={y} x2={x + width} y2={y} stroke="#252c2a" strokeWidth="3" />
      <line x1={x + 2} y1={y} x2={x + 2} y2={y + 35} stroke="#252c2a" strokeWidth="2.5" />
      <line x1={x + width - 2} y1={y} x2={x + width - 2} y2={y + 35} stroke="#252c2a" strokeWidth="2.5" />
      {Array.from({ length: Math.floor(width / 16) - 1 }).map((_, index) => <line key={index} x1={x + 16 + index * 16} y1={y} x2={x + 16 + index * 16} y2={y + 34} stroke="#2b312f" strokeWidth="1.3" />)}
      <line x1={x} y1={y + 33} x2={x + width} y2={y + 33} stroke="#252c2a" strokeWidth="2" />
    </g>
  );
}

function Planter({ x, y, body, leaf }: { x: number; y: number; body: string; leaf: string }) {
  return (
    <g>
      <path d={`M${x},${y} L${x + 34},${y} L${x + 29},${y + 42} L${x + 5},${y + 42} Z`} fill={body} stroke="#191d1b" strokeWidth="1.2" />
      <rect x={x - 2} y={y - 3} width="38" height="6" rx="2" fill="#514639" />
      <Fatsia x={x + 10} y={y + 3} size={30} rotate={205} fill={leaf} />
      <Fatsia x={x + 25} y={y + 5} size={25} rotate={155} fill={leaf} />
    </g>
  );
}

/* A compact, lived-in Japanese side street at blue hour. The environment
   frames the machine but never competes with it: ordinary infrastructure,
   low-rise facades, small light sources, and rain-darkened surfaces do the
   storytelling rather than novelty props. */
export function EnvironmentBack() {
  return (
    <g>
      <defs>
        <linearGradient id="vm-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#091119" />
          <stop offset="0.56" stopColor="#172329" />
          <stop offset="1" stopColor="#252422" />
        </linearGradient>
        <linearGradient id="vm-plaster" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4b4c44" />
          <stop offset="0.52" stopColor="#333834" />
          <stop offset="1" stopColor="#282e2c" />
        </linearGradient>
        <linearGradient id="vm-rightFacade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3c4744" />
          <stop offset="1" stopColor="#252f31" />
        </linearGradient>
        <linearGradient id="vm-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#333735" />
          <stop offset="1" stopColor="#0b1115" />
        </linearGradient>
        <linearGradient id="vm-awning" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#65543d" />
          <stop offset="1" stopColor="#302a23" />
        </linearGradient>
        <radialGradient id="vm-machineHalo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff0d0" stopOpacity="0.2" />
          <stop offset="0.58" stopColor="#dfc38e" stopOpacity="0.06" />
          <stop offset="1" stopColor="#dfc38e" stopOpacity="0" />
        </radialGradient>
        <pattern id="vm-wallTexture" width="52" height="46" patternUnits="userSpaceOnUse">
          <path d="M4,10 l11,-2 M30,14 l7,1 M10,34 l5,-1 M38,38 l9,-1" stroke="#d0c9b2" strokeWidth="0.75" opacity="0.16" />
          <circle cx="23" cy="31" r="1.2" fill="#eee5ce" opacity="0.11" />
        </pattern>
      </defs>

      <rect x="-480" y="0" width="1440" height="680" fill="url(#vm-night)" />

      {/* Utility wires cross the small street, as they do in the references. */}
      <path d="M-480,0 H960 V132 C770,108 642,119 506,139 C178,187 -154,166 -480,191 Z" fill="#101a20" opacity="0.66" />
      <g fill="none" stroke="#090e12" strokeLinecap="round">
        <path d="M-480,64 C-190,98 125,120 448,91 C654,72 811,91 960,124" strokeWidth="3" />
        <path d="M-480,95 C-156,122 140,139 487,110 C683,93 816,112 960,149" strokeWidth="2.2" />
        <path d="M-322,27 C-92,70 176,76 410,56 C640,38 792,61 960,88" strokeWidth="1.5" opacity="0.84" />
      </g>
      {[-284, 502, 738].map((x) => <circle key={x} cx={x} cy={x === 502 ? 110 : 89} r="3" fill="#171e20" />)}

      {/* Closed neighboring shop. It remains quiet so the machine remains the beacon. */}
      <rect x="-480" y="150" width="530" height="454" fill="#222728" />
      <Shutter x={-452} y={174} width={454} height={430} />
      <rect x="-480" y="145" width="530" height="11" fill="#111618" />
      <rect x="28" y="150" width="18" height="454" fill="#151a1a" />
      <rect x="38" y="155" width="3" height="449" fill="#67533a" opacity="0.42" />
      <rect x="-416" y="534" width="126" height="5" fill="#2e3935" opacity="0.54" />

      {/* Building behind the machine: plaster wall, fascia, awning, pipes, and
          one real condenser mounted to the adjacent service wall. */}
      <rect x="46" y="92" width="436" height="512" fill="url(#vm-plaster)" />
      <rect x="46" y="92" width="436" height="512" fill="url(#vm-wallTexture)" opacity="0.62" />
      <rect x="46" y="82" width="436" height="13" fill="#191d1c" />
      <path d="M56,101 H471 L452,136 H75 Z" fill="url(#vm-awning)" />
      <path d="M74,136 H452" stroke="#171918" strokeWidth="4" />
      {[92, 152, 212, 272, 332, 392].map((x) => <line key={x} x1={x} y1="101" x2={x - 10} y2="136" stroke="#8d7656" strokeWidth="1" opacity="0.4" />)}
      <rect x="62" y="146" width="9" height="458" fill="#1f2723" />
      {[218, 376, 520].map((y) => <rect key={y} x="58" y={y} width="17" height="5" rx="2" fill="#4a5048" />)}
      <path d="M76,174 C99,188 92,208 87,226 C81,249 89,267 82,292" fill="none" stroke="#5a6259" strokeWidth="2" opacity="0.55" />
      <AirUnit x={402} y={160} scale={0.82} />
      <path d="M450,207 C466,234 456,271 462,301 C469,337 457,383 464,414" fill="none" stroke="#3c4a45" strokeWidth="2.2" />
      <Window x={413} y={290} width={35} height={62} warm />
      <ellipse cx="240" cy="340" rx="315" ry="300" fill="url(#vm-machineHalo)" />

      {/* Right: a recognisable low-rise apartment / shop facade. Windows have
          sills, doors meet the pavement, and the balcony and stair structure
          give it enough construction logic to read as a building. */}
      <rect x="492" y="128" width="468" height="476" fill="url(#vm-rightFacade)" />
      <rect x="492" y="128" width="468" height="476" fill="url(#vm-wallTexture)" opacity="0.32" />
      <rect x="492" y="118" width="468" height="11" fill="#1a2222" />
      {[171, 214, 257, 300, 343, 386].map((y) => <line key={y} x1="500" y1={y} x2="951" y2={y} stroke="#63706a" strokeWidth="1" opacity="0.22" />)}
      <rect x="502" y="137" width="158" height="467" fill="#48534c" opacity="0.34" />
      <rect x="664" y="137" width="287" height="467" fill="#1e282a" opacity="0.54" />
      <Window x={529} y={183} width={68} height={54} />
      <Balcony x={517} y={246} width={92} />
      <Door x={529} y={420} width={66} height={184} />
      <AirUnit x={610} y={308} scale={0.78} />
      <Lantern x={650} y={190} />
      <Window x={696} y={184} width={76} height={56} warm />
      <Balcony x={684} y={250} width={102} />
      <Door x={698} y={412} width={68} height={192} warm />
      <Window x={810} y={260} width={55} height={48} />
      <Door x={816} y={432} width={58} height={172} />

      {/* External escape stair at the far edge: a familiar low-rise alley
          detail, kept dark so it frames rather than competes. */}
      <g fill="none" stroke="#202827" strokeLinecap="round">
        <path d="M892,164 L944,222 L892,280 L944,338 L892,396 L944,454 L892,512 L944,570" strokeWidth="7" />
        <path d="M903,164 L955,222 L903,280 L955,338 L903,396 L955,454 L903,512 L955,570" strokeWidth="2" />
        {[204, 262, 320, 378, 436, 494, 552].map((y) => <line key={y} x1="894" y1={y} x2="951" y2={y + 18} strokeWidth="2" />)}
      </g>
      <rect x="879" y="132" width="10" height="472" fill="#151d1d" />
      <path d="M886,166 C872,221 891,288 881,344 C873,390 889,437 882,485" fill="none" stroke="#53635c" strokeWidth="2" opacity="0.54" />

      {/* Pavement and small planted edges. */}
      <rect x="-480" y="604" width="1440" height="76" fill="url(#vm-road)" />
      <rect x="40" y="604" width="454" height="18" fill="#2c2c29" />
      <line x1="-480" y1="623" x2="960" y2="623" stroke="#111719" strokeWidth="3" />
      <line x1="-480" y1="629" x2="960" y2="629" stroke="#52615b" strokeWidth="1" opacity="0.34" />
      {[-372, -226, -78, 476, 624, 812].map((x) => <rect key={x} x={x} y="636" width="64" height="2" rx="1" fill="#8ca19a" opacity="0.14" />)}
      <ellipse cx="240" cy="621" rx="188" ry="13" fill="#000" opacity="0.36" />
      <Planter x={-6} y={558} body="#6f4e39" leaf="#31593b" />
      <Planter x={36} y={567} body="#5b6564" leaf="#2c4d34" />
      <Planter x={472} y={569} body="#72503b" leaf="#2c5235" />
      <Planter x={780} y={568} body="#63665b" leaf="#31573a" />
      <Fatsia x={8} y={563} size={38} rotate={210} fill="#315d3b" />
      <Fatsia x={905} y={602} size={32} rotate={350} fill="#294a30" />
    </g>
  );
}

export function WetGround() {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <linearGradient id="vm-reflectionFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.44" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="vm-reflectionMask">
          <rect x="-480" y="622" width="1440" height="58" fill="url(#vm-reflectionFade)" />
        </mask>
      </defs>
      <rect x="-480" y="622" width="1440" height="58" fill="#0b1720" opacity="0.2" />
      <g mask="url(#vm-reflectionMask)">
        <rect x="94" y="628" width="292" height="13" fill="#d0cfbf" opacity="0.3" />
        <rect x="102" y="642" width="278" height="16" fill="#2b6fae" opacity="0.23" />
        <path d="M108,657 C168,651 252,665 306,657 C338,652 368,658 382,655 L382,666 L108,666 Z" fill="#e6e8e4" opacity="0.16" />
      </g>
      {[
        { cx: -188, cy: 657, rx: 72, ry: 7, rim: "#5f7681" },
        { cx: 42, cy: 666, rx: 48, ry: 5, rim: "#a48154" },
        { cx: 524, cy: 654, rx: 58, ry: 6, rim: "#5f7681" },
        { cx: 790, cy: 666, rx: 70, ry: 6, rim: "#9a7747" },
      ].map(({ cx, cy, rx, ry, rim }) => (
        <g key={cx}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#0a1015" opacity="0.72" />
          <path d={`M${cx - rx},${cy - 1} C${cx - rx * 0.4},${cy - ry} ${cx + rx * 0.4},${cy - ry} ${cx + rx},${cy - 1}`}
            fill="none" stroke={rim} strokeWidth="1.2" opacity="0.28" />
        </g>
      ))}
      {[-420, -250, -70, 460, 620, 810].map((x) => <rect key={x} x={x} y="642" width="118" height="1.5" rx="0.75" fill="#d9e9e8" opacity="0.08" />)}
    </g>
  );
}

export function Atmosphere({ arriving = false }: { arriving?: boolean }) {
  return (
    <g style={{ pointerEvents: "none" }}>
      <defs>
        <filter id="vm-softLight" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <radialGradient id="vm-vignette" cx="0.5" cy="0.45" r="0.82">
          <stop offset="0.34" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.42" />
        </radialGradient>
        <radialGradient id="vm-beacon" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe8c2" stopOpacity="0.12" />
          <stop offset="1" stopColor="#ffe8c2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className={arriving ? "vm-arrive-dapples" : undefined}>
        <ellipse cx="240" cy="342" rx="270" ry="292" fill="url(#vm-beacon)" filter="url(#vm-softLight)" />
      </g>
      <rect x="-480" width="1440" height="680" fill="url(#vm-vignette)" />
    </g>
  );
}
