import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../common/Footer.jsx';
import Header from '../common/Header.jsx';
import '../../index.css';

const CandidateRow = ({ name, role, employmentType, workType, appliedDate, attachments, status, score, interviewScore, experience, index }) => {
  const navigate = useNavigate();
  <button
  onClick={() => navigate(-1)}
  className="mb-4 bg-gray-200 text-blue-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-200"
>
  ← Back
</button>
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-2 px-4 text-gray-700 text-left align-middle">{name}</td>
      <td className="py-2 px-4 text-gray-700 text-left align-middle">{role}</td>
      <td className="py-2 px-4 text-gray-700 text-left align-middle">{employmentType}</td>
      <td className="py-2 px-4 text-gray-700 text-left align-middle">{workType}</td>
      <td className="py-2 px-4 text-gray-700 text-left align-middle">{appliedDate}</td>
      <td className="py-2 px-4 text-left align-middle">
        {attachments.map((attach, idx) => (
          <span key={idx} className="mr-2 flex items-center text-indigo-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
            </svg>
            {attach}
          </span>
        ))}
      </td>
      <td className="py-2 px-4 text-left align-middle">
        <span className={`px-2 py-1 rounded whitespace-nowrap ${
  status === 'Interview' ? 'bg-green-100 text-green-800' :
  status === 'In-Review' ? 'bg-purple-100 text-purple-800' :
  status === 'Hired' ? 'bg-blue-100 text-blue-800' :
  status === 'Rejected' ? 'bg-red-100 text-red-800' : 
  'bg-gray-100 text-gray-800'
}`}>
  {status}
</span>

      </td>
      <td className="py-2 px-4 text-gray-700 text-left align-middle">{experience} yrs</td>
      <td className="py-2 px-4 text-gray-700 text-left align-middle">{score}%</td>
      <td className="py-2 px-4 text-left align-middle">
        <button
          onClick={() => navigate(`/interview-details/${index}`)}
          className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition duration-200"
        >
          {interviewScore}%
        </button>
      </td>
    </tr>
  );
};

const InterviewDetails = ({ score, onClose }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const breakdown = {
    communication: 25,
    technicalSkills: 20,
    problemSolving: 15,
    experience: 10,
    more: "View detailed interview content",
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Interview Score Breakdown</h2>
        <p className="text-gray-700">Total Score: {score}%</p>
        <ul className="mt-4 space-y-2">
          <li className="flex justify-between text-gray-700"><span>Communication:</span><span>{breakdown.communication}%</span></li>
          <li className="flex justify-between text-gray-700"><span>Technical Skills:</span><span>{breakdown.technicalSkills}%</span></li>
          <li className="flex justify-between text-gray-700"><span>Problem Solving:</span><span>{breakdown.problemSolving}%</span></li>
          <li className="flex justify-between text-gray-700"><span>Experience:</span><span>{breakdown.experience}%</span></li>
          <li className="flex justify-between text-gray-700"><span>More:</span><span className="text-indigo-600 cursor-pointer" onClick={() => alert("Detailed interview content here")}>{breakdown.more}</span></li>
        </ul>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200"
        >
          Close
        </button>
        
      </div>
    </div>
  );
};

