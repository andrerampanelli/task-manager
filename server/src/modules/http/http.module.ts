import { Module } from '@nestjs/common';
import { CreateTaskHandler } from './handlers/task/create-task.handler';
import { DeleteTaskHandler } from './handlers/task/delete-task.handler';
import { EditTaskHandler } from './handlers/task/edit-task.handler';
import { GetTaskHandler } from './handlers/task/get-task.handler';
import { ListTasksHandler } from './handlers/task/list-tasks.handler';
import { TaskController } from './controllers/tasks.controller';
import { getSummaryHandler } from './handlers/task/get-summary.handler';
import { TaskModule } from '../task/task.module';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { AppConfigModule } from '../app-config/app-config.module';
import { ReorderTasksHandler } from './handlers/task/reorder-tasks.handler';

const taskHandlers = [
  CreateTaskHandler,
  DeleteTaskHandler,
  EditTaskHandler,
  GetTaskHandler,
  ListTasksHandler,
  getSummaryHandler,
  ReorderTasksHandler,
];

@Module({
  imports: [AppConfigModule, TaskModule],
  controllers: [TaskController],
  providers: [JwtStrategy, ...taskHandlers],
})
export class HttpModule {}
