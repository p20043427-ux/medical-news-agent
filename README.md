# 🌸 일본어 회화 학습 웹앱 (Japanese Study App)

**JLPT N5 단어**와 **생활 회화**, **필수 동사**를 카드와 **음성(TTS)**으로 익히는 일본어 공부 웹앱입니다.
첨부된 단어 암기 앱 디자인을 참고해 모바일 우선(mobile-first)으로 만들었습니다.

> 메인 화면(`/`)이 일본어 학습 앱입니다. 기존 의료 뉴스 Agent 는 [`/news`](#-의료-뉴스-agent-medical-news-agent) 로 이동했습니다.

## 주요 기능

| 기능 | 설명 |
|------|------|
| 🏠 **홈 대시보드** | JLPT N5 진도율(원형 그래프), 오늘 학습량, 카테고리별 진행률 |
| 🔤 **단어 카드** | 카테고리별 플래시카드 — 한자/후리가나/품사/한국어 뜻/예문, 스와이프형 학습(`알고 있어요` / `학습할게요`) |
| 💬 **생활 회화** | 첫인사·카페·길찾기·쇼핑·식당·약속·병원·전화 등 상황별 대화, 말풍선 UI + 전체 듣기 |
| 🔤 **필수 동사** | 생활 회화 동사 32개 — 그룹(1·2·3)별 활용형(ます·て·ない) + 예문 |
| 🃏 **스와이프 학습** | 카드를 좌(알고 있어요)·우(학습할게요)로 밀어 분류하는 제스처 |
| 🔁 **복습 + SRS** | Leitner 간격 반복(망각곡선)으로 다시/좋음/쉬움 채점 → 복습일 자동 산정 |
| 📝 **퀴즈 모드** | 4지선다 점검 + 오답만 다시 풀기 |
| 📊 **학습 분석** | 연속 학습일(🔥 스트릭), 최근 2주 학습량 그래프, 목표 시험일 D-day |
| 🔊 **음성 발음** | 브라우저 내장 Web Speech API(`ja-JP`)로 단어·예문·대화 듣기 (API 키 불필요) |
| ㊙️ **후리가나/뜻 숨기기** | 후리가나 토글, 뜻 보기 — 셀프 테스트용 |
| 🎨 **애니 일러스트** | 외부 이미지 없이 SVG 로 그린 카테고리별 마스코트 카드 아트 |
| 💾 **진도 저장** | `localStorage` 기반 SRS 진도·스트릭 기록 (v1→v2 자동 마이그레이션) |

학습 데이터는 모두 정적(`lib/jp/`)이라 백엔드 없이 동작합니다.

- `lib/jp/vocab.ts` — N5 단어 + 카테고리 (인사·사람·숫자·시간·음식·장소·형용사·생활·부사)
- `lib/jp/verbs.ts` — 필수 동사 + 활용형
- `lib/jp/conversations.ts` — 생활 회화 시나리오
- `components/jp/` — 화면 컴포넌트 (Home · 플래시카드 · 회화 · 동사 · 하단 탭)

## 로컬 실행 (일본어 앱)

```bash
npm install
npm run dev   # http://localhost:3000
```

일본어 앱은 환경변수가 필요 없습니다. (의료 뉴스 `/news` 만 Supabase/OpenRouter 키 필요)

---

# 🩺 의료 뉴스 Agent (Medical News Agent)

최신 **질병 정보**를 7개 소스에서 자동 수집하고 `openrouter/auto` LLM으로 **한국어 요약**하는 에이전트입니다.
Next.js로 만들어 **Vercel**에 배포하고, 데이터는 **Supabase(Postgres)**에 저장합니다. 화면은 [`/news`](/news) 에서 볼 수 있습니다.

🔗 **라이브 데모**: https://medical-news-agent-puce.vercel.app

## 수집 소스

| 소스 | 방식 |
|------|------|
| WHO (세계보건기구) | RSS (Disease Outbreak News / News) + Google News 폴백 |
| CDC (미 질병통제예방센터) | RSS (Newsroom / MMWR) + Google News 폴백 |
| NIH (미 국립보건원) | RSS + Google News 폴백 |
| PubMed | NCBI E-utilities (esearch + efetch, 최근 발병/감염병 논문) |
| Medical Xpress | RSS |
| Google News — Health | RSS (Health 토픽) |
| Reuters Health | Google News RSS (`site:reuters.com`) |

> Reuters·NIH 등 공식 RSS가 불안정한 소스는 Google News RSS의 `site:` 검색을 폴백으로 사용합니다.

## 아키텍처

```
Vercel Cron (하루 1회, 00:00 UTC = 09:00 KST)
        │
        ▼
/api/cron/crawl  ──►  lib/crawl.ts  runCrawl()
        │                  │
        │   1) 7개 소스 RSS/API 수집 → 신규 기사만 Supabase upsert (source_url 중복 제거)
        │   2) 미요약 기사 → openrouter/auto 로 한국어 요약 + 질병/카테고리 태깅
        ▼
Supabase: articles, crawl_runs   ◄── 대시보드(/)에서 공개 읽기(RLS)
```

- **수집·요약 로직**: `lib/crawl.ts` — Cron 라우트와 대시보드 "지금 수집" 버튼(서버 액션)이 공유
- **LLM**: `lib/llm.ts` — OpenRouter `openrouter/auto` (자동 모델 라우팅), JSON 응답 파싱
- **DB 쓰기**: `service_role` 키로 RLS 우회 (서버 전용)
- **DB 읽기**: 공개(anon/publishable) 키 + RLS `select` 정책

## 환경변수

`.env.example` 참고. Vercel 프로젝트 환경변수에 설정합니다.

| 변수 | 설명 | 노출 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | 공개 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | publishable/anon 키 | 공개 |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role 키 (쓰기) | **서버 전용** |
| `OPENROUTER_API_KEY` | OpenRouter API 키 | **서버 전용** |
| `CRON_SECRET` | Cron 인증용 시크릿 | **서버 전용** |

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev                  # http://localhost:3000
```

수집을 수동 실행하려면 대시보드의 **지금 수집** 버튼을 누르거나:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/crawl
```

## DB 스키마

`articles`(기사 + 한국어 요약/질병/카테고리), `crawl_runs`(수집 실행 로그).
마이그레이션은 Supabase에 이미 적용되어 있습니다.

---
배포: Vercel · DB: Supabase · 요약: OpenRouter (openrouter/auto)
