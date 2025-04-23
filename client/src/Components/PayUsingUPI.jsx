import React, { useState } from "react";

const PayUsingUPI = () => {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSendMoney = () => {
    // Logic for sending money (can be customized)
    console.log(`Sending money to UPI ID: ${upiId} for amount: ₹${amount}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Transfer Using UPI ID
        </h2>
        <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
          Enter the recipient's UPI ID and amount to transfer money instantly.
        </p>

        <div className="mb-4">
          <label htmlFor="upiId" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            UPI ID
          </label>
          <input
            id="upiId"
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter UPI ID"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSendMoney}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Send Money
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayUsingUPI;