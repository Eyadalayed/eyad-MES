import React, { useState, useEffect } from 'react';
import { getPallets, createPallet } from '../services/api';
import axios from 'axios';

interface Pallet {
  id: number;
  job_order_id: number;
  status: string;
  qr_code: string;
}

const PalletList: React.FC = () => {
  const [pallets, setPallets] = useState<Pallet[]>([]);
  const [newJobOrderId, setNewJobOrderId] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPallets();
  }, []);

  const fetchPallets = async () => {
    try {
      const response = await getPallets();
      setPallets(response.data);
    } catch (error) {
      console.error('Error fetching pallets:', error);
      setError('Failed to fetch pallets. Please try again.');
    }
  };

  const handleCreatePallet = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      console.log('Attempting to create pallet for job order:', newJobOrderId);
      const response = await createPallet(parseInt(newJobOrderId));
      console.log('Pallet creation response:', response);
      setNewJobOrderId('');
      fetchPallets(); // Refresh the list after creating a new pallet
    } catch (error) {
      console.error('Error creating pallet:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          setError(error.response.data.message || 'Failed to create pallet. Please try again.');
        } else if (error.request) {
          console.error('Error request:', error.request);
          setError('No response received from server. Please try again.');
        } else {
          setError('Failed to create pallet. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Pallets</h2>
      <form onSubmit={handleCreatePallet}>
        <input
          type="number"
          value={newJobOrderId}
          onChange={(e) => setNewJobOrderId(e.target.value)}
          placeholder="Job Order ID"
          required
        />
        <button type="submit">Create Pallet</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {pallets.map(pallet => (
          <li key={pallet.id}>
            Pallet ID: {pallet.id}, Job Order: {pallet.job_order_id}, Status: {pallet.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PalletList;