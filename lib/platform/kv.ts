// 플랫폼 스토리지 어댑터 — 웹/RN 전환 단일 교체점(seam).
// 웹: localStorage. RN/Expo 전환 시 이 파일만 AsyncStorage/MMKV 구현으로 교체하면
// 호출부(진도·즐겨찾기·체크리스트 등)는 변경 없이 동작한다.

export const kv = {
  get(key: string): string | null {
    if (typeof window === "undefined") return null;
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  getJSON<T>(key: string, fallback: T): T {
    const raw = kv.get(key);
    if (raw == null) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
  },
  set(key: string, value: string): void {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(key, value); } catch { /* ignore */ }
  },
  setJSON(key: string, value: unknown): void {
    try { kv.set(key, JSON.stringify(value)); } catch { /* ignore */ }
  },
  remove(key: string): void {
    if (typeof window === "undefined") return;
    try { window.localStorage.removeItem(key); } catch { /* ignore */ }
  },
};
