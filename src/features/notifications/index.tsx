import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

interface Notification {
  id: number;
  type: 'booking' | 'cancellation' | 'review' | 'system' | 'payment';
  title: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

/**
 * Epic E: Notification Center
 * 알림 센터 - 신규 예약, 취소, 리뷰, 시스템 공지
 */
const NotificationCenter: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [filterType, setFilterType] = useState<
    'all' | 'booking' | 'cancellation' | 'review' | 'system' | 'payment'
  >('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>(
    'all',
  );

  // Mock notification data
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'booking',
      title: '신규 예약',
      message: '홍길동님이 "요가 클래스"를 예약했습니다. 2026-01-21 10:00',
      date: '2026-01-20',
      time: '18:30',
      read: false,
      priority: 'high',
    },
    {
      id: 2,
      type: 'booking',
      title: '신규 예약',
      message: '김철수님이 "PT 룸"을 예약했습니다. 2026-01-21 14:00',
      date: '2026-01-20',
      time: '17:45',
      read: false,
      priority: 'high',
    },
    {
      id: 3,
      type: 'cancellation',
      title: '예약 취소',
      message: '이영희님이 2026-01-19 "필라테스" 예약을 취소했습니다.',
      date: '2026-01-19',
      time: '15:20',
      read: true,
      priority: 'medium',
    },
    {
      id: 4,
      type: 'review',
      title: '새 리뷰',
      message: '박민수님이 "요가 클래스"에 대한 리뷰를 남겼습니다. ⭐⭐⭐⭐⭐',
      date: '2026-01-19',
      time: '12:10',
      read: true,
      priority: 'medium',
    },
    {
      id: 5,
      type: 'payment',
      title: '결제 완료',
      message: '최수진님의 결제 ₩50,000이 완료되었습니다.',
      date: '2026-01-19',
      time: '10:30',
      read: true,
      priority: 'high',
    },
    {
      id: 6,
      type: 'system',
      title: '시스템 안내',
      message:
        '내일 시스템 점검이 예정되어 있습니다. 새벽 2시간간 서비스가 중단됩니다.',
      date: '2026-01-18',
      time: '09:00',
      read: true,
      priority: 'high',
    },
    {
      id: 7,
      type: 'booking',
      title: '예약 수정',
      message: '홍길동님이 예약 시간을 10:00에서 14:00으로 수정했습니다.',
      date: '2026-01-18',
      time: '16:45',
      read: true,
      priority: 'low',
    },
    {
      id: 8,
      type: 'review',
      title: '새 리뷰',
      message: '김철수님이 "PT 룸"에 대한 리뷰를 남겼습니다. ⭐⭐⭐⭐',
      date: '2026-01-17',
      time: '20:15',
      read: true,
      priority: 'medium',
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType =
      filterType === 'all' || notification.type === filterType;
    const matchesRead =
      filterRead === 'all' ||
      (filterRead === 'read' && notification.read) ||
      (filterRead === 'unread' && !notification.read);

    return matchesType && matchesRead;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    alert(`알림 ${id} 읽음 표시\n\n데모 버전 - 실제로는 DB에 저장`);
  };

  const handleMarkAllAsRead = () => {
    alert('모든 알림 읽음 표시\n\n데모 버전 - 실제로는 DB에 저장');
  };

  const handleDelete = (id: number) => {
    alert(`알림 ${id} 삭제\n\n데모 버전 - 실제로는 DB에서 삭제`);
  };

  const handleSignOut = async () => {
    await mockSignOut();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return '📅';
      case 'cancellation':
        return '❌';
      case 'review':
        return '⭐';
      case 'system':
        return '🔔';
      case 'payment':
        return '💰';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
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
                      <h2 className="mb-0">🔔 알림 센터</h2>
                      <p className="text-muted mb-0">
                        {unreadCount > 0 && `${unreadCount}개의 읽지 않은 알림`}
                      </p>
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleMarkAllAsRead}
                      >
                        <i className="fe fe-check mr-1" />
                        모두 읽음 표시
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <div className="d-flex gap-2">
                        <button
                          className={`btn btn-sm ${
                            filterType === 'all'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterType('all')}
                        >
                          전체
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterType === 'booking'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterType('booking')}
                        >
                          예약
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterType === 'cancellation'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterType('cancellation')}
                        >
                          취소
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterType === 'review'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterType('review')}
                        >
                          리뷰
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterType === 'payment'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterType('payment')}
                        >
                          결제
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterType === 'system'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterType('system')}
                        >
                          시스템
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex gap-2">
                        <button
                          className={`btn btn-sm ${
                            filterRead === 'all'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterRead('all')}
                        >
                          모두
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterRead === 'unread'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterRead('unread')}
                        >
                          읽지 않음
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterRead === 'read'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterRead('read')}
                        >
                          읽음
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    알림 목록 ({filteredNotifications.length})
                  </h5>
                </div>
                <div className="list-group list-group-flush">
                  {filteredNotifications.length === 0 ? (
                    <div className="card-body text-center">
                      <p className="text-muted mb-0">알림이 없습니다.</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`list-group-item ${
                          !notification.read ? 'bg-light' : ''
                        }`}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="d-flex align-items-start">
                            <div
                              className="rounded-circle mr-3 d-flex align-items-center justify-content-center"
                              style={{
                                width: '50px',
                                height: '50px',
                                background: notification.read
                                  ? '#e2e8f0'
                                  : '#667eea',
                                color: 'white',
                                fontSize: '1.5rem',
                              }}
                            >
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div>
                              <div className="d-flex align-items-center mb-1">
                                <h6 className="mb-0 mr-2">
                                  {notification.title}
                                </h6>
                                {!notification.read && (
                                  <span
                                    className={`badge badge-${getNotificationColor(
                                      notification.priority,
                                    )}`}
                                  >
                                    {notification.priority === 'high' && '중요'}
                                    {notification.priority === 'medium' &&
                                      '보통'}
                                    {notification.priority === 'low' && '낮음'}
                                  </span>
                                )}
                              </div>
                              <p className="mb-1">{notification.message}</p>
                              <small className="text-muted">
                                {notification.date} {notification.time}
                              </small>
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            {!notification.read && (
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  handleMarkAsRead(notification.id)
                                }
                                title="읽음 표시"
                              >
                                <i className="fe fe-check" />
                              </button>
                            )}
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(notification.id)}
                              title="삭제"
                            >
                              <i className="fe fe-trash-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">빠른 설정</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <div className="card border-primary">
                        <div className="card-body text-center">
                          <div style={{ fontSize: '2rem' }}>📧</div>
                          <h6 className="mb-2">이메일 알림</h6>
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="emailNotifications"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="emailNotifications"
                            >
                              활성화
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 mb-3">
                      <div className="card border-success">
                        <div className="card-body text-center">
                          <div style={{ fontSize: '2rem' }}>📱</div>
                          <h6 className="mb-2">SMS 알림</h6>
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="smsNotifications"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="smsNotifications"
                            >
                              활성화
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 mb-3">
                      <div className="card border-warning">
                        <div className="card-body text-center">
                          <div style={{ fontSize: '2rem' }}>🔕</div>
                          <h6 className="mb-2">무음 모드</h6>
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="muteMode"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="muteMode"
                            >
                              활성화
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;
