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
}
