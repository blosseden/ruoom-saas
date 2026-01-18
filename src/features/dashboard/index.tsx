import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

/**
 * Epic E: Business Dashboard (Bootstrap Style)
 * Main dashboard for business users
 */
const BusinessDashboard: FC = () => {
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

      {/* Main Content */}
      <div className="main-content">
        <div className="container-fluid pt-4">
          <div className="row">
            <div className="col-12">
              {/* Dashboard Card */}
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-12 col-sm-auto">
                      <h1 className="header-title mb-0">Dashboard</h1>
                      <p className="text-muted mb-0">
                        Welcome back! Here's what's happening today.
                      </p>
                    </div>
                    <div className="col-12 col-sm-auto mt-3 mt-sm-0">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(ROUTES.BUSINESS.CALENDAR)}
                      >
                        <i className="fe fe-plus mr-1" />
                        New Booking
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  {/* Metrics Grid */}
                  <div className="row mb-4">
                    <div className="col-12 col-sm-6 col-lg-3 mb-3">
                      <div
                        className="card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.BUSINESS.BOOKINGS)}
                      >
                        <div className="card-body text-center">
                          <div style={{ fontSize: '2rem' }}>📅</div>
                          <h2 className="mt-2 mb-0">24</h2>
                          <p className="text-muted mb-0">Bookings Today</p>
                          <small className="text-success font-weight-bold">
                            +12%
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3 mb-3">
                      <div
                        className="card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.BUSINESS.SETTINGS)}
                      >
                        <div className="card-body text-center">
                          <div style={{ fontSize: '2rem' }}>💰</div>
                          <h2 className="mt-2 mb-0">₩1,250</h2>
                          <p className="text-muted mb-0">Revenue</p>
                          <small className="text-success font-weight-bold">
                            +8.5%
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3 mb-3">
                      <div
                        className="card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.BUSINESS.CUSTOMERS)}
                      >
                        <div className="card-body text-center">
                          <div style={{ fontSize: '2rem' }}>👥</div>
                          <h2 className="mt-2 mb-0">48</h2>
                          <p className="text-muted mb-0">New Customers</p>
                          <small className="text-success font-weight-bold">
                            +15%
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3 mb-3">
                      <div
                        className="card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(ROUTES.BUSINESS.WEBSITE)}
                      >
                        <div className="card-body text-center">
                          <div style={{ fontSize: '2rem' }}>⭐</div>
                          <h2 className="mt-2 mb-0">4.8</h2>
                          <p className="text-muted mb-0">Average Rating</p>
                          <small className="text-muted">0%</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Row */}
                  <div className="row">
                    {/* Left Column */}
                    <div className="col-12 col-lg-8 mb-4">
                      {/* Recent Bookings */}
                      <div className="card mb-4">
                        <div className="card-header">
                          <div className="row align-items-center">
                            <div className="col">
                              <h4 className="card-header-title">
                                Recent Bookings
                              </h4>
                            </div>
                            <div className="col-auto">
                              <Link
                                to={ROUTES.BUSINESS.BOOKINGS}
                                className="btn btn-sm btn-outline-primary"
                              >
                                View All
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="list-group list-group-flush">
                            {[
                              {
                                name: 'John Doe',
                                service: 'Yoga Class',
                                time: '10:00 AM',
                                status: 'confirmed',
                              },
                              {
                                name: 'Jane Smith',
                                service: 'Personal Training',
                                time: '2:00 PM',
                                status: 'pending',
                              },
                              {
                                name: 'Mike Johnson',
                                service: 'Group Class',
                                time: '4:00 PM',
                                status: 'confirmed',
                              },
                            ].map((booking, i) => (
                              <div
                                key={i}
                                className="list-group-item px-0 py-3"
                              >
                                <div className="row align-items-center">
                                  <div className="col">
                                    <h5 className="mb-1">{booking.name}</h5>
                                    <p className="text-muted mb-0">
                                      {booking.service}
                                    </p>
                                  </div>
                                  <div className="col-auto">
                                    <p className="text-muted mb-1">
                                      {booking.time}
                                    </p>
                                    <span
                                      className={`badge ${
                                        booking.status === 'confirmed'
                                          ? 'badge-success'
                                          : 'badge-warning'
                                      }`}
                                    >
                                      {booking.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-header-title">Quick Actions</h4>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-6 col-md-3 mb-3">
                              <Link
                                to={ROUTES.BUSINESS.CALENDAR}
                                className="text-decoration-none"
                              >
                                <div className="text-center p-3 bg-light rounded">
                                  <div style={{ fontSize: '2rem' }}>📅</div>
                                  <small className="d-block mt-2">
                                    View Calendar
                                  </small>
                                </div>
                              </Link>
                            </div>
                            <div className="col-6 col-md-3 mb-3">
                              <Link
                                to={ROUTES.BUSINESS.CUSTOMERS}
                                className="text-decoration-none"
                              >
                                <div className="text-center p-3 bg-light rounded">
                                  <div style={{ fontSize: '2rem' }}>👥</div>
                                  <small className="d-block mt-2">
                                    Manage Customers
                                  </small>
                                </div>
                              </Link>
                            </div>
                            <div className="col-6 col-md-3 mb-3">
                              <Link
                                to={ROUTES.BUSINESS.WEBSITE}
                                className="text-decoration-none"
                              >
                                <div className="text-center p-3 bg-light rounded">
                                  <div style={{ fontSize: '2rem' }}>🌐</div>
                                  <small className="d-block mt-2">
                                    Edit Website
                                  </small>
                                </div>
                              </Link>
                            </div>
                            <div className="col-6 col-md-3 mb-3">
                              <Link
                                to={ROUTES.BUSINESS.CHAT}
                                className="text-decoration-none"
                              >
                                <div className="text-center p-3 bg-light rounded">
                                  <div style={{ fontSize: '2rem' }}>🤖</div>
                                  <small className="d-block mt-2">
                                    Chat Bot
                                  </small>
                                </div>
                              </Link>
                            </div>
                            <div className="col-6 col-md-3 mb-3">
                              <Link
                                to={ROUTES.BUSINESS.ANALYTICS}
                                className="text-decoration-none"
                              >
                                <div className="text-center p-3 bg-light rounded">
                                  <div style={{ fontSize: '2rem' }}>📊</div>
                                  <small className="d-block mt-2">
                                    Analytics
                                  </small>
                                </div>
                              </Link>
                            </div>
                            <div className="col-6 col-md-3 mb-3">
                              <Link
                                to={ROUTES.BUSINESS.SETTINGS}
                                className="text-decoration-none"
                              >
                                <div className="text-center p-3 bg-light rounded">
                                  <div style={{ fontSize: '2rem' }}>⚙️</div>
                                  <small className="d-block mt-2">
                                    Settings
                                  </small>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-12 col-lg-4">
                      {/* Today's Schedule */}
                      <div className="card mb-4">
                        <div className="card-header">
                          <h4 className="card-header-title">
                            Today's Schedule
                          </h4>
                        </div>
                        <div className="card-body">
                          <div className="list-group list-group-flush">
                            {[
                              {
                                time: '09:00 - 10:00',
                                title: 'Morning Yoga',
                                attendees: 12,
                              },
                              {
                                time: '10:30 - 11:30',
                                title: 'Personal Training',
                                attendees: 1,
                              },
                              {
                                time: '14:00 - 15:00',
                                title: 'Group Fitness',
                                attendees: 20,
                              },
                            ].map((item, i) => (
                              <div
                                key={i}
                                className="list-group-item px-0 py-3 border-left border-primary pl-3"
                              >
                                <small className="text-primary font-weight-bold">
                                  {item.time}
                                </small>
                                <h6 className="mb-1 mt-1">{item.title}</h6>
                                <small className="text-muted">
                                  {item.attendees} attendees
                                </small>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-header-title">Recent Activity</h4>
                        </div>
                        <div className="card-body">
                          <div className="list-group list-group-flush">
                            {[
                              {
                                icon: '✅',
                                text: (
                                  <>
                                    <strong>John Doe</strong> booked a session
                                  </>
                                ),
                                time: '5 min ago',
                              },
                              {
                                icon: '💬',
                                text: (
                                  <>
                                    New message from <strong>Jane Smith</strong>
                                  </>
                                ),
                                time: '12 min ago',
                              },
                              {
                                icon: '💳',
                                text: (
                                  <>
                                    Payment received from{' '}
                                    <strong>Mike Johnson</strong>
                                  </>
                                ),
                                time: '1 hour ago',
                              },
                            ].map((activity, i) => (
                              <div
                                key={i}
                                className="list-group-item px-0 py-3"
                              >
                                <div className="row align-items-center">
                                  <div className="col-auto">
                                    <span style={{ fontSize: '1.25rem' }}>
                                      {activity.icon}
                                    </span>
                                  </div>
                                  <div className="col ml-n2">
                                    <p className="mb-0">{activity.text}</p>
                                    <small className="text-muted">
                                      {activity.time}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            ))}
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
        {/* Close main-content */}
      </div>
    </>
  );
};

export default BusinessDashboard;
