import { useEffect, useState } from "react";

interface VideoIntroProps {
  onComplete: () => void;
}

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
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {!videoError ? (
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="max-w-full max-h-full object-contain"
          style={{
            width: 'auto',
            height: 'auto',
            imageRendering: 'crisp-edges'
          }}
          onError={handleVideoError}
          onEnded={handleVideoEnded}
        >
          <source
            src="https://cdn.builder.io/o/assets%2Fac95effc357b4c1ca968fe43de8cc048%2Fb87befa3f8df42e7a686397d01b75c65?alt=media&token=f77c89cc-a308-4b39-a040-77b3a495c723&apiKey=ac95effc357b4c1ca968fe43de8cc048"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Fallback if video fails to load
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading ConstructPro...</p>
        </div>
      )}
    </div>
  );
}
