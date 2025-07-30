import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const hrList = [
  {
    id: 1,
    name: "Anjali Rao",
    email: "anjali.rao@example.com",
    experience: 5,
    role: "Lead Recruiter",
    status: "Active",
    jds: [
      {
        id: 101,
        title: "Software full stack developer",
        department: "IT",
        location: "Mumbai",
        dateUploaded: "2025-07-14",
        status: "Open",
        details: {
          reportingTo: "CTO",
          description: "Responsible for developing scalable applications...",
          salaryRange: "₹10,00,000 - ₹16,00,000",
          experienceRequired: "3-5 years",
          numberOfApplicants: 25,
          // attachments: ["JobDescription.pdf"],
        },
      },
      {
        id: 102,
        title: "QA Engineer",
        department: "IT",
        location: "Mumbai",
        dateUploaded: "2025-06-20",
        status: "Open",
        details: {
          reportingTo: "QA Manager",
          description: "Ensure product quality through testing...",
          salaryRange: "₹8,00,000 - ₹12,00,000",
          experienceRequired: "2-4 years",
          numberOfApplicants: 15,
          attachments: [],
        },
      },
    ],
  },
  {
    id: 2,
    name: "Rajat Singh",
    email: "rajat.singh@example.com",
    experience: 3,
    role: "HR Associate",
    status: "Inactive",
    jds: [
      {
        id: 201,
        title: "Marketing Lead",
        department: "Marketing",
        location: "Chennai",
        dateUploaded: "2025-07-21",
        status: "Closed",
        details: {
          reportingTo: "CMO",
          description: "Lead marketing campaigns and strategy...",
          salaryRange: "₹12,00,000 - ₹18,00,000",
          experienceRequired: "5-7 years",
          numberOfApplicants: 30,
          attachments: ["CampaignBrief.pdf"],
        },
      },
    ],
  },
  {
    id: 3,
    name: "Priya Nair",
    email: "priya.nair@example.com",
    experience: 7,
    role: "HR Manager",
    status: "Active",
    jds: [
      {
        id: 301,
        title: "Business Analyst",
        department: "Business",
        location: "Bangalore",
        dateUploaded: "2025-07-10",
        status: "Open",
        details: {
          reportingTo: "Head of Operations",
          description: "Analyze business processes and data...",
          salaryRange: "₹9,00,000 - ₹14,00,000",
          experienceRequired: "4-6 years",
          numberOfApplicants: 20,
          attachments: [],
        },
      },
      {
        id: 302,
        title: "HR Executive",
        department: "HR",
        location: "Bangalore",
        dateUploaded: "2025-06-30",
        status: "Open",
        details: {
          reportingTo: "HR Manager",
          description: "Manage recruitment and employee engagement...",
          salaryRange: "₹6,00,000 - ₹8,00,000",
          experienceRequired: "2-3 years",
          numberOfApplicants: 18,
          attachments: [],
        },
      },
      {
        id: 303,
        title: "Training Coordinator",
        department: "HR",
        location: "Bangalore",
        dateUploaded: "2025-07-15",
        status: "Open",
        details: {
          reportingTo: "HR Manager",
          description: "Coordinate and organize employee training programs...",
          salaryRange: "₹7,00,000 - ₹9,00,000",
          experienceRequired: "3-4 years",
          numberOfApplicants: 10,
          attachments: ["TrainingPlan.pdf"],
        },
      },
    ],
  },
  {
    id: 4,
    name: "Suresh Kumar",
    email: "suresh.kumar@example.com",
    experience: 4,
    role: "Senior HR",
    status: "Active",
    jds: [
      {
        id: 401,
        title: "Data Scientist",
        department: "IT",
        location: "Hyderabad",
        dateUploaded: "2025-07-05",
        status: "Open",
        details: {
          reportingTo: "CTO",
          description: "Analyze large datasets to derive insights...",
          salaryRange: "₹11,00,000 - ₹15,00,000",
          experienceRequired: "3-5 years",
          numberOfApplicants: 12,
          attachments: [],
        },
      },
    ],
  },
  {
    id: 5,
    name: "Neha Patel",
    email: "neha.patel@example.com",
    experience: 6,
    role: "HR Specialist",
    status: "Inactive",
    jds: [
      {
        id: 501,
        title: "Content Writer",
        department: "Marketing",
        location: "Pune",
        dateUploaded: "2025-06-28",
        status: "Open",
        details: {
          reportingTo: "Marketing Manager",
          description: "Create engaging marketing content...",
          salaryRange: "₹5,00,000 - ₹7,00,000",
          experienceRequired: "2-3 years",
          numberOfApplicants: 8,
          attachments: [],
        },
      },
      {
        id: 502,
        title: "SEO Analyst",
        department: "Marketing",
        location: "Pune",
        dateUploaded: "2025-07-12",
        status: "Open",
        details: {
          reportingTo: "SEO Manager",
          description: "Optimize website content for SEO...",
          salaryRange: "₹6,00,000 - ₹9,00,000",
          experienceRequired: "3-4 years",
          numberOfApplicants: 10,
          attachments: [],
        },
      },
    ],
  },
  {
    id: 6,
    name: "Vikram Desai",
    email: "vikram.desai@example.com",
    experience: 2,
    role: "Junior HR",
    status: "Active",
    jds: [],
  },
  {
    id: 7,
    name: "Meera Joshi",
    email: "meera.joshi@example.com",
    experience: 8,
    role: "HR Director",
    status: "Active",
    jds: [
      {
        id: 701,
        title: "Project Manager",
        department: "Operations",
        location: "Delhi",
        dateUploaded: "2025-07-18",
        status: "Open",
        details: {
          reportingTo: "CEO",
          description: "Manage project delivery and teams...",
          salaryRange: "₹15,00,000 - ₹22,00,000",
          experienceRequired: "7-10 years",
          numberOfApplicants: 5,
          attachments: ["ProjectPlan.pdf"],
        },
      },
    ],
  },
  {
    id: 8,
    name: "Arjun Kapoor",
    email: "arjun.kapoor@example.com",
    experience: 10,
    role: "Chief HR Officer",
    status: "Active",
    jds: [
      {
        id: 801,
        title: "HR Strategy Lead",
        department: "HR",
        location: "Mumbai",
        dateUploaded: "2025-07-01",
        status: "Open",
        details: {
          reportingTo: "CEO",
          description: "Develop and execute HR strategies...",
          salaryRange: "₹18,00,000 - ₹25,00,000",
          experienceRequired: "10+ years",
          numberOfApplicants: 3,
          attachments: [],
        },
      },
      {
        id: 802,
        title: "Compensation Analyst",
        department: "HR",
        location: "Mumbai",
        dateUploaded: "2025-07-08",
        status: "Open",
        details: {
          reportingTo: "HR Strategy Lead",
          description: "Analyze compensation and benefits...",
          salaryRange: "₹12,00,000 - ₹16,00,000",
          experienceRequired: "5-7 years",
          numberOfApplicants: 7,
          attachments: [],
        },
      },
    ],
  },
];

