import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

export interface LocalStorageConfig {
  baseUploadDir: string;
  maxFileSize: number; // in bytes
  allowedTypes: string[];
  enableBackup: boolean;
  backupDir?: string;
}

export const defaultConfig: LocalStorageConfig = {
  baseUploadDir: "uploads",
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedTypes: [
    "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp",
    "video/mp4", "video/mpeg", "video/quicktime", "video/webm"
  ],
  enableBackup: true,
  backupDir: "uploads/backup"
};

export class LocalMediaStorage {
  private config: LocalStorageConfig;
  private mediaDir: string;
  private backupDir?: string;

  constructor(config: LocalStorageConfig = defaultConfig) {
    this.config = config;
    this.mediaDir = path.join(process.cwd(), config.baseUploadDir, "media");
    
    if (config.enableBackup && config.backupDir) {
      this.backupDir = path.join(process.cwd(), config.backupDir);
    }

    this.ensureDirectories();
  }

  private ensureDirectories() {
    // Create main media directory
    if (!fs.existsSync(this.mediaDir)) {
      fs.mkdirSync(this.mediaDir, { recursive: true });
    }

    // Create backup directory if enabled
    if (this.backupDir && !fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }

    // Create subdirectories for organization
    const subdirs = ["images", "videos", "thumbnails"];
    subdirs.forEach(subdir => {
      const dirPath = path.join(this.mediaDir, subdir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });
  }

  async saveFile(file: Express.Multer.File): Promise<{
    fileName: string;
    filePath: string;
    url: string;
    type: "image" | "video";
  }> {
    const fileId = randomUUID();
    const ext = path.extname(file.originalname).toLowerCase();
    const isVideo = this.isVideoFile(file.mimetype);
    const subdir = isVideo ? "videos" : "images";
    const fileName = `${fileId}${ext}`;
    const filePath = path.join(this.mediaDir, subdir, fileName);
    const relativeUrl = `/api/media/files/${subdir}/${fileName}`;

    // Move uploaded file to organized location
    fs.renameSync(file.path, filePath);

    // Create backup if enabled
    if (this.backupDir) {
      const backupPath = path.join(this.backupDir, subdir, fileName);
      fs.copyFileSync(filePath, backupPath);
    }

    return {
      fileName,
      filePath,
      url: relativeUrl,
      type: isVideo ? "video" : "image"
    };
  }

  async deleteFile(fileName: string): Promise<boolean> {
    try {
      // Find file in subdirectories
      const subdirs = ["images", "videos"];
      let deleted = false;

      for (const subdir of subdirs) {
        const filePath = path.join(this.mediaDir, subdir, fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          deleted = true;

          // Delete backup if exists
          if (this.backupDir) {
            const backupPath = path.join(this.backupDir, subdir, fileName);
            if (fs.existsSync(backupPath)) {
              fs.unlinkSync(backupPath);
            }
          }
          break;
        }
      }

      return deleted;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  getFileStats(): {
    totalFiles: number;
    totalSize: number;
    imageCount: number;
    videoCount: number;
  } {
    let totalFiles = 0;
    let totalSize = 0;
    let imageCount = 0;
    let videoCount = 0;

    const subdirs = ["images", "videos"];
    
    subdirs.forEach(subdir => {
      const dirPath = path.join(this.mediaDir, subdir);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
          const filePath = path.join(dirPath, file);
          const stats = fs.statSync(filePath);
          totalFiles++;
          totalSize += stats.size;
          
          if (subdir === "images") imageCount++;
          if (subdir === "videos") videoCount++;
        });
      }
    });

    return { totalFiles, totalSize, imageCount, videoCount };
  }

  private isVideoFile(mimeType: string): boolean {
    return mimeType.startsWith("video/");
  }

  // Cleanup old files (optional)
  async cleanupOldFiles(daysOld: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    let deletedCount = 0;
    const subdirs = ["images", "videos"];

    subdirs.forEach(subdir => {
      const dirPath = path.join(this.mediaDir, subdir);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
          const filePath = path.join(dirPath, file);
          const stats = fs.statSync(filePath);
          
          if (stats.mtime < cutoffDate) {
            fs.unlinkSync(filePath);
            deletedCount++;
          }
        });
      }
    });

    return deletedCount;
  }
}

export default LocalMediaStorage;
