'use client';

import DeleteTaskDialog from '@/components/forms/delete-task-dialog';
import MutateTaskDialog from '@/components/forms/mutate-task-dialog';
import { TaskCommands } from '@/components/layout/Task/task-provider';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task.type';
import { Row } from '@tanstack/react-table';
import { EditIcon, TrashIcon } from 'lucide-react';

interface DataTableRowActionsProps<T> {
  row: Row<T>;
}

export function DataTableRowActions<T>({ row }: DataTableRowActionsProps<T>) {
  const task = row.original as Task;

  return (
    <div className="inline-flex w-full justify-end">
      <MutateTaskDialog event={TaskCommands.Update} task={task}>
        <Button className="h-auto gap-1" variant="ghost">
          <EditIcon size={16} />
          Edit
        </Button>
      </MutateTaskDialog>
      <DeleteTaskDialog task={task}>
        <Button className="h-auto gap-1" variant="ghost">
          <TrashIcon size={16} />
          Delete
        </Button>
      </DeleteTaskDialog>
    </div>
  );
}
