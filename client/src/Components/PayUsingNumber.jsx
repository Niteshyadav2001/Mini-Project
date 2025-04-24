import React, { useState } from "react";

const PayUsingNumber = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!mobileNumber || !amount) {
      alert("Please enter both mobile number and amount.");
      return;
    }
    alert(`Sending ₹${amount} to ${mobileNumber}${message ? ` with message: "${message}"` : ""}`);
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Transfer Using Mobile Number
        </h2>
        <p className="text-sm mb-6 text-center text-gray-600 dark:text-gray-300">
          Enter the recipient's mobile number and amount to transfer money securely.
        </p>

        <div className="space-y-4">
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          />

          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          />

          <input
            type="text"
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={handleSend}
          className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PayUsingNumber;
