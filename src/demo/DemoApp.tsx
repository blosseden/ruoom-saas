import { FC, useState, useCallback, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import styled, { keyframes } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { globalCSS, colors, shadows } from './design';
import BusinessLayout from './components/BusinessLayout';
import SignInScreen from './screens/SignIn';
import OnboardingScreen from './screens/Onboarding';
import DashboardScreen from './screens/Dashboard';
import CalendarScreen from './screens/Calendar';
import CustomersScreen from './screens/Customers';
import PublicSiteScreen from './screens/PublicSite';

const GlobalStyle = createGlobalStyle`${globalCSS}`;

type AppScreen =
  | 'signin' | 'onboarding'
  | 'dashboard' | 'calendar' | 'customers'
  | 'staff' | 'payments' | 'analytics'
  | 'website' | 'chatbot' | 'integrations' | 'settings';

const TOUR_STEPS = [
  { screen: 'signin',     label: '① 로그인',        desc: 'Naver · Kakao · Google SSO' },
  { screen: 'onboarding', label: '② AI 온보딩',     desc: 'AI 대화형 비즈니스 설정' },
  { screen: 'dashboard',  label: '③ 대시보드',      desc: 'Drag & Drop CRM 위젯' },
  { screen: 'calendar',   label: '④ 캘린더',        desc: '다중 캘린더 + 예약 채팅' },
  { screen: 'customers',  label: '⑤ 고객 관리',     desc: 'CRM + VIP 등급' },
  { screen: 'public',     label: '⑥ 퍼블릭 사이트', desc: '자동생성 + 예약·결제' },
];

const DemoApp: FC = () => {
  const [history, setHistory]           = useState<AppScreen[]>(['signin']);
  const [showPublic, setShowPublic]     = useState(false);
  const [tourOpen, setTourOpen]         = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const screen = history[history.length - 1];

  /* ── navigate: push to history stack ── */
  const navigate = useCallback((s: string) => {
    // 'public' & 'website' 모두 퍼블릭 사이트 오픈
    if (s === 'public' || s === 'website') {
      setShowPublic(true);
      return;
    }
    const next = s as AppScreen;
    setHistory(prev => {
      if (prev[prev.length - 1] === next) return prev;
      return [...prev, next];
    });
  }, []);

  /* ── goBack: pop history stack ── */
  const goBack = useCallback(() => {
    if (showPublic) { setShowPublic(false); return; }
    setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }, [showPublic]);

  const canGoBack = showPublic || history.length > 1;

  /* ── tour panel navigation ── */
  const tourNavigate = (s: string) => {
    if (s === 'public' || s === 'website') { setShowPublic(true); return; }
    if (!hasOnboarded && s !== 'signin' && s !== 'onboarding') setHasOnboarded(true);
    const next = s as AppScreen;
    setHistory(prev => {
      if (prev[prev.length - 1] === next) return prev;
      return [...prev, next];
    });
  };

  const handleSignIn = (type: 'business' | 'customer') => {
    if (type === 'business') navigate('onboarding');
    else { setHasOnboarded(true); setShowPublic(true); }
  };

  const handleOnboardingComplete = () => {
    setHasOnboarded(true);
    navigate('dashboard');
  };

  /* 'website' screen이 히스토리에 쌓인 경우 즉시 퍼블릭 전환 */
  useEffect(() => {
    if (screen === 'website' && !showPublic) {
      setShowPublic(true);
      setHistory(prev => prev.slice(0, -1)); // 'website' 항목 제거
    }
  }, [screen, showPublic]);

  const isAuthScreen = !hasOnboarded;
  const showLayout   = hasOnboarded && !showPublic;

  return (
    <>
      <GlobalStyle />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      {/* ── Tour Panel ── */}
      {tourOpen ? (
        <TourPanel>
          <TourHeader>
            <TourBrand>🎯 데모 시나리오</TourBrand>
            <TourSub>투자자 발표 · End-to-End</TourSub>
            <TourClose onClick={() => setTourOpen(false)}>✕</TourClose>
          </TourHeader>
          {TOUR_STEPS.map((step, i) => {
            const isCurrent = step.screen === screen || (step.screen === 'public' && showPublic);
            return (
              <TourStep key={i} $active={isCurrent} onClick={() => tourNavigate(step.screen)}>
                <TourDot $active={isCurrent} />
                <TourInfo>
                  <TourLabel $active={isCurrent}>{step.label}</TourLabel>
                  <TourDesc>{step.desc}</TourDesc>
                </TourInfo>
              </TourStep>
            );
          })}
          <TourFooter>
            <TourFooterTitle>강조 포인트</TourFooterTitle>
            <TourTags>
              <TourTag>AI 온보딩</TourTag>
              <TourTag>웹사이트 자동생성</TourTag>
              <TourTag>예약·결제</TourTag>
            </TourTags>
          </TourFooter>
        </TourPanel>
      ) : (
        <TourToggle onClick={() => setTourOpen(true)}>🎯</TourToggle>
      )}

      {/* ── Public Site Overlay ── */}
      {showPublic && (
        <PublicSiteScreen onBack={() => setShowPublic(false)} />
      )}

      {/* ── Business Layout ── */}
      {showLayout && (
        <BusinessLayout
          currentScreen={screen}
          onNavigate={navigate}
          onBack={goBack}
          canGoBack={canGoBack}
        >
          <ScreenRenderer screen={screen} onNavigate={navigate} />
        </BusinessLayout>
      )}

      {/* ── Auth Screens ── */}
      {isAuthScreen && !showPublic && (
        <>
          {screen === 'signin'     && <SignInScreen onSignIn={handleSignIn} />}
          {screen === 'onboarding' && <OnboardingScreen onComplete={handleOnboardingComplete} />}
        </>
      )}
    </>
  );
};

/* ── Screen Renderer (side-effect 없이 순수하게 렌더만) ── */
const ScreenRenderer: FC<{
  screen: AppScreen;
  onNavigate: (s: string) => void;
}> = ({ screen, onNavigate }) => {
  switch (screen) {
    case 'dashboard':  return <DashboardScreen onNavigate={onNavigate} />;
    case 'calendar':   return <CalendarScreen onNavigate={onNavigate} />;
    case 'customers':  return <CustomersScreen />;
    default:           return <PlaceholderScreen name={screen} onNavigate={onNavigate} />;
  }
};

const PlaceholderScreen: FC<{ name: string; onNavigate: (s: string) => void }> = ({ name, onNavigate }) => {
  const labels: Record<string,string> = {
    staff:'직원 관리', payments:'결제', analytics:'분석',
    chatbot:'챗봇', integrations:'인테그레이션', settings:'설정',
  };
  const icons: Record<string,string> = {
    staff:'👤', payments:'💳', analytics:'📊',
    chatbot:'🤖', integrations:'🔗', settings:'⚙️',
  };
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:16, paddingTop:80 }}>
      <div style={{ fontSize:56 }}>{icons[name] || '🚧'}</div>
      <h2 style={{ fontSize:20, fontWeight:800, color:'#0D1421' }}>{labels[name] || name}</h2>
      <p style={{ fontSize:14, color:'#64748B', textAlign:'center', maxWidth:320 }}>
        이 화면은 데모 버전에서 준비 중입니다.<br />핵심 기능은 대시보드와 캘린더에서 확인하세요.
      </p>
      <button
        onClick={() => onNavigate('dashboard')}
        style={{ background:'#0F2167', color:'#fff', border:'none', borderRadius:10, padding:'12px 24px', fontFamily:'inherit', fontSize:14, fontWeight:700, cursor:'pointer', marginTop:8 }}
      >
        대시보드로 이동 →
      </button>
    </div>
  );
};

