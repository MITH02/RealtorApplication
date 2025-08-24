package com.constructpro.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TaskCreateRequest {
    
    @NotBlank(message = "Task name is required")
    private String name;
    
    private String description;
    
    @NotBlank(message = "Task type is required")
    private String type;
    
    @NotBlank(message = "Priority is required")
    private String priority;
    
    @Positive(message = "Estimated duration must be positive")
    private Integer estimatedDurationDays;
    
    private BigDecimal estimatedCost;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
    
    @NotNull(message = "Deadline is required")
    private LocalDate deadline;
    
    @NotNull(message = "Building ID is required")
    private Long buildingId;
    
    @NotNull(message = "Contractor ID is required")
    private Long contractorId;
    
    private String[] dependencyTaskIds;
}
