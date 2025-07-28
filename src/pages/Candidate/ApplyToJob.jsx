import React, { useState } from "react";
import {
  User,
  FilePlus,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Profile", icon: <User size={20} />, path: "/candidate/profile" },
  { name: "Upload CV", icon: <FilePlus size={20} />, path: "/candidate/upload-cv" },
  { name: "Job Listings", icon: <Briefcase size={20} />, path: "/candidate/jobs" },
  { name: "Notifications", icon: <Bell size={20} />, path: "/candidate/notifications" },
  { name: "Settings", icon: <Settings size={20} />, path: "/candidate/settings" },
  { name: "Logout", icon: <LogOut size={20} />, path: "/logout" },
];

const CandidateSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`h-screen bg-[#4f46e5] text-white shadow-md transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <h1
          className={`text-lg font-semibold tracking-wide transition-all ${
            collapsed ? "hidden" : "block"
          }`}
        >
          Candidate
        </h1>
        <button onClick={() => setCollapsed(!collapsed)} className="text-white">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-4 flex flex-col gap-3 px-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                ${isActive ? "bg-white text-[#4f46e5]" : "hover:bg-white hover:text-[#4f46e5] text-white"}
              `}
            >
              {item.icon}
              {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default CandidateSidebar;
