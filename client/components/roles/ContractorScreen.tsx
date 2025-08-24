interface ContractorScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onBack: () => void;
}

export default function ContractorScreen({ onLogin, onSignup, onBack }: ContractorScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center text-orange-600 hover:text-orange-800 transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="max-w-md w-full">
        {/* Contractor Icon */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F49e829fd851d42a691685962b579ec5a?format=webp&width=800" 
              alt="Contractor" 
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-orange-800 mb-2">Contractor Portal</h1>
          <p className="text-orange-600 text-lg">
            Manage your assigned tasks and track project progress
          </p>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-orange-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">What you can do:</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              View assigned building projects
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Track task deadlines and progress
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Mark tasks as completed
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Upload progress photos and reports
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Login to Dashboard
          </button>
          
          <button
            onClick={onSignup}
            className="w-full bg-white text-orange-600 py-4 px-6 rounded-xl font-semibold text-lg border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
          >
            Create Contractor Account
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact your project administrator
          </p>
        </div>
      </div>
    </div>
  );
}
