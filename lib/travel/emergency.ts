// lib/travel/emergency.ts

export interface EmergencyContact {
  name: string;
  number: string;
  note: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
  critical?: boolean; // 필수 항목
}

export interface ChecklistGroup {
  title: string;
  emoji: string;
  items: ChecklistItem[];
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { name: "경찰", number: "110", note: "도난·사고·분실 신고" },
  { name: "구급·소방", number: "119", note: "응급 의료·화재" },
  { name: "관광경찰 (영어)", number: "#9110", note: "외국인 관광객 전용 상담" },
  { name: "한국 영사관 (오사카)", number: "06-2223-3151", note: "오사카·교토·나라 지역 여권 분실 등" },
  { name: "한국 영사관 (후쿠오카)", number: "092-771-0461", note: "후쿠오카·규슈 지역" },
  { name: "한국 대사관 (도쿄)", number: "03-3452-7611", note: "도쿄·간토 지역, 24시간 영사콜센터: +82-2-3210-0404" },
  { name: "JNTO 관광안내 (영어·한국어)", number: "050-3816-2787", note: "24시간 관광 전화 안내, 한국어 가능" },
  { name: "여행자 보험 긴급 (예시)", number: "보험증권 뒷면 확인", note: "출발 전 번호 저장 필수" },
];

export const LOST_ITEMS_GUIDE = {
  title: "분실·도난 대처법",
  steps: [
    {
      case: "지갑·현금 분실",
      steps: [
      "가장 가까운 역 유실물 센터(忘れ物センター) 방문 — 역 내 분실 시 당일 보관율 90%+",
      "경찰서(파출소·交番) 에서 분실신고서 작성 — 보험 청구 시 필요",
      "한국 영사관 연락 (현금 지원 불가, 귀국 지원 가능)",
      "한국 가족에게 연락해 송금 받기 (일본 편의점 세븐일레븐 ATM에서 해외카드 출금 가능)",
      ],
    },
    {
      case: "여권 분실",
      steps: [
      "즉시 가까운 경찰서(交番)에서 도난·분실 신고서 발급",
      "한국 영사관 방문 (여행증명서 발급 — 평일 09:00-12:00, 13:00-17:00)",
      "준비물: 여권용 사진 2매, 신분증(운전면허증 등), 항공권, 신고서",
      "여행증명서 발급에 1-3 영업일 소요 — 출국일 여유 있게 신청",
      ],
    },
    {
      case: "신용카드 분실",
      steps: [
      "카드사 국제 분실 신고 전화 즉시 연락 (출발 전 번호 저장 필수)",
      "삼성카드: +82-2-2000-8100 / 신한카드: +82-1544-7000",
      "경찰서에서 분실신고서 작성 (보험 청구용)",
      "세븐일레븐 ATM → 해외 직불카드로 긴급 현금 인출 가능",
      ],
    },
    {
      case: "스마트폰 분실",
      steps: [
      "역 유실물 센터 또는 경찰서 신고",
      "iCloud/구글 계정으로 위치 추적 시도",
      "구글 계정 비밀번호 메모 필수 (스마트폰 없이 로그인해야 함)",
      ],
    },
  ],
};

