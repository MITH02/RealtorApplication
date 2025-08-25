import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@/contexts/AuthContext";
import { Notification } from "@/types";
import apiService from "@/services/api";
import { keyframes } from "@emotion/react";

// Animations
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

// Styled Components
const NotificationToggle = styled.button<{ hasUnread: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.2s ease;
  color: hsl(215 16% 47%);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    color: hsl(215 20% 65%);

    &:hover {
      background: rgba(30, 41, 59, 1);
    }
  }

  ${(props) =>
    props.hasUnread &&
    `
    animation: ${pulse} 2s infinite;
  `}
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: hsl(0 84% 60%);
  color: white;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s infinite;
`;

const NotificationPanel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 400px;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .dark & {
    background: hsl(222 84% 4.9%);
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    width: 100vw;
  }
`;

const PanelHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid hsl(214 31% 91%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);

  .dark & {
    border-color: hsl(217 32% 17%);
    background: rgba(30, 41, 59, 0.95);
  }
`;

const PanelTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: hsl(222 84% 4.9%);
  margin: 0 0 0.5rem 0;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const PanelActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: hsl(217 91% 60%);
  color: white;

  &:hover {
    background: hsl(217 91% 55%);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(215 16% 47%);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.8);
    color: hsl(215 20% 65%);

    &:hover {
      background: rgba(30, 41, 59, 1);
    }
  }
`;

const NotificationsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const NotificationItem = styled.div<{ isRead: boolean }>`
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
  border-left: 3px solid hsl(217 91% 60%);
  background: ${(props) =>
    props.isRead ? "rgba(255, 255, 255, 0.5)" : "rgba(59, 130, 246, 0.1)"};
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  cursor: pointer;
  animation: ${slideIn} 0.3s ease-out;

  &:hover {
    background: rgba(59, 130, 246, 0.15);
    transform: translateX(-2px);
  }

  .dark & {
    background: ${(props) =>
      props.isRead ? "rgba(30, 41, 59, 0.5)" : "rgba(59, 130, 246, 0.2)"};

    &:hover {
      background: rgba(59, 130, 246, 0.25);
    }
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const NotificationTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  margin: 0;
  flex: 1;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const NotificationTime = styled.span`
  font-size: 0.75rem;
  color: hsl(215 16% 47%);
  white-space: nowrap;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const NotificationMessage = styled.p`
  font-size: 0.75rem;
  color: hsl(215 16% 47%);
  margin: 0;
  line-height: 1.4;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const SmallButton = styled.button<{ variant?: "primary" | "danger" }>`
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  font-size: 0.625rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === "primary" &&
    `
    background: hsl(217 91% 60%);
    color: white;
    
    &:hover {
      background: hsl(217 91% 55%);
    }
  `}

  ${(props) =>
    props.variant === "danger" &&
    `
    background: hsl(0 84% 60%);
    color: white;
    
    &:hover {
      background: hsl(0 84% 55%);
    }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: hsl(215 16% 47%);

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
`;

// Notification type icons
const getNotificationIcon = (type: string) => {
  switch (type) {
    case "TASK_ASSIGNED":
      return "📋";
    case "TASK_COMPLETED":
      return "✅";
    case "TASK_APPROVED":
      return "👍";
    case "TASK_REJECTED":
      return "❌";
    case "TASK_OVERDUE":
      return "🚨";
    case "DEADLINE_REMINDER":
      return "⏰";
    case "NEW_BUILDING_CREATED":
      return "🏗️";
    case "CONTRACTOR_ASSIGNED":
      return "👷";
    case "SYSTEM_UPDATE":
      return "🔔";
    case "APPROVAL_REQUEST":
      return "⏳";
    case "PROGRESS_UPDATE":
      return "📊";
    default:
      return "📢";
  }
};

const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
};

interface NotificationsSystemProps {
  className?: string;
}

export default function NotificationsSystem({
  className,
}: NotificationsSystemProps) {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = async () => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      const [notificationsData, unreadCountData] = await Promise.all([
        apiService.getUserNotifications(),
        apiService.getUnreadNotificationCount(),
      ]);

      setNotifications(notificationsData);
      setUnreadCount(unreadCountData);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await apiService.markNotificationAsRead(notificationId);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                isRead: true,
                readAt: new Date().toISOString(),
              }
            : notification,
        ),
      );

      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await apiService.markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
          readAt: new Date().toISOString(),
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const handleDeleteNotification = async (notificationId: number) => {
    try {
      await apiService.deleteNotification(notificationId);

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId),
      );

      // Recalculate unread count
      const deletedNotification = notifications.find(
        (n) => n.id === notificationId,
      );
      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }

    // Navigate to related content if actionUrl is provided
    if (notification.actionUrl) {
      // You can implement navigation logic here
      console.log("Navigate to:", notification.actionUrl);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <NotificationToggle
        className={className}
        hasUnread={unreadCount > 0}
        onClick={() => setIsOpen(true)}
      >
        🔔
        {unreadCount > 0 && (
          <NotificationBadge>
            {unreadCount > 99 ? "99+" : unreadCount}
          </NotificationBadge>
        )}
      </NotificationToggle>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <NotificationPanel isOpen={isOpen}>
        <PanelHeader>
          <PanelTitle>Notifications</PanelTitle>
          <PanelActions>
            {unreadCount > 0 && (
              <ActionButton onClick={handleMarkAllAsRead}>
                Mark all read
              </ActionButton>
            )}
          </PanelActions>
          <CloseButton onClick={() => setIsOpen(false)}>✕</CloseButton>
        </PanelHeader>

        <NotificationsList>
          {isLoading ? (
            <EmptyState>Loading notifications...</EmptyState>
          ) : notifications.length === 0 ? (
            <EmptyState>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔔</div>
              <h3>No notifications</h3>
              <p>You're all caught up!</p>
            </EmptyState>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                isRead={notification.isRead}
                onClick={() => handleNotificationClick(notification)}
              >
                <NotificationHeader>
                  <NotificationTitle>
                    {getNotificationIcon(notification.type)}{" "}
                    {notification.title}
                  </NotificationTitle>
                  <NotificationTime>
                    {formatTimeAgo(notification.createdAt)}
                  </NotificationTime>
                </NotificationHeader>

                <NotificationMessage>
                  {notification.message}
                </NotificationMessage>

                <NotificationActions>
                  {!notification.isRead && (
                    <SmallButton
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                    >
                      Mark as read
                    </SmallButton>
                  )}
                  <SmallButton
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNotification(notification.id);
                    }}
                  >
                    Delete
                  </SmallButton>
                </NotificationActions>
              </NotificationItem>
            ))
          )}
        </NotificationsList>
      </NotificationPanel>
    </>
  );
}
