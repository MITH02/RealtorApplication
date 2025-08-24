/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ContractorScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onBack: () => void;
}

const containerStyle = css`
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #fff7ed;
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

const backButtonStyle = css`
  display: flex;
  align-items: center;
  color: #ea580c;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 8px;
  background-color: #fed7aa;

  &:active {
    color: #c2410c;
    background-color: #fdba74;
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
  padding: 0 16px 32px;
`;

const cardContainerStyle = css`
  text-align: center;
  margin-bottom: 24px;
`;

const imageCardStyle = css`
  background-color: #ffffff;
  border-radius: 24px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  border: 1px solid #fed7aa;
  position: relative;
  overflow: hidden;
  max-width: 288px;
  margin-left: auto;
  margin-right: auto;
`;

const accentBarStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background-color: #ea580c;
`;

const imageStyle = css`
  width: 100%;
  height: 192px;
  object-fit: cover;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
  color: #c2410c;
  margin-bottom: 8px;
  margin: 0 0 8px 0;

  @media (min-width: 640px) {
    font-size: 30px;
  }
`;

const subtitleStyle = css`
  color: #ea580c;
  font-size: 14px;
  padding: 0 16px;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 16px;
  }
`;

const featuresCardStyle = css`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #fed7aa;
  max-width: 384px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const featuresHeaderStyle = css`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 16px;
  margin: 0 0 16px 0;
`;

const featuresListStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: flex-start;
    color: #374151;
    font-size: 14px;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    svg {
      width: 16px;
      height: 16px;
      color: #f97316;
      margin-right: 12px;
      margin-top: 2px;
      flex-shrink: 0;
    }

    span {
      line-height: 1.4;
    }
  }
`;

const buttonsContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 384px;
  margin: 0 auto;
  width: 100%;
`;

const primaryButtonStyle = css`
  width: 100%;
  background-color: #ea580c;
  color: white;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: none;
  cursor: pointer;
  transform: scale(1);

  &:active {
    background-color: #c2410c;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: scale(0.95);
  }
`;

const secondaryButtonStyle = css`
  width: 100%;
  background-color: #ffffff;
  color: #ea580c;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  border: 2px solid #fed7aa;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(1);

  &:active {
    border-color: #fdba74;
    background-color: #fff7ed;
    transform: scale(0.95);
  }
`;

const footerTextStyle = css`
  margin-top: 24px;
  text-align: center;
  padding: 0 16px;

  p {
    font-size: 12px;
    color: #6b7280;
    margin: 0;
  }
`;

export default function ContractorScreen({
  onLogin,
  onSignup,
  onBack,
}: ContractorScreenProps) {
  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <button css={backButtonStyle} onClick={onBack}>
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
        <div css={cardContainerStyle}>
          <div css={imageCardStyle}>
            <div css={accentBarStyle}></div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F49e829fd851d42a691685962b579ec5a?format=webp&width=800"
              alt="Contractor"
              css={imageStyle}
            />
          </div>

          <h1 css={titleStyle}>Contractor Portal</h1>
          <p css={subtitleStyle}>
            Manage your assigned tasks and track project progress
          </p>
        </div>

        <div css={featuresCardStyle}>
          <h3 css={featuresHeaderStyle}>What you can do:</h3>
          <ul css={featuresListStyle}>
            <li>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>View assigned building projects</span>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Track task deadlines and progress</span>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Mark tasks as completed</span>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Upload progress photos and reports</span>
            </li>
          </ul>
        </div>

        <div css={buttonsContainerStyle}>
          <button css={primaryButtonStyle} onClick={onLogin}>
            Login to Dashboard
          </button>

          <button css={secondaryButtonStyle} onClick={onSignup}>
            Create Contractor Account
          </button>
        </div>

        <div css={footerTextStyle}>
          <p>Need help? Contact your project administrator</p>
        </div>
      </div>
    </div>
  );
}
