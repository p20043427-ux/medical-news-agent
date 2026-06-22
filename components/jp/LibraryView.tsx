"use client";

import { useState } from "react";
import Wordbook from "./Wordbook";
import MistakesView from "./MistakesView";

export default function LibraryView({
  bookmarks,
  mistakes,
  showFurigana,
  onToggleBookmark,
  onStudyWordbook,
  onReviewMistakes,
  onQuizMistakes,
}: {
  bookmarks: string[];
  mistakes: string[];
  showFurigana: boolean;
  onToggleBookmark: (id: string) => void;
  onStudyWordbook: (ids: string[]) => void;
  onReviewMistakes: (ids: string[]) => void;
  onQuizMistakes: (ids: string[]) => void;
}) {
  const [sub, setSub] = useState<"wordbook" | "mistakes">("wordbook");

  return (
    <div>
      {/* 서브 탭 */}
      <div className="px-4 pt-3">
        <div className="flex rounded-2xl p-1 gap-1" style={{ background: "var(--surface)" }}>
          {([["wordbook", `📚 단어장 (${bookmarks.length})`], ["mistakes", `🎯 오답노트 (${mistakes.length})`]] as ["wordbook" | "mistakes", string][]).map(([s, label]) => (
            <button
              key={s}
              onClick={() => setSub(s)}
              className="flex-1 rounded-xl py-2.5 text-sm font-bold transition"
              style={sub === s ? { background: "#E63946", color: "#fff" } : { color: "var(--text-3)" }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {sub === "wordbook" ? (
        <Wordbook
          bookmarks={bookmarks}
          showFurigana={showFurigana}
          onToggleBookmark={onToggleBookmark}
          onStudy={onStudyWordbook}
        />
      ) : (
        <MistakesView
          mistakes={mistakes}
          showFurigana={showFurigana}
          onReview={onReviewMistakes}
          onQuiz={onQuizMistakes}
        />
      )}
    </div>
  );
}
