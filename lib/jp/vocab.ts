import type { Word, Category } from "./types";
import { EXTRAS } from "./extras";
import { EXTRA_VOCAB } from "./vocab-extra";
import { VOCAB_B1 } from "./vocab-b1";
import { VOCAB_B2 } from "./vocab-b2";
import { VOCAB_B3 } from "./vocab-b3";
import { VOCAB_B4 } from "./vocab-b4";
import { VOCAB_B5 } from "./vocab-b5";

export const VOCAB_CATEGORIES: Category[] = [
  { key: "greeting", label: "인사·표현", labelJa: "あいさつ・表現", emoji: "👋" },
  { key: "people", label: "사람·가족", labelJa: "人・家族", emoji: "👨‍👩‍👧" },
  { key: "number", label: "숫자·수량", labelJa: "数・数量", emoji: "🔢" },
  { key: "time", label: "시간·날짜", labelJa: "時間・日付", emoji: "🕒" },
  { key: "food", label: "음식·식사", labelJa: "食べ物・食事", emoji: "🍙" },
  { key: "place", label: "장소·교통", labelJa: "場所・交通", emoji: "🚉" },
  { key: "adjective", label: "형용사", labelJa: "形容詞", emoji: "✨" },
  { key: "daily", label: "생활·사물", labelJa: "生活・物", emoji: "🏠" },
  { key: "nature", label: "자연·날씨", labelJa: "自然・天気", emoji: "🌿" },
  { key: "body", label: "신체·건강", labelJa: "体・健康", emoji: "🩺" },
  { key: "hobby", label: "취미·활동", labelJa: "趣味・活動", emoji: "🎵" },
  { key: "color", label: "색·모양", labelJa: "色・形", emoji: "🎨" },
  { key: "adverb", label: "부사·기타", labelJa: "副詞・その他", emoji: "💬" },
];

