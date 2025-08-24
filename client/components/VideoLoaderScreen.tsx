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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {/* Stars */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-400/70 dark:text-blue-300/50 animate-pulse"
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

        {/* Modern Floating Elements */}
        <div className="absolute top-16 left-8 w-40 h-40 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-32 right-12 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-40 left-16 w-28 h-28 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-lg animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-indigo-400/25 to-blue-400/25 rounded-full blur-md animate-float" style={{animationDelay: '0.5s'}}></div>

        {/* Geometric Accents */}
        <div className="absolute top-20 left-1/3 w-1 h-16 bg-gradient-to-b from-blue-500/30 to-transparent rotate-12 animate-pulse"></div>
        <div className="absolute bottom-32 right-1/3 w-16 h-1 bg-gradient-to-r from-purple-500/30 to-transparent -rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
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
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4 tracking-tight">
              Builder Pro
            </h1>
            <div className="inline-block px-6 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-white/60 dark:border-slate-700/60 shadow-lg">
              <p className="text-lg text-slate-700 dark:text-slate-200 font-semibold">
                Professional Construction Management
              </p>
            </div>
          </div>
        </div>

        {/* Video Container - Center */}
        <div className="flex-1 flex items-center justify-center px-6 py-6">
          <div
            className={`w-full transition-all duration-1000 delay-300 ${
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative max-w-sm sm:max-w-md mx-auto group">
              {/* Floating background elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

              {/* Main video card */}
              <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl overflow-hidden border border-white/50 dark:border-slate-700/50 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2">
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
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-4 leading-tight">
                Build projects for
                <br />
                every step you take.
              </h2>
              <div className="inline-block px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full border border-white/40 dark:border-slate-700/40">
                <p className="text-slate-700 dark:text-slate-300 text-base font-semibold">
                  More than tracking, transform
                  <br />
                  planning into building.
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-sm mx-auto mb-8">
              <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-full h-3 shadow-inner overflow-hidden border border-white/40 dark:border-slate-700/40">
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse" />
                  <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gradient"></div>
                </div>
              </div>

              {/* Loading Text */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full border border-white/40 dark:border-slate-700/40">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping"></div>
                <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                  Preparing your workspace... {Math.round(progress)}%
                </p>
              </div>
            </div>

            {/* Get Started Button */}
            <div className="max-w-sm mx-auto relative">
              {/* Button glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-60 group-hover:opacity-100 transition duration-700"></div>

              <Button
                onClick={onGetStarted}
                className="w-full relative group bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-xl text-slate-800 dark:text-white font-bold py-5 px-8 rounded-3xl text-lg transition-all duration-500 shadow-2xl hover:shadow-3xl border border-white/50 dark:border-slate-700/50 hover:scale-105 hover:-translate-y-1"
                size="lg"
              >
                <span className="relative flex items-center justify-center">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-black">
                    Get Started
                  </span>
                  <div className="ml-3 p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform group-hover:translate-x-1 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
