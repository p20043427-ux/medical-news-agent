"use client";

import { useMemo } from "react";
import { VOCAB } from "@/lib/jp/vocab";
import Furigana from "./Furigana";
import SpeakerButton from "./SpeakerButton";
import { Button } from "@/components/ui";

export default function MistakesView({
  mistakes,
  showFurigana,
  onReview,
  onQuiz,
  onBack,
}: {
  mistakes: string[];
  showFurigana: boolean;
  onReview: (ids: string[]) => void;
  onQuiz: (ids: string[]) => void;
  onBack?: () => void;
}) {
  const words = useMemo(
    () => VOCAB.filter((w) => mistakes.includes(w.id)),
    [mistakes],
  );
  const ids = words.map((w) => w.id);

  return (
    <div className="px-4 pb-28 pt-2">
      <div className="mb-3 flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="뒤로"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--surface)", color: "var(--text-2)" }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>오답노트</h1>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>틀린 단어를 모아 집중 복습해요 · {words.length}개</p>
        </div>
      </div>

      {words.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <div className="text-5xl">🎯</div>
          <p className="font-bold" style={{ color: "var(--text-1)" }}>아직 오답이 없어요</p>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            복습·퀴즈에서 틀린 단어가 여기에 모여요.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 grid grid-cols-2 gap-2.5">
            <Button variant="brand" size="free" onClick={() => onReview(ids)} className="py-3.5">
              🔁 오답 복습
            </Button>
            <Button variant="surface" size="free" onClick={() => onQuiz(ids)} className="py-3.5">
              📝 오답 퀴즈
            </Button>
          </div>

          <div className="space-y-2.5">
            {words.map((w) => (
              <div
                key={w.id}
                className="flex items-center gap-3 rounded-2xl p-3.5"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold" style={{ color: "var(--text-1)" }}>{w.word}</span>
                    <span className="text-xs" style={{ color: "var(--text-3)" }}>[{w.reading}]</span>
                  </div>
                  <p className="truncate text-sm" style={{ color: "var(--text-2)" }}>{w.meaning}</p>
                  <p className="mt-0.5 truncate text-xs" style={{ color: "var(--text-3)" }}>
                    <Furigana tokens={w.example.tokens} showFurigana={showFurigana} />
                  </p>
                </div>
                <SpeakerButton text={w.reading} size={34} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
