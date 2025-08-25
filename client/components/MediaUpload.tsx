import React, { useState, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Types
export interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
  uploadProgress: number;
  uploaded: boolean;
  url?: string;
  error?: string;
}

export interface MediaUploadProps {
  onUploadComplete: (urls: string[]) => void;
  onUploadProgress?: (progress: number) => void;
  onError?: (error: string) => void;
  maxFiles?: number;
  maxSizeM?: number;
  acceptedTypes?: string[];
  context?: "task_progress" | "task_completion" | "building_documentation";
  disabled?: boolean;
  className?: string;
}

// Styled Components
const UploadContainer = styled.div<{ isDragOver: boolean; disabled: boolean }>`
  border: 2px dashed
    ${(props) =>
      props.isDragOver
        ? "hsl(217 91% 60%)"
        : props.disabled
        ? "hsl(214 31% 91%)"
        : "hsl(214 31% 91%)"};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  background: ${(props) =>
    props.isDragOver
      ? "rgba(59, 130, 246, 0.05)"
      : props.disabled
      ? "hsl(210 40% 98%)"
      : "rgba(255, 255, 255, 0.5)"};
  transition: all 0.3s ease;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  position: relative;
  animation: ${fadeIn} 0.3s ease-out;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    ${(props) =>
      !props.disabled &&
      `
      border-color: hsl(217 91% 60%);
      background: rgba(59, 130, 246, 0.02);
      transform: translateY(-1px);
    `}
  }

  .dark & {
    background: ${(props) =>
      props.isDragOver
        ? "rgba(59, 130, 246, 0.1)"
        : props.disabled
        ? "hsl(217 32% 15%)"
        : "rgba(30, 41, 59, 0.5)"};
    border-color: ${(props) =>
      props.isDragOver
        ? "hsl(217 91% 60%)"
        : props.disabled
        ? "hsl(217 32% 20%)"
        : "hsl(217 32% 25%)"};
  }
`;

const UploadIcon = styled.div<{ disabled: boolean }>`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  animation: ${bounce} 2s infinite;
`;

const UploadText = styled.div<{ disabled: boolean }>`
  color: ${(props) =>
    props.disabled ? "hsl(215 16% 47%)" : "hsl(222 84% 4.9%)"};
  font-weight: 600;
  margin-bottom: 0.5rem;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  .dark & {
    color: ${(props) =>
      props.disabled ? "hsl(215 20% 65%)" : "hsl(210 40% 98%)"};
  }
`;

const UploadSubtext = styled.div<{ disabled: boolean }>`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const MediaPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const MediaPreviewCard = styled.div<{ uploading: boolean }>`
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  background: hsl(210 40% 96%);
  aspect-ratio: 1;
  animation: ${fadeIn} 0.3s ease-out;
  opacity: ${(props) => (props.uploading ? 0.7 : 1)};

  .dark & {
    background: hsl(217 32% 17%);
  }
`;

const MediaPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${MediaPreviewCard}:hover & {
    opacity: 1;
  }
`;

const RemoveButton = styled.button`
  background: hsl(0 84% 60%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: hsl(0 84% 55%);
    transform: scale(1.1);
  }
`;

