import React, { useState } from 'react';
import Header from '../../pages/common/Header.jsx';
import Footer from '../../pages/common/Footer.jsx';
import '../../index.css';
import candidateImg from '../../assets/choosing-best-candidate-concept/4151017.jpg';
const roles = ['Super Admin', 'Sub-admin', 'Company Admin', 'HR', 'Candidate'];
const sizes = ['Small', 'Medium', 'Large'];

const CompanyRegister = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    location: '',
    contact: '',
    companySize: '',
    govtRegNumber: '',
    role: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = 'Please fill the company name.';
    if (!formData.email.trim()) newErrors.email = 'Please fill the email.';
    if (!formData.password.trim()) newErrors.password = 'Please fill the password.';
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Please fill the confirm password.';
    if (!formData.website.trim()) newErrors.website = 'Please fill the company website.';
    if (!formData.location.trim()) newErrors.location = 'Please fill the company location.';
    if (!formData.contact.trim()) newErrors.contact = 'Please fill the contact number.';
    if (!formData.companySize.trim()) newErrors.companySize = 'Please select the company size.';
    if (!formData.govtRegNumber.trim()) newErrors.govtRegNumber = 'Please fill the Govt. Register Number.';
    if (!formData.role.trim()) newErrors.role = 'Please select the role.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(formData);
    }
  };


  return (
    <>
      <Header />
      <div className="min-h-screen flex">
      {/* Left form side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white rounded-r-3xl shadow-lg">
   
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#4f46e5' }}>Hello,</h1>
        <p className="text-gray-600 mb-6">Let’s get your company onboard</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4f46e5]"
            required
          />
          {errors.companyName && <span className="text-red-500 text-sm ml-1">{errors.companyName}</span>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4f46e5]"
            required
          />
          {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email}</span>}
          <div className="flex gap-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4f46e5]"
              required
            />
            {errors.password && <span className="text-red-500 text-sm ml-1">{errors.password}</span>}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4f46e5]"
              required
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm ml-1">{errors.confirmPassword}</span>}
          </div>
          <input
            type="text"
            name="website"
            placeholder="Company Website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4f46e5]"
            required
          />
          {errors.website && <span className="text-red-500 text-sm ml-1">{errors.website}</span>}
          <input
            type="text"
            name="location"
            placeholder="Company Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4f46e5]"
            required
          />
          {errors.location && <span className="text-red-500 text-sm ml-1">{errors.location}</span>}
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4f46e5]"
            required
          />
          {errors.contact && <span className="text-red-500 text-sm ml-1">{errors.contact}</span>}
          <div className="flex gap-4">
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4f46e5]"
              required
            >
              <option value="">Company Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            {errors.companySize && <span className="text-red-500 text-sm ml-1">{errors.companySize}</span>}
            <input
              type="text"
              name="govtRegNumber"
              placeholder="Govt. Register Number"
              value={formData.govtRegNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#4f46e5]"
              required
            />
            {errors.govtRegNumber && <span className="text-red-500 text-sm ml-1">{errors.govtRegNumber}</span>}
          </div>
          <div className="flex flex-col w-full max-w-xs">
  <label htmlFor="role" className="mb-1 font-medium">Role</label>
  <select
    name="role"
    id="role"
    value={formData.role}
    onChange={handleChange}
    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#4f46e5] w-"
    required
  >
    <option value="">Select your role</option>
    <option value="Super Admin">Super Admin</option>
    <option value="Sub-super Admin">Sub-super Admin</option>
    <option value="Company Admin">Company Admin</option>
    <option value="HR">HR</option>
    <option value="Candidate">Candidate</option>
  </select>
</div>

          {errors.role && <span className="text-red-500 text-sm ml-1">{errors.role}</span>}

          <button
            type="submit"
            className="w-full bg-[#4f46e5] hover:bg-[#3730a3] text-white font-bold py-2 rounded-md transition"
          >
            Create Account
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already registered?
              <a href="/login" className="ml-1 text-[#4f46e5] font-medium hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>


      {/* Right illustration side - Video */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#4f46e5] rounded-l-2xl">
        <img
          src={candidateImg}
          alt="Choosing Best Candidate"
          className="w-full h-full object-cover rounded-l-3xl"
        />
      </div>
      </div>
      <Footer />
    </>
  );
};

export default CompanyRegister;
