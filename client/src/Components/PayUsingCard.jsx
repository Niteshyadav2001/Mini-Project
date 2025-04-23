import React, { useState } from "react";

const PayUsingCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    // Payment processing logic
    console.log("Processing card payment:", { cardNumber, cardName, expiry, cvv });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Card Payment
        </h2>
        <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
          Enter your card details to complete the payment
        </p>

        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardName" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Cardholder Name
          </label>
          <input
            id="cardName"
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Name on card"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Expiry Date
            </label>
            <input
              id="expiry"
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              CVV
            </label>
            <input
              id="cvv"
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="•••"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayUsingCard;