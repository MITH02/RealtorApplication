interface ContractorScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onBack: () => void;
}

export default function ContractorScreen({ onLogin, onSignup, onBack }: ContractorScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <button
          onClick={onBack}
          className="flex items-center text-orange-600 active:text-orange-800 transition-colors duration-200 p-2 rounded-lg active:bg-orange-100"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 pb-8">
        {/* Contractor Card */}
        <div className="text-center mb-6">
          <div className="bg-white rounded-3xl shadow-lg mb-4 border border-orange-100 relative overflow-hidden max-w-xs mx-auto">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-orange-600"></div>

            {/* Full Image */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F49e829fd851d42a691685962b579ec5a?format=webp&width=800"
              alt="Contractor"
              className="w-full h-48 object-cover"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-orange-800 mb-2">Contractor Portal</h1>
          <p className="text-orange-600 text-sm sm:text-base px-4">
            Manage your assigned tasks and track project progress
          </p>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6 border border-orange-200 max-w-sm mx-auto w-full">
          <h3 className="text-base font-semibold text-gray-800 mb-4">What you can do:</h3>
          <ul className="space-y-3">
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>View assigned building projects</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Track task deadlines and progress</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Mark tasks as completed</span>
            </li>
            <li className="flex items-start text-gray-700 text-sm">
              <svg className="w-4 h-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Upload progress photos and reports</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 max-w-sm mx-auto w-full">
          <button
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 px-6 rounded-xl font-semibold active:from-orange-600 active:to-orange-700 transition-all duration-300 shadow-md active:shadow-lg active:scale-95"
          >
            Login to Dashboard
          </button>

          <button
            onClick={onSignup}
            className="w-full bg-white text-orange-600 py-3.5 px-6 rounded-xl font-semibold border-2 border-orange-200 active:border-orange-300 active:bg-orange-50 transition-all duration-300"
          >
            Create Contractor Account
          </button>
        </div>

        <div className="mt-6 text-center px-4">
          <p className="text-xs text-gray-500">
            Need help? Contact your project administrator
          </p>
        </div>
      </div>
    </div>
  );
}
