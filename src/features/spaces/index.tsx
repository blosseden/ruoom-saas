import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

interface Space {
  id: number;
  name: string;
  type: string;
  capacity: number;
  status: 'active' | 'maintenance' | 'inactive';
  hourlyRate: number;
  totalBookings: number;
  utilizationRate: number;
  amenities: string[];
  image: string;
}

/**
 * Epic E: Space Management Page
 * 공간 목록 및 관리
 */
const Spaces: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<
    'all' | 'gym' | 'yoga' | 'pt' | 'pilates'
  >('all');

  // Mock space data
  const spaces: Space[] = [
    {
      id: 1,
      name: '메인 운동장',
      type: 'gym',
      capacity: 30,
      status: 'active',
      hourlyRate: 20000,
      totalBookings: 245,
      utilizationRate: 78,
      amenities: ['운동기구', '에어컨', '음악', '거울'],
      image: '🏋️',
    },
    {
      id: 2,
      name: 'PT 룸 1',
      type: 'pt',
      capacity: 4,
      status: 'active',
      hourlyRate: 50000,
      totalBookings: 158,
      utilizationRate: 85,
      amenities: ['PT 기구', '에어컨', '음악'],
      image: '💪',
    },
    {
      id: 3,
      name: 'PT 룸 2',
      type: 'pt',
      capacity: 4,
      status: 'active',
      hourlyRate: 50000,
      totalBookings: 132,
      utilizationRate: 82,
      amenities: ['PT 기구', '에어컨', '음악'],
      image: '💪',
    },
    {
      id: 4,
      name: '요가 스튜디오 A',
      type: 'yoga',
      capacity: 15,
      status: 'active',
      hourlyRate: 30000,
      totalBookings: 186,
      utilizationRate: 72,
      amenities: ['요가매트', '에어컨', '음악', '아로마'],
      image: '🧘',
    },
    {
      id: 5,
      name: '요가 스튜디오 B',
      type: 'yoga',
      capacity: 12,
      status: 'maintenance',
      hourlyRate: 30000,
      totalBookings: 98,
      utilizationRate: 0,
      amenities: ['요가매트', '에어컨', '음악'],
      image: '🧘',
    },
    {
      id: 6,
      name: '필라테스 룸',
      type: 'pilates',
      capacity: 10,
      status: 'active',
      hourlyRate: 40000,
      totalBookings: 175,
      utilizationRate: 88,
      amenities: ['필라테스 기구', '에어컨', '음악', '거울'],
      image: '🤸',
    },
  ];

  const filteredSpaces = spaces.filter((space) => {
    const matchesSearch =
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || space.type === filterType;

    return matchesSearch && matchesType;
  });

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
                      <h2 className="mb-0">🏢 공간 관리</h2>
                      <p className="text-muted mb-0">공간 목록 및 예약 현황</p>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-primary">
                        <i className="fe fe-plus mr-1" />새 공간 추가
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="row mb-4">
            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '2rem' }}>🏢</div>
                  <h2 className="mt-2 mb-0">{spaces.length}</h2>
                  <p className="text-muted mb-0">총 공간</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '2rem' }}>✅</div>
                  <h2 className="mt-2 mb-0">
                    {spaces.filter((s) => s.status === 'active').length}
                  </h2>
                  <p className="text-muted mb-0">활성 공간</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '2rem' }}>🔧</div>
                  <h2 className="mt-2 mb-0">
                    {spaces.filter((s) => s.status === 'maintenance').length}
                  </h2>
                  <p className="text-muted mb-0">점검 중</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <div style={{ fontSize: '2rem' }}>📊</div>
                  <h2 className="mt-2 mb-0">
                    {Math.round(
                      spaces.reduce((sum, s) => sum + s.utilizationRate, 0) /
                        spaces.length,
                    )}
                    %
                  </h2>
                  <p className="text-muted mb-0">평균 활용률</p>
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
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="공간 검색..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="fe fe-search" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
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
                            filterType === 'gym'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterType('gym')}
                        >
                          운동장
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterType === 'pt'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterType('pt')}
                        >
                          PT
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterType === 'yoga'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterType('yoga')}
                        >
                          요가
                        </button>
                        <button
                          className={`btn btn-sm ${
                            filterType === 'pilates'
                              ? 'btn-primary'
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => setFilterType('pilates')}
                        >
                          필라테스
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spaces Grid */}
          <div className="row">
            {filteredSpaces.map((space) => (
              <div key={space.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle mr-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: '60px',
                            height: '60px',
                            background: '#e2e8f0',
                            fontSize: '2rem',
                          }}
                        >
                          {space.image}
                        </div>
                        <div>
                          <Link
                            to={`${ROUTES.BUSINESS.CUSTOMERS}/${space.id}`}
                            className="text-decoration-none"
                          >
                            <h5 className="mb-0">{space.name}</h5>
                          </Link>
                          <small className="text-muted">
                            {space.type === 'gym' && '운동장'}
                            {space.type === 'pt' && 'PT 룸'}
                            {space.type === 'yoga' && '요가 스튜디오'}
                            {space.type === 'pilates' && '필라테스 룸'}
                          </small>
                        </div>
                      </div>
                      <span
                        className={`badge ${
                          space.status === 'active'
                            ? 'badge-success'
                            : space.status === 'maintenance'
                              ? 'badge-warning'
                              : 'badge-secondary'
                        }`}
                      >
                        {space.status === 'active'
                          ? '활성'
                          : space.status === 'maintenance'
                            ? '점검'
                            : '비활성'}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">활용률</small>
                        <strong>{space.utilizationRate}%</strong>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${space.utilizationRate}%`,
                            backgroundColor:
                              space.utilizationRate >= 80
                                ? '#28a745'
                                : space.utilizationRate >= 60
                                  ? '#667eea'
                                  : '#ffc107',
                          }}
                        />
                      </div>
                    </div>

                    <div className="row text-center mb-3">
                      <div className="col-4">
                        <small className="text-muted d-block">수용 인원</small>
                        <strong>{space.capacity}명</strong>
                      </div>
                      <div className="col-4">
                        <small className="text-muted d-block">시간당</small>
                        <strong>
                          ₩{(space.hourlyRate / 10000).toFixed(0)}만
                        </strong>
                      </div>
                      <div className="col-4">
                        <small className="text-muted d-block">총 예약</small>
                        <strong>{space.totalBookings}</strong>
                      </div>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted d-block mb-2">
                        편의시설
                      </small>
                      <div>
                        {space.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="badge badge-light mr-1 mb-1"
                            style={{
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.5rem',
                            }}
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary flex-fill">
                        <i className="fe fe-eye mr-1" />
                        상세
                      </button>
                      <button className="btn btn-sm btn-outline-secondary flex-fill">
                        <i className="fe fe-edit-2 mr-1" />
                        수정
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="fe fe-trash-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Spaces;
