import { FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { colors, shadows } from '../design';

interface Props { onSignIn: (type: 'business' | 'customer') => void; }

const SignInScreen: FC<Props> = ({ onSignIn }) => {
  const [email, setEmail] = useState('demo@fitlife.kr');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);
  const [activeSSO, setActiveSSO] = useState<string | null>(null);

  const handleSignIn = async (type: 'business' | 'customer') => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    onSignIn(type);
  };

  const handleSSO = async (provider: string) => {
    setActiveSSO(provider);
    await new Promise(r => setTimeout(r, 800));
    setActiveSSO(null);
    onSignIn('business');
  };

  return (
    <Page>
      <Left>
        <LeftContent>
          <Brand>
            <BrandIcon>R</BrandIcon>
            <BrandName>Ruoom KR</BrandName>
          </Brand>
          <Tagline>
            한국 비즈니스를 위한<br />
            <Highlight>All-in-One 플랫폼</Highlight>
          </Tagline>
          <FeatureList>
            {[
              { icon: '🌐', text: '자동 비즈니스 웹사이트 생성' },
              { icon: '📅', text: '예약 & 캘린더 통합 관리' },
              { icon: '💳', text: '결제 & CRM 원스톱' },
              { icon: '🤖', text: 'AI 기반 온보딩 설정' },
            ].map((f, i) => (
              <FeatureItem key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </FeatureItem>
            ))}
          </FeatureList>
        </LeftContent>
        <FloatingCards>
          <FloatCard style={{ top: '15%', right: '8%' }}>
            <div style={{ fontSize: 20 }}>📈</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>+24%</div>
              <div style={{ fontSize: 11, color: colors.textMuted }}>이번 달 예약</div>
            </div>
          </FloatCard>
          <FloatCard style={{ bottom: '22%', right: '4%' }}>
            <div style={{ fontSize: 20 }}>⭐</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>4.9</div>
              <div style={{ fontSize: 11, color: colors.textMuted }}>고객 평점</div>
            </div>
          </FloatCard>
        </FloatingCards>
      </Left>

      <Right>
        <Card>
          <CardHeader>
            <h2>로그인</h2>
            <p>Ruoom KR 플랫폼에 오신 것을 환영합니다</p>
          </CardHeader>

          <DemoHint>
            🎯 데모 계정: <strong>demo@fitlife.kr</strong> / 아무 비밀번호
          </DemoHint>

          <Form>
            <Label>이메일</Label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일 주소"
            />
            <Label style={{ marginTop: 14 }}>비밀번호</Label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호"
            />

            <SignInBtn
              onClick={() => handleSignIn('business')}
              disabled={loading}
            >
              {loading ? <Spinner /> : '로그인 (사업자)'}
            </SignInBtn>

            <CustomerBtn onClick={() => handleSignIn('customer')}>
              고객으로 접속 →
            </CustomerBtn>
          </Form>

          <Divider><span>또는 소셜 로그인</span></Divider>

          <SSOGroup>
            <SSOBtn
              onClick={() => handleSSO('naver')}
              $bg={colors.naver}
              $color="#fff"
              disabled={!!activeSSO}
            >
              {activeSSO === 'naver' ? <Spinner $light /> : (
                <>
                  <NaverN>N</NaverN>
                  네이버
                </>
              )}
            </SSOBtn>
            <SSOBtn
              onClick={() => handleSSO('kakao')}
              $bg={colors.kakao}
              $color="#000"
              disabled={!!activeSSO}
            >
              {activeSSO === 'kakao' ? <Spinner /> : (
                <>
                  <KakaoIcon>K</KakaoIcon>
                  카카오
                </>
              )}
            </SSOBtn>
            <SSOBtn
              onClick={() => handleSSO('google')}
              $bg="#fff"
              $color="#333"
              $border
              disabled={!!activeSSO}
            >
              {activeSSO === 'google' ? <Spinner /> : (
                <>
                  <GoogleG>G</GoogleG>
                  Google
                </>
              )}
            </SSOBtn>
          </SSOGroup>

          <SignUpRow>
            계정이 없으신가요?&nbsp;
            <a href="#" onClick={e => { e.preventDefault(); onSignIn('business'); }}>
              회원가입
            </a>
          </SignUpRow>
        </Card>
      </Right>
    </Page>
  );
};

export default SignInScreen;

/* ─── Animations ─── */
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
`;
const spin = keyframes`to { transform: rotate(360deg); }`;
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Styled ─── */
const Page = styled.div`
  display: flex; min-height: 100vh;
  font-family: 'Pretendard Variable', sans-serif;
`;
const Left = styled.div`
  flex: 1; background: ${colors.primary};
  display: flex; align-items: center; justify-content: center;
  padding: 60px; position: relative; overflow: hidden;
  &::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 30% 40%, rgba(0,201,167,0.18) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.04) 0%, transparent 50%);
  }
  @media (max-width: 860px) { display: none; }
`;
const LeftContent = styled.div`position: relative; z-index: 1; max-width: 400px;`;
const Brand = styled.div`display: flex; align-items: center; gap: 12px; margin-bottom: 40px;`;
const BrandIcon = styled.div`
  width: 44px; height: 44px; border-radius: 12px;
  background: ${colors.accent}; color: #fff;
  font-weight: 900; font-size: 20px;
  display: flex; align-items: center; justify-content: center;
