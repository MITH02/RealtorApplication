import { SimpleThemeToggle } from "@/components/theme-toggle";

interface DashboardProps {
  role: "builder" | "contractor" | "admin";
  onLogout: () => void;
}

export default function Dashboard({ role, onLogout }: DashboardProps) {
  const roleColors = {
    builder: {
      primary: "bg-blue-600",
      accent: "text-blue-600",
      bg: "bg-blue-50",
    },
    contractor: {
      primary: "bg-orange-600",
      accent: "text-orange-600",
      bg: "bg-orange-50",
    },
    admin: {
      primary: "bg-purple-600",
      accent: "text-purple-600",
      bg: "bg-purple-50",
    },
  };

  const colors = roleColors[role];

  const getDashboardContent = () => {
    switch (role) {
      case "admin":
        return {
          title: "Admin Dashboard",
          stats: [
            { label: "Total Buildings", value: "12", icon: "🏢" },
            { label: "Active Contractors", value: "8", icon: "👷" },
            { label: "Pending Approvals", value: "5", icon: "⏳" },
            { label: "Overdue Tasks", value: "2", icon: "🚨" },
          ],
          actions: [
            "Create New Building",
            "Manage Contractors",
            "Review Task Approvals",
            "Generate Reports",
          ],
        };
      case "contractor":
        return {
          title: "Contractor Dashboard",
          stats: [
            { label: "Assigned Projects", value: "3", icon: "🏗️" },
            { label: "Completed Tasks", value: "15", icon: "✅" },
            { label: "Pending Tasks", value: "4", icon: "📋" },
            { label: "Days Until Deadline", value: "7", icon: "📅" },
          ],
          actions: [
            "View Current Tasks",
            "Mark Task Complete",
            "Upload Progress Photos",
            "Request Extension",
          ],
        };
      case "builder":
        return {
          title: "Builder Dashboard",
          stats: [
            { label: "Active Projects", value: "5", icon: "🏘️" },
            { label: "Total Contractors", value: "12", icon: "👥" },
            { label: "Completed Buildings", value: "23", icon: "🏆" },
            { label: "Project Progress", value: "78%", icon: "📊" },
          ],
          actions: [
            "Create New Project",
            "Monitor Progress",
            "Assign Contractors",
            "Review Reports",
          ],
        };
      default:
        return { title: "", stats: [], actions: [] };
    }
  };

  const content = getDashboardContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/15 to-indigo-400/15 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-white/50 dark:border-slate-700/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                ConstructPro
              </h1>
              <span className={`ml-4 px-4 py-2 bg-gradient-to-r ${colors.primary === 'bg-blue-600' ? 'from-blue-500/20 to-blue-600/20' : colors.primary === 'bg-orange-600' ? 'from-orange-500/20 to-orange-600/20' : 'from-purple-500/20 to-purple-600/20'} backdrop-blur-sm rounded-full text-sm font-semibold ${colors.accent} border border-white/30 dark:border-slate-700/30`}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <SimpleThemeToggle />
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-800/90 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:scale-105"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-4">
            {content.title}
          </h2>
          <div className="inline-block px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-white/50 dark:border-slate-700/50 shadow-lg">
            <p className="text-slate-700 dark:text-slate-300 font-semibold">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {content.stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl p-6 border border-white/50 dark:border-slate-700/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-center">
                <div className="text-4xl mr-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {content.actions.map((action, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:${colors.bg} dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-between text-gray-900 dark:text-white`}
                >
                  <span>{action}</span>
                  <svg
                    className="w-4 h-4"
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
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Task completed
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    New assignment
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 day ago
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Deadline reminder
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder message */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-blue-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-lg font-semibold text-blue-900">
                Dashboard Preview
              </h4>
              <p className="text-blue-700">
                This is a preview of your {role} dashboard. Full functionality
                including task management, project creation, and approval
                workflows will be implemented in the next phase.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
