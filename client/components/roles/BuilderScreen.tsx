interface BuilderScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onBack: () => void;
}

export default function BuilderScreen({ onLogin, onSignup, onBack }: BuilderScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="max-w-md w-full">
        {/* Builder Card */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border border-blue-100 relative overflow-hidden max-w-sm mx-auto">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            {/* Image */}
            <div className="mb-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F4e35a47e90ed4fd380e7c0f90d9855f1?format=webp&width=800"
                alt="Builder"
                className="w-32 h-32 mx-auto rounded-2xl object-cover shadow-lg"
              />
            </div>

            {/* Role Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              🏗️ Builder Role
            </div>
          </div>

          <h1 className="text-4xl font-bold text-blue-800 mb-2">Builder Portal</h1>
          <p className="text-blue-600 text-lg">
            Oversee projects and manage building development
          </p>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">What you can do:</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Create and manage building projects
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Oversee multiple construction sites
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Monitor contractor performance
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Generate progress reports
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Coordinate with teams and suppliers
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Login to Dashboard
          </button>
          
          <button
            onClick={onSignup}
            className="w-full bg-white text-blue-600 py-4 px-6 rounded-xl font-semibold text-lg border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
          >
            Create Builder Account
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Professional project management tools for builders
          </p>
        </div>
      </div>
    </div>
  );
}
