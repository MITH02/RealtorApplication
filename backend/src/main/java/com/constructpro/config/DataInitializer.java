package com.constructpro.config;

import com.constructpro.entity.User;
import com.constructpro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Data initialization component that creates default users on application startup
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeDefaultUsers();
    }

    private void initializeDefaultUsers() {
        // Create default admin user if it doesn't exist
        if (!userRepository.existsByEmail("admin@constructpro.com")) {
            User admin = new User();
            admin.setEmail("admin@constructpro.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("System");
            admin.setLastName("Administrator");
            admin.setRole(User.Role.ADMIN);
            admin.setIsActive(true);
            
            userRepository.save(admin);
            log.info("Created default admin user: admin@constructpro.com / admin123");
        }

        // Create default builder user for testing
        if (!userRepository.existsByEmail("builder@constructpro.com")) {
            User builder = new User();
            builder.setEmail("builder@constructpro.com");
            builder.setPassword(passwordEncoder.encode("builder123"));
            builder.setFirstName("John");
            builder.setLastName("Builder");
            builder.setRole(User.Role.BUILDER);
            builder.setPhoneNumber("+1-555-0123");
            builder.setIsActive(true);
            
            userRepository.save(builder);
            log.info("Created default builder user: builder@constructpro.com / builder123");
        }

        // Create default contractor user for testing
        if (!userRepository.existsByEmail("contractor@constructpro.com")) {
            User contractor = new User();
            contractor.setEmail("contractor@constructpro.com");
            contractor.setPassword(passwordEncoder.encode("contractor123"));
            contractor.setFirstName("Mike");
            contractor.setLastName("Contractor");
            contractor.setRole(User.Role.CONTRACTOR);
            contractor.setPhoneNumber("+1-555-0456");
            contractor.setSpecialization("General Construction");
            contractor.setYearsOfExperience(10);
            contractor.setCertificationDetails("Licensed General Contractor, OSHA 30 Certified");
            contractor.setIsActive(true);
            
            userRepository.save(contractor);
            log.info("Created default contractor user: contractor@constructpro.com / contractor123");
        }

        log.info("Data initialization completed successfully");
    }
}
