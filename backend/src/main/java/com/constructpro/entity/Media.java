// Spring Boot Entity for storing media files in database
// Place this file in: backend/src/main/java/com/constructpro/entity/Media.java

package com.constructpro.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "media", indexes = {
    @Index(name = "idx_media_task_id", columnList = "task_id"),
    @Index(name = "idx_media_building_id", columnList = "building_id"),
    @Index(name = "idx_media_uploaded_by", columnList = "uploaded_by"),
    @Index(name = "idx_media_mime_type", columnList = "mime_type"),
    @Index(name = "idx_media_uploaded_at", columnList = "uploaded_at")
})
public class Media {
    
    @Id
    @Column(length = 36)
    private String id;
    
    @Column(name = "file_name", nullable = false)
    private String fileName;
    
    @Column(name = "original_name", nullable = false)
    private String originalName;
    
    @Column(name = "mime_type", nullable = false, length = 100)
    private String mimeType;
    
    @Column(name = "file_size", nullable = false)
    private Long fileSize;

	@Lob
	@Column(name = "file_data", nullable = false)
	private String fileData;
    
    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id")
    private Building building;
    
    // Constructors
    public Media() {
        this.uploadedAt = LocalDateTime.now();
    }
    
    public Media(String id, String fileName, String originalName, String mimeType, 
                 Long fileSize, String fileData) {
        this();
        this.id = id;
        this.fileName = fileName;
        this.originalName = originalName;
        this.mimeType = mimeType;
        this.fileSize = fileSize;
        this.fileData = fileData;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getFileName() {
        return fileName;
    }
    
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    
    public String getOriginalName() {
        return originalName;
    }
    
    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }
    
    public String getMimeType() {
        return mimeType;
    }
    
    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }
    
    public Long getFileSize() {
        return fileSize;
    }
    
    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }
    
    public String getFileData() {
        return fileData;
    }
    
    public void setFileData(String fileData) {
        this.fileData = fileData;
    }
    
    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }
    
    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
    
    public User getUploadedBy() {
        return uploadedBy;
    }
    
    public void setUploadedBy(User uploadedBy) {
        this.uploadedBy = uploadedBy;
    }
    
    public Task getTask() {
        return task;
    }
    
    public void setTask(Task task) {
        this.task = task;
    }
    
    public Building getBuilding() {
        return building;
    }
    
    public void setBuilding(Building building) {
        this.building = building;
    }
    
    // Helper methods
    public String getFileType() {
        if (mimeType.startsWith("image/")) {
            return "image";
        } else if (mimeType.startsWith("video/")) {
            return "video";
        }
        return "other";
    }
    
    public boolean isImage() {
        return mimeType.startsWith("image/");
    }
    
    public boolean isVideo() {
        return mimeType.startsWith("video/");
    }
    
    public String getFileSizeFormatted() {
        if (fileSize < 1024) {
            return fileSize + " B";
        } else if (fileSize < 1024 * 1024) {
            return String.format("%.1f KB", fileSize / 1024.0);
        } else {
            return String.format("%.1f MB", fileSize / (1024.0 * 1024.0));
        }
    }
    
    @Override
    public String toString() {
        return "Media{" +
                "id='" + id + '\'' +
                ", fileName='" + fileName + '\'' +
                ", originalName='" + originalName + '\'' +
                ", mimeType='" + mimeType + '\'' +
                ", fileSize=" + fileSize +
                ", uploadedAt=" + uploadedAt +
                '}';
    }
}
