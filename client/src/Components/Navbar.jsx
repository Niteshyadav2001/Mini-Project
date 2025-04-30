import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if user is logged in
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update state
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="w-full px-4 py-3 bg-white text-black dark:bg-gray-800 dark:text-white shadow-md border-b dark:border-gray-700">
      <div className="flex items-center justify-between max-w-7xl mx-auto relative md:hidden">
        {/* Mobile: Left - Hamburger */}
        <div className="flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile: Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-lg font-bold">
            PayTrack
          </Link>
        </div>

        {/* Mobile: Right - Dark mode and Login/Logout */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="text-base p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition dark:bg-red-500 dark:hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2 text-sm text-center">
          <Link
            to="/transfer"
            onClick={() => setMenuOpen(false)}
            className="block py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition"
          >
            Transfer Money
          </Link>
          <Link
            to="/track-expenses"
            onClick={() => setMenuOpen(false)}
            className="block py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition"
          >
            Track Expenses
          </Link>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Logo */}
        <Link to="/" className="text-lg font-bold">
          PayTrack
        </Link>

        {/* Center: Links */}
        <div className="flex gap-10 text-base">
          <Link
            to="/transfer"
            className="transition hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
          >
            Transfer Money
          </Link>
          <Link
            to="/track-expenses"
            className="transition hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
          >
            Track Expenses
          </Link>
        </div>

        {/* Right: Dark mode toggle and Login/Logout */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="text-base p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition dark:bg-red-500 dark:hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;