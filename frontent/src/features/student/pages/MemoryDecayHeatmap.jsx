import React from 'react';
import { BrainCircuit, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

const MemoryDecayHeatmap = ({ onRefreshQuiz }) => {
  // --- MOCK DATA (Later, your Flask backend will calculate these percentages based on time!) ---
  const decayData = [
    { id: 1, topic: "Variables & Data Types", retention: 95, lastReviewed: "Today", status: "Strong" },
    { id: 2, topic: "If/Else Statements", retention: 75, lastReviewed: "2 days ago", status: "Fading" },
    { id: 3, topic: "Python Loops", retention: 30, lastReviewed: "1 week ago", status: "Critical" },
    { id: 4, topic: "Array Manipulation", retention: 45, lastReviewed: "5 days ago", status: "Critical" },
    { id: 5, topic: "Object Oriented Basics", retention: 88, lastReviewed: "Yesterday", status: "Strong" },
  ];

  // Helper to determine colors based on retention percentage
  const getColorScheme = (retention) => {
    if (retention >= 80) return { bar: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 size={18} /> };
    if (retention >= 50) return { bar: "bg-amber-400", text: "text-amber-600", bg: "bg-amber-50", icon: <RefreshCw size={18} /> };
    return { bar: "bg-red-500", text: "text-red-600", bg: "bg-red-50", icon: <AlertTriangle size={18} /> };
  };

  // Filter out the topics that desperately need review
  const criticalTopics = decayData.filter(d => d.retention < 50).map(d => d.topic);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/20">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <BrainCircuit className="text-purple-600 w-5 h-5" /> 
            Memory Retention Heatmap
          </h3>
          <p className="text-sm text-slate-500 mt-1">AI tracking based on the Ebbinghaus Forgetting Curve</p>
        </div>
        
        {criticalTopics.length > 0 && (
          <button 
            onClick={() => onRefreshQuiz(criticalTopics)}
            className="hidden sm:flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
          >
            <RefreshCw size={16} /> Restore Lost Memory
          </button>
        )}
      </div>

      {/* Heatmap List */}
      <div className="p-6 space-y-6">
        {decayData.map((item) => {
          const colors = getColorScheme(item.retention);
          
          return (
            <div key={item.id} className="relative">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.topic}</h4>
                  <p className="text-xs text-slate-500">Last practiced: {item.lastReviewed}</p>
                </div>
                <div className={`flex items-center gap-1.5 font-bold text-sm ${colors.text}`}>
                  {colors.icon} {item.retention}% Retention
                </div>
              </div>
              
              {/* Progress Bar Background */}
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                {/* Actual Retention Bar */}
                <div 
                  className={`h-full ${colors.bar} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${item.retention}%` }}
                />
              </div>

              {/* Action Button for Decayed Topics */}
              {item.retention < 50 && (
                <button 
                  onClick={() => onRefreshQuiz([item.topic])}
                  className="mt-3 text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  Action Required: Review {item.topic} Now &rarr;
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryDecayHeatmap;
