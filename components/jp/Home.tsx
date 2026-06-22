"use client";

import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { type Progress as JpProgress, isKnown, todayKey } from "@/lib/jp/progress";
import { TRAVEL_PHRASEBOOK } from "@/lib/jp/phrasebook";
import { speakJa } from "@/lib/jp/speech";
import { useFavorites } from "@/lib/favorites";
import WordImage from "./WordImage";
import { Button, Progress } from "@/components/ui";

const ALL_PHRASES = TRAVEL_PHRASEBOOK.flatMap((s) => s.phrases);
function dailyIndex(key: string, mod: number): number {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return mod > 0 ? h % mod : 0;
}

export default function Home({ progress, onStudyCategory }: {
  progress: JpProgress;
  onStudyCategory: (key: string) => void;
}) {
  const { has, toggle } = useFavorites("jp-phrase");
  const todayPhrase = ALL_PHRASES[dailyIndex(todayKey(), ALL_PHRASES.length)];
  const goal = progress.dailyGoal ?? 20;
  const todayCount = progress.daily?.[todayKey()] ?? 0;
  const goalPct = Math.min((todayCount / goal) * 100, 100);
  const goalMet = todayCount >= goal;
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
      {/* 오늘의 목표 */}
      <div className="px-5 pb-2 pt-1">
        <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>
              {goalMet ? "🎉 오늘 목표 달성!" : "오늘의 목표"}
            </span>
            <span className="text-sm font-bold" style={{ color: goalMet ? "#10B981" : "var(--text-2)" }}>
              {todayCount} / {goal}장
            </span>
          </div>
          <Progress
            value={goalPct}
            indicatorStyle={{ background: goalMet ? "#10B981" : "linear-gradient(90deg,#E63946,#F4A261)" }}
          />
        </div>
      </div>

      {/* 오늘의 표현 */}
      {todayPhrase && (
        <div className="px-5 pb-2 pt-1">
          <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#00b89412,#00cec912)", border: "1px solid var(--border)" }}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-extrabold" style={{ color: "#00b894" }}>🗾 오늘의 표현</span>
              <button onClick={() => toggle(todayPhrase.jp)} aria-label="즐겨찾기" className="text-lg" style={{ color: has(todayPhrase.jp) ? "#f0932b" : "var(--text-3)" }}>{has(todayPhrase.jp) ? "★" : "☆"}</button>
            </div>
            <button onClick={() => speakJa(todayPhrase.reading || todayPhrase.jp)} className="w-full text-left">
              <p className="text-lg font-extrabold leading-snug" style={{ color: "var(--text-1)" }}>{todayPhrase.jp}</p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{todayPhrase.reading}</p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{todayPhrase.ko} · 🔊 눌러 듣기</p>
            </button>
          </div>
        </div>
      )}

      {/* Day N */}
      <div className="px-5 pb-3 pt-1">
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-1)" }}>
          Day {dayN}
        </h1>
      </div>

      {/* 덱 카드 캐러셀 — 중앙 정렬(양쪽 대칭 peek) */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-[7%] pb-1">
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
              className="w-[86%] shrink-0 snap-center rounded-[28px] p-3 shadow-sm"
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

    </div>
  );
}
