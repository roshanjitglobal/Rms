import React, { useState } from "react";
import { Mail, Phone, Briefcase, UserCheck, FileText } from "lucide-react";
import clsx from "clsx";

// Your HR_JDS stays the same as in your last code…

const HR_JDS = [
  // ...[your JD objects per HR, as before]
];

// Update your HR list:
const hrList = [
  { id: 1, name: "Riya Sharma", email: "riya.hr@jitglobal.com", phone: "9876543210", department: "Engineering" },
  { id: 2, name: "Aarthi Raj", email: "aarthi.hr@jitglobal.com", phone: "9876543211", department: "Operations" },
  { id: 3, name: "Meena Das", email: "meena.hr@jitglobal.com", phone: "9876543212", department: "Product Hiring" },
  { id: 4, name: "Shalini K", email: "shalini.hr@jitglobal.com", phone: "9876543213", department: "QA Team" },
  { id: 5, name: "Deepa V", email: "deepa.hr@jitglobal.com", phone: "9876543214", department: "Tech Support" },
  { id: 6, name: "Anusha M", email: "anusha.hr@jitglobal.com", phone: "9876543215", department: "Cloud Team" },
].map((hr, idx) => ({ ...hr, jds: HR_JDS[idx] }));

const statusStyles = {
  Active: "bg-green-200 text-green-800 border-green-400",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-400",
  Inactive: "bg-red-100 text-red-600 border-red-300",
};

export default function ManageHR() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [expandedJD, setExpandedJD] = useState(null);

  const selectedHR = hrList[selectedIdx];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-10">
      <div className="container mx-auto flex gap-8 lg:gap-12 px-4">
        {/* HR List */}
        <aside className="w-1/4 min-w-[230px]">
          <h2 className="font-bold text-xl mb-4 text-[color:#4f46e5] flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            HR People
          </h2>
          <ul className="space-y-3">
            {hrList.map((hr, i) => (
              <li
                key={hr.id}
                className={clsx(
                  "transition-all rounded-xl bg-white p-3 cursor-pointer flex items-center gap-4 border shadow hover:bg-blue-50",
                  selectedIdx === i
                    ? "shadow-xl border-blue-600 ring-2 ring-blue-200 scale-[1.03]"
                    : "border-gray-200"
                )}
                onClick={() => { setSelectedIdx(i); setExpandedJD(null); }}
              >
                <div>
                  <div className="font-semibold text-blue-900">
                    {hr.name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {hr.email}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                    {hr.phone}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    {hr.department}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        {/* JD Panel */}
        <main className="flex-1 bg-white/90 p-8 rounded-3xl shadow-xl border border-blue-100">
          <header className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-2">
            <div>
              <h1 className="text-2xl font-bold text-[color:#4f46e5]">
                <FileText className="inline-block w-6 h-6 mb-1 mr-1 text-blue-400" />
                JDs by {selectedHR.name}
              </h1>
              <div className="text-sm mt-1 text-gray-700 flex gap-4">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {selectedHR.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {selectedHR.phone}
                </span>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-400">
                Total JDs: <span className="font-bold text-blue-600">{selectedHR.jds.length}</span>
              </span>
            </div>
          </header>
          <ul className={clsx("grid gap-6", selectedHR.jds.length < 4 ? "sm:grid-cols-1" : "sm:grid-cols-2", "lg:grid-cols-2")}>
            {selectedHR.jds.map((jd) => {
              const isOpen = expandedJD === jd.id;
              return (
                <li key={jd.id} className="relative overflow-hidden rounded-xl border-l-4 border-[color:#4f46e5] bg-gradient-to-r from-blue-100 via-white to-white shadow transition-all hover:bg-blue-50">
                  <div className="p-5 flex flex-col h-full">
                    <div className="font-semibold text-blue-900 text-lg mb-2">{jd.title}</div>
                    <div className="flex gap-2 flex-wrap items-center text-xs my-2">
                      <span className={clsx(
                        "px-2.5 py-0.5 rounded-full border font-bold flex items-center gap-1",
                        statusStyles[jd.status])}
                      >
                        <FileText className="w-4 h-4" />
                        {jd.status}
                      </span>
                      <span className="bg-blue-100 px-2 py-0.5 rounded-full text-blue-700 font-medium flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" />
                        {jd.resumes} Resumes
                      </span>
                      <span className="bg-blue-50 px-2 py-0.5 rounded-full text-blue-800 font-medium flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        {jd.interviews} Interview{jd.interviews > 1 ? "s" : ""}
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-full text-blue-600 border border-blue-100 font-medium flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" />
                        {jd.position} Position{jd.position > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="my-3 text-gray-700 text-sm flex-1">
                      {isOpen
                        ? jd.description
                        : jd.description.length > 100
                          ? jd.description.slice(0, 100) + "..."
                          : jd.description
                      }
                    </div>
                    <button
                      className="ml-auto mt-2 text-[color:#4f46e5] underline hover:text-blue-900 transition text-xs font-semibold"
                      onClick={() => setExpandedJD(isOpen ? null : jd.id)}
                    >
                      {isOpen ? "Show less" : "Show more"}
                    </button>
                  </div>
                </li>
              );
            })}
            {selectedHR.jds.length === 0 && (
              <div className="col-span-full text-lg text-blue-600 bg-blue-50 rounded-lg p-8 flex items-center justify-center">
                No JD posted yet
              </div>
            )}
          </ul>
        </main>
      </div>
    </div>
  );
}
