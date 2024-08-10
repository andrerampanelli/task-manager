import { Module } from '@nestjs/common';
import { CreateTaskHandler } from './handlers/task/create-task.handler';
import { DeleteTaskHandler } from './handlers/task/delete-task.handler';
import { EditTaskHandler } from './handlers/task/edit-task.handler';
import { GetTaskHandler } from './handlers/task/get-task.handler';
import { ListTasksHandler } from './handlers/task/list-tasks.handler';
import { TaskController } from './controllers/tasks.controller';
import { getSummaryHandler } from './handlers/task/get-summary.handler';
import { TaskModule } from '../task/task.module';
import { SignupHandler } from './handlers/auth/signup.handler';
import { LoginHandler } from './handlers/auth/login.handler';
import { LogoutHandler } from './handlers/auth/logout.handler';
import { AuthModule } from '../auth/auth.module';
import { AuthController } from './controllers/auth.controller';
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

const authHandlers = [SignupHandler, LoginHandler, LogoutHandler];

@Module({
  imports: [AppConfigModule, TaskModule, AuthModule],
  controllers: [TaskController, AuthController],
  providers: [JwtStrategy, ...taskHandlers, ...authHandlers],
})
export class HttpModule {}
