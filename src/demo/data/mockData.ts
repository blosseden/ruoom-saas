export const DEMO_BUSINESS = {
  name: '핏라이프 스튜디오',
  slug: 'fitlife-studio',
  category: '헬스/피트니스',
  address: '서울시 강남구 테헤란로 123, 5층',
  phone: '02-1234-5678',
  owner: '김지수',
  email: 'hello@fitlife.kr',
};

export const DEMO_STATS = [
  { label: '오늘 예약', value: '24', change: '+12%', trend: 'up', icon: '📅', route: 'calendar' },
  { label: '이번 달 매출', value: '₩4.2M', change: '+8.5%', trend: 'up', icon: '💰', route: 'payments' },
  { label: '신규 고객', value: '48', change: '+15%', trend: 'up', icon: '👥', route: 'customers' },
  { label: '평균 평점', value: '4.9', change: '★★★★★', trend: 'up', icon: '⭐', route: 'analytics' },
];

export const DEMO_BOOKINGS = [
  { id: 1, name: '김민지', service: '요가 클래스', time: '10:00', status: 'confirmed', avatar: 'KM' },
  { id: 2, name: '박서준', service: '필라테스 1:1', time: '11:30', status: 'confirmed', avatar: 'PS' },
  { id: 3, name: '이하은', service: '요가 클래스', time: '14:00', status: 'pending', avatar: 'LH' },
  { id: 4, name: '최준혁', service: '퍼스널 트레이닝', time: '16:00', status: 'confirmed', avatar: 'CJ' },
  { id: 5, name: '정수아', service: '그룹 클래스', time: '18:30', status: 'pending', avatar: 'JS' },
];

export const DEMO_SCHEDULE = [
  { time: '09:00 – 10:00', title: '모닝 요가', attendees: 12, color: '#00C9A7' },
  { time: '10:30 – 11:30', title: '필라테스 1:1', attendees: 1, color: '#3B82F6' },
  { time: '14:00 – 15:00', title: '그룹 피트니스', attendees: 20, color: '#F59E0B' },
  { time: '16:00 – 17:00', title: '퍼스널 트레이닝', attendees: 1, color: '#8B5CF6' },
  { time: '18:30 – 19:30', title: '저녁 요가', attendees: 15, color: '#00C9A7' },
];

export const DEMO_ACTIVITY = [
  { icon: '✅', text: '김민지님이 요가 클래스를 예약했습니다', time: '3분 전', color: '#22C55E' },
  { icon: '💬', text: '박서준님이 메시지를 보냈습니다', time: '8분 전', color: '#3B82F6' },
  { icon: '💳', text: '이하은님 결제가 완료되었습니다 (₩45,000)', time: '22분 전', color: '#00C9A7' },
  { icon: '⭐', text: '새 리뷰가 등록되었습니다 (★★★★★)', time: '1시간 전', color: '#F59E0B' },
  { icon: '👤', text: '최준혁님이 신규 가입했습니다', time: '2시간 전', color: '#8B5CF6' },
];

export const DEMO_CUSTOMERS = [
  { id: 1, name: '김민지', email: 'minji@email.com', phone: '010-1234-5678', visits: 24, spent: '₩1,080,000', status: 'VIP', avatar: 'KM', joined: '2025.03' },
  { id: 2, name: '박서준', email: 'seojun@email.com', phone: '010-2345-6789', visits: 18, spent: '₩810,000', status: '일반', avatar: 'PS', joined: '2025.06' },
  { id: 3, name: '이하은', email: 'haeun@email.com', phone: '010-3456-7890', visits: 31, spent: '₩1,395,000', status: 'VIP', avatar: 'LH', joined: '2025.01' },
  { id: 4, name: '최준혁', email: 'junhyeok@email.com', phone: '010-4567-8901', visits: 8, spent: '₩360,000', status: '신규', avatar: 'CJ', joined: '2026.01' },
  { id: 5, name: '정수아', email: 'sua@email.com', phone: '010-5678-9012', visits: 15, spent: '₩675,000', status: '일반', avatar: 'JS', joined: '2025.09' },
  { id: 6, name: '홍길동', email: 'gildong@email.com', phone: '010-6789-0123', visits: 42, spent: '₩1,890,000', status: 'VIP', avatar: 'HG', joined: '2024.11' },
];

export const DEMO_CALENDARS = [
  { id: 'cal-1', name: '요가 클래스 예약', type: 'booking', color: '#00C9A7', events: 8 },
  { id: 'cal-2', name: '직원 스케줄', type: 'personal', color: '#3B82F6', events: 5 },
  { id: 'cal-3', name: '그룹 세션', type: 'group', color: '#F59E0B', events: 3 },
  { id: 'cal-4', name: '스튜디오 A 예약', type: 'resource', color: '#8B5CF6', events: 4 },
];

