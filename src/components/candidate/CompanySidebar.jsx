import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  FileText,
  MessageSquare,
  Settings,
  User
} from 'lucide-react';

const COMPANY_SIDEBAR_ITEMS = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/company' },
  { label: 'Manage HR', icon: <FileText size={20} />, path: '/company/manage-hr' },
  { label: 'Profile', icon: <ClipboardList size={20} />, path: '/company/profile' },
  { label: 'Settings', icon: <Briefcase size={20} />, path: '/company/settings' },
  // { label: 'Support', icon: <User size={20} />, path: '/super-admin/support-center' },
  
];

const CompanySidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();

  return (
    <aside className={`transition-all duration-300 bg-indigo-700 text-white p-4 ${collapsed ? 'w-20' : 'w-64'} space-y-6 relative h-full`}>
      <button
        className="absolute top-4 -right-3 bg-white text-indigo-700 rounded-full shadow-md p-1 z-10"
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
      
      {!collapsed && (
        <h2 className="text-2xl font-bold mb-6">
          <Link to="/super-admin" className="flex items-center">
            <Briefcase className="mr-2" />
            <span>companyadmin </span>
          </Link>
        </h2>
      )}
      
      <nav className="space-y-2">
        {COMPANY_SIDEBAR_ITEMS.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              location.pathname === item.path 
                ? 'bg-indigo-800 text-white shadow-md' 
                : 'text-indigo-100 hover:bg-indigo-600'
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default CompanySidebar;
