// StudentProgressAnalytics.jsx
import { useState, useEffect } from "react";
import StudentActivityTable from "./StudentActivityTable";

import { 
  TrendingUp, TrendingDown, AlertCircle, CheckCircle2, 
  BookOpen, Brain, Lightbulb, Target, BarChart3,
  ArrowUp, ArrowDown, Clock, Award, PieChart
} from "lucide-react";

const StudentProgressAnalytics = ({ studentId, studentData, quizResults, learningContent }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [improvementPlan, setImprovementPlan] = useState(null);

  useEffect(() => {
    if (studentData && quizResults) {
      analyzeStudentProgress();
    }
  }, [studentId, quizResults]);

  const analyzeStudentProgress = () => {
    setLoading(true);
    
    // Group quiz results by subject/topic
    const subjectPerformance = {};
    const topicPerformance = {};
    
    quizResults.forEach(quiz => {
      const subject = quiz.topic.split(' ')[0]; // Extract main subject
      const scorePercent = (quiz.score / quiz.total_questions) * 100;
      
      // Subject level analysis
      if (!subjectPerformance[subject]) {
        subjectPerformance[subject] = {
          totalScore: 0,
          count: 0,
          scores: [],
          difficulties: [],
          topics: []
        };
      }
      subjectPerformance[subject].totalScore += scorePercent;
      subjectPerformance[subject].count += 1;
      subjectPerformance[subject].scores.push(scorePercent);
      subjectPerformance[subject].difficulties.push(quiz.difficulty);
      
      // Topic level analysis
      if (!topicPerformance[quiz.topic]) {
        topicPerformance[quiz.topic] = {
          scores: [],
          average: 0,
          difficulty: quiz.difficulty,
          attempts: 0
        };
      }
      topicPerformance[quiz.topic].scores.push(scorePercent);
      topicPerformance[quiz.topic].attempts += 1;
      topicPerformance[quiz.topic].average = 
        topicPerformance[quiz.topic].scores.reduce((a, b) => a + b, 0) / 
        topicPerformance[quiz.topic].scores.length;
    });
    
    // Add this to your Tabs (around line where you have other tabs)
<TabsTrigger value="students" className="flex items-center gap-1 text-xs">
  <Users className="w-3.5 h-3.5" /> Students
</TabsTrigger>
    // Calculate averages and identify weak areas
    const weakSubjects = [];
    const strongSubjects = [];
    const subjectAverages = [];
    
    Object.entries(subjectPerformance).forEach(([subject, data]) => {
      const average = data.totalScore / data.count;
      const trend = data.scores.length > 1 ? 
        (data.scores[data.scores.length - 1] - data.scores[0]) : 0;
      
      subjectAverages.push({ subject, average, trend, attempts: data.count });
      
      if (average < 60) {
        weakSubjects.push({ 
          subject, 
          average, 
          trend, 
          attempts: data.count,
          difficulties: data.difficulties 
        });
      } else if (average > 80) {
        strongSubjects.push({ subject, average, trend });
      }
    });
    
    // Calculate overall progress
    const allScores = quizResults.map(q => (q.score / q.total_questions) * 100);
    const overallAverage = allScores.reduce((a, b) => a + b, 0) / allScores.length || 0;
    const recentScores = allScores.slice(-5);
    const recentTrend = recentScores.length > 1 ? 
      recentScores[recentScores.length - 1] - recentScores[0] : 0;
    
    // Identify specific weak topics
    const weakTopics = Object.entries(topicPerformance)
      .filter(([_, data]) => data.average < 60)
      .sort((a, b) => a[1].average - b[1].average);
    
    // Generate improvement suggestions
    const suggestions = generateImprovementSuggestions(weakSubjects, weakTopics);
    
    setAnalysis({
      weakSubjects,
      strongSubjects,
      overallAverage,
      recentTrend,
      subjectAverages: subjectAverages.sort((a, b) => a.average - b.average),
      weakTopics,
      totalQuizzes: quizResults.length,
      improvementSuggestions: suggestions
    });
    
    setLoading(false);
  };
  
  const generateImprovementSuggestions = (weakSubjects, weakTopics) => {
    const suggestions = [];
    
    weakSubjects.forEach(subject => {
      if (subject.average < 40) {
        suggestions.push({
          type: "critical",
          subject: subject.subject,
          message: `Critical weakness in ${subject.subject} (${Math.round(subject.average)}% average). Needs immediate intervention.`,
          action: "Schedule 1-on-1 tutoring sessions and provide foundational materials.",
          priority: "high"
        });
      } else if (subject.average < 60) {
        suggestions.push({
          type: "warning",
          subject: subject.subject,
          message: `Needs improvement in ${subject.subject} (${Math.round(subject.average)}% average).`,
          action: "Focus on practice exercises and review core concepts.",
          priority: "medium"
        });
      }
    });
    
    weakTopics.forEach(([topic, data]) => {
      suggestions.push({
        type: "topic",
        subject: topic,
        message: `Struggling with "${topic}" (${Math.round(data.average)}% accuracy).`,
        action: `Review ${topic} concepts and complete targeted exercises.`,
        priority: data.average < 50 ? "high" : "medium"
      });
    });
    
    return suggestions;
  };
  
  const getRecommendedResources = (subject) => {
    const resources = {
      "Python": [
        { type: "video", title: "Python Basics Tutorial", url: "#", duration: "20 mins" },
        { type: "practice", title: "Python Coding Exercises", url: "#", difficulty: "Beginner" },
        { type: "reading", title: "Python Documentation Guide", url: "#", pages: "15" }
      ],
      "JavaScript": [
        { type: "video", title: "JavaScript Fundamentals", url: "#", duration: "30 mins" },
        { type: "practice", title: "JS Challenges", url: "#", difficulty: "Intermediate" },
        { type: "reading", title: "MDN Web Docs", url: "#", pages: "20" }
      ],
      "Database": [
        { type: "video", title: "SQL Tutorial", url: "#", duration: "25 mins" },
        { type: "practice", title: "SQL Practice Problems", url: "#", difficulty: "Beginner" },
        { type: "reading", title: "Database Design Principles", url: "#", pages: "25" }
      ]
    };
    
    return resources[subject] || [
      { type: "practice", title: "Practice Exercises", url: "#", difficulty: "Custom" },
      { type: "video", title: "Concept Review", url: "#", duration: "15 mins" }
    ];
  };
  
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "text-green-600 bg-green-100";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-100";
    if (percentage >= 40) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };
  
  const getTrendIcon = (trend) => {
    if (trend > 5) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (trend < -5) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Clock className="w-4 h-4 text-gray-400" />;
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!analysis) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">No quiz data available for analysis</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overall Progress</h3>
            <Target className="w-6 h-6" />
          </div>
          <div className="text-4xl font-bold mb-2">{Math.round(analysis.overallAverage)}%</div>
          <div className="flex items-center gap-2">
            {analysis.recentTrend > 0 ? (
              <>
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Improving by {Math.abs(Math.round(analysis.recentTrend))}%</span>
              </>
            ) : analysis.recentTrend < 0 ? (
              <>
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm">Declining by {Math.abs(Math.round(analysis.recentTrend))}%</span>
              </>
            ) : (
              <span className="text-sm">Stable progress</span>
            )}
          </div>
          <p className="text-sm text-blue-100 mt-4">{analysis.totalQuizzes} quizzes completed</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weak Areas</h3>
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
            {analysis.weakSubjects.length}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Subjects needing improvement</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Strong Areas</h3>
            <Award className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
            {analysis.strongSubjects.length}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Subjects where excelling</p>
        </div>
      </div>
      
      {/* Subject Performance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Subject Performance Analysis
        </h3>
        <div className="space-y-4">
          {analysis.subjectAverages.map((subject, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">{subject.subject}</span>
                  {getTrendIcon(subject.trend)}
                  <span className="text-xs text-gray-500">{subject.attempts} quizzes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProgressColor(subject.average)}`}>
                    {Math.round(subject.average)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    subject.average >= 80 ? "bg-green-500" : 
                    subject.average >= 60 ? "bg-yellow-500" : 
                    subject.average >= 40 ? "bg-orange-500" : "bg-red-500"
                  }`}
                  style={{ width: `${subject.average}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Weak Topics Analysis */}
      {analysis.weakTopics.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-red-500" />
            Specific Topics Needing Attention
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.weakTopics.slice(0, 6).map(([topic, data], idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{topic}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProgressColor(data.average)}`}>
                    {Math.round(data.average)}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {data.attempts} attempts • {data.difficulty} difficulty
                </p>
                <button 
                  onClick={() => setSelectedSubject(topic)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Lightbulb className="w-3 h-3" />
                  View Improvement Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Improvement Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Personalized Improvement Plan
        </h3>
        <div className="space-y-4">
          {analysis.improvementSuggestions.map((suggestion, idx) => (
            <div 
              key={idx} 
              className={`border-l-4 p-4 rounded-r-lg ${
                suggestion.priority === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                suggestion.priority === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              }`}
            >
              <div className="flex items-start gap-3">
                {suggestion.priority === 'high' ? (
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                ) : (
                  <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">
                    {suggestion.subject}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {suggestion.message}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="font-medium">Recommended Action:</span> {suggestion.action}
                  </p>
                  
                  {/* Recommended Resources */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Recommended Resources:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getRecommendedResources(suggestion.subject).map((resource, ridx) => (
                        <a 
                          key={ridx}
                          href={resource.url}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 transition-colors"
                        >
                          {resource.type === 'video' && <Play className="w-3 h-3" />}
                          {resource.type === 'practice' && <CheckCircle2 className="w-3 h-3" />}
                          {resource.type === 'reading' && <BookOpen className="w-3 h-3" />}
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {analysis.improvementSuggestions.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">Excellent progress! No critical issues detected.</p>
            <p className="text-sm text-gray-500 mt-2">Continue challenging yourself with advanced topics.</p>
          </div>
        )}
      </div>
      
      {/* Progress Trend Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Performance Trend
        </h3>
        <div className="space-y-3">
          {analysis.subjectAverages.slice(0, 5).map((subject, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300">
                {subject.subject}
              </div>
              <div className="flex-1 relative h-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500 transition-all"
                      style={{ width: `${subject.average}%` }}
                    />
                  </div>
                </div>
                <div 
                  className="absolute top-0 w-3 h-3 rounded-full bg-blue-600 -mt-0.5 transition-all"
                  style={{ left: `calc(${subject.average}% - 6px)` }}
                />
              </div>
              <div className="flex items-center gap-1 w-16">
                {getTrendIcon(subject.trend)}
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {subject.trend > 0 ? '+' : ''}{Math.round(subject.trend)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper component for Play icon
const Play = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default StudentProgressAnalytics;