import React, { useState } from "react";

const PayUsingCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = () => {
    if (!cardNumber || !cardName || !expiry || !cvv) {
      alert("Please fill in all card details.");
      return;
    }
    alert(`Processing payment with card ending in ${cardNumber.slice(-4)}${message ? ` with message: "${message}"` : ""}`);
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-center">Card Payment</h2>
        <p className="text-sm mb-6 text-center text-gray-600 dark:text-gray-300">
          Enter your card details to complete the payment.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Card Number"
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          />

          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Cardholder Name"
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
            />

            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
            />
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message (optional)"
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition duration-200"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PayUsingCard;
