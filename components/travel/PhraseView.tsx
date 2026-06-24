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
    <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* 검색바 */}
      <div
        style={{
          padding: "10px 16px 0",
          backgroundColor: "var(--bg-1)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 10,
            border: "1.5px solid var(--border)",
            backgroundColor: "var(--bg-2)",
          }}
        >
          {/* 돋보기 아이콘 */}
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="var(--text-3)"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: 16, height: 16, flexShrink: 0 }}
          >
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M14 14l3 3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="한국어 또는 일본어로 검색..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 14,
              color: "var(--text-1)",
              lineHeight: 1.4,
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="검색어 지우기"
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: 2,
                color: "var(--text-3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                style={{ width: 14, height: 14 }}
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
          style={{
            display: "flex",
            overflowX: "auto",
            gap: 8,
            padding: "10px 16px",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--bg-1)",
            position: "sticky",
            top: 54,
            zIndex: 15,
          }}
        >
          {SORTED_PHRASES.map((section) => {
            const isActive = section.key === cat;
            const isEmergency = section.key === "emergency";
            return (
              <button
                key={section.key}
                onClick={() => setCat(section.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  flexShrink: 0,
                  padding: "6px 14px",
                  borderRadius: 9999,
                  border: isActive
                    ? isEmergency
                      ? "1.5px solid #e53e3e"
                      : "1.5px solid var(--accent)"
                    : isEmergency
                    ? "1.5px solid #feb2b2"
                    : "1.5px solid var(--border)",
                  backgroundColor: isActive
                    ? isEmergency
                      ? "#e53e3e"
                      : "var(--accent)"
                    : isEmergency
                    ? "#fff5f5"
                    : "var(--bg-2)",
                  color: isActive
                    ? "#fff"
                    : isEmergency
                    ? "#c53030"
                    : "var(--text-2)",
                  fontSize: 13,
                  fontWeight: isActive || isEmergency ? 600 : 400,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s",
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
          style={{
            padding: "8px 16px 4px",
            fontSize: 12,
            color: "var(--text-3)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {filteredPhrases.length > 0
            ? `${filteredPhrases.length}개 결과`
            : "검색 결과가 없어요"}
        </div>
      )}

      {/* Phrase 목록 */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {(filteredPhrases as (typeof SORTED_PHRASES[0]["phrases"][0] & { _sectionTitle?: string; _sectionKey?: string })[]).map((phrase, idx) => {
          const cardId = `${isSearching ? phrase._sectionKey ?? cat : cat}-${idx}`;
          const isCopied = copied === cardId;
          const lastIdx = filteredPhrases.length - 1;

          return (
            <div
              key={cardId}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 16px",
                borderBottom:
                  idx < lastIdx ? "1px solid var(--border)" : "none",
                backgroundColor: "var(--bg-1)",
                transition: "background-color 0.1s",
              }}
            >
              {/* 텍스트 영역 */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {/* 검색 중일 때 카테고리 뱃지 */}
                {isSearching && phrase._sectionTitle && (
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      color: "var(--text-3)",
                      marginBottom: 2,
                    }}
                  >
                    {phrase._sectionTitle}
                  </span>
                )}

                {/* 한국어 */}
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "var(--text-2)",
                    lineHeight: 1.5,
                  }}
                >
                  {phrase.ko}
                </p>

                {/* 일본어 — 탭/클릭으로 클립보드 복사 */}
                <button
                  onClick={() => handleCopy(phrase.jp, cardId)}
                  title="탭하여 복사"
                  style={{
                    all: "unset",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    width: "fit-content",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 19,
                      fontWeight: 700,
                      color: isCopied ? "var(--accent)" : "var(--text-1)",
                      lineHeight: 1.4,
                      wordBreak: "break-all",
                      transition: "color 0.2s",
                    }}
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
                      style={{ width: 13, height: 13, flexShrink: 0, opacity: 0.6 }}
                    >
                      <rect x="5" y="5" width="8" height="8" rx="1.5" />
                      <path d="M3 11H2.5A1.5 1.5 0 0 1 1 9.5v-7A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5V3" />
                    </svg>
                  )}
                  {isCopied && (
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: 14, height: 14, flexShrink: 0 }}
                    >
                      <path d="M2.5 8.5l3.5 3.5 7-8" />
                    </svg>
                  )}
                </button>

                {/* 히라가나 읽기 */}
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "var(--text-3)",
                    lineHeight: 1.5,
                  }}
                >
                  {phrase.reading}
                </p>

                {/* 노트 */}
                {phrase.note && (
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: 12,
                      color: "var(--text-2)",
                      lineHeight: 1.5,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 4,
                      padding: "5px 8px",
                      backgroundColor: "var(--bg-2)",
                      borderRadius: 6,
                      borderLeft: "2px solid var(--accent)",
                    }}
                  >
                    <span style={{ flexShrink: 0 }}>💡</span>
                    <span>{phrase.note}</span>
                  </p>
                )}
              </div>

              {/* 스피커 버튼 */}
              <div style={{ paddingTop: 2 }}>
                <SpeakerButton text={phrase.jp} size={38} />
              </div>
            </div>
          );
        })}

        {/* 검색 결과 없음 */}
        {isSearching && filteredPhrases.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 24px",
              gap: 8,
              color: "var(--text-3)",
            }}
          >
            <span style={{ fontSize: 32 }}>🔍</span>
            <p style={{ margin: 0, fontSize: 14 }}>
              &ldquo;{query}&rdquo;에 대한 결과가 없어요
            </p>
            <p style={{ margin: 0, fontSize: 12 }}>
              한국어 또는 일본어로 다시 검색해 보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
