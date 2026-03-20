import { FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, ChevronLeft, ChevronRight, Check, Star } from 'lucide-react';
import { colors, shadows } from '../design';
import { DEMO_BUSINESS } from '../data/mockData';

interface Props { onBack: () => void; }

const SERVICES = [
  { id: 1, name: '모닝 요가', price: '₩45,000', duration: '60분', level: '전체', icon: '🧘', slots: 3 },
  { id: 2, name: '필라테스 1:1', price: '₩80,000', duration: '60분', level: '전체', icon: '🤸', slots: 1 },
  { id: 3, name: '그룹 피트니스', price: '₩35,000', duration: '50분', level: '중급', icon: '🏋️', slots: 8 },
  { id: 4, name: '저녁 요가', price: '₩45,000', duration: '60분', level: '입문', icon: '🌙', slots: 5 },
];

const REVIEWS = [
  { name: '김민지', stars: 5, text: '선생님이 너무 친절하고 수업이 알차요! 벌써 1년째 다니고 있어요 💪', date: '2주 전' },
  { name: '박서준', stars: 5, text: '직장인 새벽반이 있어서 정말 좐아요. 시설도 깔끔해서 만족합니다.', date: '3주 전' },
  { name: '이하은', stars: 5, text: '1:1 필라테스 추천해요! 자세 교정에 확실히 도움됩니다 ✨', date: '1달 전' },
];

const TIMES = ['06:00', '07:00', '08:00', '09:00', '10:00', '14:00', '15:00', '18:30', '19:30', '20:00'];

