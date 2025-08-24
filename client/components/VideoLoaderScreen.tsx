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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Header */}
        <div className="px-6 pt-8 sm:pt-12 pb-6">
          <div 
            className={`text-center transition-all duration-1000 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-3 tracking-tight">
              Builder Pro
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium">
              Professional Construction Management
            </p>
          </div>
        </div>

        {/* Video Container - Center */}
        <div className="flex-1 flex items-center justify-center px-6 py-4">
          <div 
            className={`w-full transition-all duration-1000 delay-300 ${
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
              {/* Glow effect behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
              
              {/* Main video card */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                {/* Video */}
                <div className="relative">
                  <video
                    className="w-full h-auto aspect-video object-cover"
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
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100">
                      <div className="text-6xl">🏗️</div>
                    </div>
                  </video>
                  
                  {/* Subtle overlay for video */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Section */}
        <div className="px-6 pb-6">
          <div 
            className={`text-center transition-all duration-1000 delay-500 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Progress Bar */}
            <div className="max-w-sm mx-auto mb-6">
              <div className="bg-slate-200/80 rounded-full h-2 shadow-inner overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
                </div>
              </div>
              
              {/* Loading Text */}
              <p className="text-slate-600 text-sm font-medium mt-3">
                Preparing your workspace... {Math.round(progress)}%
              </p>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="px-6 pb-10 sm:pb-12">
          <div 
            className={`transition-all duration-1000 delay-700 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="max-w-sm mx-auto">
              <Button
                onClick={onGetStarted}
                className="w-full relative group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-0"
                size="lg"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <span className="relative flex items-center justify-center">
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
