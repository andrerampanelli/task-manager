import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskStatus } from './schemas/task.schema';
import { Model } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../auth/schema/user.schema';
import { CreatedByMonth, SummaryData } from './types/summary.type';
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly model: Model<Task>) {}

  async listTasks(): Promise<Task[]> {
    return this.model.find().sort({ createdAt: 'ascending' }).exec();
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

  async getSummary(): Promise<SummaryData> {
    const totalTasks = await this.model.countDocuments();
    const pendingTasks = await this.model.countDocuments({ status: 'pending' });
    const inProgressTasks = await this.model.countDocuments({
      status: 'in-progress',
    });
    const completedTasks = await this.model.countDocuments({
      status: 'completed',
    });

    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const createdThisMonth = await this.model.countDocuments({
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    const previousMonth = subMonths(currentDate, 1);
    const firstDayOfPreviousMonth = startOfMonth(previousMonth);
    const lastDayOfPreviousMonth = endOfMonth(previousMonth);
    const createdLastMonth = await this.model.countDocuments({
      createdAt: {
        $gte: firstDayOfPreviousMonth,
        $lte: lastDayOfPreviousMonth,
      },
    });

    const endOfCurrentMonth = endOfMonth(currentDate);
    const startOfMonthLastYear = startOfMonth(subMonths(endOfCurrentMonth, 11));

    const tasksCreatedByMonth = await this.model.aggregate([
      {
        $match: {
          createdAt: {
            $lte: endOfCurrentMonth,
            $gte: startOfMonthLastYear,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const tasksByStatusByMonth = await this.model.aggregate([
      {
        $match: {
          createdAt: {
            $lte: endOfCurrentMonth,
            $gte: startOfMonthLastYear,
          },
        },
      },
      {
        $group: {
          _id: {
            status: '$status',
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedTasksByStatusByMonth: any[] = [];

    tasksByStatusByMonth.map(
      (item: {
        _id: { status: string; year: number; month: number };
        count: number;
      }) => {
        const key = format(
          Date.UTC(item._id.year, item._id.month, 10),
          'MMM yyyy',
        );

        const existing = formattedTasksByStatusByMonth.find(
          (date) => date.date === key,
        );
        if (existing) {
          return;
        }

        formattedTasksByStatusByMonth.push({
          date: key,
          [TaskStatus.PENDING]: 0,
          [TaskStatus.IN_PROGRESS]: 0,
          [TaskStatus.COMPLETED]: 0,
        });
      },
    );

    tasksByStatusByMonth.map(
      (item: {
        _id: { status: string; year: number; month: number };
        count: number;
      }) => {
        formattedTasksByStatusByMonth.forEach((date) => {
          if (
            date.date ===
            format(Date.UTC(item._id.year, item._id.month, 10), 'MMM yyyy')
          ) {
            date[item._id.status] = item.count;
          }
        });
      },
    );

    const formattedTasksCreatedByMonth: CreatedByMonth[] =
      tasksCreatedByMonth.map(
        (item: { _id: { year: number; month: number }; count: number }) => ({
          date: format(Date.UTC(item._id.year, item._id.month, 10), 'MMM yyyy'),
          count: item.count,
        }),
      );

    return {
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      createdThisMonth,
      createdLastMonth,
      tasksCreatedByMonth: formattedTasksCreatedByMonth,
      tasksByStatusByMonth: formattedTasksByStatusByMonth,
    };
  }

  async reorderTasks(tasks: string[]): Promise<Task[]> {
    tasks.map(
      async (id, index) =>
        await this.model.findByIdAndUpdate(id, { position: index }),
    );

    return this.model.find().sort({ position: 1 });
  }

  async listKanbanTasks(): Promise<Task[]> {
    const tasks: Task[] = [];

    const pendingTasks = await this.model
      .find({ status: TaskStatus.PENDING })
      .limit(5);
    tasks.push(...pendingTasks);

    const inProgressTasks = await this.model
      .find({ status: TaskStatus.IN_PROGRESS })
      .limit(5);
    tasks.push(...inProgressTasks);

    const completedTasks = await this.model
      .find({ status: TaskStatus.COMPLETED })
      .limit(5);
    tasks.push(...completedTasks);

    return tasks;
  }
}
