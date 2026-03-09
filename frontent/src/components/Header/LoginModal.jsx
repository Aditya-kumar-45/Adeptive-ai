import React from 'react';
import { X, GraduationCap, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // If the modal is not commanded to be open, render nothing
  if (!isOpen) return null;

  const handleNavigation = (path) => {
    onClose(); // Close the modal first
    navigate(path); // Then navigate to the page
  };

  return (
    // 1. The Backdrop (Clicking this closes the modal)
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        // Only close if they clicked the background, not the modal itself
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 2. The Modal Box */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Select your portal to continue your journey.</p>
          </div>

          <div className="space-y-4">
            {/* Student Option */}
            <button 
              onClick={() => handleNavigation('/student')}
              className="w-full group flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Student Portal</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Access your adaptive learning path</p>
                </div>
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Teacher Option */}
            <button 
              onClick={() => handleNavigation('/teacher')}
              className="w-full group flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Teacher Portal</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Manage students and curriculum</p>
                </div>
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LoginModal;