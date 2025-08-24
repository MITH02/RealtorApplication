import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VideoLoaderScreenProps {
  onGetStarted: () => void;
}

export default function VideoLoaderScreen({
  onGetStarted,
}: VideoLoaderScreenProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {/* Stars */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/60 animate-pulse"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              fontSize: `${12 + Math.random() * 8}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ✦
          </div>
        ))}

        {/* Clouds */}
        <div className="absolute top-12 left-8 w-20 h-12 bg-orange-300/40 rounded-full"></div>
        <div className="absolute top-16 left-12 w-16 h-8 bg-orange-200/50 rounded-full"></div>
        <div className="absolute top-20 right-12 w-24 h-14 bg-orange-300/30 rounded-full"></div>
        <div className="absolute top-24 right-16 w-18 h-10 bg-orange-200/40 rounded-full"></div>

        {/* Additional small clouds */}
        <div className="absolute top-32 left-1/4 w-12 h-6 bg-orange-200/50 rounded-full"></div>
        <div className="absolute top-40 right-1/3 w-14 h-8 bg-orange-300/40 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-6 pt-12 sm:pt-16">
          <div
            className={`text-center transition-all duration-1000 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
              Builder Pro
            </h1>
            <p className="text-lg text-white/90 font-medium drop-shadow">
              Professional Construction Management
            </p>
          </div>
        </div>

        {/* Video Container - Center */}
        <div className="flex-1 flex items-center justify-center px-6 py-6">
          <div
            className={`w-full transition-all duration-1000 delay-300 ${
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative max-w-sm sm:max-w-md mx-auto">
              {/* Main video card */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Video */}
                <div className="relative">
                  <video
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "16/18" }}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Text and Button */}
        <div className="px-6 pb-12">
          <div
            className={`text-center transition-all duration-1000 delay-500 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* Main Text */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                Build projects for
                <br />
                every step you take.
              </h2>
              <p className="text-white/90 text-base font-medium drop-shadow">
                More than tracking, transform
                <br />
                planning into building.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="max-w-sm mx-auto mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 shadow-inner overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/50 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Loading Text */}
              <p className="text-white/80 text-sm font-medium mt-3 drop-shadow">
                Preparing your workspace... {Math.round(progress)}%
              </p>
            </div>

            {/* Get Started Button */}
            <div className="max-w-sm mx-auto">
              <Button
                onClick={onGetStarted}
                className="w-full relative group bg-white hover:bg-gray-50 text-orange-600 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl border-0"
                size="lg"
              >
                <span className="relative flex items-center justify-center">
                  Get Started
                  <svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
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
