package com.constructpro.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "pong");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", "success");
        response.put("backend", "running");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/auth-test")
    public ResponseEntity<Map<String, Object>> authTest() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Auth endpoint is accessible");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("service", "ConstructPro Backend");
        response.put("version", "1.0.0");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cors-test")
    public ResponseEntity<Map<String, Object>> corsTest() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "CORS is working!");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("corsEnabled", true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/building-validation-test")
    public ResponseEntity<?> testBuildingValidation() {
        try {
            // Test building type validation
            String[] validTypes = {"RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "MIXED_USE", "INFRASTRUCTURE"};
            Map<String, Object> response = new HashMap<>();
            response.put("validBuildingTypes", validTypes);
            response.put("message", "Building validation test endpoint");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/test-building-creation")
    public ResponseEntity<?> testBuildingCreation(@RequestBody BuildingCreateRequest request) {
        try {
            log.info("Testing building creation with data: {}", request);
            
            // Validate required fields
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Building name is required"));
            }
            
            if (request.getAddress() == null || request.getAddress().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Address is required"));
            }
            
            if (request.getType() == null || request.getType().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Building type is required"));
            }
            
            // Validate building type
            try {
                Building.BuildingType.valueOf(request.getType().toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Invalid building type: " + request.getType() + 
                           ". Valid types are: RESIDENTIAL, COMMERCIAL, INDUSTRIAL, MIXED_USE, INFRASTRUCTURE"));
            }
            
            // Validate numeric fields
            if (request.getTotalFloors() != null && request.getTotalFloors() <= 0) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Total floors must be positive"));
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Building validation passed");
            response.put("validatedData", request);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error testing building creation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}
