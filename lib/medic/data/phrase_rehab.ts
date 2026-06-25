// 재활치료직(PT·OT·ST) 직원 교류 회화집 — 한국 ↔ 일본 종합병원 직원 상호방문용.
// 방문 재활치료사(연수자)와 호스트 병원 재활 직원 사이의 직원 대 직원 전문 대화로 구성.
// 환자 응대·치료 지시 문장은 포함하지 않으며, 모두 동료 간 견학·질의 표현입니다.
// 모든 문장은 한국어·일본어를 함께 노출하며, jaReading 은 TTS·후리가나용 전체 가나 읽기.
// ⚠️ 시스템·용어 표현은 실제 운용 전 양국 병원 직원의 검수가 필요합니다.

import type { MedPhraseGroup } from "../types";

export const PHRASES_REHAB: MedPhraseGroup[] = [
  // ────────────────────────────── 재활치료실 견학 ──────────────────────────────
  {
    key: "rehab-tour",
    role: "rehab",
    titleKo: "재활치료실 견학",
    titleJa: "リハビリ室の見学",
    emoji: "🦽",
    phrases: [
      {
        ko: "오늘 재활치료실을 견학하게 되었습니다. 잘 부탁드립니다.",
        koRomaja: "oneul jaehwalchiryosireul gyeonhakage doeeotseumnida. jal butakdeurimnida.",
        ja: "本日、リハビリ室を見学させていただきます。よろしくお願いいたします。",
        jaReading: "ほんじつ、リハビリしつをけんがくさせていただきます。よろしくおねがいいたします。",
        koPron: "オヌル チェファルチリョシルル キョナカゲ テウォッスムニダ. チャル プタットゥリムニダ.",
        jaPron: "혼지츠, 리하비리시츠오 켄가쿠 사세테 이타다키마스. 요로시쿠 오네가이 이타시마스.",
      },
      {
        ko: "이곳 재활팀은 물리치료사, 작업치료사, 언어치료사가 각각 몇 분 계신가요?",
        koRomaja: "igot jaehwaltimeun mullichiryosa, jageopchiryosa, eoneochiryosaga gakgak myeot bun gyesin-gayo?",
        ja: "こちらのリハビリチームは、理学療法士・作業療法士・言語聴覚士がそれぞれ何名いらっしゃいますか。",
        jaReading: "こちらのリハビリチームは、りがくりょうほうし・さぎょうりょうほうし・げんごちょうかくしがそれぞれなんめいいらっしゃいますか。",
        koPron: "イゴッ チェファルティムン ムルリチリョサ, チャゴプチリョサ, オノチリョサガ カッカク ミョッ プン ゲシンガヨ?",
        jaPron: "코치라노 리하비리치이무와, 리가쿠료우호우시・사교우료우호우시・겐고쵸우카쿠시가 소레조레 난메이 이랏샤이마스카.",
        noteKo: "일본에서는 물리치료사를 「理学療法士(PT)」, 작업치료사를 「作業療法士(OT)」, 언어치료사를 「言語聴覚士(ST)」라고 부릅니다.",
        noteJa: "韓国では理学療法士を「물리치료사」、作業療法士を「작업치료사」、言語聴覚士を「언어치료사」と呼びます。",
      },
      {
        ko: "물리치료, 작업치료, 언어치료 공간은 층이나 구역으로 나뉘어 있나요?",
        koRomaja: "mullichiryo, jageopchiryo, eoneochiryo gongganeun cheungina guyeogeuro nanwieo innayo?",
        ja: "理学療法・作業療法・言語療法のスペースは、階や区域で分かれていますか。",
        jaReading: "りがくりょうほう・さぎょうりょうほう・げんごりょうほうのスペースは、かいやくいきでわかれていますか。",
        koPron: "ムルリチリョ, チャゴプチリョ, オノチリョ コンガヌン チュンイナ クヨグロ ナヌィオ インナヨ?",
        jaPron: "리가쿠료우호우・사교우료우호우・겐고료우호우노 스페에스와, 카이야 쿠이키데 와카레테 이마스카.",
      },
      {
        ko: "여기 있는 운동치료 장비들을 잠깐 둘러봐도 괜찮을까요?",
        koRomaja: "yeogi inneun undongchiryo jangbideureul jamkkan dulleobwado gwaenchaneulkkayo?",
        ja: "こちらの運動療法の機器を、少し見て回ってもよろしいですか。",
        jaReading: "こちらのうんどうりょうほうのききを、すこしみてまわってもよろしいですか。",
        koPron: "ヨギ インヌン ウンドンチリョ チャンビドゥルル チャムッカン トゥルロブァド クェンチャヌルッカヨ?",
        jaPron: "코치라노 운도우료우호우노 키키오, 스코시 미테 마왓테모 요로시이데스카.",
      },
      {
        ko: "환자 한 명당 한 번 치료 시간은 보통 몇 분으로 잡으시나요?",
        koRomaja: "hwanja han myeongdang han beon chiryo siganeun botong myeot buneuro jabeusinayo?",
        ja: "患者さんお一人あたり、一回の治療時間は普段何分に設定していますか。",
        jaReading: "かんじゃさんおひとりあたり、いっかいのちりょうじかんはふだんなんぷんにせっていしていますか。",
        koPron: "ファンジャ ハン ミョンダン ハン ボン チリョ シガヌン ポトン ミョッ プヌロ チャブシナヨ?",
        jaPron: "칸쟈산 오히토리 아타리, 잇카이노 치료우 지칸와 후단 난푼니 셋테이시테 이마스카.",
      },
      {
        ko: "치료사 한 분이 하루에 평균 몇 명 정도를 담당하시나요?",
        koRomaja: "chiryosa han buni harue pyeonggyun myeot myeong jeongdoreul damdanghasinayo?",
        ja: "療法士お一人が、一日に平均何名ほど担当されますか。",
        jaReading: "りょうほうしおひとりが、いちにちにへいきんなんめいほどたんとうされますか。",
        koPron: "チリョサ ハン ブニ ハルエ ピョングュン ミョッ ミョン チョンドルル タムダンハシナヨ?",
        jaPron: "료우호우시 오히토리가, 이치니치니 헤이킨 난메이호도 탄토우 사레마스카.",
      },
    ],
  },

  // ────────────────────────────── 재활 프로그램·협진 ──────────────────────────────
  {
    key: "rehab-program",
    role: "rehab",
    titleKo: "재활 프로그램·협진",
    titleJa: "リハビリプログラム・連携",
    emoji: "🔁",
    phrases: [
      {
        ko: "재활 의뢰는 보통 어느 진료과에서 어떤 경로로 들어오나요?",
        koRomaja: "jaehwal uiroeneun botong eoneu jillyogwaeseo eotteon gyeongnoro deureoonayo?",
        ja: "リハビリの依頼は、普段どの診療科からどのような経路で入りますか。",
        jaReading: "リハビリのいらいは、ふだんどのしんりょうかからどのようなけいろではいりますか。",
        koPron: "チェファル ウィロェヌン ポトン オヌ チルリョグァエソ オットン ギョンノロ トゥロオナヨ?",
        jaPron: "리하비리노 이라이와, 후단 도노 신료우카카라 도노요우나 케이로데 하이리마스카.",
        noteKo: "「依頼(이라이)」는 우리말 ‘의뢰’에 해당하며, 일본 재활 현장에서 처방·오더를 가리킬 때 자주 쓰입니다.",
        noteJa: "「依頼」は韓国語の「의뢰」に当たり、リハビリの処方・オーダーを指す際によく使われます。",
      },
      {
        ko: "치료 계획은 평가 후에 어떤 절차로 세우시나요?",
        koRomaja: "chiryo gyehoegeun pyeongga hue eotteon jeolcharo seusinayo?",
        ja: "治療計画は、評価のあとどのような手順で立てていますか。",
        jaReading: "ちりょうけいかくは、ひょうかのあとどのようなてじゅんでたてていますか。",
        koPron: "チリョ ギェフェグン ピョンガ フエ オットン チョルチャロ セウシナヨ?",
        jaPron: "치료우 케이카쿠와, 효우카노 아토 도노요우나 테쥰데 타테테 이마스카.",
      },
      {
        ko: "재활 목표 설정과 평가에는 어떤 의료진이 함께 참여하나요?",
        koRomaja: "jaehwal mokpyo seoljeonggwa pyeongga-eneun eotteon uirojini hamkke chamyeohanayo?",
        ja: "リハビリの目標設定と評価には、どのような職種が一緒に参加しますか。",
        jaReading: "リハビリのもくひょうせっていとひょうかには、どのようなしょくしゅがいっしょにさんかしますか。",
        koPron: "チェファル モクピョ ソルジョングァ ピョンガエヌン オットン ウィロジニ ハムッケ チャミョハナヨ?",
        jaPron: "리하비리노 모쿠효우 셋테이토 효우카니와, 도노요우나 쇼쿠슈가 잇쇼니 산카시마스카.",
      },
      {
        ko: "퇴원이 가까워지면 지역사회 연계는 어떻게 진행하시나요?",
        koRomaja: "toewoni gakkawojimyeon jiyeoksahoe yeongyeneun eotteoke jinhaenghasinayo?",
        ja: "退院が近づくと、地域への連携はどのように進めていますか。",
        jaReading: "たいいんがちかづくと、ちいきへのれんけいはどのようにすすめていますか。",
        koPron: "テウォニ カッカウォジミョン チヨクサホェ ヨンギェヌン オットケ チネンハシナヨ?",
        jaPron: "타이인가 치카즈쿠토, 치이키에노 렌케이와 도노요우니 스스메테 이마스카.",
      },
      {
        ko: "퇴원 후 외래 재활이나 방문 재활로 이어지는 비율은 어느 정도인가요?",
        koRomaja: "toewon hu oerae jaehwarina bangmun jaehwallo ieojineun biyureun eoneu jeongdoin-gayo?",
        ja: "退院後に外来リハビリや訪問リハビリへつながる割合は、どのくらいですか。",
        jaReading: "たいいんごにがいらいリハビリやほうもんリハビリへつながるわりあいは、どのくらいですか。",
        koPron: "テウォン フ ウェレ チェファリナ パンムン チェファルロ イオジヌン ビユルン オヌ チョンドインガヨ?",
        jaPron: "타이인고니 가이라이 리하비리야 호우몬 리하비리에 츠나가루 와리아이와, 도노쿠라이데스카.",
      },
      {
        ko: "이번 견학에서 두 병원의 재활 운영 방식을 비교해 볼 수 있어 정말 유익했습니다.",
        koRomaja: "ibeon gyeonhageseo du byeongwonui jaehwal unyeong bangsigeul bigyohae bol su isseo jeongmal yuikhaetseumnida.",
        ja: "今回の見学で、両院のリハビリ運営の進め方を比較でき、大変有意義でした。",
        jaReading: "こんかいのけんがくで、りょういんのリハビリうんえいのすすめかたをひかくでき、たいへんゆういぎでした。",
        koPron: "イボン キョナゲソ トゥ ビョンウォネ チェファル ウニョン パンシグル ピギョヘ ボル ス イッソ チョンマル ユイケッスムニダ.",
        jaPron: "콘카이노 켄가쿠데, 료우인노 리하비리 운에이노 스스메카타오 히카쿠데키, 타이헨 유우이기데시타.",
      },
    ],
  },
];
