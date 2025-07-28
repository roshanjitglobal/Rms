import React from 'react';
import Header from '../../pages/common/Header.jsx';
import Footer from '../../pages/common/Footer.jsx';
import '../../index.css';
import feedbackBg from '../../assets/5138237.jpg';
import logo from '../../assets/logo_RMS.png';

const SupportForm = () => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    role: '',
    issue: '',
    description: ''
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.email.trim()) newErrors.email = 'Please enter your email.';
    if (!form.role.trim()) newErrors.role = 'Please select your role.';
    if (!form.issue.trim()) newErrors.issue = 'Please select the issue type.';
    if (!form.description.trim()) newErrors.description = 'Please describe the issue.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert(`Name: ${form.name}\nEmail: ${form.email}\nRole: ${form.role}\nIssue: ${form.issue}\nDescription: ${form.description}`);
    }
  };

  return (
    <>
      <Header />

      {/* Main Section */}
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

        {/* Left: Form */}
        <div className="flex items-center justify-center p-8 bg-white/80">
          <div className="w-full max-w-lg p-4 bg-white rounded-2xl shadow-2xl border border-blue-100">
            <div className="flex items-center justify-center mb-6">
              <img src={logo} alt="RMS Logo" className="w-20 h-20 object-contain rounded-xl shadow-md" />
            </div>
            <h2 className="text-2xl font-semibold text-[#181ed4] text-center mb-6">Support Center</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 text-left">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#181ed4]"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 text-left">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#181ed4]"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 text-left">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#181ed4]"
                >
                  <option value="">Select Role</option>
                  <option value="candidate">Candidate</option>
                  <option value="hr">HR</option>
                  <option value="company-admin">Company Admin</option>
                  <option value="super-admin">Super Admin</option>
                </select>
                {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}
              </div>

              {/* Issue */}
              <div>
                <label className="block text-sm font-medium text-gray-700 text-left">Issue Type</label>
                <select
                  name="issue"
                  value={form.issue}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#181ed4]"
                >
                  <option value="">Select Issue</option>
                  <option value="bug">Bug</option>
                  <option value="feature">Feature Request</option>
                  <option value="access">Access Issue</option>
                  <option value="other">Other</option>
                </select>
                {errors.issue && <span className="text-red-500 text-sm">{errors.issue}</span>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 text-left">Description</label>
                <textarea
                  rows="4"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the issue"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#181ed4]"
                ></textarea>
                {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 bg-[#181ed4] text-white rounded-md hover:bg-blue-800 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Right: Blurred Background Image */}
        <div
          className="hidden md:block bg-cover bg-center "
          style={{
            backgroundImage: `url(${feedbackBg})`,
          }}
        ></div>
      </div>

      <Footer />
    </>
  );
};

export default SupportForm;
