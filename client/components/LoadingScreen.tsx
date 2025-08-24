import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2.5; // Adjusted for 5-second timing
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return newProgress;
      });
    }, 50); // Adjusted interval for 5-second timing

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
      {/* Main content */}
      <div className="text-center z-10 relative">
        {/* Video */}
        <div className="mb-8 relative mx-auto w-80 h-80 flex items-center justify-center">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover rounded-lg shadow-lg"
          >
            <source
              src="https://cdn.builder.io/o/assets%2Fac95effc357b4c1ca968fe43de8cc048%2Fe44dedf07a3d4f8d99742988f53920a4?alt=media&token=7d8869d2-ce33-4826-919e-023a600337be&apiKey=ac95effc357b4c1ca968fe43de8cc048"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* App title with typewriter effect */}
        <div
          className={`transition-all duration-1000 ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
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
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
          <p className="text-slate-600 mt-4 text-sm font-medium">
            Building your workspace... {Math.round(progress)}%
          </p>
        </div>

        {/* Construction materials floating */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="w-3 h-3 bg-orange-300 opacity-60 rotate-45"></div>
        </div>
        <div
          className="absolute top-1/3 right-1/4 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-2 h-6 bg-yellow-400 opacity-60"></div>
        </div>
        <div
          className="absolute bottom-1/3 left-1/3 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-4 h-2 bg-gray-400 opacity-60 rounded"></div>
        </div>
      </div>
    </div>
  );
}
