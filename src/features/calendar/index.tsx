import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

/**
 * Epic D: Calendar & Booking Management (Bootstrap Style)
 * Business dashboard calendar view with multiple features
 */

// Types
type ViewType = 'month' | 'week' | 'day';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  space: string;
  customerName: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  color: string;
}

interface Space {
  id: string;
  name: string;
  color: string;
  isVisible: boolean;
}

const BusinessCalendar: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>('month');
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>([
    'space1',
    'space2',
    'space3',
  ]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);

  // Mock spaces
  const spaces: Space[] = [
    { id: 'space1', name: '메인 운동장', color: '#667eea', isVisible: true },
    { id: 'space2', name: 'PT 룸', color: '#48bb78', isVisible: true },
    { id: 'space3', name: '요가 스튜디오', color: '#ed8936', isVisible: true },
    { id: 'space4', name: '필라테스 룸', color: '#9f7aea', isVisible: false },
  ];

  // Mock events
  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: '요가 클래스',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      startTime: '10:00',
      endTime: '11:30',
      space: 'space3',
      customerName: '김지수',
      status: 'confirmed',
      color: '#ed8936',
    },
    {
      id: '2',
      title: 'PT 세션',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      startTime: '14:00',
      endTime: '15:00',
      space: 'space2',
      customerName: '이민호',
      status: 'confirmed',
      color: '#48bb78',
    },
    {
      id: '3',
      title: '그룹 수업',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16),
      startTime: '09:00',
      endTime: '10:30',
      space: 'space1',
      customerName: '다수',
      status: 'pending',
      color: '#667eea',
    },
    {
      id: '4',
      title: '필라테스',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16),
      startTime: '16:00',
      endTime: '17:00',
      space: 'space4',
      customerName: '박서연',
      status: 'confirmed',
      color: '#9f7aea',
    },
    {
      id: '5',
      title: '개인 트레이닝',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 17),
      startTime: '11:00',
      endTime: '12:00',
      space: 'space2',
      customerName: '정준호',
      status: 'confirmed',
      color: '#48bb78',
    },
  ];

  const handleSignOut = async () => {
    await mockSignOut();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const toggleSpaceVisibility = (spaceId: string) => {
    setSelectedSpaces((prev) =>
      prev.includes(spaceId)
        ? prev.filter((id) => id !== spaceId)
        : [...prev, spaceId],
    );
  };

  // Calendar rendering helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    return { daysInMonth, startDayOfWeek };
  };

  const { daysInMonth, startDayOfWeek } = getDaysInMonth(currentDate);

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear() &&
        selectedSpaces.includes(event.space),
    );
  };

  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const renderMonthView = () => (
    <div className="table-responsive">
      <table className="table table-bordered calendar-table mb-0">
        <thead>
          <tr>
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <th key={day} className="text-center calendar-header">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.ceil((daysInMonth + startDayOfWeek) / 7))].map(
            (_, weekIndex) => (
              <tr key={weekIndex}>
                {[...Array(7)].map((_, dayIndex) => {
                  const dayNumber =
                    weekIndex * 7 + dayIndex - startDayOfWeek + 1;
                  const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
                  const currentDateObj = isValidDay
                    ? new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        dayNumber,
                      )
                    : null;
                  const dayEvents = currentDateObj
                    ? getEventsForDate(currentDateObj)
                    : [];
                  const isToday =
                    currentDateObj &&
                    new Date().toDateString() === currentDateObj.toDateString();

                  return (
                    <td
                      key={dayIndex}
                      className={`calendar-day ${!isValidDay ? 'calendar-day-other' : ''} ${isToday ? 'calendar-day-today' : ''}`}
                    >
                      {isValidDay && (
                        <>
                          <div className="calendar-day-number">{dayNumber}</div>
                          <div className="calendar-events">
                            {dayEvents.map((event) => (
                              <div
                                key={event.id}
                                className="calendar-event"
                                style={{
                                  backgroundColor: event.color,
                                  borderLeft: `3px solid ${event.color}`,
                                }}
                                title={`${event.title} - ${event.customerName}`}
                              >
                                <div className="calendar-event-time">
                                  {event.startTime}
                                </div>
                                <div className="calendar-event-title">
                                  {event.title}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );

  const renderWeekView = () => (
    <div className="week-view">
      <div className="alert alert-info">
        <i className="fe fe-info mr-2" />
        주간 뷰는 개발 중입니다. 월간 뷰를 사용해주세요.
      </div>
      {renderMonthView()}
    </div>
  );

  const renderDayView = () => (
    <div className="day-view">
      <div className="alert alert-info">
        <i className="fe fe-info mr-2" />
        일간 뷰는 개발 중입니다. 월간 뷰를 사용해주세요.
      </div>
      {renderMonthView()}
    </div>
  );

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

      {/* Main Content */}
      <div className="main-content">
        <div className="container-fluid pt-4">
          <div className="row">
            <div className="col-12">
              {/* Calendar Card */}
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-auto">
                      <h1 className="header-title mb-0">캘린더 & 예약</h1>
                    </div>
                    <div className="col-12 col-md-auto ml-md-auto mt-3 mt-md-0">
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => navigate(ROUTES.BUSINESS.BOOKINGS)}
                      >
                        <i className="fe fe-plus mr-1" />새 예약
                      </button>
                      <button
                        className="btn btn-outline-secondary mr-2"
                        onClick={() => setShowShareModal(true)}
                      >
                        <i className="fe fe-share-2 mr-1" />
                        공유
                      </button>
                      <button
                        className="btn btn-outline-secondary mr-2"
                        onClick={() => navigate('/business/availability')}
                      >
                        <i className="fe fe-clock mr-1" />
                        가능시간
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setShowSyncModal(true)}
                      >
                        <i className="fe fe-refresh-cw mr-1" />
                        동기화
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  {/* Calendar Controls */}
                  <div className="row mb-4">
                    {/* Month Selector */}
                    <div className="col-12 col-md-4 mb-3 mb-md-0">
                      <div className="calendar-controls">
                        <button
                          className="btn btn-outline-secondary mr-2"
                          onClick={handlePrevMonth}
                        >
                          <i className="fe fe-chevron-left" />
                        </button>
                        <button
                          className="btn btn-outline-secondary mr-2"
                          onClick={handleToday}
                        >
                          오늘
                        </button>
                        <button
                          className="btn btn-outline-secondary mr-2"
                          onClick={handleNextMonth}
                        >
                          <i className="fe fe-chevron-right" />
                        </button>
                        <span className="ml-3 font-weight-bold">
                          {currentDate.getFullYear()}년{' '}
                          {monthNames[currentDate.getMonth()]}
                        </span>
                      </div>
                    </div>

                    {/* View Toggle */}
                    <div className="col-12 col-md-4 mb-3 mb-md-0">
                      <div className="btn-group w-100" role="group">
                        <button
                          className={`btn ${viewType === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setViewType('month')}
                        >
                          월간
                        </button>
                        <button
                          className={`btn ${viewType === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setViewType('week')}
                        >
                          주간
                        </button>
                        <button
                          className={`btn ${viewType === 'day' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setViewType('day')}
                        >
                          일간
                        </button>
                      </div>
                    </div>

                    {/* Space Filter */}
                    <div className="col-12 col-md-4">
                      <div className="space-filters">
                        <small className="text-muted d-block mb-2">
                          공간 필터:
                        </small>
                        {spaces.map((space) => (
                          <button
                            key={space.id}
                            className={`btn btn-sm mr-2 mb-2 ${
                              selectedSpaces.includes(space.id)
                                ? 'btn-space-active'
                                : 'btn-space-inactive'
                            }`}
                            style={{
                              backgroundColor: selectedSpaces.includes(space.id)
                                ? space.color
                                : '#f7fafc',
                              color: selectedSpaces.includes(space.id)
                                ? '#fff'
                                : '#4a5568',
                              borderColor: space.color,
                            }}
                            onClick={() => toggleSpaceVisibility(space.id)}
                          >
                            <i
                              className="fe fe-circle mr-1"
                              style={{
                                color: selectedSpaces.includes(space.id)
                                  ? '#fff'
                                  : space.color,
                              }}
                            />
                            {space.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Calendar */}
                  {viewType === 'month' && renderMonthView()}
                  {viewType === 'week' && renderWeekView()}
                  {viewType === 'day' && renderDayView()}

                  {/* Legend */}
                  <div className="row mt-4">
                    <div className="col-12">
                      <div className="calendar-legend">
                        <h6 className="mb-2">공간 범례:</h6>
                        {spaces.map((space) => (
                          <div
                            key={space.id}
                            className="calendar-legend-item mr-4"
                          >
                            <span
                              className="calendar-legend-color"
                              style={{ backgroundColor: space.color }}
                            />
                            <span className="calendar-legend-label">
                              {space.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Bookings */}
              <div className="card mt-4">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h4 className="card-header-title mb-0">다가오는 예약</h4>
                    </div>
                    <div className="col-auto">
                      <Link
                        to={ROUTES.BUSINESS.BOOKINGS}
                        className="btn btn-sm btn-outline-primary"
                      >
                        모두 보기
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    {mockEvents.slice(0, 3).map((event) => {
                      const space = spaces.find((s) => s.id === event.space);
                      return (
                        <div
                          key={event.id}
                          className="list-group-item px-0 py-3 border-left border-primary pl-3"
                        >
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <div
                                className="calendar-event-badge"
                                style={{ backgroundColor: space?.color }}
                              >
                                {event.startTime}
                              </div>
                            </div>
                            <div className="col ml-n2">
                              <h5 className="mb-1">{event.title}</h5>
                              <p className="text-muted mb-0">
                                {space?.name} • {event.customerName}
                              </p>
                            </div>
                            <div className="col-auto">
                              <span
                                className={`badge ${
                                  event.status === 'confirmed'
                                    ? 'badge-success'
                                    : event.status === 'pending'
                                      ? 'badge-warning'
                                      : 'badge-danger'
                                }`}
                              >
                                {event.status === 'confirmed'
                                  ? '확정'
                                  : event.status === 'pending'
                                    ? '대기'
                                    : '취소'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">캘린더 공유</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowShareModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>공유 링크</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={`https://ruoom.kr/calendar/share/${user?.id || 'business'}`}
                      readOnly
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fe fe-copy" />
                      </button>
                    </div>
                  </div>
                  <small className="form-text text-muted">
                    이 링크를 공유하여 고객들이 예약 가능한 시간을 확인할 수
                    있습니다.
                  </small>
                </div>

                <hr />

                <h6>공유 설정</h6>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="showAvailableOnly"
                      defaultChecked
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="showAvailableOnly"
                    >
                      예약 가능한 시간만 표시
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="allowBooking"
                      defaultChecked
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="allowBooking"
                    >
                      직접 예약 허용
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowShareModal(false)}
                >
                  닫기
                </button>
                <button type="button" className="btn btn-primary">
                  링크 복사
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sync Modal */}
      {showSyncModal && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">캘린더 동기화</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowSyncModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="text-muted mb-4">
                  외부 캘린더와 동기화하여 예약을 관리하세요.
                </p>

                <div className="list-group">
                  <div className="list-group-item list-group-item-action">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <i
                          className="fe fe-google"
                          style={{ fontSize: '1.5rem' }}
                        />
                      </div>
                      <div className="col">
                        <h6 className="mb-1">Google Calendar</h6>
                        <small className="text-muted">
                          Google 캘린더와 예약을 동기화합니다
                        </small>
                      </div>
                      <div className="col-auto">
                        <button className="btn btn-sm btn-primary">연결</button>
                      </div>
                    </div>
                  </div>

                  <div className="list-group-item list-group-item-action">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <i
                          className="fe fe-calendar"
                          style={{ fontSize: '1.5rem' }}
                        />
                      </div>
                      <div className="col">
                        <h6 className="mb-1">Apple Calendar (iCal)</h6>
                        <small className="text-muted">
                          iCal 파일을 가져오거나 내보냅니다
                        </small>
                      </div>
                      <div className="col-auto">
                        <button className="btn btn-sm btn-outline-primary">
                          내보내기
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="list-group-item list-group-item-action">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <i
                          className="fe fe-file-text"
                          style={{ fontSize: '1.5rem' }}
                        />
                      </div>
                      <div className="col">
                        <h6 className="mb-1">Outlook Calendar</h6>
                        <small className="text-muted">
                          Outlook 캘린더와 동기화합니다 (개발 중)
                        </small>
                      </div>
                      <div className="col-auto">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          disabled
                        >
                          곧 출시
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowSyncModal(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessCalendar;
