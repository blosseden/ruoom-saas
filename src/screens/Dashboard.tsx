import { FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  DndContext, closestCenter, DragEndEvent,
  useSensor, useSensors, PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext, rectSortingStrategy,
  arrayMove, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, TrendingUp, TrendingDown, ExternalLink, Plus } from 'lucide-react';
import { colors, shadows } from '../design';
import {
  DEMO_STATS, DEMO_BOOKINGS, DEMO_SCHEDULE, DEMO_ACTIVITY
} from '../data/mockData';

interface Props {
  onNavigate: (screen: string) => void;
}

type WidgetId =
  | 'stats' | 'recentBookings' | 'schedule' | 'activity'
  | 'quickActions' | 'revenueChart';

interface Widget { id: WidgetId; label: string; span?: 'full' | 'half'; }

const DEFAULT_WIDGETS: Widget[] = [
  { id: 'stats', label: '핵심 지표', span: 'full' },
  { id: 'recentBookings', label: '최근 예약', span: 'half' },
  { id: 'schedule', label: "오늘 스케줄", span: 'half' },
  { id: 'revenueChart', label: '매출 현황', span: 'half' },
  { id: 'activity', label: '최근 활동', span: 'half' },
  { id: 'quickActions', label: '빠른 메뉴', span: 'full' },
];

const statusColor: Record<string, string> = {
  confirmed: colors.success,
  pending: colors.warning,
};
const statusLabel: Record<string, string> = { confirmed: '확정', pending: '대기' };

/* ── Sortable Widget Wrapper ── */
const SortableWidget: FC<{
  widget: Widget;
  children: React.ReactNode;
}> = ({ widget, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: widget.id });
  return (
    <WidgetBox
      ref={setNodeRef}
      $span={widget.span}
      $dragging={isDragging}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <WidgetHandle {...attributes} {...listeners}>
        <GripVertical size={14} color={colors.textMuted} />
      </WidgetHandle>
      {children}
    </WidgetBox>
  );
};

