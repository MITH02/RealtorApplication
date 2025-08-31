// Spring Boot Controller for Media operations
// Place this file in: backend/src/main/java/com/constructpro/controller/MediaController.java

package com.constructpro.controller;

import com.constructpro.entity.Media;
import com.constructpro.entity.User;
import com.constructpro.service.MediaService;
import com.constructpro.dto.MediaUploadResponse;
import com.constructpro.dto.MediaListResponse;
import com.constructpro.dto.StorageStatsResponse;
import com.constructpro.dto.response.MessageResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    // Upload single file
    @PostMapping("/upload")
    @PreAuthorize("hasRole('BUILDER') or hasRole('CONTRACTOR') or hasRole('ADMIN')")
    public ResponseEntity<?> uploadSingleFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "taskId", required = false) Long taskId,
            @RequestParam(value = "buildingId", required = false) Long buildingId,
            Authentication authentication) {
        
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("No file uploaded"));
            }

            // Validate file size (50MB limit)
            if (file.getSize() > 50 * 1024 * 1024) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("File too large. Maximum size is 50MB."));
            }

            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || (!contentType.startsWith("image/") && !contentType.startsWith("video/"))) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("File type not allowed. Please upload images or videos only."));
            }

            MediaUploadResponse response = mediaService.uploadFile(file, taskId, buildingId, authentication.getName());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Upload failed: " + e.getMessage()));
        }
    }

    // Upload multiple files
    @PostMapping("/upload-multiple")
    @PreAuthorize("hasRole('BUILDER') or hasRole('CONTRACTOR') or hasRole('ADMIN')")
    public ResponseEntity<?> uploadMultipleFiles(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam(value = "taskId", required = false) Long taskId,
            @RequestParam(value = "buildingId", required = false) Long buildingId,
            Authentication authentication) {
        
        try {
            if (files.length == 0) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("No files uploaded"));
            }

            if (files.length > 10) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Too many files. Maximum 10 files per upload."));
            }

            List<MediaUploadResponse> responses = mediaService.uploadMultipleFiles(files, taskId, buildingId, authentication.getName());
            return ResponseEntity.ok(responses);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Upload failed: " + e.getMessage()));
        }
    }

    // Serve media file
    @GetMapping("/view/{mediaId}")
    public ResponseEntity<byte[]> serveMedia(
            @PathVariable String mediaId,
            @RequestHeader(value = "Range", required = false) String rangeHeader) {
        
        try {
            Optional<Media> mediaOpt = mediaService.getMedia(mediaId);
            
            if (mediaOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Media media = mediaOpt.get();
            byte[] fileData = Base64.getDecoder().decode(media.getFileData());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(media.getMimeType()));
            headers.setContentLength(fileData.length);
            headers.setCacheControl("public, max-age=31536000"); // Cache for 1 year
            
            // Set filename for download
            headers.setContentDispositionFormData("inline", media.getOriginalName());

            // Handle range requests for video streaming
            if (rangeHeader != null && media.getMimeType().startsWith("video/")) {
                return handleRangeRequest(fileData, rangeHeader, headers);
            }

            return ResponseEntity.ok()
                .headers(headers)
                .body(fileData);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete media
    @DeleteMapping("/{mediaId}")
    @PreAuthorize("hasRole('BUILDER') or hasRole('ADMIN') or hasRole('CONTRACTOR')")
    public ResponseEntity<MessageResponse> deleteMedia(@PathVariable String mediaId, Authentication authentication) {
        try {
            User currentUser = (User) authentication.getPrincipal();
            boolean deleted = mediaService.deleteMedia(mediaId, currentUser);
            
            if (deleted) {
                return ResponseEntity.ok(new MessageResponse("Media deleted successfully"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error deleting media: " + e.getMessage()));
        }
    }

    // Get media info
    @GetMapping("/info/{mediaId}")
    public ResponseEntity<?> getMediaInfo(@PathVariable String mediaId) {
        try {
            Optional<Media> mediaOpt = mediaService.getMedia(mediaId);
            
            if (mediaOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Media not found"));
            }

            Media media = mediaOpt.get();
            
            // Return media info without the actual file data
            var mediaInfo = new Object() {
                public String id = media.getId();
                public String fileName = media.getFileName();
                public String originalName = media.getOriginalName();
                public String mimeType = media.getMimeType();
                public Long size = media.getFileSize();
                public String type = media.getFileType();
                public String uploadedAt = media.getUploadedAt().toString();
                public String uploadedBy = media.getUploadedBy() != null ? 
                    media.getUploadedBy().getFirstName() + " " + media.getUploadedBy().getLastName() : null;
                public String url = "/api/media/view/" + media.getId();
            };

            return ResponseEntity.ok(mediaInfo);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error getting media info: " + e.getMessage()));
        }
    }

    // List media with pagination
    @GetMapping("/list")
    public ResponseEntity<MediaListResponse> listMedia(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long taskId,
            @RequestParam(required = false) Long buildingId) {
        
        try {
            Pageable pageable = PageRequest.of(page - 1, limit);
            MediaListResponse response = mediaService.listMedia(pageable, type, taskId, buildingId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get storage statistics
    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StorageStatsResponse> getStorageStats() {
        try {
            StorageStatsResponse stats = mediaService.getStorageStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Health check
    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        try {
            var healthInfo = mediaService.getHealthInfo();
            return ResponseEntity.ok(healthInfo);
        } catch (Exception e) {
            var errorInfo = new Object() {
                public String status = "unhealthy";
                public String error = e.getMessage();
                public String timestamp = java.time.LocalDateTime.now().toString();
            };
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorInfo);
        }
    }

    // Get media by task
    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Media>> getMediaByTask(@PathVariable Long taskId) {
        try {
            List<Media> mediaList = mediaService.getMediaByTask(taskId);
            return ResponseEntity.ok(mediaList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get media by building
    @GetMapping("/building/{buildingId}")
    public ResponseEntity<List<Media>> getMediaByBuilding(@PathVariable Long buildingId) {
        try {
            List<Media> mediaList = mediaService.getMediaByBuilding(buildingId);
            return ResponseEntity.ok(mediaList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Helper method to handle HTTP range requests for video streaming
    private ResponseEntity<byte[]> handleRangeRequest(byte[] fileData, String rangeHeader, HttpHeaders headers) {
        try {
            String[] ranges = rangeHeader.replace("bytes=", "").split("-");
            long start = Long.parseLong(ranges[0]);
            long end = ranges.length > 1 && !ranges[1].isEmpty() ? 
                Long.parseLong(ranges[1]) : fileData.length - 1;
            
            if (end >= fileData.length) {
                end = fileData.length - 1;
            }
            
            long contentLength = end - start + 1;
            byte[] chunk = new byte[(int) contentLength];
            System.arraycopy(fileData, (int) start, chunk, 0, (int) contentLength);
            
            headers.add("Content-Range", String.format("bytes %d-%d/%d", start, end, fileData.length));
            headers.add("Accept-Ranges", "bytes");
            headers.setContentLength(contentLength);
            
            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                .headers(headers)
                .body(chunk);
                
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE).build();
        }
    }
}
