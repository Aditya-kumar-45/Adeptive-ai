// Theme.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    try {
      // Check if theme is stored in localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      // If no saved theme, check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
      return false; // Default to light mode if error
    }
  });

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(prevTheme => !prevTheme);
  };

  // Update localStorage and document class when theme changes
  useEffect(() => {
    try {
      // Save to localStorage
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // Update document class for Tailwind dark mode
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Optional: Add a data attribute for CSS customizations
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [isDark]);

  // Listen for system preference changes
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        // Only update if there's no saved theme preference
        if (!localStorage.getItem('theme')) {
          setIsDark(e.matches);
        }
      };
      
      // Add event listener for system theme changes
      mediaQuery.addEventListener('change', handleChange);
      
      // Cleanup event listener on component unmount
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (error) {
      console.error('Error setting up system preference listener:', error);
    }
  }, []);

  // Context value
  const value = {
    isDark,
    toggleTheme,
    // Optional: Add helper methods
    setTheme: (theme) => setIsDark(theme === 'dark'),
    getTheme: () => isDark ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Optional: Helper component for debugging (remove in production)
export const ThemeDebugger = () => {
  const { isDark, toggleTheme, getTheme } = useTheme();
  
  if (process.env.NODE_ENV === 'development') {
    return (
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: isDark ? '#333' : '#fff',
        color: isDark ? '#fff' : '#333',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9999,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        cursor: 'pointer'
      }}
      onClick={toggleTheme}
      >
        Theme: {getTheme()} | Click to toggle
      </div>
    );
  }
  return null;
};