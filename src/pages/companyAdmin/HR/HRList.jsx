import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { User } from "lucide-react";

// Dummy HR Data shared between pages
const hrList = [
  {
    id: 1,
    name: "Anjali Rao",
    email: "anjali.rao@example.com",
    experience: 5,
    role: "Lead Recruiter",
    status: "Active",
    employeeId: "HR1001",
    reportingManager: "Ramesh K",
    workLocation: "Mumbai, Maharashtra",
    joiningDate: "March 10, 2020",
    phoneNumber: "+91 91234 56789",
    linkedin: "linkedin.com/in/anjalirao",
    department: "Human Resources",
    location: "Mumbai, India",
    profileImage: null,
    jds: [
      {
        id: 101,
        title: "Software Developer",
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
          attachments: ["JobDescription.pdf"],
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
    employeeId: "HR2002",
    reportingManager: "Meera Joshi",
    workLocation: "Chennai, Tamil Nadu",
    joiningDate: "July 5, 2021",
    phoneNumber: "+91 98765 43210",
    linkedin: "linkedin.com/in/rajatsingh",
    department: "Human Resources",
    location: "Chennai, India",
    profileImage: null,
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
    employeeId: "HR3003",
    reportingManager: "Ramesh K",
    workLocation: "Bangalore, Karnataka",
    joiningDate: "June 5, 2019",
    phoneNumber: "+91 99887 66554",
    linkedin: "linkedin.com/in/priyanair",
    department: "Human Resources",
    location: "Bangalore, India",
    profileImage: null,
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
  // Add more HRs if needed
];

// Social Links static definition
const socialLinks = [
  {
    platform: "LinkedIn",
    color: "bg-blue-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
      </svg>
    ),
  },
];

// ------------ APP COMPONENT WITH ROUTER -----------
// ---------------- HR LIST COMPONENT ----------------
function HRList() {
  const [hrs, setHrs] = useState(hrList);
  const navigate = useNavigate();

  // Toggle Status Dropdown Component
  const StatusDropdown = ({ currentStatus, onChange }) => {
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
  };

  // Toggle HR active/inactive status
  const toggleStatus = (hrId, newStatus) => {
    setHrs((prev) =>
      prev.map((hr) => (hr.id === hrId ? { ...hr, status: newStatus } : hr))
    );
  };

  // State for modals to show JD lists and JD details
  const [selectedHr, setSelectedHr] = useState(null);
  const [showJdModal, setShowJdModal] = useState(false);
  const [selectedJd, setSelectedJd] = useState(null);
  const [showJdDetailsModal, setShowJdDetailsModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Company Admin Screen</h1>
      {/* HR Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hrs.map((hr) => (
          <div
            key={hr.id}
            className="bg-white shadow rounded overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b">
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
            <div className="flex flex-1 flex-col justify-end p-4 space-y-2">
              <button
                onClick={() => navigate(`/hr-profile/${hr.id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  setSelectedHr(hr);
                  setShowJdModal(true);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                List of JD {hr.jds.length > 0 && `(${hr.jds.length})`}
              </button>
            </div>
          </div>
        ))}
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

// ---------------- MODAL COMPONENT ------------------
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

// -------------- DETAIL ITEM COMPONENT --------------
function DetailItem({ label, value }) {
  return (
    <div>
      <span className="font-semibold">{label}: </span>
      <span>{value}</span>
    </div>
  );
}

// ---------------- HR PROFILE COMPONENT ---------------
function HRProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hrId = parseInt(id, 10);
  const selectedHR = hrList.find((hr) => hr.id === hrId);

  const [profileImg] = useState(selectedHR?.profileImage || null);

  if (!selectedHR)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-red-600 text-xl mb-4">HR not found.</p>
        <button
          onClick={() => navigate("/hr-list")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Back to HR List
        </button>
      </div>
    );

  const Field = ({ label, value }) => (
    <div>
      <label className="text-xs font-semibold text-gray-500 mb-1 block">{label}</label>
      <input
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#4f46e5] text-sm bg-gray-50 disabled:bg-gray-100"
        value={value}
        disabled
        readOnly
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#4f46e5] flex justify-center p-6">
      <div className="max-w-6xl w-full">
        <button
          className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold"
          onClick={() => navigate("/hr-list")}
        >
          ← Back to HR List
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">HR Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left profile panel */}
          <div className="bg-gray-50 rounded-xl p-6 shadow">
            <div className="relative mb-6 flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full mx-auto bg-indigo-100 border-4 border-[#4f46e5] flex items-center justify-center overflow-hidden relative">
                {profileImg ? (
                  <img src={profileImg} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <User className="w-16 h-16 text-[#4f46e5]" />
                )}
              </div>
            </div>
            <input
              className="text-2xl font-bold mb-1 text-center w-full border border-gray-300 rounded-lg px-3 py-1 text-[#4f46e5] bg-gray-50"
              value={selectedHR.name}
              disabled
              readOnly
            />
            <input
              className="text-indigo-400 text-sm mb-4 text-center w-full border border-gray-300 rounded-lg px-3 py-1 bg-gray-50"
              value={selectedHR.role}
              disabled
              readOnly
            />
            <div className="text-left mt-6">
              <h4 className="text-xs font-semibold text-gray-500 mb-3">Social Media</h4>
              <div className="flex items-center space-x-2">
                <span
                  className={`${socialLinks[0].color} w-9 h-9 rounded-lg flex items-center justify-center text-white ml-0`}
                  aria-label={socialLinks[0].platform}
                >
                  {socialLinks[0].icon}
                </span>
                <span className="ml-2 text-sm text-[#4f46e5]">{selectedHR.linkedin}</span>
              </div>
            </div>
          </div>
          {/* Right info panel */}
          <div className="md:col-span-2 bg-gray-50 rounded-xl p-6 shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <Field label="Name" value={selectedHR.name} />
                <Field label="Designation" value={selectedHR.role} />
                <Field label="Employee ID" value={selectedHR.employeeId} />
                <Field label="Reporting Manager" value={selectedHR.reportingManager} />
                <Field label="Work Location" value={selectedHR.workLocation} />
                <Field label="Joining Date" value={selectedHR.joiningDate} />
              </div>
              <div className="space-y-5">
                <Field label="Email" value={selectedHR.email} />
                <Field label="Phone Number" value={selectedHR.phoneNumber} />
                <Field label="LinkedIn" value={selectedHR.linkedin} />
                <Field label="Department" value={selectedHR.department} />
                <Field label="Location" value={selectedHR.location} />
                <Field label="Experience (yrs)" value={selectedHR.experience} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HRList, HRProfilePage}
