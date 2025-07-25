import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { Users, Briefcase, CheckCircle, Clock, X, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../components/hr/Sidebar';

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c084fc', '#f472b6'];

const ALL_APPLICATIONS = [
  { name: 'Jan', date: new Date(2025, 0, 15), applications: 400 },
  { name: 'Feb', date: new Date(2025, 1, 10), applications: 300 },
  { name: 'Mar', date: new Date(2025, 2, 6), applications: 500 },
  { name: 'Apr', date: new Date(2025, 3, 12), applications: 200 },
  { name: 'May', date: new Date(2025, 4, 18), applications: 350 },
  { name: 'Jun', date: new Date(2025, 5, 24), applications: 420 },
  { name: 'Jul', date: new Date(2025, 6, 2), applications: 480 },
];

const ALL_DEPARTMENTS = [
  { name: 'Engineering', value: 300 },
  { name: 'Marketing', value: 100 },
  { name: 'Sales', value: 80 },
  { name: 'Customer Support', value: 70 },
  { name: 'HR', value: 50 },
];

const DUMMY_VACANCIES = [
  { jobTitle: 'Software Developer', type: 'Full-time', salary: '$70K - $90K', applicants: 120 },
  { jobTitle: 'Graphic Designer', type: 'Part-time', salary: '$40K - $55K', applicants: 75 },
  { jobTitle: 'HR Coordinator', type: 'Contract', salary: '$50K - $60K', applicants: 60 },
];



export default function Dashboard() {

  const [showLargeGraph, setShowLargeGraph] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showDatePicker, setShowDatePicker] = useState(false);

  const setDateRangePreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setDateRange([start, end]);
  };

  const clearDateFilter = () => {
    setDateRange([null, null]);
  };

  // Filter and sort applications based on chosen date range
  const filteredApplications = useMemo(() => {
    let result = [...ALL_APPLICATIONS];
    
    // Filter by date range if dates are selected
    if (startDate && endDate) {
      result = result.filter(d => {
        const date = new Date(d.date);
        return date >= startDate && date <= endDate;
      });
    }
    
    // Ensure the data is sorted by date
    return result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [startDate, endDate]);

  // Departments (static for now)
  const filteredDepartments = ALL_DEPARTMENTS;

  return (
    <>
      <div className="min-h-screen flex bg-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-wrap gap-4 mb-6">
            <StatCard title="Applications" count="1,534" change="+24.8%" />
            <StatCard title="Shortlisted" count="869" change="+18.2%" />
            <StatCard title="Hired" count="236" change="+12.4%" />
            <StatCard title="Rejected" count="429" change="-5.2%" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardChartCard
              title="Applications Over Time"
              onClick={() => { setSelectedChart('bar'); setShowLargeGraph(true); }}
              content={
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={filteredApplications}>
                    <XAxis
                      dataKey="date"
                      tickFormatter={dateValue => {
                        const dateObj = new Date(dateValue);
                        return dateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={dateValue => {
                        const dateObj = new Date(dateValue);
                        return dateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
                      }}
                    />
                    <Bar dataKey="applications" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              }
            />

            <DashboardChartCard
              title="Applications by Department"
              onClick={() => { setSelectedChart('pie'); setShowLargeGraph(true); }}
              content={
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={filteredDepartments}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                    >
                      {filteredDepartments.map((entry, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              }
            />

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

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <JobList />
            <TaskList />
            <ScheduleCard />
          </div>
        </main>
      </div>

      {/* Modal for Enlarged Charts and Date Filter */}
      {showLargeGraph && (
        <Modal onClose={() => setShowLargeGraph(false)}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-indigo-700">
              {selectedChart === 'bar' ? 'Detailed Applications Graph' : 'Applications by Department'}
            </h2>
            <div className="relative">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  <Calendar size={16} />
                  {startDate && endDate ? (
                    <span>
                      {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                    </span>
                  ) : (
                    <span>Select Date Range</span>
                  )}
                  {(startDate || endDate) && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        clearDateFilter();
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </button>
              </div>

              {showDatePicker && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 w-80">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                      onClick={() => setDateRangePreset(0)}
                      className="text-left p-2 text-sm hover:bg-indigo-50 rounded-md transition-colors"
                    >Today</button>
                    <button
                      onClick={() => setDateRangePreset(6)}
                      className="text-left p-2 text-sm hover:bg-indigo-50 rounded-md transition-colors"
                    >Last 7 Days</button>
                    <button
                      onClick={() => setDateRangePreset(29)}
                      className="text-left p-2 text-sm hover:bg-indigo-50 rounded-md transition-colors"
                    >Last 30 Days</button>
                    <button
                      onClick={() => setDateRangePreset(89)}
                      className="text-left p-2 text-sm hover:bg-indigo-50 rounded-md transition-colors"
                    >Last 90 Days</button>
                    <button
                      onClick={() => {
                        const start = new Date();
                        start.setDate(1);
                        setDateRange([start, new Date()]);
                      }}
                      className="text-left p-2 text-sm hover:bg-indigo-50 rounded-md transition-colors"
                    >This Month</button>
                    <button
                      onClick={() => {
                        const start = new Date();
                        start.setMonth(start.getMonth() - 1);
                        start.setDate(1);
                        const end = new Date();
                        end.setDate(0);
                        setDateRange([start, end]);
                      }}
                      className="text-left p-2 text-sm hover:bg-indigo-50 rounded-md transition-colors"
                    >Last Month</button>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Custom Range</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DatePicker
                        selectsRange
                        startDate={startDate}
                        endDate={endDate}
                        onChange={update => {
                          setDateRange(update);
                          if (update[0] && update[1]) {
                            setShowDatePicker(false);
                          }
                        }}
                        isClearable={false}
                        inline
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {selectedChart === 'bar' ? (
              <BarChart 
                data={filteredApplications}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value, name, props) => [
                    value,
                    'Applications',
                    { name: 'Month', value: props.payload.name }
                  ]}
                />
                <Bar 
                  dataKey="applications" 
                  fill="#6366f1" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={filteredDepartments}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {filteredDepartments.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </Modal>
      )}
    </>
  );
}

// Auxiliary Components

function DashboardChartCard({ title, content, onClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-indigo-700 mb-2">{title}</h3>
      {content}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-4xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >✕</button>
        {children}
      </div>
    </div>
  );
}

function StatCard({ title, count, change }) {
  return (
    <div className="flex-1 bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-purple-700">{count}</p>
        <span className={`text-sm ${change.startsWith('-') ? 'text-red-500' : 'text-green-600'}`}>{change}</span>
      </div>
    </div>
  );
}

function JobList() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200">
      <h4 className="text-md font-semibold text-indigo-700 mb-3">Current Vacancies</h4>
      {DUMMY_VACANCIES.map((job, i) => (
        <div key={i} className="mb-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
          <h5 className="font-medium text-purple-800">{job.jobTitle}</h5>
          <p className="text-sm text-gray-600">{job.type} • {job.salary}</p>
          <p className="text-xs text-gray-500">{job.applicants} Applicants</p>
        </div>
      ))}
    </div>
  );
}

function TaskList() {
  const tasks = ['Resume Screening', 'Schedule Interviews', 'Candidate Communication', 'Offer Management'];
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200">
      <h4 className="text-md font-semibold text-indigo-700 mb-3">Tasks</h4>
      {tasks.map((task, i) => (
        <div key={i} className="flex items-center gap-2 mb-2 text-sm">
          <CheckCircle className="text-green-500 w-4 h-4" />
          {task}
        </div>
      ))}
    </div>
  );
}

function ScheduleCard() {
  const events = [
    'Marketing Strategy Presentation',
    'HR Policy Update Session',
    'Customer Feedback Review',
    'Financial Report Session',
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform duration-200">
      <h4 className="text-md font-semibold text-indigo-700 mb-3">Schedule</h4>
      {events.map((event, i) => (
        <div key={i} className="flex items-center gap-2 mb-2 text-sm">
          <Clock className="text-[#4f46e5] w-4 h-4" />
          {event}
        </div>
      ))}
    </div>
  );
}
