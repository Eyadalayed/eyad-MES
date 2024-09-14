import React, { useEffect, useState } from 'react';
import { getJobOrders, createJobOrder } from '../services/api';

interface JobOrder {
  id: number;
  order_number: string;
  product_name: string;
  quantity: number;
  status: string;
}

const JobOrderList: React.FC = () => {
  const [jobOrders, setJobOrders] = useState<JobOrder[]>([]);
  const [newOrderNumber, setNewOrderNumber] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

  useEffect(() => {
    fetchJobOrders();
  }, []);

  const fetchJobOrders = async () => {
    try {
      const response = await getJobOrders();
      setJobOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch job orders:', error);
    }
  };

  const handleCreateJobOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createJobOrder(newOrderNumber, newProductName, parseInt(newQuantity));
      fetchJobOrders();
      setNewOrderNumber('');
      setNewProductName('');
      setNewQuantity('');
    } catch (error) {
      console.error('Failed to create job order:', error);
    }
  };

  return (
    <div>
      <h2>Job Orders</h2>
      <form onSubmit={handleCreateJobOrder}>
        <input
          type="text"
          value={newOrderNumber}
          onChange={(e) => setNewOrderNumber(e.target.value)}
          placeholder="Order Number"
          required
        />
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        <button type="submit">Create Job Order</button>
      </form>
      <ul>
        {jobOrders.map((jobOrder) => (
          <li key={jobOrder.id}>
            Order Number: {jobOrder.order_number}, Product: {jobOrder.product_name}, 
            Quantity: {jobOrder.quantity}, Status: {jobOrder.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobOrderList;