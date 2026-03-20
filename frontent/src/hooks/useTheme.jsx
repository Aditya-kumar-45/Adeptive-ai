import React from 'react';
import { useTheme } from './useTheme';

export const App = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`border-b transition-colors duration-300 ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚛️</span>
              <span className="font-bold text-xl">React App</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200 hover:scale-105
                ${isDark 
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span>{isDark ? '🌙' : '☀️'}</span>
              <span>{isDark ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to{' '}
            <span className={isDark ? 'text-yellow-300' : 'text-blue-600'}>
              Theme Switcher
            </span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Experience seamless dark/light mode switching with Tailwind CSS
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          {[
            {
              icon: '🌓',
              title: 'Auto Detection',
              description: 'Respects your system preferences automatically'
            },
            {
              icon: '💾',
              title: 'Persistent Storage',
              description: 'Remembers your theme choice in localStorage'
            },
            {
              icon: '🎨',
              title: 'Tailwind Styled',
              description: 'Beautiful transitions and modern design'
            },
            {
              icon: '📱',
              title: 'Responsive',
              description: 'Works perfectly on all device sizes'
            },
            {
              icon: '⚡',
              title: 'Fast & Lightweight',
              description: 'No flicker on page load'
            },
            {
              icon: '🔄',
              title: 'Real-time Toggle',
              description: 'Instant theme switching with smooth transitions'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`
                p-6 rounded-xl transition-all duration-300 hover:scale-105
                ${isDark 
                  ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' 
                  : 'bg-white hover:shadow-xl border border-gray-100'
                }
              `}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { label: 'Active Users', value: '10k+', icon: '👥' },
            { label: 'Theme Toggles', value: '1M+', icon: '🔄' },
            { label: 'Happy Developers', value: '5k+', icon: '😊' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800/50' : 'bg-gray-100'
              }`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`mt-16 text-center p-8 rounded-2xl ${
          isDark ? 'bg-gray-800' : 'bg-blue-50'
        }`}>
          <h2 className="text-2xl font-bold mb-4">
            Ready to try it yourself?
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Click the theme toggle button in the navigation bar to switch modes
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${isDark 
                  ? 'bg-yellow-300 text-gray-900 hover:bg-yellow-400' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              Toggle Theme Now
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-12 py-8 border-t ${
        isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Built with React, Tailwind CSS, and the useTheme custom hook
          </p>
        </div>
      </footer>
    </div>
  );
};