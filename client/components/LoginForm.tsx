/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

interface LoginFormProps {
  role: "builder" | "contractor" | "admin";
  onBack: () => void;
  onSuccess: () => void;
}

const containerStyle = (bgColor: string) => css`
  min-height: 100vh;
  min-height: 100dvh;
  background-color: ${bgColor};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
`;

const backButtonStyle = (color: string, bgColor: string) => css`
  display: flex;
  align-items: center;
  color: ${color};
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 8px;
  background-color: ${bgColor};

  &:active {
    opacity: 0.7;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  span {
    font-weight: 500;
  }
`;

const contentStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
`;

const logoSectionStyle = css`
  text-align: center;
  margin-bottom: 32px;
`;

const iconContainerStyle = (bgColor: string) => css`
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background-color: ${bgColor};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  span {
    font-size: 30px;
  }
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
  color: #374151;
  margin-bottom: 8px;
  margin: 0 0 8px 0;
`;

const subtitleStyle = css`
  color: #6b7280;
  font-size: 14px;
  margin: 0;
`;

const formContainerStyle = css`
  width: 100%;
  max-width: 384px;
`;

const formCardStyle = css`
  background-color: #ffffff;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 24px;
  border: 1px solid #f1f5f9;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const fieldStyle = css`
  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background-color: #f9fafb;
    font-size: 16px;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:focus {
      outline: none;
      ring: 2px solid #3b82f6;
      border-color: transparent;
      background-color: #ffffff;
    }

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

const checkboxRowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  label {
    display: flex;
    align-items: center;
    margin: 0;

    input {
      margin-right: 8px;
      border-radius: 4px;
      width: auto;
      padding: 0;
      background: none;
    }

    span {
      color: #6b7280;
    }
  }
`;

const forgotButtonStyle = (color: string) => css`
  color: ${color};
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const submitButtonStyle = (bgColor: string, hoverColor: string) => css`
  width: 100%;
  background-color: ${bgColor};
  color: white;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1);

  &:active {
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: scale(0.95);
    background-color: ${hoverColor};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const toggleSectionStyle = css`
  margin-top: 24px;
  text-align: center;

  p {
    color: #6b7280;
    font-size: 14px;
    margin: 0 0 4px 0;
  }
`;

const toggleButtonStyle = (color: string) => css`
  color: ${color};
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  margin-top: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const additionalInfoStyle = css`
  margin-top: 24px;
  text-align: center;

  p {
    font-size: 12px;
    color: #6b7280;
    padding: 0 16px;
    line-height: 1.5;
    margin: 0;
  }
`;

const previewCardStyle = (bgColor: string) => css`
  margin-top: 24px;
  background-color: ${bgColor};
  border-radius: 16px;
  padding: 16px;

  h4 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    margin: 0 0 8px 0;
  }

  ul {
    font-size: 12px;
    color: #6b7280;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 4px;

      &:last-child {
        margin-bottom: 0;
      }
    }
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
      color: "#2563eb",
      hoverColor: "#1d4ed8",
      bgColor: "#eff6ff",
      bgAccent: "#dbeafe",
      accent: "#2563eb",
      icon: "🏗️",
      title: "Builder Portal",
    },
    contractor: {
      color: "#ea580c",
      hoverColor: "#c2410c",
      bgColor: "#fff7ed",
      bgAccent: "#fed7aa",
      accent: "#ea580c",
      icon: "👷",
      title: "Contractor Portal",
    },
    admin: {
      color: "#9333ea",
      hoverColor: "#7c3aed",
      bgColor: "#faf5ff",
      bgAccent: "#e9d5ff",
      accent: "#9333ea",
      icon: "⚙️",
      title: "Admin Portal",
    },
  };

  const config = roleConfig[role];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div css={containerStyle(config.bgColor)}>
      <div css={headerStyle}>
        <button
          css={backButtonStyle(config.accent, config.bgAccent)}
          onClick={onBack}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </button>
      </div>

      <div css={contentStyle}>
        <div css={logoSectionStyle}>
          <div css={iconContainerStyle(config.color)}>
            <span>{config.icon}</span>
          </div>
          <h1 css={titleStyle}>
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h1>
          <p css={subtitleStyle}>
            {isLogin ? `Sign in to your ${role} account` : `Join as a ${role}`}
          </p>
        </div>

        <div css={formContainerStyle}>
          <div css={formCardStyle}>
            <form onSubmit={handleSubmit} css={formStyle}>
              {!isLogin && (
                <div css={fieldStyle}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div css={fieldStyle}>
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div css={fieldStyle}>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {isLogin && (
                <div css={checkboxRowStyle}>
                  <label>
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" css={forgotButtonStyle(config.accent)}>
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                css={submitButtonStyle(config.color, config.hoverColor)}
              >
                {isLoading ? (
                  <>
                    <svg fill="none" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        opacity="0.25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        opacity="0.75"
                      />
                    </svg>
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div css={toggleSectionStyle}>
              <p>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                css={toggleButtonStyle(config.accent)}
              >
                {isLogin ? "Create one now" : "Sign in instead"}
              </button>
            </div>
          </div>

          <div css={additionalInfoStyle}>
            <p>
              By continuing, you agree to our Terms of Service and Privacy
              Policy. Your data is secure and encrypted.
            </p>
          </div>

          <div css={previewCardStyle(config.bgAccent)}>
            <h4
              css={css`
                color: ${config.accent};
              `}
            >
              What's waiting for you:
            </h4>
            <ul>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
