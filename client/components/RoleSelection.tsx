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
        "https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop&crop=center",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 dark:from-orange-600 dark:via-red-600 dark:to-red-700 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {/* Stars */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/60 animate-pulse"
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

        {/* Clouds */}
        <div className="absolute top-12 left-8 w-20 h-12 bg-orange-300/40 rounded-full"></div>
        <div className="absolute top-16 left-12 w-16 h-8 bg-orange-200/50 rounded-full"></div>
        <div className="absolute top-20 right-12 w-24 h-14 bg-orange-300/30 rounded-full"></div>
        <div className="absolute top-24 right-16 w-18 h-10 bg-orange-200/40 rounded-full"></div>

        {/* Additional small clouds */}
        <div className="absolute top-32 left-1/4 w-12 h-6 bg-orange-200/50 rounded-full"></div>
        <div className="absolute top-40 right-1/3 w-14 h-8 bg-orange-300/40 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-6 pt-12 sm:pt-16">
          <div className="flex justify-end mb-4">
            <SimpleThemeToggle />
          </div>
          <div className="text-center transition-all duration-1000 opacity-100 translate-y-0">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
              ConstructPro
            </h1>
            <p className="text-lg text-white/90 font-medium drop-shadow">
              Choose your role to access your dashboard
            </p>
          </div>
        </div>

        {/* Role Cards */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => onRoleSelect(role.id)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="bg-slate-800/90 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl overflow-hidden transition-all duration-300 border border-white/10 dark:border-white/20">
                  <div className="flex">
                    {/* Image Section */}
                    <div className="w-32 sm:w-40 h-24 sm:h-28 flex-shrink-0">
                      <img
                        src={role.image}
                        alt={role.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow">
                        {role.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed drop-shadow">
                        {role.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center pr-4 sm:pr-6">
                      <svg
                        className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
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
            <p className="text-white/80 text-sm font-medium drop-shadow">
              Professional Construction Management Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
