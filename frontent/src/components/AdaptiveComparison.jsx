import React from 'react';
import { XCircle, CheckCircle2, Minus } from 'lucide-react';

const AdaptiveComparison = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">
          The Adaptive Difference
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* LEFT CARD: Traditional LMS (The "Bad" Way) */}
          <div className="p-10 rounded-[2rem] border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
            <h3 className="text-xl font-bold text-red-600 mb-8 flex items-center gap-3">
              <XCircle className="w-6 h-6" />
              Traditional LMS
            </h3>
            <ul className="space-y-6">
              {[
                "One syllabus for everyone",
                "Moving on before you understand",
                "Generic quizzes and PDFs",
                "Feedback comes days later"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 font-medium">
                  <Minus className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT CARD: Adaptive AI (The "Good" Way) */}
          <div className="relative p-10 rounded-[2rem] border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 shadow-xl shadow-blue-500/5">
            {/* The Badge */}
            <div className="absolute -top-4 right-8 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30 tracking-wider">
              AI-LEARN
            </div>

            <h3 className="text-xl font-bold text-blue-600 mb-8 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6" />
              Adaptive AI
            </h3>
            <ul className="space-y-6">
              {[
                "Unique path for every student",
                "Stops to fix gaps instantly",
                "Interactive, generated content",
                "Real-time feedback loop"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-200 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 fill-blue-100 dark:fill-blue-900/50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdaptiveComparison;