package com.constructpro.dto;

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
