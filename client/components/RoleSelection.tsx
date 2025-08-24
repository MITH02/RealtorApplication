interface RoleSelectionProps {
  onRoleSelect: (role: "builder" | "contractor" | "admin") => void;
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const roles = [
    {
      id: "builder" as const,
      title: "Builder",
      description:
        "Manage building projects and oversee construction development",
      icon: "🏗️",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      bgAccent: "bg-blue-50",
      textAccent: "text-blue-600",
    },
    {
      id: "contractor" as const,
      title: "Contractor",
      description: "Execute tasks and report project progress efficiently",
      icon: "👷",
      color: "bg-orange-600",
      hoverColor: "hover:bg-orange-700",
      bgAccent: "bg-orange-50",
      textAccent: "text-orange-600",
    },
    {
      id: "admin" as const,
      title: "Admin",
      description: "System administration and comprehensive user management",
      icon: "⚙️",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
      bgAccent: "bg-purple-50",
      textAccent: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-start px-4 py-8 sm:py-16">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif leading-tight">
              Welcome to ConstructPro
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto leading-relaxed px-4">
              Choose your role to access your personalized dashboard
            </p>
          </div>

          {/* Role Cards - Mobile First Stack */}
          <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => onRoleSelect(role.id)}
                className="group cursor-pointer transform transition-all duration-300 active:scale-95"
              >
                <div className="bg-white rounded-3xl shadow-lg active:shadow-xl p-6 border border-gray-100 transition-all duration-300 relative overflow-hidden">
                  {/* Solid Color Accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 ${role.color} rounded-t-3xl`}
                  ></div>

                  {/* Icon */}
                  <div className="text-5xl mb-4 text-center">{role.icon}</div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      {role.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                      {role.description}
                    </p>

                    {/* Action Button */}
                    <button
                      className={`w-full ${role.color} ${role.hoverColor} text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-md active:shadow-lg`}
                    >
                      <span className="flex items-center justify-center text-sm">
                        Select Role
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
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
        <div className="relative h-24 sm:h-32 mt-8">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2Fd218cd4c1f4249d689f1834e5336e992%2F7910060006ba48d9830f12d508b80fdb?format=webp&width=800')`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
