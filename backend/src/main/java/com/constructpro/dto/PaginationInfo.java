package com.constructpro.dto;

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
