// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Contact from "./components/layout/Header/Contact.jsx";
import About from "./components/layout/Header/AboutSection.jsx";
import Features from './features/landing/Features.jsx'
import { ThemeProvider } from './context/Theme.jsx'

// ✅ Import from the correct path where your files are
import StudentDashboard from "./pages/StudentDashboard.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";  // This is the one we just created

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "features",
        element: <Features />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "student-dashboard",
        element: <StudentDashboard />
      },
      {
        path: "teacher-dashboard",
        element: <TeacherDashboard />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);