// 병원 표지판·안내문 읽기 — 방문국 표지를 읽고 뜻을 파악하기 위한 한↔일 대역.
// ja=일본 병원 표지, ko=한국 병원 표지(같은 개념). 발음 표기로 즉시 인지·발화.
// ※ 표기는 일반적 예시이며 병원마다 다를 수 있어 실무 감수 권장.

export interface MedSign {
  ja: string;        // 일본 병원 표지 표기
  jaReading: string; // 가나 읽기
  jaPron: string;    // 한글 발음 (한국 직원용)
  ko: string;        // 한국 병원 표지 표기
  koPron: string;    // 가타카나 발음 (일본 직원용)
  emoji: string;
}

export interface MedSignGroup {
  key: string;
  titleKo: string;
  titleJa: string;
  emoji: string;
  signs: MedSign[];
}

export const MED_SIGNAGE: MedSignGroup[] = [
  {
    key: "reception", titleKo: "접수·수납", titleJa: "受付・会計", emoji: "🧾",
    signs: [
      { ja: "受付", jaReading: "うけつけ", jaPron: "우케츠케", ko: "접수", koPron: "チョプス", emoji: "📝" },
      { ja: "総合受付", jaReading: "そうごううけつけ", jaPron: "소우고우 우케츠케", ko: "종합 접수", koPron: "チョンハプ チョプス", emoji: "🏥" },
      { ja: "初診", jaReading: "しょしん", jaPron: "쇼신", ko: "초진", koPron: "チョジン", emoji: "🆕" },
      { ja: "再診受付", jaReading: "さいしんうけつけ", jaPron: "사이신 우케츠케", ko: "재진 접수", koPron: "チェジン チョプス", emoji: "🔁" },
      { ja: "会計", jaReading: "かいけい", jaPron: "카이케이", ko: "수납·계산", koPron: "スナプ", emoji: "💳" },
      { ja: "自動精算機", jaReading: "じどうせいさんき", jaPron: "지도우 세이산키", ko: "무인 정산기", koPron: "ムイン チョンサンギ", emoji: "🏧" },
      { ja: "番号札", jaReading: "ばんごうふだ", jaPron: "반고우후다", ko: "번호표", koPron: "ボノピョ", emoji: "🎫" },
      { ja: "保険証", jaReading: "ほけんしょう", jaPron: "호켄쇼우", ko: "보험증", koPron: "ボホムッチュン", emoji: "💳" },
    ],
  },
  {
    key: "department", titleKo: "진료과", titleJa: "診療科", emoji: "🩺",
    signs: [
      { ja: "内科", jaReading: "ないか", jaPron: "나이카", ko: "내과", koPron: "ネグァ", emoji: "🩺" },
      { ja: "外科", jaReading: "げか", jaPron: "게카", ko: "외과", koPron: "ウェグァ", emoji: "🔪" },
      { ja: "整形外科", jaReading: "せいけいげか", jaPron: "세이케이게카", ko: "정형외과", koPron: "チョンヒョンウェグァ", emoji: "🦴" },
      { ja: "小児科", jaReading: "しょうにか", jaPron: "쇼우니카", ko: "소아청소년과", koPron: "ソアグァ", emoji: "🧒" },
      { ja: "産婦人科", jaReading: "さんふじんか", jaPron: "산후진카", ko: "산부인과", koPron: "サンブインクァ", emoji: "🤰" },
      { ja: "眼科", jaReading: "がんか", jaPron: "간카", ko: "안과", koPron: "アングァ", emoji: "👁️" },
      { ja: "耳鼻咽喉科", jaReading: "じびいんこうか", jaPron: "지비인코우카", ko: "이비인후과", koPron: "イビインフグァ", emoji: "👂" },
      { ja: "皮膚科", jaReading: "ひふか", jaPron: "히후카", ko: "피부과", koPron: "ピブグァ", emoji: "🧴" },
      { ja: "歯科", jaReading: "しか", jaPron: "시카", ko: "치과", koPron: "チグァ", emoji: "🦷" },
    ],
  },
  {
    key: "exam", titleKo: "검사·영상", titleJa: "検査・放射線", emoji: "🔬",
    signs: [
      { ja: "採血室", jaReading: "さいけつしつ", jaPron: "사이케츠시츠", ko: "채혈실", koPron: "チェヒョルシル", emoji: "🩸" },
      { ja: "検査室", jaReading: "けんさしつ", jaPron: "켄사시츠", ko: "검사실", koPron: "コムサシル", emoji: "🧪" },
      { ja: "放射線科", jaReading: "ほうしゃせんか", jaPron: "호우샤센카", ko: "영상의학과", koPron: "ヨンサンウィハックァ", emoji: "☢️" },
      { ja: "レントゲン", jaReading: "れんとげん", jaPron: "렌토겐", ko: "엑스레이", koPron: "エックスレイ", emoji: "🩻" },
      { ja: "CT室", jaReading: "シーティーしつ", jaPron: "시-티-시츠", ko: "CT실", koPron: "シーティーシル", emoji: "🌀" },
      { ja: "MRI室", jaReading: "エムアールアイしつ", jaPron: "에무아-루아이시츠", ko: "MRI실", koPron: "エムアールアイシル", emoji: "🧲" },
      { ja: "内視鏡", jaReading: "ないしきょう", jaPron: "나이시쿄우", ko: "내시경", koPron: "ネシギョン", emoji: "🔭" },
      { ja: "超音波", jaReading: "ちょうおんぱ", jaPron: "쵸우온파", ko: "초음파", koPron: "チョウムパ", emoji: "📡" },
    ],
  },
  {
    key: "ward", titleKo: "병동·입원", titleJa: "病棟・入院", emoji: "🛏️",
    signs: [
      { ja: "入院受付", jaReading: "にゅういんうけつけ", jaPron: "뉴우인 우케츠케", ko: "입원 수속", koPron: "イブォン スソク", emoji: "🏨" },
      { ja: "病棟", jaReading: "びょうとう", jaPron: "뵤우토우", ko: "병동", koPron: "ピョンドン", emoji: "🛏️" },
      { ja: "ナースステーション", jaReading: "なーすすてーしょん", jaPron: "나-스 스테-숀", ko: "간호사실", koPron: "カノサシル", emoji: "💉" },
      { ja: "面会", jaReading: "めんかい", jaPron: "멘카이", ko: "면회", koPron: "ミョネ", emoji: "🤝" },
      { ja: "面会時間", jaReading: "めんかいじかん", jaPron: "멘카이 지칸", ko: "면회 시간", koPron: "ミョネ シガン", emoji: "🕐" },
      { ja: "集中治療室", jaReading: "しゅうちゅうちりょうしつ", jaPron: "슈우츄우 치료우시츠", ko: "중환자실", koPron: "チュンファンジャシル", emoji: "🫀" },
      { ja: "手術室", jaReading: "しゅじゅつしつ", jaPron: "슈주츠시츠", ko: "수술실", koPron: "ススルシル", emoji: "🔪" },
      { ja: "面会謝絶", jaReading: "めんかいしゃぜつ", jaPron: "멘카이 샤제츠", ko: "면회 사절", koPron: "ミョネ サジョル", emoji: "🚫" },
    ],
  },
  {
    key: "facility", titleKo: "시설·편의", titleJa: "施設・案内", emoji: "🚻",
    signs: [
      { ja: "お手洗い", jaReading: "おてあらい", jaPron: "오테아라이", ko: "화장실", koPron: "ファジャンシル", emoji: "🚻" },
      { ja: "エレベーター", jaReading: "えれべーたー", jaPron: "에레베-타-", ko: "엘리베이터", koPron: "エレベイト", emoji: "🛗" },
      { ja: "階段", jaReading: "かいだん", jaPron: "카이단", ko: "계단", koPron: "ケダン", emoji: "🪜" },
      { ja: "売店", jaReading: "ばいてん", jaPron: "바이텐", ko: "매점", koPron: "メジョム", emoji: "🏪" },
      { ja: "食堂", jaReading: "しょくどう", jaPron: "쇼쿠도우", ko: "식당", koPron: "シクタン", emoji: "🍱" },
      { ja: "薬局", jaReading: "やっきょく", jaPron: "얏쿄쿠", ko: "약국", koPron: "ヤックク", emoji: "💊" },
      { ja: "駐車場", jaReading: "ちゅうしゃじょう", jaPron: "츄우샤조우", ko: "주차장", koPron: "チュチャジャン", emoji: "🅿️" },
      { ja: "案内", jaReading: "あんない", jaPron: "안나이", ko: "안내", koPron: "アンネ", emoji: "ℹ️" },
    ],
  },
  {
    key: "caution", titleKo: "주의·안내문", titleJa: "注意・案内", emoji: "⚠️",
    signs: [
      { ja: "立入禁止", jaReading: "たちいりきんし", jaPron: "타치이리 킨시", ko: "출입 금지", koPron: "チュリプ クムジ", emoji: "⛔" },
      { ja: "関係者以外立入禁止", jaReading: "かんけいしゃいがいたちいりきんし", jaPron: "칸케이샤 이가이 타치이리 킨시", ko: "관계자 외 출입금지", koPron: "クァンゲジャ ウェ チュリプクムジ", emoji: "🚷" },
      { ja: "撮影禁止", jaReading: "さつえいきんし", jaPron: "사츠에이 킨시", ko: "촬영 금지", koPron: "チャリョン クムジ", emoji: "📵" },
      { ja: "携帯電話禁止", jaReading: "けいたいでんわきんし", jaPron: "케이타이 덴와 킨시", ko: "휴대폰 사용 금지", koPron: "ヒュデポン サヨン クムジ", emoji: "📴" },
      { ja: "手指消毒", jaReading: "しゅししょうどく", jaPron: "슈시 쇼우도쿠", ko: "손 소독", koPron: "ソン ソドク", emoji: "🧴" },
      { ja: "マスク着用", jaReading: "ますくちゃくよう", jaPron: "마스쿠 챠쿠요우", ko: "마스크 착용", koPron: "マスク チャグ​ヨン", emoji: "😷" },
      { ja: "非常口", jaReading: "ひじょうぐち", jaPron: "히죠우구치", ko: "비상구", koPron: "ピサング", emoji: "🚪" },
      { ja: "順番にお待ちください", jaReading: "じゅんばんにおまちください", jaPron: "쥰반니 오마치 쿠다사이", ko: "순서대로 기다려 주세요", koPron: "スンソデロ キダリョ ジュセヨ", emoji: "⏳" },
    ],
  },
];
