// 단어 카테고리별 애니풍 일러스트. 외부 이미지 없이 SVG 로 그린 마스코트
// 캐릭터(치비)와 테마 배경으로 구성해 어떤 해상도에서도 선명하다.

type Motif = "sun" | "moon" | "cloud" | "sparkle" | "bubble" | "city" | "lantern";

interface Scene {
  sky: [string, string, string];
  glow: string;
  hill: string;
  particle: string;
  motif: Motif;
  /** 기모노(의상) 색 */
  outfit: [string, string];
}

const SCENES: Record<string, Scene> = {
  greeting: { sky: ["#fda4af", "#fdba74", "#fde68a"], glow: "#fff7ed", hill: "#e11d48", particle: "#fff7ed", motif: "sun", outfit: ["#f43f5e", "#fb7185"] },
  people: { sky: ["#a78bfa", "#c4b5fd", "#ddd6fe"], glow: "#f5f3ff", hill: "#6d28d9", particle: "#f5f3ff", motif: "cloud", outfit: ["#7c3aed", "#a78bfa"] },
  number: { sky: ["#38bdf8", "#7dd3fc", "#bae6fd"], glow: "#f0f9ff", hill: "#0369a1", particle: "#f0f9ff", motif: "bubble", outfit: ["#0284c7", "#38bdf8"] },
  time: { sky: ["#1e293b", "#334155", "#64748b"], glow: "#fde68a", hill: "#0f172a", particle: "#fef9c3", motif: "moon", outfit: ["#1d4ed8", "#3b82f6"] },
  food: { sky: ["#34d399", "#6ee7b7", "#bbf7d0"], glow: "#f0fdf4", hill: "#047857", particle: "#f0fdf4", motif: "cloud", outfit: ["#059669", "#34d399"] },
  place: { sky: ["#2dd4bf", "#5eead4", "#99f6e4"], glow: "#f0fdfa", hill: "#0f766e", particle: "#f0fdfa", motif: "city", outfit: ["#0d9488", "#2dd4bf"] },
  adjective: { sky: ["#e879f9", "#f0abfc", "#f5d0fe"], glow: "#fdf4ff", hill: "#a21caf", particle: "#fdf4ff", motif: "sparkle", outfit: ["#c026d3", "#e879f9"] },
  daily: { sky: ["#60a5fa", "#93c5fd", "#bfdbfe"], glow: "#eff6ff", hill: "#1d4ed8", particle: "#eff6ff", motif: "lantern", outfit: ["#2563eb", "#60a5fa"] },
  adverb: { sky: ["#fb7185", "#c4b5fd", "#a5b4fc"], glow: "#fef2f2", hill: "#4338ca", particle: "#fff", motif: "lantern", outfit: ["#e11d48", "#fb7185"] },
};

const PARTICLES = [
  { x: 36, y: 30, r: 2.5, o: 0.9 }, { x: 96, y: 20, r: 1.8, o: 0.7 },
  { x: 318, y: 26, r: 2.2, o: 0.8 }, { x: 366, y: 44, r: 2.6, o: 0.85 },
  { x: 60, y: 64, r: 1.6, o: 0.5 }, { x: 350, y: 80, r: 1.8, o: 0.6 },
];

