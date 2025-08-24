package com.constructpro.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BuildingCreateRequest {
    
    @NotBlank(message = "Building name is required")
    private String name;
    
    private String description;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    private String city;
    private String state;
    private String postalCode;
    private String country;
    
    @NotBlank(message = "Building type is required")
    private String type;
    
    @Positive(message = "Total floors must be positive")
    private Integer totalFloors;
    
    private BigDecimal totalArea;
    private BigDecimal estimatedBudget;
    
    private LocalDate startDate;
    private LocalDate expectedCompletionDate;
    
    private Long projectManagerId;
}
