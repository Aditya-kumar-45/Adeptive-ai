// features/teacher/TeacherOverview.jsx
import React from 'react';
import { Users, BookOpen, TrendingUp, Award, Clock, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

const TeacherOverview = ({ teacherData }) => {
  const stats = [
    { icon: Users, label: "Total Students", value: "156", change: "+12%", trend: "up", color: "blue" },
    { icon: BookOpen, label: "Active Courses", value: "8", change: "+2", trend: "up", color: "green" },
    { icon: TrendingUp, label: "Avg Student Score", value: "78%", change: "+5%", trend: "up", color: "purple" },
    { icon: Award, label: "Quiz Completion", value: "89%", change: "+3%", trend: "up", color: "orange" }
  ];

  const recentActivities = [
    { student: "John Doe", action: "Completed Python Quiz", score: "85%", time: "2 hours ago" },
    { student: "Jane Smith", action: "Started JavaScript Course", score: "In Progress", time: "5 hours ago" },
    { student: "Mike Johnson", action: "Requested Help", topic: "Recursion", time: "Yesterday" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {teacherData?.name || 'Teacher'}! 👋</h2>
        <p className="text-blue-100">You have 12 pending tasks to review. Great progress this week!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
                {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{activity.student.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{activity.student}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
              </div>
              <div className="text-right">
                {activity.score && (
                  <p className="text-sm font-semibold text-green-600">{activity.score}</p>
                )}
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;