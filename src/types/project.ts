export interface Project {
  _id: string;
  name: string;
  budget: number;
  rate: number;
  due_date: Date;
  category_name: [];
  task_ids: [];
  invoice_ids: [];
  client_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectOption {
  clientName: string;
  projectName: string;
  projectId: string;
  task_ids: [];
}
