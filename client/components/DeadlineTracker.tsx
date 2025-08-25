import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@/contexts/AuthContext";
import { Task, Building, STATUS_COLORS } from "@/types";
import apiService from "@/services/api";
import { keyframes } from "@emotion/react";

// Animations
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const urgentBlink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

// Styled Components
const AlertContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  max-width: 600px;
  width: 90%;
  animation: ${slideIn} 0.3s ease-out;
`;

const AlertCard = styled.div<{
  severity: "low" | "medium" | "high" | "critical";
}>`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  ${(props) => {
    switch (props.severity) {
      case "critical":
        return `
          border-color: ${STATUS_COLORS.REJECTED};
          background: rgba(239, 68, 68, 0.1);
          animation: ${urgentBlink} 2s infinite;
        `;
      case "high":
        return `
          border-color: ${STATUS_COLORS.HIGH};
          background: rgba(249, 115, 22, 0.1);
          animation: ${pulse} 3s infinite;
        `;
      case "medium":
        return `
          border-color: ${STATUS_COLORS.MEDIUM};
          background: rgba(245, 158, 11, 0.1);
        `;
      default:
        return `
          border-color: ${STATUS_COLORS.LOW};
          background: rgba(16, 185, 129, 0.1);
        `;
    }
  }}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.95);
  }
`;

const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const AlertIcon = styled.span<{
  severity: "low" | "medium" | "high" | "critical";
}>`
  font-size: 1.25rem;
  margin-right: 0.5rem;

  ${(props) =>
    props.severity === "critical" &&
    `
    animation: ${pulse} 1s infinite;
  `}
`;

const AlertTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  margin: 0;
  flex: 1;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: hsl(215 16% 47%);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: hsl(222 84% 4.9%);
  }

  .dark & {
    color: hsl(215 20% 65%);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: hsl(210 40% 98%);
    }
  }
`;

const AlertContent = styled.div`
  font-size: 0.75rem;
  color: hsl(215 16% 47%);
  line-height: 1.4;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const AlertDetails = styled.div`
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.625rem;

  .dark & {
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const TaskLink = styled.button`
  background: none;
  border: none;
  color: hsl(217 91% 60%);
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
  padding: 0;

  &:hover {
    color: hsl(217 91% 50%);
  }
`;

const DeadlineWidget = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 300px;

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const WidgetTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  margin: 0 0 1rem 0;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const DeadlineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const DeadlineItem = styled.div<{
  urgency: "low" | "medium" | "high" | "critical";
}>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-left: 3px solid;
  transition: all 0.2s ease;

  ${(props) => {
    switch (props.urgency) {
      case "critical":
        return `
          border-color: ${STATUS_COLORS.REJECTED};
          background: rgba(239, 68, 68, 0.1);
        `;
      case "high":
        return `
          border-color: ${STATUS_COLORS.HIGH};
          background: rgba(249, 115, 22, 0.1);
        `;
      case "medium":
        return `
          border-color: ${STATUS_COLORS.MEDIUM};
          background: rgba(245, 158, 11, 0.1);
        `;
      default:
        return `
          border-color: ${STATUS_COLORS.LOW};
          background: rgba(16, 185, 129, 0.1);
        `;
    }
  }}

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.5);

    &:hover {
      background: rgba(30, 41, 59, 0.7);
    }
  }
`;

const DeadlineInfo = styled.div`
  flex: 1;
`;

const DeadlineTaskName = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: hsl(222 84% 4.9%);
  margin-bottom: 0.25rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const DeadlineDetails = styled.div`
  font-size: 0.75rem;
  color: hsl(215 16% 47%);

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const DeadlineCountdown = styled.div<{
  urgency: "low" | "medium" | "high" | "critical";
}>`
  text-align: right;
  font-weight: 600;
  font-size: 0.75rem;

  ${(props) => {
    switch (props.urgency) {
      case "critical":
        return `color: ${STATUS_COLORS.REJECTED};`;
      case "high":
        return `color: ${STATUS_COLORS.HIGH};`;
      case "medium":
        return `color: ${STATUS_COLORS.MEDIUM};`;
      default:
        return `color: ${STATUS_COLORS.LOW};`;
    }
  }}
`;

