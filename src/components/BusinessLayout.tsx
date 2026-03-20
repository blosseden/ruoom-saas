import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import {
  LayoutDashboard, Calendar, Users, CreditCard,
  BarChart3, Globe, Settings, Bell, Search,
  ChevronRight, ChevronLeft, Zap, Menu,
  MessageCircle, UserCheck, Layers,
} from 'lucide-react';
import { colors, shadows } from '../design';
import { DEMO_BUSINESS } from '../data/mockData';

interface LayoutProps {
  children: ReactNode;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const navItems = [
  { id: 'dashboard',    icon: LayoutDashboard, label: '대시보드' },
  { id: 'calendar',     icon: Calendar,        label: '캘린더' },
  { id: 'customers',    icon: Users,           label: '고객 관리' },
  { id: 'staff',        icon: UserCheck,       label: '직원 관리' },
  { id: 'payments',     icon: CreditCard,      label: '결제' },
  { id: 'analytics',    icon: BarChart3,       label: '분석' },
  { id: 'website',      icon: Globe,           label: '웹사이트' },
  { id: 'chatbot',      icon: MessageCircle,   label: '챗봇' },
  { id: 'integrations', icon: Layers,          label: '인테그레이션' },
  { id: 'settings',     icon: Settings,        label: '설정' },
];

const screenLabel: Record<string, string> = {
  dashboard: '대시보드', calendar: '캘린더', customers: '고객 관리',
  staff: '직원 관리', payments: '결제', analytics: '분석',
  website: '웹사이트', chatbot: '챗봇', integrations: '인테그레이션', settings: '설정',
};

const BusinessLayout: FC<LayoutProps> = ({
  children, currentScreen, onNavigate, onBack, canGoBack,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Wrapper>
      <Sidebar $collapsed={collapsed}>
        <SidebarTop>
          <Logo $collapsed={collapsed}>
            <LogoIcon>R</LogoIcon>
            {!collapsed && <LogoText>Ruoom KR</LogoText>}
          </Logo>
          <CollapseBtn onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
          </CollapseBtn>
        </SidebarTop>

        {!collapsed && (
          <BusinessCard>
            <BusinessAvatar>🏋️</BusinessAvatar>
            <BusinessInfo>
              <BusinessName>{DEMO_BUSINESS.name}</BusinessName>
              <BusinessCat>{DEMO_BUSINESS.category}</BusinessCat>
            </BusinessInfo>
          </BusinessCard>
        )}

        <Nav>
          {navItems.map(({ id, icon: Icon, label }) => (
            <NavItem
              key={id}
              $active={currentScreen === id}
              onClick={() => onNavigate(id)}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && currentScreen === id && <ActiveDot />}
            </NavItem>
          ))}
        </Nav>

        {!collapsed && (
          <SidebarFooter>
            <AiBadge>
              <Zap size={12} fill="currentColor" />
              AI 온보딩 완료
            </AiBadge>
          </SidebarFooter>
        )}
      </Sidebar>

      <Main>
        <Header>
          <HeaderLeft>
            {/* ── Back Button ── */}
            {canGoBack && (
              <BackBtn onClick={onBack} title="이전 화면으로">
                <ChevronLeft size={16} />
                <span>뒤로</span>
              </BackBtn>
            )}
            <PageTitle>{screenLabel[currentScreen] || currentScreen}</PageTitle>
          </HeaderLeft>

          <SearchBar>
            <Search size={15} color={colors.textMuted} />
            <input placeholder="검색..." />
          </SearchBar>

          <HeaderRight>
            <NotifBtn>
              <Bell size={18} />
              <NotifDot />
            </NotifBtn>
            <Avatar>김지수</Avatar>
          </HeaderRight>
        </Header>

        <Content>{children}</Content>
      </Main>
    </Wrapper>
  );
};

export default BusinessLayout;

/* ── Styled ── */
const Wrapper = styled.div`
  display: flex; height: 100vh; overflow: hidden;
  background: ${colors.bg};
`;
const Sidebar = styled.aside<{ $collapsed: boolean }>`
  width: ${p => p.$collapsed ? '60px' : '240px'};
  background: ${colors.sidebarBg};
  display: flex; flex-direction: column;
  transition: width 0.25s ease;
  flex-shrink: 0;
`;
const SidebarTop = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 16px 12px;
`;
const Logo = styled.div<{ $collapsed: boolean }>`
  display: flex; align-items: center; gap: 10px;
`;
const LogoIcon = styled.div`
  width: 30px; height: 30px; border-radius: 8px;
  background: ${colors.accent}; color: #fff;
  font-weight: 800; font-size: 14px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
