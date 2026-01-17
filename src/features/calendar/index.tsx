import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';
import styled from 'styled-components';

/**
 * Epic D: Calendar & Booking Management
 * Business dashboard calendar view
 */
const BusinessCalendar: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleSignOut = async () => {
    await mockSignOut();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to={ROUTES.BUSINESS.DASHBOARD}>
            <strong>Ruoom KR Platform</strong>
          </Link>

          <div className="d-flex align-items-center ml-auto">
            <span className="text-muted mr-3">
              {user?.firstName} {user?.lastName}
            </span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleSignOut}
            >
              로그아웃
            </button>
          </div>
        </div>
      </nav>

      <Container>
        <Header>
          <Title>Calendar & Bookings</Title>
          <Actions>
            <Button>New Booking</Button>
            <Button $secondary>Settings</Button>
          </Actions>
        </Header>

        <CalendarView>
          <CalendarHeader>
            <MonthSelector>
              <NavButton>&lt;</NavButton>
              <MonthTitle>January 2026</MonthTitle>
              <NavButton>&gt;</NavButton>
            </MonthSelector>
            <ViewToggle>
              <ViewButton $active>Month</ViewButton>
              <ViewButton>Week</ViewButton>
              <ViewButton>Day</ViewButton>
            </ViewToggle>
          </CalendarHeader>

          <CalendarGrid>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <CalendarDay key={day} $header>
                {day}
              </CalendarDay>
            ))}
            {[...Array(35)].map((_, i) => (
              <CalendarDay key={i}>
                <DayNumber>{i + 1 > 31 ? '' : i + 1}</DayNumber>
                {i === 14 && (
                  <Event $color="#667eea">
                    <EventTime>10:00</EventTime>
                    <EventTitle>Yoga Class</EventTitle>
                  </Event>
                )}
                {i === 15 && (
                  <Event $color="#48bb78">
                    <EventTime>14:00</EventTime>
                    <EventTitle>Personal Training</EventTitle>
                  </Event>
                )}
              </CalendarDay>
            ))}
          </CalendarGrid>
        </CalendarView>

        <BookingsList>
          <ListHeader>
            <ListTitle>Upcoming Bookings</ListTitle>
          </ListHeader>
          <BookingItem>
            <BookingTime>Jan 15, 10:00 AM</BookingTime>
            <BookingInfo>
              <BookingName>John Doe - Yoga Class</BookingName>
              <BookingStatus $status="confirmed">Confirmed</BookingStatus>
            </BookingInfo>
          </BookingItem>
          <BookingItem>
            <BookingTime>Jan 16, 2:00 PM</BookingTime>
            <BookingInfo>
              <BookingName>Jane Smith - Personal Training</BookingName>
              <BookingStatus $status="pending">Pending</BookingStatus>
            </BookingInfo>
          </BookingItem>
        </BookingsList>
      </Container>
    </>
  );
};

export default BusinessCalendar;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background: #f7fafc;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ $secondary?: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ $secondary }) => ($secondary ? 'white' : '#667eea')};
  color: ${({ $secondary }) => ($secondary ? '#667eea' : 'white')};
  border: ${({ $secondary }) => ($secondary ? '1px solid #667eea' : 'none')};
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CalendarView = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  background: #f7fafc;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #e2e8f0;
  }
`;

const MonthTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${({ $active }) => ($active ? '#667eea' : '#f7fafc')};
  color: ${({ $active }) => ($active ? 'white' : '#2d3748')};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: ${({ $active }) => ($active ? '#5568d3' : '#e2e8f0')};
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e2e8f0;
  border: 1px solid #e2e8f0;
`;

const CalendarDay = styled.div<{ $header?: boolean }>`
  background: ${({ $header }) => ($header ? '#f7fafc' : 'white')};
  padding: ${({ $header }) => ($header ? '1rem' : '0.5rem')};
  min-height: ${({ $header }) => ($header ? 'auto' : '100px')};
  font-weight: ${({ $header }) => ($header ? '600' : 'normal')};
  text-align: ${({ $header }) => ($header ? 'center' : 'left')};
  position: relative;
`;

const DayNumber = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const Event = styled.div<{ $color: string }>`
  background: ${({ $color }) => $color};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

const EventTime = styled.div`
  font-weight: 600;
`;

const EventTitle = styled.div`
  opacity: 0.9;
`;

const BookingsList = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ListHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ListTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
`;

const BookingItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const BookingTime = styled.div`
  font-size: 0.875rem;
  color: #718096;
  min-width: 150px;
`;

const BookingInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookingName = styled.div`
  font-weight: 500;
  color: #2d3748;
`;

const BookingStatus = styled.span<{ $status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $status }) =>
    $status === 'confirmed' ? '#c6f6d5' : '#fed7d7'};
  color: ${({ $status }) => ($status === 'confirmed' ? '#22543d' : '#9b2c2c')};
`;