const ProgressOverlay = styled.div<{ uploading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${(props) => (props.uploading ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ProgressSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 0.5rem;
`;

const ProgressText = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 80%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background: white;
  transition: width 0.3s ease;
`;

const ErrorMessage = styled.div`
  color: hsl(0 84% 60%);
  font-size: 0.875rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 0.5rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: center;
`;

const Button = styled.button<{
  variant?: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
}>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background: hsl(217 91% 60%);
          color: white;
          &:hover:not(:disabled) {
            background: hsl(217 91% 55%);
            transform: translateY(-1px);
          }
        `;
      case "success":
        return `
          background: hsl(142 76% 36%);
          color: white;
          &:hover:not(:disabled) {
            background: hsl(142 76% 31%);
            transform: translateY(-1px);
          }
        `;
      case "danger":
        return `
          background: hsl(0 84% 60%);
          color: white;
          &:hover:not(:disabled) {
            background: hsl(0 84% 55%);
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: hsl(210 40% 96%);
          color: hsl(215 16% 47%);
          &:hover:not(:disabled) {
            background: hsl(210 40% 90%);
          }
          .dark & {
            background: hsl(217 32% 17%);
            color: hsl(215 20% 65%);
            &:hover:not(:disabled) {
              background: hsl(217 32% 20%);
            }
          }
        `;
    }
  }}
`;

const TypeBadge = styled.div<{ type: "image" | "video" }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${(props) =>
    props.type === "video" ? "hsl(217 91% 60%)" : "hsl(142 76% 36%)"};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export default function MediaUpload({
  onUploadComplete,
  onUploadProgress,
  onError,
  maxFiles = 10,
  maxSizeM = 50,
  acceptedTypes = ["image/*", "video/*"],
  context = "task_progress",
  disabled = false,
  className,
}: MediaUploadProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetError = () => setError(null);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSizeM * 1024 * 1024) {
      return `File "${file.name}" is too large. Maximum size is ${maxSizeM}MB.`;
    }

    if (!acceptedTypes.some((type) => file.type.match(type))) {
      return `File "${file.name}" has an unsupported format. Please use images or videos.`;
    }

    return null;
  };

  const createMediaFile = (file: File): MediaFile => {
    const id = Math.random().toString(36).substr(2, 9);
    const type = file.type.startsWith("image/") ? "image" : "video";
    const preview = URL.createObjectURL(file);

    return {
      id,
      file,
      preview,
      type,
      uploadProgress: 0,
      uploaded: false,
    };
  };

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || disabled) return;

      resetError();
      const newFiles: MediaFile[] = [];
      const currentCount = mediaFiles.length;

      for (let i = 0; i < files.length; i++) {
        if (currentCount + newFiles.length >= maxFiles) {
          setError(`Maximum ${maxFiles} files allowed.`);
          break;
        }

        const file = files[i];
        const validation = validateFile(file);

        if (validation) {
          setError(validation);
          continue;
        }

        newFiles.push(createMediaFile(file));
      }

      if (newFiles.length > 0) {
        setMediaFiles((prev) => [...prev, ...newFiles]);
      }
    },
    [mediaFiles.length, maxFiles, maxSizeM, acceptedTypes, disabled],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (!disabled) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles, disabled],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFiles],
  );

  const removeFile = useCallback((id: string) => {
    setMediaFiles((prev) => {
      const updated = prev.filter((file) => file.id !== id);
      const fileToRemove = prev.find((file) => file.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
    resetError();
  }, []);

  const uploadToDatabase = async (file: MediaFile): Promise<string> => {
    try {
      const response = await apiService.uploadSingleFile(file.file, (progress) => {
        setMediaFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, uploadProgress: progress } : f,
          ),
        );
      });

      return response.url; // This will be /api/media/view/{mediaId}
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const uploadFiles = async () => {
    if (mediaFiles.length === 0 || isUploading) return;

    setIsUploading(true);
    resetError();

    try {
      const uploadPromises = mediaFiles
        .filter((file) => !file.uploaded)
        .map(async (file) => {
          try {
            const url = await uploadToDatabase(file);
            setMediaFiles((prev) =>
              prev.map((f) =>
                f.id === file.id
                  ? { ...f, uploaded: true, url, uploadProgress: 100 }
                  : f,
              ),
            );
            return url;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Upload failed";
            setMediaFiles((prev) =>
              prev.map((f) =>
                f.id === file.id
                  ? { ...f, error: errorMessage, uploadProgress: 0 }
                  : f,
              ),
            );
            throw error;
          }
        });

      const uploadedUrls = await Promise.all(uploadPromises);
      onUploadComplete(uploadedUrls.filter(Boolean));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const clearAll = () => {
    mediaFiles.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setMediaFiles([]);
    resetError();
  };

  const getContextText = () => {
    switch (context) {
      case "task_progress":
        return {
          title: "Upload Progress Photos & Videos",
          subtitle: "Show your work progress with images and videos",
        };
      case "task_completion":
        return {
          title: "Upload Completion Media",
          subtitle: "Document your completed work",
        };
      case "building_documentation":
        return {
          title: "Upload Project Documentation",
          subtitle: "Add photos and videos for project records",
        };
      default:
        return {
          title: "Upload Media Files",
          subtitle: "Add photos and videos",
        };
    }
  };

  const contextText = getContextText();
  const hasFiles = mediaFiles.length > 0;
  const allUploaded = mediaFiles.every((file) => file.uploaded);
  const hasErrors = mediaFiles.some((file) => file.error);

  return (
    <div className={className}>
      <UploadContainer
        isDragOver={isDragOver}
        disabled={disabled}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <UploadIcon disabled={disabled}>
          📸
        </UploadIcon>
        <UploadText disabled={disabled}>{contextText.title}</UploadText>
        <UploadSubtext disabled={disabled}>
          {contextText.subtitle}
          <br />
          Drag & drop or click to select files
          <br />
          <small>
            Max {maxFiles} files, {maxSizeM}MB each
          </small>
        </UploadSubtext>

        <HiddenInput
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
          disabled={disabled}
        />
      </UploadContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {hasFiles && (
        <>
          <MediaPreviewGrid>
            {mediaFiles.map((file) => (
              <MediaPreviewCard key={file.id} uploading={!file.uploaded}>
                <TypeBadge type={file.type}>
                  {file.type === "video" ? "VIDEO" : "PHOTO"}
                </TypeBadge>

                {file.type === "image" ? (
                  <MediaPreview src={file.preview} alt="Preview" />
                ) : (
                  <VideoPreview src={file.preview} />
                )}

                <MediaOverlay>
                  <RemoveButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                  >
                    ×
                  </RemoveButton>
                </MediaOverlay>

                <ProgressOverlay uploading={!file.uploaded && !file.error}>
                  <ProgressSpinner />
                  <ProgressText>{file.uploadProgress}%</ProgressText>
                  <ProgressBar>
                    <ProgressFill progress={file.uploadProgress} />
                  </ProgressBar>
                </ProgressOverlay>

                {file.error && (
                  <ProgressOverlay uploading={false}>
                    <div style={{ color: "hsl(0 84% 60%)", textAlign: "center" }}>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                        ⚠️
                      </div>
                      <div style={{ fontSize: "0.75rem" }}>{file.error}</div>
                    </div>
                  </ProgressOverlay>
                )}
              </MediaPreviewCard>
            ))}
          </MediaPreviewGrid>

          <ActionButtons>
            <Button variant="secondary" onClick={clearAll} disabled={isUploading}>
              Clear All
            </Button>
            {!allUploaded && (
              <Button
                variant="primary"
                onClick={uploadFiles}
                disabled={isUploading || hasErrors}
              >
                {isUploading ? (
                  <>
                    <ProgressSpinner style={{ width: "16px", height: "16px", margin: 0 }} />
                    Uploading...
                  </>
                ) : (
                  `Upload ${mediaFiles.filter((f) => !f.uploaded).length} Files`
                )}
              </Button>
            )}
            {allUploaded && (
              <Button variant="success" disabled>
                ✓ All Files Uploaded
              </Button>
            )}
          </ActionButtons>
        </>
      )}
    </div>
  );
}
