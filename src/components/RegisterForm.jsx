import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from "../features/auth/authSlice";
import { useNavigate, Link } from 'react-router-dom'; 

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '', 
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const resultAction = await dispatch(registerUser(formData));

      // Check if registration was successful
      if (registerUser.fulfilled.match(resultAction)) {
        alert('Registration successful! Please log in.');
        navigate('/login'); // Redirect to login page on success
      } else {
        // Handle registration failure
        const errorPayload = resultAction.payload;
        if (errorPayload && typeof errorPayload === 'object') {
          // Attempt to parse specific error messages from backend
          if (errorPayload.email) {
            setError(`Email: ${errorPayload.email.join(', ')}`);
          } else if (errorPayload.username) {
            setError(`Username: ${errorPayload.username.join(', ')}`);
          } else if (errorPayload.password) {
            setError(`Password: ${errorPayload.password.join(', ')}`);
          } else if (errorPayload.password2) {
             setError(`Password confirmation: ${errorPayload.password2.join(', ')}`);
          } else if (errorPayload.detail) {
            setError(errorPayload.detail);
          } else {
            setError('Registration failed. Please check your inputs.');
          }
        } else {
          setError(errorPayload || 'An unknown error occurred during registration.');
        }
      }
    } catch (err) {
      console.error("Registration dispatch error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fdf6e3] to-[#f5f0e6] px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-1 text-gray-800">
          Register for <span className="text-indigo-600">Booked</span>
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create your new account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              placeholder="Confirm your password"
              value={formData.password2}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
