package com.constructpro.controller;

import com.constructpro.dto.request.SignupRequest;
import com.constructpro.dto.response.MessageResponse;
import com.constructpro.entity.User;
import com.constructpro.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {
    
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    
    @GetMapping("/builders")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllBuilders() {
        try {
            List<User> builders = userRepository.findByRole(User.Role.BUILDER);
            return ResponseEntity.ok(builders);
        } catch (Exception e) {
            log.error("Error fetching builders", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/builders/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getBuilderById(@PathVariable Long id) {
        try {
            Optional<User> builder = userRepository.findByIdAndRole(id, User.Role.BUILDER);
            if (builder.isPresent()) {
                return ResponseEntity.ok(builder.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error fetching builder", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to fetch builder"));
        }
    }


	@PostMapping("/admins")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createAdmin(@Valid @RequestBody SignupRequest signUpRequest) {
		try {
			if (userRepository.existsByEmail(signUpRequest.getEmail())) {
				return ResponseEntity.badRequest()
									 .body(new MessageResponse("Error: Email is already in use!"));
			}

			// Force role to ADMIN
			User admin = new User(
					signUpRequest.getEmail(),
					encoder.encode(signUpRequest.getPassword()),
					signUpRequest.getFirstName(),
					signUpRequest.getLastName(),
					User.Role.ADMIN
			);

			if (signUpRequest.getPhoneNumber() != null) {
				admin.setPhoneNumber(signUpRequest.getPhoneNumber());
			}

			userRepository.save(admin);

			return ResponseEntity.status(HttpStatus.CREATED)
								 .body(new MessageResponse("Admin account created successfully!"));

		} catch (Exception e) {
			log.error("Error creating admin account", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
								 .body(new MessageResponse("Error: Failed to create admin account"));
		}
	}


	@PostMapping("/builders")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createBuilder(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
            }
            
            // Force role to be BUILDER
            User builder = new User(
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                User.Role.BUILDER
            );
            
            if (signUpRequest.getPhoneNumber() != null) {
                builder.setPhoneNumber(signUpRequest.getPhoneNumber());
            }
            
            userRepository.save(builder);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(new MessageResponse("Builder account created successfully!"));
            
        } catch (Exception e) {
            log.error("Error creating builder account", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to create builder account"));
        }
    }
    
    @PutMapping("/builders/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBuilder(@PathVariable Long id, 
                                         @Valid @RequestBody SignupRequest request) {
        try {
            Optional<User> builderOpt = userRepository.findByIdAndRole(id, User.Role.BUILDER);
            if (!builderOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            User builder = builderOpt.get();
            
            // Check if email is being changed and if it's already in use
            if (!builder.getEmail().equals(request.getEmail()) && 
                userRepository.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
            }
            
            // Update builder details
            builder.setEmail(request.getEmail());
            builder.setFirstName(request.getFirstName());
            builder.setLastName(request.getLastName());
            builder.setPhoneNumber(request.getPhoneNumber());
            
            // Only update password if provided
            if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
                builder.setPassword(encoder.encode(request.getPassword()));
            }
            
            userRepository.save(builder);
            
            return ResponseEntity.ok(new MessageResponse("Builder account updated successfully!"));
            
        } catch (Exception e) {
            log.error("Error updating builder account", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to update builder account"));
        }
    }
    
    @PatchMapping("/builders/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBuilderStatus(@PathVariable Long id, 
                                               @RequestParam boolean active) {
        try {
            Optional<User> builderOpt = userRepository.findByIdAndRole(id, User.Role.BUILDER);
            if (!builderOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            User builder = builderOpt.get();
            builder.setIsActive(active);
            userRepository.save(builder);
            
            String status = active ? "activated" : "deactivated";
            return ResponseEntity.ok(new MessageResponse("Builder account " + status + " successfully!"));
            
        } catch (Exception e) {
            log.error("Error updating builder status", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to update builder status"));
        }
    }
    
    @DeleteMapping("/builders/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteBuilder(@PathVariable Long id) {
        try {
            Optional<User> builderOpt = userRepository.findByIdAndRole(id, User.Role.BUILDER);
            if (!builderOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            User builder = builderOpt.get();
            
            // Check if builder has active buildings or tasks
            if (!builder.getEmail().isEmpty()) { // You might want to add proper checks here
                // For now, we'll soft delete by deactivating
                builder.setIsActive(false);
                userRepository.save(builder);
                return ResponseEntity.ok(new MessageResponse("Builder account deactivated successfully!"));
            } else {
                userRepository.delete(builder);
                return ResponseEntity.ok(new MessageResponse("Builder account deleted successfully!"));
            }
            
        } catch (Exception e) {
            log.error("Error deleting builder account", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to delete builder account"));
        }
    }
    
    @GetMapping("/contractors")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllContractors() {
        try {
            List<User> contractors = userRepository.findByRole(User.Role.CONTRACTOR);
            return ResponseEntity.ok(contractors);
        } catch (Exception e) {
            log.error("Error fetching contractors", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/stats/user-counts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserCounts() {
        try {
            long builderCount = userRepository.countByRole(User.Role.BUILDER);
            long contractorCount = userRepository.countByRole(User.Role.CONTRACTOR);
            long adminCount = userRepository.countByRole(User.Role.ADMIN);
            
            return ResponseEntity.ok(new Object() {
                public final long builders = builderCount;
                public final long contractors = contractorCount;
                public final long admins = adminCount;
            });
        } catch (Exception e) {
            log.error("Error fetching user counts", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: Failed to fetch user counts"));
        }
    }
}
