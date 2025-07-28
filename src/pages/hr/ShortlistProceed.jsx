import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import {
  Briefcase,
  Users,
  LayoutDashboard,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const jdMonthData = [
  { name: 'Jan', JD_Month: 12 },
  { name: 'Feb', JD_Month: 18 },
  { name: 'Mar', JD_Month: 9 },
  { name: 'Apr', JD_Month: 15 },
  { name: 'May', JD_Month: 22 },
];

const jdHRData = [
  { name: 'HR A', JD_HR: 10 },
  { name: 'HR B', JD_HR: 20 },
  { name: 'HR C', JD_HR: 30 },
];

const jdAppliedData = [
  { name: 'Frontend', JD_Applications: 120 },
  { name: 'Backend', JD_Applications: 85 },
  { name: 'DevOps', JD_Applications: 140 },
  { name: 'UI/UX', JD_Applications: 90 },
  { name: 'QA', JD_Applications: 100 },
];

const COLORS = ['#4f46e5', '#6366f1', '#a5b4fc'];

const Sidebar = ({ collapsed, toggleSidebar }) => (
  <aside
    className={`${
      collapsed ? 'w-20' : 'w-64'
    } bg-[#4f46e5] text-white min-h-screen p-4 transition-all duration-300 shadow-lg`}
  >
    <div className="flex justify-between items-center mb-6">
      {!collapsed && <h2 className="text-xl font-bold">Company Admin</h2>}
      <button onClick={toggleSidebar} className="text-white">
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
    <nav className="space-y-6 mt-8">
      {[
        { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Job Descriptions', icon: <FileText size={20} /> },
        { name: 'HR Team', icon: <Users size={20} /> },
        { name: 'Applications', icon: <Briefcase size={20} /> },
      ].map((item) => (
        <a
          key={item.name}
          href="#"
          className="flex items-center gap-2 text-sm hover:text-gray-200"
        >
          {item.icon}
          {!collapsed && item.name}
        </a>
      ))}
    </nav>
  </aside>
);

const JDBarChart = ({ title, data, dataKey, barColors }) => (
  <div className="bg-white rounded-xl p-4 shadow-md">
    <h3 className="text-lg font-semibold text-[#4f46e5] mb-2">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const CompanyAdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-[#4f46e5] mb-4">Dashboard Overview</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <JDBarChart
            title="JD vs Month"
            data={jdMonthData}
            dataKey="JD_Month"
            barColors={['#4f46e5', '#60a5fa', '#6366f1', '#7c3aed']}
          />
          <JDBarChart
            title="JD vs HR"
            data={jdHRData}
            dataKey="JD_HR"
            barColors={['#4f46e5', '#818cf8', '#a5b4fc']}
          />
          <JDBarChart
            title="JD vs Total Applied"
            data={jdAppliedData}
            dataKey="JD_Applications"
            barColors={['#4f46e5', '#818cf8', '#93c5fd', '#3b82f6', '#2563eb']}
          />
        </div>
      </main>
    </div>
  );
};

export default CompanyAdminDashboard;
