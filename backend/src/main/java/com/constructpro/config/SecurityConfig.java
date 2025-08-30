package com.constructpro.config;

import com.constructpro.security.*;
import org.springframework.security.core.userdetails.UserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

	private final UserDetailsService userDetailsService;
	private final JwtAuthFilter jwtAuthFilter;
	private final AuthEntryPointJwt unauthorizedHandler;

	@Value("${app.cors.allowed-origins}")
	private String allowedOrigins;

	@Value("${app.cors.allowed-methods}")
	private String allowedMethods;

	@Value("${app.cors.allowed-headers}")
	private String allowedHeaders;

	@Value("${app.cors.allow-credentials}")
	private boolean allowCredentials;

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		
		// Parse allowed origins from application properties
		List<String> origins = Arrays.asList(allowedOrigins.split(","));
		configuration.setAllowedOrigins(origins);
		
		// Parse allowed methods
		List<String> methods = Arrays.asList(allowedMethods.split(","));
		configuration.setAllowedMethods(methods);
		
		// Set allowed headers - handle wildcard properly
		if ("*".equals(allowedHeaders)) {
			configuration.setAllowedHeaders(Arrays.asList("*"));
		} else {
			configuration.setAllowedHeaders(Arrays.asList(allowedHeaders.split(",")));
		}
		
		// Set exposed headers for frontend access
		configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Length", "Content-Type"));
		
		configuration.setAllowCredentials(allowCredentials);
		configuration.setMaxAge(3600L);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
			.csrf(csrf -> csrf.disable())
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
			.authorizeHttpRequests(auth -> auth
				.requestMatchers("/api/auth/**").permitAll()
				.requestMatchers("/api/ping").permitAll()
				.requestMatchers("/api/demo").permitAll()
				.requestMatchers("/api/test/**").permitAll()
				.requestMatchers("/api-docs/**").permitAll()
				.requestMatchers("/swagger-ui/**").permitAll()
				.requestMatchers("/swagger-ui.html").permitAll()
				.requestMatchers("/actuator/health").permitAll()
				.anyRequest().authenticated()
			)
			.authenticationProvider(authenticationProvider())
			.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}
