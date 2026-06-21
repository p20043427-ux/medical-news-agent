"use client";

import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { VERBS } from "@/lib/jp/verbs";
import { CONVERSATIONS } from "@/lib/jp/conversations";
import type { Progress } from "@/lib/jp/progress";
import { todayKey } from "@/lib/jp/progress";
import CardArt from "./CardArt";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function ProgressRing({ pct }: { pct: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
      <circle
        cx="32" cy="32" r={r} fill="none" stroke="#0f172a" strokeWidth="6"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        className="transition-all duration-700"
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

  // Day N (학습 시작일로부터 경과일)
  const start = new Date(progress.startedAt);
  const now = new Date();
  const dayN =
    Math.floor((now.getTime() - start.getTime()) / 86400000) + 1;

  // 이번 주 캘린더 (일~토)
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    return d;
  });
  const isStudied = (d: Date) =>
    (progress.daily[d.toISOString().slice(0, 10)] ?? 0) > 0;

  // 추천 카테고리: 미완료 중 첫 번째
  const recommend =
    VOCAB_CATEGORIES.find((cat) => {
      const ws = VOCAB.filter((w) => w.category === cat.key);
      return ws.some((w) => !progress.knownWords.includes(w.id));
    }) ?? VOCAB_CATEGORIES[0];
  const recWords = VOCAB.filter((w) => w.category === recommend.key);
  const recKnown = recWords.filter((w) => progress.knownWords.includes(w.id)).length;

  return (
    <div className="px-4 pb-24 pt-3">
      {/* 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-extrabold text-slate-900">JLPT N5</span>
          <span className="text-slate-300">🌸</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {pct}%
          </span>
          <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">
            오늘 {todayCount}장
          </span>
        </div>
      </div>

      {/* 주간 캘린더 */}
      <div className="mb-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5">
        <div className="grid grid-cols-7 text-center text-xs text-slate-400">
          {WEEKDAYS.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 text-center">
          {week.map((d, i) => {
            const today = d.toDateString() === now.toDateString();
            const studied = isStudied(d);
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold ${
                    today
                      ? "bg-slate-900 text-white"
                      : studied
                        ? "text-slate-900"
                        : "text-slate-400"
                  }`}
                >
                  {d.getDate()}
                </span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${studied ? "bg-emerald-500" : "bg-transparent"}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <p className="mb-3 px-1 text-lg font-extrabold text-slate-900">Day {dayN}</p>

      {/* 오늘의 학습 카드 (바로 시작) */}
      <div className="mb-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
        {/* 일러스트 배너 */}
        <div className="h-28">
          <CardArt category={recommend.key} emoji={recommend.emoji} />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ProgressRing pct={recWords.length ? Math.round((recKnown / recWords.length) * 100) : 0} />
              <div>
                <p className="text-lg font-bold text-slate-900">
                  {recommend.emoji} {recommend.label}
                </p>
                <p className="text-sm text-slate-400">
                  {recKnown === 0 ? "시작 전" : `${recKnown}/${recWords.length} 학습`} · 약 3분
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => onStudyCategory(recommend.key)}
            className="mt-4 w-full rounded-2xl bg-slate-900 py-3.5 font-bold text-white shadow-sm transition active:scale-[0.98]"
          >
            바로 시작
          </button>
        </div>
      </div>

      {/* 단어 카테고리 */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">단어 카테고리</h2>
        <span className="text-xs text-slate-400">{totalWords}개 단어</span>
      </div>
      <div className="mb-7 grid grid-cols-2 gap-3">
        {VOCAB_CATEGORIES.map((cat) => {
          const words = VOCAB.filter((w) => w.category === cat.key);
          const known = words.filter((w) => progress.knownWords.includes(w.id)).length;
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
