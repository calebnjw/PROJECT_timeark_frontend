export interface InvoiceProps {
  _id: string;
  client_name: string;
  client_id: [];
  project_name: string;
  project_id: [];
}

export interface FormProps {
  id: string;
  issuedDate: Date;
  dueDate: Date;
  company: string;
  address: string;
  project: string;
}



export interface TableProps {
  // rows: Array <{
    id: string;
    issuedDate: Date;
    dueDate: Date;
  // }>;
}