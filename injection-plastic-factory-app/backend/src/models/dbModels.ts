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
    status: 'Produced' | 'Quality Checked' | 'In Warehouse';
    qr_code: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface User {
    id: number;
    username: string;
    password: string;
    role: 'user' | 'manager' | 'admin';
    created_at: Date;
    updated_at: Date;
  }