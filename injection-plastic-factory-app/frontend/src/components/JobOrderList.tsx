import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobOrders, createJobOrder } from '../services/api';

interface JobOrder {
  id: number;
  order_number: string;
  product_name: string;
  quantity: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  due_date: string;
}

const JobOrderList: React.FC = () => {
  const [jobOrders, setJobOrders] = useState<JobOrder[]>([]);
  const [newOrderNumber, setNewOrderNumber] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

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
      await createJobOrder({
        order_number: newOrderNumber,
        product_name: newProductName,
        quantity: parseInt(newQuantity),
        due_date: newDueDate
      });
      fetchJobOrders();
      setNewOrderNumber('');
      setNewProductName('');
      setNewQuantity('');
      setNewDueDate('');
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
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          required
        />
        <button type="submit">Create Job Order</button>
      </form>
      <ul>
        {jobOrders.map((jobOrder) => (
          <li key={jobOrder.id}>
            <Link to={`/job-orders/${jobOrder.id}`}>
              Order Number: {jobOrder.order_number}, Product: {jobOrder.product_name}, 
              Quantity: {jobOrder.quantity}, Status: {jobOrder.status}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobOrderList;