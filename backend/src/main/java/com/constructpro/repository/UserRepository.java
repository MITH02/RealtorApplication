package com.constructpro.repository;

import com.constructpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);

    // Username is typically the email in this system
    default Optional<User> findByUsername(String username) {
        return findByEmail(username);
    }

    List<User> findByRole(User.Role role);
    
    List<User> findByRoleAndIsActiveTrue(User.Role role);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.isActive = true ORDER BY u.firstName, u.lastName")
    List<User> findActiveUsersByRole(@Param("role") User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.role = 'CONTRACTOR' AND u.isActive = true")
    List<User> findActiveContractors();
    
    @Query("SELECT u FROM User u WHERE u.role = 'ADMIN' AND u.isActive = true")
    List<User> findActiveAdmins();
    
    @Query("SELECT u FROM User u WHERE " +
           "(LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "u.isActive = true")
    List<User> searchActiveUsers(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT u FROM User u WHERE u.role = 'CONTRACTOR' AND u.isActive = true AND " +
           "(u.specialization IS NULL OR LOWER(u.specialization) LIKE LOWER(CONCAT('%', :specialization, '%')))")
    List<User> findContractorsBySpecialization(@Param("specialization") String specialization);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role AND u.isActive = true")
    long countActiveUsersByRole(@Param("role") User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.isActive = true AND u.lastLogin < :cutoffDate")
    List<User> findInactiveUsers(@Param("cutoffDate") java.time.LocalDateTime cutoffDate);

    Optional<User> findByIdAndRole(Long id, User.Role role);

    long countByRole(User.Role role);

    @Query("SELECT u FROM User u WHERE u.role = 'BUILDER' AND u.isActive = true")
    List<User> findActiveBuilders();
}
