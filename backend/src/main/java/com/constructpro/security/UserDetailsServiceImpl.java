package com.constructpro.security;

import com.constructpro.entity.User;
import com.constructpro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Primary
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("UserDetailsService: Loading user by username: " + username);
		
		User user = userRepository.findByEmail(username)
								  .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

		System.out.println("UserDetailsService: User found: " + user.getEmail() + ", Active: " + user.getIsActive());

		if (!user.getIsActive()) {
			throw new UsernameNotFoundException("User account is deactivated: " + username);
		}

		return user;
	}
}
