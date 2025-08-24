/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";

interface VideoIntroProps {
  onComplete: () => void;
}

const containerStyle = css`
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100vw;
`;

const videoStyle = css`
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
  object-fit: contain;
  display: block;
  
  /* Mobile optimizations */
  -webkit-playsinline: true;
  
  /* Prevent blur on mobile */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
  
  /* Smooth rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const fallbackStyle = css`
  text-align: center;
  color: white;
  
  .spinner {
    width: 64px;
    height: 64px;
    border: 4px solid white;
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
  }
  
  .text {
    font-size: 20px;
    margin: 0;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Auto-advance after 5 seconds regardless of video state
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleVideoEnded = () => {
    onComplete();
  };

  return (
    <div css={containerStyle}>
      {!videoError ? (
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          css={videoStyle}
          onError={handleVideoError}
          onEnded={handleVideoEnded}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
        >
          <source
            src="https://cdn.builder.io/o/assets%2Fac95effc357b4c1ca968fe43de8cc048%2Fb87befa3f8df42e7a686397d01b75c65?alt=media&token=f77c89cc-a308-4b39-a040-77b3a495c723&apiKey=ac95effc357b4c1ca968fe43de8cc048"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div css={fallbackStyle}>
          <div className="spinner"></div>
          <p className="text">Loading ConstructPro...</p>
        </div>
      )}
    </div>
  );
}
