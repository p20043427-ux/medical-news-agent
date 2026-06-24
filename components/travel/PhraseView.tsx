"use client";

import { useState } from "react";
import { TRAVEL_PHRASES } from "@/lib/travel/phrases";
import SpeakerButton from "@/components/jp/SpeakerButton";

export default function PhraseView() {
  const [activeKey, setActiveKey] = useState(TRAVEL_PHRASES[0].key);

  const activeSection = TRAVEL_PHRASES.find((s) => s.key === activeKey)!;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* 카테고리 칩 가로 스크롤 */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 8,
          padding: "12px 16px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg-1)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {TRAVEL_PHRASES.map((section) => {
          const isActive = section.key === activeKey;
          return (
            <button
              key={section.key}
              onClick={() => setActiveKey(section.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 9999,
                border: isActive
                  ? "1.5px solid var(--accent)"
                  : "1.5px solid var(--border)",
                backgroundColor: isActive ? "var(--accent)" : "var(--bg-2)",
                color: isActive ? "#fff" : "var(--text-2)",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
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

      {/* 선택된 카테고리의 phrase 목록 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {activeSection.phrases.map((phrase, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 16px",
              borderBottom:
                idx < activeSection.phrases.length - 1
                  ? "1px solid var(--border)"
                  : "none",
              backgroundColor: "var(--bg-1)",
            }}
          >
            {/* 텍스트 영역 */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {/* 한국어 */}
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "var(--text-2)",
                  lineHeight: 1.4,
                }}
              >
                {phrase.ko}
              </p>

              {/* 일본어 */}
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--text-1)",
                  lineHeight: 1.4,
                  wordBreak: "break-all",
                }}
              >
                {phrase.jp}
              </p>

              {/* 히라가나 읽기 */}
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "var(--text-3)",
                  lineHeight: 1.4,
                }}
              >
                {phrase.reading}
              </p>

              {/* note */}
              {phrase.note && (
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "var(--text-2)",
                    lineHeight: 1.4,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 4,
                  }}
                >
                  <span>💡</span>
                  <span>{phrase.note}</span>
                </p>
              )}
            </div>

            {/* 스피커 버튼 */}
            <SpeakerButton text={phrase.jp} size={40} />
          </div>
        ))}
      </div>
    </div>
  );
}
