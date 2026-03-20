import React, { useState } from 'react';
import { BookOpen, TrendingUp, Award, Activity, MessageCircle, ChevronLeft, CheckCircle } from 'lucide-react';
import QuizView from '../components/QuizView';
import MemoryDecayHeatmap from './MemoryDecayHeatmap';

const StudentDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'study', 'quiz', 'result'
  const [activeTopic, setActiveTopic] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  // User Profile State (Simulating Backend Database)
  const [studentData, setStudentData] = useState({
    name: "Aditya",
    currentLevel: "Intermediate",
    xp: 2450,
    weakTopics: ["Recursion", "Dynamic Programming"],
    strongTopics: ["Variables", "Loops"]
  });

  // --- MOCK ADAPTIVE CONTENT ---
  const adaptiveContent = {
    title: "Understanding Recursion",
    Beginner: "Recursion is like looking in a mirror that is reflecting another mirror. A function simply calls itself until it reaches a stopping point (base case).",
    Intermediate: "Recursion occurs when a function calls itself to break down a complex problem into smaller sub-problems. It requires a Base Case to prevent an infinite stack overflow.",
    Advanced: "Recursion leverages the call stack to hold state. Time complexity is determined by the recurrence relation (e.g., Master Theorem), and space complexity is O(n) due to stack frames unless tail-call optimized."
  };

  // --- ACTIONS ---
  const startLesson = (topic) => {
    setActiveTopic(topic);
    setCurrentView('study');
  };

  const finishQuiz = (score) => {
    setQuizScore(score);
    // 💡 THE ADAPTIVE LOGIC: Update XP and potentially Level based on score
    const xpGained = score * 50;
    let newLevel = studentData.currentLevel;
    
    // If they score perfectly as an Intermediate, the AI bumps them to Advanced!
    if (score === 2 && studentData.currentLevel === "Intermediate") {
      newLevel = "Advanced";
    }

    setStudentData(prev => ({
      ...prev,
      xp: prev.xp + xpGained,
      currentLevel: newLevel
    }));

    setCurrentView('result');
  };

  // --- SUB-VIEWS ---

  // 1. THE STUDY VIEW (Content based on level)
  const StudyView = () => (
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

  // 3. THE RESULTS VIEW
  const ResultView = () => (
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

  // --- MAIN RENDER ---
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col p-6">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {studentData.name[0]}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">{studentData.name}</h3>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
              {studentData.currentLevel}
            </span>
          </div>
        </div>
        
        <nav className="space-y-2">
          {['Dashboard', 'My Courses', 'Smart Quiz', 'Progress Report'].map((item) => (
            <button key={item} onClick={() => setCurrentView('dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 rounded-xl transition-all font-medium text-left">
              <BookOpen size={20} />
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* VIEW: DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="animate-in fade-in duration-300">
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Good Morning, {studentData.name} 👋</h1>
                <p className="text-slate-500">Ready to conquer <span className="text-red-500 font-semibold">{studentData.weakTopics[0]}</span> today?</p>
              </div>
              <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl shadow-lg hover:bg-purple-700 transition-all font-medium">
                <MessageCircle size={20} /> Ask Doubt Buddy
              </button>
            </header>

            {/* Adaptive Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600"><TrendingUp size={24} /></div>
                  <span className="text-xs font-bold text-green-500">+15% this week</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">85%</h3>
                <p className="text-slate-500 text-sm">Concept Mastery</p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-2xl shadow-lg text-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"><Award size={24} /></div>
                </div>
                <h3 className="text-3xl font-bold">{studentData.xp} XP</h3>
                <p className="text-blue-50 font-medium mt-1">Current Streak: 7 Days 🔥</p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600"><Activity size={24} /></div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Focus Area</h3>
                <p className="text-slate-500 text-sm">You need more practice in <span className="font-semibold text-orange-500 border-b border-orange-200">Recursion</span>.</p>
              </div>
            </div>

            {/* 👉 2. MEMORY DECAY HEATMAP ADDED HERE */}
            <section className="mb-8">
              <MemoryDecayHeatmap 
                onRefreshQuiz={(topics) => {
                  // This takes the forgotten topic and immediately launches a quiz for it
                  setActiveTopic(topics[0]);
                  setCurrentView('quiz');
                }} 
              />
            </section>

            {/* Recommended Adaptive Content */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recommended for You</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  onClick={() => startLesson('Understanding Recursion')}
                  className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full">Micro-Lesson</span>
                    <ArrowRight className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={20}/>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Understanding Recursion</h3>
                  <p className="text-slate-500 text-sm mb-4">Since you struggled with loops, we've broken this down into simple steps based on your Intermediate level.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* DYNAMIC VIEWS */}
        {currentView === 'study' && <StudyView />}
        {currentView === 'quiz' && <QuizView finishQuiz={finishQuiz} activeTopic={activeTopic} studentLevel={studentData.currentLevel} />}
        {currentView === 'result' && <ResultView />}

      </main>
    </div>
  );
};

// Helper component for the arrow icon
const ArrowRight = ({className, size}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default StudentDashboard;