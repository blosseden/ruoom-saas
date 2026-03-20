import { FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Plus, ChevronLeft, ChevronRight, X, Send, MessageCircle } from 'lucide-react';
import { colors, shadows } from '../design';
import { DEMO_CALENDARS, DEMO_CALENDAR_EVENTS, DEMO_CHAT_MESSAGES } from '../data/mockData';

interface Props { onNavigate: (screen: string) => void; }

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

const CalendarScreen: FC<Props> = ({ onNavigate }) => {
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>(
    DEMO_CALENDARS.map(c => c.id)
  );
  const [selectedEvent, setSelectedEvent] = useState<typeof DEMO_CALENDAR_EVENTS[0] | null>(null);
  const [chatMessages, setChatMessages] = useState(DEMO_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [view, setView] = useState<'month' | 'week' | 'list'>('month');

  const today = new Date(2026, 2, 16); // March 16, 2026
  const year = today.getFullYear();
  const month = today.getMonth();

  // Build calendar grid
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return DEMO_CALENDAR_EVENTS.filter(e =>
      e.date === dateStr && selectedCalendars.includes(e.calendarId)
    );
  };

  const getCalendar = (id: string) => DEMO_CALENDARS.find(c => c.id === id)!;

  const toggleCalendar = (id: string) => {
    setSelectedCalendars(p =>
      p.includes(id) ? p.filter(c => c !== id) : [...p, id]
    );
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages(p => [...p, {
      id: p.length + 1, sender: 'business', name: '핏라이프',
      text: chatInput.trim(), time: new Date().toTimeString().slice(0, 5),
    }]);
    setChatInput('');
  };

  const statusLabel: Record<string, string> = {
    confirmed: '확정', pending: '대기', full: '마감',
  };
  const statusColor: Record<string, string> = {
    confirmed: colors.success, pending: colors.warning, full: colors.danger,
  };

  return (
    <Layout>
      {/* ── Sidebar ── */}
      <Sidebar>
        <SidebarHeader>
          <AddBtn>
            <Plus size={15} /> 새 일정
          </AddBtn>
        </SidebarHeader>

        <MiniCalHeader>
          <MiniNavBtn><ChevronLeft size={14} /></MiniNavBtn>
          <span style={{ fontWeight: 700, fontSize: 13 }}>{year}년 {MONTHS[month]}</span>
          <MiniNavBtn><ChevronRight size={14} /></MiniNavBtn>
        </MiniCalHeader>
        <MiniCalGrid>
          {DAYS.map(d => <MiniDayLabel key={d}>{d}</MiniDayLabel>)}
          {cells.map((day, i) => (
            <MiniCell key={i} $today={day === today.getDate()} $empty={!day}>
              {day}
            </MiniCell>
          ))}
        </MiniCalGrid>

        <CalendarList>
          <CalListTitle>내 캘린더</CalListTitle>
          {DEMO_CALENDARS.map(cal => (
            <CalItem key={cal.id} onClick={() => toggleCalendar(cal.id)}>
              <CalDot $color={cal.color} $active={selectedCalendars.includes(cal.id)} />
              <CalName>{cal.name}</CalName>
              <CalCount>{cal.events}</CalCount>
            </CalItem>
          ))}
        </CalendarList>
      </Sidebar>

      {/* ── Main ── */}
      <Main>
        <CalHeader>
          <CalTitle>
            <button><ChevronLeft size={18} /></button>
            <span>{year}년 {MONTHS[month]}</span>
            <button><ChevronRight size={18} /></button>
            <TodayBtn>오늘</TodayBtn>
          </CalTitle>
          <ViewToggle>
            {(['month', 'week', 'list'] as const).map(v => (
              <ViewBtn key={v} $active={view === v} onClick={() => setView(v)}>
                {{ month: '월', week: '주', list: '목록' }[v]}
              </ViewBtn>
            ))}
          </ViewToggle>
        </CalHeader>

        {view === 'month' && (
          <CalGrid>
            {DAYS.map(d => <DayHeader key={d}>{d}</DayHeader>)}
            {cells.map((day, i) => {
              const events = day ? getEventsForDay(day) : [];
              return (
                <Cell key={i} $today={day === today.getDate()} $empty={!day}>
                  {day && <CellDay $today={day === today.getDate()}>{day}</CellDay>}
                  {events.slice(0, 3).map(evt => {
                    const cal = getCalendar(evt.calendarId);
                    return (
                      <EventChip
                        key={evt.id}
                        $color={cal.color}
                        onClick={() => setSelectedEvent(evt)}
                      >
                        {evt.title}
                      </EventChip>
                    );
                  })}
                  {events.length > 3 && (
                    <MoreEvt>+{events.length - 3}개</MoreEvt>
                  )}
                </Cell>
              );
            })}
          </CalGrid>
        )}

        {view === 'list' && (
          <ListView>
            {DEMO_CALENDAR_EVENTS
              .filter(e => selectedCalendars.includes(e.calendarId))
              .map(evt => {
                const cal = getCalendar(evt.calendarId);
                return (
                  <ListRow key={evt.id} onClick={() => setSelectedEvent(evt)}>
                    <ListColor $color={cal.color} />
                    <ListContent>
                      <ListTitle>{evt.title}</ListTitle>
                      <ListMeta>{evt.date} · {evt.time} · {evt.attendees}/{evt.maxAttendees}명</ListMeta>
                    </ListContent>
                    <StatusBadge $color={statusColor[evt.status]}>
                      {statusLabel[evt.status]}
                    </StatusBadge>
                  </ListRow>
                );
              })
            }
          </ListView>
        )}
      </Main>

      {/* ── Chat Panel ── */}
      {selectedEvent && (
        <ChatPanel className="anim-slide">
          <ChatPanelHeader>
            <div>
              <EventTitle>{selectedEvent.title}</EventTitle>
              <EventMeta>
                {selectedEvent.time} · {selectedEvent.attendees}/{selectedEvent.maxAttendees}명
                &nbsp;
                <StatusBadge $color={statusColor[selectedEvent.status]}>
                  {statusLabel[selectedEvent.status]}
                </StatusBadge>
              </EventMeta>
            </div>
            <CloseBtn onClick={() => setSelectedEvent(null)}>
              <X size={18} />
            </CloseBtn>
          </ChatPanelHeader>

          <ChatPanelBody>
            <ChatLabel><MessageCircle size={13} /> 예약 채팅</ChatLabel>
            {chatMessages.map(m => (
              <ChatBubble key={m.id} $mine={m.sender === 'business'}>
                {m.sender !== 'business' && <CBAvatar>{m.name[0]}</CBAvatar>}
                <CBContent>
                  {m.sender !== 'business' && <CBName>{m.name}</CBName>}
                  <CBText $mine={m.sender === 'business'}>{m.text}</CBText>
                  <CBTime>{m.time}</CBTime>
                </CBContent>
              </ChatBubble>
            ))}
          </ChatPanelBody>

          <ChatInputRow>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="메시지 입력..."
            />
            <SendBtn onClick={sendMessage}><Send size={15} /></SendBtn>
          </ChatInputRow>
        </ChatPanel>
      )}
    </Layout>
  );
};

