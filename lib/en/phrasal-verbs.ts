import type { PhrasalVerb } from "./types";

export const PHRASAL_VERBS: PhrasalVerb[] = [
  // ── BREAK ──
  { id: "pv001", phrase: "break up", cefrLevel: "A2", meaning: "헤어지다; 해산하다", example: { en: "They broke up after three years.", ko: "그들은 3년 후에 헤어졌다." }, separable: false },
  { id: "pv002", phrase: "break down", cefrLevel: "B1", meaning: "고장 나다; 무너지다", example: { en: "My car broke down on the highway.", ko: "고속도로에서 차가 고장났다." }, separable: false },
  { id: "pv003", phrase: "break out", cefrLevel: "B1", meaning: "발생하다; 탈출하다", example: { en: "A fire broke out in the warehouse.", ko: "창고에서 화재가 발생했다." }, separable: false },
  { id: "pv004", phrase: "break through", cefrLevel: "B2", meaning: "돌파하다; 성공하다", example: { en: "The team broke through all obstacles.", ko: "팀은 모든 장애물을 돌파했다." }, separable: false },
  // ── COME ──
  { id: "pv010", phrase: "come up with", cefrLevel: "B1", meaning: "생각해 내다", example: { en: "She came up with a brilliant solution.", ko: "그녀가 훌륭한 해결책을 생각해냈다." }, separable: false },
  { id: "pv011", phrase: "come across", cefrLevel: "B1", meaning: "우연히 만나다; ~처럼 보이다", example: { en: "I came across an old photo.", ko: "오래된 사진을 우연히 발견했다." }, separable: false },
  { id: "pv012", phrase: "come down with", cefrLevel: "B1", meaning: "(병에) 걸리다", example: { en: "I came down with a cold.", ko: "감기에 걸렸다." }, separable: false },
  { id: "pv013", phrase: "come back", cefrLevel: "A1", meaning: "돌아오다", example: { en: "When will you come back?", ko: "언제 돌아올 거야?" }, separable: false },
  // ── GET ──
  { id: "pv020", phrase: "get along with", cefrLevel: "B1", meaning: "~와 잘 지내다", example: { en: "I get along well with my colleagues.", ko: "나는 동료들과 잘 지낸다." }, separable: false },
  { id: "pv021", phrase: "get away with", cefrLevel: "B2", meaning: "~를 무사히 넘기다", example: { en: "You can't get away with lying.", ko: "거짓말로 넘어갈 수 없다." }, separable: false },
  { id: "pv022", phrase: "get over", cefrLevel: "B1", meaning: "극복하다; 회복하다", example: { en: "It took me weeks to get over the breakup.", ko: "이별을 극복하는 데 몇 주가 걸렸다." }, separable: false },
  { id: "pv023", phrase: "get rid of", cefrLevel: "B1", meaning: "없애다, 제거하다", example: { en: "I need to get rid of these old clothes.", ko: "이 오래된 옷들을 없애야 한다." }, separable: false },
  { id: "pv024", phrase: "get through", cefrLevel: "B1", meaning: "통과하다; 연락이 되다", example: { en: "I couldn't get through to the support team.", ko: "지원팀에 연락이 닿지 않았다." }, separable: false },
  // ── GIVE ──
  { id: "pv030", phrase: "give up", cefrLevel: "A2", meaning: "포기하다", example: { en: "Don't give up — keep trying!", ko: "포기하지 마 — 계속 노력해!" }, separable: true },
  { id: "pv031", phrase: "give in", cefrLevel: "B1", meaning: "굴복하다, 양보하다", example: { en: "After long negotiations, they gave in.", ko: "긴 협상 끝에 그들은 굴복했다." }, separable: false },
  { id: "pv032", phrase: "give away", cefrLevel: "B1", meaning: "무료로 주다; 비밀을 누설하다", example: { en: "She gave away all her old books.", ko: "그녀는 오래된 책을 모두 나눠줬다." }, separable: true },
  // ── GO ──
  { id: "pv040", phrase: "go through", cefrLevel: "B1", meaning: "겪다; 검토하다", example: { en: "Let's go through the plan one more time.", ko: "계획을 한 번 더 검토해봅시다." }, separable: false },
  { id: "pv041", phrase: "go ahead", cefrLevel: "A2", meaning: "진행하다; 먼저 하다", example: { en: "Go ahead and start without me.", ko: "먼저 시작해도 돼." }, separable: false },
  { id: "pv042", phrase: "go over", cefrLevel: "B1", meaning: "검토하다, 복습하다", example: { en: "Please go over your answers before submitting.", ko: "제출하기 전에 답변을 검토하세요." }, separable: false },
  // ── LOOK ──
  { id: "pv050", phrase: "look up", cefrLevel: "A2", meaning: "찾아보다; (상황이) 나아지다", example: { en: "Look up the word in the dictionary.", ko: "사전에서 단어를 찾아봐." }, separable: true },
  { id: "pv051", phrase: "look for", cefrLevel: "A1", meaning: "찾다, 구하다", example: { en: "I'm looking for my keys.", ko: "열쇠를 찾고 있어." }, separable: false },
  { id: "pv052", phrase: "look after", cefrLevel: "A2", meaning: "돌보다", example: { en: "Can you look after my dog this weekend?", ko: "이번 주말에 내 강아지 돌봐줄 수 있어?" }, separable: false },
  { id: "pv053", phrase: "look forward to", cefrLevel: "A2", meaning: "기대하다", example: { en: "I look forward to meeting you.", ko: "만나뵙기를 기대합니다." }, separable: false },
  { id: "pv054", phrase: "look into", cefrLevel: "B1", meaning: "조사하다", example: { en: "The police are looking into the incident.", ko: "경찰이 그 사건을 조사하고 있다." }, separable: false },
  // ── MAKE ──
  { id: "pv060", phrase: "make up", cefrLevel: "B1", meaning: "화해하다; 만들어 내다; 구성하다", example: { en: "They argued but made up the next day.", ko: "그들은 다퉜지만 다음날 화해했다." }, separable: true },
  { id: "pv061", phrase: "make up for", cefrLevel: "B2", meaning: "보충하다, 만회하다", example: { en: "How can I make up for being late?", ko: "지각한 것을 어떻게 만회할 수 있을까?" }, separable: false },
  { id: "pv062", phrase: "make out", cefrLevel: "B1", meaning: "이해하다; (잘) 알아보다", example: { en: "I can't make out what he's saying.", ko: "그가 무슨 말을 하는지 이해할 수 없어." }, separable: true },
  // ── PUT ──
  { id: "pv070", phrase: "put off", cefrLevel: "B1", meaning: "미루다, 연기하다", example: { en: "Stop putting off your homework.", ko: "숙제를 미루는 것을 그만해." }, separable: true },
  { id: "pv071", phrase: "put up with", cefrLevel: "B1", meaning: "참다, 감수하다", example: { en: "I can't put up with this noise.", ko: "이 소음을 더 이상 참을 수 없어." }, separable: false },
  { id: "pv072", phrase: "put away", cefrLevel: "A2", meaning: "치우다, 보관하다", example: { en: "Please put away your toys.", ko: "장난감을 치워주세요." }, separable: true },
  // ── RUN ──
  { id: "pv080", phrase: "run into", cefrLevel: "B1", meaning: "우연히 만나다; ~에 부딪히다", example: { en: "I ran into an old friend at the mall.", ko: "쇼핑몰에서 옛 친구를 우연히 만났다." }, separable: false },
  { id: "pv081", phrase: "run out of", cefrLevel: "A2", meaning: "다 떨어지다, 바닥나다", example: { en: "We've run out of milk.", ko: "우유가 다 떨어졌어." }, separable: false },
  { id: "pv082", phrase: "run for", cefrLevel: "B1", meaning: "(선거에) 출마하다", example: { en: "She is running for president.", ko: "그녀는 대통령 선거에 출마하고 있다." }, separable: false },
  // ── TAKE ──
  { id: "pv090", phrase: "take off", cefrLevel: "A2", meaning: "이륙하다; 벗다; 급성장하다", example: { en: "The plane takes off at 8 AM.", ko: "비행기는 오전 8시에 이륙한다." }, separable: true },
  { id: "pv091", phrase: "take on", cefrLevel: "B1", meaning: "맡다; 고용하다", example: { en: "She took on more responsibility.", ko: "그녀는 더 많은 책임을 맡았다." }, separable: true },
  { id: "pv092", phrase: "take care of", cefrLevel: "A2", meaning: "돌보다; 처리하다", example: { en: "I'll take care of the arrangements.", ko: "내가 준비를 처리할게." }, separable: false },
  { id: "pv093", phrase: "take up", cefrLevel: "B1", meaning: "시작하다; 차지하다", example: { en: "I took up yoga last year.", ko: "작년에 요가를 시작했다." }, separable: true },
  { id: "pv094", phrase: "take over", cefrLevel: "B2", meaning: "인수하다; 장악하다", example: { en: "The company was taken over by a rival.", ko: "그 회사는 경쟁사에 인수됐다." }, separable: true },
  // ── TURN ──
  { id: "pv100", phrase: "turn up", cefrLevel: "A2", meaning: "나타나다; 음량을 높이다", example: { en: "She didn't turn up to the meeting.", ko: "그녀는 회의에 나타나지 않았다." }, separable: true },
  { id: "pv101", phrase: "turn down", cefrLevel: "B1", meaning: "거절하다; 줄이다", example: { en: "He turned down the job offer.", ko: "그는 취업 제의를 거절했다." }, separable: true },
  { id: "pv102", phrase: "turn into", cefrLevel: "B1", meaning: "변하다, ~이 되다", example: { en: "The caterpillar turned into a butterfly.", ko: "애벌레가 나비가 되었다." }, separable: false },
  // ── WORK ──
  { id: "pv110", phrase: "work out", cefrLevel: "B1", meaning: "운동하다; 해결되다; 계산하다", example: { en: "Everything will work out in the end.", ko: "결국에는 모든 것이 잘 될 것이다." }, separable: true },
  { id: "pv111", phrase: "work on", cefrLevel: "A2", meaning: "~에 노력하다; 작업하다", example: { en: "I'm working on improving my English.", ko: "영어 실력을 향상시키기 위해 노력하고 있다." }, separable: false },
  { id: "pv112", phrase: "figure out", cefrLevel: "B1", meaning: "이해하다; 해결하다", example: { en: "Can you figure out what went wrong?", ko: "무엇이 잘못됐는지 알 수 있어?" }, separable: true },
  { id: "pv113", phrase: "carry out", cefrLevel: "B1", meaning: "수행하다, 실행하다", example: { en: "The experiment was carried out successfully.", ko: "실험은 성공적으로 수행되었다." }, separable: true },
  { id: "pv114", phrase: "set up", cefrLevel: "B1", meaning: "설립하다; 설치하다; 준비하다", example: { en: "They set up a new company last year.", ko: "그들은 작년에 새 회사를 설립했다." }, separable: true },
  { id: "pv115", phrase: "point out", cefrLevel: "B1", meaning: "지적하다, 언급하다", example: { en: "She pointed out several errors in the report.", ko: "그녀는 보고서의 여러 오류를 지적했다." }, separable: true },
];
