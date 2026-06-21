import type { Verb } from "./types";

// 생활 회화 필수 동사 (JLPT N5) — 사전형 / ます형 / て형 / ない형 포함
export const VERBS: Verb[] = [
  {
    id: "v1", dict: "食べる", reading: "たべる", romaji: "taberu", meaning: "먹다",
    group: 2, masu: "食べます", te: "食べて", nai: "食べない",
    example: { tokens: [{ t: "朝", r: "あさ" }, { t: "ご" }, { t: "飯", r: "はん" }, { t: "を" }, { t: "食", r: "た" }, { t: "べます。" }], ko: "아침밥을 먹습니다." },
  },
  {
    id: "v2", dict: "飲む", reading: "のむ", romaji: "nomu", meaning: "마시다",
    group: 1, masu: "飲みます", te: "飲んで", nai: "飲まない",
    example: { tokens: [{ t: "水", r: "みず" }, { t: "を" }, { t: "飲", r: "の" }, { t: "みます。" }], ko: "물을 마십니다." },
  },
  {
    id: "v3", dict: "行く", reading: "いく", romaji: "iku", meaning: "가다",
    group: 1, masu: "行きます", te: "行って", nai: "行かない",
    example: { tokens: [{ t: "学校", r: "がっこう" }, { t: "へ" }, { t: "行", r: "い" }, { t: "きます。" }], ko: "학교에 갑니다." },
  },
  {
    id: "v4", dict: "来る", reading: "くる", romaji: "kuru", meaning: "오다",
    group: 3, masu: "来ます", te: "来て", nai: "来ない",
    example: { tokens: [{ t: "友達", r: "ともだち" }, { t: "が" }, { t: "来", r: "き" }, { t: "ます。" }], ko: "친구가 옵니다." },
  },
  {
    id: "v5", dict: "する", reading: "する", romaji: "suru", meaning: "하다",
    group: 3, masu: "します", te: "して", nai: "しない",
    example: { tokens: [{ t: "宿題", r: "しゅくだい" }, { t: "を" }, { t: "します。" }], ko: "숙제를 합니다." },
  },
  {
    id: "v6", dict: "見る", reading: "みる", romaji: "miru", meaning: "보다",
    group: 2, masu: "見ます", te: "見て", nai: "見ない",
    example: { tokens: [{ t: "映画", r: "えいが" }, { t: "を" }, { t: "見", r: "み" }, { t: "ます。" }], ko: "영화를 봅니다." },
  },
  {
    id: "v7", dict: "聞く", reading: "きく", romaji: "kiku", meaning: "듣다 / 묻다",
    group: 1, masu: "聞きます", te: "聞いて", nai: "聞かない",
    example: { tokens: [{ t: "音楽", r: "おんがく" }, { t: "を" }, { t: "聞", r: "き" }, { t: "きます。" }], ko: "음악을 듣습니다." },
  },
  {
    id: "v8", dict: "話す", reading: "はなす", romaji: "hanasu", meaning: "말하다",
    group: 1, masu: "話します", te: "話して", nai: "話さない",
    example: { tokens: [{ t: "日本語", r: "にほんご" }, { t: "で" }, { t: "話", r: "はな" }, { t: "します。" }], ko: "일본어로 말합니다." },
  },
  {
    id: "v9", dict: "読む", reading: "よむ", romaji: "yomu", meaning: "읽다",
    group: 1, masu: "読みます", te: "読んで", nai: "読まない",
    example: { tokens: [{ t: "本", r: "ほん" }, { t: "を" }, { t: "読", r: "よ" }, { t: "みます。" }], ko: "책을 읽습니다." },
  },
  {
    id: "v10", dict: "書く", reading: "かく", romaji: "kaku", meaning: "쓰다",
    group: 1, masu: "書きます", te: "書いて", nai: "書かない",
    example: { tokens: [{ t: "手紙", r: "てがみ" }, { t: "を" }, { t: "書", r: "か" }, { t: "きます。" }], ko: "편지를 씁니다." },
  },
  {
    id: "v11", dict: "買う", reading: "かう", romaji: "kau", meaning: "사다",
    group: 1, masu: "買います", te: "買って", nai: "買わない",
    example: { tokens: [{ t: "パンを" }, { t: "買", r: "か" }, { t: "います。" }], ko: "빵을 삽니다." },
  },
  {
    id: "v12", dict: "会う", reading: "あう", romaji: "au", meaning: "만나다",
    group: 1, masu: "会います", te: "会って", nai: "会わない",
    example: { tokens: [{ t: "駅", r: "えき" }, { t: "で" }, { t: "会", r: "あ" }, { t: "います。" }], ko: "역에서 만납니다." },
  },
  {
    id: "v13", dict: "帰る", reading: "かえる", romaji: "kaeru", meaning: "돌아가(오)다",
    group: 1, masu: "帰ります", te: "帰って", nai: "帰らない",
    example: { tokens: [{ t: "家", r: "いえ" }, { t: "に" }, { t: "帰", r: "かえ" }, { t: "ります。" }], ko: "집에 돌아갑니다." },
  },
  {
    id: "v14", dict: "起きる", reading: "おきる", romaji: "okiru", meaning: "일어나다",
    group: 2, masu: "起きます", te: "起きて", nai: "起きない",
    example: { tokens: [{ t: "七時", r: "しちじ" }, { t: "に" }, { t: "起", r: "お" }, { t: "きます。" }], ko: "7시에 일어납니다." },
  },
  {
    id: "v15", dict: "寝る", reading: "ねる", romaji: "neru", meaning: "자다",
    group: 2, masu: "寝ます", te: "寝て", nai: "寝ない",
    example: { tokens: [{ t: "早", r: "はや" }, { t: "く" }, { t: "寝", r: "ね" }, { t: "ます。" }], ko: "일찍 잡니다." },
  },
  {
    id: "v16", dict: "働く", reading: "はたらく", romaji: "hataraku", meaning: "일하다",
    group: 1, masu: "働きます", te: "働いて", nai: "働かない",
    example: { tokens: [{ t: "東京", r: "とうきょう" }, { t: "で" }, { t: "働", r: "はたら" }, { t: "きます。" }], ko: "도쿄에서 일합니다." },
  },
  {
    id: "v17", dict: "休む", reading: "やすむ", romaji: "yasumu", meaning: "쉬다",
    group: 1, masu: "休みます", te: "休んで", nai: "休まない",
    example: { tokens: [{ t: "今日", r: "きょう" }, { t: "は" }, { t: "休", r: "やす" }, { t: "みます。" }], ko: "오늘은 쉽니다." },
  },
  {
    id: "v18", dict: "待つ", reading: "まつ", romaji: "matsu", meaning: "기다리다",
    group: 1, masu: "待ちます", te: "待って", nai: "待たない",
    example: { tokens: [{ t: "ここで" }, { t: "待", r: "ま" }, { t: "ちます。" }], ko: "여기서 기다립니다." },
  },
  {
    id: "v19", dict: "分かる", reading: "わかる", romaji: "wakaru", meaning: "알다, 이해하다",
    group: 1, masu: "分かります", te: "分かって", nai: "分からない",
    example: { tokens: [{ t: "意味", r: "いみ" }, { t: "が" }, { t: "分", r: "わ" }, { t: "かりますか。" }], ko: "뜻을 알겠어요?" },
  },
  {
    id: "v20", dict: "使う", reading: "つかう", romaji: "tsukau", meaning: "쓰다, 사용하다",
    group: 1, masu: "使います", te: "使って", nai: "使わない",
    example: { tokens: [{ t: "箸", r: "はし" }, { t: "を" }, { t: "使", r: "つか" }, { t: "います。" }], ko: "젓가락을 씁니다." },
  },
  {
    id: "v21", dict: "作る", reading: "つくる", romaji: "tsukuru", meaning: "만들다",
    group: 1, masu: "作ります", te: "作って", nai: "作らない",
    example: { tokens: [{ t: "料理", r: "りょうり" }, { t: "を" }, { t: "作", r: "つく" }, { t: "ります。" }], ko: "요리를 만듭니다." },
  },
  {
    id: "v22", dict: "入る", reading: "はいる", romaji: "hairu", meaning: "들어가다",
    group: 1, masu: "入ります", te: "入って", nai: "入らない",
    example: { tokens: [{ t: "部屋", r: "へや" }, { t: "に" }, { t: "入", r: "はい" }, { t: "ります。" }], ko: "방에 들어갑니다." },
  },
  {
    id: "v23", dict: "出る", reading: "でる", romaji: "deru", meaning: "나가(오)다",
    group: 2, masu: "出ます", te: "出て", nai: "出ない",
    example: { tokens: [{ t: "家", r: "いえ" }, { t: "を" }, { t: "出", r: "で" }, { t: "ます。" }], ko: "집을 나섭니다." },
  },
  {
    id: "v24", dict: "買い物する", reading: "かいものする", romaji: "kaimono suru", meaning: "쇼핑하다",
    group: 3, masu: "買い物します", te: "買い物して", nai: "買い物しない",
    example: { tokens: [{ t: "デパートで" }, { t: "買", r: "か" }, { t: "い" }, { t: "物", r: "もの" }, { t: "します。" }], ko: "백화점에서 쇼핑합니다." },
  },
  {
    id: "v25", dict: "教える", reading: "おしえる", romaji: "oshieru", meaning: "가르치다, 알려주다",
    group: 2, masu: "教えます", te: "教えて", nai: "教えない",
    example: { tokens: [{ t: "道", r: "みち" }, { t: "を" }, { t: "教", r: "おし" }, { t: "えてください。" }], ko: "길을 알려 주세요." },
  },
  {
    id: "v26", dict: "持つ", reading: "もつ", romaji: "motsu", meaning: "들다, 가지다",
    group: 1, masu: "持ちます", te: "持って", nai: "持たない",
    example: { tokens: [{ t: "傘", r: "かさ" }, { t: "を" }, { t: "持", r: "も" }, { t: "ちます。" }], ko: "우산을 듭니다." },
  },
  {
    id: "v27", dict: "立つ", reading: "たつ", romaji: "tatsu", meaning: "서다",
    group: 1, masu: "立ちます", te: "立って", nai: "立たない",
    example: { tokens: [{ t: "ここに" }, { t: "立", r: "た" }, { t: "ってください。" }], ko: "여기에 서 주세요." },
  },
  {
    id: "v28", dict: "座る", reading: "すわる", romaji: "suwaru", meaning: "앉다",
    group: 1, masu: "座ります", te: "座って", nai: "座らない",
    example: { tokens: [{ t: "椅子", r: "いす" }, { t: "に" }, { t: "座", r: "すわ" }, { t: "ります。" }], ko: "의자에 앉습니다." },
  },
  {
    id: "v29", dict: "歩く", reading: "あるく", romaji: "aruku", meaning: "걷다",
    group: 1, masu: "歩きます", te: "歩いて", nai: "歩かない",
    example: { tokens: [{ t: "駅", r: "えき" }, { t: "まで" }, { t: "歩", r: "ある" }, { t: "きます。" }], ko: "역까지 걷습니다." },
  },
  {
    id: "v30", dict: "あげる", reading: "あげる", romaji: "ageru", meaning: "주다",
    group: 2, masu: "あげます", te: "あげて", nai: "あげない",
    example: { tokens: [{ t: "プレゼントをあげます。" }], ko: "선물을 줍니다." },
  },
  {
    id: "v31", dict: "もらう", reading: "もらう", romaji: "morau", meaning: "받다",
    group: 1, masu: "もらいます", te: "もらって", nai: "もらわない",
    example: { tokens: [{ t: "手紙", r: "てがみ" }, { t: "をもらいました。" }], ko: "편지를 받았습니다." },
  },
  {
    id: "v32", dict: "なる", reading: "なる", romaji: "naru", meaning: "되다",
    group: 1, masu: "なります", te: "なって", nai: "ならない",
    example: { tokens: [{ t: "医者", r: "いしゃ" }, { t: "になります。" }], ko: "의사가 됩니다." },
  },
];
