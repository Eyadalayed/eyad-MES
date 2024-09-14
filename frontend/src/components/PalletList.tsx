import React, { useEffect, useState } from 'react';
import { getPallets, createPallet } from '../services/api';

interface Pallet {
  id: number;
  job_order_id: number;
  qr_code: string;
  status: string;
}

const PalletList: React.FC = () => {
  const [pallets, setPallets] = useState<Pallet[]>([]);
  const [newJobOrderId, setNewJobOrderId] = useState('');

  useEffect(() => {
    fetchPallets();
  }, []);

  const fetchPallets = async () => {
    try {
      const response = await getPallets();
      setPallets(response.data);
    } catch (error) {
      console.error('Failed to fetch pallets:', error);
    }
  };

  const handleCreatePallet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPallet(parseInt(newJobOrderId));
      fetchPallets();
      setNewJobOrderId('');
    } catch (error) {
      console.error('Failed to create pallet:', error);
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
      <ul>
        {pallets.map((pallet) => (
          <li key={pallet.id}>
            Pallet ID: {pallet.id}, Job Order: {pallet.job_order_id}, Status: {pallet.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PalletList;