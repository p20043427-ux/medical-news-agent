// Web Speech API 공유 코어 — jp/ko speech 가 동일하게 쓰던 음성 선택·발화 로직.
// RN/Expo 전환 시에는 lib/platform/speak.ts 만 교체하면 되고, 이 파일은 웹 전용.

/** 언어 태그(exact 우선, 없으면 prefix)로 음성을 골라 캐시하는 picker 를 만든다. */
export function makeVoicePicker(exact: string, prefix: string): () => SpeechSynthesisVoice | null {
  let cached: SpeechSynthesisVoice | null = null;
  const pick = (): SpeechSynthesisVoice | null => {
    if (typeof window === "undefined" || !window.speechSynthesis) return null;
    if (cached) return cached;
    const voices = window.speechSynthesis.getVoices();
    cached =
      voices.find((v) => v.lang === exact) ??
      voices.find((v) => v.lang?.toLowerCase().startsWith(prefix)) ??
      null;
    return cached;
  };
  // 일부 브라우저는 voices 를 비동기 로드한다. addEventListener 로 등록해
  // 다른 언어 picker 의 핸들러를 덮어쓰지 않도록 한다(과거 onvoiceschanged= 할당 버그 수정).
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      cached = null;
      pick();
    });
  }
  return pick;
}

/** TTS 사용 가능 여부. */
export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** 진행 중 발화를 끊고 주어진 텍스트를 지정 언어·속도로 재생. */
export function speakWith(
  langTag: string,
  pick: () => SpeechSynthesisVoice | null,
  text: string,
  rate: number,
): void {
  if (!ttsSupported()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = langTag;
  utter.rate = rate;
  const voice = pick();
  if (voice) utter.voice = voice;
  synth.speak(utter);
}
