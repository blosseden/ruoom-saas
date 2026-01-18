import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * Epic D: Customer Booking Page
 * Multi-step booking flow for customers
 */

type BookingStep =
  | 'service'
  | 'datetime'
  | 'details'
  | 'confirmation'
  | 'success';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price: number;
}

interface BookingData {
  service: string;
  date: string;
  timeSlot: string;
  duration: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

const BookingPage: FC = () => {
  const { tenantSlug } = useParams<{ tenantSlug: string }>();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({});

  // Mock services/spaces
  const services = [
    {
      id: 'yoga',
      name: '요가 클래스',
      description: '전문 강사와 함께하는 요가 수업',
      duration: 60,
      price: 30000,
      image: '🧘',
    },
    {
      id: 'pt',
      name: '개인 트레이닝 (PT)',
      description: '1:1 맞춤형 퍼스널 트레이닝',
      duration: 60,
      price: 50000,
      image: '💪',
    },
    {
      id: 'pilates',
      name: '필라테스',
      description: '체형 교정과 코어 강화',
      duration: 50,
      price: 40000,
      image: '🏃',
    },
    {
      id: 'group',
      name: '그룹 수업',
      description: '다함께 즐기는 그룹 피트니스',
      duration: 90,
      price: 20000,
      image: '👥',
    },
  ];

  // Mock time slots
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 21;

    // Fixed availability pattern for demo
    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${min
          .toString()
          .padStart(2, '0')}`;
        // Use hour-based pattern instead of random
        const available = hour % 3 !== 0 || min === 0;
        slots.push({
          id: `${hour}-${min}`,
          time: timeStr,
          available,
          price: 0,
        });
      }
    }
    return slots;
  };

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Fixed booking number for demo
  const bookingNumber = 'BK' + '12345678';

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Helper functions
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return date.toLocaleDateString('ko-KR', options);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      errors.customerName = '이름을 입력해주세요.';
    } else if (formData.customerName.trim().length < 2) {
      errors.customerName = '이름은 최소 2자 이상이어야 합니다.';
    }

    if (!formData.customerEmail.trim()) {
      errors.customerEmail = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      errors.customerEmail = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.customerPhone.trim()) {
      errors.customerPhone = '전화번호를 입력해주세요.';
    } else if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(formData.customerPhone)) {
      errors.customerPhone =
        '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleServiceSelect = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      setBookingData({
        ...bookingData,
        service: serviceId,
        duration: service.duration,
      });
      setCurrentStep('datetime');
    }
  };

  const handleTimeSlotSelect = (slotId: string) => {
    const slot = timeSlots.find((s) => s.id === slotId);
    if (slot && slot.available) {
      setSelectedTimeSlot(slotId);
      setBookingData({
        ...bookingData,
        timeSlot: slot.time,
      });
    }
  };

  const handleDateTimeNext = () => {
    if (bookingData.timeSlot) {
      setCurrentStep('details');
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setBookingData({
        ...bookingData,
        ...formData,
        date: selectedDate,
      });
      setCurrentStep('confirmation');
    }
  };

  const handleConfirmBooking = () => {
    // In real app, save booking to backend
    setCurrentStep('success');
  };

  const getSelectedService = () =>
    services.find((s) => s.id === bookingData.service);

  const getTotalPrice = (): number => {
    const service = getSelectedService();
    if (!service) return 0;
    return service.price;
  };

  // Render functions for each step
  const renderServiceStep = () => (
    <div>
      <div className="text-center mb-4">
        <h2 className="mb-2">서비스 선택</h2>
        <p className="text-muted">예약할 서비스를 선택해주세요</p>
      </div>

      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-12 col-md-6 mb-3">
            <div
              className="card service-card h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => handleServiceSelect(service.id)}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className="service-icon mr-3"
                    style={{ fontSize: '3rem' }}
                  >
                    {service.image}
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1">{service.name}</h5>
                    <p className="text-muted small mb-2">
                      {service.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        <i className="fe fe-clock mr-1" />
                        {service.duration}분
                      </small>
                      <span className="text-primary font-weight-bold">
                        {service.price.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDateTimeStep = () => (
    <div>
      <div className="text-center mb-4">
        <h2 className="mb-2">날짜 및 시간 선택</h2>
        <p className="text-muted">원하시는 날짜와 시간을 선택해주세요</p>
      </div>

      {/* Date Selection */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="fe fe-calendar mr-2" />
            날짜 선택
          </h5>
        </div>
        <div className="card-body">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          {selectedDate && (
            <p className="text-muted mt-2 mb-0">
              선택된 날짜: {formatDate(selectedDate)}
            </p>
          )}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="fe fe-clock mr-2" />
            시간대 선택
          </h5>
        </div>
        <div className="card-body">
          <div className="time-slots-grid">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                className={`btn time-slot-btn ${
                  !slot.available
                    ? 'btn-secondary disabled'
                    : selectedTimeSlot === slot.id
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                }`}
                disabled={!slot.available}
                onClick={() => handleTimeSlotSelect(slot.id)}
              >
                {slot.time}
                {!slot.available && (
                  <small className="d-block text-muted">예약 불가</small>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Duration Info */}
      {getSelectedService() && (
        <div className="card bg-light">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-1">예약 정보</h6>
                <p className="text-muted mb-0">
                  {getSelectedService()?.name} •{' '}
                  {getSelectedService()?.duration}분
                </p>
              </div>
              <div className="text-right">
                <small className="text-muted d-block">예상 금액</small>
                <span className="h4 mb-0 text-primary">
                  {getSelectedService()?.price.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setCurrentStep('service')}
        >
          <i className="fe fe-arrow-left mr-1" />
          이전
        </button>
        <button
          className="btn btn-primary"
          onClick={handleDateTimeNext}
          disabled={!bookingData.timeSlot}
        >
          다음
          <i className="fe fe-arrow-right ml-1" />
        </button>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div>
      <div className="text-center mb-4">
        <h2 className="mb-2">고객 정보 입력</h2>
        <p className="text-muted">예약자 정보를 입력해주세요</p>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleDetailsSubmit}>
            <div className="form-group">
              <label htmlFor="customerName">
                이름 <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  formErrors.customerName ? 'is-invalid' : ''
                }`}
                id="customerName"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                placeholder="홍길동"
              />
              {formErrors.customerName && (
                <div className="invalid-feedback">
                  {formErrors.customerName}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">
                이메일 <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${
                  formErrors.customerEmail ? 'is-invalid' : ''
                }`}
                id="customerEmail"
                value={formData.customerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, customerEmail: e.target.value })
                }
                placeholder="example@email.com"
              />
              {formErrors.customerEmail && (
                <div className="invalid-feedback">
                  {formErrors.customerEmail}
                </div>
              )}
              <small className="form-text text-muted">
                예약 확인 이메일이 발송됩니다
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="customerPhone">
                전화번호 <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className={`form-control ${
                  formErrors.customerPhone ? 'is-invalid' : ''
                }`}
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) =>
                  setFormData({ ...formData, customerPhone: e.target.value })
                }
                placeholder="010-1234-5678"
              />
              {formErrors.customerPhone && (
                <div className="invalid-feedback">
                  {formErrors.customerPhone}
                </div>
              )}
              <small className="form-text text-muted">
                예약 안내 SMS가 발송됩니다
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="notes">요청사항 (선택)</label>
              <textarea
                className="form-control"
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="특별한 요청사항이 있다면 입력해주세요"
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setCurrentStep('datetime')}
              >
                <i className="fe fe-arrow-left mr-1" />
                이전
              </button>
              <button type="submit" className="btn btn-primary">
                다음
                <i className="fe fe-arrow-right ml-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div>
      <div className="text-center mb-4">
        <h2 className="mb-2">예약 확인</h2>
        <p className="text-muted">예약 정보를 확인하고 예약을 완료해주세요</p>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-4">예약 상세</h5>

          <div className="confirmation-details">
            <div className="confirmation-item">
              <span className="confirmation-label">서비스</span>
              <span className="confirmation-value">
                {getSelectedService()?.name}
              </span>
            </div>

            <div className="confirmation-item">
              <span className="confirmation-label">날짜</span>
              <span className="confirmation-value">
                {formatDate(bookingData.date || '')}
              </span>
            </div>

            <div className="confirmation-item">
              <span className="confirmation-label">시간</span>
              <span className="confirmation-value">
                {bookingData.timeSlot} ({getSelectedService()?.duration}분)
              </span>
            </div>

            <hr />

            <div className="confirmation-item">
              <span className="confirmation-label">이름</span>
              <span className="confirmation-value">
                {bookingData.customerName}
              </span>
            </div>

            <div className="confirmation-item">
              <span className="confirmation-label">이메일</span>
              <span className="confirmation-value">
                {bookingData.customerEmail}
              </span>
            </div>

            <div className="confirmation-item">
              <span className="confirmation-label">전화번호</span>
              <span className="confirmation-value">
                {bookingData.customerPhone}
              </span>
            </div>

            {bookingData.notes && (
              <div className="confirmation-item">
                <span className="confirmation-label">요청사항</span>
                <span className="confirmation-value">{bookingData.notes}</span>
              </div>
            )}

            <hr />

            <div className="confirmation-item total-price">
              <span className="confirmation-label">총 결제 금액</span>
              <span className="confirmation-value h4 mb-0 text-primary">
                {getTotalPrice().toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="alert alert-info mt-4">
            <i className="fe fe-info mr-2" />
            예약 완료 후 이메일과 SMS로 예약 확인 정보가 발송됩니다.
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setCurrentStep('details')}
        >
          <i className="fe fe-arrow-left mr-1" />
          이전
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={handleConfirmBooking}
        >
          <i className="fe fe-check mr-1" />
          예약 완료
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div>
      <div className="card text-center">
        <div className="card-body py-5">
          <div
            className="success-icon mb-4"
            style={{ fontSize: '4rem', color: '#48bb78' }}
          >
            ✓
          </div>
          <h2 className="mb-3">예약이 완료되었습니다!</h2>
          <p className="text-muted mb-4">
            예약해주셔서 감사합니다. 예약 확인 이메일과 SMS가 발송되었습니다.
          </p>

          <div className="booking-summary bg-light p-4 rounded mb-4">
            <h6 className="mb-3">예약 요약</h6>
            <div className="text-left">
              <p className="mb-1">
                <strong>서비스:</strong> {getSelectedService()?.name}
              </p>
              <p className="mb-1">
                <strong>날짜:</strong> {formatDate(bookingData.date || '')}
              </p>
              <p className="mb-1">
                <strong>시간:</strong> {bookingData.timeSlot}
              </p>
              <p className="mb-0">
                <strong>예약 번호:</strong> {bookingNumber}
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate(`/${tenantSlug}`)}
            >
              <i className="fe fe-home mr-1" />
              홈으로
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/${tenantSlug}/mypage`)}
            >
              <i className="fe fa-user mr-1" />내 예약 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="booking-page">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => navigate(`/${tenantSlug}`)}
          >
            <i className="fe fe-arrow-left mr-2" />
            뒤로가기
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            {/* Progress Steps */}
            {currentStep !== 'success' && (
              <div className="mb-4">
                <div className="progress-steps">
                  <div
                    className={`step ${
                      currentStep === 'service' ||
                      currentStep === 'datetime' ||
                      currentStep === 'details' ||
                      currentStep === 'confirmation'
                        ? 'active'
                        : ''
                    } ${currentStep !== 'service' ? 'completed' : ''}`}
                  >
                    <div className="step-number">1</div>
                    <div className="step-label">서비스</div>
                  </div>
                  <div className="step-line" />
                  <div
                    className={`step ${
                      currentStep === 'datetime' ||
                      currentStep === 'details' ||
                      currentStep === 'confirmation'
                        ? 'active'
                        : ''
                    } ${currentStep !== 'datetime' && currentStep !== 'service' ? 'completed' : ''}`}
                  >
                    <div className="step-number">2</div>
                    <div className="step-label">날짜/시간</div>
                  </div>
                  <div className="step-line" />
                  <div
                    className={`step ${
                      currentStep === 'details' ||
                      currentStep === 'confirmation'
                        ? 'active'
                        : ''
                    } ${currentStep === 'confirmation' ? 'completed' : ''}`}
                  >
                    <div className="step-number">3</div>
                    <div className="step-label">정보입력</div>
                  </div>
                  <div className="step-line" />
                  <div
                    className={`step ${
                      currentStep === 'confirmation' ? 'active' : ''
                    }`}
                  >
                    <div className="step-number">4</div>
                    <div className="step-label">확인</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step Content */}
            <div className="step-content">
              {currentStep === 'service' && renderServiceStep()}
              {currentStep === 'datetime' && renderDateTimeStep()}
              {currentStep === 'details' && renderDetailsStep()}
              {currentStep === 'confirmation' && renderConfirmationStep()}
              {currentStep === 'success' && renderSuccessStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
