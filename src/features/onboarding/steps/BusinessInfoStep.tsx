import { FC, useState } from 'react';

interface BusinessInfoStepProps {
  onNext: (data: { businessInfo: BusinessInfo }) => void;
}

export interface BusinessInfo {
  businessName: string;
  businessType: string;
  businessCategory: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

/**
 * Epic B - Step 1: Business Information (Bootstrap Style)
 * - Business name input field
 * - Business type selection (gym, studio, academy, etc.)
 * - Business description textarea
 * - Business category dropdown
 * - Form validation rules
 * - Form error handling
 */
export const BusinessInfoStep: FC<BusinessInfoStepProps> = ({ onNext }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    businessType: '',
    businessCategory: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BusinessInfo, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof BusinessInfo, boolean>>
  >({});

  const businessTypes = [
    { value: 'gym', label: '헬스장 / 피트니스 센터' },
    { value: 'yoga', label: '요가 스튜디오' },
    { value: 'pilates', label: '필라테스 스튜디오' },
    { value: 'academy', label: '학원 / 교육 기관' },
    { value: 'salon', label: '미용실 / 네일샵' },
    { value: 'cafe', label: '카페 / 레스토랑' },
    { value: 'clinic', label: '병원 / 클리닉' },
    { value: 'other', label: '기타' },
  ];

  const businessCategories = {
    gym: ['PT 전문', '24시간', '여성 전용', '실내 운동', '크로스핏'],
    yoga: ['하타 요가', '라테 요가', '핫 요가', '프레너탈', '샴바 요가'],
    pilates: ['리포머', '매트', '임산부', '재활', '그룹'],
    academy: ['언어', '예체능', '컴퓨터', '취미 생활', '자격증'],
    salon: ['컷/펌', '염색', '네일아트', '속눈썹', '왁싱'],
    cafe: ['커피 전문', '디저트', '주점', '베이커리', '키즈카페'],
    clinic: ['피부과', '성형외과', '한의원', '치과', '물리치료'],
    other: ['기타'],
  };

  // Validation rules
  const validateField = (field: keyof BusinessInfo, value: string): string => {
    switch (field) {
      case 'businessName':
        if (!value.trim()) return '비즈니스 이름을 입력해주세요.';
        if (value.length < 2)
          return '비즈니스 이름은 최소 2자 이상이어야 합니다.';
        if (value.length > 100)
          return '비즈니스 이름은 최대 100자까지 가능합니다.';
        return '';

      case 'businessType':
        if (!value) return '비즈니스 유형을 선택해주세요.';
        return '';

      case 'businessCategory':
        if (!value) return '비즈니스 카테고리를 선택해주세요.';
        return '';

      case 'description':
        if (!value.trim()) return '비즈니스 설명을 입력해주세요.';
        if (value.length < 20) return '설명은 최소 20자 이상이어야 합니다.';
        if (value.length > 500) return '설명은 최대 500자까지 가능합니다.';
        return '';

      case 'address':
        if (!value.trim()) return '주소를 입력해주세요.';
        if (value.length < 10) return '주소를 정확하게 입력해주세요.';
        return '';

      case 'phone': {
        const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
        if (!value) return '전화번호를 입력해주세요.';
        if (!phoneRegex.test(value))
          return '전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)';
        return '';
      }

      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return '이메일을 입력해주세요.';
        if (!emailRegex.test(value)) return '이메일 형식이 올바르지 않습니다.';
        return '';
      }

      case 'website':
        if (value && !value.startsWith('http')) {
          return '웹사이트 주소는 http:// 또는 https://로 시작해야 합니다.';
        }
        return '';

      default:
        return '';
    }
  };

  const handleChange = (field: keyof BusinessInfo, value: string) => {
    setBusinessInfo((prev) => ({ ...prev, [field]: value }));

    // 실시간 유효성 검사 (이미 터치한 필드인 경우)
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof BusinessInfo) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, businessInfo[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 모든 필드 유효성 검사
    const newErrors: Partial<Record<keyof BusinessInfo, string>> = {};
    let hasError = false;

    (Object.keys(businessInfo) as Array<keyof BusinessInfo>).forEach(
      (field) => {
        const error = validateField(field, businessInfo[field]);
        if (error) {
          newErrors[field] = error;
          hasError = true;
        }
      },
    );

    if (hasError) {
      setErrors(newErrors);
      setTouched(
        (Object.keys(businessInfo) as Array<keyof BusinessInfo>).reduce(
          (acc, field) => ({ ...acc, [field]: true }),
          {},
        ),
      );
      return;
    }

    // 유효성 검사 통과
    onNext({ businessInfo });
  };

