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
    return this.model.find();
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.model.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    const data = Object.assign({}, dto, { user: user._id });

    return this.model.create(data);
  }

  async editTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteTask(id: string): Promise<Task> {
    return this.model.findByIdAndDelete(id);
  }

  getSummary() {
    return {};
  }

  async reorderTasks(tasks: string[]): Promise<Task[]> {
    let taskList = [];
    tasks.map(async (task, index) => {
      taskList = [
        ...taskList,
        await this.model.findByIdAndUpdate(task, { order: index }),
      ];
    });

    return taskList;
  }
}
