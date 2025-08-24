interface ContractorScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onBack: () => void;
}

export default function ContractorScreen({
  onLogin,
  onSignup,
  onBack,
}: ContractorScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 flex flex-col relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-br from-orange-400/15 to-amber-400/15 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-24 w-20 h-20 bg-gradient-to-br from-yellow-400/15 to-orange-400/15 rounded-full blur-lg animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      {/* Header with Back Button */}
      <div className="relative z-10 flex items-center justify-between p-4 sm:p-6">
        <button
          onClick={onBack}
          className="flex items-center text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-4 pb-8">
        {/* Contractor Card */}
        <div className="text-center mb-6">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl mb-6 border border-white/50 dark:border-slate-700/50 relative overflow-hidden max-w-sm mx-auto group hover:scale-105 transition-all duration-700">
            {/* Floating background element */}
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/20 via-amber-400/20 to-yellow-400/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>


            {/* Full Image */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F49e829fd851d42a691685962b579ec5a?format=webp&width=800"
              alt="Contractor"
              className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent mb-4">
            Contractor Portal
          </h1>
          <div className="inline-block px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-white/60 dark:border-slate-700/60 shadow-lg">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-semibold">
              Manage your assigned tasks and track project progress
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-8 border border-white/50 dark:border-slate-700/50 max-w-md mx-auto w-full hover:shadow-3xl transition-all duration-500">
          <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-6">
            What you can do:
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start text-slate-700 dark:text-slate-300 text-sm group">
              <div className="p-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 mr-3 mt-0.5 group-hover:from-orange-500/40 group-hover:to-amber-500/40 transition-all duration-300">
                <svg
                  className="w-3 h-3 text-orange-600 dark:text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium">
                View assigned building projects
              </span>
            </li>
            <li className="flex items-start text-slate-700 dark:text-slate-300 text-sm group">
              <div className="p-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 mr-3 mt-0.5 group-hover:from-orange-500/40 group-hover:to-amber-500/40 transition-all duration-300">
                <svg
                  className="w-3 h-3 text-orange-600 dark:text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium">
                Track task deadlines and progress
              </span>
            </li>
            <li className="flex items-start text-slate-700 dark:text-slate-300 text-sm group">
              <div className="p-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 mr-3 mt-0.5 group-hover:from-orange-500/40 group-hover:to-amber-500/40 transition-all duration-300">
                <svg
                  className="w-3 h-3 text-orange-600 dark:text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium">Mark tasks as completed</span>
            </li>
            <li className="flex items-start text-slate-700 dark:text-slate-300 text-sm group">
              <div className="p-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 mr-3 mt-0.5 group-hover:from-orange-500/40 group-hover:to-amber-500/40 transition-all duration-300">
                <svg
                  className="w-3 h-3 text-orange-600 dark:text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium">
                Upload progress photos and reports
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 max-w-md mx-auto w-full">
          {/* Primary Button */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-700"></div>
            <button
              onClick={onLogin}
              className="relative w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl py-4 px-8 rounded-2xl font-bold transition-all duration-500 shadow-2xl hover:shadow-3xl border border-white/50 dark:border-slate-700/50 hover:scale-105 hover:-translate-y-1 group"
            >
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent text-lg">
                Login to Dashboard
              </span>
            </button>
          </div>

          {/* Secondary Button */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/40 via-amber-400/40 to-yellow-400/40 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-700"></div>
            <button
              onClick={onSignup}
              className="relative w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl text-slate-700 dark:text-slate-300 py-4 px-8 rounded-2xl font-bold transition-all duration-500 shadow-xl hover:shadow-2xl border border-white/60 dark:border-slate-700/60 hover:scale-105 hover:-translate-y-1 group"
            >
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent text-lg">
                Create Contractor Account
              </span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full border border-white/40 dark:border-slate-700/40">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse"></div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Need help? Contact your project administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
