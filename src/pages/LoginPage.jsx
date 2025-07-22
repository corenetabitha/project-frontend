import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fdf6e3] to-[#f5f0e6] px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-1 text-gray-800">
          Welcome to <span className="text-indigo-600">Booked</span>
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to your account
        </p>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
