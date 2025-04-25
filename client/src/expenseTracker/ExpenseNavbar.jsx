import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";

const ExpenseNavbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-4 py-3 bg-white text-black dark:bg-[#1a1a1a] dark:text-white shadow-md border-b dark:border-gray-700">
      
      {/* Mobile Nav */}
      <div className="flex items-center justify-between max-w-7xl mx-auto md:hidden relative">
        {/* Left: Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-lg font-bold text-[#f0a500]">
            MyFinance
          </Link>
        </div>

        {/* Right: Theme + Login */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="text-xl p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          <Link to="/login">
            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {menuOpen && (
        <div className="md:hidden mt-3 text-center space-y-2">
          <Link
            to="/track-expenses"
            onClick={() => setMenuOpen(false)}
            className="block py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/track-expenses/transactions"
            onClick={() => setMenuOpen(false)}
            className="block py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700"
          >
            Transactions
          </Link>
          <Link
            to="/track-expenses/manage"
            onClick={() => setMenuOpen(false)}
            className="block py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700"
          >
            Manage
          </Link>
        </div>
      )}

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold text-[#f0a500]">
          MyFinance
        </Link>

        {/* Nav Links */}
        <div className="flex gap-10 text-base">
          <Link to="/track-expenses" className="hover:text-[#f0a500] hover:scale-105 transition">Dashboard</Link>
          <Link to="/track-expenses/transactions" className="hover:text-[#f0a500] hover:scale-105 transition">Transactions</Link>
          <Link to="/track-expenses/manage" className="hover:text-[#f0a500] hover:scale-105 transition">Manage</Link>
        </div>

        {/* Theme & Login */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="text-xl p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          <Link to="/login">
            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ExpenseNavbar;
