/** className 병합 유틸 (의존성 없이 falsy 제거 + 공백 정리) */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}
