# 디자인 시스템 & React Native 이식 가이드

LinguaFlow(일본어·한국어·의료교류·일본여행)의 디자인 시스템 기준 문서.
모든 카테고리는 동일한 **토큰 + 공통 셸 + 프리미티브**를 공유한다.

## 1. 디자인 토큰 (`app/globals.css` + `tailwind.config.ts`)

색은 **단일 소스 `--ds-*` (HSL)** 에서 정의하고, 레거시/시맨틱 토큰을 그 위에 alias 한다.
라이트는 `:root`, 다크는 `html.dark` 에서 `--ds-*` 만 재정의 → 모든 파생 토큰 자동 반영.

| 시맨틱 | CSS 변수 | Tailwind |
|---|---|---|
| 배경 | `--bg` / `--ds-background` | `bg-background` |
| 카드 | `--card` / `--ds-card` | `bg-card` |
| 보조면 | `--surface` / `--ds-muted` | `bg-muted` |
| 본문 1·2·3 | `--text-1·2·3` | `text-foreground` / `text-muted-foreground` |
| 테두리 | `--border` / `--ds-border` | `border-border` |
| primary/secondary/accent | `--ds-primary…` | `bg-primary` 등 |
| success/warning/destructive | `--ds-success/warning/destructive` | `text-success` 등 |
| ring | `--ds-ring` | `ring` |
| radius | `--radius-sm/md/lg/xl` | `rounded-ds-sm…` |
| shadow | `--shadow-sm/md` | `shadow-token(-sm)` |

### 카테고리 액센트 (브랜드 — 의도적 분리)
`components/shell/index.ts > CATEGORY_ACCENT`

| 카테고리 | 액센트 |
|---|---|
| 일본어 jp | `#E63946` |
| 한국어 ko | `#2563EB` |
| 의료교류 medic | `#0D9488` |
| 일본여행 travel | `#0EA5E9` |

## 2. 컴포넌트 인벤토리 (Atomic Design)

```
Templates : AppShell
Organisms : AppHeader · BottomNav · 각 화면 View(Phrasebook/Glossary/Cards/Visit/Home…)
Molecules : HeaderTitle · ProgressChip · LangToggle · WeekStrip · BilingualRow · Card · ConfirmDialog · Sheet · Segmented
Atoms     : Button · Badge · Chip · Progress · Avatar · Switch · Skeleton · EmptyState · Input(검색)
```

- 공통 셸: `components/shell/` (AppShell, AppHeader, BottomNav)
- 프리미티브: `components/ui/`
- 카테고리 셸은 모두 `AppShell + AppHeader + BottomNav` 조립으로 통일됨.

## 3. 접근성 베이스라인 (구현됨)

- 전역 `:where(...):focus-visible` 포커스 링(`--ds-ring`) — `app/globals.css`
- `prefers-reduced-motion` 모션 축소
- `--text-3` WCAG AA 대비 5:1
- 아이콘 버튼 `aria-label`, 네비 `aria-current`, ConfirmDialog `role=dialog`+focus trap+Esc
- 공통 헤더 뒤로 버튼 40px

### 잔여 과제
- 일부 아이콘 버튼 터치타깃 < 44px(스피커 36px 등) → `min-h-11` 확대 또는 히트영역 확장
- 색-단독 상태(긴급=빨강 등)에 텍스트/아이콘 병행
- 검색결과·TTS 상태 `aria-live`

## 4. 플랫폼 어댑터 (RN 이식 seam)

웹/RN 전환의 단일 교체점. 호출부는 어댑터만 사용하면 플랫폼 변경에 불변.

| 어댑터 | 웹 | RN/Expo 교체 |
|---|---|---|
| `lib/platform/kv.ts` | `localStorage` | AsyncStorage / MMKV |
| `lib/platform/speak.ts` | Web Speech API | `expo-speech` |
| (추가 예정) 라우팅 | 상태 기반 탭 | `expo-router` Tabs |
| (추가 예정) 토큰 | CSS 변수 | NativeWind theme `vars()` |

## 5. React Native Reusables 매핑

| 현재 | RNR/RN 컴포넌트 | 난이도 |
|---|---|---|
| AppShell | `SafeAreaView`+`View` | 하 |
| AppHeader | custom + `Avatar`/`Button` | 중 |
| BottomNav | `expo-router` Tabs / RNR `Tabs` | 중 |
| Chip / Segmented | `Badge` / `ToggleGroup` / `Tabs` | 하 |
| Sheet | `@gorhom/bottom-sheet` | 중 |
| ConfirmDialog | `AlertDialog` | 하 |
| Button/Card/Badge/Progress | 동명 RNR | 하 |
| Progress 링 | `react-native-svg` | 중 |
| 검색 Input | `Input` | 하 |
| TTS / storage | `expo-speech` / AsyncStorage (어댑터 교체) | 중 |

## 6. 단계별 로드맵

- **Phase 1 (완료/거의)**: 시맨틱 토큰·radius·shadow, 전역 focus-visible, reduced-motion, 공통 셸 통일, 헤더 터치타깃.
- **Phase 2 (Mid)**: 잔여 터치타깃 44px, 프리미티브 `variant/size` 정규화, 어댑터로 호출부 이전, 태블릿/데스크톱 반응형 분기.
- **Phase 3 (Long, RN)**: NativeWind 도입 + Expo 워크스페이스, 토큰 theme 공유, 프리미티브 RN 구현, `expo-router`, 오프라인 캐시 재설계.

## 7. 사용 규칙

- 새 화면은 `AppShell + AppHeader + BottomNav`로 조립한다.
- 색은 토큰(`var(--…)`/Tailwind 시맨틱)을 쓰고, **카테고리 액센트만** 직접 hex 허용.
- 저장·음성은 `lib/platform/*` 어댑터를 경유한다(직접 `localStorage`/`speechSynthesis` 금지 권장).
- 인터랙티브 요소는 `aria-label`/`role` 부여, 터치타깃 ≥ 44px 지향.
