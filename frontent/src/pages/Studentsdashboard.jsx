import React, { useState } from 'react';
import { BookOpen, TrendingUp, Award, Activity, MessageCircle } from 'lucide-react';

const StudentDashboard = () => {
  // This state would come from your Django Backend
  const [studentData, setStudentData] = useState({
    name: "Aditya",
    currentLevel: "Intermediate",
    xp: 2450,
    weakTopics: ["Recursion", "Dynamic Programming"],
    strongTopics: ["Variables", "Loops"]
  });

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* 1. Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col p-6">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {studentData.name[0]}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">{studentData.name}</h3>
            <span className="text-xs text-blue-500 font-medium px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              {studentData.currentLevel}
            </span>
          </div>
        </div>
        
        <nav className="space-y-2">
          {['Dashboard', 'My Courses', 'Smart Quiz', 'Progress Report'].map((item) => (
            <button key={item} className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded-xl transition-all font-medium text-left">
              <BookOpen size={20} /> {/* Placeholder icon */}
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Good Morning, {studentData.name} 👋</h1>
            <p className="text-slate-500">Ready to conquer <span className="text-red-500 font-semibold">{studentData.weakTopics[0]}</span> today?</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-lg hover:bg-blue-700 transition-all">
            <MessageCircle size={20} />
            Ask Doubt Buddy
          </button>
        </header>

        {/* 3. Adaptive Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600">
                <TrendingUp size={24} />
              </div>
              <span className="text-xs font-bold text-green-500">+15% this week</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">85%</h3>
            <p className="text-slate-500 text-sm">Concept Mastery</p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Award size={24} />
              </div>
              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">Level 5</span>
            </div>
            <h3 className="text-2xl font-bold">{studentData.xp} XP</h3>
            <p className="text-blue-100 text-sm">Current Streak: 7 Days 🔥</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600">
                <Activity size={24} />
              </div>
              <button className="text-xs font-bold text-blue-600 hover:underline">View Analytics</button>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Focus Area</h3>
            <p className="text-slate-500 text-sm">You need more practice in <span className="font-semibold text-orange-500">Recursion</span>.</p>
          </div>
        </div>

        {/* 4. Recommended Adaptive Content */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recommended for You</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: Adaptive Lesson */}
            <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">Micro-Lesson</span>
                <ArrowRight className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={20}/>
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Understanding Recursion</h3>
              <p className="text-slate-500 text-sm mb-4">Since you struggled with loops, we've broken this down into simple steps using visual diagrams.</p>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 w-1/3 h-full rounded-full" />
              </div>
            </div>

             {/* Card 2: Adaptive Quiz */}
             <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-purple-500 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-md">Smart Quiz</span>
                <ArrowRight className="text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" size={20}/>
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Level Up Challenge</h3>
              <p className="text-slate-500 text-sm mb-4">Answer 5 adaptive questions to advance from Intermediate to Advanced.</p>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-600">
                <Activity size={16} /> 5 mins • Hard Difficulty
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};
// Helper component for the arrow icon needed above
const ArrowRight = ({className, size}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default StudentDashboard;