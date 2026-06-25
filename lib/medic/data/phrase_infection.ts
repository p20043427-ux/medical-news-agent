// 감염관리(ICT) 직원 교류 회화집 — 한일 종합병원 직원 상호방문용.
// 방문 감염관리 담당자(연수자)와 호스트 병원 감염관리팀(ICT) 사이의 직원 대 직원 전문 대화로 구성.
// 환자 응대 문장은 포함하지 않으며, 모두 동료 간 견학·질의·비교 표현입니다.
// 모든 문장은 한국어·일본어를 함께 노출하며, jaReading 은 TTS·후리가나용 전체 가나 읽기.
// ⚠️ 시스템·용어 표현은 실제 운용 전 양국 병원 직원의 검수가 필요합니다.

import type { MedPhraseGroup } from "../types";

export const PHRASES_INFECTION: MedPhraseGroup[] = [
  // ────────────────────────────── 감염관리 체계 견학 ──────────────────────────────
  {
    key: "infection-system",
    role: "infection",
    titleKo: "감염관리 체계 견학",
    titleJa: "感染対策体制の見学",
    emoji: "🦠",
    phrases: [
      {
        ko: "오늘 감염관리팀 체계를 견학하게 되어 감사합니다. 잘 부탁드립니다.",
        koRomaja: "oneul gamyeomgwalli tim chegyereul gyeonhakage doeeo gamsahamnida. jal butakdeurimnida.",
        koPron: "オヌル カミョムグァルリ ティム チェギェルル キョナカゲ テウォ カムサハムニダ. チャル プタットゥリムニダ.",
        ja: "本日は感染対策チームの体制を見学させていただき、ありがとうございます。よろしくお願いいたします。",
        jaReading: "ほんじつはかんせんたいさくチームのたいせいをけんがくさせていただき、ありがとうございます。よろしくおねがいいたします。",
        jaPron: "혼지츠와 칸센타이사쿠 치-무노 타이세이오 켄가쿠 사세테 이타다키, 아리가토우 고자이마스. 요로시쿠 오네가이 이타시마스.",
        noteKo: "ICT(감염관리팀)는 일본에서도 'ICT'로 통용됩니다.",
        noteJa: "ICT(感染対策チーム)は韓国でも『ICT』『감염관리팀』と呼ばれます。",
      },
      {
        ko: "감염관리팀은 어떤 직종으로 구성되어 있나요?",
        koRomaja: "gamyeomgwalli timeun eotteon jikjongeuro guseongdoeeo innayo?",
        koPron: "カミョムグァルリ ティムン オットン チクチョンウロ クソンドェオ インナヨ?",
        ja: "感染対策チームは、どのような職種で構成されていますか。",
        jaReading: "かんせんたいさくチームは、どのようなしょくしゅでこうせいされていますか。",
        jaPron: "칸센타이사쿠 치-무와, 도노요우나 쇼쿠슈데 코우세이 사레테 이마스카.",
      },
      {
        ko: "손위생 준수율은 어떤 방법으로 모니터링하시나요?",
        koRomaja: "sonwisaeng junsuyureun eotteon bangbeobeuro moniteoringhasinayo?",
        koPron: "ソヌィセン チュンスユルン オットン パンボブロ モニトリンハシナヨ?",
        ja: "手指衛生の遵守率は、どのような方法でモニタリングされていますか。",
        jaReading: "しゅしえいせいのじゅんしゅりつは、どのようなほうほうでモニタリングされていますか。",
        jaPron: "슈시에이세이노 준슈리츠와, 도노요우나 호우호우데 모니타링구 사레테 이마스카.",
        noteKo: "手指衛生(슈시에이세이) = 손위생. 직접관찰·전자모니터링 등이 있습니다.",
        noteJa: "手指衛生は韓国語で『손위생(ソヌィセン)』です。",
      },
      {
        ko: "격리실은 음압 병실로 운영되고 있나요?",
        koRomaja: "gyeokrisireun eumap byeongsillo unyeongdoego innayo?",
        koPron: "キョンニシルン ウマプ ビョンシルロ ウニョンドェゴ インナヨ?",
        ja: "隔離室は陰圧室として運用されていますか。",
        jaReading: "かくりしつはいんあつしつとしてうんようされていますか。",
        jaPron: "카쿠리시츠와 인아츠시츠토시테 운요우 사레테 이마스카.",
      },
      {
        ko: "개인보호구 착탈의는 어디에서 어떻게 교육하시나요?",
        koRomaja: "gaeinbohogu chaktaluineun eodieseo eotteoke gyoyukasinayo?",
        koPron: "ケインボホグ チャクタルイヌン オディエソ オットケ キョユカシナヨ?",
        ja: "個人防護具の着脱は、どこでどのように教育されていますか。",
        jaReading: "こじんぼうごぐのちゃくだつは、どこでどのようにきょういくされていますか。",
        jaPron: "코진보우고구노 챠쿠다츠와, 도코데 도노요우니 쿄우이쿠 사레테 이마스카.",
      },
      {
        ko: "항균제 관리 프로그램은 어느 부서가 주도하나요?",
        koRomaja: "hanggyunje gwalli peurogeuraemeun eoneu buseoga judohanayo?",
        koPron: "ハンギュンジェ グァルリ プログレムン オヌ プソガ チュドハナヨ?",
        ja: "抗菌薬適正使用支援プログラムは、どの部署が主導していますか。",
        jaReading: "こうきんやくてきせいしようしえんプログラムは、どのぶしょがしゅどうしていますか。",
        jaPron: "코우킨야쿠 테키세이시요우 시엔 푸로구라무와, 도노 부쇼가 슈도우시테 이마스카.",
      },
    ],
  },
  // ────────────────────────────── 감시·교육·발생 대응 ──────────────────────────────
  {
    key: "infection-response",
    role: "infection",
    titleKo: "감시·교육·발생 대응",
    titleJa: "サーベイランス・教育・発生対応",
    emoji: "📊",
    phrases: [
      {
        ko: "의료관련감염 감시 지표는 어떤 항목을 수집하시나요?",
        koRomaja: "uiryogwallyeongamyeom gamsi jipyoneun eotteon hangmogeul sujibasinayo?",
        koPron: "ウィリョグァルリョンガミョム カムシ チピョヌン オットン ハンモグル スジバシナヨ?",
        ja: "医療関連感染のサーベイランス指標は、どの項目を収集されていますか。",
        jaReading: "いりょうかんれんかんせんのサーベイランスしひょうは、どのこうもくをしゅうしゅうされていますか。",
        jaPron: "이료우칸렌칸센노 사-베이란스 시효우와, 도노 코우모쿠오 슈우슈우 사레테 이마스카.",
        noteKo: "의료관련감염 = HAI(Healthcare-Associated Infection), 일본어로 医療関連感染.",
        noteJa: "HAI(医療関連感染)は韓国語で『의료관련감염(ウィリョグァルリョンガミョム)』です。",
      },
      {
        ko: "감시 결과는 부서에 어떤 주기로 피드백하시나요?",
        koRomaja: "gamsi gyeolgwaneun buseoe eotteon jugiro pideubaekasinayo?",
        koPron: "カムシ キョルグァヌン プソエ オットン チュギロ ピドゥベカシナヨ?",
        ja: "サーベイランスの結果は、各部署にどのくらいの頻度でフィードバックされていますか。",
        jaReading: "サーベイランスのけっかは、かくぶしょにどのくらいのひんどでフィードバックされていますか。",
        jaPron: "사-베이란스노 켓카와, 카쿠 부쇼니 도노쿠라이노 힌도데 휘-도밧쿠 사레테 이마스카.",
      },
      {
        ko: "신규 직원 대상 감염관리 교육은 어떻게 진행하시나요?",
        koRomaja: "singyu jigwon daesang gamyeomgwalli gyoyugeun eotteoke jinhaenghasinayo?",
        koPron: "シンギュ チグォン テサン カミョムグァルリ キョユグン オットケ チナンハシナヨ?",
        ja: "新入職員向けの感染対策教育は、どのように行われていますか。",
        jaReading: "しんにゅうしょくいんむけのかんせんたいさくきょういくは、どのようにおこなわれていますか。",
        jaPron: "신뉴우쇼쿠인 무케노 칸센타이사쿠 쿄우이쿠와, 도노요우니 오코나와레테 이마스카.",
      },
      {
        ko: "집단발생이 의심될 때 초기 대응 절차를 알려 주시겠어요?",
        koRomaja: "jipdanbalsaengi uisimdoel ttae chogi daeeung jeolchareul allyeo jusigesseoyo?",
        koPron: "チプタンバルセンイ ウィシムドェル ッテ チョギ テウン チョルチャルル アルリョ チュシゲッソヨ?",
        ja: "アウトブレイクが疑われた際の、初期対応の手順を教えていただけますか。",
        jaReading: "アウトブレイクがうたがわれたさいの、しょきたいおうのてじゅんをおしえていただけますか。",
        jaPron: "아우토부레이쿠가 우타가와레타 사이노, 쇼키타이오우노 테준오 오시에테 이타다케마스카.",
      },
      {
        ko: "발생 시 보고 라인과 외부 신고 기준은 어떻게 되나요?",
        koRomaja: "balsaeng si bogo raingwa oebu singo gijuneun eotteoke doenayo?",
        koPron: "パルセン シ ポゴ ラインガ ウェブ シンゴ キジュヌン オットケ テナヨ?",
        ja: "発生時の報告ラインと、外部への届出基準はどのようになっていますか。",
        jaReading: "はっせいじのほうこくラインと、がいぶへのとどけでききじゅんはどのようになっていますか。",
        jaPron: "핫세이지노 호우코쿠 라인토, 가이부에노 토도케데 키준와 도노요우니 낫테 이마스카.",
      },
      {
        ko: "저희 병원과 프로토콜을 비교해 보고 싶은데, 자료를 공유해 주실 수 있나요?",
        koRomaja: "jeohui byeongwongwa peurotokoreul bigyohae bogo sipeunde, jaryoreul gongyuhae jusil su innayo?",
        koPron: "チョフィ ビョンウォングァ プロトコルル ピギョヘ ポゴ シプンデ, チャリョルル コンユヘ チュシル ス インナヨ?",
        ja: "当院とプロトコルを比較してみたいので、資料を共有していただけますか。",
        jaReading: "とういんとプロトコルをひかくしてみたいので、しりょうをきょうゆうしていただけますか。",
        jaPron: "토우인토 푸로토코루오 히카쿠시테 미타이노데, 시료우오 쿄우유우시테 이타다케마스카.",
      },
    ],
  },
];
