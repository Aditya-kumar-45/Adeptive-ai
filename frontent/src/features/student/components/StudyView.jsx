import React from 'react';
import { ChevronLeft, Activity, ArrowRight } from 'lucide-react';

const StudyView = ({ setCurrentView, adaptiveContent, studentData }) => (
  <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
    <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-medium">
      <ChevronLeft size={20} /> Back to Dashboard
    </button>
    
    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{adaptiveContent.title}</h2>
        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
          {studentData.currentLevel} Mode
        </span>
      </div>
      
      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
        {adaptiveContent[studentData.currentLevel]}
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 mb-8">
        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
          <Activity size={18} /> AI Note for Aditya
        </h4>
        <p className="text-sm text-blue-600 dark:text-blue-400">Because you struggled with Loops, focus carefully on the "Base Case" concept here to avoid infinite loops.</p>
      </div>

      <button 
        onClick={() => setCurrentView('quiz')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
      >
        I'm Ready. Take the Smart Quiz <ArrowRight size={20} />
      </button>
    </div>
  </div>
);

export default StudyView;