export const CHECKLIST: ChecklistGroup[] = [
  {
    title: "출발 3일 전",
    emoji: "📋",
    items: [
      { id: "passport", label: "여권 유효기간 확인", detail: "출국일 기준 6개월 이상 남아야 함", critical: true },
      { id: "vjw", label: "Visit Japan Web 사전 등록", detail: "vjw-lp.digital.go.jp — 입국심사 QR 발급, 세관신고서 QR 발급", critical: true },
      { id: "insurance", label: "여행자 보험 가입 + 긴급연락처 저장", detail: "스마트폰 분실에 대비해 보험사 번호 종이에도 메모", critical: true },
      { id: "yen", label: "엔화 환전", detail: "공항 환전소보다 은행·시중 환전소가 유리. 1인 5-10만엔 현금 권장 (현금 문화)", critical: true },
      { id: "embassy", label: "한국 영사관 전화번호 저장", detail: "오사카: 06-2223-3151 / 후쿠오카: 092-771-0461" },
      { id: "hotel-addr", label: "숙소 주소 일본어로 출력·저장", detail: "입국카드 작성 및 택시 이용 시 필요" },
      { id: "card", label: "해외 결제 카드 준비 + 해외 인출 한도 확인", detail: "Visa/Mastercard 계열 권장. 세븐일레븐 ATM은 대부분 카드 사용 가능" },
      { id: "plug", label: "어댑터 불필요", detail: "일본 전압 100V·플러그 모양 한국과 동일 (2핀 납작)" },
      { id: "sim", label: "포켓 와이파이 또는 SIM 예약", detail: "공항 수령 가능. 짧은 여행엔 데이터 SIM이 더 저렴" },
    ],
  },
  {
    title: "출발 당일",
    emoji: "✈️",
    items: [
      { id: "vjw-qr", label: "Visit Japan Web QR 스크린샷 저장", detail: "인터넷 없어도 제시 가능하게 오프라인 저장", critical: true },
      { id: "cash", label: "현금 환전액 확인", critical: true },
      { id: "checkin-time", label: "국제선 출발 3시간 전 공항 도착", detail: "성수기·피크 시즌은 3.5시간 전 권장" },
      { id: "liquids", label: "100ml 이하 액체류 투명 지퍼백 1L에 담기", detail: "보안검사 통과 필수" },
      { id: "charger", label: "보조 배터리 기내 반입 (화물 불가)", detail: "100Wh 초과 시 항공사 사전 승인 필요" },
    ],
  },
  {
    title: "현지 도착 후",
    emoji: "🏨",
    items: [
      { id: "ic-card", label: "공항에서 IC카드 구매·충전", detail: "간사이공항: ICOCA / 후쿠오카공항: 하야카켄 또는 nimoca. 보증금 500엔 포함 3,000엔 충전 추천" },
      { id: "sim-pickup", label: "SIM·와이파이 수령", detail: "공항 도착층 카운터 확인" },
      { id: "hotel-wifi", label: "숙소 와이파이 비밀번호 저장" },
      { id: "nearby-cvs", label: "숙소 근처 편의점·약국 위치 파악", detail: "세븐일레븐이 ATM 사용 제일 편리" },
    ],
  },
  {
    title: "귀국 전",
    emoji: "🏠",
    items: [
      { id: "tax-refund", label: "Tax Free 환급 미신청분 공항에서 처리", detail: "영수증 지참. 면세 한도 20만엔 초과분은 세관 신고", critical: true },
      { id: "ic-refund", label: "IC카드 잔액 환불 (옵션)", detail: "역 창구에서 환불. 보증금 500엔에서 수수료 220엔 공제 후 환급" },
      { id: "luggage", label: "수하물 무게·크기 확인", detail: "이코노미 보통 23kg 1개. 초과 시 비용 발생" },
      { id: "checkin-intl", label: "국제선 체크인 마감 60분 전 주의", detail: "공항 도착 기준 3시간 전 권장" },
    ],
  },
];

export const USEFUL_APPS = [
  { name: "Google Maps", desc: "오프라인 지도 다운로드 필수. 전철 노선·환승 경로 정확도 높음" },
  { name: "Yahoo!乗換案内", desc: "일본 대중교통 환승 앱 최강. 요금·소요시간 정확" },
  { name: "Google 번역", desc: "카메라 번역으로 메뉴판·간판 즉시 번역" },
  { name: "じゃらん / Booking.com", desc: "숙소 예약" },
  { name: "PayPay", desc: "QR결제. 관광지 주변 소규모 상점에서 유용 (카드 미취급점 많음)" },
  { name: "Visit Japan Web", desc: "사전 입국심사·세관 QR 등록. 반드시 출발 전 등록" },
  { name: "NHK World", desc: "재해·날씨 긴급 방송. 한국어 지원" },
];
