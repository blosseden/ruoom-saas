import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface VisitorData {
  date: string;
  visitors: number;
  pageViews: number;
  uniqueVisitors: number;
}

interface PageData {
  page: string;
  views: number;
  uniqueVisitors: number;
  avgTime: string;
  bounceRate: number;
}

interface ConversionData {
  stage: string;
  count: number;
  rate: number;
}

interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

interface BookingTrendData {
  date: string;
  bookings: number;
  cancellations: number;
}

interface CustomerGrowthData {
  month: string;
  newCustomers: number;
  totalCustomers: number;
}

interface PeakHourData {
  hour: string;
  bookings: number;
  revenue: number;
}

interface ServicePopularityData {
  service: string;
  bookings: number;
  revenue: number;
  percentage: number;
}

/**
 * Analytics Dashboard (Enhanced Version)
 * - Website visitor tracking
 * - Page view analytics
 * - User journey tracking
 * - Conversion tracking
 * - Business analytics (NEW):
 *   - Revenue charts
 *   - Booking trends
 *   - Customer growth
 *   - Peak hours analysis
 *   - Service popularity
 *   - Export reports
 */
const Analytics: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'visitors'
    | 'pages'
    | 'conversions'
    | 'journey'
    | 'revenue'
    | 'bookings'
    | 'customers'
    | 'peakhours'
    | 'services'
  >('overview');

  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Real-time update simulation (refresh every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Mock data - Visitors over time
  const visitorData: VisitorData[] = [
    { date: '2026-01-14', visitors: 120, pageViews: 340, uniqueVisitors: 95 },
    { date: '2026-01-15', visitors: 145, pageViews: 420, uniqueVisitors: 115 },
    { date: '2026-01-16', visitors: 132, pageViews: 380, uniqueVisitors: 108 },
    { date: '2026-01-17', visitors: 168, pageViews: 510, uniqueVisitors: 132 },
    { date: '2026-01-18', visitors: 189, pageViews: 580, uniqueVisitors: 150 },
    { date: '2026-01-19', visitors: 175, pageViews: 520, uniqueVisitors: 140 },
    { date: '2026-01-20', visitors: 198, pageViews: 610, uniqueVisitors: 158 },
  ];

  // Mock data - Page analytics
  const pageData: PageData[] = [
    {
      page: '/홈',
      views: 2450,
      uniqueVisitors: 1890,
      avgTime: '2:45',
      bounceRate: 32,
    },
    {
      page: '/about',
      views: 890,
      uniqueVisitors: 720,
      avgTime: '1:30',
      bounceRate: 45,
    },
    {
      page: '/services',
      views: 1200,
      uniqueVisitors: 980,
      avgTime: '3:15',
      bounceRate: 28,
    },
    {
      page: '/booking',
      views: 650,
      uniqueVisitors: 520,
      avgTime: '5:20',
      bounceRate: 15,
    },
    {
      page: '/contact',
      views: 340,
      uniqueVisitors: 280,
      avgTime: '1:10',
      bounceRate: 62,
    },
  ];

  // Mock data - Conversion funnel
  const conversionData: ConversionData[] = [
    { stage: '방문자', count: 1580, rate: 100 },
    { stage: '서비스 둘러보기', count: 980, rate: 62 },
    { stage: '예약 페이지 방문', count: 650, rate: 41 },
    { stage: '예약 시작', count: 420, rate: 27 },
    { stage: '예약 완료', count: 280, rate: 18 },
  ];

  // Mock data - Top traffic sources
  const trafficSources = [
    { source: '직접 방문', visitors: 520, percentage: 33, color: '#667eea' },
    { source: 'Google 검색', visitors: 420, percentage: 27, color: '#28a745' },
    { source: '네이버 검색', visitors: 310, percentage: 20, color: '#03c75a' },
    { source: 'SNS 링크', visitors: 180, percentage: 11, color: '#ffc107' },
    { source: '기타', visitors: 150, percentage: 9, color: '#6c757d' },
  ];

  // Mock data - User devices
  const deviceStats = [
    { device: '모바일', count: 980, percentage: 62 },
    { device: '데스크톱', count: 520, percentage: 33 },
    { device: '태블릿', count: 80, percentage: 5 },
  ];

  // ===== NEW BUSINESS ANALYTICS DATA =====

  // Revenue data (monthly)
  const revenueData: RevenueData[] = [
    { month: '1월', revenue: 8500000, bookings: 142 },
    { month: '2월', revenue: 9200000, bookings: 158 },
    { month: '3월', revenue: 10800000, bookings: 175 },
    { month: '4월', revenue: 9800000, bookings: 162 },
    { month: '5월', revenue: 11500000, bookings: 189 },
    { month: '6월', revenue: 12200000, bookings: 205 },
    { month: '7월', revenue: 10800000, bookings: 178 },
    { month: '8월', revenue: 9500000, bookings: 155 },
    { month: '9월', revenue: 10200000, bookings: 168 },
    { month: '10월', revenue: 11800000, bookings: 195 },
    { month: '11월', revenue: 12500000, bookings: 210 },
    { month: '12월', revenue: 13200000, bookings: 225 },
  ];

  // Booking trends (daily)
  const bookingTrendData: BookingTrendData[] = [
    { date: '1/14', bookings: 18, cancellations: 2 },
    { date: '1/15', bookings: 22, cancellations: 1 },
    { date: '1/16', bookings: 19, cancellations: 3 },
    { date: '1/17', bookings: 25, cancellations: 2 },
    { date: '1/18', bookings: 28, cancellations: 1 },
    { date: '1/19', bookings: 24, cancellations: 4 },
    { date: '1/20', bookings: 32, cancellations: 2 },
  ];

  // Customer growth (monthly)
  const customerGrowthData: CustomerGrowthData[] = [
    { month: '7월', newCustomers: 28, totalCustomers: 142 },
    { month: '8월', newCustomers: 32, totalCustomers: 174 },
    { month: '9월', newCustomers: 38, totalCustomers: 212 },
    { month: '10월', newCustomers: 45, totalCustomers: 257 },
    { month: '11월', newCustomers: 52, totalCustomers: 309 },
    { month: '12월', newCustomers: 58, totalCustomers: 367 },
    { month: '1월', newCustomers: 48, totalCustomers: 415 },
  ];

  // Peak hours analysis
  const peakHourData: PeakHourData[] = [
    { hour: '06:00', bookings: 8, revenue: 240000 },
    { hour: '07:00', bookings: 12, revenue: 360000 },
    { hour: '08:00', bookings: 15, revenue: 450000 },
    { hour: '09:00', bookings: 22, revenue: 660000 },
    { hour: '10:00', bookings: 28, revenue: 840000 },
    { hour: '11:00', bookings: 25, revenue: 750000 },
    { hour: '12:00', bookings: 18, revenue: 540000 },
    { hour: '13:00', bookings: 14, revenue: 420000 },
    { hour: '14:00', bookings: 20, revenue: 600000 },
    { hour: '15:00', bookings: 26, revenue: 780000 },
    { hour: '16:00', bookings: 32, revenue: 960000 },
    { hour: '17:00', bookings: 35, revenue: 1050000 },
    { hour: '18:00', bookings: 38, revenue: 1140000 },
    { hour: '19:00', bookings: 42, revenue: 1260000 },
    { hour: '20:00', bookings: 36, revenue: 1080000 },
    { hour: '21:00', bookings: 28, revenue: 840000 },
    { hour: '22:00', bookings: 18, revenue: 540000 },
  ];

  // Service popularity
  const servicePopularityData: ServicePopularityData[] = [
    { service: '요가 클래스', bookings: 285, revenue: 8550000, percentage: 28 },
    { service: 'PT 룸', bookings: 245, revenue: 12250000, percentage: 24 },
    { service: '필라테스', bookings: 198, revenue: 9900000, percentage: 19 },
    { service: '그룹 클래스', bookings: 175, revenue: 3500000, percentage: 17 },
    { service: '기구 운동', bookings: 128, revenue: 1920000, percentage: 12 },
  ];

  // ===== CHART CONFIGURATIONS =====

  // Revenue Chart Configuration
  const revenueChartData = {
    labels: revenueData.map((d) => d.month),
    datasets: [
      {
        label: '매출 (₩)',
        data: revenueData.map((d) => d.revenue),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `₩${(value / 10000).toFixed(0)}만원`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `₩${(value / 10000).toFixed(0)}만`,
        },
      },
    },
  };

  // Booking Trends Chart Configuration
  const bookingTrendChartData = {
    labels: bookingTrendData.map((d) => d.date),
    datasets: [
      {
        label: '예약',
        data: bookingTrendData.map((d) => d.bookings),
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: '취소',
        data: bookingTrendData.map((d) => d.cancellations),
        borderColor: '#dc3545',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const bookingTrendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Customer Growth Chart Configuration
  const customerGrowthChartData = {
    labels: customerGrowthData.map((d) => d.month),
    datasets: [
      {
        label: '신규 고객',
        data: customerGrowthData.map((d) => d.newCustomers),
        backgroundColor: '#667eea',
        borderColor: '#667eea',
        borderWidth: 1,
      },
      {
        label: '누적 고객',
        data: customerGrowthData.map((d) => d.totalCustomers),
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        borderWidth: 1,
      },
    ],
  };

  const customerGrowthChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Peak Hours Chart Configuration
  const peakHoursChartData = {
    labels: peakHourData.map((d) => d.hour),
    datasets: [
      {
        label: '예약 수',
        data: peakHourData.map((d) => d.bookings),
        backgroundColor: 'rgba(102, 126, 234, 0.7)',
        borderColor: '#667eea',
        borderWidth: 1,
      },
    ],
  };

  const peakHoursChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Service Popularity Chart Configuration (Doughnut)
  const servicePopularityChartData = {
    labels: servicePopularityData.map((d) => d.service),
    datasets: [
      {
        data: servicePopularityData.map((d) => d.bookings),
        backgroundColor: [
          '#667eea',
          '#28a745',
          '#ffc107',
          '#17a2b8',
          '#dc3545',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const servicePopularityChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  // Calculate summary stats based on date range
  const totalVisitors = visitorData.reduce((sum, d) => sum + d.visitors, 0);
  const totalPageViews = visitorData.reduce((sum, d) => sum + d.pageViews, 0);
  const avgUniqueVisitors = Math.round(
    visitorData.reduce((sum, d) => sum + d.uniqueVisitors, 0) /
      visitorData.length,
  );
  const conversionRate = 18;

  // Business analytics summary stats
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const avgMonthlyRevenue = Math.round(totalRevenue / revenueData.length);
  const totalBookings = revenueData.reduce((sum, d) => sum + d.bookings, 0);
  const avgMonthlyBookings = Math.round(totalBookings / revenueData.length);
  const totalCustomers = customerGrowthData[customerGrowthData.length - 1].totalCustomers;
  const peakHour = peakHourData.reduce((max, d) =>
    d.bookings > max.bookings ? d : max,
  );
  const topService = servicePopularityData[0];

  // Export functions (mock)
  const handleExportCSV = () => {
    alert('CSV 내보내기 기능 (데모)\n\n실제 구현 시:\n- 선택된 탭의 데이터를 CSV로 변환\n- 브라우저 다운로드 트리거\n- 파일명: analytics_{tab}_{date}.csv');
  };

  const handleExportPDF = () => {
    alert('PDF 내보내기 기능 (데모)\n\n실제 구현 시:\n- jsPDF 또는 similar library 사용\n- 차트와 데이터를 PDF로 변환\n- 브라우저 다운로드 트리거\n- 파일명: analytics_{tab}_{date}.pdf');
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
                      <h2 className="mb-0">📊 분석 대시보드</h2>
                      <p className="text-muted mb-0">
                        웹사이트 방문자 및 예약 분석 (데모 버전)
                      </p>
                    </div>
                    <div className="col-auto">
                      <div className="btn-group">
                        <button
                          className={`btn btn-sm ${
                            dateRange === '7d'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setDateRange('7d')}
                        >
                          최근 7일
                        </button>
                        <button
                          className={`btn btn-sm ${
                            dateRange === '30d'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setDateRange('30d')}
                        >
                          최근 30일
                        </button>
                        <button
                          className={`btn btn-sm ${
                            dateRange === '90d'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setDateRange('90d')}
                        >
                          최근 90일
                        </button>
                      </div>
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
                    className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <i className="fe fe-bar-chart-2 mr-1" />
                    개요
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'visitors' ? 'active' : ''}`}
                    onClick={() => setActiveTab('visitors')}
                  >
                    <i className="fe fe-users mr-1" />
                    방문자
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'pages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pages')}
                  >
                    <i className="fe fe-file-text mr-1" />
                    페이지
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'conversions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('conversions')}
                  >
                    <i className="fe fe-trending-up mr-1" />
                    전환
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'journey' ? 'active' : ''}`}
                    onClick={() => setActiveTab('journey')}
                  >
                    <i className="fe fe-map mr-1" />
                    여정
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                  >
                    <i className="fe fe-bar-chart mr-1" />
                    비즈니스 분석
                  </button>
                  <div className="dropdown-menu">
                    <button
                      className={`dropdown-item ${activeTab === 'revenue' ? 'active' : ''}`}
                      onClick={() => setActiveTab('revenue')}
                    >
                      <i className="fe fe-dollar-sign mr-1" />
                      매출 분석
                    </button>
                    <button
                      className={`dropdown-item ${activeTab === 'bookings' ? 'active' : ''}`}
                      onClick={() => setActiveTab('bookings')}
                    >
                      <i className="fe fe-calendar mr-1" />
                      예약 동향
                    </button>
                    <button
                      className={`dropdown-item ${activeTab === 'customers' ? 'active' : ''}`}
                      onClick={() => setActiveTab('customers')}
                    >
                      <i className="fe fe-users mr-1" />
                      고객 성장
                    </button>
                    <button
                      className={`dropdown-item ${activeTab === 'peakhours' ? 'active' : ''}`}
                      onClick={() => setActiveTab('peakhours')}
                    >
                      <i className="fe fe-clock mr-1" />
                      피크 시간
                    </button>
                    <button
                      className={`dropdown-item ${activeTab === 'services' ? 'active' : ''}`}
                      onClick={() => setActiveTab('services')}
                    >
                      <i className="fe fe-star mr-1" />
                      서비스 인기
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Export Buttons & Real-time Status */}
          {(activeTab === 'revenue' ||
            activeTab === 'bookings' ||
            activeTab === 'customers' ||
            activeTab === 'peakhours' ||
            activeTab === 'services') && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center">
                          <span className="badge badge-success mr-2">실시간</span>
                          <small className="text-muted">
                            마지막 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
                          </small>
                          <button
                            className="btn btn-sm btn-outline-primary ml-2"
                            onClick={() => setLastUpdated(new Date())}
                          >
                            <i className="fe fe-refresh-cw mr-1" />
                            새로고침
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6 text-right">
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={handleExportCSV}
                          >
                            <i className="fe fe-download mr-1" />
                            CSV 내보내기
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={handleExportPDF}
                          >
                            <i className="fe fe-file-text mr-1" />
                            PDF 내보내기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="row">
              {/* Key Metrics */}
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
                        👥
                      </div>
                      <div>
                        <h4 className="mb-0">
                          {totalVisitors.toLocaleString()}
                        </h4>
                        <small className="text-muted">총 방문자</small>
                        <div className="text-success small">+12.5%</div>
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
                        📄
                      </div>
                      <div>
                        <h4 className="mb-0">
                          {totalPageViews.toLocaleString()}
                        </h4>
                        <small className="text-muted">페이지뷰</small>
                        <div className="text-success small">+8.3%</div>
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
                        👁️
                      </div>
                      <div>
                        <h4 className="mb-0">
                          {avgUniqueVisitors.toLocaleString()}
                        </h4>
                        <small className="text-muted">일일 순방문자</small>
                        <div className="text-success small">+15.2%</div>
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
                          background: '#dc3545',
                          color: 'white',
                          fontSize: '1.5rem',
                        }}
                      >
                        📈
                      </div>
                      <div>
                        <h4 className="mb-0">{conversionRate}%</h4>
                        <small className="text-muted">전환율</small>
                        <div className="text-success small">+2.1%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visitor Trend Chart (Mock) */}
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">방문자 추이</h5>
                  </div>
                  <div className="card-body">
                    <div
                      style={{
                        height: '300px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '1rem',
                      }}
                    >
                      {visitorData.map((data, index) => (
                        <div
                          key={index}
                          style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '40px',
                              height: `${(data.visitors / 200) * 100}%`,
                              background: '#667eea',
                              borderRadius: '4px 4px 0 0',
                              transition: 'height 0.3s',
                            }}
                            title={`${data.visitors} 방문자`}
                          />
                          <small
                            className="text-muted mt-2"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {data.date.slice(5)}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">트래픽 소스</h5>
                  </div>
                  <div className="card-body">
                    {trafficSources.map((source, index) => (
                      <div key={index} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span>{source.source}</span>
                          <span className="font-weight-bold">
                            {source.percentage}%
                          </span>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                          <div
                            className="progress-bar"
                            style={{
                              width: `${source.percentage}%`,
                              backgroundColor: source.color,
                            }}
                          />
                        </div>
                        <small className="text-muted">
                          {source.visitors.toLocaleString()} 방문자
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Device Stats */}
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">디바이스 분포</h5>
                  </div>
                  <div className="card-body">
                    {deviceStats.map((device, index) => (
                      <div key={index} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span>
                            {device.device === '모바일' && '📱 '}
                            {device.device === '데스크톱' && '💻 '}
                            {device.device === '태블릿' && '📱 '}
                            {device.device}
                          </span>
                          <span className="font-weight-bold">
                            {device.percentage}%
                          </span>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                          <div
                            className="progress-bar bg-info"
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                        <small className="text-muted">
                          {device.count.toLocaleString()} 방문
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visitors Tab */}
          {activeTab === 'visitors' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">일일 방문자 상세</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm table-nowrap">
                        <thead>
                          <tr>
                            <th>날짜</th>
                            <th>방문자</th>
                            <th>순방문자</th>
                            <th>페이지뷰</th>
                            <th>페이지뷰 / 방문자</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visitorData.map((data, index) => (
                            <tr key={index}>
                              <td>{data.date}</td>
                              <td>{data.visitors.toLocaleString()}</td>
                              <td>{data.uniqueVisitors.toLocaleString()}</td>
                              <td>{data.pageViews.toLocaleString()}</td>
                              <td>
                                {(data.pageViews / data.visitors).toFixed(1)}
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

          {/* Pages Tab */}
          {activeTab === 'pages' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">페이지별 분석</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm table-nowrap">
                        <thead>
                          <tr>
                            <th>페이지</th>
                            <th>조회수</th>
                            <th>순방문자</th>
                            <th>평균 체류시간</th>
                            <th>이탈률</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pageData.map((page, index) => (
                            <tr key={index}>
                              <td>
                                <Link
                                  to="#"
                                  className="text-decoration-none font-weight-bold"
                                >
                                  {page.page}
                                </Link>
                              </td>
                              <td>{page.views.toLocaleString()}</td>
                              <td>{page.uniqueVisitors.toLocaleString()}</td>
                              <td>{page.avgTime}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    page.bounceRate < 30
                                      ? 'badge-success'
                                      : page.bounceRate < 50
                                        ? 'badge-warning'
                                        : 'badge-danger'
                                  }`}
                                >
                                  {page.bounceRate}%
                                </span>
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

          {/* Conversions Tab */}
          {activeTab === 'conversions' && (
            <div className="row">
              {/* Conversion Funnel */}
              <div className="col-md-8 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">전환 퍼널</h5>
                  </div>
                  <div className="card-body">
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                      }}
                    >
                      {conversionData.map((stage, index) => (
                        <div key={index}>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="font-weight-bold">
                              {stage.stage}
                            </span>
                            <div className="text-right">
                              <span className="mr-3">
                                {stage.count.toLocaleString()}명
                              </span>
                              <span
                                className={`badge ${
                                  stage.rate >= 50
                                    ? 'badge-success'
                                    : stage.rate >= 30
                                      ? 'badge-primary'
                                      : 'badge-warning'
                                }`}
                              >
                                {stage.rate}%
                              </span>
                            </div>
                          </div>
                          <div className="progress" style={{ height: '25px' }}>
                            <div
                              className="progress-bar progress-bar-striped"
                              style={{
                                width: `${stage.rate}%`,
                                backgroundColor:
                                  stage.rate >= 50
                                    ? '#28a745'
                                    : stage.rate >= 30
                                      ? '#667eea'
                                      : '#ffc107',
                              }}
                            >
                              {stage.rate}%
                            </div>
                          </div>
                          {index < conversionData.length - 1 && (
                            <div className="text-center text-muted">↓</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Summary */}
              <div className="col-md-4 mb-4">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">전환 요약</h5>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <h1 className="display-4 text-primary mb-0">
                        {conversionRate}%
                      </h1>
                      <p className="text-muted mb-0">전환율</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-2">
                      <span>총 방문자</span>
                      <span className="font-weight-bold">
                        {conversionData[0].count.toLocaleString()}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>예약 완료</span>
                      <span className="font-weight-bold text-success">
                        {conversionData[4].count.toLocaleString()}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>평균 전환 시간</span>
                      <span className="font-weight-bold">8분 30초</span>
                    </div>
                  </div>
                </div>

                {/* Conversion Tips */}
                <div className="card border-info">
                  <div className="card-body">
                    <h6 className="text-info mb-2">
                      <i className="fe fe-info mr-1" />
                      전환률 향상 팁
                    </h6>
                    <ul className="small mb-0">
                      <li>예약 페이지 로딩 속도 개선</li>
                      <li>예약 폼 필드 수 줄이기</li>
                      <li>명확한 CTA 버튼 배치</li>
                      <li>모바일 경험 최적화</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Journey Tab */}
          {activeTab === 'journey' && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">사용자 여정 분석</h5>
                    <p className="text-muted small mb-0">
                      방문자들이 웹사이트를 탐색하는 일반적인 경로
                    </p>
                  </div>
                  <div className="card-body">
                    {/* User Journey Flow */}
                    <div
                      className="mb-4 p-4 bg-light rounded"
                      style={{ border: '2px dashed #dee2e6' }}
                    >
                      <h6 className="text-center mb-4">일반적인 방문자 경로</h6>
                      <div className="d-flex justify-content-around align-items-center flex-wrap">
                        <div className="text-center">
                          <div
                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                            style={{
                              width: '80px',
                              height: '80px',
                              background: '#667eea',
                              color: 'white',
                              fontSize: '2rem',
                            }}
                          >
                            🏠
                          </div>
                          <div>홈페이지</div>
                          <small className="text-muted">100%</small>
                        </div>

                        <div
                          className="text-primary"
                          style={{ fontSize: '2rem' }}
                        >
                          →
                        </div>

                        <div className="text-center">
                          <div
                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                            style={{
                              width: '80px',
                              height: '80px',
                              background: '#28a745',
                              color: 'white',
                              fontSize: '2rem',
                            }}
                          >
                            ℹ️
                          </div>
                          <div>서비스</div>
                          <small className="text-muted">62%</small>
                        </div>

                        <div
                          className="text-primary"
                          style={{ fontSize: '2rem' }}
                        >
                          →
                        </div>

                        <div className="text-center">
                          <div
                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                            style={{
                              width: '80px',
                              height: '80px',
                              background: '#ffc107',
                              color: 'white',
                              fontSize: '2rem',
                            }}
                          >
                            📅
                          </div>
                          <div>예약</div>
                          <small className="text-muted">41%</small>
                        </div>

                        <div
                          className="text-primary"
                          style={{ fontSize: '2rem' }}
                        >
                          →
                        </div>

                        <div className="text-center">
                          <div
                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                            style={{
                              width: '80px',
                              height: '80px',
                              background: '#28a745',
                              color: 'white',
                              fontSize: '2rem',
                            }}
                          >
                            ✓
                          </div>
                          <div>완료</div>
                          <small className="text-muted">18%</small>
                        </div>
                      </div>
                    </div>

                    {/* Page Paths */}
                    <h6 className="mb-3">주요 페이지 경로</h6>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="mb-2">경로 1: 빠른 예약</h6>
                            <div className="d-flex align-items-center flex-wrap">
                              <span className="badge badge-primary mr-1 mb-1">
                                홈
                              </span>
                              <span className="text-muted mx-1">→</span>
                              <span className="badge badge-warning mr-1 mb-1">
                                예약
                              </span>
                              <span className="text-muted mx-1">→</span>
                              <span className="badge badge-success mb-1">
                                완료
                              </span>
                            </div>
                            <small className="text-muted">
                              35%의 방문자가 이 경로를 따릅니다
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="mb-2">경로 2: 정보 탐색</h6>
                            <div className="d-flex align-items-center flex-wrap">
                              <span className="badge badge-primary mr-1 mb-1">
                                홈
                              </span>
                              <span className="text-muted mx-1">→</span>
                              <span className="badge badge-info mr-1 mb-1">
                                소개
                              </span>
                              <span className="text-muted mx-1">→</span>
                              <span className="badge badge-secondary mr-1 mb-1">
                                위치
                              </span>
                              <span className="text-muted mx-1">→</span>
                              <span className="badge badge-success mb-1">
                                완료
                              </span>
                            </div>
                            <small className="text-muted">
                              28%의 방문자가 이 경로를 따릅니다
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Drop-off Points */}
                    <div className="mt-4">
                      <h6 className="mb-3">이탈 포인트 분석</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>페이지</th>
                              <th>이탈률</th>
                              <th>주요 이유</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>/contact</td>
                              <td>
                                <span className="badge badge-danger">62%</span>
                              </td>
                              <td>연락 정보만 확인하고 이탈</td>
                            </tr>
                            <tr>
                              <td>/about</td>
                              <td>
                                <span className="badge badge-warning">45%</span>
                              </td>
                              <td>정보 확인만 하고 이탈</td>
                            </tr>
                            <tr>
                              <td>/홈</td>
                              <td>
                                <span className="badge badge-warning">32%</span>
                              </td>
                              <td>바로 이탈</td>
                            </tr>
                            <tr>
                              <td>/services</td>
                              <td>
                                <span className="badge badge-success">28%</span>
                              </td>
                              <td>서비스 확인 후 예약으로 이동</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== BUSINESS ANALYTICS TABS ===== */}

          {/* Revenue Tab */}
          {activeTab === 'revenue' && (
            <div className="row">
              {/* Revenue Summary Cards */}
              <div className="col-md-4 mb-4">
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
                        💰
                      </div>
                      <div>
                        <h4 className="mb-0">
                          ₩{(totalRevenue / 10000).toFixed(0)}만
                        </h4>
                        <small className="text-muted">총 매출 (연간)</small>
                        <div className="text-success small">+15.3%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
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
                        📈
                      </div>
                      <div>
                        <h4 className="mb-0">
                          ₩{(avgMonthlyRevenue / 10000).toFixed(0)}만
                        </h4>
                        <small className="text-muted">월 평균 매출</small>
                        <div className="text-success small">+8.7%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
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
                        📅
                      </div>
                      <div>
                        <h4 className="mb-0">{avgMonthlyBookings}</h4>
                        <small className="text-muted">월 평균 예약</small>
                        <div className="text-success small">+12.1%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">월별 매출 추이</h5>
                  </div>
                  <div className="card-body">
                    <div style={{ height: '400px' }}>
                      <Line data={revenueChartData} options={revenueChartOptions} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Table */}
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">월별 매출 상세</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm table-nowrap">
                        <thead>
                          <tr>
                            <th>월</th>
                            <th>매출</th>
                            <th>예약 수</th>
                            <th>객단가 (₩)</th>
                            <th>전월 대비</th>
                          </tr>
                        </thead>
                        <tbody>
                          {revenueData.map((data, index) => {
                            const prevRevenue = index > 0 ? revenueData[index - 1].revenue : data.revenue;
                            const growth = ((data.revenue - prevRevenue) / prevRevenue) * 100;

                            return (
                              <tr key={index}>
                                <td>{data.month}</td>
                                <td>
                                  <strong>₩{(data.revenue / 10000).toFixed(0)}만원</strong>
                                </td>
                                <td>{data.bookings}건</td>
                                <td>
                                  ₩{(data.revenue / data.bookings).toFixed(0).toLocaleString()}
                                </td>
                                <td>
                                  {index === 0 ? (
                                    <span className="text-muted">-</span>
                                  ) : growth >= 0 ? (
                                    <span className="text-success">+{growth.toFixed(1)}%</span>
                                  ) : (
                                    <span className="text-danger">{growth.toFixed(1)}%</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="row">
              {/* Booking Stats */}
              <div className="col-md-6 mb-4">
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
                        <h4 className="mb-0">
                          {bookingTrendData.reduce((sum, d) => sum + d.bookings, 0)}
                        </h4>
                        <small className="text-muted">총 예약 (7일)</small>
                        <div className="text-success small">+18.2%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle mr-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: '#dc3545',
                          color: 'white',
                          fontSize: '1.5rem',
                        }}
                      >
                        ✕
                      </div>
                      <div>
                        <h4 className="mb-0">
                          {bookingTrendData.reduce((sum, d) => sum + d.cancellations, 0)}
                        </h4>
                        <small className="text-muted">취소 (7일)</small>
                        <div className="text-danger small">-2.4%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Trends Chart */}
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">일별 예약 동향</h5>
                  </div>
                  <div className="card-body">
                    <div style={{ height: '350px' }}>
                      <Line data={bookingTrendChartData} options={bookingTrendChartOptions} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details Table */}
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">일별 예약 상세</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm table-nowrap">
                        <thead>
                          <tr>
                            <th>날짜</th>
                            <th>예약</th>
                            <th>취소</th>
                            <th>취소율</th>
                            <th>넷 예약</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookingTrendData.map((data, index) => {
                            const netBookings = data.bookings - data.cancellations;
                            const cancelRate = (data.cancellations / data.bookings) * 100;

                            return (
                              <tr key={index}>
                                <td>{data.date}</td>
                                <td className="text-success font-weight-bold">
                                  +{data.bookings}
                                </td>
                                <td className="text-danger font-weight-bold">
                                  -{data.cancellations}
                                </td>
                                <td>
                                  <span
                                    className={`badge ${
                                      cancelRate < 10
                                        ? 'badge-success'
                                        : cancelRate < 20
                                          ? 'badge-warning'
                                          : 'badge-danger'
                                    }`}
                                  >
                                    {cancelRate.toFixed(1)}%
                                  </span>
                                </td>
                                <td>
                                  <strong>{netBookings}</strong>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="row">
              {/* Customer Stats */}
              <div className="col-md-4 mb-4">
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
                        👥
                      </div>
                      <div>
                        <h4 className="mb-0">{totalCustomers}</h4>
                        <small className="text-muted">총 고객 수</small>
                        <div className="text-success small">+48 (이번달)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
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
                        📈
                      </div>
                      <div>
                        <h4 className="mb-0">
                          {customerGrowthData[customerGrowthData.length - 1].newCustomers}
                        </h4>
                        <small className="text-muted">신규 고객 (이번달)</small>
                        <div className="text-success small">+17.2%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
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
                        📊
                      </div>
                      <div>
                        <h4 className="mb-0">
                          {Math.round(
                            (customerGrowthData[customerGrowthData.length - 1].newCustomers /
                              customerGrowthData[customerGrowthData.length - 2].newCustomers) *
                              100 -
                              100,
                          )}
                          %
                        </h4>
                        <small className="text-muted">성장률 (전월대비)</small>
                        <div className="text-success small">양호</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Growth Chart */}
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">고객 성장 추이</h5>
                  </div>
                  <div className="card-body">
                    <div style={{ height: '350px' }}>
                      <Bar data={customerGrowthChartData} options={customerGrowthChartOptions} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Growth Table */}
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">월별 고객 성장</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm table-nowrap">
                        <thead>
                          <tr>
                            <th>월</th>
                            <th>신규 고객</th>
                            <th>누적 고객</th>
                            <th>성장률</th>
                            <th>추세</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerGrowthData.map((data, index) => {
                            const prevData = index > 0 ? customerGrowthData[index - 1] : data;
                            const growthRate = index > 0
                              ? ((data.newCustomers - prevData.newCustomers) / prevData.newCustomers) * 100
                              : 0;

                            return (
                              <tr key={index}>
                                <td>{data.month}</td>
                                <td className="text-primary font-weight-bold">
                                  +{data.newCustomers}
                                </td>
                                <td>
                                  <strong>{data.totalCustomers}</strong>
                                </td>
                                <td>
                                  {index === 0 ? (
                                    <span className="text-muted">-</span>
                                  ) : growthRate >= 0 ? (
                                    <span className="text-success">+{growthRate.toFixed(1)}%</span>
                                  ) : (
                                    <span className="text-danger">{growthRate.toFixed(1)}%</span>
                                  )}
                                </td>
                                <td>
                                  {index === customerGrowthData.length - 1 ? (
                                    <span className="badge badge-primary">현재</span>
                                  ) : growthRate > 10 ? (
                                    <span className="badge badge-success">↑ 상승</span>
                                  ) : growthRate > 0 ? (
                                    <span className="badge badge-info">→ 유지</span>
                                  ) : (
                                    <span className="badge badge-warning">↓ 하락</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Peak Hours Tab */}
          {activeTab === 'peakhours' && (
            <div className="row">
              {/* Peak Hour Stats */}
              <div className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle mr-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: '#dc3545',
                          color: 'white',
                          fontSize: '1.5rem',
                        }}
                      >
                        🔥
                      </div>
                      <div>
                        <h4 className="mb-0">{peakHour.hour}</h4>
                        <small className="text-muted">피크 시간대</small>
                        <div className="text-success small">{peakHour.bookings}건 예약</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
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
                        💰
                      </div>
                      <div>
                        <h4 className="mb-0">
                          ₩{(peakHour.revenue / 10000).toFixed(0)}만
                        </h4>
                        <small className="text-muted">피크 시간대 매출</small>
                        <div className="text-success small">최고 수익</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
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
                        📊
                      </div>
                      <div>
                        <h4 className="mb-0">
                          {Math.round(
                            peakHourData.reduce((sum, d) => sum + d.bookings, 0) /
                              peakHourData.length,
                          )}
                        </h4>
                        <small className="text-muted">시간당 평균 예약</small>
                        <div className="text-muted small">전체 평균</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Peak Hours Chart */}
              <div className="col-12 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">시간대별 예약 분포</h5>
                  </div>
                  <div className="card-body">
                    <div style={{ height: '400px' }}>
                      <Bar data={peakHoursChartData} options={peakHoursChartOptions} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Peak Hours Table */}
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">시간대별 상세</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm table-nowrap">
                        <thead>
                          <tr>
                            <th>시간</th>
                            <th>예약 수</th>
                            <th>매출 (₩)</th>
                            <th>비중</th>
                            <th>비고</th>
                          </tr>
                        </thead>
                        <tbody>
                          {peakHourData
                            .sort((a, b) => b.bookings - a.bookings)
                            .map((data, index) => {
                              const totalBookings = peakHourData.reduce((sum, d) => sum + d.bookings, 0);
                              const percentage = (data.bookings / totalBookings) * 100;

                              return (
                                <tr key={data.hour}>
                                  <td>
                                    <strong>{data.hour}</strong>
                                  </td>
                                  <td className="font-weight-bold">{data.bookings}건</td>
                                  <td>₩{(data.revenue / 10000).toFixed(1)}만원</td>
                                  <td>
                                    <div
                                      className="progress"
                                      style={{ height: '20px', minWidth: '100px' }}
                                    >
                                      <div
                                        className="progress-bar bg-primary"
                                        style={{ width: `${percentage}%` }}
                                      >
                                        {percentage.toFixed(1)}%
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    {index === 0 ? (
                                      <span className="badge badge-danger">🔥 피크</span>
                                    ) : percentage > 8 ? (
                                      <span className="badge badge-warning">⚡ 혼잡</span>
                                    ) : percentage > 5 ? (
                                      <span className="badge badge-info">보통</span>
                                    ) : (
                                      <span className="badge badge-secondary">여유</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Peak Hours Insights */}
              <div className="col-12">
                <div className="card border-info">
                  <div className="card-body">
                    <h6 className="text-info mb-3">
                      <i className="fe fe-info mr-1" />
                      피크 시간 분석 인사이트
                    </h6>
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="small mb-0">
                          <li>
                            <strong>최대 피크:</strong> {peakHour.hour}에 가장 많은 예약 (
                            {peakHour.bookings}건)
                          </li>
                          <li>
                            <strong>운영 시간:</strong> 06:00 ~ 22:00 (17시간 운영)
                          </li>
                          <li>
                            <strong>총 예약:</strong>{' '}
                            {peakHourData.reduce((sum, d) => sum + d.bookings, 0)}건
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="small mb-0">
                          <li>
                            <strong>권장 사항:</strong> 피크 시간대(17-20시)에 직원 추가 배치
                          </li>
                          <li>
                            <strong>프로모션:</strong> 여유 시간대(06-09시) 할인 프로모션 고려
                          </li>
                          <li>
                            <strong>예약 제한:</strong> 피크 시간대 온라인 예약 한도 설정 검토
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="row">
              {/* Service Stats */}
              <div className="col-md-4 mb-4">
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
                        ⭐
                      </div>
                      <div>
                        <h4 className="mb-0">{topService.service}</h4>
                        <small className="text-muted">인기 서비스</small>
                        <div className="text-success small">
                          {topService.bookings}건 ({topService.percentage}%)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
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
                        💰
                      </div>
                      <div>
                        <h4 className="mb-0">
                          ₩
                          {(
                            servicePopularityData.reduce((sum, d) => sum + d.revenue, 0) / 10000
                          ).toFixed(0)}
                          만
                        </h4>
                        <small className="text-muted">서비스 총 매출</small>
                        <div className="text-success small">전체의 72%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
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
                        📊
                      </div>
                      <div>
                        <h4 className="mb-0">
                          {servicePopularityData.reduce((sum, d) => sum + d.bookings, 0)}
                        </h4>
                        <small className="text-muted">총 예약 건수</small>
                        <div className="text-muted small">5개 서비스</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Popularity Chart */}
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">서비스 인기도 (예약 기준)</h5>
                  </div>
                  <div className="card-body">
                    <div style={{ height: '350px' }}>
                      <Doughnut data={servicePopularityChartData} options={servicePopularityChartOptions} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Ranking */}
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">서비스 순위</h5>
                  </div>
                  <div className="card-body">
                    {servicePopularityData.map((service, index) => (
                      <div key={index} className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <span
                              className="badge badge-secondary mr-2"
                              style={{
                                minWidth: '30px',
                                fontSize: '1rem',
                                background: index === 0 ? '#ffc107' : undefined,
                              }}
                            >
                              {index + 1}
                            </span>
                            <span className="font-weight-bold">{service.service}</span>
                          </div>
                          <span className="text-muted">{service.percentage}%</span>
                        </div>
                        <div className="progress" style={{ height: '25px' }}>
                          <div
                            className="progress-bar progress-bar-striped"
                            style={{
                              width: `${service.percentage}%`,
                              backgroundColor:
                                index === 0 ? '#ffc107' : index === 1 ? '#28a745' : '#667eea',
                            }}
                          >
                            {service.bookings}건
                          </div>
                        </div>
                        <small className="text-muted">
                          ₩{(service.revenue / 10000).toFixed(0)}만원 (
                          {Math.round(service.revenue / service.bookings).toLocaleString()}원/건)
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service Details Table */}
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">서비스별 상세 분석</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm table-nowrap">
                        <thead>
                          <tr>
                            <th>순위</th>
                            <th>서비스명</th>
                            <th>예약 건수</th>
                            <th>비중</th>
                            <th>매출 (₩)</th>
                            <th>객단가</th>
                            <th>평균 가격</th>
                          </tr>
                        </thead>
                        <tbody>
                          {servicePopularityData.map((service, index) => {
                            const avgPrice = Math.round(service.revenue / service.bookings);
                            const maxBookings = servicePopularityData[0].bookings;
                            const relativePerformance = (service.bookings / maxBookings) * 100;

                            return (
                              <tr key={index}>
                                <td>
                                  <span
                                    className="badge badge-secondary"
                                    style={{
                                      minWidth: '30px',
                                      fontSize: '1rem',
                                      background: index === 0 ? '#ffc107' : undefined,
                                    }}
                                  >
                                    {index + 1}
                                  </span>
                                </td>
                                <td>
                                  <strong>{service.service}</strong>
                                </td>
                                <td className="font-weight-bold">{service.bookings}건</td>
                                <td>
                                  <div
                                    className="progress"
                                    style={{ height: '20px', minWidth: '100px' }}
                                  >
                                    <div
                                      className="progress-bar"
                                      style={{
                                        width: `${service.percentage}%`,
                                        backgroundColor:
                                          index === 0
                                            ? '#ffc107'
                                            : index === 1
                                              ? '#28a745'
                                              : '#667eea',
                                      }}
                                    >
                                      {service.percentage}%
                                    </div>
                                  </div>
                                </td>
                                <td>₩{(service.revenue / 10000).toFixed(0)}만원</td>
                                <td>
                                  <strong>
                                    ₩{avgPrice.toLocaleString()}
                                  </strong>
                                </td>
                                <td>
                                  {index === 0 ? (
                                    <span className="badge badge-warning">프리미엄</span>
                                  ) : avgPrice > 40000 ? (
                                    <span className="badge badge-info">고가</span>
                                  ) : avgPrice > 20000 ? (
                                    <span className="badge badge-primary">중가</span>
                                  ) : (
                                    <span className="badge badge-secondary">가성비</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Insights */}
              <div className="col-12">
                <div className="card border-info">
                  <div className="card-body">
                    <h6 className="text-info mb-3">
                      <i className="fe fe-info mr-1" />
                      서비스 분석 인사이트
                    </h6>
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="font-weight-bold mb-2">🏆 인기 서비스</h6>
                        <ul className="small mb-3">
                          <li>
                            <strong>{topService.service}</strong>이 전체 예약의 {topService.percentage}%를 차지
                          </li>
                          <li>
                            요가, PT, 필라테스가 상위 3개 서비스로 전체의 71% 점유
                          </li>
                          <li>PT 룸이 가장 높은 객단가 (₩50,000)</li>
                        </ul>

                        <h6 className="font-weight-bold mb-2">💡 개선 제안</h6>
                        <ul className="small mb-0">
                          <li>
                            <strong>프로모션:</strong> 하위 서비스(기구 운동) 프로모션으로 매출 다각화
                          </li>
                          <li>
                            <strong>신규 서비스:</strong> 인기 서비스와 유사한 컨셉의 신규 서비스 개발 고려
                          </li>
                          <li>
                            <strong>가격 전략:</strong> 객단가 분석을 통한 동적 가격 정책 도입
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h6 className="font-weight-bold mb-2">📊 매출 기준 순위</h6>
                        <ol className="small mb-3">
                          <li>
                            <strong>PT 룸:</strong> ₩1,225만원 (객단가 ₩50,000)
                          </li>
                          <li>
                            <strong>필라테스:</strong> ₩990만원 (객단가 ₩50,000)
                          </li>
                          <li>
                            <strong>요가 클래스:</strong> ₩855만원 (객단가 ₩30,000)
                          </li>
                          <li>
                            <strong>그룹 클래스:</strong> ₩350만원 (객단가 ₩20,000)
                          </li>
                          <li>
                            <strong>기구 운동:</strong> ₩192만원 (객단가 ₩15,000)
                          </li>
                        </ol>

                        <h6 className="font-weight-bold mb-2">🎯 타겟팅 전략</h6>
                        <ul className="small mb-0">
                          <li>
                            <strong>고객 세분화:</strong> PT/필라테스 회원 vs 요가/그룹 클래스 회원
                          </li>
                          <li>
                            <strong>추천 상품:</strong> PT 회원에게 필라테스 추천 (유사 가격대)
                          </li>
                          <li>
                            <strong>패키지:</strong> 요가 + 그룹 클래스 패키지로 복합 이용 유도
                          </li>
                        </ul>
                      </div>
                    </div>
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

export default Analytics;
