import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import useResponsive from "@/hooks/useResponsive";
import DashboardHeader from '../pages/companyAdmin/HR/DashboardHeader';
import Footer from '../pages/landing/Components/Footer';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';

const COMPANY_ADMIN_ITEMS = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/company/dashboard' },
  { label: 'Manage HR', icon: <Users size={20} />, path: '/company/manage-hr' },
  // { label: 'Reports', icon: <FileText size={20} />, path: '/company/reports' },
  { label: 'Notifications', icon: <Bell size={20} />, path: '/company/notifications' },
  { label: 'Profile', icon: <User size={20} />, path: '/company/profile' },
  { label: 'Settings', icon: <Settings size={20} />, path: '/company/settings' },
];

const CompanyAdminSidebar = ({ isOpen, onClose, collapsed, setCollapsed }) => {
  const location = useLocation();

  return (
    <aside 
      className={`fixed inset-y-0 left-0 bg-indigo-800 text-white p-4 z-20 transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${collapsed ? 'w-20' : 'w-64'} lg:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <h1 className="text-xl font-bold">Company Admin</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-full hover:bg-indigo-700"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <nav className="space-y-2 flex-1">
          {COMPANY_ADMIN_ITEMS.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-indigo-700 text-white shadow-md' 
                  : 'text-indigo-100 hover:bg-indigo-600'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

const CompanyAdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useResponsive();

  // Close sidebar on mobile when route changes
  const location = useLocation();
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Dashboard Header at the very top */}
      <DashboardHeader onSidebarToggle={toggleSidebar} />
      <div className="flex flex-1 min-h-0">
        {/* Company Admin Sidebar */}
        <CompanyAdminSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className={`flex-1 overflow-auto transition-all duration-300 flex flex-col ${
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}>
          <div className="flex-1 p-4 md:p-6">
            <Outlet />
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CompanyAdminLayout;