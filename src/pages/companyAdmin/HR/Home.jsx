import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Users as UsersIcon, FileText as FileTextIcon, Bell, User } from 'react-feather';
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
  const location = useLocation();

  return (
    <div className="flex-1 overflow-auto transition-all duration-300 ease-in-out">
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">HR Analytics Dashboard</h1>
        </div>
        
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};

export default CompanyAdminDashboard;
