import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import styled from 'styled-components';

import { BusinessInfoStep } from './steps/BusinessInfoStep';
import { SpaceCreationStep } from './steps/SpaceCreationStep';
import { TemplateSelectionStep } from './steps/TemplateSelectionStep';

/**
 * Epic B: Onboarding Wizard
 * - Step 1: Business Information
 * - Step 2: Template Selection
 * - Step 3: Space Creation
 */
const OnboardingWizard: FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    businessInfo: null,
    selectedTemplate: null,
    spaceInfo: null,
  });

  const totalSteps = 3;

  const handleNext = (stepData: Record<string, unknown>) => {
    setOnboardingData((prev) => ({
      ...prev,
      ...stepData,
    }));

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Onboarding complete - redirect to dashboard
      navigate(ROUTES.BUSINESS.DASHBOARD);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BusinessInfoStep onNext={handleNext} />;
      case 2:
        return (
          <TemplateSelectionStep
            onNext={handleNext}
            onBack={handleBack}
            businessInfo={onboardingData.businessInfo}
          />
        );
      case 3:
        return (
          <SpaceCreationStep
            onNext={handleNext}
            onBack={handleBack}
            selectedTemplate={onboardingData.selectedTemplate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <OnboardingBox>
        <Header>
          <Logo>Ruoom</Logo>
          <Title>비즈니스 설정</Title>
          <Subtitle>몇 가지 정보만 입력하면 바로 시작할 수 있습니다</Subtitle>
        </Header>

        <ProgressBar>
          {[...Array(totalSteps)].map((_, index) => (
            <ProgressStep key={index} $active={index + 1 <= currentStep} />
          ))}
        </ProgressBar>

        <StepIndicator>
          Step {currentStep} of {totalSteps}
        </StepIndicator>

        <StepContent>{renderStep()}</StepContent>
      </OnboardingBox>
    </Container>
  );
};

export default OnboardingWizard;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const OnboardingBox = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #718096;
  font-size: 1rem;
`;

const ProgressBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const ProgressStep = styled.div<{ $active: boolean }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${({ $active }) => ($active ? '#667eea' : '#e2e8f0')};
  transition: all 0.3s;
`;

const StepIndicator = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: #a0aec0;
  margin-bottom: 2rem;
`;

const StepContent = styled.div`
  min-height: 400px;
`;
