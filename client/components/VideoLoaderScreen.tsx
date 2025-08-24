import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VideoLoaderScreenProps {
  onGetStarted: () => void;
}

export default function VideoLoaderScreen({ onGetStarted }: VideoLoaderScreenProps) {
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth entrance animation
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => {
      clearTimeout(contentTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
        >
          <source 
            src="https://cdn.builder.io/o/assets%2Fa08533bde27b41f399eb46012fabe83e%2Fe1974c25c994466b97e22c1c6d68b271?alt=media&token=57a2dd46-0eae-4d4e-afcc-2cc9fb4c7a29&apiKey=a08533bde27b41f399eb46012fabe83e" 
            type="video/mov"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            <div className="w-1 h-1 bg-white/60 rounded-full shadow-lg shadow-blue-500/50" />
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-30 min-h-screen flex flex-col justify-between">
        {/* Top Section - Logo and Title */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-8">
          <div
            className={`text-center transition-all duration-1500 ease-out ${
              showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            {/* Logo with glassmorphism effect */}
            <div className="mb-8 sm:mb-12">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-70 blur group-hover:blur-md transition-all duration-300" />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl">
                  <div className="text-4xl sm:text-5xl filter drop-shadow-lg">🏗️</div>
                </div>
              </div>
            </div>

            {/* App Title with enhanced typography */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                  ConstructPro
                </span>
              </h1>
              
              <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4" />
              
              <p className="text-base sm:text-lg md:text-xl text-gray-200/90 max-w-xs sm:max-w-sm mx-auto leading-relaxed font-light">
                Building Excellence, Managing Success
              </p>
            </div>

            {/* Enhanced Loading Section */}
            <div className="mb-8 sm:mb-12">
              {/* Progress bar */}
              <div className="w-64 sm:w-80 mx-auto mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-white/20">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 h-full rounded-full transition-all duration-300 ease-out relative bg-[length:200%_100%] animate-gradient"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
                  </div>
                </div>
                <p className="text-gray-300/80 mt-3 text-sm font-medium">
                  Preparing your workspace... {Math.round(progress)}%
                </p>
              </div>

              {/* Enhanced loading dots */}
              <div className="flex items-center justify-center space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce shadow-lg"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '1.2s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Get Started Button */}
        <div className="p-4 sm:p-6 pb-8 sm:pb-12">
          <div
            className={`transition-all duration-1500 delay-700 ease-out ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="max-w-sm mx-auto">
              <Button
                onClick={onGetStarted}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold py-4 sm:py-5 px-8 rounded-2xl sm:rounded-3xl text-base sm:text-lg transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 border border-white/20 backdrop-blur-sm bg-[length:200%_100%] animate-gradient"
                size="lg"
              >
                {/* Button background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <span className="relative flex items-center justify-center">
                  Get Started
                  <svg 
                    className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
