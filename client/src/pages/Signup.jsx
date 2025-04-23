import React from "react";
import { Link } from "react-router-dom"; // Import the Link component

const Signup = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(payment.png)" }}
      ></div>

      {/* Right side with signup form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

          {/* Signup Form */}
          <form action="#" method="POST">
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login" // Use Link for navigation
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
