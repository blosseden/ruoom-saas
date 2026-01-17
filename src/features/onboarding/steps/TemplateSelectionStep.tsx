import { FC, useState } from 'react';

import styled from 'styled-components';

interface TemplateSelectionStepProps {
  onNext: (data: { selectedTemplate: string }) => void;
  onBack: () => void;
  businessInfo: unknown;
}

/**
 * Epic B - Step 2: Template Selection
 */
export const TemplateSelectionStep: FC<TemplateSelectionStepProps> = ({
  onNext,
  onBack,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    {
      id: 'fitness',
      name: '헬스/피트니스',
      description: '체육관, 헬스장, 크로스핏을 위한 템플릿',
      image: '🏋️',
    },
    {
      id: 'yoga',
      name: '요가/필라테스',
      description: '요가, 필라테스 스튜디오를 위한 템플릿',
      image: '🧘',
    },
    {
      id: 'salon',
      name: '미용실',
      description: '헤어살롱, 미용실을 위한 템플릿',
      image: '💇',
    },
    {
      id: 'clinic',
      name: '병원/클리닉',
      description: '의료기관, 클리닉을 위한 템플릿',
      image: '🏥',
    },
    {
      id: 'cafe',
      name: '카페/레스토랑',
      description: '카페, 레스토랑을 위한 템플릿',
      image: '☕',
    },
    {
      id: 'general',
      name: '일반',
      description: '모든 비즈니스에 적합한 기본 템플릿',
      image: '📋',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTemplate) {
      onNext({ selectedTemplate });
    }
  };

  return (
    <Container>
      <StepTitle>웹사이트 템플릿을 선택하세요</StepTitle>
      <StepDescription>
        귀하의 비즈니스에 가장 적합한 템플릿을 선택하세요. 나중에 변경할 수
        있습니다.
      </StepDescription>

      <Form onSubmit={handleSubmit}>
        <TemplateGrid>
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              type="button"
              $selected={selectedTemplate === template.id}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <TemplateImage>{template.image}</TemplateImage>
              <TemplateName>{template.name}</TemplateName>
              <TemplateDescription>{template.description}</TemplateDescription>
            </TemplateCard>
          ))}
        </TemplateGrid>

        <ButtonGroup>
          <SecondaryButton type="button" onClick={onBack}>
            이전
          </SecondaryButton>
          <Button type="submit" disabled={!selectedTemplate}>
            다음
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

// Styled Components
const Container = styled.div``;

const StepTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #718096;
  margin-bottom: 2rem;
`;

const Form = styled.form``;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TemplateCard = styled.button<{ $selected: boolean }>`
  padding: 1.5rem;
  border: 2px solid ${({ $selected }) => ($selected ? '#667eea' : '#e2e8f0')};
  border-radius: 12px;
  background: ${({ $selected }) => ($selected ? '#f7fafc' : 'white')};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;

  &:hover {
    border-color: #667eea;
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }
`;

const TemplateImage = styled.div`
  font-size: 3rem;
`;

const TemplateName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
`;

const TemplateDescription = styled.div`
  font-size: 0.75rem;
  color: #718096;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #5568d3;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 0.75rem 2rem;
  background: white;
  color: #667eea;
  border: 1px solid #667eea;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7fafc;
  }
`;
