export interface Time {
  date: Date;
  hours: number;
}

export interface Task {
  _id: string;
  name: string;
  category: string;
  isDone: boolean;
  time_tracking: Time[];
  project_id: string;
  createdAt: Date;
  updatedAt: Date;
}