interface DeadlineAlert {
  id: string;
  type: "overdue" | "due_today" | "due_tomorrow" | "due_soon";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  message: string;
  task?: Task;
  building?: Building;
  daysOverdue?: number;
  daysUntilDue?: number;
}

interface DeadlineTrackerProps {
  showWidget?: boolean;
  showAlerts?: boolean;
  maxAlerts?: number;
  className?: string;
}

export default function DeadlineTracker({
  showWidget = false,
  showAlerts = true,
  maxAlerts = 3,
  className,
}: DeadlineTrackerProps) {
  const { isAuthenticated, userRole } = useAuth();
  const [alerts, setAlerts] = useState<DeadlineAlert[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<Task[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(
    new Set(),
  );

  const fetchDeadlineData = async () => {
    if (!isAuthenticated) return;

    try {
      let tasks: Task[] = [];

      if (userRole === "CONTRACTOR") {
        tasks = await apiService.getMyTasks();
      } else if (userRole === "BUILDER") {
        tasks = await apiService.getBuilderTasks();
      }

      // Generate alerts
      const newAlerts: DeadlineAlert[] = [];
      const upcoming: Task[] = [];

      tasks.forEach((task) => {
        if (task.status === "COMPLETED" || task.status === "APPROVED") return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const deadline = new Date(task.deadline);
        deadline.setHours(0, 0, 0, 0);

        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Overdue tasks
        if (diffDays < 0) {
          const daysOverdue = Math.abs(diffDays);
          newAlerts.push({
            id: `overdue-${task.id}`,
            type: "overdue",
            severity:
              daysOverdue > 7
                ? "critical"
                : daysOverdue > 3
                  ? "high"
                  : "medium",
            title: `⚠️ Task Overdue`,
            message: `${task.name} in ${task.building.name} is ${daysOverdue} day${daysOverdue > 1 ? "s" : ""} overdue`,
            task,
            daysOverdue,
          });
        }
        // Due today
        else if (diffDays === 0) {
          newAlerts.push({
            id: `due-today-${task.id}`,
            type: "due_today",
            severity: "high",
            title: `🚨 Due Today`,
            message: `${task.name} in ${task.building.name} is due today`,
            task,
            daysUntilDue: 0,
          });
        }
        // Due tomorrow
        else if (diffDays === 1) {
          newAlerts.push({
            id: `due-tomorrow-${task.id}`,
            type: "due_tomorrow",
            severity: "medium",
            title: `⏰ Due Tomorrow`,
            message: `${task.name} in ${task.building.name} is due tomorrow`,
            task,
            daysUntilDue: 1,
          });
        }
        // Due within 7 days
        else if (diffDays <= 7) {
          newAlerts.push({
            id: `due-soon-${task.id}`,
            type: "due_soon",
            severity: diffDays <= 3 ? "medium" : "low",
            title: `📅 Due Soon`,
            message: `${task.name} in ${task.building.name} is due in ${diffDays} days`,
            task,
            daysUntilDue: diffDays,
          });
        }

        // Add to upcoming deadlines (next 14 days)
        if (diffDays >= 0 && diffDays <= 14) {
          upcoming.push(task);
        }
      });

      // Sort alerts by severity and days
      newAlerts.sort((a, b) => {
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        const aSeverity = severityOrder[a.severity];
        const bSeverity = severityOrder[b.severity];

        if (aSeverity !== bSeverity) {
          return aSeverity - bSeverity;
        }

        // Sort by urgency within same severity
        if (a.daysOverdue !== undefined && b.daysOverdue !== undefined) {
          return b.daysOverdue - a.daysOverdue;
        }
        if (a.daysUntilDue !== undefined && b.daysUntilDue !== undefined) {
          return a.daysUntilDue - b.daysUntilDue;
        }

        return 0;
      });

      setAlerts(newAlerts);

      // Sort upcoming deadlines by deadline
      upcoming.sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
      );
      setUpcomingDeadlines(upcoming);
    } catch (error) {
      console.error("Failed to fetch deadline data:", error);
    }
  };

  useEffect(() => {
    fetchDeadlineData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchDeadlineData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, userRole]);

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => new Set(prev.add(alertId)));
  };

  const getUrgencyLevel = (
    task: Task,
  ): "low" | "medium" | "high" | "critical" => {
    const today = new Date();
    const deadline = new Date(task.deadline);
    const diffDays = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays < 0) return "critical"; // Overdue
    if (diffDays === 0) return "high"; // Due today
    if (diffDays <= 2) return "medium"; // Due within 2 days
    return "low"; // Due later
  };

  const formatDeadlineCountdown = (task: Task): string => {
    const today = new Date();
    const deadline = new Date(task.deadline);
    const diffDays = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays < 0) {
      const overdue = Math.abs(diffDays);
      return `${overdue} day${overdue > 1 ? "s" : ""} overdue`;
    } else if (diffDays === 0) {
      return "Due today";
    } else if (diffDays === 1) {
      return "Due tomorrow";
    } else {
      return `${diffDays} days left`;
    }
  };

  const getAlertIcon = (type: string): string => {
    switch (type) {
      case "overdue":
        return "⚠️";
      case "due_today":
        return "🚨";
      case "due_tomorrow":
        return "⏰";
      case "due_soon":
        return "📅";
      default:
        return "🔔";
    }
  };

  const visibleAlerts = alerts
    .filter((alert) => !dismissedAlerts.has(alert.id))
    .slice(0, maxAlerts);

  if (
    !isAuthenticated ||
    (userRole !== "CONTRACTOR" && userRole !== "BUILDER")
  ) {
    return null;
  }

  return (
    <div className={className}>
      {/* Alert Notifications */}
      {showAlerts && visibleAlerts.length > 0 && (
        <AlertContainer>
          {visibleAlerts.map((alert) => (
            <AlertCard key={alert.id} severity={alert.severity}>
              <AlertHeader>
                <AlertIcon severity={alert.severity}>
                  {getAlertIcon(alert.type)}
                </AlertIcon>
                <AlertTitle>{alert.title}</AlertTitle>
                <CloseButton onClick={() => dismissAlert(alert.id)}>
                  ✕
                </CloseButton>
              </AlertHeader>

              <AlertContent>
                {alert.message}

                {alert.task && (
                  <AlertDetails>
                    <strong>Task:</strong>{" "}
                    <TaskLink>{alert.task.name}</TaskLink>
                    <br />
                    <strong>Building:</strong> {alert.task.building.name}
                    <br />
                    <strong>Contractor:</strong>{" "}
                    {alert.task.assignedContractor.firstName}{" "}
                    {alert.task.assignedContractor.lastName}
                    <br />
                    <strong>Progress:</strong> {alert.task.progressPercentage}%
                  </AlertDetails>
                )}
              </AlertContent>
            </AlertCard>
          ))}
        </AlertContainer>
      )}

      {/* Deadline Widget */}
      {showWidget && (
        <DeadlineWidget>
          <WidgetTitle>📅 Upcoming Deadlines</WidgetTitle>

          {upcomingDeadlines.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "hsl(215 16% 47%)",
                fontSize: "0.875rem",
              }}
            >
              No upcoming deadlines
            </div>
          ) : (
            <DeadlineList>
              {upcomingDeadlines.slice(0, 5).map((task) => {
                const urgency = getUrgencyLevel(task);
                return (
                  <DeadlineItem key={task.id} urgency={urgency}>
                    <DeadlineInfo>
                      <DeadlineTaskName>{task.name}</DeadlineTaskName>
                      <DeadlineDetails>
                        {task.building.name} •{" "}
                        {task.assignedContractor.firstName}{" "}
                        {task.assignedContractor.lastName}
                      </DeadlineDetails>
                    </DeadlineInfo>
                    <DeadlineCountdown urgency={urgency}>
                      {formatDeadlineCountdown(task)}
                    </DeadlineCountdown>
                  </DeadlineItem>
                );
              })}
            </DeadlineList>
          )}
        </DeadlineWidget>
      )}
    </div>
  );
}