export default CalendarScreen;

/* ─── Keyframes ─── */
const slideIn = keyframes`from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}`;

/* ─── Styled ─── */
const Layout = styled.div`display:flex;height:100%;gap:0;position:relative;`;
const Sidebar = styled.div`
  width: 220px; flex-shrink: 0; border-right: 1px solid ${colors.border};
  padding: 0 0 0 0; overflow-y: auto; background: ${colors.surface};
  border-radius: 14px; margin-right: 16px;
`;
const SidebarHeader = styled.div`padding: 16px;`;
const AddBtn = styled.button`
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;
  background: ${colors.primary}; color: #fff; border: none; border-radius: 10px;
  padding: 10px; font-size: 13px; font-weight: 700;
  &:hover { background: ${colors.primaryLight}; }
`;
const MiniCalHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 16px; font-size: 13px;
`;
const MiniNavBtn = styled.button`
  background: none; border: none; color: ${colors.textMuted}; cursor: pointer;
  display: flex; align-items: center; padding: 2px;
  &:hover { color: ${colors.primary}; }
`;
const MiniCalGrid = styled.div`
  display: grid; grid-template-columns: repeat(7, 1fr);
  padding: 0 10px 12px; gap: 2px;
`;
const MiniDayLabel = styled.div`
  text-align: center; font-size: 10px; color: ${colors.textMuted};
  font-weight: 600; padding: 4px 0;
