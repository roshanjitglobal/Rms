import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import HRSidebar from '../components/candidate/HRSidebar';
import useResponsive from "@/hooks/useResponsive";
import DashboardHeader from '../pages/companyAdmin/HR/DashboardHeader';
import Footer from '../pages/landing/Components/Footer';
import CandidateSidebar from '../components/candidate/CandidateSidebar';
import CompanySidebar from '../components/candidate/CompanySidebar';
import SuperAdminSidebar from '../components/candidate/SuperAdminSidebar';
const HRLayout = ({userRole}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useResponsive();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };                

  const handleClickOutside = (e) => {
    if (!e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle') && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

// const userRole = 'candidate'; 

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <DashboardHeader onSidebarToggle={toggleSidebar} />
      <div className="flex flex-1 min-h-0">
        <div className={`transition-all duration-300 h-full z-20 ${collapsed ? 'w-20' : 'w-64'}`}>
          {userRole === 'HR' ? (
            <HRSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
          ) : userRole === 'candidate' ? (
            <CandidateSidebar />
          ) : userRole === 'companyAdmin' ? (
            <CompanySidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
          ) : userRole === 'SuperAdmin' ? (
            <SuperAdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
          ) : (
            <h1 className="text-red-500 p-4">Unknown Role</h1>
          )}
        </div>
        <div className="flex-1 overflow-auto transition-all duration-300 flex flex-col">
          <div className="flex-1 p-4 md:p-6">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HRLayout;


