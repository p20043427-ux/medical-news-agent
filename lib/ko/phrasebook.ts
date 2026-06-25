export interface KoPhrasebookPhrase {
  ko: string;       // Korean sentence (the phrase to learn)
  romaja: string;   // Revised Romanization of Korean (e.g. "annyeonghaseyo")
  ja: string;       // Japanese translation (the meaning, since the audience is Japanese)
  tip?: string;     // optional short usage tip, written IN JAPANESE
}

export interface KoPhrasebookSituation {
  key: string;      // english slug, e.g. "airport"
  title: string;    // Korean title, e.g. "공항·입국"
  titleJa: string;  // Japanese title, e.g. "空港・入国"
  emoji: string;
  phrases: KoPhrasebookPhrase[];
}

export const KO_TRAVEL_PHRASEBOOK: KoPhrasebookSituation[] = [
  {
    key: "basic",
    title: "인사·기본",
    titleJa: "あいさつ・基本",
    emoji: "👋",
    phrases: [
      {
        ko: "안녕하세요.",
        romaja: "annyeonghaseyo",
        ja: "こんにちは。",
        tip: "朝・昼・晩いつでも使える万能なあいさつです。",
      },
      {
        ko: "감사합니다.",
        romaja: "gamsahamnida",
        ja: "ありがとうございます。",
        tip: "「고맙습니다(gomapseumnida)」もほぼ同じ意味で使えます。",
      },
      {
        ko: "죄송합니다.",
        romaja: "joesonghamnida",
        ja: "すみません。/ ごめんなさい。",
      },
      {
        ko: "네, 알겠습니다.",
        romaja: "ne, algetseumnida",
        ja: "はい、わかりました。",
      },
      {
        ko: "한국어를 잘 못해요.",
        romaja: "hangugeoreul jal mothaeyo",
        ja: "韓国語があまり上手ではありません。",
        tip: "困ったときに言うと、相手がゆっくり話してくれます。",
      },
      {
        ko: "천천히 말씀해 주세요.",
        romaja: "cheoncheonhi malsseumhae juseyo",
        ja: "ゆっくり話してください。",
      },
      {
        ko: "다시 한번 말해 주세요.",
        romaja: "dasi hanbeon malhae juseyo",
        ja: "もう一度言ってください。",
      },
    ],
  },
  {
    key: "airport",
    title: "공항·입국",
    titleJa: "空港・入国",
    emoji: "✈️",
    phrases: [
      {
        ko: "관광하러 왔어요.",
        romaja: "gwangwanghareo wasseoyo",
        ja: "観光で来ました。",
        tip: "入国審査で訪問目的を聞かれたときの定番の答えです。",
      },
      {
        ko: "일주일 동안 있을 거예요.",
        romaja: "iljuil dongan isseul geoyeyo",
        ja: "一週間滞在する予定です。",
      },
      {
        ko: "수하물은 어디에서 찾아요?",
        romaja: "suhamureun eodieseo chajayo",
        ja: "手荷物はどこで受け取りますか？",
      },
      {
        ko: "제 캐리어가 안 나왔어요.",
        romaja: "je kaerieoga an nawasseoyo",
        ja: "私のスーツケースが出てきませんでした。",
      },
      {
        ko: "환전은 어디에서 해요?",
        romaja: "hwanjeoneun eodieseo haeyo",
        ja: "両替はどこでできますか？",
      },
      {
        ko: "공항버스 정류장이 어디예요?",
        romaja: "gonghangbeoseu jeongnyujangi eodiyeyo",
        ja: "空港バスの乗り場はどこですか？",
        tip: "「정류장(jeongnyujang)」はバス停・乗り場のことです。",
      },
      {
        ko: "심카드를 사고 싶어요.",
        romaja: "simkadeureul sago sipeoyo",
        ja: "SIMカードを買いたいです。",
      },
    ],
  },
  {
    key: "hotel",
    title: "호텔·숙소",
    titleJa: "ホテル・宿泊",
    emoji: "🏨",
    phrases: [
      {
        ko: "체크인하고 싶어요.",
        romaja: "chekeuinhago sipeoyo",
        ja: "チェックインしたいです。",
      },
      {
        ko: "예약했어요. 이름은 다나카예요.",
        romaja: "yeyakhaesseoyo. ireumeun danakayeyo",
        ja: "予約しました。名前はタナカです。",
        tip: "自分の名前に置き換えて使いましょう。",
      },
      {
        ko: "와이파이 비밀번호가 뭐예요?",
        romaja: "waipai bimilbeonhoga mwoyeyo",
        ja: "Wi-Fiのパスワードは何ですか？",
      },
      {
        ko: "방을 바꿀 수 있어요?",
        romaja: "bangeul bakkul su isseoyo",
        ja: "部屋を変えてもらえますか？",
      },
      {
        ko: "짐을 좀 맡길 수 있어요?",
        romaja: "jimeul jom matgil su isseoyo",
        ja: "荷物を預かってもらえますか？",
        tip: "チェックアウト後に観光したいときに便利です。",
      },
      {
        ko: "체크아웃은 몇 시예요?",
        romaja: "chekeuauseun myeot siyeyo",
        ja: "チェックアウトは何時ですか？",
      },
    ],
  },
  {
    key: "restaurant",
    title: "식당·주문",
    titleJa: "食堂・注文",
    emoji: "🍚",
    phrases: [
      {
        ko: "메뉴 좀 보여 주세요.",
        romaja: "menyu jom boyeo juseyo",
        ja: "メニューを見せてください。",
      },
      {
        ko: "이거 주세요.",
        romaja: "igeo juseyo",
        ja: "これをください。",
        tip: "メニューを指さしながら言うと確実に伝わります。",
      },
      {
        ko: "안 맵게 해 주세요.",
        romaja: "an maepge hae juseyo",
        ja: "辛くしないでください。",
        tip: "辛さが苦手な人に必須のフレーズです。",
      },
      {
        ko: "물 좀 주세요.",
        romaja: "mul jom juseyo",
        ja: "お水をください。",
      },
      {
        ko: "이거 진짜 맛있어요.",
        romaja: "igeo jinjja masisseoyo",
        ja: "これ本当においしいです。",
      },
      {
        ko: "계산해 주세요.",
        romaja: "gyesanhae juseyo",
        ja: "お会計をお願いします。",
      },
      {
        ko: "포장해 주세요.",
        romaja: "pojanghae juseyo",
        ja: "持ち帰りにしてください。",
      },
    ],
  },
  {
    key: "shopping",
    title: "쇼핑·계산",
    titleJa: "買い物・会計",
    emoji: "🛍️",
    phrases: [
      {
        ko: "이거 얼마예요?",
        romaja: "igeo eolmayeyo",
        ja: "これはいくらですか？",
      },
      {
        ko: "한번 입어 봐도 돼요?",
        romaja: "hanbeon ibeo bwado dwaeyo",
        ja: "試着してもいいですか？",
        tip: "服のときは「입어 봐도(ibeo bwado)」、靴のときは「신어 봐도(sineo bwado)」を使います。",
      },
      {
        ko: "더 큰 사이즈 있어요?",
        romaja: "deo keun saijeu isseoyo",
        ja: "もっと大きいサイズはありますか？",
      },
      {
        ko: "조금만 깎아 주세요.",
        romaja: "jogeumman kkakka juseyo",
        ja: "少しまけてください。",
        tip: "市場(시장)では値切れますが、デパートでは使えません。",
      },
      {
        ko: "카드로 계산할게요.",
        romaja: "kadeuro gyesanhalgeyo",
        ja: "カードで支払います。",
      },
      {
        ko: "봉투 하나 주세요.",
        romaja: "bongtu hana juseyo",
        ja: "袋を一枚ください。",
      },
    ],
  },
  {
    key: "transport",
    title: "교통·길찾기",
    titleJa: "交通・道案内",
    emoji: "🚇",
    phrases: [
      {
        ko: "지하철역이 어디예요?",
        romaja: "jihacheoryeogi eodiyeyo",
        ja: "地下鉄の駅はどこですか？",
      },
      {
        ko: "이 버스 명동에 가요?",
        romaja: "i beoseu myeongdonge gayo",
        ja: "このバスは明洞に行きますか？",
        tip: "「명동」を行きたい地名に置き換えて使えます。",
      },
      {
        ko: "여기에서 멀어요?",
        romaja: "yeogieseo meoreoyo",
        ja: "ここから遠いですか？",
      },
      {
        ko: "택시 좀 불러 주세요.",
        romaja: "taeksi jom bulleo juseyo",
        ja: "タクシーを呼んでください。",
      },
      {
        ko: "여기에서 세워 주세요.",
        romaja: "yeogieseo sewo juseyo",
        ja: "ここで止めてください。",
        tip: "タクシーで降りたい場所に着いたときに使います。",
      },
      {
        ko: "교통카드는 어디에서 충전해요?",
        romaja: "gyotongkadeuneun eodieseo chungjeonhaeyo",
        ja: "交通カードはどこでチャージしますか？",
      },
      {
        ko: "길을 잃었어요.",
        romaja: "gireul ireosseoyo",
        ja: "道に迷いました。",
      },
    ],
  },
  {
    key: "sightseeing",
    title: "관광·여가",
    titleJa: "観光・レジャー",
    emoji: "📸",
    phrases: [
      {
        ko: "입장료가 얼마예요?",
        romaja: "ipjangnyoga eolmayeyo",
        ja: "入場料はいくらですか？",
      },
      {
        ko: "사진 좀 찍어 주세요.",
        romaja: "sajin jom jjigeo juseyo",
        ja: "写真を撮ってください。",
        tip: "通りすがりの人にお願いするときの定番フレーズです。",
      },
      {
        ko: "여기에서 사진 찍어도 돼요?",
        romaja: "yeogieseo sajin jjigeodo dwaeyo",
        ja: "ここで写真を撮ってもいいですか？",
      },
      {
        ko: "화장실이 어디예요?",
        romaja: "hwajangsiri eodiyeyo",
        ja: "トイレはどこですか？",
      },
      {
        ko: "몇 시에 문을 닫아요?",
        romaja: "myeot sie muneul dadayo",
        ja: "何時に閉まりますか？",
      },
      {
        ko: "근처에 가 볼 만한 곳 있어요?",
        romaja: "geuncheoe ga bol manhan got isseoyo",
        ja: "近くにおすすめの場所はありますか？",
        tip: "現地の人におすすめを聞きたいときに便利です。",
      },
    ],
  },
  {
    key: "emergency",
    title: "긴급·병원",
    titleJa: "緊急・病院",
    emoji: "🏥",
    phrases: [
      {
        ko: "도와주세요!",
        romaja: "dowajuseyo",
        ja: "助けてください！",
        tip: "緊急時に大声で言える、いちばん大切なフレーズです。",
      },
      {
        ko: "몸이 아파요.",
        romaja: "momi apayo",
        ja: "体の具合が悪いです。",
      },
      {
        ko: "병원에 가고 싶어요.",
        romaja: "byeongwone gago sipeoyo",
        ja: "病院に行きたいです。",
      },
      {
        ko: "약국이 어디에 있어요?",
        romaja: "yakgugi eodie isseoyo",
        ja: "薬局はどこにありますか？",
      },
      {
        ko: "여권을 잃어버렸어요.",
        romaja: "yeogwoneul ireobeoryeosseoyo",
        ja: "パスポートをなくしました。",
        tip: "「여권(yeogwon)」はパスポートのことです。",
      },
      {
        ko: "경찰을 불러 주세요.",
        romaja: "gyeongchareul bulleo juseyo",
        ja: "警察を呼んでください。",
      },
      {
        ko: "일본 대사관에 연락하고 싶어요.",
        romaja: "ilbon daesagwane yeollakhago sipeoyo",
        ja: "日本大使館に連絡したいです。",
      },
    ],
  },
];
