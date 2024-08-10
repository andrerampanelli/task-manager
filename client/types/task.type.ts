export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed'
}
export type Task = {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  position: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTask = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  position: number;
};

export type SummaryData = {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  createdThisMonth: number;
  createdLastMonth: number;
  tasksCreatedByMonth: CreatedByMonth[];
  tasksByStatusByMonth: ByStatusByMonth[];
};

type CreatedByMonth = {
  date: string;
  count: number;
};

type ByStatusByMonth = {
  status: string;
  date: string;
  count: number;
};
