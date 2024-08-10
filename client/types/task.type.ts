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
};

export type CreateTask = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  position: number;
};
