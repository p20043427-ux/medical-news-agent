export interface EnDialogueLine {
  speaker: "A" | "B"; // A = 상대방, B = 학습자(사용자)
  en: string; // 영어 대사
  ko: string; // 한국어 뜻
}

export interface EnConversation {
  id: string;
  title: string; // 한국어 제목
  situation: string; // 한국어 상황 설명 (한 줄)
  emoji: string;
  level: "A1" | "A2" | "B1";
  category:
    | "greeting"
    | "food"
    | "shopping"
    | "transport"
    | "service"
    | "travel"
    | "daily";
  lines: EnDialogueLine[];
}

export const EN_CONVERSATIONS: EnConversation[] = [
  {
    id: "ec1",
    title: "처음 만나 인사하기",
    situation: "여행 중 호스텔에서 처음 만난 사람과 자기소개를 나눕니다.",
    emoji: "👋",
    level: "A1",
    category: "greeting",
    lines: [
      {
        speaker: "A",
        en: "Hi! Are you staying here too?",
        ko: "안녕하세요! 여기 묵고 계세요?",
      },
      {
        speaker: "B",
        en: "Yes, I just checked in this morning.",
        ko: "네, 오늘 아침에 막 체크인했어요.",
      },
      {
        speaker: "A",
        en: "Nice to meet you. I'm Daniel. Where are you from?",
        ko: "만나서 반가워요. 저는 다니엘이에요. 어디서 오셨어요?",
      },
      {
        speaker: "B",
        en: "I'm from Korea. Nice to meet you too, Daniel.",
        ko: "저는 한국에서 왔어요. 저도 만나서 반가워요, 다니엘.",
      },
      {
        speaker: "A",
        en: "Cool! Is this your first time here?",
        ko: "멋지네요! 여기 처음 오신 거예요?",
      },
      {
        speaker: "B",
        en: "Yes, it is. I'm really excited to look around.",
        ko: "네, 맞아요. 둘러볼 생각에 정말 설레요.",
      },
    ],
  },
  {
    id: "ec2",
    title: "카페에서 커피 주문하기",
    situation: "카페에서 음료를 주문하고 사이즈와 포장 여부를 고릅니다.",
    emoji: "☕",
    level: "A1",
    category: "food",
    lines: [
      {
        speaker: "A",
        en: "Hi there! What can I get for you?",
        ko: "안녕하세요! 무엇을 드릴까요?",
      },
      {
        speaker: "B",
        en: "Can I have an iced americano, please?",
        ko: "아이스 아메리카노 한 잔 주시겠어요?",
      },
      {
        speaker: "A",
        en: "Sure. What size would you like?",
        ko: "네. 어떤 사이즈로 드릴까요?",
      },
      {
        speaker: "B",
        en: "A medium one, please. For takeaway.",
        ko: "미디엄으로 주세요. 테이크아웃이요.",
      },
      {
        speaker: "A",
        en: "Got it. That'll be four dollars fifty.",
        ko: "알겠습니다. 4달러 50센트입니다.",
      },
      {
        speaker: "B",
        en: "Here you go. Thank you!",
        ko: "여기 있어요. 감사합니다!",
      },
    ],
  },
  {
    id: "ec3",
    title: "식당에서 음식 주문하기",
    situation: "식당에서 메뉴를 추천받고 음식을 주문합니다.",
    emoji: "🍝",
    level: "A2",
    category: "food",
    lines: [
      {
        speaker: "A",
        en: "Good evening. Are you ready to order?",
        ko: "안녕하세요. 주문하시겠어요?",
      },
      {
        speaker: "B",
        en: "Almost. What would you recommend?",
        ko: "거의요. 뭘 추천하시나요?",
      },
      {
        speaker: "A",
        en: "Our seafood pasta is very popular today.",
        ko: "오늘은 해산물 파스타가 아주 인기예요.",
      },
      {
        speaker: "B",
        en: "That sounds great. I'll have that, please.",
        ko: "좋네요. 그걸로 할게요.",
      },
      {
        speaker: "A",
        en: "Would you like anything to drink?",
        ko: "마실 것도 드릴까요?",
      },
      {
        speaker: "B",
        en: "Just a glass of water, thank you.",
        ko: "물 한 잔만 주세요, 감사합니다.",
      },
    ],
  },
  {
    id: "ec4",
    title: "옷가게에서 쇼핑하기",
    situation: "옷가게에서 다른 사이즈를 요청하고 입어 봅니다.",
    emoji: "👕",
    level: "A2",
    category: "shopping",
    lines: [
      {
        speaker: "A",
        en: "Hello! Let me know if you need any help.",
        ko: "안녕하세요! 도움이 필요하면 말씀해 주세요.",
      },
      {
        speaker: "B",
        en: "Thanks. Do you have this shirt in a larger size?",
        ko: "감사합니다. 이 셔츠 더 큰 사이즈 있나요?",
      },
      {
        speaker: "A",
        en: "Let me check. Yes, we have a large in blue.",
        ko: "확인해 볼게요. 네, 파란색 라지가 있어요.",
      },
      {
        speaker: "B",
        en: "Great. Can I try it on, please?",
        ko: "좋아요. 입어 봐도 될까요?",
      },
      {
        speaker: "A",
        en: "Of course. The fitting room is over there.",
        ko: "물론이죠. 탈의실은 저쪽에 있어요.",
      },
      {
        speaker: "B",
        en: "Perfect, thank you so much.",
        ko: "완벽해요, 정말 감사합니다.",
      },
    ],
  },
  {
    id: "ec5",
    title: "계산대에서 결제하기",
    situation: "상점 계산대에서 결제하고 할인을 묻습니다.",
    emoji: "💳",
    level: "A2",
    category: "shopping",
    lines: [
      {
        speaker: "A",
        en: "Hi, did you find everything okay?",
        ko: "안녕하세요, 필요한 건 다 찾으셨어요?",
      },
      {
        speaker: "B",
        en: "Yes, thanks. Is this item on sale?",
        ko: "네, 감사합니다. 이 상품 할인 중인가요?",
      },
      {
        speaker: "A",
        en: "It is. You get twenty percent off today.",
        ko: "네, 맞아요. 오늘은 20퍼센트 할인돼요.",
      },
      {
        speaker: "B",
        en: "Nice! Can I pay by card?",
        ko: "좋네요! 카드로 결제할 수 있나요?",
      },
      {
        speaker: "A",
        en: "Sure. Please tap your card here.",
        ko: "네. 여기에 카드를 대 주세요.",
      },
      {
        speaker: "B",
        en: "Done. Could I get a receipt, please?",
        ko: "됐어요. 영수증 받을 수 있을까요?",
      },
    ],
  },
  {
    id: "ec6",
    title: "택시 타기",
    situation: "택시를 타고 목적지를 말하며 요금을 확인합니다.",
    emoji: "🚕",
    level: "A2",
    category: "transport",
    lines: [
      {
        speaker: "A",
        en: "Hello! Where would you like to go?",
        ko: "안녕하세요! 어디로 모실까요?",
      },
      {
        speaker: "B",
        en: "Could you take me to the Central Station, please?",
        ko: "센트럴 역으로 가 주시겠어요?",
      },
      {
        speaker: "A",
        en: "No problem. It's about fifteen minutes from here.",
        ko: "문제없어요. 여기서 15분쯤 걸려요.",
      },
      {
        speaker: "B",
        en: "Okay. About how much will it cost?",
        ko: "알겠어요. 요금은 대략 얼마 정도 나올까요?",
      },
      {
        speaker: "A",
        en: "Around twelve dollars, depending on traffic.",
        ko: "교통 상황에 따라 12달러 정도예요.",
      },
      {
        speaker: "B",
        en: "That's fine. Thank you very much.",
        ko: "괜찮아요. 정말 감사합니다.",
      },
    ],
  },
  {
    id: "ec7",
    title: "길 물어보기",
    situation: "길에서 지하철역으로 가는 길을 물어봅니다.",
    emoji: "🗺️",
    level: "B1",
    category: "transport",
    lines: [
      {
        speaker: "A",
        en: "You look a bit lost. Do you need some help?",
        ko: "조금 헤매시는 것 같네요. 도움이 필요하세요?",
      },
      {
        speaker: "B",
        en: "Yes, please. How can I get to the subway station?",
        ko: "네, 부탁드려요. 지하철역에 어떻게 가나요?",
      },
      {
        speaker: "A",
        en: "Go straight and turn left at the second corner.",
        ko: "직진하다가 두 번째 모퉁이에서 왼쪽으로 도세요.",
      },
      {
        speaker: "B",
        en: "Got it. Is it far from here?",
        ko: "알겠어요. 여기서 먼가요?",
      },
      {
        speaker: "A",
        en: "Not at all. It's only a five-minute walk.",
        ko: "전혀요. 걸어서 5분밖에 안 걸려요.",
      },
      {
        speaker: "B",
        en: "Thank you so much for your help!",
        ko: "도와주셔서 정말 감사합니다!",
      },
    ],
  },
  {
    id: "ec8",
    title: "지하철 표 구매하기",
    situation: "지하철 매표소에서 표를 사고 환승 방법을 묻습니다.",
    emoji: "🚇",
    level: "B1",
    category: "transport",
    lines: [
      {
        speaker: "A",
        en: "Hi, how can I help you today?",
        ko: "안녕하세요, 무엇을 도와드릴까요?",
      },
      {
        speaker: "B",
        en: "I'd like a one-day pass, please.",
        ko: "1일권 한 장 주세요.",
      },
      {
        speaker: "A",
        en: "Sure. That comes to eight dollars.",
        ko: "네. 8달러입니다.",
      },
      {
        speaker: "B",
        en: "Here you are. Do I need to transfer for the museum?",
        ko: "여기요. 박물관에 가려면 환승해야 하나요?",
      },
      {
        speaker: "A",
        en: "Yes, change to the green line at City Hall.",
        ko: "네, 시청역에서 초록색 노선으로 갈아타세요.",
      },
      {
        speaker: "B",
        en: "Okay, that's clear. Thank you!",
        ko: "네, 잘 알겠어요. 감사합니다!",
      },
    ],
  },
  {
    id: "ec9",
    title: "호텔 체크인하기",
    situation: "호텔 프런트에서 예약을 확인하고 체크인합니다.",
    emoji: "🏨",
    level: "B1",
    category: "service",
    lines: [
      {
        speaker: "A",
        en: "Good afternoon. Do you have a reservation?",
        ko: "안녕하세요. 예약하셨나요?",
      },
      {
        speaker: "B",
        en: "Yes, I booked a double room under Kim.",
        ko: "네, 김으로 더블룸 예약했어요.",
      },
      {
        speaker: "A",
        en: "Let me check. Yes, for three nights, correct?",
        ko: "확인해 볼게요. 네, 3박 맞으시죠?",
      },
      {
        speaker: "B",
        en: "That's right. What time is breakfast served?",
        ko: "맞아요. 조식은 몇 시에 제공되나요?",
      },
      {
        speaker: "A",
        en: "Breakfast is from seven to ten in the morning.",
        ko: "조식은 오전 7시부터 10시까지예요.",
      },
      {
        speaker: "B",
        en: "Great. Could I get a room on a higher floor?",
        ko: "좋네요. 높은 층 방으로 받을 수 있을까요?",
      },
    ],
  },
  {
    id: "ec10",
    title: "호텔에 요청하기",
    situation: "객실에서 프런트에 전화해 추가 수건을 요청합니다.",
    emoji: "🛎️",
    level: "B1",
    category: "service",
    lines: [
      {
        speaker: "A",
        en: "Front desk, how may I help you?",
        ko: "프런트입니다, 무엇을 도와드릴까요?",
      },
      {
        speaker: "B",
        en: "Hi, could I get some extra towels, please?",
        ko: "안녕하세요, 수건 좀 더 받을 수 있을까요?",
      },
      {
        speaker: "A",
        en: "Of course. How many do you need?",
        ko: "물론이죠. 몇 장 필요하세요?",
      },
      {
        speaker: "B",
        en: "Two would be great. Also, the Wi-Fi isn't working.",
        ko: "두 장이면 좋겠어요. 그리고 와이파이가 안 돼요.",
      },
      {
        speaker: "A",
        en: "I'm sorry about that. I'll send someone right away.",
        ko: "죄송합니다. 바로 사람을 보내드릴게요.",
      },
      {
        speaker: "B",
        en: "Thank you. I really appreciate it.",
        ko: "감사합니다. 정말 고마워요.",
      },
    ],
  },
  {
    id: "ec11",
    title: "공항에서 탑승 수속하기",
    situation: "공항 카운터에서 수하물을 부치고 좌석을 고릅니다.",
    emoji: "✈️",
    level: "B1",
    category: "travel",
    lines: [
      {
        speaker: "A",
        en: "Hello. May I see your passport and ticket?",
        ko: "안녕하세요. 여권과 항공권을 보여 주시겠어요?",
      },
      {
        speaker: "B",
        en: "Here they are. I'd like to check in one bag.",
        ko: "여기 있어요. 가방 하나 부치고 싶어요.",
      },
      {
        speaker: "A",
        en: "Sure. Please put your bag on the scale.",
        ko: "네. 가방을 저울에 올려 주세요.",
      },
      {
        speaker: "B",
        en: "Okay. Could I have a window seat, please?",
        ko: "네. 창가 좌석으로 받을 수 있을까요?",
      },
      {
        speaker: "A",
        en: "No problem. Your gate is twelve and boarding is at six.",
        ko: "문제없어요. 게이트는 12번이고 탑승은 6시예요.",
      },
      {
        speaker: "B",
        en: "Thank you. Have a nice day!",
        ko: "감사합니다. 좋은 하루 보내세요!",
      },
    ],
  },
  {
    id: "ec12",
    title: "친구와 주말 이야기하기",
    situation: "친구와 주말 계획에 대해 가볍게 잡담합니다.",
    emoji: "💬",
    level: "A2",
    category: "daily",
    lines: [
      {
        speaker: "A",
        en: "Hey, do you have any plans for the weekend?",
        ko: "안녕, 주말에 무슨 계획 있어?",
      },
      {
        speaker: "B",
        en: "Not really. I might just relax at home.",
        ko: "딱히 없어. 그냥 집에서 쉴까 봐.",
      },
      {
        speaker: "A",
        en: "We're going hiking on Saturday. Want to join?",
        ko: "우리 토요일에 등산 가는데. 같이 갈래?",
      },
      {
        speaker: "B",
        en: "That sounds fun! What time are you leaving?",
        ko: "재밌겠다! 몇 시에 출발해?",
      },
      {
        speaker: "A",
        en: "Around nine in the morning. I'll text you the details.",
        ko: "아침 9시쯤. 자세한 건 문자로 보낼게.",
      },
      {
        speaker: "B",
        en: "Perfect. Thanks for inviting me!",
        ko: "완벽해. 초대해 줘서 고마워!",
      },
    ],
  },
];
