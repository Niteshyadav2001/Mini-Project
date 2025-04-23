import React from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="w-full flex items-center rounded justify-between px-6 py-4 bg-white text-black shadow-md border-b-2 border-b-black dark:bg-gray-800 dark:text-white dark:border-b-gray-600">
      {/* Logo on the left */}
      {/* <div className="text-2xl font-bold">MyFinance</div> */}
      <Link to="/" className="text-2xl font-bold">
        MyFinance
      </Link>


      {/* Center options */}
      <div className="hidden md:flex gap-10 text-lg">
      <Link
          to="/transfer"
          className="transition-all duration-200 hover:text-blue-600 hover:scale-105 dark:hover:text-blue-400 "
        >
          Transfer Money
        </Link>
        <Link
          to="/track-expenses"
          className="transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
        >
          Track Expenses
        </Link>
      </div>

      {/* Dark mode toggle and login button on the right */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-lg cursor-pointer p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>

        {/* Login button */}
        <Link to="/login">
          <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200 dark:bg-blue-500 dark:hover:bg-blue-600">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
