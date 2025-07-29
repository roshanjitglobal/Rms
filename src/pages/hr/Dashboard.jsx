import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import {
  Users, Briefcase, CheckCircle, Clock, ChevronLeft, ChevronRight,
  LayoutDashboard, ClipboardList, FileCheck, UserPlus, CalendarDays
} from 'lucide-react';

import '../../index.css';

const dummyData = [
  { jobTitle: 'Software Developer', type: 'Full-time', salary: '$70K - $90K', applicants: 120 },
  { jobTitle: 'Graphic Designer', type: 'Part-time', salary: '$40K - $55K', applicants: 75 },
  { jobTitle: 'HR Coordinator', type: 'Contract', salary: '$50K - $60K', applicants: 60 },
];

const applicationData = [
  { name: 'Jan', applications: 400 },
  { name: 'Feb', applications: 300 },
  { name: 'Mar', applications: 500 },
  { name: 'Apr', applications: 200 },
  { name: 'May', applications: 350 },
  { name: 'Jun', applications: 420 },
  { name: 'Jul', applications: 480 },
];

const departmentData = [
  { name: 'Engineering', value: 300 },
  { name: 'Marketing', value: 100 },
  { name: 'Sales', value: 80 },
  { name: 'Customer Support', value: 70 },
  { name: 'HR', value: 50 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c084fc', '#f472b6'];

const HRDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showLargeGraph, setShowLargeGraph] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Jobs', icon: <Briefcase size={20} /> },
    { label: 'Candidates', icon: <Users size={20} /> },
    { label: 'Recruitment Board', icon: <ClipboardList size={20} /> },
    { label: 'Offers', icon: <FileCheck size={20} /> },
    { label: 'Onboarding', icon: <UserPlus size={20} /> },
  ];

  return (
    <>
      <div className="min-h-screen flex bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        {/* Sidebar */}
        <aside className={`transition-all duration-300 bg-[#4f46e5] text-white p-4 ${collapsed ? 'w-20' : 'w-64'} space-y-6 relative`}>
          <button
            className="absolute top-4 right-[-12px] bg-white text-[#4f46e5] rounded-full shadow-md p-1"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          <h2 className={`text-2xl font-bold mb-6 ${collapsed ? 'hidden' : 'block'}`}>RMS Panel</h2>

          <nav className="space-y-4">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-indigo-600 transition-transform duration-200 hover:scale-105 ${collapsed ? 'justify-center' : ''}`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stat Cards */}
          <div className="flex flex-wrap gap-4 mb-6">
            <StatCard title="Applications" count="1,534" change="+24.8%" />
            <StatCard title="Shortlisted" count="869" change="+18.2%" />
            <StatCard title="Hired" count="236" change="+12.4%" />
            <StatCard title="Rejected" count="429" change="-5.2%" />
          </div>

          {/* Charts + Resources */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200 cursor-pointer"
              onClick={() => setShowLargeGraph(true)}
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">Applications Over Time</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={applicationData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200">
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">Applications by Department</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie
                    data={departmentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </RePieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200">
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">Applicant Sources</h3>
              <p className="text-3xl font-bold text-purple-600">1,000</p>
              <ul className="text-sm mt-2 space-y-1 text-gray-700">
                <li>• 350 from Social Media</li>
                <li>• 200 from Referral</li>
                <li>• 300 from Job Boards</li>
                <li>• 150 from Agencies</li>
              </ul>
            </div>
          </div>

          {/* Cards Below */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <JobList />
            <TaskList />
            <ScheduleCard />
          </div>
        </main>
      </div>

      {/* Graph Modal */}
      {showLargeGraph && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-4xl p-6 relative">
            <button onClick={() => setShowLargeGraph(false)} className="absolute top-2 right-4 text-gray-600 hover:text-red-500 text-xl font-bold">✕</button>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-indigo-700">Detailed Applications Graph</h2>
              <button className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md hover:bg-indigo-200 transition">
                <CalendarDays size={16} />
                <span>Select Date</span>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#6366f1" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

const StatCard = ({ title, count, change }) => (
  <div className="flex-1 bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <div className="flex justify-between items-center">
      <p className="text-2xl font-bold text-purple-700">{count}</p>
      <span className={`text-sm ${change.startsWith('-') ? 'text-red-500' : 'text-green-600'}`}>{change}</span>
    </div>
  </div>
);

const JobList = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200">
    <h4 className="text-md font-semibold text-indigo-700 mb-3">Current Vacancies</h4>
    {dummyData.map((job, i) => (
      <div key={i} className="mb-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
        <h5 className="font-medium text-purple-800">{job.jobTitle}</h5>
        <p className="text-sm text-gray-600">{job.type} • {job.salary}</p>
        <p className="text-xs text-gray-500">{job.applicants} Applicants</p>
      </div>
    ))}
  </div>
);

const TaskList = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200">
    <h4 className="text-md font-semibold text-indigo-700 mb-3">Tasks</h4>
    {['Resume Screening', 'Schedule Interviews', 'Candidate Communication', 'Offer Management'].map((task, i) => (
      <div key={i} className="flex items-center gap-2 mb-2 text-sm">
        <CheckCircle className="text-green-500 w-4 h-4" />
        {task}
      </div>
    ))}
  </div>
);

const ScheduleCard = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200">
    <h4 className="text-md font-semibold text-indigo-700 mb-3">Schedule</h4>
    {[
      'Marketing Strategy Presentation',
      'HR Policy Update Session',
      'Customer Feedback Review',
      'Financial Report Session',
    ].map((event, i) => (
      <div key={i} className="flex items-center gap-2 mb-2 text-sm">
        <Clock className="text-[#4f46e5] w-4 h-4" />
        {event}
      </div>
    ))}
  </div>
);

export default HRDashboard;
