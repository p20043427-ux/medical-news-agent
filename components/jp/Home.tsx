"use client";

import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { VERBS } from "@/lib/jp/verbs";
import { CONVERSATIONS } from "@/lib/jp/conversations";
import { type Progress as JpProgress, isKnown } from "@/lib/jp/progress";
import WordImage from "./WordImage";
import { Button, Progress } from "@/components/ui";

export default function Home({ progress, onStudyCategory, onGo, onKana, onMistakes }: {
  progress: JpProgress;
  onStudyCategory: (key: string) => void;
  onGo: (tab: "conversation" | "verbs") => void;
  onKana?: () => void;
  onMistakes?: () => void;
}) {
  const mistakeCount = progress.mistakes?.length ?? 0;
  const start = new Date(progress.startedAt);
  const dayN = Math.floor((Date.now() - start.getTime()) / 86400000) + 1;

  // 추천(아직 다 못 익힌) 카테고리를 앞으로 정렬
  const ordered = [...VOCAB_CATEGORIES].sort((a, b) => {
    const aDone = VOCAB.filter((w) => w.category === a.key).every((w) => isKnown(progress, w.id));
    const bDone = VOCAB.filter((w) => w.category === b.key).every((w) => isKnown(progress, w.id));
    return Number(aDone) - Number(bDone);
  });

  return (
    <div className="pb-28">
      {/* Day N */}
      <div className="px-5 pb-3 pt-1">
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-1)" }}>
          Day {dayN}
        </h1>
      </div>

      {/* 덱 카드 캐러셀 */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1">
        {ordered.map((cat) => {
          const words = VOCAB.filter((w) => w.category === cat.key);
          const total = words.length;
          const known = words.filter((w) => isKnown(progress, w.id)).length;
          const unknown = total - known;
          const pct = total ? Math.round((known / total) * 100) : 0;
          const est = Math.max(1, Math.round(total * 0.3));
          const first = words[0];
          const status = known === 0 ? "시작 전" : known >= total ? "완료 🎉" : `${known}/${total} 완료`;

          return (
            <div
              key={cat.key}
              className="w-[86vw] max-w-[320px] shrink-0 snap-start rounded-[28px] p-3 shadow-sm"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              {/* 레이어드 카드 스택 (덱 느낌) */}
              <div className="relative h-44 pt-2">
                {/* 뒤에 쌓인 카드들 */}
                <div className="absolute left-1/2 top-0 h-40 w-[82%] -translate-x-1/2 rounded-2xl"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }} />
                <div className="absolute left-1/2 top-1 h-40 w-[90%] -translate-x-1/2 rounded-2xl"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }} />
                {/* 앞 카드 */}
                <div className="absolute inset-x-0 top-2 mx-auto h-40 w-full overflow-hidden rounded-2xl"
                  style={{ boxShadow: "0 6px 18px rgba(0,0,0,.12)" }}>
                  <WordImage id={first.id} category={cat.key} emoji={cat.emoji} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3">
                    <p className="text-lg font-extrabold text-white">{first.word}</p>
                    <p className="truncate text-xs text-white/85">{first.reading} · {first.meaning}</p>
                  </div>
                  <span className="absolute right-2 top-2 rounded-full bg-black/35 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
                    {total}장
                  </span>
                </div>
              </div>

              {/* 세션 정보 */}
              <div className="px-1 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{cat.emoji}</span>
                    <h3 className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>스키밍</h3>
                  </div>
                  <span className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: "var(--surface)", color: "var(--text-3)" }}>
                    {cat.label}
                  </span>
                </div>

                <Progress value={pct} className="mt-3" indicatorStyle={{ background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
                <div className="mt-1.5 flex items-center justify-between text-xs" style={{ color: "var(--text-3)" }}>
                  <span>{status}</span>
                  <span>~{est}분</span>
                </div>

                <p className="pt-3 text-center text-sm" style={{ color: "var(--text-2)" }}>
                  {unknown > 0 ? <>모르는 단어 <strong style={{ color: "var(--text-1)" }}>{unknown}개</strong>를 골라주세요.</> : "모두 익혔어요! 복습해 볼까요?"}
                </p>

                <Button
                  variant="brand"
                  size="free"
                  onClick={() => onStudyCategory(cat.key)}
                  className="mt-3 w-full py-3.5 text-sm"
                >
                  바로 시작
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 빠른 이동: 회화 / 동사 */}
      <div className="mb-3 mt-7 flex items-center justify-between px-5">
        <h2 className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>더 학습하기</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5">
        <button onClick={() => onGo("conversation")}
          className="rounded-2xl p-4 text-left shadow-sm transition active:scale-95"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="grid h-11 w-11 place-items-center rounded-2xl text-xl"
            style={{ background: "linear-gradient(135deg,#a29bfe,#6c5ce7)", boxShadow: "0 4px 12px rgba(108,92,231,.3)" }}>
            💬
          </div>
          <p className="mt-3 font-bold" style={{ color: "var(--text-1)" }}>생활 회화</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{CONVERSATIONS.length}개 상황</p>
        </button>
        <button onClick={() => onGo("verbs")}
          className="rounded-2xl p-4 text-left shadow-sm transition active:scale-95"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="grid h-11 w-11 place-items-center rounded-2xl text-xl"
            style={{ background: "linear-gradient(135deg,#fd79a8,#e84393)", boxShadow: "0 4px 12px rgba(232,67,147,.3)" }}>
            🔤
          </div>
          <p className="mt-3 font-bold" style={{ color: "var(--text-1)" }}>필수 동사</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{VERBS.length}개 동사</p>
        </button>
        {onKana && (
          <button onClick={onKana}
            className="col-span-2 flex items-center gap-4 rounded-2xl p-4 text-left shadow-sm transition active:scale-95"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl"
              style={{ background: "linear-gradient(135deg,#E63946,#F4A261)", boxShadow: "0 4px 12px rgba(230,57,70,.3)" }}>
              あ
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold" style={{ color: "var(--text-1)" }}>가나 (히라가나·가타카나)</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>기초 문자 · 발음 듣기 · 퀴즈</p>
            </div>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        )}
        {onMistakes && (
          <button onClick={onMistakes}
            className="col-span-2 flex items-center gap-4 rounded-2xl p-4 text-left shadow-sm transition active:scale-95"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl"
              style={{ background: "linear-gradient(135deg,#ff7675,#d63031)", boxShadow: "0 4px 12px rgba(214,48,49,.3)" }}>
              🎯
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold" style={{ color: "var(--text-1)" }}>오답노트</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>
                {mistakeCount > 0 ? `틀린 단어 ${mistakeCount}개 · 집중 복습` : "틀린 단어를 모아 복습해요"}
              </p>
            </div>
            {mistakeCount > 0 && (
              <span className="shrink-0 rounded-full px-2 py-0.5 text-xs font-extrabold text-white" style={{ background: "#d63031" }}>
                {mistakeCount}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
