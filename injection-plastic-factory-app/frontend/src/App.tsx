import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import JobOrderList from './components/JobOrderList';
import JobOrderDetail from './components/JobOrderDetail';
import PalletList from './components/PalletList';
import PalletDetail from './components/PalletDetail';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/job-orders">Job Orders</Link></li>
            <li><Link to="/pallets">Pallets</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Logout /></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job-orders" element={<JobOrderList />} />
          <Route path="/job-orders/:id" element={<JobOrderDetail />} />
          <Route path="/pallets" element={<PalletList />} />
          <Route path="/pallets/:id" element={<PalletDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;