const RAW_VOCAB: Word[] = [
  // ── 인사·표현 ────────────────────────────────
  {
    id: "g1", word: "おはようございます", reading: "おはようございます", romaji: "ohayou gozaimasu",
    meaning: "안녕하세요 (아침 인사)", pos: "인사", category: "greeting",
    example: { tokens: [{ t: "先生", r: "せんせい" }, { t: "、おはようございます。" }], ko: "선생님, 안녕하세요." },
  },
  {
    id: "g2", word: "こんにちは", reading: "こんにちは", romaji: "konnichiwa",
    meaning: "안녕하세요 (낮 인사)", pos: "인사", category: "greeting",
    example: { tokens: [{ t: "みなさん、こんにちは。" }], ko: "여러분, 안녕하세요." },
  },
  {
    id: "g3", word: "こんばんは", reading: "こんばんは", romaji: "konbanwa",
    meaning: "안녕하세요 (저녁 인사)", pos: "인사", category: "greeting",
    example: { tokens: [{ t: "こんばんは、お" }, { t: "元気", r: "げんき" }, { t: "ですか。" }], ko: "안녕하세요, 잘 지내세요?" },
  },
  {
    id: "g4", word: "ありがとう", reading: "ありがとう", romaji: "arigatou",
    meaning: "고마워요", pos: "인사", category: "greeting",
    example: { tokens: [{ t: "本当", r: "ほんとう" }, { t: "にありがとう。" }], ko: "정말 고마워요." },
  },
  {
    id: "g5", word: "すみません", reading: "すみません", romaji: "sumimasen",
    meaning: "죄송합니다 / 실례합니다", pos: "인사", category: "greeting",
    example: { tokens: [{ t: "すみません、" }, { t: "駅", r: "えき" }, { t: "はどこですか。" }], ko: "실례합니다, 역은 어디예요?" },
  },
  {
    id: "g6", word: "ごめんなさい", reading: "ごめんなさい", romaji: "gomennasai",
    meaning: "미안해요", pos: "인사", category: "greeting",
    example: { tokens: [{ t: "遅", r: "おく" }, { t: "れてごめんなさい。" }], ko: "늦어서 미안해요." },
  },
  {
    id: "g7", word: "はじめまして", reading: "はじめまして", romaji: "hajimemashite",
    meaning: "처음 뵙겠습니다", pos: "인사", category: "greeting",
    example: { tokens: [{ t: "はじめまして、" }, { t: "田中", r: "たなか" }, { t: "です。" }], ko: "처음 뵙겠습니다, 다나카입니다." },
  },
  {
    id: "g8", word: "さようなら", reading: "さようなら", romaji: "sayounara",
    meaning: "안녕히 가세요 (작별)", pos: "인사", category: "greeting",
    example: { tokens: [{ t: "では、さようなら。" }], ko: "그럼, 안녕히 가세요." },
  },
  {
    id: "g9", word: "いただきます", reading: "いただきます", romaji: "itadakimasu",
    meaning: "잘 먹겠습니다", pos: "인사", category: "greeting",
    example: { tokens: [{ t: "それでは、いただきます。" }], ko: "그럼, 잘 먹겠습니다." },
  },
  {
    id: "g10", word: "おやすみなさい", reading: "おやすみなさい", romaji: "oyasuminasai",
    meaning: "안녕히 주무세요", pos: "인사", category: "greeting",
    example: { tokens: [{ t: "では、おやすみなさい。" }], ko: "그럼, 안녕히 주무세요." },
  },

  // ── 사람·가족 ────────────────────────────────
  {
    id: "p1", word: "私", reading: "わたし", romaji: "watashi",
    meaning: "나, 저", pos: "대명사", category: "people",
    example: { tokens: [{ t: "私", r: "わたし" }, { t: "は" }, { t: "学生", r: "がくせい" }, { t: "です。" }], ko: "저는 학생입니다." },
  },
  {
    id: "p2", word: "友達", reading: "ともだち", romaji: "tomodachi",
    meaning: "친구", pos: "명사", category: "people",
    example: { tokens: [{ t: "友達", r: "ともだち" }, { t: "と" }, { t: "話", r: "はな" }, { t: "します。" }], ko: "친구와 이야기합니다." },
  },
  {
    id: "p3", word: "家族", reading: "かぞく", romaji: "kazoku",
    meaning: "가족", pos: "명사", category: "people",
    example: { tokens: [{ t: "家族", r: "かぞく" }, { t: "は" }, { t: "四人", r: "よにん" }, { t: "です。" }], ko: "가족은 네 명입니다." },
  },
  {
    id: "p4", word: "父", reading: "ちち", romaji: "chichi",
    meaning: "아버지 (내)", pos: "명사", category: "people",
    example: { tokens: [{ t: "父", r: "ちち" }, { t: "は" }, { t: "会社員", r: "かいしゃいん" }, { t: "です。" }], ko: "아버지는 회사원입니다." },
  },
  {
    id: "p5", word: "母", reading: "はは", romaji: "haha",
    meaning: "어머니 (내)", pos: "명사", category: "people",
    example: { tokens: [{ t: "母", r: "はは" }, { t: "は" }, { t: "料理", r: "りょうり" }, { t: "が" }, { t: "上手", r: "じょうず" }, { t: "です。" }], ko: "어머니는 요리를 잘하십니다." },
  },
  {
    id: "p6", word: "先生", reading: "せんせい", romaji: "sensei",
    meaning: "선생님", pos: "명사", category: "people",
    example: { tokens: [{ t: "先生", r: "せんせい" }, { t: "に" }, { t: "質問", r: "しつもん" }, { t: "します。" }], ko: "선생님께 질문합니다." },
  },
  {
    id: "p7", word: "学生", reading: "がくせい", romaji: "gakusei",
    meaning: "학생", pos: "명사", category: "people",
    example: { tokens: [{ t: "私", r: "わたし" }, { t: "は" }, { t: "大学", r: "だいがく" }, { t: "の" }, { t: "学生", r: "がくせい" }, { t: "です。" }], ko: "저는 대학생입니다." },
  },
  {
    id: "p8", word: "子供", reading: "こども", romaji: "kodomo",
    meaning: "아이, 어린이", pos: "명사", category: "people",
    example: { tokens: [{ t: "子供", r: "こども" }, { t: "が" }, { t: "二人", r: "ふたり" }, { t: "います。" }], ko: "아이가 두 명 있습니다." },
  },

  // ── 숫자·수량 ────────────────────────────────
  {
    id: "n1", word: "一", reading: "いち", romaji: "ichi",
    meaning: "하나, 1", pos: "수사", category: "number",
    example: { tokens: [{ t: "りんごを" }, { t: "一", r: "ひと" }, { t: "つください。" }], ko: "사과를 하나 주세요." },
  },
  {
    id: "n2", word: "二", reading: "に", romaji: "ni",
    meaning: "둘, 2", pos: "수사", category: "number",
    example: { tokens: [{ t: "コーヒーを" }, { t: "二", r: "ふた" }, { t: "つください。" }], ko: "커피를 둘 주세요." },
  },
  {
    id: "n3", word: "三", reading: "さん", romaji: "san",
    meaning: "셋, 3", pos: "수사", category: "number",
    example: { tokens: [{ t: "三", r: "さん" }, { t: "時", r: "じ" }, { t: "に" }, { t: "会", r: "あ" }, { t: "いましょう。" }], ko: "3시에 만납시다." },
  },
  {
    id: "n4", word: "百", reading: "ひゃく", romaji: "hyaku",
    meaning: "백, 100", pos: "수사", category: "number",
    example: { tokens: [{ t: "これは" }, { t: "百", r: "ひゃく" }, { t: "円", r: "えん" }, { t: "です。" }], ko: "이것은 100엔입니다." },
  },
  {
    id: "n5", word: "千", reading: "せん", romaji: "sen",
    meaning: "천, 1000", pos: "수사", category: "number",
    example: { tokens: [{ t: "千", r: "せん" }, { t: "円", r: "えん" }, { t: "を" }, { t: "払", r: "はら" }, { t: "います。" }], ko: "천 엔을 냅니다." },
  },
  {
    id: "n6", word: "いくつ", reading: "いくつ", romaji: "ikutsu",
    meaning: "몇 개, 몇 살", pos: "의문사", category: "number",
    example: { tokens: [{ t: "りんごは" }, { t: "いくつありますか。" }], ko: "사과는 몇 개 있습니까?" },
  },
  {
    id: "n7", word: "いくら", reading: "いくら", romaji: "ikura",
    meaning: "얼마", pos: "의문사", category: "number",
    example: { tokens: [{ t: "これは" }, { t: "いくらですか。" }], ko: "이것은 얼마예요?" },
  },
  {
    id: "n8", word: "半分", reading: "はんぶん", romaji: "hanbun",
    meaning: "절반", pos: "명사", category: "number",
    example: { tokens: [{ t: "ケーキを" }, { t: "半分", r: "はんぶん" }, { t: "ください。" }], ko: "케이크를 반 주세요." },
  },

  // ── 시간·날짜 ────────────────────────────────
  {
    id: "t1", word: "今", reading: "いま", romaji: "ima",
    meaning: "지금", pos: "명사", category: "time",
    example: { tokens: [{ t: "今", r: "いま" }, { t: "何時", r: "なんじ" }, { t: "ですか。" }], ko: "지금 몇 시예요?" },
  },
  {
    id: "t2", word: "今日", reading: "きょう", romaji: "kyou",
    meaning: "오늘", pos: "명사", category: "time",
    example: { tokens: [{ t: "今日", r: "きょう" }, { t: "は" }, { t: "暑", r: "あつ" }, { t: "いです。" }], ko: "오늘은 덥습니다." },
  },
  {
    id: "t3", word: "明日", reading: "あした", romaji: "ashita",
    meaning: "내일", pos: "명사", category: "time",
    example: { tokens: [{ t: "明日", r: "あした" }, { t: "は" }, { t: "休", r: "やす" }, { t: "みです。" }], ko: "내일은 쉬는 날입니다." },
  },
  {
    id: "t4", word: "昨日", reading: "きのう", romaji: "kinou",
    meaning: "어제", pos: "명사", category: "time",
    example: { tokens: [{ t: "昨日", r: "きのう" }, { t: "は" }, { t: "雨", r: "あめ" }, { t: "でした。" }], ko: "어제는 비가 왔습니다." },
  },
  {
    id: "t5", word: "朝", reading: "あさ", romaji: "asa",
    meaning: "아침", pos: "명사", category: "time",
    example: { tokens: [{ t: "毎朝", r: "まいあさ" }, { t: "コーヒーを" }, { t: "飲", r: "の" }, { t: "みます。" }], ko: "매일 아침 커피를 마십니다." },
  },
  {
    id: "t6", word: "夜", reading: "よる", romaji: "yoru",
    meaning: "밤", pos: "명사", category: "time",
    example: { tokens: [{ t: "夜", r: "よる" }, { t: "は" }, { t: "本", r: "ほん" }, { t: "を" }, { t: "読", r: "よ" }, { t: "みます。" }], ko: "밤에는 책을 읽습니다." },
  },
  {
    id: "t7", word: "時間", reading: "じかん", romaji: "jikan",
    meaning: "시간", pos: "명사", category: "time",
    example: { tokens: [{ t: "時間", r: "じかん" }, { t: "が" }, { t: "ありません。" }], ko: "시간이 없습니다." },
  },
  {
    id: "t8", word: "週末", reading: "しゅうまつ", romaji: "shuumatsu",
    meaning: "주말", pos: "명사", category: "time",
    example: { tokens: [{ t: "週末", r: "しゅうまつ" }, { t: "に" }, { t: "映画", r: "えいが" }, { t: "を" }, { t: "見", r: "み" }, { t: "ます。" }], ko: "주말에 영화를 봅니다." },
  },

  // ── 음식·식사 ────────────────────────────────
  {
    id: "f1", word: "ご飯", reading: "ごはん", romaji: "gohan",
    meaning: "밥, 식사", pos: "명사", category: "food",
    example: { tokens: [{ t: "もう" }, { t: "ご飯", r: "ごはん" }, { t: "を" }, { t: "食", r: "た" }, { t: "べましたか。" }], ko: "벌써 밥을 먹었어요?" },
  },
  {
    id: "f2", word: "水", reading: "みず", romaji: "mizu",
    meaning: "물", pos: "명사", category: "food",
    example: { tokens: [{ t: "水", r: "みず" }, { t: "を" }, { t: "一杯", r: "いっぱい" }, { t: "ください。" }], ko: "물 한 잔 주세요." },
  },
  {
    id: "f3", word: "お茶", reading: "おちゃ", romaji: "ocha",
    meaning: "차 (마시는)", pos: "명사", category: "food",
    example: { tokens: [{ t: "お茶", r: "おちゃ" }, { t: "でもいかがですか。" }], ko: "차라도 어떠세요?" },
  },
  {
    id: "f4", word: "肉", reading: "にく", romaji: "niku",
    meaning: "고기", pos: "명사", category: "food",
    example: { tokens: [{ t: "私", r: "わたし" }, { t: "は" }, { t: "肉", r: "にく" }, { t: "が" }, { t: "好", r: "す" }, { t: "きです。" }], ko: "저는 고기를 좋아합니다." },
  },
  {
    id: "f5", word: "魚", reading: "さかな", romaji: "sakana",
    meaning: "생선, 물고기", pos: "명사", category: "food",
    example: { tokens: [{ t: "今日", r: "きょう" }, { t: "の" }, { t: "夕飯", r: "ゆうはん" }, { t: "は" }, { t: "魚", r: "さかな" }, { t: "です。" }], ko: "오늘 저녁은 생선입니다." },
  },
  {
    id: "f6", word: "野菜", reading: "やさい", romaji: "yasai",
    meaning: "채소", pos: "명사", category: "food",
    example: { tokens: [{ t: "野菜", r: "やさい" }, { t: "を" }, { t: "たくさん" }, { t: "食", r: "た" }, { t: "べます。" }], ko: "채소를 많이 먹습니다." },
  },
  {
    id: "f7", word: "おいしい", reading: "おいしい", romaji: "oishii",
    meaning: "맛있다", pos: "い형용사", category: "food",
    example: { tokens: [{ t: "この" }, { t: "店", r: "みせ" }, { t: "の" }, { t: "ラーメンはおいしいです。" }], ko: "이 가게의 라멘은 맛있습니다." },
  },
  {
    id: "f8", word: "お腹がすいた", reading: "おなかがすいた", romaji: "onaka ga suita",
    meaning: "배고프다", pos: "표현", category: "food",
    example: { tokens: [{ t: "ああ、お" }, { t: "腹", r: "なか" }, { t: "がすいた。" }], ko: "아, 배고프다." },
  },

  // ── 장소·교통 ────────────────────────────────
  {
    id: "pl1", word: "家", reading: "いえ", romaji: "ie",
    meaning: "집", pos: "명사", category: "place",
    example: { tokens: [{ t: "家", r: "いえ" }, { t: "に" }, { t: "帰", r: "かえ" }, { t: "ります。" }], ko: "집에 돌아갑니다." },
  },
  {
    id: "pl2", word: "学校", reading: "がっこう", romaji: "gakkou",
    meaning: "학교", pos: "명사", category: "place",
    example: { tokens: [{ t: "学校", r: "がっこう" }, { t: "まで" }, { t: "歩", r: "ある" }, { t: "きます。" }], ko: "학교까지 걸어갑니다." },
  },
  {
    id: "pl3", word: "駅", reading: "えき", romaji: "eki",
    meaning: "역", pos: "명사", category: "place",
    example: { tokens: [{ t: "駅", r: "えき" }, { t: "の" }, { t: "前", r: "まえ" }, { t: "で" }, { t: "会", r: "あ" }, { t: "いましょう。" }], ko: "역 앞에서 만납시다." },
  },
  {
    id: "pl4", word: "店", reading: "みせ", romaji: "mise",
    meaning: "가게", pos: "명사", category: "place",
    example: { tokens: [{ t: "あの" }, { t: "店", r: "みせ" }, { t: "は" }, { t: "新", r: "あたら" }, { t: "しいです。" }], ko: "저 가게는 새 가게입니다." },
  },
  {
    id: "pl5", word: "電車", reading: "でんしゃ", romaji: "densha",
    meaning: "전철", pos: "명사", category: "place",
    example: { tokens: [{ t: "電車", r: "でんしゃ" }, { t: "で" }, { t: "行", r: "い" }, { t: "きます。" }], ko: "전철로 갑니다." },
  },
  {
    id: "pl6", word: "病院", reading: "びょういん", romaji: "byouin",
    meaning: "병원", pos: "명사", category: "place",
    example: { tokens: [{ t: "病院", r: "びょういん" }, { t: "はどこですか。" }], ko: "병원은 어디예요?" },
  },
  {
    id: "pl7", word: "トイレ", reading: "トイレ", romaji: "toire",
    meaning: "화장실", pos: "명사", category: "place",
    example: { tokens: [{ t: "トイレを" }, { t: "借", r: "か" }, { t: "りてもいいですか。" }], ko: "화장실을 써도 될까요?" },
  },
  {
    id: "pl8", word: "右", reading: "みぎ", romaji: "migi",
    meaning: "오른쪽", pos: "명사", category: "place",
    example: { tokens: [{ t: "次", r: "つぎ" }, { t: "の" }, { t: "角", r: "かど" }, { t: "を" }, { t: "右", r: "みぎ" }, { t: "に。" }], ko: "다음 모퉁이를 오른쪽으로." },
  },

  // ── 형용사 ────────────────────────────────
  {
    id: "a1", word: "大きい", reading: "おおきい", romaji: "ookii",
    meaning: "크다", pos: "い형용사", category: "adjective",
    example: { tokens: [{ t: "大", r: "おお" }, { t: "きい" }, { t: "犬", r: "いぬ" }, { t: "ですね。" }], ko: "큰 개네요." },
  },
  {
    id: "a2", word: "小さい", reading: "ちいさい", romaji: "chiisai",
    meaning: "작다", pos: "い형용사", category: "adjective",
    example: { tokens: [{ t: "小", r: "ちい" }, { t: "さい" }, { t: "鞄", r: "かばん" }, { t: "が" }, { t: "ほしいです。" }], ko: "작은 가방을 원해요." },
  },
  {
    id: "a3", word: "新しい", reading: "あたらしい", romaji: "atarashii",
    meaning: "새롭다", pos: "い형용사", category: "adjective",
    example: { tokens: [{ t: "新", r: "あたら" }, { t: "しい" }, { t: "携帯", r: "けいたい" }, { t: "を" }, { t: "買", r: "か" }, { t: "いました。" }], ko: "새 휴대폰을 샀습니다." },
  },
  {
    id: "a4", word: "高い", reading: "たかい", romaji: "takai",
    meaning: "높다 / 비싸다", pos: "い형용사", category: "adjective",
    example: { tokens: [{ t: "この" }, { t: "鞄", r: "かばん" }, { t: "は" }, { t: "高", r: "たか" }, { t: "いです。" }], ko: "이 가방은 비쌉니다." },
  },
  {
    id: "a5", word: "安い", reading: "やすい", romaji: "yasui",
    meaning: "싸다", pos: "い형용사", category: "adjective",
    example: { tokens: [{ t: "この" }, { t: "店", r: "みせ" }, { t: "は" }, { t: "安", r: "やす" }, { t: "いです。" }], ko: "이 가게는 쌉니다." },
  },
  {
    id: "a6", word: "楽しい", reading: "たのしい", romaji: "tanoshii",
    meaning: "즐겁다", pos: "い형용사", category: "adjective",
    example: { tokens: [{ t: "旅行", r: "りょこう" }, { t: "は" }, { t: "楽", r: "たの" }, { t: "しかったです。" }], ko: "여행은 즐거웠습니다." },
  },
  {
    id: "a7", word: "難しい", reading: "むずかしい", romaji: "muzukashii",
    meaning: "어렵다", pos: "い형용사", category: "adjective",
    example: { tokens: [{ t: "日本語", r: "にほんご" }, { t: "は" }, { t: "難", r: "むずか" }, { t: "しいですか。" }], ko: "일본어는 어렵습니까?" },
  },
  {
    id: "a8", word: "元気", reading: "げんき", romaji: "genki",
    meaning: "건강함, 활기참", pos: "な형용사", category: "adjective",
    example: { tokens: [{ t: "お" }, { t: "元気", r: "げんき" }, { t: "ですか。" }], ko: "잘 지내세요?" },
  },
  {
    id: "a9", word: "好き", reading: "すき", romaji: "suki",
    meaning: "좋아함", pos: "な형용사", category: "adjective",
    example: { tokens: [{ t: "音楽", r: "おんがく" }, { t: "が" }, { t: "好", r: "す" }, { t: "きです。" }], ko: "음악을 좋아합니다." },
  },
  {
    id: "a10", word: "便利", reading: "べんり", romaji: "benri",
    meaning: "편리함", pos: "な형용사", category: "adjective",
    example: { tokens: [{ t: "この" }, { t: "アプリは" }, { t: "便利", r: "べんり" }, { t: "です。" }], ko: "이 앱은 편리합니다." },
  },

  // ── 생활·사물 ────────────────────────────────
  {
    id: "d1", word: "本", reading: "ほん", romaji: "hon",
    meaning: "책", pos: "명사", category: "daily",
    example: { tokens: [{ t: "図書館", r: "としょかん" }, { t: "で" }, { t: "本", r: "ほん" }, { t: "を" }, { t: "借", r: "か" }, { t: "ります。" }], ko: "도서관에서 책을 빌립니다." },
  },
  {
    id: "d2", word: "車", reading: "くるま", romaji: "kuruma",
    meaning: "자동차", pos: "명사", category: "daily",
    example: { tokens: [{ t: "車", r: "くるま" }, { t: "で" }, { t: "来", r: "き" }, { t: "ました。" }], ko: "차로 왔습니다." },
  },
  {
    id: "d3", word: "お金", reading: "おかね", romaji: "okane",
    meaning: "돈", pos: "명사", category: "daily",
    example: { tokens: [{ t: "お金", r: "おかね" }, { t: "が" }, { t: "ありません。" }], ko: "돈이 없습니다." },
  },
  {
    id: "d4", word: "携帯", reading: "けいたい", romaji: "keitai",
    meaning: "휴대폰", pos: "명사", category: "daily",
    example: { tokens: [{ t: "携帯", r: "けいたい" }, { t: "の" }, { t: "番号", r: "ばんごう" }, { t: "を" }, { t: "教", r: "おし" }, { t: "えてください。" }], ko: "휴대폰 번호를 알려 주세요." },
  },
  {
    id: "d5", word: "天気", reading: "てんき", romaji: "tenki",
    meaning: "날씨", pos: "명사", category: "daily",
    example: { tokens: [{ t: "今日", r: "きょう" }, { t: "は" }, { t: "いい" }, { t: "天気", r: "てんき" }, { t: "ですね。" }], ko: "오늘은 날씨가 좋네요." },
  },
  {
    id: "d6", word: "仕事", reading: "しごと", romaji: "shigoto",
    meaning: "일, 직업", pos: "명사", category: "daily",
    example: { tokens: [{ t: "仕事", r: "しごと" }, { t: "は" }, { t: "忙", r: "いそが" }, { t: "しいです。" }], ko: "일이 바쁩니다." },
  },
  {
    id: "d7", word: "名前", reading: "なまえ", romaji: "namae",
    meaning: "이름", pos: "명사", category: "daily",
    example: { tokens: [{ t: "お" }, { t: "名前", r: "なまえ" }, { t: "は" }, { t: "何", r: "なん" }, { t: "ですか。" }], ko: "이름이 어떻게 되세요?" },
  },
  {
    id: "d8", word: "犬", reading: "いぬ", romaji: "inu",
    meaning: "개", pos: "명사", category: "daily",
    example: { tokens: [{ t: "犬", r: "いぬ" }, { t: "と" }, { t: "散歩", r: "さんぽ" }, { t: "します。" }], ko: "개와 산책합니다." },
  },

  // ── 부사·기타 ────────────────────────────────
  {
    id: "av1", word: "とても", reading: "とても", romaji: "totemo",
    meaning: "매우, 아주", pos: "부사", category: "adverb",
    example: { tokens: [{ t: "とても" }, { t: "面白", r: "おもしろ" }, { t: "いです。" }], ko: "매우 재미있습니다." },
  },
  {
    id: "av2", word: "ちょっと", reading: "ちょっと", romaji: "chotto",
    meaning: "조금, 잠깐", pos: "부사", category: "adverb",
    example: { tokens: [{ t: "ちょっと" }, { t: "待", r: "ま" }, { t: "ってください。" }], ko: "잠깐 기다려 주세요." },
  },
  {
    id: "av3", word: "たくさん", reading: "たくさん", romaji: "takusan",
    meaning: "많이", pos: "부사", category: "adverb",
    example: { tokens: [{ t: "本", r: "ほん" }, { t: "を" }, { t: "たくさん" }, { t: "読", r: "よ" }, { t: "みます。" }], ko: "책을 많이 읽습니다." },
  },
  {
    id: "av4", word: "もう", reading: "もう", romaji: "mou",
    meaning: "벌써, 이미", pos: "부사", category: "adverb",
    example: { tokens: [{ t: "もう" }, { t: "終", r: "お" }, { t: "わりました。" }], ko: "벌써 끝났습니다." },
  },
  {
    id: "av5", word: "まだ", reading: "まだ", romaji: "mada",
    meaning: "아직", pos: "부사", category: "adverb",
    example: { tokens: [{ t: "まだ" }, { t: "食", r: "た" }, { t: "べていません。" }], ko: "아직 먹지 않았습니다." },
  },
  {
    id: "av6", word: "一緒に", reading: "いっしょに", romaji: "issho ni",
    meaning: "함께, 같이", pos: "부사", category: "adverb",
    example: { tokens: [{ t: "一緒", r: "いっしょ" }, { t: "に" }, { t: "行", r: "い" }, { t: "きませんか。" }], ko: "같이 가지 않을래요?" },
  },
  {
    id: "av7", word: "どうぞ", reading: "どうぞ", romaji: "douzo",
    meaning: "(권할 때) 자, 어서", pos: "감탄사", category: "adverb",
    example: { tokens: [{ t: "どうぞ、" }, { t: "座", r: "すわ" }, { t: "ってください。" }], ko: "자, 앉으세요." },
  },
  {
    id: "av8", word: "もちろん", reading: "もちろん", romaji: "mochiron",
    meaning: "물론", pos: "부사", category: "adverb",
    example: { tokens: [{ t: "もちろん、いいですよ。" }], ko: "물론, 좋아요." },
  },
];

/** 예문 토큰 중 표제어와 일치하는 부분을 자동으로 강조(hl) 처리한다. */
function highlightExample(w: Word): Word {
  const tokens = w.example.tokens.map((tok) =>
    !tok.hl && (tok.t.includes(w.word) || (tok.r && tok.r === w.reading))
      ? { ...tok, hl: true }
      : tok,
  );
  return { ...w, example: { ...w.example, tokens } };
}

// 표제어(word) 기준 중복 제거 — 먼저 등장한 항목을 유지한다.
function dedupeByWord(list: Word[]): Word[] {
  const seen = new Set<string>();
  return list.filter((w) => (seen.has(w.word) ? false : (seen.add(w.word), true)));
}

// 본 데이터 + 확장 배치(B1~B5)에 유사어·팁(extras)·레벨 기본값(N5)·예문 강조를 병합한다.
export const VOCAB: Word[] = dedupeByWord([
  ...RAW_VOCAB,
  ...EXTRA_VOCAB,
  ...VOCAB_B1,
  ...VOCAB_B2,
  ...VOCAB_B3,
  ...VOCAB_B4,
  ...VOCAB_B5,
]).map((w) => highlightExample({ level: "N5", ...w, ...EXTRAS[w.id] }));
