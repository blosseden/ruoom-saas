import { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

/**
 * Customer My Page - View and manage bookings
 */

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  price: number;
  createdAt: string;
}

const CustomerMyPage: FC = () => {
  const { tenantSlug } = useParams<{ tenantSlug: string }>();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>(
    'upcoming',
  );
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Mock bookings
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      service: '요가 클래스',
      date: '2026-01-20',
      time: '10:00',
      duration: 60,
      status: 'confirmed',
      price: 30000,
      createdAt: '2026-01-15',
    },
    {
      id: '2',
      service: '개인 트레이닝 (PT)',
      date: '2026-01-22',
      time: '14:00',
      duration: 60,
      status: 'confirmed',
      price: 50000,
      createdAt: '2026-01-16',
    },
    {
      id: '3',
      service: '필라테스',
      date: '2026-01-10',
      time: '16:00',
      duration: 50,
      status: 'completed',
      price: 40000,
      createdAt: '2026-01-05',
    },
    {
      id: '4',
      service: '그룹 수업',
      date: '2026-01-08',
      time: '09:00',
      duration: 90,
      status: 'completed',
      price: 20000,
      createdAt: '2026-01-03',
    },
  ]);

  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'upcoming') {
      return booking.status === 'confirmed' || booking.status === 'pending';
    } else if (activeTab === 'past') {
      return booking.status === 'completed';
    } else {
      return booking.status === 'cancelled';
    }
  });

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return date.toLocaleDateString('ko-KR', options);
  };

  const handleCancelBooking = () => {
    // In real app, call API to cancel booking
    console.log('Cancelling booking:', selectedBooking?.id);
    setShowCancelModal(false);
    setSelectedBooking(null);
    // Show success message
    alert('예약이 취소되었습니다.');
  };

  const handleModifyBooking = () => {
    // In real app, call API to modify booking
    console.log('Modifying booking:', selectedBooking?.id, {
      date: newDate,
      time: newTime,
    });
    setShowModifyModal(false);
    setSelectedBooking(null);
    setNewDate('');
    setNewTime('');
    // Show success message
    alert('예약이 변경되었습니다.');
  };

  const openCancelModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const openModifyModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewDate(booking.date);
    setNewTime(booking.time);
    setShowModifyModal(true);
  };

  return (
    <div className="customer-mypage">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <Link
            className="btn btn-link text-decoration-none"
            to={`/${tenantSlug}`}
          >
            <i className="fe fe-home mr-2" />홈
          </Link>
          <h5 className="mb-0 ml-auto">마이페이지</h5>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            {/* Customer Info Card */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div
                      className="customer-avatar"
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#667eea',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                      }}
                    >
                      김
                    </div>
                  </div>
                  <div className="col">
                    <h5 className="mb-1">김고객님</h5>
                    <p className="text-muted mb-0">customer@email.com</p>
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="fe fe-edit mr-1" />
                      정보 수정
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="card mb-4">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 'upcoming' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('upcoming')}
                    >
                      예정된 예약
                      {bookings.filter(
                        (b) =>
                          b.status === 'confirmed' || b.status === 'pending',
                      ).length > 0 && (
                        <span className="badge badge-primary ml-2">
                          {
                            bookings.filter(
                              (b) =>
                                b.status === 'confirmed' ||
                                b.status === 'pending',
                            ).length
                          }
                        </span>
                      )}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
                      onClick={() => setActiveTab('past')}
                    >
                      지난 예약
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 'cancelled' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('cancelled')}
                    >
                      취소된 예약
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-5">
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                      📅
                    </div>
                    <p className="text-muted">
                      {activeTab === 'upcoming' && '예정된 예약이 없습니다.'}
                      {activeTab === 'past' && '지난 예약이 없습니다.'}
                      {activeTab === 'cancelled' && '취소된 예약이 없습니다.'}
                    </p>
                    {activeTab === 'upcoming' && (
                      <Link
                        to={`/${tenantSlug}/booking`}
                        className="btn btn-primary"
                      >
                        <i className="fe fe-plus mr-1" />새 예약하기
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="list-group-item px-0 py-3"
                      >
                        <div className="row align-items-center">
                          <div className="col">
                            <h5 className="mb-1">{booking.service}</h5>
                            <p className="text-muted mb-1">
                              <i className="fe fe-calendar mr-1" />
                              {formatDate(booking.date)}
                            </p>
                            <p className="text-muted mb-0">
                              <i className="fe fe-clock mr-1" />
                              {booking.time} ({booking.duration}분)
                            </p>
                          </div>
                          <div className="col-auto text-center">
                            <div className="mb-1">
                              <span
                                className={`badge ${
                                  booking.status === 'confirmed'
                                    ? 'badge-success'
                                    : booking.status === 'pending'
                                      ? 'badge-warning'
                                      : booking.status === 'completed'
                                        ? 'badge-primary'
                                        : 'badge-danger'
                                }`}
                              >
                                {booking.status === 'confirmed'
                                  ? '확정'
                                  : booking.status === 'pending'
                                    ? '대기'
                                    : booking.status === 'completed'
                                      ? '완료'
                                      : '취소'}
                              </span>
                            </div>
                            <div className="text-primary font-weight-bold">
                              {booking.price.toLocaleString()}원
                            </div>
                          </div>
                          {activeTab === 'upcoming' && (
                            <div className="col-auto ml-3">
                              <div className="btn-group-vertical">
                                <button
                                  className="btn btn-sm btn-outline-primary mb-1"
                                  onClick={() => openModifyModal(booking)}
                                >
                                  <i className="fe fe-edit mr-1" />
                                  변경
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => openCancelModal(booking)}
                                >
                                  <i className="fe fe-x mr-1" />
                                  취소
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="card-body">
                <h6 className="card-title mb-3">빠른 메뉴</h6>
                <div className="row">
                  <div className="col-6 col-md-3 mb-3">
                    <Link
                      to={`/${tenantSlug}/booking`}
                      className="text-decoration-none"
                    >
                      <div className="quick-action-card text-center p-3 bg-light rounded">
                        <div style={{ fontSize: '2rem' }}>➕</div>
                        <small className="d-block mt-2">새 예약</small>
                      </div>
                    </Link>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <button className="btn text-decoration-none w-100">
                      <div className="quick-action-card text-center p-3 bg-light rounded w-100">
                        <div style={{ fontSize: '2rem' }}>📝</div>
                        <small className="d-block mt-2">이용 내역</small>
                      </div>
                    </button>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <button className="btn text-decoration-none w-100">
                      <div className="quick-action-card text-center p-3 bg-light rounded w-100">
                        <div style={{ fontSize: '2rem' }}>💳</div>
                        <small className="d-block mt-2">결제 내역</small>
                      </div>
                    </button>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <button className="btn text-decoration-none w-100">
                      <div className="quick-action-card text-center p-3 bg-light rounded w-100">
                        <div style={{ fontSize: '2rem' }}>⚙️</div>
                        <small className="d-block mt-2">설정</small>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedBooking && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">예약 취소</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    setShowCancelModal(false);
                    setSelectedBooking(null);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="alert alert-warning">
                  <i className="fe fe-alert-triangle mr-2" />
                  정말로 예약을 취소하시겠습니까?
                </div>
                <h6>예약 정보</h6>
                <p className="mb-1">
                  <strong>서비스:</strong> {selectedBooking.service}
                </p>
                <p className="mb-1">
                  <strong>날짜:</strong> {formatDate(selectedBooking.date)}
                </p>
                <p className="mb-0">
                  <strong>시간:</strong> {selectedBooking.time}
                </p>

                <hr />

                <h6>취소 정책</h6>
                <ul className="small text-muted">
                  <li>예약 24시간 전까지: 전액 환불</li>
                  <li>예약 6-24시간 전: 50% 환불</li>
                  <li>예약 6시간 이내: 환불 불가</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCancelModal(false);
                    setSelectedBooking(null);
                  }}
                >
                  닫기
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleCancelBooking}
                >
                  <i className="fe fe-x mr-1" />
                  예약 취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modify Modal */}
      {showModifyModal && selectedBooking && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">예약 변경</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    setShowModifyModal(false);
                    setSelectedBooking(null);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6>현재 예약</h6>
                  <p className="mb-1">
                    <strong>서비스:</strong> {selectedBooking.service}
                  </p>
                  <p className="mb-1">
                    <strong>날짜:</strong> {formatDate(selectedBooking.date)}
                  </p>
                  <p className="mb-0">
                    <strong>시간:</strong> {selectedBooking.time}
                  </p>
                </div>

                <hr />

                <h6>새로운 날짜와 시간 선택</h6>

                <div className="form-group">
                  <label htmlFor="newDate">날짜</label>
                  <input
                    type="date"
                    className="form-control"
                    id="newDate"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newTime">시간</label>
                  <input
                    type="time"
                    className="form-control"
                    id="newTime"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  />
                </div>

                <div className="alert alert-info small">
                  <i className="fe fe-info mr-2" />
                  예약 변경은 최소 24시간 전에 가능합니다.
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModifyModal(false);
                    setSelectedBooking(null);
                  }}
                >
                  닫기
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleModifyBooking}
                  disabled={!newDate || !newTime}
                >
                  <i className="fe fe-check mr-1" />
                  변경하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerMyPage;
