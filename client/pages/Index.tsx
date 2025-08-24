import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";

export default function Index() {
  const [exampleFromServer, setExampleFromServer] = useState("");
  // Fetch users on component mount
  useEffect(() => {
    fetchDemo();
  }, []);

  // Example of how to fetch data from the server (if needed)
  const fetchDemo = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setExampleFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>

        {/* Geometric accents */}
        <div className="absolute top-1/4 left-1/4 w-1 h-12 bg-gradient-to-b from-blue-500/30 to-transparent rotate-12 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-1 bg-gradient-to-r from-purple-500/30 to-transparent -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="text-center relative z-10">
        {/* TODO: FUSION_GENERATION_APP_PLACEHOLDER replace everything here with the actual app! */}
        <div className="inline-block p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-700">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <svg
                className="animate-spin h-10 w-10 text-blue-500"
                viewBox="0 0 50 50"
              >
                <circle
                  className="opacity-20"
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  className="text-purple-500"
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="100"
                  strokeDashoffset="75"
                />
              </svg>
              <div className="absolute inset-0 animate-ping">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"></div>
              </div>
            </div>
            Generating your app...
          </h1>
        </div>
        <div className="mt-6 inline-block px-6 py-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full border border-white/40 dark:border-slate-700/40">
          <p className="text-slate-700 dark:text-slate-300 max-w-md font-medium">
            Watch the chat on the left for updates that might need your attention
            to finish generating
          </p>
        </div>
        <p className="mt-4 hidden max-w-md">{exampleFromServer}</p>
      </div>
    </div>
  );
}
