import { CreateTask, Task } from '@/types/task.type';
import { BaseApi } from './base.api';

export class TaskApi extends BaseApi {
  private readonly token: string;

  constructor(token: string) {
    super();
    this.token = token;
  }

  addAuthorizationHeader(headers: RequestInit['headers']) {
    return {
      ...headers,
      Authorization: `Bearer ${this.token}`
    };
  }

  async getTasks(): Promise<Task[]> {
    return this.get<Task[]>('/tasks', {
      Authorization: `Bearer ${this.token}`
    });
  }

  async getTask(id: string): Promise<Task> {
    return this.get<Task>(`/tasks/${id}`, {
      Authorization: `Bearer ${this.token}`
    });
  }

  async createTask(task: CreateTask) {
    return this.post<CreateTask, Task>('/tasks', task, {
      Authorization: `Bearer ${this.token}`
    });
  }

  async updateTask(task: Partial<Task>) {
    return this.put<Partial<Task>, Task>(`/tasks/${task._id}`, task, {
      Authorization: `Bearer ${this.token}`
    });
  }

  async deleteTask(id: string) {
    return this.delete<Task>(`/tasks/${id}`, {
      Authorization: `Bearer ${this.token}`
    });
  }

  async reorderTasks(taskIds: string[]) {
    return this.post<{ tasks: string[] }, Task[]>(
      '/tasks/reorder',
      { tasks: taskIds },
      {
        Authorization: `Bearer ${this.token}`
      }
    );
  }
}
