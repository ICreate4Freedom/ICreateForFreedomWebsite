function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2c362f" strokeWidth="5" />
      <circle cx={cx} cy={cy} r={r - 5} fill="none" stroke="#3a463d" strokeWidth="1.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return <line key={i} x1={cx} y1={cy} x2={cx + (r - 4) * Math.cos(a)} y2={cy + (r - 4) * Math.sin(a)} stroke="#4a564d" strokeWidth="1" />;
      })}
      <circle cx={cx} cy={cy} r="4" fill="#2c362f" />
    </g>
  );
}

export function Bicycle() {
  return (
    <g strokeLinecap="round">
      <Wheel cx={140} cy={572} r={54} />
      <Wheel cx={300} cy={566} r={58} />
      <path d="M92,560 A54,54 0 0 1 140,514" fill="none" stroke="#3a463d" strokeWidth="6" />
      <path d="M248,552 A58,58 0 0 1 352,558" fill="none" stroke="#3a463d" strokeWidth="6" />
      <g stroke="#33413a" strokeWidth="7" fill="none">
        <line x1="232" y1="560" x2="155" y2="492" />
        <line x1="158" y1="488" x2="243" y2="484" />
        <line x1="232" y1="560" x2="246" y2="472" />
        <line x1="232" y1="560" x2="300" y2="566" />
        <line x1="246" y1="480" x2="300" y2="566" />
        <line x1="152" y1="485" x2="140" y2="572" />
        <line x1="152" y1="485" x2="148" y2="452" />
      </g>
      <path d="M120,448 C132,442 160,444 172,452" fill="none" stroke="#33413a" strokeWidth="6" />
      <ellipse cx="248" cy="464" rx="16" ry="6" fill="#26302a" />
      <circle cx="232" cy="560" r="9" fill="none" stroke="#33413a" strokeWidth="4" />
      <line x1="232" y1="560" x2="220" y2="578" stroke="#33413a" strokeWidth="4" />
      <rect x="212" y="574" width="16" height="5" rx="2" fill="#26302a" />
      <g>
        <rect x="94" y="440" width="58" height="40" rx="4" fill="none" stroke="#4a564d" strokeWidth="3" />
        {[452, 464].map((y) => <line key={y} x1="94" y1={y} x2="152" y2={y} stroke="#4a564d" strokeWidth="1.5" />)}
        {[108, 122, 136].map((x) => <line key={x} x1={x} y1="440" x2={x} y2="480" stroke="#4a564d" strokeWidth="1.5" />)}
      </g>
    </g>
  );
}