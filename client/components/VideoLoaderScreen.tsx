import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Button } from "@/components/ui/button";
import { SimpleThemeToggle } from "@/components/theme-toggle";

interface VideoLoaderScreenProps {
  onGetStarted: () => void;
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

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const gradient = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

// Styled components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    hsl(210 40% 98%),
    hsl(217 91% 95%),
    hsl(221 83% 92%)
  );
  position: relative;
  overflow: hidden;

  .dark & {
    background: linear-gradient(
      135deg,
      hsl(222 84% 5%),
      hsl(217 91% 10%),
      hsl(221 83% 12%)
    );
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  inset: 0;
`;

const Star = styled.div<{
  left: string;
  top: string;
  delay: string;
  size: string;
}>`
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  color: hsl(217 91% 60% / 0.7);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-delay: ${(props) => props.delay};
  font-size: ${(props) => props.size};

  .dark & {
    color: hsl(217 91% 70% / 0.5);
  }
`;

const FloatingElement1 = styled.div`
  position: absolute;
  top: 4rem;
  left: 2rem;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(
    135deg,
    hsl(217 91% 60% / 0.15),
    hsl(271 91% 65% / 0.15)
  );
  border-radius: 50%;
  filter: blur(32px);
  animation: ${float} 3s ease-in-out infinite;
`;

const FloatingElement2 = styled.div`
  position: absolute;
  top: 8rem;
  right: 3rem;
  width: 8rem;
  height: 8rem;
  background: linear-gradient(
    135deg,
    hsl(196 100% 60% / 0.2),
    hsl(221 83% 65% / 0.2)
  );
  border-radius: 50%;
  filter: blur(24px);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: 1.5s;
`;

const FloatingElement3 = styled.div`
  position: absolute;
  bottom: 10rem;
  left: 4rem;
  width: 7rem;
  height: 7rem;
  background: linear-gradient(
    135deg,
    hsl(271 91% 65% / 0.15),
    hsl(314 100% 75% / 0.15)
  );
  border-radius: 50%;
  filter: blur(16px);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: 3s;
`;

const FloatingElement4 = styled.div`
  position: absolute;
  top: 50%;
  right: 25%;
  width: 6rem;
  height: 6rem;
  background: linear-gradient(
    135deg,
    hsl(221 83% 65% / 0.25),
    hsl(217 91% 60% / 0.25)
  );
  border-radius: 50%;
  filter: blur(12px);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: 0.5s;
`;

const GeometricAccent1 = styled.div`
  position: absolute;
  top: 5rem;
  left: 33.333333%;
  width: 0.25rem;
  height: 4rem;
  background: linear-gradient(to bottom, hsl(217 91% 60% / 0.3), transparent);
  transform: rotate(12deg);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const GeometricAccent2 = styled.div`
  position: absolute;
  bottom: 8rem;
  right: 33.333333%;
  width: 4rem;
  height: 0.25rem;
  background: linear-gradient(to right, hsl(271 91% 60% / 0.3), transparent);
  transform: rotate(-12deg);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-delay: 2s;
`;

const GeometricDot = styled.div`
  position: absolute;
  top: 33.333333%;
  left: 25%;
  width: 0.5rem;
  height: 0.5rem;
  background: linear-gradient(to right, hsl(196 100% 60%), hsl(217 91% 60%));
  border-radius: 50%;
  animation: ${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  animation-delay: 1s;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 3rem 1.5rem 0;

  @media (min-width: 640px) {
    padding-top: 4rem;
  }
`;

const ThemeToggleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const TitleContainer = styled.div<{ showContent: boolean }>`
  text-align: center;
  transition: all 1000ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.showContent ? 1 : 0)};
  transform: translateY(${(props) => (props.showContent ? "0" : "1rem")});
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(
    to right,
    hsl(217 91% 60%),
    hsl(271 91% 65%),
    hsl(221 83% 60%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(217 91% 65%),
      hsl(271 91% 70%),
      hsl(221 83% 65%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }

  @media (min-width: 640px) {
    font-size: 3.75rem;
  }
`;

const Subtitle = styled.div`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);

  .dark & {
    background: rgba(51, 65, 85, 0.8);
    border-color: rgba(51, 65, 85, 0.6);
  }

  p {
    font-size: 1.125rem;
    color: hsl(210 40% 28%);
    font-weight: 600;
    margin: 0;

    .dark & {
      color: hsl(210 40% 98%);
    }
  }
`;

const VideoSection = styled.div<{ showContent: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  width: 100%;
  transition: all 1000ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 300ms;
  opacity: ${(props) => (props.showContent ? 1 : 0)};
  transform: scale(${(props) => (props.showContent ? 1 : 0.95)});
`;

const VideoContainer = styled.div`
  position: relative;
  max-width: 24rem;
  margin: 0 auto;
  transition: all 700ms cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 640px) {
    max-width: 28rem;
  }

  &:hover {
    transform: scale(1.02) translateY(-0.5rem);
  }
`;

const VideoBackground = styled.div`
  position: absolute;
  inset: -1rem;
  background: linear-gradient(
    to right,
    hsl(217 91% 60% / 0.2),
    hsl(271 91% 65% / 0.2),
    hsl(221 83% 60% / 0.2)
  );
  border-radius: 1.5rem;
  filter: blur(24px);
  opacity: 0.75;
  transition: opacity 700ms cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  ${VideoContainer}:hover & {
    opacity: 1;
  }
`;

const VideoCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(24px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 700ms cubic-bezier(0.4, 0, 0.2, 1);

  .dark & {
    background: rgba(51, 65, 85, 0.95);
    border-color: rgba(51, 65, 85, 0.5);
  }

  ${VideoContainer}:hover & {
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.3);
  }
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 16/18;
`;

const VideoFallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, hsl(217 91% 95%), hsl(196 100% 95%));
  font-size: 4rem;
