import React from 'react';
import { Outlet } from 'react-router-dom';
import CandidateSidebar from '../components/candidate/CandidateSidebar';

const CandidateLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Candidate Sidebar */}
      <CandidateSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default CandidateLayout;
