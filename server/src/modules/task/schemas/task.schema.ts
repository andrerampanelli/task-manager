import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/modules/auth/schema/user.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

@Schema({
  timestamps: true,
})
export class Task extends Document {
  @Prop({
    options: {
      trim: true,
    },
    required: true,
    length: 100,
  })
  title: string;

  @Prop({
    options: {
      trim: true,
    },
    required: true,
    length: 500,
  })
  description: string = '';

  @Prop({
    required: true,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  })
  status: TaskStatus = TaskStatus.PENDING;

  @Prop({
    required: true,
  })
  dueDate: Date;

  @Prop({
    required: true,
    default: 99,
  })
  position: number = 99;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
