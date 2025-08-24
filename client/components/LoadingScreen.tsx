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
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        {/* Animated logo/icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Building icon with animation */}
            <div className="absolute inset-0 animate-bounce">
              <svg
                viewBox="0 0 128 128"
                className="w-full h-full text-white"
                fill="currentColor"
              >
                <path d="M20 108h88V40H20v68zm8-60h72v52H28V48z" opacity="0.3" />
                <path d="M32 44h64v8H32z" />
                <path d="M36 56h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8z" />
                <path d="M36 68h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8z" />
                <path d="M36 80h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8z" />
                <path d="M36 92h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8zm12 0h8v8h-8z" />
                {/* Crane animation */}
                <g className="animate-pulse">
                  <path d="M108 20v4h-4v-4h4m0-4h-8v12h8V16z" />
                  <path d="M100 24h-60v4h60z" />
                  <path d="M40 24v8h4v-8z" />
                </g>
              </svg>
            </div>
            
            {/* Glowing effect */}
            <div className="absolute inset-0 animate-ping">
              <div className="w-full h-full border-2 border-white rounded-full opacity-25"></div>
            </div>
          </div>
        </div>

        {/* App title with typewriter effect */}
        <div className={`transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-5xl font-bold text-white mb-4 font-serif">
            ConstructPro
          </h1>
          <p className="text-xl text-blue-200 mb-8 font-light">
            Building Excellence, Managing Success
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-400 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/70 mt-4 text-sm">
            Loading... {progress}%
          </p>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-5 h-5 bg-purple-400 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
}
