package com.constructpro.controller;

import com.constructpro.dto.request.BuildingCreateRequest;
import com.constructpro.dto.response.MessageResponse;
import com.constructpro.entity.Building;
import com.constructpro.entity.User;
import com.constructpro.service.BuildingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class BuildingController {
    
    private final BuildingService buildingService;
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> createBuilding(@Valid @RequestBody BuildingCreateRequest request, 
                                          Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            Building building = buildingService.createBuilding(request, currentUser);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(building);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error creating building", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to create building"));
        }
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Building>> getAllBuildings(Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            
            List<Building> buildings;
            if (currentUser.getRole() == User.Role.SUPER_ADMIN) {
                buildings = buildingService.getAllBuildings();
            } else {
                buildings = buildingService.getBuildingsByUser(currentUser);
            }
            
            return ResponseEntity.ok(buildings);
        } catch (Exception e) {
            log.error("Error fetching buildings", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('CONTRACTOR')")
    public ResponseEntity<?> getBuildingById(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            
            Building building = buildingService.getBuildingById(id)
                .orElseThrow(() -> new RuntimeException("Building not found"));
            
            // Check if contractor has access to this building
            if (currentUser.getRole() == User.Role.CONTRACTOR) {
                List<Building> contractorBuildings = buildingService.getBuildingsByContractor(currentUser);
                boolean hasAccess = contractorBuildings.stream()
                    .anyMatch(b -> b.getId().equals(id));
                
                if (!hasAccess) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Access denied: You are not assigned to this building"));
                }
            }
            
            return ResponseEntity.ok(building);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching building", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to fetch building"));
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateBuilding(@PathVariable Long id, 
                                          @Valid @RequestBody BuildingCreateRequest request,
                                          Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            Building building = buildingService.updateBuilding(id, request, currentUser);
            
            return ResponseEntity.ok(building);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error updating building", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to update building"));
        }
    }
    
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateBuildingStatus(@PathVariable Long id, 
                                                @RequestParam String status,
                                                Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            
            Building.ProjectStatus projectStatus;
            try {
                projectStatus = Building.ProjectStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid status value"));
            }
            
            Building building = buildingService.updateBuildingStatus(id, projectStatus, currentUser);
            return ResponseEntity.ok(building);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error updating building status", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to update building status"));
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> deleteBuilding(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            buildingService.deleteBuilding(id, currentUser);
            
            return ResponseEntity.ok(new MessageResponse("Building deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error deleting building", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to delete building"));
        }
    }
    
    @GetMapping("/my-buildings")
    @PreAuthorize("hasRole('CONTRACTOR')")
    public ResponseEntity<List<Building>> getMyBuildings(Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            List<Building> buildings = buildingService.getBuildingsByContractor(currentUser);
            
            return ResponseEntity.ok(buildings);
        } catch (Exception e) {
            log.error("Error fetching contractor buildings", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/overdue")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Building>> getOverdueBuildings() {
        try {
            List<Building> buildings = buildingService.getOverdueBuildings();
            return ResponseEntity.ok(buildings);
        } catch (Exception e) {
            log.error("Error fetching overdue buildings", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/active")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Building>> getActiveBuildingsOrderByDeadline() {
        try {
            List<Building> buildings = buildingService.getActiveBuildingsOrderByDeadline();
            return ResponseEntity.ok(buildings);
        } catch (Exception e) {
            log.error("Error fetching active buildings", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Building>> searchBuildings(@RequestParam String q) {
        try {
            List<Building> buildings = buildingService.searchBuildings(q);
            return ResponseEntity.ok(buildings);
        } catch (Exception e) {
            log.error("Error searching buildings", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/stats/count-by-status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getBuildingCountByStatus(@RequestParam String status) {
        try {
            Building.ProjectStatus projectStatus;
            try {
                projectStatus = Building.ProjectStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid status value"));
            }
            
            long count = buildingService.getBuildingCountByStatus(projectStatus);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            log.error("Error fetching building count", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to fetch building count"));
        }
    }
}