const InterviewScore = () => {
  const candidates = [
    { name: "Sophia Turner", role: "Legal Advisor", employmentType: "Full-time", workType: "Hybrid", appliedDate: "22-07-2025", attachments: ["Resume", "Cover Letter"], status: "Interview", score: 70, interviewScore: 67, department: "Legal", position: "Advisor", experience: 5, location: "New York" },
    { name: "Lucas Green", role: "Software Developer", employmentType: "Full-time", workType: "Remote", appliedDate: "22-07-2025", attachments: ["Resume", "Portfolio"], status: "In-Review", score: 30, interviewScore: 25, department: "Engineering", position: "Developer", experience: 3, location: "San Francisco" },
    { name: "Emma Wilson", role: "Financial Analyst", employmentType: "Full-time", workType: "Remote", appliedDate: "22-07-2025", attachments: ["Resume"], status: "Hired", score: 95, interviewScore: 90, department: "Finance", position: "Analyst", experience: 7, location: "Chicago" },
    { name: "Noah Brown", role: "Operations Manager", employmentType: "Full-time", workType: "On-site", appliedDate: "22-07-2025", attachments: ["Resume", "References"], status: "In-Review", score: 80, interviewScore: 75, department: "Operations", position: "Manager", experience: 8, location: "Boston" },
    { name: "Olivia Smith", role: "HR Manager", employmentType: "Full-time", workType: "Hybrid", appliedDate: "22-07-2025", attachments: ["Resume", "Certifications"], status: "Hired", score: 100, interviewScore: 98, department: "Human Resources", position: "Manager", experience: 10, location: "Seattle" },
    { name: "Ethan Taylor", role: "Network Engineer", employmentType: "Full-time", workType: "On-site", appliedDate: "22-07-2025", attachments: ["Resume", "Certifications"], status: "Interview", score: 50, interviewScore: 45, department: "IT", position: "Engineer", experience: 4, location: "Austin" },
    { name: "Mia Davis", role: "Customer Support Specialist", employmentType: "Contract", workType: "Remote", appliedDate: "22-07-2025", attachments: ["Resume", "Writing Samples"], status: "Rejected", score: 10, interviewScore: 5, department: "Customer Service", position: "Specialist", experience: 2, location: "Denver" },
    { name: "Ava Johnson", role: "Data Scientist", employmentType: "Full-time", workType: "Remote", appliedDate: "22-07-2025", attachments: ["Resume", "Project Portfolio"], status: "Interview", score: 85, interviewScore: 80, department: "R&D", position: "Scientist", experience: 6, location: "Portland" },
    { name: "William Moore", role: "Marketing Coordinator", employmentType: "Full-time", workType: "On-site", appliedDate: "22-07-2025", attachments: ["Resume", "Portfolio"], status: "Rejected", score: 65, interviewScore: 60, department: "Marketing", position: "Coordinator", experience: 3, location: "Miami" },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState({ department: "", position: "", experience: "", location: "" });
  const [showInterviewDetails, setShowInterviewDetails] = useState(false);
  const [interviewScore, setInterviewScore] = useState(0);

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter.department === "" || candidate.department === filter.department) &&
    (filter.position === "" || candidate.position === filter.position) &&
    (filter.experience === "" || candidate.experience === parseInt(filter.experience)) &&
    (filter.location === "" || candidate.location === filter.location)
  );

  const handleInterviewDetails = (score) => {
    setInterviewScore(score);
    setShowInterviewDetails(true);

  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 bg-white text-blue-900">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">Candidates</h1>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200">Add</button>
            <select className="border border-blue-300 p-2 rounded-full text-blue-600">
              <option>Latest</option>
              <option>Oldest</option>
            </select>
            <input type="date" className="border border-blue-300 p-2 rounded-full text-blue-600" defaultValue="22-07-2025" />
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Search candidates name, role, etc."
            className="border border-blue-300 p-2 rounded-full w-1/3 text-blue-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex space-x-2">
            <select className="border border-blue-300 p-2 rounded-full text-blue-600" value={filter.department} onChange={(e) => setFilter({ ...filter, department: e.target.value })}>
              <option value="">All Departments</option>
              <option value="Legal">Legal</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Human Resources">Human Resources</option>
              <option value="IT">IT</option>
              <option value="Customer Service">Customer Service</option>
              <option value="R&D">R&D</option>
              <option value="Marketing">Marketing</option>
            </select>
            <select className="border border-blue-300 p-2 rounded-full text-blue-600" value={filter.position} onChange={(e) => setFilter({ ...filter, position: e.target.value })}>
              <option value="">All Positions</option>
              <option value="Advisor">Advisor</option>
              <option value="Developer">Developer</option>
              <option value="Analyst">Analyst</option>
              <option value="Manager">Manager</option>
              <option value="Engineer">Engineer</option>
              <option value="Specialist">Specialist</option>
              <option value="Scientist">Scientist</option>
              <option value="Coordinator">Coordinator</option>
            </select>
            <select className="border border-blue-300 p-2 rounded-full text-blue-600" value={filter.experience} onChange={(e) => setFilter({ ...filter, experience: e.target.value })}>
              <option value="">All Experience</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="10">10</option>
            </select>
            <select className="border border-blue-300 p-2 rounded-full text-blue-600" value={filter.location} onChange={(e) => setFilter({ ...filter, location: e.target.value })}>
              <option value="">All Locations</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Chicago">Chicago</option>
              <option value="Boston">Boston</option>
              <option value="Seattle">Seattle</option>
              <option value="Austin">Austin</option>
              <option value="Denver">Denver</option>
              <option value="Portland">Portland</option>
              <option value="Miami">Miami</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4 mb-4">
          <button className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">All</button>
          <button className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full whitespace-nowrap">In-Review</button>
          <button className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Interview</button>
          <button className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Hired</button>
          <button className="bg-red-100 text-red-800 px-2 py-1 rounded-full">Rejected</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
  <tr className="bg-blue-50">
    <th className="py-3 px-4 text-left text-blue-600 align-middle">Name</th>
    <th className="py-3 px-4 text-left text-blue-600 align-middle">Applied Role</th>
    <th className="py-3 px-4 text-left text-blue-600 align-middle">Employment Type</th>
    <th className="py-3 px-4 text-left text-blue-600 align-middle">Work Type</th>
    <th className="py-3 px-4 text-left text-blue-600 align-middle">Applied Date</th>
    <th className="py-3 px-4 text-left text-blue-600 align-middle">Attachment</th>
    <th className="py-3 px-4 text-left text-blue-600 align-middle">Status</th>
    <th className="py-3 px-4 text-left text-blue-600 align-middle">Experience (yrs)</th>
    <th className="py-3 px-4 text-left text-blue-600 align-middle">Score (%)</th>
    <th className="py-3 px-4 text-left text-blue-600 align-middle">Interview Score (%)</th>
  </tr>
</thead>

            <tbody>
              {filteredCandidates.map((candidate, index) => (
                <CandidateRow
                  key={index}
                  {...candidate}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showInterviewDetails && <InterviewDetails score={interviewScore} onClose={() => setShowInterviewDetails(false)} />}
      <Footer />
    </>
  );
};

export default InterviewScore;