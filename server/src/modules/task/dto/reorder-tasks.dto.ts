import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ReorderTasksDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tasks: string[];
}
