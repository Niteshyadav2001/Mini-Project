import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { LOG_IN } from "../utils/constants"; 

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOG_IN, formData);

      if (response.status === 200) {
        // Save token (optional)
        localStorage.setItem("token", response.data.token);
        alert(response.data.message);
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="flex justify-center items-center py-20">
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
                Create Account
              </Link>
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserLogin;