function Background({ s, id }: { s: Scene; id: string }) {
  return (
    <>
      <rect width="400" height="200" fill={`url(#${id}-sky)`} />
      <rect width="400" height="200" fill={`url(#${id}-glow)`} />

      {/* 모티프 */}
      {s.motif === "sun" && <circle cx="60" cy="50" r="30" fill={s.glow} opacity="0.95" />}
      {s.motif === "moon" && (
        <g><circle cx="64" cy="46" r="22" fill={s.glow} opacity="0.95" /><circle cx="74" cy="40" r="20" fill={s.sky[0]} /></g>
      )}
      {s.motif === "cloud" && (
        <g fill={s.glow} opacity="0.9"><ellipse cx="70" cy="46" rx="30" ry="14" /><ellipse cx="96" cy="42" rx="20" ry="11" /></g>
      )}
      {s.motif === "bubble" && (
        <g fill={s.glow}><circle cx="60" cy="44" r="16" opacity="0.8" /><circle cx="40" cy="70" r="9" opacity="0.6" /></g>
      )}
      {s.motif === "city" && (
        <g fill={s.hill} opacity="0.45"><rect x="22" y="58" width="16" height="48" rx="2" /><rect x="42" y="46" width="18" height="60" rx="2" /><rect x="64" y="54" width="14" height="52" rx="2" /></g>
      )}
      {s.motif === "sparkle" && (
        <g fill={s.glow}>{[{ x: 56, y: 44, r: 11 }, { x: 92, y: 64, r: 6 }].map((p, i) => (
          <path key={i} transform={`translate(${p.x} ${p.y})`} d={`M0 ${-p.r}C${p.r * 0.2} ${-p.r * 0.2} ${p.r * 0.2} ${-p.r * 0.2} ${p.r} 0C${p.r * 0.2} ${p.r * 0.2} ${p.r * 0.2} ${p.r * 0.2} 0 ${p.r}C${-p.r * 0.2} ${p.r * 0.2} ${-p.r * 0.2} ${p.r * 0.2} ${-p.r} 0C${-p.r * 0.2} ${-p.r * 0.2} ${-p.r * 0.2} ${-p.r * 0.2} 0 ${-p.r}Z`} />
        ))}</g>
      )}
      {s.motif === "lantern" && (
        <g>{[{ x: 50, y: 34 }, { x: 96, y: 26 }, { x: 330, y: 30 }, { x: 364, y: 50 }].map((p, i) => (
          <g key={i}><line x1={p.x} y1={p.y - 14} x2={p.x} y2={p.y - 6} stroke={s.glow} strokeWidth="1" opacity="0.5" /><ellipse cx={p.x} cy={p.y} rx="7" ry="9" fill="#f59e0b" opacity="0.9" /><ellipse cx={p.x} cy={p.y} rx="3.5" ry="6" fill="#fff7ed" opacity="0.8" /></g>
        ))}</g>
      )}

      {PARTICLES.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={s.particle} opacity={p.o} />
      ))}

      {/* 언덕 */}
      <path d="M0 150C90 128 160 168 250 146 330 128 370 156 400 142L400 200 0 200Z" fill={s.hill} opacity="0.35" />
    </>
  );
}

