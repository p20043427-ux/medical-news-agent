# 🎓 LinguaFlow

**모바일 우선(mobile-first) PWA** 언어 학습 · 의료교류 · 여행 플랫폼.
한 앱에서 **일본어 · 한국어 학습**, **한일 병원 의료교류 실무 도구**, **일본 여행 가이드**를 제공합니다.
백엔드 없이 정적 데이터로 동작하며(진도 동기화만 선택적 Supabase), Vercel에 정적 배포됩니다.

> 한국어/일본어 UI 전환(`tt(lang, …)`)을 지원하며, 모든 화면은 공통 디자인 시스템(`components/shell/`)을 따릅니다.

## 카테고리

| 카테고리 | 설명 |
|---|---|
| 🇯🇵 **일본어** | JLPT N5·N4 단어 · 동사 활용 · 생활 회화 · 문법 · 모의시험 · 받아쓰기 · 롤플레이 |
| 🇰🇷 **한국어** | TOPIK 1·2 단어 · 문법 · 회화 · 발음 · 모의시험 |
| 🏥 **의료교류** | 은성의료재단 ↔ 가마치그룹 **직원 상호방문 지원** — 12개 부서별 전문 회화(372문장) · 의료용어 사전(324) · 포인트투토크 카드 · 병원 표지판 · 방문 실무(매너·체크리스트) |
| ✈️ **일본 여행** | 도쿄·교토·오사카·후쿠오카·삿포로 도시 가이드 · 입국/교통 · 상황별 회화 · 준비물·실용정보 |

> ⚠️ 의료교류의 임상 표현은 **양 병원 실무진 감수 후 사용**을 권장하는 초안(draft) 상태입니다. 앱 내에 "감수 전 초안" 배지로 표시됩니다.

## 핵심 기능

| 기능 | 설명 |
|---|---|
| 🧠 **SM-2 간격 반복** | 망각곡선 기반 복습일 자동 산정 (`lib/learn/sm2.ts`, 일본어·한국어 공유) |
| 🎴 **플래시카드 · 스와이프 학습** | 좌/우 스와이프로 알고 있어요/학습할게요 분류 |
| 📝 **모의시험 · 퀴즈** | 회차별 모의시험 + 오답노트, 4지선다 퀴즈 |
| 📊 **학습 분석** | 연속 학습일(스트릭), 최근 2주 학습량, 목표일 D-day |
| ⭐ **즐겨찾기 · 진도** | 표현 즐겨찾기, 일일 미션, 학습 진도 추적 |
| 🔊 **음성(TTS)** | 브라우저 Web Speech API(`ja-JP`/`ko-KR`) — API 키 불필요. 의료/여행은 한·일 양방향 발음 |
| 🌙 **다크 모드** | 라이트·다크·시스템 (FOUC 방지 부트 스크립트) |
| 📲 **PWA** | 홈 화면 설치 + 서비스워커 오프라인 캐시 |
| ☁️ **진도 백업·동기화** | JSON 내보내기/가져오기 + 로그인 시 Supabase 동기화(선택) |

## 아키텍처

```
app/                 Next.js App Router (정적 PWA)
  page.tsx           4개 카테고리 진입점 (next/dynamic 코드 스플리팅)
  layout.tsx         루트 레이아웃 · 테마 부트 스크립트
  error.tsx          라우트 에러 경계
  global-error.tsx   전역 에러 경계

components/
  shell/             공통 디자인 시스템 (AppShell·AppHeader·BottomNav)
  jp/ ko/ medic/ travel/   카테고리별 화면
  ui/                재사용 UI 프리미티브
  auth/              계정 버튼·로그인

lib/
  jp/ ko/            학습 데이터(단어·문법·회화) + 진도(SM-2)
  medic/             의료 회화·용어·카드·표지판·방문 실무 데이터
  travel/            도시 가이드·회화·실용정보 데이터
  learn/sm2.ts       SM-2 알고리즘 (공유 순수 함수)
  platform/          RN 이식 seam — kv.ts(스토리지)·speak.ts(TTS)
  i18n.ts            ko/ja UI 언어 전환
  error.ts           에러 리포팅 seam (현재 Vercel Analytics)
  sync.ts backup.ts  진도 원격 동기화·백업
```

### 설계 원칙

- **플랫폼 어댑터(seam)**: 모든 영속 데이터는 `lib/platform/kv.ts`를 통해 저장 → RN/Expo 이식 시 이 파일만 교체. TTS는 `lib/platform/speak.ts`.
- **디자인 토큰 단일 소스**: `app/globals.css`의 `--ds-*`(HSL)에서 색을 정의하고 레거시 토큰은 alias. 다크 모드는 `html.dark`에서 토큰만 재정의해 자동 전파.
- **코드 스플리팅**: 4개 카테고리 앱은 `next/dynamic(ssr:false)`으로 지연 로드 → 랜딩 First Load JS 173 kB.

## 로컬 실행

```bash
npm install
npm run dev          # http://localhost:3000
```

환경변수 없이 동작합니다. 진도 동기화(로그인)를 쓰려면 Supabase 키만 설정하면 됩니다.

| 변수 | 설명 | 노출 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | 공개 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | publishable/anon 키 | 공개 |

> 미설정 시 게스트 모드(로컬 저장)로 모든 기능이 정상 동작합니다.

## 품질 관리

```bash
npm run test:run     # Vitest 단위 테스트
npx tsc --noEmit     # 타입 체크
npm run build        # 프로덕션 빌드
```

- **CI**(`.github/workflows/ci.yml`): push/PR마다 타입체크 → 단위 테스트 → 빌드를 강제.
- **테스트**: SM-2 알고리즘, kv 스토리지 어댑터, i18n, 즐겨찾기, 의료 데이터 무결성(`__tests__/lib/`).
- **에러 트래킹**: `lib/error.ts` + App Router 에러 경계(`error.tsx`/`global-error.tsx`).

---
배포: Vercel · 진도 동기화(선택): Supabase · 음성: 브라우저 Web Speech API
