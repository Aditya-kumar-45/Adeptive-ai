import React from "react";
import { Brain, TrendingUp, MessageCircle, BookCheck } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Assessment",
    description: "Quizzes that determine if you are a Beginner, Intermediate, or Advanced learner with AI-powered evaluation.",
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: TrendingUp,
    title: "Adaptive Content",
    description: "The system automatically switches reading material based on your quiz score and learning progress.",
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    icon: MessageCircle,
    title: "Doubt Buddy",
    description: "A smart keyword-based AI assistant to help with quick definitions and concept clarifications.",
    colorClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    icon: BookCheck,
    title: "Progress Tracking",
    description: "Comprehensive dashboard showing your learning journey, completed topics, and skill improvements.",
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-100 dark:bg-amber-900/30",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-blue-600 dark:text-blue-400 mb-3 tracking-widest uppercase">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Powerful Features for Smart Learning
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Our AI-powered platform adapts to your unique learning style, ensuring you master every concept at your own pace.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feature.bgClass}`}
              >
                <feature.icon className={`w-8 h-8 ${feature.colorClass}`} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;