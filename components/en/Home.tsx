"use client";

import { EN_VOCAB, EN_CATEGORIES } from "@/lib/en/vocab";
import { type EnProgress, isLearned, learnedCount, enStreak, todayKey } from "@/lib/en/progress";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function MiniRing({ pct }: { pct: number }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 -rotate-90">
      <circle cx="24" cy="24" r={r} fill="none" stroke="var(--surface)" strokeWidth="5" />
      <circle cx="24" cy="24" r={r} fill="none" stroke="#4361EE" strokeWidth="5"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c}
        style={{ transition: "stroke-dashoffset 0.7s" }} />
    </svg>
  );
}

export default function EnHome({ progress, onStudyCategory }: {
  progress: EnProgress;
  onStudyCategory: (key: string) => void;
}) {
  const total = EN_VOCAB.length;
  const learned = learnedCount(progress);
  const pct = total ? Math.round((learned / total) * 100) : 0;
  const todayCount = progress.daily[todayKey()] ?? 0;
  const str = enStreak(progress);

  const now = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    return d;
  });
  const isStudied = (d: Date) => (progress.daily[d.toISOString().slice(0, 10)] ?? 0) > 0;

  const recommend = EN_CATEGORIES.find((cat) =>
    EN_VOCAB.filter((w) => w.category === cat.key).some((w) => !isLearned(progress, w.id))
  ) ?? EN_CATEGORIES[0];

  const recWords = EN_VOCAB.filter((w) => w.category === recommend.key);
  const recLearned = recWords.filter((w) => isLearned(progress, w.id)).length;

  // CEFR 레벨별 진도
  const levels = ["A1", "A2", "B1", "B2", "C1"] as const;
  const levelStats = levels.map((lv) => {
    const ws = EN_VOCAB.filter((w) => w.cefrLevel === lv);
    const ln = ws.filter((w) => isLearned(progress, w.id)).length;
    return { level: lv, total: ws.length, learned: ln, pct: ws.length ? Math.round((ln / ws.length) * 100) : 0 };
  });

  const levelColors: Record<string, string> = {
    A1: "#10B981", A2: "#3B82F6", B1: "#8B5CF6", B2: "#EC4899", C1: "#F59E0B",
  };

  return (
    <div className="px-4 pb-28 pt-2">
      {/* 배지 줄 */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full px-3 py-1.5 text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
          CEFR A1→C1
        </span>
        {str > 0 && (
          <span className="rounded-full px-3 py-1.5 text-xs font-bold"
            style={{ background: "var(--card)", color: "#F97316", boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>
            🔥 {str}일 연속
          </span>
        )}
        <span className="rounded-full px-3 py-1.5 text-xs font-bold"
          style={{ background: "var(--card)", color: "var(--text-2)", boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>
          오늘 {todayCount}개
        </span>
      </div>

      {/* 전체 진도 + 캘린더 */}
      <div className="mb-4 rounded-3xl p-4 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="mb-3 flex items-center gap-4">
          <MiniRing pct={pct} />
          <div className="flex-1">
            <p className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>영어 단어 진도</p>
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              {learned} / {total} 단어 ({pct}%)
            </p>
            <div className="progress-bar mt-2">
              <div className="progress-bar-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#4361EE,#7209B7)" }} />
            </div>
          </div>
        </div>
        {/* 주간 캘린더 */}
        <div className="grid grid-cols-7 text-center text-xs" style={{ color: "var(--text-3)" }}>
          {WEEKDAYS.map((w) => <span key={w}>{w}</span>)}
        </div>
        <div className="mt-2 grid grid-cols-7 text-center">
          {week.map((d, i) => {
            const isToday = d.toDateString() === now.toDateString();
            const studied = isStudied(d);
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="grid h-8 w-8 place-items-center rounded-full text-sm font-semibold"
                  style={{
                    background: isToday ? "#4361EE" : "transparent",
                    color: isToday ? "white" : studied ? "var(--text-1)" : "var(--text-3)",
                  }}>
                  {d.getDate()}
                </span>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: studied ? "#10B981" : "transparent" }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* 추천 카테고리 */}
      <div className="mb-4 overflow-hidden rounded-3xl shadow-sm" style={{ background: "var(--card)" }}>
        <div className="h-16 flex items-center justify-center text-5xl"
          style={{ background: "linear-gradient(135deg,#4361EE22,#7209B722)" }}>
          {recommend.emoji}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-extrabold text-lg" style={{ color: "var(--text-1)" }}>{recommend.label}</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>
                {recLearned}/{recWords.length} 완료 · {recommend.cefrRange}
              </p>
            </div>
            <span className="rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
              추천
            </span>
          </div>
          <div className="progress-bar mb-4">
            <div className="progress-bar-fill"
              style={{ width: `${recWords.length ? (recLearned / recWords.length) * 100 : 0}%`, background: "linear-gradient(90deg,#4361EE,#7209B7)" }} />
          </div>
          <button onClick={() => onStudyCategory(recommend.key)}
            className="w-full rounded-2xl py-3.5 font-bold text-white shadow-sm active:scale-[0.98] transition"
            style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
            학습 시작 →
          </button>
        </div>
      </div>

      {/* CEFR 레벨 진도 */}
      <div className="mb-4 rounded-3xl p-4 shadow-sm" style={{ background: "var(--card)" }}>
        <h3 className="mb-3 font-bold" style={{ color: "var(--text-1)" }}>CEFR 레벨별 진도</h3>
        <div className="space-y-3">
          {levelStats.map(({ level, total: t, learned: l, pct: p }) => (
            <div key={level}>
              <div className="mb-1 flex items-center justify-between">
                <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
                  style={{ background: levelColors[level] }}>
                  {level}
                </span>
                <span className="text-xs" style={{ color: "var(--text-3)" }}>{l}/{t} ({p}%)</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${p}%`, background: levelColors[level] }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리 그리드 */}
      <h3 className="mb-3 font-bold" style={{ color: "var(--text-1)" }}>카테고리별 학습</h3>
      <div className="grid grid-cols-2 gap-3">
        {EN_CATEGORIES.map((cat) => {
          const ws = EN_VOCAB.filter((w) => w.category === cat.key);
          const ln = ws.filter((w) => isLearned(progress, w.id)).length;
          return (
            <button key={cat.key} onClick={() => onStudyCategory(cat.key)}
              className="rounded-2xl p-4 text-left shadow-sm active:scale-95 transition"
              style={{ background: "var(--card)" }}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--text-3)" }}>{ln}/{ws.length}</span>
              </div>
              <p className="mt-2 font-bold text-sm" style={{ color: "var(--text-1)" }}>{cat.label}</p>
              <p className="text-xs mb-2" style={{ color: "var(--text-3)" }}>{cat.cefrRange}</p>
              <div className="progress-bar">
                <div className="progress-bar-fill"
                  style={{ width: `${ws.length ? (ln / ws.length) * 100 : 0}%`, background: "linear-gradient(90deg,#4361EE,#7209B7)" }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
