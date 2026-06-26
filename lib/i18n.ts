"use client";

import { useEffect, useState } from "react";
import { kv } from "@/lib/platform/kv";

// 전역 UI 언어(한국어/일본어). 콘텐츠가 아니라 인터페이스 문구에 적용.
export type UiLang = "ko" | "ja";

const KEY = "ui-lang";
const EVENT = "ui-lang-changed";

export function getUiLang(): UiLang {
  return kv.get(KEY) === "ja" ? "ja" : "ko";
}

export function setUiLang(l: UiLang) {
  kv.set(KEY, l);
  if (typeof document !== "undefined") document.documentElement.lang = l;
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useUiLang(): UiLang {
  const [l, set] = useState<UiLang>("ko");
  useEffect(() => {
    set(getUiLang());
    const h = () => set(getUiLang());
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, []);
  return l;
}

/** 인라인 번역 헬퍼 — 키 레지스트리 없이 ko/ja 문구를 즉석 제공. */
export function tt(lang: UiLang, ko: string, ja: string): string {
  return lang === "ja" ? ja : ko;
}
