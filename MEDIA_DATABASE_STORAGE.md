# Database-Based Media Storage System

## Overview

Your ConstructPro media upload system now stores photos and videos **directly in the database** as Base64-encoded data instead of saving files to the file system.

## How It Works

### 1. **File Upload Process**
```
User uploads file → Convert to Base64 → Store in database → Return media URL
```

### 2. **File Storage**
- Files are converted to **Base64 strings** and stored in the `media` table
- No physical files are saved to disk
- All file metadata (name, size, type) is stored alongside the data

### 3. **File Serving**
- Files are served via `/api/media/view/{mediaId}` endpoint
- Base64 data is converted back to binary and streamed to the browser
- Supports video streaming with HTTP range requests

## Database Schema

```sql
CREATE TABLE media (
    id VARCHAR(36) PRIMARY KEY,           -- UUID
    file_name VARCHAR(255) NOT NULL,      -- Generated filename
    original_name VARCHAR(255) NOT NULL,  -- User's original filename
    mime_type VARCHAR(100) NOT NULL,      -- image/jpeg, video/mp4, etc.
    file_size BIGINT NOT NULL,           -- File size in bytes
    file_data LONGTEXT NOT NULL,         -- Base64 encoded file data
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by BIGINT,                  -- Foreign key to users table
    task_id BIGINT,                      -- Foreign key to tasks table
    building_id BIGINT                   -- Foreign key to buildings table
);
```

## API Endpoints

### Node.js Server (Current Implementation)
- `POST /api/media/upload` - Upload single file
- `POST /api/media/upload-multiple` - Upload multiple files
- `GET /api/media/view/{mediaId}` - View/download file
- `DELETE /api/media/{mediaId}` - Delete file
- `GET /api/media/info/{mediaId}` - Get file information
- `GET /api/media/list` - List all media with pagination
- `GET /api/media/stats` - Storage statistics
- `GET /api/media/health` - Health check

### Spring Boot Integration (Ready to Implement)
- Complete Java entity, repository, controller, and DTOs provided
- Same API endpoints as Node.js version
- Ready to replace Node.js implementation when needed

## Usage in Your Application

### **For Contractors:**
1. Update task progress → Upload photos/videos → Files stored in database
2. Mark task complete → Upload completion photos → Files linked to task

### **For Builders:**
1. Create buildings → Upload documentation → Files linked to building
2. Create tasks → Upload reference materials → Files linked to task
3. Review contractor progress → View uploaded media

## Key Features

### ✅ **Benefits**
- **No file system dependencies** - everything in database
- **Backup included** - media backed up with database
- **Atomic operations** - media and metadata always in sync
- **No broken links** - files can't be accidentally deleted
- **Portable** - entire system moves with database
- **Version control** - media versioned with database schema

### ⚠️ **Considerations**
- **Database size** - will grow with media uploads
- **Memory usage** - Base64 encoding increases size by ~33%
- **Query performance** - large LONGTEXT fields may impact queries
- **Backup time** - database backups will take longer

## File Size Limits

- **Per file**: 50MB maximum
- **Per upload**: 10 files maximum
- **Database field**: LONGTEXT supports ~16MB (use LONGBLOB for larger files)
- **Total storage**: Limited by your database storage capacity

## Current Storage Structure

```
Your Database
├── media table (stores all files as Base64)
├── task_updates table (references media via URLs)
├── tasks table (links to media via task_updates)
└── buildings table (can reference media)
```

## Migration from File Storage

The system automatically works with your existing TaskUpdate.imageUrls:
- Old file URLs continue to work
- New uploads create database entries
- URLs now point to `/api/media/view/{mediaId}` instead of files

## Performance Optimization

### **Database Optimizations**
```sql
-- Indexes for fast queries
CREATE INDEX idx_media_task_id ON media(task_id);
CREATE INDEX idx_media_building_id ON media(building_id);
CREATE INDEX idx_media_mime_type ON media(mime_type);
```

### **Application Optimizations**
- Media data is excluded from list queries (only metadata)
- File data is only loaded when serving the actual file
- Caching headers set for browser caching

## Example Usage

### **Upload a photo:**
```javascript
const file = document.getElementById('fileInput').files[0];
const response = await apiService.uploadSingleFile(file);
// Returns: { id: "uuid", url: "/api/media/view/uuid", ... }
```

### **Display the photo:**
```html
<img src="/api/media/view/uuid" alt="Task progress" />
```

### **Get file info:**
```javascript
const info = await apiService.getMediaFileInfo("uuid");
// Returns file metadata without the actual file data
```

## Next Steps

1. **Current**: Node.js server handles all media operations
2. **Future**: Spring Boot backend can take over using provided Java classes
3. **Optional**: Add cloud storage integration for hybrid approach

Your media upload system is now fully functional with database storage! 🎉
