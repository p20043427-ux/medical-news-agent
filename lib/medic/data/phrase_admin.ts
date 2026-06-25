// 의료교류 행정 회화집 — 은성의료재단 ↔ 가마치그룹 직원 상호방문용.
// 방문한 행정·조율 담당 직원과 호스트 병원 행정 담당자 사이의 직원 대 직원 대화로 구성.
// 환자 응대 표현은 포함하지 않으며, 모든 문장은 교류 운영·조율을 위한 동료 간 대화입니다.
// jaReading 은 TTS·후리가나용 전체 가나 읽기. ⚠️ 실제 운용 전 양국 병원 직원의 검수가 필요합니다.

import type { MedPhraseGroup } from "../types";

export const PHRASES_ADMIN: MedPhraseGroup[] = [
  // ───────────────────────── 교류 협약·MOU 협의 ─────────────────────────
  {
    key: "mou",
    role: "admin",
    titleKo: "교류 협약·MOU 협의",
    titleJa: "交流協定・MOU協議",
    emoji: "🤝",
    phrases: [
      {
        ko: "이번 MOU의 적용 범위와 유효 기간을 먼저 확인하고 싶습니다.",
        koRomaja: "ibeon MOU-ui jeogyong beomwiwa yuhyo giganeul meonjeo hwaginhago sipseumnida.",
        ja: "今回のMOUの適用範囲と有効期間を、まず確認したく存じます。",
        jaReading: "こんかいのエムオーユーのてきようはんいとゆうこうきかんを、まずかくにんしたくぞんじます。",
        noteKo: "MOU(양해각서)는 법적 구속력이 약한 합의 문서이므로, 세부 사업은 별도 협약으로 보완하는 것이 일반적입니다.",
        noteJa: "MOU（覚書）は法的拘束力が弱い合意文書のため、具体的な事業は別途の協定で補うのが一般的です。",
      },
      {
        ko: "직원 상호 연수를 협약의 핵심 항목으로 명시하면 좋겠습니다.",
        koRomaja: "jigwon sangho yeonsureul hyeobyak-ui haegsim hangmogeuro myeongsihamyeon jokesseumnida.",
        ja: "職員の相互研修を、協定の中心項目として明記できればと思います。",
        jaReading: "しょくいんのそうごけんしゅうを、きょうていのちゅうしんこうもくとしてめいきできればとおもいます。",
      },
      {
        ko: "협약서 초안은 양국어 병기로 준비해 두었습니다.",
        koRomaja: "hyeobyakseo choaneun yangguk-eo byeonggiro junbihae dueosseumnida.",
        ja: "協定書の草案は、両国語の併記で用意してございます。",
        jaReading: "きょうていしょのそうあんは、りょうこくごのへいきでよういしてございます。",
      },
      {
        ko: "서명식 일정은 양 기관 이사장님 일정에 맞추어 조율하겠습니다.",
        koRomaja: "seomyeongsik iljeongeun yang gigwan isajangnim iljeonge majchueo joyulhagesseumnida.",
        ja: "署名式の日程は、両機関の理事長のご都合に合わせて調整いたします。",
        jaReading: "しょめいしきのにっていは、りょうきかんのりじちょうのごつごうにあわせてちょうせいいたします。",
      },
      {
        ko: "협약 갱신 주기는 우선 2년으로 제안드리고 싶습니다.",
        koRomaja: "hyeobyak gaengsin jugineun useon i-nyeoneuro jeanderigo sipseumnida.",
        ja: "協定の更新周期は、まず2年でご提案したいと存じます。",
        jaReading: "きょうていのこうしんしゅうきは、まずにねんでごていあんしたいとぞんじます。",
      },
      {
        ko: "향후에는 의사·간호사뿐 아니라 행정 직원 교류도 포함하면 어떨까요?",
        koRomaja: "hyanghueneun uisa·ganhosappun anira haengjeong jigwon gyoryudo pohamhamyeon eotteolkkayo?",
        ja: "今後は医師・看護師だけでなく、行政職員の交流も含めてはいかがでしょうか。",
        jaReading: "こんごはいし・かんごしだけでなく、ぎょうせいしょくいんのこうりゅうもふくめてはいかがでしょうか。",
      },
      {
        ko: "각 조항의 문구는 법무 검토를 거친 뒤 확정하면 좋겠습니다.",
        koRomaja: "gak johangui mungguneun beobmu geomtoreul geochin dwi hwakjeonghamyeon jokesseumnida.",
        ja: "各条項の文言は、法務の確認を経たうえで確定できればと思います。",
        jaReading: "かくじょうこうのもんごんは、ほうむのかくにんをへたうえでかくていできればとおもいます。",
      },
      {
        ko: "공동 연구나 학술 세미나도 협약에 담을 수 있을지 검토 부탁드립니다.",
        koRomaja: "gongdong yeonguna haksul seminado hyeobyage dameul su isseulji geomto butakdeurimnida.",
        ja: "共同研究や学術セミナーも協定に盛り込めるか、ご検討をお願いいたします。",
        jaReading: "きょうどうけんきゅうやがくじゅつセミナーもきょうていにもりこめるか、ごけんとうをおねがいいたします。",
      },
      {
        ko: "협약 체결 후에는 연 1회 운영 회의를 정례화하면 좋겠습니다.",
        koRomaja: "hyeobyak chegyeol hueneun yeon il-hoe unyeong hoeuireul jeongnyehwahamyeon jokesseumnida.",
        ja: "協定締結後は、年1回の運営会議を定例化できればと思います。",
        jaReading: "きょうていていけつごは、ねんいっかいのうんえいかいぎをていれいかできればとおもいます。",
      },
      {
        ko: "오늘 논의한 내용은 정리해서 다음 주에 회신드리겠습니다.",
        koRomaja: "oneul nonuihan naeyongeun jeongnihaeseo daeum jue hoesindeurigesseumnida.",
        ja: "本日協議した内容は、整理のうえ来週ご返信いたします。",
        jaReading: "ほんじつきょうぎしたないようは、せいりのうえらいしゅうごへんしんいたします。",
      },
    ],
  },
  // ───────────────────────── 일정·통역 조율 ─────────────────────────
  {
    key: "coordination",
    role: "admin",
    titleKo: "일정·통역 조율",
    titleJa: "日程・通訳の調整",
    emoji: "🗓️",
    phrases: [
      {
        ko: "방문단 일정표 초안을 메일로 보내 드렸는데 확인하셨을까요?",
        koRomaja: "bangmundan iljeongpyo choaneul meillo bonae deuryeonneunde hwaginhasyeosseulkkayo?",
        ja: "訪問団の日程表の草案をメールでお送りしましたが、ご確認いただけましたでしょうか。",
        jaReading: "ほうもんだんのにっていひょうのそうあんをメールでおおくりしましたが、ごかくにんいただけましたでしょうか。",
      },
      {
        ko: "도착 첫날은 오리엔테이션과 시설 투어로 잡으면 어떨까요?",
        koRomaja: "dochak cheonnaleun orienteisyeon-gwa siseol tueoro jabeumyeon eotteolkkayo?",
        ja: "到着初日は、オリエンテーションと施設ツアーで組んではいかがでしょうか。",
        jaReading: "とうちゃくしょにちは、オリエンテーションとしせつツアーでくんではいかがでしょうか。",
      },
      {
        ko: "통역은 한일 양방향이 가능한 분으로 배정 부탁드립니다.",
        koRomaja: "tongyeogeun hanil yangbanghyangi ganeunghan bunneuro baejeong butakdeurimnida.",
        ja: "通訳は、日韓の双方向が可能な方をご手配いただけますでしょうか。",
        jaReading: "つうやくは、にっかんのそうほうこうがかのうなかたをごてはいいただけますでしょうか。",
      },
      {
        ko: "전문 의학 용어가 많은 세션에는 의료 통역사를 따로 두면 좋겠습니다.",
        koRomaja: "jeonmun uihak yongeoga maneun sesyeoneneun uiryo tongyeoksareul ttaro dumyeon jokesseumnida.",
        ja: "専門の医学用語が多いセッションには、医療通訳者を別に配置できればと思います。",
        jaReading: "せんもんのいがくようごがおおいセッションには、いりょうつうやくしゃをべつにはいちできればとおもいます。",
      },
      {
        ko: "공항 픽업 차량은 저희 쪽에서 준비하겠습니다.",
        koRomaja: "gonghang pigeop charyangeun jeohui jjogeseo junbihagesseumnida.",
        ja: "空港の送迎車両は、こちらでご用意いたします。",
        jaReading: "くうこうのそうげいしゃりょうは、こちらでごよういいたします。",
      },
      {
        ko: "숙소는 병원에서 도보 10분 거리의 호텔로 예약해 두었습니다.",
        koRomaja: "suksoneun byeongwoneseo dobo sip-bun georiui hotello yeyakhae dueosseumnida.",
        ja: "宿泊先は、病院から徒歩10分の距離のホテルを予約してございます。",
        jaReading: "しゅくはくさきは、びょういんからとほじゅっぷんのきょりのホテルをよやくしてございます。",
      },
      {
        ko: "이동 동선이 겹치지 않도록 부서별 방문 시간을 나눠 두었습니다.",
        koRomaja: "idong dongseoni gyeopchiji antorok buseobyeol bangmun siganeul nanwo dueosseumnida.",
        ja: "移動の動線が重ならないよう、部署ごとの訪問時間を分けてございます。",
        jaReading: "いどうのどうせんがかさならないよう、ぶしょごとのほうもんじかんをわけてございます。",
      },
      {
        ko: "혹시 일정 변경이 필요하시면 전날까지 알려 주시면 감사하겠습니다.",
        koRomaja: "hoksi iljeong byeongyeongi piryohasimyeon jeonnalkkaji allyeo jusimyeon gamsahagesseumnida.",
        ja: "もし日程の変更が必要でしたら、前日までにお知らせいただけますと幸いです。",
        jaReading: "もしにっていのへんこうがひつようでしたら、ぜんじつまでにおしらせいただけますとさいわいです。",
      },
      {
        ko: "점심은 구내식당에서 함께 하는 것으로 예약해 두었습니다.",
        koRomaja: "jeomsimeun gunaesikdangeseo hamkke haneun geoseuro yeyakhae dueosseumnida.",
        ja: "昼食は、院内食堂でご一緒する形で手配してございます。",
        jaReading: "ちゅうしょくは、いんないしょくどうでごいっしょするかたちでてはいしてございます。",
      },
      {
        ko: "통역 자료로 부서명과 직책 대조표를 미리 공유해 드릴까요?",
        koRomaja: "tongyeok jaryoro buseomyeong-gwa jikchaek daejopyoreul miri gongyuhae deurilkkayo?",
        ja: "通訳資料として、部署名と役職の対照表を事前に共有いたしましょうか。",
        jaReading: "つうやくしりょうとして、ぶしょめいとやくしょくのたいしょうひょうをじぜんにきょうゆういたしましょうか。",
      },
    ],
  },
  // ───────────────────────── 시설 투어·부서 소개 ─────────────────────────
  {
    key: "facility-tour",
    role: "admin",
    titleKo: "시설 투어·부서 소개",
    titleJa: "施設ツアー・部署紹介",
    emoji: "🏥",
    phrases: [
      {
        ko: "오늘 안내해 주셔서 감사합니다. 어느 부서부터 둘러볼까요?",
        koRomaja: "oneul annaehae jusyeoseo gamsahamnida. eoneu buseobuteo dulleobolkkayo?",
        ja: "本日はご案内くださりありがとうございます。どちらの部署から拝見しましょうか。",
        jaReading: "ほんじつはごあんないくださりありがとうございます。どちらのぶしょからはいけんしましょうか。",
      },
      {
        ko: "이쪽이 외래 접수와 행정 사무실이 있는 1층입니다.",
        koRomaja: "ijjogi oerae jeopsuwa haengjeong samusiri inneun il-cheungimnida.",
        ja: "こちらが、外来受付と事務室のある1階でございます。",
        jaReading: "こちらが、がいらいうけつけとじむしつのあるいっかいでございます。",
      },
      {
        ko: "이분이 검사부를 총괄하시는 부서장님이십니다.",
        koRomaja: "ibuni geomsabureul chonggwalhasineun buseojangnim-isimnida.",
        ja: "こちらが、検査部を統括しておられる部署長でいらっしゃいます。",
        jaReading: "こちらが、けんさぶをとうかつしておられるぶしょちょうでいらっしゃいます。",
      },
      {
        ko: "사진 촬영이 가능한 구역인지 미리 여쭤봐도 될까요?",
        koRomaja: "sajin chwaryeongi ganeunghan guyeoginji miri yeojjwobwado doelkkayo?",
        ja: "写真撮影が可能な区域かどうか、先にお伺いしてもよろしいでしょうか。",
        jaReading: "しゃしんさつえいがかのうなくいきかどうか、さきにおうかがいしてもよろしいでしょうか。",
      },
      {
        ko: "이 병동의 병상 수와 간호 인력 배치가 궁금합니다.",
        koRomaja: "i byeongdongui byeongsang suwa ganho illyeok baechiga gunggeumhamnida.",
        ja: "この病棟の病床数と、看護スタッフの配置が気になります。",
        jaReading: "このびょうとうのびょうしょうすうと、かんごスタッフのはいちがきになります。",
      },
      {
        ko: "전자의무기록 시스템은 어떤 솔루션을 쓰고 계신가요?",
        koRomaja: "jeonja-uimugirok siseuteomeun eotteon sollusyeoneul sseugo gyesin-gayo?",
        ja: "電子カルテのシステムは、どのソリューションをお使いでしょうか。",
        jaReading: "でんしカルテのシステムは、どのソリューションをおつかいでしょうか。",
      },
      {
        ko: "재활 센터의 동선 설계가 인상적이네요. 참고하고 싶습니다.",
        koRomaja: "jaehwal senteoui dongseon seolgyega insanjeokineyo. chamgohago sipseumnida.",
        ja: "リハビリセンターの動線設計が印象的ですね。参考にさせていただきたいです。",
        jaReading: "リハビリセンターのどうせんせっけいがいんしょうてきですね。さんこうにさせていただきたいです。",
      },
      {
        ko: "각 부서장님께 명함을 드려도 괜찮을까요?",
        koRomaja: "gak buseojangnimkke myeonghameul deuryeodo gwaenchaneulkkayo?",
        ja: "各部署長に、お名刺をお渡ししてもよろしいでしょうか。",
        jaReading: "かくぶしょちょうに、おめいしをおわたししてもよろしいでしょうか。",
      },
      {
        ko: "감염 관리 구역에서는 가운과 마스크를 착용하면 될까요?",
        koRomaja: "gamyeom gwalli guyeogeseoneun gaun-gwa maseukeureul chagyonghamyeon doelkkayo?",
        ja: "感染管理区域では、ガウンとマスクを着用すればよろしいでしょうか。",
        jaReading: "かんせんかんりくいきでは、ガウンとマスクをちゃくようすればよろしいでしょうか。",
      },
      {
        ko: "오늘 투어 동안 자세히 설명해 주셔서 많이 배웠습니다.",
        koRomaja: "oneul tueo dongan jasehi seolmyeonghae jusyeoseo mani baewosseumnida.",
        ja: "本日のツアーの間、丁寧にご説明くださり、大変勉強になりました。",
        jaReading: "ほんじつのツアーのあいだ、ていねいにごせつめいくださり、たいへんべんきょうになりました。",
      },
    ],
  },
  // ───────────────────────── 병원 운영·질 개선(QI) 질문 ─────────────────────────
  {
    key: "management",
    role: "admin",
    titleKo: "병원 운영·질 개선(QI) 질문",
    titleJa: "病院運営・質改善(QI)質問",
    emoji: "📊",
    phrases: [
      {
        ko: "병원 인증 평가는 어느 기관의 기준을 따르고 계신가요?",
        koRomaja: "byeongwon injeung pyeongganeun eoneu gigwanui gijuneul ttareugo gyesin-gayo?",
        ja: "病院の認証評価は、どの機関の基準に沿っておられますか。",
        jaReading: "びょういんのにんしょうひょうかは、どのきかんのきじゅんにそっておられますか。",
      },
      {
        ko: "질 개선(QI) 활동은 어떤 조직 체계로 운영하시는지 궁금합니다.",
        koRomaja: "jil gaeseon(QI) hwaldongeun eotteon jojik chegyero unyeonghasineunji gunggeumhamnida.",
        ja: "質改善（QI）活動は、どのような組織体制で運営しておられるか気になります。",
        jaReading: "しつかいぜん（キューアイ）かつどうは、どのようなそしきたいせいでうんえいしておられるかきになります。",
      },
      {
        ko: "지표 데이터는 얼마나 자주 수집하고 검토하시나요?",
        koRomaja: "jipyo deiteoneun eolmana jaju sujibhago geomtohasinayo?",
        ja: "指標データは、どのくらいの頻度で収集し、レビューしておられますか。",
        jaReading: "しひょうデータは、どのくらいのひんどでしゅうしゅうし、レビューしておられますか。",
      },
      {
        ko: "환자 만족도 조사는 어떤 방식으로 설계하셨는지요?",
        koRomaja: "hwanja manjokdo josaneun eotteon bangsigeuro seolgyehasyeonneunjiyo?",
        ja: "患者満足度の調査は、どのような方式で設計しておられますか。",
        jaReading: "かんじゃまんぞくどのちょうさは、どのようなほうしきでせっけいしておられますか。",
        noteKo: "여기서 '환자 만족도'는 조직 운영 지표를 묻는 표현으로, 실제 환자를 응대하는 상황과는 다릅니다.",
        noteJa: "ここでの「患者満足度」は組織運営の指標を尋ねる表現で、実際に患者へ応対する場面とは異なります。",
      },
      {
        ko: "조사 결과는 부서 개선 활동에 어떻게 반영하시는지 듣고 싶습니다.",
        koRomaja: "josa gyeolgwaneun buseo gaeseon hwaldonge eotteoke banyeonghasineunji deutgo sipseumnida.",
        ja: "調査結果を、部署の改善活動にどのように反映しておられるか伺いたいです。",
        jaReading: "ちょうさけっかを、ぶしょのかいぜんかつどうにどのようにはんえいしておられるかうかがいたいです。",
      },
      {
        ko: "의료 안전 사고 보고 체계는 익명 보고가 가능한 구조인가요?",
        koRomaja: "uiryo anjeon sago bogo chegyeneun ingmyeong bogoga ganeunghan gujoin-gayo?",
        ja: "医療安全のインシデント報告体制は、匿名報告が可能な仕組みでしょうか。",
        jaReading: "いりょうあんぜんのインシデントほうこくたいせいは、とくめいほうこくがかのうなしくみでしょうか。",
      },
      {
        ko: "직원 교육과 연수 프로그램은 연간 어떻게 편성하시나요?",
        koRomaja: "jigwon gyoyukgwa yeonsu peurogeuraemeun yeon-gan eotteoke pyeonseonghasinayo?",
        ja: "職員の教育・研修プログラムは、年間でどのように編成しておられますか。",
        jaReading: "しょくいんのきょういく・けんしゅうプログラムは、ねんかんでどのようにへんせいしておられますか。",
      },
      {
        ko: "부서 간 협업이 필요한 개선 과제는 어떻게 조율하시는지요?",
        koRomaja: "buseo gan hyeobeobi piryohan gaeseon gwajeneun eotteoke joyulhasineunjiyo?",
        ja: "部署間の連携が必要な改善課題は、どのように調整しておられますか。",
        jaReading: "ぶしょかんのれんけいがひつようなかいぜんかだいは、どのようにちょうせいしておられますか。",
      },
      {
        ko: "우수 사례는 어떤 방식으로 원내에 공유하고 계신가요?",
        koRomaja: "usu saryeneun eotteon bangsigeuro wonnaee gongyuhago gyesin-gayo?",
        ja: "優良事例は、どのような方法で院内に共有しておられますか。",
        jaReading: "ゆうりょうじれいは、どのようなほうほうでいんないにきょうゆうしておられますか。",
      },
      {
        ko: "이 운영 체계는 저희 재단에도 꼭 참고하고 싶습니다.",
        koRomaja: "i unyeong chegyeneun jeohui jaedanedo kkok chamgohago sipseumnida.",
        ja: "この運営体制は、ぜひ当財団でも参考にさせていただきたいです。",
        jaReading: "このうんえいたいせいは、ぜひとうざいだんでもさんこうにさせていただきたいです。",
      },
    ],
  },
  // ───────────────────────── 네트워킹·회식 ─────────────────────────
  {
    key: "networking",
    role: "admin",
    titleKo: "네트워킹·회식",
    titleJa: "ネットワーキング・会食",
    emoji: "🍽️",
    phrases: [
      {
        ko: "괜찮으시다면 오늘 저녁 식사를 함께 모시고 싶습니다.",
        koRomaja: "gwaenchaneusidamyeon oneul jeonyeok siksareul hamkke mosigo sipseumnida.",
        ja: "差し支えなければ、本日の夕食をご一緒させていただきたく存じます。",
        jaReading: "さしつかえなければ、ほんじつのゆうしょくをごいっしょさせていただきたくぞんじます。",
        noteKo: "일본에서는 회식 초대를 받으면 일단 정중히 사양했다가 권유받고 응하는 흐름도 자연스럽습니다.",
        noteJa: "日本では会食のお誘いを受けた際、一度丁重に遠慮してから応じる流れも自然です。",
      },
      {
        ko: "약소하지만 저희 재단의 작은 선물을 준비했습니다.",
        koRomaja: "yaksohajiman jeohui jaedanui jageun seonmureul junbihaesseumnida.",
        ja: "ささやかですが、当財団からの心ばかりの手土産をご用意しました。",
        jaReading: "ささやかですが、とうざいだんからのこころばかりのてみやげをごよういしました。",
        noteKo: "일본에서 手土産(데미야게)는 양손으로 건네며 '약소하지만'이라고 겸손하게 말하는 것이 예의입니다.",
        noteJa: "日本では手土産を両手で差し出し、「ささやかですが」と控えめに添えるのが礼儀です。",
      },
      {
        ko: "한국에서 가져온 전통차인데 입맛에 맞으셨으면 좋겠습니다.",
        koRomaja: "han-gugeseo gajyeoon jeontongchainde immate majeusyeosseumyeon jokesseumnida.",
        ja: "韓国から持参した伝統茶ですが、お口に合えば嬉しく存じます。",
        jaReading: "かんこくからじさんしたでんとうちゃですが、おくちにあえばうれしくぞんじます。",
      },
      {
        ko: "이 지역의 명물 요리가 있다면 꼭 한번 맛보고 싶습니다.",
        koRomaja: "i jiyeogui myeongmul yoriga itdamyeon kkok hanbeon matbogo sipseumnida.",
        ja: "この地域の名物料理があれば、ぜひ一度味わってみたいです。",
        jaReading: "このちいきのめいぶつりょうりがあれば、ぜひいちどあじわってみたいです。",
      },
      {
        ko: "오늘 바쁘신 와중에 시간 내 주셔서 진심으로 감사합니다.",
        koRomaja: "oneul bappeusin wajunge sigan nae jusyeoseo jinsimeuro gamsahamnida.",
        ja: "本日はお忙しい中、お時間をいただき心より感謝いたします。",
        jaReading: "ほんじつはおいそがしいなか、おじかんをいただきこころよりかんしゃいたします。",
      },
      {
        ko: "다음에는 꼭 저희 병원으로 모시고 싶습니다.",
        koRomaja: "daeumeneun kkok jeohui byeongwoneuro mosigo sipseumnida.",
        ja: "次回はぜひ、当院へお招きしたく存じます。",
        jaReading: "じかいはぜひ、とういんへおまねきしたくぞんじます。",
      },
      {
        ko: "괜찮으시면 연락처를 교환하고 앞으로도 소통하고 싶습니다.",
        koRomaja: "gwaenchaneusimyeon yeonrakcheoreul gyohwanhago apeurodo sotonghago sipseumnida.",
        ja: "よろしければ連絡先を交換し、今後も連携を続けたく存じます。",
        jaReading: "よろしければれんらくさきをこうかんし、こんごもれんけいをつづけたくぞんじます。",
      },
      {
        ko: "돌아가면 이번 방문 소감을 양국 직원들과 공유하겠습니다.",
        koRomaja: "doragamyeon ibeon bangmun sogameul yangguk jigwondeulgwa gongyuhagesseumnida.",
        ja: "帰国しましたら、今回の訪問の所感を両国の職員と共有いたします。",
        jaReading: "きこくしましたら、こんかいのほうもんのしょかんをりょうこくのしょくいんときょうゆういたします。",
      },
      {
        ko: "건배 제의를 해 주셔서 감사합니다. 두 기관의 발전을 위하여!",
        koRomaja: "geonbae jeuireul hae jusyeoseo gamsahamnida. du gigwanui baljeoneul wihayeo!",
        ja: "乾杯のご発声をありがとうございます。両機関の発展を願って、乾杯！",
        jaReading: "かんぱいのごはっせいをありがとうございます。りょうきかんのはってんをねがって、かんぱい！",
      },
      {
        ko: "오늘 자리 덕분에 거리가 한층 가까워진 것 같습니다.",
        koRomaja: "oneul jari deokbune georiga hancheung gakkawojin geot gatseumnida.",
        ja: "本日の席のおかげで、ぐっと距離が縮まった気がいたします。",
        jaReading: "ほんじつのせきのおかげで、ぐっときょりがちぢまったきがいたします。",
      },
    ],
  },
];
