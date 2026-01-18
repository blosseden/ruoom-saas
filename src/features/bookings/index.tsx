import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

/**
 * Epic D: Booking Management Page
 * 예약 목록 및 관리
 */
const Bookings: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [activeTab, setActiveTab] = useState<
    'upcoming' | 'history' | 'settings'
  >('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'
  >('all');

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailReminders: true,
    smsReminders: false,
    reminderHours: 24,
    newBookingAlert: true,
    cancellationAlert: true,
    modificationAlert: true,
  });

  // Mock booking data
  const bookings = [
    {
      id: 1,
      customerName: '홍길동',
      service: '개인 트레이닝',
      date: '2026-01-18',
      time: '10:00 - 11:00',
      status: 'confirmed',
      amount: '₩100,000',
      notes: '첫 방문입니다',
    },
    {
      id: 2,
      customerName: '김철수',
      service: '요가 수업',
      date: '2026-01-18',
      time: '14:00 - 15:00',
      status: 'pending',
      amount: '₩50,000',
      notes: '',
    },
    {
      id: 3,
      customerName: '이영희',
      service: '그룹 수업',
      date: '2026-01-17',
      time: '16:00 - 17:00',
      status: 'completed',
      amount: '₩30,000',
      notes: '정기 회원',
    },
    {
      id: 4,
      customerName: '박민수',
      service: 'PT 패키지',
      date: '2026-01-19',
      time: '09:00 - 10:00',
      status: 'confirmed',
      amount: '₩150,000',
      notes: '10회 패키지',
    },
    {
      id: 5,
      customerName: '최수진',
      service: '필라테스',
      date: '2026-01-16',
      time: '18:00 - 19:00',
      status: 'cancelled',
      amount: '₩80,000',
      notes: '고객 요청으로 취소',
    },
    {
      id: 6,
      customerName: '김영호',
      service: '개인 트레이닝',
      date: '2026-01-20',
      time: '11:00 - 12:00',
      status: 'confirmed',
      amount: '₩100,000',
      notes: '',
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'completed':
        return 'badge-primary';
      case 'cancelled':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  };

  const handleSignOut = async () => {
    await mockSignOut();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  const getUpcomingBookings = () => {
    return bookings.filter(
      (b) => b.status === 'pending' || b.status === 'confirmed',
    );
  };

  const getHistoryBookings = () => {
    return bookings.filter(
      (b) => b.status === 'completed' || b.status === 'cancelled',
    );
  };

  const upcomingBookings = getUpcomingBookings();
  const historyBookings = getHistoryBookings();

  const displayedBookings =
    activeTab === 'upcoming' ? upcomingBookings : historyBookings;

  // Remove unused filteredBookings variable
  void displayedBookings;

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
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-auto">
                      <h2 className="mb-0">Bookings</h2>
                      <p className="text-muted mb-0">
                        Manage all your bookings
                      </p>
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          console.log('New Booking button clicked');
                          console.log(
                            'Navigating to:',
                            ROUTES.BUSINESS.CALENDAR,
                          );
                          navigate(ROUTES.BUSINESS.CALENDAR);
                        }}
                      >
                        <i className="fe fe-plus mr-1" />
                        New Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="row mb-4">
            <div className="col-12">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                  >
                    <i className="fe fe-calendar mr-1" />
                    예정된 예약
                    <span className="badge badge-primary ml-2">
                      {upcomingBookings.length}
                    </span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                  >
                    <i className="fe fe-clock mr-1" />
                    예약 기록
                    <span className="badge badge-secondary ml-2">
                      {historyBookings.length}
                    </span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <i className="fe fe-settings mr-1" />
                    알림 설정
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab !== 'settings' && (
            <>
              {/* Stats Cards (only for upcoming tab) */}
              {activeTab === 'upcoming' && (
                <div className="row mb-4">
                  <div className="col-12 col-sm-6 col-lg-3 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div
                              className="avatar avatar-sm"
                              style={{
                                background: '#667eea',
                                color: 'white',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              📅
                            </div>
                          </div>
                          <div className="col ml-n2">
                            <h4 className="mb-1">{upcomingBookings.length}</h4>
                            <p className="small text-muted mb-0">
                              다가오는 예약
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-lg-3 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div
                              className="avatar avatar-sm"
                              style={{
                                background: '#ffc107',
                                color: 'white',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              ⏳
                            </div>
                          </div>
                          <div className="col ml-n2">
                            <h4 className="mb-1">
                              {
                                upcomingBookings.filter(
                                  (b) => b.status === 'pending',
                                ).length
                              }
                            </h4>
                            <p className="small text-muted mb-0">대기중</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-lg-3 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div
                              className="avatar avatar-sm"
                              style={{
                                background: '#28a745',
                                color: 'white',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              ✓
                            </div>
                          </div>
                          <div className="col ml-n2">
                            <h4 className="mb-1">
                              {
                                upcomingBookings.filter(
                                  (b) => b.status === 'confirmed',
                                ).length
                              }
                            </h4>
                            <p className="small text-muted mb-0">확정됨</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-lg-3 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div
                              className="avatar avatar-sm"
                              style={{
                                background: '#764ba2',
                                color: 'white',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              💰
                            </div>
                          </div>
                          <div className="col ml-n2">
                            <h4 className="mb-1">
                              ₩
                              {upcomingBookings
                                .filter((b) => b.status === 'confirmed')
                                .reduce(
                                  (sum, b) =>
                                    sum +
                                    parseInt(b.amount.replace(/[₩,]/g, '')),
                                  0,
                                )
                                .toLocaleString()}
                            </h4>
                            <p className="small text-muted mb-0">예상 수입</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* History Stats (only for history tab) */}
              {activeTab === 'history' && (
                <div className="row mb-4">
                  <div className="col-12 col-sm-6 col-lg-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div
                              className="avatar avatar-sm"
                              style={{
                                background: '#28a745',
                                color: 'white',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              ✓
                            </div>
                          </div>
                          <div className="col ml-n2">
                            <h4 className="mb-1">
                              {
                                historyBookings.filter(
                                  (b) => b.status === 'completed',
                                ).length
                              }
                            </h4>
                            <p className="small text-muted mb-0">완료된 예약</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-lg-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div
                              className="avatar avatar-sm"
                              style={{
                                background: '#dc3545',
                                color: 'white',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              ✕
                            </div>
                          </div>
                          <div className="col ml-n2">
                            <h4 className="mb-1">
                              {
                                historyBookings.filter(
                                  (b) => b.status === 'cancelled',
                                ).length
                              }
                            </h4>
                            <p className="small text-muted mb-0">취소된 예약</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-lg-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <div
                              className="avatar avatar-sm"
                              style={{
                                background: '#764ba2',
                                color: 'white',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              💰
                            </div>
                          </div>
                          <div className="col ml-n2">
                            <h4 className="mb-1">
                              ₩
                              {historyBookings
                                .filter((b) => b.status === 'completed')
                                .reduce(
                                  (sum, b) =>
                                    sum +
                                    parseInt(b.amount.replace(/[₩,]/g, '')),
                                  0,
                                )
                                .toLocaleString()}
                            </h4>
                            <p className="small text-muted mb-0">총 수입</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Filters and Search */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="예약 검색..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="input-group-append">
                              <span className="input-group-text">
                                <i className="fe fe-search" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex gap-2 flex-wrap">
                            <button
                              className={`btn btn-sm ${
                                filterStatus === 'all'
                                  ? 'btn-primary'
                                  : 'btn-outline-secondary'
                              }`}
                              onClick={() => setFilterStatus('all')}
                            >
                              전체
                            </button>
                            <button
                              className={`btn btn-sm ${
                                filterStatus === 'pending'
                                  ? 'btn-primary'
                                  : 'btn-outline-secondary'
                              }`}
                              onClick={() => setFilterStatus('pending')}
                            >
                              대기
                            </button>
                            <button
                              className={`btn btn-sm ${
                                filterStatus === 'confirmed'
                                  ? 'btn-primary'
                                  : 'btn-outline-secondary'
                              }`}
                              onClick={() => setFilterStatus('confirmed')}
                            >
                              확정
                            </button>
                            <button
                              className={`btn btn-sm ${
                                filterStatus === 'completed'
                                  ? 'btn-primary'
                                  : 'btn-outline-secondary'
                              }`}
                              onClick={() => setFilterStatus('completed')}
                            >
                              완료
                            </button>
                            <button
                              className={`btn btn-sm ${
                                filterStatus === 'cancelled'
                                  ? 'btn-primary'
                                  : 'btn-outline-secondary'
                              }`}
                              onClick={() => setFilterStatus('cancelled')}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bookings Table */}
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-header-title mb-0">
                        {activeTab === 'upcoming' ? '예정된 예약' : '예약 기록'}{' '}
                        ({displayedBookings.length})
                      </h4>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-sm table-nowrap card-table">
                          <thead>
                            <tr>
                              <th>예약 ID</th>
                              <th>고객</th>
                              <th>서비스</th>
                              <th>날짜 & 시간</th>
                              <th>상태</th>
                              <th>금액</th>
                              <th>작업</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedBookings
                              .filter((booking) => {
                                const matchesSearch =
                                  booking.customerName
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()) ||
                                  booking.service
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase());

                                const matchesStatus =
                                  filterStatus === 'all' ||
                                  booking.status === filterStatus;

                                return matchesSearch && matchesStatus;
                              })
                              .map((booking) => (
                                <tr key={booking.id}>
                                  <td>#{booking.id}</td>
                                  <td>
                                    <h6 className="mb-0">
                                      {booking.customerName}
                                    </h6>
                                  </td>
                                  <td>
                                    <div>{booking.service}</div>
                                    {booking.notes && (
                                      <small className="text-muted">
                                        {booking.notes}
                                      </small>
                                    )}
                                  </td>
                                  <td>
                                    <div className="text-muted small">
                                      {booking.date}
                                    </div>
                                    <div className="text-muted small">
                                      {booking.time}
                                    </div>
                                  </td>
                                  <td>
                                    <span
                                      className={`badge ${getStatusBadgeClass(booking.status)}`}
                                    >
                                      {booking.status === 'confirmed'
                                        ? '확정'
                                        : booking.status === 'pending'
                                          ? '대기'
                                          : booking.status === 'completed'
                                            ? '완료'
                                            : '취소'}
                                    </span>
                                  </td>
                                  <td>{booking.amount}</td>
                                  <td>
                                    <div className="btn-group btn-group-sm">
                                      <button
                                        className="btn btn-outline-primary"
                                        title="상세보기"
                                      >
                                        <i className="fe fe-eye" />
                                      </button>
                                      {activeTab === 'upcoming' &&
                                        booking.status === 'pending' && (
                                          <>
                                            <button
                                              className="btn btn-outline-success"
                                              title="확정"
                                            >
                                              <i className="fe fe-check" />
                                            </button>
                                            <button
                                              className="btn btn-outline-danger"
                                              title="거절"
                                            >
                                              <i className="fe fe-x" />
                                            </button>
                                          </>
                                        )}
                                      {activeTab === 'upcoming' &&
                                        booking.status === 'confirmed' && (
                                          <>
                                            <button
                                              className="btn btn-outline-warning"
                                              title="수정"
                                            >
                                              <i className="fe fe-edit-2" />
                                            </button>
                                            <button
                                              className="btn btn-outline-danger"
                                              title="취소"
                                            >
                                              <i className="fe fe-x" />
                                            </button>
                                          </>
                                        )}
                                      {activeTab === 'history' &&
                                        booking.status === 'completed' && (
                                          <button
                                            className="btn btn-outline-secondary"
                                            title="재예약"
                                          >
                                            <i className="fe fe-refresh-cw" />
                                          </button>
                                        )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>

                      {displayedBookings
                        .filter(
                          (booking) =>
                            booking.customerName
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            booking.service
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()),
                        )
                        .filter(
                          (booking) =>
                            filterStatus === 'all' ||
                            booking.status === filterStatus,
                        ).length === 0 && (
                        <div className="text-center py-5">
                          <div
                            className="mb-3"
                            style={{ fontSize: '3rem', opacity: 0.3 }}
                          >
                            📅
                          </div>
                          <h5 className="text-muted">예약이 없습니다</h5>
                          <p className="text-muted small">
                            검색어나 필터를 조정해보세요
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Pagination */}
                    {displayedBookings.length > 0 && (
                      <div className="card-footer">
                        <nav>
                          <ul className="pagination pagination-sm mb-0 justify-content-center">
                            <li className="page-item disabled">
                              <a className="page-link" href="#">
                                이전
                              </a>
                            </li>
                            <li className="page-item active">
                              <a className="page-link" href="#">
                                1
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                2
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#">
                                다음
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-header-title mb-0">예약 알림 설정</h4>
                  </div>
                  <div className="card-body">
                    <h5 className="mb-4">
                      <i className="fe fe-bell mr-2" />
                      리마인더 알림
                    </h5>

                    <div className="form-group mb-4">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="emailReminders"
                          checked={notificationSettings.emailReminders}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              emailReminders: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="emailReminders"
                        >
                          <strong>이메일 리마인더 발송</strong>
                          <p className="text-muted small mb-0">
                            고객에게 예약 전 이메일로 리마인더 알림을 보냅니다
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="smsReminders"
                          checked={notificationSettings.smsReminders}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              smsReminders: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="smsReminders"
                        >
                          <strong>SMS 리마인더 발송</strong>
                          <p className="text-muted small mb-0">
                            고객에게 예약 전 SMS로 리마인더 알림을 보냅니다
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="reminderHours">
                        <strong>리마인더 발송 시기</strong>
                      </label>
                      <select
                        className="form-control"
                        id="reminderHours"
                        value={notificationSettings.reminderHours}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            reminderHours: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value={1}>1시간 전</option>
                        <option value={6}>6시간 전</option>
                        <option value={12}>12시간 전</option>
                        <option value={24}>24시간 전</option>
                        <option value={48}>48시간 전</option>
                        <option value={72}>3일 전</option>
                      </select>
                      <small className="form-text text-muted">
                        예약 시간 {notificationSettings.reminderHours}시간 전에
                        고객에게 알림을 보냅니다
                      </small>
                    </div>

                    <hr className="my-5" />

                    <h5 className="mb-4">
                      <i className="fe fe-bell mr-2" />
                      관리자 알림
                    </h5>

                    <div className="form-group mb-4">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="newBookingAlert"
                          checked={notificationSettings.newBookingAlert}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              newBookingAlert: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="newBookingAlert"
                        >
                          <strong>신규 예약 알림</strong>
                          <p className="text-muted small mb-0">
                            새로운 예약이 들어올 때 알림을 받습니다
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cancellationAlert"
                          checked={notificationSettings.cancellationAlert}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              cancellationAlert: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="cancellationAlert"
                        >
                          <strong>예약 취소 알림</strong>
                          <p className="text-muted small mb-0">
                            고객이 예약을 취소할 때 알림을 받습니다
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="modificationAlert"
                          checked={notificationSettings.modificationAlert}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              modificationAlert: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="modificationAlert"
                        >
                          <strong>예약 변경 알림</strong>
                          <p className="text-muted small mb-0">
                            고객이 예약을 변경할 때 알림을 받습니다
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="alert alert-info">
                      <i className="fe fe-info mr-2" />
                      알림 설정은 즉시 저장됩니다. 이메일 및 SMS 발송에는 추가
                      비용이 발생할 수 있습니다.
                    </div>

                    <div className="text-right">
                      <button className="btn btn-primary">
                        <i className="fe fe-save mr-1" />
                        설정 저장
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookings;
