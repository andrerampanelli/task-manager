import { TaskStatus } from '../schemas/task.schema';

export type SummaryData = {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  createdThisMonth: number;
  createdLastMonth: number;
  tasksCreatedByMonth: CreatedByMonth[];
  tasksByStatusByMonth: unknown[];
};

export type CreatedByMonth = {
  date: string;
  count: number;
};
