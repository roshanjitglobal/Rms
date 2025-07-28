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
  BarChart,
  Database,
  Feather,
  MessageCircle,
  Mic
} from 'react-feather';

const Tooltip = ({ label, show }) => (
  <div
    className={`pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 px-3 py-1 rounded bg-indigo-800 text-white text-xs shadow-lg transition-opacity duration-200 whitespace-nowrap ${show ? 'opacity-100' : 'opacity-0'}`}
    role="tooltip"
    style={{ minWidth: 'max-content' }}
  >
    {label}
  </div>
);

const Sidebar = ({ isOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useResponsive();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigationItems = useSelector(selectAllNavigationItems);

  // Navigation items
  const mainNavItems = [
    // { id: 1, path: '/hr-dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    // { id: 2, path: '/manage-hr', label: 'Manage HR', icon: <Users className="w-5 h-5" /> },
    // { id: 3, path: '/manage-jd', label: 'Manage JD', icon: <FileText className="w-5 h-5" /> },
    // { id: 4, path: '/notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    // { id: 5, path: '/Profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 6, path: '/super-admin-home', label: 'Dashboard', icon: <BarChart className="w-5 h-5" /> },
    { id: 7, path: '/company-management', label: 'Manage Company', icon: <Feather className="w-5 h-5" /> },
    { id: 8, path: '/manage-sub-admin', label: 'Manage Admin', icon: <Database className="w-5 h-5" /> },
    { id: 9, path: '/feedback-center', label: 'Feedback', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 10, path: '/support-center', label: 'Support', icon: <Mic className="w-5 h-5" /> },
  ];

  const getLinkClass = (path, isSub = false) => {
    const isActive = location.pathname === path;
    const base = "flex items-center px-3 py-2 rounded-lg transition-all mx-2 group text-white hover:bg-indigo-500 hover:text-white hover:font-semibold hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400";
    const sub = isSub ? 'pl-12 text-sm' : '';
    // Active state: indigo background, white text for contrast
    const active = isActive ? 'bg-indigo-600 text-white font-semibold' : '';
    return `${base} ${sub} ${active}`;
  };

  const sidebarClasses = `sticky top-0 z-40 transform overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent
    ${collapsed ? 'w-24' : 'w-64'} 
    ${isOpen ? 'fixed translate-x-0 shadow-2xl' : 'fixed -translate-x-full lg:translate-x-0'} 
    bg-gradient-to-br from-[#181ed4] via-[#3a47d5] to-[#6a82fb] text-white h-screen border-r border-indigo-900 relative`;

  const overlayClasses = `fixed inset-0 bg-black bg-opacity-50 z-30 ${isOpen ? 'block' : 'hidden'} lg:hidden`;

  // Add custom styles for stylish hover effects
  return (
    <>
      {isMobile && isOpen && (
        <div className={overlayClasses} onClick={onClose} aria-label="Close sidebar overlay" />
      )}
      <div className={sidebarClasses} role="navigation" aria-label="Sidebar Navigation">
        {/* RMS Logo at Top */}
        <div className={`flex items-center justify-center py-6 ${collapsed ? 'px-0' : 'px-4'}`}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/179/524/original/rms-letter-technology-logo-design-on-white-background-rms-creative-initials-letter-it-logo-concept-rms-letter-design-vector.jpg"
            alt="RMS Logo"
            className={`transition-all duration-300 ${collapsed ? 'w-10 h-10' : 'w-16 h-16'}`}
          />
        </div>
        {/* Separator below logo */}
        <div className="border-b border-white/20 mx-4 mb-4" />
 
        {/* Navigation */}
        <nav className="py-4 flex flex-col gap-3">
          {mainNavItems.map(({ id, path, label, icon }) => {
            const [showTooltip, setShowTooltip] = useState(false);
            return (
              <div
                key={id}
                className="relative sidebar-glow"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `${getLinkClass(path)} group transition-all duration-300 ease-in-out hover:scale-[1.07] hover:shadow-2xl hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400`
                  }
                  title={collapsed ? label : undefined}
                  aria-label={label}
                  tabIndex={0}
                >
                  <span className="flex items-center w-full">
                    <span
                      className={`text-xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12 ${collapsed ? 'mx-auto rounded-full bg-white/20 p-2' : 'mr-3'}`}
                      style={{ display: 'inline-block' }}
                    >{icon}</span>
                    {!collapsed && (
                      <span className="transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 opacity-90">{label}</span>
                    )}
                  </span>
                </NavLink>
                {collapsed && (
                  <Tooltip label={label} show={showTooltip} />
                )}
              </div>
            );
          })}

          {/* Settings */}
          {/* <div className="mt-6">
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
          </div> */}
        </nav>
        {/* Stylish Collapse/Expand Arrow at Bottom */}
        <div className="absolute bottom-6 left-0 w-full flex flex-col items-center">
          {/* <span className="text-s text-white/60 mb-1 select-none">v1.0.0</span> */}
          <button
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="group bg-gradient-to-br from-indigo-500 via-indigo-700 to-indigo-400 text-white rounded-full shadow-lg p-2 transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            style={{ outline: 'none' }}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''} group-hover:scale-125 group-hover:drop-shadow-lg`}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
      <style>
        {`
          .sidebar-glow {
            position: relative;
            z-index: 1;
          }
          .sidebar-glow::before {
            content: '';
            position: absolute;
            inset: -3px;
            border-radius: 0.75rem;
            background: linear-gradient(90deg, #6366f1, #818cf8, #a5b4fc, #6366f1);
            opacity: 0;
            transition: opacity 0.3s, box-shadow 0.3s;
            z-index: -1;
            box-shadow: 0 0 16px 4px #6366f166;
          }
          .sidebar-glow:hover::before, .sidebar-glow:focus::before {
            opacity: 1;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;