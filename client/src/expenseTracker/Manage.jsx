import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ExpenseNavbar from "./ExpenseNavbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Manage = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Income",
        data: [500, 700, 800, 600, 900, 1000],
        backgroundColor: "#28a745",
      },
      {
        label: "Expenses",
        data: [400, 600, 700, 500, 800, 900],
        backgroundColor: "#dc3545",
      },
    ],
  };

  const options = {
    responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#9ca3af", // White for dark mode, dark gray for light mode
            font: {
              size: window.innerWidth < 640 ? 10 : 12
            }
          }
        },
        title: {
          display: true,
          text: "Income vs Expenses (Monthly)",
          color: "#9ca3af", // White for dark mode, darker for light mode
          font: {
            size: window.innerWidth < 640 ? 14 : 16
          }
        },
      },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af", // Light gray for dark mode
        },
        grid: {
          color: "rgba(156, 163, 175, 0.1)", // Light grid lines
        }
      },
      y: {
        ticks: {
          color: "#9ca3af", // Light gray for dark mode
        },
        grid: {
          color: "rgba(156, 163, 175, 0.1)", // Light grid lines
        }
      }
    }
  };

  return (
    <>
      <ExpenseNavbar />
      <div className="p-4 sm:p-8 bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white min-h-screen flex flex-col transition-colors duration-300">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Manage</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Manage your account settings and categories
          </p>
        </header>

        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Currency Section */}
          <div className="bg-gray-50 dark:bg-[#2a2a2a] p-4 sm:p-6 rounded-md shadow-sm dark:shadow-none">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-white">Currency</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm sm:text-base">
              Set your default currency for transactions
            </p>
            <select className="w-full p-2 sm:p-3 bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition">
              <option value="dollar">$ Dollar</option>
              <option value="euro">€ Euro</option>
              <option value="pound">£ Pound</option>
            </select>
          </div>

          {/* Categories Section */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Income Categories */}
            <div className="flex-1 bg-gray-50 dark:bg-[#2a2a2a] p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-none transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Income Categories</h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Sorted by name</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm transition w-full sm:w-auto">
                  + Create category
                </button>
              </div>
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                <p className="text-sm sm:text-base">
                  No <span className="text-green-500">income</span> categories yet
                </p>
                <small className="text-xs">Create one to get started</small>
              </div>
            </div>

            {/* Expense Categories */}
            <div className="flex-1 bg-gray-50 dark:bg-[#2a2a2a] p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-none transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Expense Categories</h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Sorted by name</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm transition w-full sm:w-auto">
                  + Create category
                </button>
              </div>
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                <p className="text-sm sm:text-base">
                  No <span className="text-red-500">expense</span> categories yet
                </p>
                <small className="text-xs">Create one to get started</small>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-gray-50 dark:bg-[#2a2a2a] p-4 sm:p-6 rounded-md mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
              Income vs Expenses
            </h2>
            <div className="w-full max-w-2xl mx-auto">
              <div className="h-64 sm:h-80">
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manage;