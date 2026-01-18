import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

/**
 * Epic C: Website Builder Admin Panel
 * 관리자가 웹사이트를 커스터마이징할 수 있는 인터페이스
 */
const WebsiteBuilder: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  // State management
  const [activeTab, setActiveTab] = useState<
    'themes' | 'content' | 'layout' | 'seo'
  >('themes');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>(
    'desktop',
  );
  const [isEditing, setIsEditing] = useState(true);
  const [isPublished, setIsPublished] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Theme settings state
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    fontFamily: 'Noto Sans JP',
    fontSize: '16',
  });

  // Content state (mock data)
  const [content, setContent] = useState({
    businessName: '홍길동 헬스장',
    tagline: 'Experience the best service in town',
    about:
      '저희는 고객에게 최상의 서비스를 제공하기 위해 최선을 다하고 있습니다.',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    email: 'contact@business.com',
    hours: '월-금: 06:00-22:00, 토-일: 08:00-20:00',
  });

  // Layout visibility state
  const [sectionVisibility, setSectionVisibility] = useState({
    hero: true,
    about: true,
    location: true,
    products: true,
    services: true,
    booking: true,
  });

  type SectionKey = keyof typeof sectionVisibility;

  // SEO state
  const [seoSettings, setSeoSettings] = useState({
    title: '홍길동 헬스장 - Ruoom Platform',
    description: '최고의 서비스를 경험해보세요',
    keywords: '헬스장, 운동, 피트니스',
  });

  const handleSignOut = async () => {
    await mockSignOut();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  const handleSave = () => {
    // Mock save - 실제로는 API 호출
    console.log('Saving website settings:', {
      themeSettings,
      content,
      sectionVisibility,
      seoSettings,
    });
    setHasUnsavedChanges(false);
    alert('저장되었습니다!');
  };

  const handlePublish = () => {
    setIsPublished(!isPublished);
    if (!isPublished) {
      alert('웹사이트가 게시되었습니다!');
    } else {
      alert('웹사이트 게시가 취소되었습니다.');
    }
  };

  const handleThemeChange = (key: string, value: string) => {
    setThemeSettings({ ...themeSettings, [key]: value });
    setHasUnsavedChanges(true);
  };

  const handleContentChange = (key: string, value: string) => {
    setContent({ ...content, [key]: value });
    setHasUnsavedChanges(true);
  };

  const handleSectionToggle = (section: SectionKey) => {
    setSectionVisibility({
      ...sectionVisibility,
      [section]: !sectionVisibility[section],
    });
    setHasUnsavedChanges(true);
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

      {/* Website Builder */}
      <div className="main-content">
        <div className="container-fluid py-4">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-auto">
                      <h2 className="mb-0">Website Builder</h2>
                      <p className="text-muted mb-0">
                        Customize your public website
                      </p>
                    </div>
                    <div className="col-auto">
                      {/* Preview Mode Toggle */}
                      <div className="btn-group mr-3" role="group">
                        <button
                          className={`btn btn-sm ${
                            isEditing ? 'btn-primary' : 'btn-outline-primary'
                          }`}
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Mode
                        </button>
                        <button
                          className={`btn btn-sm ${
                            !isEditing ? 'btn-primary' : 'btn-outline-primary'
                          }`}
                          onClick={() => setIsEditing(false)}
                        >
                          Preview Mode
                        </button>
                      </div>

                      {/* Device Preview Toggle */}
                      {isEditing && (
                        <div
                          className="btn-group mr-3"
                          role="group"
                          style={{ marginLeft: '0.5rem' }}
                        >
                          <button
                            className={`btn btn-sm ${
                              previewMode === 'desktop'
                                ? 'btn-secondary'
                                : 'btn-outline-secondary'
                            }`}
                            onClick={() => setPreviewMode('desktop')}
                          >
                            <i className="fe fe-monitor" /> Desktop
                          </button>
                          <button
                            className={`btn btn-sm ${
                              previewMode === 'mobile'
                                ? 'btn-secondary'
                                : 'btn-outline-secondary'
                            }`}
                            onClick={() => setPreviewMode('mobile')}
                          >
                            <i className="fe fe-smartphone" /> Mobile
                          </button>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {hasUnsavedChanges && (
                        <span className="text-warning mr-3">
                          <i className="fe fe-alert-circle" /> Unsaved changes
                        </span>
                      )}
                      <button
                        className="btn btn-outline-primary mr-2"
                        onClick={handleSave}
                      >
                        <i className="fe fe-save" /> Save
                      </button>
                      <button
                        className={`btn ${
                          isPublished ? 'btn-danger' : 'btn-success'
                        }`}
                        onClick={handlePublish}
                      >
                        <i
                          className={
                            isPublished
                              ? 'fe fa-x-circle'
                              : 'fe fa-check-circle'
                          }
                        />
                        {isPublished ? ' Unpublish' : ' Publish'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Left Sidebar - Editor */}
            {isEditing && (
              <div className="col-lg-4 mb-4">
                <div className="card">
                  <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === 'themes' ? 'active' : ''
                          }`}
                          onClick={() => setActiveTab('themes')}
                        >
                          Themes
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === 'content' ? 'active' : ''
                          }`}
                          onClick={() => setActiveTab('content')}
                        >
                          Content
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === 'layout' ? 'active' : ''
                          }`}
                          onClick={() => setActiveTab('layout')}
                        >
                          Layout
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === 'seo' ? 'active' : ''
                          }`}
                          onClick={() => setActiveTab('seo')}
                        >
                          SEO
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="card-body">
                    {/* Themes Tab */}
                    {activeTab === 'themes' && (
                      <div>
                        <h5 className="mb-3">Color Theme</h5>

                        <div className="form-group mb-3">
                          <label>Primary Color</label>
                          <div className="input-group">
                            <input
                              type="color"
                              className="form-control"
                              style={{ width: '60px' }}
                              value={themeSettings.primaryColor}
                              onChange={(e) =>
                                handleThemeChange(
                                  'primaryColor',
                                  e.target.value,
                                )
                              }
                            />
                            <input
                              type="text"
                              className="form-control"
                              value={themeSettings.primaryColor}
                              onChange={(e) =>
                                handleThemeChange(
                                  'primaryColor',
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="form-group mb-3">
                          <label>Secondary Color</label>
                          <div className="input-group">
                            <input
                              type="color"
                              className="form-control"
                              style={{ width: '60px' }}
                              value={themeSettings.secondaryColor}
                              onChange={(e) =>
                                handleThemeChange(
                                  'secondaryColor',
                                  e.target.value,
                                )
                              }
                            />
                            <input
                              type="text"
                              className="form-control"
                              value={themeSettings.secondaryColor}
                              onChange={(e) =>
                                handleThemeChange(
                                  'secondaryColor',
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>

                        <h5 className="mb-3 mt-4">Typography</h5>

                        <div className="form-group mb-3">
                          <label>Font Family</label>
                          <select
                            className="form-control"
                            value={themeSettings.fontFamily}
                            onChange={(e) =>
                              handleThemeChange('fontFamily', e.target.value)
                            }
                          >
                            <option value="Noto Sans JP">
                              Noto Sans JP (한국어/CJK)
                            </option>
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Lato">Lato</option>
                            <option value="Montserrat">Montserrat</option>
                          </select>
                        </div>

                        <div className="form-group mb-3">
                          <label>Base Font Size (px)</label>
                          <input
                            type="number"
                            className="form-control"
                            value={themeSettings.fontSize}
                            onChange={(e) =>
                              handleThemeChange('fontSize', e.target.value)
                            }
                          />
                        </div>

                        {/* Preset Themes */}
                        <h5 className="mb-3 mt-4">Preset Themes</h5>
                        <div className="row">
                          {[
                            {
                              name: 'Purple',
                              primary: '#667eea',
                              secondary: '#764ba2',
                            },
                            {
                              name: 'Blue',
                              primary: '#4299e1',
                              secondary: '#3182ce',
                            },
                            {
                              name: 'Green',
                              primary: '#48bb78',
                              secondary: '#38a169',
                            },
                            {
                              name: 'Orange',
                              primary: '#ed8936',
                              secondary: '#dd6b20',
                            },
                          ].map((theme) => (
                            <div key={theme.name} className="col-6 mb-2">
                              <button
                                className="btn btn-outline-secondary btn-sm w-100"
                                onClick={() => {
                                  handleThemeChange(
                                    'primaryColor',
                                    theme.primary,
                                  );
                                  handleThemeChange(
                                    'secondaryColor',
                                    theme.secondary,
                                  );
                                }}
                              >
                                <div
                                  className="d-flex mb-1"
                                  style={{ height: '20px' }}
                                >
                                  <div
                                    style={{
                                      width: '50%',
                                      background: theme.primary,
                                    }}
                                  />
                                  <div
                                    style={{
                                      width: '50%',
                                      background: theme.secondary,
                                    }}
                                  />
                                </div>
                                <small>{theme.name}</small>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Content Tab */}
                    {activeTab === 'content' && (
                      <div>
                        <h5 className="mb-3">Business Information</h5>

                        <div className="form-group mb-3">
                          <label>Business Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={content.businessName}
                            onChange={(e) =>
                              handleContentChange(
                                'businessName',
                                e.target.value,
                              )
                            }
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label>Tagline</label>
                          <input
                            type="text"
                            className="form-control"
                            value={content.tagline}
                            onChange={(e) =>
                              handleContentChange('tagline', e.target.value)
                            }
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label>About Description</label>
                          <textarea
                            className="form-control"
                            rows={4}
                            value={content.about}
                            onChange={(e) =>
                              handleContentChange('about', e.target.value)
                            }
                          />
                        </div>

                        <h5 className="mb-3 mt-4">Location & Contact</h5>

                        <div className="form-group mb-3">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value={content.address}
                            onChange={(e) =>
                              handleContentChange('address', e.target.value)
                            }
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label>Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            value={content.phone}
                            onChange={(e) =>
                              handleContentChange('phone', e.target.value)
                            }
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={content.email}
                            onChange={(e) =>
                              handleContentChange('email', e.target.value)
                            }
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label>Business Hours</label>
                          <input
                            type="text"
                            className="form-control"
                            value={content.hours}
                            onChange={(e) =>
                              handleContentChange('hours', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    )}

                    {/* Layout Tab */}
                    {activeTab === 'layout' && (
                      <div>
                        <h5 className="mb-3">Section Visibility</h5>
                        <p className="text-muted small mb-3">
                          Toggle sections on/off to control what appears on your
                          website
                        </p>

                        {Object.entries(sectionVisibility).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="custom-control custom-switch mb-3"
                            >
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`section-${key}`}
                                checked={value}
                                onChange={() =>
                                  handleSectionToggle(key as SectionKey)
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`section-${key}`}
                                style={{
                                  textTransform: 'capitalize',
                                  cursor: 'pointer',
                                }}
                              >
                                {key} Section
                              </label>
                            </div>
                          ),
                        )}
                      </div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === 'seo' && (
                      <div>
                        <h5 className="mb-3">SEO Settings</h5>
                        <p className="text-muted small mb-3">
                          Optimize your website for search engines
                        </p>

                        <div className="form-group mb-3">
                          <label>Page Title</label>
                          <input
                            type="text"
                            className="form-control"
                            value={seoSettings.title}
                            onChange={(e) =>
                              setSeoSettings({
                                ...seoSettings,
                                title: e.target.value,
                              })
                            }
                          />
                          <small className="text-muted">
                            Recommended length: 50-60 characters
                          </small>
                        </div>

                        <div className="form-group mb-3">
                          <label>Meta Description</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={seoSettings.description}
                            onChange={(e) =>
                              setSeoSettings({
                                ...seoSettings,
                                description: e.target.value,
                              })
                            }
                          />
                          <small className="text-muted">
                            Recommended length: 150-160 characters
                          </small>
                        </div>

                        <div className="form-group mb-3">
                          <label>Keywords</label>
                          <input
                            type="text"
                            className="form-control"
                            value={seoSettings.keywords}
                            onChange={(e) =>
                              setSeoSettings({
                                ...seoSettings,
                                keywords: e.target.value,
                              })
                            }
                          />
                          <small className="text-muted">
                            Comma-separated keywords
                          </small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Right Content - Preview */}
            <div className={isEditing ? 'col-lg-8' : 'col-12'}>
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h4 className="card-header-title mb-0">Live Preview</h4>
                    </div>
                    {!isEditing && (
                      <div className="col-auto">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setIsEditing(true)}
                        >
                          <i className="fe fe-edit" /> Back to Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-body">
                  {/* Preview Container */}
                  <div
                    className="border bg-light"
                    style={{
                      minHeight: '800px',
                      maxHeight: '800px',
                      overflow: 'auto',
                      transformOrigin: 'top left',
                    }}
                  >
                    {/* Preview Frame */}
                    <div
                      style={{
                        width: previewMode === 'mobile' ? '375px' : '100%',
                        margin: '0 auto',
                        minHeight: '100%',
                        background: 'white',
                        boxShadow:
                          previewMode === 'mobile'
                            ? '0 0 20px rgba(0,0,0,0.1)'
                            : 'none',
                      }}
                    >
                      {/* Mock Preview Content (simplified) */}
                      <nav
                        className="navbar navbar-light bg-white border-bottom"
                        style={{
                          background: 'white',
                          borderBottom: '1px solid #e2e8f0',
                        }}
                      >
                        <div className="container">
                          <strong style={{ color: themeSettings.primaryColor }}>
                            {content.businessName}
                          </strong>
                        </div>
                      </nav>

                      {sectionVisibility.hero && (
                        <section
                          className="py-5 text-center text-white"
                          style={{
                            background: `linear-gradient(135deg, ${themeSettings.primaryColor} 0%, ${themeSettings.secondaryColor} 100%)`,
                          }}
                        >
                          <h1 className="display-4 font-weight-bold mb-3">
                            {content.businessName}
                          </h1>
                          <p className="lead mb-4">{content.tagline}</p>
                          <button className="btn btn-lg btn-light">
                            Book Now
                          </button>
                        </section>
                      )}

                      {sectionVisibility.about && (
                        <section className="py-5">
                          <div className="container text-center">
                            <h2 className="display-4 mb-4">About Us</h2>
                            <p className="lead text-muted">{content.about}</p>
                          </div>
                        </section>
                      )}

                      {sectionVisibility.location && (
                        <section className="py-5 bg-light">
                          <div className="container">
                            <h2 className="display-4 text-center mb-5">
                              Location
                            </h2>
                            <div className="row">
                              <div className="col-md-6">
                                <p>
                                  <strong>Address:</strong> {content.address}
                                </p>
                                <p>
                                  <strong>Phone:</strong> {content.phone}
                                </p>
                                <p>
                                  <strong>Email:</strong> {content.email}
                                </p>
                                <p>
                                  <strong>Hours:</strong> {content.hours}
                                </p>
                              </div>
                            </div>
                          </div>
                        </section>
                      )}

                      {sectionVisibility.products && (
                        <section className="py-5">
                          <div className="container">
                            <h2 className="display-4 text-center mb-5">
                              Products
                            </h2>
                            <div className="row">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="col-md-4 mb-4">
                                  <div className="card text-center">
                                    <div className="card-body">
                                      <h3>Product {i}</h3>
                                      <h2
                                        className="text-primary my-4"
                                        style={{
                                          color: themeSettings.primaryColor,
                                        }}
                                      >
                                        ₩{(i * 100).toLocaleString()},000
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </section>
                      )}

                      {sectionVisibility.services && (
                        <section className="py-5 bg-light">
                          <div className="container">
                            <h2 className="display-4 text-center mb-5">
                              Services
                            </h2>
                            <div className="row">
                              {[
                                { icon: '⭐', name: 'Service 1' },
                                { icon: '💎', name: 'Service 2' },
                                { icon: '🎯', name: 'Service 3' },
                              ].map((service) => (
                                <div
                                  key={service.name}
                                  className="col-md-4 mb-4"
                                >
                                  <div className="card text-center">
                                    <div className="card-body">
                                      <div
                                        style={{ fontSize: '3rem' }}
                                        className="mb-3"
                                      >
                                        {service.icon}
                                      </div>
                                      <h4>{service.name}</h4>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </section>
                      )}

                      {sectionVisibility.booking && (
                        <section className="py-5">
                          <div className="container text-center">
                            <h2 className="display-4 mb-5">Book Now</h2>
                            <button
                              className="btn btn-lg btn-primary"
                              style={{
                                backgroundColor: themeSettings.primaryColor,
                                borderColor: themeSettings.primaryColor,
                              }}
                            >
                              Open Calendar
                            </button>
                          </div>
                        </section>
                      )}
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

export default WebsiteBuilder;
