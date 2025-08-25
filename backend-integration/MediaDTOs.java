// DTOs for Media operations
// Place these classes in: backend/src/main/java/com/constructpro/dto/

package com.constructpro.dto;

import java.time.LocalDateTime;
import java.util.List;

// Response for successful media upload
public class MediaUploadResponse {
    private String id;
    private String url;
    private String fileName;
    private String originalName;
    private String mimeType;
    private Long size;
    private String uploadedAt;

    // Constructors
    public MediaUploadResponse() {}

    public MediaUploadResponse(String id, String url, String fileName, String originalName, 
                              String mimeType, Long size, String uploadedAt) {
        this.id = id;
        this.url = url;
        this.fileName = fileName;
        this.originalName = originalName;
        this.mimeType = mimeType;
        this.size = size;
        this.uploadedAt = uploadedAt;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getOriginalName() { return originalName; }
    public void setOriginalName(String originalName) { this.originalName = originalName; }

    public String getMimeType() { return mimeType; }
    public void setMimeType(String mimeType) { this.mimeType = mimeType; }

    public Long getSize() { return size; }
    public void setSize(Long size) { this.size = size; }

    public String getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(String uploadedAt) { this.uploadedAt = uploadedAt; }
}

// Media item for listing
public class MediaListItem {
    private String id;
    private String fileName;
    private String originalName;
    private String mimeType;
    private Long size;
    private String type;
    private String uploadedAt;
    private String uploadedBy;
    private String url;

    // Constructors
    public MediaListItem() {}

    public MediaListItem(String id, String fileName, String originalName, String mimeType,
                        Long size, String type, String uploadedAt, String uploadedBy, String url) {
        this.id = id;
        this.fileName = fileName;
        this.originalName = originalName;
        this.mimeType = mimeType;
        this.size = size;
        this.type = type;
        this.uploadedAt = uploadedAt;
        this.uploadedBy = uploadedBy;
        this.url = url;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getOriginalName() { return originalName; }
    public void setOriginalName(String originalName) { this.originalName = originalName; }

    public String getMimeType() { return mimeType; }
    public void setMimeType(String mimeType) { this.mimeType = mimeType; }

    public Long getSize() { return size; }
    public void setSize(Long size) { this.size = size; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(String uploadedAt) { this.uploadedAt = uploadedAt; }

    public String getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(String uploadedBy) { this.uploadedBy = uploadedBy; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}

// Pagination info
public class PaginationInfo {
    private int page;
    private int limit;
    private long total;
    private int totalPages;
    private boolean hasNextPage;
    private boolean hasPrevPage;

    // Constructors
    public PaginationInfo() {}

    public PaginationInfo(int page, int limit, long total, int totalPages, 
                         boolean hasNextPage, boolean hasPrevPage) {
        this.page = page;
        this.limit = limit;
        this.total = total;
        this.totalPages = totalPages;
        this.hasNextPage = hasNextPage;
        this.hasPrevPage = hasPrevPage;
    }

    // Getters and Setters
    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }

    public int getLimit() { return limit; }
    public void setLimit(int limit) { this.limit = limit; }

    public long getTotal() { return total; }
    public void setTotal(long total) { this.total = total; }

    public int getTotalPages() { return totalPages; }
    public void setTotalPages(int totalPages) { this.totalPages = totalPages; }

    public boolean isHasNextPage() { return hasNextPage; }
    public void setHasNextPage(boolean hasNextPage) { this.hasNextPage = hasNextPage; }

    public boolean isHasPrevPage() { return hasPrevPage; }
    public void setHasPrevPage(boolean hasPrevPage) { this.hasPrevPage = hasPrevPage; }
}

// Response for media listing
public class MediaListResponse {
    private List<MediaListItem> media;
    private PaginationInfo pagination;

    // Constructors
    public MediaListResponse() {}

    public MediaListResponse(List<MediaListItem> media, PaginationInfo pagination) {
        this.media = media;
        this.pagination = pagination;
    }

    // Getters and Setters
    public List<MediaListItem> getMedia() { return media; }
    public void setMedia(List<MediaListItem> media) { this.media = media; }

    public PaginationInfo getPagination() { return pagination; }
    public void setPagination(PaginationInfo pagination) { this.pagination = pagination; }
}

// Storage statistics response
public class StorageStatsResponse {
    private long totalFiles;
    private long totalSize;
    private long imageCount;
    private long videoCount;
    private String storageType;
    private LocalDateTime lastUpload;

    // Constructors
    public StorageStatsResponse() {}

    public StorageStatsResponse(long totalFiles, long totalSize, long imageCount, 
                              long videoCount, String storageType, LocalDateTime lastUpload) {
        this.totalFiles = totalFiles;
        this.totalSize = totalSize;
        this.imageCount = imageCount;
        this.videoCount = videoCount;
        this.storageType = storageType;
        this.lastUpload = lastUpload;
    }

    // Getters and Setters
    public long getTotalFiles() { return totalFiles; }
    public void setTotalFiles(long totalFiles) { this.totalFiles = totalFiles; }

    public long getTotalSize() { return totalSize; }
    public void setTotalSize(long totalSize) { this.totalSize = totalSize; }

    public long getImageCount() { return imageCount; }
    public void setImageCount(long imageCount) { this.imageCount = imageCount; }

    public long getVideoCount() { return videoCount; }
    public void setVideoCount(long videoCount) { this.videoCount = videoCount; }

    public String getStorageType() { return storageType; }
    public void setStorageType(String storageType) { this.storageType = storageType; }

    public LocalDateTime getLastUpload() { return lastUpload; }
    public void setLastUpload(LocalDateTime lastUpload) { this.lastUpload = lastUpload; }
}

// Generic message response
public class MessageResponse {
    private String message;

    public MessageResponse() {}

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
