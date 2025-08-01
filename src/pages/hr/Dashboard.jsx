import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { Users, Briefcase, CheckCircle, Clock, X, Calendar, Filter, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { createPortal } from 'react-dom';

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c084fc', '#f472b6'];

// Extended to 12 months data
const ALL_APPLICATIONS = [
  { name: 'Jan', date: new Date(2025, 0, 15), applications: 400 },
  { name: 'Feb', date: new Date(2025, 1, 10), applications: 300 },
  { name: 'Mar', date: new Date(2025, 2, 6), applications: 500 },
  { name: 'Apr', date: new Date(2025, 3, 12), applications: 200 },
  { name: 'May', date: new Date(2025, 4, 18), applications: 350 },
  { name: 'Jun', date: new Date(2025, 5, 24), applications: 420 },
  { name: 'Jul', date: new Date(2025, 6, 2), applications: 480 },
  { name: 'Aug', date: new Date(2025, 7, 8), applications: 380 },
  { name: 'Sep', date: new Date(2025, 8, 14), applications: 450 },
  { name: 'Oct', date: new Date(2025, 9, 20), applications: 520 },
  { name: 'Nov', date: new Date(2025, 10, 26), applications: 390 },
  { name: 'Dec', date: new Date(2025, 11, 5), applications: 460 },
];

const ALL_DEPARTMENTS = [
  { name: 'Engineering', value: 300 },
  { name: 'Marketing', value: 100 },
  { name: 'Sales', value: 80 },
  { name: 'Customer Support', value: 70 },
  { name: 'HR', value: 50 },
];

// Application sources with matching totals
const APPLICATION_SOURCES = [
  { name: 'LinkedIn', value: 461, percentage: 30 },
  { name: 'Indeed', value: 384, percentage: 25 },
  { name: 'Company Website', value: 307, percentage: 20 },
  { name: 'Referrals', value: 230, percentage: 15 },
  { name: 'Job Boards', value: 153, percentage: 10 },
];

// Open positions with department details
const OPEN_POSITIONS = [
  { 
    department: 'Engineering', 
    title: 'Frontend Developer', 
    positions: 3, 
    applications: 45,
    roles: ['React Developer', 'Vue.js Developer', 'Angular Developer'],
    priority: 'High'
  },
  { 
    department: 'Design', 
    title: 'UX Designer', 
    positions: 2, 
    applications: 32,
    roles: ['UI/UX Designer', 'Product Designer'],
    priority: 'Medium'
  },
  { 
    department: 'Marketing', 
    title: 'Digital Marketing Manager', 
    positions: 1, 
    applications: 28,
    roles: ['SEO Specialist', 'Content Marketing'],
    priority: 'High'
  },
  { 
    department: 'Sales', 
    title: 'Sales Executive', 
    positions: 4, 
    applications: 38,
    roles: ['Inside Sales', 'Account Executive', 'Sales Manager'],
    priority: 'Medium'
  },
  { 
    department: 'HR', 
    title: 'HR Generalist', 
    positions: 1, 
    applications: 15,
    roles: ['Recruiter', 'HR Assistant'],
    priority: 'Low'
  },
];

// Calendar Component
function DatePicker({ selectedDate, onDateSelect, placeholder }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentMonth.getMonth() && 
           today.getFullYear() === currentMonth.getFullYear();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentMonth.getMonth() && 
           selectedDate.getFullYear() === currentMonth.getFullYear();
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect(newDate);
    setIsOpen(false);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX
      });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-left bg-white hover:bg-gray-50 flex items-center justify-between"
      >
        <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
          {selectedDate ? selectedDate.toLocaleDateString() : placeholder}
        </span>
        <Calendar className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && createPortal(
        <div 
          className="fixed bg-white border border-gray-200 rounded-lg shadow-2xl p-3 w-64 z-[99999999]"
          style={{
            top: position.top,
            left: position.left
          }}
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="font-semibold text-sm">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-xs font-medium text-gray-500 text-center p-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="p-1"></div>
            ))}
            {days.map(day => (
              <button
                key={day}
                onClick={() => handleDateSelect(day)}
                className={`p-1 text-sm rounded hover:bg-indigo-50 transition-colors ${
                  isSelected(day)
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : isToday(day)
                    ? 'bg-indigo-100 text-indigo-600 font-medium'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Clear button */}
          {selectedDate && (
            <div className="mt-3 pt-2 border-t border-gray-200">
              <button
                onClick={() => {
                  onDateSelect(null);
                  setIsOpen(false);
                }}
                className="w-full text-sm text-gray-600 hover:text-gray-800 py-1"
              >
                Clear Date
              </button>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[300] p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-6xl p-8 relative max-h-[90vh] overflow-y-auto border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-3 hover:bg-gray-100 rounded-2xl transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
}

function StatCard({ title, count, icon: Icon, color }) {
  const colorClasses = {
    blue: { 
      bg: 'from-blue-500/20 to-blue-600/20', 
      text: 'text-blue-600', 
      bgLight: 'bg-blue-50/80',
      border: 'border-blue-200/50'
    },
    green: { 
      bg: 'from-green-500/20 to-green-600/20', 
      text: 'text-green-600', 
      bgLight: 'bg-green-50/80',
      border: 'border-green-200/50'
    },
    purple: { 
      bg: 'from-purple-500/20 to-purple-600/20', 
      text: 'text-purple-600', 
      bgLight: 'bg-purple-50/80',
      border: 'border-purple-200/50'
    },
    orange: { 
      bg: 'from-orange-500/20 to-orange-600/20', 
      text: 'text-orange-600', 
      bgLight: 'bg-orange-50/80',
      border: 'border-orange-200/50'
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border ${colorClasses[color].border} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${colorClasses[color].bg} ${colorClasses[color].bgLight}`}>
          <Icon className={`w-7 h-7 ${colorClasses[color].text}`} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [showLargeGraph, setShowLargeGraph] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('all');
  const [selectedMonths, setSelectedMonths] = useState(6);
  const [datePickerPosition, setDatePickerPosition] = useState({ top: 0, left: 0 });
  const datePickerButtonRef = useRef(null);

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

  const handleDatePickerToggle = () => {
    if (datePickerButtonRef.current) {
      const rect = datePickerButtonRef.current.getBoundingClientRect();
      setDatePickerPosition({
        top: rect.bottom + window.scrollY + 16,
        left: rect.right - 384 // 384px is the width of the dropdown (w-96)
      });
    }
    setShowDatePicker(!showDatePicker);
  };

  const clearDateFilter = () => {
    setDateRange([null, null]);
    setSelectedPreset('all');
  };

  const handleStartDateChange = (date) => {
    setDateRange([date, endDate]);
    setSelectedPreset('custom');
  };

  const handleEndDateChange = (date) => {
    setDateRange([startDate, date]);
    setSelectedPreset('custom');
  };

  // Close date picker on scroll and click outside
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      if (showDatePicker) {
        console.log('Scroll detected, closing date picker');
        // Clear any existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        // Set a small timeout to ensure the scroll event is complete
        scrollTimeout = setTimeout(() => {
          setShowDatePicker(false);
        }, 10);
      }
    };

    const handleClickOutside = (event) => {
      if (showDatePicker && datePickerButtonRef.current && !datePickerButtonRef.current.contains(event.target)) {
        // Check if click is outside the date picker dropdown
        const dropdown = document.querySelector('[data-date-picker-dropdown]');
        if (!dropdown || !dropdown.contains(event.target)) {
          setShowDatePicker(false);
        }
      }
    };

    // Add scroll listener to multiple elements to ensure we catch all scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('wheel', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('wheel', handleScroll, { passive: true });
    document.documentElement.addEventListener('scroll', handleScroll, { passive: true });
    document.documentElement.addEventListener('wheel', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('wheel', handleScroll);
      document.documentElement.removeEventListener('scroll', handleScroll);
      document.documentElement.removeEventListener('wheel', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  // Filter applications based on chosen date range and month selection
  const filteredApplications = useMemo(() => {
    let result = [...ALL_APPLICATIONS];
    
    // Apply month selection first
    result = result.slice(0, selectedMonths);
    
    if (startDate && endDate) {
      result = result.filter(d => {
        const date = new Date(d.date);
        return date >= startDate && date <= endDate;
      });
    }
    
    return result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [startDate, endDate, selectedMonths]);

  // Calculate totals
  const totalApplicationsFromSources = APPLICATION_SOURCES.reduce((sum, item) => sum + item.value, 0);
  const totalDepartmentApplications = ALL_DEPARTMENTS.reduce((sum, dept) => sum + dept.value, 0);
  const totalOpenPositions = OPEN_POSITIONS.reduce((sum, pos) => sum + pos.positions, 0);

  const getPresetLabel = () => {
    switch (selectedPreset) {
      case 'today': return 'Today';
      case 'week': return 'Last 7 Days';
      case 'month': return 'Last 30 Days';
      case 'quarter': return 'Last 90 Days';
      case 'thisMonth': return 'This Month';
      case 'lastMonth': return 'Last Month';
      case 'custom': return startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Custom Range';
      default: return 'All Time';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                HR Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Monitor recruitment metrics and team performance</p>
            </div>
            
            {/* Enhanced Date Filter */}
            <div className="relative z-[99999999]">
              <button
                ref={datePickerButtonRef}
                onClick={handleDatePickerToggle}
                className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700
                 hover:to-purple-700 text-white px-6 py-4
                  rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1
                   "
              >
                <Calendar className="w-5 h-5" />
                <span className="text-sm">{getPresetLabel()}</span>
                {(startDate || endDate) && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      clearDateFilter();
                    }}
                    className="text-indigo-200 hover:text-white ml-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </button>

                             {showDatePicker && createPortal(
                 <div 
                   data-date-picker-dropdown
                   className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-6 w-96 z-[99999999]"
                      style={{
                        top: datePickerPosition.top,
                        left: datePickerPosition.left
                      }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Filter by Date Range</h3>
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Quick Presets */}
                  <div className="grid grid-cols-2 gap-2 mb-6 ">
                    {[
                      { key: 'all', label: 'All Time', action: () => setDateRangePreset(null, 'all') },
                      { key: 'today', label: 'Today', action: () => setDateRangePreset(0, 'today') },
                      { key: 'week', label: 'Last 7 Days', action: () => setDateRangePreset(6, 'week') },
                      { key: 'month', label: 'Last 30 Days', action: () => setDateRangePreset(29, 'month') },
                    ].map(preset => (
                      <button
                        key={preset.key}
                        onClick={preset.action}
                        className={`text-left p-3 text-sm rounded-xl transition-all duration-200 ${
                          selectedPreset === preset.key
                            ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-medium border border-indigo-200'
                            : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Custom Date Range */}
                  <div className="space-y-4 ">
                    <h4 className="font-medium text-gray-900 text-sm">Custom Date Range</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <DatePicker
                        selectedDate={startDate}
                        onDateSelect={handleStartDateChange}
                        placeholder="Start Date"
                      />
                      <DatePicker
                        selectedDate={endDate}
                        onDateSelect={handleEndDateChange}
                        placeholder="End Date"
                      />
                    </div>
                    {startDate && endDate && (
                      <div className="text-sm text-gray-600 bg-indigo-50 p-3 rounded-lg">
                        Selected: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>,
                document.body
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Total Applications" count="1,534" icon={Users} color="blue" />
          <StatCard title="Shortlisted" count="869" icon={CheckCircle} color="green" />
          <StatCard title="Hired" count="236" icon={Briefcase} color="purple" />
          <StatCard title="Pending" count="429" icon={Clock} color="orange" />
        </div>

        {/* Enhanced Charts Grid - All Three in Same Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications Over Time */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Applications Timeline</h3>
                <p className="text-sm text-gray-500 mt-1">{filteredApplications.length} data points</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={selectedMonths}
                  onChange={(e) => setSelectedMonths(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white/80 hover:bg-white transition-colors"
                >
                  <option value={6}>Last 6 months</option>
                  <option value={12}>All 12 months</option>
                </select>
                <button
                  onClick={() => { setSelectedChart('line'); setShowLargeGraph(true); }}
                  className="text-indigo-500 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-xl transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredApplications} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#4f46e5' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

                     {/* Applications by Department - Enhanced Size */}
           <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-4">
             <div className="flex items-center justify-between mb-3">
               <div>
                 <h3 className="text-lg font-semibold text-gray-900">By Department</h3>
               </div>
               <button
                 onClick={() => { setSelectedChart('pie'); setShowLargeGraph(true); }}
                 className="text-indigo-500 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-xl transition-colors"
               >
                 <Maximize2 className="w-4 h-4" />
               </button>
             </div>
             <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ALL_DEPARTMENTS}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                                         outerRadius={130}
                     innerRadius={65}
                    paddingAngle={3}
                  >
                    {ALL_DEPARTMENTS.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-gray-700">
                    {totalDepartmentApplications}
                  </text>
                  <text x="50%" y="50%" dy={18} textAnchor="middle" dominantBaseline="middle" className="text-xs fill-gray-500">
                    Total
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
           
          </div>

                     {/* Application Sources Chart - Enhanced */}
           <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-4">
             <div className="flex items-center justify-between mb-3">
               <div>
                 <h3 className="text-lg font-semibold text-gray-900">Application Sources</h3>
               </div>
               <button
                 onClick={() => { setSelectedChart('sources'); setShowLargeGraph(true); }}
                 className="text-indigo-500 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-xl transition-colors"
               >
                 <Maximize2 className="w-4 h-4" />
               </button>
             </div>
             <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={APPLICATION_SOURCES} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#6b7280', fontSize: 10 }} 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {APPLICATION_SOURCES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          
          </div>
        </div>

        {/* Open Positions with Enhanced Design */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Open Positions by Department</h3>
              <p className="text-gray-500 mt-2">{totalOpenPositions} total positions • {OPEN_POSITIONS.length} departments</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPEN_POSITIONS.map((position, index) => (
              <div key={index} className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300  hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-gray-800 text-lg">{position.department}</h4>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor(position.priority)}`}>
                      {position.priority}
                    </span>
                  </div>
                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-lg font-bold px-4 py-2 rounded-xl">
                    {position.positions}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-4">{position.title}</p>
                <div className="space-y-3 mb-5">
                  {position.roles.slice(0, 2).map((role, roleIndex) => (
                    <div key={roleIndex} className="text-sm text-gray-600 flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mr-3"></div>
                      {role}
                    </div>
                  ))}
                  {position.roles.length > 2 && (
                    <div className="text-sm text-indigo-600 font-medium">+{position.roles.length - 2} more roles</div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 bg-gray-100/80 px-3 py-1 rounded-lg">{position.applications} applications</span>
                  <button className="text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 font-medium px-4 py-2 rounded-xl transition-all duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Enlarged Charts */}
        {showLargeGraph && (
          <Modal onClose={() => setShowLargeGraph(false)}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedChart === 'line' ? 'Applications Over Time' : 
                   selectedChart === 'pie' ? 'Applications by Department' : 
                   'Application Sources'}
                </h2>
                <p className="text-gray-600 mt-2 text-lg">
                  Filtered by: {getPresetLabel()}
                </p>
              </div>
            </div>
            <div className={selectedChart === 'pie' ? 'flex justify-center' : ''}>
              <ResponsiveContainer 
                width={selectedChart === 'pie' ? 600 : "100%"} 
                height={selectedChart === 'pie' ? 500 : 500}
              >
                {selectedChart === 'line' ? (
                  <LineChart 
                    data={filteredApplications}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
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
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="applications" 
                      stroke="#6366f1" 
                      strokeWidth={4}
                      dot={{ fill: '#6366f1', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: '#4f46e5' }}
                    />
                  </LineChart>
                ) : selectedChart === 'pie' ? (
                  <PieChart>
                    <Pie
                      data={ALL_DEPARTMENTS}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      innerRadius={80}
                      paddingAngle={4}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {ALL_DEPARTMENTS.map((entry, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-4xl font-bold fill-gray-700">
                      {totalDepartmentApplications}
                    </text>
                    <text x="50%" y="50%" dy={30} textAnchor="middle" dominantBaseline="middle" className="text-xl fill-gray-500">
                      Total
                    </text>
                  </PieChart>
                ) : (
                  <BarChart 
                    data={APPLICATION_SOURCES} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#6b7280', fontSize: 14 }} 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280', fontSize: 14 }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {APPLICATION_SOURCES.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
            {/* Legend for Pie Chart */}
            {selectedChart === 'pie' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
                {ALL_DEPARTMENTS.map((dept, index) => (
                  <div key={dept.name} className="flex items-center justify-between bg-gray-50/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-5 h-5 rounded-full shadow-lg" 
                        style={{ backgroundColor: COLORS[index] }}
                      ></div>
                      <span className="text-sm text-gray-700 font-medium">{dept.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800 bg-white/80 px-3 py-1 rounded-lg">{dept.value}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Legend for Sources Chart */}
            {selectedChart === 'sources' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {APPLICATION_SOURCES.map((source, index) => (
                  <div key={source.name} className="flex items-center justify-between bg-gray-50/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-5 h-5 rounded-full shadow-lg" 
                        style={{ backgroundColor: COLORS[index] }}
                      ></div>
                      <span className="text-sm text-gray-700 font-medium">{source.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800 bg-white/80 px-3 py-1 rounded-lg">{source.value}</span>
                  </div>
                ))}
              </div>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}