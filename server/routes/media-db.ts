import { RequestHandler } from "express";
import multer from "multer";
import { randomUUID } from "crypto";

// Types for database media storage
interface MediaRecord {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  data: string; // Base64 encoded file data
  uploadedAt: string;
  uploadedBy?: string;
  taskId?: number;
  buildingId?: number;
}

interface MediaUploadResponse {
  id: string;
  url: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
}

interface MediaUploadError {
  message: string;
  code: string;
  details?: any;
}

// In-memory database simulation (replace with actual database connection)
const mediaDatabase: Map<string, MediaRecord> = new Map();

// Configure multer for memory storage (no file system writes)
const storage = multer.memoryStorage();

// File filter for security
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/tiff",
    // Videos
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
    "video/x-msvideo", // .avi
    "video/x-ms-wmv", // .wmv
    "video/webm",
    "video/3gpp",
    "video/x-flv",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `File type ${file.mimetype} is not allowed. Please upload images or videos only.`,
      ),
      false,
    );
  }
};

// Configure multer with size limits and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
    files: 10, // Max 10 files per request
  },
});

// Helper function to convert buffer to base64
function bufferToBase64(buffer: Buffer): string {
  return buffer.toString("base64");
}

// Helper function to get file type
function getFileType(mimeType: string): "image" | "video" {
  return mimeType.startsWith("video/") ? "video" : "image";
}

// Upload single file handler
export const uploadSingleFile: RequestHandler = async (req, res) => {
  try {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.error("Upload error:", err);
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              message: "File too large. Maximum size is 50MB.",
              code: "FILE_TOO_LARGE",
            } as MediaUploadError);
          }
        }
        return res.status(400).json({
          message: err.message || "Upload failed",
          code: "UPLOAD_ERROR",
        } as MediaUploadError);
      }

      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
          code: "NO_FILE",
        } as MediaUploadError);
      }

      const file = req.file;
      const fileId = randomUUID();
      const base64Data = bufferToBase64(file.buffer);

      // Create media record
      const mediaRecord: MediaRecord = {
        id: fileId,
        fileName: `${fileId}_${file.originalname}`,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        data: base64Data,
        uploadedAt: new Date().toISOString(),
        uploadedBy: req.user?.id?.toString(), // Assuming user info is available
      };

      // Store in database (in-memory for now)
      mediaDatabase.set(fileId, mediaRecord);

      const response: MediaUploadResponse = {
        id: fileId,
        url: `/api/media/view/${fileId}`,
        fileName: mediaRecord.fileName,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        uploadedAt: mediaRecord.uploadedAt,
      };

      res.json(response);
    });
  } catch (error) {
    console.error("Unexpected upload error:", error);
    res.status(500).json({
      message: "Internal server error during upload",
      code: "INTERNAL_ERROR",
    } as MediaUploadError);
  }
};

// Upload multiple files handler
export const uploadMultipleFiles: RequestHandler = async (req, res) => {
  try {
    upload.array("files", 10)(req, res, (err) => {
      if (err) {
        console.error("Multiple upload error:", err);
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              message:
                "One or more files are too large. Maximum size is 50MB per file.",
              code: "FILE_TOO_LARGE",
            } as MediaUploadError);
          }
          if (err.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
              message: "Too many files. Maximum 10 files per upload.",
              code: "TOO_MANY_FILES",
            } as MediaUploadError);
          }
        }
        return res.status(400).json({
          message: err.message || "Upload failed",
          code: "UPLOAD_ERROR",
        } as MediaUploadError);
      }

      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({
          message: "No files uploaded",
          code: "NO_FILES",
        } as MediaUploadError);
      }

      const responses: MediaUploadResponse[] = [];

      files.forEach((file) => {
        const fileId = randomUUID();
        const base64Data = bufferToBase64(file.buffer);

        const mediaRecord: MediaRecord = {
          id: fileId,
          fileName: `${fileId}_${file.originalname}`,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          data: base64Data,
          uploadedAt: new Date().toISOString(),
          uploadedBy: req.user?.id?.toString(),
        };

        // Store in database
        mediaDatabase.set(fileId, mediaRecord);

        responses.push({
          id: fileId,
          url: `/api/media/view/${fileId}`,
          fileName: mediaRecord.fileName,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          uploadedAt: mediaRecord.uploadedAt,
        });
      });

      res.json(responses);
    });
  } catch (error) {
    console.error("Unexpected multiple upload error:", error);
    res.status(500).json({
      message: "Internal server error during upload",
      code: "INTERNAL_ERROR",
    } as MediaUploadError);
  }
};

// Serve media from database
export const serveMedia: RequestHandler = async (req, res) => {
  try {
    const { mediaId } = req.params;

    if (!mediaId) {
      return res.status(400).json({
        message: "Media ID is required",
        code: "MISSING_MEDIA_ID",
      } as MediaUploadError);
    }

    const mediaRecord = mediaDatabase.get(mediaId);

    if (!mediaRecord) {
      return res.status(404).json({
        message: "Media not found",
        code: "MEDIA_NOT_FOUND",
      } as MediaUploadError);
    }

    // Convert base64 back to buffer
    const buffer = Buffer.from(mediaRecord.data, "base64");

    // Set appropriate headers
    res.setHeader("Content-Type", mediaRecord.mimeType);
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache for 1 year
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${mediaRecord.originalName}"`,
    );

    // Handle range requests for video streaming
    const range = req.headers.range;
    if (range && mediaRecord.mimeType.startsWith("video/")) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : buffer.length - 1;
      const chunksize = end - start + 1;

      res.status(206);
      res.setHeader("Content-Range", `bytes ${start}-${end}/${buffer.length}`);
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Length", chunksize);

      const chunk = buffer.slice(start, end + 1);
      res.end(chunk);
    } else {
      // Serve full file
      res.end(buffer);
    }
  } catch (error) {
    console.error("Media serve error:", error);
    res.status(500).json({
      message: "Error serving media",
      code: "SERVE_ERROR",
    } as MediaUploadError);
  }
};

