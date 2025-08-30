package com.constructpro;

import com.constructpro.entity.User;
import com.constructpro.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableJpaAuditing
public class ConstructProApplication {
	public static void main(String[] args) {
		SpringApplication.run(ConstructProApplication.class, args);
	}

	@Bean
	CommandLineRunner createAdmin(UserRepository userRepository, PasswordEncoder encoder) {
		return args -> {
			String email = "admin@example.com";
			System.out.println("Checking if admin user exists: " + email);
			
			if (!userRepository.existsByEmail(email)) {
				System.out.println("Admin user not found, creating...");
				User admin = new User(
						email,
						encoder.encode("Admin@123"), // temporary password
						"Super",
						"Admin",
						User.Role.ADMIN
				);
				admin.setIsActive(true);
				userRepository.save(admin);
				System.out.println("Admin user created with email: " + email + " and password: Admin@123");
			} else {
				System.out.println("Admin user already exists: " + email);
			}
		};
	}

}
