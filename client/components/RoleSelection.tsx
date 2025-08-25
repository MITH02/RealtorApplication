import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { SimpleThemeToggle } from "@/components/theme-toggle";

interface RoleSelectionProps {
  onRoleSelect: (role: "builder" | "contractor" | "admin") => void;
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

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, hsl(210 40% 98%), hsl(217 91% 95%), hsl(221 83% 92%));
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

const Star = styled.div<{ left: string; top: string; delay: string; size: string }>`
  position: absolute;
  left: ${props => props.left};
  top: ${props => props.top};
  color: hsl(217 91% 60% / 0.6);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-delay: ${props => props.delay};
  font-size: ${props => props.size};

  .dark & {
    color: hsl(217 91% 70% / 0.4);
  }
`;

const FloatingElement1 = styled.div`
  position: absolute;
  top: 5rem;
  left: 2.5rem;
  width: 8rem;
  height: 8rem;
  background: linear-gradient(135deg, hsl(217 91% 60% / 0.2), hsl(271 91% 65% / 0.2));
  border-radius: 50%;
  filter: blur(24px);
  animation: ${float} 3s ease-in-out infinite;
`;

const FloatingElement2 = styled.div`
  position: absolute;
  top: 10rem;
  right: 4rem;
  width: 6rem;
  height: 6rem;
  background: linear-gradient(135deg, hsl(196 100% 60% / 0.25), hsl(217 91% 65% / 0.25));
  border-radius: 50%;
  filter: blur(16px);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: 1s;
`;

const FloatingElement3 = styled.div`
  position: absolute;
  bottom: 8rem;
  left: 5rem;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, hsl(221 83% 65% / 0.3), hsl(196 100% 60% / 0.3));
  border-radius: 50%;
  filter: blur(12px);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: 2s;
`;

const FloatingElement4 = styled.div`
  position: absolute;
  top: 33.333333%;
  right: 25%;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, hsl(271 91% 65% / 0.2), hsl(314 100% 75% / 0.2));
  border-radius: 50%;
  filter: blur(16px);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: 0.5s;
`;

const GeometricAccent1 = styled.div`
  position: absolute;
  top: 8rem;
  left: 33.333333%;
  width: 0.5rem;
  height: 3rem;
  background: linear-gradient(to bottom, hsl(217 91% 60% / 0.4), transparent);
  transform: rotate(12deg);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const GeometricAccent2 = styled.div`
  position: absolute;
  bottom: 10rem;
  right: 33.333333%;
  width: 3rem;
  height: 0.5rem;
  background: linear-gradient(to right, hsl(196 100% 60% / 0.4), transparent);
  transform: rotate(-12deg);
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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

const TitleContainer = styled.div`
  text-align: center;
  transition: all 1000ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  transform: translateY(0);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(to right, hsl(217 91% 60%), hsl(271 91% 65%), hsl(221 83% 60%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
  animation: ${fadeIn} 0.6s ease-out forwards;

  .dark & {
    background: linear-gradient(to right, hsl(217 91% 65%), hsl(271 91% 70%), hsl(221 83% 65%));
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
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

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

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
`;

const RoleCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
`;

const RoleCard = styled.div<{ index: number }>`
  cursor: pointer;
  transform-origin: center;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  animation-delay: ${props => props.index * 200}ms;

  &:hover {
    transform: scale(1.02) translateY(-8px);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const RoleCardInner = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(24px);
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  overflow: hidden;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;

  .dark & {
    background: rgba(51, 65, 85, 0.9);
    border-color: rgba(51, 65, 85, 0.5);
  }

  &:hover {
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    border-color: hsl(217 91% 60% / 0.6);
    background: rgba(255, 255, 255, 0.95);

    .dark & {
      border-color: hsl(217 91% 65% / 0.6);
      background: rgba(51, 65, 85, 0.95);
    }
  }
`;

const RoleCardContent = styled.div`
  display: flex;
  height: 11rem;

  @media (min-width: 640px) {
    height: 12rem;
  }
`;

const RoleCardImage = styled.div`
  width: 11rem;
  flex-shrink: 0;
  overflow: hidden;

  @media (min-width: 640px) {
    width: 13rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  ${RoleCard}:hover & img {
    transform: scale(1.05);
  }
`;

const RoleCardText = styled.div`
  flex: 1;
  padding: 1.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  @media (min-width: 640px) {
    padding: 1.75rem;
  }
`;

const RoleCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, hsl(215 28% 17%), hsl(215 16% 47%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 0.75rem;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);

  .dark & {
    background: linear-gradient(to right, hsl(210 40% 98%), hsl(210 40% 78%));
    background-clip: text;
    -webkit-background-clip: text;
  }

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }

  ${RoleCard}:hover & {
    background: linear-gradient(to right, hsl(217 91% 60%), hsl(271 91% 65%));
    background-clip: text;
    -webkit-background-clip: text;

    .dark & {
      background: linear-gradient(to right, hsl(217 91% 65%), hsl(271 91% 70%));
      background-clip: text;
      -webkit-background-clip: text;
    }
  }
`;

const RoleCardDescription = styled.p`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;
  line-height: 1.625;
  transition: colors 300ms cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0;

  .dark & {
    color: hsl(215 20% 65%);
  }

  @media (min-width: 640px) {
    font-size: 1rem;
  }

  ${RoleCard}:hover & {
    color: hsl(210 40% 28%);

    .dark & {
      color: hsl(210 40% 98%);
    }
  }
`;

const Footer = styled.div`
  padding: 0 1.5rem 3rem;
`;

const FooterContent = styled.div`
  text-align: center;
  transition: all 1000ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 500ms;
  opacity: 1;
  transform: translateY(0);
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

const FooterBadgeDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: linear-gradient(to right, hsl(217 91% 60%), hsl(271 91% 65%));
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const FooterBadgeText = styled.p`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const roles = [
    {
      id: "builder" as const,
      title: "Builder",
      description:
        "Manage building projects and oversee construction development",
      image:
        "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop&crop=center",
    },
    {
      id: "contractor" as const,
      title: "Contractor",
      description: "Execute tasks and report project progress efficiently",
      image:
        "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop&crop=center",
    },
    {
      id: "admin" as const,
      title: "Admin",
      description: "System administration and comprehensive user management",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop&crop=center",
    },
  ];

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

        {/* Geometric Shapes */}
        <GeometricAccent1 />
        <GeometricAccent2 />
      </BackgroundElements>

      {/* Content */}
      <ContentContainer>
        {/* Header */}
        <Header>
          <ThemeToggleContainer>
            <SimpleThemeToggle />
          </ThemeToggleContainer>
          <TitleContainer>
            <Title>ConstructPro</Title>
            <Subtitle>
              <p>Choose your role to access your dashboard</p>
            </Subtitle>
          </TitleContainer>
        </Header>

        {/* Role Cards */}
        <MainContent>
          <RoleCardsContainer>
            {roles.map((role, index) => (
              <RoleCard
                key={role.id}
                index={index}
                onClick={() => onRoleSelect(role.id)}
              >
                <RoleCardInner>
                  <RoleCardContent>
                    {/* Image Section */}
                    <RoleCardImage>
                      <img
                        src={role.image}
                        alt={role.title}
                      />
                    </RoleCardImage>

                    {/* Content Section */}
                    <RoleCardText>
                      <RoleCardTitle>
                        {role.title}
                      </RoleCardTitle>
                      <RoleCardDescription>
                        {role.description}
                      </RoleCardDescription>
                    </RoleCardText>
                  </RoleCardContent>
                </RoleCardInner>
              </RoleCard>
            ))}
          </RoleCardsContainer>
        </MainContent>

        {/* Bottom Text */}
        <Footer>
          <FooterContent>
            <FooterBadge>
              <FooterBadgeDot />
              <FooterBadgeText>
                Professional Construction Management Platform
              </FooterBadgeText>
            </FooterBadge>
          </FooterContent>
        </Footer>
      </ContentContainer>
    </Container>
  );
}
