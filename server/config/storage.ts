import { randomUUID } from "crypto";

// Storage configuration types
export interface StorageConfig {
  provider: "local" | "s3" | "cloudinary" | "gcs";
  local?: {
    uploadDir: string;
    baseUrl: string;
  };
  s3?: {
    region: string;
    bucket: string;
    accessKeyId: string;
    secretAccessKey: string;
    endpoint?: string;
  };
  cloudinary?: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
    folder?: string;
  };
  gcs?: {
    projectId: string;
    keyFilename: string;
    bucket: string;
  };
}

export interface UploadResult {
  id: string;
  url: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  provider: string;
  uploadedAt: string;
}

// Default configuration - can be overridden by environment variables
export const defaultStorageConfig: StorageConfig = {
  provider: (process.env.STORAGE_PROVIDER as any) || "local",
  local: {
    uploadDir: "uploads/media",
    baseUrl: process.env.BASE_URL || "http://localhost:8080",
  },
  s3: {
    region: process.env.AWS_REGION || "us-east-1",
    bucket: process.env.AWS_S3_BUCKET || "",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    endpoint: process.env.AWS_S3_ENDPOINT, // For S3-compatible services
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    folder: process.env.CLOUDINARY_FOLDER || "constructpro",
  },
  gcs: {
    projectId: process.env.GCP_PROJECT_ID || "",
    keyFilename: process.env.GCP_KEY_FILE || "",
    bucket: process.env.GCS_BUCKET || "",
  },
};

// Abstract storage interface
export abstract class StorageProvider {
  abstract upload(
    file: Express.Multer.File,
    options?: any,
  ): Promise<UploadResult>;

  abstract delete(fileName: string): Promise<boolean>;

  abstract getFileInfo(fileName: string): Promise<any>;

  abstract getFileUrl(fileName: string): string;
}

// Storage factory
export class StorageFactory {
  static create(config: StorageConfig): StorageProvider {
    switch (config.provider) {
      case "s3":
        return new S3StorageProvider(config.s3!);
      case "cloudinary":
        return new CloudinaryStorageProvider(config.cloudinary!);
      case "gcs":
        return new GCSStorageProvider(config.gcs!);
      case "local":
      default:
        return new LocalStorageProvider(config.local!);
    }
  }
}

// Local storage implementation (current)
export class LocalStorageProvider extends StorageProvider {
  constructor(private config: { uploadDir: string; baseUrl: string }) {
    super();
  }

  async upload(file: Express.Multer.File): Promise<UploadResult> {
    const id = randomUUID();
    const ext = file.originalname.split(".").pop();
    const fileName = `${id}.${ext}`;

    return {
      id,
      url: `${this.config.baseUrl}/api/media/files/${fileName}`,
      fileName,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      provider: "local",
      uploadedAt: new Date().toISOString(),
    };
  }

  async delete(fileName: string): Promise<boolean> {
    // Implementation in existing media.ts
    return true;
  }

  async getFileInfo(fileName: string): Promise<any> {
    // Implementation in existing media.ts
    return {};
  }

  getFileUrl(fileName: string): string {
    return `${this.config.baseUrl}/api/media/files/${fileName}`;
  }
}

// S3 storage implementation
export class S3StorageProvider extends StorageProvider {
  private s3Client: any;

  constructor(private config: NonNullable<StorageConfig["s3"]>) {
    super();
    // S3 client will be initialized when AWS SDK is available
  }

  async upload(file: Express.Multer.File): Promise<UploadResult> {
    const id = randomUUID();
    const ext = file.originalname.split(".").pop();
    const fileName = `constructpro/${id}.${ext}`;

    // TODO: Implement S3 upload when AWS SDK is added
    const url = `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com/${fileName}`;

    return {
      id,
      url,
      fileName,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      provider: "s3",
      uploadedAt: new Date().toISOString(),
    };
  }

  async delete(fileName: string): Promise<boolean> {
    // TODO: Implement S3 delete
    return true;
  }

  async getFileInfo(fileName: string): Promise<any> {
    // TODO: Implement S3 file info
    return {};
  }

  getFileUrl(fileName: string): string {
    return `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com/${fileName}`;
  }
}

// Cloudinary storage implementation
export class CloudinaryStorageProvider extends StorageProvider {
  constructor(private config: NonNullable<StorageConfig["cloudinary"]>) {
    super();
  }

  async upload(file: Express.Multer.File): Promise<UploadResult> {
    const id = randomUUID();

    // TODO: Implement Cloudinary upload when SDK is added
    const url = `https://res.cloudinary.com/${this.config.cloudName}/image/upload/v1/${this.config.folder}/${id}`;

    return {
      id,
      url,
      fileName: `${id}.${file.originalname.split(".").pop()}`,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      provider: "cloudinary",
      uploadedAt: new Date().toISOString(),
    };
  }

  async delete(fileName: string): Promise<boolean> {
    // TODO: Implement Cloudinary delete
    return true;
  }

  async getFileInfo(fileName: string): Promise<any> {
    // TODO: Implement Cloudinary file info
    return {};
  }

  getFileUrl(fileName: string): string {
    return `https://res.cloudinary.com/${this.config.cloudName}/image/upload/v1/${this.config.folder}/${fileName}`;
  }
}

// Google Cloud Storage implementation
export class GCSStorageProvider extends StorageProvider {
  constructor(private config: NonNullable<StorageConfig["gcs"]>) {
    super();
  }

  async upload(file: Express.Multer.File): Promise<UploadResult> {
    const id = randomUUID();
    const ext = file.originalname.split(".").pop();
    const fileName = `constructpro/${id}.${ext}`;

    // TODO: Implement GCS upload when SDK is added
    const url = `https://storage.googleapis.com/${this.config.bucket}/${fileName}`;

    return {
      id,
      url,
      fileName,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      provider: "gcs",
      uploadedAt: new Date().toISOString(),
    };
  }

  async delete(fileName: string): Promise<boolean> {
    // TODO: Implement GCS delete
    return true;
  }

  async getFileInfo(fileName: string): Promise<any> {
    // TODO: Implement GCS file info
    return {};
  }

  getFileUrl(fileName: string): string {
    return `https://storage.googleapis.com/${this.config.bucket}/${fileName}`;
  }
}

// Environment validation
export function validateStorageConfig(config: StorageConfig): string[] {
  const errors: string[] = [];

  switch (config.provider) {
    case "s3":
      if (!config.s3?.bucket) errors.push("AWS_S3_BUCKET is required");
      if (!config.s3?.accessKeyId) errors.push("AWS_ACCESS_KEY_ID is required");
      if (!config.s3?.secretAccessKey)
        errors.push("AWS_SECRET_ACCESS_KEY is required");
      break;
    case "cloudinary":
      if (!config.cloudinary?.cloudName)
        errors.push("CLOUDINARY_CLOUD_NAME is required");
      if (!config.cloudinary?.apiKey)
        errors.push("CLOUDINARY_API_KEY is required");
      if (!config.cloudinary?.apiSecret)
        errors.push("CLOUDINARY_API_SECRET is required");
      break;
    case "gcs":
      if (!config.gcs?.projectId) errors.push("GCP_PROJECT_ID is required");
      if (!config.gcs?.bucket) errors.push("GCS_BUCKET is required");
      break;
  }

  return errors;
}
