"use client";

import { useState, useMemo } from "react";
import { TRAVEL_PHRASES } from "@/lib/travel/phrases";
import SpeakerButton from "@/components/jp/SpeakerButton";

// 긴급 카테고리를 맨 앞으로 정렬 (이미 첫 번째이지만 방어적으로 처리)
const SORTED_PHRASES = [
  ...TRAVEL_PHRASES.filter((s) => s.key === "emergency"),
  ...TRAVEL_PHRASES.filter((s) => s.key !== "emergency"),
];

export default function PhraseView() {
  const [cat, setCat] = useState("emergency");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const activeSection = SORTED_PHRASES.find((s) => s.key === cat)!;

  // 검색어가 있으면 전 카테고리에서 필터링, 없으면 선택 카테고리 표시
  const filteredPhrases = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeSection.phrases;
    const allPhrases = SORTED_PHRASES.flatMap((s) =>
      s.phrases.map((p) => ({ ...p, _sectionTitle: s.title, _sectionKey: s.key }))
    );
    return allPhrases.filter(
      (p) =>
        p.ko.toLowerCase().includes(q) ||
        p.jp.includes(query.trim()) ||
        p.reading.includes(query.trim()) ||
        (p.note && p.note.toLowerCase().includes(q))
    );
  }, [query, activeSection]);

  async function handleCopy(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // clipboard API 실패 시 조용히 무시
    }
  }

  const isSearching = query.trim().length > 0;

  return (
    <div className="flex min-h-0 flex-col">
      {/* 검색바 */}
      <div
        className="sticky top-0 z-20 px-4 pt-2.5"
        style={{ background: "var(--bg)" }}
      >
        <div
          className="flex items-center gap-2 rounded-[10px] px-3 py-2"
          style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}
        >
          {/* 돋보기 아이콘 */}
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="var(--text-3)"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 flex-shrink-0"
          >
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M14 14l3 3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="한국어 또는 일본어로 검색..."
            className="flex-1 border-none bg-transparent text-sm leading-snug outline-none"
            style={{ color: "var(--text-1)" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="검색어 지우기"
              className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center border-none bg-transparent"
              style={{ color: "var(--text-3)" }}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="h-3.5 w-3.5"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 카테고리 칩 — 검색 중이면 숨김 */}
      {!isSearching && (
        <div
          className="sticky z-[15] flex gap-2 overflow-x-auto px-4 py-2.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none]"
          style={{
            top: 54,
            borderBottom: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          {SORTED_PHRASES.map((section) => {
            const isActive = section.key === cat;
            const isEmergency = section.key === "emergency";
            return (
              <button
                key={section.key}
                onClick={() => setCat(section.key)}
                className="flex min-h-[40px] flex-shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] transition-all"
                style={{
                  border: isActive
                    ? isEmergency
                      ? "1.5px solid #e53e3e"
                      : "1.5px solid #0EA5E9"
                    : isEmergency
                    ? "1.5px solid #feb2b2"
                    : "1.5px solid var(--border)",
                  background: isActive
                    ? isEmergency
                      ? "#e53e3e"
                      : "#0EA5E9"
                    : isEmergency
                    ? "#fff5f5"
                    : "var(--surface)",
                  color: isActive
                    ? "#fff"
                    : isEmergency
                    ? "#c53030"
                    : "var(--text-2)",
                  fontWeight: isActive || isEmergency ? 600 : 400,
                }}
              >
                <span>{section.emoji}</span>
                <span>{section.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 검색 결과 헤더 */}
      {isSearching && (
        <div
          className="px-4 pb-1 pt-2 text-xs"
          style={{ color: "var(--text-3)", borderBottom: "1px solid var(--border)" }}
        >
          {filteredPhrases.length > 0
            ? `${filteredPhrases.length}개 결과`
            : "검색 결과가 없어요"}
        </div>
      )}

      {/* Phrase 목록 */}
      <div className="flex flex-col">
        {(filteredPhrases as (typeof SORTED_PHRASES[0]["phrases"][0] & { _sectionTitle?: string; _sectionKey?: string })[]).map((phrase, idx) => {
          const cardId = `${isSearching ? phrase._sectionKey ?? cat : cat}-${idx}`;
          const isCopied = copied === cardId;
          const lastIdx = filteredPhrases.length - 1;

          return (
            <div
              key={cardId}
              className="flex items-start gap-3 px-4 py-3.5 transition-colors"
              style={{
                borderBottom: idx < lastIdx ? "1px solid var(--border)" : "none",
                background: "var(--bg)",
              }}
            >
              {/* 텍스트 영역 */}
              <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                {/* 검색 중일 때 카테고리 뱃지 */}
                {isSearching && phrase._sectionTitle && (
                  <span
                    className="mb-0.5 inline-block text-[11px]"
                    style={{ color: "var(--text-3)" }}
                  >
                    {phrase._sectionTitle}
                  </span>
                )}

                {/* 한국어 */}
                <p
                  className="m-0 text-xs leading-normal"
                  style={{ color: "var(--text-2)" }}
                >
                  {phrase.ko}
                </p>

                {/* 일본어 — 탭/클릭으로 클립보드 복사 */}
                <button
                  onClick={() => handleCopy(phrase.jp, cardId)}
                  title="탭하여 복사"
                  className="flex w-fit min-h-[40px] cursor-pointer items-center gap-1.5 [all:unset]"
                >
                  <p
                    className="m-0 break-all text-[19px] font-bold leading-snug transition-colors"
                    style={{ color: isCopied ? "#0EA5E9" : "var(--text-1)" }}
                  >
                    {isCopied ? "복사됨!" : phrase.jp}
                  </p>
                  {/* 복사 아이콘 */}
                  {!isCopied && (
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="var(--text-3)"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-[13px] w-[13px] flex-shrink-0 opacity-60"
                    >
                      <rect x="5" y="5" width="8" height="8" rx="1.5" />
                      <path d="M3 11H2.5A1.5 1.5 0 0 1 1 9.5v-7A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5V3" />
                    </svg>
                  )}
                  {isCopied && (
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="#0EA5E9"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 flex-shrink-0"
                    >
                      <path d="M2.5 8.5l3.5 3.5 7-8" />
                    </svg>
                  )}
                </button>

                {/* 히라가나 읽기 */}
                <p
                  className="m-0 text-xs leading-normal"
                  style={{ color: "var(--text-3)" }}
                >
                  {phrase.reading}
                </p>

                {/* 노트 */}
                {phrase.note && (
                  <p
                    className="mt-0.5 mb-0 mx-0 flex items-start gap-1 rounded-md px-2 py-[5px] text-xs leading-normal"
                    style={{
                      color: "var(--text-2)",
                      background: "var(--surface)",
                      borderLeft: "2px solid #0EA5E9",
                    }}
                  >
                    <span className="flex-shrink-0">💡</span>
                    <span>{phrase.note}</span>
                  </p>
                )}
              </div>

              {/* 스피커 버튼 */}
              <div className="pt-0.5">
                <SpeakerButton text={phrase.jp} size={38} />
              </div>
            </div>
          );
        })}

        {/* 검색 결과 없음 */}
        {isSearching && filteredPhrases.length === 0 && (
          <div
            className="flex flex-col items-center justify-center gap-2 px-6 py-12"
            style={{ color: "var(--text-3)" }}
          >
            <span className="text-[32px]">🔍</span>
            <p className="m-0 text-sm">
              &ldquo;{query}&rdquo;에 대한 결과가 없어요
            </p>
            <p className="m-0 text-xs">
              한국어 또는 일본어로 다시 검색해 보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
