"use client";

import { useState } from "react";
import { speakJa, isSpeechSupported } from "@/lib/jp/speech";

/** 일본어 텍스트를 음성으로 들려주는 스피커 버튼 */
export default function SpeakerButton({
  text,
  size = 40,
  className = "",
}: {
  text: string;
  size?: number;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (!isSpeechSupported()) {
      alert("이 브라우저는 음성 재생을 지원하지 않아요. Chrome/Safari 를 권장해요.");
      return;
    }
    speakJa(text);
    setActive(true);
    window.setTimeout(() => setActive(false), 700);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="발음 듣기"
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition active:scale-90 ${
        active ? "bg-slate-900 text-white" : "hover:bg-slate-50"
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-1/2 w-1/2"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 5.5a9 9 0 0 1 0 13" />
      </svg>
    </button>
  );
}
