import React, { useState } from 'react';
import Header from '../../pages/common/Header.jsx';
import Footer from '../../pages/common/Footer.jsx';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const JDData = [
  { month: 'Jan', jd: 10 },
  { month: 'Feb', jd: 15 },
  { month: 'Mar', jd: 20 },
  { month: 'Apr', jd: 18 },
  { month: 'May', jd: 25 },
  { month: 'Jun', jd: 30 },
];

const AppPerJD = [
  { jd: 'JD 1', applications: 120 },
  { jd: 'JD 2', applications: 85 },
  { jd: 'JD 3', applications: 140 },
  { jd: 'JD 4', applications: 100 },
];

const HRvsJD = [
  { name: 'HR 1', jd: 4 },
  { name: 'HR 2', jd: 7 },
  { name: 'HR 3', jd: 6 },
  { name: 'HR 4', jd: 9 },
];

const COLORS = ['#4f46e5', '#ec4899', '#10b981', '#f59e0b'];

const RMSDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChartClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const renderChart = (type) => {
    switch (type) {
      case 'JD per Month':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={JDData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="jd" stroke="#4f46e5" fill="#c7d2fe" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'Applications per JD':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={AppPerJD} dataKey="applications" nameKey="jd" outerRadius={150} label>
                {AppPerJD.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'HR vs JD':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={HRvsJD}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="jd" stroke="#ec4899" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #eef2ff 60%, #f0f4ff 100%)',
        backgroundColor: '#eef2ff',
      }}
    >
      <h1 className="text-4xl font-bold text-[#4f46e5] mb-10 text-center drop-shadow-sm">Company Admin Dashboard</h1>

      <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
        <label className="font-medium text-[#4f46e5]">📅 Select Month:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="border border-[#c7d2fe] p-2 rounded-md shadow-sm focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* JD per Month Area Chart */}
        <div
          className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-6 border-l-[6px] border-[#4f46e5] hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
          onClick={() => handleChartClick('JD per Month')}
        >
          <h2 className="text-xl font-semibold text-[#4f46e5] mb-4">📈 JD per Month</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={JDData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="jd" stroke="#4f46e5" fill="#c7d2fe" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-700 mt-3">June had the highest JD postings (30). Consistent growth since April.</p>
        </div>

        {/* Applications per JD  */}
      // Inside your HRDashboard component (in JSX)
<div className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform duration-300">
  <h3 className="text-lg font-semibold text-[#4f46e5] mb-2">Applications by Software Skill</h3>
  <ResponsiveContainer width="100%" height={250}>
    <RePieChart>
      <Pie
        data={[
          { name: 'React', value: 300 },
          { name: 'Node.js', value: 240 },
          { name: 'Python', value: 180 },
          { name: 'Java', value: 140 },
          { name: 'UI/UX', value: 120 },
          { name: 'SQL', value: 90 },
        ]}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={90}
        label
        isAnimationActive={true}
      >
        {[
          '#6366f1', // Indigo
          '#3b82f6', // Blue
          '#10b981', // Emerald
          '#f59e0b', // Amber
          '#ec4899', // Pink
          '#8b5cf6', // Violet
        ].map((color, index) => (
          <Cell key={`cell-${index}`} fill={color} />
        ))}
      </Pie>
    </RePieChart>
  </ResponsiveContainer>
</div>


        {/* HR vs JD Line Chart */}
        <div
          className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-6 border-l-[6px] border-[#ec4899] hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
          onClick={() => handleChartClick('HR vs JD')}
        >
          <h2 className="text-xl font-semibold text-[#ec4899] mb-4">👥 HR vs JD</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={HRvsJD}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="jd" stroke="#ec4899" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-700 mt-3">HR 4 created the most JDs (9).</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[95%] max-w-5xl relative shadow-2xl">
            <button
              className="absolute top-3 right-5 text-[#4f46e5] text-xl font-bold"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="text-3xl font-semibold text-[#4f46e5] mb-5">{modalContent}</h3>
            {renderChart(modalContent)}
          </div>
        </div>
      )}
    </div>
  );
};

export default RMSDashboard;
