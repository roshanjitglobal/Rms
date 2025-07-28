import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HRSidebar from '../components/hr/HRSidebar';
import useResponsive from "@/hooks/useResponsive";
import DashboardHeader from '../pages/companyAdmin/HR/DashboardHeader';
import Footer from '../pages/landing/Components/Footer';

const HRLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useResponsive();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  const handleClickOutside = (e) => {
    if (!e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle') && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Add click outside listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Dashboard Header at the very top */}
      <DashboardHeader onSidebarToggle={toggleSidebar} />
      <div className="flex flex-1 min-h-0">
        {/* HR Specific Sidebar */}
        <div className={`transition-all duration-300 h-full z-20 ${collapsed ? 'w-20' : 'w-64'}`}>
          <HRSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
        </div>
        {/* Main content */}
        <div className="flex-1 overflow-auto transition-all duration-300 flex flex-col">
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

export default HRLayout;