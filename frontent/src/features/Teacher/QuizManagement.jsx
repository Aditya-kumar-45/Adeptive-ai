// features/teacher/QuizManagement.jsx
import React, { useState } from 'react';
import { HelpCircle, Plus, Edit, Trash2, Eye, BarChart3 } from 'lucide-react';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: "Python Basics Quiz", topic: "Python", questions: 10, attempts: 45, avgScore: 78, status: "Active" },
    { id: 2, title: "JavaScript Fundamentals", topic: "JavaScript", questions: 15, attempts: 32, avgScore: 82, status: "Active" },
    { id: 3, title: "SQL Practice", topic: "Database", questions: 8, attempts: 28, avgScore: 71, status: "Draft" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quiz Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          <Plus size={16} />
          Create New Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">12</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Quizzes</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">105</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Attempts</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">77%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Quiz Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Topic</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Questions</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Attempts</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Avg Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {quizzes.map((quiz) => (
                <tr key={quiz.id}>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{quiz.title}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{quiz.topic}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{quiz.questions}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{quiz.attempts}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${quiz.avgScore}%` }} />
                      </div>
                      <span className="text-sm font-medium">{quiz.avgScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      quiz.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {quiz.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded-lg"><Edit size={16} /></button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizManagement;