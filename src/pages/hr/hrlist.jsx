import React, { useState } from "react";
import { Briefcase, Mail, Phone, User, FileText, Users } from "lucide-react";
import clsx from "clsx";

// Example JDs (different for each HR)
const HR_JDS = [
  [
    {
      id: 1,
      title: "React Frontend Ninja 🚀",
      status: "Active",
      resumes: 12,
      interviews: 3,
      position: 1,
      description: "Craft delightful UIs with ReactJS! Build scalable web apps and collaborate with passionate devs. Experience in component libraries a plus.",
    },
    {
      id: 2,
      title: "Python Backend Guru 🐍",
      status: "Pending",
      resumes: 7,
      interviews: 1,
      position: 2,
      description: "Design robust APIs in Django/Flask. REST, database optimization and microservices experience highly desired.",
    },
    {
      id: 3,
      title: "Cloud DevOps Engineer ☁️",
      status: "Inactive",
      resumes: 5,
      interviews: 0,
      position: 1,
      description: "Bring infra to the cloud! Work on AWS & CI/CD pipelines. Prior experience in automation and Terraform preferred.",
    },
  ],
  [
    {
      id: 4,
      title: "UI/UX Designer 🎨",
      status: "Active",
      resumes: 15,
      interviews: 5,
      position: 1,
      description: "Ideate, prototype, and delight! Figma & modern design required. Attention to accessibility & pixel-perfect style.",
    },
    {
      id: 5,
      title: "Operations Analyst 📈",
      status: "Active",
      resumes: 8,
      interviews: 2,
      position: 1,
      description: "Optimize processes, analyze metrics, and automate workflows. Excel skills a must! SaaS ops is a bonus.",
    },
    {
      id: 6,
      title: "People Partner 🤝",
      status: "Pending",
      resumes: 6,
      interviews: 1,
      position: 2,
      description: "Engage team members, organize team-building events, and assist in onboarding. Outgoing & detail-oriented talent wanted!",
    },
    {
      id: 7,
      title: "QA Automation Tester 🧪",
      status: "Active",
      resumes: 9,
      interviews: 1,
      position: 1,
      description: "Write E2E Selenium tests, maintain CI/CD test pipelines, and shake out the bugs!",
    },
    {
      id: 8,
      title: "Data Engineer 🛢️",
      status: "Inactive",
      resumes: 3,
      interviews: 0,
      position: 1,
      description: "ETL pipelines, cloud data warehouses and Python. Solve big data challenges and drive analytics.",
    },
  ],
  [
    {
      id: 9,
      title: "Product Manager 🧑‍💼",
      status: "Active",
      resumes: 8,
      interviews: 2,
      position: 1,
      description: "Own product roadmap, prioritize features, interface with dev and design teams to deliver value.",
    },
    {
      id: 10,
      title: "Customer Success Champ 🥇",
      status: "Pending",
      resumes: 2,
      interviews: 1,
      position: 1,
      description: "Delight customers with fast responses and product knowledge. Empathy & communication are key!",
    },
    {
      id: 11,
      title: "Mobile App Developer 📱",
      status: "Active",
      resumes: 7,
      interviews: 2,
      position: 2,
      description: "React Native + Flutter skills, beautiful UI, and publishing to stores.",
    },
    {
      id: 12,
      title: "Content Writer ✍️",
      status: "Active",
      resumes: 10,
      interviews: 2,
      position: 1,
      description: "Craft blog posts, tutorials, and crisp product copy. SEO skills a plus!",
    },
  ],
  [
    {
      id: 13,
      title: "QA Team Lead 🦸‍♀️",
      status: "Active",
      resumes: 11,
      interviews: 3,
      position: 1,
      description: "Lead a crew of testers, define QA processes, and drive automation strategy. Passion for quality required.",
    },
    {
      id: 14,
      title: "Automation Engineer 🤖",
      status: "Pending",
      resumes: 4,
      interviews: 1,
      position: 2,
      description: "Automate development and release, write scripts, and optimize workflows.",
    },
    {
      id: 15,
      title: "Junior QA Tester 🐞",
      status: "Inactive",
      resumes: 2,
      interviews: 0,
      position: 1,
      description: "Manual testing, bug reporting, and product insight. Get started in QA!",
    },
  ],
  [
    {
      id: 16,
      title: "Tech Support Evangelist 💡",
      status: "Pending",
      resumes: 5,
      interviews: 1,
      position: 3,
      description: "Troubleshoot client queries, offer friendly solutions, and document help center articles.",
    },
    {
      id: 17,
      title: "NOC Engineer 🔧",
      status: "Active",
      resumes: 6,
      interviews: 2,
      position: 1,
      description: "Monitor systems, solve incidents, unite with sysadmins. Rotating shifts.",
    },
  ],
  [
    {
      id: 18,
      title: "Cloud Architect ☁️",
      status: "Active",
      resumes: 4,
      interviews: 1,
      position: 1,
      description: "Design resilient cloud architectures in AWS/Azure, coach the team, and model security best practices.",
    },
    {
      id: 19,
      title: "SecOps Specialist 🛡️",
      status: "Inactive",
      resumes: 3,
      interviews: 0,
      position: 1,
      description: "Enforce InfoSec, monitor, and remediate vulnerabilities. DevSecOps skill is preferred.",
    },
    {
      id: 20,
      title: "Cloud Support Rookie 🌤️",
      status: "Pending",
      resumes: 2,
      interviews: 1,
      position: 1,
      description: "Support simple cloud queries, triage tickets, and escalate smartly. Freshers welcome!",
    },
    {
      id: 21,
      title: "DevOps Intern 🎓",
      status: "Active",
      resumes: 8,
      interviews: 1,
      position: 1,
      description: "Learn on the job, help automate deployments and write neat documentation.",
    },
  ],
];

