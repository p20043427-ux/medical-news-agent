"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui";
import { useUiLang, tt } from "@/lib/i18n";

export interface DictItem { audio: string; text: string; ko?: string }

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

// 받아쓰기 — 문장을 듣고(자동재생) 들은 문장을 고른다. (JP·EN 공용)
export default function Dictation({ items, speak, accent, onExit }: {
  items: DictItem[];
  speak: (t: string) => void;
  accent: string;
  onExit: () => void;
}) {
  const lang = useUiLang();
  const questions = useMemo(() => shuffle(items).slice(0, 10).map((it) => ({
    ...it,
    options: shuffle([it.text, ...shuffle(items.filter((x) => x.text !== it.text).map((x) => x.text)).slice(0, 3)]),
  })), [items]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const q = questions[idx];

  useEffect(() => { if (q) speak(q.audio); /* eslint-disable-next-line */ }, [idx]);

  if (idx >= questions.length) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="px-5 pb-28 pt-10 text-center">
        <div className="animate-reward text-6xl">{pct >= 80 ? "🎉" : "💪"}</div>
        <p className="mt-2 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{score} / {questions.length}</p>
        <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>{tt(lang, `받아쓰기 완료 · ${pct}점`, `ディクテーション完了 · ${pct}点`)}</p>
        <div className="mx-auto mt-6 grid max-w-xs gap-2.5">
          <Button variant="brand" size="free" onClick={() => { setIdx(0); setPicked(null); setScore(0); }} className="py-3" style={{ background: accent }}>{tt(lang, "다시 풀기", "もう一度")}</Button>
          <Button variant="surface" size="free" onClick={onExit} className="py-3">{tt(lang, "학습 메뉴로", "学習メニューへ")}</Button>
        </div>
      </div>
    );
  }

  function choose(o: string) { if (picked) return; setPicked(o); if (o === q.text) setScore((s) => s + 1); }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 pb-28 pt-3">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: accent }}>{tt(lang, "받아쓰기", "ディクテーション")}</span>
        <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{idx + 1} / {questions.length}</span>
      </div>

      <div className="rounded-3xl p-6 text-center shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "잘 듣고 들은 문장을 고르세요", "よく聞いて、聞こえた文を選んでください")}</p>
        <button onClick={() => speak(q.audio)} aria-label={tt(lang, "다시 듣기", "もう一度聞く")} className="mx-auto mt-3 grid h-20 w-20 place-items-center rounded-full text-3xl text-white" style={{ background: accent }}>🔊</button>
        <p className="mt-2 text-xs" style={{ color: "var(--text-3)" }}>{tt(lang, "다시 들으려면 탭", "もう一度聞くにはタップ")}</p>
      </div>

      <div className="mt-5 grid gap-2.5">
        {q.options.map((o) => {
          const show = picked !== null;
          const isAns = o === q.text;
          const style = show
            ? isAns ? { borderColor: "#10B981", background: "#10B98112", color: "var(--text-1)" }
              : o === picked ? { borderColor: "#E63946", background: "#E6394612", color: "var(--text-1)" }
                : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-3)" }
            : { borderColor: "var(--border)", background: "var(--card)", color: "var(--text-1)" };
          return (
            <button key={o} onClick={() => choose(o)} disabled={show}
              className="rounded-2xl border-2 px-5 py-3.5 text-left text-sm font-semibold transition active:scale-[0.99]" style={style}>{o}</button>
          );
        })}
      </div>
      {picked !== null && q.ko && (
        <p className="mt-3 text-center text-sm" style={{ color: "var(--text-3)" }}>{q.ko}</p>
      )}

      <div className="mt-auto pt-6">
        <Button variant="brand" size="free" onClick={() => { setPicked(null); setIdx((i) => i + 1); }} disabled={picked === null} className="w-full py-4" style={{ background: accent }}>
          {idx + 1 >= questions.length ? tt(lang, "결과 보기", "結果を見る") : tt(lang, "다음", "次へ")}
        </Button>
      </div>
    </div>
  );
}
