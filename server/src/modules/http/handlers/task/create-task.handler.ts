import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/common/handler.interface';
import { User } from 'src/modules/auth/schema/user.schema';
import { CreateTaskDto } from 'src/modules/task/dto/create-task.dto';
import { Task } from 'src/modules/task/schemas/task.schema';
import { TaskService } from 'src/modules/task/task.service';

@Injectable()
export class CreateTaskHandler implements IHandler {
  constructor(private readonly taskService: TaskService) {}

  handle(dto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskService.createTask(dto, user);
  }
}
