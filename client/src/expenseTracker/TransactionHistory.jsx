import React, { useState, useEffect } from "react";
import ExpenseNavbar from "./ExpenseNavbar";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";

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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/process-image",
          {
            // Example: Replace with actual image data or API call logic
          }
        );
        setTransactions(response.data.transactions);
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

  // New function to send data to the backend
  const sendDataToBackend = async () => {
    try {
      const dataToSend = {
        dateRange: {
          startDate: dateRange[0].startDate,
          endDate: dateRange[0].endDate,
        },
        transactions,
      };

      const response = await axios.post(
        "http://localhost:5000/update-transactions",
        dataToSend
      );

      console.log("Response from backend:", response.data);
      alert("Data successfully sent to the backend!");
    } catch (error) {
      console.error("Error sending data to backend:", error);
      alert("Failed to send data to the backend.");
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
          <div className="flex flex-row gap-1 sm:gap-2 w-full justify-between sm:w-auto sm:justify-normal">
            <button className="bg-yellow-500 dark:bg-[#ffcc00] text-black px-3 py-2 sm:px-4 sm:py-2 rounded font-bold hover:scale-105 hover:shadow-lg transition text-sm">
              View
            </button>
            <button className="bg-yellow-500 dark:bg-[#ffcc00] text-black px-3 py-2 sm:px-4 sm:py-2 rounded font-bold hover:scale-105 hover:shadow-lg transition text-sm">
              Export CSV
            </button>
          </div>
        </header>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex gap-2 flex-wrap">
            <button className="bg-gray-200 dark:bg-[#333] dark:text-white text-black px-4 py-2 rounded font-bold hover:bg-gray-300 dark:hover:bg-[#555] text-sm hidden sm:block">
              + Category
            </button>
            <button className="bg-gray-200 dark:bg-[#333] dark:text-white text-black px-4 py-2 rounded font-bold hover:bg-gray-300 dark:hover:bg-[#555] text-sm">
              + Type
            </button>
          </div>

          {/* Date Picker */}
          <div className="relative">
            <div className="bg-gray-100 dark:bg-[#444] px-4 py-2 rounded font-bold text-yellow-600 dark:text-[#ffcc00] text-sm w-fit">
              <button onClick={toggleDatePicker}>
                {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
              </button>
            </div>
            {showDatePicker && (
              <div className="absolute z-50 mt-1">
                <DateRangePicker
                  ranges={dateRange}
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  showMonthAndYearPickers={false}
                  className="date-range-picker"
                  showSelectionPreview={true}
                  staticRanges={[]} // This hides the predefined ranges panel
                  inputRanges={[]} // This hides the input ranges panel
                />
              </div>
            )}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-left border-collapse border border-gray-300 dark:border-[#555] bg-white dark:bg-[#1e1e1e] text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-[#333] text-yellow-700 dark:text-[#ffcc00] font-bold">
                <th className="border border-gray-300 dark:border-[#555] p-3 hidden sm:table-cell">
                  Category
                </th>
                <th className="border border-gray-300 dark:border-[#555] p-3">
                  Description
                </th>
                <th className="border border-gray-300 dark:border-[#555] p-3">
                  Date
                </th>
                <th className="border border-gray-300 dark:border-[#555] p-3">
                  Type
                </th>
                <th className="border border-gray-300 dark:border-[#555] p-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 dark:border-[#555] p-3 hidden sm:table-cell">
                    {transaction.category}
                  </td>
                  <td className="border border-gray-300 dark:border-[#555] p-3">
                    {transaction.description}
                  </td>
                  <td className="border border-gray-300 dark:border-[#555] p-3">
                    {transaction.date}
                  </td>
                  <td className="border border-gray-300 dark:border-[#555] p-3">
                    {transaction.type}
                  </td>
                  <td className="border border-gray-300 dark:border-[#555] p-3">
                    {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <footer className="flex justify-center sm:justify-start gap-4 mt-6">
          <button className="bg-yellow-500 dark:bg-[#ffcc00] text-black px-5 py-2 rounded font-bold hover:scale-105 hover:shadow-lg transition text-sm">
            Previous
          </button>
          <button className="bg-yellow-500 dark:bg-[#ffcc00] text-black px-5 py-2 rounded font-bold hover:scale-105 hover:shadow-lg transition text-sm">
            Next
          </button>
          {/* New Button to Send Data */}
          <button
            onClick={sendDataToBackend}
            className="bg-green-500 text-white px-5 py-2 rounded font-bold hover:scale-105 hover:shadow-lg transition text-sm"
          >
            Send Data to Backend
          </button>
        </footer>
      </div>
    </>
  );
};

export default TransactionsHistory;