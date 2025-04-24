import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PayUsingScanQR from "../Components/PayUsingScanQR";
import PayUsingNumber from "../Components/PayUsingNumber";
import PayUsingUPI from "../Components/PayUsingUPI";
import PayUsingCard from "../Components/PayUsingCard";
import { Menu, X } from "lucide-react";

const TransferMoney = () => {
  const [selectedOption, setSelectedOption] = useState("number");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="dark:bg-gray-900 dark:text-white min-h-screen flex flex-col relative">
      <Navbar />

      {/* Mobile Menu Toggle */}
      <div className="md:hidden p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
        <h2 className="text-sm font-bold">Transfer Money</h2>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Slide-in Menu Panel (only on mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gray-100 dark:bg-gray-800 shadow-md z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-base font-bold">Transfer Options</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <ul className="flex flex-col gap-2 p-4 text-sm">
          {[{ key: "qr", icon: "📷", label: "Scan QR / Upload" }, 
            { key: "number", icon: "📱", label: "Mobile Number" }, 
            { key: "upi", icon: "💸", label: "UPI ID" }, 
            { key: "card", icon: "💳", label: "Credit / Debit Card" }].map(({ key, icon, label }) => (
            <li key={key}>
              <button
                onClick={() => {
                  setSelectedOption(key);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-md transition-all flex items-center gap-3 ${selectedOption === key ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"}`}
              >
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-grow">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-1/4 bg-gray-100 dark:bg-gray-800 p-6 border-r border-gray-300 dark:border-gray-700">
          <h2 className="text-base md:text-xl font-bold mb-4">Transfer Options</h2>
          <ul className="flex flex-col gap-4 text-sm md:text-base">
            {[{ key: "qr", icon: "📷", label: "Scan QR / Upload" }, 
              { key: "number", icon: "📱", label: "Mobile Number" }, 
              { key: "upi", icon: "💸", label: "UPI ID" }, 
              { key: "card", icon: "💳", label: "Credit / Debit Card" }].map(({ key, icon, label }) => (
              <li key={key}>
                <button
                  onClick={() => setSelectedOption(key)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-all flex items-center gap-3 ${selectedOption === key ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"}`}
                >
                  <span className="text-base md:text-lg">{icon}</span>
                  <span className="text-sm md:text-base">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 p-4 md:p-6 text-sm md:text-base">
          {renderComponent()}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TransferMoney;
