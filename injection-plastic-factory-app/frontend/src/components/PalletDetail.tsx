import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPalletById, updatePalletStatus, performQualityCheck } from '../services/api';

interface Pallet {
  id: number;
  job_order_id: number;
  status: 'Produced' | 'Quality Checked' | 'In Warehouse' | 'Failed Quality Check';
  qr_code: string;
  quality_check_result?: 'Pass' | 'Fail';
  quality_check_notes?: string;
}

const PalletDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pallet, setPallet] = useState<Pallet | null>(null);
  const [qualityCheckNotes, setQualityCheckNotes] = useState('');

  useEffect(() => {
    fetchPalletDetails();
  }, [id]);

  const fetchPalletDetails = async () => {
    try {
      const response = await getPalletById(id!);
      setPallet(response.data);
    } catch (error) {
      console.error('Error fetching pallet details:', error);
    }
  };

  const handleStatusUpdate = async (newStatus: Pallet['status']) => {
    try {
      await updatePalletStatus(id!, newStatus);
      setPallet(prevState => prevState ? { ...prevState, status: newStatus } : null);
    } catch (error) {
      console.error('Error updating pallet status:', error);
    }
  };

  const handleQualityCheck = async (result: 'Pass' | 'Fail') => {
    try {
      await performQualityCheck(id!, result, qualityCheckNotes);
      fetchPalletDetails(); // Refresh pallet details after quality check
    } catch (error) {
      console.error('Error performing quality check:', error);
    }
  };

  if (!pallet) return <div>Loading...</div>;

  return (
    <div>
      <h2>Pallet: {pallet.id}</h2>
      <p>Job Order ID: {pallet.job_order_id}</p>
      <p>Status: {pallet.status}</p>
      <p>QR Code: {pallet.qr_code}</p>
      {pallet.quality_check_result && (
        <p>Quality Check Result: {pallet.quality_check_result}</p>
      )}
      {pallet.quality_check_notes && (
        <p>Quality Check Notes: {pallet.quality_check_notes}</p>
      )}
      {pallet.status === 'Produced' && (
        <div>
          <h3>Perform Quality Check</h3>
          <textarea
            value={qualityCheckNotes}
            onChange={(e) => setQualityCheckNotes(e.target.value)}
            placeholder="Enter quality check notes"
          />
          <button onClick={() => handleQualityCheck('Pass')}>Pass Quality Check</button>
          <button onClick={() => handleQualityCheck('Fail')}>Fail Quality Check</button>
        </div>
      )}
      <button onClick={() => handleStatusUpdate('In Warehouse')} disabled={pallet.status !== 'Quality Checked'}>Move to Warehouse</button>
      <button onClick={() => navigate('/pallets')}>Back to Pallets</button>
    </div>
  );
};

export default PalletDetail;