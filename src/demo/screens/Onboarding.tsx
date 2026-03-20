import { FC, useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Check, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { colors, shadows } from '../design';
import { BUSINESS_TYPES, TEMPLATES } from '../data/mockData';

interface Props { onComplete: () => void; }
type Step = 1 | 2 | 3 | 4;

interface Message { role: 'bot' | 'user'; text: string; }

/* ── Claude API call (browser-direct) ─────────────────────────── */
async function callClaude(
  apiKey: string,
  messages: { role: 'user' | 'assistant'; content: string }[],
  onChunk: (chunk: string) => void,
): Promise<void> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      stream: true,
      system: `당신은 한국 소상공인의 비즈니스 플랫폼(Ruoom KR) 설정을 돕는 친절한 어시스턴트입니다.
목표: 짧은 대화(최대 5턴)를 통해 아래 정보를 자연스럽게 수집합니다.
- 비즈니스 이름
- 제공 서비스 종류
- 주요 고객층
- 운영 시간
- 주요 서비스 가격대

규칙:
- 한 번에 하나의 질문만 하세요.
- 짧고 친근하게 말하세요 (2~3문장).
- 이모지를 적절히 활용하세요.
- 모든 정보가 수집되면 "모든 정보가 준비됐어요! 🎉 [비즈니스명]에 맞는 최적의 템플릿을 찾아드릴게요." 라고 마무리하세요.
- 마무리 이후 추가 질문은 하지 마세요.`,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || `API Error ${res.status}`);
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') return;
      try {
        const parsed = JSON.parse(data);
        const chunk = parsed.delta?.text ?? '';
        if (chunk) onChunk(chunk);
      } catch { /* ignore parse errors */ }
    }
  }
}