`;

const BottomSection = styled.div`
  padding: 0 1.5rem 3rem;
`;

const BottomContent = styled.div<{ showContent: boolean }>`
  text-align: center;
  transition: all 1000ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 500ms;
  opacity: ${(props) => (props.showContent ? 1 : 0)};
  transform: translateY(${(props) => (props.showContent ? "0" : "1rem")});
`;

const MainTextContainer = styled.div`
  margin-bottom: 2rem;
`;

const MainTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  background: linear-gradient(to right, hsl(215 28% 17%), hsl(215 16% 47%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  line-height: 1.25;

  .dark & {
    background: linear-gradient(to right, hsl(210 40% 98%), hsl(210 40% 78%));
    background-clip: text;
    -webkit-background-clip: text;
  }

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
`;

const MainSubtitle = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.4);

  .dark & {
    background: rgba(51, 65, 85, 0.7);
    border-color: rgba(51, 65, 85, 0.4);
  }

  p {
    color: hsl(210 40% 28%);
    font-size: 1rem;
    font-weight: 600;
    margin: 0;

    .dark & {
      color: hsl(210 40% 78%);
    }
  }
`;

const ProgressContainer = styled.div`
  max-width: 24rem;
  margin: 0 auto 2rem;
`;

const ProgressBarContainer = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  height: 0.75rem;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.4);

  .dark & {
    background: rgba(51, 65, 85, 0.3);
    border-color: rgba(51, 65, 85, 0.4);
  }
`;

const ProgressBar = styled.div<{ progress: number }>`
  background: linear-gradient(
    to right,
    hsl(217 91% 60%),
    hsl(271 91% 65%),
    hsl(221 83% 60%)
  );
  height: 100%;
  border-radius: 9999px;
  transition: all 500ms ease-out;
  position: relative;
  overflow: hidden;
  width: ${(props) => props.progress}%;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    background-size: 200% 100%;
    animation: ${gradient} 3s ease infinite;
  }
`;

const LoadingText = styled.div`
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.4);

  .dark & {
    background: rgba(51, 65, 85, 0.6);
    border-color: rgba(51, 65, 85, 0.4);
  }
`;

const LoadingDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: linear-gradient(to right, hsl(217 91% 60%), hsl(271 91% 65%));
  animation: ${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite;
`;

const LoadingLabel = styled.p`
  color: hsl(210 40% 28%);
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;

  .dark & {
    color: hsl(210 40% 78%);
  }
`;

const ButtonContainer = styled.div`
  max-width: 24rem;
  margin: 0 auto;
  position: relative;
`;

const ButtonGlow = styled.div`
  position: absolute;
  inset: -0.25rem;
  background: linear-gradient(
    to right,
    hsl(217 91% 60%),
    hsl(271 91% 65%),
    hsl(221 83% 60%)
  );
  border-radius: 1.5rem;
  filter: blur(4px);
  opacity: 0.6;
  transition: opacity 700ms cubic-bezier(0.4, 0, 0.2, 1);

  ${ButtonContainer}:hover & {
    opacity: 1;
  }
`;

const StyledButton = styled(Button)`
  width: 100% !important;
  position: relative !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(24px) !important;
  color: hsl(215 28% 17%) !important;
  font-weight: 700 !important;
  padding: 1.25rem 2rem !important;
  border-radius: 1.5rem !important;
  font-size: 1.125rem !important;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;

  .dark & {
    background: rgba(51, 65, 85, 0.95) !important;
    color: hsl(210 40% 98%) !important;
    border-color: rgba(51, 65, 85, 0.5) !important;
  }

  &:hover {
    background: rgba(255, 255, 255, 1) !important;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.3) !important;
    transform: scale(1.05) translateY(-0.25rem) !important;

    .dark & {
      background: rgba(51, 65, 85, 1) !important;
    }
  }
`;

const ButtonContent = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.span`
  background: linear-gradient(
    to right,
    hsl(217 91% 60%),
    hsl(271 91% 65%),
    hsl(221 83% 60%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
`;

const ButtonIconContainer = styled.div`
  margin-left: 0.75rem;
  padding: 0.5rem;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    hsl(217 91% 60% / 0.2),
    hsl(271 91% 65% / 0.2)
  );
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  ${StyledButton}:hover & {
    background: linear-gradient(
      to right,
      hsl(217 91% 60% / 0.4),
      hsl(271 91% 65% / 0.4)
    );
  }
`;

const ButtonIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  color: hsl(217 91% 60%);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

  .dark & {
    color: hsl(217 91% 65%);
  }

  ${StyledButton}:hover & {
    transform: translateX(0.25rem) scale(1.1);
  }
`;

export default function VideoLoaderScreen({
  onGetStarted,
}: VideoLoaderScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content immediately
    setShowContent(true);

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    return () => {
      clearInterval(progressTimer);
    };
  }, []);

  // Generate random stars
  const stars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
    delay: `${Math.random() * 3}s`,
    size: `${12 + Math.random() * 8}px`,
  }));

  return (
    <Container>
      {/* Decorative Background Elements */}
      <BackgroundElements>
        {/* Stars */}
        {stars.map((star) => (
          <Star
            key={star.id}
            left={star.left}
            top={star.top}
            delay={star.delay}
            size={star.size}
          >
            ✦
          </Star>
        ))}

        {/* Modern Floating Elements */}
        <FloatingElement1 />
        <FloatingElement2 />
        <FloatingElement3 />
        <FloatingElement4 />

        {/* Geometric Accents */}
        <GeometricAccent1 />
        <GeometricAccent2 />
        <GeometricDot />
      </BackgroundElements>

      {/* Content */}
      <ContentContainer>
        {/* Header */}
        <Header>
          <ThemeToggleContainer>
            <SimpleThemeToggle />
          </ThemeToggleContainer>
          <TitleContainer showContent={showContent}>
            <Title>Builder Pro</Title>
            <Subtitle>
              <p>Professional Construction Management</p>
            </Subtitle>
          </TitleContainer>
        </Header>

        {/* Video Container - Center */}
        <VideoSection showContent={showContent}>
          <VideoContainer>
            <VideoBackground />
            <VideoCard>
              <div style={{ position: "relative" }}>
                <Video autoPlay muted loop playsInline>
                  <source
                    src="https://cdn.builder.io/o/assets%2Fa08533bde27b41f399eb46012fabe83e%2Fe1974c25c994466b97e22c1c6d68b271?alt=media&token=57a2dd46-0eae-4d4e-afcc-2cc9fb4c7a29&apiKey=a08533bde27b41f399eb46012fabe83e"
                    type="video/mov"
                  />
                  <source
                    src="https://cdn.builder.io/o/assets%2Fa08533bde27b41f399eb46012fabe83e%2Fe1974c25c994466b97e22c1c6d68b271?alt=media&token=57a2dd46-0eae-4d4e-afcc-2cc9fb4c7a29&apiKey=a08533bde27b41f399eb46012fabe83e"
                    type="video/mp4"
                  />
                  <VideoFallback>🏗️</VideoFallback>
                </Video>
              </div>
            </VideoCard>
          </VideoContainer>
        </VideoSection>

        {/* Bottom Section with Text and Button */}
        <BottomSection>
          <BottomContent showContent={showContent}>
            {/* Main Text */}
            <MainTextContainer>
              <MainTitle>
                Build projects for
                <br />
                every step you take.
              </MainTitle>
              <MainSubtitle>
                <p>
                  More than tracking, transform
                  <br />
                  planning into building.
                </p>
              </MainSubtitle>
            </MainTextContainer>

            {/* Progress Bar */}
            <ProgressContainer>
              <ProgressBarContainer>
                <ProgressBar progress={progress} />
              </ProgressBarContainer>

              {/* Loading Text */}
              <LoadingText>
                <LoadingDot />
                <LoadingLabel>
                  Preparing your workspace... {Math.round(progress)}%
                </LoadingLabel>
              </LoadingText>
            </ProgressContainer>

            {/* Get Started Button */}
            <ButtonContainer>
              <ButtonGlow />
              <StyledButton onClick={onGetStarted} size="lg">
                <ButtonContent>
                  <ButtonText>Get Started</ButtonText>
                  <ButtonIconContainer>
                    <ButtonIcon
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </ButtonIcon>
                  </ButtonIconContainer>
                </ButtonContent>
              </StyledButton>
            </ButtonContainer>
          </BottomContent>
        </BottomSection>
      </ContentContainer>
    </Container>
  );
}
