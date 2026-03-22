// features/teacher/Analytics.jsx
import React, { useState } from 'react';
import { TrendingUp, Users, Award, Clock, BarChart3, PieChart, Download, Calendar } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week'); // week, month, year

  const performanceData = {
    weekly: [65, 72, 78, 75, 82, 85, 88],
    monthly: [68, 72, 75, 78, 82, 85],
    yearly: [65, 68, 72, 75, 78, 80, 82, 85, 87, 88, 89, 90]
  };

  const currentData = performanceData[timeRange];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Performance Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Track student progress and engagement metrics</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">78.5%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">156</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+24</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">342</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes Completed</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+5h</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">127h</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Learning Time</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Performance Trend</h3>
        <div className="h-64 flex items-end gap-2">
          {currentData.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-blue-500 hover:bg-blue-600 transition-all rounded-t-lg"
                style={{ height: `${value}%`, maxHeight: '200px' }}
              />
              <span className="text-xs text-gray-500">
                {timeRange === 'week' ? `Day ${index + 1}` : 
                 timeRange === 'month' ? `Week ${index + 1}` : 
                 `Month ${index + 1}`}
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Subject Performance</h3>
          <div className="space-y-4">
            {[
              { subject: "Python", score: 85, students: 45 },
              { subject: "JavaScript", score: 78, students: 38 },
              { subject: "Database", score: 72, students: 32 },
              { subject: "React", score: 68, students: 28 },
              { subject: "Algorithms", score: 65, students: 25 }
            ].map((subject, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{subject.subject}</span>
                  <span className="text-sm text-gray-500">{subject.score}% ({subject.students} students)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      subject.score >= 80 ? 'bg-green-500' : 
                      subject.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Student Progress Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Advanced</span>
                <span className="text-sm text-gray-500">32 students (28%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Intermediate</span>
                <span className="text-sm text-gray-500">48 students (42%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Beginner</span>
                <span className="text-sm text-gray-500">34 students (30%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Insights</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• 📈 15% improvement in Python scores this month</li>
              <li>• ⚠️ Algorithms subject needs more attention (65% avg)</li>
              <li>• 🎯 8 students showing exceptional progress (+30%)</li>
              <li>• 🔥 5 students at risk of falling behind</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;