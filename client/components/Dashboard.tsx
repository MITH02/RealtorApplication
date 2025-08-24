/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface DashboardProps {
  role: "builder" | "contractor" | "admin";
  onLogout: () => void;
}

const containerStyle = css`
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #f9fafb;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const headerStyle = (bgColor: string) => css`
  background-color: ${bgColor};
  color: white;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const headerInnerStyle = css`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;

  @media (min-width: 640px) {
    padding: 0 24px;
  }

  @media (min-width: 1024px) {
    padding: 0 32px;
  }
`;

const headerContentStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const headerLeftStyle = css`
  display: flex;
  align-items: center;

  h1 {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }

  span {
    margin-left: 16px;
    padding: 4px 12px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
    font-size: 14px;
  }
`;

const logoutButtonStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  color: white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

const mainStyle = css`
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px;

  @media (min-width: 640px) {
    padding: 32px 24px;
  }

  @media (min-width: 1024px) {
    padding: 32px 32px;
  }
`;

const titleSectionStyle = css`
  margin-bottom: 32px;

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #111827;
    margin: 0 0 8px 0;

    @media (min-width: 640px) {
      font-size: 30px;
    }
  }

  p {
    color: #6b7280;
    margin: 0;
  }
`;

const statsGridStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const statCardStyle = css`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 24px;

  .content {
    display: flex;
    align-items: center;
  }

  .icon {
    font-size: 30px;
    margin-right: 16px;
  }

  .value {
    font-size: 24px;
    font-weight: bold;
    color: #111827;
    margin: 0 0 4px 0;
  }

  .label {
    color: #6b7280;
    font-size: 14px;
    margin: 0;
  }
`;

const cardsGridStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const cardStyle = css`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 24px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 16px 0;
  }
`;

const actionsStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const actionButtonStyle = (hoverBg: string) => css`
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    border-color: #d1d5db;
    background-color: ${hoverBg};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const activityStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const activityItemStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  .dot-container {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .content {
    flex: 1;
  }

  .title {
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    margin: 0 0 2px 0;
  }

  .time {
    font-size: 12px;
    color: #6b7280;
    margin: 0;
  }
`;

const infoCardStyle = css`
  margin-top: 32px;
  background-color: #eff6ff;
  border: 1px solid #dbeafe;
  border-radius: 12px;
  padding: 24px;

  .content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  svg {
    width: 24px;
    height: 24px;
    color: #2563eb;
    flex-shrink: 0;
    margin-top: 2px;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #1e3a8a;
    margin: 0 0 4px 0;
  }

  p {
    color: #1d4ed8;
    margin: 0;
    line-height: 1.5;
  }
`;

export default function Dashboard({ role, onLogout }: DashboardProps) {
  const roleColors = {
    builder: {
      primary: "#2563eb",
      accent: "#2563eb",
      bg: "#eff6ff",
    },
    contractor: {
      primary: "#ea580c",
      accent: "#ea580c",
      bg: "#fff7ed",
    },
    admin: {
      primary: "#9333ea",
      accent: "#9333ea",
      bg: "#faf5ff",
    },
  };

  const colors = roleColors[role];

  const getDashboardContent = () => {
    switch (role) {
      case "admin":
        return {
          title: "Admin Dashboard",
          stats: [
            { label: "Total Buildings", value: "12", icon: "🏢" },
            { label: "Active Contractors", value: "8", icon: "👷" },
            { label: "Pending Approvals", value: "5", icon: "⏳" },
            { label: "Overdue Tasks", value: "2", icon: "🚨" },
          ],
          actions: [
            "Create New Building",
            "Manage Contractors",
            "Review Task Approvals",
            "Generate Reports",
          ],
        };
      case "contractor":
        return {
          title: "Contractor Dashboard",
          stats: [
            { label: "Assigned Projects", value: "3", icon: "🏗️" },
            { label: "Completed Tasks", value: "15", icon: "✅" },
            { label: "Pending Tasks", value: "4", icon: "📋" },
            { label: "Days Until Deadline", value: "7", icon: "📅" },
          ],
          actions: [
            "View Current Tasks",
            "Mark Task Complete",
            "Upload Progress Photos",
            "Request Extension",
          ],
        };
      case "builder":
        return {
          title: "Builder Dashboard",
          stats: [
            { label: "Active Projects", value: "5", icon: "🏘️" },
            { label: "Total Contractors", value: "12", icon: "👥" },
            { label: "Completed Buildings", value: "23", icon: "🏆" },
            { label: "Project Progress", value: "78%", icon: "📊" },
          ],
          actions: [
            "Create New Project",
            "Monitor Progress",
            "Assign Contractors",
            "Review Reports",
          ],
        };
      default:
        return { title: "", stats: [], actions: [] };
    }
  };

  const content = getDashboardContent();

  return (
    <div css={containerStyle}>
      {/* Header */}
      <header css={headerStyle(colors.primary)}>
        <div css={headerInnerStyle}>
          <div css={headerContentStyle}>
            <div css={headerLeftStyle}>
              <h1>ConstructPro</h1>
              <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
            </div>
            <button css={logoutButtonStyle} onClick={onLogout}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main css={mainStyle}>
        <div css={titleSectionStyle}>
          <h2>{content.title}</h2>
          <p>Welcome back! Here's what's happening with your projects.</p>
        </div>

        {/* Stats Grid */}
        <div css={statsGridStyle}>
          {content.stats.map((stat, index) => (
            <div key={index} css={statCardStyle}>
              <div className="content">
                <div className="icon">{stat.icon}</div>
                <div>
                  <p className="value">{stat.value}</p>
                  <p className="label">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div css={cardsGridStyle}>
          <div css={cardStyle}>
            <h3>Quick Actions</h3>
            <div css={actionsStyle}>
              {content.actions.map((action, index) => (
                <button key={index} css={actionButtonStyle(colors.bg)}>
                  <span>{action}</span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div css={cardStyle}>
            <h3>Recent Activity</h3>
            <div css={activityStyle}>
              <div css={activityItemStyle}>
                <div
                  className="dot-container"
                  style={{ backgroundColor: "#dcfce7" }}
                >
                  <div
                    className="dot"
                    style={{ backgroundColor: "#22c55e" }}
                  ></div>
                </div>
                <div className="content">
                  <p className="title">Task completed</p>
                  <p className="time">2 hours ago</p>
                </div>
              </div>
              <div css={activityItemStyle}>
                <div
                  className="dot-container"
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  <div
                    className="dot"
                    style={{ backgroundColor: "#3b82f6" }}
                  ></div>
                </div>
                <div className="content">
                  <p className="title">New assignment</p>
                  <p className="time">1 day ago</p>
                </div>
              </div>
              <div css={activityItemStyle}>
                <div
                  className="dot-container"
                  style={{ backgroundColor: "#fef3c7" }}
                >
                  <div
                    className="dot"
                    style={{ backgroundColor: "#eab308" }}
                  ></div>
                </div>
                <div className="content">
                  <p className="title">Deadline reminder</p>
                  <p className="time">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder message */}
        <div css={infoCardStyle}>
          <div className="content">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4>Dashboard Preview</h4>
              <p>
                This is a preview of your {role} dashboard. Full functionality
                including task management, project creation, and approval
                workflows will be implemented in the next phase.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
