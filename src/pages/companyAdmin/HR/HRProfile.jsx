import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Briefcase, MapPin, Calendar, Users, Link as LinkIcon } from 'lucide-react';

const HRProfile = () => {
  // Sample HR data - in a real app, this would come from an API or context
  const hrData = {
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
    status: "Active"
  };

  const [formData, setFormData] = useState(hrData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, you would make an API call here to save the data
    console.log('Saving HR profile:', formData);
    setIsEditing(false);
  };

  // Reusable field component
  const Field = ({ label, name, value, icon: Icon, type = 'text' }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`block w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">HR Profile</h3>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setFormData(hrData); // Reset form
                    setIsEditing(false);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Picture and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt={formData.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-24 w-24 text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <div className="absolute bottom-4 right-4">
                    <label className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                      <input type="file" className="hidden" accept="image/*" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{formData.name}</h2>
                <p className="text-sm text-gray-500">{formData.role}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{formData.department}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{formData.location}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">SOCIAL MEDIA</h4>
                  <div className="flex space-x-2">
                    <a
                      href={`https://${formData.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zM4.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  icon={User}
                />
                <Field
                  label="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
                  icon={Briefcase}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  icon={Mail}
                />
                <Field
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  icon={Phone}
                />
                <Field
                  label="Role"
                  name="role"
                  value={formData.role}
                  icon={Briefcase}
                />
                <Field
                  label="Department"
                  name="department"
                  value={formData.department}
                  icon={Users}
                />
                <Field
                  label="Reporting Manager"
                  name="reportingManager"
                  value={formData.reportingManager}
                  icon={User}
                />
                <Field
                  label="Work Location"
                  name="workLocation"
                  value={formData.workLocation}
                  icon={MapPin}
                />
                <Field
                  label="Joining Date"
                  name="joiningDate"
                  type={isEditing ? 'date' : 'text'}
                  value={formData.joiningDate}
                  icon={Calendar}
                />
                <Field
                  label="LinkedIn Profile"
                  name="linkedin"
                  value={formData.linkedin}
                  icon={LinkIcon}
                />
                <div className="md:col-span-2">
                  <Field
                    label="Address"
                    name="location"
                    value={formData.location}
                    icon={MapPin}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(hrData); // Reset form
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProfile;
