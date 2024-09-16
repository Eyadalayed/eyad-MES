import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../services/api';

interface DashboardData {
  totalJobOrders: number;
  completedJobOrders: number;
  totalPallets: number;
  palletsInWarehouse: number;
  qualityCheckPassRate: number;
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await getDashboardData();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  if (!dashboardData) return <div>Loading dashboard data...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Job Orders</h3>
        <p>Total Job Orders: {dashboardData.totalJobOrders}</p>
        <p>Completed Job Orders: {dashboardData.completedJobOrders}</p>
        <p>Completion Rate: {((dashboardData.completedJobOrders / dashboardData.totalJobOrders) * 100).toFixed(2)}%</p>
      </div>
      <div>
        <h3>Pallets</h3>
        <p>Total Pallets: {dashboardData.totalPallets}</p>
        <p>Pallets in Warehouse: {dashboardData.palletsInWarehouse}</p>
        <p>Quality Check Pass Rate: {dashboardData.qualityCheckPassRate.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default Dashboard;