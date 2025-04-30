import React, { useState } from "react";
import axios from "axios";
import { SEND_MONEY_API } from "../utils/constants"; // Add the API endpoint in your constants file

const PayUsingNumber = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!mobileNumber || !amount) {
      alert("Please enter both mobile number and amount.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        SEND_MONEY_API,
        {
          phoneNumber: mobileNumber,
          amount: parseFloat(amount),
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT is used
          },
        }
      );

      alert(response.data.message || "Money sent successfully!");
      setMobileNumber("");
      setAmount("");
      setMessage("");
    } catch (error) {
      console.error("Error sending money:", error);
      alert(
        error.response?.data?.message || "Failed to send money. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          className={`mt-6 w-full py-3 ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white text-sm font-semibold rounded transition duration-200`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default PayUsingNumber;