package com.constructpro.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
@Table(name = "buildings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Building {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Building name is required")
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotBlank(message = "Address is required")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "state")
    private String state;
    
    @Column(name = "postal_code")
    private String postalCode;
    
    @Column(name = "country")
    private String country;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BuildingType type;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status = ProjectStatus.PLANNING;
    
    @Column(name = "total_floors")
    private Integer totalFloors;
    
    @Column(name = "total_area")
    private BigDecimal totalArea;
    
    @Column(name = "estimated_budget")
    private BigDecimal estimatedBudget;
    
    @Column(name = "actual_cost")
    private BigDecimal actualCost;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "expected_completion_date")
    private LocalDate expectedCompletionDate;
    
    @Column(name = "actual_completion_date")
    private LocalDate actualCompletionDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private User createdBy;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_manager_id")
    private User projectManager;
    
    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Task> tasks = new ArrayList<>();
    
    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<BuildingContractor> buildingContractors = new ArrayList<>();
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Helper methods
    public int getCompletionPercentage() {
        if (tasks.isEmpty()) {
            return 0;
        }
        
        long completedTasks = tasks.stream()
                .filter(task -> task.getStatus() == Task.TaskStatus.COMPLETED)
                .count();
        
        return (int) ((completedTasks * 100.0) / tasks.size());
    }
    
    public boolean isOverdue() {
        return expectedCompletionDate != null && 
               LocalDate.now().isAfter(expectedCompletionDate) && 
               status != ProjectStatus.COMPLETED;
    }
    
    public long getOverdueTasks() {
        return tasks.stream()
                .filter(Task::isOverdue)
                .count();
    }
    
    public enum BuildingType {
        RESIDENTIAL, COMMERCIAL, INDUSTRIAL, MIXED_USE, INFRASTRUCTURE
    }
    
    public enum ProjectStatus {
        PLANNING, IN_PROGRESS, ON_HOLD, COMPLETED, CANCELLED
    }
}
