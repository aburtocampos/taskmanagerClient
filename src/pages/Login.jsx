import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Login = () => {
  const { handleLogin, loading } = useAuth(); // Use loading from useAuth
  const [credentials, setCredentials] = useState({ email: '', password: '' }); // State for email and password
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    const success = await handleLogin(credentials); // Use credentials for login
    if (success) {
      navigate('/'); // Redirect to the main page
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Task Management
        </h2>
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-100 border border-red-400 rounded px-4 py-2">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'} {/* Show loading text */}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
