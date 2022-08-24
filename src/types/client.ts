export interface Client {
  _id: string;
  client_name: string;
  billing_details: object;
  project_ids: [];
  // user_id: string; // To be added
  createdAt: Date;
  updatedAt: Date;
}
