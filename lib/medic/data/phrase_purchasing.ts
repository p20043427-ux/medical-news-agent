// 의료교류 구매·조달 회화집 — 은성의료재단 ↔ 가마치그룹 직원 상호방문용.
// 방문한 구매·조달(購買·調達) 담당 직원과 호스트 병원 구매 담당자 사이의 직원 대 직원 대화로 구성.
// 환자 응대 표현은 포함하지 않으며, 모든 문장은 교류·업무 비교를 위한 동료 간 대화입니다.
// jaReading 은 TTS·후리가나용 전체 가나 읽기. ⚠️ 실제 운용 전 양국 병원 직원의 검수가 필요합니다.

import type { MedPhraseGroup } from "../types";

export const PHRASES_PURCHASING: MedPhraseGroup[] = [
  // ───────────────────────── 구매·조달 프로세스 ─────────────────────────
  {
    key: "procurement",
    role: "purchasing",
    titleKo: "구매·조달 프로세스",
    titleJa: "購買・調達プロセス",
    emoji: "🧾",
    phrases: [
      {
        ko: "귀 병원의 입찰부터 계약까지 전체 절차를 먼저 듣고 싶습니다.",
        koRomaja: "gwi byeongwon-ui ipchalbuteo gyeyakkkaji jeonche jeolchareul meonjeo deutgo sipseumnida.",
        ja: "貴院の入札から契約までの全体の流れを、まず伺いたく存じます。",
        jaReading: "きいんのにゅうさつからけいやくまでのぜんたいのながれを、まずうかがいたくぞんじます。",
        koPron: "クィ ビョングォネ イプチャルブト ケヤッカジ チョンチェ チョルチャルル モンジョ トゥッコ シプスムニダ.",
        jaPron: "키인노 뉴우사츠카라 케이야쿠마데노 젠타이노 나가레오, 마즈 우카가이타쿠 존지마스.",
      },
      {
        ko: "고가 의료기기는 공개경쟁입찰로 발주하시는지요?",
        koRomaja: "goga uiryogigineun gonggaegyeongjaeng-ipchallo baljuhasineunjiyo?",
        ja: "高額の医療機器は、一般競争入札で発注されていますか。",
        jaReading: "こうがくのいりょうききは、いっぱんきょうそうにゅうさつではっちゅうされていますか。",
        koPron: "コガ ウィリョギギヌン コンゲギョンジェンイプチャルロ パルジュハシヌンジヨ?",
        jaPron: "코우가쿠노 이료우키키와, 입판쿄우소우뉴우사츠데 핫츄우사레테이마스카.",
        noteKo: "한국 종합병원은 일정 금액 이상 구매 시 공개경쟁입찰을 원칙으로 하는 경우가 많습니다.",
        noteJa: "韓国の総合病院では、一定金額以上の購入は一般競争入札を原則とする場合が多いです。",
      },
      {
        ko: "신규 거래처 등록 시 어떤 자격 심사를 거치는지 궁금합니다.",
        koRomaja: "singyu georaecheo deungnok si eotteon jagyeok simsareul geochineunji gunggeumhamnida.",
        ja: "新規取引先の登録時に、どのような資格審査を行うのか伺いたいです。",
        jaReading: "しんきとりひきさきのとうろくじに、どのようなしかくしんさをおこなうのかうかがいたいです。",
        koPron: "シンギュ コレチョ トゥンノク シ オットン チャギョク シムサルル コチヌンジ クングムハムニダ.",
        jaPron: "신키토리히키사키노 토우로쿠지니, 도노요우나 시카쿠신사오 오코나우노카 우카가이타이데스.",
      },
      {
        ko: "신규 의료기기 도입 시 임상 부서의 평가를 어떻게 반영하십니까?",
        koRomaja: "singyu uiryogigi doip si imsang buseo-ui pyeonggareul eotteoke banyeonghasimnikka?",
        ja: "新しい医療機器の導入時、臨床部門の評価をどのように反映されますか。",
        jaReading: "あたらしいいりょうききのどうにゅうじ、りんしょうぶもんのひょうかをどのようにはんえいされますか。",
        koPron: "シンギュ ウィリョギギ トイプ シ イムサン ブソエ ピョンガルル オットケ パニョンハシムニッカ?",
        jaPron: "아타라시이 이료우키키노 도우뉴우지, 린쇼우부몬노 효우카오 도노요우니 한에이사레마스카.",
      },
      {
        ko: "구매 요청부터 최종 승인까지 결재 단계는 몇 단계입니까?",
        koRomaja: "gumae yocheongbuteo choejong seung-inkkaji gyeoljae dangyeneun myeot dangyeimnikka?",
        ja: "購買申請から最終承認まで、決裁の段階はいくつございますか。",
        jaReading: "こうばいしんせいからさいしゅうしょうにんまで、けっさいのだんかいはいくつございますか。",
        koPron: "クメ ヨチョンブト チェジョン スンインッカジ キョルジェ タンゲヌン ミョッ タンゲイムニッカ?",
        jaPron: "코우바이신세이카라 사이슈우쇼우닌마데, 켓사이노 단카이와 이쿠츠 고자이마스카.",
      },
      {
        ko: "두 병원의 단가 계약 방식을 비교해 보면 좋겠습니다.",
        koRomaja: "du byeongwon-ui danga gyeyak bangsigeul bigyohae bomyeon jokesseumnida.",
        ja: "両院の単価契約の方式を、比較してみたく存じます。",
        jaReading: "りょういんのたんかけいやくのほうしきを、ひかくしてみたくぞんじます。",
        koPron: "トゥ ビョングォネ タンガ ケヤク パンシグル ピギョヘ ボミョン チョケッスムニダ.",
        jaPron: "료우인노 탄카케이야쿠노 호우시키오, 히카쿠시테미타쿠 존지마스.",
      },
    ],
  },
  // ───────────────────────── 자재·물류·재고 ─────────────────────────
  {
    key: "supply-chain",
    role: "purchasing",
    titleKo: "자재·물류·재고",
    titleJa: "資材・物流・在庫",
    emoji: "📦",
    phrases: [
      {
        ko: "병동 소모품 재고는 어떤 기준으로 적정 수량을 관리하십니까?",
        koRomaja: "byeongdong somopum jaegoneun eotteon gijuneuro jeokjeong suryangeul gwallihasimnikka?",
        ja: "病棟の消耗品在庫は、どのような基準で適正数量を管理されていますか。",
        jaReading: "びょうとうのしょうもうひんざいこは、どのようなきじゅんでてきせいすうりょうをかんりされていますか。",
        koPron: "ビョンドン ソモプム チェゴヌン オットン キジュヌロ チョクチョン スリャンウル クァルリハシムニッカ?",
        jaPron: "뵤우토우노 쇼우모우힌자이코와, 도노요우나 키준데 테키세이스우료우오 칸리사레테이마스카.",
      },
      {
        ko: "귀 병원은 SPD 방식을 도입하셨다고 들었습니다.",
        koRomaja: "gwi byeongwoneun SPD bangsigeul doiphasyeotdago deureosseumnida.",
        ja: "貴院ではSPD方式を導入されたと伺いました。",
        jaReading: "きいんではエスピーディーほうしきをどうにゅうされたとうかがいました。",
        koPron: "クィ ビョングォヌン エスピーディー バンシグル トイプハショッタゴ トゥロッスムニダ.",
        jaPron: "키인데와 에스피이디이 호우시키오 도우뉴우사레타토 우카가이마시타.",
        noteKo: "SPD(Supply Processing & Distribution)는 원내 물품의 공급·가공·배송을 통합 관리하는 물류 방식으로, 일본 병원에서 널리 쓰입니다.",
        noteJa: "SPD（Supply Processing & Distribution）は院内物品の供給・加工・配送を一括管理する物流方式で、日本の病院で広く用いられています。",
      },
      {
        ko: "정수 관리와 청구 방식의 차이를 자세히 설명해 주시겠습니까?",
        koRomaja: "jeongsu gwalliwa cheonggu bangsig-ui chaireul jasehi seolmyeonghae jusigesseumnikka?",
        ja: "定数管理と請求方式の違いを、詳しくご説明いただけますか。",
        jaReading: "ていすうかんりとせいきゅうほうしきのちがいを、くわしくごせつめいいただけますか。",
        koPron: "チョンス クァルリワ チョング バンシゲ チャイルル チャセヒ ソルミョンヘ チュシゲッスムニッカ?",
        jaPron: "테이스우칸리토 세이큐우호우시키노 치가이오, 쿠와시쿠 고세츠메이 이타다케마스카.",
        noteKo: "정수(定数) 관리는 병동별 비치 수량을 정해 두고 사용분만큼 보충하는 방식으로, SPD 운영의 핵심 개념입니다.",
        noteJa: "定数管理は病棟ごとの配置数を定め、使用分だけ補充する方式で、SPD運用の中心となる考え方です。",
      },
      {
        ko: "유효기한이 임박한 재고는 선입선출로 관리하고 있습니다.",
        koRomaja: "yuhyogihani imbakhan jaegoneun seonipseonchullo gwallihago itseumnida.",
        ja: "有効期限が近い在庫は、先入先出で管理しております。",
        jaReading: "ゆうこうきげんがちかいざいこは、さきいれさきだしでかんりしております。",
        koPron: "ユヒョギハニ イムバカン チェゴヌン ソニプソンチュルロ クァルリハゴ イッスムニダ.",
        jaPron: "유우코우키겐가 치카이 자이코와, 사키이레사키다시데 칸리시테 오리마스.",
      },
      {
        ko: "응급 물품의 결품을 막기 위한 안전재고 기준이 궁금합니다.",
        koRomaja: "eunggeup mulpum-ui gyeolpumeul makgi wihan anjeonjaego gijuni gunggeumhamnida.",
        ja: "緊急物品の欠品を防ぐための、安全在庫の基準を伺いたいです。",
        jaReading: "きんきゅうぶっぴんのけっぴんをふせぐための、あんぜんざいこのきじゅんをうかがいたいです。",
        koPron: "ウングプ ムルプメ キョルプムル マッキ ウィハン アンジョンジェゴ キジュニ クングムハムニダ.",
        jaPron: "킨큐우붓핀노 켓핀오 후세구타메노, 안젠자이코노 키준오 우카가이타이데스.",
      },
      {
        ko: "두 병원의 물류 시스템을 비교해 개선점을 함께 찾아보고 싶습니다.",
        koRomaja: "du byeongwon-ui mullyu siseutemeul bigyohae gaeseonjeomeul hamkke chajabogo sipseumnida.",
        ja: "両院の物流システムを比較し、改善点を一緒に探したく存じます。",
        jaReading: "りょういんのぶつりゅうシステムをひかくし、かいぜんてんをいっしょにさがしたくぞんじます。",
        koPron: "トゥ ビョングォネ ムルリュ システムル ピギョヘ ケソンジョムル ハムッケ チャジャボゴ シプスムニダ.",
        jaPron: "료우인노 부츠류우 시스테무오 히카쿠시, 카이젠텐오 잇쇼니 사가시타쿠 존지마스.",
      },
    ],
  },
];
