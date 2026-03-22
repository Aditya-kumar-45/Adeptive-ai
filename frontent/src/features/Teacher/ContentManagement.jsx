// features/teacher/ContentManagement.jsx
import React, { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2, Upload, FileText } from 'lucide-react';

const ContentManagement = () => {
  const [contents, setContents] = useState([
    { id: 1, title: "Python Basics", topic: "Programming", level: "Beginner", type: "Lesson", status: "Published" },
    { id: 2, title: "JavaScript Functions", topic: "Web Dev", level: "Intermediate", type: "Video", status: "Draft" },
    { id: 3, title: "Database Design", topic: "Database", level: "Advanced", type: "PDF", status: "Published" }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Content</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          <Plus size={16} />
          Add New Content
        </button>
      </div>

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload New Content</h3>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">Drag and drop your files here, or click to browse</p>
          <p className="text-xs text-gray-500 mt-2">Supports: PDF, Video, Document, Images (Max 100MB)</p>
          <button className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
            Select Files
          </button>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Topic</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Level</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {contents.map((content) => (
                <tr key={content.id}>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{content.title}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{content.topic}</td>
                  <td className="px-6 py-4">{content.level}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1">
                      <FileText size={14} />
                      {content.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      content.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {content.status}
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

export default ContentManagement;