import React from "react";
import ExpenseNavbar from "./ExpenseNavbar";

const ExpenseDashboard = () => {
  return (
    <>
      <ExpenseNavbar />
      <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white min-h-screen transition-colors duration-300">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Welcome to Expense Tracker! 📊
          </h1>
          {/* Buttons layout */}
          <div className="flex justify-between w-full sm:w-auto sm:gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition text-sm sm:text-base w-1/2 sm:w-auto">
              New income 😄
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition text-sm sm:text-base w-1/2 sm:w-auto ml-2 sm:ml-0">
              New expense 😟
            </button>
          </div>
        </header>

        {/* Overview Cards */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg sm:text-xl font-semibold">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-center shadow-sm dark:shadow-none">
              <h3 className="text-green-500 text-lg font-medium">Income</h3>
              <p className="text-lg">$0.00</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-center shadow-sm dark:shadow-none">
              <h3 className="text-red-500 text-lg font-medium">Expense</h3>
              <p className="text-lg">$0.00</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-center shadow-sm dark:shadow-none">
              <h3 className="text-purple-500 text-lg font-medium">Balance</h3>
              <p className="text-lg">$0.00</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-center shadow-sm dark:shadow-none">
            <h3 className="mb-4 text-lg font-medium">Incomes by category</h3>
            <p className="mb-2 text-gray-500 dark:text-gray-300">
              No data for the selected period
            </p>
            <small className="text-gray-400">
              Try selecting a different period or adding new incomes
            </small>
          </div>
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-center shadow-sm dark:shadow-none">
            <h3 className="mb-4 text-lg font-medium">Expenses by category</h3>
            <p className="mb-2 text-gray-500 dark:text-gray-300">
              No data for the selected period
            </p>
            <small className="text-gray-400">
              Try selecting a different period or adding new expenses
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseDashboard;
