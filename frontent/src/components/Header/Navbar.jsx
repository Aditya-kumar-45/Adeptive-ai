import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GraduationCap, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/Theme";
// 👉 CHANGE 1: Import the modal component
import LoginModal from "./LoginModal"; 

const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 👉 CHANGE 2: Add the state to control if the modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper for NavLink active states
  const navLinkClasses = ({ isActive }) =>
    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
    ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"} 
    lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0 font-medium transition-colors`;

  return (
    // 👉 CHANGE 3: Wrap the entire return block in an empty fragment <> ... </>
    <>
      <header className="shadow sticky z-50 top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <nav className="px-2 lg:px-6 py-2.5">
          <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
            
            <Link to="/" className="flex items-center gap-1.5 group flex-shrink-0">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-blue-600 flex items-center justify-center transition-all group-hover:scale-110">
                <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="font-bold text-lg lg:text-xl text-slate-900 dark:text-white whitespace-nowrap">
                AI-Learn <span className="hidden sm:inline text-blue-600">Assistant</span>
              </span>
            </Link>

            <div className="flex items-center lg:order-2 flex-nowrap flex-shrink-0">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* 👉 CHANGE 4: Replaced <Link> with <button> and added the onClick trigger */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-slate-800 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 font-medium rounded-lg text-xs lg:text-sm px-2 lg:px-5 py-2 focus:outline-none whitespace-nowrap cursor-pointer"
              >
                Log in
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-xs lg:text-sm px-3 lg:px-5 py-2 focus:outline-none shadow-lg shadow-blue-500/20 whitespace-nowrap cursor-pointer"
              >
                Get started
              </button>

              {/* Mobile Toggle Button */}
              <button 
                  className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Center Links (Navigation) */}
            <div
              className={`${isMenuOpen ? "block" : "hidden"} absolute top-full left-0 w-full bg-white dark:bg-slate-900 lg:static lg:block lg:w-auto lg:order-1 transition-all`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col p-4 lg:p-0 mt-0 font-medium lg:flex-row lg:space-x-8 lg:mt-0 border-t lg:border-0 border-gray-100 dark:border-slate-800">
                <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
                <li><NavLink to="/features" className={navLinkClasses}>Features</NavLink></li>
                <li><NavLink to="/dashboard" className={navLinkClasses}>Dashboard</NavLink></li>
                <li><NavLink to="/about" className={navLinkClasses}>About</NavLink></li>
                <li><NavLink to="/contact" className={navLinkClasses}>Contact</NavLink></li>
              </ul>
            </div>

          </div>
        </nav>
      </header>

      {/* 👉 CHANGE 5: Mount the modal below the header, inside the fragment */}
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;