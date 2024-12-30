import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { login, register, setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom'; 

const useAuth = () => {
  const { dispatch } = useContext(TaskContext);
  const navigate = useNavigate(); 

  const handleLogin = async credentials => {
    try {
      const { data } = await login(credentials);
      localStorage.setItem('token', data.token);//guardamos token el localstorage
      setAuthToken(data.token);
      dispatch({ type: 'SET_USER', payload: data.user });
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const handleRegister = async userDetails => {
    try {
      console.log('Datos enviados al registro:', userDetails); // Verifica los datos
      await register(userDetails);
      return true;
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      return false;
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
  };
};

export default useAuth;
