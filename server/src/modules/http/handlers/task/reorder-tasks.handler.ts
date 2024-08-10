import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/common/handler.interface';
import { ReorderTasksDto } from 'src/modules/task/dto/reorder-tasks.dto';
import { Task } from 'src/modules/task/schemas/task.schema';
import { TaskService } from 'src/modules/task/task.service';

@Injectable()
export class ReorderTasksHandler implements IHandler {
  constructor(private readonly taskService: TaskService) {}

  handle(dto: ReorderTasksDto): Promise<Task[]> {
    return this.taskService.reorderTasks(dto.tasks);
  }
}
