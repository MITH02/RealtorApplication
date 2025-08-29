package com.constructpro.repository;

import com.constructpro.entity.Building;
import com.constructpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
    
    List<Building> findByCreatedBy(User createdBy);
    
    List<Building> findByProjectManager(User projectManager);
    
    List<Building> findByStatus(Building.ProjectStatus status);
    
    List<Building> findByType(Building.BuildingType type);
    
    @Query("SELECT b FROM Building b WHERE b.createdBy = :user OR b.projectManager = :user")
    List<Building> findBuildingsByUser(@Param("user") User user);
    
    @Query("SELECT b FROM Building b WHERE " +
           "LOWER(b.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(b.address) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(b.city) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Building> searchBuildings(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT b FROM Building b WHERE b.expectedCompletionDate < :currentDate AND b.status != 'COMPLETED'")
    List<Building> findOverdueBuildings(@Param("currentDate") LocalDate currentDate);
    
    @Query("SELECT b FROM Building b WHERE b.expectedCompletionDate BETWEEN :startDate AND :endDate")
    List<Building> findBuildingsWithDeadlineBetween(
        @Param("startDate") LocalDate startDate, 
        @Param("endDate") LocalDate endDate
    );
    
    @Query("SELECT COUNT(b) FROM Building b WHERE b.status = :status")
    long countBuildingsByStatus(@Param("status") Building.ProjectStatus status);
    
    @Query("SELECT b FROM Building b JOIN b.buildingContractors bc WHERE bc.contractor = :contractor AND bc.isActive = true")
    List<Building> findBuildingsByContractor(@Param("contractor") User contractor);
    
    @Query("SELECT b FROM Building b WHERE b.status IN ('PLANNING', 'IN_PROGRESS') ORDER BY b.expectedCompletionDate ASC")
    List<Building> findActiveBuildingsOrderByDeadline();
    
    @Query("SELECT b FROM Building b WHERE b.createdBy.role = 'ADMIN' ORDER BY b.createdAt DESC")
    List<Building> findAllBuildingsOrderByCreatedAt();

	@Query(value = "SELECT AVG(EXTRACT(DAY FROM actual_completion_date - start_date)) FROM building WHERE actual_completion_date IS NOT NULL", nativeQuery = true)
	Double getAverageProjectDuration();

}
