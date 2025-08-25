import React, { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Types
export interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  caption?: string;
  uploadedAt?: string;
  uploadedBy?: string;
  fileName?: string;
  size?: number;
}

export interface MediaGalleryProps {
  items: MediaItem[];
  title?: string;
  showDetails?: boolean;
  onDelete?: (id: string) => void;
  className?: string;
  emptyMessage?: string;
  readOnly?: boolean;
}

// Styled Components
const GalleryContainer = styled.div`
  animation: ${slideIn} 0.4s ease-out;
`;

const GalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const GalleryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  margin: 0;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const MediaCount = styled.span`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;
  font-weight: 500;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
  }
`;

const MediaCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const MediaWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
`;

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${MediaCard}:hover & {
    transform: scale(1.05);
  }
`;

const MediaVideo = styled.video`
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
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.3) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${MediaCard}:hover & {
    opacity: 1;
  }
`;

const PlayButton = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: hsl(222 84% 4.9%);
  transform: scale(0.8);
  transition: all 0.3s ease;

  ${MediaCard}:hover & {
    transform: scale(1);
    background: white;
  }
`;

const TypeBadge = styled.div<{ type: "image" | "video" }>`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: ${(props) =>
    props.type === "video" ? "hsl(217 91% 60%)" : "hsl(142 76% 36%)"};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MediaCard}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button<{ variant?: "danger" | "primary" }>`
  background: ${(props) =>
    props.variant === "danger"
      ? "hsl(0 84% 60%)"
      : "rgba(255, 255, 255, 0.9)"};
  color: ${(props) => (props.variant === "danger" ? "white" : "hsl(222 84% 4.9%)")};
  border: none;
  border-radius: 0.375rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: ${(props) =>
      props.variant === "danger" ? "hsl(0 84% 55%)" : "white"};
    transform: scale(1.1);
  }
`;

const MediaInfo = styled.div<{ showDetails: boolean }>`
  padding: ${(props) => (props.showDetails ? "1rem" : "0.75rem")};
  display: ${(props) => (props.showDetails ? "block" : "none")};

  ${MediaCard}:hover & {
    display: block;
  }
`;

const MediaCaption = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(222 84% 4.9%);
  margin-bottom: 0.25rem;
  line-height: 1.4;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const MediaMeta = styled.div`
  font-size: 0.75rem;
  color: hsl(215 16% 47%);
  line-height: 1.3;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: hsl(215 16% 47%);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  border: 2px dashed hsl(214 31% 91%);

  .dark & {
    color: hsl(215 20% 65%);
    background: rgba(30, 41, 59, 0.5);
    border-color: hsl(217 32% 25%);
  }
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
`;

const EmptyTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: hsl(222 84% 4.9%);

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const EmptyMessage = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

// Modal Components
const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  animation: ${zoomIn} 0.3s ease-out;
`;

const ModalMedia = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 0.5rem;
`;

const ModalVideo = styled.video`
  max-width: 100%;
  max-height: 90vh;
  border-radius: 0.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -3rem;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  color: hsl(222 84% 4.9%);
  border: none;
  border-radius: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const ModalInfo = styled.div`
  position: absolute;
  bottom: -4rem;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 0.5rem;
  backdrop-filter: blur(8px);

  .dark & {
    background: rgba(30, 41, 59, 0.9);
  }
`;

const ModalTitle = styled.div`
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  margin-bottom: 0.25rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const ModalMeta = styled.div`
  font-size: 0.875rem;
  color: hsl(215 16% 47%);

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

export default function MediaGallery({
  items,
  title = "Media Gallery",
  showDetails = false,
  onDelete,
  className,
  emptyMessage = "No media files yet. Upload some photos or videos to get started!",
  readOnly = false,
}: MediaGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleItemClick = (item: MediaItem) => {
    setSelectedItem(item);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onDelete && window.confirm("Are you sure you want to delete this media?")) {
      onDelete(id);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  if (items.length === 0) {
    return (
      <GalleryContainer className={className}>
        <EmptyState>
          <EmptyIcon>📸</EmptyIcon>
          <EmptyTitle>No Media Files</EmptyTitle>
          <EmptyMessage>{emptyMessage}</EmptyMessage>
        </EmptyState>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer className={className}>
      <GalleryHeader>
        <GalleryTitle>{title}</GalleryTitle>
        <MediaCount>{items.length} files</MediaCount>
      </GalleryHeader>

      <MediaGrid>
        {items.map((item, index) => (
          <MediaCard
            key={item.id}
            onClick={() => handleItemClick(item)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <MediaWrapper>
              <TypeBadge type={item.type}>
                {item.type === "video" ? "VIDEO" : "PHOTO"}
              </TypeBadge>

              {!readOnly && onDelete && (
                <ActionButtons>
                  <ActionButton
                    variant="danger"
                    onClick={(e) => handleDelete(e, item.id)}
                    title="Delete"
                  >
                    🗑️
                  </ActionButton>
                </ActionButtons>
              )}

              {item.type === "image" ? (
                <MediaImage src={item.url} alt={item.caption || "Media"} />
              ) : (
                <MediaVideo src={item.url} poster={item.url} />
              )}

              <MediaOverlay>
                {item.type === "video" && (
                  <PlayButton>
                    ▶️
                  </PlayButton>
                )}
              </MediaOverlay>
            </MediaWrapper>

            <MediaInfo showDetails={showDetails}>
              {item.caption && <MediaCaption>{item.caption}</MediaCaption>}
              <MediaMeta>
                {item.fileName && <div>{item.fileName}</div>}
                {item.uploadedBy && <div>By {item.uploadedBy}</div>}
                {item.uploadedAt && <div>{formatDate(item.uploadedAt)}</div>}
                {item.size && <div>{formatFileSize(item.size)}</div>}
              </MediaMeta>
            </MediaInfo>
          </MediaCard>
        ))}
      </MediaGrid>

      {/* Full-screen Modal */}
      <Modal isOpen={!!selectedItem} onClick={closeModal}>
        {selectedItem && (
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>

            {selectedItem.type === "image" ? (
              <ModalMedia src={selectedItem.url} alt={selectedItem.caption || "Media"} />
            ) : (
              <ModalVideo src={selectedItem.url} controls autoPlay />
            )}

            {(selectedItem.caption || selectedItem.uploadedBy || selectedItem.uploadedAt) && (
              <ModalInfo>
                {selectedItem.caption && (
                  <ModalTitle>{selectedItem.caption}</ModalTitle>
                )}
                <ModalMeta>
                  {selectedItem.uploadedBy && <span>Uploaded by {selectedItem.uploadedBy}</span>}
                  {selectedItem.uploadedAt && selectedItem.uploadedBy && <span> • </span>}
                  {selectedItem.uploadedAt && <span>{formatDate(selectedItem.uploadedAt)}</span>}
                  {selectedItem.size && (
                    <>
                      <span> • </span>
                      <span>{formatFileSize(selectedItem.size)}</span>
                    </>
                  )}
                </ModalMeta>
              </ModalInfo>
            )}
          </ModalContent>
        )}
      </Modal>
    </GalleryContainer>
  );
}
