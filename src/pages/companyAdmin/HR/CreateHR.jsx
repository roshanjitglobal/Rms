import React, { useState } from 'react';
import Footer from '../../common/Footer.jsx';
import Header from '../../common/Header.jsx';
import CreateHRbg from '../../../assets/recruiting-professionals-studying-candidate-profiles.png';
import '../../../index.css';

const HrRegister = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    contact: '',
    company: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', form);
    // Submit logic goes here
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#4f46e5] flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
          {/* Left Side - HR Form */}

          <div className="p-10 bg-white">
            <h3 className="text-3xl font-bold text-[#4f46e5] text-center mb-6">HR Register</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-[#4f46e5]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-[#4f46e5]"
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={form.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-[#4f46e5]"
                required
              />
              
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-[#4f46e5]"
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={form.company}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-[#4f46e5]"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-[#4f46e5]"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#4f46e5] text-white py-2 rounded-lg hover:bg-[#3b34b2] transition duration-300"
              >
                Register
              </button>
            </form>
          </div>

          {/* Right Side - Background Image */}
          <div
            className="hidden md:block bg-cover bg-right"
            style={{
              backgroundImage: `url(${CreateHRbg})`,
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HrRegister;
