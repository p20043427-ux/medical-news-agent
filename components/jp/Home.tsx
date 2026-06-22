"use client";

import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { VERBS } from "@/lib/jp/verbs";
import { CONVERSATIONS } from "@/lib/jp/conversations";
import { type Progress, isKnown } from "@/lib/jp/progress";
import WordImage from "./WordImage";

export default function Home({ progress, onStudyCategory, onGo }: {
  progress: Progress;
  onStudyCategory: (key: string) => void;
  onGo: (tab: "conversation" | "verbs") => void;
}) {
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
              className="w-[300px] shrink-0 snap-start rounded-[28px] p-3 shadow-sm"
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

                <div className="progress-bar mt-3">
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs" style={{ color: "var(--text-3)" }}>
                  <span>{status}</span>
                  <span>~{est}분</span>
                </div>

                <p className="pt-3 text-center text-sm" style={{ color: "var(--text-2)" }}>
                  {unknown > 0 ? <>모르는 단어 <strong style={{ color: "var(--text-1)" }}>{unknown}개</strong>를 골라주세요.</> : "모두 익혔어요! 복습해 볼까요?"}
                </p>

                <button
                  onClick={() => onStudyCategory(cat.key)}
                  className="mt-3 w-full rounded-2xl py-3.5 text-sm font-bold transition active:scale-[0.98]"
                  style={{ background: "var(--text-1)", color: "var(--card)" }}
                >
                  바로 시작
                </button>
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
          <span className="text-2xl">💬</span>
          <p className="mt-2 font-bold" style={{ color: "var(--text-1)" }}>생활 회화</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{CONVERSATIONS.length}개 상황</p>
        </button>
        <button onClick={() => onGo("verbs")}
          className="rounded-2xl p-4 text-left shadow-sm transition active:scale-95"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <span className="text-2xl">🔤</span>
          <p className="mt-2 font-bold" style={{ color: "var(--text-1)" }}>필수 동사</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{VERBS.length}개 동사</p>
        </button>
      </div>
    </div>
  );
}
