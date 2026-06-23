"use client";

import { useState } from "react";
import Wordbook from "./Wordbook";
import MistakesView from "./MistakesView";
import { Segmented } from "@/components/ui/segmented";
import { useUiLang, tt } from "@/lib/i18n";

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
  const lang = useUiLang();
  const [sub, setSub] = useState<"wordbook" | "mistakes">("wordbook");

  return (
    <div>
      {/* 서브 탭 */}
      <div className="px-4 pt-3">
        <Segmented
          value={sub}
          onChange={setSub}
          accent="#E63946"
          options={[
            { value: "wordbook", label: tt(lang, `📚 단어장 (${bookmarks.length})`, `📚 単語帳 (${bookmarks.length})`) },
            { value: "mistakes", label: tt(lang, `🎯 오답노트 (${mistakes.length})`, `🎯 間違いノート (${mistakes.length})`) },
          ]}
        />
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
