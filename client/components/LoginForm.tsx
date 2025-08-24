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

  const roleColors = {
    builder: {
      primary: 'from-blue-500 to-blue-600',
      secondary: 'text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50',
      accent: 'text-blue-600',
      bg: 'from-blue-50 to-blue-100'
    },
    contractor: {
      primary: 'from-orange-500 to-orange-600',
      secondary: 'text-orange-600 border-orange-200 hover:border-orange-300 hover:bg-orange-50',
      accent: 'text-orange-600',
      bg: 'from-orange-50 to-orange-100'
    },
    admin: {
      primary: 'from-purple-500 to-purple-600',
      secondary: 'text-purple-600 border-purple-200 hover:border-purple-300 hover:bg-purple-50',
      accent: 'text-purple-600',
      bg: 'from-purple-50 to-purple-100'
    }
  };

  const colors = roleColors[role];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just simulate success
    setTimeout(onSuccess, 1000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} flex items-center justify-center p-8`}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`absolute top-8 left-8 flex items-center ${colors.accent} hover:opacity-80 transition-colors duration-200`}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? `Sign in to your ${role} account` : `Register as a ${role}`}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className={`${colors.accent} hover:underline`}>
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className={`w-full bg-gradient-to-r ${colors.primary} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle between login/signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className={`ml-2 ${colors.accent} hover:underline font-medium`}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
