package com.constructpro.repository;

import com.constructpro.entity.Task;
import com.constructpro.entity.TaskUpdate;
import com.constructpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskUpdateRepository extends JpaRepository<TaskUpdate, Long> {
    
    List<TaskUpdate> findByTask(Task task);
    
    List<TaskUpdate> findByUpdatedBy(User updatedBy);
    
    List<TaskUpdate> findByTaskOrderByCreatedAtDesc(Task task);
    
    List<TaskUpdate> findByUpdateType(TaskUpdate.UpdateType updateType);
    
    @Query("SELECT tu FROM TaskUpdate tu WHERE tu.task = :task ORDER BY tu.createdAt DESC")
    List<TaskUpdate> findTaskUpdatesOrderByCreatedAtDesc(@Param("task") Task task);
    
    @Query("SELECT tu FROM TaskUpdate tu WHERE tu.updatedBy = :user ORDER BY tu.createdAt DESC")
    List<TaskUpdate> findUpdatesByUserOrderByCreatedAtDesc(@Param("user") User user);
    
    @Query("SELECT tu FROM TaskUpdate tu WHERE tu.task.assignedContractor = :contractor ORDER BY tu.createdAt DESC")
    List<TaskUpdate> findUpdatesByContractor(@Param("contractor") User contractor);
    
    @Query("SELECT tu FROM TaskUpdate tu WHERE tu.createdAt BETWEEN :startDate AND :endDate ORDER BY tu.createdAt DESC")
    List<TaskUpdate> findUpdatesBetweenDates(
        @Param("startDate") LocalDateTime startDate, 
        @Param("endDate") LocalDateTime endDate
    );
    
    @Query("SELECT tu FROM TaskUpdate tu WHERE tu.task.building.id = :buildingId ORDER BY tu.createdAt DESC")
    List<TaskUpdate> findUpdatesByBuilding(@Param("buildingId") Long buildingId);
    
    @Query("SELECT COUNT(tu) FROM TaskUpdate tu WHERE tu.task = :task AND tu.updateType = :updateType")
    long countUpdatesByTaskAndType(@Param("task") Task task, @Param("updateType") TaskUpdate.UpdateType updateType);
}
