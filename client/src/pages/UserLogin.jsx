import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const UserLogin = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(payment.png)" }}
      ></div>

      {/* Right side with login form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          {/* Login Form */}
          <form action="#" method="POST">
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

            <div className="mb-6">
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

            <div className="flex justify-between items-center mb-6">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"  // Use Link to navigate to Signup page
                className="text-blue-600 hover:underline"
              >
                Create Account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
