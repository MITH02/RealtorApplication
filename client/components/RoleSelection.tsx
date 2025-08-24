interface RoleSelectionProps {
  onRoleSelect: (role: 'builder' | 'contractor' | 'admin') => void;
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const roles = [
    {
      id: 'builder' as const,
      title: 'Builder',
      description: 'Manage building projects and oversee construction development',
      icon: '🏗️',
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'from-blue-600 to-blue-700',
      bgAccent: 'bg-blue-50',
      textAccent: 'text-blue-600'
    },
    {
      id: 'contractor' as const,
      title: 'Contractor',
      description: 'Execute tasks and report project progress efficiently',
      icon: '👷',
      gradient: 'from-orange-500 to-orange-600',
      hoverGradient: 'from-orange-600 to-orange-700',
      bgAccent: 'bg-orange-50',
      textAccent: 'text-orange-600'
    },
    {
      id: 'admin' as const,
      title: 'Admin',
      description: 'System administration and comprehensive user management',
      icon: '⚙️',
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'from-purple-600 to-purple-700',
      bgAccent: 'bg-purple-50',
      textAccent: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-slate-800 mb-6 font-serif">
              Welcome to ConstructPro
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Choose your role to access your personalized dashboard and manage construction projects efficiently
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => onRoleSelect(role.id)}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
              >
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 border border-gray-100 transition-all duration-500 hover:border-gray-200 relative overflow-hidden">
                  {/* Gradient Background Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${role.gradient} rounded-t-3xl`}></div>

                  {/* Icon */}
                  <div className="text-7xl mb-6 text-center group-hover:scale-110 transition-transform duration-500">
                    {role.icon}
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">
                      {role.title}
                    </h3>
                    <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                      {role.description}
                    </p>

                    {/* Action Button */}
                    <button className={`w-full bg-gradient-to-r ${role.gradient} hover:bg-gradient-to-r hover:${role.hoverGradient} text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}>
                      <span className="flex items-center justify-center">
                        Select Role
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with Construction Image */}
        <div className="relative h-32 mt-16">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{
              backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F7910060006ba48d9830f12d508b80fdb?format=webp&width=800')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/40"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-white text-lg font-semibold mb-2">
                Secure • Professional • Efficient
              </p>
              <p className="text-white/80 text-sm">
                Powering construction management worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