`;
const LogoText = styled.span`color: #fff; font-weight: 700; font-size: 15px;`;
const CollapseBtn = styled.button`
  background: rgba(255,255,255,0.08); border: none;
  color: rgba(255,255,255,0.6); border-radius: 6px; padding: 4px;
  display: flex; align-items: center; cursor: pointer;
  &:hover { background: rgba(255,255,255,0.15); }
`;
const BusinessCard = styled.div`
  display: flex; align-items: center; gap: 10px;
  margin: 0 12px 16px; padding: 10px 12px;
  background: rgba(255,255,255,0.07); border-radius: 10px;
`;
const BusinessAvatar = styled.div`font-size: 20px;`;
const BusinessInfo   = styled.div`flex: 1; min-width: 0;`;
const BusinessName   = styled.div`
  color: #fff; font-size: 13px; font-weight: 600;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;
const BusinessCat = styled.div`color: rgba(255,255,255,0.5); font-size: 11px; margin-top: 1px;`;
const Nav = styled.nav`flex: 1; padding: 0 10px; overflow-y: auto;`;
const NavItem = styled.button<{ $active: boolean }>`
  width: 100%; display: flex; align-items: center; gap: 10px;
  padding: 10px 10px; border: none; border-radius: 8px;
  background: ${p => p.$active ? 'rgba(255,255,255,0.12)' : 'transparent'};
  color: ${p => p.$active ? '#fff' : colors.sidebarText};
  font-size: 13.5px; font-weight: ${p => p.$active ? '600' : '400'};
  margin-bottom: 2px; text-align: left; position: relative; cursor: pointer;
  transition: all 0.15s;
  &:hover { background: rgba(255,255,255,0.08); color: #fff; }
  svg { flex-shrink: 0; }
`;
const ActiveDot = styled.div`
  width: 5px; height: 5px; border-radius: 50%;
  background: ${colors.accent}; margin-left: auto;
`;
const SidebarFooter = styled.div`padding: 16px 12px;`;
const AiBadge = styled.div`
  display: flex; align-items: center; gap: 6px;
  background: rgba(0,201,167,0.15); color: ${colors.accent};
  font-size: 11px; font-weight: 600; padding: 6px 10px; border-radius: 6px;
`;
const Main = styled.div`flex: 1; display: flex; flex-direction: column; overflow: hidden;`;
const Header = styled.header`
  height: 60px; background: ${colors.surface};
  border-bottom: 1px solid ${colors.border};
  display: flex; align-items: center; gap: 16px;
  padding: 0 24px; flex-shrink: 0;
`;
const HeaderLeft = styled.div`
  display: flex; align-items: center; gap: 10px; flex-shrink: 0;
`;
const BackBtn = styled.button`
  display: flex; align-items: center; gap: 4px;
  background: ${colors.bg}; border: 1px solid ${colors.border};
  color: ${colors.textSecondary}; border-radius: 8px;
  padding: 6px 12px; font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: ${colors.primary}; color: #fff;
    border-color: ${colors.primary};
  }
`;
const PageTitle = styled.h1`
  font-size: 15px; font-weight: 700; color: ${colors.textPrimary};
  white-space: nowrap;
`;
const SearchBar = styled.div`
  display: flex; align-items: center; gap: 8px;
  background: ${colors.bg}; border: 1px solid ${colors.border};
  border-radius: 8px; padding: 7px 12px; flex: 1; max-width: 320px;
  margin: 0 auto;
  input {
    border: none; background: none; outline: none;
    font-size: 13px; color: ${colors.textPrimary}; width: 100%;
    font-family: inherit;
    &::placeholder { color: ${colors.textMuted}; }
  }
`;
const HeaderRight = styled.div`display: flex; align-items: center; gap: 12px; flex-shrink: 0;`;
const NotifBtn = styled.button`
  position: relative; background: none; border: none;
  color: ${colors.textSecondary}; padding: 6px; border-radius: 8px;
  display: flex; align-items: center; cursor: pointer;
  &:hover { background: ${colors.bg}; }
`;
const NotifDot = styled.div`
  position: absolute; top: 5px; right: 5px;
  width: 7px; height: 7px; border-radius: 50%;
  background: ${colors.danger}; border: 2px solid ${colors.surface};
`;
const Avatar = styled.div`
  width: 32px; height: 32px; border-radius: 50%;
  background: ${colors.primary}; color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
`;
const Content = styled.main`flex: 1; overflow-y: auto; padding: 28px;`;