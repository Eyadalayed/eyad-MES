import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;