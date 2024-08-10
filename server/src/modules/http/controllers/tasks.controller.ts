import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetTaskHandler } from '../handlers/task/get-task.handler';
import { ListTasksHandler } from '../handlers/task/list-tasks.handler';
import { getSummaryHandler } from '../handlers/task/get-summary.handler';
import { CreateTaskHandler } from '../handlers/task/create-task.handler';
import { EditTaskHandler } from '../handlers/task/edit-task.handler';
import { DeleteTaskHandler } from '../handlers/task/delete-task.handler';
import { Task } from 'src/modules/task/schemas/task.schema';
import { CreateTaskDto } from 'src/modules/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/task/dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserContext } from 'src/common/user.context';
import { User } from 'src/modules/auth/schema/user.schema';
import { ReorderTasksDto } from 'src/modules/task/dto/reorder-tasks.dto';
import { ReorderTasksHandler } from '../handlers/task/reorder-tasks.handler';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly getSummaryHandler: getSummaryHandler,
    private readonly listTasksHandler: ListTasksHandler,
    private readonly getTaskHandler: GetTaskHandler,
    private readonly createTaskHandler: CreateTaskHandler,
    private readonly editTaskHandler: EditTaskHandler,
    private readonly deleteTaskHandler: DeleteTaskHandler,
    private readonly reorderTasksHandler: ReorderTasksHandler,
  ) {}

  @Get('summary')
  getSummary() {
    return this.getSummaryHandler.handle();
  }

  @Post('reorder')
  reorderTasks(@Body() dto: ReorderTasksDto): Promise<Task[]> {
    return this.reorderTasksHandler.handle(dto);
  }

  @Get()
  listTasks(): Promise<Task[]> {
    return this.listTasksHandler.handle();
  }

  @Get(':id')
  getTask(@Param('id') id: string): Promise<Task> {
    return this.getTaskHandler.handle(id);
  }

  @Post()
  createTask(
    @Body() dto: CreateTaskDto,
    @UserContext() user: User,
  ): Promise<Task> {
    return this.createTaskHandler.handle(dto, user);
  }

  @Put(':id')
  editTask(@Param('id') id: string, @Body() dto: UpdateTaskDto): Promise<Task> {
    return this.editTaskHandler.handle(id, dto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<Task> {
    return this.deleteTaskHandler.handle(id);
  }
}
