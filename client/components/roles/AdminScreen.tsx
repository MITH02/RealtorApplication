/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface AdminScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onBack: () => void;
}

const containerStyle = css`
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #faf5ff;
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
  color: #9333ea;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 8px;
  background-color: #e9d5ff;
  
  &:active {
    color: #7c3aed;
    background-color: #ddd6fe;
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  border: 1px solid #e9d5ff;
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
  background-color: #9333ea;
`;

const imageStyle = css`
  width: 100%;
  height: 192px;
  object-fit: cover;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
  color: #7c3aed;
  margin-bottom: 8px;
  margin: 0 0 8px 0;
  
  @media (min-width: 640px) {
    font-size: 30px;
  }
`;

const subtitleStyle = css`
  color: #9333ea;
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #e9d5ff;
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
      color: #a855f7;
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
  background-color: #9333ea;
  color: white;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: none;
  cursor: pointer;
  transform: scale(1);
  
  &:active {
    background-color: #7c3aed;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: scale(0.95);
  }
`;

const secondaryButtonStyle = css`
  width: 100%;
  background-color: #ffffff;
  color: #9333ea;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  border: 2px solid #e9d5ff;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(1);
  
  &:active {
    border-color: #ddd6fe;
    background-color: #faf5ff;
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

export default function AdminScreen({
  onLogin,
  onSignup,
  onBack,
}: AdminScreenProps) {
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
              src="https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2Fef4d01b439c041bc9a1546a4ea50eb7f?format=webp&width=800"
              alt="Admin"
              css={imageStyle}
            />
          </div>

          <h1 css={titleStyle}>Admin Portal</h1>
          <p css={subtitleStyle}>System administration and comprehensive management</p>
        </div>

        <div css={featuresCardStyle}>
          <h3 css={featuresHeaderStyle}>Admin Capabilities:</h3>
          <ul css={featuresListStyle}>
            <li>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Create and manage buildings</span>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Assign tasks to contractors</span>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Set deadlines and milestones</span>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Approve task completions</span>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Monitor project alerts and deadlines</span>
            </li>
            <li>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Generate comprehensive reports</span>
            </li>
          </ul>
        </div>

        <div css={buttonsContainerStyle}>
          <button css={primaryButtonStyle} onClick={onLogin}>
            Login to Admin Panel
          </button>

          <button css={secondaryButtonStyle} onClick={onSignup}>
            Request Admin Access
          </button>
        </div>

        <div css={footerTextStyle}>
          <p>Complete system control and project oversight</p>
        </div>
      </div>
    </div>
  );
}