export default DemoApp;

/* ── Tour Styled Components ── */
const slideIn = keyframes`from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}`;

const TourPanel = styled.div`
  position:fixed;top:16px;left:16px;z-index:9999;
  width:220px;background:${colors.primary};
  border-radius:16px;padding:18px 16px;
  box-shadow:${shadows.xl};
  animation:${slideIn} 0.3s ease both;
`;
const TourHeader       = styled.div`margin-bottom:16px;position:relative;`;
const TourBrand        = styled.div`font-size:13px;font-weight:800;color:#fff;margin-bottom:3px;`;
const TourSub          = styled.div`font-size:10px;color:rgba(255,255,255,0.5);`;
const TourClose        = styled.button`position:absolute;top:0;right:0;background:rgba(255,255,255,0.1);border:none;border-radius:6px;color:rgba(255,255,255,0.6);font-size:12px;cursor:pointer;width:22px;height:22px;display:flex;align-items:center;justify-content:center;&:hover{background:rgba(255,255,255,0.2);color:#fff;}`;
const TourStep         = styled.div<{$active:boolean}>`display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;margin-bottom:3px;background:${p=>p.$active?'rgba(255,255,255,0.12)':'transparent'};transition:background 0.15s;&:hover{background:rgba(255,255,255,0.08);}`;
const TourDot          = styled.div<{$active:boolean}>`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${p=>p.$active?colors.accent:'rgba(255,255,255,0.2)'};transition:background 0.2s;`;
const TourInfo         = styled.div``;
const TourLabel        = styled.div<{$active:boolean}>`font-size:12px;font-weight:${p=>p.$active?700:500};color:${p=>p.$active?'#fff':'rgba(255,255,255,0.65)'};`;
const TourDesc         = styled.div`font-size:10px;color:rgba(255,255,255,0.4);margin-top:1px;`;
const TourFooter       = styled.div`margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.1);`;
const TourFooterTitle  = styled.div`font-size:10px;font-weight:700;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;`;
const TourTags         = styled.div`display:flex;flex-direction:column;gap:5px;`;
const TourTag          = styled.div`font-size:11px;color:${colors.accent};font-weight:600;background:rgba(0,201,167,0.12);border-radius:5px;padding:4px 8px;`;
const TourToggle       = styled.button`position:fixed;top:16px;left:16px;z-index:9999;width:44px;height:44px;border-radius:12px;background:${colors.primary};border:none;font-size:20px;box-shadow:${shadows.md};cursor:pointer;&:hover{transform:scale(1.08);}`;