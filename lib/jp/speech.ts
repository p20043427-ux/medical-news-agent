// 브라우저 Web Speech API 기반 일본어 음성 재생 헬퍼
// 별도 API 키 없이 브라우저 내장 TTS 를 사용한다.

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickJapaneseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  const ja =
    voices.find((v) => v.lang === "ja-JP") ||
    voices.find((v) => v.lang?.toLowerCase().startsWith("ja"));
  cachedVoice = ja ?? null;
  return cachedVoice;
}

const RATE_KEY = "jp-app-rate";

/** 일본어 TTS 사용 가능 여부 */
export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** 저장된 재생 속도(0.5~1.2). 기본 0.9 */
export function getRate(): number {
  if (typeof window === "undefined") return 0.9;
  const v = Number(window.localStorage.getItem(RATE_KEY));
  return v >= 0.5 && v <= 1.2 ? v : 0.9;
}

export function setRate(rate: number): void {
  if (typeof window !== "undefined") window.localStorage.setItem(RATE_KEY, String(rate));
}

/** 주어진 일본어 텍스트를 음성으로 재생한다. */
export function speakJa(text: string, rate?: number): void {
  if (!isSpeechSupported()) return;
  const synth = window.speechSynthesis;
  synth.cancel(); // 진행 중인 발화 중단
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  utter.rate = rate ?? getRate();
  const voice = pickJapaneseVoice();
  if (voice) utter.voice = voice;
  synth.speak(utter);
}

// 일부 브라우저는 voices 를 비동기로 로드한다.
if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickJapaneseVoice();
  };
}
