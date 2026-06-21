"use client";

import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { VERBS } from "@/lib/jp/verbs";
import { CONVERSATIONS } from "@/lib/jp/conversations";
import type { Progress } from "@/lib/jp/progress";
import { todayKey } from "@/lib/jp/progress";

function ProgressRing({ pct }: { pct: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg viewBox="0 0 72 72" className="h-20 w-20 -rotate-90">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#e2e8f0" strokeWidth="7" />
      <circle
        cx="36" cy="36" r={r} fill="none" stroke="#0f172a" strokeWidth="7"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        className="transition-all duration-500"
      />
    </svg>
  );
}

export default function Home({
  progress,
  onStudyCategory,
  onGo,
}: {
  progress: Progress;
  onStudyCategory: (key: string) => void;
  onGo: (tab: "conversation" | "verbs") => void;
}) {
  const totalWords = VOCAB.length;
  const knownCount = progress.knownWords.length;
  const pct = totalWords ? Math.round((knownCount / totalWords) * 100) : 0;
  const todayCount = progress.daily[todayKey()] ?? 0;
  const learnedDays = Object.keys(progress.daily).length;
  const dateLabel = new Date().toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <div className="px-4 pb-24 pt-3">
      {/* 헤더 */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
              JLPT N5
            </span>
            <span className="text-xs text-slate-400">{dateLabel}</span>
          </div>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
            오늘도 일본어 한 걸음 🌸
          </h1>
        </div>
      </div>

      {/* 진도 카드 */}
      <div className="mb-5 flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <div className="relative grid place-items-center">
          <ProgressRing pct={pct} />
          <span className="absolute text-sm font-bold text-slate-900">{pct}%</span>
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-400">학습한 단어</p>
          <p className="text-2xl font-extrabold text-slate-900">
            {knownCount}
            <span className="text-base font-medium text-slate-400"> / {totalWords}</span>
          </p>
          <div className="mt-1 flex gap-4 text-xs text-slate-400">
            <span>오늘 {todayCount}장</span>
            <span>학습일 {learnedDays}일</span>
          </div>
        </div>
      </div>

      {/* 오늘의 학습 */}
      <button
        onClick={() => onStudyCategory("greeting")}
        className="mb-6 flex w-full items-center justify-between rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-left text-white shadow-lg transition active:scale-[0.98]"
      >
        <div>
          <p className="text-xs font-medium text-white/60">오늘의 추천 학습</p>
          <p className="mt-1 text-lg font-bold">인사·표현부터 시작하기</p>
          <p className="mt-0.5 text-sm text-white/70">단어 카드 · 약 3분</p>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-xl">
          ▶
        </span>
      </button>

      {/* 단어 카테고리 */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">단어 카테고리</h2>
        <span className="text-xs text-slate-400">{totalWords}개 단어</span>
      </div>
      <div className="mb-7 grid grid-cols-2 gap-3">
        {VOCAB_CATEGORIES.map((cat) => {
          const words = VOCAB.filter((w) => w.category === cat.key);
          const known = words.filter((w) =>
            progress.knownWords.includes(w.id),
          ).length;
          return (
            <button
              key={cat.key}
              onClick={() => onStudyCategory(cat.key)}
              className="rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition active:scale-95"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-semibold text-slate-400">
                  {known}/{words.length}
                </span>
              </div>
              <p className="mt-2 font-bold text-slate-900">{cat.label}</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-900"
                  style={{ width: `${words.length ? (known / words.length) * 100 : 0}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* 회화 / 동사 바로가기 */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onGo("conversation")}
          className="rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition active:scale-95"
        >
          <span className="text-2xl">💬</span>
          <p className="mt-2 font-bold text-slate-900">생활 회화</p>
          <p className="text-xs text-slate-400">{CONVERSATIONS.length}개 상황</p>
        </button>
        <button
          onClick={() => onGo("verbs")}
          className="rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition active:scale-95"
        >
          <span className="text-2xl">🔤</span>
          <p className="mt-2 font-bold text-slate-900">필수 동사</p>
          <p className="text-xs text-slate-400">{VERBS.length}개 동사</p>
        </button>
      </div>
    </div>
  );
}
