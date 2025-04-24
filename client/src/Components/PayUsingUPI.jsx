import React, { useState } from "react";

const PayUsingUPI = () => {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMoney = () => {
    if (!upiId || !amount) {
      alert("Please enter both UPI ID and amount.");
      return;
    }
    alert(`Sending ₹${amount} to ${upiId}${message ? ` with message: "${message}"` : ""}`);
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-center">Transfer Using UPI ID</h2>
        <p className="text-sm mb-6 text-center text-gray-600 dark:text-gray-300">
          Enter the recipient's UPI ID and amount to transfer money instantly.
        </p>

        <div className="space-y-4">
          <input
            id="upiId"
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter UPI ID"
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          />

          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount (₹)"
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          />

          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message (optional)"
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={handleSendMoney}
          className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition duration-200"
        >
          Send Money
        </button>
      </div>
    </div>
  );
};

export default PayUsingUPI;