const PublicSiteScreen: FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'booking' | 'mypage'>('home');
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePay = async () => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 1800));
    setPaying(false);
    setPaid(true);
    setBookingStep(4);
  };

  const svc = SERVICES.find(s => s.id === selectedService);

  return (
    <Overlay>
      <Browser>
        <BrowserBar>
          <Dots>
            <Dot $color="#FF5F57" />
            <Dot $color="#FEBC2E" />
            <Dot $color="#28C840" />
          </Dots>
          <AddressBar>
            <Lock>🔒</Lock>
            <span>{DEMO_BUSINESS.slug}.ruoomkr.co.kr</span>
          </AddressBar>
          <CloseBtn onClick={onBack}><X size={16} /></CloseBtn>
        </BrowserBar>

        <SiteWrap>
          {/* ── Top Nav ── */}
          <SiteNav>
            <SiteLogo>🏋️ {DEMO_BUSINESS.name}</SiteLogo>
            <NavLinks>
              <a href="#" onClick={e => e.preventDefault()}>소개</a>
              <a href="#" onClick={e => e.preventDefault()}>서비스</a>
              <a href="#" onClick={e => e.preventDefault()}>위치</a>
            </NavLinks>
            <NavActions>
              <LoginBtn onClick={() => setActiveTab('mypage')}>로그인</LoginBtn>
              <BookNowBtn onClick={() => { setActiveTab('booking'); setBookingStep(1); }}>예약하기</BookNowBtn>
            </NavActions>
          </SiteNav>

          {/* ── Home ── */}
          {activeTab === 'home' && (
            <div>
              <Hero>
                <HeroText>
                  <HeroBadge>✨ All-in-One 비즈니스 플랫폼</HeroBadge>
                  <HeroTitle>건강한 삶의 시작<br /><HeroAccent>핏라이프 스튜디오</HeroAccent></HeroTitle>
                  <HeroDesc>서울 강남 요가·필라테스 전문 스튜디오<br />지금 바로 원하는 클래스를 예약하세요</HeroDesc>
                  <HeroBtns>
                    <HeroCTA onClick={() => { setActiveTab('booking'); setBookingStep(1); }}>
                      클래스 예약하기 →
                    </HeroCTA>
                    <HeroSec>서비스 보기</HeroSec>
                  </HeroBtns>
                  <HeroStats>
                    {[['500+', '수강생'], ['4.9★', '평균 평점'], ['5년+', '운영 경력']].map(([v, l]) => (
                      <HeroStat key={l}><strong>{v}</strong><span>{l}</span></HeroStat>
                    ))}
                  </HeroStats>
                </HeroText>
                <HeroVisual>
                  <HeroCard>
                    <HeroCardIcon>🧘</HeroCardIcon>
                    <HeroCardText>
                      <div style={{ fontWeight: 700, marginBottom: 2 }}>다음 클래스</div>
                      <div style={{ fontSize: 13, color: '#64748B' }}>모닝 요가 — 오전 09:00</div>
                    </HeroCardText>
                    <HeroCardBadge>3자리 남음</HeroCardBadge>
                  </HeroCard>
                  <HeroSlide>
                    {SERVICES.map(s => (
                      <SlideCard key={s.id} onClick={() => { setSelectedService(s.id); setActiveTab('booking'); setBookingStep(2); }}>
                        <SlideIcon>{s.icon}</SlideIcon>
                        <SlideInfo>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                          <div style={{ fontSize: 12, color: '#64748B' }}>{s.duration} · {s.price}</div>
                        </SlideInfo>
                        <SlideSlots>{s.slots}자리</SlideSlots>
                      </SlideCard>
                    ))}
                  </HeroSlide>
                </HeroVisual>
              </Hero>

              {/* Services */}
              <Section>
                <SectionTitle>클래스 안내</SectionTitle>
                <ServiceGrid>
                  {SERVICES.map(s => (
                    <ServiceCard key={s.id} onClick={() => { setSelectedService(s.id); setActiveTab('booking'); setBookingStep(2); }}>
                      <ServiceIcon>{s.icon}</ServiceIcon>
                      <ServiceName>{s.name}</ServiceName>
                      <ServiceDetail>{s.duration} · {s.level}</ServiceDetail>
                      <ServicePrice>{s.price}</ServicePrice>
                      <ServiceBtn>예약하기</ServiceBtn>
                    </ServiceCard>
                  ))}
                </ServiceGrid>
              </Section>

              {/* Reviews */}
              <Section>
                <SectionTitle>고객 후기</SectionTitle>
                <ReviewGrid>
                  {REVIEWS.map((r, i) => (
                    <ReviewCard key={i}>
                      <Stars>{Array.from({ length: r.stars }).map((_, j) => <Star key={j} size={13} fill="#F59E0B" color="#F59E0B" />)}</Stars>
                      <ReviewText>"{r.text}"</ReviewText>
                      <ReviewMeta><strong>{r.name}</strong> · {r.date}</ReviewMeta>
                    </ReviewCard>
                  ))}
                </ReviewGrid>
              </Section>

              <SiteFooter>
                <p>📍 {DEMO_BUSINESS.address}</p>
                <p>📞 {DEMO_BUSINESS.phone} · ✉️ {DEMO_BUSINESS.email}</p>
                <p style={{ marginTop: 8, fontSize: 11, opacity: 0.6 }}>Powered by Ruoom KR Platform</p>
              </SiteFooter>
            </div>
          )}

          {/* ── Booking Flow ── */}
          {activeTab === 'booking' && (
            <BookingWrap>
              <BookingHeader>
                <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#64748B', fontSize: 13 }}>
                  <ChevronLeft size={16} /> 돌아가기
                </button>
                <BookingTitle>클래스 예약</BookingTitle>
                <BookingSteps>
                  {['서비스', '날짜', '결제', '완료'].map((s, i) => (
                    <BSStep key={i} $done={bookingStep > i + 1} $active={bookingStep === i + 1}>
                      <BSNum $done={bookingStep > i + 1} $active={bookingStep === i + 1}>
                        {bookingStep > i + 1 ? <Check size={11} /> : i + 1}
                      </BSNum>
                      <span>{s}</span>
                    </BSStep>
                  ))}
                </BookingSteps>
              </BookingHeader>

              {bookingStep === 1 && (
                <BookingStep className="anim-fade">
                  <h3>어떤 클래스를 예약하시겠어요?</h3>
                  <BSServiceGrid>
                    {SERVICES.map(s => (
                      <BSServiceCard key={s.id} $sel={selectedService === s.id} onClick={() => setSelectedService(s.id)}>
                        <span style={{ fontSize: 28 }}>{s.icon}</span>
                        <div>
                          <div style={{ fontWeight: 700 }}>{s.name}</div>
                          <div style={{ fontSize: 12, color: '#64748B' }}>{s.duration} · {s.level}</div>
                        </div>
                        <BSPrice>{s.price}</BSPrice>
                        {selectedService === s.id && <SelDot><Check size={12} /></SelDot>}
                      </BSServiceCard>
                    ))}
                  </BSServiceGrid>
                  <BookingNav>
                    <div />
                    <BNBtn disabled={!selectedService} onClick={() => setBookingStep(2)}>
                      날짜 선택 →
                    </BNBtn>
                  </BookingNav>
                </BookingStep>
              )}

              {bookingStep === 2 && (
                <BookingStep className="anim-fade">
                  <h3>날짜와 시간을 선택하세요</h3>
                  <DateTimeWrap>
                    <div>
                      <SubTitle>날짜</SubTitle>
                      <DateGrid>
                        {Array.from({ length: 14 }, (_, i) => i + 16).map(d => (
                          <DateCell key={d} $sel={selectedDate === d} $today={d === 16}
                            onClick={() => setSelectedDate(d)}>
                            <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 2 }}>
                              {['일','월','화','수','목','금','토'][(d + 2) % 7]}
                            </div>
                            <div style={{ fontWeight: selectedDate === d ? 700 : 500 }}>{d}</div>
                          </DateCell>
                        ))}
                      </DateGrid>
                    </div>
                    <div>
                      <SubTitle>시간</SubTitle>
                      <TimeGrid>
                        {TIMES.map(t => (
                          <TimeCell key={t} $sel={selectedTime === t} onClick={() => setSelectedTime(t)}>
                            {t}
                          </TimeCell>
                        ))}
                      </TimeGrid>
                    </div>
                  </DateTimeWrap>
                  <BookingNav>
                    <BNBack onClick={() => setBookingStep(1)}><ChevronLeft size={14} /> 이전</BNBack>
                    <BNBtn disabled={!selectedDate || !selectedTime} onClick={() => setBookingStep(3)}>
                      결제로 이동 →
                    </BNBtn>
                  </BookingNav>
                </BookingStep>
              )}

              {bookingStep === 3 && (
                <BookingStep className="anim-fade">
                  <h3>결제 정보 확인</h3>
                  <PaySummary>
                    <PayRow>
                      <span>클래스</span><strong>{svc?.name}</strong>
                    </PayRow>
                    <PayRow>
                      <span>일정</span><strong>3월 {selectedDate}일 {selectedTime}</strong>
                    </PayRow>
                    <PayRow>
                      <span>소요 시간</span><strong>{svc?.duration}</strong>
                    </PayRow>
                    <PayDivider />
                    <PayRow $total>
                      <span>결제 금액</span><strong>{svc?.price}</strong>
                    </PayRow>
                  </PaySummary>
                  <PayMethods>
                    <SubTitle>결제 수단</SubTitle>
                    <PMGrid>
                      {[
                        { label: '카카오페이', bg: '#FEE500', color: '#000', icon: 'K' },
                        { label: '네이버페이', bg: '#03C75A', color: '#fff', icon: 'N' },
                        { label: '신용카드', bg: '#0F2167', color: '#fff', icon: '💳' },
                        { label: '토스페이', bg: '#0064FF', color: '#fff', icon: 'T' },
                      ].map((pm) => (
                        <PMBtn key={pm.label} $bg={pm.bg} $color={pm.color} onClick={handlePay} disabled={paying}>
                          <PMIcon $bg={pm.bg} $color={pm.color}>{pm.icon}</PMIcon>
                          {pm.label}
                        </PMBtn>
                      ))}
                    </PMGrid>
                  </PayMethods>
                  <BookingNav>
                    <BNBack onClick={() => setBookingStep(2)}><ChevronLeft size={14} /> 이전</BNBack>
                    {paying && <PayingIndicator>결제 처리 중...</PayingIndicator>}
                  </BookingNav>
                </BookingStep>
              )}

              {bookingStep === 4 && paid && (
                <BookingStep className="anim-scale" style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <CompleteEmoji>🎉</CompleteEmoji>
                  <h2 style={{ marginBottom: 8 }}>예약이 완료되었습니다!</h2>
                  <p style={{ color: '#64748B', marginBottom: 32 }}>예약 확인 메일을 발송했습니다</p>
                  <CompleteCard>
                    <CompleteRow><span>클래스</span><strong>{svc?.name}</strong></CompleteRow>
                    <CompleteRow><span>일시</span><strong>3월 {selectedDate}일 {selectedTime}</strong></CompleteRow>
                    <CompleteRow><span>결제 금액</span><strong style={{ color: colors.accent }}>{svc?.price}</strong></CompleteRow>
                  </CompleteCard>
                  <CompleteBtns>
                    <CompBtn onClick={() => setActiveTab('mypage')}>예약 확인 →</CompBtn>
                    <CompBtnSec onClick={() => { setActiveTab('home'); setPaid(false); setBookingStep(1); }}>
                      홈으로
                    </CompBtnSec>
                  </CompleteBtns>
                </BookingStep>
              )}
            </BookingWrap>
          )}

          {/* ── MyPage ── */}
          {activeTab === 'mypage' && (
            <BookingWrap>
              <BookingHeader>
                <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#64748B', fontSize: 13 }}>
                  <ChevronLeft size={16} /> 홈으로
                </button>
                <BookingTitle>마이페이지</BookingTitle>
              </BookingHeader>
              <MyPageContent>
                <MyProfile>
                  <MPA>김민지</MPA>
                  <div>
                    <div style={{ fontWeight: 700 }}>김민지 님</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>minji@email.com · VIP 회원</div>
                  </div>
                </MyProfile>
                <SubTitle style={{ marginTop: 24 }}>예약 내역</SubTitle>
                {[
                  { service: '모닝 요가', date: '3월 16일 09:00', status: '예약 확정', price: '₩45,000' },
                  { service: '필라테스 1:1', date: '3월 12일 10:30', status: '완료', price: '₩80,000' },
                  { service: '그룹 피트니스', date: '3월 8일 14:00', status: '완료', price: '₩35,000' },
                ].map((b, i) => (
                  <MyBookingRow key={i}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{b.service}</div>
                      <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{b.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{b.price}</div>
                      <StatusPill $done={b.status === '완료'}>{b.status}</StatusPill>
                    </div>
                  </MyBookingRow>
                ))}
              </MyPageContent>
            </BookingWrap>
          )}
        </SiteWrap>
        {/* ── Chatbot Float Button ── */}
        <ChatFloat>💬</ChatFloat>
      </Browser>
    </Overlay>
  );
};

export default PublicSiteScreen;

/* ─── Keyframes ─── */
const fadeIn = keyframes`from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}`;

/* ─── Styled ─── */
const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 20px;
  animation: ${fadeIn} 0.25s ease both;
`;
const Browser = styled.div`
  width: 100%; max-width: 1040px; height: 90vh;
  background: #fff; border-radius: 14px; overflow: hidden;
  display: flex; flex-direction: column; box-shadow: 0 40px 100px rgba(0,0,0,0.3);
  position: relative;
`;
const BrowserBar = styled.div`
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px; background: #F1F3F4; border-bottom: 1px solid #DDDFE2;
  flex-shrink: 0;
`;
const Dots = styled.div`display: flex; gap: 6px;`;
const Dot = styled.div<{ $color: string }>`width: 12px; height: 12px; border-radius: 50%; background: ${p => p.$color};`;
const AddressBar = styled.div`
  flex: 1; background: #fff; border: 1px solid #DDDFE2; border-radius: 6px;
  padding: 5px 12px; font-size: 12.5px; color: #3C4043;
  display: flex; align-items: center; gap: 6px; max-width: 360px; margin: 0 auto;
`;
const Lock = styled.span`font-size: 11px;`;
const CloseBtn = styled.button`
  background: none; border: none; cursor: pointer; color: #666;
  display: flex; align-items: center; margin-left: auto;
  &:hover { color: #333; }
`;
const SiteWrap = styled.div`flex: 1; overflow-y: auto; background: #fff;`;
const SiteNav = styled.nav`
  display: flex; align-items: center; padding: 14px 40px;
  border-bottom: 1px solid #F1F5F9; gap: 32px;
  position: sticky; top: 0; background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px); z-index: 10;
`;
const SiteLogo = styled.div`font-size: 16px; font-weight: 800; color: ${colors.primary}; white-space: nowrap;`;
const NavLinks = styled.div`
  display: flex; gap: 24px; flex: 1;
  a { font-size: 14px; color: #64748B; text-decoration: none; font-weight: 500; &:hover { color: ${colors.primary}; } }
`;
const NavActions = styled.div`display: flex; gap: 10px;`;
const LoginBtn = styled.button`
  background: none; border: 1px solid #E2E8F0; border-radius: 8px;
  padding: 8px 16px; font-size: 13px; font-weight: 600; color: #64748B;
  cursor: pointer; &:hover { border-color: ${colors.primary}; color: ${colors.primary}; }
`;
const BookNowBtn = styled.button`
  background: ${colors.primary}; color: #fff; border: none;
  border-radius: 8px; padding: 8px 18px; font-size: 13px; font-weight: 700; cursor: pointer;
  &:hover { background: ${colors.primaryLight}; }
`;
const Hero = styled.div`
  display: flex; gap: 0; padding: 60px 40px;
  background: linear-gradient(135deg, ${colors.primary} 0%, #1A3A9C 100%);
  min-height: 420px;
`;
const HeroText = styled.div`flex: 1; color: #fff;`;
const HeroBadge = styled.div`
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.9);
  font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 99px;
  margin-bottom: 20px;
`;
const HeroTitle = styled.h1`font-size: 36px; font-weight: 900; line-height: 1.2; margin-bottom: 16px;`;
const HeroAccent = styled.span`color: ${colors.accent};`;
const HeroDesc = styled.p`font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.6; margin-bottom: 28px;`;
const HeroBtns = styled.div`display: flex; gap: 10px; margin-bottom: 36px;`;
const HeroCTA = styled.button`
  background: ${colors.accent}; color: #fff; border: none;
  border-radius: 10px; padding: 13px 24px; font-size: 14px; font-weight: 700; cursor: pointer;
  &:hover { background: ${colors.accentHover}; }
`;
const HeroSec = styled.button`
  background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.2);
  border-radius: 10px; padding: 13px 24px; font-size: 14px; font-weight: 600; cursor: pointer;
`;
const HeroStats = styled.div`display: flex; gap: 28px;`;
const HeroStat = styled.div`display: flex; flex-direction: column; gap: 2px;
  strong { font-size: 18px; font-weight: 800; color: ${colors.accent}; }
  span { font-size: 12px; color: rgba(255,255,255,0.6); }
`;
const HeroVisual = styled.div`
  width: 360px; display: flex; flex-direction: column; gap: 12px; padding-left: 40px;
`;
const HeroCard = styled.div`
  background: rgba(255,255,255,0.95); border-radius: 12px; padding: 14px 16px;
  display: flex; align-items: center; gap: 12px; box-shadow: ${shadows.md};
`;
const HeroCardIcon = styled.div`font-size: 24px;`;
const HeroCardText = styled.div`flex: 1;`;
const HeroCardBadge = styled.div`
  background: rgba(34,197,94,0.1); color: ${colors.success};
  font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 6px;
`;
const HeroSlide = styled.div`display: flex; flex-direction: column; gap: 8px; max-height: 260px; overflow-y: auto;`;
const SlideCard = styled.div`
  background: rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px;
  display: flex; align-items: center; gap: 10px; cursor: pointer;
  border: 1px solid rgba(255,255,255,0.15); transition: all 0.15s;
  &:hover { background: rgba(255,255,255,0.18); }
`;
const SlideIcon = styled.div`font-size: 20px;`;
const SlideInfo = styled.div`flex: 1;`;
const SlideSlots = styled.div`font-size: 11px; color: ${colors.accent}; font-weight: 700;`;
const Section = styled.div`padding: 48px 40px;`;
const SectionTitle = styled.h2`font-size: 22px; font-weight: 800; color: ${colors.textPrimary}; margin-bottom: 24px;`;
const ServiceGrid = styled.div`display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;`;
const ServiceCard = styled.div`
  border: 1px solid #E2E8F0; border-radius: 14px; padding: 24px 20px;
  text-align: center; cursor: pointer; transition: all 0.15s;
  &:hover { transform: translateY(-4px); box-shadow: ${shadows.md}; border-color: ${colors.accent}; }
`;
const ServiceIcon = styled.div`font-size: 36px; margin-bottom: 12px;`;
const ServiceName = styled.div`font-size: 15px; font-weight: 700; color: ${colors.textPrimary}; margin-bottom: 4px;`;
const ServiceDetail = styled.div`font-size: 12px; color: #94A3B8; margin-bottom: 12px;`;
const ServicePrice = styled.div`font-size: 18px; font-weight: 800; color: ${colors.primary}; margin-bottom: 16px;`;
const ServiceBtn = styled.button`
  width: 100%; background: ${colors.primary}; color: #fff;
  border: none; border-radius: 8px; padding: 10px; font-size: 13px; font-weight: 700; cursor: pointer;
  &:hover { background: ${colors.primaryLight}; }
`;
const ReviewGrid = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;`;
const ReviewCard = styled.div`
  background: #F8FAFC; border-radius: 12px; padding: 20px;
`;
const Stars = styled.div`display: flex; gap: 2px; margin-bottom: 10px;`;
const ReviewText = styled.p`font-size: 13.5px; color: #475569; line-height: 1.5; margin-bottom: 12px;`;
const ReviewMeta = styled.div`font-size: 12px; color: #94A3B8;`;
const SiteFooter = styled.footer`
  background: ${colors.primary}; color: rgba(255,255,255,0.7);
  padding: 28px 40px; font-size: 13px; line-height: 1.8; text-align: center;
`;
const ChatFloat = styled.div`
  position: absolute; bottom: 24px; right: 24px;
  width: 50px; height: 50px; border-radius: 50%;
  background: ${colors.accent}; font-size: 20px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: ${shadows.lg}; cursor: pointer;
  animation: ${keyframes`0%,100%{transform:scale(1)}50%{transform:scale(1.05)}`} 2s ease-in-out infinite;
`;
const BookingWrap = styled.div`max-width: 640px; margin: 0 auto; padding: 32px 20px;`;
const BookingHeader = styled.div`margin-bottom: 28px;`;
const BookingTitle = styled.h2`font-size: 22px; font-weight: 800; color: ${colors.textPrimary}; margin: 12px 0 20px;`;
const BookingSteps = styled.div`display: flex; align-items: center; gap: 4px;`;
const BSStep = styled.div<{ $done: boolean; $active: boolean }>`
  display: flex; align-items: center; gap: 6px; font-size: 12px;
  color: ${p => p.$active ? colors.primary : p.$done ? colors.success : '#94A3B8'};
  font-weight: ${p => p.$active ? 700 : 500};
  &::after { content: '›'; margin-left: 4px; color: #CBD5E1; }
  &:last-child::after { display: none; }
`;
const BSNum = styled.div<{ $done: boolean; $active: boolean }>`
  width: 20px; height: 20px; border-radius: 50%; font-size: 11px;
  display: flex; align-items: center; justify-content: center; font-weight: 700;
  background: ${p => p.$done ? colors.success : p.$active ? colors.primary : '#E2E8F0'};
  color: ${p => p.$done || p.$active ? '#fff' : '#94A3B8'};
`;
const BookingStep = styled.div``;
const BSServiceGrid = styled.div`display: flex; flex-direction: column; gap: 10px; margin: 16px 0;`;
const BSServiceCard = styled.div<{ $sel: boolean }>`
  display: flex; align-items: center; gap: 14px; padding: 16px;
  border: 2px solid ${p => p.$sel ? colors.accent : '#E2E8F0'};
  border-radius: 12px; cursor: pointer; transition: all 0.15s; position: relative;
  background: ${p => p.$sel ? 'rgba(0,201,167,0.04)' : '#fff'};
  &:hover { border-color: ${colors.accent}; }
`;
const BSPrice = styled.div`font-size: 16px; font-weight: 800; color: ${colors.primary}; margin-left: auto;`;
const SelDot = styled.div`
  position: absolute; top: 12px; right: 12px;
  width: 20px; height: 20px; border-radius: 50%;
  background: ${colors.accent}; color: #fff;
  display: flex; align-items: center; justify-content: center;
`;
const BookingNav = styled.div`display: flex; justify-content: space-between; align-items: center; margin-top: 24px;`;
const BNBtn = styled.button`
  background: ${colors.primary}; color: #fff; border: none;
  border-radius: 10px; padding: 12px 24px; font-size: 14px; font-weight: 700; cursor: pointer;
  &:disabled { opacity: 0.4; cursor: not-allowed; }
  &:hover:not(:disabled) { background: ${colors.primaryLight}; }
`;
const BNBack = styled.button`
  display: flex; align-items: center; gap: 4px;
  background: none; border: 1px solid #E2E8F0; color: #64748B;
  border-radius: 10px; padding: 12px 18px; font-size: 13px; cursor: pointer;
  &:hover { border-color: ${colors.primary}; color: ${colors.primary}; }
`;
const DateTimeWrap = styled.div`display: flex; flex-direction: column; gap: 20px; margin: 16px 0;`;
const SubTitle = styled.div`font-size: 13px; font-weight: 700; color: #64748B; margin-bottom: 10px;`;
const DateGrid = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;
const DateCell = styled.div<{ $sel: boolean; $today?: boolean }>`
  width: 52px; height: 52px; border-radius: 10px; text-align: center;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  border: 2px solid ${p => p.$sel ? colors.accent : '#E2E8F0'};
  background: ${p => p.$sel ? 'rgba(0,201,167,0.08)' : '#fff'};
  cursor: pointer; font-size: 14px; font-weight: ${p => p.$sel ? 700 : 500};
  color: ${p => p.$sel ? colors.accent : colors.textPrimary};
  transition: all 0.15s;
`;
const TimeGrid = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;
const TimeCell = styled.div<{ $sel: boolean }>`
  padding: 8px 14px; border-radius: 8px;
  border: 2px solid ${p => p.$sel ? colors.accent : '#E2E8F0'};
  background: ${p => p.$sel ? 'rgba(0,201,167,0.08)' : '#fff'};
  font-size: 13px; font-weight: 600; cursor: pointer;
  color: ${p => p.$sel ? colors.accent : '#64748B'};
  transition: all 0.15s;
`;
const PaySummary = styled.div`
  background: #F8FAFC; border-radius: 12px; padding: 20px; margin: 16px 0;
`;
const PayRow = styled.div<{ $total?: boolean }>`
  display: flex; justify-content: space-between; align-items: center;
  padding: ${p => p.$total ? '14px 0 0' : '6px 0'};
  font-size: ${p => p.$total ? 16 : 14}px;
  font-weight: ${p => p.$total ? 800 : 400};
  color: ${p => p.$total ? colors.textPrimary : '#64748B'};
`;
const PayDivider = styled.div`border-top: 1px solid #E2E8F0; margin: 8px 0;`;
const PayMethods = styled.div`margin: 16px 0;`;
const PMGrid = styled.div`display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 10px;`;
const PMBtn = styled.button<{ $bg: string; $color: string }>`
  display: flex; align-items: center; gap: 10px; padding: 13px 16px;
  background: ${p => p.$bg}; color: ${p => p.$color}; border: none;
  border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer;
  transition: all 0.15s;
  &:hover:not(:disabled) { filter: brightness(0.92); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
const PMIcon = styled.div<{ $bg: string; $color: string }>`
  width: 26px; height: 26px; border-radius: 50%;
  background: rgba(0,0,0,0.12); color: ${p => p.$color};
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 900;
`;
const PayingIndicator = styled.div`
  font-size: 13px; color: ${colors.accent}; font-weight: 600;
  display: flex; align-items: center; gap: 8px;
`;
const CompleteEmoji = styled.div`font-size: 56px; margin-bottom: 12px;`;
const CompleteCard = styled.div`
  background: #F8FAFC; border-radius: 12px; padding: 20px;
  max-width: 320px; margin: 0 auto 24px;
`;
const CompleteRow = styled.div`
  display: flex; justify-content: space-between;
  font-size: 14px; padding: 7px 0; border-bottom: 1px solid #F1F5F9;
  &:last-child { border-bottom: none; }
  span { color: #64748B; } strong { font-weight: 700; }
`;
const CompleteBtns = styled.div`display: flex; gap: 10px; justify-content: center;`;
const CompBtn = styled.button`
  background: ${colors.primary}; color: #fff; border: none;
  border-radius: 10px; padding: 12px 24px; font-size: 14px; font-weight: 700; cursor: pointer;
`;
const CompBtnSec = styled.button`
  background: #F1F5F9; color: #64748B; border: none;
  border-radius: 10px; padding: 12px 24px; font-size: 14px; font-weight: 600; cursor: pointer;
`;
const MyPageContent = styled.div``;
const MyProfile = styled.div`
  display: flex; align-items: center; gap: 14px;
  background: #F8FAFC; border-radius: 12px; padding: 20px;
`;
const MPA = styled.div`
  width: 48px; height: 48px; border-radius: 50%;
  background: ${colors.primary}; color: #fff;
  font-size: 14px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
`;
const MyBookingRow = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 0; border-bottom: 1px solid #F1F5F9;
  &:last-child { border-bottom: none; }
`;
const StatusPill = styled.div<{ $done: boolean }>`
  font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 99px; margin-top: 4px;
  background: ${p => p.$done ? 'rgba(100,116,139,0.1)' : 'rgba(0,201,167,0.1)'};
  color: ${p => p.$done ? '#64748B' : colors.accent};
`;
