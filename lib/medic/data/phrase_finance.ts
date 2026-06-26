// 의료교류 재무·경리 회화집 — 은성의료재단 ↔ 가마치그룹 직원 상호방문용.
// 방문한 재무·경리(財務・経理) 담당 직원과 호스트 병원 재무 담당자 사이의 직원 대 직원 대화로 구성.
// 환자 응대 표현은 포함하지 않으며, 모든 문장은 회계·예산·원가 업무 교류를 위한 동료 간 대화입니다.
// jaReading 은 TTS·후리가나용 전체 가나 읽기. ⚠️ 실제 운용 전 양국 병원 직원의 검수가 필요합니다.

import type { MedPhraseGroup } from "../types";

export const PHRASES_FINANCE: MedPhraseGroup[] = [
  // ───────────────────────── 회계·예산·결산 ─────────────────────────
  {
    key: "finance-ops",
    role: "finance",
    titleKo: "회계·예산·결산",
    titleJa: "会計・予算・決算",
    emoji: "📊",
    phrases: [
      {
        ko: "올해 예산 편성은 어떤 절차로 진행하시는지 여쭤보고 싶습니다.",
        koRomaja: "olhae yesan pyeonseongeun eotteon jeolcharo jinhaenghasineunji yeojjwobogo sipseumnida.",
        ja: "今年度の予算編成は、どのような手順で進めていらっしゃるか伺いたく存じます。",
        jaReading: "こんねんどのよさんへんせいは、どのようなてじゅんですすめていらっしゃるかうかがいたくぞんじます。",
        koPron: "オルヘ イェサン ピョンソンウン オットン チョルチャロ チンヘンハシヌンジ ヨッチュォボゴ シプスムニダ.",
        jaPron: "콘넨도노 요산헨세이와, 도노요우나 테준데 스스메테 이랏샤루카 우카가이타쿠 존지마스.",
      },
      {
        ko: "월 결산은 매달 며칠까지 마감하시는지 알려 주시겠습니까?",
        koRomaja: "wol gyeolsaneun maedal myeochilkkaji magamhasineunji allyeo jusigesseumnikka?",
        ja: "月次決算は、毎月何日までに締めていらっしゃいますか。",
        jaReading: "げつじけっさんは、まいつきなんにちまでにしめていらっしゃいますか。",
        koPron: "ウォル キョルサヌン メダル ミョチルッカジ マガマシヌンジ アルリョ チュシゲッスムニッカ?",
        jaPron: "게츠지켓산와, 마이츠키 난니치마데니 시메테 이랏샤이마스카.",
        noteKo: "월차결산(月次決算)은 매달 단위로 손익을 마감하는 일본 병원의 일반적 관리 회계 관행입니다.",
        noteJa: "月次決算は、毎月単位で損益を締める日本の病院では一般的な管理会計の慣行です。",
      },
      {
        ko: "연간 결산 일정과 외부 감사 시기를 함께 공유해 주시면 감사하겠습니다.",
        koRomaja: "yeongan gyeolsan iljeonggwa oebu gamsa sigireul hamkke gongyuhae jusimyeon gamsahagesseumnida.",
        ja: "年次決算のスケジュールと外部監査の時期を、あわせて共有いただけますと幸いです。",
        jaReading: "ねんじけっさんのスケジュールとがいぶかんさのじきを、あわせてきょうゆういただけますとさいわいです。",
        koPron: "ヨンガン キョルサン イルジョングァ ウェブ カムサ シギルル ハムッケ コンユヘ チュシミョン カムサハゲッスムニダ.",
        jaPron: "넨지켓산노 스케주우루토 가이부칸사노 지키오, 아와세테 쿄우유우 이타다케마스토 사이와이데스.",
      },
      {
        ko: "수입 관리에서 진료 수익과 비진료 수익을 어떻게 구분하시나요?",
        koRomaja: "suip gwalliaeseo jillyo suikgwa bijillyo suigeul eotteoke gubunhasinayo?",
        ja: "収入管理では、診療収益と診療外収益をどのように区分されていますか。",
        jaReading: "しゅうにゅうかんりでは、しんりょうしゅうえきとしんりょうがいしゅうえきをどのようにくぶんされていますか。",
        koPron: "スイプ クァルリエソ チルリョ スイクァ ピジルリョ スイグル オットケ クブナシナヨ?",
        jaPron: "슈우뉴우칸리데와, 신료우슈우에키토 신료우가이슈우에키오 도노요우니 쿠분사레테 이마스카.",
      },
      {
        ko: "재무 보고서는 경영진께 어느 정도 주기로 보고하시는지 궁금합니다.",
        koRomaja: "jaemu bogoseoneun gyeongyeongjinkke eoneu jeongdo jugiro bogohasineunji gunggeumhamnida.",
        ja: "財務報告書は、経営陣にどのくらいの頻度でご報告されているのか気になります。",
        jaReading: "ざいむほうこくしょは、けいえいじんにどのくらいのひんどでごほうこくされているのかきになります。",
        koPron: "チェム ボゴソヌン キョンヨンジンッケ オヌ チョンド チュギロ ボゴハシヌンジ クングムハムニダ.",
        jaPron: "자이무호우코쿠쇼와, 케이에이진니 도노쿠라이노 힌도데 고호우코쿠 사레테이루노카 키니나리마스.",
      },
      {
        ko: "두 병원의 ERP 시스템 항목 구조를 비교해 보고 싶습니다.",
        koRomaja: "du byeongwon-ui ERP siseutem hangmok gujoreul bigyohae bogo sipseumnida.",
        ja: "両病院のERPシステムの勘定科目の構造を、比較してみたく存じます。",
        jaReading: "りょうびょういんのイーアールピーシステムのかんじょうかもくのこうぞうを、ひかくしてみたくぞんじます。",
        koPron: "トゥ ビョンウォネ イーアルピー システム ハンモク クジョルル ピギョヘ ボゴ シプスムニダ.",
        jaPron: "료우뵤우인노 이아루피이 시스테무노 칸조우카모쿠노 코우조우오, 히카쿠시테 미타쿠 존지마스.",
        noteKo: "ERP의 계정 과목(勘定科目) 구조가 다르면 두 병원 데이터를 1:1로 대조하기 어려우므로 매핑표를 미리 준비하면 좋습니다.",
        noteJa: "ERPの勘定科目の構造が異なると両病院のデータを一対一で照合しにくいため、対応表を事前に用意すると良いです。",
      },
    ],
  },
  // ───────────────────────── 원가·수익성 분석 ─────────────────────────
  {
    key: "cost",
    role: "finance",
    titleKo: "원가·수익성 분석",
    titleJa: "原価・収益性分析",
    emoji: "💹",
    phrases: [
      {
        ko: "부서별 원가 계산은 어떤 배부 기준을 사용하시는지 여쭤보고 싶습니다.",
        koRomaja: "buseobyeol wonga gyesaneun eotteon baebu gijuneul sayonghasineunji yeojjwobogo sipseumnida.",
        ja: "部門別の原価計算では、どのような配賦基準を使っていらっしゃるか伺いたいです。",
        jaReading: "ぶもんべつのげんかけいさんでは、どのようなはいふきじゅんをつかっていらっしゃるかうかがいたいです。",
        koPron: "ブソビョル ウォンガ ケサヌン オットン ベブ キジュヌル サヨンハシヌンジ ヨッチュォボゴ シプスムニダ.",
        jaPron: "부몬베츠노 겐카케이산데와, 도노요우나 하이후키준오 츠캇테 이랏샤루카 우카가이타이데스.",
        noteKo: "배부 기준(配賦基準)은 공통 비용을 각 부서에 나누는 기준으로, 면적·인원·진료 건수 등이 자주 쓰입니다.",
        noteJa: "配賦基準は共通費を各部門に割り振る基準で、面積・人数・診療件数などがよく使われます。",
      },
      {
        ko: "진료과별 손익은 월 단위로 산출하고 계신가요?",
        koRomaja: "jillyogwabyeol sonigeun wol danwiro sanchulhago gyesin-gayo?",
        ja: "診療科別の損益は、月単位で算出していらっしゃいますか。",
        jaReading: "しんりょうかべつのそんえきは、つきたんいでさんしゅつしていらっしゃいますか。",
        koPron: "チルリョグァビョル ソニグン ウォル タヌィロ サンチュラゴ ケシンガヨ?",
        jaPron: "신료우카베츠노 손에키와, 츠키탄이데 산슈츠시테 이랏샤이마스카.",
      },
      {
        ko: "적자 부서에 대해서는 어떤 개선 지표를 보고 계신지 궁금합니다.",
        koRomaja: "jeokja buseoe daehaeseoneun eotteon gaeseon jipyoreul bogo gyesinji gunggeumhamnida.",
        ja: "赤字部門については、どのような改善指標をご覧になっているか気になります。",
        jaReading: "あかじぶもんについては、どのようなかいぜんしひょうをごらんになっているかきになります。",
        koPron: "チョクチャ ブソエ テヘソヌン オットン ケソン チピョルル ボゴ ケシンジ クングムハムニダ.",
        jaPron: "아카지부몬니츠이테와, 도노요우나 카이젠시효우오 고란니 낫테이루카 키니나리마스.",
      },
      {
        ko: "두 병원의 병상당 운영 원가를 같은 기준으로 비교해 보면 좋겠습니다.",
        koRomaja: "du byeongwon-ui byeongsangdang unyeong wongareul gateun gijuneuro bigyohae bomyeon jokesseumnida.",
        ja: "両病院の病床あたりの運営原価を、同じ基準で比較できればと思います。",
        jaReading: "りょうびょういんのびょうしょうあたりのうんえいげんかを、おなじきじゅんでひかくできればとおもいます。",
        koPron: "トゥ ビョンウォネ ビョンサンダン ウニョン ウォンガルル カトゥン キジュヌロ ピギョヘ ボミョン チョケッスムニダ.",
        jaPron: "료우뵤우인노 뵤우쇼우아타리노 운에이겐카오, 오나지 키준데 히카쿠데키레바토 오모이마스.",
      },
      {
        ko: "재료비와 인건비 비중을 두 병원 간에 대조해 봐도 될까요?",
        koRomaja: "jaeryobiwa in-geonbi bijungeul du byeongwon gane daejohae bwado doelkkayo?",
        ja: "材料費と人件費の比率を、両病院間で照らし合わせてもよろしいでしょうか。",
        jaReading: "ざいりょうひとじんけんひのひりつを、りょうびょういんかんでてらしあわせてもよろしいでしょうか。",
        koPron: "チェリョビワ インゴンビ ビジュンウル トゥ ビョンウォン カネ テジョヘ ブァド トェルッカヨ?",
        jaPron: "자이료우히토 진켄히노 히리츠오, 료우뵤우인칸데 테라시아와세테모 요로시이데쇼우카.",
      },
      {
        ko: "원가 절감 사례가 있으면 구체적인 수치와 함께 공유 부탁드립니다.",
        koRomaja: "wonga jeolgam saryega isseumyeon guchejeogin suchiwa hamkke gongyu butakdeurimnida.",
        ja: "原価削減の事例がございましたら、具体的な数値とあわせて共有をお願いいたします。",
        jaReading: "げんかさくげんのじれいがございましたら、ぐたいてきなすうちとあわせてきょうゆうをおねがいいたします。",
        koPron: "ウォンガ チョルガム サリェガ イッスミョン クチェジョギン スチワ ハムッケ コンユ プタクトゥリムニダ.",
        jaPron: "겐카사쿠겐노 지레이가 고자이마시타라, 구타이테키나 스우치토 아와세테 쿄우유우오 오네가이 이타시마스.",
      },
    ],
  },
];
