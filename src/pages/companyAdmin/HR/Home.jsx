import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChartBarIcon, DocumentChartBarIcon, UserGroupIcon } from "../../../components/icons/Icons";
import JDTrendChart from '../../../components/charts/JDTrendChart';
import AppliedJdVsJd from './analytics/AppliedJdVsJd';
import HrVsJd from './analytics/HrVsJd';
import useAnalyticsData from '../../../hooks/useAnalyticsData';

function OverviewCard({ title, icon, to, color, children }) {
  return (
    <Link to={to} className="block focus:outline-none h-full">
      <div className={`bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col items-center justify-between h-full min-h-[320px] hover:shadow-lg transition-all duration-200 overflow-hidden ${title === 'HR vs JD Workload' ? 'pb-4' : ''}`}>
        <div className="flex flex-col items-center w-full">
          <div className={`p-4 rounded-full mb-4 ${color} shadow-md`}>{icon}</div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">{title}</h3>
        </div>
        <div className="w-full flex-1 flex items-center justify-center">
          {children || <p className="text-gray-500">No data available</p>}
        </div>
      </div>
    </Link>
  );
}

function Home() {
  const { data: analyticsData, isLoading } = useAnalyticsData('month');
  
  // Transform data to match JDTrendChart's expected format
  const jdTrendData = useMemo(() => {
    if (!analyticsData?.jdTrends) return [];
    return analyticsData.jdTrends.map(item => ({
      name: item.month,
      value: item.jdCount,
      trend: item.trend || 0
    }));
  }, [analyticsData]);

  // Transform HR performance data for the HR Workload chart
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
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your HR Analytics hub.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <OverviewCard 
          title="JD vs Months Analysis" 
          icon={<ChartBarIcon className="w-8 h-8 text-white"/>}
          to="/analytics/jd-vs-months"
          color="bg-indigo-500"
        >
          <JDTrendChart data={jdTrendData} loading={isLoading} mini />
        </OverviewCard>
        
        <OverviewCard 
          title="Applied vs Total JDs" 
          icon={<DocumentChartBarIcon className="w-8 h-8 text-white"/>}
          to="/analytics/applied-jd-vs-jd"
          color="bg-green-500"
        >
          <AppliedJdVsJd mini />
        </OverviewCard>
        
        <OverviewCard 
          title="HR vs JD Workload" 
          icon={<UserGroupIcon className="w-8 h-8 text-white"/>}
          to="/analytics/hr-vs-jd"
          color="bg-yellow-500"
        >
          <HrVsJd mini data={hrWorkloadData} loading={isLoading} />
        </OverviewCard>
      </div>
    </div>
  );
}

export default Home;