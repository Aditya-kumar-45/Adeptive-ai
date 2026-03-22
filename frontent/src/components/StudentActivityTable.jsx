// components/StudentActivityTable.jsx
import { useState, useEffect } from "react";
import { Users, LogIn, Activity, Eye, Clock, TrendingUp, TrendingDown } from "lucide-react";

const StudentActivityTable = ({ students, quizResults }) => {
  const [studentActivity, setStudentActivity] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("last_active");

  useEffect(() => {
    if (students && students.length > 0) {
      processStudentActivity();
    }
  }, [students, quizResults, filter]);

  const processStudentActivity = () => {
    if (!students || students.length === 0) {
      setStudentActivity([]);
      return;
    }

    const processed = students.map(student => {
      // Get student's quiz results
      const studentQuizzes = quizResults ? quizResults.filter(q => q.student_id === student.id) : [];
      
      // Calculate statistics
      const totalQuizzes = studentQuizzes.length;
      let averageScore = 0;
      
      if (totalQuizzes > 0) {
        const totalScore = studentQuizzes.reduce((sum, q) => {
          const scorePercent = (q.score / q.total_questions) * 100;
          return sum + scorePercent;
        }, 0);
        averageScore = Math.round(totalScore / totalQuizzes);
      }
      
      // Get last activity
      let lastActive = new Date();
      if (studentQuizzes.length > 0) {
        const sortedQuizzes = [...studentQuizzes].sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        lastActive = new Date(sortedQuizzes[0].created_at);
      } else if (student.last_active) {
        lastActive = new Date(student.last_active);
      } else if (student.created_at) {
        lastActive = new Date(student.created_at);
      }
      
      const now = new Date();
      const daysSinceActive = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));
      
      // Determine status
      let status = "active";
      if (daysSinceActive === 0) status = "online";
      else if (daysSinceActive <= 2) status = "recent";
      else if (daysSinceActive <= 7) status = "inactive";
      else status = "very_inactive";
      
      // Determine if new (registered in last 24 hours)
      const createdAt = student.created_at ? new Date(student.created_at) : new Date();
      const isNew = (now - createdAt) < 24 * 60 * 60 * 1000;
      
      // Calculate improvement trend
      let trend = 0;
      if (studentQuizzes.length >= 3) {
        const recentQuizzes = studentQuizzes.slice(-3);
        const previousQuizzes = studentQuizzes.slice(0, -3);
        
        const recentAvg = recentQuizzes.length > 0 
          ? recentQuizzes.reduce((sum, q) => sum + (q.score / q.total_questions) * 100, 0) / recentQuizzes.length 
          : averageScore;
          
        const previousAvg = previousQuizzes.length > 0 
          ? previousQuizzes.reduce((sum, q) => sum + (q.score / q.total_questions) * 100, 0) / previousQuizzes.length 
          : averageScore;
          
        trend = recentAvg - previousAvg;
      }
      
      return {
        ...student,
        totalQuizzes,
        averageScore,
        lastActive,
        lastActiveFormatted: formatDate(lastActive),
        daysSinceActive,
        status,
        isNew,
        trend
      };
    });
    
    // Apply filters
    let filtered = processed;
    if (filter === "today") {
      filtered = processed.filter(s => s.daysSinceActive === 0);
    } else if (filter === "week") {
      filtered = processed.filter(s => s.daysSinceActive <= 7);
    } else if (filter === "month") {
      filtered = processed.filter(s => s.daysSinceActive <= 30);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "last_active") return new Date(b.lastActive) - new Date(a.lastActive);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "quizzes") return b.totalQuizzes - a.totalQuizzes;
      if (sortBy === "score") return b.averageScore - a.averageScore;
      return 0;
    });
    
    setStudentActivity(filtered);
  };
  
  const formatDate = (date) => {
    if (!date) return "Never";
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 7) return `${diff} days ago`;
    return date.toLocaleDateString();
  };
  
  const getStatusBadge = (status) => {
    const badges = {
      online: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      active: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      recent: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
      inactive: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
      very_inactive: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
    };
    
    const labels = {
      online: "🟢 Online",
      active: "📱 Active",
      recent: "🕐 Recent",
      inactive: "💤 Inactive",
      very_inactive: "⚠️ Inactive (7+ days)"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status] || badges.inactive}`}>
        {labels[status] || labels.inactive}
      </span>
    );
  };
  
  const getTrendIcon = (trend) => {
    if (trend > 5) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend < -5) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Activity className="w-4 h-4 text-gray-400" />;
  };
  
  // Don't render if no students
  if (!students || students.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-400">No students enrolled yet</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-6 h-6" />
            <span className="text-2xl font-bold">{studentActivity.length}</span>
          </div>
          <p className="text-sm text-green-100">Total Students</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <LogIn className="w-6 h-6" />
            <span className="text-2xl font-bold">
              {studentActivity.filter(s => s.isNew).length}
            </span>
          </div>
          <p className="text-sm text-blue-100">New Students (24h)</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-6 h-6" />
            <span className="text-2xl font-bold">
              {studentActivity.filter(s => s.status === "online" || s.status === "active").length}
            </span>
          </div>
          <p className="text-sm text-purple-100">Active Now</p>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-6 h-6" />
            <span className="text-2xl font-bold">
              {studentActivity.filter(s => s.daysSinceActive === 0).length}
            </span>
          </div>
          <p className="text-sm text-yellow-100">Active Today</p>
        </div>
      </div>
      
      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filter === "all" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All Students
          </button>
          <button
            onClick={() => setFilter("today")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filter === "today" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Active Today
          </button>
          <button
            onClick={() => setFilter("week")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filter === "week" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setFilter("month")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filter === "month" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Last 30 Days
          </button>
        </div>
        
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
          >
            <option value="last_active">Sort by: Last Active</option>
            <option value="name">Sort by: Name</option>
            <option value="quizzes">Sort by: Quizzes Taken</option>
            <option value="score">Sort by: Average Score</option>
          </select>
        </div>
      </div>
      
      {/* Student Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Student</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Last Active</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Quizzes</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Avg Score</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Trend</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {studentActivity.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {student.name ? student.name.charAt(0).toUpperCase() : "?"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {student.name || "Unknown"}
                          {student.isNew && (
                            <span className="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                              NEW
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {student.college_id || "No ID"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {student.lastActiveFormatted}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {student.totalQuizzes || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            student.averageScore >= 80 ? "bg-green-500" :
                            student.averageScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${student.averageScore || 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{student.averageScore || 0}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {getTrendIcon(student.trend)}
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {student.trend > 0 ? `+${Math.round(student.trend)}%` : 
                         student.trend < 0 ? `${Math.round(student.trend)}%` : "stable"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.current_level === "advanced" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" :
                      student.current_level === "intermediate" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    }`}>
                      {student.current_level || "beginner"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {studentActivity.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">No students found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentActivityTable;