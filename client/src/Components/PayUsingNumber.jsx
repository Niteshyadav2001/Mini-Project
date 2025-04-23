import React, { useState } from "react";

const PayUsingNumber = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = () => {
    if (!mobileNumber || !amount) {
      alert("Please enter both mobile number and amount.");
      return;
    }
    alert(`Sending ₹${amount} to ${mobileNumber}`);
    // Add your backend call or logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Transfer Using Mobile Number
        </h2>
        <p className="mb-4 text-center">
          Enter the recipient's mobile number and amount to transfer money securely.
        </p>
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="w-full mb-4 p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleSend}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PayUsingNumber;