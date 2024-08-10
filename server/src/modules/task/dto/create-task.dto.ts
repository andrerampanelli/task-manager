import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';
import { User } from 'src/modules/auth/schema/user.schema';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TaskStatus)
  @IsOptional()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  position: number;

  @IsEmpty({ message: 'User is not allowed' })
  user: User;
}
