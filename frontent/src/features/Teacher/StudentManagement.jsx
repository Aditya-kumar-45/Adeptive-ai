// features/teacher/StudentManagement.jsx
import React, { useState } from 'react';
import { Users, Search, Filter, Download, Eye, MessageSquare, MoreVertical } from 'lucide-react';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const students = [
    { id: 1, name: "John Doe", email: "john@example.com", level: "Intermediate", quizzes: 12, avgScore: 78, lastActive: "2 hours ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", level: "Advanced", quizzes: 24, avgScore: 92, lastActive: "Yesterday" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", level: "Beginner", quizzes: 5, avgScore: 65, lastActive: "3 days ago" }
  ];

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter size={16} />
            Filter
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          <Download size={16} />
          Export Data
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Student</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Level</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Quizzes</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Avg Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Last Active</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.level === 'Advanced' ? 'bg-purple-100 text-purple-700' :
                      student.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{student.quizzes}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${student.avgScore}%` }} />
                      </div>
                      <span className="text-sm font-medium">{student.avgScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.lastActive}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <MessageSquare size={16} className="text-gray-500" />
                      </button>
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

export default StudentManagement;