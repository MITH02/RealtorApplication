package com.constructpro.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "task_updates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class TaskUpdate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by_user_id", nullable = false)
    private User updatedBy;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UpdateType updateType;
    
    @NotBlank(message = "Update message is required")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;
    
    @Column(name = "progress_percentage")
    private Integer progressPercentage;
    
    @Column(name = "hours_worked")
    private Double hoursWorked;
    
    @ElementCollection
    @CollectionTable(name = "task_update_images", joinColumns = @JoinColumn(name = "task_update_id"))
    @Column(name = "image_url")
    private List<String> imageUrls = new ArrayList<>();
    
    @Column(name = "location_notes")
    private String locationNotes;
    
    @Column(name = "issues_encountered", columnDefinition = "TEXT")
    private String issuesEncountered;
    
    @Column(name = "next_steps", columnDefinition = "TEXT")
    private String nextSteps;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    // Constructor for easy creation
    public TaskUpdate(Task task, User updatedBy, UpdateType updateType, String message) {
        this.task = task;
        this.updatedBy = updatedBy;
        this.updateType = updateType;
        this.message = message;
    }
    
    public enum UpdateType {
        PROGRESS_UPDATE,
        STATUS_CHANGE,
        COMPLETION_REQUEST,
        ISSUE_REPORTED,
        IMAGE_UPLOAD,
        TIME_LOG,
        MILESTONE_COMPLETED,
        ADMIN_NOTE
    }
}
