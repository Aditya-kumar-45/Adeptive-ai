// LoginModal.jsx
import React, { useState } from "react";
import { X, Mail, User, LogIn, UserPlus, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom"; 


const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();  
  const [role, setRole] = useState('student');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    identifier: "",
    name: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData({
      ...formData,
      identifier: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validation
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match!");
      }

      // Prepare data based on role and mode
      let endpoint, body;
      
      if (isLogin) {
        endpoint = 'http://127.0.0.1:8000/api/login';  // ✅ CHANGED HERE
        body = {
          role: role,
          identifier: formData.identifier,
          password: formData.password
        };
      } else {
        endpoint = 'http://127.0.0.1:8000/api/register'; // Note: using /register not /signup
        body = {
          role: role,
          name: formData.name,
          password: formData.password
        };
        
        if (role === 'student') {
          body.studentId = formData.identifier;
        } else {
          body.email = formData.identifier;
        }
      }

      console.log("Sending to backend:", body);
      console.log("Endpoint:", endpoint);

      // Make API call
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

     // Store token and user data
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
      }
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', data.user.role);

      // Call success callback
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }

      // Reset form and close modal
      setFormData({ identifier: "", name: "", password: "", confirmPassword: "" });
      onClose();

      // ✅ ADD THIS LINE - Navigate to dashboard
      navigate('/StudentDashboard');

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-1">
            {isLogin 
              ? `Sign in as ${role === 'student' ? 'Student' : 'Teacher'}` 
              : `Register as ${role === 'student' ? 'Student' : 'Teacher'}`}
          </p>
          
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Role Toggle */}
          <div className="flex mb-2 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
            <button 
              type="button"
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                role === 'student' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => handleRoleChange('student')}
            >
              <GraduationCap size={18} />
              <span>Student</span>
            </button>
            
            <button 
              type="button"
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                role === 'teacher' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => handleRoleChange('teacher')}
            >
              <span>👨‍🏫</span>
              <span>Teacher</span>
            </button>
          </div>

          {/* Dynamic Identifier Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {role === 'student' ? 'Student ID' : 'Email Address'}
            </label>
            <div className="relative">
              {role === 'student' ? (
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              ) : (
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              )}
              <input
                type={role === 'teacher' ? 'email' : 'text'}
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder={role === 'student' ? 'e.g., STU2024001' : 'teacher@example.com'}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                required
              />
            </div>
          </div>

          {/* Name field - only for Signup */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>

          {/* Confirm Password - only for Signup */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                {isLogin 
                  ? `Login as ${role === 'student' ? 'Student' : 'Teacher'}` 
                  : `Register as ${role === 'student' ? 'Student' : 'Teacher'}`}
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="p-6 pt-0 text-center border-t border-gray-200 dark:border-slate-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Lock Icon Component
const Lock = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export default LoginModal;