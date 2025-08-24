import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(true); // Show text immediately
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [progressStarted, setProgressStarted] = useState(false);

  // Start progress timer when video loads, video errors, or after timeout for fallback
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // If video doesn't load within 2 seconds, start progress with fallback
    if (!videoLoaded && !videoError && !progressStarted) {
      timeoutId = setTimeout(() => {
        if (!videoLoaded && !videoError) {
          setVideoError(true); // Trigger fallback animation
        }
      }, 2000);
    }

    if (!progressStarted && (videoLoaded || videoError)) {
      setProgressStarted(true);

      const loadingDuration = 4500; // 4.5 seconds
      const interval = 50; // Update every 50ms
      const increment = 100 / (loadingDuration / interval); // Calculate increment for smooth progress

      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            clearInterval(progressTimer);
            setTimeout(onComplete, 200);
            return 100;
          }
          return newProgress;
        });
      }, interval);

      return () => {
        clearInterval(progressTimer);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [videoLoaded, videoError, progressStarted, onComplete]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
      {/* Background elements to prevent blank screen */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-12 h-6 bg-white/40 rounded-full animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10 relative">
        {/* Video or Fallback Animation */}
        <div className="mb-8 relative mx-auto w-80 h-80 flex items-center justify-center">
          {!videoError ? (
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover rounded-lg shadow-lg"
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
              style={{ display: videoLoaded ? 'block' : 'none' }}
            >
              <source
                src="https://cdn.builder.io/o/assets%2Fac95effc357b4c1ca968fe43de8cc048%2Fe44dedf07a3d4f8d99742988f53920a4?alt=media&token=7d8869d2-ce33-4826-919e-023a600337be&apiKey=ac95effc357b4c1ca968fe43de8cc048"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : null}

          {/* Fallback Animation - shows if video fails or while loading */}
          {(videoError || !videoLoaded) && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                {/* Animated Building Icon */}
                <div className="w-24 h-32 relative">
                  {/* Building base */}
                  <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-slate-400 to-slate-300 rounded-t-lg"></div>

                  {/* Building floors with animation */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-4 bg-gradient-to-r from-blue-200 to-blue-300 border border-slate-300 animate-fadeIn"
                      style={{
                        bottom: `${32 + i * 16}px`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      {/* Windows */}
                      <div className="flex justify-around items-center h-full px-1">
                        <div className="w-1 h-1 bg-yellow-300 rounded-sm"></div>
                        <div className="w-1 h-1 bg-yellow-300 rounded-sm"></div>
                        <div className="w-1 h-1 bg-yellow-300 rounded-sm"></div>
                      </div>
                    </div>
                  ))}

                  {/* Construction crane */}
                  <div className="absolute -right-8 top-4">
                    <div className="w-1 h-16 bg-orange-400 animate-pulse"></div>
                    <div className="absolute top-2 left-1 w-8 h-0.5 bg-orange-400"></div>
                  </div>
                </div>

                {/* Rotating gears */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-slate-400 rounded-full animate-spin">
                  <div className="absolute inset-1 border border-slate-300 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* App title */}
        <div className="opacity-100 translate-y-0">
          <h1 className="text-5xl font-bold text-slate-700 mb-4 font-serif">
            ConstructPro
          </h1>
          <p className="text-xl text-slate-600 mb-8 font-light">
            Building Excellence, Managing Success
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto">
          <div className="bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 h-full rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {progressStarted && <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>}
            </div>
          </div>
          <p className="text-slate-600 mt-4 text-sm font-medium">
            {!progressStarted
              ? "Loading workspace..."
              : `Building your workspace... ${Math.round(progress)}%`
            }
          </p>
        </div>

      </div>
    </div>
  );
}
