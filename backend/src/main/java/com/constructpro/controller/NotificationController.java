package com.constructpro.controller;

import com.constructpro.dto.response.MessageResponse;
import com.constructpro.entity.Notification;
import com.constructpro.entity.User;
import com.constructpro.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class NotificationController {
    
    private final NotificationService notificationService;
    
    @GetMapping
    public ResponseEntity<List<Notification>> getUserNotifications(Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            List<Notification> notifications = notificationService.getUserNotifications(currentUser);
            
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            log.error("Error fetching notifications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            List<Notification> notifications = notificationService.getUnreadNotifications(currentUser);
            
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            log.error("Error fetching unread notifications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/unread/count")
    public ResponseEntity<Long> getUnreadNotificationCount(Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            long count = notificationService.getUnreadNotificationCount(currentUser);
            
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            log.error("Error fetching unread notification count", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PatchMapping("/{id}/read")
    public ResponseEntity<?> markNotificationAsRead(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            Notification notification = notificationService.markAsRead(id, currentUser);
            
            return ResponseEntity.ok(notification);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.notFound().build();
            } else if (e.getMessage().contains("Access denied")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("Error: " + e.getMessage()));
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
            }
        } catch (Exception e) {
            log.error("Error marking notification as read", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to mark notification as read"));
        }
    }
    
    @PatchMapping("/mark-all-read")
    public ResponseEntity<?> markAllNotificationsAsRead(Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            notificationService.markAllAsRead(currentUser);
            
            return ResponseEntity.ok(new MessageResponse("All notifications marked as read"));
        } catch (Exception e) {
            log.error("Error marking all notifications as read", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to mark all notifications as read"));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            notificationService.deleteNotification(id, currentUser);
            
            return ResponseEntity.ok(new MessageResponse("Notification deleted successfully"));
        } catch (RuntimeException e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.notFound().build();
            } else if (e.getMessage().contains("Access denied")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("Error: " + e.getMessage()));
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
            }
        } catch (Exception e) {
            log.error("Error deleting notification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to delete notification"));
        }
    }
}
