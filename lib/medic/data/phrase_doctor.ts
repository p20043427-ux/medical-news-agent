// 의사 직군 회화집 — 은성의료재단 ↔ 가마치그룹 직원 상호방문(연수·견학)용.
// 방문한 의사(연수자)와 호스트 병원 의사·스태프 사이의 직원 대 직원 전문 대화로 구성.
// ⚠️ 환자 대상 표현(진단·치료 설명, 복약 지도 등)은 포함하지 않습니다. 모두 동료 간 교류 대화입니다.
// jaReading 은 TTS·후리가나용 전체 가나 읽기(한자 미포함).

import type { MedPhraseGroup } from "../types";

export const PHRASES_DOCTOR: MedPhraseGroup[] = [
  // ────────────────────────────── 회진 동행·증례 토의 ──────────────────────────────
  {
    key: "rounds",
    role: "doctor",
    titleKo: "회진 동행·증례 토의",
    titleJa: "回診同行・症例検討",
    emoji: "🩺",
    phrases: [
      {
        ko: "오늘 회진에 동행해도 괜찮을까요? 뒤에서 조용히 참관하겠습니다.",
        koRomaja: "oneul hoejine donghaenghaedo gwaenchanheulkkayo? dwieseo joyonghi chamgwanhagesseumnida.",
        ja: "本日の回診に同行してもよろしいでしょうか。後ろで静かに見学いたします。",
        jaReading: "ほんじつのかいしんにどうこうしてもよろしいでしょうか。うしろでしずかにけんがくいたします。",
      },
      {
        ko: "이 증례는 어떤 경과로 입원하게 되었는지 여쭤봐도 될까요?",
        koRomaja: "i jeungnyeneun eotteon gyeonggwaro ibwonhage doeeonneunji yeojjwobwado doelkkayo?",
        ja: "この症例はどのような経過で入院されたか、お伺いしてもよろしいですか。",
        jaReading: "このしょうれいはどのようなけいかでにゅういんされたか、おうかがいしてもよろしいですか。",
      },
      {
        ko: "한국에서는 같은 상황에서 보존적 치료를 먼저 고려하는 편입니다. 여기서는 어떻게 판단하시나요?",
        koRomaja: "hangugeseoneun gateun sanghwangeseo bojonjeok chiryoreul meonjeo goryeohaneun pyeonimnida. yeogiseoneun eotteoke pandanhasinayo?",
        ja: "韓国では同じ状況でまず保存的治療を検討する傾向があります。こちらではどのように判断されますか。",
        jaReading: "かんこくではおなじじょうきょうでまずほぞんてきちりょうをけんとうするけいこうがあります。こちらではどのようにはんだんされますか。",
        noteKo: "치료 방침 비교는 양국의 가이드라인 차이를 전제로 부드럽게 묻는 것이 좋습니다.",
        noteJa: "治療方針の比較は、両国のガイドラインの違いを前提に、やわらかく尋ねると良いです。",
      },
      {
        ko: "이 환자분의 치료 방침은 어느 단계에서 최종 결정되나요?",
        koRomaja: "i hwanjabunui chiryo bangchimeun eoneu dangyeeseo choejong gyeoljeongdoenayo?",
        ja: "この患者さんの治療方針は、どの段階で最終決定されますか。",
        jaReading: "このかんじゃさんのちりょうほうしんは、どのだんかいでさいしゅうけっていされますか。",
      },
      {
        ko: "회진 팀은 보통 어떤 구성으로 도시나요? 전공의도 함께 참여하나요?",
        koRomaja: "hoejin timeun botong eotteon guseongeuro dosinayo? jeon-gong-uido hamkke chamyeohanayo?",
        ja: "回診チームは普段どのような構成で回られますか。研修医も一緒に参加しますか。",
        jaReading: "かいしんチームはふだんどのようなこうせいでまわられますか。けんしゅういもいっしょにさんかしますか。",
      },
      {
        ko: "회진 중에 메모를 남겨도 될까요? 환자 정보는 기록하지 않겠습니다.",
        koRomaja: "hoejin junge memoreul namgyeodo doelkkayo? hwanja jeongboneun girokhaji ankgesseumnida.",
        ja: "回診中にメモを取ってもよろしいですか。患者情報は記録いたしません。",
        jaReading: "かいしんちゅうにメモをとってもよろしいですか。かんじゃじょうほうはきろくいたしません。",
        noteKo: "개인정보 보호를 먼저 언급하면 호스트 측이 안심합니다.",
        noteJa: "個人情報の保護に先に触れると、ホスト側が安心します。",
      },
      {
        ko: "이런 합병증이 있을 때는 어느 과와 협진을 진행하시나요?",
        koRomaja: "ireon hapbyeongjeungi isseul ttaeneun eoneu gwawa hyeopjineul jinhaenghasinayo?",
        ja: "このような合併症がある場合、どの科と連携して診療されますか。",
        jaReading: "このようながっぺいしょうがあるばあい、どのかとれんけいしてしんりょうされますか。",
      },
      {
        ko: "회진 후 증례에 대해 잠시 토의할 시간을 주실 수 있을까요?",
        koRomaja: "hoejin hu jeungnyee daehae jamsi touihal siganeul jusil su isseulkkayo?",
        ja: "回診のあと、症例について少し検討する時間をいただけますか。",
        jaReading: "かいしんのあと、しょうれいについてすこしけんとうするじかんをいただけますか。",
      },
      {
        ko: "방금 그 검사 결과 해석은 매우 인상적이었습니다. 판단 근거를 더 듣고 싶습니다.",
        koRomaja: "banggeum geu geomsa gyeolgwa haeseogeun maeu insangjeogieosseumnida. pandan geun-georeul deo deutgo sipseumnida.",
        ja: "先ほどの検査結果の解釈はとても勉強になりました。判断の根拠をもう少し伺いたいです。",
        jaReading: "さきほどのけんさけっかのかいしゃくはとてもべんきょうになりました。はんだんのこんきょをもうすこしうかがいたいです。",
      },
      {
        ko: "오늘 회진에서 배운 점이 많았습니다. 시간 내주셔서 감사합니다.",
        koRomaja: "oneul hoejineseo baeun jeomi manatseumnida. sigan naejusyeoseo gamsahamnida.",
        ja: "本日の回診で学ぶことが多くありました。お時間をいただきありがとうございました。",
        jaReading: "ほんじつのかいしんでまなぶことがおおくありました。おじかんをいただきありがとうございました。",
      },
    ],
  },

  // ────────────────────────────── 진료 시스템·프로토콜 질문 ──────────────────────────────
  {
    key: "protocol",
    role: "doctor",
    titleKo: "진료 시스템·프로토콜 질문",
    titleJa: "診療システム・プロトコル質問",
    emoji: "📋",
    phrases: [
      {
        ko: "이 질환의 표준 진료 경로(클리니컬 패스)는 어떻게 구성되어 있나요?",
        koRomaja: "i jirwanui pyojun jillyo gyeongno(keullinikeol paeseu)neun eotteoke guseongdoeeo innayo?",
        ja: "この疾患の標準診療経路（クリニカルパス）はどのように構成されていますか。",
        jaReading: "このしっかんのひょうじゅんしんりょうけいろ（クリニカルパス）はどのようにこうせいされていますか。",
      },
      {
        ko: "치료 가이드라인은 일본 학회 기준을 따르시나요, 아니면 자체 프로토콜이 있으신가요?",
        koRomaja: "chiryo gaideurain-eun ilbon hakhoe gijuneul ttareusinayo, animyeon jache peurotokori isseusin-gayo?",
        ja: "治療ガイドラインは日本の学会基準に従われますか、それとも独自のプロトコルがありますか。",
        jaReading: "ちりょうガイドラインはにほんのがっかいきじゅんにしたがわれますか、それともどくじのプロトコルがありますか。",
      },
      {
        ko: "전자의무기록(EMR)에서 오더는 어떤 흐름으로 입력되나요? 화면을 잠깐 봐도 될까요?",
        koRomaja: "jeonjauimugirok(EMR)eseo odeoneun eotteon heureumeuro imnyeokdoenayo? hwamyeoneul jamkkan bwado doelkkayo?",
        ja: "電子カルテでオーダーはどのような流れで入力されますか。画面を少し拝見してもよろしいですか。",
        jaReading: "でんしカルテでオーダーはどのようなながれでにゅうりょくされますか。がめんをすこしはいけんしてもよろしいですか。",
        noteKo: "EMR 화면에는 환자정보가 노출되므로 견학 가능 여부를 반드시 먼저 확인합니다.",
        noteJa: "電子カルテ画面には患者情報が表示されるため、見学の可否を必ず先に確認します。",
      },
      {
        ko: "오더 세트나 처방 템플릿은 진료과별로 따로 관리하시나요?",
        koRomaja: "odeo seteuna cheobang tempeulrit-eun jillyogwabyeollo ttaro gwallihasinayo?",
        ja: "オーダーセットや処方テンプレートは診療科ごとに別々に管理されていますか。",
        jaReading: "オーダーセットやしょほうテンプレートはしんりょうかごとにべつべつにかんりされていますか。",
      },
      {
        ko: "타과 의뢰(컨설트)는 시스템상에서 어떻게 요청하고 회신을 받나요?",
        koRomaja: "tagwa uiroe(keonseolteu)neun siseutemsang-eseo eotteoke yocheonghago hoesineul banayo?",
        ja: "他科への依頼（コンサルト）はシステム上でどのように依頼し、返信を受け取りますか。",
        jaReading: "たかへのいらい（コンサルト）はシステムじょうでどのようにいらいし、へんしんをうけとりますか。",
      },
      {
        ko: "응급 상황에서의 프로토콜은 일반 외래와 어떻게 다르게 운영되나요?",
        koRomaja: "eunggeup sanghwangeseoui peurotokoreun ilban oeraewa eotteoke dareuge unyeongdoenayo?",
        ja: "緊急時のプロトコルは、通常の外来とどのように分けて運用されていますか。",
        jaReading: "きんきゅうじのプロトコルは、つうじょうのがいらいとどのようにわけてうんようされていますか。",
      },
      {
        ko: "검사 결과의 위험치(패닉 밸류)는 어떤 경로로 담당의에게 통보되나요?",
        koRomaja: "geomsa gyeolgwaui wiheomchi(paenik baellyu)neun eotteon gyeongnoro damdang-uiege tongbodoenayo?",
        ja: "検査結果の危険値（パニック値）は、どのような経路で担当医に通知されますか。",
        jaReading: "けんさけっかのきけんち（パニックち）は、どのようなけいろでたんとういにつうちされますか。",
      },
      {
        ko: "한국에서는 이 부분을 전자 알림으로 처리하는데, 여기서는 어떤 방식인지 궁금합니다.",
        koRomaja: "hangugeseoneun i bubuneul jeonja allimeuro cheorihaneunde, yeogiseoneun eotteon bangsiginji gunggeumhamnida.",
        ja: "韓国ではこの部分を電子通知で処理しているのですが、こちらではどのような方式か気になります。",
        jaReading: "かんこくではこのぶぶんをでんしつうちでしょりしているのですが、こちらではどのようなほうしきかきになります。",
      },
      {
        ko: "프로토콜 개정은 어느 부서가 주도하고 얼마나 자주 갱신되나요?",
        koRomaja: "peurotokol gaejeong-eun eoneu buseoga judohago eolmana jaju gaengsindoenayo?",
        ja: "プロトコルの改訂はどの部署が主導し、どのくらいの頻度で更新されますか。",
        jaReading: "プロトコルのかいていはどのぶしょがしゅどうし、どのくらいのひんどでこうしんされますか。",
      },
      {
        ko: "이 시스템 운영 노하우를 저희 재단에도 공유해 주시면 큰 도움이 되겠습니다.",
        koRomaja: "i siseutem unyeong nohaureul jeohui jaedanedo gongyuhae jusimyeon keun doumi doegesseumnida.",
        ja: "このシステム運用のノウハウを当財団にも共有いただけると、大変参考になります。",
        jaReading: "このシステムうんようのノウハウをとうざいだんにもきょうゆういただけると、たいへんさんこうになります。",
      },
    ],
  },

  // ────────────────────────────── 수술·시술 견학 ──────────────────────────────
  {
    key: "surgery",
    role: "doctor",
    titleKo: "수술·시술 견학",
    titleJa: "手術・処置の見学",
    emoji: "🔬",
    phrases: [
      {
        ko: "수술실 견학을 허락해 주셔서 감사합니다. 어디에 서 있으면 방해가 되지 않을까요?",
        koRomaja: "susulsil gyeonhageul heorakhae jusyeoseo gamsahamnida. eodie seo isseumyeon banghaega doeji aneulkkayo?",
        ja: "手術室の見学をお許しいただきありがとうございます。どこに立っていれば妨げになりませんか。",
        jaReading: "しゅじゅつしつのけんがくをおゆるしいただきありがとうございます。どこにたっていればさまたげになりませんか。",
      },
      {
        ko: "이 시술에서 가장 중요한 술기 포인트는 어느 단계인가요?",
        koRomaja: "i sisureseo gajang jung-yohan sulgi pointeuneun eoneu dangyein-gayo?",
        ja: "この処置で最も重要な手技のポイントは、どの段階ですか。",
        jaReading: "このしょちでもっともじゅうようなしゅぎのポイントは、どのだんかいですか。",
      },
      {
        ko: "지금 사용하시는 이 장비는 어떤 모델인가요? 한국 병원에서도 도입을 검토 중입니다.",
        koRomaja: "jigeum sayonghasineun i jangbineun eotteon moderin-gayo? hanguk byeongwoneseodo doibeul geomto jungimnida.",
        ja: "今お使いのこの機器はどのモデルですか。韓国の病院でも導入を検討中です。",
        jaReading: "いまおつかいのこのききはどのモデルですか。かんこくのびょういんでもどうにゅうをけんとうちゅうです。",
      },
      {
        ko: "마취는 전신마취로 진행하시나요? 마취과와의 협업 방식이 궁금합니다.",
        koRomaja: "machwineun jeonsinmachwiro jinhaenghasinayo? machwigwawaui hyeobeop bangsigi gunggeumhamnida.",
        ja: "麻酔は全身麻酔で行われますか。麻酔科との連携の方法が気になります。",
        jaReading: "ますいはぜんしんますいでおこなわれますか。ますいかとのれんけいのほうほうがきになります。",
      },
      {
        ko: "이 접근법을 선택하신 이유를 여쭤봐도 될까요? 한국에서는 다른 방식을 더 자주 씁니다.",
        koRomaja: "i jeopgeunbeobeul seontaekhasin iyureul yeojjwobwado doelkkayo? hangugeseoneun dareun bangsigeul deo jaju sseumnida.",
        ja: "このアプローチを選ばれた理由をお伺いしてもよろしいですか。韓国では別の方法をより多く用います。",
        jaReading: "このアプローチをえらばれたりゆうをおうかがいしてもよろしいですか。かんこくではべつのほうほうをよりおおくもちいます。",
        noteKo: "술기 비교는 호스트 술자가 손을 멈추지 않을 타이밍에 묻는 것이 예의입니다.",
        noteJa: "手技の比較は、執刀医の手が止まらないタイミングで尋ねるのが礼儀です。",
      },
      {
        ko: "이 수술의 평균 소요 시간은 어느 정도인가요?",
        koRomaja: "i susurui pyeong-gyun soyo siganeun eoneu jeongdoin-gayo?",
        ja: "この手術の平均所要時間はどのくらいですか。",
        jaReading: "このしゅじゅつのへいきんしょようじかんはどのくらいですか。",
      },
      {
        ko: "수술 일정은 하루에 몇 건 정도 잡으시고, 사이사이 준비 시간은 어떻게 확보하시나요?",
        koRomaja: "susul iljeong-eun harue myeot geon jeongdo jabeusigo, saisai junbi siganeun eotteoke hwakbohasinayo?",
        ja: "手術予定は一日に何件ほど組まれ、合間の準備時間はどのように確保されますか。",
        jaReading: "しゅじゅつよていはいちにちになんけんほどくまれ、あいまのじゅんびじかんはどのようにかくほされますか。",
      },
      {
        ko: "수술실 회전율을 높이기 위해 어떤 운영상의 노력을 하고 계신가요?",
        koRomaja: "susulsil hoejeollyureul nopiigi wihae eotteon unyeongsang-ui noryeogeul hago gyesin-gayo?",
        ja: "手術室の回転率を上げるために、どのような運用上の工夫をされていますか。",
        jaReading: "しゅじゅつしつのかいてんりつをあげるために、どのようなうんようじょうのくふうをされていますか。",
      },
      {
        ko: "수술 전 타임아웃(안전 점검) 절차는 어떤 항목으로 진행되나요?",
        koRomaja: "susul jeon taimaut(anjeon jeomgeom) jeolchaneun eotteon hangmogeuro jinhaengdoenayo?",
        ja: "手術前のタイムアウト（安全確認）の手順は、どのような項目で行われますか。",
        jaReading: "しゅじゅつまえのタイムアウト（あんぜんかくにん）のてじゅんは、どのようなこうもくでおこなわれますか。",
      },
      {
        ko: "오늘 견학으로 술기와 운영 모두 큰 자극을 받았습니다. 정말 감사합니다.",
        koRomaja: "oneul gyeonhageuro sulgiwa unyeong modu keun jageugeul badatseumnida. jeongmal gamsahamnida.",
        ja: "本日の見学で、手技も運用も大いに刺激を受けました。本当にありがとうございました。",
        jaReading: "ほんじつのけんがくで、しゅぎもうんようもおおいにしげきをうけました。ほんとうにありがとうございました。",
      },
    ],
  },

  // ────────────────────────────── 외래·입원 운영 질문 ──────────────────────────────
  {
    key: "operations",
    role: "doctor",
    titleKo: "외래·입원 운영 질문",
    titleJa: "外来・入院運営の質問",
    emoji: "🏥",
    phrases: [
      {
        ko: "하루 외래 환자 수는 의사 한 명당 평균 어느 정도인가요?",
        koRomaja: "haru oerae hwanja suneun uisa han myeongdang pyeong-gyun eoneu jeongdoin-gayo?",
        ja: "一日の外来患者数は、医師一人あたり平均どのくらいですか。",
        jaReading: "いちにちのがいらいかんじゃすうは、いしひとりあたりへいきんどのくらいですか。",
      },
      {
        ko: "병상 가동률은 어떻게 관리하시나요? 입퇴원 조정은 누가 담당합니까?",
        koRomaja: "byeongsang gadongnyureun eotteoke gwallihasinayo? iptoewon jojeong-eun nuga damdanghamnikka?",
        ja: "病床稼働率はどのように管理されていますか。入退院の調整は誰が担当しますか。",
        jaReading: "びょうしょうかどうりつはどのようにかんりされていますか。にゅうたいいんのちょうせいはだれがたんとうしますか。",
      },
      {
        ko: "평균 재원일수는 어느 정도이고, 단축을 위한 별도 관리가 있으신가요?",
        koRomaja: "pyeong-gyun jaewonilssuneun eoneu jeongdoigo, danchugeul wihan byeoldo gwalliga isseusin-gayo?",
        ja: "平均在院日数はどのくらいで、短縮のための個別の取り組みはありますか。",
        jaReading: "へいきんざいいんにっすうはどのくらいで、たんしゅくのためのこべつのとりくみはありますか。",
        noteKo: "재원일수는 양국 의료 수가 제도가 달라 단순 비교보다 운영 배경을 함께 묻는 것이 좋습니다.",
        noteJa: "在院日数は両国の診療報酬制度が異なるため、単純比較より運用の背景を併せて尋ねると良いです。",
      },
      {
        ko: "당직 체계는 어떻게 운영되나요? 야간에는 몇 명이 근무하시나요?",
        koRomaja: "dangjik chegyeneun eotteoke unyeongdoenayo? yaganeneun myeot myeong-i geunmuhasinayo?",
        ja: "当直体制はどのように運用されていますか。夜間は何名が勤務されますか。",
        jaReading: "とうちょくたいせいはどのようにうんようされていますか。やかんはなんめいがきんむされますか。",
      },
      {
        ko: "온콜(대기) 호출은 어떤 기준으로 이루어지고, 응답 시간 목표가 정해져 있나요?",
        koRomaja: "onkol(daegi) hochureun eotteon gijuneuro irueojigo, eungdap sigan mokpyoga jeonghaejyeo innayo?",
        ja: "オンコール（待機）の呼び出しはどのような基準で行われ、応答時間の目標は決まっていますか。",
        jaReading: "オンコール（たいき）のよびだしはどのようなきじゅんでおこなわれ、おうとうじかんのもくひょうはきまっていますか。",
      },
      {
        ko: "한 병동을 담당하는 의료진 구성은 어떻게 되나요? 의사와 간호사 비율이 궁금합니다.",
        koRomaja: "han byeongdong-eul damdanghaneun uiryojin guseong-eun eotteoke doenayo? uisawa ganhosa biyuri gunggeumhamnida.",
        ja: "一つの病棟を担当するスタッフ構成はどのようになっていますか。医師と看護師の比率が気になります。",
        jaReading: "ひとつのびょうとうをたんとうするスタッフこうせいはどのようになっていますか。いしとかんごしのひりつがきになります。",
      },
      {
        ko: "외래 예약은 어느 정도 앞서 마감되나요? 당일 접수도 받으시나요?",
        koRomaja: "oerae yeyageun eoneu jeongdo apseo magamdoenayo? dangil jeopsudo badeusinayo?",
        ja: "外来の予約はどのくらい前に締め切られますか。当日受付も受けられますか。",
        jaReading: "がいらいのよやくはどのくらいまえにしめきられますか。とうじつうけつけもうけられますか。",
      },
      {
        ko: "입원 환자의 주치의 배정은 어떤 원칙으로 이루어지나요?",
        koRomaja: "ibwon hwanjaui juchiui baejeong-eun eotteon wonchigeuro irueojinayo?",
        ja: "入院患者の主治医の割り当ては、どのような原則で行われますか。",
        jaReading: "にゅういんかんじゃのしゅじいのわりあては、どのようなげんそくでおこなわれますか。",
      },
      {
        ko: "병상이 부족할 때 응급 입원은 어떻게 조정하시나요?",
        koRomaja: "byeongsang-i bujokhal ttae eunggeup ibwoneun eotteoke jojeonghasinayo?",
        ja: "病床が不足する際、緊急入院はどのように調整されますか。",
        jaReading: "びょうしょうがふそくするさい、きんきゅうにゅういんはどのようにちょうせいされますか。",
      },
      {
        ko: "운영 지표를 이렇게 체계적으로 관리하시는 점이 인상 깊었습니다. 많이 배웠습니다.",
        koRomaja: "unyeong jipyoreul ireoke chegyejeogeuro gwallihasineun jeomi insang gipeotseumnida. mani baewotseumnida.",
        ja: "運営指標をこれほど体系的に管理されている点が印象的でした。大変勉強になりました。",
        jaReading: "うんえいしひょうをこれほどたいけいてきにかんりされているてんがいんしょうてきでした。たいへんべんきょうになりました。",
      },
    ],
  },

  // ────────────────────────────── 의국·교육 컨퍼런스 ──────────────────────────────
  {
    key: "conference",
    role: "doctor",
    titleKo: "의국·교육 컨퍼런스",
    titleJa: "医局・教育カンファレンス",
    emoji: "📚",
    phrases: [
      {
        ko: "내일 아침 컨퍼런스에 참석해도 될까요? 몇 시에 어디에서 시작하나요?",
        koRomaja: "naeil achim keonpeoreonseue chamseokhaedo doelkkayo? myeot sie eodieseo sijakhanayo?",
        ja: "明日の朝のカンファレンスに参加してもよろしいですか。何時にどこで始まりますか。",
        jaReading: "あしたのあさのカンファレンスにさんかしてもよろしいですか。なんじにどこではじまりますか。",
      },
      {
        ko: "전공의 교육은 어떤 프로그램으로 구성되어 있나요? 연차별 커리큘럼이 있으신가요?",
        koRomaja: "jeon-gong-ui gyoyugeun eotteon peurogeuraemeuro guseongdoeeo innayo? yeonchabyeol keorikyulreomi isseusin-gayo?",
        ja: "研修医教育はどのようなプログラムで構成されていますか。年次ごとのカリキュラムはありますか。",
        jaReading: "けんしゅういきょういくはどのようなプログラムでこうせいされていますか。ねんじごとのカリキュラムはありますか。",
      },
      {
        ko: "저널 클럽은 얼마나 자주 열리나요? 발표 담당은 어떻게 정하시나요?",
        koRomaja: "jeoneol keulreobeun eolmana jaju yeollinayo? balpyo damdangeun eotteoke jeonghasinayo?",
        ja: "ジャーナルクラブはどのくらいの頻度で開かれますか。発表担当はどのように決められますか。",
        jaReading: "ジャーナルクラブはどのくらいのひんどでひらかれますか。はっぴょうたんとうはどのようにきめられますか。",
      },
      {
        ko: "오늘 컨퍼런스에서 한국 측 증례를 짧게 발표해도 괜찮을까요?",
        koRomaja: "oneul keonpeoreonseueseo hanguk cheuk jeungnyereul jjalge balpyohaedo gwaenchanheulkkayo?",
        ja: "本日のカンファレンスで、韓国側の症例を短く発表してもよろしいでしょうか。",
        jaReading: "ほんじつのカンファレンスで、かんこくがわのしょうれいをみじかくはっぴょうしてもよろしいでしょうか。",
        noteKo: "발표 자료에 환자 식별 정보가 없도록 사전에 비식별화 처리를 마쳐 둡니다.",
        noteJa: "発表資料に患者の識別情報が含まれないよう、事前に匿名化を済ませておきます。",
      },
      {
        ko: "이번 합동 증례 발표는 양국의 접근 차이를 비교하는 좋은 기회가 될 것 같습니다.",
        koRomaja: "ibeon hapdong jeungnye balpyoneun yangguk-ui jeopgeun chaireul bigyohaneun joeun gihoega doel geot gatseumnida.",
        ja: "今回の合同症例発表は、両国のアプローチの違いを比較する良い機会になりそうです。",
        jaReading: "こんかいのごうどうしょうれいはっぴょうは、りょうこくのアプローチのちがいをひかくするよいきかいになりそうです。",
      },
      {
        ko: "발표 슬라이드는 일본어와 한국어 중 어느 쪽으로 준비하면 좋을까요?",
        koRomaja: "balpyo seullaideuneun ilboneowa hangugeo jung eoneu jjogeuro junbihamyeon joeulkkayo?",
        ja: "発表スライドは日本語と韓国語のどちらで準備するのが良いでしょうか。",
        jaReading: "はっぴょうスライドはにほんごとかんこくごのどちらでじゅんびするのがよいでしょうか。",
      },
      {
        ko: "교육 컨퍼런스에서 지도전문의는 어떤 방식으로 피드백을 주시나요?",
        koRomaja: "gyoyuk keonpeoreonseueseo jidojeonmun-uineun eotteon bangsigeuro pideubaegeul jusinayo?",
        ja: "教育カンファレンスで指導医はどのような方法でフィードバックをされますか。",
        jaReading: "きょういくカンファレンスでしどういはどのようなほうほうでフィードバックをされますか。",
      },
      {
        ko: "사망 증례나 합병증 검토회(M&M)도 정기적으로 진행하시나요?",
        koRomaja: "samang jeungnyena hapbyeongjeung geomtohoe(M&M)do jeong-gijeogeuro jinhaenghasinayo?",
        ja: "死亡症例や合併症の検討会（M&M）も定期的に行われていますか。",
        jaReading: "しぼうしょうれいやがっぺいしょうのけんとうかい（エムアンドエム）もていきてきにおこなわれていますか。",
      },
      {
        ko: "방금 발표하신 최신 연구 내용을 자료로 공유받을 수 있을까요?",
        koRomaja: "banggeum balpyohasin choesin yeon-gu naeyongeul jaryoro gongyubadeul su isseulkkayo?",
        ja: "先ほど発表された最新の研究内容を、資料として共有いただけますか。",
        jaReading: "さきほどはっぴょうされたさいしんのけんきゅうないようを、しりょうとしてきょうゆういただけますか。",
      },
      {
        ko: "앞으로 양 병원이 정기적으로 합동 컨퍼런스를 이어가면 좋겠습니다.",
        koRomaja: "apeuro yang byeongwoni jeong-gijeogeuro hapdong keonpeoreonseureul ieogamyeon jokesseumnida.",
        ja: "今後、両病院が定期的に合同カンファレンスを続けていければ嬉しいです。",
        jaReading: "こんご、りょうびょういんがていきてきにごうどうカンファレンスをつづけていければうれしいです。",
      },
    ],
  },
];