const hrList = [
  { id: 1, name: "Riya Sharma", email: "riya.hr@jitglobal.com", phone: "9876543210", department: "Engineering", emoji: "💡" },
  { id: 2, name: "Aarthi Raj", email: "aarthi.hr@jitglobal.com", phone: "9876543211", department: "Operations", emoji: "🎯" },
  { id: 3, name: "Meena Das", email: "meena.hr@jitglobal.com", phone: "9876543212", department: "Product Hiring", emoji: "📦" },
  { id: 4, name: "Shalini K", email: "shalini.hr@jitglobal.com", phone: "9876543213", department: "QA Team", emoji: "🧪" },
  { id: 5, name: "Deepa V", email: "deepa.hr@jitglobal.com", phone: "9876543214", department: "Tech Support", emoji: "🔧" },
  { id: 6, name: "Anusha M", email: "anusha.hr@jitglobal.com", phone: "9876543215", department: "Cloud Team", emoji: "☁️" },
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
          <h2 className="font-bold text-xl mb-4 text-[color:#4f46e5] flex items-center gap-2"><Users size={20}/> HR People</h2>
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
                <span className="text-2xl">{hr.emoji}</span>
                <div>
                  <div className="font-semibold text-blue-900 flex items-center gap-1">
                    <User size={16} className="inline text-blue-400" />
                    {hr.name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Mail size={13} className="text-gray-400" />
                    {hr.email}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Briefcase size={13} className="text-gray-400" />
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
              <h1 className="text-2xl font-bold text-[color:#4f46e5] flex items-center gap-3">
                {selectedHR.emoji} JDs by {selectedHR.name}
              </h1>
              <div className="text-sm mt-1 text-gray-700 flex gap-4">
                <span className="flex items-center gap-1"><Mail size={14} />{selectedHR.email}</span>
                <span className="flex items-center gap-1"><Phone size={14} />{selectedHR.phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Total JDs: <span className="font-bold text-blue-600">{selectedHR.jds.length}</span></span>
            </div>
          </header>

          <ul className={clsx("grid gap-6", selectedHR.jds.length < 4 ? "sm:grid-cols-1" : "sm:grid-cols-2", "lg:grid-cols-2")}>
            {selectedHR.jds.map((jd) => {
              const isOpen = expandedJD === jd.id;
              return (
                <li key={jd.id} className="relative overflow-hidden rounded-xl border-l-4 border-[color:#4f46e5] bg-gradient-to-r from-blue-100 via-white to-white shadow transition-all hover:bg-blue-50">
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex gap-2 items-center mb-2">
                      <span className="text-xl">
                        <FileText size={22} className="inline text-blue-400" />
                      </span>
                      <span className="font-semibold text-blue-900 text-lg">{jd.title}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center text-xs my-2">
                      <span className={clsx(
                        "px-2.5 py-0.5 rounded-full border font-bold flex items-center gap-1",
                        statusStyles[jd.status])}
                      >{jd.status}</span>
                      <span className="bg-blue-100 px-2 py-0.5 rounded-full text-blue-700 font-medium flex items-center gap-1">
                        📩 {jd.resumes} Resumes
                      </span>
                      <span className="bg-blue-50 px-2 py-0.5 rounded-full text-blue-800 font-medium flex items-center gap-1">
                        🎤 {jd.interviews} Interview{jd.interviews > 1 ? "s" : ""}
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-full text-blue-600 border border-blue-100 font-medium flex items-center gap-1">
                        👥 {jd.position} Position{jd.position > 1 ? "s" : ""}
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
                      className="ml-auto mt-2 text-[color:#4f46e5] underline flex items-center gap-1 hover:text-blue-900 transition text-xs font-semibold"
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
                No JD posted yet 🎈
              </div>
            )}
          </ul>
        </main>
      </div>
    </div>
  );
}
