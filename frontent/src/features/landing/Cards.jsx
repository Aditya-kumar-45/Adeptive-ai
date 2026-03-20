import React from "react";
import { GraduationCap, BookOpen, ArrowRight } from "lucide-react";

const PortalCards = () => {
  // Common styles for the portal buttons
  const studentBtn = "flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all group/btn active:scale-95";
  const teacherBtn = "flex items-center justify-center w-full px-6 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold rounded-xl transition-all group/btn active:scale-95";
  const ghostBtn = "w-full py-2 text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors";

  return (
    <section id="portals" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
      
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Choose Your Portal
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Select your role to access personalized features and content tailored to your learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          
          {/* Student Portal Card */}
          <div className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden">
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Student Portal
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Access your personalized learning dashboard and track your progress from Beginner to Advanced levels.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Adaptive learning paths",
                  "Real-time progress tracking",
                  "AI-powered doubt resolution"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <button className={studentBtn}>
                  Student Login
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button className={ghostBtn}>
                  New Student? Register
                </button>
              </div>
            </div>
          </div>

          {/* Teacher Portal Card */}
          <div className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-slate-700 dark:text-slate-300" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Teacher Portal
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Upload new topics, manage student levels, and view comprehensive progress reports for your classes.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Content management system",
                  "Student analytics dashboard",
                  "Level assignment controls"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <button className={teacherBtn}>
                  Teacher Login
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <div className="h-9" /> {/* Visual balance spacer */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PortalCards;