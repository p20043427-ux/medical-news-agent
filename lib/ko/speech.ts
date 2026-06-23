// 한국어 TTS — 브라우저 Web Speech API (ko-KR)
let cachedVoice: SpeechSynthesisVoice | null = null;

function pickKoreanVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  const ko =
    voices.find((v) => v.lang === "ko-KR") ||
    voices.find((v) => v.lang?.toLowerCase().startsWith("ko"));
  cachedVoice = ko ?? null;
  return cachedVoice;
}

export function isKoSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speakKo(text: string, rate = 0.9): void {
  if (!isKoSpeechSupported()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
  utter.rate = rate;
  const voice = pickKoreanVoice();
  if (voice) utter.voice = voice;
  synth.speak(utter);
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => { cachedVoice = null; pickKoreanVoice(); };
}
