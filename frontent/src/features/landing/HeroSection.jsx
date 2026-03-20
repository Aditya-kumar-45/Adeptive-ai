import React from "react";
import { ArrowRight, Sparkles, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500
                 bg-[#f8fafc] dark:bg-[#0f172a]" 
    >
      {/* 1. The Main Gradient Background (Matches your Screenshot) */}
      <div className="absolute inset-0 z-0">
        {/* Deep Blue/Purple Radial Gradient for Dark Mode */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
                         radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                         linear-gradient(to bottom right, #0f172a, #1e1b4b)`
          }}
        />
        {/* Soft Blue Tint for Light Mode */}
        <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-500 bg-slate-50" />
      </div>

      {/* 2. Grid Pattern Overlay (Enhanced Opacity) */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.08] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px),
                           linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 3. Floating Glow Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 dark:bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-8 animate-bounce">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Powered by Adaptive AI
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
            Master Any Subject with{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                Adaptive AI
              </span>
              <Brain className="absolute -top-4 -right-12 w-10 h-10 text-cyan-500 animate-pulse" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed opacity-90">
            Your learning path changes as you grow. Start your journey from{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Beginner</span> to{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Advanced</span> with personalized content that adapts to your pace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center text-lg px-8 py-4 bg-[#0091d5] hover:bg-blue-600 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 transition-all group active:scale-95">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="text-lg px-8 py-4 font-bold border-2 border-white/20 dark:border-white/10 text-slate-900 dark:text-white bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl transition-all active:scale-95">
              Watch Demo
            </button>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-white/10 pt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">10K+</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">500+</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">95%</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">Success</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow effect to blend into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f8fafc] dark:from-[#0f172a] to-transparent z-[5]" />
    </section>
  );
};

export default HeroSection;