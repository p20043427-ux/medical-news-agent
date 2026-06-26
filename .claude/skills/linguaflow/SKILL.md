---
name: linguaflow
description: "LinguaFlow 앱 개발 오케스트레이터. 단어·문법·회화·의료·여행 콘텐츠 추가/수정, 컴포넌트 개발/개선, 버그 수정, 테스트 작성, 빌드 검증 등 LinguaFlow 관련 모든 개발 작업에서 이 스킬을 사용하라. '추가해줘', '수정해줘', '개발해줘', '개선해줘', '버그 고쳐줘', '다시 해줘', '업데이트', '재실행', '일본어/한국어/의료/여행 관련 작업' 등 어떤 개발 요청이든 이 스킬로 처리한다."
---

# LinguaFlow 개발 오케스트레이터

LinguaFlow(일본어·한국어·의료교류·일본여행 학습 PWA) 개발 작업을 전문 에이전트 팀으로 조율한다.

## 프로젝트 스냅샷

- **스택**: Next.js 15 App Router · React 19 · TypeScript strict · Vitest
- **카테고리**: JP `#E63946` / KO `#2563EB` / medic `#0D9488` / travel `#0EA5E9`
- **핵심 규칙**: `kv` 어댑터(localStorage 직접 접근 금지) · `tt(lang,ko,ja)` i18n · `pb-28` BottomNav 여백
- **배포 브랜치**: `claude/japanese-conversation-app-mulxjk`
- **품질 기준**: tsc 0 errors · 27+ tests · First Load JS ≤200 kB

## Phase 0: 컨텍스트 확인

워크플로우 시작 전 이전 작업 여부를 확인한다:
- `_workspace/` 없음 → **초기 실행**
- `_workspace/` 있음 + 부분 수정 요청 → **부분 재실행** (해당 에이전트만)
- `_workspace/` 있음 + 새 요청 → `mv _workspace/ _workspace_prev/` 후 **새 실행**

## Phase 1: 작업 분류

요청을 분석하여 실행 모드와 담당 에이전트를 결정한다.

| 작업 유형 | 담당 에이전트 | 실행 모드 |
|----------|-------------|---------|
| 데이터(lib/) 추가·수정만 | content-engineer → qa-engineer | 서브 순차 |
| 컴포넌트(components/) 개발·수정만 | ui-engineer → qa-engineer | 서브 순차 |
| 버그 수정 | 해당 영역 에이전트 → qa-engineer | 서브 순차 |
| 테스트·빌드만 | qa-engineer | 서브 단독 |
| 데이터 + UI 동시 작업 | content-engineer + ui-engineer 팀 → qa-engineer | **팀 → 서브** |

## Phase 2: 에이전트 실행

### 서브 에이전트 패턴 (단일 영역 작업)

```
Agent(content-engineer 또는 ui-engineer, model: "opus")
  → 변경 파일 목록 반환
Agent(qa-engineer, model: "opus")
  → tsc + test:run + build 검증 리포트
```

### 팀 패턴 (데이터 + UI 동시 작업)

실행 모드: **에이전트 팀**

```
TeamCreate(members: [content-engineer, ui-engineer])
TaskCreate(content-engineer: 데이터 작업, 타입 변경 시 ui-engineer에게 SendMessage)
TaskCreate(ui-engineer: 컴포넌트 작업, content-engineer 타입 확정 후 시작)
→ 팀 자체 조율 완료
→ 팀 해체
Agent(qa-engineer, model: "opus") — 전체 검증
```

## Phase 3: 커밋·푸시

qa-engineer 검증 통과 후:

```bash
git add <변경된 파일만>
git commit -m "<컨벤션 메시지>"
git push -u origin claude/japanese-conversation-app-mulxjk
```

**커밋 메시지 컨벤션:**
- `feat(jp): N4 동사 10개 추가`
- `feat(medic): 간호사 표현 20개 추가`
- `feat(ui): 플래시카드 통계 화면 추가`
- `fix(ko): 발음 표기 오류 수정`
- `test: 신규 데이터 무결성 테스트 추가`

## 에러 핸들링

- tsc/빌드 실패: qa-engineer 원인 분석 → 해당 에이전트 1회 재호출
- 재실패 시: 에러 내용 사용자에게 보고 후 중단
- 타입 불일치: content-engineer가 `types.ts` 재확인 후 수정

## 후속 작업

"다시 해줘", "수정해줘", "추가로", "업데이트", "개선해줘" 등 후속 요청 시 이 스킬로 재진입. Phase 0에서 이전 컨텍스트 확인 후 부분 재실행 또는 새 실행 선택.

## 테스트 시나리오

**정상 흐름 — 데이터 추가:** "일본어 N4 동사 `食べる` 등 10개 추가해줘"
- Phase 1: 데이터 작업 → content-engineer 서브 호출
- Phase 2: lib/jp/vocab-b*.ts 업데이트 → qa-engineer tsc + test:run 통과
- Phase 3: `feat(jp): N4 동사 10개 추가` 커밋·푸시

**에러 흐름 — tsc 실패:** content-engineer 작업 후 타입 에러
- qa-engineer 에러 리포트 → content-engineer 재호출 (수정) → qa-engineer 재검증
- 재실패 시 사용자에게 에러 상세 보고
