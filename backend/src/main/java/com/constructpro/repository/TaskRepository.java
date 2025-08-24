package com.constructpro.repository;

import com.constructpro.entity.Building;
import com.constructpro.entity.Task;
import com.constructpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    List<Task> findByAssignedContractor(User contractor);
    
    List<Task> findByBuilding(Building building);
    
    List<Task> findByStatus(Task.TaskStatus status);
    
    List<Task> findByCreatedBy(User createdBy);
    
    @Query("SELECT t FROM Task t WHERE t.assignedContractor = :contractor ORDER BY t.deadline ASC")
    List<Task> findTasksByContractorOrderByDeadline(@Param("contractor") User contractor);
    
    @Query("SELECT t FROM Task t WHERE t.building = :building ORDER BY t.startDate ASC")
    List<Task> findTasksByBuildingOrderByStartDate(@Param("building") Building building);
    
    @Query("SELECT t FROM Task t WHERE t.deadline < :currentDate AND t.status NOT IN ('COMPLETED', 'APPROVED', 'CANCELLED')")
    List<Task> findOverdueTasks(@Param("currentDate") LocalDate currentDate);
    
    @Query("SELECT t FROM Task t WHERE t.deadline BETWEEN :startDate AND :endDate")
    List<Task> findTasksWithDeadlineBetween(
        @Param("startDate") LocalDate startDate, 
        @Param("endDate") LocalDate endDate
    );
    
    @Query("SELECT t FROM Task t WHERE t.status = 'COMPLETED' AND t.approvedBy IS NULL")
    List<Task> findTasksPendingApproval();
    
    @Query("SELECT t FROM Task t WHERE t.assignedContractor = :contractor AND t.status = 'COMPLETED' AND t.approvedBy IS NULL")
    List<Task> findTasksPendingApprovalByContractor(@Param("contractor") User contractor);
    
    @Query("SELECT t FROM Task t WHERE t.building.createdBy = :admin OR t.building.projectManager = :admin")
    List<Task> findTasksByAdminUser(@Param("admin") User admin);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.status = :status")
    long countTasksByStatus(@Param("status") Task.TaskStatus status);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.assignedContractor = :contractor AND t.status = :status")
    long countTasksByContractorAndStatus(@Param("contractor") User contractor, @Param("status") Task.TaskStatus status);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.building = :building AND t.status = :status")
    long countTasksByBuildingAndStatus(@Param("building") Building building, @Param("status") Task.TaskStatus status);
    
    @Query("SELECT t FROM Task t WHERE t.type = :taskType AND t.status IN ('ASSIGNED', 'IN_PROGRESS')")
    List<Task> findActiveTasksByType(@Param("taskType") Task.TaskType taskType);
    
    @Query("SELECT t FROM Task t WHERE t.priority = 'URGENT' AND t.status NOT IN ('COMPLETED', 'APPROVED', 'CANCELLED') ORDER BY t.deadline ASC")
    List<Task> findUrgentActiveTasks();
    
    @Query("SELECT t FROM Task t JOIN t.dependencies d WHERE d.id = :dependencyTaskId")
    List<Task> findTasksByDependency(@Param("dependencyTaskId") Long dependencyTaskId);
    
    @Query("SELECT t FROM Task t WHERE t.assignedContractor = :contractor AND t.status IN ('ASSIGNED', 'IN_PROGRESS') ORDER BY t.deadline ASC")
    List<Task> findActiveTasksByContractor(@Param("contractor") User contractor);
    
    @Query("SELECT AVG(t.actualDurationDays) FROM Task t WHERE t.actualDurationDays IS NOT NULL AND t.type = :taskType")
    Double getAverageTaskDurationByType(@Param("taskType") Task.TaskType taskType);
}
