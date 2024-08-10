import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../auth/schema/user.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly model: Model<Task>) {}

  async listTasks(): Promise<Task[]> {
  }

  async getTask(id: string): Promise<Task> {
  }

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
  }

  async editTask(id: string, dto: UpdateTaskDto): Promise<Task> {
  }

  async deleteTask(id: string): Promise<Task> {
  }

  getSummary() {
  }

  async reorderTasks(tasks: string[]): Promise<Task[]> {
  }
}
