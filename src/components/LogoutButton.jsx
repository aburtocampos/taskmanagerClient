import React from 'react';
import useAuth from '../hooks/useAuth';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const { handleLogout } = useAuth();

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >

      <FaSignOutAlt className="mr-0 md:mr-2 inline" size={20} /> 
      <span className="hidden md:inline">Cerrar Sesión</span>
    </button>
  );
};

export default LogoutButton;
