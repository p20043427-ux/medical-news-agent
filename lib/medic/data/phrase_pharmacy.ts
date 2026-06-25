// 약제부 직원 교류 회화집 — 은성의료재단 ↔ 가마치그룹 직원 상호방문용.
// 방문한 약사(연수자)와 호스트 약제부 동료 사이의 직원 대 직원 전문 대화로 구성.
// ⚠️ 환자 대상 복약지도 문장은 포함하지 않으며, 모두 약사 대 동료 견학·비교 대화입니다.
// jaReading 은 TTS·후리가나용 전체 가나 읽기. 시스템 표현은 실제 운용 전 양국 직원 검수 권장.

import type { MedPhraseGroup } from "../types";

export const PHRASES_PHARMACY: MedPhraseGroup[] = [
  // ────────────────────────── 조제·자동화 견학 ──────────────────────────
  {
    key: "dispensing",
    role: "pharmacy",
    titleKo: "조제·자동화 견학",
    titleJa: "調剤・自動化の見学",
    emoji: "💊",
    phrases: [
      {
        ko: "오늘 조제실 자동화 설비를 견학할 수 있어 기쁩니다.",
        koRomaja: "oneul jojesil jadonghwa seolbireul gyeonhakhal su isseo gippeumnida.",
        ja: "本日は調剤室の自動化設備を見学できて嬉しく思います。",
        jaReading: "ほんじつはちょうざいしつのじどうかせつびをけんがくできてうれしくおもいます。",
      },
      {
        ko: "이 ATC(정제 자동분포기)는 하루 몇 건 정도 처리하나요?",
        koRomaja: "i ei-ti-si(jeongje jadongbunpogi)neun haru myeot geon jeongdo cheorihanayo?",
        ja: "このATC（錠剤自動分包機）は一日に何件ほど処理していますか？",
        jaReading: "このエーティーシー（じょうざいじどうぶんぽうき）はいちにちになんけんほどしょりしていますか？",
        noteKo: "ATC = 정제 자동분포기. 일본에서도 'ATC'로 통용됩니다.",
        noteJa: "ATC＝錠剤自動分包機。日本でも「ATC」で通じます。",
      },
      {
        ko: "외래와 입원 처방의 1일 조제 건수를 알려주실 수 있을까요?",
        koRomaja: "oeraewa ibwon cheobang-ui iril joje geonsureul allyeojusil su isseulkkayo?",
        ja: "外来と入院処方の一日あたりの調剤件数を教えていただけますか？",
        jaReading: "がいらいとにゅういんしょほうのいちにちあたりのちょうざいけんすうをおしえていただけますか？",
      },
      {
        ko: "1회 분량씩 포장하는 단포(unit-dose) 방식을 쓰고 계시는군요.",
        koRomaja: "ilhoe bullyangssik pojanghaneun danpo(yunit-doseu) bangsigeul sseugo gyesineungunyo.",
        ja: "一回分ずつ包装するワンドーズ（unit-dose）方式を採用していらっしゃるのですね。",
        jaReading: "いっかいぶんずつほうそうするワンドーズ（ユニットドーズ）ほうしきをさいようしていらっしゃるのですね。",
      },
      {
        ko: "산제와 수제는 어느 공정에서 자동화가 적용되나요?",
        koRomaja: "sanjewa sujeneun eoneu gongjeongeseo jadonghwaga jeogyongdoenayo?",
        ja: "散剤と水剤は、どの工程で自動化が適用されていますか？",
        jaReading: "さんざいとすいざいは、どのこうていでじどうかがてきようされていますか？",
      },
      {
        ko: "조제 후 감사(검수)는 사람이 합니까, 기계가 합니까?",
        koRomaja: "joje hu gamsa(geomsu)neun sarami hamnikka, gigyega hamnikka?",
        ja: "調剤後の鑑査（チェック）は人が行いますか、機械が行いますか？",
        jaReading: "ちょうざいごのかんさ（チェック）はひとがおこないますか、きかいがおこないますか？",
      },
      {
        ko: "자동분포기의 오류율은 어느 정도이며 어떻게 관리하시나요?",
        koRomaja: "jadongbunpogiui oryuyureun eoneu jeongdoimyeo eotteoke gwallihasinayo?",
        ja: "自動分包機のエラー率はどのくらいで、どう管理されていますか？",
        jaReading: "じどうぶんぽうきのエラーりつはどのくらいで、どうかんりされていますか？",
      },
      {
        ko: "도입 후 조제 시간이 얼마나 단축되었는지 궁금합니다.",
        koRomaja: "doip hu joje sigani eolmana danchukdoeeonneunji gunggeumhamnida.",
        ja: "導入後、調剤時間がどれだけ短縮されたのか気になります。",
        jaReading: "どうにゅうご、ちょうざいじかんがどれだけたんしゅくされたのかきになります。",
      },
      {
        ko: "이 피킹 시스템은 바코드로 약품을 대조하는 방식인가요?",
        koRomaja: "i piking siseuteumeun bakodeuro yakpumeul daejohaneun bangsigingayo?",
        ja: "このピッキングシステムは、バーコードで薬品を照合する方式ですか？",
        jaReading: "このピッキングシステムは、バーコードでやくひんをしょうごうするほうしきですか？",
      },
      {
        ko: "설비 유지보수와 정기 점검은 어떤 주기로 진행하시나요?",
        koRomaja: "seolbi yujibosuwa jeonggi jeomgeomeun eotteon jugiro jinhaenghasinayo?",
        ja: "設備の保守と定期点検は、どのような周期で行っていますか？",
        jaReading: "せつびのほしゅとていきてんけんは、どのようなしゅうきでおこなっていますか？",
      },
    ],
  },
  // ────────────────────────── 약품·재고 관리 ──────────────────────────
  {
    key: "inventory",
    role: "pharmacy",
    titleKo: "약품·재고 관리",
    titleJa: "薬品・在庫管理",
    emoji: "📦",
    phrases: [
      {
        ko: "약품 재고는 어떤 시스템으로 실시간 관리하고 계신가요?",
        koRomaja: "yakpum jaegoneun eotteon siseuteumeuro silsigan gwallihago gyesingayo?",
        ja: "薬品の在庫は、どのようなシステムでリアルタイム管理されていますか？",
        jaReading: "やくひんのざいこは、どのようなシステムでリアルタイムかんりされていますか？",
      },
      {
        ko: "유효기간 임박 약품은 어떻게 사전에 파악하시나요?",
        koRomaja: "yuhyogigan imbak yakpumeun eotteoke sajeone paakhasinayo?",
        ja: "有効期限が近い薬品は、どのように事前に把握していますか？",
        jaReading: "ゆうこうきげんがちかいやくひんは、どのようにじぜんにはあくしていますか？",
      },
      {
        ko: "선입선출 원칙은 자동으로 관리됩니까, 수기로 확인하십니까?",
        koRomaja: "seonipseonchul wonchigeun jadongeuro gwallidoemnikka, sugiro hwaginhasimnikka?",
        ja: "先入れ先出しの原則は自動で管理されますか、手作業で確認しますか？",
        jaReading: "さきいれさきだしのげんそくはじどうでかんりされますか、てさぎょうでかくにんしますか？",
      },
      {
        ko: "냉장·냉동 의약품의 콜드체인 온도는 어떻게 모니터링하나요?",
        koRomaja: "naengjang-naengdong uiyakpumui koldeuchein ondoneun eotteoke moniteoringhanayo?",
        ja: "冷蔵・冷凍医薬品のコールドチェーン温度は、どう監視していますか？",
        jaReading: "れいぞう・れいとういやくひんのコールドチェーンおんどは、どうかんしていますか？",
        noteKo: "콜드체인 = 냉장유통. 온도 일탈 알람 연동 여부를 함께 물으면 좋습니다.",
        noteJa: "コールドチェーン＝冷蔵流通。温度逸脱アラート連動の有無も合わせて確認すると良いです。",
      },
      {
        ko: "발주는 적정 재고량에 따라 자동으로 이루어지나요?",
        koRomaja: "baljuneun jeokjeong jaegoryange ttara jadongeuro irueojinayo?",
        ja: "発注は、適正在庫量に応じて自動で行われますか？",
        jaReading: "はっちゅうは、てきせいざいこりょうにおうじてじどうでおこなわれますか？",
      },
      {
        ko: "원내 채용 약품 목록(포뮬러리)은 어떤 기준으로 결정하시나요?",
        koRomaja: "wonnae chaeyong yakpum mongnok(pomyulleori)eun eotteon gijuneuro gyeoljeonghasinayo?",
        ja: "院内採用薬リスト（フォーミュラリー）は、どのような基準で決めていますか？",
        jaReading: "いんないさいようやくリスト（フォーミュラリー）は、どのようなきじゅんできめていますか？",
      },
      {
        ko: "품절·공급 부족 약품은 어떻게 대체 약으로 전환하시나요?",
        koRomaja: "pumjeol-gonggeup bujok yakpumeun eotteoke daeche yageuro jeonhwanhasinayo?",
        ja: "品切れ・供給不足の薬品は、どのように代替薬へ切り替えていますか？",
        jaReading: "しなぎれ・きょうきゅうぶそくのやくひんは、どのようにだいたいやくへきりかえていますか？",
      },
      {
        ko: "정기 재고조사는 얼마나 자주 실시하십니까?",
        koRomaja: "jeonggi jaegojosaneun eolmana jaju silsihasimnikka?",
        ja: "定期的な棚卸しは、どのくらいの頻度で実施していますか？",
        jaReading: "ていきてきなたなおろしは、どのくらいのひんどでじっししていますか？",
      },
      {
        ko: "반품과 폐기 의약품은 어떤 절차로 처리하시나요?",
        koRomaja: "banpumgwa pyegi uiyakpumeun eotteon jeolcharo cheorihasinayo?",
        ja: "返品と廃棄医薬品は、どのような手順で処理していますか？",
        jaReading: "へんぴんとはいきいやくひんは、どのようなてじゅんでしょりしていますか？",
      },
      {
        ko: "병동 비치약 재고도 약제부에서 일괄 관리하시는지요?",
        koRomaja: "byeongdong bichiyak jaegodo yakjebueseo ilgwal gwallihasineunjiyo?",
        ja: "病棟の定数配置薬の在庫も、薬剤部で一括管理されているのでしょうか？",
        jaReading: "びょうとうのていすうはいちやくのざいこも、やくざいぶでいっかつかんりされているのでしょうか？",
      },
    ],
  },
  // ───────────────────── 처방전달체계(CPOE) 질문 ─────────────────────
  {
    key: "cpoe",
    role: "pharmacy",
    titleKo: "처방전달체계(CPOE) 질문",
    titleJa: "処方伝達システム(CPOE)質問",
    emoji: "🖥️",
    phrases: [
      {
        ko: "의사 처방은 어떤 경로로 약제부 시스템에 전달되나요?",
        koRomaja: "uisa cheobangeun eotteon gyeongnoro yakjebu siseuteume jeondaldoenayo?",
        ja: "医師の処方は、どのような経路で薬剤部システムに伝達されますか？",
        jaReading: "いしのしょほうは、どのようなけいろでやくざいぶシステムにでんたつされますか？",
      },
      {
        ko: "처방은 전자처방(CPOE)으로 직접 약국에 도달하는 구조인가요?",
        koRomaja: "cheobangeun jeonjacheobang(CPOE)euro jikjeop yakguge dodalhaneun gujoingayo?",
        ja: "処方は電子処方（CPOE）で直接薬局に届く仕組みですか？",
        jaReading: "しょほうはでんししょほう（シーポーイー）でちょくせつやっきょくにとどくしくみですか？",
        noteKo: "CPOE = 처방전달체계. 일본에서는 '오더링 시스템(オーダリング)'으로도 부릅니다.",
        noteJa: "CPOE＝処方伝達システム。日本では「オーダリングシステム」とも呼びます。",
      },
      {
        ko: "처방감사(처방 검토)는 시스템이 우선 거르나요, 약사가 보나요?",
        koRomaja: "cheobanggamsa(cheobang geomto)neun siseuteumi useon georeunayo, yaksaga bonayo?",
        ja: "処方監査は、システムが先にスクリーニングしますか、薬剤師が確認しますか？",
        jaReading: "しょほうかんさは、システムがさきにスクリーニングしますか、やくざいしがかくにんしますか？",
        noteKo: "한국 '처방감사' ↔ 일본 '処方監査(しょほうかんさ)'로 대응됩니다.",
        noteJa: "韓国「처방감사」↔日本「処方監査」が対応します。",
      },
      {
        ko: "약물 상호작용 점검은 시스템에서 자동으로 경고가 뜨나요?",
        koRomaja: "yangmul sanghojagyong jeomgeomeun siseuteumeseo jadongeuro gyeonggoga tteunayo?",
        ja: "薬物相互作用のチェックは、システムで自動的に警告が出ますか？",
        jaReading: "やくぶつそうごさようのチェックは、システムでじどうてきにけいこくがでますか？",
      },
      {
        ko: "용량 초과나 중복 투약 경고는 어떤 기준으로 설정되어 있나요?",
        koRomaja: "yongnyang chogwana jungbok tuyak gyeonggoneun eotteon gijuneuro seoljeongdoeeo innayo?",
        ja: "過量や重複投与の警告は、どのような基準で設定されていますか？",
        jaReading: "かりょうやじゅうふくとうよのけいこくは、どのようなきじゅんでせっていされていますか？",
      },
      {
        ko: "경고가 너무 자주 떠서 무시되는 알람 피로 문제는 없으신가요?",
        koRomaja: "gyeonggoga neomu jaju tteoseo musidoeneun allam piro munjeneun eopseusingayo?",
        ja: "警告が頻繁に出て無視されてしまう、アラート疲労の問題はありませんか？",
        jaReading: "けいこくがひんぱんにでてむしされてしまう、アラートひろうのもんだいはありませんか？",
      },
      {
        ko: "약사가 처방에 의문이 있을 때 의사에게 어떻게 조회하시나요?",
        koRomaja: "yaksaga cheobange uimuni isseul ttae uisaege eotteoke johoehasinayo?",
        ja: "薬剤師が処方に疑問があるとき、医師へどのように疑義照会しますか？",
        jaReading: "やくざいしがしょほうにぎもんがあるとき、いしへどのようにぎぎしょうかいしますか？",
      },
      {
        ko: "검사 결과나 신기능 수치도 처방 화면에서 함께 확인되나요?",
        koRomaja: "geomsa gyeolgwana singineung suchido cheobang hwamyeoneseo hamkke hwagindoenayo?",
        ja: "検査結果や腎機能の数値も、処方画面で一緒に確認できますか？",
        jaReading: "けんさけっかやじんきのうのすうちも、しょほうがめんでいっしょにかくにんできますか？",
      },
      {
        ko: "전자처방과 약제 시스템은 같은 회사 제품으로 연동되나요?",
        koRomaja: "jeonjacheobanggwa yakje siseuteumeun gateun hoesa jepumeuro yeondongdoenayo?",
        ja: "電子処方と薬剤システムは、同じベンダーの製品で連携していますか？",
        jaReading: "でんししょほうとやくざいシステムは、おなじベンダーのせいひんでれんけいしていますか？",
      },
      {
        ko: "시스템 장애가 났을 때의 수기 백업 절차도 마련되어 있나요?",
        koRomaja: "siseuteum jangaega nasseul ttaeui sugi baegeop jeolchado maryeondoeeo innayo?",
        ja: "システム障害時の手書きバックアップ手順も整備されていますか？",
        jaReading: "システムしょうがいじのてがきバックアップてじゅんもせいびされていますか？",
      },
    ],
  },
  // ───────────────────── 복약지도 체계 비교 ─────────────────────
  {
    key: "counseling-system",
    role: "pharmacy",
    titleKo: "복약지도 체계 비교",
    titleJa: "服薬指導体制の比較",
    emoji: "🗂️",
    phrases: [
      {
        ko: "귀 병원에서는 복약지도 업무를 어떻게 조직하고 운영하시나요?",
        koRomaja: "gwi byeongwoneseoneun bogyakjido eommureul eotteoke jojikhago unyeonghasinayo?",
        ja: "貴院では、服薬指導の業務をどのように組織・運営されていますか？",
        jaReading: "きいんでは、ふくやくしどうのぎょうむをどのようにそしき・うんえいされていますか？",
      },
      {
        ko: "병동 담당 약사(병동약사) 제도를 운영하고 계신가요?",
        koRomaja: "byeongdong damdang yaksa(byeongdongyaksa) jedoreul unyeonghago gyesingayo?",
        ja: "病棟担当薬剤師（病棟薬剤師）の制度を運用されていますか？",
        jaReading: "びょうとうたんとうやくざいし（びょうとうやくざいし）のせいどをうんようされていますか？",
      },
      {
        ko: "약사 한 명이 담당하는 병동 수는 평균 어느 정도인가요?",
        koRomaja: "yaksa han myeongi damdanghaneun byeongdong suneun pyeonggyun eoneu jeongdoingayo?",
        ja: "薬剤師一人が担当する病棟数は、平均でどのくらいですか？",
        jaReading: "やくざいしひとりがたんとうするびょうとうすうは、へいきんでどのくらいですか？",
      },
      {
        ko: "복약지도 내용은 어떤 양식으로 기록하고 공유하시나요?",
        koRomaja: "bogyakjido naeyongeun eotteon yangsigeuro girokhago gongyuhasinayo?",
        ja: "服薬指導の内容は、どのような様式で記録・共有していますか？",
        jaReading: "ふくやくしどうのないようは、どのようなようしきできろく・きょうゆうしていますか？",
      },
      {
        ko: "고위험 약물 복용 환자는 별도 지도 대상으로 분류하시나요?",
        koRomaja: "gowiheom yangmul boyong hwanjaneun byeoldo jido daesangeuro bullyuhasinayo?",
        ja: "ハイリスク薬を服用する患者さんは、別途指導対象として分類していますか？",
        jaReading: "ハイリスクやくをふくようするかんじゃさんは、べっとしどうたいしょうとしてぶんるいしていますか？",
      },
      {
        ko: "퇴원 시 복약 정보 제공은 어느 직종이 주도하시나요?",
        koRomaja: "toewon si bogyak jeongbo jegongeun eoneu jikjong-i judohasinayo?",
        ja: "退院時の薬剤情報提供は、どの職種が主導されていますか？",
        jaReading: "たいいんじのやくざいじょうほうていきょうは、どのしょくしゅがしゅどうされていますか？",
      },
      {
        ko: "다제 복용 환자의 처방 정리는 약제부에서 제안하기도 하나요?",
        koRomaja: "daje boyong hwanjaui cheobang jeongnineun yakjebueseo jeanhagido hanayo?",
        ja: "多剤服用患者の処方整理は、薬剤部から提案することもありますか？",
        jaReading: "たざいふくようかんじゃのしょほうせいりは、やくざいぶからていあんすることもありますか？",
      },
      {
        ko: "복약지도 실적은 어떤 지표로 평가하고 관리하시나요?",
        koRomaja: "bogyakjido siljeogeun eotteon jipyoro pyeonggahago gwallihasinayo?",
        ja: "服薬指導の実績は、どのような指標で評価・管理していますか？",
        jaReading: "ふくやくしどうのじっせきは、どのようなしひょうでひょうか・かんりしていますか？",
      },
      {
        ko: "약사가 회진에 동행하는 팀의료 체계가 있으신지 궁금합니다.",
        koRomaja: "yaksaga hoejine donghaenghaneun timuiryo chegyega isseusinji gunggeumhamnida.",
        ja: "薬剤師が回診に同行するチーム医療体制があるか気になります。",
        jaReading: "やくざいしがかいしんにどうこうするチームいりょうたいせいがあるかきになります。",
      },
      {
        ko: "양국의 복약지도 체계를 비교하니 운영 방식이 흥미롭습니다.",
        koRomaja: "yangguguy bogyakjido chegyereul bigyohani unyeong bangsigi heungmirobseumnida.",
        ja: "両国の服薬指導体制を比較すると、運営の仕方が興味深いです。",
        jaReading: "りょうこくのふくやくしどうたいせいをひかくすると、うんえいのしかたがきょうみぶかいです。",
      },
    ],
  },
  // ───────────────────── 마약류·안전관리 ─────────────────────
  {
    key: "narcotics",
    role: "pharmacy",
    titleKo: "마약류·안전관리",
    titleJa: "麻薬類・安全管理",
    emoji: "🔐",
    phrases: [
      {
        ko: "마약류는 어떤 절차로 입고하고 보관하시나요?",
        koRomaja: "mayangnyuneun eotteon jeolcharo ipgohago bogwanhasinayo?",
        ja: "麻薬類は、どのような手順で入庫し保管していますか？",
        jaReading: "まやくるいは、どのようなてじゅんでにゅうこしほかんしていますか？",
      },
      {
        ko: "마약 금고의 출납은 누가, 어떻게 이중 확인합니까?",
        koRomaja: "mayak geumgoui chulnabeun nuga, eotteoke ijung hwaginhamnikka?",
        ja: "麻薬金庫の出納は、誰が、どのようにダブルチェックしていますか？",
        jaReading: "まやくきんこのすいとうは、だれが、どのようにダブルチェックしていますか？",
        noteKo: "한국 '마약 금고' ↔ 일본 '麻薬金庫(まやくきんこ)'. 이중잠금 운영이 일반적입니다.",
        noteJa: "韓国「마약 금고」↔日本「麻薬金庫」。二重施錠での運用が一般的です。",
      },
      {
        ko: "마약류 사용 후 잔량과 폐기는 어떻게 기록하고 입회하시나요?",
        koRomaja: "mayangnyu sayong hu jallyanggwa pyegineun eotteoke girokhago ipoehasinayo?",
        ja: "麻薬類の使用後の残量と廃棄は、どう記録し立ち会っていますか？",
        jaReading: "まやくるいのしようごのざんりょうとはいきは、どうきろくしたちあっていますか？",
      },
      {
        ko: "마약류 재고 수량은 매일 마감 시 대조하십니까?",
        koRomaja: "mayangnyu jaego suryangeun maeil magam si daejohasimnikka?",
        ja: "麻薬類の在庫数量は、毎日締め時に照合していますか？",
        jaReading: "まやくるいのざいこすうりょうは、まいにちしめどきにしょうごうしていますか？",
      },
      {
        ko: "고주의 약물(high-alert)은 일반 약과 어떻게 구분 보관하시나요?",
        koRomaja: "gojuui yangmul(high-alert)eun ilban yakgwa eotteoke gubun bogwanhasinayo?",
        ja: "ハイアラート薬（high-alert）は、一般薬とどのように区別保管していますか？",
        jaReading: "ハイアラートやく（ハイアラート）は、いっぱんやくとどのようにくべつほかんしていますか？",
      },
      {
        ko: "이름이 비슷하거나 모양이 닮은 약(LASA)의 오류 예방책이 있나요?",
        koRomaja: "ireumi biseuthageona moyangi dalmeun yak(LASA)ui oryu yebangchaegi innayo?",
        ja: "名称類似・外観類似（LASA）の薬による取り違え防止策はありますか？",
        jaReading: "めいしょうるいじ・がいかんるいじ（ラサ）のやくによるとりちがえぼうしさくはありますか？",
      },
      {
        ko: "조제 오류가 발생했을 때 보고와 분석은 어떻게 이뤄지나요?",
        koRomaja: "joje oryuga balsaenghaesseul ttae bogowa bunseogeun eotteoke irwojinayo?",
        ja: "調剤エラーが発生した際、報告と分析はどのように行われますか？",
        jaReading: "ちょうざいエラーがはっせいしたさい、ほうこくとぶんせきはどのようにおこなわれますか？",
      },
      {
        ko: "아차사고(near-miss) 사례는 어떻게 수집하고 공유하시나요?",
        koRomaja: "achasago(near-miss) saryeneun eotteoke sujiphago gongyuhasinayo?",
        ja: "ヒヤリ・ハット（near-miss）事例は、どのように収集し共有していますか？",
        jaReading: "ヒヤリ・ハット（ニアミス）じれいは、どのようにしゅうしゅうしきょうゆうしていますか？",
      },
      {
        ko: "고농도 전해질 같은 위험 약물은 병동 비치를 제한하시나요?",
        koRomaja: "gonongdo jeonhaejil gateun wiheom yangmureun byeongdong bichireul jehanhasinayo?",
        ja: "高濃度電解質のような危険薬は、病棟配置を制限されていますか？",
        jaReading: "こうのうどでんかいしつのようなきけんやくは、びょうとうはいちをせいげんされていますか？",
      },
      {
        ko: "안전관리 교육은 약제부 직원에게 어떤 주기로 시행하시나요?",
        koRomaja: "anjeon gwalli gyoyugeun yakjebu jigwonege eotteon jugiro sihaenghasinayo?",
        ja: "安全管理教育は、薬剤部の職員へどのような周期で実施していますか？",
        jaReading: "あんぜんかんりきょういくは、やくざいぶのしょくいんへどのようなしゅうきでじっししていますか？",
      },
    ],
  },
];
