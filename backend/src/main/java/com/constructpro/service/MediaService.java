package com.constructpro.service;

import com.constructpro.entity.Media;
import com.constructpro.entity.User;
import com.constructpro.entity.Task;
import com.constructpro.entity.Building;
import com.constructpro.repository.MediaRepository;
import com.constructpro.repository.UserRepository;
import com.constructpro.repository.TaskRepository;
import com.constructpro.repository.BuildingRepository;
import com.constructpro.dto.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.Base64;

@Service
@Transactional
public class MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    public MediaUploadResponse uploadFile(MultipartFile file, Long taskId, Long buildingId, String username) throws Exception {
        try {
            // Get user
            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Validate user access to task/building
            if (taskId != null) {
                Task task = taskRepository.findById(taskId)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
                
                // Contractors can only upload to their own tasks
                if (user.getRole() == User.Role.CONTRACTOR && 
                    !task.getAssignedContractor().getId().equals(user.getId())) {
                    throw new RuntimeException("You can only upload media to your own tasks");
                }
                
                // Builders can only upload to tasks in buildings they created
                if (user.getRole() == User.Role.BUILDER && 
                    !task.getBuilding().getCreatedBy().getId().equals(user.getId())) {
                    throw new RuntimeException("You can only upload media to tasks in buildings you created");
                }
            }

            if (buildingId != null) {
                Building building = buildingRepository.findById(buildingId)
                    .orElseThrow(() -> new RuntimeException("Building not found"));
                
                // Only builders can upload to buildings they created
                if (user.getRole() == User.Role.BUILDER && 
                    !building.getCreatedBy().getId().equals(user.getId())) {
                    throw new RuntimeException("You can only upload media to buildings you created");
                }
                
                // Contractors can only upload to buildings they're assigned to
                if (user.getRole() == User.Role.CONTRACTOR) {
                    // Check if contractor is assigned to this building
                    boolean isAssigned = building.getTasks().stream()
                        .anyMatch(task -> task.getAssignedContractor().getId().equals(user.getId()));
                    if (!isAssigned) {
                        throw new RuntimeException("You can only upload media to buildings you're assigned to");
                    }
                }
            }

            // Generate unique ID
            String mediaId = UUID.randomUUID().toString();

            // Encode file to base64
            String fileData = Base64.getEncoder().encodeToString(file.getBytes());

            // Create media entity
            Media media = new Media(mediaId, mediaId, file.getOriginalFilename(), 
                                  file.getContentType(), file.getSize(), fileData);
            media.setUploadedBy(user);

            // Set task if provided
            if (taskId != null) {
                Task task = taskRepository.findById(taskId).orElse(null);
                media.setTask(task);
            }

            // Set building if provided
            if (buildingId != null) {
                Building building = buildingRepository.findById(buildingId).orElse(null);
                media.setBuilding(building);
            }

            // Save media
            media = mediaRepository.save(media);

            // Return response
            return new MediaUploadResponse(
                media.getId(),
                "/api/media/view/" + media.getId(),
                media.getFileName(),
                media.getOriginalName(),
                media.getMimeType(),
                media.getFileSize(),
                media.getUploadedAt().toString()
            );

        } catch (Exception e) {
            throw new Exception("Failed to upload file: " + e.getMessage());
        }
    }

    public List<MediaUploadResponse> uploadMultipleFiles(MultipartFile[] files, Long taskId, Long buildingId, String username) throws Exception {
        List<MediaUploadResponse> responses = new ArrayList<>();
        
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                responses.add(uploadFile(file, taskId, buildingId, username));
            }
        }
        
        return responses;
    }

    public Optional<Media> getMedia(String mediaId) {
        return mediaRepository.findById(mediaId);
    }

    public boolean deleteMedia(String mediaId, User requestingUser) {
        Media media = mediaRepository.findById(mediaId)
            .orElseThrow(() -> new RuntimeException("Media not found"));
        
        // Validate user access
        if (requestingUser.getRole() == User.Role.ADMIN) {
            // Admins can delete any media
        } else if (requestingUser.getRole() == User.Role.BUILDER) {
            // Builders can only delete media from buildings they created
            if (media.getBuilding() != null && 
                !media.getBuilding().getCreatedBy().getId().equals(requestingUser.getId())) {
                throw new RuntimeException("You can only delete media from buildings you created");
            }
            if (media.getTask() != null && 
                !media.getTask().getBuilding().getCreatedBy().getId().equals(requestingUser.getId())) {
                throw new RuntimeException("You can only delete media from tasks in buildings you created");
            }
        } else if (requestingUser.getRole() == User.Role.CONTRACTOR) {
            // Contractors can only delete their own media
            if (!media.getUploadedBy().getId().equals(requestingUser.getId())) {
                throw new RuntimeException("You can only delete your own media");
            }
        } else {
            throw new RuntimeException("Access denied");
        }
        
        mediaRepository.deleteById(mediaId);
        return true;
    }

    public MediaListResponse listMedia(Pageable pageable, String type, Long taskId, Long buildingId) {
        Page<Media> mediaPage;

        if (type != null) {
            String mimeTypePrefix = type.toLowerCase() + "/";
            mediaPage = mediaRepository.findByMimeTypeStartingWithOrderByUploadedAtDesc(mimeTypePrefix, pageable);
        } else if (taskId != null) {
            mediaPage = mediaRepository.findAll(pageable); // You might want to implement findByTaskId with pagination
        } else if (buildingId != null) {
            mediaPage = mediaRepository.findAll(pageable); // You might want to implement findByBuildingId with pagination
        } else {
            mediaPage = mediaRepository.findAll(pageable);
        }

        List<MediaListItem> mediaItems = mediaPage.getContent().stream()
            .map(this::convertToMediaListItem)
            .collect(Collectors.toList());

        PaginationInfo pagination = new PaginationInfo(
            pageable.getPageNumber() + 1,
            pageable.getPageSize(),
            mediaPage.getTotalElements(),
            mediaPage.getTotalPages(),
            mediaPage.hasNext(),
            mediaPage.hasPrevious()
        );

        return new MediaListResponse(mediaItems, pagination);
    }

    public StorageStatsResponse getStorageStats() {
        long totalFiles = mediaRepository.count();
        Long totalSize = mediaRepository.getTotalFileSize();
        long imageCount = mediaRepository.countImages();
        long videoCount = mediaRepository.countVideos();
        Optional<LocalDateTime> lastUpload = mediaRepository.getLastUploadTime();

        return new StorageStatsResponse(
            totalFiles,
            totalSize != null ? totalSize : 0L,
            imageCount,
            videoCount,
            "database",
            lastUpload.orElse(null)
        );
    }

    public Map<String, Object> getHealthInfo() {
        Map<String, Object> healthInfo = new HashMap<>();
        healthInfo.put("status", "healthy");
        healthInfo.put("totalFiles", mediaRepository.count());
        healthInfo.put("timestamp", LocalDateTime.now().toString());
        healthInfo.put("storageType", "database");
        return healthInfo;
    }

    public List<Media> getMediaByTask(Long taskId) {
        return mediaRepository.findByTaskIdOrderByUploadedAtDesc(taskId);
    }

    public List<Media> getMediaByBuilding(Long buildingId) {
        return mediaRepository.findByBuildingIdOrderByUploadedAtDesc(buildingId);
    }

    private MediaListItem convertToMediaListItem(Media media) {
        String uploadedBy = null;
        if (media.getUploadedBy() != null) {
            uploadedBy = media.getUploadedBy().getFirstName() + " " + media.getUploadedBy().getLastName();
        }

        return new MediaListItem(
            media.getId(),
            media.getFileName(),
            media.getOriginalName(),
            media.getMimeType(),
            media.getFileSize(),
            media.getFileType(),
            media.getUploadedAt().toString(),
            uploadedBy,
            "/api/media/view/" + media.getId()
        );
    }
}
