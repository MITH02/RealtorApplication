import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { useAuth } from "@/contexts/AuthContext";
import { SimpleThemeToggle } from "@/components/theme-toggle";
import AdminDashboard from "./roles/AdminDashboard";
import BuilderDashboard from "./roles/BuilderDashboard";
import ContractorDashboard from "./roles/ContractorDashboard";

interface DashboardProps {
  role: "builder" | "contractor" | "admin";
  onLogout: () => void;
}

// Keyframes for animations
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// Styled components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    hsl(210, 40%, 98%) 0%,
    hsl(214, 100%, 97%) 50%,
    hsl(226, 100%, 96%) 100%
  );
  position: relative;
  overflow: hidden;

  .dark & {
    background: linear-gradient(
      to bottom right,
      hsl(222, 84%, 5%) 0%,
      hsl(215, 28%, 17%) 50%,
      hsl(226, 50%, 12%) 100%
    );
  }
`;

const FloatingElement = styled.div<{ delay?: string }>`
  position: absolute;
  border-radius: 50%;
  filter: blur(2rem);
  animation: ${floatAnimation} 6s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const FloatingElement1 = styled(FloatingElement)`
  top: 5rem;
  left: 5rem;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(
    to bottom right,
    hsla(214, 100%, 70%, 0.1),
    hsla(280, 100%, 70%, 0.1)
  );
`;

const FloatingElement2 = styled(FloatingElement)`
  top: 10rem;
  right: 5rem;
  width: 8rem;
  height: 8rem;
  background: linear-gradient(
    to bottom right,
    hsla(188, 100%, 70%, 0.15),
    hsla(226, 100%, 70%, 0.15)
  );
  filter: blur(1rem);
`;

const FloatingElement3 = styled(FloatingElement)`
  bottom: 8rem;
  left: 8rem;
  width: 7rem;
  height: 7rem;
  background: linear-gradient(
    to bottom right,
    hsla(280, 100%, 70%, 0.1),
    hsla(330, 100%, 70%, 0.1)
  );
  filter: blur(0.75rem);
`;

const BackgroundElements = styled.div`
  position: absolute;
  inset: 0;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.5);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  .dark & {
    background: hsla(215, 28%, 17%, 0.8);
    border-bottom: 1px solid hsla(215, 28%, 17%, 0.5);
  }
`;

const HeaderContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  background: linear-gradient(
    to right,
    hsl(214, 100%, 50%),
    hsl(280, 100%, 50%),
    hsl(226, 100%, 50%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(214, 100%, 70%),
      hsl(280, 100%, 70%),
      hsl(226, 100%, 70%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const RoleBadge = styled.span<{ roleColor: string }>`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background: ${(props) => {
    switch (props.roleColor) {
      case "blue":
        return "linear-gradient(to right, hsla(214, 100%, 50%, 0.2), hsla(214, 100%, 40%, 0.2))";
      case "orange":
        return "linear-gradient(to right, hsla(25, 100%, 50%, 0.2), hsla(25, 100%, 40%, 0.2))";
      case "purple":
        return "linear-gradient(to right, hsla(280, 100%, 50%, 0.2), hsla(280, 100%, 40%, 0.2))";
      default:
        return "linear-gradient(to right, hsla(214, 100%, 50%, 0.2), hsla(214, 100%, 40%, 0.2))";
    }
  }};
  backdrop-filter: blur(4px);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => {
    switch (props.roleColor) {
      case "blue":
        return "hsl(214, 100%, 50%)";
      case "orange":
        return "hsl(25, 100%, 50%)";
      case "purple":
        return "hsl(280, 100%, 50%)";
      default:
        return "hsl(214, 100%, 50%)";
    }
  }};
  border: 1px solid hsla(0, 0%, 100%, 0.3);

  .dark & {
    border: 1px solid hsla(215, 28%, 17%, 0.3);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: hsla(0, 0%, 100%, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  color: hsl(215, 16%, 47%);

  &:hover {
    background: hsla(0, 0%, 100%, 0.9);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }

  .dark & {
    background: hsla(215, 28%, 17%, 0.7);
    border: 1px solid hsla(215, 28%, 17%, 0.5);
    color: hsl(215, 20%, 65%);

    &:hover {
      background: hsla(215, 28%, 17%, 0.9);
    }
  }

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
`;

const Main = styled.main`
  position: relative;
  z-index: 10;
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const MainTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  background: linear-gradient(to right, hsl(215, 28%, 17%), hsl(215, 16%, 47%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;

  .dark & {
    background: linear-gradient(to right, hsl(0, 0%, 100%), hsl(215, 20%, 65%));
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const WelcomeBox = styled.div`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 9999px;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  .dark & {
    background: hsla(215, 28%, 17%, 0.8);
    border: 1px solid hsla(215, 28%, 17%, 0.5);
  }

  p {
    color: hsl(215, 16%, 47%);
    font-weight: 600;

    .dark & {
      color: hsl(215, 20%, 65%);
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div<{ index: number }>`
  background: hsla(0, 0%, 100%, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  transition: all 0.5s ease;
  animation-delay: ${(props) => props.index * 100}ms;

  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    transform: scale(1.05) translateY(-0.5rem);
  }

  .dark & {
    background: hsla(215, 28%, 17%, 0.9);
    border: 1px solid hsla(215, 28%, 17%, 0.5);
  }
`;

const StatContent = styled.div`
  display: flex;
  align-items: center;
`;

const StatIcon = styled.div`
  font-size: 2.25rem;
  margin-right: 1rem;
  transition: transform 0.3s ease;

  ${StatCard}:hover & {
    transform: scale(1.1);
  }
`;

const StatValue = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  background: linear-gradient(
    to right,
    hsl(214, 100%, 50%),
    hsl(280, 100%, 50%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(214, 100%, 70%),
      hsl(280, 100%, 70%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const StatLabel = styled.p`
  color: hsl(215, 16%, 47%);
  font-size: 0.875rem;
  font-weight: 500;

  .dark & {
    color: hsl(215, 20%, 65%);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ContentCard = styled.div`
  background: hsla(0, 0%, 100%, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  transition: all 0.5s ease;

  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
    transform: scale(1.02);
  }

  .dark & {
    background: hsla(215, 28%, 17%, 0.9);
    border: 1px solid hsla(215, 28%, 17%, 0.5);
  }
`;

const ContentTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, hsl(215, 28%, 17%), hsl(215, 16%, 47%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;

  .dark & {
    background: linear-gradient(to right, hsl(0, 0%, 100%), hsl(215, 20%, 65%));
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const ActionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  background: hsla(0, 0%, 100%, 0.7);
  backdrop-filter: blur(4px);
  border: 1px solid hsla(0, 0%, 100%, 0.6);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: hsl(215, 28%, 17%);
  font-weight: 500;

  &:hover {
    background: hsla(0, 0%, 100%, 0.9);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
  }

  .dark & {
    background: hsla(215, 20%, 25%, 0.7);
    border: 1px solid hsla(215, 20%, 35%, 0.6);
    color: hsl(215, 20%, 65%);

    &:hover {
      background: hsla(215, 20%, 25%, 0.9);
    }
  }
`;

const ActionIcon = styled.div`
  padding: 0.5rem;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    hsla(214, 100%, 50%, 0.2),
    hsla(280, 100%, 50%, 0.2)
  );
  transition: all 0.3s ease;

  ${ActionButton}:hover & {
    background: linear-gradient(
      to right,
      hsla(214, 100%, 50%, 0.4),
      hsla(280, 100%, 50%, 0.4)
    );
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: hsl(214, 100%, 50%);
    transition: transform 0.3s ease;

    .dark & {
      color: hsl(214, 100%, 70%);
    }
  }

  ${ActionButton}:hover & svg {
    transform: translateX(0.25rem);
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: hsla(0, 0%, 100%, 0.5);
  backdrop-filter: blur(4px);
  border: 1px solid hsla(0, 0%, 100%, 0.4);

  .dark & {
    background: hsla(215, 20%, 25%, 0.5);
    border: 1px solid hsla(215, 20%, 35%, 0.4);
  }
`;

const ActivityIcon = styled.div<{
  color: "green" | "blue" | "yellow";
  delay?: string;
}>`
  width: 2.5rem;
  height: 2.5rem;
  background: ${(props) => {
    switch (props.color) {
      case "green":
        return "linear-gradient(to bottom right, hsl(142, 76%, 36%), hsl(142, 76%, 26%))";
      case "blue":
        return "linear-gradient(to bottom right, hsl(214, 100%, 70%), hsl(214, 100%, 50%))";
      case "yellow":
        return "linear-gradient(to bottom right, hsl(45, 100%, 70%), hsl(45, 100%, 50%))";
      default:
        return "linear-gradient(to bottom right, hsl(214, 100%, 70%), hsl(214, 100%, 50%))";
    }
  }};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  div {
    width: 1rem;
    height: 1rem;
    background: white;
    border-radius: 50%;
    animation: ${pulseAnimation} 2s ease-in-out infinite;
    animation-delay: ${(props) => props.delay || "0s"};
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(215, 28%, 17%);

  .dark & {
    color: hsl(215, 20%, 65%);
  }
`;

const ActivityTime = styled.p`
  font-size: 0.75rem;
  color: hsl(215, 16%, 47%);
  margin-top: 0.25rem;

  .dark & {
    color: hsl(215, 20%, 65%);
  }
`;

const PlaceholderCard = styled.div`
  margin-top: 3rem;
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);

  .dark & {
    background: hsla(215, 28%, 17%, 0.8);
    border: 1px solid hsla(215, 28%, 17%, 0.5);
  }
`;

const PlaceholderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceholderIcon = styled.div`
  padding: 1rem;
  background: linear-gradient(
    to right,
    hsla(214, 100%, 50%, 0.2),
    hsla(280, 100%, 50%, 0.2)
  );
  border-radius: 1rem;
  margin-right: 1rem;

  svg {
    width: 2rem;
    height: 2rem;
    color: hsl(214, 100%, 50%);

    .dark & {
      color: hsl(214, 100%, 70%);
    }
  }
`;

const PlaceholderText = styled.div`
  text-align: center;
`;

const PlaceholderTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(
    to right,
    hsl(214, 100%, 50%),
    hsl(280, 100%, 50%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(214, 100%, 70%),
      hsl(280, 100%, 70%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const PlaceholderDescription = styled.p`
  color: hsl(215, 16%, 47%);
  max-width: 32rem;

  .dark & {
    color: hsl(215, 20%, 65%);
  }
`;

export default function Dashboard({ role, onLogout }: DashboardProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  if (!user) {
    return (
      <DashboardContainer>
        <div>Loading...</div>
      </DashboardContainer>
    );
  }

  const roleColors = {
    builder: "blue",
    contractor: "orange",
    admin: "purple",
  } as const;

  const color = roleColors[role];

  // Render specific dashboard based on user role
  const renderDashboardContent = () => {
    switch (user.role) {
      case "ADMIN":
        return <AdminDashboard user={user} />;
      case "BUILDER":
        return <BuilderDashboard user={user} />;
      case "CONTRACTOR":
        return <ContractorDashboard user={user} />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <DashboardContainer>
      <BackgroundElements>
        <FloatingElement1 />
        <FloatingElement2 delay="1s" />
        <FloatingElement3 delay="2s" />
      </BackgroundElements>

      <Header>
        <HeaderContainer>
          <HeaderContent>
            <HeaderLeft>
              <Title>ConstructPro</Title>
              <RoleBadge roleColor={color}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </RoleBadge>
            </HeaderLeft>
            <HeaderRight>
              <SimpleThemeToggle />
              <LogoutButton onClick={handleLogout}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </LogoutButton>
            </HeaderRight>
          </HeaderContent>
        </HeaderContainer>
      </Header>

      <Main>

        {renderDashboardContent()}
      </Main>
    </DashboardContainer>
  );
}
