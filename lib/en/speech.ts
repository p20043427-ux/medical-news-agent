const RATE_KEY = "en-speech-rate";

export function getEnRate(): number {
  if (typeof window === "undefined") return 0.9;
  return Number(window.localStorage.getItem(RATE_KEY) ?? "0.9");
}

export function setEnRate(v: number) {
  window.localStorage.setItem(RATE_KEY, String(v));
}

export function speakEn(text: string, rate = getEnRate()): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}

export function stopSpeech(): void {
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}
