'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import { useTasksDispatch } from '@/hooks/useTasks';
import { handleDeleteTask } from '../layout/Task/task-provider';
import { useSession } from 'next-auth/react';
import { TaskApi } from '@/services/tasks.api';
import { Task } from '@/types/task.type';
import { useState } from 'react';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { toast } from '../ui/use-toast';

type MutateTaskDialogProps = {
  children: React.ReactNode;
  task: Task;
};

export default function DeleteTaskDialog({
  children,
  task
}: MutateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useTasksDispatch();
  const { data: session } = useSession();

  const onConfirm = () => {
    if (!session) return;
    if (!session.user.token) return;
    const taskApi = new TaskApi(session.user.token);
    taskApi
      .deleteTask(task._id)
      .then(() => {
        handleDeleteTask(dispatch, task);
      })
      .catch((error) => {
        toast({
          description: 'An error occurred while deleting the task'
        });
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold uppercase">
            Are you absolutely sure?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your task
          and remove your data from our servers.
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setOpen(!open)} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="text-gray-100"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
