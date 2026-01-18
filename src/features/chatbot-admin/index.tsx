import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  sessionId: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  category: string;
  isActive: boolean;
  usageCount: number;
}

interface ChatSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  messageCount: number;
  status: 'active' | 'resolved' | 'abandoned';
}

/**
 * Chatbot Admin Management Interface (Demo Version)
 * - View chat history
 * - Manage FAQs/training data
 * - Configure chatbot responses
 * - Analytics dashboard
 */
const ChatbotAdmin: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'history' | 'faqs' | 'settings'
  >('dashboard');

  // Mock data - Chat History
  const baseTime = new Date();
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      startTime: new Date(baseTime.getTime() - 1000 * 60 * 30),
      messageCount: 8,
      status: 'resolved',
    },
    {
      id: '2',
      startTime: new Date(baseTime.getTime() - 1000 * 60 * 60),
      messageCount: 12,
      status: 'active',
    },
    {
      id: '3',
      startTime: new Date(baseTime.getTime() - 1000 * 60 * 120),
      endTime: new Date(baseTime.getTime() - 1000 * 60 * 110),
      messageCount: 5,
      status: 'abandoned',
    },
    {
      id: '4',
      startTime: new Date(baseTime.getTime() - 1000 * 60 * 180),
      endTime: new Date(baseTime.getTime() - 1000 * 60 * 170),
      messageCount: 15,
      status: 'resolved',
    },
  ]);

  const [selectedSessionMessages, setSelectedSessionMessages] = useState<
    ChatMessage[]
  >([]);

  // Mock data - FAQs
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: '운영 시간이 어떻게 되나요?',
      answer: '월-금: 06:00-22:00, 토-일: 08:00-20:00입니다.',
      keywords: ['운영', '시간', '영업', 'open', 'hours'],
      category: '운영',
      isActive: true,
      usageCount: 45,
    },
    {
      id: '2',
      question: '가격 문의',
      answer:
        '회원권 및 이용 요금은 전화(02-1234-5678) 또는 방문 상담을 통해 안내받으실 수 있습니다.',
      keywords: ['가격', '비용', '요금', '금액', 'price', 'cost'],
      category: '가격',
      isActive: true,
      usageCount: 38,
    },
    {
      id: '3',
      question: '예약 방법',
      answer:
        '웹사이트의 예약 페이지 또는 전화로 예약 가능합니다. 첫 방문 시 10분 일찍 와주시면 됩니다.',
      keywords: ['예약', 'booking', 'reservation', 'how'],
      category: '예약',
      isActive: true,
      usageCount: 52,
    },
    {
      id: '4',
      question: '위치/주소',
      answer:
        '서울시 강남구 테헤란로 123에 위치하고 있습니다. 지하철 2호선 역삼역 3번 출구에서 도보 5분 거리입니다.',
      keywords: ['위치', '주소', '주소지', 'location', 'address', 'where'],
      category: '위치',
      isActive: true,
      usageCount: 29,
    },
    {
      id: '5',
      question: '프로그램 안내',
      answer:
        'PT, 요가, 필라테스, 그룹 수업 등 다양한 프로그램을 운영하고 있습니다. 자세한 내용은 수업 시간표를 확인해주세요.',
      keywords: ['프로그램', '수업', 'program', 'class', 'curriculum'],
      category: '프로그램',
      isActive: true,
      usageCount: 33,
    },
  ]);

  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Analytics stats (mock)
  const stats = {
    totalSessions: chatSessions.length,
    activeSessions: chatSessions.filter((s) => s.status === 'active').length,
    avgMessagesPerSession: Math.round(
      chatSessions.reduce((sum, s) => sum + s.messageCount, 0) /
        chatSessions.length,
    ),
    resolutionRate: 68,
    avgResponseTime: '1.2초',
    topFaq: faqs.reduce(
      (max, faq) => (faq.usageCount > max.usageCount ? faq : max),
      faqs[0],
    ),
  };

  // useEffect to load chat history on mount (disabled for demo)
  // useEffect(() => {
  //   const savedHistory = JSON.parse(
  //     localStorage.getItem('chatHistory') || '[]',
  //   );
  //   if (savedHistory.length > 0 && selectedSessionMessages.length === 0) {
  //     setSelectedSessionMessages(savedHistory.slice(-10));
  //   }
  // }, []);

  const handleSignOut = async () => {
    await mockSignOut();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const handleToggleFaqActive = (id: string) => {
    setFaqs(
      faqs.map((faq) =>
        faq.id === id ? { ...faq, isActive: !faq.isActive } : faq,
      ),
    );
  };

  const handleSaveFaq = (faq: FAQ) => {
    if (editingFaq) {
      setFaqs(faqs.map((f) => (f.id === faq.id ? faq : f)));
      setEditingFaq(null);
    } else {
      setFaqs([...faqs, { ...faq, id: Date.now().toString(), usageCount: 0 }]);
      setShowAddModal(false);
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
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <h2 className="mb-0">🤖 챗봇 관리</h2>
                      <p className="text-muted mb-0">
                        데모 버전 - FAQ 관리 및 챗봇 설정
                      </p>
                    </div>
                    <div className="col-auto ml-auto">
                      <Link
                        to={ROUTES.BUSINESS.DASHBOARD}
                        className="btn btn-outline-secondary"
                      >
                        <i className="fe fe-arrow-left mr-1" />
                        대시보드로
                      </Link>
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
                    className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <i className="fe fe-bar-chart mr-1" />
                    대시보드
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                  >
                    <i className="fe fe-message-square mr-1" />
                    대화 기록
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'faqs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('faqs')}
                  >
                    <i className="fe fe-list mr-1" />
                    FAQ 관리
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <i className="fe fe-settings mr-1" />
                    설정
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="row">
              {/* Stats Cards */}
              <div className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle mr-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: '#667eea',
                          color: 'white',
                          fontSize: '1.5rem',
                        }}
                      >
                        💬
                      </div>
                      <div>
                        <h4 className="mb-0">{stats.totalSessions}</h4>
                        <small className="text-muted">총 대화 수</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle mr-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: '#28a745',
                          color: 'white',
                          fontSize: '1.5rem',
                        }}
                      >
                        ✓
                      </div>
                      <div>
                        <h4 className="mb-0">{stats.resolutionRate}%</h4>
                        <small className="text-muted">해결률</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle mr-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: '#ffc107',
                          color: 'white',
                          fontSize: '1.5rem',
                        }}
                      >
                        ⚡
                      </div>
                      <div>
                        <h4 className="mb-0">{stats.avgResponseTime}</h4>
                        <small className="text-muted">평균 응답 시간</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle mr-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: '#764ba2',
                          color: 'white',
                          fontSize: '1.5rem',
                        }}
                      >
                        📊
                      </div>
                      <div>
                        <h4 className="mb-0">{stats.avgMessagesPerSession}</h4>
                        <small className="text-muted">평균 메시지 수</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top FAQ */}
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">가장 많이 묻는 질문</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{stats.topFaq.question}</h6>
                        <p className="text-muted mb-0 small">
                          {stats.topFaq.answer}
                        </p>
                      </div>
                      <div className="text-right">
                        <h3 className="mb-0 text-primary">
                          {stats.topFaq.usageCount}
                        </h3>
                        <small className="text-muted">사용 횟수</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">최근 대화 세션</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>세션 ID</th>
                            <th>시작 시간</th>
                            <th>메시지 수</th>
                            <th>상태</th>
                            <th>작업</th>
                          </tr>
                        </thead>
                        <tbody>
                          {chatSessions.slice(0, 5).map((session) => (
                            <tr key={session.id}>
                              <td>#{session.id}</td>
                              <td>
                                {new Date(session.startTime).toLocaleString(
                                  'ko-KR',
                                )}
                              </td>
                              <td>{session.messageCount}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    session.status === 'resolved'
                                      ? 'badge-success'
                                      : session.status === 'active'
                                        ? 'badge-primary'
                                        : 'badge-warning'
                                  }`}
                                >
                                  {session.status === 'resolved'
                                    ? '해결됨'
                                    : session.status === 'active'
                                      ? '진행중'
                                      : '미해결'}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => {
                                    setActiveTab('history');
                                    // Mock load messages
                                    const mockMessages: ChatMessage[] = [
                                      {
                                        id: '1',
                                        type: 'user',
                                        content: '안녕하세요',
                                        timestamp: new Date(session.startTime),
                                        sessionId: session.id,
                                      },
                                      {
                                        id: '2',
                                        type: 'bot',
                                        content:
                                          '안녕하세요! 무엇을 도와드릴까요?',
                                        timestamp: new Date(
                                          session.startTime.getTime() + 1000,
                                        ),
                                        sessionId: session.id,
                                      },
                                    ];
                                    setSelectedSessionMessages(mockMessages);
                                  }}
                                >
                                  보기
                                </button>
                              </td>
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

          {/* Chat History Tab */}
          {activeTab === 'history' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">대화 기록</h5>
                    <div>
                      <button className="btn btn-sm btn-outline-secondary mr-2">
                        <i className="fe fe-download mr-1" />
                        내보내기
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="fe fe-trash mr-1" />
                        전체 삭제
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Sessions List */}
                      <div className="col-md-4">
                        <h6 className="mb-3">대화 세션</h6>
                        <div className="list-group">
                          {chatSessions.map((session) => (
                            <button
                              key={session.id}
                              className="list-group-item list-group-item-action"
                              onClick={() => {
                                // Mock load messages for this session
                                const mockMessages: ChatMessage[] = [
                                  {
                                    id: '1',
                                    type: 'user',
                                    content:
                                      '안녕하세요, 운영 시간이 어떻게 되나요?',
                                    timestamp: new Date(session.startTime),
                                    sessionId: session.id,
                                  },
                                  {
                                    id: '2',
                                    type: 'bot',
                                    content:
                                      '월-금: 06:00-22:00, 토-일: 08:00-20:00입니다.',
                                    timestamp: new Date(
                                      session.startTime.getTime() + 1500,
                                    ),
                                    sessionId: session.id,
                                  },
                                  {
                                    id: '3',
                                    type: 'user',
                                    content: '감사합니다!',
                                    timestamp: new Date(
                                      session.startTime.getTime() + 5000,
                                    ),
                                    sessionId: session.id,
                                  },
                                  {
                                    id: '4',
                                    type: 'bot',
                                    content:
                                      '천만에요! 더 궁금한 점이 있으시면 언제든 물어봐 주세요! 😊',
                                    timestamp: new Date(
                                      session.startTime.getTime() + 6500,
                                    ),
                                    sessionId: session.id,
                                  },
                                ];
                                setSelectedSessionMessages(mockMessages);
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h6 className="mb-1">세션 #{session.id}</h6>
                                  <small className="text-muted">
                                    {new Date(session.startTime).toLocaleString(
                                      'ko-KR',
                                    )}
                                  </small>
                                </div>
                                <span
                                  className={`badge badge-sm ${
                                    session.status === 'resolved'
                                      ? 'badge-success'
                                      : session.status === 'active'
                                        ? 'badge-primary'
                                        : 'badge-warning'
                                  }`}
                                >
                                  {session.messageCount} 메시지
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Messages Display */}
                      <div className="col-md-8">
                        <h6 className="mb-3">메시지 내용</h6>
                        <div
                          className="card bg-light"
                          style={{ height: '500px', overflowY: 'auto' }}
                        >
                          <div className="card-body">
                            {selectedSessionMessages.length === 0 ? (
                              <div className="text-center text-muted mt-5">
                                <div
                                  style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem',
                                  }}
                                >
                                  💬
                                </div>
                                <p>왼쪽에서 대화 세션을 선택하세요</p>
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '1rem',
                                }}
                              >
                                {selectedSessionMessages.map((message) => (
                                  <div
                                    key={message.id}
                                    className={`d-flex ${
                                      message.type === 'user'
                                        ? 'justify-content-end'
                                        : 'justify-content-start'
                                    }`}
                                  >
                                    <div
                                      className={`rounded p-2 ${
                                        message.type === 'user'
                                          ? 'bg-primary text-white'
                                          : 'bg-white border'
                                      }`}
                                      style={{
                                        maxWidth: '70%',
                                        whiteSpace: 'pre-wrap',
                                      }}
                                    >
                                      <small>{message.content}</small>
                                      <div
                                        className={`${
                                          message.type === 'user'
                                            ? 'text-white'
                                            : 'text-muted'
                                        } mt-1`}
                                        style={{ fontSize: '0.65rem' }}
                                      >
                                        {new Date(
                                          message.timestamp,
                                        ).toLocaleTimeString('ko-KR')}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Management Tab */}
          {activeTab === 'faqs' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">FAQ 관리</h5>
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowAddModal(true)}
                    >
                      <i className="fe fe-plus mr-1" />새 FAQ 추가
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>질문</th>
                            <th>카테고리</th>
                            <th>키워드</th>
                            <th>사용 횟수</th>
                            <th>상태</th>
                            <th>작업</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faqs.map((faq) => (
                            <tr key={faq.id}>
                              <td>{faq.question}</td>
                              <td>
                                <span className="badge badge-secondary">
                                  {faq.category}
                                </span>
                              </td>
                              <td>
                                <small>{faq.keywords.join(', ')}</small>
                              </td>
                              <td>{faq.usageCount}</td>
                              <td>
                                <button
                                  className={`btn btn-sm ${
                                    faq.isActive
                                      ? 'btn-success'
                                      : 'btn-secondary'
                                  }`}
                                  onClick={() => handleToggleFaqActive(faq.id)}
                                >
                                  {faq.isActive ? '활성' : '비활성'}
                                </button>
                              </td>
                              <td>
                                <div className="btn-group btn-group-sm">
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={() => setEditingFaq(faq)}
                                  >
                                    <i className="fe fe-edit" />
                                  </button>
                                  <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDeleteFaq(faq.id)}
                                  >
                                    <i className="fe fe-trash" />
                                  </button>
                                </div>
                              </td>
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

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">챗봇 기본 설정</h5>
                  </div>
                  <div className="card-body">
                    <div className="form-group mb-3">
                      <label className="form-label">챗봇 이름</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="AI 어시스턴트"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">환영 메시지</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        defaultValue="안녕하세요! 무엇을 도와드릴까요?"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">응답 지연 (ms)</label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={1000}
                        min={500}
                        max={3000}
                      />
                      <small className="form-text text-muted">
                        챗봇 응답 시뮬레이션 지연 시간
                      </small>
                    </div>
                    <button className="btn btn-primary">저장</button>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">대시보드 설정</h5>
                  </div>
                  <div className="card-body">
                    <div className="form-group mb-3">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="showAnalytics"
                          defaultChecked
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="showAnalytics"
                        >
                          챗봇 활성화
                        </label>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="saveHistory"
                          defaultChecked
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="saveHistory"
                        >
                          대화 기록 저장
                        </label>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="showQuickQuestions"
                          defaultChecked
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="showQuickQuestions"
                        >
                          빠른 질문 버튼 표시
                        </label>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">
                        최대 대화 기록 보관 일수
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={30}
                        min={7}
                        max={365}
                      />
                    </div>
                    <button className="btn btn-primary">저장</button>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card border-warning">
                  <div className="card-body">
                    <h6 className="alert-heading">
                      <i className="fe fe-alert-triangle mr-2" />
                      데모 버전 안내
                    </h6>
                    <p className="mb-0">
                      이 챗봇은 데모 버전으로, 실제 AI(OpenAI/Anthropic)가
                      연동되지 않습니다. 키워드 기반의 사전 설정된 FAQ 응답만
                      제공합니다.
                      <br />
                      <strong>
                        실제 AI 연동을 위해서는 별도의 API 키 설정이 필요합니다.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit FAQ Modal */}
      {(showAddModal || editingFaq) && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingFaq ? 'FAQ 편집' : '새 FAQ 추가'}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingFaq(null);
                  }}
                  style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '1.5rem',
                  }}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <FAQForm
                  faq={editingFaq}
                  onSave={handleSaveFaq}
                  onCancel={() => {
                    setShowAddModal(false);
                    setEditingFaq(null);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// FAQ Form Component
interface FAQFormProps {
  faq: FAQ | null;
  onSave: (faq: FAQ) => void;
  onCancel: () => void;
}

const FAQForm: FC<FAQFormProps> = ({ faq, onSave, onCancel }) => {
  const [formData, setFormData] = useState<FAQ>(
    faq || {
      id: '',
      question: '',
      answer: '',
      keywords: [],
      category: '',
      isActive: true,
      usageCount: 0,
    },
  );

  const [keywordInput, setKeywordInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addKeyword = () => {
    if (
      keywordInput.trim() &&
      !formData.keywords.includes(keywordInput.trim())
    ) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput.trim()],
      });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((k) => k !== keyword),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label className="form-label">
          카테고리 <span className="text-danger">*</span>
        </label>
        <select
          className="form-control"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        >
          <option value="">카테고리 선택</option>
          <option value="운영">운영</option>
          <option value="가격">가격</option>
          <option value="예약">예약</option>
          <option value="위치">위치</option>
          <option value="프로그램">프로그램</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div className="form-group mb-3">
        <label className="form-label">
          질문 <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          value={formData.question}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
          placeholder="예: 운영 시간이 어떻게 되나요?"
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">
          답변 <span className="text-danger">*</span>
        </label>
        <textarea
          className="form-control"
          rows={3}
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          placeholder="FAQ 답변을 입력하세요..."
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">키워드</label>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addKeyword();
              }
            }}
            placeholder="키워드 입력 후 Enter 또는 추가 버튼"
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={addKeyword}
            >
              추가
            </button>
          </div>
        </div>
        <div>
          {formData.keywords.map((keyword) => (
            <span
              key={keyword}
              className="badge badge-secondary mr-1 mb-1"
              style={{ cursor: 'pointer' }}
              onClick={() => removeKeyword(keyword)}
            >
              {keyword} ×
            </span>
          ))}
        </div>
        <small className="form-text text-muted">
          키워드는 챗봇이 사용자 질문을 매칭하는 데 사용됩니다
        </small>
      </div>

      <div className="form-group mb-3">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="faqActive"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
          />
          <label className="custom-control-label" htmlFor="faqActive">
            활성화
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          취소
        </button>
        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </div>
    </form>
  );
};

export default ChatbotAdmin;
