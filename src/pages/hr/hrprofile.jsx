import React, { useState } from "react";
import { User } from "lucide-react";

// Dummy HR Data
const hrList = [
  {
    id: 1,
    name: "Anjali Rao",
    email: "anjali.rao@example.com",
    experience: 5,
    role: "Lead Recruiter",
    employeeId: "HR1001",
    reportingManager: "Ramesh K",
    workLocation: "Mumbai, Maharashtra",
    joiningDate: "March 10, 2020",
    phoneNumber: "+91 91234 56789",
    linkedin: "linkedin.com/in/anjalirao",
    department: "Human Resources",
    location: "Mumbai, India",
    profileImage: null,
  },
  {
    id: 2,
    name: "Rajat Singh",
    email: "rajat.singh@example.com",
    experience: 3,
    role: "HR Associate",
    employeeId: "HR2002",
    reportingManager: "Meera Joshi",
    workLocation: "Chennai, Tamil Nadu",
    joiningDate: "July 5, 2021",
    phoneNumber: "+91 98765 43210",
    linkedin: "linkedin.com/in/rajatsingh",
    department: "Human Resources",
    location: "Chennai, India",
    profileImage: null,
  },
  {
    id: 3,
    name: "Priya Nair",
    email: "priya.nair@example.com",
    experience: 7,
    role: "HR Manager",
    employeeId: "HR3003",
    reportingManager: "Ramesh K",
    workLocation: "Bangalore, Karnataka",
    joiningDate: "June 5, 2019",
    phoneNumber: "+91 99887 66554",
    linkedin: "linkedin.com/in/priyanair",
    department: "Human Resources",
    location: "Bangalore, India",
    profileImage: null,
  },
  // Add more HRs as needed
];

const socialLinks = [
  {
    platform: "LinkedIn",
    color: "bg-blue-700",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-5 h-5"
        viewBox="0 0 24 24"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
      </svg>
    ),
  },
];

const HRProfilePage = ({ selectedHRId = 3 }) => {
  const selectedHR = hrList.find((hr) => hr.id === selectedHRId) || hrList[0];
  const [profileImg] = useState(selectedHR.profileImage);

  // Reusable field
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
        <h2 className="text-3xl font-bold mb-6 text-center">HR Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left profile card */}
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
            {/* Social Media section, left-aligned, no link */}
            <div className="text-left mt-6">
              <h4 className="text-xs font-semibold text-gray-500 mb-3">Social Media</h4>
              <div className="flex items-center space-x-2">
                <span
                  className={`${socialLinks[0].color} w-9 h-9 rounded-lg flex items-center justify-center text-white ml-0`}
                  aria-label={socialLinks[0].platform}
                >
                  {socialLinks[0].icon}
                </span>
                <span className="ml-2 text-sm text-[#4f46e5]">
                  {selectedHR.linkedin}
                </span>
              </div>
            </div>
          </div>
          {/* Right info card */}
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
};

export default HRProfilePage;
