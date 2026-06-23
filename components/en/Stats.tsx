"use client";

import { useEffect, useRef, useState } from "react";
import { EN_VOCAB, EN_CATEGORIES } from "@/lib/en/vocab";
import {
  type EnProgress, learnedCount, enStreak, enRecentDaily, totalEnReviews, todayKey,
} from "@/lib/en/progress";
import { useTheme, type Theme } from "@/lib/jp/theme";
import { getEnRate, setEnRate, speakEn } from "@/lib/en/speech";
import { useUiLang, tt } from "@/lib/i18n";
import { getExamHistory, type ExamAttempt } from "@/lib/exam-history";
import { buildBackup, restoreBackup } from "@/lib/backup";
import { getRoleplay } from "@/lib/roleplay-progress";
import { getFavorites } from "@/lib/favorites";
import Achievements, { type Badge } from "@/components/Achievements";
import ReminderSetting from "@/components/ReminderSetting";
import EnPlacementView from "./PlacementView";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/lib/ui/toast";
import { Button, Progress } from "@/components/ui";

const WD = ["일", "월", "화", "수", "목", "금", "토"];
const WD_JA = ["日", "月", "火", "水", "木", "金", "土"];

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
  const lang = useUiLang();
  const [rate, setRateState] = useState(getEnRate());
  const [examHist, setExamHist] = useState<ExamAttempt[]>([]);
  const [rpDone, setRpDone] = useState(0);
  const [examBest, setExamBest] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const [placement, setPlacement] = useState(false);
  useEffect(() => {
    setExamHist(getExamHistory("en"));
    setRpDone(Object.keys(getRoleplay("en-roleplay")).length);
    try { const b = JSON.parse(localStorage.getItem("en-exam-best") || "{}"); const vals = Object.values(b).map(Number); setExamBest(vals.length ? Math.max(...vals) : 0); } catch { /* ignore */ }
    setFavCount(getFavorites("en-phrase").length);
  }, []);
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
    reader.onload = () => { toast(restoreBackup("en", String(reader.result), onImport) ? "학습 데이터를 가져왔어요. 새로고침하면 반영돼요." : "파일을 읽을 수 없어요."); };
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

  if (placement) return <EnPlacementView onExit={() => setPlacement(false)} />;

  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "학습 분석", "学習分析")}</h1>
      <p className="mb-5 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "꾸준함이 실력입니다 📈", "継続が実力になります 📈")}</p>

      {/* 레벨 진단 */}
      <button onClick={() => setPlacement(true)}
        className="mb-4 flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: "rgba(255,255,255,.2)" }}>🎓</span>
        <span className="min-w-0 flex-1">
          <span className="block font-extrabold text-white">{tt(lang, "레벨 배치고사", "レベル診断テスト")}</span>
          <span className="block text-xs text-white/85">{tt(lang, "12문항으로 내 CEFR 시작 레벨 진단", "12問でCEFR開始レベルを診断")}</span>
        </span>
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      {/* 요약 카드 3개 */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
          <p className="text-2xl font-extrabold" style={{ color: "#F97316" }}>🔥{str}</p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "연속 학습일", "連続学習日")}</p>
        </div>
        <div className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
          <p className="text-2xl font-extrabold" style={{ color: "#4361EE" }}>{learned}</p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "학습 단어", "学習した単語")}</p>
        </div>
        <div className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
          <p className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{reviews}</p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "총 복습 수", "総復習回数")}</p>
        </div>
      </div>

      {/* XP 레벨 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "경험치 (XP)", "経験値 (XP)")}</span>
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
          {tt(lang, `다음 레벨까지 ${1000 - (progress.xp % 1000)} XP`, `次のレベルまで ${1000 - (progress.xp % 1000)} XP`)}
        </p>
      </div>

      {/* 전체 진도 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="mb-2 flex items-end justify-between">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "전체 진도", "全体の進捗")}</span>
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
            <span className="font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "모의시험 이력", "模試の履歴")}</span>
            <span className="text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, `${examHist.length}회 · 평균 ${Math.round(examHist.reduce((a, b) => a + b.pct, 0) / examHist.length)}점`, `${examHist.length}回 · 平均 ${Math.round(examHist.reduce((a, b) => a + b.pct, 0) / examHist.length)}点`)}</span>
          </div>
          <div className="flex h-24 items-end justify-between gap-1">
            {examHist.slice(-12).map((h, i, arr) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-16 w-full items-end">
                  <div className="w-full rounded-md" title={`${h.pct}점`}
                    style={{ height: `${Math.max(h.pct, 4)}%`, background: i === arr.length - 1 ? "linear-gradient(180deg,#4361EE,#7209B7)" : h.pct >= 60 ? "#10B981" : "var(--surface)" }} />
                </div>
                <span className="text-[9px]" style={{ color: "var(--text-3)" }}>{h.diff === "easy" ? tt(lang, "입", "入") : h.diff === "hard" ? tt(lang, "도", "挑") : tt(lang, "표", "標")}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-[11px]" style={{ color: "var(--text-3)" }}>{tt(lang, `최근 ${Math.min(12, examHist.length)}회 · 60점 이상 합격(초록)`, `直近 ${Math.min(12, examHist.length)}回 · 60点以上で合格(緑)`)}</p>
        </div>
      )}

      {/* 주간 리포트 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-3 font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "이번 주 리포트", "今週のレポート")}</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-2xl font-extrabold" style={{ color: "#4361EE" }}>{thisWeek}</p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "학습 카드", "学習カード")}</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold" style={{ color: "#7209B7" }}>{activeDays}<span className="text-sm" style={{ color: "var(--text-3)" }}>/7</span></p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "학습일", "学習日")}</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold" style={{ color: weekDelta >= 0 ? "#10B981" : "#F59E0B" }}>{weekDelta >= 0 ? "+" : ""}{weekDelta}</p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "지난주 대비", "先週比")}</p>
          </div>
        </div>
        <p className="mt-3 rounded-xl p-2.5 text-center text-xs" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
          {weekDelta > 0 ? tt(lang, `지난주보다 ${weekDelta}개 더 했어요 🔥`, `先週より ${weekDelta}個 多いです 🔥`) : weekDelta < 0 ? tt(lang, "이번 주 조금 더 힘내볼까요? 💪", "今週はもう少し頑張りましょう 💪") : tt(lang, "꾸준히 이어가고 있어요 👍", "コツコツ続けています 👍")}
          {weakCats[0] ? tt(lang, ` · 보완 추천: ${weakCats[0].emoji} ${weakCats[0].label}`, ` · 補強: ${weakCats[0].emoji} ${weakCats[0].labelJa ?? weakCats[0].label}`) : ""}
        </p>
      </div>

      {/* 업적 */}
      <Achievements accent="#4361EE" badges={[
        { emoji: "🌱", title: tt(lang, "첫걸음", "はじめの一歩"), desc: tt(lang, "단어 1개 학습", "単語1個 学習"), earned: learned >= 1 },
        { emoji: "📗", title: tt(lang, "단어 50", "単語 50"), desc: tt(lang, "50개 학습", "50個 学習"), earned: learned >= 50 },
        { emoji: "📚", title: tt(lang, "단어 200", "単語 200"), desc: tt(lang, "200개 학습", "200個 学習"), earned: learned >= 200 },
        { emoji: "🏆", title: tt(lang, "단어 400", "単語 400"), desc: tt(lang, "400개 학습", "400個 学習"), earned: learned >= 400 },
        { emoji: "🔥", title: tt(lang, "3일 연속", "3日連続"), desc: tt(lang, "스트릭 3일", "ストリーク 3日"), earned: str >= 3 },
        { emoji: "💥", title: tt(lang, "7일 연속", "7日連続"), desc: tt(lang, "스트릭 7일", "ストリーク 7日"), earned: str >= 7 },
        { emoji: "⚡", title: tt(lang, "30일 연속", "30日連続"), desc: tt(lang, "스트릭 30일", "ストリーク 30日"), earned: str >= 30 },
        { emoji: "🗣️", title: tt(lang, "회화 도전", "会話チャレンジ"), desc: tt(lang, "롤플레이 1회", "ロールプレイ 1回"), earned: rpDone >= 1 },
        { emoji: "🌟", title: tt(lang, "회화 마스터", "会話マスター"), desc: tt(lang, "롤플레이 10회", "ロールプレイ 10回"), earned: rpDone >= 10 },
        { emoji: "🎯", title: tt(lang, "모의 합격", "模試 合格"), desc: tt(lang, "모의시험 60점+", "模試 60点+"), earned: examBest >= 60 },
        { emoji: "💯", title: tt(lang, "고득점", "高得点"), desc: tt(lang, "모의시험 90점+", "模試 90点+"), earned: examBest >= 90 },
        { emoji: "⭐", title: tt(lang, "수집가", "コレクター"), desc: tt(lang, "즐겨찾기 10개+", "お気に入り 10個+"), earned: favCount >= 10 },
      ] as Badge[]} />

      {/* 약점 분석 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-1 font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "약점 분석", "弱点分析")}</p>
        <p className="mb-4 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "익힘률이 낮은 분야와 자주 틀린 단어예요.", "習得率が低い分野とよく間違える単語です。")}</p>

        <div className="space-y-2.5">
          {weakCats.map((c) => (
            <div key={c.key} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-sm" style={{ color: "var(--text-2)" }}>{c.emoji} {lang === "ja" ? (c.labelJa ?? c.label) : c.label}</span>
              <Progress value={c.pct} className="flex-1" indicatorStyle={{ background: c.pct < 34 ? "#EF4444" : c.pct < 67 ? "#F59E0B" : "#10B981" }} />
              <span className="w-14 text-right text-xs" style={{ color: "var(--text-3)" }}>{c.known}/{c.total}</span>
            </div>
          ))}
        </div>

        {lapseWords.length > 0 && (
          <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <p className="mb-2 text-sm font-semibold" style={{ color: "var(--text-2)" }}>{tt(lang, "자주 틀린 단어", "よく間違える単語")}</p>
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
        <p className="mb-4 font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "최근 2주 학습량", "直近2週間の学習量")}</p>
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
                <span className="text-[9px]" style={{ color: "var(--text-3)" }}>{(lang === "ja" ? WD_JA : WD)[d.date.getDay()]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 목표일 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="flex items-center justify-between">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "목표 시험일", "目標試験日")}</span>
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
              {tt(lang, "해제", "解除")}
            </button>
          )}
        </div>
      </div>

      {/* 설정 */}
      <div className="mb-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-4 font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "설정", "設定")}</p>

        {/* 테마 */}
        <div className="mb-4">
          <p className="mb-2 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "화면 테마", "画面テーマ")}</p>
          <div className="grid grid-cols-3 gap-1 rounded-xl p-1" style={{ background: "var(--surface)" }}>
            {([["light", tt(lang, "라이트", "ライト")], ["dark", tt(lang, "다크", "ダーク")], ["system", tt(lang, "시스템", "システム")]] as [Theme, string][]).map(([t, label]) => (
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
            <p className="text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "영어 음성 속도", "英語の音声速度")}</p>
            <button onClick={() => speakEn("Hello! How are you doing today?", rate)}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "var(--surface)", color: "var(--text-2)" }}>
              {tt(lang, "▶ 미리듣기", "▶ 試聴")} ({rate.toFixed(1)}x)
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
        <p className="mb-1 font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "진도 백업", "進捗バックアップ")}</p>
        <p className="mb-3 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "기기 이전 시 내보내고 가져오세요.", "機種変更時にエクスポート・インポート。")}</p>
        <div className="flex gap-2">
          <Button variant="surface" size="free" onClick={exportFile}
            className="flex-1 py-2.5 text-sm">
            {tt(lang, "⬇ 내보내기", "⬇ エクスポート")}
          </Button>
          <Button variant="surface" size="free" onClick={() => fileRef.current?.click()}
            className="flex-1 py-2.5 text-sm">
            {tt(lang, "⬆ 가져오기", "⬆ インポート")}
          </Button>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={importFile} className="hidden" />
        </div>
      </div>

      <button onClick={() => setConfirmReset(true)}
        className="w-full rounded-2xl py-3 text-sm font-semibold"
        style={{ color: "#EF4444" }}>
        학습 진도 초기화
      </button>

      <ConfirmDialog
        open={confirmReset}
        title="학습 진도 초기화"
        description="모든 학습 진도가 삭제되며 되돌릴 수 없어요. 정말 초기화할까요?"
        confirmLabel="초기화"
        destructive
        onConfirm={() => { onReset(); setConfirmReset(false); toast("학습 진도를 초기화했어요."); }}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
