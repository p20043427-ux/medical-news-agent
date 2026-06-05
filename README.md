# 🩺 의료 뉴스 Agent (Medical News Agent)

최신 **질병 정보**를 7개 소스에서 자동 수집하고 `openrouter/auto` LLM으로 **한국어 요약**하는 에이전트입니다.
Next.js로 만들어 **Vercel**에 배포하고, 데이터는 **Supabase(Postgres)**에 저장합니다.

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