function HRList() {
  const navigate = useNavigate();
  const [hrs, setHrs] = useState(hrList);
  const [selectedHr, setSelectedHr] = useState(null);
  const [showJdModal, setShowJdModal] = useState(false);
  const [selectedJd, setSelectedJd] = useState(null);
  const [showJdDetailsModal, setShowJdDetailsModal] = useState(false);
  const [jdFilter, setJdFilter] = useState("all");
  const [hrSearch, setHrSearch] = useState("");

  // Toggle HR active/inactive status
  const toggleStatus = (hrId, newStatus) => {
    setHrs((prev) =>
      prev.map((hr) =>
        hr.id === hrId ? { ...hr, status: newStatus } : hr
      )
    );
  };

  // Get unique JD titles
  const jdTitles = [
    "all",
    ...new Set(
      hrList
        .flatMap((hr) => hr.jds.map((jd) => jd.title))
        .sort((a, b) => a.localeCompare(b))
    ),
  ];

  // Filter HRs by JD title and name search
  const filteredHrs = hrs.filter((hr) => {
    const matchesJd =
      jdFilter === "all" || hr.jds.some((jd) => jd.title === jdFilter);
    const matchesName = hr.name
      .toLowerCase()
      .includes(hrSearch.toLowerCase());
    return matchesJd && matchesName;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Company Admin Screen</h1>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <label htmlFor="jd-filter" className="text-sm font-semibold text-gray-600">
              Filter by JD:
            </label>
            <select
              id="jd-filter"
              value={jdFilter}
              onChange={(e) => setJdFilter(e.target.value)}
              className="w-full sm:w-40 rounded-md border border-gray-300 px-3 py-1 text-sm bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              {jdTitles.map((title) => (
                <option key={title} value={title}>
                  {title === "all" ? "All JDs" : title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <label htmlFor="hr-search" className="text-sm font-semibold text-gray-600">
              Search HR by Name:
            </label>
            <input
              id="hr-search"
              type="text"
              value={hrSearch}
              onChange={(e) => setHrSearch(e.target.value)}
              placeholder="Enter HR name"
              className="w-full sm:w-60 rounded-md border border-gray-300 px-3 py-1 text-sm bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        {/* HR List as cards */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
          {filteredHrs.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">No HRs found matching the filters.</p>
          ) : (
            filteredHrs.map((hr) => (
              <div key={hr.id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col min-h-[300px]">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold">{hr.name}</span>
                    <StatusDropdown
                      currentStatus={hr.status}
                      onChange={(newStatus) => toggleStatus(hr.id, newStatus)}
                    />
                  </div>
                  <div className="text-sm text-gray-600">{hr.email}</div>
                  <div className="mt-1 text-sm">Experience: {hr.experience} yrs</div>
                  <div className="text-sm">Role: {hr.role}</div>
                </div>
                <div className="flex flex-1 flex-col justify-end p-6 space-y-2">
                  <button
                    onClick={() => navigate(`/hrprofile/${hr.id}`)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded w-full"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      setSelectedHr(hr);
                      setShowJdModal(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded"
                  >
                    List of JD {hr.jds.length > 0 && `(${hr.jds.length})`}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* JD List Modal */}
      {showJdModal && selectedHr && (
        <Modal onClose={() => setShowJdModal(false)} title={`JDs uploaded by ${selectedHr.name}`}>
          {selectedHr.jds.length === 0 ? (
            <p className="p-4 text-gray-600">No JDs found for this HR.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-3 py-2 text-left">JD Title</th>
                  <th className="border px-3 py-2 text-left">Department</th>
                  <th className="border px-3 py-2 text-left">Location</th>
                  <th className="border px-3 py-2 text-left">Date Uploaded</th>
                  <th className="border px-3 py-2 text-left">Status</th>
                  <th className="border px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedHr.jds.map((jd) => (
                  <tr key={jd.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{jd.title}</td>
                    <td className="border px-3 py-2">{jd.department}</td>
                    <td className="border px-3 py-2">{jd.location}</td>
                    <td className="border px-3 py-2">{jd.dateUploaded}</td>
                    <td className="border px-3 py-2">{jd.status}</td>
                    <td className="border px-3 py-2">
                      <button
                        onClick={() => {
                          setSelectedJd(jd);
                          setShowJdDetailsModal(true);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Modal>
      )}

      {/* JD Details Modal */}
      {showJdDetailsModal && selectedJd && (
        <Modal
          title={`JD Details: ${selectedJd.title}`}
          onClose={() => setShowJdDetailsModal(false)}
          className="max-w-3xl"
        >
          <div className="space-y-2">
            <DetailItem label="Title" value={selectedJd.title} />
            <DetailItem label="Department" value={selectedJd.department} />
            <DetailItem label="Reporting To" value={selectedJd.details.reportingTo} />
            <DetailItem label="Description" value={selectedJd.details.description} />
            <DetailItem label="Salary Range" value={selectedJd.details.salaryRange} />
            <DetailItem label="Experience Required" value={selectedJd.details.experienceRequired} />
            <DetailItem label="Location" value={selectedJd.location} />
            <DetailItem label="Date Uploaded" value={selectedJd.dateUploaded} />
            <DetailItem label="Status" value={selectedJd.status} />
            <DetailItem label="Number of Applicants" value={selectedJd.details.numberOfApplicants} />
            <div>
              <span className="font-semibold">Attachments: </span>
              {selectedJd.details.attachments.length > 0 ? (
                selectedJd.details.attachments.map((att, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-blue-600 underline mr-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    {att}
                  </a>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatusDropdown({ currentStatus, onChange }) {
  const [open, setOpen] = useState(false);

  const options = ["Active", "Inactive"];
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex justify-center w-full rounded-md border px-3 py-1 text-sm font-medium ${
          currentStatus === "Active"
            ? "bg-green-500 text-white border-green-600 hover:bg-green-600"
            : "bg-red-500 text-white border-red-600 hover:bg-red-600"
        }`}
      >
        {currentStatus}{" "}
        <svg
          className="ml-1 -mr-1 h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="origin-top-right absolute mt-1 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  option === currentStatus ? "font-semibold bg-gray-100" : ""
                } hover:bg-gray-200`}
                role="menuitem"
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Modal({ title, children, onClose, className = "max-w-4xl" }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className={`bg-white rounded shadow-lg w-full ${className} max-h-[90vh] overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b px-4 py-3">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <span className="font-semibold">{label}: </span>
      <span>{value}</span>
    </div>
  );
}

export default HRList;