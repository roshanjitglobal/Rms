import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CandidateSidebar from '../components/candidate/CandidateSidebar';
import DashboardHeader from '../pages/companyAdmin/HR/DashboardHeader';
import Footer from '../pages/landing/Components/Footer';

const CandidateLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader onSidebarToggle={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-20`}>
          <CandidateSidebar />
        </div>
        
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto lg:ml-64">
          <div className="min-h-[calc(100vh-64px-64px)]">
            <Outlet />
          </div>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CandidateLayout;
