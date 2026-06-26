"use client";

// 진도(SRS) 외 추가 학습 데이터까지 포함하는 백업/복원.
// 즐겨찾기 표현 · 회화 읽음 · 롤플레이 기록 · 모의시험 이력/최고점수.
import { kv } from "@/lib/platform/kv";

type Lang = "jp" | "en";

const extraKeys = (lang: Lang): string[] => [
  `fav-${lang}-phrase`,
  `${lang}-conv-read`,
  `roleplay-${lang}-roleplay`,
  `${lang}-exam-history`,
  `${lang}-exam-best`,
];

/** 진도 JSON + 추가 데이터를 하나의 백업 문자열로 묶는다. */
export function buildBackup(lang: Lang, progressJson: string): string {
  const extras: Record<string, string> = {};
  for (const k of extraKeys(lang)) {
    const v = kv.get(k);
    if (v != null) extras[k] = v;
  }
  let progress: unknown = progressJson;
  try { progress = JSON.parse(progressJson); } catch { /* keep string */ }
  return JSON.stringify({ v: 2, lang, progress, extras }, null, 2);
}

/** 백업 문자열을 복원. v2면 추가 데이터까지, 구버전(진도만)은 그대로 import. */
export function restoreBackup(lang: Lang, raw: string, importProgress: (json: string) => boolean): boolean {
  try {
    const obj = JSON.parse(raw);
    if (obj && obj.v === 2 && obj.progress !== undefined) {
      const ok = importProgress(typeof obj.progress === "string" ? obj.progress : JSON.stringify(obj.progress));
      if (obj.extras) {
        for (const [k, val] of Object.entries(obj.extras as Record<string, string>)) {
          kv.set(k, String(val));
        }
      }
      return ok;
    }
    // 구버전: 진도만 들어 있는 파일
    return importProgress(raw);
  } catch {
    return false;
  }
}
