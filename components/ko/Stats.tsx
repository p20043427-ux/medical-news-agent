"use client";

import { KO_VOCAB } from "@/lib/ko/vocab";
import { koLearnedCount, koStreak, koDueIds, todayKey, type KoProgress } from "@/lib/ko/progress";
import { ConfirmDialog } from "@/components/ui";
import { useState } from "react";
import { tt, type UiLang } from "@/lib/i18n";

const ACCENT = "#2563EB";

export default function KoStats({ progress, lang, onReset }: { progress: KoProgress; lang: UiLang; onReset: () => void }) {
  const [confirm, setConfirm] = useState(false);
  const learned = koLearnedCount(progress);
  const total = KO_VOCAB.length;
  const streak = koStreak(progress);
  const due = koDueIds(progress).length;
  const reviews = Object.values(progress.cards).reduce((s, c) => s + c.reps, 0);
  const pct = total ? Math.round((learned / total) * 100) : 0;

  const WD = ["일", "월", "화", "수", "목", "금", "토"];
  const WD_JA = ["日", "月", "火", "水", "木", "金", "土"];
  const now = new Date();
  const week = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now); d.setDate(now.getDate() - (13 - i));
    return { d, n: progress.daily?.[todayKey(d)] ?? 0 };
  });
  const maxN = Math.max(1, ...week.map((w) => w.n));

  const badges: { emoji: string; label: [string, string]; on: boolean }[] = [
    { emoji: "🌱", label: ["첫 단어", "最初の単語"], on: learned >= 1 },
    { emoji: "📚", label: ["10단어", "10語"], on: learned >= 10 },
    { emoji: "💯", label: ["50단어", "50語"], on: learned >= 50 },
    { emoji: "🏆", label: ["100단어", "100語"], on: learned >= 100 },
    { emoji: "🔥", label: ["3일 연속", "3日連続"], on: streak >= 3 },
    { emoji: "⚡", label: ["7일 연속", "7日連続"], on: streak >= 7 },
    { emoji: "🎯", label: ["복습 50회", "復習50回"], on: reviews >= 50 },
    { emoji: "👑", label: ["XP 500", "XP 500"], on: progress.xp >= 500 },
  ];

  const stat = (v: string | number, label: string, c: string) => (
    <div className="rounded-2xl p-4 text-center shadow-sm" style={{ background: "var(--card)" }}>
      <p className="text-2xl font-extrabold tabular-nums" style={{ color: c }}>{v}</p>
      <p className="mt-1 text-xs" style={{ color: "var(--text-3)" }}>{label}</p>
    </div>
  );

  return (
    <div className="px-4 pb-28 pt-3">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "학습 분석", "学習分析")}</h1>
      <p className="mb-4 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "한국어 학습 현황이에요.", "韓国語の学習状況です。")}</p>

      <div className="grid grid-cols-3 gap-3">
        {stat(`🔥${streak}`, tt(lang, "연속 학습일", "連続学習日"), "#F97316")}
        {stat(learned, tt(lang, "학습 단어", "覚えた単語"), ACCENT)}
        {stat(reviews, tt(lang, "총 복습 수", "総復習数"), "#10B981")}
      </div>

      <div className="mt-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <div className="mb-2 flex items-end justify-between">
          <span className="font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "전체 진도", "全体の進捗")}</span>
          <span className="text-sm tabular-nums" style={{ color: "var(--text-3)" }}>{learned} / {total} · {pct}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#2563EB,#7C3AED)" }} />
        </div>
        <p className="mt-2 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, `오늘 복습 ${due}개 · 누적 XP ${progress.xp}`, `今日の復習 ${due}個 · 累計XP ${progress.xp}`)}</p>
      </div>

      {/* 최근 2주 학습량 */}
      <div className="mt-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-3 font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "최근 2주 학습량", "直近2週間の学習量")}</p>
        <div className="flex items-end justify-between gap-1" style={{ height: 80 }}>
          {week.map((w, i) => (
            <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
              <div className="w-full rounded-t" style={{ height: `${(w.n / maxN) * 64}px`, minHeight: w.n > 0 ? 4 : 0, background: w.n > 0 ? ACCENT : "transparent" }} />
              <span className="text-[9px]" style={{ color: "var(--text-3)" }}>{(lang === "ja" ? WD_JA : WD)[w.d.getDay()]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 업적 */}
      <div className="mt-4 rounded-3xl p-5 shadow-sm" style={{ background: "var(--card)" }}>
        <p className="mb-3 font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "업적", "実績")}</p>
        <div className="grid grid-cols-4 gap-2.5">
          {badges.map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-1 rounded-2xl p-2 text-center"
              style={{ background: "var(--surface)", opacity: b.on ? 1 : 0.35 }}>
              <span className="text-2xl">{b.emoji}</span>
              <span className="text-[10px] font-semibold leading-tight" style={{ color: "var(--text-2)" }}>{tt(lang, b.label[0], b.label[1])}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setConfirm(true)} className="mt-4 w-full rounded-2xl py-3 text-sm font-bold"
        style={{ background: "var(--surface)", color: "#EF4444" }}>{tt(lang, "학습 기록 초기화", "学習記録をリセット")}</button>

      <ConfirmDialog open={confirm} destructive
        title={tt(lang, "학습 기록을 초기화할까요?", "学習記録をリセットしますか？")}
        description={tt(lang, "모든 진도·복습·XP가 삭제되며 되돌릴 수 없어요.", "すべての進捗・復習・XPが削除され、元に戻せません。")}
        confirmLabel={tt(lang, "초기화", "リセット")} cancelLabel={tt(lang, "취소", "キャンセル")}
        onConfirm={() => { onReset(); setConfirm(false); }} onCancel={() => setConfirm(false)} />
    </div>
  );
}
