package com.constructpro.service;

import com.constructpro.dto.request.TaskCreateRequest;
import com.constructpro.entity.Building;
import com.constructpro.entity.Task;
import com.constructpro.entity.TaskUpdate;
import com.constructpro.entity.User;
import com.constructpro.repository.BuildingRepository;
import com.constructpro.repository.TaskRepository;
import com.constructpro.repository.TaskUpdateRepository;
import com.constructpro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TaskService {
    
    private final TaskRepository taskRepository;
    private final BuildingRepository buildingRepository;
    private final UserRepository userRepository;
    private final TaskUpdateRepository taskUpdateRepository;
    private final NotificationService notificationService;
    
    public Task createTask(TaskCreateRequest request, User createdBy) {
        log.info("Creating new task: {} by user: {}", request.getName(), createdBy.getEmail());
        
        // Validate user role
        if (createdBy.getRole() != User.Role.BUILDER) {
            throw new IllegalArgumentException("Only builders can create tasks");
        }
        
        // Validate building
        Building building = buildingRepository.findById(request.getBuildingId())
            .orElseThrow(() -> new RuntimeException("Building not found"));
        
        // Validate building ownership
        if (!building.getCreatedBy().getId().equals(createdBy.getId())) {
            throw new IllegalArgumentException("You can only create tasks for buildings you created");
        }
        
        // Validate contractor
        User contractor = userRepository.findById(request.getContractorId())
            .orElseThrow(() -> new RuntimeException("Contractor not found"));
        
        if (contractor.getRole() != User.Role.CONTRACTOR) {
            throw new IllegalArgumentException("Assigned user must be a contractor");
        }
        
        // Create task
        Task task = new Task();
        task.setName(request.getName());
        task.setDescription(request.getDescription());
        task.setBuilding(building);
        task.setAssignedContractor(contractor);
        task.setCreatedBy(createdBy);
        
        // Set task type
        try {
            task.setType(Task.TaskType.valueOf(request.getType().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid task type: " + request.getType());
        }
        
        // Set priority
        try {
            task.setPriority(Task.Priority.valueOf(request.getPriority().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid priority: " + request.getPriority());
        }
        
        task.setEstimatedDurationDays(request.getEstimatedDurationDays());
        task.setEstimatedCost(request.getEstimatedCost());
        task.setStartDate(request.getStartDate());
        task.setDeadline(request.getDeadline());
        task.setStatus(Task.TaskStatus.ASSIGNED);
        task.setProgressPercentage(0);
        
        // Handle dependencies if provided
        if (request.getDependencyTaskIds() != null && request.getDependencyTaskIds().length > 0) {
            List<Long> dependencyIds = Arrays.stream(request.getDependencyTaskIds())
                .map(Long::valueOf)
                .collect(Collectors.toList());
            
            List<Task> dependencies = taskRepository.findAllById(dependencyIds);
            task.setDependencies(dependencies);
        }
        
        Task savedTask = taskRepository.save(task);
        
        // Create task assignment notification
        notificationService.createTaskAssignedNotification(savedTask);
        
        // Create initial task update
        TaskUpdate initialUpdate = new TaskUpdate(
            savedTask,
            createdBy,
            TaskUpdate.UpdateType.STATUS_CHANGE,
            "Task created and assigned to contractor"
        );
        taskUpdateRepository.save(initialUpdate);
        
        log.info("Task created successfully with ID: {}", savedTask.getId());
        return savedTask;
    }
    
    @Transactional(readOnly = true)
    public List<Task> getTasksByContractor(User contractor) {
        return taskRepository.findTasksByContractorOrderByDeadline(contractor);
    }
    
    @Transactional(readOnly = true)
    public List<Task> getActiveTasksByContractor(User contractor) {
        return taskRepository.findActiveTasksByContractor(contractor);
    }
    
    @Transactional(readOnly = true)
    public List<Task> getTasksByBuilding(Building building) {
        return taskRepository.findTasksByBuildingOrderByStartDate(building);
    }
    
    @Transactional(readOnly = true)
    public List<Task> getTasksByBuilderUser(User builder) {
        return taskRepository.findTasksByBuilderUser(builder);
    }
    
    @Transactional(readOnly = true)
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
    
    @Transactional(readOnly = true)
    public List<Task> getOverdueTasks() {
        return taskRepository.findOverdueTasks(LocalDate.now());
    }
    
    @Transactional(readOnly = true)
    public List<Task> getTasksPendingApproval() {
        return taskRepository.findTasksPendingApproval();
    }
    
    @Transactional(readOnly = true)
    public List<Task> getTasksPendingApprovalByContractor(User contractor) {
        return taskRepository.findTasksPendingApprovalByContractor(contractor);
    }
    
    public Task updateTaskProgress(Long taskId, int progressPercentage, String notes, User updatedBy) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        // Validate user role
        if (updatedBy.getRole() != User.Role.CONTRACTOR) {
            throw new IllegalArgumentException("Only contractors can update task progress");
        }
        
        // Verify contractor ownership
        if (!task.getAssignedContractor().getId().equals(updatedBy.getId())) {
            throw new RuntimeException("Access denied: You can only update your own tasks");
        }
        
        // Validate progress percentage
        if (progressPercentage < 0 || progressPercentage > 100) {
            throw new IllegalArgumentException("Progress percentage must be between 0 and 100");
        }
        
        int oldProgress = task.getProgressPercentage();
        task.setProgressPercentage(progressPercentage);
        
        // Update status based on progress
        if (progressPercentage > 0 && task.getStatus() == Task.TaskStatus.ASSIGNED) {
            task.setStatus(Task.TaskStatus.IN_PROGRESS);
        }
        
        Task savedTask = taskRepository.save(task);
        
        // Create progress update
        TaskUpdate progressUpdate = new TaskUpdate(
            savedTask,
            updatedBy,
            TaskUpdate.UpdateType.PROGRESS_UPDATE,
            notes != null ? notes : String.format("Progress updated from %d%% to %d%%", oldProgress, progressPercentage)
        );
        progressUpdate.setProgressPercentage(progressPercentage);
        taskUpdateRepository.save(progressUpdate);
        
        log.info("Task {} progress updated to {}% by user {}", taskId, progressPercentage, updatedBy.getEmail());
        return savedTask;
    }
    
    public Task markTaskAsCompleted(Long taskId, String completionNotes, User contractor) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        // Validate user role
        if (contractor.getRole() != User.Role.CONTRACTOR) {
            throw new IllegalArgumentException("Only contractors can mark tasks as completed");
        }
        
        // Verify contractor ownership
        if (!task.getAssignedContractor().getId().equals(contractor.getId())) {
            throw new RuntimeException("Access denied: You can only complete your own tasks");
        }
        
        // Verify task is in progress
        if (task.getStatus() != Task.TaskStatus.IN_PROGRESS && task.getStatus() != Task.TaskStatus.ASSIGNED) {
            throw new IllegalStateException("Task must be in progress to mark as completed");
        }
        
        // Update task
        task.setStatus(Task.TaskStatus.COMPLETED);
        task.setProgressPercentage(100);
        task.setCompletionDate(LocalDate.now());
        task.setCompletionNotes(completionNotes);
        
        // Calculate actual duration
        if (task.getStartDate() != null) {
            long actualDuration = task.getStartDate().until(LocalDate.now()).getDays();
            task.setActualDurationDays((int) actualDuration);
        }
        
        Task savedTask = taskRepository.save(task);
        
        // Create completion update
        TaskUpdate completionUpdate = new TaskUpdate(
            savedTask,
            contractor,
            TaskUpdate.UpdateType.COMPLETION_REQUEST,
            completionNotes != null ? completionNotes : "Task marked as completed, awaiting approval"
        );
        taskUpdateRepository.save(completionUpdate);
        
        // Create notification for admin
        notificationService.createTaskCompletedNotification(savedTask);
        
        log.info("Task {} marked as completed by contractor {}", taskId, contractor.getEmail());
        return savedTask;
    }
    
    public Task approveTask(Long taskId, User admin) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        // Validate user role
        if (admin.getRole() != User.Role.BUILDER) {
            throw new IllegalArgumentException("Only builders can approve tasks");
        }
        
        // Verify building ownership
        if (!task.getBuilding().getCreatedBy().getId().equals(admin.getId())) {
            throw new IllegalArgumentException("You can only approve tasks for buildings you created");
        }
        
        // Verify task is completed
        if (task.getStatus() != Task.TaskStatus.COMPLETED) {
            throw new IllegalStateException("Task must be completed to approve");
        }
        
        // Update task
        task.setStatus(Task.TaskStatus.APPROVED);
        task.setApprovedBy(admin);
        task.setApprovalDate(LocalDate.now());
        
        Task savedTask = taskRepository.save(task);
        
        // Create approval update
        TaskUpdate approvalUpdate = new TaskUpdate(
            savedTask,
            admin,
            TaskUpdate.UpdateType.STATUS_CHANGE,
            "Task approved by admin"
        );
        taskUpdateRepository.save(approvalUpdate);
        
        // Create notification for contractor
        notificationService.createTaskApprovedNotification(savedTask);
        
        log.info("Task {} approved by admin {}", taskId, admin.getEmail());
        return savedTask;
    }
    
    public Task rejectTask(Long taskId, String rejectionReason, User admin) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        // Validate user role
        if (admin.getRole() != User.Role.BUILDER) {
            throw new IllegalArgumentException("Only builders can reject tasks");
        }
        
        // Verify building ownership
        if (!task.getBuilding().getCreatedBy().getId().equals(admin.getId())) {
            throw new IllegalArgumentException("You can only reject tasks for buildings you created");
        }
        
        // Verify task is completed
        if (task.getStatus() != Task.TaskStatus.COMPLETED) {
            throw new IllegalStateException("Task must be completed to reject");
        }
        
        if (rejectionReason == null || rejectionReason.trim().isEmpty()) {
            throw new IllegalArgumentException("Rejection reason is required");
        }
        
        // Update task
        task.setStatus(Task.TaskStatus.REJECTED);
        task.setApprovedBy(admin);
        task.setRejectionReason(rejectionReason);
        task.setApprovalDate(LocalDate.now());
        task.setProgressPercentage(90); // Reset progress slightly to indicate rework needed
        
        Task savedTask = taskRepository.save(task);
        
        // Create rejection update
        TaskUpdate rejectionUpdate = new TaskUpdate(
            savedTask,
            admin,
            TaskUpdate.UpdateType.STATUS_CHANGE,
            "Task rejected: " + rejectionReason
        );
        taskUpdateRepository.save(rejectionUpdate);
        
        // Create notification for contractor
        notificationService.createTaskRejectedNotification(savedTask);
        
        log.info("Task {} rejected by admin {} with reason: {}", taskId, admin.getEmail(), rejectionReason);
        return savedTask;
    }
    
    public Task updateTaskStatus(Long taskId, Task.TaskStatus status, User updatedBy) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        // Validate user role
        if (updatedBy.getRole() != User.Role.CONTRACTOR) {
            throw new IllegalArgumentException("Only contractors can update task status");
        }
        
        // Verify contractor ownership
        if (!task.getAssignedContractor().getId().equals(updatedBy.getId())) {
            throw new IllegalArgumentException("You can only update your own tasks");
        }
        
        Task.TaskStatus oldStatus = task.getStatus();
        task.setStatus(status);
        
        if (status == Task.TaskStatus.IN_PROGRESS && task.getProgressPercentage() == 0) {
            task.setProgressPercentage(10);
        }
        
        Task savedTask = taskRepository.save(task);
        
        // Create status update
        TaskUpdate statusUpdate = new TaskUpdate(
            savedTask,
            updatedBy,
            TaskUpdate.UpdateType.STATUS_CHANGE,
            String.format("Status changed from %s to %s", oldStatus, status)
        );
        taskUpdateRepository.save(statusUpdate);
        
        log.info("Task {} status updated from {} to {} by user {}", 
            taskId, oldStatus, status, updatedBy.getEmail());
        
        return savedTask;
    }
    
    public TaskUpdate addTaskUpdate(Long taskId, String message, TaskUpdate.UpdateType updateType, 
                                  User updatedBy, List<String> imageUrls) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        // Validate user role and access
        if (updatedBy.getRole() == User.Role.CONTRACTOR) {
            // Contractors can only update their own tasks
            if (!task.getAssignedContractor().getId().equals(updatedBy.getId())) {
                throw new IllegalArgumentException("You can only add updates to your own tasks");
            }
        } else if (updatedBy.getRole() == User.Role.BUILDER) {
            // Builders can only update tasks for buildings they created
            if (!task.getBuilding().getCreatedBy().getId().equals(updatedBy.getId())) {
                throw new IllegalArgumentException("You can only add updates to tasks for buildings you created");
            }
        } else {
            throw new IllegalArgumentException("Only builders and contractors can add task updates");
        }
        
        TaskUpdate taskUpdate = new TaskUpdate(task, updatedBy, updateType, message);
        
        if (imageUrls != null && !imageUrls.isEmpty()) {
            taskUpdate.setImageUrls(imageUrls);
        }
        
        TaskUpdate savedUpdate = taskUpdateRepository.save(taskUpdate);
        
        log.info("Task update added for task {} by user {}", taskId, updatedBy.getEmail());
        return savedUpdate;
    }
    
    @Transactional(readOnly = true)
    public List<TaskUpdate> getTaskUpdates(Long taskId, User requestingUser) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        // Validate user access
        if (requestingUser.getRole() == User.Role.CONTRACTOR) {
            // Contractors can only view updates for their own tasks
            if (!task.getAssignedContractor().getId().equals(requestingUser.getId())) {
                throw new IllegalArgumentException("You can only view updates for your own tasks");
            }
        } else if (requestingUser.getRole() == User.Role.BUILDER) {
            // Builders can only view updates for tasks in buildings they created
            if (!task.getBuilding().getCreatedBy().getId().equals(requestingUser.getId())) {
                throw new IllegalArgumentException("You can only view updates for tasks in buildings you created");
            }
        } else if (requestingUser.getRole() != User.Role.ADMIN) {
            throw new IllegalArgumentException("Access denied");
        }
        
        return taskUpdateRepository.findTaskUpdatesOrderByCreatedAtDesc(task);
    }
    
    @Transactional(readOnly = true)
    public long getTaskCountByStatus(Task.TaskStatus status) {
        return taskRepository.countTasksByStatus(status);
    }
    
    @Transactional(readOnly = true)
    public long getTaskCountByContractorAndStatus(User contractor, Task.TaskStatus status) {
        return taskRepository.countTasksByContractorAndStatus(contractor, status);
    }
    
    public void deleteTask(Long taskId, User deletedBy) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        // Validate user role
        if (deletedBy.getRole() != User.Role.BUILDER) {
            throw new IllegalArgumentException("Only builders can delete tasks");
        }
        
        // Verify building ownership
        if (!task.getBuilding().getCreatedBy().getId().equals(deletedBy.getId())) {
            throw new IllegalArgumentException("You can only delete tasks for buildings you created");
        }
        
        if (task.getStatus() == Task.TaskStatus.IN_PROGRESS || task.getStatus() == Task.TaskStatus.COMPLETED) {
            throw new IllegalStateException("Cannot delete task that is in progress or completed");
        }
        
        taskRepository.delete(task);
        
        log.info("Task {} deleted by user {}", taskId, deletedBy.getEmail());
    }
}
