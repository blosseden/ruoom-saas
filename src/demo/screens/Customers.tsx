import { FC, useState } from 'react';
import styled from 'styled-components';
import { Search, Filter, Plus, Star, MoreHorizontal } from 'lucide-react';
import { colors, shadows } from '../design';
import { DEMO_CUSTOMERS } from '../data/mockData';

const CustomersScreen: FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('전체');

  const filtered = DEMO_CUSTOMERS.filter(c => {
    const matchSearch = c.name.includes(search) || c.email.includes(search);
    const matchFilter = filter === '전체' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const statusColor: Record<string, string> = {
    VIP: '#F59E0B', '일반': colors.primary, '신규': colors.accent,
  };

  return (
    <Wrap className="anim-fade">
      <PageHeader>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>고객 관리</h1>
          <p style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
            총 {DEMO_CUSTOMERS.length}명의 고객
          </p>
        </div>
        <AddBtn><Plus size={15} /> 고객 추가</AddBtn>
      </PageHeader>

      {/* Summary Cards */}
      <SummaryGrid>
        {[
          { label: '전체 고객', value: '6', icon: '👥', color: colors.primary },
          { label: 'VIP 고객', value: '3', icon: '⭐', color: '#F59E0B' },
          { label: '이번 달 신규', value: '1', icon: '🌱', color: colors.accent },
          { label: '평균 방문', value: '23회', icon: '📅', color: '#8B5CF6' },
        ].map((s, i) => (
          <SumCard key={i}>
            <SumIcon>{s.icon}</SumIcon>
            <SumValue style={{ color: s.color }}>{s.value}</SumValue>
            <SumLabel>{s.label}</SumLabel>
          </SumCard>
        ))}
      </SummaryGrid>

      {/* Toolbar */}
      <Toolbar>
        <SearchBar>
          <Search size={14} color={colors.textMuted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="이름, 이메일 검색..." />
        </SearchBar>
        <Filters>
          {['전체', 'VIP', '일반', '신규'].map(f => (
            <FilterBtn key={f} $active={filter === f} onClick={() => setFilter(f)}>{f}</FilterBtn>
          ))}
        </Filters>
      </Toolbar>

      {/* Table */}
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <Th>고객</Th>
              <Th>연락처</Th>
              <Th>방문 횟수</Th>
              <Th>총 결제</Th>
              <Th>가입일</Th>
              <Th>등급</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <Tr key={c.id} className="anim-fade">
                <Td>
                  <CustomerCell>
                    <CAvatar>{c.avatar}</CAvatar>
                    <div>
                      <CName>{c.name}</CName>
                      <CEmail>{c.email}</CEmail>
                    </div>
                  </CustomerCell>
                </Td>
                <Td style={{ color: colors.textSecondary, fontSize: 13 }}>{c.phone}</Td>
                <Td>
                  <VisitBar>
                    <VisitFill style={{ width: `${Math.min((c.visits / 50) * 100, 100)}%` }} />
                    <span>{c.visits}회</span>
                  </VisitBar>
                </Td>
                <Td style={{ fontWeight: 700, fontSize: 13 }}>{c.spent}</Td>
                <Td style={{ color: colors.textMuted, fontSize: 13 }}>{c.joined}</Td>
                <Td>
                  <StatusPill $color={statusColor[c.status]}>
                    {c.status === 'VIP' && <Star size={10} fill="currentColor" />}
                    {c.status}
                  </StatusPill>
                </Td>
                <Td>
                  <MoreBtn><MoreHorizontal size={16} /></MoreBtn>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
    </Wrap>
  );
};

export default CustomersScreen;

const Wrap = styled.div``;
const PageHeader = styled.div`display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 22px;`;
const AddBtn = styled.button`
  display: flex; align-items: center; gap: 6px;
  background: ${colors.primary}; color: #fff; border: none;
  border-radius: 8px; padding: 10px 18px; font-size: 13px; font-weight: 700;
  &:hover { background: ${colors.primaryLight}; }
`;
const SummaryGrid = styled.div`display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 22px;`;
const SumCard = styled.div`
  background: ${colors.surface}; border-radius: 12px; padding: 18px;
  box-shadow: ${shadows.sm}; text-align: center;
`;
const SumIcon = styled.div`font-size: 22px; margin-bottom: 8px;`;
const SumValue = styled.div`font-size: 24px; font-weight: 800; margin-bottom: 4px;`;
const SumLabel = styled.div`font-size: 12px; color: ${colors.textMuted};`;
const Toolbar = styled.div`display: flex; gap: 12px; margin-bottom: 16px; align-items: center;`;
const SearchBar = styled.div`
  display: flex; align-items: center; gap: 8px;
  background: ${colors.surface}; border: 1px solid ${colors.border};
  border-radius: 8px; padding: 9px 14px; flex: 1;
  input { border: none; background: none; outline: none; font-size: 13px; width: 100%; }
`;
const Filters = styled.div`display: flex; gap: 6px;`;
const FilterBtn = styled.button<{ $active: boolean }>`
  padding: 8px 14px; border-radius: 8px; border: none; font-size: 12px; font-weight: 600; cursor: pointer;
  background: ${p => p.$active ? colors.primary : colors.surface};
  color: ${p => p.$active ? '#fff' : colors.textSecondary};
  border: 1px solid ${p => p.$active ? 'transparent' : colors.border};
`;
const TableWrap = styled.div`background: ${colors.surface}; border-radius: 14px; box-shadow: ${shadows.sm}; overflow: hidden;`;
const Table = styled.table`width: 100%; border-collapse: collapse;`;
const Th = styled.th`
  text-align: left; padding: 14px 16px;
  font-size: 11px; font-weight: 700; color: ${colors.textMuted}; text-transform: uppercase; letter-spacing: 0.05em;
  background: ${colors.bg}; border-bottom: 1px solid ${colors.border};
`;
const Tr = styled.tr`
  border-bottom: 1px solid ${colors.borderLight};
  &:last-child { border-bottom: none; }
  &:hover { background: ${colors.bg}; }
`;
const Td = styled.td`padding: 14px 16px; vertical-align: middle;`;
const CustomerCell = styled.div`display: flex; align-items: center; gap: 10px;`;
const CAvatar = styled.div`
  width: 36px; height: 36px; border-radius: 50%;
  background: ${colors.primary}; color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
`;
const CName = styled.div`font-size: 13.5px; font-weight: 600; color: ${colors.textPrimary};`;
const CEmail = styled.div`font-size: 12px; color: ${colors.textMuted};`;
const VisitBar = styled.div`
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; color: ${colors.textSecondary};
`;
const VisitFill = styled.div`
  height: 4px; background: ${colors.primary}; border-radius: 2px; flex-shrink: 0;
`;
const StatusPill = styled.div<{ $color: string }>`
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 99px;
  background: ${p => p.$color}15; color: ${p => p.$color};
`;
const MoreBtn = styled.button`
  background: none; border: none; color: ${colors.textMuted}; cursor: pointer;
  padding: 4px; border-radius: 6px; display: flex; align-items: center;
  &:hover { background: ${colors.bg}; color: ${colors.textPrimary}; }
`;
