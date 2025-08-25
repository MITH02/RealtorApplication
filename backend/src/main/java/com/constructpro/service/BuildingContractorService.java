package com.constructpro.service;

import com.constructpro.entity.Building;
import com.constructpro.entity.BuildingContractor;
import com.constructpro.entity.Notification;
import com.constructpro.entity.User;
import com.constructpro.repository.BuildingContractorRepository;
import com.constructpro.repository.BuildingRepository;
import com.constructpro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BuildingContractorService {
    
    private final BuildingContractorRepository buildingContractorRepository;
    private final BuildingRepository buildingRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public BuildingContractor assignContractorToBuilding(Long buildingId, Long contractorId, 
                                                         User assignedBy, String roleInProject, String notes) {
        // Validate building exists and user has permission
        Building building = buildingRepository.findById(buildingId)
            .orElseThrow(() -> new RuntimeException("Building not found with id: " + buildingId));
        
        // Check if user can assign contractors to this building
        if (!building.getCreatedBy().equals(assignedBy) && 
            (building.getProjectManager() == null || !building.getProjectManager().equals(assignedBy)) &&
            !assignedBy.getRole().equals(User.Role.ADMIN)) {
            throw new RuntimeException("You don't have permission to assign contractors to this building");
        }
        
        // Validate contractor exists and has correct role
        User contractor = userRepository.findById(contractorId)
            .orElseThrow(() -> new RuntimeException("Contractor not found with id: " + contractorId));
        
        if (!contractor.getRole().equals(User.Role.CONTRACTOR)) {
            throw new RuntimeException("User is not a contractor");
        }
        
        if (!contractor.getIsActive()) {
            throw new RuntimeException("Contractor is not active");
        }
        
        // Check if contractor is already assigned to this building
        if (buildingContractorRepository.existsByBuildingAndContractorAndIsActiveTrue(building, contractor)) {
            throw new RuntimeException("Contractor is already assigned to this building");
        }
        
        // Create the assignment
        BuildingContractor assignment = new BuildingContractor(building, contractor, assignedBy);
        assignment.setRoleInProject(roleInProject);
        assignment.setNotes(notes);
        
        BuildingContractor savedAssignment = buildingContractorRepository.save(assignment);
        
        // Create notification for contractor
        notificationService.createNotification(
            contractor,
            "Assigned to New Building",
            String.format("You have been assigned to building: %s. Role: %s", 
                building.getName(), roleInProject != null ? roleInProject : "General Contractor"),
            Notification.NotificationType.CONTRACTOR_ASSIGNED,
            building,
            null,
            assignedBy
        );
        
        log.info("Contractor {} assigned to building {} by {}", 
            contractor.getEmail(), building.getName(), assignedBy.getEmail());
        
        return savedAssignment;
    }

    public void unassignContractorFromBuilding(Long buildingId, Long contractorId, User removedBy) {
        Building building = buildingRepository.findById(buildingId)
            .orElseThrow(() -> new RuntimeException("Building not found with id: " + buildingId));
        
        User contractor = userRepository.findById(contractorId)
            .orElseThrow(() -> new RuntimeException("Contractor not found with id: " + contractorId));
        
        // Check permission
        if (!building.getCreatedBy().equals(removedBy) && 
            (building.getProjectManager() == null || !building.getProjectManager().equals(removedBy)) &&
            !removedBy.getRole().equals(User.Role.ADMIN)) {
            throw new RuntimeException("You don't have permission to unassign contractors from this building");
        }
        
        BuildingContractor assignment = buildingContractorRepository
            .findByBuildingAndContractorAndIsActiveTrue(building, contractor)
            .orElseThrow(() -> new RuntimeException("Contractor is not assigned to this building"));
        
        assignment.deactivate();
        buildingContractorRepository.save(assignment);
        
        // Create notification for contractor
        notificationService.createNotification(
            contractor,
            "Removed from Building",
            String.format("You have been removed from building: %s", building.getName()),
            Notification.NotificationType.SYSTEM_UPDATE,
            building,
            null,
            removedBy
        );
        
        log.info("Contractor {} unassigned from building {} by {}", 
            contractor.getEmail(), building.getName(), removedBy.getEmail());
    }

    @Transactional(readOnly = true)
    public List<BuildingContractor> getBuildingContractors(Long buildingId) {
        Building building = buildingRepository.findById(buildingId)
            .orElseThrow(() -> new RuntimeException("Building not found with id: " + buildingId));
        
        return buildingContractorRepository.findByBuildingAndIsActiveTrue(building);
    }

    @Transactional(readOnly = true)
    public List<BuildingContractor> getContractorBuildings(Long contractorId) {
        User contractor = userRepository.findById(contractorId)
            .orElseThrow(() -> new RuntimeException("Contractor not found with id: " + contractorId));
        
        return buildingContractorRepository.findByContractorAndIsActiveTrue(contractor);
    }

    @Transactional(readOnly = true)
    public List<BuildingContractor> getAllBuildingContractors(Long buildingId) {
        Building building = buildingRepository.findById(buildingId)
            .orElseThrow(() -> new RuntimeException("Building not found with id: " + buildingId));
        
        return buildingContractorRepository.findByBuilding(building);
    }
}
