interface BuilderScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onBack: () => void;
}

export default function BuilderScreen({ onLogin, onSignup, onBack }: BuilderScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 active:text-blue-800 transition-colors duration-200 p-2 rounded-lg active:bg-blue-100"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 pb-8">
        {/* Builder Card */}
        <div className="text-center mb-6">
          <div className="bg-white rounded-3xl shadow-lg mb-4 border border-blue-100 relative overflow-hidden max-w-xs mx-auto">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            {/* Full Image */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F4e35a47e90ed4fd380e7c0f90d9855f1?format=webp&width=800"
              alt="Builder"
              className="w-full h-48 object-cover"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">Builder Portal</h1>
          <p className="text-blue-600 text-sm sm:text-base px-4">
            Oversee projects and manage building development
          </p>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6 border border-blue-200 max-w-sm mx-auto w-full">
          <h3 className="text-base font-semibold text-gray-800 mb-4">What you can do:</h3>
          <ul className="space-y-3">
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Create and manage building projects</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Oversee multiple construction sites</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Monitor contractor performance</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Generate progress reports</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Coordinate with teams and suppliers</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 max-w-sm mx-auto w-full">
          <button
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 px-6 rounded-xl font-semibold active:from-blue-600 active:to-blue-700 transition-all duration-300 shadow-md active:shadow-lg active:scale-95"
          >
            Login to Dashboard
          </button>

          <button
            onClick={onSignup}
            className="w-full bg-white text-blue-600 py-3.5 px-6 rounded-xl font-semibold border-2 border-blue-200 active:border-blue-300 active:bg-blue-50 transition-all duration-300"
          >
            Create Builder Account
          </button>
        </div>

        <div className="mt-6 text-center px-4">
          <p className="text-xs text-gray-500">
            Professional project management tools for builders
          </p>
        </div>
      </div>
    </div>
  );
}
