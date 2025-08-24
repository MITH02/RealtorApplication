import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [buildingHeight, setBuildingHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1.5;
        setBuildingHeight(newProgress);
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  const floors = Math.floor(buildingHeight / 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
      {/* Soft clouds */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-8 bg-white/30 rounded-full opacity-60 animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 30}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Sun */}
      <div className="absolute top-16 right-16 w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full opacity-80 animate-pulse">
        <div className="absolute inset-2 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="text-center z-10 relative">
        {/* Construction Scene */}
        <div className="mb-8 relative mx-auto w-80 h-80">
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-t-lg"></div>

          {/* Building Foundation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t"></div>

          {/* Skyscraper being built */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-20">
            {[...Array(floors)].map((_, i) => (
              <div
                key={i}
                className="w-full h-8 border border-slate-300 bg-gradient-to-r from-slate-200 to-slate-300 relative animate-fadeIn"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  marginBottom: "1px",
                }}
              >
                {/* Windows */}
                <div className="flex justify-around items-center h-full px-2">
                  <div className="w-2 h-2 bg-blue-200 rounded-sm opacity-70"></div>
                  <div className="w-2 h-2 bg-blue-200 rounded-sm opacity-70"></div>
                  <div className="w-2 h-2 bg-blue-200 rounded-sm opacity-70"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Construction Crane */}
          <div className="absolute bottom-20 right-16">
            <div className="relative">
              {/* Crane base */}
              <div className="w-3 h-16 bg-gradient-to-b from-orange-300 to-orange-400"></div>
              {/* Crane arm */}
              <div className="absolute top-2 left-3 w-12 h-1 bg-orange-400 origin-left animate-pulse"></div>
              {/* Hook */}
              <div
                className="absolute top-3 right-0 w-1 h-4 bg-gray-600 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>

          {/* Builder Character */}
          <div
            className="absolute bottom-6 left-8 animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <div className="relative">
              {/* Body */}
              <div className="w-4 h-6 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-full"></div>
              {/* Head */}
              <div className="absolute -top-3 left-1 w-2 h-2 bg-orange-200 rounded-full"></div>
              {/* Hard hat */}
              <div className="absolute -top-4 left-0.5 w-3 h-2 bg-yellow-300 rounded-t-full"></div>
            </div>
          </div>

          {/* Construction vehicles */}
          <div className="absolute bottom-4 right-4">
            <div className="w-8 h-4 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded">
              <div className="w-2 h-2 bg-gray-700 rounded-full mt-2 ml-1"></div>
              <div className="w-2 h-2 bg-gray-700 rounded-full mt-0 ml-5"></div>
            </div>
          </div>
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
