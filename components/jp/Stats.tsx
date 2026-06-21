"use client";

import { VOCAB } from "@/lib/jp/vocab";
import {
  type Progress,
  knownCount,
  streak,
  recentDaily,
  daysUntilGoal,
  todayKey,
} from "@/lib/jp/progress";

const WD = ["일", "월", "화", "수", "목", "금", "토"];

export default function Stats({
  progress,
  onSetGoal,
  onReset,
}: {
  progress: Progress;
  onSetGoal: (date: string | undefined) => void;
  onReset: () => void;
}) {
  const total = VOCAB.length;
  const known = knownCount(progress);
  const reviews = Object.values(progress.daily).reduce((a, b) => a + b, 0);
  const days14 = recentDaily(progress, 14);
  const maxCount = Math.max(1, ...days14.map((d) => d.count));
  const dday = daysUntilGoal(progress);
  const str = streak(progress);

  return (
    <div className="px-4 pb-24 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold text-slate-900">학습 분석</h1>
      <p className="mb-5 text-sm text-slate-400">꾸준함이 실력이 됩니다 📈</p>

      {/* 상단 카드 3개 */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-black/5">
          <p className="text-3xl font-extrabold text-orange-500">🔥{str}</p>
          <p className="mt-1 text-xs text-slate-400">연속 학습일</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-black/5">
          <p className="text-3xl font-extrabold text-slate-900">{known}</p>
          <p className="mt-1 text-xs text-slate-400">익힌 단어</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-black/5">
          <p className="text-3xl font-extrabold text-slate-900">{reviews}</p>
          <p className="mt-1 text-xs text-slate-400">총 학습 카드</p>
        </div>
      </div>

      {/* 전체 진도 */}
      <div className="mb-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <div className="mb-2 flex items-end justify-between">
          <span className="font-bold text-slate-900">N5 단어 진도</span>
          <span className="text-sm text-slate-400">
            {known} / {total} ({total ? Math.round((known / total) * 100) : 0}%)
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-slate-700 to-slate-900 transition-all" style={{ width: `${total ? (known / total) * 100 : 0}%` }} />
        </div>
      </div>

      {/* 최근 2주 학습량 */}
      <div className="mb-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <p className="mb-4 font-bold text-slate-900">최근 2주 학습량</p>
        <div className="flex h-32 items-end justify-between gap-1">
          {days14.map((d, i) => {
            const today = todayKey(d.date) === todayKey();
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-24 w-full items-end">
                  <div
                    className={`w-full rounded-md transition-all ${today ? "bg-slate-900" : d.count > 0 ? "bg-slate-400" : "bg-slate-100"}`}
                    style={{ height: `${Math.max((d.count / maxCount) * 100, d.count > 0 ? 8 : 4)}%` }}
                    title={`${d.count}장`}
                  />
                </div>
                <span className="text-[9px] text-slate-300">{WD[d.date.getDay()]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 목표 시험일 (D-day) */}
      <div className="mb-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900">목표 시험일</span>
          {dday !== null && (
            <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-extrabold text-white">
              {dday > 0 ? `D-${dday}` : dday === 0 ? "D-DAY" : `D+${-dday}`}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-400">시험일을 정하면 D-day가 표시돼요.</p>
        <div className="mt-3 flex gap-2">
          <input
            type="date"
            value={progress.goalDate ?? ""}
            min={todayKey()}
            onChange={(e) => onSetGoal(e.target.value || undefined)}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400"
          />
          {progress.goalDate && (
            <button onClick={() => onSetGoal(undefined)} className="rounded-xl border border-slate-200 px-3 text-sm text-slate-400">
              해제
            </button>
          )}
        </div>
      </div>

      {/* 초기화 */}
      <button
        onClick={() => {
          if (confirm("학습 진도를 모두 초기화할까요? 되돌릴 수 없어요.")) onReset();
        }}
        className="w-full rounded-2xl py-3 text-sm font-semibold text-rose-400"
      >
        학습 진도 초기화
      </button>
    </div>
  );
}
