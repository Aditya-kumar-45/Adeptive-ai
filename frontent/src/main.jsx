import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Contact from './components/Header/Contact.jsx'
import StudentDashboard from './pages/Studentsdashboard.jsx'
import Features from './components/Body/Features.jsx'
import { ThemeProvider } from './context/Theme.jsx'

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
        path: "contact",
        element: <Contact /> // This routes to Contact Us
      },
      {
        path: "dashboard",
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