`;
const MiniCell = styled.div<{ $today?: boolean; $empty?: boolean }>`
  text-align: center; font-size: 11px; padding: 4px 2px;
  border-radius: 50%; cursor: pointer;
  background: ${p => p.$today ? colors.primary : 'none'};
  color: ${p => p.$today ? '#fff' : p.$empty ? 'transparent' : colors.textSecondary};
  &:hover { background: ${p => p.$today ? colors.primary : colors.bg}; }
`;
const CalendarList = styled.div`padding: 12px 16px;`;
const CalListTitle = styled.div`font-size: 11px; font-weight: 700; color: ${colors.textMuted}; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em;`;
const CalItem = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: 7px 0; cursor: pointer;
  &:hover { opacity: 0.8; }
`;
const CalDot = styled.div<{ $color: string; $active: boolean }>`
  width: 12px; height: 12px; border-radius: 3px;
  background: ${p => p.$active ? p.$color : '#E2E8F0'};
  flex-shrink: 0;
`;
const CalName = styled.div`font-size: 12.5px; color: ${colors.textSecondary}; flex: 1;`;
const CalCount = styled.div`font-size: 11px; color: ${colors.textMuted}; background: ${colors.bg}; padding: 1px 6px; border-radius: 99px;`;
const Main = styled.div`flex: 1; background: ${colors.surface}; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column;`;
const CalHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid ${colors.border};
`;
const CalTitle = styled.div`
  display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 700;
  button { background: none; border: none; cursor: pointer; color: ${colors.textMuted}; display:flex;align-items:center; padding:4px; border-radius:6px; &:hover{background:${colors.bg}; } }
`;
const TodayBtn = styled.button`
  background: ${colors.bg}; border: 1px solid ${colors.border}; color: ${colors.textSecondary};
  border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600;
  cursor: pointer; &:hover { border-color: ${colors.primary}; color: ${colors.primary}; }
`;
const ViewToggle = styled.div`display: flex; background: ${colors.bg}; border-radius: 8px; padding: 3px;`;
const ViewBtn = styled.button<{ $active: boolean }>`
  padding: 5px 14px; border-radius: 6px; border: none; font-size: 13px; font-weight: 600; cursor: pointer;
  background: ${p => p.$active ? colors.surface : 'none'};
  color: ${p => p.$active ? colors.primary : colors.textMuted};
  box-shadow: ${p => p.$active ? shadows.sm : 'none'};
`;
const CalGrid = styled.div`
  display: grid; grid-template-columns: repeat(7, 1fr);
  flex: 1; overflow: auto;
`;
const DayHeader = styled.div`
  text-align: center; font-size: 12px; font-weight: 700; color: ${colors.textMuted};
  padding: 10px 0; border-bottom: 1px solid ${colors.border};
  background: ${colors.bg};
`;
const Cell = styled.div<{ $today?: boolean; $empty?: boolean }>`
  min-height: 90px; padding: 6px; border-right: 1px solid ${colors.border};
  border-bottom: 1px solid ${colors.border};
  background: ${p => p.$today ? 'rgba(0,201,167,0.03)' : 'transparent'};
  &:nth-child(7n) { border-right: none; }
`;
const CellDay = styled.div<{ $today?: boolean }>`
  font-size: 12px; font-weight: ${p => p.$today ? 800 : 500};
  color: ${p => p.$today ? colors.accent : colors.textSecondary};
  margin-bottom: 4px;
  ${p => p.$today && `
    width: 22px; height: 22px; border-radius: 50%;
    background: ${colors.accent}; color: #fff;
    display: flex; align-items: center; justify-content: center;
  `}
