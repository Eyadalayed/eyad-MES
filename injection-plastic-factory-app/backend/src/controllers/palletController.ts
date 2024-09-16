import { Request, Response } from 'express';
import pool from '../database';
import { generateQRCode } from '../utils/qrCodeGenerator';

export const createPallet = async (req: Request, res: Response) => {
  const { job_order_id } = req.body;
  console.log('Attempting to create pallet for job order:', job_order_id);
  try {
    // Check if the job order exists
    const [jobOrders] = await pool.query('SELECT * FROM job_orders WHERE id = ?', [job_order_id]);
    if ((jobOrders as any[]).length === 0) {
      console.log('Job order not found:', job_order_id);
      return res.status(404).json({ message: 'Job order not found' });
    }
    console.log('Job order found:', jobOrders[0]);

    const qrCode = await generateQRCode(`JO${job_order_id}-${Date.now()}`);
    console.log('QR Code generated:', qrCode);

    const [result] = await pool.query(
      'INSERT INTO pallets (job_order_id, status, qr_code) VALUES (?, "Produced", ?)',
      [job_order_id, qrCode]
    );
    console.log('Pallet inserted into database:', result);
    
    res.status(201).json({ 
      message: 'Pallet created successfully', 
      id: (result as any).insertId,
      qr_code: qrCode
    });
  } catch (error) {
    console.error('Error creating pallet:', error);
    res.status(500).json({ message: 'Error creating pallet', error: (error as Error).message });
  }
};

export const getPallets = async (req: Request, res: Response) => {
  try {
    const [pallets] = await pool.query('SELECT * FROM pallets');
    res.json(pallets);
  } catch (error) {
    console.error('Error fetching pallets:', error);
    res.status(500).json({ message: 'Error fetching pallets', error: (error as Error).message });
  }
};

export const getPalletById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [pallets] = await pool.query('SELECT * FROM pallets WHERE id = ?', [id]);
    if ((pallets as any[]).length === 0) {
      return res.status(404).json({ message: 'Pallet not found' });
    }
    res.json((pallets as any[])[0]);
  } catch (error) {
    console.error('Error fetching pallet:', error);
    res.status(500).json({ message: 'Error fetching pallet', error: (error as Error).message });
  }
};

export const updatePalletStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query('UPDATE pallets SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Pallet status updated successfully' });
  } catch (error) {
    console.error('Error updating pallet status:', error);
    res.status(500).json({ message: 'Error updating pallet status', error: (error as Error).message });
  }
};

export const performQualityCheck = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { result, notes } = req.body;
  try {
    await pool.query(
      'UPDATE pallets SET status = ?, quality_check_result = ?, quality_check_notes = ? WHERE id = ?',
      [result === 'Pass' ? 'Quality Checked' : 'Failed Quality Check', result, notes, id]
    );
    res.json({ message: 'Quality check performed successfully' });
  } catch (error) {
    console.error('Error performing quality check:', error);
    res.status(500).json({ message: 'Error performing quality check', error: (error as Error).message });
  }
};