import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

/**
 * Epic E: Reports System
 * 일일/주간/월간 리포트, 매출, 예약, 고객, 공간 활용 리포트
 */
const Reports: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily',
  );
  const [reportCategory, setReportCategory] = useState<
    'overview' | 'revenue' | 'bookings' | 'customers' | 'spaces'
  >('overview');
  const [startDate, setStartDate] = useState('2026-01-20');
  const [endDate, setEndDate] = useState('2026-01-20');

  // Mock report data
  const dailyStats = {
    totalRevenue: 850000,
    totalBookings: 28,
    newCustomers: 5,
    utilizationRate: 75,
    completedBookings: 24,
    cancelledBookings: 2,
    avgRating: 4.7,
  };

  const weeklyStats = {
    totalRevenue: 5200000,
    totalBookings: 168,
    newCustomers: 32,
    utilizationRate: 78,
    completedBookings: 145,
    cancelledBookings: 12,
    avgRating: 4.6,
  };

  const monthlyStats = {
    totalRevenue: 22500000,
    totalBookings: 685,
    newCustomers: 128,
    utilizationRate: 82,
    completedBookings: 612,
    cancelledBookings: 45,
    avgRating: 4.8,
  };

  const currentStats =
    reportType === 'daily'
      ? dailyStats
      : reportType === 'weekly'
        ? weeklyStats
        : monthlyStats;

  const handleExport = (format: 'csv' | 'pdf') => {
    alert(
      `리포트 내보내기: ${reportType} ${reportCategory}\n형식: ${format.toUpperCase()}\n\n데모 버전 - 실제로는 파일 생성`,
    );
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
                  <div className="row align-items-center justify-content-between">
                    <div className="col-auto">
                      <h2 className="mb-0">📊 리포트</h2>
                      <p className="text-muted mb-0">
                        비즈니스 성과 분석 및 리포트
                      </p>
                    </div>
                    <div className="col-auto">
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleExport('csv')}
                        >
                          <i className="fe fe-download mr-1" />
                          CSV
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleExport('pdf')}
                        >
                          <i className="fe fe-file-text mr-1" />
                          PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Report Settings */}
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3">리포트 기간</h6>
                  <div className="btn-group d-flex mb-3" role="group">
                    <button
                      className={`btn flex-fill ${
                        reportType === 'daily'
                          ? 'btn-primary'
                          : 'btn-outline-secondary'
                      }`}
                      onClick={() => setReportType('daily')}
                    >
                      일일
                    </button>
                    <button
                      className={`btn flex-fill ${
                        reportType === 'weekly'
                          ? 'btn-primary'
                          : 'btn-outline-secondary'
                      }`}
                      onClick={() => setReportType('weekly')}
                    >
                      주간
                    </button>
                    <button
                      className={`btn flex-fill ${
                        reportType === 'monthly'
                          ? 'btn-primary'
                          : 'btn-outline-secondary'
                      }`}
                      onClick={() => setReportType('monthly')}
                    >
                      월간
                    </button>
                  </div>

                  <div className="form-group">
                    <label>시작일</label>
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>종료일</label>
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8 mb-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3">리포트 카테고리</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <button
                        className={`btn btn-block ${
                          reportCategory === 'overview'
                            ? 'btn-primary'
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setReportCategory('overview')}
                      >
                        <i className="fe fe-bar-chart-2 mr-2" />
                        종합 리포트
                      </button>
                    </div>

                    <div className="col-md-6 mb-3">
                      <button
                        className={`btn btn-block ${
                          reportCategory === 'revenue'
                            ? 'btn-success'
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setReportCategory('revenue')}
                      >
                        <i className="fe fe-dollar-sign mr-2" />
                        매출 리포트
                      </button>
                    </div>

                    <div className="col-md-6 mb-3">
                      <button
                        className={`btn btn-block ${
                          reportCategory === 'bookings'
                            ? 'btn-info'
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setReportCategory('bookings')}
                      >
                        <i className="fe fe-calendar mr-2" />
                        예약 리포트
                      </button>
                    </div>

                    <div className="col-md-6 mb-3">
                      <button
                        className={`btn btn-block ${
                          reportCategory === 'customers'
                            ? 'btn-warning'
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setReportCategory('customers')}
                      >
                        <i className="fe fe-users mr-2" />
                        고객 리포트
                      </button>
                    </div>

                    <div className="col-md-6 mb-3">
                      <button
                        className={`btn btn-block ${
                          reportCategory === 'spaces'
                            ? 'btn-secondary'
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setReportCategory('spaces')}
                      >
                        <i className="fe fe-grid mr-2" />
                        공간 활용 리포트
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Report */}
          {reportCategory === 'overview' && (
            <div className="row">
              {/* Key Metrics */}
              <div className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div style={{ fontSize: '2rem' }}>💰</div>
                    <h3 className="mt-2 mb-0">
                      ₩{(currentStats.totalRevenue / 10000).toFixed(0)}만
                    </h3>
                    <p className="text-muted mb-0">총 매출</p>
                    <small className="text-success">+12.5%</small>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div style={{ fontSize: '2rem' }}>📅</div>
                    <h3 className="mt-2 mb-0">{currentStats.totalBookings}</h3>
                    <p className="text-muted mb-0">총 예약</p>
                    <small className="text-success">+8.2%</small>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div style={{ fontSize: '2rem' }}>👥</div>
                    <h3 className="mt-2 mb-0">{currentStats.newCustomers}</h3>
                    <p className="text-muted mb-0">신규 고객</p>
                    <small className="text-success">+15.3%</small>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div style={{ fontSize: '2rem' }}>📊</div>
                    <h3 className="mt-2 mb-0">
                      {currentStats.utilizationRate}%
                    </h3>
                    <p className="text-muted mb-0">공간 활용률</p>
                    <small className="text-success">+3.1%</small>
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">상세 통계</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-3">예약 상태</h6>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-2">
                            <span>완료</span>
                            <strong>{currentStats.completedBookings}</strong>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div
                              className="progress-bar bg-success"
                              style={{
                                width: `${
                                  (currentStats.completedBookings /
                                    currentStats.totalBookings) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-2">
                            <span>취소</span>
                            <strong>{currentStats.cancelledBookings}</strong>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div
                              className="progress-bar bg-danger"
                              style={{
                                width: `${
                                  (currentStats.cancelledBookings /
                                    currentStats.totalBookings) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <h6 className="mb-3">고객 만족도</h6>
                        <div className="text-center mb-3">
                          <h1 className="display-4 text-primary mb-0">
                            {currentStats.avgRating}
                          </h1>
                          <p className="text-muted mb-0">
                            ⭐⭐⭐⭐⭐ (5점 만점)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Revenue Report */}
          {reportCategory === 'revenue' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">매출 분석</h5>
                  </div>
                  <div className="card-body">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>서비스 유형</th>
                          <th>예약 수</th>
                          <th>매출 (₩)</th>
                          <th>비중</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>요가 클래스</td>
                          <td>85</td>
                          <td>
                            <strong>₩2,550,000</strong>
                          </td>
                          <td>30%</td>
                        </tr>
                        <tr>
                          <td>PT 룸</td>
                          <td>52</td>
                          <td>
                            <strong>₩2,600,000</strong>
                          </td>
                          <td>31%</td>
                        </tr>
                        <tr>
                          <td>필라테스</td>
                          <td>45</td>
                          <td>
                            <strong>₩1,800,000</strong>
                          </td>
                          <td>21%</td>
                        </tr>
                        <tr>
                          <td>그룹 클래스</td>
                          <td>38</td>
                          <td>
                            <strong>₩760,000</strong>
                          </td>
                          <td>9%</td>
                        </tr>
                        <tr>
                          <td>기구 운동</td>
                          <td>28</td>
                          <td>
                            <strong>₩420,000</strong>
                          </td>
                          <td>5%</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="font-weight-bold">
                          <td>합계</td>
                          <td>{currentStats.totalBookings}</td>
                          <td>₩{currentStats.totalRevenue.toLocaleString()}</td>
                          <td>100%</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Report */}
          {reportCategory === 'bookings' && (
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">시간대별 예약</h5>
                  </div>
                  <div className="card-body">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>시간</th>
                          <th>예약 수</th>
                          <th>비중</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>06:00 - 09:00</td>
                          <td>25</td>
                          <td>
                            <div
                              className="progress"
                              style={{ height: '8px', width: '100px' }}
                            >
                              <div
                                className="progress-bar bg-info"
                                style={{ width: '18%' }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>09:00 - 12:00</td>
                          <td>58</td>
                          <td>
                            <div
                              className="progress"
                              style={{ height: '8px', width: '100px' }}
                            >
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: '42%' }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>12:00 - 15:00</td>
                          <td>35</td>
                          <td>
                            <div
                              className="progress"
                              style={{ height: '8px', width: '100px' }}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: '25%' }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>15:00 - 18:00</td>
                          <td>42</td>
                          <td>
                            <div
                              className="progress"
                              style={{ height: '8px', width: '100px' }}
                            >
                              <div
                                className="progress-bar bg-success"
                                style={{ width: '30%' }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>18:00 - 22:00</td>
                          <td>68</td>
                          <td>
                            <div
                              className="progress"
                              style={{ height: '8px', width: '100px' }}
                            >
                              <div
                                className="progress-bar bg-danger"
                                style={{ width: '49%' }}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">요일별 예약</h5>
                  </div>
                  <div className="card-body">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>요일</th>
                          <th>예약 수</th>
                          <th>평균</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>월요일</td>
                          <td>22</td>
                          <td>18.7</td>
                        </tr>
                        <tr>
                          <td>화요일</td>
                          <td>25</td>
                          <td>18.7</td>
                        </tr>
                        <tr>
                          <td>수요일</td>
                          <td>28</td>
                          <td>18.7</td>
                        </tr>
                        <tr>
                          <td>목요일</td>
                          <td>24</td>
                          <td>18.7</td>
                        </tr>
                        <tr>
                          <td>금요일</td>
                          <td>26</td>
                          <td>18.7</td>
                        </tr>
                        <tr>
                          <td>토요일</td>
                          <td>38</td>
                          <td>18.7</td>
                        </tr>
                        <tr>
                          <td>일요일</td>
                          <td>42</td>
                          <td>18.7</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customers Report */}
          {reportCategory === 'customers' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">고객 분석</h5>
                  </div>
                  <div className="card-body">
                    <div className="row text-center mb-4">
                      <div className="col-md-4 mb-3">
                        <h3 className="mb-0">{currentStats.newCustomers}</h3>
                        <p className="text-muted mb-0">신규 고객</p>
                      </div>
                      <div className="col-md-4 mb-3">
                        <h3 className="mb-0">312</h3>
                        <p className="text-muted mb-0">재방문 고객</p>
                      </div>
                      <div className="col-md-4 mb-3">
                        <h3 className="mb-0">{currentStats.avgRating}</h3>
                        <p className="text-muted mb-0">평균 평점</p>
                      </div>
                    </div>

                    <h6 className="mb-3">고객 유형별 분포</h6>
                    <div className="progress mb-2" style={{ height: '30px' }}>
                      <div
                        className="progress-bar bg-primary"
                        style={{ width: '35%' }}
                      >
                        VIP (35%)
                      </div>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: '45%' }}
                      >
                        일반 (45%)
                      </div>
                      <div
                        className="progress-bar bg-info"
                        style={{ width: '20%' }}
                      >
                        신규 (20%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spaces Report */}
          {reportCategory === 'spaces' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">공간 활용 분석</h5>
                  </div>
                  <div className="card-body">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>공간명</th>
                          <th>총 예약</th>
                          <th>활용률</th>
                          <th>매출 (₩)</th>
                          <th>상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>메인 운동장</td>
                          <td>78</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">78%</span>
                              <div
                                className="progress flex-fill"
                                style={{ height: '8px' }}
                              >
                                <div
                                  className="progress-bar bg-success"
                                  style={{ width: '78%' }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>₩1,560,000</td>
                          <td>
                            <span className="badge badge-success">활성</span>
                          </td>
                        </tr>
                        <tr>
                          <td>PT 룸 1</td>
                          <td>52</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">85%</span>
                              <div
                                className="progress flex-fill"
                                style={{ height: '8px' }}
                              >
                                <div
                                  className="progress-bar bg-success"
                                  style={{ width: '85%' }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>₩2,600,000</td>
                          <td>
                            <span className="badge badge-success">활성</span>
                          </td>
                        </tr>
                        <tr>
                          <td>요가 스튜디오 A</td>
                          <td>65</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">72%</span>
                              <div
                                className="progress flex-fill"
                                style={{ height: '8px' }}
                              >
                                <div
                                  className="progress-bar bg-warning"
                                  style={{ width: '72%' }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>₩1,950,000</td>
                          <td>
                            <span className="badge badge-success">활성</span>
                          </td>
                        </tr>
                        <tr>
                          <td>필라테스 룸</td>
                          <td>48</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">88%</span>
                              <div
                                className="progress flex-fill"
                                style={{ height: '8px' }}
                              >
                                <div
                                  className="progress-bar bg-success"
                                  style={{ width: '88%' }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>₩1,920,000</td>
                          <td>
                            <span className="badge badge-success">활성</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default Reports;
