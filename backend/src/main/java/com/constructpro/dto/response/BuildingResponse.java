package com.constructpro.dto.response;

import com.constructpro.entity.Building;
import com.constructpro.entity.User;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class BuildingResponse {
    private Long id;
    private String name;
    private String description;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String type;
    private String status;
    private Integer totalFloors;
    private BigDecimal totalArea;
    private BigDecimal estimatedBudget;
    private BigDecimal actualCost;
    private LocalDate startDate;
    private LocalDate expectedCompletionDate;
    private LocalDate actualCompletionDate;
    private UserSummary createdBy;
    private UserSummary projectManager;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Data
    public static class UserSummary {
        private Long id;
        private String email;
        private String firstName;
        private String lastName;
        private String role;
        
        public static UserSummary fromUser(User user) {
            if (user == null) return null;
            
            UserSummary summary = new UserSummary();
            summary.setId(user.getId());
            summary.setEmail(user.getEmail());
            summary.setFirstName(user.getFirstName());
            summary.setLastName(user.getLastName());
            summary.setRole(user.getRole().name());
            return summary;
        }
    }
    
    public static BuildingResponse fromBuilding(Building building) {
        BuildingResponse response = new BuildingResponse();
        response.setId(building.getId());
        response.setName(building.getName());
        response.setDescription(building.getDescription());
        response.setAddress(building.getAddress());
        response.setCity(building.getCity());
        response.setState(building.getState());
        response.setPostalCode(building.getPostalCode());
        response.setCountry(building.getCountry());
        response.setType(building.getType().name());
        response.setStatus(building.getStatus().name());
        response.setTotalFloors(building.getTotalFloors());
        response.setTotalArea(building.getTotalArea());
        response.setEstimatedBudget(building.getEstimatedBudget());
        response.setActualCost(building.getActualCost());
        response.setStartDate(building.getStartDate());
        response.setExpectedCompletionDate(building.getExpectedCompletionDate());
        response.setActualCompletionDate(building.getActualCompletionDate());
        response.setCreatedBy(UserSummary.fromUser(building.getCreatedBy()));
        response.setProjectManager(UserSummary.fromUser(building.getProjectManager()));
        response.setCreatedAt(building.getCreatedAt());
        response.setUpdatedAt(building.getUpdatedAt());
        return response;
    }
}
