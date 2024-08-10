import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { EditIcon, GripVertical, TrashIcon } from 'lucide-react';
import { Task } from '@/types/task.type';
import MutateTaskDialog from './mutate-task-dialog';
import { TaskCommands } from '../layout/Task/task-provider';
import { differenceInDays, format, startOfDay, startOfToday } from 'date-fns';
import DeleteTaskDialog from './delete-task-dialog';

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const command = TaskCommands.Update;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task._id,
    data: {
      type: 'Task',
      task
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task'
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary'
      }
    }
  });

  const dueDate = format(new Date(task.dueDate), 'MMM dd, yyyy');
  const daysToDue = differenceInDays(
    startOfDay(new Date(task.dueDate)),
    startOfToday()
  );

  const isDueToday = daysToDue === 0;
  const isOverdue = daysToDue < 0;

  const dueClass = isDueToday
    ? 'text-purple-800'
    : isOverdue
    ? 'text-red-800'
    : '';

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={
        variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
        }) + 'mb-2 max-w-xs'
      }
    >
      <CardHeader className="relative flex max-w-prose flex-grow flex-row items-center justify-between px-3 py-3">
        <div className="flex h-auto w-full flex-row items-center">
          <Button
            variant="ghost"
            {...attributes}
            {...listeners}
            className="min-w-full cursor-grab -justify-center p-1 text-secondary-foreground/50"
          >
            <span className="sr-only">Move task</span>
            <GripVertical size={16} />
            <span className="ml-2 text-primary-foreground/100">
              {task.title}
            </span>
          </Button>
        </div>
        <div className="flex h-auto items-center">
          <MutateTaskDialog event={command} task={task}>
            <Button className="h-auto p-1 text-blue-300" variant="ghost">
              <EditIcon size={16} />
            </Button>
          </MutateTaskDialog>
          <DeleteTaskDialog task={task}>
            <Button className="h-auto p-1 text-red-300" variant="ghost">
              <TrashIcon size={16} />
            </Button>
          </DeleteTaskDialog>
        </div>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap px-3 pb-6 pt-3 text-left">
        <div className="ms-4 min-w-0 flex-1">
          <p className="overflow-ellipsis text-sm font-medium text-gray-900 dark:text-white">
            {task.description.slice(0, 200)}
            {task.description.length > 200 && '...'}
          </p>
          {task.status !== 'completed' && (
            <div className="flex justify-between">
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                {dueDate}
              </p>
              <p
                className={`${dueClass} + " dark:text-gray-400" truncate text-sm text-gray-500`}
              >
                {daysToDue} days left
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
