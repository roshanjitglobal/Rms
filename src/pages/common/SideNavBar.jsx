import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Users, Building2, BarChart2, Settings, UserCircle,
  FileText, Briefcase, MessageSquare, HelpCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

const SideNavBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const userRole = localStorage.getItem('role')?.toLowerCase();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`transition-all duration-300 bg-[#4f46e5] text-white p-4 ${collapsed ? 'w-20' : 'w-64'} space-y-6 relative min-h-screen`}>
      <button
        className="absolute top-4 right-[-12px] bg-white text-[#4f46e5] rounded-full shadow-md p-1"
        onClick={() => setCollapsed(c => !c)}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <h2 className={`text-2xl font-bold mb-6 ${collapsed ? 'hidden' : 'block'}`}>
        <Link to="/">RMS Panel</Link>
      </h2>

      <nav className="space-y-4">
        {/* Super Admin Screens */}
        {userRole === 'superadmin' && (
          <>
            <Link to="/super-admin" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/super-admin') ? 'bg-indigo-700' : ''}`}>
              <Home size={20} />
              {!collapsed && <span className="ml-3">Home</span>}
            </Link>
            <Link to="/company-management" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/company-management') ? 'bg-indigo-700' : ''}`}>
              <Building2 size={20} />
              {!collapsed && <span className="ml-3">Manage Company</span>}
            </Link>
            <Link to="/manage-sub-admin" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/manage-sub-admin') ? 'bg-indigo-700' : ''}`}>
              <Users size={20} />
              {!collapsed && <span className="ml-3">Manage Sub-Admins</span>}
            </Link>
            <Link to="/support-center" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/support-center') ? 'bg-indigo-700' : ''}`}>
              <HelpCircle size={20} />
              {!collapsed && <span className="ml-3">Support Center</span>}
            </Link>
            <Link to="/feedback-center" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/feedback-center') ? 'bg-indigo-700' : ''}`}>
              <MessageSquare size={20} />
              {!collapsed && <span className="ml-3">Feedback</span>}
            </Link>
          </>
        )}

        {/* Company Admin Screens */}
        {userRole === 'companyadmin' && (
          <>
            <Link to="/company/dashboard" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/company/dashboard') ? 'bg-indigo-700' : ''}`}>
              <BarChart2 size={20} />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </Link>
            <Link to="/company/manage-hr" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/company/manage-hr') ? 'bg-indigo-700' : ''}`}>
              <Users size={20} />
              {!collapsed && <span className="ml-3">Manage HR</span>}
            </Link>
            <Link to="/company/profile" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/company/profile') ? 'bg-indigo-700' : ''}`}>
              <Building2 size={20} />
              {!collapsed && <span className="ml-3">Company Profile</span>}
            </Link>
            <Link to="/company/settings" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/company/settings') ? 'bg-indigo-700' : ''}`}>
              <Settings size={20} />
              {!collapsed && <span className="ml-3">Settings</span>}
            </Link>
          </>
        )}

        {/* HR Screens */}
        {userRole === 'hr' && (
          <>
            <Link to="/hr/dashboard" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/hr/dashboard') ? 'bg-indigo-700' : ''}`}>
              <BarChart2 size={20} />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </Link>
            <Link to="/hr/managejd" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/hr/managejd') ? 'bg-indigo-700' : ''}`}>
              <FileText size={20} />
              {!collapsed && <span className="ml-3">Manage JD</span>}
            </Link>
            <Link to="/hr/candidate-management" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/hr/candidate-management') ? 'bg-indigo-700' : ''}`}>
              <MessageSquare size={20} />
              {!collapsed && <span className="ml-3">Candidate Management</span>}
            </Link>
            <Link to="/hr/interviewscore" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/hr/interviewscore') ? 'bg-indigo-700' : ''}`}>
              <Briefcase size={20} />
              {!collapsed && <span className="ml-3">Interview Score</span>}
            </Link>
            <Link to="/hr/profile" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/hr/profile') ? 'bg-indigo-700' : ''}`}>
              <UserCircle size={20} />
              {!collapsed && <span className="ml-3">Profile</span>}
            </Link>
            <Link to="/hr/settings" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/hr/settings') ? 'bg-indigo-700' : ''}`}>
              <Settings size={20} />
              {!collapsed && <span className="ml-3">Settings</span>}
            </Link>
          </>
        )}

        {/* Candidate Screens */}
        {userRole === 'candidate' && (
          <>
            <Link to="/candidate/dashboard" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/candidate/dashboard') ? 'bg-indigo-700' : ''}`}>
              <Home size={20} />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </Link>
            <Link to="/candidate/profile" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/candidate/profile') ? 'bg-indigo-700' : ''}`}>
              <UserCircle size={20} />
              {!collapsed && <span className="ml-3">Profile</span>}
            </Link>
            <Link to="/candidate/applications" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/candidate/applications') ? 'bg-indigo-700' : ''}`}>
              <MessageSquare size={20} />
              {!collapsed && <span className="ml-3">My Applications</span>}
            </Link>
            <Link to="/candidate/jobs" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/candidate/jobs') ? 'bg-indigo-700' : ''}`}>
              <Briefcase size={20} />
              {!collapsed && <span className="ml-3">Job Portal</span>}
            </Link>
            <Link to="/candidate/settings" className={`flex items-center p-3 rounded-lg hover:bg-indigo-600 ${isActive('/candidate/settings') ? 'bg-indigo-700' : ''}`}>
              <Settings size={20} />
              {!collapsed && <span className="ml-3">Settings</span>}
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default SideNavBar;
