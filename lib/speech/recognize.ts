"use client";

// Web Speech API(SpeechRecognition) 기반 발음 따라하기 헬퍼. 별도 키 불필요.
// 브라우저 지원이 제한적이므로(주로 Chrome 계열) 미지원 시 graceful 처리한다.

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isRecognitionSupported(): boolean {
  return typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
}

/** 한 번 듣고 인식된 텍스트를 반환. 실패 시 reject. */
export function recognizeOnce(lang: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Ctor) { reject(new Error("unsupported")); return; }
    const rec = new Ctor();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    let settled = false;
    rec.onresult = (e: any) => { settled = true; resolve(String(e.results?.[0]?.[0]?.transcript ?? "")); };
    rec.onerror = (e: any) => { if (!settled) { settled = true; reject(new Error(e?.error || "error")); } };
    rec.onend = () => { if (!settled) { settled = true; reject(new Error("no-speech")); } };
    try { rec.start(); } catch { reject(new Error("start-failed")); }
  });
}

function lev(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  const dp = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]; dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[n];
}

const normalize = (s: string) => s.toLowerCase().replace(/[\s、。．，.,!?！？「」"'`~()（）]/g, "");

/** 목표 문장과 인식 결과의 유사도(0~100). */
export function pronunciationScore(target: string, said: string): number {
  const a = normalize(target), b = normalize(said);
  if (!a || !b) return 0;
  const d = lev(a, b);
  return Math.max(0, Math.round((1 - d / Math.max(a.length, b.length)) * 100));
}
