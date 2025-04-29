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
        const response = await axios.get("http://localhost:5000/transactions");
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/process-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from server:", response.data);

      const newTransactions = response.data.transactions;
      setTransactions((prevTransactions) => [...prevTransactions, ...newTransactions]);
      alert("Transactions successfully added!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to process the image.");
      alert(error);
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
            <label
              htmlFor="upload-image"
              className="bg-yellow-500 dark:bg-[#ffcc00] text-black px-3 py-2 sm:px-4 sm:py-2 rounded font-bold hover:scale-105 hover:shadow-lg transition text-sm cursor-pointer"
            >
              Upload
            </label>
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
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
                  Quantity
                </th>
                <th className="border border-gray-300 dark:border-[#555] p-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 dark:border-[#555] p-3">
                    {transaction.Description || "NA"}
                  </td>
                  <td className="border border-gray-300 dark:border-[#555] p-3">
                    {transaction.Item || "NA"}
                  </td>
                  <td className="border border-gray-300 dark:border-[#555] p-3">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 dark:border-[#555] p-3">
                    {transaction.Quantity || "NA"}
                  </td>
                  <td className="border border-gray-300 dark:border-[#555] p-3">
                    {transaction.Amount || "NA"}
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
        </footer>
      </div>
    </>
  );
};

export default TransactionsHistory;