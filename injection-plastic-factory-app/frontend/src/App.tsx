import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import JobOrderList from './components/JobOrderList';
import JobOrderDetail from './components/JobOrderDetail';
import PalletList from './components/PalletList';

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
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job-orders" element={<JobOrderList />} />
          <Route path="/job-orders/:id" element={<JobOrderDetail />} />
          <Route path="/pallets" element={<PalletList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;