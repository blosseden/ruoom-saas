import { FC, useState } from 'react';

interface TemplateSelectionStepProps {
  onNext: (data: { selectedTemplate: string }) => void;
  onBack: () => void;
  businessInfo?: {
    businessInfo?: { businessType?: string; businessName?: string };
  };
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string[];
  features: string[];
  previewImage: string;
  color: string;
  recommended?: boolean;
}

/**
 * Epic B - Step 2: Template Selection (Bootstrap Style)
 * - Template card grid layout
 * - Template preview images
 * - Template selection radio buttons
 * - Template details modal
 * - Template comparison feature
 */
export const TemplateSelectionStep: FC<TemplateSelectionStepProps> = ({
  onNext,
  onBack,
  businessInfo,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplateForModal, setSelectedTemplateForModal] =
    useState<Template | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonTemplates, setComparisonTemplates] = useState<string[]>([]);

  const templates: Template[] = [
    {
      id: 'modern-fitness',
      name: '모던 피트니스',
      description: '깔끔하고 현대적인 디자인의 피트니스 웹사이트 템플릿',
      category: ['gym', 'fitness'],
      features: [
        '클래스 예약 시스템',
        '트레이너 소개',
        '회원권 가격표',
        '갤러리',
      ],
      previewImage: '🏋️‍♂️',
      color: '#667eea',
      recommended: true,
    },
    {
      id: 'zen-yoga',
      name: '젠 요가',
      description: '평화롭고 차분한 분위기의 요가/필라테스 템플릿',
      category: ['yoga', 'pilates'],
      features: ['수업 스케줄', '강사 프로필', '수업료 안내', '명상/요가 정보'],
      previewImage: '🧘‍♀️',
      color: '#48bb78',
    },
    {
      id: 'beauty-salon',
      name: '뷰티 살롱',
      description: '세련된 미용실/네일샵을 위한 우아한 템플릿',
      category: ['salon', 'beauty'],
      features: [
        '예약 시스템',
        '스타일리스트 소개',
        '메뉴/가격',
        '시술 전후 사진',
      ],
      previewImage: '💇‍♀️',
      color: '#ed64a6',
    },
    {
      id: 'medical-clinic',
      name: '메디컬 클리닉',
      description: '신뢰감을 주는 병원/클리닉 전문 템플릿',
      category: ['clinic', 'medical'],
      features: ['진료 예약', '의료진 소개', '진료과 안내', '오시는 길'],
      previewImage: '🏥',
      color: '#4299e1',
    },
    {
      id: 'cozy-cafe',
      name: '코지 카페',
      description: '따뜻하고 아늑한 카페/레스토랑 템플릿',
      category: ['cafe', 'restaurant'],
      features: ['메뉴판', '매장 소개', '이벤트 공지', 'Contact'],
      previewImage: '☕',
      color: '#ed8936',
    },
    {
      id: 'professional-academy',
      name: '프로 아카데미',
      description: '전문성을 강조한 학원/교육 기관 템플릿',
      category: ['academy', 'education'],
      features: ['강좌 프로그램', '강사진 소개', '수강 신청', '커리큘럼'],
      previewImage: '📚',
      color: '#9f7aea',
    },
  ];

  // 비즈니스 유형에 따른 추천 템플릿 필터링
  const recommendedTemplates = businessInfo?.businessInfo?.businessType
    ? templates.filter((t) =>
        t.category.includes(businessInfo.businessInfo!.businessType!),
      )
    : [];

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleViewDetails = (template: Template) => {
    setSelectedTemplateForModal(template);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTemplateForModal(null);
  };

  const handleToggleCompare = (templateId: string) => {
    if (comparisonTemplates.includes(templateId)) {
      setComparisonTemplates(
        comparisonTemplates.filter((id) => id !== templateId),
      );
    } else if (comparisonTemplates.length < 3) {
      setComparisonTemplates([...comparisonTemplates, templateId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTemplate) {
      onNext({ selectedTemplate });
    }
  };

  return (
    <div>
      <h2 className="text-center mb-2">웹사이트 템플릿을 선택하세요</h2>
      <p className="text-center text-muted mb-4">
        {businessInfo?.businessInfo?.businessName}에 가장 적합한 템플릿을
        선택하세요. 나중에 변경할 수 있습니다.
      </p>

      {recommendedTemplates.length > 0 && (
        <div className="alert alert-info mb-4" role="alert">
          <h6 className="alert-heading mb-2">
            <i className="fe fe-star mr-1" />
            추천 템플릿
          </h6>
          <p className="mb-0 small">
            비즈니스 유형에 맞는 추천 템플릿 {recommendedTemplates.length}개를
            찾았습니다!
          </p>
        </div>
      )}

      {/* Comparison Bar */}
      {comparisonTemplates.length > 0 && (
        <div className="card mb-4 border-primary">
          <div className="card-body py-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>비교 ({comparisonTemplates.length}/3)</strong>
                <small className="text-muted ml-2">
                  최대 3개까지 비교 가능
                </small>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-primary mr-2"
                  onClick={() => {
                    setShowComparison(true);
                  }}
                >
                  <i className="fe fe-list mr-1" />
                  비교하기
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setComparisonTemplates([])}
                >
                  <i className="fe fe-x mr-1" />
                  초기화
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Recommended Templates */}
        {recommendedTemplates.length > 0 && (
          <div className="mb-5">
            <h5 className="mb-3">
              <i className="fe fe-star text-warning mr-1" />
              추천 템플릿
            </h5>
            <div className="row">
              {recommendedTemplates.map((template) => (
                <div
                  key={template.id}
                  className="col-12 col-md-6 col-lg-4 mb-4"
                >
                  <TemplateCard
                    template={template}
                    selected={selectedTemplate === template.id}
                    onSelect={() => handleSelectTemplate(template.id)}
                    onViewDetails={() => handleViewDetails(template)}
                    onCompare={() => handleToggleCompare(template.id)}
                    isComparing={comparisonTemplates.includes(template.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Templates */}
        <div className="mb-4">
          <h5 className="mb-3">
            <i className="fe fe-grid mr-1" />
            모든 템플릿
          </h5>
          <div className="row">
            {templates.map((template) => (
              <div key={template.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <TemplateCard
                  template={template}
                  selected={selectedTemplate === template.id}
                  onSelect={() => handleSelectTemplate(template.id)}
                  onViewDetails={() => handleViewDetails(template)}
                  onCompare={() => handleToggleCompare(template.id)}
                  isComparing={comparisonTemplates.includes(template.id)}
                  recommended={
                    template.recommended &&
                    !recommendedTemplates.includes(template)
                  }
                />
              </div>
            ))}
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
          <button
            type="submit"
            className="btn btn-lg btn-primary px-5"
            disabled={!selectedTemplate}
          >
            다음으로
            <i className="fe fe-arrow-right ml-2" />
          </button>
        </div>
      </form>

      {/* Template Details Modal */}
      {showModal && selectedTemplateForModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fe fe-eye mr-2" />
                  {selectedTemplateForModal.name} 상세 정보
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                  style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '1.5rem',
                  }}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                {/* Preview */}
                <div className="text-center mb-4">
                  <div
                    className="d-inline-block p-5 rounded"
                    style={{
                      background: selectedTemplateForModal.color + '20',
                      fontSize: '6rem',
                    }}
                  >
                    {selectedTemplateForModal.previewImage}
                  </div>
                  <h4 className="mt-3">{selectedTemplateForModal.name}</h4>
                  <p className="text-muted">
                    {selectedTemplateForModal.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h6 className="font-weight-bold mb-3">
                    <i className="fe fe-check-circle mr-1" />
                    주요 기능
                  </h6>
                  <ul className="list-group list-group-flush">
                    {selectedTemplateForModal.features.map((feature, index) => (
                      <li key={index} className="list-group-item">
                        <i className="fe fe-check text-success mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Color Scheme */}
                <div className="mb-4">
                  <h6 className="font-weight-bold mb-3">
                    <i className="fe fe-droplet mr-1" />
                    컬러 테마
                  </h6>
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle mr-2"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: selectedTemplateForModal.color,
                      }}
                    />
                    <code>{selectedTemplateForModal.color}</code>
                  </div>
                </div>

                {/* Category Tags */}
                <div>
                  <h6 className="font-weight-bold mb-3">
                    <i className="fe fe-tag mr-1" />
                    적합 업종
                  </h6>
                  <div>
                    {selectedTemplateForModal.category.map((cat) => (
                      <span
                        key={cat}
                        className="badge badge-secondary mr-2 mb-2"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCloseModal}
                >
                  닫기
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleSelectTemplate(selectedTemplateForModal!.id);
                    handleCloseModal();
                  }}
                >
                  <i className="fe fe-check mr-1" />이 템플릿 선택
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparison && comparisonTemplates.length > 0 && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fe fe-list mr-2" />
                  템플릿 비교
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowComparison(false)}
                  style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '1.5rem',
                  }}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: '150px' }}>특징</th>
                        {comparisonTemplates.map((id) => {
                          const template = templates.find((t) => t.id === id);
                          return (
                            <th key={id} className="text-center">
                              <div
                                className="mb-2"
                                style={{ fontSize: '3rem' }}
                              >
                                {template?.previewImage}
                              </div>
                              {template?.name}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-weight-bold">설명</td>
                        {comparisonTemplates.map((id) => {
                          const template = templates.find((t) => t.id === id);
                          return <td key={id}>{template?.description}</td>;
                        })}
                      </tr>
                      <tr>
                        <td className="font-weight-bold">컬러</td>
                        {comparisonTemplates.map((id) => {
                          const template = templates.find((t) => t.id === id);
                          return (
                            <td key={id} className="text-center">
                              <div
                                className="rounded-circle mx-auto d-inline-block"
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  background: template?.color,
                                }}
                              />
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="font-weight-bold">기능</td>
                        {comparisonTemplates.map((id) => {
                          const template = templates.find((t) => t.id === id);
                          return (
                            <td key={id}>
                              <ul className="list-unstyled mb-0">
                                {template?.features.map((feature, idx) => (
                                  <li key={idx}>
                                    <small>✓ {feature}</small>
                                  </li>
                                ))}
                              </ul>
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="font-weight-bold">적합 업종</td>
                        {comparisonTemplates.map((id) => {
                          const template = templates.find((t) => t.id === id);
                          return (
                            <td key={id}>
                              {template?.category.map((cat) => (
                                <span
                                  key={cat}
                                  className="badge badge-secondary mr-1 mb-1"
                                >
                                  {cat}
                                </span>
                              ))}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowComparison(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Template Card Component
interface TemplateCardProps {
  template: Template;
  selected: boolean;
  onSelect: () => void;
  onViewDetails: () => void;
  onCompare: () => void;
  isComparing: boolean;
  recommended?: boolean;
}

const TemplateCard: FC<TemplateCardProps> = ({
  template,
  selected,
  onSelect,
  onViewDetails,
  onCompare,
  isComparing,
  recommended = false,
}) => {
  return (
    <div
      className={`card h-100 ${selected ? 'border-primary' : ''}`}
      style={{
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderColor: selected ? template.color : '',
      }}
    >
      {/* Hidden Radio Input */}
      <input
        type="radio"
        name="template"
        value={template.id}
        checked={selected}
        onChange={onSelect}
        style={{ position: 'absolute', opacity: 0 }}
      />

      {/* Recommended Badge */}
      {recommended && (
        <div
          className="position-absolute top-0 right-0 m-2"
          style={{ zIndex: 1 }}
        >
          <span className="badge badge-warning">
            <i className="fe fe-star mr-1" />
            추천
          </span>
        </div>
      )}

      {/* Selected Badge */}
      {selected && (
        <div
          className="position-absolute top-0 left-0 m-2"
          style={{ zIndex: 1 }}
        >
          <span className="badge badge-primary">
            <i className="fe fe-check mr-1" />
            선택됨
          </span>
        </div>
      )}

      <div className="card-body d-flex flex-column" onClick={onSelect}>
        {/* Preview Image */}
        <div
          className="text-center mb-3 p-4 rounded"
          style={{
            background: template.color + '15',
            fontSize: '4rem',
          }}
        >
          {template.previewImage}
        </div>

        {/* Template Info */}
        <h5 className="card-title text-center">{template.name}</h5>
        <p className="card-text text-muted small text-center">
          {template.description}
        </p>

        {/* Features Preview */}
        <ul className="list-unstyled small text-muted mb-3">
          {template.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="mb-1">
              <i className="fe fe-check text-success mr-1" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Color Dot */}
        <div className="mt-auto">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle mr-2"
                style={{
                  width: '20px',
                  height: '20px',
                  background: template.color,
                }}
              />
              <small className="text-muted">Color Theme</small>
            </div>
            {isComparing && (
              <span className="badge badge-info">
                <i className="fe fe-list mr-1" />
                비교중
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary flex-grow-1"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
              }}
            >
              <i className="fe fe-eye mr-1" />
              상세
            </button>
            <button
              type="button"
              className={`btn btn-sm ${isComparing ? 'btn-info' : 'btn-outline-secondary'}`}
              onClick={(e) => {
                e.stopPropagation();
                onCompare();
              }}
            >
              <i className="fe fe-list mr-1" />
              비교
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionStep;
