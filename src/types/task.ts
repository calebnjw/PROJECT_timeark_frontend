export interface Task {
  _id: string;
  name: string;
  category: string;
  time_tracking: [];
  project_id: string;
  createdAt: Date;
  updatedAt: Date;
}
