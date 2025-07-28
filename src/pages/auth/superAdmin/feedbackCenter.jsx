import React, { useState } from 'react';
import { MessageSquare, Star, User, Building2, Users, Search } from 'lucide-react';

const FeedbackCenter = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      userType: 'company_admin',
      userName: 'John Mitchell',
      company: 'Tech Corp',
      rating: 4,
      category: 'Platform Usability',
      subject: 'Dashboard Performance Issues',
      message: 'The dashboard loads slowly during peak hours. Sometimes it takes more than 30 seconds to load the candidate list. This affects our daily operations significantly.',
      timestamp: '2024-07-20 14:30'
    },
    { 
      id: 2,
      userType: 'candidate',
      userName: 'Sarah Johnson',
      company: 'N/A',
      rating: 5,
      category: 'Application Process',
      subject: 'Great Experience',
      message: 'The application process was smooth and user-friendly. I especially liked the auto-save feature and the progress indicator. Keep up the good work!',
      timestamp: '2024-07-20 11:15'
    },
    {
      id: 3,
      userType: 'hr',
      userName: 'Emily Davis',
      company: 'Innovate Solutions',
      rating: 3,
      category: 'Feature Request',
      subject: 'Need Better Filtering Options',
      message: 'We need more advanced filtering options for candidates. Currently, we can only filter by basic criteria, but we need skills-based filtering.',
      timestamp: '2024-07-20 09:45'
    },
    {
      id: 4,
      userType: 'candidate',
      userName: 'Michael Brown',
      company: 'N/A',
      rating: 2,
      category: 'Technical Issue',
      subject: 'Upload Problems',
      message: 'I had trouble uploading my resume. The file size limit seems too restrictive and the error messages are not clear enough.',
      timestamp: '2024-07-19 16:20'
    },
    {
      id: 5,
      userType: 'company_admin',
      userName: 'David Wilson',
      company: 'StartUp Inc',
      rating: 4,
      category: 'Integration',
      subject: 'API Documentation Request',
      message: 'The API documentation could be more comprehensive. We need examples for common integration scenarios.',
      timestamp: '2024-07-19 13:10'
    },
    {
      id: 6,
      userType: 'hr',
      userName: 'Lisa Anderson',
      company: 'Global Corp',
      rating: 5,
      category: 'Feature Request',
      subject: 'Bulk Actions Feature',
      message: 'Love the new bulk actions feature! It has saved us hours of work. Would be great to have bulk messaging as well.',
      timestamp: '2024-07-19 10:30'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getUserTypeInfo = (userType) => {
    switch (userType) {
      case 'company_admin':
        return { icon: Building2, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Company Admin' };
      case 'candidate':
        return { icon: User, color: 'text-green-600', bg: 'bg-green-100', label: 'Candidate' };
      case 'hr':
        return { icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', label: 'HR' };
      default:
        return { icon: User, color: 'text-gray-600', bg: 'bg-gray-100', label: 'User' };
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesUserType = filter === 'all' || feedback.userType === filter;
    const matchesSearch = searchTerm === '' || 
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesUserType && matchesSearch;
  });

  const stats = {
    total: feedbacks.length,
    avgRating: (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1),
    happyCustomers: feedbacks.filter(f => f.rating >= 4).length,
    byUserType: {
      company_admin: feedbacks.filter(f => f.userType === 'company_admin').length,
      candidate: feedbacks.filter(f => f.userType === 'candidate').length,
      hr: feedbacks.filter(f => f.userType === 'hr').length
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Feedback Center</h1>
                <p className="text-gray-600">Manage feedback from all user types</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Average Rating</p>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-semibold text-gray-900">{stats.avgRating}</span>
                  <div className="flex">{renderStars(Math.round(stats.avgRating))}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Total Feedback</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">Happy Customers</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.happyCustomers}</p>
              <p className="text-xs text-gray-500 mt-1">4+ star ratings</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Company Admins</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.byUserType.company_admin}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Candidates</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.byUserType.candidate}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">HR</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.byUserType.hr}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All User Types</option>
              <option value="company_admin">Company Admins</option>
              <option value="candidate">Candidates</option>
              <option value="hr">HR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
            <p className="text-gray-600">No feedback matches your current filters.</p>
          </div>
        ) : (
          filteredFeedbacks.map(feedback => {
            const userTypeInfo = getUserTypeInfo(feedback.userType);
            const UserIcon = userTypeInfo.icon;

            return (
              <div
                key={feedback.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${userTypeInfo.bg}`}>
                      <UserIcon className={`w-5 h-5 ${userTypeInfo.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feedback.subject}</h3>
                      
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <span className="font-medium">{feedback.userName}</span>
                        <span className="text-gray-400">•</span>
                        <span className={userTypeInfo.color}>{userTypeInfo.label}</span>
                        {feedback.company !== 'N/A' && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span>{feedback.company}</span>
                          </>
                        )}
                        <span className="text-gray-400">•</span>
                        <span>{feedback.category}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-1">
                          {renderStars(feedback.rating)}
                          <span className="text-sm text-gray-600 ml-1">({feedback.rating}/5)</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{feedback.timestamp}</span>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FeedbackCenter;