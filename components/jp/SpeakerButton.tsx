"use client";

import { useState } from "react";
import { speakJa, isSpeechSupported } from "@/lib/jp/speech";
import { toast } from "@/lib/ui/toast";
import { useUiLang, tt } from "@/lib/i18n";

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
  const lang = useUiLang();
  const [active, setActive] = useState(false);

  function trigger() {
    if (!isSpeechSupported()) {
      toast(tt(lang, "이 브라우저는 음성 재생을 지원하지 않아요. Chrome/Safari를 권장해요.", "このブラウザは音声再生に対応していません。Chrome/Safari を推奨します。"));
      return;
    }
    speakJa(text);
    setActive(true);
    window.setTimeout(() => setActive(false), 700);
  }

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    trigger();
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      trigger();
    }
  }

  // 행(行) 버튼 안에 중첩되는 경우가 많아 <button> 대신 role="button" 사용 (HTML 중첩 위반 방지)
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKey}
      aria-label={tt(lang, "발음 듣기", "発音を聞く")}
      style={{ width: size, height: size }}
      className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition active:scale-90 ${
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
    </span>
  );
}
