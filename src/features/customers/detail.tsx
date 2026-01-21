import { FC, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

interface Booking {
  id: number;
  date: string;
  service: string;
  time: string;
  status: 'completed' | 'cancelled' | 'confirmed' | 'pending';
  amount: string;
}

interface Note {
  id: number;
  date: string;
  author: string;
  content: string;
  category: 'general' | 'preference' | 'issue' | 'compliment';
}

interface Communication {
  id: number;
  date: string;
  type: 'email' | 'sms' | 'call' | 'in-person';
  subject: string;
  content: string;
  author: string;
}

/**
 * Epic E: Customer Detail Page
 * 고객 상세 정보, 예약 내역, 메모, 태그, 소통 로그
 */
const CustomerDetail: FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'notes' | 'communications'
  >('overview');
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<
    'general' | 'preference' | 'issue' | 'compliment'
  >('general');
  const [newTag, setNewTag] = useState('');

  // Mock customer data
  const customer = {
    id: parseInt(customerId || '1'),
    name: '홍길동',
    email: 'honggildong@example.com',
    phone: '010-1234-5678',
    status: 'active',
    totalBookings: 12,
    totalSpent: '₩1,200,000',
    lastBooking: '2026-01-15',
    memberSince: '2025-06-01',
    address: '서울시 강남구 테헤란로 123',
    birthday: '1990-05-15',
    tags: ['VIP', '요가애호가', '주중예약'],
    preferredServices: ['요가 클래스', '필라테스'],
    preferredDays: ['월', '수', '금'],
    preferredTime: '오전',
    emergencyContact: '010-9999-8888 (配偶)',
    notes: '허리 디스크 이력 있음. 저강도 운동 선호',
  };

  // Mock booking history
  const bookings: Booking[] = [
    {
      id: 1,
      date: '2026-01-15',
      service: '요가 클래스',
      time: '10:00',
      status: 'completed',
      amount: '₩30,000',
    },
    {
      id: 2,
      date: '2026-01-08',
      service: '필라테스',
      time: '14:00',
      status: 'completed',
      amount: '₩50,000',
    },
    {
      id: 3,
      date: '2026-01-05',
      service: '요가 클래스',
      time: '10:00',
      status: 'completed',
      amount: '₩30,000',
    },
    {
      id: 4,
      date: '2025-12-28',
      service: 'PT 룸',
      time: '16:00',
      status: 'cancelled',
      amount: '₩50,000',
    },
    {
      id: 5,
      date: '2025-12-20',
      service: '그룹 클래스',
      time: '18:00',
      status: 'completed',
      amount: '₩20,000',
    },
    {
      id: 6,
      date: '2025-12-15',
      service: '요가 클래스',
      time: '10:00',
      status: 'completed',
      amount: '₩30,000',
    },
  ];

  // Mock notes
  const notes: Note[] = [
    {
      id: 1,
      date: '2026-01-14',
      author: '김매니저',
      content: '허리 디스크 이력 있음. 저강도 운동 선호',
      category: 'issue',
    },
    {
      id: 2,
      date: '2026-01-10',
      author: '이강사',
      content: '요가 자세 매우 잘함. 유연성 좋음',
      category: 'compliment',
    },
    {
      id: 3,
      date: '2026-01-05',
      author: '박매니저',
      content: '주중 오전 시간대 선호',
      category: 'preference',
    },
  ];

  // Mock communications
  const communications: Communication[] = [
    {
      id: 1,
      date: '2026-01-14',
      type: 'in-person',
      subject: '상담',
      content: '건강 상태 체크 및 운동 추천',
      author: '김매니저',
    },
    {
      id: 2,
      date: '2026-01-10',
      type: 'sms',
      subject: '예약 확인',
      content: '내일 예약 확인 메시지 발송',
      author: '시스템',
    },
    {
      id: 3,
      date: '2026-01-05',
      type: 'email',
      subject: '환영 이메일',
      content: '신규 회원 가입 환영',
      author: '시스템',
    },
  ];

  const handleAddNote = () => {
    alert(
      `메모 추가: ${newNote} (${newNoteCategory})\n\n데모 버전 - 실제로는 DB에 저장`,
    );
    setNewNote('');
    setShowAddNoteModal(false);
  };

  const handleAddTag = () => {
    if (newTag && !customer.tags.includes(newTag)) {
      alert(`태그 추가: ${newTag}\n\n데모 버전 - 실제로는 DB에 저장`);
      setNewTag('');
      setShowAddTagModal(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    alert(`태그 제거: ${tag}\n\n데모 버전 - 실제로는 DB에서 삭제`);
  };

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

      {/* Main Content */}
      <div className="main-content">
        <div className="container-fluid pt-4">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <button
                        className="btn btn-outline-secondary mr-2"
                        onClick={() => navigate(-1)}
                      >
                        <i className="fe fe-arrow-left mr-1" />
                        뒤로
                      </button>
                    </div>
                    <div className="col">
                      <h2 className="mb-0">{customer.name}</h2>
                      <p className="text-muted mb-0">
                        {customer.email} | {customer.phone}
                      </p>
                    </div>
                    <div className="col-auto">
                      <span
                        className={`badge ${
                          customer.status === 'active'
                            ? 'badge-success'
                            : 'badge-secondary'
                        }`}
                      >
                        {customer.status === 'active' ? '활성' : '비활성'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '2rem' }}>📅</div>
                  <h3 className="mt-2 mb-0">{customer.totalBookings}</h3>
                  <p className="text-muted mb-0">총 예약</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '2rem' }}>💰</div>
                  <h3 className="mt-2 mb-0">{customer.totalSpent}</h3>
                  <p className="text-muted mb-0">총 결제액</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '2rem' }}>📅</div>
                  <h4 className="mt-2 mb-0">{customer.memberSince}</h4>
                  <p className="text-muted mb-0">가입일</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '2rem' }}>🕐</div>
                  <h4 className="mt-2 mb-0">{customer.lastBooking}</h4>
                  <p className="text-muted mb-0">마지막 예약</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="mb-0">🏷️ 태그</h5>
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => setShowAddTagModal(true)}
                      >
                        <i className="fe fe-plus mr-1" />
                        태그 추가
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {customer.tags.length === 0 ? (
                    <p className="text-muted mb-0">태그 없음</p>
                  ) : (
                    <div>
                      {customer.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge badge-primary mr-2 mb-2"
                          style={{
                            fontSize: '0.9rem',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleRemoveTag(tag)}
                          title="클릭하여 제거"
                        >
                          {tag} <i className="fe fe-x ml-1" />
                        </span>
                      ))}
                    </div>
                  )}
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
                    className={`nav-link ${
                      activeTab === 'overview' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <i className="fe fe-user mr-1" />
                    개요
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === 'bookings' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('bookings')}
                  >
                    <i className="fe fe-calendar mr-1" />
                    예약 내역
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'notes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notes')}
                  >
                    <i className="fe fe-file-text mr-1" />
                    메모
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === 'communications' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('communications')}
                  >
                    <i className="fe fe-message-square mr-1" />
                    소통 로그
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="row">
              {/* Personal Information */}
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">개인정보</h5>
                  </div>
                  <div className="card-body">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th style={{ width: '30%' }}>이름</th>
                          <td>{customer.name}</td>
                        </tr>
                        <tr>
                          <th>이메일</th>
                          <td>{customer.email}</td>
                        </tr>
                        <tr>
                          <th>전화번호</th>
                          <td>{customer.phone}</td>
                        </tr>
                        <tr>
                          <th>생년월일</th>
                          <td>{customer.birthday}</td>
                        </tr>
                        <tr>
                          <th>주소</th>
                          <td>{customer.address}</td>
                        </tr>
                        <tr>
                          <th>비상연락망</th>
                          <td>{customer.emergencyContact}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">선호사항</h5>
                  </div>
                  <div className="card-body">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th style={{ width: '30%' }}>선호 서비스</th>
                          <td>
                            {customer.preferredServices.map(
                              (service, index) => (
                                <span
                                  key={index}
                                  className="badge badge-info mr-1 mb-1"
                                >
                                  {service}
                                </span>
                              ),
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>선호 요일</th>
                          <td>
                            {customer.preferredDays.map((day, index) => (
                              <span
                                key={index}
                                className="badge badge-secondary mr-1 mb-1"
                              >
                                {day}요일
                              </span>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <th>선호 시간</th>
                          <td>
                            <span className="badge badge-primary">
                              {customer.preferredTime}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="col-12">
                <div className="card border-warning">
                  <div className="card-body">
                    <h6 className="text-warning mb-2">
                      <i className="fe fe-alert-triangle mr-1" />
                      중요 메모
                    </h6>
                    <p className="mb-0">{customer.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">예약 내역</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm table-nowrap">
                        <thead>
                          <tr>
                            <th>날짜</th>
                            <th>서비스</th>
                            <th>시간</th>
                            <th>상태</th>
                            <th>금액</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking.id}>
                              <td>{booking.date}</td>
                              <td>{booking.service}</td>
                              <td>{booking.time}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    booking.status === 'completed'
                                      ? 'badge-success'
                                      : booking.status === 'confirmed'
                                        ? 'badge-primary'
                                        : booking.status === 'pending'
                                          ? 'badge-warning'
                                          : 'badge-danger'
                                  }`}
                                >
                                  {booking.status === 'completed'
                                    ? '완료'
                                    : booking.status === 'confirmed'
                                      ? '확정'
                                      : booking.status === 'pending'
                                        ? '대기'
                                        : '취소'}
                                </span>
                              </td>
                              <td>{booking.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="mb-0">메모</h5>
                      </div>
                      <div className="col-auto">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => setShowAddNoteModal(true)}
                        >
                          <i className="fe fe-plus mr-1" />
                          메모 추가
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {notes.length === 0 ? (
                      <p className="text-muted mb-0">메모 없음</p>
                    ) : (
                      <div className="list-group">
                        {notes.map((note) => (
                          <div key={note.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <span
                                  className={`badge mr-2 ${
                                    note.category === 'issue'
                                      ? 'badge-danger'
                                      : note.category === 'compliment'
                                        ? 'badge-success'
                                        : note.category === 'preference'
                                          ? 'badge-info'
                                          : 'badge-secondary'
                                  }`}
                                >
                                  {note.category === 'issue'
                                    ? '이슈'
                                    : note.category === 'compliment'
                                      ? '칭찬'
                                      : note.category === 'preference'
                                        ? '선호'
                                        : '일반'}
                                </span>
                                <strong>{note.author}</strong>
                              </div>
                              <small className="text-muted">{note.date}</small>
                            </div>
                            <p className="mb-0">{note.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Communications Tab */}
          {activeTab === 'communications' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">소통 로그</h5>
                  </div>
                  <div className="card-body">
                    {communications.length === 0 ? (
                      <p className="text-muted mb-0">소통 내역 없음</p>
                    ) : (
                      <div className="list-group">
                        {communications.map((comm) => (
                          <div key={comm.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <span
                                  className={`badge mr-2 ${
                                    comm.type === 'in-person'
                                      ? 'badge-primary'
                                      : comm.type === 'email'
                                        ? 'badge-info'
                                        : comm.type === 'sms'
                                          ? 'badge-warning'
                                          : 'badge-secondary'
                                  }`}
                                >
                                  {comm.type === 'in-person'
                                    ? '대면'
                                    : comm.type === 'email'
                                      ? '이메일'
                                      : comm.type === 'sms'
                                        ? 'SMS'
                                        : '전화'}
                                </span>
                                <strong>{comm.subject}</strong>
                              </div>
                              <small className="text-muted">{comm.date}</small>
                            </div>
                            <p className="mb-1">{comm.content}</p>
                            <small className="text-muted">
                              작성자: {comm.author}
                            </small>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Note Modal */}
      {showAddNoteModal && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">메모 추가</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowAddNoteModal(false)}
                >
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>카테고리</label>
                  <select
                    className="form-control"
                    value={newNoteCategory}
                    onChange={(e) =>
                      setNewNoteCategory(
                        e.target.value as
                          | 'general'
                          | 'preference'
                          | 'issue'
                          | 'compliment',
                      )
                    }
                  >
                    <option value="general">일반</option>
                    <option value="preference">선호</option>
                    <option value="issue">이슈</option>
                    <option value="compliment">칭찬</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>내용</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="메모 내용을 입력하세요..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddNoteModal(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Tag Modal */}
      {showAddTagModal && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">태그 추가</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowAddTagModal(false)}
                >
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>태그명</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="예: VIP, 요가애호가, 주중예약"
                  />
                  <small className="form-text text-muted">
                    추천 태그: VIP, 요가애호가, PT애호가, 필라테스애호가,
                    주중예약, 주말예약, 오전선호, 오후선호
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddTagModal(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDetail;
