interface RoleSelectionProps {
  onRoleSelect: (role: 'builder' | 'contractor' | 'admin') => void;
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const roles = [
    {
      id: 'builder' as const,
      title: 'Builder',
      description: 'Manage building projects and oversee construction',
      icon: '🏗️',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'contractor' as const,
      title: 'Contractor',
      description: 'Execute tasks and report project progress',
      icon: '👷',
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 'admin' as const,
      title: 'Admin',
      description: 'System administration and user management',
      icon: '⚙️',
      color: 'from-purple-500 to-purple-700'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F7910060006ba48d9830f12d508b80fdb?format=webp&width=800')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 font-serif">
            Welcome to ConstructPro
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Choose your role to access your personalized dashboard and manage construction projects efficiently
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => onRoleSelect(role.id)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                {/* Icon */}
                <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                  {role.icon}
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {role.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {role.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${role.color} text-white font-semibold text-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-black/25`}>
                    Select Role
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            Secure • Professional • Efficient
          </p>
        </div>
      </div>
    </div>
  );
}
