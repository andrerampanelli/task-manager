import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/common/handler.interface';
import { UpdateTaskDto } from 'src/modules/task/dto/update-task.dto';
import { Task } from 'src/modules/task/schemas/task.schema';
import { TaskService } from 'src/modules/task/task.service';

@Injectable()
export class EditTaskHandler implements IHandler {
  constructor(private readonly taskService: TaskService) {}

  handle(id: string, dto: UpdateTaskDto): Promise<Task> {
    return this.taskService.editTask(id, dto);
  }
}
