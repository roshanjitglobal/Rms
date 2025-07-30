import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ role: '', email: '', password: '' });
  const [errors, setErrors] = React.useState({ role: '', email: '', password: '' });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let tempErrors = { role: '', email: '', password: '' };

    if (!form.email) {
      tempErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      tempErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!form.password) {
      tempErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(tempErrors);

    if (valid) {
      // Check for HR login
      if (form.email === 'hr@gmail.com') {
        if (form.password === 'password123') {
             localStorage.setItem('userRole', 'HR');
          navigate('/hrdashboard');
          return;
        } else {
          setErrors({
            ...tempErrors,
            password: 'Invalid password'
          });
          return;
        }
      }
      // Check for company admin login (for backward compatibility)
      if (form.email === 'company@gmail.com' && form.password === 'password123') {
        localStorage.setItem('userRole', 'companyAdmin');
        navigate('/hr-dashboard');
        return;
      }

      // Check for candidate login
      if (form.email === 'candidate@gmail.com' && form.password === 'password123') {
           localStorage.setItem('userRole', 'candidate');
        navigate('/candidate/dashboard');
        return;
      }
      // Check for superadmin login
      if (form.email === 'superadmin@gmail.com' && form.password === 'password123') {
           localStorage.setItem('userRole', 'SuperAdmin');
        navigate('/super-admin');
        return;
      }
      // If we get here, credentials are invalid
      setErrors({
        ...tempErrors,
        email: form.email.includes('@') ? 'Invalid credentials' : 'Invalid email',
        password: 'Invalid password'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="absolute bottom-0 w-full h-[60%] bg-[#181ed4] rounded-t-[20%] z-0"></div>

      <form className="z-10 w-full max-w-md bg-white shadow-2xl rounded-2xl p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-[#181ed4] mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-left ml-1">Email</label>
          <div className="flex items-start justify-start border border-gray-300 rounded-lg px-3">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full py-2 outline-none"
            />
          </div>
          {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-left ml-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full py-2 outline-none pr-10"
            />
            <button
              type="button"
              className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <span className="text-red-500 text-sm ml-1">{errors.password}</span>}
        </div>

        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center text-gray-600">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <Link to="/forgot" className="text-[#181ed4] hover:underline">Forgot password?</Link>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#181ed4] text-white py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Sign in
        </button>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account?</span>{' '}
          <Link to="/candidate-register" className="text-[#181ed4] font-medium hover:underline">
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;