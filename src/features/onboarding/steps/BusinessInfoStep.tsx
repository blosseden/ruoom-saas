import { FC, useState } from 'react';

import styled from 'styled-components';

interface BusinessInfoStepProps {
  onNext: (data: { businessInfo: BusinessInfo }) => void;
}

interface BusinessInfo {
  businessName: string;
  category: string;
  address: string;
  phone: string;
  email: string;
}

/**
 * Epic B - Step 1: Business Information
 */
export const BusinessInfoStep: FC<BusinessInfoStepProps> = ({ onNext }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    category: '',
    address: '',
    phone: '',
    email: '',
  });

  const categories = [
    '헬스/피트니스',
    '요가/필라테스',
    '미용실',
    '네일샵',
    '카페/레스토랑',
    '병원/클리닉',
    '학원/교육',
    '기타',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ businessInfo });
  };

  const handleChange = (field: keyof BusinessInfo, value: string) => {
    setBusinessInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Container>
      <StepTitle>사업 정보를 입력해주세요</StepTitle>
      <StepDescription>
        고객들이 귀하의 비즈니스를 쉽게 찾을 수 있도록 정보를 입력해주세요.
      </StepDescription>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>사업자명 *</Label>
          <Input
            type="text"
            placeholder="예: 홍길동 헬스장"
            value={businessInfo.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>업종 *</Label>
          <Select
            value={businessInfo.category}
            onChange={(e) => handleChange('category', e.target.value)}
            required
          >
            <option value="">선택해주세요</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>주소 *</Label>
          <Input
            type="text"
            placeholder="서울시 강남구 테헤란로 123"
            value={businessInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label>전화번호 *</Label>
            <Input
              type="tel"
              placeholder="02-1234-5678"
              value={businessInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>이메일 *</Label>
            <Input
              type="email"
              placeholder="business@example.com"
              value={businessInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </FormGroup>
        </FormRow>

        <ButtonGroup>
          <Button type="submit">다음</Button>
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

const Select = styled.select`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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
