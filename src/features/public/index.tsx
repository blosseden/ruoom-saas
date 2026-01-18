import { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

/**
 * Epic C: Public Website (Tenant-specific Business Website)
 * Template-based website with:
 * - Main Page with 메뉴바 (About, Location, Product, Service)
 * - Login Elements (Login, Mypage)
 * - Chatbot service
 * - Open Calendar (booking)
 */
interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

const PublicWebsite: FC = () => {
  const { tenantSlug } = useParams<{ tenantSlug: string }>();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Demo FAQs - Mock data
  const demoFAQs: FAQ[] = [
    {
      id: '1',
      question: '운영 시간이 어떻게 되나요?',
      answer: '월-금: 06:00-22:00, 토-일: 08:00-20:00입니다.',
      keywords: ['운영', '시간', '영업', 'open', 'hours'],
    },
    {
      id: '2',
      question: '가격 문의',
      answer:
        '회원권 및 이용 요금은 전화(02-1234-5678) 또는 방문 상담을 통해 안내받으실 수 있습니다.',
      keywords: ['가격', '비용', '요금', '금액', 'price', 'cost'],
    },
    {
      id: '3',
      question: '예약 방법',
      answer:
        '웹사이트의 예약 페이지 또는 전화로 예약 가능합니다. 첫 방문 시 10분 일찍 와주시면 됩니다.',
      keywords: ['예약', 'booking', 'reservation', 'how'],
    },
    {
      id: '4',
      question: '위치/주소',
      answer:
        '서울시 강남구 테헤란로 123에 위치하고 있습니다. 지하철 2호선 역삼역 3번 출구에서 도보 5분 거리입니다.',
      keywords: ['위치', '주소', '주소지', 'location', 'address', 'where'],
    },
    {
      id: '5',
      question: '프로그램 안내',
      answer:
        'PT, 요가, 필라테스, 그룹 수업 등 다양한 프로그램을 운영하고 있습니다. 자세한 내용은 수업 시간표를 확인해주세요.',
      keywords: ['프로그램', '수업', 'program', 'class', 'curriculum'],
    },
  ];

  // Mock business data (나중에 API에서 가져올 데이터)
  const businessData = {
    name: tenantSlug || '홍길동 헬스장',
    tagline: 'Experience the best service in town',
    about:
      '저희는 고객에게 최상의 서비스를 제공하기 위해 최선을 다하고 있습니다. 수년간의 경험과 전문가 팀을 통해 모든 일에 품질과 만족을 보장합니다.',
    location: {
      address: '서울시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      email: 'contact@business.com',
      hours: '월-금: 06:00-22:00, 토-일: 08:00-20:00',
    },
    products: [
      {
        id: 1,
        name: '1개월 회원권',
        price: '₩150,000',
        description: '1개월 자유 이용',
      },
      {
        id: 2,
        name: '3개월 회원권',
        price: '₩400,000',
        description: '3개월 자유 이용',
      },
      {
        id: 3,
        name: '6개월 회원권',
        price: '₩700,000',
        description: '6개월 자유 이용',
      },
    ],
    services: [
      {
        id: 1,
        icon: '⭐',
        name: '개인 트레이닝',
        description: '1:1 맞춤 트레이닝 서비스',
      },
      {
        id: 2,
        icon: '💎',
        name: '그룹 수업',
        description: '요가, 필라테스, 에어로빅',
      },
      {
        id: 3,
        icon: '🎯',
        name: 'PT 패키지',
        description: '전문 트레이너의 1:1 코칭',
      },
    ],
  };

  // Chatbot logic - Demo version
  const findFAQAnswer = (userMessage: string): string | null => {
    const lowerMessage = userMessage.toLowerCase();

    for (const faq of demoFAQs) {
      for (const keyword of faq.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          return faq.answer;
        }
      }
    }

    return null;
  };

  const getBotResponse = (userMessage: string): string => {
    // Try to find FAQ match first
    const faqAnswer = findFAQAnswer(userMessage);
    if (faqAnswer) {
      return faqAnswer;
    }

    // Default demo responses based on context
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes('안녕') ||
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hi')
    ) {
      return (
        '안녕하세요! 저는 ' +
        businessData.name +
        '의 AI 어시스턴트입니다. 운영 시간, 예약, 가격 등에 대해 물어보세요! 😊'
      );
    }

    if (lowerMessage.includes('감사') || lowerMessage.includes('thank')) {
      return '천만에요! 더 궁금한 점이 있으시면 언제든 물어봐 주세요! 😊';
    }

    if (
      lowerMessage.includes('전화') ||
      lowerMessage.includes('연락') ||
      lowerMessage.includes('문의')
    ) {
      return `전화 문의: ${businessData.location.phone}\n이메일: ${businessData.location.email}`;
    }

    if (lowerMessage.includes('bye') || lowerMessage.includes('잘')) {
      return '안녕히 가세요! 또 방문해 주세요 👋';
    }

    // Default fallback response
    return `죄송합니다. 해당 질문에 대한 답변을 찾을 수 없습니다.

자주 묻는 질문:
• 운영 시간
• 가격 문의
• 예약 방법
• 위치/주소
• 프로그램 안내


또는 '02-1234-5678'로 전화 주시면 상담원이 도와드리겠습니다! 📞`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const now = new Date();
    const userMessage: ChatMessage = {
      id: now.getTime().toString(),
      type: 'user',
      content: inputValue,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay (fixed 1.5 seconds)
    setTimeout(() => {
      const botTime = new Date();
      const botResponse: ChatMessage = {
        id: (botTime.getTime() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputValue),
        timestamp: botTime,
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);

      // Save to localStorage (demo chat history)
      const chatHistory = JSON.parse(
        localStorage.getItem('chatHistory') || '[]',
      );
      chatHistory.push(userMessage, botResponse);
      localStorage.setItem(
        'chatHistory',
        JSON.stringify(chatHistory.slice(-50)),
      ); // Keep last 50 messages
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to={`/${tenantSlug}`}>
            <strong style={{ color: '#667eea' }}>{businessData.name}</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#location">
                  Location
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#products">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#booking">
                  Booking
                </a>
              </li>
              <li className="nav-item ml-2">
                <Link
                  className="btn btn-sm btn-outline-primary"
                  to={ROUTES.AUTH.SIGN_IN}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item ml-2">
                <Link
                  className="btn btn-sm btn-primary"
                  to={ROUTES.CUSTOMER.MY_PAGE}
                >
                  My Page
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <div className="container text-center py-5">
          <h1 className="display-3 font-weight-bold mb-3">
            Welcome to {businessData.name}
          </h1>
          <p className="lead mb-4">{businessData.tagline}</p>
          <a
            href="#booking"
            className="btn btn-lg btn-light text-primary font-weight-bold"
          >
            Book Now
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="display-4 mb-4">About Us</h2>
              <p className="lead text-muted">{businessData.about}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-5 bg-light">
        <div className="container">
          <h2 className="display-4 text-center mb-5">Location & Contact</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <i className="fe fe-map-pin text-primary mr-2" />
                    Address
                  </h5>
                  <p className="card-text">{businessData.location.address}</p>

                  <h5 className="card-title mb-3 mt-4">
                    <i className="fe fe-phone text-primary mr-2" />
                    Phone
                  </h5>
                  <p className="card-text">{businessData.location.phone}</p>

                  <h5 className="card-title mb-3 mt-4">
                    <i className="fe fe-mail text-primary mr-2" />
                    Email
                  </h5>
                  <p className="card-text">{businessData.location.email}</p>

                  <h5 className="card-title mb-3 mt-4">
                    <i className="fe fe-clock text-primary mr-2" />
                    Operating Hours
                  </h5>
                  <p className="card-text">{businessData.location.hours}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body p-0">
                  <div
                    style={{
                      width: '100%',
                      height: '400px',
                      background: '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <p className="text-muted">
                      Map Integration (Google Maps API)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-5">
        <div className="container">
          <h2 className="display-4 text-center mb-5">Products & Pricing</h2>
          <div className="row">
            {businessData.products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100 text-center shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <h2 className="text-primary my-4">{product.price}</h2>
                    <p className="card-text text-muted">
                      {product.description}
                    </p>
                    <a href="#booking" className="btn btn-outline-primary mt-3">
                      Purchase
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <h2 className="display-4 text-center mb-5">Our Services</h2>
          <div className="row">
            {businessData.services.map((service) => (
              <div key={service.id} className="col-md-4 mb-4">
                <div className="card h-100 text-center shadow-sm">
                  <div className="card-body">
                    <div style={{ fontSize: '3rem' }} className="mb-3">
                      {service.icon}
                    </div>
                    <h4 className="card-title">{service.name}</h4>
                    <p className="card-text text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-5">
        <div className="container">
          <h2 className="display-4 text-center mb-5">Book an Appointment</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow">
                <div className="card-body p-5 text-center">
                  <i
                    className="fe fe-calendar"
                    style={{ fontSize: '4rem', color: '#667eea' }}
                  />
                  <h4 className="mt-4 mb-3">Open Calendar</h4>
                  <p className="text-muted mb-4">
                    예약 가능한 시간을 확인하고 원하는 시간대를 선택하세요.
                  </p>
                  <Link
                    to={`/${tenantSlug}/booking`}
                    className="btn btn-lg btn-primary"
                  >
                    Go to Booking Calendar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">
            © 2026 {businessData.name}. Powered by{' '}
            <a href="https://www.ruoomsoftware.com" className="text-primary">
              Ruoom Platform
            </a>
            .
          </p>
        </div>
      </footer>

      {/* Chatbot Button (Floating) */}
      <button
        className="btn btn-primary rounded-circle shadow-lg"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          fontSize: '1.5rem',
          zIndex: 1000,
          animation: chatOpen ? 'none' : 'pulse 2s infinite',
        }}
        onClick={() => {
          setChatOpen(!chatOpen);
          // Load chat history on open
          if (!chatOpen && messages.length === 0) {
            const savedHistory = JSON.parse(
              localStorage.getItem('chatHistory') || '[]',
            );
            if (savedHistory.length > 0) {
              setMessages(savedHistory);
            } else {
              // Initial greeting
              const greeting: ChatMessage = {
                id: Date.now().toString(),
                type: 'bot',
                content: `안녕하세요! ${businessData.name}입니다. 😊\n\n무엇을 도와드릴까요?\n\n아래 버튼을 클릭하거나 직접 질문을 입력해주세요!`,
                timestamp: new Date(),
              };
              setMessages([greeting]);
            }
          }
        }}
      >
        💬
      </button>

      {/* Chatbot Modal */}
      {chatOpen && (
        <div
          className="card shadow-lg"
          style={{
            position: 'fixed',
            bottom: '6rem',
            right: '2rem',
            width: '400px',
            maxHeight: '600px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-0">💬 AI Chat Support</h6>
              <small className="opacity-75">데모 버전</small>
            </div>
            <button
              className="btn btn-sm btn-link text-white p-0"
              onClick={() => setChatOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="card-body bg-light"
            style={{
              height: '400px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              padding: '1rem',
            }}
          >
            {messages.length === 0 ? (
              <div className="text-center text-muted mt-5">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                <p>대화를 시작하려면 메시지를 입력하세요</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`d-flex ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div
                    className={`rounded p-2 ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white border'
                    }`}
                    style={{
                      maxWidth: '80%',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    <small className="d-block">{message.content}</small>
                    <div
                      className={`${message.type === 'user' ? 'text-white' : 'text-muted'} mt-1`}
                      style={{ fontSize: '0.65rem' }}
                    >
                      {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="d-flex justify-content-start">
                <div className="bg-white border rounded p-2">
                  <div className="d-flex gap-1">
                    <div
                      className="rounded-circle bg-secondary"
                      style={{
                        width: '8px',
                        height: '8px',
                        animation: 'bounce 1s infinite',
                      }}
                    />
                    <div
                      className="rounded-circle bg-secondary"
                      style={{
                        width: '8px',
                        height: '8px',
                        animation: 'bounce 1s infinite 0.2s',
                      }}
                    />
                    <div
                      className="rounded-circle bg-secondary"
                      style={{
                        width: '8px',
                        height: '8px',
                        animation: 'bounce 1s infinite 0.4s',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions (only show when no messages) */}
          {messages.length <= 1 && (
            <div className="px-3 pt-2 pb-0">
              <small className="text-muted d-block mb-2">자주 묻는 질문:</small>
              <div className="d-flex flex-wrap gap-1 mb-2">
                {demoFAQs.slice(0, 3).map((faq) => (
                  <button
                    key={faq.id}
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleQuickQuestion(faq.question)}
                    style={{ fontSize: '0.75rem' }}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="card-footer p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="메시지를 입력하세요... (Enter: 전송)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                >
                  {isTyping ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </div>
            </div>
            <small
              className="text-muted d-block mt-1"
              style={{ fontSize: '0.7rem' }}
            >
              이 챗봇은 데모 버전입니다. 실제 AI 연동되지 않습니다.
            </small>
          </div>

          <style>
            {`
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
              }
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
              }
            `}
          </style>
        </div>
      )}
    </>
  );
};

export default PublicWebsite;
