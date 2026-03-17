import React from 'react';
import { CheckCircle } from 'lucide-react';

const ResultView = ({ quizScore, studentData, setCurrentView }) => (
  <div className="max-w-lg mx-auto text-center mt-20 animate-in zoom-in-95 duration-500">
    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
      <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
    </div>
    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Quiz Complete!</h2>
    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">You scored {quizScore} out of 2.</p>
    
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8 flex justify-around">
      <div>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">XP Gained</p>
        <p className="text-2xl font-bold text-blue-600">+{quizScore * 50} XP</p>
      </div>
      <div>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Current Level</p>
        <p className="text-2xl font-bold text-purple-600">{studentData.currentLevel}</p>
      </div>
    </div>

    <button onClick={() => setCurrentView('dashboard')} className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02]">
      Return to Dashboard
    </button>
  </div>
);

export default ResultView;