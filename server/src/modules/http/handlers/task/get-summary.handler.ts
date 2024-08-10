import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/common/handler.interface';

@Injectable()
export class getSummaryHandler implements IHandler {
  handle(...args: unknown[]): unknown {
    throw new Error('Method not implemented.');
  }
}
