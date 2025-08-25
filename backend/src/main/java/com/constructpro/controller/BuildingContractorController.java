package com.constructpro.controller;

import com.constructpro.dto.MessageResponse;
import com.constructpro.entity.BuildingContractor;
import com.constructpro.entity.User;
import com.constructpro.service.BuildingContractorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/building-contractors")
@RequiredArgsConstructor
@Slf4j
public class BuildingContractorController {
    
    private final BuildingContractorService buildingContractorService;

    @PostMapping("/assign")
    @PreAuthorize("hasAnyRole('ADMIN', 'BUILDER')")
    public ResponseEntity<BuildingContractor> assignContractorToBuilding(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal User currentUser) {
        
        try {
            Long buildingId = Long.valueOf(request.get("buildingId").toString());
            Long contractorId = Long.valueOf(request.get("contractorId").toString());
            String roleInProject = (String) request.get("roleInProject");
            String notes = (String) request.get("notes");
            
            BuildingContractor assignment = buildingContractorService.assignContractorToBuilding(
                buildingId, contractorId, currentUser, roleInProject, notes);
            
            return ResponseEntity.ok(assignment);
            
        } catch (Exception e) {
            log.error("Error assigning contractor to building: ", e);
            throw new RuntimeException("Failed to assign contractor: " + e.getMessage());
        }
    }

    @DeleteMapping("/unassign")
    @PreAuthorize("hasAnyRole('ADMIN', 'BUILDER')")
    public ResponseEntity<MessageResponse> unassignContractorFromBuilding(
            @RequestParam Long buildingId,
            @RequestParam Long contractorId,
            @AuthenticationPrincipal User currentUser) {
        
        try {
            buildingContractorService.unassignContractorFromBuilding(buildingId, contractorId, currentUser);
            return ResponseEntity.ok(new MessageResponse("Contractor unassigned successfully"));
            
        } catch (Exception e) {
            log.error("Error unassigning contractor from building: ", e);
            throw new RuntimeException("Failed to unassign contractor: " + e.getMessage());
        }
    }

    @GetMapping("/building/{buildingId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'BUILDER')")
    public ResponseEntity<List<BuildingContractor>> getBuildingContractors(
            @PathVariable Long buildingId) {
        
        try {
            List<BuildingContractor> contractors = buildingContractorService.getBuildingContractors(buildingId);
            return ResponseEntity.ok(contractors);
            
        } catch (Exception e) {
            log.error("Error fetching building contractors: ", e);
            throw new RuntimeException("Failed to fetch building contractors: " + e.getMessage());
        }
    }

    @GetMapping("/contractor/{contractorId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'BUILDER', 'CONTRACTOR')")
    public ResponseEntity<List<BuildingContractor>> getContractorBuildings(
            @PathVariable Long contractorId,
            @AuthenticationPrincipal User currentUser) {
        
        try {
            // Contractors can only view their own buildings
            if (currentUser.getRole().equals(User.Role.CONTRACTOR) && 
                !currentUser.getId().equals(contractorId)) {
                throw new RuntimeException("You can only view your own building assignments");
            }
            
            List<BuildingContractor> buildings = buildingContractorService.getContractorBuildings(contractorId);
            return ResponseEntity.ok(buildings);
            
        } catch (Exception e) {
            log.error("Error fetching contractor buildings: ", e);
            throw new RuntimeException("Failed to fetch contractor buildings: " + e.getMessage());
        }
    }

    @GetMapping("/building/{buildingId}/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'BUILDER')")
    public ResponseEntity<List<BuildingContractor>> getAllBuildingContractors(
            @PathVariable Long buildingId) {
        
        try {
            List<BuildingContractor> contractors = buildingContractorService.getAllBuildingContractors(buildingId);
            return ResponseEntity.ok(contractors);
            
        } catch (Exception e) {
            log.error("Error fetching all building contractors: ", e);
            throw new RuntimeException("Failed to fetch all building contractors: " + e.getMessage());
        }
    }
}
