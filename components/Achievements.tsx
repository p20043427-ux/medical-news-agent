"use client";

export interface Badge {
  emoji: string;
  title: string;
  desc: string;
  earned: boolean;
}

// 업적·뱃지 그리드 (JP·EN Stats 공용)
export default function Achievements({ badges, accent = "#E63946" }: { badges: Badge[]; accent?: string }) {
  const earned = badges.filter((b) => b.earned).length;
  return (
    <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-bold" style={{ color: "var(--text-1)" }}>업적</span>
        <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: accent }}>{earned} / {badges.length}</span>
      </div>
      <div className="grid grid-cols-4 gap-2.5">
        {badges.map((b) => (
          <div key={b.title} className="flex flex-col items-center gap-1 rounded-2xl p-2.5 text-center"
            style={{ background: b.earned ? `${accent}12` : "var(--surface)", opacity: b.earned ? 1 : 0.55 }}
            title={`${b.title} · ${b.desc}`}>
            <span className="text-2xl" style={{ filter: b.earned ? "none" : "grayscale(1)" }}>{b.earned ? b.emoji : "🔒"}</span>
            <span className="text-[10px] font-bold leading-tight" style={{ color: b.earned ? "var(--text-1)" : "var(--text-3)" }}>{b.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
