import React, { useState, useEffect } from "react";
import ExpenseNavbar from "./ExpenseNavbar";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";
import { GET_ALL_TRANSACTIONS, ADD_TRANSACTION } from "../utils/constants";

const TransactionsHistory = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2025, 3, 9),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showAddTransactionCard, setShowAddTransactionCard] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    category: "",
    description: "",
    date: "",
    quantity: "",
    amount: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(GET_ALL_TRANSACTIONS, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT is used
          },
        });
        setTransactions(response.data); // Assuming the API returns an array of transactions
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleAddTransaction = async () => {
    try {
      const response = await axios.post(
        ADD_TRANSACTION,
        newTransaction,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message || "Transaction added successfully!");
      setTransactions((prev) => [...prev, response.data.transaction]);
      setShowAddTransactionCard(false);
      setNewTransaction({
        category: "",
        description: "",
        date: "",
        quantity: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction. Please try again.");
    }
  };

  return (
    <>
      <ExpenseNavbar />
      <div className="bg-white dark:bg-gradient-to-br dark:from-[#1e1e1e] dark:to-[#2c2c2c] text-black dark:text-white w-full p-4 sm:p-6 flex flex-col gap-6 min-h-screen transition-colors duration-300">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-[#ffcc00]">
            Transactions History
          </h1>
          <button
            onClick={() => setShowAddTransactionCard(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold text-sm"
          >
            Add Transaction
          </button>
        </header>

        {/* Add Transaction Card */}
        {showAddTransactionCard && (
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <div className="space-y-4">
              {/* Dropdown for Category */}
              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, category: e.target.value })
                }
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="IncomeCategory">IncomeCategory</option>
                <option value="ExpenseCategory">ExpenseCategory</option>
              </select>

              <input
                type="text"
                placeholder="Description"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, description: e.target.value })
                }
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
              />
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newTransaction.quantity}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, quantity: e.target.value })
                }
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="Amount (₹)"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, amount: e.target.value })
                }
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleAddTransaction}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold text-sm"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddTransactionCard(false)}
                className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-black dark:text-white px-4 py-2 rounded font-bold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-left border-collapse border border-gray-300 dark:border-[#555] bg-white dark:bg-[#1e1e1e] text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-[#333] text-yellow-700 dark:text-[#ffcc00] font-bold">
                <th className="border border-gray-300 dark:border-[#555] p-3">
                  Category
                </th>
                <th className="border border-gray-300 dark:border-[#555] p-3">
                  Description
                </th>
                <th className="border border-gray-300 dark:border-[#555] p-3">
                  Date
                </th>
                <th className="border border-gray-300 dark:border-[#555] p-3">
                  Quantity
                </th>
                <th className="border border-gray-300 dark:border-[#555] p-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 dark:border-[#555] p-3">
                      {transaction.category || "NA"}
                    </td>
                    <td className="border border-gray-300 dark:border-[#555] p-3">
                      {transaction.description || "NA"}
                    </td>
                    <td className="border border-gray-300 dark:border-[#555] p-3">
                      {new Date(transaction.date).toLocaleDateString() || "NA"}
                    </td>
                    <td className="border border-gray-300 dark:border-[#555] p-3">
                      {transaction.quantity || "NA"}
                    </td>
                    <td className="border border-gray-300 dark:border-[#555] p-3">
                      ₹{transaction.amount || "NA"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="border border-gray-300 dark:border-[#555] p-3 text-center"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionsHistory;