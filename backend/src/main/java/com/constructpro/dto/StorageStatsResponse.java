package com.constructpro.dto;

import java.time.LocalDateTime;

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
