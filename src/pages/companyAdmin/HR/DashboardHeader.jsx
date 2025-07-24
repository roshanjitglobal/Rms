import React, { useState } from 'react';
import { Search, Bell, Settings, Menu, ChevronRight, LogOut, Grid } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const breadcrumbNameMap = {
  'hr-dashboard': 'Dashboard',
  'profile': 'Profile',
  'manage-hr': 'Manage HR',
  'manage-jd': 'Manage JD',
  'settings': 'Settings',
  'analytics': 'Analytics',
  'jd-vs-months': 'JD vs Months',
  'applied-jd-vs-jd': 'Applied vs JD',
  'hr-vs-jd': 'HR vs JD',
  'view-hr': 'View HR',
  'notifications': 'Notifications',
};

const DashboardHeader = ({ onSidebarToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="bg-white border-b border-gray-200 py-3 w-full px-4 sm:px-6">
      <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
        <div className="flex items-center gap-2">
          <button onClick={onSidebarToggle} className="p-2 text-gray-600 hover:text-gray-900 lg:hidden -ml-2">
            <Menu className="w-6 h-6" />
          </button>
          <button 
            onClick={() => navigate('/products')}
            className="hidden md:flex items-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Grid className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 max-w-xs sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-500 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            onClick={() => navigate('/notifications')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => {
              // Add logout logic here
              navigate('/login');
            }}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center space-x-2 text-sm">
        <Link to="/hr-dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>
        {pathnames.map((value, index) => {
          if (value === 'hr-dashboard') return null;
          
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const name = breadcrumbNameMap[value] || value;
          
          return (
            <React.Fragment key={routeTo}>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {isLast ? (
                <span className="font-medium text-gray-800">{name}</span>
              ) : (
                <Link to={routeTo} className="text-gray-600 hover:text-indigo-600">{name}</Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </header>
  );
};

export default DashboardHeader;
