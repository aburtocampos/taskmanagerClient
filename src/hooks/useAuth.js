import React, { useState,useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { login, register, setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom'; 

const useAuth = () => {
  const { dispatch } = useContext(TaskContext);
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);

  const handleLogin = async credentials => {
    setLoading(true); // Show loader
    try {
      const { data } = await login(credentials);
      localStorage.setItem('token', data.token); // Store token
      setAuthToken(data.token);
      dispatch({ type: 'SET_USER', payload: data.user });
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleRegister = async userDetails => {
    setLoading(true); // Show loader
    try {
      console.log('Data sent to register:', userDetails); // Log data
      await register(userDetails);
      return true;
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      return false;
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    loading,
  };
};

export default useAuth;
