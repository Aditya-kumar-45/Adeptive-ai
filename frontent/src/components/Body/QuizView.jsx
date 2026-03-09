import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const QuizView = ({ finishQuiz, activeTopic, studentLevel }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  
  // State to hold the AI generated questions
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(true); // Loading spinner state

  // Timer & Hint States
  const [secondsSpent, setSecondsSpent] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Fetch the quiz from Flask when the component loads
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/generate-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            topic: activeTopic, // e.g., "Recursion"
            level: studentLevel // e.g., "Intermediate"
          })
        });
        
        const data = await response.json();
        setQuestions(data); // Save the AI questions to state
        setIsGenerating(false); // Turn off loading spinner
        
      } catch (error) {
        console.error("Failed to generate quiz", error);
        setIsGenerating(false);
      }
    };

    fetchQuiz();
  }, [activeTopic, studentLevel]);

  // Timer Logic
  useEffect(() => {
    if (isGenerating) return; // Don't start timer until quiz is loaded!
    const timer = setInterval(() => setSecondsSpent(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [currentQ, isGenerating]);

  // Hint Logic
  useEffect(() => {
    if (secondsSpent > 8 && !showHint) setShowHint(true);
  }, [secondsSpent, showHint]);

  const handleAnswer = (index) => {
    // Safety check just in case questions array is empty
    if (!questions || questions.length === 0) return;

    const newScore = index === questions[currentQ].ans ? score + 1 : score;
    if (currentQ < questions.length - 1) {
      setScore(newScore);
      setCurrentQ(currentQ + 1);
      setSecondsSpent(0);
      setShowHint(false);
    } else {
      finishQuiz(newScore + (index === questions[currentQ].ans ? 1 : 0));
    }
  };

  // Show a loading screen while Gemini writes the quiz
  if (isGenerating) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 animate-in fade-in">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Gemini is writing your quiz...</h2>
        <p className="text-slate-500">Customizing questions for {studentLevel} level {activeTopic}.</p>
      </div>
    );
  }

  // Safety fallback if Flask is off or Gemini fails
  if (!questions || questions.length === 0) {
      return (
          <div className="max-w-2xl mx-auto text-center py-20">
              <p className="text-red-500 font-bold mb-2">Failed to load quiz from AI.</p>
              <p className="text-slate-500">Please make sure your Flask backend is running.</p>
          </div>
      );
  }

 // --- EXTRA SAFE RENDERING LOGIC ---
  
  // 1. Check if Gemini sent bad data (not an array)
  if (!Array.isArray(questions) || questions.length === 0) {
      return (
          <div className="max-w-2xl mx-auto text-center py-20 animate-in fade-in">
              <p className="text-red-500 font-bold text-xl mb-2">Failed to load quiz from AI.</p>
              <p className="text-slate-500">Please make sure your Flask server is running and your Gemini API key is valid.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-6 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
              >
                Refresh Page
              </button>
          </div>
      );
  }

  // 2. Safely grab the current question so it never crashes
  const activeQuestion = questions[currentQ];

  // If the questions loaded successfully, render the quiz!
  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
       <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Adaptive Quiz: {activeTopic}</h2>
       
       {showHint && activeQuestion?.hint && (
         <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
           <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
             <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
           </div>
           <div>
             <p className="text-sm font-bold text-purple-800 dark:text-purple-300">Doubt Buddy noticed you're thinking!</p>
             <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">{activeQuestion.hint}</p>
           </div>
         </div>
       )}

       <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-sm font-bold text-slate-400 mb-4">Question {currentQ + 1} of {questions.length}</p>
          
          {/* Using activeQuestion.q instead of questions[currentQ].q */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{activeQuestion?.q}</h3>
          
          <div className="space-y-3">
            {activeQuestion?.options?.map((opt, idx) => (
              <button 
                key={idx} 
                onClick={() => handleAnswer(idx)} 
                className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-blue-50 hover:border-blue-500 transition-all text-slate-700 dark:text-slate-300 font-medium"
              >
                {opt}
              </button>
            ))}
          </div>
       </div>
    </div>
  );
};

export default QuizView;