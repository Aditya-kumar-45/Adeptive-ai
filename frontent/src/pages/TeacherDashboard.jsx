// TeacherDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/Theme';
import { 
  LayoutDashboard, Users, BookOpen, BarChart3, Settings, 
  LogOut, Menu, X, ChevronRight, Bell, Search, 
  GraduationCap, TrendingUp, Award, Clock, FileText,
  HelpCircle, PlusCircle, Edit, Trash2, Eye,
  Download, Upload, PieChart, Calendar, MessageSquare
} from 'lucide-react';

// Import all teacher dashboard sections
import TeacherOverview from '../features/Teacher/TeacherOverview';
import StudentManagement from '../features/Teacher/StudentManagement';
import ContentManagement from '../features/Teacher/ContentManagement';
import QuizManagement from '../features/Teacher/QuizManagement';
import Analytics from '../features/Teacher/Analytics';
import SettingsPage from '../features/Teacher/SettingsPage';
import StudentProgressAnalytics from '../components/StudentProgressAnalytics';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview'); // overview, students, content, quizzes, analytics, settings
  const [teacherData, setTeacherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New student registered", time: "5 min ago", read: false },
    { id: 2, message: "Quiz results available", time: "1 hour ago", read: false },
    { id: 3, message: "Student needs help", time: "2 hours ago", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Get teacher data from localStorage
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    if (!user || role !== 'teacher') {
      navigate('/');
      return;
    }
    
    setTeacherData(JSON.parse(user));
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  const getSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return <TeacherOverview teacherData={teacherData} />;
      case 'students':
        return <StudentManagement />;
      case 'content':
        return <ContentManagement />;
      case 'quizzes':
        return <QuizManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <TeacherOverview teacherData={teacherData} />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      overview: 'Dashboard Overview',
      students: 'Student Management',
      content: 'Learning Content',
      quizzes: 'Quiz Management',
      analytics: 'Performance Analytics',
      settings: 'Settings'
    };
    return titles[activeSection] || 'Teacher Dashboard';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">AI-Learn</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Teacher Portal
            </p>
          </div>

          {/* Teacher Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {teacherData?.name?.charAt(0) || 'T'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{teacherData?.name || 'Teacher'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{teacherData?.email || 'teacher@school.edu'}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
              <button
                onClick={() => {
                  setActiveSection('overview');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === 'overview'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <LayoutDashboard size={20} />
                <span className="font-medium">Dashboard Overview</span>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Management</p>
              
              <button
                onClick={() => {
                  setActiveSection('students');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === 'students'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users size={20} />
                <span className="font-medium">Student Management</span>
              </button>

              <button
                onClick={() => {
                  setActiveSection('content');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === 'content'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <BookOpen size={20} />
                <span className="font-medium">Learning Content</span>
              </button>

              <button
                onClick={() => {
                  setActiveSection('quizzes');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === 'quizzes'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <HelpCircle size={20} />
                <span className="font-medium">Quiz Management</span>
              </button>

              <button
                onClick={() => {
                  setActiveSection('analytics');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === 'analytics'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart3 size={20} />
                <span className="font-medium">Analytics</span>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Settings</p>
              <button
                onClick={() => {
                  setActiveSection('settings');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === 'settings'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Settings size={20} />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-0 min-h-screen">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getSectionTitle()}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Welcome back, {teacherData?.name || 'Teacher'}! Ready to inspire young minds?
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                  <Search size={18} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search students, content..."
                    className="bg-transparent ml-2 text-sm focus:outline-none text-gray-900 dark:text-white"
                  />
                </div>
                
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notif => (
                          <div key={notif.id} className={`p-3 border-b border-gray-100 dark:border-gray-700 ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                            <p className="text-sm text-gray-900 dark:text-white">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8">
          {getSectionContent()}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;