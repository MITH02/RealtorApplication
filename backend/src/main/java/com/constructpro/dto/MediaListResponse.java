package com.constructpro.dto;

import java.util.List;

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
