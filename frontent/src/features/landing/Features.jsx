import React from 'react';
import { 
  BrainCircuit, 
  Activity, 
  MessageSquare, 
  Flame, 
  ShieldCheck, 
  LineChart 
} from 'lucide-react';

const featuresData = [
  {
    icon: <BrainCircuit size={24} className="text-blue-600" />,
    title: "Adaptive AI Engine",
    description: "The system actively monitors your performance and dynamically adjusts the difficulty of micro-lessons and quizzes to match your exact proficiency level.",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100"
  },
  {
    icon: <Activity size={24} className="text-orange-600" />,
    title: "Spaced Repetition Heatmap",
    description: "Built-in memory retention algorithms track when you learn topics and prompt you for reviews right before the Ebbinghaus Forgetting Curve takes effect.",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100"
  },
  {
    icon: <MessageSquare size={24} className="text-purple-600" />,
    title: "Contextual Doubt Buddy",
    description: "Stuck on a problem? The integrated AI chat widget understands exactly what topic and difficulty level you are currently viewing to provide highly relevant answers.",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100"
  },
  {
    icon: <Flame size={24} className="text-red-600" />,
    title: "Gamified Progression",
    description: "Turn studying into an engaging experience. Earn XP, maintain daily study streaks, and level up from 'Beginner' to 'Advanced' as you master new subjects.",
    bgColor: "bg-red-50",
    borderColor: "border-red-100"
  },
  {
    icon: <LineChart size={24} className="text-emerald-600" />,
    title: "Deep Analytics Dashboard",
    description: "Visualize your learning journey with comprehensive statistics, identifying your strongest subjects and pinpointing critical knowledge gaps that need attention.",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100"
  },
  {
    icon: <ShieldCheck size={24} className="text-slate-600" />,
    title: "Secure Role-Based Access",
    description: "Powered by a robust Python backend, featuring dedicated, secure portals for both students and teachers with customized data views for each role.",
    bgColor: "bg-slate-100",
    borderColor: "border-slate-200"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white font-sans" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">
            Core Capabilities
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Everything you need to master complex subjects faster.
          </p>
          <p className="text-lg text-slate-500">
            We combined proven cognitive science with cutting-edge generative AI to build a learning platform that actively works with you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border ${feature.bgColor} ${feature.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;