/* ── Main Component ─────────────────────────────────────────────── */
const OnboardingScreen: FC<Props> = ({ onComplete }) => {
  const [step, setStep]                   = useState<Step>(1);
  const [selectedType, setSelectedType]   = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  /* API key — .env의 VITE_ANTHROPIC_API_KEY 사용 */
  const apiKey = (import.meta.env.VITE_ANTHROPIC_API_KEY as string) ?? '';
  const hasKey = apiKey.startsWith('sk-ant-');

  /* chat state */
  const [messages, setMessages]   = useState<Message[]>([]);
  const [apiHistory, setApiHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [chatDone, setChatDone]   = useState(false);
  const [completing, setCompleting] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /* first bot message when entering step 2 */
  useEffect(() => {
    if (step !== 2 || messages.length > 0) return;
    startConversation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const startConversation = useCallback(async () => {
    if (!hasKey) return;
    setIsTyping(true);

    const firstUserMsg = { role: 'user' as const, content: '안녕하세요! 비즈니스 설정을 시작할게요.' };
    const newApiHistory = [firstUserMsg];

    let botText = '';
    try {
      await callClaude(apiKey, newApiHistory, (chunk) => {
        botText += chunk;
        setMessages([{ role: 'bot', text: botText }]);
      });
      setApiHistory([...newApiHistory, { role: 'assistant', content: botText }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setMessages([{ role: 'bot', text: `⚠️ API 오류: ${msg}` }]);
    } finally {
      setIsTyping(false);
    }
  }, [apiKey]);

  const sendMessage = useCallback(async () => {
    const text = userInput.trim();
    if (!text || isTyping || chatDone) return;
    setUserInput('');

    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);

    const newApiHistory: { role: 'user' | 'assistant'; content: string }[] = [
      ...apiHistory,
      { role: 'user', content: text },
    ];

    setIsTyping(true);
    let botText = '';
    const botIdx = messages.length + 1; // index after user msg

    try {
      await callClaude(apiKey, newApiHistory, (chunk) => {
        botText += chunk;
        setMessages(prev => {
          const updated = [...prev];
          if (updated[botIdx]?.role === 'bot') {
            updated[botIdx] = { role: 'bot', text: botText };
          } else {
            updated.push({ role: 'bot', text: botText });
          }
          return updated;
        });
      });

      const finalHistory = [
        ...newApiHistory,
        { role: 'assistant' as const, content: botText },
      ];
      setApiHistory(finalHistory);

      /* detect conversation end */
      if (
        botText.includes('모든 정보가 준비됐어요') ||
        botText.includes('최적의 템플릿을 찾아드릴게요') ||
        finalHistory.filter(m => m.role === 'user').length >= 5
      ) {
        setChatDone(true);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setMessages(prev => [...prev, { role: 'bot', text: `⚠️ 오류: ${msg}` }]);
    } finally {
      setIsTyping(false);
    }
  }, [userInput, isTyping, chatDone, apiKey, apiHistory, messages.length]);

  const handleComplete = async () => {
    setCompleting(true);
    await new Promise(r => setTimeout(r, 1200));
    onComplete();
  };

  const resetChat = () => {
    setMessages([]);
    setApiHistory([]);
    setChatDone(false);
    setUserInput('');
  };

  const stepLabels = ['비즈니스 유형', 'AI 온보딩', '템플릿 선택', '완료'];

  return (
    <Page>
      <Container>
        {/* ── Progress Bar ── */}
        <TopBar>
          <BrandRow>
            <LogoIcon>R</LogoIcon>
            <BrandText>Ruoom KR</BrandText>
          </BrandRow>
          <Steps>
            {stepLabels.map((label, i) => {
              const n = (i + 1) as Step;
              return (
                <StepDot key={i}>
                  <Dot $done={n < step} $active={n === step}>
                    {n < step ? <Check size={13} /> : n}
                  </Dot>
                  <DotLabel $active={n === step}>{label}</DotLabel>
                  {i < stepLabels.length - 1 && <StepLine $done={n < step} />}
                </StepDot>
              );
            })}
          </Steps>
        </TopBar>

        <Body>

          {/* ── Step 1: Business Type ── */}
          {step === 1 && (
            <Panel className="anim-fade">
              <PanelHeader>
                <h2>어떤 비즈니스를 운영하시나요?</h2>
                <p>업종을 선택하면 최적화된 설정이 자동으로 적용됩니다</p>
              </PanelHeader>
              <TypeGrid>
                {BUSINESS_TYPES.map(t => (
                  <TypeCard key={t.id} $selected={selectedType === t.id} onClick={() => setSelectedType(t.id)}>
                    <TypeIcon>{t.icon}</TypeIcon>
                    <TypeLabel>{t.label}</TypeLabel>
                    <TypeDesc>{t.desc}</TypeDesc>
                    {selectedType === t.id && <SelectedBadge><Check size={12} /></SelectedBadge>}
                  </TypeCard>
                ))}
              </TypeGrid>
              <NavRow>
                <div />
                <NextBtn disabled={!selectedType} onClick={() => setStep(2)}>
                  다음 <ChevronRight size={16} />
                </NextBtn>
              </NavRow>
            </Panel>
          )}

          {/* ── Step 2: Claude AI Chat ── */}
          {step === 2 && (
            <Panel className="anim-fade">
              <PanelHeader>
                <AiTitle>
                  <Sparkles size={20} color={colors.accent} />
                  <h2>AI가 비즈니스 설정을 도와드려요</h2>
                </AiTitle>
                <p>몇 가지 질문에 답하면 맞춤 템플릿과 설정이 자동으로 구성됩니다</p>
              </PanelHeader>

              {/* API Key 상태 표시 (키는 .env에서 로드) */}
              {!hasKey ? (
                <EnvKeyError>
                  ⚠️ <strong>VITE_ANTHROPIC_API_KEY</strong>가 설정되지 않았습니다.
                  <br /><code>.env</code> 파일에 키를 추가한 후 개발 서버를 재시작해주세요.
                </EnvKeyError>
              ) : (
                <EnvKeyOk>
                  ✅ Claude API Key 로드됨 &nbsp;
                  {messages.length > 0 && (
                    <ResetBtn onClick={resetChat}>대화 초기화</ResetBtn>
                  )}
                  {messages.length === 0 && (
                    <StartBtn onClick={startConversation} disabled={isTyping}>대화 시작</StartBtn>
                  )}
                </EnvKeyOk>
              )}

              {/* Chat Window */}
              <ChatBox>
                {messages.length === 0 && !isTyping && (
                  <EmptyChat>
                    <span>🤖</span>
                    <p>{hasKey ? '"대화 시작" 버튼을 눌러주세요' : '.env에 API Key를 설정해주세요'}</p>
                  </EmptyChat>
                )}

                {messages.map((m, i) => (
                  <ChatBubble key={i} $role={m.role} className="anim-fade">
                    {m.role === 'bot' && <BotAvatar>AI</BotAvatar>}
                    <Bubble $role={m.role}>{m.text}</Bubble>
                    {m.role === 'user' && <UserAvatar>나</UserAvatar>}
                  </ChatBubble>
                ))}

                {isTyping && (
                  <ChatBubble $role="bot">
                    <BotAvatar>AI</BotAvatar>
                    <TypingDots><span /><span /><span /></TypingDots>
                  </ChatBubble>
                )}
                <div ref={chatEndRef} />
              </ChatBox>

              {/* Input */}
              {!chatDone && messages.length > 0 && (
                <ChatInputRow>
                  <input
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="답변을 입력하세요..."
                    disabled={isTyping}
                  />
                  <SendBtn onClick={sendMessage} disabled={!userInput.trim() || isTyping}>
                    전송 →
                  </SendBtn>
                </ChatInputRow>
              )}

              {chatDone && (
                <DoneRow>
                  <DoneBadge>✅ 정보 수집 완료 — 템플릿을 선택해주세요</DoneBadge>
                </DoneRow>
              )}

              <NavRow>
                <BackBtn onClick={() => { setStep(1); resetChat(); }}>
                  <ChevronLeft size={16} /> 이전
                </BackBtn>
                <NextBtn disabled={!chatDone} onClick={() => setStep(3)}>
                  템플릿 선택 <ChevronRight size={16} />
                </NextBtn>
              </NavRow>
            </Panel>
          )}

          {/* ── Step 3: Template ── */}
          {step === 3 && (
            <Panel className="anim-fade">
              <PanelHeader>
                <h2>웹사이트 템플릿을 선택하세요</h2>
                <p>AI 분석 결과, 헬스/피트니스 업종에 최적화된 템플릿을 추천해드립니다</p>
              </PanelHeader>
              <TemplateGrid>
                {TEMPLATES.map(t => (
                  <TemplateCard key={t.id} $selected={selectedTemplate === t.id} onClick={() => setSelectedTemplate(t.id)}>
                    <TemplatePrev $color={t.color}>
                      <PreviewMockup />
                      {selectedTemplate === t.id && (
                        <SelectedOverlay><Check size={24} color="#fff" /></SelectedOverlay>
                      )}
                    </TemplatePrev>
                    <TemplateInfo>
                      <TemplateTag>{t.tag}</TemplateTag>
                      <TemplateName>{t.name}</TemplateName>
                      <TemplateDesc>{t.desc}</TemplateDesc>
                    </TemplateInfo>
                  </TemplateCard>
                ))}
              </TemplateGrid>
              <NavRow>
                <BackBtn onClick={() => setStep(2)}><ChevronLeft size={16} /> 이전</BackBtn>
                <NextBtn disabled={!selectedTemplate} onClick={() => setStep(4)}>
                  완료하기 <ChevronRight size={16} />
                </NextBtn>
              </NavRow>
            </Panel>
          )}

          {/* ── Step 4: Complete ── */}
          {step === 4 && (
            <CompletePanel className="anim-scale">
              <SuccessRing><SuccessIcon>🎉</SuccessIcon></SuccessRing>
              <h2>모든 설정이 완료됐어요!</h2>
              <p>핏라이프 스튜디오의 비즈니스 플랫폼이 준비되었습니다</p>
              <ResultCards>
                {[
                  { icon: '🌐', label: '웹사이트',    value: 'fitlife.ruoomkr.co.kr' },
                  { icon: '📅', label: '예약 시스템', value: '요가/필라테스 통합' },
                  { icon: '💳', label: '결제 연동',   value: '카카오페이, 신용카드' },
                  { icon: '🤖', label: 'AI 챗봇',    value: 'Channel Talk 준비 완료' },
                ].map((r, i) => (
                  <ResultCard key={i}>
                    <span>{r.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: colors.textSecondary }}>{r.value}</div>
                    </div>
                  </ResultCard>
                ))}
              </ResultCards>
              <DashboardBtn onClick={handleComplete} disabled={completing}>
                {completing ? <><Spin />대시보드 생성 중...</> : <>대시보드로 이동 →</>}
              </DashboardBtn>
            </CompletePanel>
          )}

        </Body>
      </Container>
    </Page>
  );
};

export default OnboardingScreen;

/* ── Keyframes ── */
const spin   = keyframes`to { transform: rotate(360deg); }`;
const bounce = keyframes`0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}`;
const popIn  = keyframes`0%{transform:scale(0);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}`;

/* ── Styled Components ── */
const Page = styled.div`min-height:100vh;background:${colors.bg};display:flex;align-items:flex-start;justify-content:center;padding:40px 20px;`;
const Container = styled.div`width:100%;max-width:860px;`;
const TopBar = styled.div`background:${colors.surface};border-radius:16px;padding:20px 32px;margin-bottom:24px;box-shadow:${shadows.sm};display:flex;align-items:center;justify-content:space-between;`;
const BrandRow = styled.div`display:flex;align-items:center;gap:10px;`;
const LogoIcon = styled.div`width:32px;height:32px;border-radius:8px;background:${colors.primary};color:#fff;font-weight:900;font-size:15px;display:flex;align-items:center;justify-content:center;`;
const BrandText = styled.span`font-weight:700;font-size:15px;color:${colors.primary};`;
const Steps = styled.div`display:flex;align-items:center;`;
const StepDot = styled.div`display:flex;align-items:center;`;
const Dot = styled.div<{$done:boolean;$active:boolean}>`width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;background:${p=>p.$done?colors.accent:p.$active?colors.primary:'#E2E8F0'};color:${p=>p.$done||p.$active?'#fff':colors.textMuted};transition:all 0.3s;flex-shrink:0;`;
const DotLabel = styled.div<{$active:boolean}>`font-size:11px;color:${p=>p.$active?colors.primary:colors.textMuted};font-weight:${p=>p.$active?700:400};margin:0 6px;white-space:nowrap;`;
const StepLine = styled.div<{$done:boolean}>`width:32px;height:2px;background:${p=>p.$done?colors.accent:'#E2E8F0'};transition:all 0.3s;`;
const Body = styled.div``;
const Panel = styled.div`background:${colors.surface};border-radius:16px;padding:36px;box-shadow:${shadows.sm};`;
const PanelHeader = styled.div`margin-bottom:24px;h2{font-size:22px;font-weight:800;color:${colors.textPrimary};margin-bottom:8px;}p{font-size:14px;color:${colors.textSecondary};}`;
const AiTitle = styled.div`display:flex;align-items:center;gap:10px;margin-bottom:8px;`;

/* API Key status */
const EnvKeyError = styled.div`margin-bottom:16px;background:#FEF2F2;border:1px solid #FECACA;border-radius:10px;padding:13px 16px;font-size:13px;color:#991B1B;line-height:1.6;code{background:#FEE2E2;padding:1px 5px;border-radius:4px;font-size:12px;}`;
const EnvKeyOk = styled.div`margin-bottom:16px;background:rgba(0,201,167,0.07);border:1px solid rgba(0,201,167,0.25);border-radius:10px;padding:11px 16px;font-size:13px;font-weight:600;color:${colors.accent};display:flex;align-items:center;gap:10px;`;
const StartBtn = styled.button`background:${colors.accent};color:#fff;border:none;border-radius:8px;padding:7px 16px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;&:hover{background:${colors.accentHover};}&:disabled{opacity:0.5;cursor:not-allowed;}`;
const ResetBtn = styled.button`background:none;color:${colors.textMuted};border:1px solid ${colors.border};border-radius:8px;padding:7px 12px;font-size:12px;cursor:pointer;&:hover{border-color:${colors.danger};color:${colors.danger};}`;

/* Chat */
const ChatBox = styled.div`height:280px;overflow-y:auto;padding:16px;background:${colors.bg};border-radius:12px;margin-bottom:12px;&::-webkit-scrollbar{width:4px;}&::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:2px;}`;
const EmptyChat = styled.div`height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;span{font-size:40px;}p{font-size:13px;color:${colors.textMuted};}`;
const ChatBubble = styled.div<{$role:string}>`display:flex;align-items:flex-end;gap:8px;margin-bottom:12px;flex-direction:${p=>p.$role==='user'?'row-reverse':'row'};`;
const BotAvatar = styled.div`width:30px;height:30px;border-radius:50%;background:${colors.primary};color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;`;
const UserAvatar = styled.div`width:30px;height:30px;border-radius:50%;background:${colors.accent};color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;`;
const Bubble = styled.div<{$role:string}>`max-width:75%;padding:10px 14px;border-radius:14px;font-size:13.5px;line-height:1.5;background:${p=>p.$role==='user'?colors.primary:colors.surface};color:${p=>p.$role==='user'?'#fff':colors.textPrimary};box-shadow:${shadows.sm};white-space:pre-wrap;`;
const TypingDots = styled.div`background:${colors.surface};border-radius:14px;padding:12px 16px;box-shadow:${shadows.sm};display:flex;gap:5px;align-items:center;span{width:7px;height:7px;border-radius:50%;background:${colors.textMuted};animation:${bounce} 1.2s ease-in-out infinite;&:nth-child(2){animation-delay:0.2s;}&:nth-child(3){animation-delay:0.4s;}}`;
const ChatInputRow = styled.div`display:flex;gap:8px;margin-bottom:12px;input{flex:1;border:1px solid ${colors.border};border-radius:10px;padding:11px 14px;font-size:13px;outline:none;font-family:inherit;&:focus{border-color:${colors.accent};}&:disabled{background:${colors.bg};}}`;
const SendBtn = styled.button`background:${colors.accent};color:#fff;border:none;border-radius:10px;padding:11px 18px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;&:hover:not(:disabled){background:${colors.accentHover};}&:disabled{opacity:0.5;cursor:not-allowed;}`;
const DoneRow = styled.div`margin-bottom:12px;`;
const DoneBadge = styled.div`background:rgba(34,197,94,0.1);color:${colors.success};border:1px solid rgba(34,197,94,0.2);border-radius:8px;padding:10px 14px;font-size:13px;font-weight:600;`;

const NavRow = styled.div`display:flex;justify-content:space-between;align-items:center;margin-top:24px;`;
const NextBtn = styled.button`display:flex;align-items:center;gap:6px;background:${colors.primary};color:#fff;border:none;border-radius:10px;padding:12px 22px;font-size:14px;font-weight:700;transition:all 0.15s;cursor:pointer;&:hover:not(:disabled){background:${colors.primaryLight};transform:translateY(-1px);}&:disabled{opacity:0.4;cursor:not-allowed;}`;
const BackBtn = styled.button`display:flex;align-items:center;gap:6px;background:none;color:${colors.textSecondary};border:1px solid ${colors.border};border-radius:10px;padding:12px 18px;font-size:14px;transition:all 0.15s;cursor:pointer;&:hover{border-color:${colors.primary};color:${colors.primary};}`;

/* Type grid */
const TypeGrid = styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;`;
const TypeCard = styled.div<{$selected:boolean}>`border:2px solid ${p=>p.$selected?colors.accent:colors.border};border-radius:12px;padding:18px 14px;text-align:center;cursor:pointer;transition:all 0.15s;position:relative;background:${p=>p.$selected?'rgba(0,201,167,0.05)':colors.surface};&:hover{border-color:${colors.accent};transform:translateY(-2px);box-shadow:${shadows.sm};}`;
const TypeIcon = styled.div`font-size:28px;margin-bottom:8px;`;
const TypeLabel = styled.div`font-size:13px;font-weight:700;color:${colors.textPrimary};margin-bottom:4px;`;
const TypeDesc = styled.div`font-size:11px;color:${colors.textMuted};`;
const SelectedBadge = styled.div`position:absolute;top:8px;right:8px;width:20px;height:20px;border-radius:50%;background:${colors.accent};color:#fff;display:flex;align-items:center;justify-content:center;`;

/* Template grid */
const TemplateGrid = styled.div`display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:28px;`;
const TemplateCard = styled.div<{$selected:boolean}>`border:2px solid ${p=>p.$selected?colors.accent:colors.border};border-radius:12px;overflow:hidden;cursor:pointer;transition:all 0.15s;&:hover{transform:translateY(-3px);box-shadow:${shadows.md};}`;
const TemplatePrev = styled.div<{$color:string}>`height:110px;background:${p=>p.$color};position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;`;
const PreviewMockup = styled.div`width:80%;height:75%;background:rgba(255,255,255,0.12);border-radius:6px;border-top:3px solid rgba(255,255,255,0.3);`;
const SelectedOverlay = styled.div`position:absolute;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;`;
const TemplateInfo = styled.div`padding:12px;`;
const TemplateTag = styled.span`background:rgba(0,201,167,0.1);color:${colors.accent};font-size:10px;font-weight:700;padding:3px 7px;border-radius:4px;text-transform:uppercase;`;
const TemplateName = styled.div`font-size:13px;font-weight:700;margin:6px 0 2px;color:${colors.textPrimary};`;
const TemplateDesc = styled.div`font-size:11px;color:${colors.textMuted};`;

/* Complete */
const CompletePanel = styled.div`background:${colors.surface};border-radius:16px;padding:60px 40px;text-align:center;box-shadow:${shadows.sm};h2{font-size:26px;font-weight:800;margin:20px 0 10px;}p{color:${colors.textSecondary};font-size:15px;margin-bottom:32px;}`;
const SuccessRing = styled.div`width:90px;height:90px;border-radius:50%;background:rgba(0,201,167,0.12);display:flex;align-items:center;justify-content:center;margin:0 auto;animation:${popIn} 0.5s ease both;`;
const SuccessIcon = styled.div`font-size:44px;`;
const ResultCards = styled.div`display:grid;grid-template-columns:repeat(2,1fr);gap:12px;max-width:440px;margin:0 auto 32px;`;
const ResultCard = styled.div`background:${colors.bg};border-radius:10px;padding:14px;display:flex;align-items:center;gap:12px;text-align:left;span{font-size:24px;}`;
const DashboardBtn = styled.button`background:${colors.primary};color:#fff;border:none;border-radius:12px;padding:16px 36px;font-size:16px;font-weight:700;display:inline-flex;align-items:center;gap:10px;cursor:pointer;transition:all 0.15s;&:hover:not(:disabled){background:${colors.primaryLight};transform:translateY(-2px);box-shadow:${shadows.md};}&:disabled{opacity:0.8;cursor:not-allowed;}`;
const Spin = styled.div`width:18px;height:18px;border-radius:50%;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;animation:${spin} 0.7s linear infinite;`;