`;
const EventChip = styled.div<{ $color: string }>`
  font-size: 11px; padding: 2px 6px; border-radius: 4px; margin-bottom: 2px;
  background: ${p => p.$color}22; color: ${p => p.$color};
  font-weight: 600; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  &:hover { background: ${p => p.$color}44; }
`;
const MoreEvt = styled.div`font-size: 10px; color: ${colors.textMuted}; padding-left: 2px;`;
const ListView = styled.div`padding: 16px; display: flex; flex-direction: column; gap: 8px; overflow-y: auto;`;
const ListRow = styled.div`
  display: flex; align-items: center; gap: 12px;
  padding: 14px; background: ${colors.bg}; border-radius: 10px;
  cursor: pointer; transition: all 0.15s;
  &:hover { background: rgba(0,201,167,0.06); transform: translateX(4px); }
`;
const ListColor = styled.div<{ $color: string }>`width: 4px; height: 36px; border-radius: 2px; background: ${p => p.$color};`;
const ListContent = styled.div`flex: 1;`;
const ListTitle = styled.div`font-size: 14px; font-weight: 600; color: ${colors.textPrimary};`;
const ListMeta = styled.div`font-size: 12px; color: ${colors.textMuted}; margin-top: 3px;`;
const StatusBadge = styled.span<{ $color: string }>`
  font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 99px;
  background: ${p => p.$color}18; color: ${p => p.$color};
`;
const ChatPanel = styled.div`
  width: 300px; flex-shrink: 0; background: ${colors.surface};
  border-radius: 14px; margin-left: 16px;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: ${shadows.md};
  animation: ${slideIn} 0.25s ease both;
`;
const ChatPanelHeader = styled.div`
  padding: 16px; border-bottom: 1px solid ${colors.border};
  display: flex; justify-content: space-between; align-items: flex-start;
`;
const EventTitle = styled.div`font-size: 15px; font-weight: 700; color: ${colors.textPrimary};`;
const EventMeta = styled.div`font-size: 12px; color: ${colors.textMuted}; margin-top: 4px; display: flex; align-items: center; gap: 4px;`;
const CloseBtn = styled.button`
  background: none; border: none; color: ${colors.textMuted}; cursor: pointer;
  display: flex; align-items: center; padding: 4px; border-radius: 6px;
  &:hover { background: ${colors.bg}; color: ${colors.textPrimary}; }
`;
const ChatPanelBody = styled.div`flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;`;
const ChatLabel = styled.div`
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700; color: ${colors.textMuted}; text-transform: uppercase; letter-spacing: 0.05em;
  margin-bottom: 4px;
`;
const ChatBubble = styled.div<{ $mine?: boolean }>`
  display: flex; align-items: flex-start; gap: 8px;
  flex-direction: ${p => p.$mine ? 'row-reverse' : 'row'};
`;
const CBAvatar = styled.div`
  width: 28px; height: 28px; border-radius: 50%;
  background: ${colors.primary}; color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
`;
const CBContent = styled.div``;
const CBName = styled.div`font-size: 11px; color: ${colors.textMuted}; margin-bottom: 3px;`;
const CBText = styled.div<{ $mine?: boolean }>`
  font-size: 13px; padding: 9px 12px; border-radius: 12px; max-width: 200px;
  background: ${p => p.$mine ? colors.primary : colors.bg};
  color: ${p => p.$mine ? '#fff' : colors.textPrimary};
  line-height: 1.4;
`;
const CBTime = styled.div`font-size: 10px; color: ${colors.textMuted}; margin-top: 3px;`;
const ChatInputRow = styled.div`
  padding: 12px; border-top: 1px solid ${colors.border};
  display: flex; gap: 8px;
  input {
    flex: 1; border: 1px solid ${colors.border}; border-radius: 8px;
    padding: 8px 12px; font-size: 13px; outline: none;
    &:focus { border-color: ${colors.accent}; }
  }
`;
const SendBtn = styled.button`
  background: ${colors.primary}; color: #fff; border: none;
  border-radius: 8px; padding: 8px 12px; display: flex; align-items: center;
  &:hover { background: ${colors.primaryLight}; }
`;
