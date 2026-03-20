import React from 'react';
import { BrainCircuit, Target, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-blue-600" />,
      title: "Generative AI Engine",
      description: "Powered by advanced LLMs to dynamically generate micro-lessons, quizzes, and instant doubt resolutions tailored to the exact topic."
    },
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Adaptive Difficulty",
      description: "The system continuously monitors your quiz scores. Master a topic, and it upgrades you to Advanced. Struggle, and it breaks concepts down to Beginner level."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
      title: "Spaced Repetition",
      description: "Utilizes the Ebbinghaus Forgetting Curve to track memory decay, prompting you to review critical topics right before you are likely to forget them."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Gamified Progression",
      description: "Converts study hours into XP and maintains daily streaks to keep students engaged, motivated, and consistent in their learning journey."
    }
  ];

  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
            About The Project
          </span>
          <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Education that adapts to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">how you learn.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-500 mx-auto">
            Traditional learning portals offer the same static syllabus to every student. 
            Stud-IQ acts as a personalized 1-on-1 AI tutor, identifying your knowledge gaps 
            in real-time and restructuring the curriculum to fit your unique pace.
          </p>
        </div>

        {/* Split Layout: Image/Graphic on left, Features on right */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Side: The "How it works" visual */}
          <div className="mb-10 lg:mb-0">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">The Adaptive Loop</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold border border-blue-200">1</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-900">Assess Current Knowledge</h4>
                    <p className="mt-1 text-slate-500 text-sm">The AI evaluates your baseline through initial interactions and quizzes.</p>
                  </div>
                </div>
                
                <div className="w-0.5 h-8 bg-slate-200 ml-4 -my-4"></div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold border border-blue-200">2</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-900">Generate Custom Content</h4>
                    <p className="mt-1 text-slate-500 text-sm">Lessons are dynamically rewritten to match your exact comprehension level.</p>
                  </div>
                </div>

                <div className="w-0.5 h-8 bg-slate-200 ml-4 -my-4"></div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold border border-blue-200">3</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-900">Identify Weaknesses</h4>
                    <p className="mt-1 text-slate-500 text-sm">Failed quiz questions trigger targeted micro-lessons to close specific gaps.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Feature Grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 mb-4">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-bold text-slate-900">
                    {feature.title}
                  </p>
                  <p className="mt-2 ml-16 text-base text-slate-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;