  const availableCategories =
    businessInfo.businessType &&
    businessCategories[
      businessInfo.businessType as keyof typeof businessCategories
    ]
      ? businessCategories[
          businessInfo.businessType as keyof typeof businessCategories
        ]
      : [];

  return (
    <div>
      <h2 className="text-center mb-2">사업 정보를 입력해주세요</h2>
      <p className="text-center text-muted mb-4">
        고객들이 귀하의 비즈니스를 쉽게 찾을 수 있도록 정보를 입력해주세요.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Business Name */}
        <div className="form-group mb-3">
          <label className="form-label font-weight-bold">
            비즈니스 이름 <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.businessName && touched.businessName ? 'is-invalid' : ''}`}
            placeholder="예: 홍길동 헬스장"
            value={businessInfo.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            onBlur={() => handleBlur('businessName')}
          />
          {errors.businessName && touched.businessName && (
            <div className="invalid-feedback">{errors.businessName}</div>
          )}
          <small className="form-text text-muted">
            고객에게 표시될 비즈니스 이름입니다.
          </small>
        </div>

        {/* Business Type & Category */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label font-weight-bold">
              비즈니스 유형 <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${errors.businessType && touched.businessType ? 'is-invalid' : ''}`}
              value={businessInfo.businessType}
              onChange={(e) => {
                handleChange('businessType', e.target.value);
                // 비즈니스 유형이 변경되면 카테고리 초기화
                setBusinessInfo((prev) => ({ ...prev, businessCategory: '' }));
                setErrors((prev) => ({ ...prev, businessCategory: '' }));
              }}
              onBlur={() => handleBlur('businessType')}
            >
              <option value="">유형 선택</option>
              {businessTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.businessType && touched.businessType && (
              <div className="invalid-feedback">{errors.businessType}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label font-weight-bold">
              세부 카테고리 <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${errors.businessCategory && touched.businessCategory ? 'is-invalid' : ''}`}
              value={businessInfo.businessCategory}
              onChange={(e) => handleChange('businessCategory', e.target.value)}
              onBlur={() => handleBlur('businessCategory')}
              disabled={!businessInfo.businessType}
            >
              <option value="">카테고리 선택</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.businessCategory && touched.businessCategory && (
              <div className="invalid-feedback">{errors.businessCategory}</div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="form-group mb-3">
          <label className="form-label font-weight-bold">
            비즈니스 설명 <span className="text-danger">*</span>
          </label>
          <textarea
            className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
            rows={4}
            placeholder="비즈니스에 대해 자세히 설명해주세요. (최소 20자 이상)"
            value={businessInfo.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            maxLength={500}
          />
          {errors.description && touched.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
          <div className="d-flex justify-content-between">
            <small className="form-text text-muted">
              제공하는 서비스, 특징, 차별점 등을 설명해주세요.
            </small>
            <small className="form-text text-muted">
              {businessInfo.description.length}/500
            </small>
          </div>
        </div>

        {/* Address */}
        <div className="form-group mb-3">
          <label className="form-label font-weight-bold">
            주소 <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}
            placeholder="서울시 강남구 테헤란로 123"
            value={businessInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            onBlur={() => handleBlur('address')}
          />
          {errors.address && touched.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>

        {/* Phone & Email */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label font-weight-bold">
              전화번호 <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
              placeholder="010-1234-5678"
              value={businessInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
            />
            {errors.phone && touched.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label font-weight-bold">
              이메일 <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
              placeholder="business@example.com"
              value={businessInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
            />
            {errors.email && touched.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
        </div>

        {/* Website (Optional) */}
        <div className="form-group mb-4">
          <label className="form-label font-weight-bold">웹사이트 (선택)</label>
          <input
            type="url"
            className={`form-control ${errors.website && touched.website ? 'is-invalid' : ''}`}
            placeholder="https://example.com"
            value={businessInfo.website}
            onChange={(e) => handleChange('website', e.target.value)}
            onBlur={() => handleBlur('website')}
          />
          {errors.website && touched.website && (
            <div className="invalid-feedback">{errors.website}</div>
          )}
          <small className="form-text text-muted">
            SNS 링크나 예약 페이지 URL도 가능합니다.
          </small>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-lg btn-primary px-5">
            다음으로
            <i className="fe fe-arrow-right ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfoStep;
