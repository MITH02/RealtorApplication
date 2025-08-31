package com.constructpro.service;

import com.constructpro.dto.request.BuildingCreateRequest;
import com.constructpro.entity.Building;
import com.constructpro.entity.User;
import com.constructpro.repository.BuildingRepository;
import com.constructpro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BuildingService {
    
    private final BuildingRepository buildingRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    
    public Building createBuilding(BuildingCreateRequest request, User createdBy) {
        log.info("Creating new building: {} by user: {}", request.getName(), createdBy.getEmail());
        
        // Validate user role
        if (createdBy.getRole() != User.Role.BUILDER) {
            throw new IllegalArgumentException("Only builders can create buildings");
        }
        
        Building building = new Building();
        building.setName(request.getName());
        building.setDescription(request.getDescription());
        building.setAddress(request.getAddress());
        building.setCity(request.getCity());
        building.setState(request.getState());
        building.setPostalCode(request.getPostalCode());
        building.setCountry(request.getCountry());
        building.setCreatedBy(createdBy);
        
        // Set building type
        try {
            building.setType(Building.BuildingType.valueOf(request.getType().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid building type: " + request.getType());
        }
        
        building.setTotalFloors(request.getTotalFloors());
        building.setTotalArea(request.getTotalArea());
        building.setEstimatedBudget(request.getEstimatedBudget());
        building.setStartDate(request.getStartDate());
        building.setExpectedCompletionDate(request.getExpectedCompletionDate());
        
        // Set project manager if provided
        if (request.getProjectManagerId() != null) {
            User projectManager = userRepository.findById(request.getProjectManagerId())
                .orElseThrow(() -> new RuntimeException("Project manager not found"));
            
            if (projectManager.getRole() != User.Role.ADMIN) {
                throw new IllegalArgumentException("Project manager must be an admin user");
            }
            
            building.setProjectManager(projectManager);
        }
        
        building.setStatus(Building.ProjectStatus.PLANNING);
        
        Building savedBuilding = buildingRepository.save(building);
        
        // Send notification to project manager if assigned
        if (building.getProjectManager() != null) {
            notificationService.createNotification(
                building.getProjectManager(),
                "Building Created",
                "You have been assigned as project manager for: " + building.getName(),
                com.constructpro.entity.Notification.NotificationType.NEW_BUILDING_CREATED,
                savedBuilding,
                null,
                null
            );
        }
        
        log.info("Building created successfully with ID: {}", savedBuilding.getId());
        return savedBuilding;
    }
    
    @Transactional(readOnly = true)
    public List<Building> getAllBuildings() {
        return buildingRepository.findAllBuildingsOrderByCreatedAt();
    }
    
    @Transactional(readOnly = true)
    public List<Building> getBuildingsByUser(User user) {
        return buildingRepository.findBuildingsByUser(user);
    }
    
    @Transactional(readOnly = true)
    public Optional<Building> getBuildingById(Long id) {
        return buildingRepository.findById(id);
    }
    
    @Transactional(readOnly = true)
    public List<Building> getBuildingsByContractor(User contractor) {
        return buildingRepository.findBuildingsByContractor(contractor);
    }
    
    @Transactional(readOnly = true)
    public List<Building> getOverdueBuildings() {
        return buildingRepository.findOverdueBuildings(LocalDate.now());
    }
    
    @Transactional(readOnly = true)
    public List<Building> getActiveBuildingsOrderByDeadline() {
        return buildingRepository.findActiveBuildingsOrderByDeadline();
    }
    
    public Building updateBuildingStatus(Long buildingId, Building.ProjectStatus status, User updatedBy) {
        Building building = buildingRepository.findById(buildingId)
            .orElseThrow(() -> new RuntimeException("Building not found"));
        
        Building.ProjectStatus oldStatus = building.getStatus();
        building.setStatus(status);
        
        if (status == Building.ProjectStatus.COMPLETED) {
            building.setActualCompletionDate(LocalDate.now());
        }
        
        Building savedBuilding = buildingRepository.save(building);
        
        // Notify relevant users about status change
        String message = String.format("Building %s status changed from %s to %s", 
            building.getName(), oldStatus, status);
        
        // Notify project manager
        if (building.getProjectManager() != null) {
            notificationService.createNotification(
                building.getProjectManager(),
                "Building Status Updated",
                message,
                com.constructpro.entity.Notification.NotificationType.SYSTEM_UPDATE,
                savedBuilding,
                null,
                null
            );
        }
        
        log.info("Building {} status updated from {} to {} by user {}", 
            buildingId, oldStatus, status, updatedBy.getEmail());
        
        return savedBuilding;
    }
    
    public Building updateBuilding(Long buildingId, BuildingCreateRequest request, User updatedBy) {
        Building building = buildingRepository.findById(buildingId)
            .orElseThrow(() -> new RuntimeException("Building not found"));
        
        // Validate user role and ownership
        if (updatedBy.getRole() != User.Role.BUILDER) {
            throw new IllegalArgumentException("Only builders can update buildings");
        }
        
        if (!building.getCreatedBy().getId().equals(updatedBy.getId())) {
            throw new IllegalArgumentException("You can only update buildings you created");
        }
        
        // Update basic information
        building.setName(request.getName());
        building.setDescription(request.getDescription());
        building.setAddress(request.getAddress());
        building.setCity(request.getCity());
        building.setState(request.getState());
        building.setPostalCode(request.getPostalCode());
        building.setCountry(request.getCountry());
        
        // Update building type
        try {
            building.setType(Building.BuildingType.valueOf(request.getType().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid building type: " + request.getType());
        }
        
        building.setTotalFloors(request.getTotalFloors());
        building.setTotalArea(request.getTotalArea());
        building.setEstimatedBudget(request.getEstimatedBudget());
        building.setStartDate(request.getStartDate());
        building.setExpectedCompletionDate(request.getExpectedCompletionDate());
        
        // Update project manager if changed
        if (request.getProjectManagerId() != null) {
            User newProjectManager = userRepository.findById(request.getProjectManagerId())
                .orElseThrow(() -> new RuntimeException("Project manager not found"));
            
            if (newProjectManager.getRole() != User.Role.ADMIN) {
                throw new IllegalArgumentException("Project manager must be an admin user");
            }
            
            User oldProjectManager = building.getProjectManager();
            building.setProjectManager(newProjectManager);
            
            // Notify new project manager if changed
            if (oldProjectManager == null || !oldProjectManager.getId().equals(newProjectManager.getId())) {
                notificationService.createNotification(
                    newProjectManager,
                    "Project Manager Assignment",
                    "You have been assigned as project manager for: " + building.getName(),
                    com.constructpro.entity.Notification.NotificationType.SYSTEM_UPDATE,
                    building,
                    null,
                    null
                );
            }
        }
        
        Building savedBuilding = buildingRepository.save(building);
        
        log.info("Building {} updated by user {}", buildingId, updatedBy.getEmail());
        return savedBuilding;
    }
    
    public void deleteBuilding(Long buildingId, User deletedBy) {
        Building building = buildingRepository.findById(buildingId)
            .orElseThrow(() -> new RuntimeException("Building not found"));
        
        // Validate user role and ownership
        if (deletedBy.getRole() != User.Role.BUILDER) {
            throw new IllegalArgumentException("Only builders can delete buildings");
        }
        
        if (!building.getCreatedBy().getId().equals(deletedBy.getId())) {
            throw new IllegalArgumentException("You can only delete buildings you created");
        }
        
        // Check if building has active tasks
        if (!building.getTasks().isEmpty()) {
            throw new IllegalStateException("Cannot delete building with existing tasks");
        }
        
        buildingRepository.delete(building);
        
        log.info("Building {} deleted by user {}", buildingId, deletedBy.getEmail());
    }
    
    @Transactional(readOnly = true)
    public List<Building> searchBuildings(String searchTerm) {
        return buildingRepository.searchBuildings(searchTerm);
    }
    
    @Transactional(readOnly = true)
    public long getBuildingCountByStatus(Building.ProjectStatus status) {
        return buildingRepository.countBuildingsByStatus(status);
    }
}
