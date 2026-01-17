import { FC, useState } from 'react';

import styled from 'styled-components';

interface SpaceCreationStepProps {
  onNext: (data: { spaceInfo: SpaceInfo }) => void;
  onBack: () => void;
  selectedTemplate: unknown;
}

interface SpaceInfo {
  spaceName: string;
  description: string;
}

/**
 * Epic B - Step 3: Space Creation
 */
export const SpaceCreationStep: FC<SpaceCreationStepProps> = ({
  onNext,
  onBack,
}) => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>({
    spaceName: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ spaceInfo });
  };

  const handleChange = (field: keyof SpaceInfo, value: string) => {
    setSpaceInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Container>
      <StepTitle>스페이스를 생성하세요</StepTitle>
      <StepDescription>
        고객이 예약할 수 있는 스페이스를 설정하세요. 예: 메인 홀, VIP룸 등
      </StepDescription>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>스페이스 이름 *</Label>
          <Input
            type="text"
            placeholder="예: 메인 홀"
            value={spaceInfo.spaceName}
            onChange={(e) => handleChange('spaceName', e.target.value)}
            required
          />
          <Hint>고객이 예약 시 선택할 공간의 이름입니다</Hint>
        </FormGroup>

        <FormGroup>
          <Label>설명 (선택)</Label>
          <Textarea
            placeholder="스페이스에 대한 간단한 설명을 입력하세요"
            value={spaceInfo.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
          />
        </FormGroup>

        <InfoBox>
          <InfoIcon>💡</InfoIcon>
          <InfoText>
            <strong>팁:</strong> 나중에 대시보드에서 추가 스페이스를 생성하고
            관리할 수 있습니다.
          </InfoText>
        </InfoBox>

        <ButtonGroup>
          <SecondaryButton type="button" onClick={onBack}>
            이전
          </SecondaryButton>
          <Button type="submit">완료</Button>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #2d3748;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Hint = styled.p`
  font-size: 0.75rem;
  color: #a0aec0;
  margin: 0;
`;

const InfoBox = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #ebf4ff;
  border: 1px solid #bee3f8;
  border-radius: 8px;
  margin-top: 1rem;
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
`;

const InfoText = styled.p`
  font-size: 0.875rem;
  color: #2c5282;
  margin: 0;

  strong {
    font-weight: 600;
  }
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

  &:hover {
    background: #5568d3;
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
