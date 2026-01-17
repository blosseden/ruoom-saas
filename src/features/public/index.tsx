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
const PublicWebsite: FC = () => {
  const { tenantSlug } = useParams<{ tenantSlug: string }>();
  const [chatOpen, setChatOpen] = useState(false);

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
        }}
        onClick={() => setChatOpen(!chatOpen)}
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
            width: '350px',
            maxHeight: '500px',
            zIndex: 1000,
          }}
        >
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Chat Support</h6>
            <button
              className="btn btn-sm btn-link text-white p-0"
              onClick={() => setChatOpen(false)}
            >
              ✕
            </button>
          </div>
          <div
            className="card-body"
            style={{ height: '400px', overflowY: 'auto' }}
          >
            <div className="mb-3">
              <div className="d-flex mb-2">
                <div className="bg-light rounded p-2 mr-2">
                  <small>안녕하세요! 무엇을 도와드릴까요?</small>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="메시지를 입력하세요..."
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicWebsite;
