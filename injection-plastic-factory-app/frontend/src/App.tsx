import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import PalletList from './components/PalletList';
import JobOrderList from './components/JobOrderList';
import { logout } from './services/api';

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/pallets">Pallets</Link></li>
            <li><Link to="/job-orders">Job Orders</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pallets" element={<PalletList />} />
          <Route path="/job-orders" element={<JobOrderList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;