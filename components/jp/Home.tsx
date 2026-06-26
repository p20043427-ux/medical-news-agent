"use client";

import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { type Progress as JpProgress, isKnown, todayKey, dueIds } from "@/lib/jp/progress";
import { TRAVEL_PHRASEBOOK } from "@/lib/jp/phrasebook";
import { CONVERSATIONS } from "@/lib/jp/conversations";
import { speakJa } from "@/lib/jp/speech";
import { useFavorites } from "@/lib/favorites";
import { useRoleplay } from "@/lib/roleplay-progress";
import { useDailyActivity } from "@/lib/daily-activity";
import DailyMissions from "@/components/DailyMissions";
import { useUiLang, tt } from "@/lib/i18n";
import { useEffect, useState } from "react";
import WordImage from "./WordImage";
import { Button, Progress } from "@/components/ui";

const ALL_PHRASES = TRAVEL_PHRASEBOOK.flatMap((s) => s.phrases);
function dailyIndex(key: string, mod: number): number {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return mod > 0 ? h % mod : 0;
}

export default function Home({ progress, onStudyCategory, onReviewDue }: {
  progress: JpProgress;
  onStudyCategory: (key: string) => void;
  onReviewDue?: () => void;
}) {
  const lang = useUiLang();
  const dueCount = dueIds(progress).length;
  const activity = useDailyActivity("jp");
  const { has, toggle } = useFavorites("jp-phrase");
  const { data: rpData } = useRoleplay("jp-roleplay");
  const rpDone = Object.keys(rpData).length;
  const rpTotal = CONVERSATIONS.length;
  const [convRead, setConvRead] = useState(0);
  useEffect(() => { try { setConvRead((JSON.parse(localStorage.getItem("jp-conv-read") || "[]") as string[]).length); } catch { /* ignore */ } }, []);
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

  // 이어서 학습 — 가장 덜 익힌 카테고리
  const resume = ordered[0];
  const resumeWords = resume ? VOCAB.filter((w) => w.category === resume.key) : [];
  const resumeKnown = resumeWords.filter((w) => isKnown(progress, w.id)).length;

  return (
    <div className="pb-28">
      {/* 오늘의 미션 */}
      <div className="px-5 pb-2 pt-2">
        <DailyMissions accent="#E63946" missions={[
          { emoji: "📖", label: tt(lang, "단어 10개 학습", "単語10個 学習"), done: todayCount, goal: 10 },
          { emoji: "🗣️", label: tt(lang, "회화 1개 보기", "会話を1つ見る"), done: activity.conversation, goal: 1 },
          { emoji: "🎯", label: tt(lang, "롤플레이·모의시험 1회", "ロールプレイ・模試 1回"), done: activity.roleplay + activity.exam, goal: 1 },
        ]} />
      </div>

      {/* 오늘 복습할 단어 */}
      {dueCount > 0 && onReviewDue && (
        <div className="px-5 pb-2 pt-2">
          <button onClick={onReviewDue}
            className="flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg,#0984e3,#6c5ce7)" }}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: "rgba(255,255,255,.2)" }}>🔁</span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-white/80">{tt(lang, "오늘 복습", "今日の復習")}</span>
              <span className="block font-extrabold text-white">{tt(lang, `복습할 단어 ${dueCount}개`, `復習する単語 ${dueCount}個`)}</span>
              <span className="block text-xs text-white/85">{tt(lang, "간격 반복으로 지금 복습하기", "間隔反復で今すぐ復習")}</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}

      {/* 이어서 학습 */}
      {resume && (
        <div className="px-5 pb-2 pt-2">
          <button onClick={() => onStudyCategory(resume.key)}
            className="flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg,#E63946,#F4A261)" }}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: "rgba(255,255,255,.2)" }}>{resume.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-white/80">{tt(lang, "이어서 학습", "続きから学習")}</span>
              <span className="block font-extrabold text-white">{lang === "ja" ? (resume.labelJa ?? resume.label) : resume.label}</span>
              <span className="block text-xs text-white/85">{tt(lang, `${resumeKnown}/${resumeWords.length} 익힘 · 탭하여 계속`, `${resumeKnown}/${resumeWords.length} 習得・タップで続ける`)}</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}

      {/* 오늘의 목표 */}
      <div className="px-5 pb-2 pt-1">
        <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>
              {goalMet ? tt(lang, "🎉 오늘 목표 달성!", "🎉 今日の目標達成！") : tt(lang, "오늘의 목표", "今日の目標")}
            </span>
            <span className="text-sm font-bold" style={{ color: goalMet ? "#10B981" : "var(--text-2)" }}>
              {todayCount} / {goal}{tt(lang, "장", "枚")}
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
              <span className="text-xs font-extrabold" style={{ color: "#00b894" }}>{tt(lang, "🗾 오늘의 표현", "🗾 今日の表現")}</span>
              <button onClick={() => toggle(todayPhrase.jp)} aria-label={tt(lang, "즐겨찾기", "お気に入り")} className="text-lg" style={{ color: has(todayPhrase.jp) ? "#f0932b" : "var(--text-3)" }}>{has(todayPhrase.jp) ? "★" : "☆"}</button>
            </div>
            <button onClick={() => speakJa(todayPhrase.reading || todayPhrase.jp)} className="w-full text-left">
              <p className="text-lg font-extrabold leading-snug" style={{ color: "var(--text-1)" }}>{todayPhrase.jp}</p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{todayPhrase.reading}</p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{todayPhrase.ko} · {tt(lang, "🔊 눌러 듣기", "🔊 タップで再生")}</p>
            </button>
          </div>
        </div>
      )}

      {/* 회화 진행 (읽음 · 롤플레이) */}
      {(convRead > 0 || rpDone > 0) && (
        <div className="px-5 pb-2 pt-1">
          <div className="space-y-3 rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "📖 회화 읽음", "📖 会話を読んだ")}</span>
                <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{convRead} / {rpTotal}</span>
              </div>
              <Progress value={rpTotal ? (convRead / rpTotal) * 100 : 0} indicatorStyle={{ background: "linear-gradient(90deg,#10B981,#55efc4)" }} />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{tt(lang, "🗣️ 롤플레이", "🗣️ ロールプレイ")}</span>
                <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{rpDone} / {rpTotal}</span>
              </div>
              <Progress value={rpTotal ? (rpDone / rpTotal) * 100 : 0} indicatorStyle={{ background: "linear-gradient(90deg,#6c5ce7,#a29bfe)" }} />
            </div>
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
          const status = known === 0 ? tt(lang, "시작 전", "未開始") : known >= total ? tt(lang, "완료 🎉", "完了 🎉") : tt(lang, `${known}/${total} 완료`, `${known}/${total} 完了`);

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
                    {total}{tt(lang, "장", "枚")}
                  </span>
                </div>
              </div>

              {/* 세션 정보 */}
              <div className="px-1 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{cat.emoji}</span>
                    <h3 className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, "스키밍", "スキミング")}</h3>
                  </div>
                  <span className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: "var(--surface)", color: "var(--text-3)" }}>
                    {lang === "ja" ? (cat.labelJa ?? cat.label) : cat.label}
                  </span>
                </div>

                <Progress value={pct} className="mt-3" indicatorStyle={{ background: "linear-gradient(90deg,#E63946,#F4A261)" }} />
                <div className="mt-1.5 flex items-center justify-between text-xs" style={{ color: "var(--text-3)" }}>
                  <span>{status}</span>
                  <span>~{est}{tt(lang, "분", "分")}</span>
                </div>

                <p className="pt-3 text-center text-sm" style={{ color: "var(--text-2)" }}>
                  {unknown > 0
                    ? (lang === "ja"
                        ? <>知らない単語 <strong style={{ color: "var(--text-1)" }}>{unknown}個</strong>を選んでください。</>
                        : <>모르는 단어 <strong style={{ color: "var(--text-1)" }}>{unknown}개</strong>를 골라주세요.</>)
                    : tt(lang, "모두 익혔어요! 복습해 볼까요?", "全部覚えました！復習しましょう。")}
                </p>

                <Button
                  variant="brand"
                  size="free"
                  onClick={() => onStudyCategory(cat.key)}
                  className="mt-3 w-full py-3.5 text-sm"
                >
                  {tt(lang, "바로 시작", "今すぐ始める")}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
