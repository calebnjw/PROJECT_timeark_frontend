export interface Client {
  _id: string;
  client_name: string;
  billing_details: object;
  project_ids: [];
  createdAt: Date;
  updatedAt: Date;
}
