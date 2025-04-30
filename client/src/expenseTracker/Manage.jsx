import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import ExpenseNavbar from "./ExpenseNavbar";
import { CREATE_EXPENSE_CATEGORY,GET_MONTHLY_COMPARISON, CREATE_INCOME_CATEGORY,GET_EXPENSE_CATEGORIES,GET_INCOME_CATEGORIES } from "../utils/constants";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Manage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "income" or "expense"
  const [categoryName, setCategoryName] = useState("");
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchCategories = async () => {
    try {
      const [incomeResponse, expenseResponse] = await Promise.all([
        axios.get(GET_INCOME_CATEGORIES, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        axios.get(GET_EXPENSE_CATEGORIES, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
      ]);

      setIncomeCategories(incomeResponse.data);
      setExpenseCategories(expenseResponse.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await axios.get(GET_MONTHLY_COMPARISON, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMonthlyData(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching monthly data:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMonthlyData();
  }, []);

  const handleCreateCategory = async () => {
    if (!categoryName) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const endpoint =
        modalType === "income"
          ? CREATE_INCOME_CATEGORY
          : CREATE_EXPENSE_CATEGORY;

      await axios.post(
        endpoint,
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(`${modalType === "income" ? "Income" : "Expense"} category created successfully!`);
      setShowModal(false);
      setCategoryName("");
      fetchCategories(); // Refresh categories after creation
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category. Please try again.");
    }
  };

  const chartData = {
    labels: monthlyData.map((data) => `Month ${data.month}`),
    datasets: [
      {
        label: "Income",
        data: monthlyData.map((data) => data.income),
        backgroundColor: "#28a745",
      },
      {
        label: "Expenses",
        data: monthlyData.map((data) => data.expense),
        backgroundColor: "#dc3545",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#9ca3af",
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          },
        },
      },
      title: {
        display: true,
        text: "Income vs Expenses (Monthly)",
        color: "#9ca3af",
        font: {
          size: window.innerWidth < 640 ? 14 : 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
      },
    },
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
          {/* Categories Section */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Income Categories */}
            <div className="flex-1 bg-gray-50 dark:bg-[#2a2a2a] p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-none transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Income Categories</h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Sorted by name</p>
                </div>
                <button
                  onClick={() => {
                    setModalType("income");
                    setShowModal(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm transition w-full sm:w-auto"
                >
                  + Create category
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {incomeCategories.map((category) => (
                  <span
                    key={category._id}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded text-xs sm:text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Expense Categories */}
            <div className="flex-1 bg-gray-50 dark:bg-[#2a2a2a] p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-none transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Expense Categories</h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Sorted by name</p>
                </div>
                <button
                  onClick={() => {
                    setModalType("expense");
                    setShowModal(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm transition w-full sm:w-auto"
                >
                  + Create category
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {expenseCategories.map((category) => (
                  <span
                    key={category._id}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded text-xs sm:text-sm"
                  >
                    {category.name}
                  </span>
                ))}
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
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Creating Category */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Create {modalType === "income" ? "Income" : "Expense"} Category
            </h2>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-100 dark:bg-[#1a1a1a] text-gray-800 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCategory}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Manage;