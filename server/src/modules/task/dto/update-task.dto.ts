import { DeepPartial } from 'src/common/misc.type';
import { CreateTaskDto } from './create-task.dto';

export type UpdateTaskDto = DeepPartial<CreateTaskDto>;
