package com.constructpro.service;

import com.constructpro.entity.Task;
import com.constructpro.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DeadlineTrackingService {
    
    private final TaskRepository taskRepository;
    private final NotificationService notificationService;
    
    /**
     * Check for overdue tasks every hour and send notifications
     */
    @Scheduled(fixedRate = 3600000) // Every hour (3600000 ms)
    @Async
    public void checkOverdueTasks() {
        try {
            log.info("Starting overdue tasks check...");
            
            List<Task> overdueTasks = taskRepository.findOverdueTasks(LocalDate.now());
            
            for (Task task : overdueTasks) {
                // Only send notification for tasks that are currently overdue
                if (task.isOverdue()) {
                    notificationService.createTaskOverdueNotification(task);
                    log.info("Overdue notification sent for task: {} to contractor: {}", 
                        task.getName(), task.getAssignedContractor().getEmail());
                }
            }
            
            log.info("Overdue tasks check completed. Found {} overdue tasks.", overdueTasks.size());
            
        } catch (Exception e) {
            log.error("Error during overdue tasks check", e);
        }
    }
    
    /**
     * Send deadline reminders for tasks due within the next 3 days
     * Runs every day at 9 AM
     */
    @Scheduled(cron = "0 0 9 * * *") // Every day at 9:00 AM
    @Async
    public void sendDeadlineReminders() {
        try {
            log.info("Starting deadline reminders check...");
            
            LocalDate today = LocalDate.now();
            LocalDate threeDaysFromNow = today.plusDays(3);
            
            List<Task> upcomingTasks = taskRepository.findTasksWithDeadlineBetween(today, threeDaysFromNow);
            
            for (Task task : upcomingTasks) {
                // Only send reminders for active tasks
                if (task.getStatus() == Task.TaskStatus.ASSIGNED || 
                    task.getStatus() == Task.TaskStatus.IN_PROGRESS) {
                    
                    long daysUntilDeadline = task.getDaysUntilDeadline();
                    
                    // Send reminders for tasks due in 1, 2, or 3 days
                    if (daysUntilDeadline >= 1 && daysUntilDeadline <= 3) {
                        notificationService.createDeadlineReminderNotification(task, (int) daysUntilDeadline);
                        log.info("Deadline reminder sent for task: {} to contractor: {} ({} days remaining)", 
                            task.getName(), task.getAssignedContractor().getEmail(), daysUntilDeadline);
                    }
                }
            }
            
            log.info("Deadline reminders check completed. Processed {} upcoming tasks.", upcomingTasks.size());
            
        } catch (Exception e) {
            log.error("Error during deadline reminders check", e);
        }
    }
    
    /**
     * Send urgent deadline notifications for tasks due tomorrow
     * Runs every day at 6 PM
     */
    @Scheduled(cron = "0 0 18 * * *") // Every day at 6:00 PM
    @Async
    public void sendUrgentDeadlineReminders() {
        try {
            log.info("Starting urgent deadline reminders check...");
            
            LocalDate tomorrow = LocalDate.now().plusDays(1);
            
            List<Task> urgentTasks = taskRepository.findTasksWithDeadlineBetween(tomorrow, tomorrow);
            
            for (Task task : urgentTasks) {
                // Only send urgent reminders for active tasks
                if (task.getStatus() == Task.TaskStatus.ASSIGNED || 
                    task.getStatus() == Task.TaskStatus.IN_PROGRESS) {
                    
                    String title = "URGENT: Task Due Tomorrow";
                    String message = String.format("Task '%s' for building %s is due tomorrow! Please ensure completion.", 
                        task.getName(), task.getBuilding().getName());
                    
                    notificationService.createNotification(
                        task.getAssignedContractor(),
                        title,
                        message,
                        com.constructpro.entity.Notification.NotificationType.DEADLINE_REMINDER,
                        task.getBuilding(),
                        task,
                        null
                    );
                    
                    log.info("Urgent deadline reminder sent for task: {} to contractor: {}", 
                        task.getName(), task.getAssignedContractor().getEmail());
                }
            }
            
            log.info("Urgent deadline reminders check completed. Processed {} urgent tasks.", urgentTasks.size());
            
        } catch (Exception e) {
            log.error("Error during urgent deadline reminders check", e);
        }
    }
    
    /**
     * Clean up expired and old notifications
     * Runs every day at 2 AM
     */
    @Scheduled(cron = "0 0 2 * * *") // Every day at 2:00 AM
    @Async
    public void cleanupNotifications() {
        try {
            log.info("Starting notification cleanup...");
            
            notificationService.cleanupExpiredNotifications();
            notificationService.cleanupOldReadNotifications();
            
            log.info("Notification cleanup completed.");
            
        } catch (Exception e) {
            log.error("Error during notification cleanup", e);
        }
    }
    
    /**
     * Generate daily summary for admins about project status
     * Runs every day at 8 AM
     */
    @Scheduled(cron = "0 0 8 * * *") // Every day at 8:00 AM
    @Async
    public void generateDailySummary() {
        try {
            log.info("Starting daily summary generation...");
            
            // Get statistics
            long overdueTasks = taskRepository.countTasksByStatus(Task.TaskStatus.ASSIGNED) + 
                              taskRepository.countTasksByStatus(Task.TaskStatus.IN_PROGRESS);
            
            long pendingApprovals = taskRepository.countTasksByStatus(Task.TaskStatus.COMPLETED);
            
            long urgentTasks = taskRepository.findUrgentActiveTasks().size();
            
            if (overdueTasks > 0 || pendingApprovals > 0 || urgentTasks > 0) {
                // You can extend this to send summary notifications to admins
                log.info("Daily Summary - Overdue: {}, Pending Approvals: {}, Urgent: {}", 
                    overdueTasks, pendingApprovals, urgentTasks);
            }
            
            log.info("Daily summary generation completed.");
            
        } catch (Exception e) {
            log.error("Error during daily summary generation", e);
        }
    }
    
    /**
     * Manual method to trigger overdue checks (useful for testing)
     */
    public void triggerOverdueCheck() {
        checkOverdueTasks();
    }
    
    /**
     * Manual method to trigger deadline reminders (useful for testing)
     */
    public void triggerDeadlineReminders() {
        sendDeadlineReminders();
    }
}
