export interface Project {
  _id: string;
  name: string;
  budget: number;
  rate: number;
  due_date: Date;
  category_name: [];
  tasks: [];
  invoices: [];
  client_id: string;
  createdAt: Date;
  updatedAt: Date;
}
