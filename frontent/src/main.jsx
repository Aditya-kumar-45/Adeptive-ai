import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Contact from "./components/layout/Header/Contact.jsx";
import About from "./components/layout/Header/About.jsx";
import Features from './features/landing/Features.jsx'
import { ThemeProvider } from './context/Theme.jsx'
import StudentDashboard from "./features/student/pages/StudentDashboard.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use the Layout here
    children: [
      {
        path: "", // This is the default (Home)
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
        element: <Contact /> // This routes to Contact Us
      },
      {
        path: "StudentDashboard",
        element: <StudentDashboard />
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