// 치비 마스코트 캐릭터 (앞머리·큰 눈·홍조)
function Mascot({ s, id }: { s: Scene; id: string }) {
  return (
    <g>
      {/* 바닥 그림자 */}
      <ellipse cx="200" cy="196" rx="60" ry="8" fill="#000" opacity="0.12" />

      {/* 몸통 (기모노) */}
      <path d="M166 190C166 164 182 152 200 152C218 152 234 164 234 190L234 200 166 200Z" fill={`url(#${id}-outfit)`} />
      {/* 목 */}
      <path d="M192 146L208 146 206 160 194 160Z" fill="#ffd9c6" />
      {/* 옷깃 (기모노 V넥) */}
      <path d="M200 152L179 200 190 200 203 160Z" fill="#fff" opacity="0.95" />
      <path d="M200 152L221 200 210 200 197 160Z" fill="#fff" opacity="0.95" />
      <path d="M200 158L188 200 196 200 200 168 204 200 212 200Z" fill={s.outfit[0]} opacity="0.45" />
      {/* 오비(허리띠) */}
      <rect x="168" y="186" width="64" height="8" fill="#fff" opacity="0.5" />

      {/* 뒷머리 */}
      <path d="M150 104C150 70 172 50 200 50C228 50 250 70 250 104C250 124 244 138 244 138L156 138C156 138 150 124 150 104Z" fill="#5b4636" />
      {/* 얼굴 */}
      <ellipse cx="200" cy="104" rx="44" ry="42" fill="#ffe3d3" />
      <ellipse cx="200" cy="104" rx="44" ry="42" fill={`url(#${id}-face)`} />

      {/* 앞머리 */}
      <path d="M157 100C156 74 176 56 200 56C224 56 244 74 243 100C243 100 232 84 224 84C224 84 222 96 214 96 214 96 210 80 200 80 190 80 186 96 186 96 178 96 176 84 176 84 168 84 157 100 157 100Z" fill="#6b513c" />
      <path d="M157 100C156 74 176 56 200 56C224 56 244 74 243 100C243 100 232 84 224 84C224 84 222 96 214 96 214 96 210 80 200 80 190 80 186 96 186 96 178 96 176 84 176 84 168 84 157 100 157 100Z" fill={`url(#${id}-hair)`} opacity="0.5" />
      {/* 옆머리 */}
      <path d="M156 100C152 100 150 116 154 128 156 120 160 110 162 106Z" fill="#6b513c" />
      <path d="M244 100C248 100 250 116 246 128 244 120 240 110 238 106Z" fill="#6b513c" />

      {/* 눈썹 */}
      <path d="M172 95C177 92 185 92 189 94" stroke="#8a6a52" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M211 94C215 92 223 92 228 95" stroke="#8a6a52" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 눈 (큰 애니 눈) */}
      {[180, 220].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="106" rx="10" ry="13" fill="#fff" />
          <ellipse cx={cx} cy="107" rx="9" ry="12" fill={`url(#${id}-iris)`} />
          <ellipse cx={cx} cy="110" rx="5.5" ry="7" fill="#2a2118" />
          <circle cx={cx - 3} cy="103" r="3.4" fill="#fff" />
          <circle cx={cx + 2.5} cy="112" r="1.7" fill="#fff" opacity="0.9" />
          <path d={`M${cx - 10} 99C${cx - 5} 95 ${cx + 5} 95 ${cx + 10} 99`} stroke="#3a2c20" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      ))}

      {/* 홍조 */}
      <ellipse cx="170" cy="120" rx="7" ry="4" fill="#fda4af" opacity="0.65" />
      <ellipse cx="230" cy="120" rx="7" ry="4" fill="#fda4af" opacity="0.65" />

      {/* 코·입 */}
      <circle cx="200" cy="116" r="1" fill="#c98e74" />
      <path d="M194 124C197 128 203 128 206 124" stroke="#c0654f" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 머리 장식 (꽃) */}
      <g transform="translate(232 78)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-5" rx="3" ry="5" fill="#fb7185" transform={`rotate(${a})`} />
        ))}
        <circle r="2.5" fill="#fde68a" />
      </g>
    </g>
  );
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
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor={s.sky[0]} />
            <stop offset="55%" stopColor={s.sky[1]} />
            <stop offset="100%" stopColor={s.sky[2]} />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="20%" cy="22%" r="70%">
            <stop offset="0%" stopColor={s.glow} stopOpacity="0.8" />
            <stop offset="100%" stopColor={s.glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-outfit`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.outfit[1]} />
            <stop offset="100%" stopColor={s.outfit[0]} />
          </linearGradient>
          <radialGradient id={`${id}-iris`} cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#a78b6a" />
            <stop offset="60%" stopColor="#6b4f35" />
            <stop offset="100%" stopColor="#3f2c1c" />
          </radialGradient>
          <radialGradient id={`${id}-face`} cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#ffe3d3" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffcdb8" stopOpacity="0.5" />
          </radialGradient>
          <linearGradient id={`${id}-hair`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <Background s={s} id={id} />
        <Mascot s={s} id={id} />
      </svg>

      {/* 카테고리 소품 배지 (이모지) */}
      <div className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-2xl bg-white/80 text-xl shadow-md ring-1 ring-white/60 backdrop-blur-sm">
        <span className="drop-shadow-sm">{emoji}</span>
      </div>
    </div>
  );
}
