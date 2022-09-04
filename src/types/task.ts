export interface Time {
  startDate: Date;
  endDate: Date;
  _id: string;
}

export interface Task {
  _id: string;
  name: string;
  category: string;
  isDone: boolean;
  time_trackings: Time[];
  project_id: string;
  createdAt: Date;
  updatedAt: Date;
}
