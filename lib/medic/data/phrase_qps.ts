// 의료교류 의료질·환자안전(QPS) 회화집 — 은성의료재단 ↔ 가마치그룹 직원 상호방문용.
// 방문한 의료질·환자안전(QPS) 담당 직원과 호스트 병원 품질·안전관리 담당자 사이의 직원 대 직원 대화로 구성.
// 환자 직접 응대 표현은 포함하지 않으며, 모든 문장은 질 관리·안전 체계 비교를 위한 동료 간 대화입니다.
// jaReading 은 TTS·후리가나용 전체 가나 읽기. ⚠️ 실제 운용 전 양국 병원 직원의 검수가 필요합니다.

import type { MedPhraseGroup } from "../types";

export const PHRASES_QPS: MedPhraseGroup[] = [
  // ───────────────────────── 의료질 관리·지표 ─────────────────────────
  {
    key: "quality-mgmt",
    role: "qps",
    titleKo: "의료질 관리·지표",
    titleJa: "医療の質管理・指標",
    emoji: "📈",
    phrases: [
      {
        ko: "귀원의 질 개선(QI) 활동은 어떤 위원회를 중심으로 운영되고 있나요?",
        koRomaja: "gwiwonui jil gaeseon(QI) hwaldongeun eotteon wiwonhoereul jungsimeuro unyeongdoego innayo?",
        ja: "貴院の質改善（QI）活動は、どの委員会を中心に運営しておられますか。",
        jaReading: "きいんのしつかいぜん（キューアイ）かつどうは、どのいいんかいをちゅうしんにうんえいしておられますか。",
        koPron: "クィウォヌィ チル ケソン(キューアイ) ファルドンウン オットン ウィウォンフェルル チュンシムロ ウニョンドェゴ インナヨ?",
        jaPron: "키인노 시츠카이젠(큐우아이) 카츠도우와, 도노 이인카이오 츄우신니 운에이시테 오라레마스카.",
        noteKo: "QI(Quality Improvement)는 한일 공통으로 '질 개선'을 뜻하며, 병원 단위의 상설 위원회를 두는 경우가 많습니다.",
        noteJa: "QI（Quality Improvement）は日韓共通で「質改善」を指し、病院単位で常設委員会を置く場合が多いです。",
      },
      {
        ko: "저희는 핵심성과지표(KPI)를 부서별로 매달 집계하고 있습니다.",
        koRomaja: "jeohuineun haegsimseonggwajipyo(KPI)reul buseobyeollo maedal jipgyehago itseumnida.",
        ja: "私どもは、重要業績評価指標（KPI）を部署ごとに毎月集計しております。",
        jaReading: "わたくしどもは、じゅうようぎょうせきひょうかしひょう（ケーピーアイ）をぶしょごとにまいつきしゅうけいしております。",
        koPron: "チョフィヌン ヘクシムソングァジピョ(ケイピーアイ)ルル プソビョルロ メダル チプケハゴ イッスムニダ.",
        jaPron: "와타쿠시도모와, 쥬우요우교우세키효우카시효우(케에피이아이)오 부쇼고토니 마이츠키 슈우케이시테 오리마스.",
      },
      {
        ko: "어떤 지표를 가장 중요한 핵심 지표로 보고 계신지 여쭤봐도 될까요?",
        koRomaja: "eotteon jipyoreul gajang jungyohan haegsim jipyoro bogo gyesinji yeojjwobwado doelkkayo?",
        ja: "どの指標を最も重要な中核指標としてご覧になっているか、お伺いしてもよろしいでしょうか。",
        jaReading: "どのしひょうをもっともじゅうようなちゅうかくしひょうとしてごらんになっているか、おうかがいしてもよろしいでしょうか。",
        koPron: "オットン チピョルル カジャン チュンヨハン ヘクシム チピョロ ポゴ ケシンジ ヨッチュォバド トェルカヨ?",
        jaPron: "도노 시효우오 못토모 쥬우요우나 츄우카쿠시효우토시테 고란니 낫테이루카, 오우카가이시테모 요로시이데쇼우카.",
      },
      {
        ko: "지표 데이터 수집은 전자의무기록에서 자동으로 추출하시나요?",
        koRomaja: "jipyo deiteo sujibeun jeonja-uimugirogeseo jadongeuro chuchulhasinayo?",
        ja: "指標データの収集は、電子カルテから自動で抽出しておられますか。",
        jaReading: "しひょうデータのしゅうしゅうは、でんしカルテからじどうでちゅうしゅつしておられますか。",
        koPron: "チピョ テイト スジブン チョンジャウィムギロゲソ チャドンウロ チュチュルハシナヨ?",
        jaPron: "시효우 데에타노 슈우슈우와, 덴시 카루테카라 지도우데 츄우슈츠시테 오라레마스카.",
      },
      {
        ko: "질 위원회 회의는 얼마나 자주 열고, 어떤 직종이 참여하시나요?",
        koRomaja: "jil wiwonhoe hoeuineun eolmana jaju yeolgo, eotteon jikjongi chamyeohasinayo?",
        ja: "質委員会の会議は、どのくらいの頻度で開かれ、どの職種が参加しておられますか。",
        jaReading: "しついいんかいのかいぎは、どのくらいのひんどでひらかれ、どのしょくしゅがさんかしておられますか。",
        koPron: "チル ウィウォンフェ フェウィヌン オルマナ チャジュ ヨルゴ, オットン チクチョンイ チャミョハシナヨ?",
        jaPron: "시츠이인카이노 카이기와, 도노쿠라이노 힌도데 히라카레, 도노 쇼쿠슈가 산카시테 오라레마스카.",
      },
      {
        ko: "저희 재단의 지표 산출 기준과 비교해 보고 싶어 자료를 가져왔습니다.",
        koRomaja: "jeohui jaedanui jipyo sanchul gijun-gwa bigyohae bogo sipeo jaryoreul gajyeowasseumnida.",
        ja: "当財団の指標算出基準と比較してみたく、資料を持参いたしました。",
        jaReading: "とうざいだんのしひょうさんしゅつきじゅんとひかくしてみたく、しりょうをじさんいたしました。",
        koPron: "チョフィ チェダヌィ チピョ サンチュル キジュングァ ピギョヘ ポゴ シポ チャリョルル カジョワッスムニダ.",
        jaPron: "토우자이단노 시효우산슈츠키쥰토 히카쿠시테 미타쿠, 시료우오 지산이타시마시타.",
      },
    ],
  },
  // ───────────────────────── 환자안전·인증 ─────────────────────────
  {
    key: "patient-safety",
    role: "qps",
    titleKo: "환자안전·인증",
    titleJa: "患者安全・認証",
    emoji: "🛡️",
    phrases: [
      {
        ko: "환자안전 사고 보고는 익명으로도 가능하도록 설계되어 있나요?",
        koRomaja: "hwanja-anjeon sago bogoneun ingmyeong-eurodo ganeunghadorok seolgyedoeeo innayo?",
        ja: "患者安全のインシデント報告は、匿名でも可能なように設計しておられますか。",
        jaReading: "かんじゃあんぜんのインシデントほうこくは、とくめいでもかのうなようにせっけいしておられますか。",
        koPron: "ファンジャアンジョン サゴ ポゴヌン インミョンウロド カヌンハドロク ソルゲドェオ インナヨ?",
        jaPron: "칸쟈안젠노 인시덴토 호우코쿠와, 토쿠메이데모 카노우나요우니 셋케이시테 오라레마스카.",
        noteKo: "보고자에게 불이익이 없는 비처벌(non-punitive) 문화가 익명 보고 활성화의 핵심으로 여겨집니다.",
        noteJa: "報告者に不利益のない非懲罰的（non-punitive）文化が、匿名報告を促す鍵とされています。",
      },
      {
        ko: "중대 사고가 발생하면 근본원인분석(RCA)은 어떤 절차로 진행하시나요?",
        koRomaja: "jungdae sagoga balsaenghamyeon geunbonwonin-bunseok(RCA)eun eotteon jeolcharo jinhaenghasinayo?",
        ja: "重大な事故が発生した場合、根本原因分析（RCA）はどのような手順で進めておられますか。",
        jaReading: "じゅうだいなじこがはっせいしたばあい、こんぽんげんいんぶんせき（アールシーエー）はどのようなてじゅんですすめておられますか。",
        koPron: "チュンデ サゴガ パルセンハミョン クンボヌォニンブンソク(アールシーエー)ウン オットン チョルチャロ チンヘンハシナヨ?",
        jaPron: "쥬우다이나 지코가 핫세이시타 바아이, 콘폰겐인분세키(아아루시이에에)와 도노요우나 테쥰데 스스메테 오라레마스카.",
      },
      {
        ko: "분석 결과로 나온 개선책은 실제 현장에 어떻게 정착시키시나요?",
        koRomaja: "bunseok gyeolgwaro naon gaeseonchaegeun silje hyeonjange eotteoke jeongchaksikisinayo?",
        ja: "分析の結果として出た改善策は、実際の現場にどのように定着させておられますか。",
        jaReading: "ぶんせきのけっかとしてでたかいぜんさくは、じっさいのげんばにどのようにていちゃくさせておられますか。",
        koPron: "プンソク キョルグァロ ナオン ケソンチェグン シルジェ ヒョンジャンエ オットケ チョンチャクシキシナヨ?",
        jaPron: "분세키노 켓카토시테 데타 카이젠사쿠와, 짓사이노 겐바니 도노요우니 테이챠쿠사세테 오라레마스카.",
      },
      {
        ko: "다가오는 인증 평가를 대비해 어떤 준비를 하고 계신지 궁금합니다.",
        koRomaja: "dagaoneun injeung pyeonggareul daebihae eotteon junbireul hago gyesinji gunggeumhamnida.",
        ja: "次の認証評価に備えて、どのような準備をしておられるか気になります。",
        jaReading: "つぎのにんしょうひょうかにそなえて、どのようなじゅんびをしておられるかきになります。",
        koPron: "タガオヌン インジュン ピョンガルル テビヘ オットン チュンビルル ハゴ ケシンジ クングムハムニダ.",
        jaPron: "츠기노 닌쇼우효우카니 소나에테, 도노요우나 쥰비오 시테 오라레루카 키니나리마스.",
      },
      {
        ko: "저희는 JCI와 의료기관인증을 모두 준비한 경험이 있어 공유드릴 수 있습니다.",
        koRomaja: "jeohuineun JCIwa uiryogigwan-injeungeul modu junbihan gyeongheomi isseo gongyudeuril su itseumnida.",
        ja: "私どもはJCIと医療機関認証の双方を準備した経験があり、共有させていただけます。",
        jaReading: "わたくしどもはジェーシーアイといりょうきかんにんしょうのそうほうをじゅんびしたけいけんがあり、きょうゆうさせていただけます。",
        koPron: "チョフィヌン ジェイシーアイワ ウィリョギグァンインジュンウル モドゥ チュンビハン キョンホミ イッソ コンユドゥリル ス イッスムニダ.",
        jaPron: "와타쿠시도모와 제에시이아이토 이료우키칸닌쇼우노 소우호우오 쥰비시타 케이켄가 아리, 쿄우유우사세테 이타다케마스.",
        noteKo: "한국의 '의료기관인증'은 일본의 '병원기능평가(機能評価)'에 대응하는 국가 차원의 인증 제도입니다.",
        noteJa: "韓国の「医療機関認証」は、日本の「病院機能評価（機能評価）」に対応する国レベルの認証制度です。",
      },
      {
        ko: "기능평가와 의료기관인증의 평가 항목이 어떻게 다른지 함께 짚어 보면 좋겠습니다.",
        koRomaja: "gineungpyeongga-wa uiryogigwan-injeungui pyeongga hangmogi eotteoke dareunji hamkke jipeo bomyeon jokesseumnida.",
        ja: "機能評価と医療機関認証の評価項目が、どのように異なるか一緒に確認できればと思います。",
        jaReading: "きのうひょうかといりょうきかんにんしょうのひょうかこうもくが、どのようにことなるかいっしょにかくにんできればとおもいます。",
        koPron: "キヌンピョンガワ ウィリョギグァンインジュンエ ピョンガ ハンモギ オットケ タルンジ ハムケ チポ ポミョン チョケッスムニダ.",
        jaPron: "키노우효우카토 이료우키칸닌쇼우노 효우카코우모쿠가, 도노요우니 코토나루카 잇쇼니 카쿠닌데키레바토 오모이마스.",
      },
    ],
  },
];
