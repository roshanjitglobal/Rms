// import React from 'react';
// export default function Application() {
//     return (
//         <div>
//             <h1>Application</h1>
//         </div>
//     );
// }
// import React, { useState } from "react";

// const applicationsData = [
//   {
//     company: "TechNova",
//     profile: "Frontend Developer",
//     dateApplied: "2025-07-12",
//   },
//   {
//     company: "BlueSky Solutions",
//     profile: "Backend Engineer",
//     dateApplied: "2025-07-20",
//   },
//   // Add more sample data as needed
// ];

// function MyApplications() {
//   const [search, setSearch] = useState("");

//   const filteredApplications = applicationsData.filter(app =>
//     app.company.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-blue-50 py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
//           My Applications
//         </h1>
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Search by company name..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//           />
//         </div>
//         <div className="bg-white rounded-lg shadow-md">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-blue-600 text-white">
//                 <th className="py-3 px-4">Company</th>
//                 <th className="py-3 px-4">Profile</th>
//                 <th className="py-3 px-4">Date Applied</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredApplications.length === 0 ? (
//                 <tr>
//                   <td colSpan="3" className="py-6 px-4 text-center text-blue-500">
//                     No applications found.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredApplications.map((app, idx) => (
//                   <tr key={idx} className="border-t">
//                     <td className="py-3 px-4">{app.company}</td>
//                     <td className="py-3 px-4">{app.profile}</td>
//                     <td className="py-3 px-4">{app.dateApplied}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyApplications;
import React, { useState } from "react";

const applicationsData = [
  {
    company: "TechNova",
    profile: "Frontend Developer",
    dateApplied: "2025-07-12",
    companyLogo: "https://logo.clearbit.com/technova.com", // Example logo URL
  },
  {
    company: "BlueSky Solutions",
    profile: "Backend Engineer",
    dateApplied: "2025-07-20",
    companyLogo: "https://logo.clearbit.com/blueskysolutions.com", // Example logo URL
  },
  // Add more sample data as needed
];

function MyApplications() {
  const [search, setSearch] = useState("");

  const filteredApplications = applicationsData.filter(app =>
    app.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          My Applications
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by company name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Profile</th>
                <th className="py-3 px-4">Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-6 px-4 text-center text-blue-500">
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <img
                        src={app.companyLogo}
                        alt={app.company + " logo"}
                        className="w-8 h-8 rounded-full object-cover bg-blue-100 border"
                      />
                      {app.company}
                    </td>
                    <td className="py-3 px-4">{app.profile}</td>
                    <td className="py-3 px-4">{app.dateApplied}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyApplications;
