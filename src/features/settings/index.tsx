import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

/**
 * Epic E: Business Settings Page
 * 비즈니스 설정 및 계정 관리
 */
const Settings: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'business' | 'notifications' | 'billing'
  >('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock settings data
  const [profileSettings, setProfileSettings] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '010-1234-5678',
    avatar: '',
  });

  const [businessSettings, setBusinessSettings] = useState({
    businessName: '홍길동 헬스장',
    businessType: 'gym',
    description: '최고의 서비스를 제공합니다',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    email: 'contact@business.com',
    website: 'https://example.com',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNewBooking: true,
    emailCancellation: true,
    emailDailySummary: false,
    smsReminders: true,
    pushNotifications: true,
    marketingEmails: false,
  });

  const handleSignOut = async () => {
    await mockSignOut();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  const handleSave = () => {
    // Mock save
    console.log('Saving settings:', {
      profile: profileSettings,
      business: businessSettings,
      notifications: notificationSettings,
    });
    setHasUnsavedChanges(false);
    alert('설정이 저장되었습니다!');
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
                      <h2 className="mb-0">Settings</h2>
                      <p className="text-muted mb-0">
                        Manage your account and business settings
                      </p>
                    </div>
                    <div className="col-auto">
                      {hasUnsavedChanges && (
                        <span className="text-warning mr-3">
                          <i className="fe fe-alert-circle" /> Unsaved changes
                        </span>
                      )}
                      <button className="btn btn-primary" onClick={handleSave}>
                        <i className="fe fe-save mr-1" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Left Sidebar - Navigation */}
            <div className="col-lg-3 mb-4">
              <div className="card">
                <div className="card-body p-0">
                  <div className="list-group list-group-flush">
                    <button
                      className={`list-group-item list-group-item-action ${
                        activeTab === 'profile' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <i className="fe fe-user mr-2" />
                      Profile
                    </button>
                    <button
                      className={`list-group-item list-group-item-action ${
                        activeTab === 'business' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('business')}
                    >
                      <i className="fe fe-briefcase mr-2" />
                      Business Info
                    </button>
                    <button
                      className={`list-group-item list-group-item-action ${
                        activeTab === 'notifications' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('notifications')}
                    >
                      <i className="fe fe-bell mr-2" />
                      Notifications
                    </button>
                    <button
                      className={`list-group-item list-group-item-action ${
                        activeTab === 'billing' ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab('billing')}
                    >
                      <i className="fe fe-credit-card mr-2" />
                      Billing
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="card mt-4">
                <div className="card-header">
                  <h6 className="card-header-title mb-0">Quick Links</h6>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-2">
                    <Link
                      to={ROUTES.BUSINESS.WEBSITE}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="fe fe-globe mr-1" />
                      Edit Website
                    </Link>
                    <Link
                      to={ROUTES.BUSINESS.CALENDAR}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="fe fe-calendar mr-1" />
                      View Calendar
                    </Link>
                    <button className="btn btn-outline-danger btn-sm">
                      <i className="fe fe-download mr-1" />
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Settings Forms */}
            <div className="col-lg-9">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-header-title mb-0">Profile Settings</h4>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center mb-4">
                      <div className="col-auto">
                        <div
                          className="avatar avatar-lg"
                          style={{
                            background: '#667eea',
                            color: 'white',
                            borderRadius: '50%',
                            width: '80px',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                          }}
                        >
                          {profileSettings.firstName.charAt(0)}
                        </div>
                      </div>
                      <div className="col">
                        <h6 className="mb-1">Profile Photo</h6>
                        <button className="btn btn-sm btn-outline-primary">
                          Change Photo
                        </button>
                        <button className="btn btn-sm btn-outline-secondary ml-2">
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={profileSettings.firstName}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              firstName: e.target.value,
                            })
                          }
                          onClick={() => setHasUnsavedChanges(true)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={profileSettings.lastName}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              lastName: e.target.value,
                            })
                          }
                          onClick={() => setHasUnsavedChanges(true)}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        value={profileSettings.email}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            email: e.target.value,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                      <small className="form-text text-muted">
                        This email is used for login and notifications
                      </small>
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={profileSettings.phone}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            phone: e.target.value,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                    </div>

                    <div className="card mt-4">
                      <div className="card-body">
                        <h6 className="card-title mb-3">Change Password</h6>
                        <div className="form-group mb-3">
                          <label className="form-label">Current Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter current password"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm new password"
                          />
                        </div>
                        <button className="btn btn-outline-primary">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Business Settings */}
              {activeTab === 'business' && (
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-header-title mb-0">
                      Business Information
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="form-group mb-3">
                      <label className="form-label">Business Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={businessSettings.businessName}
                        onChange={(e) =>
                          setBusinessSettings({
                            ...businessSettings,
                            businessName: e.target.value,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">Business Type</label>
                      <select
                        className="form-control"
                        value={businessSettings.businessType}
                        onChange={(e) =>
                          setBusinessSettings({
                            ...businessSettings,
                            businessType: e.target.value,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      >
                        <option value="gym">Gym / Fitness Center</option>
                        <option value="yoga">Yoga Studio</option>
                        <option value="pilates">Pilates Studio</option>
                        <option value="academy">Academy</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        value={businessSettings.description}
                        onChange={(e) =>
                          setBusinessSettings({
                            ...businessSettings,
                            description: e.target.value,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={businessSettings.address}
                        onChange={(e) =>
                          setBusinessSettings({
                            ...businessSettings,
                            address: e.target.value,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Business Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={businessSettings.phone}
                          onChange={(e) =>
                            setBusinessSettings({
                              ...businessSettings,
                              phone: e.target.value,
                            })
                          }
                          onClick={() => setHasUnsavedChanges(true)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Business Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={businessSettings.email}
                          onChange={(e) =>
                            setBusinessSettings({
                              ...businessSettings,
                              email: e.target.value,
                            })
                          }
                          onClick={() => setHasUnsavedChanges(true)}
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">Website</label>
                      <input
                        type="url"
                        className="form-control"
                        value={businessSettings.website}
                        onChange={(e) =>
                          setBusinessSettings({
                            ...businessSettings,
                            website: e.target.value,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-header-title mb-0">
                      Notification Preferences
                    </h4>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title mb-3">Email Notifications</h6>

                    <div className="custom-control custom-switch mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="emailNewBooking"
                        checked={notificationSettings.emailNewBooking}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailNewBooking: e.target.checked,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="emailNewBooking"
                      >
                        New booking notifications
                        <p className="text-muted small mb-0">
                          Receive an email when a new booking is made
                        </p>
                      </label>
                    </div>

                    <div className="custom-control custom-switch mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="emailCancellation"
                        checked={notificationSettings.emailCancellation}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailCancellation: e.target.checked,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="emailCancellation"
                      >
                        Cancellation notifications
                        <p className="text-muted small mb-0">
                          Receive an email when a booking is cancelled
                        </p>
                      </label>
                    </div>

                    <div className="custom-control custom-switch mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="emailDailySummary"
                        checked={notificationSettings.emailDailySummary}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailDailySummary: e.target.checked,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="emailDailySummary"
                      >
                        Daily summary
                        <p className="text-muted small mb-0">
                          Receive a daily summary of bookings and revenue
                        </p>
                      </label>
                    </div>

                    <h6 className="card-title mb-3 mt-4">SMS Notifications</h6>

                    <div className="custom-control custom-switch mb-3">
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
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="smsReminders"
                      >
                        Booking reminders
                        <p className="text-muted small mb-0">
                          Send SMS reminders to customers before their
                          appointments
                        </p>
                      </label>
                    </div>

                    <h6 className="card-title mb-3 mt-4">Push Notifications</h6>

                    <div className="custom-control custom-switch mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="pushNotifications"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            pushNotifications: e.target.checked,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="pushNotifications"
                      >
                        Enable push notifications
                        <p className="text-muted small mb-0">
                          Receive push notifications on your browser
                        </p>
                      </label>
                    </div>

                    <h6 className="card-title mb-3 mt-4">Marketing</h6>

                    <div className="custom-control custom-switch mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            marketingEmails: e.target.checked,
                          })
                        }
                        onClick={() => setHasUnsavedChanges(true)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="marketingEmails"
                      >
                        Marketing emails
                        <p className="text-muted small mb-0">
                          Receive emails about new features and updates
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Settings */}
              {activeTab === 'billing' && (
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-header-title mb-0">
                      Billing & Subscription
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-success" role="alert">
                      <h6 className="alert-heading mb-1">
                        Premium Plan Active
                      </h6>
                      <p className="small mb-0">
                        Your subscription is active and renews on 2026-02-18
                      </p>
                    </div>

                    <div className="card mb-4">
                      <div className="card-body">
                        <h6 className="card-title mb-3">Current Plan</h6>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <h5 className="mb-1">Premium Plan</h5>
                            <p className="text-muted small mb-0">
                              ₩99,000/month • Unlimited bookings
                            </p>
                          </div>
                          <span className="badge badge-success">Active</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Monthly fee</span>
                          <strong>₩99,000</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Next billing date</span>
                          <strong>2026-02-18</strong>
                        </div>
                      </div>
                    </div>

                    <div className="card mb-4">
                      <div className="card-body">
                        <h6 className="card-title mb-3">Payment Method</h6>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="mr-3" style={{ fontSize: '2rem' }}>
                              💳
                            </div>
                            <div>
                              <h6 className="mb-0">Visa ending in 4242</h6>
                              <small className="text-muted">
                                Expires 12/2027
                              </small>
                            </div>
                          </div>
                          <button className="btn btn-sm btn-outline-secondary">
                            Update
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card mb-4">
                      <div className="card-body">
                        <h6 className="card-title mb-3">Billing History</h6>
                        <div className="table-responsive">
                          <table className="table table-sm mb-0">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Invoice</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>2026-01-18</td>
                                <td>Premium Plan - January</td>
                                <td>₩99,000</td>
                                <td>
                                  <a href="#">Download</a>
                                </td>
                              </tr>
                              <tr>
                                <td>2025-12-18</td>
                                <td>Premium Plan - December</td>
                                <td>₩99,000</td>
                                <td>
                                  <a href="#">Download</a>
                                </td>
                              </tr>
                              <tr>
                                <td>2025-11-18</td>
                                <td>Premium Plan - November</td>
                                <td>₩99,000</td>
                                <td>
                                  <a href="#">Download</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-primary">
                        Upgrade Plan
                      </button>
                      <button className="btn btn-outline-danger">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
