import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VideoLoaderScreenProps {
  onGetStarted: () => void;
}

export default function VideoLoaderScreen({ onGetStarted }: VideoLoaderScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content immediately
    setShowContent(true);

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    return () => {
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-sky-200 relative">
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Header */}
        <div className="px-4 pt-6 sm:pt-8 pb-2">
          <div
            className={`text-center transition-all duration-1000 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-2 font-serif leading-tight">
              Builder Pro
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Professional Construction Management
            </p>
          </div>
        </div>

        {/* Video Container - Center */}
        <div className="flex-1 flex items-center justify-center px-4 py-1">
          <div
            className={`w-full transition-all duration-1000 delay-300 ${
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="bg-sky-200/50 backdrop-blur-sm rounded-3xl shadow-lg border border-sky-300/30 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto overflow-hidden">
              {/* Video */}
              <div className="relative bg-sky-200">
                <video
                  className="w-full h-auto min-h-96 max-h-[32rem] sm:min-h-[28rem] sm:max-h-[36rem] md:max-h-[40rem] object-contain block"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source
                    src="https://cdn.builder.io/o/assets%2Fa08533bde27b41f399eb46012fabe83e%2Fe1974c25c994466b97e22c1c6d68b271?alt=media&token=57a2dd46-0eae-4d4e-afcc-2cc9fb4c7a29&apiKey=a08533bde27b41f399eb46012fabe83e"
                    type="video/mov"
                  />
                  <source
                    src="https://cdn.builder.io/o/assets%2Fa08533bde27b41f399eb46012fabe83e%2Fe1974c25c994466b97e22c1c6d68b271?alt=media&token=57a2dd46-0eae-4d4e-afcc-2cc9fb4c7a29&apiKey=a08533bde27b41f399eb46012fabe83e"
                    type="video/mp4"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-sky-200">
                    <div className="text-6xl">🏗️</div>
                  </div>
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Section - Below Video */}
        <div className="px-4 pb-2">
          <div
            className={`text-center transition-all duration-1000 delay-500 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Progress Bar */}
            <div className="max-w-xs mx-auto mb-4">
              <div className="bg-sky-100/80 backdrop-blur-sm rounded-full h-3 shadow-sm border border-sky-300/50 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Loading Text */}
            <p className="text-slate-700 text-sm font-medium mb-6">
              Preparing your workspace... {Math.round(progress)}%
            </p>
          </div>
        </div>

        {/* Get Started Button - Bottom */}
        <div className="px-4 pb-4 sm:pb-6">
          <div 
            className={`transition-all duration-1000 delay-700 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="max-w-sm mx-auto">
              <Button
                onClick={onGetStarted}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl text-base transition-all duration-300 shadow-lg hover:shadow-xl"
                size="lg"
              >
                <span className="flex items-center justify-center">
                  Get Started
                  <svg 
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
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
    </div>
  );
}
