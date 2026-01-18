import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { getCurrentUser, mockSignOut } from '@/mocks/auth';

/**
 * Epic D: Availability Management
 * Business hours, breaks, holidays, and availability settings
 */

interface BusinessHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface BreakTime {
  id: string;
  startTime: string;
  endTime: string;
  reason: string;
}

interface Holiday {
  id: string;
  date: string;
  name: string;
  recurring: boolean;
}

interface AvailabilityOverride {
  id: string;
  date: string;
  isAvailable: boolean;
  startTime?: string;
  endTime?: string;
  reason: string;
}

const AvailabilityManagement: FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [activeTab, setActiveTab] = useState<
    'hours' | 'breaks' | 'holidays' | 'overrides' | 'rules'
  >('hours');

  // Business Hours
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>([
    { day: '월요일', isOpen: true, openTime: '06:00', closeTime: '22:00' },
    { day: '화요일', isOpen: true, openTime: '06:00', closeTime: '22:00' },
    { day: '수요일', isOpen: true, openTime: '06:00', closeTime: '22:00' },
    { day: '목요일', isOpen: true, openTime: '06:00', closeTime: '22:00' },
    { day: '금요일', isOpen: true, openTime: '06:00', closeTime: '22:00' },
    { day: '토요일', isOpen: true, openTime: '08:00', closeTime: '20:00' },
    { day: '일요일', isOpen: true, openTime: '08:00', closeTime: '20:00' },
  ]);

  // Break Times
  const [breakTimes, setBreakTimes] = useState<BreakTime[]>([
    { id: '1', startTime: '12:00', endTime: '13:00', reason: '점심시간' },
  ]);

  const [newBreak, setNewBreak] = useState({
    startTime: '',
    endTime: '',
    reason: '',
  });

  // Holidays
  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: '1', date: '2026-01-01', name: '신정', recurring: true },
    { id: '2', date: '2026-02-10', name: '설날', recurring: true },
    { id: '3', date: '2026-03-01', name: '삼일절', recurring: true },
    { id: '4', date: '2026-05-05', name: '어린이날', recurring: true },
    { id: '5', date: '2026-06-06', name: '현충일', recurring: true },
  ]);

  const [newHoliday, setNewHoliday] = useState({
    date: '',
    name: '',
    recurring: false,
  });

  // Availability Overrides
  const [overrides, setOverrides] = useState<AvailabilityOverride[]>([
    {
      id: '1',
      date: '2026-01-25',
      isAvailable: false,
      reason: '내부 휴일',
    },
  ]);

  const [newOverride, setNewOverride] = useState({
    date: '',
    isAvailable: true,
    startTime: '',
    endTime: '',
    reason: '',
  });

  // Buffer Time
  const [bufferTime, setBufferTime] = useState(15); // minutes

  // Recurring Rules
  const [recurringRules, setRecurringRules] = useState([
    {
      id: '1',
      name: '매월 마지막 주 토요일',
      pattern: 'last-saturday',
      isAvailable: false,
    },
  ]);

  const handleSignOut = async () => {
    await mockSignOut();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  const updateBusinessHours = (
    index: number,
    field: keyof BusinessHours,
    value: string | boolean,
  ) => {
    const updated = [...businessHours];
    updated[index] = { ...updated[index], [field]: value };
    setBusinessHours(updated);
  };

  const addBreakTime = () => {
    if (newBreak.startTime && newBreak.endTime && newBreak.reason) {
      setBreakTimes([
        ...breakTimes,
        { id: Date.now().toString(), ...newBreak },
      ]);
      setNewBreak({ startTime: '', endTime: '', reason: '' });
    }
  };

  const removeBreakTime = (id: string) => {
    setBreakTimes(breakTimes.filter((b) => b.id !== id));
  };

  const addHoliday = () => {
    if (newHoliday.date && newHoliday.name) {
      setHolidays([...holidays, { id: Date.now().toString(), ...newHoliday }]);
      setNewHoliday({ date: '', name: '', recurring: false });
    }
  };

  const removeHoliday = (id: string) => {
    setHolidays(holidays.filter((h) => h.id !== id));
  };

  const addOverride = () => {
    if (newOverride.date && newOverride.reason) {
      setOverrides([
        ...overrides,
        { id: Date.now().toString(), ...newOverride },
      ]);
      setNewOverride({
        date: '',
        isAvailable: true,
        startTime: '',
        endTime: '',
        reason: '',
      });
    }
  };

  const removeOverride = (id: string) => {
    setOverrides(overrides.filter((o) => o.id !== id));
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
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h1 className="header-title mb-0">예약 가능 시간 관리</h1>
                      <p className="text-muted mb-0">
                        비즈니스 운영 시간, 휴일, 예약 규칙을 설정하세요
                      </p>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-primary">
                        <i className="fe fe-save mr-1" />
                        저장
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  {/* Tabs */}
                  <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'hours' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hours')}
                      >
                        <i className="fe fe-clock mr-1" />
                        운영 시간
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'breaks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('breaks')}
                      >
                        <i className="fe fe-pause mr-1" />
                        휴식 시간
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'holidays' ? 'active' : ''}`}
                        onClick={() => setActiveTab('holidays')}
                      >
                        <i className="fe fe-calendar mr-1" />
                        공휴일
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'overrides' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overrides')}
                      >
                        <i className="fe fe-edit-2 mr-1" />
                        일일 변경
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'rules' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rules')}
                      >
                        <i className="fe fe-sliders mr-1" />
                        예약 규칙
                      </button>
                    </li>
                  </ul>

                  {/* Tab Content */}
                  {activeTab === 'hours' && (
                    <div>
                      <h5 className="mb-3">비즈니스 운영 시간</h5>
                      <p className="text-muted mb-4">
                        각 요일의 운영 시간을 설정하세요. 휴무일은 체크를
                        해제하세요.
                      </p>

                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead className="table-light">
                            <tr>
                              <th style={{ width: '20%' }}>요일</th>
                              <th style={{ width: '15%' }}>운영 여부</th>
                              <th style={{ width: '25%' }}>오픈 시간</th>
                              <th style={{ width: '25%' }}>마감 시간</th>
                              <th style={{ width: '15%' }}>작업</th>
                            </tr>
                          </thead>
                          <tbody>
                            {businessHours.map((hours, index) => (
                              <tr key={hours.day}>
                                <td>
                                  <strong>{hours.day}</strong>
                                </td>
                                <td>
                                  <div className="custom-control custom-switch">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id={`toggle-${index}`}
                                      checked={hours.isOpen}
                                      onChange={(e) =>
                                        updateBusinessHours(
                                          index,
                                          'isOpen',
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={`toggle-${index}`}
                                    >
                                      {hours.isOpen ? '운영중' : '휴무'}
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <input
                                    type="time"
                                    className="form-control"
                                    value={hours.openTime}
                                    onChange={(e) =>
                                      updateBusinessHours(
                                        index,
                                        'openTime',
                                        e.target.value,
                                      )
                                    }
                                    disabled={!hours.isOpen}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="time"
                                    className="form-control"
                                    value={hours.closeTime}
                                    onChange={(e) =>
                                      updateBusinessHours(
                                        index,
                                        'closeTime',
                                        e.target.value,
                                      )
                                    }
                                    disabled={!hours.isOpen}
                                  />
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => {
                                      // Apply to all weekdays
                                      if (index < 5) {
                                        const updated = businessHours.map(
                                          (h, i) =>
                                            i < 5
                                              ? {
                                                  ...h,
                                                  openTime: hours.openTime,
                                                  closeTime: hours.closeTime,
                                                }
                                              : h,
                                        );
                                        setBusinessHours(updated);
                                      }
                                    }}
                                    title="평일에 모두 적용"
                                  >
                                    <i className="fe fe-copy" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'breaks' && (
                    <div>
                      <h5 className="mb-3">휴식 시간 설정</h5>
                      <p className="text-muted mb-4">
                        예약이 불가능한 휴식 시간을 설정하세요 (예: 점심시간).
                      </p>

                      {/* Existing Break Times */}
                      <div className="card mb-4">
                        <div className="card-body">
                          <h6 className="mb-3">설정된 휴식 시간</h6>
                          {breakTimes.length === 0 ? (
                            <p className="text-muted mb-0">
                              설정된 휴식 시간이 없습니다.
                            </p>
                          ) : (
                            <div className="list-group list-group-flush">
                              {breakTimes.map((breakTime) => (
                                <div
                                  key={breakTime.id}
                                  className="list-group-item"
                                >
                                  <div className="row align-items-center">
                                    <div className="col">
                                      <strong>{breakTime.reason}</strong>
                                      <p className="text-muted mb-0">
                                        {breakTime.startTime} -{' '}
                                        {breakTime.endTime}
                                      </p>
                                    </div>
                                    <div className="col-auto">
                                      <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                          removeBreakTime(breakTime.id)
                                        }
                                      >
                                        <i className="fe fe-trash mr-1" />
                                        삭제
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Add New Break Time */}
                      <div className="card">
                        <div className="card-body">
                          <h6 className="mb-3">새 휴식 시간 추가</h6>
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">시작 시간</label>
                              <input
                                type="time"
                                className="form-control"
                                value={newBreak.startTime}
                                onChange={(e) =>
                                  setNewBreak({
                                    ...newBreak,
                                    startTime: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">종료 시간</label>
                              <input
                                type="time"
                                className="form-control"
                                value={newBreak.endTime}
                                onChange={(e) =>
                                  setNewBreak({
                                    ...newBreak,
                                    endTime: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">사유</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="예: 점심시간"
                                value={newBreak.reason}
                                onChange={(e) =>
                                  setNewBreak({
                                    ...newBreak,
                                    reason: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">&nbsp;</label>
                              <button
                                className="btn btn-primary btn-block"
                                onClick={addBreakTime}
                                disabled={
                                  !newBreak.startTime ||
                                  !newBreak.endTime ||
                                  !newBreak.reason
                                }
                              >
                                <i className="fe fe-plus mr-1" />
                                추가
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'holidays' && (
                    <div>
                      <h5 className="mb-3">공휴일 설정</h5>
                      <p className="text-muted mb-4">
                        매년 반복되는 공휴일을 설정하세요. 이 날짜에는 예약이
                        자동으로 차단됩니다.
                      </p>

                      {/* Existing Holidays */}
                      <div className="card mb-4">
                        <div className="card-body">
                          <h6 className="mb-3">설정된 공휴일</h6>
                          {holidays.length === 0 ? (
                            <p className="text-muted mb-0">
                              설정된 공휴일이 없습니다.
                            </p>
                          ) : (
                            <div className="list-group list-group-flush">
                              {holidays.map((holiday) => (
                                <div
                                  key={holiday.id}
                                  className="list-group-item"
                                >
                                  <div className="row align-items-center">
                                    <div className="col">
                                      <strong>{holiday.name}</strong>
                                      <p className="text-muted mb-0">
                                        {holiday.date}
                                        {holiday.recurring && (
                                          <span className="badge badge-info ml-2">
                                            <i className="fe fe-refresh-cw mr-1" />
                                            매년 반복
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                    <div className="col-auto">
                                      <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                          removeHoliday(holiday.id)
                                        }
                                      >
                                        <i className="fe fe-trash mr-1" />
                                        삭제
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Add New Holiday */}
                      <div className="card">
                        <div className="card-body">
                          <h6 className="mb-3">새 공휴일 추가</h6>
                          <div className="row">
                            <div className="col-md-4">
                              <label className="form-label">날짜</label>
                              <input
                                type="date"
                                className="form-control"
                                value={newHoliday.date}
                                onChange={(e) =>
                                  setNewHoliday({
                                    ...newHoliday,
                                    date: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">공휴일 이름</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="예: 추석"
                                value={newHoliday.name}
                                onChange={(e) =>
                                  setNewHoliday({
                                    ...newHoliday,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">반복</label>
                              <div className="custom-control custom-switch mt-2">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="holidayRecurring"
                                  checked={newHoliday.recurring}
                                  onChange={(e) =>
                                    setNewHoliday({
                                      ...newHoliday,
                                      recurring: e.target.checked,
                                    })
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="holidayRecurring"
                                >
                                  매년
                                </label>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">&nbsp;</label>
                              <button
                                className="btn btn-primary btn-block"
                                onClick={addHoliday}
                                disabled={!newHoliday.date || !newHoliday.name}
                              >
                                <i className="fe fe-plus mr-1" />
                                추가
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'overrides' && (
                    <div>
                      <h5 className="mb-3">일일 availability 변경</h5>
                      <p className="text-muted mb-4">
                        특정 날짜의 예약 가능 여부를 수동으로 변경하세요.
                      </p>

                      {/* Existing Overrides */}
                      <div className="card mb-4">
                        <div className="card-body">
                          <h6 className="mb-3">설정된 변경사항</h6>
                          {overrides.length === 0 ? (
                            <p className="text-muted mb-0">
                              설정된 변경사항이 없습니다.
                            </p>
                          ) : (
                            <div className="list-group list-group-flush">
                              {overrides.map((override) => (
                                <div
                                  key={override.id}
                                  className="list-group-item"
                                >
                                  <div className="row align-items-center">
                                    <div className="col">
                                      <strong>{override.date}</strong>
                                      <p className="text-muted mb-0">
                                        {override.isAvailable ? (
                                          <span className="badge badge-success">
                                            예약 가능
                                          </span>
                                        ) : (
                                          <span className="badge badge-danger">
                                            예약 불가
                                          </span>
                                        )}
                                        {override.startTime &&
                                          override.endTime && (
                                            <span className="ml-2">
                                              ({override.startTime} -{' '}
                                              {override.endTime})
                                            </span>
                                          )}
                                        <span className="ml-2 text-muted">
                                          사유: {override.reason}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="col-auto">
                                      <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                          removeOverride(override.id)
                                        }
                                      >
                                        <i className="fe fe-trash mr-1" />
                                        삭제
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Add New Override */}
                      <div className="card">
                        <div className="card-body">
                          <h6 className="mb-3">새 변경사항 추가</h6>
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">날짜</label>
                              <input
                                type="date"
                                className="form-control"
                                value={newOverride.date}
                                onChange={(e) =>
                                  setNewOverride({
                                    ...newOverride,
                                    date: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">예약 가능</label>
                              <div className="custom-control custom-switch mt-2">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="overrideAvailable"
                                  checked={newOverride.isAvailable}
                                  onChange={(e) =>
                                    setNewOverride({
                                      ...newOverride,
                                      isAvailable: e.target.checked,
                                    })
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="overrideAvailable"
                                >
                                  {newOverride.isAvailable ? '가능' : '불가'}
                                </label>
                              </div>
                            </div>
                            {newOverride.isAvailable && (
                              <>
                                <div className="col-md-2">
                                  <label className="form-label">
                                    시작 시간
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control"
                                    value={newOverride.startTime}
                                    onChange={(e) =>
                                      setNewOverride({
                                        ...newOverride,
                                        startTime: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="form-label">
                                    종료 시간
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control"
                                    value={newOverride.endTime}
                                    onChange={(e) =>
                                      setNewOverride({
                                        ...newOverride,
                                        endTime: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </>
                            )}
                            <div className="col-md-3">
                              <label className="form-label">사유</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="예: 특별 이벤트"
                                value={newOverride.reason}
                                onChange={(e) =>
                                  setNewOverride({
                                    ...newOverride,
                                    reason: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">&nbsp;</label>
                              <button
                                className="btn btn-primary btn-block"
                                onClick={addOverride}
                                disabled={
                                  !newOverride.date || !newOverride.reason
                                }
                              >
                                <i className="fe fe-plus mr-1" />
                                추가
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'rules' && (
                    <div>
                      <h5 className="mb-3">예약 규칙 설정</h5>
                      <p className="text-muted mb-4">
                        예약 관련 고급 설정을 구성하세요.
                      </p>

                      {/* Buffer Time */}
                      <div className="card mb-4">
                        <div className="card-body">
                          <h6 className="mb-3">
                            <i className="fe fe-clock mr-2" />
                            버퍼 시간 (예약 간격)
                          </h6>
                          <p className="text-muted mb-3">
                            예약 사이의 최소 간격을 설정하세요. 청소 및 준비
                            시간을 확보할 수 있습니다.
                          </p>
                          <div className="row align-items-center">
                            <div className="col-md-4">
                              <select
                                className="form-control"
                                value={bufferTime}
                                onChange={(e) =>
                                  setBufferTime(parseInt(e.target.value))
                                }
                              >
                                <option value={0}>버퍼 없음</option>
                                <option value={5}>5분</option>
                                <option value={10}>10분</option>
                                <option value={15}>15분</option>
                                <option value={20}>20분</option>
                                <option value={30}>30분</option>
                                <option value={60}>1시간</option>
                              </select>
                            </div>
                            <div className="col-md-8">
                              <p className="text-muted mb-0">
                                현재 설정: <strong>{bufferTime}분</strong> 버퍼
                                시간
                              </p>
                              <small className="text-muted">
                                예: 10:00에 예약이 있으면, 다음 예약은 10:
                                {bufferTime}
                                부터 가능합니다.
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recurring Rules */}
                      <div className="card mb-4">
                        <div className="card-body">
                          <h6 className="mb-3">
                            <i className="fe fe-refresh-cw mr-2" />
                            반복 규칙
                          </h6>
                          <p className="text-muted mb-3">
                            매주/매월 특정 패턴으로 예약을 제한하세요.
                          </p>
                          {recurringRules.length === 0 ? (
                            <p className="text-muted mb-0">
                              설정된 반복 규칙이 없습니다.
                            </p>
                          ) : (
                            <div className="list-group list-group-flush mb-3">
                              {recurringRules.map((rule) => (
                                <div key={rule.id} className="list-group-item">
                                  <div className="row align-items-center">
                                    <div className="col">
                                      <strong>{rule.name}</strong>
                                      <p className="text-muted mb-0">
                                        {rule.isAvailable ? (
                                          <span className="badge badge-success">
                                            예약 가능
                                          </span>
                                        ) : (
                                          <span className="badge badge-danger">
                                            예약 불가
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                    <div className="col-auto">
                                      <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                          setRecurringRules(
                                            recurringRules.filter(
                                              (r) => r.id !== rule.id,
                                            ),
                                          )
                                        }
                                      >
                                        <i className="fe fe-trash mr-1" />
                                        삭제
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add Recurring Rule */}
                          <div className="border-top pt-3">
                            <h6 className="mb-3">새 반복 규칙 추가</h6>
                            <div className="row">
                              <div className="col-md-4">
                                <label className="form-label">규칙 이름</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="예: 매월 첫째 월요일"
                                />
                              </div>
                              <div className="col-md-3">
                                <label className="form-label">패턴</label>
                                <select className="form-control">
                                  <option value="">선택하세요</option>
                                  <option value="first-monday">
                                    매월 첫째 월요일
                                  </option>
                                  <option value="last-saturday">
                                    매월 마지막 토요일
                                  </option>
                                  <option value="every-friday">
                                    매주 금요일
                                  </option>
                                </select>
                              </div>
                              <div className="col-md-2">
                                <label className="form-label">상태</label>
                                <select className="form-control">
                                  <option value="available">예약 가능</option>
                                  <option value="unavailable">예약 불가</option>
                                </select>
                              </div>
                              <div className="col-md-3">
                                <label className="form-label">&nbsp;</label>
                                <button className="btn btn-primary btn-block">
                                  <i className="fe fe-plus mr-1" />
                                  추가
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Settings */}
                      <div className="card">
                        <div className="card-body">
                          <h6 className="mb-3">기타 설정</h6>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="allowSameDay"
                                defaultChecked
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="allowSameDay"
                              >
                                당일 예약 허용
                              </label>
                              <small className="form-text text-muted">
                                고객이 당일 예약을 할 수 있도록 합니다.
                              </small>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="maxBookingsPerDay"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="maxBookingsPerDay"
                              >
                                하루 최대 예약 수 제한
                              </label>
                              <div className="row mt-2">
                                <div className="col-md-3">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="최대 수"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailabilityManagement;
