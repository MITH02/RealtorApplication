package com.constructpro.controller;

import com.constructpro.dto.request.LoginRequest;
import com.constructpro.dto.request.SignupRequest;
import com.constructpro.dto.response.JwtResponse;
import com.constructpro.dto.response.MessageResponse;
import com.constructpro.entity.User;
import com.constructpro.repository.UserRepository;
import com.constructpro.security.JwtUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		try {
			log.info("Login attempt for user: {}", loginRequest.getEmail());
			
			// Check if user exists first
			if (!userRepository.existsByEmail(loginRequest.getEmail())) {
				log.warn("Login failed: User not found with email: {}", loginRequest.getEmail());
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
								 .body(new MessageResponse("Error: Invalid credentials"));
			}
			
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
			);

			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateJwtToken(authentication);

			User user = (User) authentication.getPrincipal();

			// Update last login time properly
			user.setLastLogin(LocalDateTime.now());
			userRepository.save(user);

			String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());

			log.info("Login successful for user: {}", loginRequest.getEmail());

			return ResponseEntity.ok(new JwtResponse(
					jwt,
					refreshToken,
					user.getId(),
					user.getEmail(),
					user.getFirstName(),
					user.getLastName(),
					user.getRole().name()
			));

		} catch (Exception e) {
			log.error("Authentication failed for user: {}", loginRequest.getEmail(), e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
								 .body(new MessageResponse("Error: Invalid credentials"));
		}
	}


	@PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
            }
            
            // Validate role
            User.Role role;
            try {
                role = User.Role.valueOf(signUpRequest.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid role specified"));
            }
            
            // Check if the role is allowed for public registration
            // Only CONTRACTOR role is allowed for public registration
            if (role != User.Role.CONTRACTOR) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Only contractor registration is allowed. Please contact admin for other roles."));
            }
            
            // Create new user account
            User user = new User(
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                role
            );
            
            // Set additional fields if provided
            if (signUpRequest.getPhoneNumber() != null) {
                user.setPhoneNumber(signUpRequest.getPhoneNumber());
            }
            
            // Contractor-specific fields
            if (role == User.Role.CONTRACTOR) {
                user.setSpecialization(signUpRequest.getSpecialization());
                user.setYearsOfExperience(signUpRequest.getYearsOfExperience());
                user.setCertificationDetails(signUpRequest.getCertificationDetails());
            }
            
            userRepository.save(user);
            
            return ResponseEntity.ok(new MessageResponse("Contractor registered successfully!"));
            
        } catch (Exception e) {
            log.error("Registration failed for user: {}", signUpRequest.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Registration failed"));
        }
    }
    
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody String refreshToken) {
        try {
            if (jwtUtils.validateJwtToken(refreshToken)) {
                String username = jwtUtils.getUserNameFromJwtToken(refreshToken);
                User user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
                
                String newAccessToken = jwtUtils.generateTokenFromUsername(username, 86400000); // 24 hours
                String newRefreshToken = jwtUtils.generateRefreshToken(username);
                
                return ResponseEntity.ok(new JwtResponse(
                    newAccessToken,
                    newRefreshToken,
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole().name()
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Error: Invalid refresh token"));
            }
        } catch (Exception e) {
            log.error("Token refresh failed", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponse("Error: Token refresh failed"));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        // In a more sophisticated implementation, you might want to blacklist the JWT token
        // For now, we'll just return a success message as the client should remove the token
        return ResponseEntity.ok(new MessageResponse("User logged out successfully!"));
    }
    
    @PostMapping("/register-user")
    public ResponseEntity<?> registerUserByRole(@Valid @RequestBody SignupRequest signUpRequest, 
                                               Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Error: Authentication required"));
            }
            
            User currentUser = (User) authentication.getPrincipal();
            
            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
            }
            
            // Validate role
            User.Role role;
            try {
                role = User.Role.valueOf(signUpRequest.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid role specified"));
            }
            
            // Check role-based permissions
            boolean canRegister = false;
            String allowedRoles = "";
            
            if (currentUser.getRole() == User.Role.ADMIN) {
                // Admin can register builders and contractors
                canRegister = (role == User.Role.BUILDER || role == User.Role.CONTRACTOR);
                allowedRoles = "BUILDER or CONTRACTOR";
            } else if (currentUser.getRole() == User.Role.BUILDER) {
                // Builder can only register contractors
                canRegister = (role == User.Role.CONTRACTOR);
                allowedRoles = "CONTRACTOR";
            }
            
            if (!canRegister) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: You can only register " + allowedRoles + " users."));
            }
            
            // Create new user account
            User user = new User(
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                role
            );
            
            // Set additional fields if provided
            if (signUpRequest.getPhoneNumber() != null) {
                user.setPhoneNumber(signUpRequest.getPhoneNumber());
            }
            
            // Contractor-specific fields
            if (role == User.Role.CONTRACTOR) {
                user.setSpecialization(signUpRequest.getSpecialization());
                user.setYearsOfExperience(signUpRequest.getYearsOfExperience());
                user.setCertificationDetails(signUpRequest.getCertificationDetails());
            }
            
            userRepository.save(user);
            
            String roleName = role.name().toLowerCase();
            return ResponseEntity.ok(new MessageResponse(roleName.substring(0, 1).toUpperCase() + roleName.substring(1) + " registered successfully!"));
            
        } catch (Exception e) {
            log.error("Role-based registration failed for user: {}", signUpRequest.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Registration failed"));
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponse("Error: User not authenticated"));
        }
        
        User user = (User) authentication.getPrincipal();
        
        return ResponseEntity.ok(new JwtResponse(
            null, // Don't return tokens in this endpoint
            null,
            user.getId(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getRole().name()
        ));
    }
}
