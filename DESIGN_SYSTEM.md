# LinguaFlow 디자인 시스템 — Figma ↔ 코드 매핑

Figma 라이브러리와 코드의 단일 진실 소스(single source of truth)를 잇는 문서입니다.
(Figma 유료 Dev Mode의 Code Connect를 무료 플랜에서 대체하는 레포 내 매핑)

- **Figma 파일:** https://www.figma.com/design/RRFFB6jreiNtC1Y48iIfg2 — `LinguaFlow Design System`
- **토큰 정의 원본:** [`app/globals.css`](app/globals.css)

---

## 1. 컬러 토큰 (Figma Variable ↔ CSS 변수)

Figma 컬렉션 `LinguaFlow Colors`. 무료 플랜이라 단일 모드이며, Light/Dark는 그룹으로 분리.
**값을 바꿀 때는 `globals.css`와 Figma 양쪽을 같이 수정**하세요.

| Figma Variable | CSS 변수 | Light | Dark |
|---|---|---|---|
| `Light/bg` · `Dark/bg` | `--bg` | `#F8F9FB` | `#0F0F1A` |
| `Light/card` · `Dark/card` | `--card` | `#FFFFFF` | `#1A1B2E` |
| `Light/surface` · `Dark/surface` | `--surface` | `#F1F3F7` | `#242540` |
| `Light/border` · `Dark/border` | `--border` | `#E2E8F0` | `#2A2D4A` |
| `Light/text-1` · `Dark/text-1` | `--text-1` | `#1A1A2E` | `#F0F0F7` |
| `Light/text-2` · `Dark/text-2` | `--text-2` | `#4A5568` | `#A0A8C0` |
| `Light/text-3` · `Dark/text-3` | `--text-3` | `#94A3B8` | `#5A6480` |
| `Brand/jp-from` | `--jp-from` | `#E63946` | (동일) |
| `Brand/jp-to` | `--jp-to` | `#F4A261` | (동일) |
| `Brand/en-from` | `--en-from` | `#4361EE` | (동일) |
| `Brand/en-to` | `--en-to` | `#7209B7` | (동일) |
| `Accent/xp` | `--xp` | `#F59E0B` | (동일) |
| `Accent/success` | `--success` | `#10B981` | (동일) |
| `Accent/danger` | `--danger` | `#EF4444` | (동일) |
| `Grade/again` | `--danger` 재사용 | `#EF4444` | (동일) |
| `Grade/hard` | `--hard` | `#F97316` | (동일) |
| `Grade/good` | (인라인) | `#3B82F6` | (동일) |
| `Grade/easy` | `--success` 재사용 | `#10B981` | (동일) |

**그라디언트**
- 일본어 135°: `--jp-from` → `--jp-to` (`.btn-jp`)
- 영어 135°: `--en-from` → `--en-to` (`.btn-en`)
- XP 90°: `--xp` → `#FBBF24` → `--xp` (`.xp-bar-fill`, shine 애니메이션)

## 2. 타이포그래피 스케일

| 역할 | 크기/굵기 | Tailwind |
|---|---|---|
| Display | 44 / Extra Bold | `text-3xl font-extrabold` 계열 |
| Title | 28 / Bold | `text-2xl font-extrabold` |
| Heading | 20 / Semi Bold | `text-xl font-bold` |
| Body | 16 / Regular | `text-base` |
| Caption | 12 / Medium | `text-xs` |

---

## 3. 컴포넌트 ↔ 코드 매핑 (Code Connect 대체)

| Figma 컴포넌트 | 코드 위치 | 비고 |
|---|---|---|
| Language Card (JP/EN) | [`app/page.tsx`](app/page.tsx) `LandingPage` | 그라디언트 카드 + 태그 pill |
| Grade Button (SM-2) | [`components/jp/ReviewMode.tsx`](components/jp/ReviewMode.tsx) · [`components/en/ReviewMode.tsx`](components/en/ReviewMode.tsx) | `GRADE_CONFIG` (again/hard/good/easy) |
| Progress Bar | [`app/globals.css`](app/globals.css) `.progress-bar` | 인라인 width % |
| XP Bar | [`app/globals.css`](app/globals.css) `.xp-bar-fill` | shine 애니메이션 |
| Level Badge | [`components/jp/Stats.tsx`](components/jp/Stats.tsx) · [`components/en/Stats.tsx`](components/en/Stats.tsx) | `Lv. = floor(xp/1000)+1` |
| Flashcard | [`components/jp/Flashcard.tsx`](components/jp/Flashcard.tsx) | flip 애니메이션 `.flip-card` |
| Bottom Nav | [`components/jp/BottomNav.tsx`](components/jp/BottomNav.tsx) · [`components/en/BottomNav.tsx`](components/en/BottomNav.tsx) | `accentColor` prop |
| Auth Modal | [`components/auth/AuthModal.tsx`](components/auth/AuthModal.tsx) | 로그인/회원가입 |
| Account Button | [`components/auth/AccountButton.tsx`](components/auth/AccountButton.tsx) | 랜딩 우상단 |

---

## 4. 유료 업그레이드 시 가능해지는 것 (Figma Professional/Org)

- **Variables 멀티모드**: Light/Dark를 한 변수의 두 모드로 통합 → Figma에서 모드 토글
- **공유 라이브러리 publish**: 다른 파일에서 토큰/컴포넌트 구독
- **Code Connect (Dev Mode)**: 위 3번 매핑을 Figma 안에서 직접 표시 (`add_code_connect_map`)
- Figma MCP 호출 한도 상향
