import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useAuth } from "@/contexts/AuthContext";
import { SimpleThemeToggle } from "@/components/theme-toggle";
import apiService from "@/services/api";

interface LoginFormProps {
  role: "builder" | "contractor" | "admin";
  onBack: () => void;
  onSuccess: () => void;
}

// Background container with gradient
const BackgroundContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    hsl(210 40% 98%),
    hsl(217 91% 95%),
    hsl(221 83% 92%)
  );
  display: flex;
  flex-direction: column;

  .dark & {
    background: linear-gradient(
      135deg,
      hsl(222 84% 5%),
      hsl(217 91% 10%),
      hsl(221 83% 12%)
    );
  }
`;

// Header container
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

// Back button
const BackButton = styled.button`
  display: flex;
  align-items: center;
  color: hsl(210 40% 28%);
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  font-weight: 500;

  .dark & {
    color: hsl(210 40% 78%);
    background: rgba(51, 65, 85, 0.7);
    border-color: rgba(51, 65, 85, 0.5);
  }

  &:hover {
    color: hsl(217 91% 60%);
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    transform: scale(1.05);

    .dark & {
      color: hsl(217 91% 65%);
    }
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }
`;

// Main content container
const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
`;

// Logo container
const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoIcon = styled.div<{ gradient: string }>`
  width: 5rem;
  height: 5rem;
  margin: 0 auto 1rem;
  background: ${(props) => `linear-gradient(135deg, ${props.gradient})`};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);

  span {
    font-size: 1.875rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(215 28% 17%);
  margin-bottom: 0.5rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const Subtitle = styled.p`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

