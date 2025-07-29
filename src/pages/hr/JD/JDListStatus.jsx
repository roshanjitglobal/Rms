import React, { useState } from 'react';
// import Sidebar from '../../../components/hr/Sidebar';

const unfinishedCandidates = [
  { id: 1, name: 'Candidate 1', resumeScore: 90, status: 'Pending' },
  { id: 2, name: 'Candidate 2', resumeScore: 30, status: 'Pending' },
  { id: 3, name: 'Candidate 3', resumeScore: 80, status: 'Pending' },
];

const finishedCandidates = [
  { id: 1, name: 'Candidate 1', resumeScore: 90, interviewScore: 87 },
  { id: 2, name: 'Candidate 2', resumeScore: 70, interviewScore: 80 },
  { id: 3, name: 'Candidate 3', resumeScore: 80, interviewScore: 70 },
];

const JDListStatus = () => {
  const [activeTab, setActiveTab] = useState('unfinished');

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-6 font-medium text-sm ${activeTab === 'unfinished' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('unfinished')}
            >
              Unfinished
            </button>
            <button
              className={`py-2 px-6 font-medium text-sm ${activeTab === 'finished' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('finished')}
            >
              Finished
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {activeTab === 'unfinished' ? (
              <div className="p-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resume score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {unfinishedCandidates.map((candidate) => (
                      <tr key={candidate.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {candidate.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {candidate.resumeScore}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((item) => (
                              <div key={item} className="h-1 w-6 bg-gray-200 rounded"></div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resume score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interview score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {finishedCandidates.map((candidate) => (
                      <tr key={candidate.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {candidate.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {candidate.resumeScore}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {candidate.interviewScore}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex justify-end p-4 border-t border-gray-200">
              <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Proceed
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JDListStatus;
