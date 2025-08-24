package com.constructpro.service;

import com.constructpro.entity.Building;
import com.constructpro.entity.Notification;
import com.constructpro.entity.Task;
import com.constructpro.entity.User;
import com.constructpro.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationService {
    
    private final NotificationRepository notificationRepository;
    
    public Notification createNotification(User user, String title, String message, 
                                         Notification.NotificationType type,
                                         Building relatedBuilding, Task relatedTask, User relatedUser) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRelatedBuilding(relatedBuilding);
        notification.setRelatedTask(relatedTask);
        notification.setRelatedUser(relatedUser);
        notification.setIsRead(false);
        
        Notification savedNotification = notificationRepository.save(notification);
        
        log.info("Notification created for user {} with type {}", user.getEmail(), type);
        return savedNotification;
    }
    
    public Notification createTaskAssignedNotification(Task task) {
        String title = "New Task Assigned";
        String message = String.format("You have been assigned a new task: %s for building %s. Deadline: %s", 
            task.getName(), task.getBuilding().getName(), task.getDeadline());
        
        return createNotification(
            task.getAssignedContractor(),
            title,
            message,
            Notification.NotificationType.TASK_ASSIGNED,
            task.getBuilding(),
            task,
            task.getCreatedBy()
        );
    }
    
    public Notification createTaskCompletedNotification(Task task) {
        String title = "Task Completion Request";
        String message = String.format("Contractor %s has marked task '%s' as completed and is requesting approval", 
            task.getAssignedContractor().getFullName(), task.getName());
        
        User adminToNotify = task.getBuilding().getProjectManager() != null ? 
            task.getBuilding().getProjectManager() : task.getBuilding().getCreatedBy();
        
        return createNotification(
            adminToNotify,
            title,
            message,
            Notification.NotificationType.APPROVAL_REQUEST,
            task.getBuilding(),
            task,
            task.getAssignedContractor()
        );
    }
    
    public Notification createTaskApprovedNotification(Task task) {
        String title = "Task Approved";
        String message = String.format("Your completed task '%s' has been approved by %s", 
            task.getName(), task.getApprovedBy().getFullName());
        
        return createNotification(
            task.getAssignedContractor(),
            title,
            message,
            Notification.NotificationType.TASK_APPROVED,
            task.getBuilding(),
            task,
            task.getApprovedBy()
        );
    }
    
    public Notification createTaskRejectedNotification(Task task) {
        String title = "Task Rejected";
        String message = String.format("Your completed task '%s' has been rejected. Reason: %s", 
            task.getName(), task.getRejectionReason());
        
        return createNotification(
            task.getAssignedContractor(),
            title,
            message,
            Notification.NotificationType.TASK_REJECTED,
            task.getBuilding(),
            task,
            task.getApprovedBy()
        );
    }
    
    public Notification createTaskOverdueNotification(Task task) {
        String title = "Task Overdue";
        String message = String.format("Task '%s' for building %s is overdue by %d days", 
            task.getName(), task.getBuilding().getName(), task.getDaysOverdue());
        
        return createNotification(
            task.getAssignedContractor(),
            title,
            message,
            Notification.NotificationType.TASK_OVERDUE,
            task.getBuilding(),
            task,
            null
        );
    }
    
    public Notification createDeadlineReminderNotification(Task task, int daysUntilDeadline) {
        String title = "Deadline Reminder";
        String message = String.format("Task '%s' is due in %d day(s). Please ensure timely completion.", 
            task.getName(), daysUntilDeadline);
        
        return createNotification(
            task.getAssignedContractor(),
            title,
            message,
            Notification.NotificationType.DEADLINE_REMINDER,
            task.getBuilding(),
            task,
            null
        );
    }
    
    @Transactional(readOnly = true)
    public List<Notification> getUserNotifications(User user) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }
    
    @Transactional(readOnly = true)
    public List<Notification> getUnreadNotifications(User user) {
        return notificationRepository.findUnreadNotificationsByUser(user);
    }
    
    @Transactional(readOnly = true)
    public long getUnreadNotificationCount(User user) {
        return notificationRepository.countUnreadNotificationsByUser(user);
    }
    
    public Notification markAsRead(Long notificationId, User user) {
        Notification notification = notificationRepository.findById(notificationId)
            .orElseThrow(() -> new RuntimeException("Notification not found"));
        
        if (!notification.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied: notification belongs to another user");
        }
        
        notification.markAsRead();
        return notificationRepository.save(notification);
    }
    
    public void markAllAsRead(User user) {
        List<Notification> unreadNotifications = notificationRepository.findUnreadNotificationsByUser(user);
        
        unreadNotifications.forEach(notification -> {
            notification.markAsRead();
        });
        
        notificationRepository.saveAll(unreadNotifications);
        log.info("Marked {} notifications as read for user {}", unreadNotifications.size(), user.getEmail());
    }
    
    public void deleteNotification(Long notificationId, User user) {
        Notification notification = notificationRepository.findById(notificationId)
            .orElseThrow(() -> new RuntimeException("Notification not found"));
        
        if (!notification.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied: notification belongs to another user");
        }
        
        notificationRepository.delete(notification);
    }
    
    public void cleanupExpiredNotifications() {
        List<Notification> expiredNotifications = notificationRepository.findExpiredNotifications(LocalDateTime.now());
        notificationRepository.deleteAll(expiredNotifications);
        
        log.info("Cleaned up {} expired notifications", expiredNotifications.size());
    }
    
    public void cleanupOldReadNotifications() {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(30); // Keep read notifications for 30 days
        notificationRepository.deleteOldReadNotifications(cutoffDate);
        
        log.info("Cleaned up old read notifications older than {}", cutoffDate);
    }
}
