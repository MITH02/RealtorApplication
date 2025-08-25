-- Database schema for storing media files directly in database
-- This should be added to your Spring Boot backend database

-- Create media table for storing files as base64
CREATE TABLE media (
    id VARCHAR(36) PRIMARY KEY,  -- UUID
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    file_data LONGTEXT NOT NULL,  -- Base64 encoded file data
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by BIGINT,
    task_id BIGINT,
    building_id BIGINT,
    
    -- Foreign key constraints (adjust table names as needed)
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE,
    
    -- Indexes for performance
    INDEX idx_media_task_id (task_id),
    INDEX idx_media_building_id (building_id),
    INDEX idx_media_uploaded_by (uploaded_by),
    INDEX idx_media_mime_type (mime_type),
    INDEX idx_media_uploaded_at (uploaded_at)
);

-- Update task_updates table to reference media instead of storing URLs
-- Remove the existing imageUrls ElementCollection and add media relationships
ALTER TABLE task_updates 
ADD COLUMN media_ids TEXT; -- Store comma-separated media IDs

-- Optional: Create a junction table for many-to-many relationship
CREATE TABLE task_update_media (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    task_update_id BIGINT NOT NULL,
    media_id VARCHAR(36) NOT NULL,
    
    FOREIGN KEY (task_update_id) REFERENCES task_updates(id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_task_media (task_update_id, media_id)
);

-- Create indexes for the junction table
CREATE INDEX idx_task_update_media_task_id ON task_update_media(task_update_id);
CREATE INDEX idx_task_update_media_media_id ON task_update_media(media_id);

-- Optional: Add media support to buildings for documentation
CREATE TABLE building_media (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    building_id BIGINT NOT NULL,
    media_id VARCHAR(36) NOT NULL,
    media_type ENUM('documentation', 'thumbnail', 'progress', 'other') DEFAULT 'documentation',
    
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_building_media (building_id, media_id)
);

-- Sample data types and constraints
-- Adjust these based on your requirements:

-- Maximum file size: 50MB (52,428,800 bytes)
-- Supported mime types: image/*, video/*
-- Storage: Base64 encoded in LONGTEXT (supports up to ~16MB per field in MySQL)
-- For larger files, consider LONGBLOB instead of LONGTEXT

-- Alternative schema using LONGBLOB for binary storage:
/*
CREATE TABLE media_binary (
    id VARCHAR(36) PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    file_data LONGBLOB NOT NULL,  -- Binary file data
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by BIGINT,
    task_id BIGINT,
    building_id BIGINT,
    
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE
);
*/

-- Views for easy querying
CREATE VIEW media_summary AS
SELECT 
    m.id,
    m.file_name,
    m.original_name,
    m.mime_type,
    m.file_size,
    m.uploaded_at,
    CONCAT(u.first_name, ' ', u.last_name) as uploaded_by_name,
    t.name as task_name,
    b.name as building_name,
    CASE 
        WHEN m.mime_type LIKE 'image/%' THEN 'image'
        WHEN m.mime_type LIKE 'video/%' THEN 'video'
        ELSE 'other'
    END as file_type
FROM media m
LEFT JOIN users u ON m.uploaded_by = u.id
LEFT JOIN tasks t ON m.task_id = t.id
LEFT JOIN buildings b ON m.building_id = b.id;

-- Storage statistics view
CREATE VIEW storage_stats AS
SELECT 
    COUNT(*) as total_files,
    SUM(file_size) as total_size_bytes,
    ROUND(SUM(file_size) / 1024 / 1024, 2) as total_size_mb,
    COUNT(CASE WHEN mime_type LIKE 'image/%' THEN 1 END) as image_count,
    COUNT(CASE WHEN mime_type LIKE 'video/%' THEN 1 END) as video_count,
    AVG(file_size) as avg_file_size,
    MAX(uploaded_at) as last_upload
FROM media;
