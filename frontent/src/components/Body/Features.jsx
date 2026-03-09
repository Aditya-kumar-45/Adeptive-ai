import React, { useState } from 'react';
import { Brain, ChevronRight, MessageCircle, ArrowLeft, Send, Loader2 } from 'lucide-react';

const FeaturesDemo = () => {
  const [demoLevel, setDemoLevel] = useState('Beginner');
  const [showChat, setShowChat] = useState(false); // Toggles the Q&A view
  
  // Q&A States
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const adaptiveContent = {
    Beginner: "A 'Variable' is like a labeled box where you store information, such as a number or a name, to use later in your program.",
    Intermediate: "Variables are named memory locations that hold data. You must declare their type (like int or string) so the computer knows how much space to reserve.",
    Advanced: "A variable is an abstraction of a memory address. It is defined by a scope, a lifetime, and a data type that determines its binary representation."
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    const userText = question; 

    setQuestion("");
    
    setIsLoading(true);
    setAnswer(""); // Clear previous answer
    
    try {
      // Sending the question to your Flask backend
      const response = await fetch("http://127.0.0.1:8000/api/ask-doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: "Variables",
          level: demoLevel,
          question: question
        })
      });
      
      const data = await response.json();
      if (data.answer) {
        setAnswer(data.answer);
      } else {
        setAnswer("Sorry, I couldn't process that. Try asking again!");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setAnswer("Error connecting to the AI server. Is Flask running?");
    }
    
    setIsLoading(false);
  };

  return (
    <section className="w-full py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-[100%] px-4 md:px-10 lg:px-16">
        
        <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden mb-20 border border-slate-100 dark:border-slate-800 transition-all duration-300">
          <div className="flex flex-col md:flex-row min-h-[400px]">
            
            {/* Left Sidebar: Level Selector */}
            <div className="p-8 md:w-1/4 bg-slate-900 dark:bg-slate-950 text-white transition-colors duration-300">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="text-blue-400" /> Adaptive Logic
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Select a level to see how our AI adapts its explanations and answers your specific doubts.
              </p>
              <div className="space-y-3">
                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setDemoLevel(lvl);
                      setAnswer(""); // Clear chat if they change levels
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium flex justify-between items-center ${
                      demoLevel === lvl ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800'
                    }`}
                  >
                    {lvl}
                    {demoLevel === lvl && <ChevronRight size={18} />}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right Panel: Content or Q&A Chat */}
            <div className="p-10 md:w-3/4 flex flex-col justify-center bg-blue-50/30 dark:bg-slate-800/50 transition-colors duration-300">
              
              {!showChat ? (
                // 1. SHOW EXPLANATION
                <div className="animate-in fade-in duration-300">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-widest mb-2 block">
                    Live Concept: Variables
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 italic transition-colors duration-300">
                    "{adaptiveContent[demoLevel]}"
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-8">
                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
                      <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white dark:border-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        AI
                      </div>
                      <span>Generated based on <strong>{demoLevel}</strong> proficiency.</span>
                    </div>

                    <button 
                      onClick={() => setShowChat(true)}
                      className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all"
                    >
                      <MessageCircle size={18} /> Have a doubt? Ask AI
                    </button>
                  </div>
                </div>
              ) : (
                // 2. SHOW Q&A CHAT INTERFACE
                <div className="w-full h-full flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
                  <button 
                    onClick={() => setShowChat(false)} 
                    className="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors w-fit"
                  >
                    <ArrowLeft size={18} /> Back to Explanation
                  </button>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ask Doubt Buddy</h3>
                      <p className="text-sm text-slate-500">I will answer based on your <span className="font-bold text-blue-500">{demoLevel}</span> level understanding of Variables.</p>
                    </div>

                    {/* AI Answer Display Area */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 mb-4 overflow-y-auto min-h-[150px] border border-slate-100 dark:border-slate-800">
                      {isLoading ? (
                         <div className="flex items-center gap-3 text-blue-600 font-medium h-full justify-center">
                           <Loader2 className="w-5 h-5 animate-spin" /> Gemini is thinking...
                         </div>
                      ) : answer ? (
                         <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                           <span className="font-bold text-blue-600 dark:text-blue-400 block mb-2">AI Response:</span>
                           {answer}
                         </div>
                      ) : (
                         <div className="flex items-center justify-center h-full text-slate-400 text-center italic">
                           Type a question below, like "What happens if I forget to declare a variable?"
                         </div>
                      )}
                    </div>

                    {/* Input Area */}
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                        placeholder="Type your question here..."
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      <button 
                        onClick={handleAskQuestion}
                        disabled={isLoading || !question.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 rounded-xl transition-all flex items-center justify-center"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesDemo;