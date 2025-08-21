import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Briefcase, 
  FileText, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SideNavBar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const navItems = [
    {
      title: 'Dashboard',
      icon: Home,
      path: '/hr/dashboard',
      color: 'text-blue-600'
    },
    {
      title: 'Profile',
      icon: User,
      path: '/hr/profile',
      color: 'text-green-600'
    },
    {
      title: 'Job Descriptions',
      icon: FileText,
      path: '/hr/jd',
      color: 'text-purple-600'
    },
    {
      title: 'Candidates',
      icon: Users,
      path: '/hr/candidates',
      color: 'text-orange-600'
    },
    {
      title: 'Interviews',
      icon: Calendar,
      path: '/hr/interviews',
      color: 'text-red-600'
    },
    {
      title: 'Reports',
      icon: BarChart3,
      path: '/hr/reports',
      color: 'text-indigo-600'
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/hr/settings',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-gray-800">HR Portal</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.color}`} />
                {!collapsed && (
                  <span className="font-medium">{item.title}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t">
            <div className="text-xs text-gray-500 text-center">
              HR Management System
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavBar; 