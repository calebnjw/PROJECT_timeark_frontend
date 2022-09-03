export interface Time {
  startDate: Date;
  endDate: Date;
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
