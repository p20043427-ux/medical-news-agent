export interface EnPhrasebookPhrase {
  en: string; // 영어 문장
  pronunciation: string; // 한글 발음 표기 (예: "웨어 이즈 더 게이트?")
  ko: string; // 한국어 뜻
  tip?: string; // 짧은 사용 팁 (선택, 한국어)
}

export interface EnPhrasebookSituation {
  key: string; // 영문 슬러그 (airport 등)
  title: string; // 한국어 제목
  emoji: string;
  phrases: EnPhrasebookPhrase[];
}

export const EN_TRAVEL_PHRASEBOOK: EnPhrasebookSituation[] = [
  {
    key: "airport",
    title: "공항·입국",
    emoji: "✈️",
    phrases: [
      {
        en: "Where is the check-in counter?",
        pronunciation: "웨어 이즈 더 체크인 카운터?",
        ko: "체크인 카운터가 어디예요?",
      },
      {
        en: "Could I get a window seat?",
        pronunciation: "쿠다이 겟 어 윈도우 씻?",
        ko: "창가 자리로 받을 수 있을까요?",
        tip: "통로 자리는 'an aisle seat(언 아일 씻)'이라고 해요.",
      },
      {
        en: "Here is my passport.",
        pronunciation: "히어 이즈 마이 패스포트.",
        ko: "여기 제 여권이요.",
      },
      {
        en: "I'm here on vacation.",
        pronunciation: "아임 히어 온 베이케이션.",
        ko: "휴가차 왔어요.",
        tip: "입국 심사 때 방문 목적을 물으면 이렇게 답하면 돼요.",
      },
      {
        en: "I'll be staying for one week.",
        pronunciation: "아일 비 스테잉 포 원 위크.",
        ko: "일주일 머무를 거예요.",
      },
      {
        en: "Where is the baggage claim?",
        pronunciation: "웨어 이즈 더 배기지 클레임?",
        ko: "수하물 찾는 곳이 어디예요?",
      },
      {
        en: "My luggage is missing.",
        pronunciation: "마이 러기지 이즈 미씽.",
        ko: "제 짐이 없어졌어요.",
      },
      {
        en: "What is the gate number?",
        pronunciation: "왓 이즈 더 게이트 넘버?",
        ko: "탑승구 번호가 몇 번이에요?",
      },
      {
        en: "Is the flight delayed?",
        pronunciation: "이즈 더 플라이트 딜레이드?",
        ko: "비행기가 지연되나요?",
      },
      {
        en: "I have nothing to declare.",
        pronunciation: "아이 해브 낫띵 투 디클레어.",
        ko: "신고할 물건이 없어요.",
        tip: "세관에서 자주 쓰는 표현이에요.",
      },
      {
        en: "Where can I exchange money?",
        pronunciation: "웨어 캔 아이 익스체인지 머니?",
        ko: "환전은 어디서 할 수 있나요?",
      },
      {
        en: "Could you help me fill out this form?",
        pronunciation: "쿠쥬 헬프 미 필 아웃 디스 폼?",
        ko: "이 양식 작성하는 것 좀 도와주시겠어요?",
      },
    ],
  },
  {
    key: "hotel",
    title: "호텔·숙소",
    emoji: "🏨",
    phrases: [
      {
        en: "I have a reservation under my name.",
        pronunciation: "아이 해브 어 레저베이션 언더 마이 네임.",
        ko: "제 이름으로 예약했어요.",
      },
      {
        en: "I'd like to check in, please.",
        pronunciation: "아이드 라이크 투 체크인, 플리즈.",
        ko: "체크인 하고 싶어요.",
      },
      {
        en: "What time is check-out?",
        pronunciation: "왓 타임 이즈 체크아웃?",
        ko: "체크아웃은 몇 시예요?",
      },
      {
        en: "Could I have a wake-up call at seven?",
        pronunciation: "쿠다이 해브 어 웨이크업 콜 앳 세븐?",
        ko: "7시에 모닝콜 부탁할 수 있을까요?",
      },
      {
        en: "Is breakfast included?",
        pronunciation: "이즈 브렉퍼스트 인클루디드?",
        ko: "조식이 포함되어 있나요?",
      },
      {
        en: "Could you keep my luggage?",
        pronunciation: "쿠쥬 킵 마이 러기지?",
        ko: "제 짐을 맡아 주실 수 있나요?",
        tip: "체크아웃 후에도 짐을 맡길 때 유용해요.",
      },
      {
        en: "The air conditioner is not working.",
        pronunciation: "디 에어 컨디셔너 이즈 낫 워킹.",
        ko: "에어컨이 작동하지 않아요.",
      },
      {
        en: "Could I get more towels?",
        pronunciation: "쿠다이 겟 모어 타월스?",
        ko: "수건을 좀 더 받을 수 있을까요?",
      },
      {
        en: "What is the Wi-Fi password?",
        pronunciation: "왓 이즈 더 와이파이 패스워드?",
        ko: "와이파이 비밀번호가 뭐예요?",
      },
      {
        en: "Could you call a taxi for me?",
        pronunciation: "쿠쥬 콜 어 택시 포 미?",
        ko: "택시를 불러 주실 수 있나요?",
      },
      {
        en: "I'd like to extend my stay one night.",
        pronunciation: "아이드 라이크 투 익스텐드 마이 스테이 원 나잇.",
        ko: "하룻밤 더 묵고 싶어요.",
      },
      {
        en: "Is there a laundry service?",
        pronunciation: "이즈 데어 어 론드리 서비스?",
        ko: "세탁 서비스가 있나요?",
      },
    ],
  },
  {
    key: "restaurant",
    title: "식당·주문",
    emoji: "🍽️",
    phrases: [
      {
        en: "A table for two, please.",
        pronunciation: "어 테이블 포 투, 플리즈.",
        ko: "두 명 자리 부탁해요.",
      },
      {
        en: "Could I see the menu, please?",
        pronunciation: "쿠다이 씨 더 메뉴, 플리즈?",
        ko: "메뉴 좀 볼 수 있을까요?",
      },
      {
        en: "What do you recommend?",
        pronunciation: "왓 두 유 레커멘드?",
        ko: "어떤 걸 추천하세요?",
      },
      {
        en: "I'd like this one, please.",
        pronunciation: "아이드 라이크 디스 원, 플리즈.",
        ko: "이걸로 주세요.",
        tip: "메뉴를 가리키며 말하면 편해요.",
      },
      {
        en: "Is this dish spicy?",
        pronunciation: "이즈 디스 디시 스파이씨?",
        ko: "이 음식 매워요?",
      },
      {
        en: "I'm allergic to nuts.",
        pronunciation: "아임 얼러직 투 넛츠.",
        ko: "저는 견과류 알레르기가 있어요.",
        tip: "알레르기가 있으면 주문 전에 꼭 말하세요.",
      },
      {
        en: "Could I get some water, please?",
        pronunciation: "쿠다이 겟 썸 워터, 플리즈?",
        ko: "물 좀 주시겠어요?",
      },
      {
        en: "This is not what I ordered.",
        pronunciation: "디스 이즈 낫 왓 아이 오더드.",
        ko: "이건 제가 주문한 게 아니에요.",
      },
      {
        en: "Could I get the check, please?",
        pronunciation: "쿠다이 겟 더 체크, 플리즈?",
        ko: "계산서 좀 주시겠어요?",
      },
      {
        en: "Can I pay by card?",
        pronunciation: "캔 아이 페이 바이 카드?",
        ko: "카드로 결제할 수 있나요?",
      },
      {
        en: "Could I get this to go?",
        pronunciation: "쿠다이 겟 디스 투 고우?",
        ko: "이거 포장해 갈 수 있을까요?",
      },
      {
        en: "It was delicious, thank you.",
        pronunciation: "잇 워즈 딜리셔스, 땡큐.",
        ko: "맛있었어요, 감사합니다.",
      },
      {
        en: "Could we get separate checks?",
        pronunciation: "쿠드 위 겟 세퍼릿 체크스?",
        ko: "따로 계산할 수 있을까요?",
      },
    ],
  },
  {
    key: "shopping",
    title: "쇼핑·계산",
    emoji: "🛍️",
    phrases: [
      {
        en: "How much is this?",
        pronunciation: "하우 머치 이즈 디스?",
        ko: "이거 얼마예요?",
      },
      {
        en: "I'm just looking, thank you.",
        pronunciation: "아임 저스트 룩킹, 땡큐.",
        ko: "그냥 둘러보는 거예요, 감사합니다.",
        tip: "점원이 도움을 권할 때 부담 없이 쓸 수 있어요.",
      },
      {
        en: "Do you have this in a smaller size?",
        pronunciation: "두 유 해브 디스 인 어 스몰러 사이즈?",
        ko: "이거 더 작은 사이즈 있나요?",
      },
      {
        en: "Can I try this on?",
        pronunciation: "캔 아이 트라이 디스 온?",
        ko: "이거 입어 봐도 되나요?",
      },
      {
        en: "Where is the fitting room?",
        pronunciation: "웨어 이즈 더 피팅 룸?",
        ko: "탈의실이 어디예요?",
      },
      {
        en: "Do you have another color?",
        pronunciation: "두 유 해브 어나더 컬러?",
        ko: "다른 색깔 있나요?",
      },
      {
        en: "Can I get a discount?",
        pronunciation: "캔 아이 겟 어 디스카운트?",
        ko: "할인 받을 수 있나요?",
      },
      {
        en: "I'll take this one.",
        pronunciation: "아일 테이크 디스 원.",
        ko: "이걸로 할게요.",
      },
      {
        en: "Could I get a receipt, please?",
        pronunciation: "쿠다이 겟 어 리씻, 플리즈?",
        ko: "영수증 좀 받을 수 있을까요?",
      },
      {
        en: "Can I get a tax refund?",
        pronunciation: "캔 아이 겟 어 택스 리펀드?",
        ko: "세금 환급 받을 수 있나요?",
        tip: "면세 쇼핑 시 'tax-free(택스 프리)' 매장인지 확인하세요.",
      },
      {
        en: "Could you gift-wrap this?",
        pronunciation: "쿠쥬 기프트 랩 디스?",
        ko: "이거 선물 포장해 주실 수 있나요?",
      },
      {
        en: "Can I return this?",
        pronunciation: "캔 아이 리턴 디스?",
        ko: "이거 환불할 수 있나요?",
      },
    ],
  },
  {
    key: "transport",
    title: "교통·이동",
    emoji: "🚕",
    phrases: [
      {
        en: "Could you take me to this address?",
        pronunciation: "쿠쥬 테이크 미 투 디스 어드레스?",
        ko: "이 주소로 데려다주시겠어요?",
        tip: "주소를 화면으로 보여주면 더 정확해요.",
      },
      {
        en: "How much is the fare?",
        pronunciation: "하우 머치 이즈 더 페어?",
        ko: "요금이 얼마예요?",
      },
      {
        en: "Please use the meter.",
        pronunciation: "플리즈 유즈 더 미터.",
        ko: "미터기를 켜 주세요.",
      },
      {
        en: "Where is the nearest subway station?",
        pronunciation: "웨어 이즈 더 니어리스트 서브웨이 스테이션?",
        ko: "가장 가까운 지하철역이 어디예요?",
      },
      {
        en: "One ticket to downtown, please.",
        pronunciation: "원 티켓 투 다운타운, 플리즈.",
        ko: "시내로 가는 표 한 장 주세요.",
      },
      {
        en: "Does this bus go to the airport?",
        pronunciation: "더즈 디스 버스 고우 투 디 에어포트?",
        ko: "이 버스가 공항으로 가나요?",
      },
      {
        en: "Which platform is it?",
        pronunciation: "위치 플랫폼 이즈 잇?",
        ko: "어느 승강장이에요?",
      },
      {
        en: "Could you tell me when to get off?",
        pronunciation: "쿠쥬 텔 미 웬 투 겟 오프?",
        ko: "어디서 내려야 하는지 알려 주시겠어요?",
      },
      {
        en: "Please stop here.",
        pronunciation: "플리즈 스탑 히어.",
        ko: "여기서 세워 주세요.",
      },
      {
        en: "Keep the change.",
        pronunciation: "킵 더 체인지.",
        ko: "거스름돈은 괜찮아요.",
        tip: "팁을 줄 때 쓰는 표현이에요.",
      },
      {
        en: "How long does it take?",
        pronunciation: "하우 롱 더즈 잇 테이크?",
        ko: "얼마나 걸리나요?",
      },
      {
        en: "I'd like to rent a car.",
        pronunciation: "아이드 라이크 투 렌트 어 카.",
        ko: "차를 빌리고 싶어요.",
      },
    ],
  },
  {
    key: "directions",
    title: "길 묻기",
    emoji: "🗺️",
    phrases: [
      {
        en: "Excuse me, where is the restroom?",
        pronunciation: "익스큐즈 미, 웨어 이즈 더 레스트룸?",
        ko: "실례합니다, 화장실이 어디예요?",
      },
      {
        en: "How do I get to the station?",
        pronunciation: "하우 두 아이 겟 투 더 스테이션?",
        ko: "역에 어떻게 가나요?",
      },
      {
        en: "Is it far from here?",
        pronunciation: "이즈 잇 파 프롬 히어?",
        ko: "여기서 먼가요?",
      },
      {
        en: "Can I walk there?",
        pronunciation: "캔 아이 워크 데어?",
        ko: "걸어서 갈 수 있나요?",
      },
      {
        en: "Could you show me on the map?",
        pronunciation: "쿠쥬 쇼 미 온 더 맵?",
        ko: "지도에서 알려 주실 수 있나요?",
        tip: "휴대폰 지도를 함께 보여주면 좋아요.",
      },
      {
        en: "Is it this way?",
        pronunciation: "이즈 잇 디스 웨이?",
        ko: "이쪽이 맞나요?",
      },
      {
        en: "Go straight and turn left.",
        pronunciation: "고우 스트레잇 앤 턴 레프트.",
        ko: "직진하다가 왼쪽으로 도세요.",
        tip: "길 안내를 들을 때 자주 나오는 표현이에요.",
      },
      {
        en: "I think I'm lost.",
        pronunciation: "아이 띵크 아임 로스트.",
        ko: "길을 잃은 것 같아요.",
      },
      {
        en: "Which way is the exit?",
        pronunciation: "위치 웨이 이즈 디 엑시트?",
        ko: "출구가 어느 쪽이에요?",
      },
      {
        en: "Is there a convenience store nearby?",
        pronunciation: "이즈 데어 어 컨비니언스 스토어 니어바이?",
        ko: "근처에 편의점이 있나요?",
      },
      {
        en: "Could you write it down for me?",
        pronunciation: "쿠쥬 라잇 잇 다운 포 미?",
        ko: "그거 좀 적어 주시겠어요?",
      },
      {
        en: "How far is the nearest bus stop?",
        pronunciation: "하우 파 이즈 더 니어리스트 버스 스탑?",
        ko: "가장 가까운 버스 정류장이 얼마나 먼가요?",
      },
    ],
  },
  {
    key: "emergency",
    title: "긴급·병원",
    emoji: "🆘",
    phrases: [
      {
        en: "Help me, please!",
        pronunciation: "헬프 미, 플리즈!",
        ko: "도와주세요!",
      },
      {
        en: "Please call an ambulance.",
        pronunciation: "플리즈 콜 언 앰뷸런스.",
        ko: "구급차를 불러 주세요.",
      },
      {
        en: "I need a doctor.",
        pronunciation: "아이 니드 어 닥터.",
        ko: "의사가 필요해요.",
      },
      {
        en: "Where is the nearest hospital?",
        pronunciation: "웨어 이즈 더 니어리스트 호스피탈?",
        ko: "가장 가까운 병원이 어디예요?",
      },
      {
        en: "I don't feel well.",
        pronunciation: "아이 돈트 필 웰.",
        ko: "몸이 좋지 않아요.",
      },
      {
        en: "I have a fever.",
        pronunciation: "아이 해브 어 피버.",
        ko: "열이 나요.",
      },
      {
        en: "It hurts here.",
        pronunciation: "잇 허츠 히어.",
        ko: "여기가 아파요.",
        tip: "아픈 부위를 손으로 가리키며 말하세요.",
      },
      {
        en: "I'm allergic to penicillin.",
        pronunciation: "아임 얼러직 투 페니실린.",
        ko: "저는 페니실린 알레르기가 있어요.",
        tip: "약 알레르기는 진료 전에 꼭 알리세요.",
      },
      {
        en: "I lost my passport.",
        pronunciation: "아이 로스트 마이 패스포트.",
        ko: "여권을 잃어버렸어요.",
      },
      {
        en: "My wallet was stolen.",
        pronunciation: "마이 월릿 워즈 스톨른.",
        ko: "지갑을 도둑맞았어요.",
      },
      {
        en: "Please call the police.",
        pronunciation: "플리즈 콜 더 폴리스.",
        ko: "경찰을 불러 주세요.",
      },
      {
        en: "Where is the nearest pharmacy?",
        pronunciation: "웨어 이즈 더 니어리스트 파머시?",
        ko: "가장 가까운 약국이 어디예요?",
      },
      {
        en: "Can you speak Korean?",
        pronunciation: "캔 유 스픽 코리안?",
        ko: "한국어 할 줄 아세요?",
      },
    ],
  },
  {
    key: "basic",
    title: "기본·인사",
    emoji: "💬",
    phrases: [
      {
        en: "Hello.",
        pronunciation: "헬로우.",
        ko: "안녕하세요.",
      },
      {
        en: "Thank you very much.",
        pronunciation: "땡큐 베리 머치.",
        ko: "정말 감사합니다.",
      },
      {
        en: "You're welcome.",
        pronunciation: "유어 웰컴.",
        ko: "천만에요.",
      },
      {
        en: "Excuse me.",
        pronunciation: "익스큐즈 미.",
        ko: "실례합니다.",
        tip: "사람을 부르거나 지나갈 때 모두 쓸 수 있어요.",
      },
      {
        en: "I'm sorry.",
        pronunciation: "아임 쏘리.",
        ko: "죄송합니다.",
      },
      {
        en: "Yes, please.",
        pronunciation: "예스, 플리즈.",
        ko: "네, 부탁해요.",
      },
      {
        en: "No, thank you.",
        pronunciation: "노우, 땡큐.",
        ko: "아니요, 괜찮아요.",
      },
      {
        en: "Nice to meet you.",
        pronunciation: "나이스 투 미츄.",
        ko: "만나서 반가워요.",
      },
      {
        en: "I don't understand.",
        pronunciation: "아이 돈트 언더스탠드.",
        ko: "잘 모르겠어요.",
      },
      {
        en: "Could you say that again?",
        pronunciation: "쿠쥬 쎄이 댓 어겐?",
        ko: "다시 한번 말씀해 주시겠어요?",
      },
      {
        en: "Could you speak more slowly?",
        pronunciation: "쿠쥬 스픽 모어 슬로울리?",
        ko: "조금 더 천천히 말씀해 주시겠어요?",
        tip: "영어가 빠르게 들릴 때 부담 없이 부탁해 보세요.",
      },
      {
        en: "I don't speak English well.",
        pronunciation: "아이 돈트 스픽 잉글리시 웰.",
        ko: "영어를 잘 못해요.",
      },
      {
        en: "Goodbye.",
        pronunciation: "굿바이.",
        ko: "안녕히 계세요.",
      },
    ],
  },
];
