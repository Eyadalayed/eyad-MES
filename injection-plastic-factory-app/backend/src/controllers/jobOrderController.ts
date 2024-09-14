import { Request, Response } from 'express';
import pool from '../database';
import { JobOrder } from '../models/dbModels';

export const createJobOrder = async (req: Request, res: Response) => {
  const { order_number, product_name, quantity, due_date, special_instructions } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO job_orders (order_number, product_name, quantity, status, due_date, special_instructions) VALUES (?, ?, ?, ?, ?, ?)',
      [order_number, product_name, quantity, 'Pending', due_date, special_instructions]
    );
    res.status(201).json({ message: 'Job order created successfully', id: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job order', error });
  }
};

export const getJobOrders = async (req: Request, res: Response) => {
  try {
    const [jobOrders] = await pool.query('SELECT * FROM job_orders');
    res.json(jobOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job orders', error });
  }
};

export const getJobOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [jobOrders] = await pool.query('SELECT * FROM job_orders WHERE id = ?', [id]);
    if ((jobOrders as any[]).length === 0) {
      return res.status(404).json({ message: 'Job order not found' });
    }
    res.json((jobOrders as any[])[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job order', error });
  }
};

export const updateJobOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await pool.query('UPDATE job_orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Job order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job order status', error });
  }
};

export const getJobOrderProgress = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [jobOrders] = await pool.query('SELECT * FROM job_orders WHERE id = ?', [id]);
    const [pallets] = await pool.query('SELECT COUNT(*) as completed FROM pallets WHERE job_order_id = ? AND status = "In Warehouse"', [id]);
    
    if ((jobOrders as any[]).length === 0) {
      return res.status(404).json({ message: 'Job order not found' });
    }

    const jobOrder = (jobOrders as any[])[0] as JobOrder;
    const completedPallets = (pallets as any[])[0].completed;

    res.json({
      jobOrder,
      completedPallets,
      totalPallets: jobOrder.quantity,
      progress: (completedPallets / jobOrder.quantity) * 100
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting job order progress', error });
  }
};