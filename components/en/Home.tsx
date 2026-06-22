"use client";

import { EN_VOCAB, EN_CATEGORIES } from "@/lib/en/vocab";
import { type EnProgress, isLearned } from "@/lib/en/progress";
import { Button, Progress } from "@/components/ui";

const LEVEL_GRAD: Record<string, [string, string]> = {
  A1: ["#10B981", "#4361EE"],
  A2: ["#3B82F6", "#7209B7"],
  B1: ["#8B5CF6", "#4361EE"],
  B2: ["#EC4899", "#7209B7"],
  C1: ["#F59E0B", "#EF4444"],
  C2: ["#4361EE", "#7209B7"],
};

export default function EnHome({ progress, onStudyCategory, onGrammar }: {
  progress: EnProgress;
  onStudyCategory: (key: string) => void;
  onGrammar?: () => void;
}) {
  const start = new Date(progress.startedAt);
  const dayN = Math.floor((Date.now() - start.getTime()) / 86400000) + 1;

  const ordered = [...EN_CATEGORIES].sort((a, b) => {
    const aDone = EN_VOCAB.filter((w) => w.category === a.key).every((w) => isLearned(progress, w.id));
    const bDone = EN_VOCAB.filter((w) => w.category === b.key).every((w) => isLearned(progress, w.id));
    return Number(aDone) - Number(bDone);
  });

  return (
    <div className="pb-28">
      <div className="px-5 pb-3 pt-1">
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-1)" }}>
          Day {dayN}
        </h1>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1">
        {ordered.map((cat) => {
          const words = EN_VOCAB.filter((w) => w.category === cat.key);
          const total = words.length;
          const learned = words.filter((w) => isLearned(progress, w.id)).length;
          const unknown = total - learned;
          const pct = total ? Math.round((learned / total) * 100) : 0;
          const est = Math.max(1, Math.round(total * 0.3));
          const first = words[0];
          const status = learned === 0 ? "시작 전" : learned >= total ? "완료 🎉" : `${learned}/${total} 완료`;
          const grad = LEVEL_GRAD[first?.cefrLevel] ?? ["#4361EE", "#7209B7"];

          return (
            <div key={cat.key} className="w-[300px] shrink-0 snap-start rounded-[28px] p-3 shadow-sm"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              {/* 레이어드 카드 스택 */}
              <div className="relative h-44 pt-2">
                <div className="absolute left-1/2 top-0 h-40 w-[82%] -translate-x-1/2 rounded-2xl"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }} />
                <div className="absolute left-1/2 top-1 h-40 w-[90%] -translate-x-1/2 rounded-2xl"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }} />
                <div className="absolute inset-x-0 top-2 mx-auto h-40 w-full overflow-hidden rounded-2xl"
                  style={{ boxShadow: "0 6px 18px rgba(0,0,0,.12)", background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}>
                  <div className="absolute right-3 top-3 text-5xl opacity-25 select-none">{cat.emoji}</div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                    <p className="text-xl font-extrabold text-white">{first?.word}</p>
                    <p className="truncate text-xs text-white/85">{first?.pronunciation} · {first?.meaning}</p>
                  </div>
                  <span className="absolute right-2 top-2 rounded-full bg-black/35 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
                    {total}장
                  </span>
                </div>
              </div>

              <div className="px-1 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{cat.emoji}</span>
                    <h3 className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>{cat.label}</h3>
                  </div>
                  <span className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: "var(--surface)", color: "var(--text-3)" }}>
                    {cat.cefrRange}
                  </span>
                </div>

                <Progress value={pct} className="mt-3" indicatorStyle={{ background: "linear-gradient(90deg,#4361EE,#7209B7)" }} />
                <div className="mt-1.5 flex items-center justify-between text-xs" style={{ color: "var(--text-3)" }}>
                  <span>{status}</span>
                  <span>~{est}분</span>
                </div>

                <p className="pt-3 text-center text-sm" style={{ color: "var(--text-2)" }}>
                  {unknown > 0 ? <>모르는 단어 <strong style={{ color: "var(--text-1)" }}>{unknown}개</strong>를 골라주세요.</> : "모두 익혔어요! 복습해 볼까요?"}
                </p>

                <Button variant="accent" size="free" onClick={() => onStudyCategory(cat.key)}
                  className="mt-3 w-full py-3.5 text-sm">
                  바로 시작
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-3 mt-7 px-5">
        <h2 className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>더 학습하기</h2>
      </div>
      <div className="px-5">
        <button onClick={onGrammar}
          className="flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-95"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <span className="text-2xl">📖</span>
          <div>
            <p className="font-bold" style={{ color: "var(--text-1)" }}>문법 · 구동사</p>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>핵심 문법과 구동사를 한 번에</p>
          </div>
          <svg viewBox="0 0 24 24" className="ml-auto h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-3)" }}><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}
