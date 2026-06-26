// 브라우저 Web Speech API 기반 일본어 음성 재생 헬퍼
// 별도 API 키 없이 브라우저 내장 TTS 를 사용한다.

import { kv } from "@/lib/platform/kv";
import { makeVoicePicker, ttsSupported, speakWith } from "@/lib/platform/tts-core";

const pickJapaneseVoice = makeVoicePicker("ja-JP", "ja");
const RATE_KEY = "jp-app-rate";

/** 일본어 TTS 사용 가능 여부 */
export function isSpeechSupported(): boolean {
  return ttsSupported();
}

/** 저장된 재생 속도(0.5~1.2). 기본 0.9 */
export function getRate(): number {
  const v = Number(kv.get(RATE_KEY));
  return v >= 0.5 && v <= 1.2 ? v : 0.9;
}

export function setRate(rate: number): void {
  kv.set(RATE_KEY, String(rate));
}

/** 주어진 일본어 텍스트를 음성으로 재생한다. */
export function speakJa(text: string, rate?: number): void {
  speakWith("ja-JP", pickJapaneseVoice, text, rate ?? getRate());
}
