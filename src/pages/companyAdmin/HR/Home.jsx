import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, DocumentChartBarIcon, UserGroupIcon } from "../../../components/icons/Icons";

// Simple right arrow SVG component
const ArrowRightIcon = ({ className = '' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M14 5l7 7m0 0l-7 7m7-7H3" 
    />
  </svg>
);
import JDTrendChart from '../../../components/charts/JDTrendChart';
import AppliedJdVsJd from './analytics/AppliedJdVsJd';
import HrVsJd from './analytics/HrVsJd';
import useAnalyticsData from '../../../hooks/useAnalyticsData';

// Custom card header component
const CardHeader = ({ title, icon, color, to }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      <div className={`p-2 rounded-lg ${color} bg-opacity-10 mr-3`}>
        {React.cloneElement(icon, { className: `w-5 h-5 ${color}` })}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <Link to={to} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center">
      View details <ArrowRightIcon className="ml-1 w-4 h-4" />
    </Link>
  </div>
);

function OverviewCard({ title, icon, to, color, children }) {
  const colorMap = {
    'text-indigo-500': 'bg-indigo-50',
    'text-green-500': 'bg-green-50',
    'text-yellow-500': 'bg-yellow-50',
    'text-blue-500': 'bg-blue-50',
    'text-purple-500': 'bg-purple-50',
    'text-pink-500': 'bg-pink-50',
  };

  const bgColor = colorMap[color] || 'bg-gray-50';
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 h-full flex flex-col overflow-hidden">
      <div className="p-5 pb-0">
        <CardHeader 
          title={title} 
          icon={icon} 
          color={color}
          to={to}
        />
      </div>
      <div className="px-5 pb-5 flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0 relative w-full overflow-visible">
          <div className="absolute inset-0 w-full h-full">
            {children || (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400 text-sm">No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { data: analyticsData, isLoading } = useAnalyticsData('month');
  
  const jdTrendData = useMemo(() => {
    if (!analyticsData?.jdTrends) return [];
    return analyticsData.jdTrends.map(item => ({
      name: item.month,
      value: item.jdCount,
      trend: item.trend || 0
    }));
  }, [analyticsData]);

  const hrWorkloadData = useMemo(() => {
    if (!analyticsData?.hrPerformance) return [];
    return analyticsData.hrPerformance.map((hr, index) => ({
      name: hr.name,
      'JDs Managed': hr.jdsManaged || 0,
      idx: index,
      efficiency: hr.efficiency || 0
    }));
  }, [analyticsData]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">HR Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor and analyze your recruitment metrics</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OverviewCard 
              title="JD Trend Analysis" 
              icon={<ChartBarIcon />}
              to="/analytics/jd-vs-months"
              color="text-indigo-500"
            >
              <div className="h-64 w-full relative -mx-2 -my-1">
                <div className="absolute inset-0 w-full h-full pl-1 pr-2">
                  <JDTrendChart data={jdTrendData} loading={isLoading} compact />
                </div>
              </div>
            </OverviewCard>
            
            <OverviewCard 
              title="Application Metrics" 
              icon={<DocumentChartBarIcon />}
              to="/analytics/applied-jd-vs-jd"
              color="text-green-500"
            >
              <div className="h-64 w-full relative -mx-2 -my-1">
                <div className="absolute inset-0 w-full h-full pl-1 pr-2">
                  <AppliedJdVsJd compact />
                </div>
              </div>
            </OverviewCard>
          </div>
          
          <OverviewCard 
            title="HR Workload Distribution" 
            icon={<UserGroupIcon />}
            to="/analytics/hr-vs-jd"
            color="text-yellow-500"
          >
            <div className="h-80 w-full relative -mx-2 -my-1">
              <div className="absolute inset-0 w-full h-full pl-1 pr-2">
                <HrVsJd compact data={hrWorkloadData} loading={isLoading} />
              </div>
            </div>
          </OverviewCard>
        </div>
      </div>
    </div>
  );
}

export default Home;