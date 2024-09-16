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
  const [newJobOrder, setNewJobOrder] = useState({
    order_number: '',
    product_name: '',
    quantity: 0,
    due_date: '',
  });

  useEffect(() => {
    fetchJobOrders();
  }, []);

  const fetchJobOrders = async () => {
    try {
      const response = await getJobOrders();
      setJobOrders(response.data);
    } catch (error) {
      console.error('Error fetching job orders:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewJobOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createJobOrder(newJobOrder);
      setNewJobOrder({
        order_number: '',
        product_name: '',
        quantity: 0,
        due_date: '',
      });
      fetchJobOrders();
    } catch (error) {
      console.error('Error creating job order:', error);
    }
  };

  return (
    <div>
      <h2>Job Orders</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="order_number"
          value={newJobOrder.order_number}
          onChange={handleInputChange}
          placeholder="Order Number"
          required
        />
        <input
          type="text"
          name="product_name"
          value={newJobOrder.product_name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newJobOrder.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          required
        />
        <input
          type="date"
          name="due_date"
          value={newJobOrder.due_date}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Job Order</button>
      </form>
      <ul>
        {jobOrders.map(jobOrder => (
          <li key={jobOrder.id}>
            <Link to={`/job-orders/${jobOrder.id}`}>
              Order: {jobOrder.order_number} - {jobOrder.product_name} ({jobOrder.status})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobOrderList;