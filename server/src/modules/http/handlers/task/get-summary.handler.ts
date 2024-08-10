import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/common/handler.interface';
import { TaskService } from 'src/modules/task/task.service';
import { SummaryData } from 'src/modules/task/types/summary.type';

@Injectable()
export class getSummaryHandler implements IHandler {
  constructor(private readonly taskService: TaskService) {}

  handle(): Promise<SummaryData> {
    return this.taskService.getSummary();
  }
}
