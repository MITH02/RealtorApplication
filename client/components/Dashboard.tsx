interface DashboardProps {
  role: 'builder' | 'contractor' | 'admin';
  onLogout: () => void;
}

export default function Dashboard({ role, onLogout }: DashboardProps) {
  const roleColors = {
    builder: {
      primary: 'bg-blue-600',
      accent: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    contractor: {
      primary: 'bg-orange-600',
      accent: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    admin: {
      primary: 'bg-purple-600',
      accent: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  };

  const colors = roleColors[role];

  const getDashboardContent = () => {
    switch (role) {
      case 'admin':
        return {
          title: 'Admin Dashboard',
          stats: [
            { label: 'Total Buildings', value: '12', icon: '🏢' },
            { label: 'Active Contractors', value: '8', icon: '👷' },
            { label: 'Pending Approvals', value: '5', icon: '⏳' },
            { label: 'Overdue Tasks', value: '2', icon: '🚨' }
          ],
          actions: [
            'Create New Building',
            'Manage Contractors',
            'Review Task Approvals',
            'Generate Reports'
          ]
        };
      case 'contractor':
        return {
          title: 'Contractor Dashboard',
          stats: [
            { label: 'Assigned Projects', value: '3', icon: '🏗️' },
            { label: 'Completed Tasks', value: '15', icon: '✅' },
            { label: 'Pending Tasks', value: '4', icon: '📋' },
            { label: 'Days Until Deadline', value: '7', icon: '📅' }
          ],
          actions: [
            'View Current Tasks',
            'Mark Task Complete',
            'Upload Progress Photos',
            'Request Extension'
          ]
        };
      case 'builder':
        return {
          title: 'Builder Dashboard',
          stats: [
            { label: 'Active Projects', value: '5', icon: '🏘️' },
            { label: 'Total Contractors', value: '12', icon: '👥' },
            { label: 'Completed Buildings', value: '23', icon: '🏆' },
            { label: 'Project Progress', value: '78%', icon: '📊' }
          ],
          actions: [
            'Create New Project',
            'Monitor Progress',
            'Assign Contractors',
            'Review Reports'
          ]
        };
      default:
        return { title: '', stats: [], actions: [] };
    }
  };

  const content = getDashboardContent();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`${colors.primary} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">ConstructPro</h1>
              <span className="ml-4 px-3 py-1 bg-white/20 rounded-full text-sm">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {content.stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className="text-3xl mr-4">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {content.actions.map((action, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:${colors.bg} transition-all duration-200 flex items-center justify-between`}
                >
                  <span>{action}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Task completed</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New assignment</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Deadline reminder</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder message */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-lg font-semibold text-blue-900">Dashboard Preview</h4>
              <p className="text-blue-700">
                This is a preview of your {role} dashboard. Full functionality including task management, 
                project creation, and approval workflows will be implemented in the next phase.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
