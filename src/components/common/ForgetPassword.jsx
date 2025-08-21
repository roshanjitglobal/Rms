import React, { useState } from 'react';
import Header from '../../pages/common/Header.jsx';
import Footer from '../../pages/common/Footer.jsx'; 
import '../../index.css';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    alert(`Reset link sent to ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4f46e5] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#4f46e5] text-center mb-6">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email address to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full mt-6 bg-[#4f46e5] text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/login" className="text-[#4f46e5] text-sm hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
