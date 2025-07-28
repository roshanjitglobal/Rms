import React, { useState, useRef, useEffect } from "react";
import Header from '../../pages/common/Header.jsx';
import Footer from '../../pages/common/Footer.jsx';
import interviewImg from '../../assets/choosing-best-candidate-concept/4151017.jpg';
const RolePicker = ({ value, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef(null);

  const handleSelect = (role) => {
    onChange(role);
    setShowOptions(false);
  };

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4 w-full relative" ref={wrapperRef}>
      <label className="block text-gray-700 font-medium mb-2">Role</label>

      {/* Input-like clickable div */}
      <div
        onClick={() => setShowOptions(!showOptions)}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg cursor-pointer bg-white"
      >
        {value || "Select your role"}
      </div>

      {/* Dropdown options box */}
      {showOptions && (
        <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md">
          {[ "I am a Recruiter", "I am a Candidate"].map((role) => (
            <div
              key={role}
              onClick={() => handleSelect(role)}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                role === "Candidate" ? "text-blue-700 font-semibold" : ""
              }`}
            >
              {role}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add validation or backend call
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-10">
            {/* Logo */}
            <div className="mb-10">
              <img src={interviewImg} alt="RMS Logo" className="w-8 h-8" />
            </div>

            <h2 className="text-3xl font-bold mb-1 text-[#4f46e5]">Hello,</h2>
            <p className="text-gray-600 mb-8">
              Create your RMS account to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First & Last Name */}
              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg outline-none"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg outline-none"
                  required
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                required
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? (
                    // Eye open SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    // Eye closed SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.055 10.055 0 013.197-4.568M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showConfirm ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.055 10.055 0 013.197-4.568M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Role Picker */}
             <div className="w-full">
  <RolePicker
    value={formData.role}
    onChange={role => setFormData(prev => ({ ...prev, role }))}
  />
</div>

              <button
                type="submit"
                className="w-full bg-[#4f46e5] text-white py-2 rounded-lg hover:bg-[#372ebf] transition duration-300"
              >
                Create account
              </button>
            </form>
            

            {/* Sign in */}
            <p className="text-sm text-center mt-6">
              Already have an account?{" "}
              <a href="#" className="text-[#181ed4] font-medium hover:underline">
                Sign in
              </a>
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:flex items-center justify-center w-1/2 bg-gradient-to-br from-[#d6e4ff] to-[#ffffff]">
            <img
              src={interviewImg}
              alt="Sign Up Character"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
