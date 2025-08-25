package com.constructpro.repository;

import com.constructpro.entity.Building;
import com.constructpro.entity.BuildingContractor;
import com.constructpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BuildingContractorRepository extends JpaRepository<BuildingContractor, Long> {
    
    List<BuildingContractor> findByBuildingAndIsActiveTrue(Building building);
    
    List<BuildingContractor> findByContractorAndIsActiveTrue(User contractor);
    
    List<BuildingContractor> findByBuilding(Building building);
    
    List<BuildingContractor> findByContractor(User contractor);
    
    Optional<BuildingContractor> findByBuildingAndContractorAndIsActiveTrue(Building building, User contractor);
    
    @Query("SELECT bc FROM BuildingContractor bc WHERE bc.building.id = :buildingId AND bc.isActive = true")
    List<BuildingContractor> findActiveBuildingContractors(@Param("buildingId") Long buildingId);
    
    @Query("SELECT bc FROM BuildingContractor bc WHERE bc.contractor.id = :contractorId AND bc.isActive = true")
    List<BuildingContractor> findActiveContractorBuildings(@Param("contractorId") Long contractorId);
    
    @Query("SELECT COUNT(bc) FROM BuildingContractor bc WHERE bc.building = :building AND bc.isActive = true")
    long countActiveContractorsByBuilding(@Param("building") Building building);
    
    @Query("SELECT COUNT(bc) FROM BuildingContractor bc WHERE bc.contractor = :contractor AND bc.isActive = true")
    long countActiveBuildingsByContractor(@Param("contractor") User contractor);
    
    boolean existsByBuildingAndContractorAndIsActiveTrue(Building building, User contractor);
}
