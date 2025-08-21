import React, { useState } from 'react';
import '../../index.css';
import bgImg from '../../assets/5138237.jpg';
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
import { i } from 'framer-motion/client';

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

const COLORS = ['#00bcd4', '#8bc34a', '#ff9800', '#e91e63'];

const Dashboard = () => {
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

  return (
    <div
      className="min-h-screen p-6 flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #d6e4ff 60%, #e6f0ff 100%)',
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#e6e6fa',
      }}
    >
      <h1 className="text-4xl font-bold text-[#4f46e5] mb-8 text-center">Company Admin Dashboard</h1>

      <div className="flex justify-end mb-6">
        <label className="font-medium text-[#4f46e5] mr-3 self-center">Select Month:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="border p-2 rounded-md shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* JD per Month Area Chart */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-5 border-b-4 border-[#00bcd4] hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => handleChartClick('JD per Month')}
        >
          <h2 className="text-2xl font-bold text-[#00bcd4] mb-3">Job Descriptions per Month</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={JDData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="jd" stroke="#00bcd4" fill="#b2ebf2" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-700 mt-4">📈 June had the highest JD postings (30). Consistent growth since April.</p>
        </div>

        {/* Applications per JD Pie Chart */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-5 border-b-4 border-[#8bc34a] hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => handleChartClick('Applications per JD')}
        >
          <h2 className="text-2xl font-bold text-[#8bc34a] mb-3">Applications Received per JD</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={AppPerJD}
                dataKey="applications"
                nameKey="jd"
                outerRadius={90}
                label
              >
                {AppPerJD.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-700 mt-4">📊 JD 3 saw the most applications (140), JD 2 the least (85).</p>
        </div>

        {/* HR vs JD Line Chart */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-5 border-b-4 border-[#e91e63] hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => handleChartClick('HR vs JD')}
        >
          <h2 className="text-2xl font-bold text-[#e91e63] mb-3">HR vs Job Descriptions</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={HRvsJD}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="jd" stroke="#e91e63" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-700 mt-4">👥 HR 4 created the most JDs (9), followed by HR 2 and HR 3.</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[95%] max-w-5xl relative">
            <button
              className="absolute top-3 right-5 text-[#4f46e5] text-xl font-bold"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="text-3xl font-semibold text-[#4f46e5] mb-5">{modalContent}</h3>
            <p className="text-base text-gray-700">Enlarged view of "{modalContent}" will include dynamic drill-down soon.</p>
          </div>
        </div>
      )}
    </div>
  );
};


export default Dashboard