// Form container
const FormContainer = styled.div`
  width: 100%;
  max-width: 24rem;
`;

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(24px);
  border-radius: 1.5rem;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.5);

  .dark & {
    background: rgba(51, 65, 85, 0.9);
    border-color: rgba(51, 65, 85, 0.5);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(210 40% 28%);
  margin-bottom: 0.5rem;

  .dark & {
    color: hsl(210 40% 78%);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid hsl(220 13% 91%);
  border-radius: 0.75rem;
  background: hsl(210 40% 96%);
  color: hsl(222 84% 5%);
  font-size: 1rem;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  .dark & {
    border-color: hsl(215 28% 25%);
    background: hsl(215 28% 17%);
    color: hsl(210 40% 98%);
  }

  &:focus {
    outline: none;
    border-color: hsl(217 91% 60%);
    box-shadow: 0 0 0 2px hsl(217 91% 60% / 0.2);
  }

  &::placeholder {
    color: hsl(215 16% 47%);

    .dark & {
      color: hsl(215 20% 65%);
    }
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: hsl(215 16% 47%);

  .dark & {
    color: hsl(215 20% 65%);
  }

  input {
    margin-right: 0.5rem;
    border-radius: 0.25rem;
  }
`;

const ForgotPasswordButton = styled.button`
  color: hsl(217 91% 60%);
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;

  .dark & {
    color: hsl(217 91% 65%);
  }

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button<{ gradient: string; isLoading: boolean }>`
  width: 100%;
  background: ${(props) => `linear-gradient(135deg, ${props.gradient})`};
  color: white;
  padding: 0.875rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${(props) =>
    props.isLoading &&
    css`
      .loading-spinner {
        margin-right: 0.75rem;
        position: relative;

        .spinner-ring {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .spinner-pulse {
          position: absolute;
          inset: 0;
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid transparent;
          border-top: 2px solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes pulse {
        50% {
          opacity: 0.5;
        }
      }
    `}
`;

const ToggleContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const ToggleText = styled.p`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const ToggleButton = styled.button`
  color: hsl(217 91% 60%);
  font-weight: 600;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;

  .dark & {
    color: hsl(217 91% 65%);
  }

  &:hover {
    text-decoration: underline;
  }
`;

const FeaturesCard = styled.div`
  margin-top: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);

  .dark & {
    background: rgba(51, 65, 85, 0.7);
    border-color: rgba(51, 65, 85, 0.5);
  }
`;

const FeaturesTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(217 91% 60%);
  margin-bottom: 0.5rem;

  .dark & {
    color: hsl(217 91% 65%);
  }
`;

const FeaturesList = styled.ul`
  font-size: 0.75rem;
  color: hsl(215 16% 47%);
  list-style: none;
  padding: 0;
  margin: 0;

  .dark & {
    color: hsl(215 20% 65%);
  }

  li {
    margin-bottom: 0.25rem;
  }
`;

export default function LoginForm({ role, onBack, onSuccess }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const roleConfig = {
    builder: {
      gradient: "hsl(217 91% 60%), hsl(217 91% 70%), hsl(217 91% 80%)",
      icon: "🏗️",
      title: "Builder Portal",
    },
    contractor: {
      gradient: "hsl(25 95% 53%), hsl(25 95% 63%), hsl(25 95% 73%)",
      icon: "👷",
      title: "Contractor Portal",
    },
    admin: {
      gradient: "hsl(271 91% 65%), hsl(271 91% 75%), hsl(271 91% 85%)",
      icon: "⚙️",
      title: "Admin Portal",
    },
  };

  const config = roleConfig[role];

  const { login, isLoading: authLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        onSuccess();
      } else {
        // Implement registration
        const signupData = {
          email,
          password,
          firstName: name.split(' ')[0] || name,
          lastName: name.split(' ').slice(1).join(' ') || '',
          role: role.toUpperCase(),
        };
        
        try {
          await apiService.register(signupData);
          alert("Registration successful! Please login with your credentials.");
          // Switch to login mode after successful registration
          setIsLogin(true);
        } catch (error: any) {
          // If registration fails due to role restrictions, show appropriate message
          if (error.message && error.message.includes("Only contractor registration is allowed")) {
            alert("Only contractor registration is available publicly. For other roles, please contact an administrator.");
          } else {
            throw error; // Re-throw other errors
          }
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      alert(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundContainer>
      {/* Header with Back Button */}
      <HeaderContainer>
        <BackButton onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        {/* Logo/Icon Section */}
        <LogoContainer>
          <LogoIcon gradient={config.gradient}>
            <span>{config.icon}</span>
          </LogoIcon>
          <Title>{isLogin ? "Welcome Back!" : "Create Account"}</Title>
          <Subtitle>
            {isLogin ? `Sign in to your ${role} account` : `Join as a ${role}`}
          </Subtitle>
        </LogoContainer>

        {/* Form Container */}
        <FormContainer>
          <FormCard>
            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <InputGroup>
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </InputGroup>
              )}

              <InputGroup>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </InputGroup>

              {isLogin && (
                <CheckboxContainer>
                  <CheckboxLabel>
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </CheckboxLabel>
                  <ForgotPasswordButton type="button">
                    Forgot password?
                  </ForgotPasswordButton>
                </CheckboxContainer>
              )}

              <SubmitButton
                type="submit"
                disabled={isLoading || authLoading}
                gradient={config.gradient}
                isLoading={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner">
                      <div className="spinner-ring"></div>
                      <div className="spinner-pulse"></div>
                    </div>
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </SubmitButton>
            </Form>

            {/* Toggle between login/signup */}
            <ToggleContainer>
              <ToggleText>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </ToggleText>
              <ToggleButton onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Create one now" : "Sign in instead"}
              </ToggleButton>
            </ToggleContainer>
          </FormCard>

          {/* Features Preview */}
          <FeaturesCard>
            <FeaturesTitle>What's waiting for you:</FeaturesTitle>
            <FeaturesList>
              {role === "admin" && (
                <>
                  <li>• Complete project oversight</li>
                  <li>• Task assignment & approval</li>
                  <li>• Real-time progress tracking</li>
                </>
              )}
              {role === "contractor" && (
                <>
                  <li>• Task management dashboard</li>
                  <li>• Progress reporting tools</li>
                  <li>• Deadline notifications</li>
                </>
              )}
              {role === "builder" && (
                <>
                  <li>• Project creation tools</li>
                  <li>• Team coordination</li>
                  <li>• Progress analytics</li>
                </>
              )}
            </FeaturesList>
          </FeaturesCard>
        </FormContainer>
      </ContentContainer>
    </BackgroundContainer>
  );
}
