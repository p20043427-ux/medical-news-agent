"use client";

import { useEffect, useRef, useState } from "react";
import { EN_VOCAB, EN_CATEGORIES } from "@/lib/en/vocab";
import {
  type EnProgress, learnedCount, enStreak, enRecentDaily, totalEnReviews, todayKey,
} from "@/lib/en/progress";
import { useTheme, type Theme } from "@/lib/jp/theme";
import { getEnRate, setEnRate, speakEn } from "@/lib/en/speech";
import { getExamHistory, type ExamAttempt } from "@/lib/exam-history";
import { buildBackup, restoreBackup } from "@/lib/backup";
import ReminderSetting from "@/components/ReminderSetting";
import { Button, Progress } from "@/components/ui";

const WD = ["일", "월", "화", "수", "목", "금", "토"];

export default function EnStats({
  progress, onSetGoal, onReset, onExport, onImport,
}: {
  progress: EnProgress;
  onSetGoal: (date: string | undefined) => void;
  onReset: () => void;
  onExport: () => string;
  onImport: (json: string) => boolean;
}) {
  const { theme, change } = useTheme();
  const [rate, setRateState] = useState(getEnRate());
  const [examHist, setExamHist] = useState<ExamAttempt[]>([]);
  useEffect(() => { setExamHist(getExamHistory("en")); }, []);
  const fileRef = useRef<HTMLInputElement>(null);

  const total = EN_VOCAB.length;
  const learned = learnedCount(progress);
  const reviews = totalEnReviews(progress);
  const str = enStreak(progress);
  const days14 = enRecentDaily(progress, 14);
  const maxCount = Math.max(1, ...days14.map((d) => d.count));
  const dday = progress.goalDate
    ? Math.round((new Date(progress.goalDate).getTime() - new Date(todayKey()).getTime()) / 86400000)
    : null;

  function changeRate(v: number) { setRateState(v); setEnRate(v); }

  function exportFile() {
    const blob = new Blob([buildBackup("en", onExport())], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `영어-진도-${todayKey()}.json`; a.click();
    URL.revokeObjectURL(url);
  }

  function importFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { alert(restoreBackup("en", String(reader.result), onImport) ? "학습 데이터를 가져왔어요! 새로고침하면 반영돼요." : "파일을 읽을 수 없어요."); };
    reader.readAsText(f); e.target.value = "";
  }

  // CEFR 레벨별 진도
  const levels = ["A1", "A2", "B1", "B2", "C1"] as const;
  const levelColors: Record<string, string> = { A1: "#10B981", A2: "#3B82F6", B1: "#8B5CF6", B2: "#EC4899", C1: "#F59E0B" };

  // 약점 분석 — 카테고리별 숙련도(reps≥1 & interval≥3) + 자주 틀린 단어(lapses)
  const isMastered = (id: string) => { const c = progress.cards[id]; return !!c && c.reps >= 1 && c.interval >= 3; };
  const catStats = EN_CATEGORIES.map((c) => {
    const ws = EN_VOCAB.filter((w) => w.category === c.key);
    const known = ws.filter((w) => isMastered(w.id)).length;
    return { ...c, known, total: ws.length, pct: ws.length ? Math.round((known / ws.length) * 100) : 0 };
  }).filter((c) => c.total > 0);
  const studiedCats = catStats.filter((c) => c.known > 0);
  const weakCats = [...(studiedCats.length ? studiedCats : catStats)].sort((a, b) => a.pct - b.pct).slice(0, 3);
  const lapseWords = EN_VOCAB
    .map((w) => ({ w, lapses: progress.cards[w.id]?.lapses ?? 0 }))
    .filter((x) => x.lapses > 0)
    .sort((a, b) => b.lapses - a.lapses)
    .slice(0, 8);

  // 주간 리포트
  const DAY = 86400000;
  const dayAgo = (i: number) => progress.daily?.[todayKey(new Date(Date.now() - i * DAY))] ?? 0;
  const sumWeek = (off: number) => Array.from({ length: 7 }, (_, i) => dayAgo(off + i)).reduce((a, b) => a + b, 0);
  const thisWeek = sumWeek(0);
  const weekDelta = thisWeek - sumWeek(7);
  const activeDays = Array.from({ length: 7 }, (_, i) => dayAgo(i)).filter((n) => n > 0).length;

  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>학습 분석</h1>
      <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>꾸준함이 실력입니다 📈</p>

      {/* 요약 카드 3개 */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
          <p className="text-2xl font-extrabold" style={{ color: "#F97316" }}>🔥{str}</p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>연속 학습일</p>
        </div>
        <div className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
          <p className="text-2xl font-extrabold" style={{ color: "#4361EE" }}>{learned}</p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>학습 단어</p>
        </div>
        <div className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
          <p className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{reviews}</p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>총 복습 수</p>
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
        <Progress value={Math.min((progress.xp % 1000) / 10, 100)} indicatorClassName="xp-bar-fill" />
        <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>
          다음 레벨까지 {1000 - (progress.xp % 1000)} XP
        </p>
      </div>

      {/* 전체 진도 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="mb-2 flex items-end justify-between">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>전체 진도</span>
          <span className="text-sm" style={{ color: "var(--text-3)" }}>
            {learned} / {total} ({total ? Math.round((learned / total) * 100) : 0}%)
          </span>
        </div>
        <Progress value={total ? (learned / total) * 100 : 0} className="mb-4" indicatorStyle={{ background: "linear-gradient(90deg,#4361EE,#7209B7)" }} />
        {/* CEFR 레벨별 */}
        <div className="space-y-2">
          {levels.map((lv) => {
            const ws = EN_VOCAB.filter((w) => w.cefrLevel === lv);
            const ln = ws.filter((w) => (progress.cards[w.id]?.reps ?? 0) >= 1).length;
            const p = ws.length ? Math.round((ln / ws.length) * 100) : 0;
            return (
              <div key={lv} className="flex items-center gap-3">
                <span className="w-8 rounded-full text-center text-xs font-bold text-white py-0.5"
                  style={{ background: levelColors[lv] }}>
                  {lv}
                </span>
                <Progress value={p} className="flex-1" indicatorStyle={{ background: levelColors[lv] }} />
                <span className="text-xs w-16 text-right" style={{ color: "var(--text-3)" }}>{ln}/{ws.length}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 모의시험 이력 */}
      {examHist.length > 0 && (
        <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
          <div className="mb-3 flex items-center justify-between">
            <span className="font-bold" style={{ color: "var(--text-1)" }}>모의시험 이력</span>
            <span className="text-xs" style={{ color: "var(--text-3)" }}>{examHist.length}회 · 평균 {Math.round(examHist.reduce((a, b) => a + b.pct, 0) / examHist.length)}점</span>
          </div>
          <div className="flex h-24 items-end justify-between gap-1">
            {examHist.slice(-12).map((h, i, arr) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-16 w-full items-end">
                  <div className="w-full rounded-md" title={`${h.pct}점`}
                    style={{ height: `${Math.max(h.pct, 4)}%`, background: i === arr.length - 1 ? "linear-gradient(180deg,#4361EE,#7209B7)" : h.pct >= 60 ? "#10B981" : "var(--surface)" }} />
                </div>
                <span className="text-[9px]" style={{ color: "var(--text-3)" }}>{h.diff === "easy" ? "입" : h.diff === "hard" ? "도" : "표"}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-[11px]" style={{ color: "var(--text-3)" }}>최근 {Math.min(12, examHist.length)}회 · 60점 이상 합격(초록)</p>
        </div>
      )}

      {/* 주간 리포트 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-3 font-bold" style={{ color: "var(--text-1)" }}>이번 주 리포트</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-2xl font-extrabold" style={{ color: "#4361EE" }}>{thisWeek}</p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>학습 카드</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold" style={{ color: "#7209B7" }}>{activeDays}<span className="text-sm" style={{ color: "var(--text-3)" }}>/7</span></p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>학습일</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold" style={{ color: weekDelta >= 0 ? "#10B981" : "#F59E0B" }}>{weekDelta >= 0 ? "+" : ""}{weekDelta}</p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>지난주 대비</p>
          </div>
        </div>
        <p className="mt-3 rounded-xl p-2.5 text-center text-xs" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
          {weekDelta > 0 ? `지난주보다 ${weekDelta}개 더 했어요 🔥` : weekDelta < 0 ? "이번 주 조금 더 힘내볼까요? 💪" : "꾸준히 이어가고 있어요 👍"}
          {weakCats[0] ? ` · 보완 추천: ${weakCats[0].emoji} ${weakCats[0].label}` : ""}
        </p>
      </div>

      {/* 약점 분석 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-1 font-bold" style={{ color: "var(--text-1)" }}>약점 분석</p>
        <p className="mb-4 text-xs" style={{ color: "var(--text-3)" }}>익힘률이 낮은 분야와 자주 틀린 단어예요.</p>

        <div className="space-y-2.5">
          {weakCats.map((c) => (
            <div key={c.key} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-sm" style={{ color: "var(--text-2)" }}>{c.emoji} {c.label}</span>
              <Progress value={c.pct} className="flex-1" indicatorStyle={{ background: c.pct < 34 ? "#EF4444" : c.pct < 67 ? "#F59E0B" : "#10B981" }} />
              <span className="w-14 text-right text-xs" style={{ color: "var(--text-3)" }}>{c.known}/{c.total}</span>
            </div>
          ))}
        </div>

        {lapseWords.length > 0 && (
          <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <p className="mb-2 text-sm font-semibold" style={{ color: "var(--text-2)" }}>자주 틀린 단어</p>
            <div className="flex flex-wrap gap-2">
              {lapseWords.map(({ w, lapses }) => (
                <button key={w.id} onClick={() => speakEn(w.word)}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{ background: "var(--surface)", color: "var(--text-1)" }}>
                  <span>{w.word}</span>
                  <span className="text-[10px]" style={{ color: "var(--text-3)" }}>{w.meaning}</span>
                  <span className="rounded-full px-1.5 text-[10px] font-bold text-white" style={{ background: "#EF4444" }}>{lapses}</span>
                </button>
              ))}
            </div>
          </div>
        )}
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
                      background: today ? "#4361EE" : d.count > 0 ? "#7209B7" : "var(--surface)",
                      height: `${Math.max((d.count / maxCount) * 100, d.count > 0 ? 8 : 4)}%`,
                    }}
                    title={`${d.count}개`} />
                </div>
                <span className="text-[9px]" style={{ color: "var(--text-3)" }}>{WD[d.date.getDay()]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 목표일 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="flex items-center justify-between">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>목표 시험일</span>
          {dday !== null && (
            <span className="rounded-full px-3 py-1 text-sm font-extrabold text-white"
              style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
              {dday > 0 ? `D-${dday}` : dday === 0 ? "D-DAY" : `D+${-dday}`}
            </span>
          )}
        </div>
        <div className="mt-3 flex gap-2">
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

        {/* 영어 TTS 속도 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm" style={{ color: "var(--text-3)" }}>영어 음성 속도</p>
            <button onClick={() => speakEn("Hello! How are you doing today?", rate)}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "var(--surface)", color: "var(--text-2)" }}>
              ▶ 미리듣기 ({rate.toFixed(1)}x)
            </button>
          </div>
          <input type="range" min={0.5} max={1.5} step={0.1} value={rate}
            onChange={(e) => changeRate(Number(e.target.value))}
            className="w-full" style={{ accentColor: "#4361EE" }} />
        </div>
      </div>

      <ReminderSetting accent="#4361EE" lang="en" />

      {/* 진도 백업 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-1 font-bold" style={{ color: "var(--text-1)" }}>진도 백업</p>
        <p className="mb-3 text-xs" style={{ color: "var(--text-3)" }}>기기 이전 시 내보내고 가져오세요.</p>
        <div className="flex gap-2">
          <Button variant="surface" size="free" onClick={exportFile}
            className="flex-1 py-2.5 text-sm">
            ⬇ 내보내기
          </Button>
          <Button variant="surface" size="free" onClick={() => fileRef.current?.click()}
            className="flex-1 py-2.5 text-sm">
            ⬆ 가져오기
          </Button>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={importFile} className="hidden" />
        </div>
      </div>

      <button onClick={() => { if (confirm("영어 학습 진도를 초기화할까요?")) onReset(); }}
        className="w-full rounded-2xl py-3 text-sm font-semibold"
        style={{ color: "#EF4444" }}>
        학습 진도 초기화
      </button>
    </div>
  );
}
