// TeacherPortal.jsx - Without external UI library dependencies
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Header/Navbar";
import StudentProgressAnalytics from "../features/teacher/StudentProgressAnalytics";
import {
  ArrowLeft, Upload, FileText, BarChart3, Users, TrendingUp, BookOpen,
  Trash2, Plus, Eye, Shield, Loader2, LogOut, LayoutDashboard, Pencil,
  GraduationCap, Search, ChevronDown, ChevronUp, Video, Link as LinkIcon,
  CheckCircle2, XCircle, HelpCircle, Clock, TrendingDown
} from "lucide-react";

const TeacherPortal = () => {
  const navigate = useNavigate();
  const [teacherUser, setTeacherUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Notes state
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [viewingNote, setViewingNote] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  // Analytics
  const [students, setStudents] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  // Content management
  const [learningContent, setLearningContent] = useState([]);
  const [contentForm, setContentForm] = useState({ 
    topic: "", 
    level: "beginner", 
    title: "", 
    content: "", 
    links: "", 
    video_url: "" 
  });
  const [editingContentId, setEditingContentId] = useState(null);

  // Quiz management
  const [teacherQuizzes, setTeacherQuizzes] = useState([]);
  const [quizForm, setQuizForm] = useState({ 
    topic: "", 
    title: "", 
    difficulty: "medium" 
  });
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState({});
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [questionForm, setQuestionForm] = useState({ 
    question: "", 
    options: ["", "", "", ""], 
    correct_answer: 0 
  });

  // Student list
  const [studentSearch, setStudentSearch] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for demo (replace with actual API calls)
  const [mockStudents, setMockStudents] = useState([
    { id: 1, name: "John Doe", college_id: "STU001", current_level: "beginner", xp: 450, streak_days: 3, last_active: new Date().toISOString() },
    { id: 2, name: "Jane Smith", college_id: "STU002", current_level: "intermediate", xp: 1200, streak_days: 7, last_active: new Date().toISOString() },
    { id: 3, name: "Mike Johnson", college_id: "STU003", current_level: "advanced", xp: 2500, streak_days: 14, last_active: new Date().toISOString() },
  ]);

  const [mockQuizResults, setMockQuizResults] = useState([
    { id: 1, student_id: 1, topic: "Python Basics", difficulty: "easy", score: 8, total_questions: 10, created_at: new Date().toISOString() },
    { id: 2, student_id: 2, topic: "JavaScript", difficulty: "medium", score: 7, total_questions: 10, created_at: new Date().toISOString() },
  ]);

  // Auth check (mock for now - replace with your actual auth)
  useEffect(() => {
    // Mock auth check - replace with your actual auth logic
    const user = localStorage.getItem('user');
    if (user) {
      setTeacherUser(JSON.parse(user));
    } else {
      navigate("/");
    }
    setAuthChecked(true);
  }, [navigate]);

  useEffect(() => {
    if (teacherUser) {
      fetchNotes();
      fetchAnalytics();
      fetchLearningContent();
      fetchTeacherQuizzes();
    }
  }, [teacherUser]);

  const fetchNotes = async () => {
    // Mock data - replace with actual API call
    setNotes([
      { id: 1, title: "Python Introduction", subject: "Programming", content: "Python is a high-level programming language..." },
      { id: 2, title: "Data Structures", subject: "Computer Science", content: "Arrays, Linked Lists, Trees..." },
    ]);
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    // Mock data - replace with actual API call
    setStudents(mockStudents);
    setQuizResults(mockQuizResults);
    setAnalyticsLoading(false);
  };

  const fetchLearningContent = async () => {
    // Mock data - replace with actual API call
    setLearningContent([
      { id: 1, topic: "Python", level: "beginner", title: "Variables", content: "Variables store data...", links: null, video_url: null },
      { id: 2, topic: "Python", level: "intermediate", title: "Functions", content: "Functions are reusable blocks...", links: null, video_url: null },
    ]);
  };

  const fetchTeacherQuizzes = async () => {
    // Mock data - replace with actual API call
    setTeacherQuizzes([
      { id: 1, topic: "Python", title: "Python Basics Quiz", difficulty: "easy", created_at: new Date().toISOString() },
      { id: 2, topic: "JavaScript", title: "JS Fundamentals", difficulty: "medium", created_at: new Date().toISOString() },
    ]);
  };

  const fetchQuizQuestions = async (quizId) => {
    // Mock data - replace with actual API call
    setQuizQuestions({
      ...quizQuestions,
      [quizId]: [
        { id: 1, quiz_id: quizId, question: "What is Python?", options: ["Language", "Snake", "Framework"], correct_answer: 0 }
      ]
    });
  };

  // Note handlers
  const handleUpload = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in title and content");
      return;
    }
    setIsLoading(true);
    // Mock upload - replace with actual API call
    const newNote = {
      id: notes.length + 1,
      title: title.trim(),
      content: content.trim(),
      subject: subject.trim() || null
    };
    setNotes([newNote, ...notes]);
    alert("Note uploaded!");
    setTitle("");
    setContent("");
    setSubject("");
    setIsLoading(false);
  };

  const handlePdfUpload = async () => {
    if (!pdfFile) return;
    setIsUploading(true);
    try {
      // Mock PDF upload - replace with actual storage upload
      alert("PDF uploaded: " + pdfFile.name);
      setPdfFile(null);
      setSubject("");
      fetchNotes();
    } catch (error) {
      alert("Upload error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    setNotes(notes.filter(note => note.id !== id));
    alert("Note deleted");
  };

  // Content handlers
  const handleSaveContent = async () => {
    if (!contentForm.topic.trim() || !contentForm.title.trim() || !contentForm.content.trim()) {
      alert("Fill in topic, title and content");
      return;
    }
    const newContent = {
      id: learningContent.length + 1,
      ...contentForm,
      links: contentForm.links.trim() || null,
      video_url: contentForm.video_url.trim() || null,
    };
    if (editingContentId) {
      setLearningContent(learningContent.map(c => c.id === editingContentId ? newContent : c));
      alert("Content updated!");
      setEditingContentId(null);
    } else {
      setLearningContent([newContent, ...learningContent]);
      alert("Content added!");
    }
    setContentForm({ topic: "", level: "beginner", title: "", content: "", links: "", video_url: "" });
  };

  const handleDeleteContent = async (id) => {
    setLearningContent(learningContent.filter(c => c.id !== id));
    alert("Content deleted");
  };

  const editContent = (c) => {
    setEditingContentId(c.id);
    setContentForm({ 
      topic: c.topic, 
      level: c.level, 
      title: c.title, 
      content: c.content, 
      links: c.links || "", 
      video_url: c.video_url || "" 
    });
  };

  // Quiz handlers
  const handleSaveQuiz = async () => {
    if (!quizForm.topic.trim() || !quizForm.title.trim()) {
      alert("Fill in topic and title");
      return;
    }
    const newQuiz = {
      id: teacherQuizzes.length + 1,
      ...quizForm,
      created_at: new Date().toISOString()
    };
    if (editingQuizId) {
      setTeacherQuizzes(teacherQuizzes.map(q => q.id === editingQuizId ? newQuiz : q));
      alert("Quiz updated!");
      setEditingQuizId(null);
    } else {
      setTeacherQuizzes([newQuiz, ...teacherQuizzes]);
      alert("Quiz created!");
    }
    setQuizForm({ topic: "", title: "", difficulty: "medium" });
  };

  const handleDeleteQuiz = async (id) => {
    setTeacherQuizzes(teacherQuizzes.filter(q => q.id !== id));
    alert("Quiz deleted");
  };

  const handleAddQuestion = async (quizId) => {
    if (!questionForm.question.trim() || questionForm.options.some((o) => !o.trim())) {
      alert("Fill all fields");
      return;
    }
    const newQuestion = {
      id: Date.now(),
      quiz_id: quizId,
      ...questionForm,
    };
    setQuizQuestions({
      ...quizQuestions,
      [quizId]: [...(quizQuestions[quizId] || []), newQuestion]
    });
    alert("Question added!");
    setQuestionForm({ question: "", options: ["", "", "", ""], correct_answer: 0 });
  };

  const handleDeleteQuestion = async (questionId, quizId) => {
    setQuizQuestions({
      ...quizQuestions,
      [quizId]: quizQuestions[quizId].filter(q => q.id !== questionId)
    });
  };

  const handleLogout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    navigate("/");
  };

  // Analytics calculations
  const totalStudents = students.length;
  const totalQuizzes = quizResults.length;
  const totalTopics = new Set(notes.map((n) => n.subject).filter(Boolean)).size + new Set(learningContent.map((c) => c.topic)).size;
  const avgScore = totalQuizzes > 0
    ? Math.round(quizResults.reduce((s, q) => s + (q.score / q.total_questions) * 100, 0) / totalQuizzes)
    : 0;

  const studentAnalytics = students.map((s) => {
    const sQuizzes = quizResults.filter((q) => q.student_id === s.id);
    const sAvg = sQuizzes.length > 0
      ? Math.round(sQuizzes.reduce((sum, q) => sum + (q.score / q.total_questions) * 100, 0) / sQuizzes.length)
      : 0;
    const inactiveDays = s.last_active
      ? Math.floor((Date.now() - new Date(s.last_active).getTime()) / (1000 * 60 * 60 * 24))
      : 999;
    return { 
      ...s, 
      quizzesTaken: sQuizzes.length, 
      avgScore: sAvg, 
      lastActiveText: inactiveDays === 0 ? "Today" : inactiveDays === 1 ? "Yesterday" : `${inactiveDays}d ago` 
    };
  });

  const filteredStudents = studentAnalytics.filter(
    (s) => s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.college_id.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const levelDistribution = {
    beginner: students.filter((s) => s.current_level === "beginner").length,
    intermediate: students.filter((s) => s.current_level === "intermediate").length,
    advanced: students.filter((s) => s.current_level === "advanced").length,
  };

  const subjectMap = {};
  quizResults.forEach((q) => { 
    subjectMap[q.topic] = (subjectMap[q.topic] || 0) + 1; 
  });
  const subjectInterests = Object.entries(subjectMap).sort((a, b) => b[1] - a[1]).slice(0, 8)
    .map(([topic, count]) => ({ 
      subject: topic, 
      students: count, 
      percentage: totalQuizzes > 0 ? Math.round((count / totalQuizzes) * 100) : 0 
    }));

  const levelBadge = (level) => {
    const cls = level === "advanced" ? "bg-purple-500/10 text-purple-500" 
      : level === "intermediate" ? "bg-yellow-500/10 text-yellow-500" 
      : "bg-green-500/10 text-green-500";
    return <span className={`text-xs px-2 py-0.5 rounded-full ${cls}`}>{level}</span>;
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Simple Button component replacement
  const Button = ({ children, onClick, disabled, variant, className, ...props }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variantClasses = variant === "outline" 
      ? "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      : variant === "ghost"
      ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      : variant === "secondary"
      ? "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white";
    
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses} ${className || ""}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  // Simple Input component replacement
  const Input = ({ value, onChange, placeholder, type = "text", className, ...props }) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ""}`}
      {...props}
    />
  );

  // Simple Textarea component replacement
  const Textarea = ({ value, onChange, placeholder, className, ...props }) => (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ""}`}
      {...props}
    />
  );

  // Simple Card component replacement
  const Card = ({ children, className }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 ${className || ""}`}>
      {children}
    </div>
  );

  // Simple Progress component replacement
  const Progress = ({ value, className }) => (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className || ""}`}>
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  // Simple Select components
  const Select = ({ value, onValueChange, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex justify-between items-center"
        >
          <span>{value || "Select..."}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
            {children}
          </div>
        )}
      </div>
    );
  };

  const SelectTrigger = ({ children }) => <>{children}</>;
  const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
  const SelectContent = ({ children }) => <>{children}</>;
  const SelectItem = ({ value, children, onSelect }) => (
    <div
      onClick={() => onSelect(value)}
      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
    >
      {children}
    </div>
  );

  // Simple Tabs components
  const Tabs = ({ defaultValue, children }) => {
    const [currentTab, setCurrentTab] = useState(defaultValue);
    return (
      <div>
        {React.Children.map(children, child => {
          if (child.type === TabsList) {
            return React.cloneElement(child, { currentTab, setCurrentTab });
          }
          if (child.type === TabsContent && child.props.value === currentTab) {
            return child;
          }
          return null;
        })}
      </div>
    );
  };

  const TabsList = ({ children, currentTab, setCurrentTab }) => (
    <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 mb-8">
      {React.Children.map(children, child => {
        if (child.type === TabsTrigger) {
          return React.cloneElement(child, { currentTab, setCurrentTab });
        }
        return child;
      })}
    </div>
  );

  const TabsTrigger = ({ value, children, currentTab, setCurrentTab }) => (
    <button
      onClick={() => setCurrentTab(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        currentTab === value
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );

  const TabsContent = ({ value, children }) => <div>{children}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome, {teacherUser?.name || teacherUser?.email || "Teacher"}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="dashboard">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalStudents}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              </Card>
              <Card className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalTopics}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Topics</p>
              </Card>
              <Card className="p-6 text-center">
                <HelpCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalQuizzes}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes Completed</p>
              </Card>
              <Card className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgScore}%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Score</p>
              </Card>
            </div>
          </TabsContent>

          {/* Topics Tab */}
          <TabsContent value="topics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload Notes</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Text content for AI quizzes</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <Input placeholder="Subject / Topic" value={subject} onChange={(e) => setSubject(e.target.value)} />
                  <Textarea 
                    placeholder="Paste your notes..." 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    className="min-h-[150px]" 
                  />
                  <Button onClick={handleUpload} disabled={isLoading} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    {isLoading ? "Uploading..." : "Upload Notes"}
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload PDF</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Documents for RAG queries</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Input placeholder="Subject (optional)" value={subject} onChange={(e) => setSubject(e.target.value)} />
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,.txt" 
                      className="hidden" 
                      id="pdf-upload" 
                      onChange={(e) => e.target.files?.[0] && setPdfFile(e.target.files[0])} 
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-900 dark:text-white font-medium">
                        {pdfFile ? pdfFile.name : "Click to select"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF, DOC, TXT (max 20MB)</p>
                    </label>
                  </div>
                  <Button onClick={handlePdfUpload} disabled={!pdfFile || isUploading} className="w-full" variant="secondary">
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                    {isUploading ? "Uploading..." : "Upload Document"}
                  </Button>
                </div>
              </Card>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Notes ({notes.length})</h3>
            <div className="space-y-3">
              {notes.length === 0 ? (
                <Card className="p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notes yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Upload your first topic</p>
                </Card>
              ) : notes.map((note) => (
                <Card key={note.id} className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{note.title}</h3>
                    {note.subject && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs font-medium mt-1">
                        {note.subject}
                      </span>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{note.content}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => setViewingNote(note)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteNote(note.id)} className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingContentId ? "Edit Content" : "Add Learning Content"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input placeholder="Topic (e.g. Python Basics)" value={contentForm.topic} onChange={(e) => setContentForm({ ...contentForm, topic: e.target.value })} />
                <select
                  value={contentForm.level}
                  onChange={(e) => setContentForm({ ...contentForm, level: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <Input placeholder="Title (e.g. Variables and Data Types)" value={contentForm.title} onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })} className="mb-4" />
              <Textarea placeholder="Content..." value={contentForm.content} onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })} className="min-h-[120px] mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input placeholder="Links (optional)" value={contentForm.links} onChange={(e) => setContentForm({ ...contentForm, links: e.target.value })} />
                <Input placeholder="Video URL (optional)" value={contentForm.video_url} onChange={(e) => setContentForm({ ...contentForm, video_url: e.target.value })} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveContent}><Plus className="w-4 h-4 mr-2" />{editingContentId ? "Update" : "Add Content"}</Button>
                {editingContentId && <Button variant="ghost" onClick={() => { setEditingContentId(null); setContentForm({ topic: "", level: "beginner", title: "", content: "", links: "", video_url: "" }); }}>Cancel</Button>}
              </div>
            </Card>

            <div className="space-y-6">
              {learningContent.length === 0 ? (
                <Card className="p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No learning content yet. Add content above.</p>
                </Card>
              ) : learningContent.map((content) => (
                <Card key={content.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{content.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{content.topic}</p>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs mt-2">
                        {content.level}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => editContent(content)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteContent(content.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{content.content.substring(0, 100)}...</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes">
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editingQuizId ? "Edit Quiz" : "Create Quiz"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input placeholder="Topic" value={quizForm.topic} onChange={(e) => setQuizForm({ ...quizForm, topic: e.target.value })} />
                <Input placeholder="Quiz Title" value={quizForm.title} onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })} />
                <select
                  value={quizForm.difficulty}
                  onChange={(e) => setQuizForm({ ...quizForm, difficulty: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <Button onClick={handleSaveQuiz}><Plus className="w-4 h-4 mr-2" />{editingQuizId ? "Update" : "Create Quiz"}</Button>
            </Card>

            <div className="space-y-4">
              {teacherQuizzes.map((quiz) => (
                <Card key={quiz.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => { setExpandedQuiz(expandedQuiz === quiz.id ? null : quiz.id); if (!quizQuestions[quiz.id]) fetchQuizQuestions(quiz.id); }}>
                      {expandedQuiz === quiz.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{quiz.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{quiz.topic} • {quiz.difficulty}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingQuizId(quiz.id); setQuizForm({ topic: quiz.topic, title: quiz.title, difficulty: quiz.difficulty }); }}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => handleDeleteQuiz(quiz.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  {/* Rest of quiz questions UI */}
                </Card>
              ))}
            </div>
          </TabsContent>

        
       {/* Performance Tab - Enhanced */}
          <TabsContent value="performance">
            <div className="space-y-6">
              {/* Student Selection Dropdown */}
              <Card className="p-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Student for Detailed Analysis
                </label>
                <select
                  value={selectedStudentId || ""}
                  onChange={(e) => setSelectedStudentId(parseInt(e.target.value))}
                  className="w-full md:w-96 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select a student...</option>
                  {studentAnalytics.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} ({student.college_id}) - {student.avgScore}% Avg
                    </option>
                  ))}
                </select>
              </Card>
                
              {/* Student Progress Analytics */}
              {selectedStudentId && (
                <StudentProgressAnalytics
                  studentId={selectedStudentId}
                  studentData={studentAnalytics.find(s => s.id === selectedStudentId)}
                  quizResults={quizResults.filter(q => q.student_id === selectedStudentId)}
                  learningContent={learningContent}
                />
              )}
              
              {/* All Students Overview Table */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  All Students Performance Overview
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400 font-medium">Student</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400 font-medium">College ID</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400 font-medium">Level</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400 font-medium">Avg Score</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400 font-medium">Quizzes</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400 font-medium">Trend</th>
                        <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentAnalytics.map((s, i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{s.name}</td>
                          <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{s.college_id}</td>
                          <td className="py-3 px-2">{levelBadge(s.current_level)}</td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <Progress value={s.avgScore} className="w-16 h-2" />
                              <span className={`font-semibold ${
                                s.avgScore >= 80 ? "text-green-600" : 
                                s.avgScore >= 60 ? "text-yellow-600" : "text-red-600"
                              }`}>
                                {s.avgScore}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-2">{s.quizzesTaken}</td>
                          <td className="py-3 px-2">
                            {s.avgScore >= 70 ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> Improving
                              </span>
                            ) : s.avgScore >= 50 ? (
                              <span className="text-yellow-600 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Stable
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center gap-1">
                                <TrendingDown className="w-3 h-3" /> Needs Attention
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedStudentId(s.id)}
                              className="text-blue-600"
                            >
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </TabsContent>
                    
                    {/* Students Tab */}
          <TabsContent value="students">
           <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Students ({students.length})</h3>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search by name or ID..." value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="space-y-3">
                {filteredStudents.map((s, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {s.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">{s.name}</span>
                        {levelBadge(s.current_level)}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{s.college_id} • {s.xp} XP • {s.quizzesTaken} quizzes • Avg {s.avgScore}%</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{s.lastActiveText}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{s.streak_days}d streak</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-6 text-center">
                <GraduationCap className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{levelDistribution.beginner}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Beginner Students</p>
              </Card>
              <Card className="p-6 text-center">
                <GraduationCap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{levelDistribution.intermediate}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Intermediate Students</p>
              </Card>
              <Card className="p-6 text-center">
                <GraduationCap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{levelDistribution.advanced}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Advanced Students</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Most Popular Topics</h3>
              {subjectInterests.length === 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">No quiz data yet.</p>
              ) : subjectInterests.map((item, i) => (
                <div key={i} className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.subject}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.students} attempts ({item.percentage}%)</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherPortal;