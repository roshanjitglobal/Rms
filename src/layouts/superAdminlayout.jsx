import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from '../pages/auth/superAdmin/Sidenav';
import DashboardHeader from '../pages/companyAdmin/HR/DashboardHeader';
import Footer from '../pages/landing/Components/Footer';

const SuperAdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        style={{
          width: collapsed ? '5rem' : '16rem',
          transition: 'width 0.3s ease',
        }}
      >
        <SideNavBar 
          collapsed={collapsed} 
          onToggleCollapse={() => setCollapsed(!collapsed)} 
          isMobileMenuOpen={isSidebarOpen}
          onMobileMenuToggle={toggleSidebar}
        />
      </div>
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${
        collapsed ? 'lg:pl-20' : 'lg:pl-64'
      }`}>
        {/* Header */}
        <DashboardHeader onSidebarToggle={toggleSidebar} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SuperAdminLayout;