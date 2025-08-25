import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { SimpleThemeToggle } from "@/components/theme-toggle";

interface ContractorScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onBack: () => void;
}

// Animations
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  50% {
    opacity: 0.5;
  }
`;

// Styled components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, hsl(210 40% 98%), hsl(217 91% 95%), hsl(221 83% 92%));
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .dark & {
    background: linear-gradient(135deg, hsl(222 84% 5%), hsl(217 91% 10%), hsl(221 83% 12%));
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  inset: 0;
`;

const FloatingElement1 = styled.div`
  position: absolute;
  top: 5rem;
  left: 4rem;
  width: 8rem;
  height: 8rem;
  background: linear-gradient(135deg, hsl(25 95% 53% / 0.15), hsl(45 93% 47% / 0.15));
  border-radius: 50%;
  filter: blur(32px);
  animation: ${float} 3s ease-in-out infinite;
`;

const FloatingElement2 = styled.div`
  position: absolute;
  top: 10rem;
  right: 4rem;
  width: 6rem;
  height: 6rem;
  background: linear-gradient(135deg, hsl(45 93% 47% / 0.2), hsl(25 95% 53% / 0.2));
  border-radius: 50%;
  filter: blur(24px);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: 1s;
`;

const FloatingElement3 = styled.div`
  position: absolute;
  bottom: 8rem;
  left: 6rem;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, hsl(60 100% 50% / 0.15), hsl(25 95% 53% / 0.15));
  border-radius: 50%;
  filter: blur(16px);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: 2s;
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  color: hsl(210 40% 28%);
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  font-weight: 500;

  .dark & {
    color: hsl(210 40% 78%);
    background: rgba(51, 65, 85, 0.7);
    border-color: rgba(51, 65, 85, 0.5);
  }

  &:hover {
    color: hsl(25 95% 53%);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    transform: scale(1.05);

    .dark & {
      color: hsl(25 95% 58%);
    }
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 1rem 2rem;
`;

const ContractorCardContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ContractorCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(24px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
  max-width: 24rem;
  margin-left: auto;
  margin-right: auto;
  transition: all 700ms cubic-bezier(0.4, 0, 0.2, 1);

  .dark & {
    background: rgba(51, 65, 85, 0.9);
    border-color: rgba(51, 65, 85, 0.5);
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const CardBackground = styled.div`
  position: absolute;
  inset: -0.5rem;
  background: linear-gradient(to right, hsl(25 95% 53% / 0.2), hsl(45 93% 47% / 0.2), hsl(60 100% 50% / 0.2));
  border-radius: 1.5rem;
  filter: blur(24px);
  opacity: 0.75;
  transition: opacity 700ms cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  ${ContractorCard}:hover & {
    opacity: 1;
  }
`;

const GradientAccent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0.5rem;
  background: linear-gradient(to right, hsl(25 95% 53%), hsl(45 93% 47%), hsl(60 100% 50%));
`;

const ContractorImage = styled.img`
  width: 100%;
  height: 13rem;
  object-fit: cover;
  transition: transform 700ms cubic-bezier(0.4, 0, 0.2, 1);

  ${ContractorCard}:hover & {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 900;
  background: linear-gradient(to right, hsl(25 95% 53%), hsl(45 93% 47%), hsl(60 100% 50%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;

  .dark & {
    background: linear-gradient(to right, hsl(25 95% 58%), hsl(45 93% 52%), hsl(60 100% 55%));
    background-clip: text;
    -webkit-background-clip: text;
  }

  @media (min-width: 640px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.div`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  .dark & {
    background: rgba(51, 65, 85, 0.8);
    border-color: rgba(51, 65, 85, 0.6);
  }

  p {
    color: hsl(210 40% 28%);
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0;

    .dark & {
      color: hsl(210 40% 78%);
    }

    @media (min-width: 640px) {
      font-size: 1rem;
    }
  }
`;

const FeaturesCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(24px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);

  .dark & {
    background: rgba(51, 65, 85, 0.9);
    border-color: rgba(51, 65, 85, 0.5);
  }

  &:hover {
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.3);
  }
`;

const FeaturesTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(to right, hsl(215 28% 17%), hsl(215 16% 47%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;

  .dark & {
    background: linear-gradient(to right, hsl(210 40% 98%), hsl(210 40% 78%));
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const FeaturesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  color: hsl(210 40% 28%);
  font-size: 0.875rem;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  .dark & {
    color: hsl(210 40% 78%);
  }
`;

const FeatureIcon = styled.div`
  padding: 0.375rem;
  border-radius: 50%;
  background: linear-gradient(to right, hsl(25 95% 53% / 0.2), hsl(45 93% 47% / 0.2));
  margin-right: 0.75rem;
  margin-top: 0.125rem;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  ${FeatureItem}:hover & {
    background: linear-gradient(to right, hsl(25 95% 53% / 0.4), hsl(45 93% 47% / 0.4));
  }

  svg {
    width: 0.75rem;
    height: 0.75rem;
    color: hsl(25 95% 53%);

    .dark & {
      color: hsl(25 95% 58%);
    }
  }
`;

const FeatureText = styled.span`
  font-weight: 500;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 28rem;
  margin: 0 auto;
  width: 100%;
`;

const PrimaryButtonWrapper = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -0.25rem;
    background: linear-gradient(to right, hsl(25 95% 53%), hsl(45 93% 47%), hsl(60 100% 50%));
    border-radius: 1rem;
    filter: blur(4px);
    opacity: 0.6;
    transition: opacity 700ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::before {
    opacity: 1;
  }
`;

const PrimaryButton = styled.button`
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(24px);
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: 700;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 1.125rem;

  .dark & {
    background: rgba(51, 65, 85, 0.95);
    border-color: rgba(51, 65, 85, 0.5);
  }

  &:hover {
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.3);
    transform: scale(1.05) translateY(-0.25rem);
  }

  span {
    background: linear-gradient(to right, hsl(25 95% 53%), hsl(45 93% 47%), hsl(60 100% 50%));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  color: hsl(210 40% 28%);
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.6);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  cursor: pointer;

  .dark & {
    background: rgba(51, 65, 85, 0.8);
    color: hsl(210 40% 78%);
    border-color: rgba(51, 65, 85, 0.6);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: hsl(25 95% 63%);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    transform: scale(1.05);

    .dark & {
      background: rgba(51, 65, 85, 0.95);
      border-color: hsl(25 95% 58%);
    }
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  padding: 0 1rem;
`;

const FooterBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.4);

  .dark & {
    background: rgba(51, 65, 85, 0.6);
    border-color: rgba(51, 65, 85, 0.4);
  }
`;

const FooterDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: linear-gradient(to right, hsl(25 95% 53%), hsl(45 93% 47%));
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const FooterText = styled.p`
  font-size: 0.75rem;
  color: hsl(215 16% 47%);
  font-weight: 500;
  margin: 0;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

export default function ContractorScreen({
  onLogin,
  onSignup,
  onBack,
}: ContractorScreenProps) {
  return (
    <Container>
      {/* Floating background elements */}
      <BackgroundElements>
        <FloatingElement1 />
        <FloatingElement2 />
        <FloatingElement3 />
      </BackgroundElements>

      {/* Header with Back Button */}
      <HeaderContainer>
        <BackButton onClick={onBack}>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </BackButton>
        <SimpleThemeToggle />
      </HeaderContainer>

      {/* Content */}
      <ContentContainer>
        {/* Contractor Card */}
        <ContractorCardContainer>
          <ContractorCard>
            <CardBackground />
            <GradientAccent />
            <ContractorImage
              src="https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F49e829fd851d42a691685962b579ec5a?format=webp&width=800"
              alt="Contractor"
            />
          </ContractorCard>

          <Title>Contractor Portal</Title>
          <Subtitle>
            <p>Manage your assigned tasks and track project progress</p>
          </Subtitle>
        </ContractorCardContainer>

        {/* Features List */}
        <FeaturesCard>
          <FeaturesTitle>What you can do:</FeaturesTitle>
          <FeaturesList>
            <FeatureItem>
              <FeatureIcon>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </FeatureIcon>
              <FeatureText>View assigned building projects</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </FeatureIcon>
              <FeatureText>Track task deadlines and progress</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </FeatureIcon>
              <FeatureText>Mark tasks as completed</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </FeatureIcon>
              <FeatureText>Upload progress photos and reports</FeatureText>
            </FeatureItem>
          </FeaturesList>
        </FeaturesCard>

        {/* Action Buttons */}
        <ButtonsContainer>
          <PrimaryButtonWrapper>
            <PrimaryButton onClick={onLogin}>
              <span>Login to Dashboard</span>
            </PrimaryButton>
          </PrimaryButtonWrapper>

          <SecondaryButton onClick={onSignup}>
            Create Contractor Account
          </SecondaryButton>
        </ButtonsContainer>

        <Footer>
          <FooterBadge>
            <FooterDot />
            <FooterText>Need help? Contact your project administrator</FooterText>
          </FooterBadge>
        </Footer>
      </ContentContainer>
    </Container>
  );
}
