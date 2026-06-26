// 한국어 TTS — 브라우저 Web Speech API (ko-KR)
import { makeVoicePicker, ttsSupported, speakWith } from "@/lib/platform/tts-core";

const pickKoreanVoice = makeVoicePicker("ko-KR", "ko");

export function isKoSpeechSupported(): boolean {
  return ttsSupported();
}

export function speakKo(text: string, rate = 0.9): void {
  speakWith("ko-KR", pickKoreanVoice, text, rate);
}
