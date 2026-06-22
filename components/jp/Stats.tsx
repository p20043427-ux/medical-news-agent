"use client";

import { useRef, useState } from "react";
import { VOCAB } from "@/lib/jp/vocab";
import {
  type Progress, knownCount, streak, recentDaily, daysUntilGoal, todayKey, totalReviews,
} from "@/lib/jp/progress";
import { useTheme, type Theme } from "@/lib/jp/theme";
import { getRate, setRate as saveRate, speakJa } from "@/lib/jp/speech";

const WD = ["일", "월", "화", "수", "목", "금", "토"];

export default function Stats({
  progress, onSetGoal, onReset, onExport, onImport,
}: {
  progress: Progress;
  onSetGoal: (date: string | undefined) => void;
  onReset: () => void;
  onExport: () => string;
  onImport: (json: string) => boolean;
}) {
  const { theme, change } = useTheme();
  const [rate, setRateState] = useState(getRate());
  const fileRef = useRef<HTMLInputElement>(null);

  const total = VOCAB.length;
  const known = knownCount(progress);
  const reviews = totalReviews(progress);
  const str = streak(progress);
  const days14 = recentDaily(progress, 14);
  const maxCount = Math.max(1, ...days14.map((d) => d.count));
  const dday = daysUntilGoal(progress);

  function changeRate(v: number) { setRateState(v); saveRate(v); }

  function exportFile() {
    const blob = new Blob([onExport()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `일본어-진도-${todayKey()}.json`; a.click();
    URL.revokeObjectURL(url);
  }

  function importFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { alert(onImport(String(reader.result)) ? "진도를 가져왔어요!" : "파일을 읽을 수 없어요."); };
    reader.readAsText(f); e.target.value = "";
  }

  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>학습 분석</h1>
      <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>꾸준함이 실력이 됩니다 📈</p>

      {/* 요약 3개 */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
          <p className="text-2xl font-extrabold" style={{ color: "#F97316" }}>🔥{str}</p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>연속 학습일</p>
        </div>
        <div className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
          <p className="text-2xl font-extrabold" style={{ color: "#E63946" }}>{known}</p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>익힌 단어</p>
        </div>
        <div className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
          <p className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{reviews}</p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>총 학습 카드</p>
        </div>
      </div>

      {/* XP 레벨 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>경험치 (XP)</span>
          <span className="rounded-full px-3 py-1 text-sm font-extrabold text-white"
            style={{ background: "var(--xp)" }}>
            Lv. {Math.floor(progress.xp / 1000) + 1}
          </span>
        </div>
        <p className="text-2xl font-extrabold mb-2" style={{ color: "var(--xp)" }}>
          ⚡ {progress.xp.toLocaleString()} XP
        </p>
        <div className="progress-bar">
          <div className="progress-bar-fill xp-bar-fill"
            style={{ width: `${Math.min((progress.xp % 1000) / 10, 100)}%` }} />
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>
          다음 레벨까지 {1000 - (progress.xp % 1000)} XP
        </p>
      </div>

      {/* 전체 진도 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="mb-2 flex items-end justify-between">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>N5 단어 진도</span>
          <span className="text-sm" style={{ color: "var(--text-3)" }}>
            {known} / {total} ({total ? Math.round((known / total) * 100) : 0}%)
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill"
            style={{ width: `${total ? (known / total) * 100 : 0}%`, background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
        </div>
      </div>

      {/* 최근 2주 그래프 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-4 font-bold" style={{ color: "var(--text-1)" }}>최근 2주 학습량</p>
        <div className="flex h-32 items-end justify-between gap-1">
          {days14.map((d, i) => {
            const today = todayKey(d.date) === todayKey();
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-24 w-full items-end">
                  <div className="w-full rounded-md transition-all"
                    style={{
                      background: today ? "#E63946" : d.count > 0 ? "#F4A261" : "var(--surface)",
                      height: `${Math.max((d.count / maxCount) * 100, d.count > 0 ? 8 : 4)}%`,
                    }}
                    title={`${d.count}장`} />
                </div>
                <span className="text-[9px]" style={{ color: "var(--text-3)" }}>{WD[d.date.getDay()]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 목표 시험일 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="flex items-center justify-between">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>목표 시험일</span>
          {dday !== null && (
            <span className="rounded-full px-3 py-1 text-sm font-extrabold text-white"
              style={{ background: "linear-gradient(135deg,#E63946,#F4A261)" }}>
              {dday > 0 ? `D-${dday}` : dday === 0 ? "D-DAY" : `D+${-dday}`}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs mb-3" style={{ color: "var(--text-3)" }}>시험일을 설정하면 D-day가 표시돼요.</p>
        <div className="flex gap-2">
          <input type="date" value={progress.goalDate ?? ""} min={todayKey()}
            onChange={(e) => onSetGoal(e.target.value || undefined)}
            className="flex-1 rounded-xl border px-3 py-2.5 text-sm outline-none"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text-1)" }} />
          {progress.goalDate && (
            <button onClick={() => onSetGoal(undefined)}
              className="rounded-xl border px-3 text-sm"
              style={{ borderColor: "var(--border)", color: "var(--text-3)" }}>
              해제
            </button>
          )}
        </div>
      </div>

      {/* 설정 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-4 font-bold" style={{ color: "var(--text-1)" }}>설정</p>

        {/* 테마 */}
        <div className="mb-4">
          <p className="mb-2 text-sm" style={{ color: "var(--text-3)" }}>화면 테마</p>
          <div className="grid grid-cols-3 gap-1 rounded-xl p-1" style={{ background: "var(--surface)" }}>
            {([["light", "라이트"], ["dark", "다크"], ["system", "시스템"]] as [Theme, string][]).map(([t, label]) => (
              <button key={t} onClick={() => change(t)}
                className="rounded-lg py-2 text-sm font-semibold transition"
                style={{
                  background: theme === t ? "var(--card)" : "transparent",
                  color: theme === t ? "var(--text-1)" : "var(--text-3)",
                  boxShadow: theme === t ? "0 1px 3px rgba(0,0,0,.1)" : "none",
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 음성 속도 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm" style={{ color: "var(--text-3)" }}>일본어 음성 속도</p>
            <button onClick={() => speakJa("こんにちは。はじめまして。", rate)}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "var(--surface)", color: "var(--text-2)" }}>
              ▶ 미리듣기 ({rate.toFixed(1)}x)
            </button>
          </div>
          <input type="range" min={0.5} max={1.2} step={0.1} value={rate}
            onChange={(e) => changeRate(Number(e.target.value))}
            className="w-full" style={{ accentColor: "#E63946" }} />
        </div>
      </div>

      {/* 진도 백업 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-1 font-bold" style={{ color: "var(--text-1)" }}>진도 백업</p>
        <p className="mb-3 text-xs" style={{ color: "var(--text-3)" }}>기기 이전 시 내보내고 가져오세요.</p>
        <div className="flex gap-2">
          <button onClick={exportFile}
            className="ui-btn ui-btn-surface flex-1 py-2.5 text-sm">
            ⬇ 내보내기
          </button>
          <button onClick={() => fileRef.current?.click()}
            className="ui-btn ui-btn-surface flex-1 py-2.5 text-sm">
            ⬆ 가져오기
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={importFile} className="hidden" />
        </div>
      </div>

      <button onClick={() => { if (confirm("학습 진도를 모두 초기화할까요?")) onReset(); }}
        className="w-full rounded-2xl py-3 text-sm font-semibold"
        style={{ color: "#EF4444" }}>
        학습 진도 초기화
      </button>
    </div>
  );
}
