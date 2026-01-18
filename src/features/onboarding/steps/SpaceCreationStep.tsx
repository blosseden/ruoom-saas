import { FC, useState } from 'react';

interface SpaceCreationStepProps {
  onNext: (data: { spaceInfo: SpaceInfo }) => void;
  onBack: () => void;
  selectedTemplate: unknown;
  businessInfo?: {
    businessInfo?: { businessType?: string };
  };
}

export interface SpaceInfo {
  spaceName: string;
  spaceType: string;
  capacity: string;
  description: string;
  amenities: string[];
  image?: string;
}

/**
 * Epic B - Step 3: Space Creation (Bootstrap Style)
 * - Space name input field
 * - Space type selection
 * - Space capacity input
 * - Space amenities checklist
 * - Space image upload (mock)
 * - Space description textarea
 * - Form validation rules
 */
export const SpaceCreationStep: FC<SpaceCreationStepProps> = ({
  onNext,
  onBack,
  businessInfo,
}) => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>({
    spaceName: '',
    spaceType: '',
    capacity: '',
    description: '',
    amenities: [],
    image: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SpaceInfo, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof SpaceInfo, boolean>>
  >({});

  const businessType = businessInfo?.businessInfo?.businessType || 'other';

  // Space types based on business type
  const spaceTypeOptions: Record<string, { value: string; label: string }[]> = {
    gym: [
      { value: 'main_floor', label: '메인 운동장' },
      { value: 'pt_room', label: 'PT 룸' },
      { value: 'studio', label: '스튜디오' },
      { value: 'locker_room', label: '라커룸' },
      { value: 'other', label: '기타' },
    ],
    yoga: [
      { value: 'main_studio', label: '메인 스튜디오' },
      { value: 'private_room', label: '프라이빗 룸' },
      { value: 'meditation_room', label: '명상실' },
      { value: 'other', label: '기타' },
    ],
    pilates: [
      { value: 'reformer_room', label: '리포머 룸' },
      { value: 'mat_room', label: '매트 룸' },
      { value: 'private_studio', label: '개인 스튜디오' },
      { value: 'other', label: '기타' },
    ],
    academy: [
      { value: 'classroom', label: '교실' },
      { value: 'lab', label: '실습실' },
      { value: 'study_room', label: '스터디룸' },
      { value: 'lecture_hall', label: '강당' },
      { value: 'other', label: '기타' },
    ],
    salon: [
      { value: 'cutting_station', label: '컷팅 스테이션' },
      { value: 'styling_area', label: '스타일링 구역' },
      { value: 'manicure_station', label: '네일 스테이션' },
      { value: 'private_room', label: '프라이빗 룸' },
      { value: 'other', label: '기타' },
    ],
    cafe: [
      { value: 'main_hall', label: '메인 홀' },
      { value: 'private_room', label: '프라이빗 룸' },
      { value: 'outdoor_seating', label: '야외 좌석' },
      { value: 'other', label: '기타' },
    ],
    clinic: [
      { value: 'treatment_room', label: '진료실' },
      { value: 'consultation_room', label: '상담실' },
      { value: 'waiting_area', label: '대기실' },
      { value: 'procedure_room', label: '시술실' },
      { value: 'other', label: '기타' },
    ],
    other: [
      { value: 'general', label: '일반 공간' },
      { value: 'private', label: '프라이빗 룸' },
      { value: 'other', label: '기타' },
    ],
  };

  // Amenities based on business type
  const amenitiesOptions: Record<
    string,
    { value: string; label: string; icon: string }[]
  > = {
    gym: [
      { value: 'wifi', label: 'WiFi', icon: '📶' },
      { value: 'ac', label: '에어컨/난방', icon: '❄️' },
      { value: 'audio', label: '오디오 시스템', icon: '🔊' },
      { value: 'mirror', label: '거울', icon: '🪞' },
      { value: 'shower', label: '샤워실', icon: '🚿' },
      { value: 'locker', label: '라커', icon: '🔒' },
      { value: 'parking', label: '주차장', icon: '🅿️' },
      { value: 'tv', label: 'TV/디스플레이', icon: '📺' },
    ],
    yoga: [
      { value: 'wifi', label: 'WiFi', icon: '📶' },
      { value: 'ac', label: '에어컨/난방', icon: '❄️' },
      { value: 'audio', label: '오디오 시스템', icon: '🔊' },
      { value: 'mirror', label: '거울', icon: '🪞' },
      { value: 'mats', label: '매트/요가 재료', icon: '🧘' },
      { value: 'shower', label: '샤워실', icon: '🚿' },
      { value: 'locker', label: '라커', icon: '🔒' },
      { value: 'parking', label: '주차장', icon: '🅿️' },
    ],
    pilates: [
      { value: 'wifi', label: 'WiFi', icon: '📶' },
      { value: 'ac', label: '에어컨/난방', icon: '❄️' },
      { value: 'audio', label: '오디오 시스템', icon: '🔊' },
      { value: 'mirror', label: '거울', icon: '🪞' },
      { value: 'equipment', label: '리포머/기구', icon: '💪' },
      { value: 'shower', label: '샤워실', icon: '🚿' },
      { value: 'locker', label: '라커', icon: '🔒' },
    ],
    academy: [
      { value: 'wifi', label: 'WiFi', icon: '📶' },
      { value: 'ac', label: '에어컨/난방', icon: '❄️' },
      { value: 'projector', label: '프로젝터', icon: '📽️' },
      { value: 'whiteboard', label: '화이트보드', icon: '📝' },
      { value: 'audio', label: '오디오 시스템', icon: '🔊' },
      { value: 'computers', label: '컴퓨터', icon: '💻' },
      { value: 'parking', label: '주차장', icon: '🅿️' },
    ],
    salon: [
      { value: 'wifi', label: 'WiFi', icon: '📶' },
      { value: 'ac', label: '에어컨/난방', icon: '❄️' },
      { value: 'audio', label: '오디오 시스템', icon: '🔊' },
      { value: 'mirror', label: '거울', icon: '🪞' },
      { value: 'lighting', label: '조명 장비', icon: '💡' },
      { value: 'parking', label: '주차장', icon: '🅿️' },
    ],
    cafe: [
      { value: 'wifi', label: 'WiFi', icon: '📶' },
      { value: 'ac', label: '에어컨/난방', icon: '❄️' },
      { value: 'audio', label: '오디오 시스템', icon: '🔊' },
      { value: 'power_outlets', label: '전원 콘센트', icon: '🔌' },
      { value: 'outdoor_seating', label: '야외 좌석', icon: '🌳' },
      { value: 'parking', label: '주차장', icon: '🅿️' },
    ],
    clinic: [
      { value: 'wifi', label: 'WiFi', icon: '📶' },
      { value: 'ac', label: '에어컨/난방', icon: '❄️' },
      { value: 'audio', label: '오디오 시스템', icon: '🔊' },
      { value: 'examination_bed', label: '진료대', icon: '🛋️' },
      { value: 'sterilizer', label: '소독 장비', icon: '🩺' },
      { value: 'parking', label: '주차장', icon: '🅿️' },
    ],
    other: [
      { value: 'wifi', label: 'WiFi', icon: '📶' },
      { value: 'ac', label: '에어컨/난방', icon: '❄️' },
      { value: 'audio', label: '오디오 시스템', icon: '🔊' },
      { value: 'parking', label: '주차장', icon: '🅿️' },
    ],
  };

  // Validation rules
  const validateField = (
    field: keyof SpaceInfo,
    value: string | string[],
  ): string => {
    switch (field) {
      case 'spaceName':
        if (typeof value !== 'string') return '';
        if (!value.trim()) return '스페이스 이름을 입력해주세요.';
        if (value.length < 2)
          return '스페이스 이름은 최소 2자 이상이어야 합니다.';
        if (value.length > 50)
          return '스페이스 이름은 최대 50자까지 가능합니다.';
        return '';

      case 'spaceType':
        if (typeof value !== 'string') return '';
        if (!value) return '스페이스 유형을 선택해주세요.';
        return '';

      case 'capacity': {
        if (typeof value !== 'string') return '';
        if (!value) return '수용 인원을 입력해주세요.';
        const capacityNum = parseInt(value);
        if (isNaN(capacityNum) || capacityNum < 1) {
          return '수용 인원은 1 이상이어야 합니다.';
        }
        if (capacityNum > 1000) {
          return '수용 인원은 최대 1000명까지 가능합니다.';
        }
        return '';
      }

      case 'description':
        if (typeof value !== 'string') return '';
        if (value.length > 500) return '설명은 최대 500자까지 가능합니다.';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (field: keyof SpaceInfo, value: string | string[]) => {
    setSpaceInfo((prev) => ({ ...prev, [field]: value }));

    // Real-time validation for touched fields
    if (touched[field] && typeof value === 'string') {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof SpaceInfo) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = spaceInfo[field] ?? '';
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = spaceInfo.amenities.includes(amenity)
      ? spaceInfo.amenities.filter((a) => a !== amenity)
      : [...spaceInfo.amenities, amenity];
    handleChange('amenities', newAmenities);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock image upload - just store the filename
      const mockImageUrl = URL.createObjectURL(file);
      handleChange('image', mockImageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Partial<Record<keyof SpaceInfo, string>> = {};
    let hasError = false;

    (
      ['spaceName', 'spaceType', 'capacity', 'description'] as Array<
        keyof SpaceInfo
      >
    ).forEach((field) => {
      const value = spaceInfo[field] ?? '';
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      setTouched(
        (
          ['spaceName', 'spaceType', 'capacity', 'description'] as Array<
            keyof SpaceInfo
          >
        ).reduce((acc, field) => ({ ...acc, [field]: true }), {}),
      );
      return;
    }

    // Validation passed
    onNext({ spaceInfo });
  };

  const availableSpaceTypes =
    spaceTypeOptions[businessType] || spaceTypeOptions.other;
  const availableAmenities =
    amenitiesOptions[businessType] || amenitiesOptions.other;

  return (
    <div>
      <h2 className="text-center mb-2">스페이스를 생성하세요</h2>
      <p className="text-center text-muted mb-4">
        고객이 예약할 수 있는 첫 번째 스페이스를 설정하세요. 예: 메인 홀, VIP룸
        등
      </p>

      <div className="alert alert-info" role="alert">
        <h6 className="alert-heading mb-2">
          <i className="fe fe-info mr-1" />첫 번째 스페이스
        </h6>
        <p className="mb-0 small">
          지금은 첫 번째 스페이스만 생성합니다. 나중에 대시보드에서 추가
          스페이스를 생성하고 관리할 수 있습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Space Name */}
        <div className="form-group mb-3">
          <label className="form-label font-weight-bold">
            스페이스 이름 <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.spaceName && touched.spaceName ? 'is-invalid' : ''}`}
            placeholder="예: 메인 스튜디오"
            value={spaceInfo.spaceName}
            onChange={(e) => handleChange('spaceName', e.target.value)}
            onBlur={() => handleBlur('spaceName')}
          />
          {errors.spaceName && touched.spaceName && (
            <div className="invalid-feedback">{errors.spaceName}</div>
          )}
          <small className="form-text text-muted">
            고객이 예약 시 선택할 공간의 이름입니다 (2-50자)
          </small>
        </div>

        {/* Space Type & Capacity */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label font-weight-bold">
              스페이스 유형 <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${errors.spaceType && touched.spaceType ? 'is-invalid' : ''}`}
              value={spaceInfo.spaceType}
              onChange={(e) => handleChange('spaceType', e.target.value)}
              onBlur={() => handleBlur('spaceType')}
            >
              <option value="">유형 선택</option>
              {availableSpaceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.spaceType && touched.spaceType && (
              <div className="invalid-feedback">{errors.spaceType}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label font-weight-bold">
              수용 인원 <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className={`form-control ${errors.capacity && touched.capacity ? 'is-invalid' : ''}`}
              placeholder="예: 20"
              value={spaceInfo.capacity}
              onChange={(e) => handleChange('capacity', e.target.value)}
              onBlur={() => handleBlur('capacity')}
              min="1"
              max="1000"
            />
            {errors.capacity && touched.capacity && (
              <div className="invalid-feedback">{errors.capacity}</div>
            )}
            <small className="form-text text-muted">
              최대 수용 가능한 인원수
            </small>
          </div>
        </div>

        {/* Amenities */}
        <div className="form-group mb-3">
          <label className="form-label font-weight-bold">
            편의시설 <span className="text-muted">(선택)</span>
          </label>
          <div className="card">
            <div className="card-body">
              <div className="row">
                {availableAmenities.map((amenity) => (
                  <div
                    key={amenity.value}
                    className="col-6 col-md-4 col-lg-3 mb-3"
                  >
                    <div
                      className={`card h-100 ${
                        spaceInfo.amenities.includes(amenity.value)
                          ? 'border-primary bg-light'
                          : ''
                      }`}
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onClick={() => handleAmenityToggle(amenity.value)}
                    >
                      <div className="card-body text-center p-2">
                        <div style={{ fontSize: '1.5rem' }}>{amenity.icon}</div>
                        <small className="d-block mt-1">{amenity.label}</small>
                        {spaceInfo.amenities.includes(amenity.value) && (
                          <div className="mt-1">
                            <i className="fe fe-check text-success" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <small className="form-text text-muted">
            해당 스페이스에서 제공하는 편의시설을 선택해주세요.
          </small>
        </div>

        {/* Image Upload (Mock) */}
        <div className="form-group mb-3">
          <label className="form-label font-weight-bold">
            스페이스 이미지 <span className="text-muted">(선택)</span>
          </label>
          <div className="card">
            <div className="card-body">
              {spaceInfo.image ? (
                <div className="text-center">
                  <img
                    src={spaceInfo.image}
                    alt="Space preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                    className="mb-3"
                  />
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleChange('image', '')}
                    >
                      <i className="fe fe-trash mr-1" />
                      이미지 삭제
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    className="form-control-file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="spaceImageUpload"
                  />
                  <label
                    htmlFor="spaceImageUpload"
                    className="btn btn-outline-primary btn-block mt-2"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fe fe-upload mr-1" />
                    이미지 업로드
                  </label>
                  <small className="form-text text-muted d-block mt-2">
                    JPG, PNG 형식 (최대 5MB)
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-group mb-4">
          <label className="form-label font-weight-bold">
            설명 <span className="text-muted">(선택)</span>
          </label>
          <textarea
            className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
            rows={4}
            placeholder="스페이스에 대한 간단한 설명을 입력하세요..."
            value={spaceInfo.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            maxLength={500}
          />
          {errors.description && touched.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
          <div className="d-flex justify-content-between">
            <small className="form-text text-muted">
              특징, 규모, 보유 장비 등을 설명해주세요.
            </small>
            <small className="form-text text-muted">
              {spaceInfo.description.length}/500
            </small>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onBack}
          >
            <i className="fe fe-arrow-left mr-1" />
            이전
          </button>
          <button type="submit" className="btn btn-lg btn-primary px-5">
            <i className="fe fe-check mr-1" />
            완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpaceCreationStep;
