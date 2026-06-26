// 플랫폼 음성(TTS) 어댑터 — 웹/RN 전환 단일 교체점(seam).
// 웹: Web Speech API(speakJa/speakKo). RN/Expo 전환 시 이 파일을 expo-speech 구현으로
// 교체(Speech.speak(text, { language: "ja-JP" | "ko-KR" }))하면 호출부는 동일.

import { speakJa } from "@/lib/jp/speech";
import { speakKo } from "@/lib/ko/speech";

export type SpeakLang = "ja" | "ko";

/** 언어를 지정해 발화. 의료교류 등 다국어 화면에서 사용. */
export function speak(lang: SpeakLang, text: string, rate?: number): void {
  if (lang === "ko") speakKo(text, rate);
  else speakJa(text, rate);
}
