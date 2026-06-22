# LinguaFlow Design System v2 (Primitives & Tokens)

엔터프라이즈급 · React Native Reusables 호환을 목표로 한 디자인 시스템 기반 레이어.
**추가형(additive)** 으로 도입되어 기존 화면을 깨지 않으며, 점진적 마이그레이션을 전제로 합니다.
(기존 `DESIGN_SYSTEM.md` = Figma 매핑 문서와 별개 — 본 문서는 토큰/프리미티브 구현 가이드)

데모: `/ui-demo` (라이트/다크 토글 포함)

---

## 1. 토큰 (Design Tokens)

`app/globals.css` 에 HSL 시맨틱 토큰을 `--ds-*` 네임스페이스로 정의 (기존 `--card/--border/--success` hex 토큰과 충돌 방지). `tailwind.config.ts` 의 `theme.extend.colors` 와 연결됩니다.

| 토큰 | Tailwind 유틸 | 용도 |
|---|---|---|
| `--ds-background` / `--ds-foreground` | `bg-background` / `text-foreground` | 페이지 배경/본문 |
| `--ds-card` / `--ds-card-foreground` | `bg-card` / `text-card-foreground` | 카드 표면 |
| `--ds-muted` / `--ds-muted-foreground` | `bg-muted` / `text-muted-foreground` | 보조 표면/텍스트 |
| `--ds-primary` (#E63946) | `bg-primary` `text-primary` | 일본어 브랜드 · 주요 CTA |
| `--ds-accent` (#4361EE) | `bg-accent` `text-accent` | 영어 브랜드 |
| `--ds-secondary` (#F4A261) | `bg-secondary` | 보조 강조 |
| `--ds-success` / `--ds-warning` / `--ds-destructive` | `bg-success` 등 | 상태색 |
| `--ds-border` / `--ds-input` / `--ds-ring` | `border-border` / `ring-ring` | 경계/포커스 |
| `--radius-sm/md/lg/xl` | `rounded-ds-sm/md/lg/xl` | 모서리 (표준 `rounded-*` 미덮어씀) |
| `--shadow-sm/md` | `shadow-token-sm` / `shadow-token` | 그림자 |

다크모드는 `html.dark` 에서 `--ds-*` 만 재정의 → `!important` 오버라이드 불필요(기존 레거시 오버라이드는 마이그레이션 완료 시 제거 예정).

---

## 2. 프리미티브 컴포넌트 (`components/ui/`)

| 컴포넌트 | 설명 | 접근성 |
|---|---|---|
| `Button` | variant: brand/accent/dark/surface/success/destructive/ghost · size: sm/md/lg/icon · `block` | 전역 `focus-visible` 링 |
| `Card` (+Header/Title/Description/Content/Footer) | 토큰 표면 | — |
| `Badge` | default/primary/accent/success/warning/muted/outline | — |
| `Progress` | 토큰 채움 + `indicatorClassName` | `role=progressbar` `aria-valuenow` |
| `Switch` | 토글 | `role=switch` `aria-checked` · 키보드 |
| `Avatar` | 이니셜 폴백 | — |

```tsx
import { Button, Card, Badge, Progress, Switch } from "@/components/ui";
<Button variant="brand" block>바로 시작</Button>
```

---

## 3. 마이그레이션: 기존 → 프리미티브

`.ui-btn*` (현행) → `<Button>` 매핑:

| 현행 클래스 | 신규 |
|---|---|
| `ui-btn ui-btn-brand` | `<Button variant="brand">` |
| `ui-btn ui-btn-brand-en` | `<Button variant="accent">` |
| `ui-btn ui-btn-dark` | `<Button variant="dark">` |
| `ui-btn ui-btn-surface` | `<Button variant="surface">` |
| `ui-btn ui-btn-success` | `<Button variant="success">` |
| `ui-btn ui-btn-rose` | `<Button variant="destructive">` |
| 커스텀 `<span>` 토글 | `<Switch>` |
| `.progress-bar` | `<Progress>` |
| 인라인 칩 | `<Badge>` |

---

## 4. 로드맵

### Phase 1 — Quick Win (완료, 본 브랜치)
- [x] 시맨틱 토큰(`--ds-*`) + Tailwind 테마 연결
- [x] 프리미티브 `Button/Card/Badge/Progress/Switch/Avatar`
- [x] 접근성 베이스라인(전역 focus-visible, `prefers-reduced-motion`)
- [x] `cn` 유틸 · `/ui-demo` 쇼케이스

### Phase 2 — Mid Term (1~2주)
- [ ] 화면별 버튼/카드/칩/진행바를 프리미티브로 교체(JP→EN 순차)
- [ ] **JP/EN 모듈 공용화**: `components/learn/*` 단일 컴포넌트 + `lang` 주입으로 6쌍 중복 제거
- [ ] `DropdownMenu`/`Dialog`/`Tabs`(Radix) 도입 → 설정 메뉴·모달·하단탭
- [ ] 레거시 `.ui-btn*` 및 다크모드 `!important` 오버라이드 제거
- [ ] 반응형 `AppShell`(모바일 하단탭 / ≥md 사이드바)

### Phase 3 — Long Term (1개월+)
- [ ] I/O 추상화: `storage`(localStorage↔AsyncStorage), `speech`(WebSpeech↔expo-speech), `Icon`(lucide↔lucide-react-native)
- [ ] 웹 전용 자산 native 분기: `WritingPad`(Skia) · `CardArt`(react-native-svg) · `Furigana`(커스텀)
- [ ] NativeWind 토큰 공유 + Expo 앱 셸 → 웹/모바일 단일 디자인 시스템

---

## 5. React Native Reusables 매핑

| 본 프리미티브 | RN Reusables / Expo |
|---|---|
| `Button` | `Button` (Pressable + NativeWind) |
| `Card` | `Card` |
| `Badge` | `Badge` |
| `Progress` | `Progress` |
| `Switch` | `Switch` (role=switch 동일) |
| `Avatar` | `Avatar` |
| 토큰(`--ds-*`) | NativeWind `tailwind.config` 동일 토큰 |

> 프리미티브의 props 시그니처를 RN Reusables 와 호환되게 설계해, native 전환 시 마크업(`button`→`Pressable`)만 치환하면 됩니다.
