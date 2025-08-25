import { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

// Types for media uploads
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

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads", "media");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = randomUUID();
    const ext = path.extname(file.originalname);
    const fileName = `${uniqueId}${ext}`;
    cb(null, fileName);
  },
});

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
          if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
              message: "Unexpected field name. Use 'file' field for uploads.",
              code: "INVALID_FIELD_NAME",
            } as MediaUploadError);
          }
        }
        return res.status(400).json({
          message: err.message || "Upload failed",
          code: "UPLOAD_ERROR",
          details: err,
        } as MediaUploadError);
      }

      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
          code: "NO_FILE",
        } as MediaUploadError);
      }

      const file = req.file;
      const fileUrl = `/api/media/files/${file.filename}`;

      const response: MediaUploadResponse = {
        id: path.parse(file.filename).name,
        url: fileUrl,
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };

      res.json(response);
    });
  } catch (error) {
    console.error("Unexpected upload error:", error);
    res.status(500).json({
      message: "Internal server error during upload",
      code: "INTERNAL_ERROR",
      details: error,
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
          details: err,
        } as MediaUploadError);
      }

      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({
          message: "No files uploaded",
          code: "NO_FILES",
        } as MediaUploadError);
      }

      const responses: MediaUploadResponse[] = files.map((file) => ({
        id: path.parse(file.filename).name,
        url: `/api/media/files/${file.filename}`,
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      }));

      res.json(responses);
    });
  } catch (error) {
    console.error("Unexpected multiple upload error:", error);
    res.status(500).json({
      message: "Internal server error during upload",
      code: "INTERNAL_ERROR",
      details: error,
    } as MediaUploadError);
  }
};

// Serve uploaded files
export const serveFile: RequestHandler = async (req, res) => {
  try {
    const { filename } = req.params;

    // Validate filename to prevent directory traversal
    if (
      !filename ||
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\")
    ) {
      return res.status(400).json({
        message: "Invalid filename",
        code: "INVALID_FILENAME",
      } as MediaUploadError);
    }

    const filePath = path.join(uploadsDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found",
        code: "FILE_NOT_FOUND",
      } as MediaUploadError);
    }

    // Get file stats for content length
    const stats = fs.statSync(filePath);

    // Set appropriate headers
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".bmp": "image/bmp",
      ".tiff": "image/tiff",
      ".mp4": "video/mp4",
      ".mpeg": "video/mpeg",
      ".mov": "video/quicktime",
      ".avi": "video/x-msvideo",
      ".wmv": "video/x-ms-wmv",
      ".webm": "video/webm",
      ".3gp": "video/3gpp",
      ".flv": "video/x-flv",
    };

    const mimeType = mimeTypes[ext] || "application/octet-stream";

    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Length", stats.size);
    res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache for 1 year
    res.setHeader("ETag", `"${stats.mtime.getTime()}-${stats.size}"`);

    // Handle range requests for video streaming
    const range = req.headers.range;
    if (range && mimeType.startsWith("video/")) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = end - start + 1;

      res.status(206);
      res.setHeader("Content-Range", `bytes ${start}-${end}/${stats.size}`);
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Length", chunksize);

      const stream = fs.createReadStream(filePath, { start, end });
      stream.pipe(res);
    } else {
      // Serve full file
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    }
  } catch (error) {
    console.error("File serve error:", error);
    res.status(500).json({
      message: "Error serving file",
      code: "SERVE_ERROR",
      details: error,
    } as MediaUploadError);
  }
};

// Delete uploaded file
export const deleteFile: RequestHandler = async (req, res) => {
  try {
    const { filename } = req.params;

    // Validate filename
    if (
      !filename ||
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\")
    ) {
      return res.status(400).json({
        message: "Invalid filename",
        code: "INVALID_FILENAME",
      } as MediaUploadError);
    }

    const filePath = path.join(uploadsDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found",
        code: "FILE_NOT_FOUND",
      } as MediaUploadError);
    }

    // Delete file
    fs.unlinkSync(filePath);

    res.json({
      message: "File deleted successfully",
      filename,
    });
  } catch (error) {
    console.error("File deletion error:", error);
    res.status(500).json({
      message: "Error deleting file",
      code: "DELETE_ERROR",
      details: error,
    } as MediaUploadError);
  }
};

// Get file info
export const getFileInfo: RequestHandler = async (req, res) => {
  try {
    const { filename } = req.params;

    // Validate filename
    if (
      !filename ||
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\")
    ) {
      return res.status(400).json({
        message: "Invalid filename",
        code: "INVALID_FILENAME",
      } as MediaUploadError);
    }

    const filePath = path.join(uploadsDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found",
        code: "FILE_NOT_FOUND",
      } as MediaUploadError);
    }

    // Get file stats
    const stats = fs.statSync(filePath);
    const ext = path.extname(filename).toLowerCase();

    // Determine file type
    const imageExts = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".bmp",
      ".tiff",
    ];
    const videoExts = [
      ".mp4",
      ".mpeg",
      ".mov",
      ".avi",
      ".wmv",
      ".webm",
      ".3gp",
      ".flv",
    ];

    let fileType = "unknown";
    if (imageExts.includes(ext)) {
      fileType = "image";
    } else if (videoExts.includes(ext)) {
      fileType = "video";
    }

    const fileInfo = {
      id: path.parse(filename).name,
      fileName: filename,
      size: stats.size,
      type: fileType,
      createdAt: stats.birthtime.toISOString(),
      modifiedAt: stats.mtime.toISOString(),
      url: `/api/media/files/${filename}`,
    };

    res.json(fileInfo);
  } catch (error) {
    console.error("File info error:", error);
    res.status(500).json({
      message: "Error getting file info",
      code: "INFO_ERROR",
      details: error,
    } as MediaUploadError);
  }
};

// Health check for media service
export const healthCheck: RequestHandler = async (req, res) => {
  try {
    // Check if uploads directory is accessible
    const uploadsExists = fs.existsSync(uploadsDir);
    const uploadsWritable = fs.accessSync
      ? (() => {
          try {
            fs.accessSync(uploadsDir, fs.constants.W_OK);
            return true;
          } catch {
            return false;
          }
        })()
      : true;

    res.json({
      status: "healthy",
      uploadsDirectory: uploadsDir,
      uploadsExists,
      uploadsWritable,
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
  serveFile,
  deleteFile,
  getFileInfo,
  healthCheck,
};