`;
const BrandName = styled.span`color: #fff; font-size: 22px; font-weight: 700;`;
const Tagline = styled.h1`
  color: #fff; font-size: 38px; font-weight: 800; line-height: 1.2; margin-bottom: 36px;
`;
const Highlight = styled.span`color: ${colors.accent};`;
const FeatureList = styled.div`display: flex; flex-direction: column; gap: 14px;`;
const FeatureItem = styled.div`
  display: flex; align-items: center; gap: 12px;
  color: rgba(255,255,255,0.85); font-size: 15px;
  animation: ${fadeUp} 0.5s ease both;
  span:first-child { font-size: 20px; }
`;
const FloatingCards = styled.div`position: absolute; inset: 0; pointer-events: none;`;
const FloatCard = styled.div`
  position: absolute; background: rgba(255,255,255,0.95);
  border-radius: 12px; padding: 14px 18px;
  display: flex; align-items: center; gap: 12px;
  box-shadow: ${shadows.lg};
  animation: ${float} 4s ease-in-out infinite;
`;
const Right = styled.div`
  width: 480px; display: flex; align-items: center; justify-content: center;
  padding: 40px 48px; background: ${colors.bg};
  @media (max-width: 860px) { width: 100%; }
`;
const Card = styled.div`
  width: 100%; background: ${colors.surface};
  border-radius: 20px; padding: 40px 36px;
  box-shadow: ${shadows.lg};
  animation: ${fadeUp} 0.4s ease both;
`;
const CardHeader = styled.div`
  margin-bottom: 20px;
  h2 { font-size: 26px; font-weight: 800; color: ${colors.textPrimary}; margin-bottom: 6px; }
  p  { font-size: 14px; color: ${colors.textSecondary}; }
`;
const DemoHint = styled.div`
  background: rgba(0,201,167,0.08); border: 1px solid rgba(0,201,167,0.2);
  border-radius: 8px; padding: 10px 14px; font-size: 12.5px;
  color: ${colors.textSecondary}; margin-bottom: 22px;
`;
const Form = styled.div`display: flex; flex-direction: column;`;
const Label = styled.label`
  font-size: 13px; font-weight: 600; color: ${colors.textSecondary}; margin-bottom: 6px;
`;
const Input = styled.input`
  border: 1px solid ${colors.border}; border-radius: 10px;
  padding: 12px 14px; font-size: 14px; color: ${colors.textPrimary};
  outline: none; transition: border 0.15s, box-shadow 0.15s;
  &:focus { border-color: ${colors.accent}; box-shadow: 0 0 0 3px rgba(0,201,167,0.12); }
`;
const SignInBtn = styled.button`
  margin-top: 20px; padding: 14px;
  background: ${colors.primary}; color: #fff;
  border: none; border-radius: 10px;
  font-size: 15px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
  &:hover:not(:disabled) { background: ${colors.primaryLight}; transform: translateY(-1px); box-shadow: ${shadows.md}; }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;
const CustomerBtn = styled.button`
  margin-top: 8px; padding: 10px;
  background: transparent; color: ${colors.textSecondary};
  border: 1px solid ${colors.border}; border-radius: 10px;
  font-size: 13px; transition: all 0.15s;
  &:hover { border-color: ${colors.primary}; color: ${colors.primary}; }
`;
const Divider = styled.div`
  display: flex; align-items: center; gap: 12px;
  margin: 22px 0; color: ${colors.textMuted}; font-size: 12px;
  &::before, &::after { content: ''; flex: 1; border-top: 1px solid ${colors.border}; }
`;
const SSOGroup = styled.div`display: flex; gap: 8px;`;
const SSOBtn = styled.button<{ $bg: string; $color: string; $border?: boolean }>`
  flex: 1; padding: 11px 8px;
  background: ${p => p.$bg}; color: ${p => p.$color};
  border: ${p => p.$border ? `1px solid ${colors.border}` : 'none'};
  border-radius: 10px; font-size: 13px; font-weight: 600;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  transition: all 0.15s;
  &:hover:not(:disabled) { filter: brightness(0.95); transform: translateY(-1px); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
const NaverN = styled.div`
  width: 18px; height: 18px; background: #fff;
  border-radius: 3px; color: ${colors.naver};
  font-weight: 900; font-size: 12px;
  display: flex; align-items: center; justify-content: center;
`;
const KakaoIcon = styled.div`
  width: 18px; height: 18px; background: #000;
  border-radius: 50%; color: ${colors.kakao};
  font-weight: 900; font-size: 12px;
  display: flex; align-items: center; justify-content: center;
`;
const GoogleG = styled.div`
  width: 18px; height: 18px; background: #4285F4;
  border-radius: 50%; color: #fff;
  font-weight: 900; font-size: 11px;
  display: flex; align-items: center; justify-content: center;
`;
const Spinner = styled.div<{ $light?: boolean }>`
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid ${p => p.$light ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'};
  border-top-color: ${p => p.$light ? '#fff' : colors.primary};
  animation: ${spin} 0.7s linear infinite;
`;
const SignUpRow = styled.p`
  text-align: center; font-size: 13px; color: ${colors.textSecondary};
  margin-top: 20px;
  a { color: ${colors.primary}; font-weight: 600; text-decoration: none; &:hover { text-decoration: underline; } }
`;
