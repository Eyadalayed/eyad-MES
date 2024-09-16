import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobOrderById, updateJobOrderStatus, getJobOrderProgress } from '../services/api';

interface JobOrder {
  id: number;
  order_number: string;
  product_name: string;
  quantity: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  due_date: string;
  special_instructions?: string;
}

const JobOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [jobOrder, setJobOrder] = useState<JobOrder | null>(null);
  const [completedPallets, setCompletedPallets] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchJobOrderDetails();
  }, [id]);

  const fetchJobOrderDetails = async () => {
    try {
      const orderResponse = await getJobOrderById(id!);
      setJobOrder(orderResponse.data);

      const progressResponse = await getJobOrderProgress(id!);
      setCompletedPallets(progressResponse.data.completedPallets);
      setProgress(progressResponse.data.progress);
    } catch (error) {
      console.error('Error fetching job order details:', error);
    }
  };

  const handleStatusUpdate = async (newStatus: 'Pending' | 'In Progress' | 'Completed') => {
    try {
      await updateJobOrderStatus(id!, newStatus);
      setJobOrder(prevState => prevState ? { ...prevState, status: newStatus } : null);
    } catch (error) {
      console.error('Error updating job order status:', error);
    }
  };

  if (!jobOrder) return <div>Loading...</div>;

  return (
    <div>
      <h2>Job Order: {jobOrder.order_number}</h2>
      <p>Product: {jobOrder.product_name}</p>
      <p>Quantity: {jobOrder.quantity}</p>
      <p>Status: {jobOrder.status}</p>
      <p>Due Date: {new Date(jobOrder.due_date).toLocaleDateString()}</p>
      <p>Special Instructions: {jobOrder.special_instructions || 'None'}</p>
      <p>Progress: {completedPallets} / {jobOrder.quantity} pallets completed ({progress.toFixed(2)}%)</p>
      <button onClick={() => handleStatusUpdate('In Progress')} disabled={jobOrder.status !== 'Pending'}>Start Production</button>
      <button onClick={() => handleStatusUpdate('Completed')} disabled={jobOrder.status === 'Completed'}>Mark as Completed</button>
      <button onClick={() => navigate('/job-orders')}>Back to Job Orders</button>
    </div>
  );
};

export default JobOrderDetail;