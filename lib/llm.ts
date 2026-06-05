const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const CATEGORIES = [
  "감염병/발병",
  "연구",
  "정책/지침",
  "의약품/백신",
  "공중보건",
  "기타",
] as const;

export interface Summary {
  summary_ko: string;
  diseases: string[];
  category: string;
  model: string;
}

const SYSTEM_PROMPT = `당신은 한국 의료기관 전산팀을 위한 의료 뉴스 요약 전문가입니다.
주어진 영문 의료/질병 뉴스(제목과 본문/초록)를 읽고 아래 JSON만 출력하세요.

규칙:
- summary_ko: 핵심을 한국어로 2~4문장으로 정확히 요약. 과장/추측 금지, 원문에 있는 사실만.
- diseases: 기사에서 언급된 질병/병원체 이름 배열(한국어 우선, 없으면 영어). 없으면 빈 배열.
- category: 다음 중 정확히 하나 — "감염병/발병", "연구", "정책/지침", "의약품/백신", "공중보건", "기타".
- 반드시 유효한 JSON 객체만 출력. 설명/마크다운/코드펜스 금지.`;

function extractJson(text: string): Record<string, unknown> | null {
  // 코드펜스나 잡텍스트가 섞여도 첫 {...} 블록 추출
  const fenced = text.replace(/```json|```/gi, "");
  const start = fenced.indexOf("{");
  const end = fenced.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(fenced.slice(start, end + 1));
  } catch {
    return null;
  }
}

/**
 * openrouter/auto 로 기사 1건을 한국어 요약 + 질병/카테고리 태깅.
 * 실패 시 throw.
 */
export async function summarizeArticle(input: {
  title: string;
  body: string | null;
  source: string;
}): Promise<Summary> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY 환경변수가 없습니다.");

  const userContent =
    `[출처] ${input.source}\n[제목] ${input.title}\n[본문]\n` +
    (input.body ? input.body.slice(0, 6000) : "(본문 없음 — 제목 기준 요약)");

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://github.com/medical-news-agent",
      "X-Title": "Medical News Agent",
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      temperature: 0.2,
      max_tokens: 700,
      response_format: { type: "json_object" },
    }),
    signal: AbortSignal.timeout(45000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`OpenRouter HTTP ${res.status}: ${errText.slice(0, 300)}`);
  }

  const data = (await res.json()) as {
    model?: string;
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content ?? "";
  const parsed = extractJson(content);
  if (!parsed) {
    throw new Error(`LLM 응답 JSON 파싱 실패: ${content.slice(0, 200)}`);
  }

  const category =
    typeof parsed.category === "string" &&
    (CATEGORIES as readonly string[]).includes(parsed.category)
      ? (parsed.category as string)
      : "기타";

  const diseases = Array.isArray(parsed.diseases)
    ? parsed.diseases.map((d) => String(d)).filter(Boolean).slice(0, 10)
    : [];

  const summary_ko =
    typeof parsed.summary_ko === "string" ? parsed.summary_ko.trim() : "";
  if (!summary_ko) throw new Error("LLM 요약문이 비어 있습니다.");

  return {
    summary_ko,
    diseases,
    category,
    model: data.model ?? "openrouter/auto",
  };
}
