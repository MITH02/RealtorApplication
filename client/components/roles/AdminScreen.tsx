interface AdminScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onBack: () => void;
}

export default function AdminScreen({ onLogin, onSignup, onBack }: AdminScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <button
          onClick={onBack}
          className="flex items-center text-purple-600 active:text-purple-800 transition-colors duration-200 p-2 rounded-lg active:bg-purple-100"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 pb-8">
        {/* Admin Card */}
        <div className="text-center mb-6">
          <div className="bg-white rounded-3xl shadow-lg mb-4 border border-purple-100 relative overflow-hidden max-w-xs mx-auto">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-400 to-purple-600"></div>

            {/* Full Image */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2Fef4d01b439c041bc9a1546a4ea50eb7f?format=webp&width=800"
              alt="Admin"
              className="w-full h-48 object-cover"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-2">Admin Portal</h1>
          <p className="text-purple-600 text-sm sm:text-base px-4">
            System administration and comprehensive management
          </p>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6 border border-purple-200 max-w-sm mx-auto w-full">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Admin Capabilities:</h3>
          <ul className="space-y-3">
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Create and manage buildings</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Assign tasks to contractors</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Set deadlines and milestones</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Approve task completions</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Monitor project alerts and deadlines</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Generate comprehensive reports</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 max-w-sm mx-auto w-full">
          <button
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3.5 px-6 rounded-xl font-semibold active:from-purple-600 active:to-purple-700 transition-all duration-300 shadow-md active:shadow-lg active:scale-95"
          >
            Login to Admin Panel
          </button>

          <button
            onClick={onSignup}
            className="w-full bg-white text-purple-600 py-3.5 px-6 rounded-xl font-semibold border-2 border-purple-200 active:border-purple-300 active:bg-purple-50 transition-all duration-300"
          >
            Request Admin Access
          </button>
        </div>

        <div className="mt-6 text-center px-4">
          <p className="text-xs text-gray-500">
            Complete system control and project oversight
          </p>
        </div>
      </div>
    </div>
  );
}
