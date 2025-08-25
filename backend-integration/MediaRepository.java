// Spring Boot Repository for Media entity
// Place this file in: backend/src/main/java/com/constructpro/repository/MediaRepository.java

package com.constructpro.repository;

import com.constructpro.entity.Media;
import com.constructpro.entity.Task;
import com.constructpro.entity.Building;
import com.constructpro.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MediaRepository extends JpaRepository<Media, String> {
    
    // Find media by task
    List<Media> findByTaskOrderByUploadedAtDesc(Task task);
    
    List<Media> findByTaskIdOrderByUploadedAtDesc(Long taskId);
    
    // Find media by building
    List<Media> findByBuildingOrderByUploadedAtDesc(Building building);
    
    List<Media> findByBuildingIdOrderByUploadedAtDesc(Long buildingId);
    
    // Find media by user
    List<Media> findByUploadedByOrderByUploadedAtDesc(User user);
    
    List<Media> findByUploadedByIdOrderByUploadedAtDesc(Long userId);
    
    // Find by file type
    List<Media> findByMimeTypeStartingWithOrderByUploadedAtDesc(String mimeTypePrefix);
    
    Page<Media> findByMimeTypeStartingWithOrderByUploadedAtDesc(String mimeTypePrefix, Pageable pageable);
    
    // Find images and videos specifically
    @Query("SELECT m FROM Media m WHERE m.mimeType LIKE 'image/%' ORDER BY m.uploadedAt DESC")
    List<Media> findAllImages();
    
    @Query("SELECT m FROM Media m WHERE m.mimeType LIKE 'image/%' ORDER BY m.uploadedAt DESC")
    Page<Media> findAllImages(Pageable pageable);
    
    @Query("SELECT m FROM Media m WHERE m.mimeType LIKE 'video/%' ORDER BY m.uploadedAt DESC")
    List<Media> findAllVideos();
    
    @Query("SELECT m FROM Media m WHERE m.mimeType LIKE 'video/%' ORDER BY m.uploadedAt DESC")
    Page<Media> findAllVideos(Pageable pageable);
    
    // Find media by date range
    List<Media> findByUploadedAtBetweenOrderByUploadedAtDesc(LocalDateTime startDate, LocalDateTime endDate);
    
    // Find media by file size range
    List<Media> findByFileSizeBetweenOrderByUploadedAtDesc(Long minSize, Long maxSize);
    
    // Find recent media
    List<Media> findTop10ByOrderByUploadedAtDesc();
    
    @Query("SELECT m FROM Media m WHERE m.uploadedAt >= :since ORDER BY m.uploadedAt DESC")
    List<Media> findRecentMedia(@Param("since") LocalDateTime since);
    
    // Find by multiple tasks
    @Query("SELECT m FROM Media m WHERE m.task.id IN :taskIds ORDER BY m.uploadedAt DESC")
    List<Media> findByTaskIds(@Param("taskIds") List<Long> taskIds);
    
    // Find by multiple buildings
    @Query("SELECT m FROM Media m WHERE m.building.id IN :buildingIds ORDER BY m.uploadedAt DESC")
    List<Media> findByBuildingIds(@Param("buildingIds") List<Long> buildingIds);
    
    // Count methods
    long countByTask(Task task);
    
    long countByTaskId(Long taskId);
    
    long countByBuilding(Building building);
    
    long countByBuildingId(Long buildingId);
    
    long countByUploadedBy(User user);
    
    long countByUploadedById(Long userId);
    
    @Query("SELECT COUNT(m) FROM Media m WHERE m.mimeType LIKE 'image/%'")
    long countImages();
    
    @Query("SELECT COUNT(m) FROM Media m WHERE m.mimeType LIKE 'video/%'")
    long countVideos();
    
    // Storage statistics
    @Query("SELECT SUM(m.fileSize) FROM Media m")
    Long getTotalFileSize();
    
    @Query("SELECT SUM(m.fileSize) FROM Media m WHERE m.mimeType LIKE 'image/%'")
    Long getTotalImageSize();
    
    @Query("SELECT SUM(m.fileSize) FROM Media m WHERE m.mimeType LIKE 'video/%'")
    Long getTotalVideoSize();
    
    @Query("SELECT AVG(m.fileSize) FROM Media m")
    Double getAverageFileSize();
    
    @Query("SELECT MAX(m.uploadedAt) FROM Media m")
    Optional<LocalDateTime> getLastUploadTime();
    
    // Find orphaned media (not associated with any task or building)
    @Query("SELECT m FROM Media m WHERE m.task IS NULL AND m.building IS NULL")
    List<Media> findOrphanedMedia();
    
    // Find large files (over specified size)
    @Query("SELECT m FROM Media m WHERE m.fileSize > :sizeLimit ORDER BY m.fileSize DESC")
    List<Media> findLargeFiles(@Param("sizeLimit") Long sizeLimit);
    
    // Find old files (uploaded before specified date)
    @Query("SELECT m FROM Media m WHERE m.uploadedAt < :cutoffDate ORDER BY m.uploadedAt ASC")
    List<Media> findOldFiles(@Param("cutoffDate") LocalDateTime cutoffDate);
    
    // Search by filename or original name
    @Query("SELECT m FROM Media m WHERE " +
           "LOWER(m.fileName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(m.originalName) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "ORDER BY m.uploadedAt DESC")
    List<Media> searchByName(@Param("query") String query);
    
    Page<Media> findByFileNameContainingIgnoreCaseOrOriginalNameContainingIgnoreCaseOrderByUploadedAtDesc(
        String fileName, String originalName, Pageable pageable);
    
    // Delete methods
    void deleteByTaskId(Long taskId);
    
    void deleteByBuildingId(Long buildingId);
    
    void deleteByUploadedById(Long userId);
    
    @Query("DELETE FROM Media m WHERE m.uploadedAt < :cutoffDate")
    void deleteOldFiles(@Param("cutoffDate") LocalDateTime cutoffDate);
}