const DashboardScreen: FC<Props> = ({ onNavigate }) => {
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS);
  const [showAddHint, setShowAddHint] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const oldIdx = widgets.findIndex(w => w.id === active.id);
      const newIdx = widgets.findIndex(w => w.id === over.id);
      setWidgets(arrayMove(widgets, oldIdx, newIdx));
    }
  };

  const today = new Date().toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Simple sparkline bars
  const revenueData = [58, 73, 61, 88, 76, 95, 82, 110, 98, 115, 104, 128];
  const maxRev = Math.max(...revenueData);

  const renderWidget = (widget: Widget) => {
    switch (widget.id) {
      /* ── Stats ── */
      case 'stats':
        return (
          <WidgetContent>
            <WidgetTitle>핵심 지표</WidgetTitle>
            <StatsGrid>
              {DEMO_STATS.map((s, i) => (
                <StatCard key={i} onClick={() => onNavigate(s.route)} className="anim-fade"
                  style={{ animationDelay: `${i * 0.08}s` }}>
                  <StatIcon>{s.icon}</StatIcon>
                  <StatValue>{s.value}</StatValue>
                  <StatLabel>{s.label}</StatLabel>
                  <StatChange $up={s.trend === 'up'}>
                    {s.trend === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {s.change}
                  </StatChange>
                </StatCard>
              ))}
            </StatsGrid>
          </WidgetContent>
        );

      /* ── Recent Bookings ── */
      case 'recentBookings':
        return (
          <WidgetContent>
            <WidgetTitleRow>
              <WidgetTitle>오늘 예약</WidgetTitle>
              <ViewAll onClick={() => onNavigate('calendar')}>전체 보기 <ExternalLink size={11} /></ViewAll>
            </WidgetTitleRow>
            <BookingList>
              {DEMO_BOOKINGS.map(b => (
                <BookingRow key={b.id}>
                  <BookingAvatar>{b.avatar}</BookingAvatar>
                  <BookingInfo>
                    <BookingName>{b.name}</BookingName>
                    <BookingService>{b.service}</BookingService>
                  </BookingInfo>
                  <BookingMeta>
                    <BookingTime>{b.time}</BookingTime>
                    <StatusBadge $color={statusColor[b.status]}>{statusLabel[b.status]}</StatusBadge>
                  </BookingMeta>
                </BookingRow>
              ))}
            </BookingList>
          </WidgetContent>
        );

      /* ── Schedule ── */
      case 'schedule':
        return (
          <WidgetContent>
            <WidgetTitleRow>
              <WidgetTitle>오늘 스케줄</WidgetTitle>
              <ViewAll onClick={() => onNavigate('calendar')}>캘린더 <ExternalLink size={11} /></ViewAll>
            </WidgetTitleRow>
            <ScheduleList>
              {DEMO_SCHEDULE.map((s, i) => (
                <ScheduleRow key={i}>
                  <ScheduleBar $color={s.color} />
                  <ScheduleContent>
                    <ScheduleName>{s.title}</ScheduleName>
                    <ScheduleMeta>{s.time} · {s.attendees}명</ScheduleMeta>
                  </ScheduleContent>
                </ScheduleRow>
              ))}
            </ScheduleList>
          </WidgetContent>
        );

      /* ── Revenue Chart ── */
      case 'revenueChart':
        return (
          <WidgetContent>
            <WidgetTitleRow>
              <WidgetTitle>월별 매출</WidgetTitle>
              <RevChange>+24% <TrendingUp size={12} /></RevChange>
            </WidgetTitleRow>
            <ChartWrap>
              {revenueData.map((v, i) => (
                <BarWrap key={i}>
                  <Bar style={{ height: `${(v / maxRev) * 100}%` }} $active={i === revenueData.length - 1} />
                  <BarLabel>{['1','2','3','4','5','6','7','8','9','10','11','12'][i]}</BarLabel>
                </BarWrap>
              ))}
            </ChartWrap>
            <RevTotal>이번 달 총 매출 <strong>₩4,280,000</strong></RevTotal>
          </WidgetContent>
        );

      /* ── Activity ── */
      case 'activity':
        return (
          <WidgetContent>
            <WidgetTitle>최근 활동</WidgetTitle>
            <ActivityList>
              {DEMO_ACTIVITY.map((a, i) => (
                <ActivityRow key={i}>
                  <ActivityDot $color={a.color}>{a.icon}</ActivityDot>
                  <ActivityText>
                    <div>{a.text}</div>
                    <ActivityTime>{a.time}</ActivityTime>
                  </ActivityText>
                </ActivityRow>
              ))}
            </ActivityList>
          </WidgetContent>
        );

      /* ── Quick Actions ── */
      case 'quickActions':
        return (
          <WidgetContent>
            <WidgetTitle>빠른 메뉴</WidgetTitle>
            <QuickGrid>
              {[
                { icon: '📅', label: '예약 추가', screen: 'calendar' },
                { icon: '👥', label: '고객 관리', screen: 'customers' },
                { icon: '🌐', label: '웹사이트', screen: 'public' },
                { icon: '📊', label: '분석 보기', screen: 'analytics' },
                { icon: '💳', label: '결제 현황', screen: 'payments' },
                { icon: '⚙️', label: '설정', screen: 'settings' },
              ].map((q, i) => (
                <QuickBtn key={i} onClick={() => onNavigate(q.screen)}>
                  <span>{q.icon}</span>
                  <span>{q.label}</span>
                </QuickBtn>
              ))}
            </QuickGrid>
          </WidgetContent>
        );
    }
  };

  return (
    <Wrap>
      <PageHeader>
        <div>
          <PageTitle>대시보드</PageTitle>
          <PageSub>{today}</PageSub>
        </div>
        <HeaderRight>
          <DragHint>
            <GripVertical size={13} />
            위젯을 드래그해서 순서를 변경할 수 있어요
          </DragHint>
          <AddBtn onClick={() => setShowAddHint(!showAddHint)}>
            <Plus size={15} /> 위젯 추가
          </AddBtn>
        </HeaderRight>
      </PageHeader>

      {showAddHint && (
        <AddHintBanner className="anim-fade">
          ✨ 더 많은 위젯은 준비 중입니다! 현재 {widgets.length}개 위젯이 활성화되어 있어요.
        </AddHintBanner>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
          <Grid>
            {widgets.map(widget => (
              <SortableWidget key={widget.id} widget={widget}>
                {renderWidget(widget)}
              </SortableWidget>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </Wrap>
  );
};

export default DashboardScreen;

/* ─── Animations ─── */
const fadeUp = keyframes`from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}`;
const growBar = keyframes`from{height:0}to{}`;

/* ─── Styled ─── */
const Wrap = styled.div`animation: ${fadeUp} 0.35s ease both;`;
const PageHeader = styled.div`
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 24px;
`;
const PageTitle = styled.h1`font-size: 24px; font-weight: 800; color: ${colors.textPrimary};`;
const PageSub = styled.p`font-size: 13px; color: ${colors.textMuted}; margin-top: 4px;`;
const HeaderRight = styled.div`display: flex; align-items: center; gap: 12px;`;
const DragHint = styled.div`
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: ${colors.textMuted};
  background: ${colors.surface}; border: 1px solid ${colors.border};
  padding: 6px 12px; border-radius: 8px;
`;
const AddBtn = styled.button`
  display: flex; align-items: center; gap: 6px;
  background: ${colors.primary}; color: #fff;
  border: none; border-radius: 8px; padding: 8px 16px;
  font-size: 13px; font-weight: 600;
  &:hover { background: ${colors.primaryLight}; }
`;
const AddHintBanner = styled.div`
  background: rgba(0,201,167,0.08); border: 1px solid rgba(0,201,167,0.2);
  border-radius: 10px; padding: 12px 18px; font-size: 13px;
  color: ${colors.accent}; margin-bottom: 16px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
const WidgetBox = styled.div<{ $span?: string; $dragging?: boolean }>`
  grid-column: ${p => p.$span === 'full' ? '1 / -1' : 'auto'};
  background: ${colors.surface}; border-radius: 14px;
  box-shadow: ${p => p.$dragging ? shadows.xl : shadows.sm};
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
  transform: ${p => p.$dragging ? 'scale(1.02)' : 'none'};
  opacity: ${p => p.$dragging ? 0.9 : 1};
  &:hover > div:first-child { opacity: 1; }
`;
const WidgetHandle = styled.div`
  position: absolute; top: 14px; right: 14px;
  cursor: grab; opacity: 0; transition: opacity 0.15s;
  padding: 4px;
  &:active { cursor: grabbing; }
`;
const WidgetContent = styled.div`padding: 22px;`;
const WidgetTitle = styled.h3`
  font-size: 14px; font-weight: 700; color: ${colors.textPrimary}; margin-bottom: 16px;
`;
const WidgetTitleRow = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;`;
const ViewAll = styled.button`
  display: flex; align-items: center; gap: 4px;
  font-size: 12px; color: ${colors.primary}; font-weight: 600;
  background: none; border: none;
  &:hover { text-decoration: underline; }
`;
const StatsGrid = styled.div`display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;`;
const StatCard = styled.div`
  background: ${colors.bg}; border-radius: 12px; padding: 18px 16px;
  cursor: pointer; transition: all 0.15s;
  &:hover { background: rgba(0,201,167,0.06); transform: translateY(-2px); box-shadow: ${shadows.md}; }
`;
const StatIcon = styled.div`font-size: 22px; margin-bottom: 10px;`;
const StatValue = styled.div`font-size: 26px; font-weight: 800; color: ${colors.textPrimary}; margin-bottom: 2px;`;
const StatLabel = styled.div`font-size: 12px; color: ${colors.textSecondary}; margin-bottom: 8px;`;
const StatChange = styled.div<{ $up: boolean }>`
  display: flex; align-items: center; gap: 3px;
  font-size: 12px; font-weight: 600;
  color: ${p => p.$up ? colors.success : colors.danger};
`;
const BookingList = styled.div`display: flex; flex-direction: column; gap: 0;`;
const BookingRow = styled.div`
  display: flex; align-items: center; gap: 12px;
  padding: 10px 0; border-bottom: 1px solid ${colors.borderLight};
  &:last-child { border-bottom: none; }
`;
const BookingAvatar = styled.div`
  width: 34px; height: 34px; border-radius: 50%;
  background: ${colors.primary}; color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
`;
const BookingInfo = styled.div`flex: 1;`;
const BookingName = styled.div`font-size: 13px; font-weight: 600; color: ${colors.textPrimary};`;
const BookingService = styled.div`font-size: 12px; color: ${colors.textMuted};`;
const BookingMeta = styled.div`text-align: right;`;
const BookingTime = styled.div`font-size: 12px; color: ${colors.textSecondary}; margin-bottom: 3px;`;
const StatusBadge = styled.span<{ $color: string }>`
  font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px;
  background: ${p => p.$color}20; color: ${p => p.$color};
`;
const ScheduleList = styled.div`display: flex; flex-direction: column; gap: 10px;`;
const ScheduleRow = styled.div`display: flex; align-items: center; gap: 12px;`;
const ScheduleBar = styled.div<{ $color: string }>`
  width: 3px; height: 36px; border-radius: 2px; background: ${p => p.$color}; flex-shrink: 0;
`;
const ScheduleContent = styled.div``;
const ScheduleName = styled.div`font-size: 13px; font-weight: 600; color: ${colors.textPrimary};`;
const ScheduleMeta = styled.div`font-size: 12px; color: ${colors.textMuted};`;
const ChartWrap = styled.div`
  display: flex; align-items: flex-end; gap: 6px;
  height: 120px; padding: 0 4px;
`;
const BarWrap = styled.div`
  flex: 1; display: flex; flex-direction: column;
  align-items: center; height: 100%; justify-content: flex-end; gap: 4px;
`;
const Bar = styled.div<{ $active?: boolean }>`
  width: 100%; border-radius: 4px 4px 0 0;
  background: ${p => p.$active ? colors.accent : colors.primary + '30'};
  transition: height 0.3s ease;
  animation: ${growBar} 0.6s ease both;
`;
const BarLabel = styled.div`font-size: 10px; color: ${colors.textMuted};`;
const RevChange = styled.div`
  display: flex; align-items: center; gap: 4px;
  font-size: 12px; font-weight: 700; color: ${colors.success};
`;
const RevTotal = styled.div`
  font-size: 12px; color: ${colors.textSecondary}; margin-top: 12px;
  strong { color: ${colors.textPrimary}; font-weight: 700; }
`;
const ActivityList = styled.div`display: flex; flex-direction: column; gap: 14px;`;
const ActivityRow = styled.div`display: flex; align-items: flex-start; gap: 12px;`;
const ActivityDot = styled.div<{ $color: string }>`
  width: 32px; height: 32px; border-radius: 50%;
  background: ${p => p.$color}15;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; flex-shrink: 0;
`;
const ActivityText = styled.div`font-size: 13px; color: ${colors.textPrimary}; line-height: 1.4;`;
const ActivityTime = styled.div`font-size: 11px; color: ${colors.textMuted}; margin-top: 2px;`;
const QuickGrid = styled.div`display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px;`;
const QuickBtn = styled.button`
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  background: ${colors.bg}; border: 1px solid ${colors.border};
  border-radius: 12px; padding: 16px 8px;
  font-size: 12px; color: ${colors.textSecondary}; font-weight: 600;
  transition: all 0.15s;
  span:first-child { font-size: 22px; }
  &:hover { background: ${colors.primary}; color: #fff; border-color: ${colors.primary}; transform: translateY(-2px); box-shadow: ${shadows.md}; }
`;
