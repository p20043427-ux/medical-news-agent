// 간호직 직원 교류 회화집 — 은성의료재단 ↔ 가마치그룹 직원 상호방문용.
// 방문 간호사(연수자)와 호스트 병원 간호 직원 사이의 직원 대 직원 전문 대화로 구성.
// 환자 응대·복약/증상 안내 문장은 포함하지 않으며, 모두 동료 간 견학·질의 표현입니다.
// 모든 문장은 한국어·일본어를 함께 노출하며, jaReading 은 TTS·후리가나용 전체 가나 읽기.
// ⚠️ 시스템·용어 표현은 실제 운용 전 양국 병원 직원의 검수가 필요합니다.

import type { MedPhraseGroup } from "../types";

export const PHRASES_NURSE: MedPhraseGroup[] = [
  // ────────────────────────────── 병동 업무 흐름 견학 ──────────────────────────────
  {
    key: "ward-tour",
    role: "nurse",
    titleKo: "병동 업무 흐름 견학",
    titleJa: "病棟業務の見学",
    emoji: "🏥",
    phrases: [
      {
        ko: "오늘 병동 업무 흐름을 견학하게 되었습니다. 잘 부탁드립니다.",
        koRomaja: "oneul byeongdong eopmu heureumeul gyeonhakage doeeotseumnida. jal butakdeurimnida.",
        ja: "本日、病棟業務の流れを見学させていただきます。よろしくお願いいたします。",
        jaReading: "ほんじつ、びょうとうぎょうむのながれをけんがくさせていただきます。よろしくおねがいいたします。",
      },
      {
        ko: "이 병동의 하루 일과는 보통 어떻게 시작되나요?",
        koRomaja: "i byeongdongui haru ilgwaneun botong eotteoke sijakdoenayo?",
        ja: "この病棟の一日の流れは、普段どのように始まりますか。",
        jaReading: "このびょうとうのいちにちのながれは、ふだんどのようにはじまりますか。",
      },
      {
        ko: "한 근무조에 간호사가 몇 명 배치되나요?",
        koRomaja: "han geunmujoe ganhosaga myeot myeong baechidoenayo?",
        ja: "一勤務帯に看護師は何名配置されますか。",
        jaReading: "いちきんむたいにかんごしはなんめいはいちされますか。",
      },
      {
        ko: "간호사 한 명이 담당하는 환자 수는 평균 몇 명입니까?",
        koRomaja: "ganhosa han myeong-i damdanghaneun hwanja suneun pyeonggyun myeot myeong-imnikka?",
        ja: "看護師一人が受け持つ患者数は、平均で何名ですか。",
        jaReading: "かんごしひとりがうけもつかんじゃすうは、へいきんでなんめいですか。",
        noteKo: "「受け持ち(우케모치)」는 우리말 ‘담당’에 해당하며, 담당 환자를 가리킬 때 자주 쓰입니다.",
        noteJa: "「受け持ち」は韓国語の「담당」に当たり、担当患者を指す際によく使われます。",
      },
      {
        ko: "교대 근무는 2교대제인가요, 3교대제인가요?",
        koRomaja: "gyodae geunmuneun i-gyodaejeinjayo, sam-gyodaejeingayo?",
        ja: "交代勤務は二交代制ですか、三交代制ですか。",
        jaReading: "こうたいきんむはにこうたいせいですか、さんこうたいせいですか。",
      },
      {
        ko: "야간 근무 시 인력 배치는 주간과 어떻게 다른가요?",
        koRomaja: "yagan geunmu si illyeok baechineun jugangwa eotteoke dareungayo?",
        ja: "夜勤帯の人員配置は、日勤とどのように異なりますか。",
        jaReading: "やきんたいのじんいんはいちは、にっきんとどのようにことなりますか。",
      },
      {
        ko: "이 병동에서는 프라이머리 간호 체계를 운영하고 계신가요?",
        koRomaja: "i byeongdongeseoneun peuraimeori ganho chegyereul unyeonghago gyesin-gayo?",
        ja: "この病棟では、プライマリーナーシング体制を採っていらっしゃいますか。",
        jaReading: "このびょうとうでは、プライマリーナーシングたいせいをとっていらっしゃいますか。",
        noteKo: "프라이머리 간호는 한 간호사가 입원부터 퇴원까지 일관되게 담당하는 방식입니다.",
        noteJa: "プライマリーナーシングは、入院から退院まで一人の看護師が一貫して受け持つ方式です。",
      },
      {
        ko: "팀 간호와 프라이머리 간호 중 어느 쪽을 주로 쓰시나요?",
        koRomaja: "tim ganhowa peuraimeori ganho jung eoneu jjogeul juro sseusinayo?",
        ja: "チームナーシングとプライマリーナーシングのどちらを主に採用していますか。",
        jaReading: "チームナーシングとプライマリーナーシングのどちらをおもにさいようしていますか。",
      },
      {
        ko: "근무표는 누가 작성하고 어떤 주기로 정해지나요?",
        koRomaja: "geunmupyoneun nuga jakseonghago eotteon jugiro jeonghaejinayo?",
        ja: "勤務表は、どなたが作成し、どのような周期で決まりますか。",
        jaReading: "きんむひょうは、どなたがさくせいし、どのようなしゅうきできまりますか。",
      },
      {
        ko: "병동을 한 바퀴 돌면서 동선을 살펴봐도 괜찮을까요?",
        koRomaja: "byeongdongeul han bakwi dolmyeonseo dongseoneul salpyeobwado gwaenchaneulkkayo?",
        ja: "病棟を一周しながら動線を見せていただいてもよろしいですか。",
        jaReading: "びょうとうをいっしゅうしながらどうせんをみせていただいてもよろしいですか。",
      },
    ],
  },

  // ────────────────────────────── 인계 참관·간호기록 질문 ──────────────────────────────
  {
    key: "handover",
    role: "nurse",
    titleKo: "인계 참관·간호기록 질문",
    titleJa: "申し送り見学・看護記録質問",
    emoji: "🔁",
    phrases: [
      {
        ko: "인계 시간에 참관하고 싶은데 옆에 서 있어도 될까요?",
        koRomaja: "ingye sigane chamgwanhago sipeunde yeope seo isseodo doelkkayo?",
        ja: "申し送りの時間に見学したいのですが、そばで拝見してもよろしいですか。",
        jaReading: "もうしおくりのじかんにけんがくしたいのですが、そばではいけんしてもよろしいですか。",
        noteKo: "「申し送り(모시오쿠리)」는 우리말 ‘인계’에 해당하는 일본 간호 현장 용어입니다.",
        noteJa: "「申し送り」は韓国語の「인계」に当たる用語です。",
      },
      {
        ko: "인계는 보통 어느 정도 시간이 걸리나요?",
        koRomaja: "ingyeneun botong eoneu jeongdo sigani geollinayo?",
        ja: "申し送りには、普段どのくらい時間がかかりますか。",
        jaReading: "もうしおくりには、ふだんどのくらいじかんがかかりますか。",
      },
      {
        ko: "인계는 구두로 하시나요, 기록을 보면서 하시나요?",
        koRomaja: "ingyeneun gudooro hasinayo, girogeul bomyeonseo hasinayo?",
        ja: "申し送りは口頭ですか、それとも記録を見ながら行いますか。",
        jaReading: "もうしおくりはこうとうですか、それともきろくをみながらおこないますか。",
      },
      {
        ko: "인계 시 가장 먼저 공유하는 항목은 무엇인가요?",
        koRomaja: "ingye si gajang meonjeo gongyuhaneun hangmogeun mueosin-gayo?",
        ja: "申し送りの際、最初に共有する項目は何でしょうか。",
        jaReading: "もうしおくりのさい、さいしょにきょうゆうするこうもくはなんでしょうか。",
      },
      {
        ko: "중요한 변화는 어떤 방식으로 강조해서 전달하시나요?",
        koRomaja: "jungyohan byeonhwaneun eotteon bangsigeuro gangjohaeseo jeondalhasinayo?",
        ja: "重要な変化は、どのように強調して伝えていますか。",
        jaReading: "じゅうようなへんかは、どのようにきょうちょうしてつたえていますか。",
      },
      {
        ko: "인계 누락을 막기 위한 점검표 같은 것이 있나요?",
        koRomaja: "ingye nurageul makgi wihan jeomgeompyo gateun geosi innayo?",
        ja: "申し送りの漏れを防ぐためのチェックリストのようなものはありますか。",
        jaReading: "もうしおくりのもれをふせぐためのチェックリストのようなものはありますか。",
      },
      {
        ko: "방금 사용하신 약어를 제가 잘 못 알아들었는데 다시 알려주실 수 있나요?",
        koRomaja: "banggeum sayonghasin yageoreul jega jal mot araadeureonneunde dasi allyeojusil su innayo?",
        ja: "先ほど使われた略語が聞き取れなかったのですが、もう一度教えていただけますか。",
        jaReading: "さきほどつかわれたりゃくごがききとれなかったのですが、もういちどおしえていただけますか。",
      },
      {
        ko: "간호기록에는 어떤 항목들을 반드시 남기시나요?",
        koRomaja: "ganhogirogeneun eotteon hangmokdeureul bandeusi namgisinayo?",
        ja: "看護記録には、どのような項目を必ず残していますか。",
        jaReading: "かんごきろくには、どのようなこうもくをかならずのこしていますか。",
      },
      {
        ko: "기록은 근무 중에 수시로 하시나요, 인계 직전에 정리하시나요?",
        koRomaja: "girogeun geunmu junge susiro hasinayo, ingye jikjeone jeongnihasinayo?",
        ja: "記録は勤務中に随時行いますか、申し送り直前にまとめますか。",
        jaReading: "きろくはきんむちゅうにずいじおこないますか、もうしおくりちょくぜんにまとめますか。",
      },
      {
        ko: "인계 참관 후에 궁금한 점을 잠깐 여쭤봐도 괜찮을까요?",
        koRomaja: "ingye chamgwan hue gunggeumhan jeomeul jamkkan yeojjwobwado gwaenchaneulkkayo?",
        ja: "申し送りの見学後に、気になった点を少しお伺いしてもよろしいですか。",
        jaReading: "もうしおくりのけんがくごに、きになったてんをすこしおうかがいしてもよろしいですか。",
      },
    ],
  },

  // ────────────────────────────── 간호 기록·전산 질문 ──────────────────────────────
  {
    key: "records",
    role: "nurse",
    titleKo: "간호 기록·전산 질문",
    titleJa: "看護記録・電子カルテ質問",
    emoji: "💻",
    phrases: [
      {
        ko: "전자간호기록 시스템은 어떤 제품을 쓰고 계신가요?",
        koRomaja: "jeonja-ganhogirok siseutemeun eotteon jepumeul sseugo gyesin-gayo?",
        ja: "電子看護記録システムは、どの製品を使っていらっしゃいますか。",
        jaReading: "でんしかんごきろくシステムは、どのせいひんをつかっていらっしゃいますか。",
      },
      {
        ko: "활력징후는 단말기로 직접 입력하시나요, 나중에 옮겨 적으시나요?",
        koRomaja: "hwallyeokjinghuneun danmalgiro jikjeop imnyeokhasinayo, najjunge omgyeo jeogeusinayo?",
        ja: "バイタルサインは端末で直接入力しますか、後で転記しますか。",
        jaReading: "バイタルサインはたんまつでちょくせつにゅうりょくしますか、あとでてんきしますか。",
      },
      {
        ko: "활력징후 입력 화면을 잠깐 보여주실 수 있을까요?",
        koRomaja: "hwallyeokjinghu imnyeok hwamyeoneul jamkkan boyeojusil su isseulkkayo?",
        ja: "バイタルサインの入力画面を少し見せていただけますか。",
        jaReading: "バイタルサインのにゅうりょくがめんをすこしみせていただけますか。",
      },
      {
        ko: "간호 계획은 표준화된 양식으로 작성하시나요?",
        koRomaja: "ganho gyehoegeun pyojunhwadoen yangsigeuro jakseonghasinayo?",
        ja: "看護計画は標準化された様式で作成していますか。",
        jaReading: "かんごけいかくはひょうじゅんかされたようしきでさくせいしていますか。",
      },
      {
        ko: "간호 계획은 어느 주기로 평가하고 갱신하시나요?",
        koRomaja: "ganho gyehoegeun eoneu jugiro pyeonggahago gaengsinhasinayo?",
        ja: "看護計画は、どのくらいの周期で評価し更新していますか。",
        jaReading: "かんごけいかくは、どのくらいのしゅうきでひょうかしこうしんしていますか。",
      },
      {
        ko: "표준 간호 용어 체계를 도입하고 계신지 궁금합니다.",
        koRomaja: "pyojun ganho yongeo chegyereul doiphago gyesinji gunggeumhamnida.",
        ja: "標準看護用語の体系を導入されているか伺いたいです。",
        jaReading: "ひょうじゅんかんごようごのたいけいをどうにゅうされているかうかがいたいです。",
      },
      {
        ko: "기록 입력에 평균적으로 얼마나 시간이 드시나요?",
        koRomaja: "girok imnyeoge pyeonggyunjeogeuro eolmana sigani deusinayo?",
        ja: "記録の入力に、平均してどのくらい時間がかかりますか。",
        jaReading: "きろくのにゅうりょくに、へいきんしてどのくらいじかんがかかりますか。",
      },
      {
        ko: "전산 장애가 발생하면 기록은 어떻게 대체하시나요?",
        koRomaja: "jeonsan jangaega balsaenghamyeon girogeun eotteoke daechehasinayo?",
        ja: "システム障害が起きた場合、記録はどのように代替しますか。",
        jaReading: "システムしょうがいがおきたばあい、きろくはどのようにだいたいしますか。",
      },
      {
        ko: "의사 지시는 전산상에서 간호 측에 어떻게 전달되나요?",
        koRomaja: "uisa jisineun jeonsansangeseo ganho cheuge eotteoke jeondaldoenayo?",
        ja: "医師の指示は、システム上で看護側にどのように伝わりますか。",
        jaReading: "いしのしじは、システムじょうでかんごがわにどのようにつたわりますか。",
      },
      {
        ko: "기록 권한이나 수정 이력 관리는 어떻게 운영하시나요?",
        koRomaja: "girok gwonhanina sujeong iryeok gwallineun eotteoke unyeonghasinayo?",
        ja: "記録の権限や修正履歴の管理は、どのように運用していますか。",
        jaReading: "きろくのけんげんやしゅうせいりれきのかんりは、どのようにうんようしていますか。",
      },
    ],
  },

  // ────────────────────────────── 간호 술기·교육 견학 ──────────────────────────────
  {
    key: "skills",
    role: "nurse",
    titleKo: "간호 술기·교육 견학",
    titleJa: "看護技術・教育の見学",
    emoji: "💉",
    phrases: [
      {
        ko: "술기 시연을 연수 차원에서 견학해도 괜찮을까요?",
        koRomaja: "sulgi siyeoneul yeonsu chawoneseo gyeonhakaedo gwaenchaneulkkayo?",
        ja: "看護技術のデモンストレーションを、研修として見学してもよろしいですか。",
        jaReading: "かんごぎじゅつのデモンストレーションを、けんしゅうとしてけんがくしてもよろしいですか。",
      },
      {
        ko: "정맥주사 준비 절차를 옆에서 지켜봐도 될까요?",
        koRomaja: "jeongmaekjusa junbi jeolchareul yeopeseo jikyeobwado doelkkayo?",
        ja: "静脈注射の準備手順を、そばで見せていただいてもよいですか。",
        jaReading: "じょうみゃくちゅうしゃのじゅんびてじゅんを、そばでみせていただいてもよいですか。",
      },
      {
        ko: "드레싱 교환 시 사용하시는 소독 순서가 궁금합니다.",
        koRomaja: "deuresing gyohwan si sayonghasineun sodok sunseoga gunggeumhamnida.",
        ja: "ドレッシング交換の際の消毒の手順について伺いたいです。",
        jaReading: "ドレッシングこうかんのさいのしょうどくのてじゅんについてうかがいたいです。",
      },
      {
        ko: "이 술기 절차는 우리 병원과 조금 달라 흥미롭습니다.",
        koRomaja: "i sulgi jeolchaneun uri byeongwongwa jogeum dalla heungmiropseumnida.",
        ja: "この手技の手順は、当院と少し異なっていて興味深いです。",
        jaReading: "このしゅぎのてじゅんは、とういんとすこしことなっていてきょうみぶかいです。",
      },
      {
        ko: "신규 간호사 교육은 프리셉터 제도로 운영하시나요?",
        koRomaja: "singyu ganhosa gyoyugeun peuriseopteo jedoro unyeonghasinayo?",
        ja: "新人看護師の教育は、プリセプター制度で行っていますか。",
        jaReading: "しんじんかんごしのきょういくは、プリセプターせいどでおこなっていますか。",
        noteKo: "프리셉터는 신규 간호사를 일정 기간 전담 지도하는 선임 간호사를 가리킵니다.",
        noteJa: "プリセプターは、新人看護師を一定期間専任で指導する先輩看護師を指します。",
      },
      {
        ko: "프리셉터 한 명이 신규 간호사 몇 명을 맡으시나요?",
        koRomaja: "peuriseopteo han myeong-i singyu ganhosa myeot myeong-eul matteusinayo?",
        ja: "プリセプター一人が、新人看護師を何名担当しますか。",
        jaReading: "プリセプターひとりが、しんじんかんごしをなんめいたんとうしますか。",
      },
      {
        ko: "신규 교육 기간은 보통 얼마나 두시나요?",
        koRomaja: "singyu gyoyuk giganeun botong eolmana dusinayo?",
        ja: "新人教育の期間は、普段どのくらい設けていますか。",
        jaReading: "しんじんきょういくのきかんは、ふだんどのくらいもうけていますか。",
      },
      {
        ko: "술기 평가에는 체크리스트를 사용하시나요?",
        koRomaja: "sulgi pyeongga-eneun chekeuriseuteureul sayonghasinayo?",
        ja: "技術評価には、チェックリストを使っていますか。",
        jaReading: "ぎじゅつひょうかには、チェックリストをつかっていますか。",
      },
      {
        ko: "그 체크리스트 양식을 한 부 공유해 주실 수 있을까요?",
        koRomaja: "geu chekeuriseuteu yangsigeul han bu gongyuhae jusil su isseulkkayo?",
        ja: "そのチェックリストの様式を、一部共有していただけますか。",
        jaReading: "そのチェックリストのようしきを、いちぶきょうゆうしていただけますか。",
      },
      {
        ko: "시뮬레이션 실습실이나 교육 전용 공간이 따로 있나요?",
        koRomaja: "simyulleisyeon silseupsirina gyoyuk jeonyong gonggani ttaro innayo?",
        ja: "シミュレーション実習室や、教育専用のスペースは別にありますか。",
        jaReading: "シミュレーションじっしゅうしつや、きょういくせんようのスペースはべつにありますか。",
      },
    ],
  },

  // ────────────────────────────── 환자안전·감염관리 질문 ──────────────────────────────
  {
    key: "safety",
    role: "nurse",
    titleKo: "환자안전·감염관리 질문",
    titleJa: "患者安全・感染対策質問",
    emoji: "🛡️",
    phrases: [
      {
        ko: "환자안전 활동은 어떤 체계로 운영하고 계신가요?",
        koRomaja: "hwanja-anjeon hwaldongeun eotteon chegyero unyeonghago gyesin-gayo?",
        ja: "患者安全の取り組みは、どのような体制で運用していますか。",
        jaReading: "かんじゃあんぜんのとりくみは、どのようなたいせいでうんようしていますか。",
      },
      {
        ko: "낙상 위험 평가는 어느 시점에 시행하시나요?",
        koRomaja: "naksang wiheom pyeongganeun eoneu sijeome sihaenghasinayo?",
        ja: "転倒リスクの評価は、どの時点で実施していますか。",
        jaReading: "てんとうリスクのひょうかは、どのじてんでじっししていますか。",
      },
      {
        ko: "낙상 고위험 환자는 어떤 방식으로 표시하시나요?",
        koRomaja: "naksang gowiheom hwanjaneun eotteon bangsigeuro pyosihasinayo?",
        ja: "転倒の高リスク患者は、どのように表示・識別していますか。",
        jaReading: "てんとうのこうリスクかんじゃは、どのようにひょうじ・しきべつしていますか。",
      },
      {
        ko: "투약 오류를 막기 위한 확인 절차가 궁금합니다.",
        koRomaja: "tuyak oryureul makgi wihan hwagin jeolchaga gunggeumhamnida.",
        ja: "与薬エラーを防ぐための確認手順について伺いたいです。",
        jaReading: "よやくエラーをふせぐためのかくにんてじゅんについてうかがいたいです。",
      },
      {
        ko: "투약 시 여섯 가지 확인 원칙을 어떻게 적용하시나요?",
        koRomaja: "tuyak si yeoseot gaji hwagin wonchigeul eotteoke jeogyonghasinayo?",
        ja: "与薬の際の六つの確認(6R)を、どのように徹底していますか。",
        jaReading: "よやくのさいのむっつのかくにん(ろくアール)を、どのようにてっていしていますか。",
        noteKo: "‘여섯 가지 확인’은 일본 현장의 6R(정확한 환자·약·용량·경로·시간·기록)에 해당합니다.",
        noteJa: "「여섯 가지 확인」は、現場でいう6R(正しい患者・薬・用量・経路・時間・記録)に当たります。",
      },
      {
        ko: "아차사고 보고는 어떤 절차로 이루어지나요?",
        koRomaja: "achasago bogoneun eotteon jeolcharo irueojinayo?",
        ja: "ヒヤリ・ハットの報告は、どのような手順で行われますか。",
        jaReading: "ヒヤリ・ハットのほうこくは、どのようなてじゅんでおこなわれますか。",
      },
      {
        ko: "감염관리 담당 인력은 병동에 상주하나요, 별도 부서인가요?",
        koRomaja: "gamyeomgwalli damdang illyeogeun byeongdonge sangjuhanayo, byeoldo buseoingayo?",
        ja: "感染対策の担当者は病棟に常駐しますか、別の部署ですか。",
        jaReading: "かんせんたいさくのたんとうしゃはびょうとうにじょうちゅうしますか、べつのぶしょですか。",
      },
      {
        ko: "손위생 준수율은 어떻게 모니터링하고 계신가요?",
        koRomaja: "sonwisaeng junsuyureun eotteoke moniteoringhago gyesin-gayo?",
        ja: "手指衛生の遵守率は、どのようにモニタリングしていますか。",
        jaReading: "しゅしえいせいのじゅんしゅりつは、どのようにモニタリングしていますか。",
      },
      {
        ko: "손위생 점검 결과는 현장에 어떻게 피드백하시나요?",
        koRomaja: "sonwisaeng jeomgeom gyeolgwaneun hyeonjange eotteoke pideubaekhasinayo?",
        ja: "手指衛生の監査結果は、現場にどのようにフィードバックしていますか。",
        jaReading: "しゅしえいせいのかんさけっかは、げんばにどのようにフィードバックしていますか。",
      },
      {
        ko: "개인보호구 착탈의 교육은 정기적으로 시행하시나요?",
        koRomaja: "gaeinbohogu chaktalui gyoyugeun jeonggijeogeuro sihaenghasinayo?",
        ja: "個人防護具の着脱の教育は、定期的に実施していますか。",
        jaReading: "こじんぼうごぐのちゃくだつのきょういくは、ていきてきにじっししていますか。",
      },
    ],
  },
];
