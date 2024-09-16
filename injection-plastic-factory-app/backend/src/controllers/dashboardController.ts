import { Request, Response } from 'express';
import pool from '../database';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const [totalJobOrders] = await pool.query('SELECT COUNT(*) as count FROM job_orders');
    const [completedJobOrders] = await pool.query('SELECT COUNT(*) as count FROM job_orders WHERE status = "Completed"');
    const [totalPallets] = await pool.query('SELECT COUNT(*) as count FROM pallets');
    const [palletsInWarehouse] = await pool.query('SELECT COUNT(*) as count FROM pallets WHERE status = "In Warehouse"');
    const [qualityCheckPasses] = await pool.query('SELECT COUNT(*) as count FROM pallets WHERE quality_check_result = "Pass"');

    const dashboardData = {
      totalJobOrders: (totalJobOrders as any[])[0].count,
      completedJobOrders: (completedJobOrders as any[])[0].count,
      totalPallets: (totalPallets as any[])[0].count,
      palletsInWarehouse: (palletsInWarehouse as any[])[0].count,
      qualityCheckPassRate: ((qualityCheckPasses as any[])[0].count / (totalPallets as any[])[0].count) * 100 || 0
    };

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};