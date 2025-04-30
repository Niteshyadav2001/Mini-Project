import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ExpenseNavbar from "./ExpenseNavbar";
import {
  ADD_EXPENSE_TO_CATEGORY,
  ADD_INCOME_TO_CATEGORY,
  GET_EXPENSE_INCOME,
  GET_INCOME_BY_CATEGORY,
  GET_EXPENSE_BY_CATEGORY,
} from "../utils/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate random colors
const generateRandomColors = (count) => {
  const colors = [];
  while (colors.length < count) {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }
  return colors;
};

const ExpenseDashboard = () => {
  const [showIncomeCard, setShowIncomeCard] = useState(false);
  const [showExpenseCard, setShowExpenseCard] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [amount, setAmount] = useState("");
  const [overview, setOverview] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const fetchOverview = async () => {
    try {
      const response = await axios.get(GET_EXPENSE_INCOME, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOverview(response.data);
    } catch (error) {
      console.error("Error fetching overview:", error);
      alert("Failed to fetch overview. Please try again.");
    }
  };

  const fetchIncomeByCategory = async () => {
    try {
      const response = await axios.get(GET_INCOME_BY_CATEGORY, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIncomeData(response.data);
    } catch (error) {
      console.error("Error fetching income by category:", error);
      alert("Failed to fetch income data. Please try again.");
    }
  };
  const fetchExpenseByCategory = async () => {
    try {
      const response = await axios.get(GET_EXPENSE_BY_CATEGORY, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExpenseData(response.data);
    } catch (error) {
      console.error("Error fetching expense by category:", error);
      alert("Failed to fetch expense data. Please try again.");
    }
  };

  useEffect(() => {
    fetchOverview();
    fetchIncomeByCategory();
    fetchExpenseByCategory();
  }, []);

  const handleSubmit = async (type) => {
    try {
      const endpoint =
        type === "income" ? ADD_INCOME_TO_CATEGORY : ADD_EXPENSE_TO_CATEGORY;

      const res = await axios.post(
        endpoint,
        { categoryName, amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
          },
        }
      );

      alert(res.data.message);
      setCategoryName("");
      setAmount("");
      setShowIncomeCard(false);
      setShowExpenseCard(false);
      fetchOverview(); // Refresh overview after adding income/expense
      fetchIncomeByCategory(); // Refresh income data
      fetchExpenseByCategory(); // Refresh expense data
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  // Prepare data for income doughnut chart
  const incomeChartData = {
    labels: incomeData.map((item) => item.name),
    datasets: [
      {
        data: incomeData.map((item) => item.totalIncome),
        backgroundColor: generateRandomColors(incomeData.length),
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for expense doughnut chart
  const expenseChartData = {
    labels: expenseData.map((item) => item.name),
    datasets: [
      {
        data: expenseData.map((item) => item.totalExpense),
        backgroundColor: generateRandomColors(expenseData.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <ExpenseNavbar />
      <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white min-h-screen transition-colors duration-300">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Welcome to Expense Tracker! 📊
          </h1>
          <div className="flex justify-between w-full sm:w-auto sm:gap-4">
            <button
              onClick={() => setShowIncomeCard(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition text-sm sm:text-base w-1/2 sm:w-auto"
            >
              New income 😄
            </button>
            <button
              onClick={() => setShowExpenseCard(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition text-sm sm:text-base w-1/2 sm:w-auto ml-2 sm:ml-0"
            >
              New expense 😟
            </button>
          </div>
        </header>

        {/* Income Category Card */}
        {showIncomeCard && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md mb-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium mb-2 text-green-600">
              Add Income
            </h3>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter existing income category name"
              className="w-full p-2 border border-gray-300 rounded-md mb-1 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Make sure the category exists, or create one first.
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2 border border-gray-300 rounded-md mb-2 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleSubmit("income")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowIncomeCard(false);
                  setCategoryName("");
                  setAmount("");
                }}
                className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-black dark:text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Expense Category Card */}
        {showExpenseCard && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md mb-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium mb-2 text-red-600">
              Add Expense
            </h3>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter existing expense category name"
              className="w-full p-2 border border-gray-300 rounded-md mb-1 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Make sure the category exists, or create one first.
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2 border border-gray-300 rounded-md mb-2 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleSubmit("expense")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowExpenseCard(false);
                  setCategoryName("");
                  setAmount("");
                }}
                className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-black dark:text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Overview Cards */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg sm:text-xl font-semibold">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-center shadow-sm dark:shadow-none">
              <h3 className="text-green-500 text-lg font-medium">Income</h3>
              <p className="text-lg">₹{overview.income.toFixed(2)}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-center shadow-sm dark:shadow-none">
              <h3 className="text-red-500 text-lg font-medium">Expense</h3>
              <p className="text-lg">₹{overview.expense.toFixed(2)}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-center shadow-sm dark:shadow-none">
              <h3 className="text-purple-500 text-lg font-medium">Balance</h3>
              <p className="text-lg">₹{(overview.income - overview.expense).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-center shadow-sm dark:shadow-none">
            <h3 className="mb-4 text-lg font-medium">Incomes by category</h3>
            {incomeData.length > 0 ? (
              <Doughnut data={incomeChartData} />
            ) : (
              <p className="mb-2 text-gray-500 dark:text-gray-300">
                No data for the selected period
              </p>
            )}
          </div>
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-center shadow-sm dark:shadow-none">
            <h3 className="mb-4 text-lg font-medium">Expenses by category</h3>
            {expenseData.length > 0 ? (
              <Doughnut data={expenseChartData} />
            ) : (
              <p className="mb-2 text-gray-500 dark:text-gray-300">
                No data for the selected period
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseDashboard;