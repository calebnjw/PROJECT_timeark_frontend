export interface InvoiceProps {
  _id: string;
  client_name: string;
  client_id: [];
  project_name: string;
  project_id: [];
}

export interface FormProps {
  _id: string;
  project_id: string;
  client_id: string;
  issuedDate: Date;
  dueDate: Date;
  company: string;
  address: string;

}

export interface TableProps {
  client:{
    _id?: string,
    project_id?: string,
    issuedDate?: Date,
    dueDate?: Date
  }
}