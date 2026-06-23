"use client";

import { useMemo, useState } from "react";
import { KO_VOCAB, KO_CATEGORIES } from "@/lib/ko/vocab";
import type { KoWord } from "@/lib/ko/types";
import { type KoProgress, type KoGrade, isKoLearned } from "@/lib/ko/progress";
import { speakKo } from "@/lib/ko/speech";
import { tt, type UiLang } from "@/lib/i18n";
import { Button } from "@/components/ui";

const GRADES: { g: KoGrade; ko: string; ja: string; bg: string }[] = [
  { g: "again", ko: "다시", ja: "もう一度", bg: "#EF4444" },
  { g: "hard", ko: "어려움", ja: "難しい", bg: "#F97316" },
  { g: "good", ko: "좋음", ja: "普通", bg: "#3B82F6" },
  { g: "easy", ko: "쉬움", ja: "簡単", bg: "#10B981" },
];

export default function KoStudyView({ progress, lang, onGrade }: {
  progress: KoProgress;
  lang: UiLang;
  onGrade: (id: string, g: KoGrade) => void;
}) {
  const [cat, setCat] = useState<string | null>(null);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const cats = useMemo(() => KO_CATEGORIES.filter((c) => KO_VOCAB.some((w) => w.category === c.key)), []);
  const words = useMemo<KoWord[]>(() => (cat ? KO_VOCAB.filter((w) => w.category === cat) : []), [cat]);
  const word = words[pos];

  function start(key: string) { setCat(key); setPos(0); setRevealed(false); }
  function handleGrade(g: KoGrade) {
    if (word) onGrade(word.id, g);
    setRevealed(false);
    setPos((p) => p + 1);
  }

  // 카테고리 선택
  if (!cat) {
    return (
      <div className="px-4 pb-28 pt-3">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "단어 학습", "単語学習")}</h1>
        <p className="mb-4 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, "카테고리를 골라 학습해요.", "カテゴリーを選んで学習しましょう。")}</p>
        <div className="grid grid-cols-2 gap-3">
          {cats.map((c) => {
            const ws = KO_VOCAB.filter((w) => w.category === c.key);
            const known = ws.filter((w) => isKoLearned(progress, w.id)).length;
            return (
              <button key={c.key} onClick={() => start(c.key)}
                className="rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="text-2xl">{c.emoji}</div>
                <p className="mt-1.5 font-bold" style={{ color: "var(--text-1)" }}>{lang === "ja" ? c.labelJa : c.label}</p>
                <p className="text-xs" style={{ color: "var(--text-3)" }}>{known}/{ws.length} · TOPIK</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 세션 종료
  if (!word) {
    return (
      <div className="px-5 pb-28 pt-16 text-center">
        <div className="animate-reward text-6xl">🎉</div>
        <p className="mt-3 text-xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "학습 완료!", "学習完了！")}</p>
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{words.length}{tt(lang, "개 카드를 봤어요.", "枚のカードを見ました。")}</p>
        <div className="mx-auto mt-6 grid max-w-xs gap-2.5">
          <Button variant="brand" size="free" onClick={() => start(cat)} className="py-3" style={{ background: "#2563EB" }}>{tt(lang, "다시 학습", "もう一度")}</Button>
          <Button variant="surface" size="free" onClick={() => setCat(null)} className="py-3">{tt(lang, "카테고리 선택", "カテゴリー選択")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pb-28 pt-3">
      <div className="mb-3 flex items-center justify-between">
        <button onClick={() => setCat(null)} aria-label={tt(lang, "뒤로", "戻る")} className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{pos + 1} / {words.length}</span>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(pos / words.length) * 100}%`, background: "#2563EB" }} />
      </div>

      <div
        role="button" tabIndex={0}
        onClick={() => !revealed && setRevealed(true)}
        onKeyDown={(e) => { if (!revealed && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setRevealed(true); } }}
        className="flex min-h-[320px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl p-8 text-center shadow-xl"
        style={{ background: "var(--card)" }}>
        <div className="flex items-center gap-2">
          <h2 className="text-4xl font-extrabold" style={{ color: "#2563EB" }}>{word.word}</h2>
          <button onClick={(e) => { e.stopPropagation(); speakKo(word.word); }} aria-label={tt(lang, "발음", "発音")}
            className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>🔊</button>
        </div>
        <p className="font-mono text-sm" style={{ color: "var(--text-3)" }}>{word.romaja}</p>

        {revealed ? (
          <div className="mt-2 w-full space-y-3">
            <p className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>{word.meaning}</p>
            <div className="rounded-2xl p-4 text-left" style={{ background: "var(--surface)" }}>
              <p className="text-lg" style={{ color: "var(--text-1)" }}>{word.example.ko}</p>
              <p className="mt-1 font-mono text-xs" style={{ color: "var(--text-3)" }}>{word.example.ja}</p>
            </div>
          </div>
        ) : (
          <p className="mt-3 rounded-full px-4 py-2 text-sm" style={{ background: "var(--surface)", color: "var(--text-3)" }}>{tt(lang, "탭하면 뜻이 보여요", "タップで意味を表示")}</p>
        )}
      </div>

      {revealed && (
        <div className="mt-5 grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button key={g.g} onClick={() => handleGrade(g.g)} className="rounded-2xl py-3 text-sm font-bold text-white" style={{ background: g.bg }}>
              {lang === "ja" ? g.ja : g.ko}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
