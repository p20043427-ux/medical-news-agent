"use client";

import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { VERBS } from "@/lib/jp/verbs";
import { CONVERSATIONS } from "@/lib/jp/conversations";
import { type Progress, todayKey, isKnown, knownCount, streak, daysUntilGoal, dueIds } from "@/lib/jp/progress";
import CardArt from "./CardArt";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function ProgressRing({ pct, color = "#E63946" }: { pct: number; color?: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" stroke="var(--surface)" strokeWidth="6" />
      <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="6"
        strokeLinecap="round" strokeDasharray={c}
        strokeDashoffset={c - (pct / 100) * c}
        className="transition-all duration-700" />
    </svg>
  );
}

export default function Home({ progress, onStudyCategory, onGo }: {
  progress: Progress;
  onStudyCategory: (key: string) => void;
  onGo: (tab: "conversation" | "verbs") => void;
}) {
  const totalWords = VOCAB.length;
  const known = knownCount(progress);
  const pct = totalWords ? Math.round((known / totalWords) * 100) : 0;
  const todayCount = progress.daily[todayKey()] ?? 0;
  const str = streak(progress);
  const dday = daysUntilGoal(progress);
  const dueCount = dueIds(progress).length;

  const start = new Date(progress.startedAt);
  const dayN = Math.floor((Date.now() - start.getTime()) / 86400000) + 1;

  const now = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    return d;
  });
  const isStudied = (d: Date) => (progress.daily[d.toISOString().slice(0, 10)] ?? 0) > 0;

  const recommend = VOCAB_CATEGORIES.find((cat) => {
    return VOCAB.filter((w) => w.category === cat.key).some((w) => !isKnown(progress, w.id));
  }) ?? VOCAB_CATEGORIES[0];
  const recWords = VOCAB.filter((w) => w.category === recommend.key);
  const recKnown = recWords.filter((w) => isKnown(progress, w.id)).length;

  return (
    <div className="px-4 pb-28 pt-2">
      {/* 오늘 요약 배지 줄 */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full px-3 py-1.5 text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg,#E63946,#F4A261)" }}>
          Day {dayN}
        </span>
        {str > 0 && (
          <span className="rounded-full px-3 py-1.5 text-xs font-bold"
            style={{ background: "var(--card)", color: "#F97316", boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>
            🔥 {str}일 연속
          </span>
        )}
        {dueCount > 0 && (
          <span className="rounded-full px-3 py-1.5 text-xs font-bold"
            style={{ background: "var(--card)", color: "#3B82F6", boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>
            🔁 복습 {dueCount}장
          </span>
        )}
        {dday !== null && (
          <span className="rounded-full px-3 py-1.5 text-xs font-bold"
            style={{ background: "var(--card)", color: "var(--text-2)", boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>
            {dday > 0 ? `D-${dday}` : dday === 0 ? "D-DAY 🎯" : `D+${-dday}`}
          </span>
        )}
        <span className="rounded-full px-3 py-1.5 text-xs font-bold"
          style={{ background: "var(--card)", color: "var(--text-2)", boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>
          오늘 {todayCount}장
        </span>
      </div>

      {/* 전체 진도 + 주간 캘린더 */}
      <div className="mb-4 rounded-3xl p-4 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="mb-3 flex items-center gap-4">
          <ProgressRing pct={pct} />
          <div className="flex-1">
            <p className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>JLPT N5 진도</p>
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              {known} / {totalWords} 단어 ({pct}%)
            </p>
            <div className="progress-bar mt-2">
              <div className="progress-bar-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
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
                    background: isToday ? "#E63946" : "transparent",
                    color: isToday ? "white" : studied ? "var(--text-1)" : "var(--text-3)",
                    fontWeight: isToday ? 700 : studied ? 600 : 400,
                  }}>
                  {d.getDate()}
                </span>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: studied ? "#10B981" : "transparent" }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* 오늘의 추천 학습 */}
      <div className="mb-4 overflow-hidden rounded-3xl shadow-sm" style={{ background: "var(--card)" }}>
        <div className="h-24">
          <CardArt category={recommend.key} emoji={recommend.emoji} />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3">
            <ProgressRing pct={recWords.length ? Math.round((recKnown / recWords.length) * 100) : 0} />
            <div className="flex-1">
              <p className="text-lg font-bold" style={{ color: "var(--text-1)" }}>
                {recommend.emoji} {recommend.label}
              </p>
              <p className="text-sm" style={{ color: "var(--text-3)" }}>
                {recKnown}/{recWords.length} 학습 · 약 3분
              </p>
            </div>
          </div>
          <button onClick={() => onStudyCategory(recommend.key)}
            className="mt-4 w-full rounded-2xl py-3.5 font-bold text-white shadow-sm transition active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg,#E63946,#F4A261)" }}>
            바로 시작 →
          </button>
        </div>
      </div>

      {/* 카테고리 그리드 */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold" style={{ color: "var(--text-1)" }}>단어 카테고리</h2>
        <span className="text-xs" style={{ color: "var(--text-3)" }}>{totalWords}개 단어</span>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-3">
        {VOCAB_CATEGORIES.map((cat) => {
          const ws = VOCAB.filter((w) => w.category === cat.key);
          const kn = ws.filter((w) => isKnown(progress, w.id)).length;
          const catPct = ws.length ? (kn / ws.length) * 100 : 0;
          return (
            <button key={cat.key} onClick={() => onStudyCategory(cat.key)}
              className="rounded-2xl p-4 text-left shadow-sm transition active:scale-95"
              style={{ background: "var(--card)" }}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--text-3)" }}>{kn}/{ws.length}</span>
              </div>
              <p className="mt-2 font-bold" style={{ color: "var(--text-1)" }}>{cat.label}</p>
              <div className="progress-bar mt-2">
                <div className="progress-bar-fill" style={{ width: `${catPct}%`, background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* 회화 / 동사 */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onGo("conversation")}
          className="rounded-2xl p-4 text-left shadow-sm transition active:scale-95"
          style={{ background: "var(--card)" }}>
          <span className="text-2xl">💬</span>
          <p className="mt-2 font-bold" style={{ color: "var(--text-1)" }}>생활 회화</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{CONVERSATIONS.length}개 상황</p>
        </button>
        <button onClick={() => onGo("verbs")}
          className="rounded-2xl p-4 text-left shadow-sm transition active:scale-95"
          style={{ background: "var(--card)" }}>
          <span className="text-2xl">🔤</span>
          <p className="mt-2 font-bold" style={{ color: "var(--text-1)" }}>필수 동사</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{VERBS.length}개 동사</p>
        </button>
      </div>
    </div>
  );
}
