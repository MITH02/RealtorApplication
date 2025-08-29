package com.constructpro.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@Slf4j
public class JwtUtils {

	@Value("${app.jwt.secret}")
	private String jwtSecret;

	@Value("${app.jwt.expiration}")
	private int jwtExpirationMs;

	@Value("${app.jwt.refresh-expiration}")
	private int jwtRefreshExpirationMs;

	private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	// Generate JWT token for authentication
	public String generateJwtToken(Authentication authentication) {
		UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
		return generateTokenFromUsername(userPrincipal.getUsername(), jwtExpirationMs);
	}

	// Generate refresh token
	public String generateRefreshToken(String username) {
		return generateTokenFromUsername(username, jwtRefreshExpirationMs);
	}

	// Common token generation method
	public String generateTokenFromUsername(String username, int expirationMs) {
		Date expiryDate = new Date(System.currentTimeMillis() + expirationMs);
		return Jwts.builder()
				   .setSubject(username)
				   .setIssuedAt(new Date())
				   .setExpiration(expiryDate)
				   .signWith(getSigningKey())
				   .compact();
	}

	// Extract username from token
	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser()
				   .verifyWith(getSigningKey())
				   .build()
				   .parseSignedClaims(token)
				   .getPayload()
				   .getSubject();
	}

	// Validate JWT token
	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser()
				.verifyWith(getSigningKey())
				.build()
				.parseSignedClaims(authToken);
			return true;
		} catch (SecurityException | MalformedJwtException e) {
			log.error("Invalid JWT signature/token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			log.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			log.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			log.error("JWT claims string is empty: {}", e.getMessage());
		}
		return false;
	}

	// Get expiration date from token
	public Date getExpirationDateFromJwtToken(String token) {
		return Jwts.parser()
				   .verifyWith(getSigningKey())
				   .build()
				   .parseSignedClaims(token)
				   .getPayload()
				   .getExpiration();
	}

	// Check if token is expired
	public boolean isTokenExpired(String token) {
		Date expiration = getExpirationDateFromJwtToken(token);
		return expiration.before(new Date());
	}

	// Get claims from token
	public Claims getClaimsFromJwtToken(String token) {
		return Jwts.parser()
				   .verifyWith(getSigningKey())
				   .build()
				   .parseSignedClaims(token)
				   .getPayload();
	}
}