// Delete media from database
export const deleteMedia: RequestHandler = async (req, res) => {
  try {
    const { mediaId } = req.params;

    if (!mediaId) {
      return res.status(400).json({
        message: "Media ID is required",
        code: "MISSING_MEDIA_ID",
      } as MediaUploadError);
    }

    const deleted = mediaDatabase.delete(mediaId);

    if (!deleted) {
      return res.status(404).json({
        message: "Media not found",
        code: "MEDIA_NOT_FOUND",
      } as MediaUploadError);
    }

    res.json({
      message: "Media deleted successfully",
      mediaId,
    });
  } catch (error) {
    console.error("Media deletion error:", error);
    res.status(500).json({
      message: "Error deleting media",
      code: "DELETE_ERROR",
    } as MediaUploadError);
  }
};

// Get media info
export const getMediaInfo: RequestHandler = async (req, res) => {
  try {
    const { mediaId } = req.params;

    if (!mediaId) {
      return res.status(400).json({
        message: "Media ID is required",
        code: "MISSING_MEDIA_ID",
      } as MediaUploadError);
    }

    const mediaRecord = mediaDatabase.get(mediaId);

    if (!mediaRecord) {
      return res.status(404).json({
        message: "Media not found",
        code: "MEDIA_NOT_FOUND",
      } as MediaUploadError);
    }

    const mediaInfo = {
      id: mediaRecord.id,
      fileName: mediaRecord.fileName,
      originalName: mediaRecord.originalName,
      mimeType: mediaRecord.mimeType,
      size: mediaRecord.size,
      type: getFileType(mediaRecord.mimeType),
      uploadedAt: mediaRecord.uploadedAt,
      uploadedBy: mediaRecord.uploadedBy,
      url: `/api/media/view/${mediaRecord.id}`,
    };

    res.json(mediaInfo);
  } catch (error) {
    console.error("Media info error:", error);
    res.status(500).json({
      message: "Error getting media info",
      code: "INFO_ERROR",
    } as MediaUploadError);
  }
};

// List all media (with pagination)
export const listMedia: RequestHandler = async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const type = req.query.type as string; // 'image' or 'video'

    let mediaArray = Array.from(mediaDatabase.values());

    // Filter by type if specified
    if (type) {
      mediaArray = mediaArray.filter(
        (media) => getFileType(media.mimeType) === type,
      );
    }

    // Sort by upload date (newest first)
    mediaArray.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMedia = mediaArray.slice(startIndex, endIndex);

    const result = {
      media: paginatedMedia.map((media) => ({
        id: media.id,
        fileName: media.fileName,
        originalName: media.originalName,
        mimeType: media.mimeType,
        size: media.size,
        type: getFileType(media.mimeType),
        uploadedAt: media.uploadedAt,
        uploadedBy: media.uploadedBy,
        url: `/api/media/view/${media.id}`,
      })),
      pagination: {
        page,
        limit,
        total: mediaArray.length,
        totalPages: Math.ceil(mediaArray.length / limit),
        hasNextPage: endIndex < mediaArray.length,
        hasPrevPage: page > 1,
      },
    };

    res.json(result);
  } catch (error) {
    console.error("Media list error:", error);
    res.status(500).json({
      message: "Error listing media",
      code: "LIST_ERROR",
    } as MediaUploadError);
  }
};

// Get storage statistics
export const getStorageStats: RequestHandler = async (req, res) => {
  try {
    const mediaArray = Array.from(mediaDatabase.values());

    const stats = {
      totalFiles: mediaArray.length,
      totalSize: mediaArray.reduce((sum, media) => sum + media.size, 0),
      imageCount: mediaArray.filter(
        (media) => getFileType(media.mimeType) === "image",
      ).length,
      videoCount: mediaArray.filter(
        (media) => getFileType(media.mimeType) === "video",
      ).length,
      storageType: "database",
      lastUpload:
        mediaArray.length > 0
          ? Math.max(
              ...mediaArray.map((media) =>
                new Date(media.uploadedAt).getTime(),
              ),
            )
          : null,
    };

    res.json(stats);
  } catch (error) {
    console.error("Storage stats error:", error);
    res.status(500).json({
      message: "Error getting storage statistics",
      code: "STATS_ERROR",
    } as MediaUploadError);
  }
};

// Health check
export const healthCheck: RequestHandler = async (req, res) => {
  try {
    const mediaCount = mediaDatabase.size;
    const totalSize = Array.from(mediaDatabase.values()).reduce(
      (sum, media) => sum + media.size,
      0,
    );

    res.json({
      status: "healthy",
      storageType: "database",
      mediaCount,
      totalSize: `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
      maxFileSize: "50MB",
      maxFiles: 10,
      allowedTypes: ["images", "videos"],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      error: error,
      timestamp: new Date().toISOString(),
    });
  }
};

export default {
  uploadSingleFile,
  uploadMultipleFiles,
  serveMedia,
  deleteMedia,
  getMediaInfo,
  listMedia,
  getStorageStats,
  healthCheck,
};
