// 단어 카테고리별 일러스트 SVG 아트.
// 외부 이미지 없이 벡터로 그려 어떤 해상도에서도 선명하다.

type Motif = "sun" | "moon" | "cloud" | "sparkle" | "bubble" | "city" | "leaf";

interface Scene {
  sky: [string, string];
  glow: string;
  hill1: string;
  hill2: string;
  particle: string;
  motif: Motif;
}

const SCENES: Record<string, Scene> = {
  greeting: { sky: ["#fb7185", "#fdba74"], glow: "#fff1d6", hill1: "#f472b6", hill2: "#e11d48", particle: "#fff7ed", motif: "sun" },
  people: { sky: ["#a78bfa", "#c4b5fd"], glow: "#ede9fe", hill1: "#8b5cf6", hill2: "#6d28d9", particle: "#f5f3ff", motif: "cloud" },
  number: { sky: ["#38bdf8", "#7dd3fc"], glow: "#e0f2fe", hill1: "#0ea5e9", hill2: "#0369a1", particle: "#f0f9ff", motif: "bubble" },
  time: { sky: ["#1e293b", "#475569"], glow: "#fde68a", hill1: "#334155", hill2: "#0f172a", particle: "#fef9c3", motif: "moon" },
  food: { sky: ["#34d399", "#86efac"], glow: "#dcfce7", hill1: "#10b981", hill2: "#047857", particle: "#f0fdf4", motif: "leaf" },
  place: { sky: ["#2dd4bf", "#5eead4"], glow: "#ccfbf1", hill1: "#14b8a6", hill2: "#0f766e", particle: "#f0fdfa", motif: "city" },
  adjective: { sky: ["#e879f9", "#f0abfc"], glow: "#fae8ff", hill1: "#d946ef", hill2: "#a21caf", particle: "#fdf4ff", motif: "sparkle" },
  daily: { sky: ["#60a5fa", "#93c5fd"], glow: "#dbeafe", hill1: "#3b82f6", hill2: "#1d4ed8", particle: "#eff6ff", motif: "cloud" },
  adverb: { sky: ["#94a3b8", "#cbd5e1"], glow: "#f1f5f9", hill1: "#64748b", hill2: "#334155", particle: "#f8fafc", motif: "sparkle" },
};

// 결정적 파티클 위치 (랜덤 없이 일정)
const PARTICLES = [
  { x: 40, y: 36, r: 3, o: 0.9 },
  { x: 110, y: 22, r: 2, o: 0.7 },
  { x: 200, y: 30, r: 2.5, o: 0.8 },
  { x: 300, y: 20, r: 2, o: 0.6 },
  { x: 350, y: 46, r: 3, o: 0.85 },
  { x: 250, y: 54, r: 1.6, o: 0.55 },
  { x: 70, y: 60, r: 1.6, o: 0.5 },
  { x: 160, y: 64, r: 2, o: 0.6 },
];

function Motifs({ motif, color, glow }: { motif: Motif; color: string; glow: string }) {
  switch (motif) {
    case "sun":
      return <circle cx="320" cy="58" r="34" fill={glow} opacity="0.95" />;
    case "moon":
      return (
        <g>
          <circle cx="320" cy="52" r="26" fill={glow} opacity="0.95" />
          <circle cx="332" cy="46" r="24" fill="#1e293b" />
        </g>
      );
    case "cloud":
      return (
        <g fill={glow} opacity="0.9">
          <ellipse cx="300" cy="52" rx="34" ry="16" />
          <ellipse cx="330" cy="48" rx="24" ry="13" />
          <ellipse cx="276" cy="48" rx="20" ry="11" />
        </g>
      );
    case "bubble":
      return (
        <g fill={glow}>
          <circle cx="320" cy="44" r="20" opacity="0.85" />
          <circle cx="350" cy="70" r="12" opacity="0.7" />
          <circle cx="296" cy="74" r="9" opacity="0.6" />
        </g>
      );
    case "sparkle":
      return (
        <g fill={glow}>
          {[
            { x: 312, y: 40, s: 13 },
            { x: 348, y: 64, s: 8 },
            { x: 292, y: 70, s: 6 },
          ].map((p, i) => (
            <path
              key={i}
              transform={`translate(${p.x} ${p.y})`}
              d={`M0 ${-p.s} C ${p.s * 0.2} ${-p.s * 0.2} ${p.s * 0.2} ${-p.s * 0.2} ${p.s} 0 C ${p.s * 0.2} ${p.s * 0.2} ${p.s * 0.2} ${p.s * 0.2} 0 ${p.s} C ${-p.s * 0.2} ${p.s * 0.2} ${-p.s * 0.2} ${p.s * 0.2} ${-p.s} 0 C ${-p.s * 0.2} ${-p.s * 0.2} ${-p.s * 0.2} ${-p.s * 0.2} 0 ${-p.s} Z`}
            />
          ))}
        </g>
      );
    case "city":
      return (
        <g fill={color} opacity="0.55">
          <rect x="276" y="58" width="16" height="44" rx="2" />
          <rect x="296" y="44" width="18" height="58" rx="2" />
          <rect x="318" y="52" width="14" height="50" rx="2" />
          <rect x="336" y="38" width="20" height="64" rx="2" />
        </g>
      );
    case "leaf":
      return (
        <g fill={glow} opacity="0.9">
          <path d="M300 40 C330 30 350 50 344 78 C316 80 296 64 300 40 Z" />
        </g>
      );
  }
}

export default function CardArt({
  category,
  emoji,
  className = "",
}: {
  category: string;
  emoji: string;
  className?: string;
}) {
  const s = SCENES[category] ?? SCENES.adverb;
  const id = `art-${category}`;

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 180"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.sky[0]} />
            <stop offset="100%" stopColor={s.sky[1]} />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="80%" cy="30%" r="60%">
            <stop offset="0%" stopColor={s.glow} stopOpacity="0.85" />
            <stop offset="100%" stopColor={s.glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-vig`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        {/* 하늘 */}
        <rect width="400" height="180" fill={`url(#${id}-sky)`} />
        <rect width="400" height="180" fill={`url(#${id}-glow)`} />

        {/* 모티프 (해/달/구름 등) */}
        <Motifs motif={s.motif} color={s.hill1} glow={s.glow} />

        {/* 파티클 */}
        {PARTICLES.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={s.particle} opacity={p.o} />
        ))}

        {/* 언덕 레이어 */}
        <path d={`M0 132 C 90 108 150 150 240 128 C 320 110 360 138 400 122 L400 180 L0 180 Z`} fill={s.hill1} opacity="0.85" />
        <path d={`M0 152 C 80 134 170 168 260 148 C 330 134 370 156 400 146 L400 180 L0 180 Z`} fill={s.hill2} opacity="0.9" />

        {/* 비네트 */}
        <rect width="400" height="180" fill={`url(#${id}-vig)`} />
      </svg>

      {/* 이모지 메달리온 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid h-[88px] w-[88px] place-items-center rounded-3xl bg-white/25 text-5xl shadow-lg ring-1 ring-white/40 backdrop-blur-md">
          <span className="drop-shadow-sm">{emoji}</span>
        </div>
      </div>
    </div>
  );
}
