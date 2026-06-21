"use client";

import { useEffect, useState } from "react";
import { VOCAB, VOCAB_CATEGORIES } from "@/lib/jp/vocab";
import { useProgress } from "@/lib/jp/progress";
import Home from "./Home";
import VocabStudy from "./VocabStudy";
import ConversationView from "./ConversationView";
import VerbView from "./VerbView";
import BottomNav, { type Tab } from "./BottomNav";

const FURIGANA_KEY = "jp-app-furigana";

export default function JapaneseApp() {
  const { progress, ready, markWord } = useProgress();
  const [tab, setTab] = useState<Tab>("home");
  const [studyCat, setStudyCat] = useState<string | null>(null);
  const [showFurigana, setShowFurigana] = useState(true);

  // 후리가나 설정 로드/저장
  useEffect(() => {
    const saved = window.localStorage.getItem(FURIGANA_KEY);
    if (saved !== null) setShowFurigana(saved === "1");
  }, []);
  const toggleFurigana = () =>
    setShowFurigana((s) => {
      const next = !s;
      window.localStorage.setItem(FURIGANA_KEY, next ? "1" : "0");
      return next;
    });

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center text-slate-400">
        <div className="animate-pulse text-3xl">🌸</div>
      </div>
    );
  }

  // 단어 학습 화면
  if (studyCat) {
    const category = VOCAB_CATEGORIES.find((c) => c.key === studyCat)!;
    const words = VOCAB.filter((w) => w.category === studyCat);
    return (
      <main className="mx-auto min-h-screen max-w-md bg-[#f5f6f8]">
        <VocabStudy
          category={category}
          words={words}
          showFurigana={showFurigana}
          onToggleFurigana={toggleFurigana}
          onMark={markWord}
          onExit={() => setStudyCat(null)}
        />
        <BottomNav
          tab="home"
          onChange={(t) => {
            setStudyCat(null);
            setTab(t);
          }}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-md bg-[#f5f6f8]">
      {tab === "home" && (
        <Home
          progress={progress}
          onStudyCategory={(key) => setStudyCat(key)}
          onGo={(t) => setTab(t)}
        />
      )}
      {tab === "conversation" && (
        <ConversationView
          showFurigana={showFurigana}
          onToggleFurigana={toggleFurigana}
        />
      )}
      {tab === "verbs" && <VerbView showFurigana={showFurigana} />}

      <BottomNav tab={tab} onChange={setTab} />
    </main>
  );
}
