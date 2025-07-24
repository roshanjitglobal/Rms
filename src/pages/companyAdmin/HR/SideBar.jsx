import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllNavigationItems, fetchNavigationUpdates } from '../../../store/slices/navigationSlice';
import { XIcon } from '../../../components/icons/Icons';
import useResponsive from '../../../hooks/useResponsive';
import {
  Layout as LayoutDashboard,
  Users,
  FileText,
  Bell,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'react-feather';

const Sidebar = ({ isOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useResponsive();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigationItems = useSelector(selectAllNavigationItems);

  // Navigation items
  const mainNavItems = [
    { id: 1, path: '/hr-dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 2, path: '/manage-hr', label: 'Manage HR', icon: <Users className="w-5 h-5" /> },
    { id: 3, path: '/manage-jd', label: 'Manage JD', icon: <FileText className="w-5 h-5" /> },
    { id: 4, path: '/notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 5, path: '/Profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  const getLinkClass = (path, isSub = false) => {
    const isActive = location.pathname === path;
    const base = "flex items-center px-3 py-2 rounded-lg transition-all mx-2 group text-white hover:bg-indigo-600/60";
    const sub = isSub ? 'pl-12 text-sm' : '';
    const active = isActive ? 'bg-indigo-600 font-semibold' : 'hover:pl-4';
    return `${base} ${sub} ${active}`;
  };

  const sidebarClasses = `lg:sticky top-16 lg:top-0 z-40 transform overflow-y-auto transition-all duration-300 ease-in-out scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent
    ${collapsed ? 'w-20' : 'w-64'} 
    ${isOpen ? 'fixed translate-x-0 shadow-2xl' : 'fixed -translate-x-full lg:translate-x-0'} 
    bg-gradient-to-br from-[#181ed4]/90 via-[#3a47d5]/90 to-[#6a82fb]/90 text-white h-[calc(100vh-4rem)] border-r border-indigo-900`;

  const overlayClasses = `fixed inset-0 bg-black bg-opacity-50 z-30 ${isOpen ? 'block' : 'hidden'} lg:hidden`;

  return (
    <>
      {isMobile && isOpen && (
        <div className={overlayClasses} onClick={onClose} aria-label="Close sidebar overlay" />
      )}
      <div className={sidebarClasses} role="navigation" aria-label="Sidebar Navigation">
        {/* Top */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-indigo-800 bg-indigo-800/50">
          <button
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-2 text-gray-300 hover:text-white"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {isMobile && (
            <button onClick={onClose} className="p-2 text-gray-300 hover:text-white" aria-label="Close sidebar">
              <XIcon className="h-7 w-7" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="py-4">
          {mainNavItems.map(({ id, path, label, icon }) => (
            <NavLink
              key={id}
              to={path}
              className={getLinkClass(path)}
              title={collapsed ? label : undefined}
              aria-label={label}
            >
              <span className="flex items-center w-full">
                <span className={`text-xl ${collapsed ? 'mx-auto' : 'mr-3'}`}>{icon}</span>
                {!collapsed && <span>{label}</span>}
              </span>
            </NavLink>
          ))}

          {/* Settings */}
          <div className="mt-6">
            <NavLink
              to="/settings"
              className={getLinkClass('/settings')}
              title={collapsed ? 'Settings' : undefined}
              aria-label="Settings"
            >
              <div className="flex items-center">
                <Settings className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                {!collapsed && <span>Settings</span>}
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;