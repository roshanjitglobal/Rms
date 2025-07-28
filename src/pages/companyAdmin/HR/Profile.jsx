import React, { useState, useRef } from 'react';
import { Building2, Camera } from 'lucide-react';

const Profile = ({ isSidebarOpen, toggleSidebar }) => {
  const [profileImg, setProfileImg] = useState(null);
  const formRef = useRef(null);
  const socialLinks = [
    {
      platform: 'LinkedIn',
      color: 'bg-blue-700',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
        </svg>
      )
    }
  ];

  // Helper to keep inputs disabled (no edit mode)
  const setInputsDisabled = (disabled) => {
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll('input');
      inputs.forEach((input) => (input.disabled = disabled));
    }
  };

  React.useEffect(() => {
    setInputsDisabled(true); // Inputs remain disabled
  }, []);

  return (
    <div className="flex-1 p-2 sm:p-4" ref={formRef}>
      {/* Mobile sidebar toggle button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-indigo-600 text-white shadow-lg"
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Company Profile</h2>
          <p className="text-gray-500 text-sm sm:text-base">View and manage your company information.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 text-center shadow">
            <div className="relative mb-4 flex flex-col items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto bg-indigo-100 border-4 border-[#4f46e5] flex items-center justify-center overflow-hidden relative">
                {profileImg ? (
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-[#4f46e5]" />
                )}
              </div>
            </div>
            <input
              type="text"
              className="text-xl sm:text-2xl font-bold mb-1 text-center w-full border border-gray-300 rounded-lg px-2 py-1 text-[#4f46e5] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              defaultValue="TechHire Solutions"
              disabled
            />
            <input
              type="text"
              className="text-indigo-400 text-xs sm:text-sm mb-4 text-center w-full border border-gray-300 rounded-lg px-2 py-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              defaultValue="IT Services and Consulting"
              disabled
            />
            <div className="space-y-4 text-left">
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">Social Media</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <button
                      key={index}
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${social.color} rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity`}
                      aria-label={social.platform}
                    >
                      <span className="text-white">{social.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:jusify-between mb-4 sm:mb-6 gap-2">
              <h3 className="text-lg sm:text-xl font-bold">Company Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Company Name</h4>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#4f46e5] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" defaultValue="TechHire Solutions" disabled />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Industry</h4>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#4f46e5] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" defaultValue="Information Technology" disabled />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Company Type</h4>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#4f46e5] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" defaultValue="Private Limited" disabled />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Founded Year</h4>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#4f46e5] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" defaultValue="2015" disabled />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Employee Size</h4>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#4f46e5] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" defaultValue="51–200" disabled />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Company Email</h4>
                  <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#4f46e5] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" defaultValue="info@techhire.com" disabled />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Phone Number</h4>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#4f46e5] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" defaultValue="+91 98765 12345" disabled />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Website</h4>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#4f46e5] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" defaultValue="www.techhire.com" disabled />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Location</h4>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#4f46e5] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" defaultValue="Bangalore, India" disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;