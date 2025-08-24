import { useState } from "react";

interface LoginFormProps {
  role: 'builder' | 'contractor' | 'admin';
  onBack: () => void;
  onSuccess: () => void;
}

export default function LoginForm({ role, onBack, onSuccess }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roleConfig = {
    builder: {
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      lightGradient: 'from-blue-50 to-blue-100',
      accent: 'text-blue-600',
      bgAccent: 'bg-blue-50',
      icon: '🏗️',
      title: 'Builder Portal'
    },
    contractor: {
      gradient: 'from-orange-500 via-orange-600 to-orange-700',
      lightGradient: 'from-orange-50 to-orange-100',
      accent: 'text-orange-600',
      bgAccent: 'bg-orange-50',
      icon: '👷',
      title: 'Contractor Portal'
    },
    admin: {
      gradient: 'from-purple-500 via-purple-600 to-purple-700',
      lightGradient: 'from-purple-50 to-purple-100',
      accent: 'text-purple-600',
      bgAccent: 'bg-purple-50',
      icon: '⚙️',
      title: 'Admin Portal'
    }
  };

  const config = roleConfig[role];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.lightGradient} flex flex-col`}>
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <button
          onClick={onBack}
          className={`flex items-center ${config.accent} active:opacity-70 transition-all duration-200 p-2 rounded-lg ${config.bgAccent}`}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Logo/Icon Section */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${config.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
            <span className="text-3xl">{config.icon}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-gray-600 text-sm">
            {isLogin ? `Sign in to your ${role} account` : `Join as a ${role}`}
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rounded" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className={`${config.accent} hover:underline font-medium`}>
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r ${config.gradient} text-white py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            {/* Toggle between login/signup */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className={`${config.accent} hover:underline font-semibold text-sm mt-1`}
              >
                {isLogin ? 'Create one now' : 'Sign in instead'}
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 px-4 leading-relaxed">
              By continuing, you agree to our Terms of Service and Privacy Policy. 
              Your data is secure and encrypted.
            </p>
          </div>

          {/* Features Preview */}
          <div className={`mt-6 ${config.bgAccent} rounded-2xl p-4`}>
            <h4 className={`text-sm font-semibold ${config.accent} mb-2`}>
              What's waiting for you:
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {role === 'admin' && (
                <>
                  <li>• Complete project oversight</li>
                  <li>• Task assignment & approval</li>
                  <li>• Real-time progress tracking</li>
                </>
              )}
              {role === 'contractor' && (
                <>
                  <li>• Task management dashboard</li>
                  <li>• Progress reporting tools</li>
                  <li>• Deadline notifications</li>
                </>
              )}
              {role === 'builder' && (
                <>
                  <li>• Project creation tools</li>
                  <li>• Team coordination</li>
                  <li>• Progress analytics</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
