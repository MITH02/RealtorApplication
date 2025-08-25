package com.constructpro.dto;

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
