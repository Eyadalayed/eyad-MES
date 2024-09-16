export interface User {
  id: number;
  username: string;
  password: string;
  role: 'user' | 'manager' | 'production_leader' | 'quality_inspector' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface JobOrder {
  id: number;
  order_number: string;
  product_name: string;
  quantity: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  due_date: Date;
  special_instructions?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Pallet {
  id: number;
  job_order_id: number;
  status: 'Produced' | 'Quality Checked' | 'In Warehouse' | 'Failed Quality Check';
  qr_code: string;
  quality_check_result?: 'Pass' | 'Fail';
  quality_check_notes?: string;
  created_at: Date;
  updated_at: Date;
}