import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { Users, Briefcase, CheckCircle, Clock, X, Calendar, Filter, TrendingUp } from 'lucide-react';

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

export default function Dashboard() {
  const [showLargeGraph, setShowLargeGraph] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('all');

  const setDateRangePreset = (days, presetName) => {
    if (days === null) {
      setDateRange([null, null]);
      setSelectedPreset('all');
      return;
    }
    
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setDateRange([start, end]);
    setSelectedPreset(presetName);
    setShowDatePicker(false);
  };

  const setCustomDateRange = (start, end, presetName) => {
    setDateRange([start, end]);
    setSelectedPreset(presetName);
    setShowDatePicker(false);
  };

  const clearDateFilter = () => {
    setDateRange([null, null]);
    setSelectedPreset('all');
  };

  // Filter applications based on chosen date range
  const filteredApplications = useMemo(() => {
    let result = [...ALL_APPLICATIONS];
    
    if (startDate && endDate) {
      result = result.filter(d => {
        const date = new Date(d.date);
        return date >= startDate && date <= endDate;
      });
    }
    
    return result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [startDate, endDate]);

  // Calculate filtered departments based on date range (simulated)
  const filteredDepartments = useMemo(() => {
    if (!startDate || !endDate) return ALL_DEPARTMENTS;
    
    // Simulate filtering - in real app, this would be calculated based on actual data
    const filterFactor = filteredApplications.length / ALL_APPLICATIONS.length;
    return ALL_DEPARTMENTS.map(dept => ({
      ...dept,
      value: Math.round(dept.value * filterFactor)
    }));
  }, [filteredApplications, startDate, endDate]);

  const getPresetLabel = () => {
    switch (selectedPreset) {
      case 'today': return 'Today';
      case 'week': return 'Last 7 Days';
      case 'month': return 'Last 30 Days';
      case 'quarter': return 'Last 90 Days';
      case 'thisMonth': return 'This Month';
      case 'lastMonth': return 'Last Month';
      case 'custom': return `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`;
      default: return 'All Time';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Universal Date Filter */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Dashboard</h1>
              <p className="text-gray-600">Monitor recruitment metrics and analytics</p>
            </div>
            
            {/* Universal Date Filter */}
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>{getPresetLabel()}</span>
                {(startDate || endDate) && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      clearDateFilter();
                    }}
                    className="text-blue-200 hover:text-white ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </button>

              {showDatePicker && (
                <div className="absolute right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50 w-80">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Filter by Date</h3>
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {[
                      { key: 'all', label: 'All Time', action: () => setDateRangePreset(null, 'all') },
                      { key: 'today', label: 'Today', action: () => setDateRangePreset(0, 'today') },
                      { key: 'week', label: 'Last 7 Days', action: () => setDateRangePreset(6, 'week') },
                      { key: 'month', label: 'Last 30 Days', action: () => setDateRangePreset(29, 'month') },
                      { key: 'quarter', label: 'Last 90 Days', action: () => setDateRangePreset(89, 'quarter') },
                      { 
                        key: 'thisMonth', 
                        label: 'This Month', 
                        action: () => {
                          const start = new Date();
                          start.setDate(1);
                          setCustomDateRange(start, new Date(), 'thisMonth');
                        }
                      }
                    ].map(preset => (
                      <button
                        key={preset.key}
                        onClick={preset.action}
                        className={`text-left p-3 text-sm rounded-lg transition-all duration-200 ${
                          selectedPreset === preset.key
                            ? 'bg-blue-100 text-blue-700 font-medium border-2 border-blue-200'
                            : 'hover:bg-gray-50 text-gray-700 border-2 border-transparent'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Custom Range</label>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                        <input
                          type="date"
                          value={startDate ? startDate.toISOString().split('T')[0] : ''}
                          onChange={e => {
                            const newStart = e.target.value ? new Date(e.target.value) : null;
                            setDateRange([newStart, endDate]);
                            setSelectedPreset('custom');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">End Date</label>
                        <input
                          type="date"
                          value={endDate ? endDate.toISOString().split('T')[0] : ''}
                          onChange={e => {
                            const newEnd = e.target.value ? new Date(e.target.value) : null;
                            setDateRange([startDate, newEnd]);
                            setSelectedPreset('custom');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Applications" count="1,534" change="+24.8%" icon={Users} color="blue" />
          <StatCard title="Shortlisted" count="869" change="+18.2%" icon={CheckCircle} color="green" />
          <StatCard title="Hired" count="236" change="+12.4%" icon={Briefcase} color="purple" />
          <StatCard title="Pending" count="429" change="-5.2%" icon={Clock} color="orange" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <DashboardChartCard
            title="Applications Over Time"
            subtitle={`${filteredApplications.length} data points`}
            onClick={() => { setSelectedChart('bar'); setShowLargeGraph(true); }}
            content={
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={filteredApplications} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="applications" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            }
          />

          <DashboardChartCard
            title="Applications by Department"
            subtitle={`${filteredDepartments.reduce((sum, dept) => sum + dept.value, 0)} total`}
            onClick={() => { setSelectedChart('pie'); setShowLargeGraph(true); }}
            content={
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={filteredDepartments}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                  >
                    {filteredDepartments.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            }
          />

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Applicant Sources</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="mb-4">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                1,000
              </p>
              <p className="text-sm text-gray-500">Total sources</p>
            </div>
            <div className="space-y-3">
              {[
                { source: 'Social Media', count: 350, color: 'bg-blue-500' },
                { source: 'Job Boards', count: 300, color: 'bg-green-500' },
                { source: 'Referrals', count: 200, color: 'bg-purple-500' },
                { source: 'Agencies', count: 150, color: 'bg-orange-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-700">{item.source}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job List */}
        <JobList />

        {/* Modal for Enlarged Charts */}
        {showLargeGraph && (
          <Modal onClose={() => setShowLargeGraph(false)}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedChart === 'bar' ? 'Applications Over Time' : 'Applications by Department'}
                </h2>
                <p className="text-gray-600 mt-1">
                  Filtered by: {getPresetLabel()}
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              {selectedChart === 'bar' ? (
                <BarChart 
                  data={filteredApplications}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#6b7280', fontSize: 14 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 14 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="applications" 
                    fill="url(#modalBarGradient)" 
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                  <defs>
                    <linearGradient id="modalBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={filteredDepartments}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={3}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {filteredDepartments.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              )}
            </ResponsiveContainer>
          </Modal>
        )}
      </div>
    </div>
  );
}

// Enhanced Components

function DashboardChartCard({ title, subtitle, content, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="text-blue-500 group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>
      </div>
      {content}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
}

function StatCard({ title, count, change, icon: Icon, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} text-white shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          change.startsWith('-') 
            ? 'text-red-600 bg-red-50' 
            : 'text-green-600 bg-green-50'
        }`}>
          {change}
        </span>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
}

function JobList() {
  const jobs = [
    { title: 'Frontend Developer', positions: 2, applications: 45 },
    { title: 'UX Designer', positions: 1, applications: 32 },
    { title: 'Project Manager', positions: 3, applications: 28 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Open Positions</h3>
        <span className="text-sm text-gray-500">{jobs.length} active roles</span>
      </div>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">{job.title}</h4>
              <p className="text-sm text-gray-500">{job.positions} position{job.positions > 1 ? 's' : ''} • {job.applications} applications</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}