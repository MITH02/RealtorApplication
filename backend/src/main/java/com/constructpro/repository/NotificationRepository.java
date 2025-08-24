package com.constructpro.repository;

import com.constructpro.entity.Notification;
import com.constructpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    List<Notification> findByUser(User user);
    
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
    
    List<Notification> findByUserAndIsReadFalse(User user);
    
    List<Notification> findByType(Notification.NotificationType type);
    
    @Query("SELECT n FROM Notification n WHERE n.user = :user AND n.isRead = false ORDER BY n.createdAt DESC")
    List<Notification> findUnreadNotificationsByUser(@Param("user") User user);
    
    @Query("SELECT n FROM Notification n WHERE n.user = :user ORDER BY n.createdAt DESC LIMIT :limit")
    List<Notification> findRecentNotificationsByUser(@Param("user") User user, @Param("limit") int limit);
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.user = :user AND n.isRead = false")
    long countUnreadNotificationsByUser(@Param("user") User user);
    
    @Query("SELECT n FROM Notification n WHERE n.expiresAt IS NOT NULL AND n.expiresAt < :currentTime")
    List<Notification> findExpiredNotifications(@Param("currentTime") LocalDateTime currentTime);
    
    @Query("SELECT n FROM Notification n WHERE n.relatedTask.id = :taskId")
    List<Notification> findNotificationsByTask(@Param("taskId") Long taskId);
    
    @Query("SELECT n FROM Notification n WHERE n.relatedBuilding.id = :buildingId")
    List<Notification> findNotificationsByBuilding(@Param("buildingId") Long buildingId);
    
    @Query("SELECT n FROM Notification n WHERE n.type = :type AND n.createdAt >= :since")
    List<Notification> findNotificationsByTypeSince(
        @Param("type") Notification.NotificationType type, 
        @Param("since") LocalDateTime since
    );
    
    @Query("DELETE FROM Notification n WHERE n.isRead = true AND n.createdAt < :cutoffDate")
    void deleteOldReadNotifications(@Param("cutoffDate") LocalDateTime cutoffDate);
}
