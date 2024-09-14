import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/common/handler.interface';
import { Task } from 'src/modules/task/schemas/task.schema';
import { TaskService } from 'src/modules/task/task.service';

@Injectable()
export class ListKanbanTasksHandler implements IHandler {
  constructor(private readonly taskService: TaskService) {}

  handle(): Promise<Task[]> {
    return this.taskService.listKanbanTasks();
  }
}
