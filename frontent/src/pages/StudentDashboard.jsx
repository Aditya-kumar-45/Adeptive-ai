// src/features/student/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, BarChart3, Settings, 
  LogOut, Menu, X, GraduationCap, TrendingUp, 
  Award, Clock, Bell, Search, User, HelpCircle,
  ChevronDown, Activity, Calendar, Target, Zap
} from 'lucide-react';

// Import your existing components
import QuizView from '../features/Student/QuizView.jsx';
import ResultView from '../features/Student/ResultView.jsx';
import StudyView from '../features/Student/StudyView.jsx';
import StudentActivityTable from '../components/StudentActivityTable.jsx';
import StudentProgressAnalytics from '../components/StudentProgressAnalytics.jsx';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, study, quiz, result
  const [activeTopic, setActiveTopic] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock student data (replace with actual data from API)
  const [studentInfo, setStudentInfo] = useState({
    name: "Aditya",
    email: "aditya@example.com",
    currentLevel: "Intermediate",
    xp: 2450,
    streakDays: 7,
    weakTopics: ["Recursion", "Dynamic Programming"],
    strongTopics: ["Variables", "Loops"]
  });

  // Mock quiz results
  const [quizResults, setQuizResults] = useState([
    { id: 1, topic: "Python Basics", score: 8, total_questions: 10, difficulty: "easy", created_at: new Date().toISOString() },
    { id: 2, topic: "JavaScript Functions", score: 7, total_questions: 10, difficulty: "medium", created_at: new Date().toISOString() },
    { id: 3, topic: "Recursion", score: 4, total_questions: 10, difficulty: "hard", created_at: new Date().toISOString() },
  ]);

  // Mock students list for activity table
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", college_id: "STU001", current_level: "beginner", created_at: new Date().toISOString() },
    { id: 2, name: "Jane Smith", college_id: "STU002", current_level: "intermediate", created_at: new Date().toISOString() },
  ]);

  // Mock notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New quiz available: Python Functions", time: "5 min ago", read: false },
    { id: 2, message: "You earned 50 XP for completing quiz!", time: "1 hour ago", read: false },
    { id: 3, message: "Study reminder: Review Recursion", time: "2 hours ago", read: true }
  ]);

  useEffect(() => {
    // Get student data from localStorage
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    if (!user || role !== 'student') {
      navigate('/');
      return;
    }
    
    setStudentData(JSON.parse(user));
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  const startLesson = (topic) => {
    setActiveTopic(topic);
    setCurrentView('study');
  };

  const finishQuiz = (score) => {
    setQuizScore(score);
    setCurrentView('result');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Get section content based on active section
  const getSectionContent = () => {
    if (currentView !== 'dashboard') {
      if (currentView === 'study') {
        return <StudyView 
          topic={activeTopic} 
          studentLevel={studentInfo.currentLevel}
          onComplete={() => setCurrentView('quiz')}
        />;
      }
      if (currentView === 'quiz') {
        return <QuizView 
          finishQuiz={finishQuiz} 
          activeTopic={activeTopic} 
          studentLevel={studentInfo.currentLevel} 
        />;
      }
      if (currentView === 'result') {
        return <ResultView 
          score={quizScore} 
          totalQuestions={2}
          studentData={studentInfo}
          onContinue={() => {
            setCurrentView('dashboard');
            // Refresh data after quiz
          }}
        />;
      }
    }

    switch (activeSection) {
      case 'overview':
        return <OverviewSection 
          studentInfo={studentInfo}
          quizResults={quizResults}
          startLesson={startLesson}
        />;
      case 'activity':
        return <StudentActivityTable 
          students={students}
          quizResults={quizResults}
        />;
      case 'progress':
        return <StudentProgressAnalytics 
          studentId={studentData?.id}
          studentData={studentInfo}
          quizResults={quizResults}
        />;
      case 'settings':
        return <SettingsSection studentInfo={studentInfo} />;
      default:
        return <OverviewSection 
          studentInfo={studentInfo}
          quizResults={quizResults}
          startLesson={startLesson}
        />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      overview: 'Dashboard Overview',
      activity: 'My Activity',
      progress: 'Progress Analytics',
      settings: 'Settings'
    };
    return titles[activeSection] || 'Student Dashboard';
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">AI-Learn</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Student Portal</p>
              </div>
            </div>
          </div>

          {/* Student Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {studentInfo?.name?.charAt(0) || 'S'}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">{studentInfo?.name || 'Student'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{studentInfo?.email || 'student@school.edu'}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                  {studentInfo.currentLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Main Menu</p>
              
              <NavItem
                icon={<LayoutDashboard size={20} />}
                label="Dashboard Overview"
                isActive={activeSection === 'overview' && currentView === 'dashboard'}
                onClick={() => { setActiveSection('overview'); setCurrentView('dashboard'); setSidebarOpen(false); }}
              />
              
              <NavItem
                icon={<Activity size={20} />}
                label="My Activity"
                isActive={activeSection === 'activity'}
                onClick={() => { setActiveSection('activity'); setCurrentView('dashboard'); setSidebarOpen(false); }}
              />
              
              <NavItem
                icon={<TrendingUp size={20} />}
                label="Progress Analytics"
                isActive={activeSection === 'progress'}
                onClick={() => { setActiveSection('progress'); setCurrentView('dashboard'); setSidebarOpen(false); }}
              />
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Settings</p>
              
              <NavItem
                icon={<Settings size={20} />}
                label="Settings"
                isActive={activeSection === 'settings'}
                onClick={() => { setActiveSection('settings'); setCurrentView('dashboard'); setSidebarOpen(false); }}
              />
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
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Welcome back, {studentInfo.name}! Keep up the great work! 🎯
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                  <Search size={18} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    className="bg-transparent ml-2 text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
                  />
                </div>
                
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                    {unreadCount > 0 && (
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

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {studentInfo.name.charAt(0)}
                      </span>
                    </div>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{studentInfo.name}</p>
                        <p className="text-xs text-gray-500">{studentInfo.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg"
                      >
                        Sign out
                      </button>
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

// Navigation Item Component
const NavItem = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

// Overview Section Component
const OverviewSection = ({ studentInfo, quizResults, startLesson }) => {
  const totalQuizzes = quizResults.length;
  const averageScore = totalQuizzes > 0 
    ? Math.round(quizResults.reduce((sum, q) => sum + (q.score / q.total_questions) * 100, 0) / totalQuizzes)
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Good Morning, {studentInfo.name}! 👋</h2>
        <p className="text-blue-100">Ready to conquer {studentInfo.weakTopics[0]} today?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<TrendingUp className="w-6 h-6" />}
          value={`${averageScore}%`}
          label="Average Score"
          color="blue"
        />
        <StatCard 
          icon={<Award className="w-6 h-6" />}
          value={`${studentInfo.xp} XP`}
          label="Total XP"
          color="green"
        />
        <StatCard 
          icon={<Clock className="w-6 h-6" />}
          value={`${studentInfo.streakDays} days`}
          label="Current Streak"
          color="orange"
        />
        <StatCard 
          icon={<Target className="w-6 h-6" />}
          value={totalQuizzes}
          label="Quizzes Taken"
          color="purple"
        />
      </div>

      {/* Weak Topics Alert */}
      {studentInfo.weakTopics.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-400">Focus Areas</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-500 mt-1">
                You need more practice in: {studentInfo.weakTopics.join(", ")}
              </p>
              <button 
                onClick={() => startLesson(studentInfo.weakTopics[0])}
                className="mt-2 text-sm text-yellow-700 dark:text-yellow-400 font-medium hover:underline"
              >
                Start Lesson →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Content */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recommended for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentInfo.weakTopics.map((topic, idx) => (
            <div 
              key={idx}
              onClick={() => startLesson(topic)}
              className="group bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                  Micro-Lesson
                </span>
                <BookOpen className="text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
              </div>
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Understanding {topic}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Master {topic} with step-by-step explanations and practice exercises.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, value, label, color }) => {
  const colors = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600"
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
};

// Settings Section Component
const SettingsSection = ({ studentInfo }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    weeklyReport: true
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input 
              type="text" 
              value={studentInfo.name}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              value={studentInfo.email}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Level</label>
            <input 
              type="text" 
              value={studentInfo.currentLevel}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.emailNotifications}
                onChange={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Weekly Progress Report</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.weeklyReport}
                onChange={() => setSettings({...settings, weeklyReport: !settings.weeklyReport})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;