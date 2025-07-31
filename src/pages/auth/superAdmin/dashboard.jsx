import React, { useState } from "react";
import {
  Users,
  Building2,
  UserCheck,
  MessageCircle,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SideNavBar from "./Sidenav";

const SuperAdminHome = () => {
  const [filter, setFilter] = useState("Monthly");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userCounts = [
    { label: "Companies", count: 18, icon: Building2, color: "bg-blue-100", iconColor: "text-blue-600" },
    { label: "Recruiters", count: 45, icon: UserCheck, color: "bg-green-100", iconColor: "text-green-600" },
    { label: "Candidates", count: 230, icon: Users, color: "bg-purple-100", iconColor: "text-purple-600" },
    { label: "Feedback (Last Week)", count: 18, icon: MessageCircle, color: "bg-yellow-100", iconColor: "text-yellow-600" },
  ];

  const userTrendData = [
    { name: "Mon", users: 20 },
    { name: "Tue", users: 35 },
    { name: "Wed", users: 28 },
    { name: "Thu", users: 45 },
    { name: "Fri", users: 30 },
    { name: "Sat", users: 18 },
    { name: "Sun", users: 25 },
  ];

  const memberData = {
    Monthly: [
      { name: "Jul", Jobseekers: 130, Recruiters: 10 },
      { name: "Aug", Jobseekers: 125, Recruiters: 12 },
      { name: "Sep", Jobseekers: 120, Recruiters: 15 },
      { name: "Oct", Jobseekers: 370, Recruiters: 12 },
      { name: "Nov", Jobseekers: 720, Recruiters: 11 },
      { name: "Dec", Jobseekers: 70, Recruiters: 18 },
      { name: "Jan", Jobseekers: 60, Recruiters: 10 },
      { name: "Feb", Jobseekers: 260, Recruiters: 9 },
      { name: "Mar", Jobseekers: 60, Recruiters: 12 },
      { name: "Apr", Jobseekers: 230, Recruiters: 13 },
      { name: "May", Jobseekers: 20, Recruiters: 14 },
      { name: "Jun", Jobseekers: 10, Recruiters: 11 },
    ],
    Weekly: [
      { name: "Week 1", Jobseekers: 80, Recruiters: 4 },
      { name: "Week 2", Jobseekers: 120, Recruiters: 6 },
      { name: "Week 3", Jobseekers: 70, Recruiters: 5 },
      { name: "Week 4", Jobseekers: 100, Recruiters: 7 },
    ],
    Daily: [
      { name: "Mon", Jobseekers: 20, Recruiters: 1 },
      { name: "Tue", Jobseekers: 18, Recruiters: 2 },
      { name: "Wed", Jobseekers: 24, Recruiters: 1 },
      { name: "Thu", Jobseekers: 30, Recruiters: 3 },
      { name: "Fri", Jobseekers: 28, Recruiters: 2 },
      { name: "Sat", Jobseekers: 10, Recruiters: 1 },
      { name: "Sun", Jobseekers: 12, Recruiters: 1 },
    ],
  };

  const recentData = {
    candidates: [
      { name: "John Doe", email: "john@example.com", joined: "2025-07-22" },
      { name: "Jane Smith", email: "jane@example.com", joined: "2025-07-23" },
    ],
    recruiters: [
      { name: "Mike Johnson", email: "mike@example.com", joined: "2025-07-21" },
      { name: "Emily Davis", email: "emily@example.com", joined: "2025-07-23" },
    ],
    jobs: [
      { title: "Frontend Developer", company: "TechSoft", posted: "2025-07-22" },
      { title: "Data Analyst", company: "FinCorp", posted: "2025-07-23" },
    ],
    feedbacks: [
      { name: "Rahul", message: "Great platform!", date: "2025-07-23" },
      { name: "Anjali", message: "Easy to navigate.", date: "2025-07-24" },
    ],
  };

  const renderTable = (title, headers, rows) => (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h3 className="text-md font-semibold mb-3">{title}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600 bg-gray-100 font-medium border-b">
            {headers.map((h, idx) => (
              <th key={idx} className="py-2 px-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b text-gray-700">
              {Object.values(row).map((val, idy) => (
                <td key={idy} className="py-2 px-2">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow h-16 flex-shrink-0">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Full height column */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out h-full flex flex-col border-r border-gray-200`}>
          <SideNavBar userRole="superadmin" />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold mb-6">Super Admin Dashboard</h2>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {userCounts.map(({ label, count, icon: Icon, color, iconColor }) => (
              <div key={label} className="flex items-center p-4 rounded-xl bg-white shadow">
                <div className={`p-3 rounded-full ${color} ${iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm text-gray-500">{label}</h4>
                  <p className="text-xl font-semibold">{count}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5 text-indigo-600" />
                  Weekly User Trend
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5 text-indigo-600" />
                  Members Overview
                </h3>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border text-sm rounded px-2 py-1"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Daily">Daily</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={memberData[filter]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Jobseekers" stroke="#6366f1" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="Recruiters" stroke="#a3a3a3" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderTable("Recent Candidates", ["Name", "Email", "Joined"], recentData.candidates)}
            {renderTable("Recent Recruiters", ["Name", "Email", "Joined"], recentData.recruiters)}
            {renderTable("Recent Job Openings", ["Title", "Company", "Posted"], recentData.jobs)}
            {renderTable("Recent Feedbacks", ["Name", "Message", "Date"], recentData.feedbacks)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminHome;