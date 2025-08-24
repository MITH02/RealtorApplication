package com.constructpro.controller;

import com.constructpro.dto.request.TaskCreateRequest;
import com.constructpro.dto.response.MessageResponse;
import com.constructpro.entity.Building;
import com.constructpro.entity.Task;
import com.constructpro.entity.TaskUpdate;
import com.constructpro.entity.User;
import com.constructpro.service.BuildingService;
import com.constructpro.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class TaskController {
    
    private final TaskService taskService;
    private final BuildingService buildingService;
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> createTask(@Valid @RequestBody TaskCreateRequest request, 
                                      Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            Task task = taskService.createTask(request, currentUser);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(task);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error creating task", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to create task"));
        }
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('CONTRACTOR')")
    public ResponseEntity<?> getTaskById(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            
            Task task = taskService.getTaskById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
            
            // Check if contractor has access to this task
            if (currentUser.getRole() == User.Role.CONTRACTOR && 
                !task.getAssignedContractor().getId().equals(currentUser.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("Access denied: You can only view your own tasks"));
            }
            
            return ResponseEntity.ok(task);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching task", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to fetch task"));
        }
    }
    
    @GetMapping("/my-tasks")
    @PreAuthorize("hasRole('CONTRACTOR')")
    public ResponseEntity<List<Task>> getMyTasks(Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            List<Task> tasks = taskService.getTasksByContractor(currentUser);
            
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            log.error("Error fetching contractor tasks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/my-tasks/active")
    @PreAuthorize("hasRole('CONTRACTOR')")
    public ResponseEntity<List<Task>> getMyActiveTasks(Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            List<Task> tasks = taskService.getActiveTasksByContractor(currentUser);
            
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            log.error("Error fetching active contractor tasks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/building/{buildingId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Task>> getTasksByBuilding(@PathVariable Long buildingId) {
        try {
            Building building = buildingService.getBuildingById(buildingId)
                .orElseThrow(() -> new RuntimeException("Building not found"));
            
            List<Task> tasks = taskService.getTasksByBuilding(building);
            return ResponseEntity.ok(tasks);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching building tasks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Task>> getAdminTasks(Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            List<Task> tasks = taskService.getTasksByAdminUser(currentUser);
            
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            log.error("Error fetching admin tasks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/pending-approval")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Task>> getTasksPendingApproval() {
        try {
            List<Task> tasks = taskService.getTasksPendingApproval();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            log.error("Error fetching tasks pending approval", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/overdue")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Task>> getOverdueTasks() {
        try {
            List<Task> tasks = taskService.getOverdueTasks();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            log.error("Error fetching overdue tasks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PatchMapping("/{id}/progress")
    @PreAuthorize("hasRole('CONTRACTOR')")
    public ResponseEntity<?> updateTaskProgress(@PathVariable Long id, 
                                              @RequestBody Map<String, Object> request,
                                              Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            
            int progress = (Integer) request.get("progress");
            String notes = (String) request.get("notes");
            
            Task task = taskService.updateTaskProgress(id, progress, notes, currentUser);
            return ResponseEntity.ok(task);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error updating task progress", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to update task progress"));
        }
    }
    
    @PatchMapping("/{id}/complete")
    @PreAuthorize("hasRole('CONTRACTOR')")
    public ResponseEntity<?> markTaskAsCompleted(@PathVariable Long id, 
                                               @RequestBody Map<String, String> request,
                                               Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            String completionNotes = request.get("completionNotes");
            
            Task task = taskService.markTaskAsCompleted(id, completionNotes, currentUser);
            return ResponseEntity.ok(task);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error marking task as completed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to mark task as completed"));
        }
    }
    
    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> approveTask(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            Task task = taskService.approveTask(id, currentUser);
            
            return ResponseEntity.ok(task);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error approving task", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to approve task"));
        }
    }
    
    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> rejectTask(@PathVariable Long id, 
                                      @RequestBody Map<String, String> request,
                                      Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            String rejectionReason = request.get("rejectionReason");
            
            if (rejectionReason == null || rejectionReason.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Rejection reason is required"));
            }
            
            Task task = taskService.rejectTask(id, rejectionReason, currentUser);
            return ResponseEntity.ok(task);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error rejecting task", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to reject task"));
        }
    }
    
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateTaskStatus(@PathVariable Long id, 
                                            @RequestParam String status,
                                            Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            
            Task.TaskStatus taskStatus;
            try {
                taskStatus = Task.TaskStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid status value"));
            }
            
            Task task = taskService.updateTaskStatus(id, taskStatus, currentUser);
            return ResponseEntity.ok(task);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error updating task status", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to update task status"));
        }
    }
    
    @PostMapping("/{id}/updates")
    @PreAuthorize("hasRole('CONTRACTOR') or hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> addTaskUpdate(@PathVariable Long id, 
                                         @RequestBody Map<String, Object> request,
                                         Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            
            String message = (String) request.get("message");
            String updateTypeStr = (String) request.get("updateType");
            @SuppressWarnings("unchecked")
            List<String> imageUrls = (List<String>) request.get("imageUrls");
            
            TaskUpdate.UpdateType updateType = TaskUpdate.UpdateType.valueOf(updateTypeStr.toUpperCase());
            
            TaskUpdate taskUpdate = taskService.addTaskUpdate(id, message, updateType, currentUser, imageUrls);
            return ResponseEntity.status(HttpStatus.CREATED).body(taskUpdate);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error adding task update", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to add task update"));
        }
    }
    
    @GetMapping("/{id}/updates")
    @PreAuthorize("hasRole('CONTRACTOR') or hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getTaskUpdates(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            
            // Check task access for contractors
            if (currentUser.getRole() == User.Role.CONTRACTOR) {
                Task task = taskService.getTaskById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
                
                if (!task.getAssignedContractor().getId().equals(currentUser.getId())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Access denied: You can only view updates for your own tasks"));
                }
            }
            
            List<TaskUpdate> updates = taskService.getTaskUpdates(id);
            return ResponseEntity.ok(updates);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching task updates", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to fetch task updates"));
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            taskService.deleteTask(id, currentUser);
            
            return ResponseEntity.ok(new MessageResponse("Task deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error deleting task", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to delete task"));
        }
    }
    
    @GetMapping("/stats/count-by-status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getTaskCountByStatus(@RequestParam String status) {
        try {
            Task.TaskStatus taskStatus;
            try {
                taskStatus = Task.TaskStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid status value"));
            }
            
            long count = taskService.getTaskCountByStatus(taskStatus);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            log.error("Error fetching task count", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to fetch task count"));
        }
    }
}
