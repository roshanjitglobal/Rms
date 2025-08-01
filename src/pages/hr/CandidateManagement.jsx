import React, { useState } from 'react';
import { Eye, CalendarCheck2, Users, Search, Filter, MoreVertical } from 'lucide-react';

// Verification Modal for Schedule Interview
const ScheduleModal = ({ selectedIds, onClose }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const selectedCandidates = mockCandidates.filter(candidate => 
    selectedIds.includes(candidate.id)
  );

  const handleConfirmSchedule = () => {
    setIsConfirming(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Interviews scheduled for candidates: ${selectedIds}`);
      alert(`Successfully scheduled interviews for ${selectedIds.length} candidate(s)!`);
      setIsConfirming(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="bg-yellow-100 rounded-full p-2 mr-3">
            <CalendarCheck2 className="text-yellow-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Confirm Interview Scheduling
          </h3>
        </div>

        {/* Confirmation Message */}
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to schedule interviews for the following {selectedIds.length} candidate{selectedIds.length > 1 ? 's' : ''}?
          </p>
          
          {/* Candidate List */}
          <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Selected Candidates:</h4>
            <div className="space-y-2">
              {selectedCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between bg-white rounded p-3 border border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">{candidate.name}</div>
                    <div className="text-sm text-gray-500">{candidate.position}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      Score: {candidate.screeningScore}/100
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${statusConfig[candidate.status].bg} ${statusConfig[candidate.status].text}`}>
                      {candidate.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Warning/Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">Important Notes:</h4>
              <div className="mt-1 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Interview invitations will be sent automatically via email</li>
                  <li>Candidates will receive calendar invites with meeting details</li>
                  <li>Status will be updated to "Scheduled L1" after confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmSchedule}
            disabled={isConfirming}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isConfirming ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Scheduling...</span>
              </>
            ) : (
              <>
                <CalendarCheck2 size={16} />
                <span>Confirm & Schedule</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const mockCandidates = [
  { id: 1, name: 'Priya P', status: 'New', screeningScore: null, interviewScore: null, appliedDate: '2024-01-15', position: 'Frontend Developer', jdApplied: 3, interviewDate: null, attendanceLog: null },
  { id: 2, name: 'Karthik K', status: 'Waiting to Schedule L1', screeningScore: 84, interviewScore: null, appliedDate: '2024-01-12', position: 'Backend Developer', jdApplied: 5, interviewDate: null, attendanceLog: null },
  { id: 3, name: 'Aisha R', status: 'Completed L1', screeningScore: 76, interviewScore: 88, appliedDate: '2024-01-10', position: 'Full Stack Developer', jdApplied: 2, interviewDate: '2024-01-20', attendanceLog: 'Attended' },
  { id: 4, name: 'Rajesh M', status: 'Under Validation', screeningScore: null, interviewScore: null, appliedDate: '2024-01-14', position: 'DevOps Engineer', jdApplied: 1, interviewDate: null, attendanceLog: null },
  { id: 5, name: 'Sneha T', status: 'Scheduled L1', screeningScore: 92, interviewScore: null, appliedDate: '2024-01-08', position: 'UI/UX Designer', jdApplied: 4, interviewDate: '2024-01-25', attendanceLog: 'Scheduled' },
  { id: 6, name: 'Vikram S', status: 'Completed L1', screeningScore: 88, interviewScore: 92, appliedDate: '2024-01-05', position: 'Data Scientist', jdApplied: 3, interviewDate: '2024-01-18', attendanceLog: 'Attended' },
  { id: 7, name: 'Meera K', status: 'Scheduled L1', screeningScore: 79, interviewScore: null, appliedDate: '2024-01-13', position: 'Product Manager', jdApplied: 2, interviewDate: '2024-01-22', attendanceLog: 'No Show' },
  { id: 8, name: 'Arjun P', status: 'Completed L1', screeningScore: 95, interviewScore: 89, appliedDate: '2024-01-07', position: 'Backend Developer', jdApplied: 4, interviewDate: '2024-01-16', attendanceLog: 'Attended' },
];

const statusConfig = {
  'New': { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-400' },
  'Under Validation': { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  'Waiting to Schedule L1': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  'Scheduled L1': { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
  'Completed L1': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
};

const CandidateManagement = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const eligibleCandidates = filteredCandidates.filter(candidate => isEligible(candidate.status));
    const allEligibleIds = eligibleCandidates.map(c => c.id);
    
    if (selectedIds.length === allEligibleIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allEligibleIds);
    }
  };

  const isEligible = (status) => status === 'Waiting to Schedule L1';

  // Enhanced filtering logic
  const filteredCandidates = mockCandidates.filter(candidate => {
    // Search filter
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    
    // Position filter
    const matchesPosition = positionFilter === 'all' || candidate.position === positionFilter;
    
    // Score filter
    let matchesScore = true;
    if (scoreFilter !== 'all') {
      const score = candidate.screeningScore || candidate.interviewScore;
      switch (scoreFilter) {
        case 'excellent':
          matchesScore = score >= 90;
          break;
        case 'good':
          matchesScore = score >= 75 && score < 90;
          break;
        case 'average':
          matchesScore = score >= 60 && score < 75;
          break;
        case 'below-average':
          matchesScore = score < 60;
          break;
        case 'not-scored':
          matchesScore = !score;
          break;
        default:
          matchesScore = true;
      }
    }
    
    // Date filter
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const appliedDate = new Date(candidate.appliedDate);
      const today = new Date();
      const daysDiff = Math.floor((today - appliedDate) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
        case 'quarter':
          matchesDate = daysDiff <= 90;
          break;
        default:
          matchesDate = true;
      }
    }
    
    return matchesSearch && matchesStatus && matchesPosition && matchesScore && matchesDate;
  });

  const eligibleCount = filteredCandidates.filter(c => isEligible(c.status)).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Candidate Management</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users size={16} />
            <span>{filteredCandidates.length} of {mockCandidates.length} candidates</span>
            {(statusFilter !== 'all' || positionFilter !== 'all' || scoreFilter !== 'all' || dateFilter !== 'all') && (
              <span className="text-indigo-600 font-medium">(filtered)</span>
            )}
          </div>
        </div>
        <p className="text-gray-600">Manage and track candidate applications and interviews</p>
      </div>

      {/* Enhanced Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by candidate name, position, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900 flex items-center">
              <Filter size={16} className="mr-2" />
              Filter Candidates
            </h3>
            <button
              onClick={() => {
                setStatusFilter('all');
                setPositionFilter('all');
                setScoreFilter('all');
                setDateFilter('all');
              }}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                {Object.keys(statusConfig).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Position Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Positions</option>
                                 <option value="Frontend Developer">Frontend Developer</option>
                 <option value="Backend Developer">Backend Developer</option>
                 <option value="Full Stack Developer">Full Stack Developer</option>
                 <option value="DevOps Engineer">DevOps Engineer</option>
                 <option value="UI/UX Designer">UI/UX Designer</option>
                 <option value="Data Scientist">Data Scientist</option>
                 <option value="Product Manager">Product Manager</option>
              </select>
            </div>

            {/* Score Range Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Score Range</label>
              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Scores</option>
                <option value="excellent">Excellent (90-100)</option>
                <option value="good">Good (75-89)</option>
                <option value="average">Average (60-74)</option>
                <option value="below-average">Below Average (&lt;60)</option>
                <option value="not-scored">Not Scored</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Applied Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(statusFilter !== 'all' || positionFilter !== 'all' || scoreFilter !== 'all' || dateFilter !== 'all') && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-gray-700">Active Filters:</span>
                {statusFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Status: {statusFilter}
                    <button
                      onClick={() => setStatusFilter('all')}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {positionFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Position: {positionFilter}
                    <button
                      onClick={() => setPositionFilter('all')}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {scoreFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Score: {scoreFilter}
                    <button
                      onClick={() => setScoreFilter('all')}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {dateFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Date: {dateFilter}
                    <button
                      onClick={() => setDateFilter('all')}
                      className="ml-1 text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 rounded-full p-2">
                <CalendarCheck2 className="text-indigo-600" size={16} />
              </div>
              <div>
                <p className="font-medium text-indigo-900">
                  {selectedIds.length} candidate{selectedIds.length > 1 ? 's' : ''} selected
                </p>
                <p className="text-sm text-indigo-700">Ready to schedule interviews</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <CalendarCheck2 size={16} />
              <span>Schedule Interviews</span>
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === eligibleCount && eligibleCount > 0}
                    onChange={handleSelectAll}
                    disabled={eligibleCount === 0}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Screening Score
                 </th>
                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Interview Score
                 </th>
                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Applied Date
                 </th>
                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                   No. of JD Applied
                 </th>
                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Interview Date
                 </th>
                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Logs
                 </th>
                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                   View Profile
                 </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => {
                const statusStyle = statusConfig[candidate.status];
                return (
                  <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEligible(candidate.status) ? (
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(candidate.id)}
                          onChange={() => handleCheckboxChange(candidate.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                        <div className="text-sm text-gray-500">{candidate.position}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${statusStyle.dot} mr-2`}></div>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                          {candidate.status}
                        </span>
                      </div>
                    </td>
                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                       {['Waiting to Schedule L1', 'Scheduled L1', 'Completed L1'].includes(candidate.status) && candidate.screeningScore
                         ? (
                           <div className="flex items-center justify-center">
                             <span className="font-medium">{candidate.screeningScore}</span>
                             <span className="text-gray-400 ml-1">/100</span>
                           </div>
                         )
                         : <span className="text-gray-400">—</span>}
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                       {candidate.status === 'Completed L1' && candidate.interviewScore ? (
                         <div className="flex items-center justify-center">
                           <span className="font-medium">{candidate.interviewScore}</span>
                           <span className="text-gray-400 ml-1">/100</span>
                         </div>
                       ) : <span className="text-gray-400">—</span>}
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                       {new Date(candidate.appliedDate).toLocaleDateString()}
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                       <div className="flex items-center justify-center">
                         <span className="font-medium">{candidate.jdApplied}</span>
                         <span className="text-gray-400 ml-1">JD{candidate.jdApplied > 1 ? 's' : ''}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                       {candidate.interviewDate ? (
                         <div className="flex flex-col items-center">
                           <span className="font-medium">{new Date(candidate.interviewDate).toLocaleDateString()}</span>
                           <span className="text-gray-400 text-xs">({new Date(candidate.interviewDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})})</span>
                         </div>
                       ) : (
                         <span className="text-gray-400">Not scheduled</span>
                       )}
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                       {candidate.attendanceLog ? (
                         <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                           candidate.attendanceLog === 'Attended' 
                             ? 'bg-green-100 text-green-800' 
                             : candidate.attendanceLog === 'No Show' 
                             ? 'bg-red-100 text-red-800'
                             : 'bg-yellow-100 text-yellow-800'
                         }`}>
                           {candidate.attendanceLog}
                         </span>
                       ) : (
                         <span className="text-gray-400">—</span>
                       )}
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                       <button className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1 transition-colors mx-auto">
                         <Eye size={16} />
                         <span>View</span>
                       </button>
                     </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding some candidates.'}
            </p>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {isModalOpen && (
        <ScheduleModal
          selectedIds={selectedIds}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedIds([]);
          }}
        />
      )}
    </div>
  );
};

export default CandidateManagement;