// export interface ProjectId {
//   project_ids: [];
// }

export interface Client {
  _id: string;
  client_name: string;
  billing_details: object;
  project_ids: [];
  createdAt: string;
  updatedAt: string;
}