export const DEMO_CALENDAR_EVENTS = [
  { id: 1, title: '모닝 요가', date: '2026-03-16', time: '09:00', duration: 60, attendees: 12, maxAttendees: 15, calendarId: 'cal-1', status: 'confirmed' },
  { id: 2, title: '필라테스 1:1', date: '2026-03-16', time: '10:30', duration: 60, attendees: 1, maxAttendees: 1, calendarId: 'cal-2', status: 'confirmed' },
  { id: 3, title: '그룹 피트니스', date: '2026-03-16', time: '14:00', duration: 60, attendees: 20, maxAttendees: 20, calendarId: 'cal-3', status: 'full' },
  { id: 4, title: '저녁 요가', date: '2026-03-16', time: '18:30', duration: 60, attendees: 10, maxAttendees: 15, calendarId: 'cal-1', status: 'confirmed' },
  { id: 5, title: '모닝 요가', date: '2026-03-17', time: '09:00', duration: 60, attendees: 8, maxAttendees: 15, calendarId: 'cal-1', status: 'confirmed' },
  { id: 6, title: '퍼스널 트레이닝', date: '2026-03-17', time: '11:00', duration: 60, attendees: 1, maxAttendees: 1, calendarId: 'cal-2', status: 'confirmed' },
  { id: 7, title: '그룹 세션', date: '2026-03-18', time: '15:00', duration: 90, attendees: 12, maxAttendees: 20, calendarId: 'cal-3', status: 'confirmed' },
  { id: 8, title: '스튜디오 A 대여', date: '2026-03-19', time: '10:00', duration: 120, attendees: 1, maxAttendees: 1, calendarId: 'cal-4', status: 'confirmed' },
];

export const DEMO_CHAT_MESSAGES = [
  { id: 1, sender: 'customer', name: '김민지', text: '안녕하세요! 다음 주 모닝 요가 자리 있나요?', time: '10:32' },
  { id: 2, sender: 'business', name: '핏라이프', text: '안녕하세요 김민지님! 화요일 오전 9시 자리 있습니다 😊', time: '10:35' },
  { id: 3, sender: 'customer', name: '김민지', text: '좋아요! 예약할게요. 매트 지참해야 하나요?', time: '10:36' },
  { id: 4, sender: 'business', name: '핏라이프', text: '저희가 제공해 드리니 편하게 오세요. 편한 운동복만 준비해 오시면 됩니다!', time: '10:38' },
];

export const BUSINESS_TYPES = [
  { id: 'fitness', icon: '🏋️', label: '헬스/피트니스', desc: '헬스장, PT, 크로스핏' },
  { id: 'yoga', icon: '🧘', label: '요가/필라테스', desc: '요가 스튜디오, 필라테스' },
  { id: 'beauty', icon: '💆', label: '뷰티/살롱', desc: '헤어, 네일, 스파' },
  { id: 'edu', icon: '📚', label: '교육/학원', desc: '학원, 과외, 교육' },
  { id: 'medical', icon: '🏥', label: '의료/클리닉', desc: '피부과, 한의원, 치과' },
  { id: 'food', icon: '🍽️', label: 'F&B / 카페', desc: '레스토랑, 카페, 베이커리' },
  { id: 'space', icon: '🏢', label: '공간 대여', desc: '스튜디오, 세미나실' },
  { id: 'other', icon: '✨', label: '기타', desc: '직접 입력' },
];

export const TEMPLATES = [
  { id: 'modern', name: 'Modern Minimal', desc: '깔끔하고 모던한 디자인', tag: '인기', color: '#0F2167', preview: 'minimal' },
  { id: 'warm', name: 'Warm & Cozy', desc: '따뜻하고 친근한 분위기', tag: '추천', color: '#B85042', preview: 'warm' },
  { id: 'fresh', name: 'Fresh Green', desc: '활기차고 건강한 이미지', tag: '헬스케어', color: '#2C5F2D', preview: 'fresh' },
  { id: 'luxury', name: 'Luxury Dark', desc: '고급스럽고 프리미엄한 느낌', tag: '프리미엄', color: '#1E2761', preview: 'luxury' },
  { id: 'bright', name: 'Bright Energy', desc: '에너지 넘치는 생동감', tag: '피트니스', color: '#F96167', preview: 'bright' },
  { id: 'ocean', name: 'Ocean Calm', desc: '차분하고 신뢰감 있는 톤', tag: '웰니스', color: '#065A82', preview: 'ocean' },
];

export const AI_CONVERSATION = [
  { role: 'bot', text: '안녕하세요! 비즈니스 설정을 도와드릴게요 😊\n먼저, 운영하시는 공간이나 서비스 이름이 무엇인가요?' },
  { role: 'user', text: '핏라이프 스튜디오입니다. 요가랑 필라테스 수업을 해요.' },
  { role: 'bot', text: '좋아요! 핏라이프 스튜디오군요 💪\n주로 어떤 분들을 대상으로 하시나요? (예: 직장인, 임산부, 청소년 등)' },
  { role: 'user', text: '20~40대 직장인 위주예요. 퇴근 후 수업이 많아요.' },
  { role: 'bot', text: '직장인 고객 타겟이시군요!\n운영 시간은 대략 어떻게 되나요?' },
  { role: 'user', text: '평일은 오전 6시부터 밤 10시까지, 주말은 오전만요.' },
  { role: 'bot', text: '완벽해요! 마지막으로, 주요 서비스와 가격대를 알려주시면 웹사이트를 최적화할게요.' },
  { role: 'user', text: '요가 클래스 45,000원, 필라테스 1:1은 80,000원이에요.' },
  { role: 'bot', text: '모든 정보가 준비됐어요! 🎉\n핏라이프 스튜디오에 맞는 최적의 템플릿을 찾아드릴게요.' },
];
