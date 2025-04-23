import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PayUsingScanQR from "../Components/PayUsingScanQR";
import PayUsingNumber from "../Components/PayUsingNumber";
import PayUsingUPI from "../Components/PayUsingUPI";
import PayUsingCard from "../Components/PayUsingCard";

const TransferMoney = () => {
  const [selectedOption, setSelectedOption] = useState("number");

  const renderComponent = () => {
    switch (selectedOption) {
      case "qr":
        return <PayUsingScanQR />;
      case "number":
        return <PayUsingNumber />;
      case "upi":
        return <PayUsingUPI />;
      case "card":
        return <PayUsingCard />;
      default:
        return <PayUsingNumber />;
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-grow">
        {/* Left menu */}
        <div className="w-1/4 bg-gray-100 dark:bg-gray-800 p-6 border-r border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Transfer Options</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-all flex items-center gap-3 ${
                  selectedOption === "qr"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"
                }`}
                onClick={() => setSelectedOption("qr")}
              >
                <span className="text-xl">📷</span>
                Scan QR / Upload
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-all flex items-center gap-3 ${
                  selectedOption === "number"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"
                }`}
                onClick={() => setSelectedOption("number")}
              >
                <span className="text-xl">📱</span>
                Mobile Number
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-all flex items-center gap-3 ${
                  selectedOption === "upi"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"
                }`}
                onClick={() => setSelectedOption("upi")}
              >
                <span className="text-xl">💸</span>
                UPI ID
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition-all flex items-center gap-3 ${
                  selectedOption === "card"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"
                }`}
                onClick={() => setSelectedOption("card")}
              >
                <span className="text-xl">💳</span>
                Credit / Debit Card
              </button>
            </li>
          </ul>
        </div>

        {/* Right content */}
        <div className="w-3/4 p-6">{renderComponent()}</div>
      </div>

      <Footer />
    </div>
  );
};

export default TransferMoney;