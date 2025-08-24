/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface RoleSelectionProps {
  onRoleSelect: (role: "builder" | "contractor" | "admin") => void;
}

const containerStyle = css`
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const contentStyle = css`
  position: relative;
  z-index: 10;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const mainContentStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  padding-top: 32px;
`;

const headerStyle = css`
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: 32px;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 16px;
    font-family: serif;
    line-height: 1.2;
    margin: 0 0 16px 0;
  }

  p {
    font-size: 16px;
    color: #64748b;
    max-width: 320px;
    margin: 0 auto;
    line-height: 1.5;
    padding: 0 16px;
  }

  @media (min-width: 640px) {
    margin-bottom: 48px;

    h1 {
      font-size: 40px;
    }

    p {
      font-size: 18px;
    }
  }
`;

const rolesContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 384px;
  margin: 0 auto;
`;

const roleCardStyle = css`
  cursor: pointer;
  transform: scale(1);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const cardInnerStyle = css`
  background-color: #ffffff;
  border-radius: 24px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 24px;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:active {
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const accentBarStyle = (color: string) => css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background-color: ${color};
  border-radius: 24px 24px 0 0;
`;

const iconStyle = css`
  font-size: 48px;
  margin-bottom: 16px;
  text-align: center;
`;

const contentInnerStyle = css`
  text-align: center;

  h3 {
    font-size: 24px;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 12px;
    margin: 0 0 12px 0;
  }

  p {
    color: #64748b;
    margin-bottom: 24px;
    line-height: 1.5;
    font-size: 14px;
    margin: 0 0 24px 0;
  }
`;

const buttonStyle = (bgColor: string, hoverColor: string) => css`
  width: 100%;
  background-color: ${bgColor};
  color: white;
  font-weight: 600;
  padding: 14px 24px;
  border-radius: 16px;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    background-color: ${hoverColor};
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-left: 8px;
  }
`;

const footerStyle = css`
  position: relative;
  height: 96px;
  margin-top: 32px;

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F7910060006ba48d9830f12d508b80fdb?format=webp&width=800");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  @media (min-width: 640px) {
    height: 128px;
  }
`;

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const roles = [
    {
      id: "builder" as const,
      title: "Builder",
      description:
        "Manage building projects and oversee construction development",
      icon: "🏗️",
      color: "#2563eb",
      hoverColor: "#1d4ed8",
    },
    {
      id: "contractor" as const,
      title: "Contractor",
      description: "Execute tasks and report project progress efficiently",
      icon: "👷",
      color: "#ea580c",
      hoverColor: "#c2410c",
    },
    {
      id: "admin" as const,
      title: "Admin",
      description: "System administration and comprehensive user management",
      icon: "��️",
      color: "#9333ea",
      hoverColor: "#7c3aed",
    },
  ];

  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <div css={mainContentStyle}>
          <div css={headerStyle}>
            <h1>Welcome to ConstructPro</h1>
            <p>Choose your role to access your personalized dashboard</p>
          </div>

          <div css={rolesContainerStyle}>
            {roles.map((role) => (
              <div
                key={role.id}
                css={roleCardStyle}
                onClick={() => onRoleSelect(role.id)}
              >
                <div css={cardInnerStyle}>
                  <div css={accentBarStyle(role.color)}></div>

                  <div css={iconStyle}>{role.icon}</div>

                  <div css={contentInnerStyle}>
                    <h3>{role.title}</h3>
                    <p>{role.description}</p>

                    <button css={buttonStyle(role.color, role.hoverColor)}>
                      <span>
                        Select Role
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div css={footerStyle}>
          <div className="bg-image" />
        </div>
      </div>
    </div>
  );
}
