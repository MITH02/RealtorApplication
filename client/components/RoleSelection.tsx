import { SimpleThemeToggle } from "@/components/theme-toggle";

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
      image:
        "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop&crop=center",
    },
    {
      id: "contractor" as const,
      title: "Contractor",
      description: "Execute tasks and report project progress efficiently",
      image:
        "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop&crop=center",
    },
    {
      id: "admin" as const,
      title: "Admin",
      description: "System administration and comprehensive user management",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop&crop=center",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {/* Stars */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-slate-600/80 dark:text-white/60 animate-pulse"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              fontSize: `${12 + Math.random() * 8}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ✦
          </div>
        ))}

        {/* Modern Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-cyan-400/25 to-blue-400/25 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-indigo-400/30 to-cyan-400/30 rounded-full blur-md animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg animate-float" style={{animationDelay: '0.5s'}}></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 left-1/3 w-2 h-12 bg-gradient-to-b from-blue-400/40 to-transparent rotate-12 animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-2 bg-gradient-to-r from-cyan-400/40 to-transparent -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-6 pt-12 sm:pt-16">
          <div className="flex justify-end mb-4">
            <SimpleThemeToggle />
          </div>
          <div className="text-center transition-all duration-1000 opacity-100 translate-y-0">
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4 tracking-tight animate-fadeIn">
              ConstructPro
            </h1>
            <div className="inline-block px-6 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-white/60 dark:border-slate-700/60 shadow-lg">
              <p className="text-lg text-slate-700 dark:text-slate-200 font-semibold">
                Choose your role to access your dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Role Cards */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => onRoleSelect(role.id)}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 active:scale-95"
                style={{
                  animationDelay: `${roles.indexOf(role) * 200}ms`,
                }}
              >
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 border border-white/50 dark:border-slate-700/50 hover:border-blue-300/60 dark:hover:border-blue-400/60 relative group-hover:bg-white/95 dark:group-hover:bg-slate-800/95">
                  <div className="flex h-44 sm:h-48">
                    {/* Image Section */}
                    <div className="w-44 sm:w-52 flex-shrink-0 overflow-hidden">
                      <img
                        src={role.image}
                        alt={role.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {role.title}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base leading-relaxed drop-shadow">
                        {role.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center pr-5 sm:pr-6">
                      <svg
                        className="w-7 h-7 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="px-6 pb-12">
          <div className="text-center transition-all duration-1000 delay-500 opacity-100 translate-y-0">
            <p className="text-slate-700 dark:text-white/80 text-sm font-medium drop-shadow">
              Professional Construction Management Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
