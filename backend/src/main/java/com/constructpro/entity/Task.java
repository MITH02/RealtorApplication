package com.constructpro.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Task name is required")
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskType type;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status = TaskStatus.ASSIGNED;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority = Priority.MEDIUM;
    
    @Column(name = "estimated_duration_days")
    private Integer estimatedDurationDays;
    
    @Column(name = "actual_duration_days")
    private Integer actualDurationDays;
    
    @Column(name = "estimated_cost")
    private BigDecimal estimatedCost;
    
    @Column(name = "actual_cost")
    private BigDecimal actualCost;
    
    @NotNull(message = "Start date is required")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
    
    @NotNull(message = "Deadline is required")
    @Column(name = "deadline", nullable = false)
    private LocalDate deadline;
    
    @Column(name = "completion_date")
    private LocalDate completionDate;
    
    @Column(name = "approval_date")
    private LocalDate approvalDate;
    
    @Column(name = "progress_percentage")
    private Integer progressPercentage = 0;
    
    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;
    
    @Column(name = "completion_notes", columnDefinition = "TEXT")
    private String completionNotes;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_contractor_id", nullable = false)
    private User assignedContractor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private User createdBy;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by_user_id")
    private User approvedBy;
    
    // Dependencies - tasks that must be completed before this task can start
    @ManyToMany
    @JoinTable(
        name = "task_dependencies",
        joinColumns = @JoinColumn(name = "task_id"),
        inverseJoinColumns = @JoinColumn(name = "dependency_task_id")
    )
    private List<Task> dependencies = new ArrayList<>();
    
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TaskUpdate> taskUpdates = new ArrayList<>();
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Helper methods
    public boolean isOverdue() {
        return LocalDate.now().isAfter(deadline) && 
               status != TaskStatus.COMPLETED && 
               status != TaskStatus.APPROVED;
    }
    
    public long getDaysUntilDeadline() {
        return LocalDate.now().until(deadline).getDays();
    }
    
    public long getDaysOverdue() {
        if (!isOverdue()) {
            return 0;
        }
        return deadline.until(LocalDate.now()).getDays();
    }
    
    public boolean canStart() {
        return dependencies.stream()
                .allMatch(dep -> dep.getStatus() == TaskStatus.COMPLETED || 
                               dep.getStatus() == TaskStatus.APPROVED);
    }
    
    public enum TaskType {
        CIVIL_WORK,
        ELECTRICAL_WORK,
        PLUMBING_WORK,
        TILING,
        PAINTING,
        ROOFING,
        FLOORING,
        CARPENTRY,
        MASONRY,
        HVAC,
        LANDSCAPING,
        INSPECTION,
        CLEANUP,
        OTHER
    }
    
    public enum TaskStatus {
        ASSIGNED,      // Task assigned to contractor
        IN_PROGRESS,   // Contractor working on task
        COMPLETED,     // Contractor marked as completed, awaiting approval
        APPROVED,      // Admin approved the completion
        REJECTED,      // Admin rejected the completion
        ON_HOLD,       // Task temporarily paused
        CANCELLED      // Task cancelled
    }
    
    public enum Priority {
        LOW, MEDIUM, HIGH, URGENT
    }
}
