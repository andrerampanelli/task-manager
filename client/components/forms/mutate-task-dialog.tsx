'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { useTasksDispatch } from '@/hooks/useTasks';
import {
  handleAddTask,
  handleChangeTask,
  TaskCommands
} from '../layout/Task/task-provider';
import { z } from 'zod';
import { endOfYesterday, startOfToday } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { DatePicker } from '../ui/date-picker';
import { useSession } from 'next-auth/react';
import { TaskApi } from '@/services/tasks.api';
import { Task, TaskStatus } from '@/types/task.type';
import { useState } from 'react';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

const CreateTaskFormSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(500),
  dueDate: z.date().min(endOfYesterday()),
  status: z
    .enum([TaskStatus.PENDING, TaskStatus.COMPLETED, TaskStatus.IN_PROGRESS])
    .default(TaskStatus.PENDING)
});

const ModifyTaskFormSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(500),
  dueDate: z.date(),
  status: z.enum([
    TaskStatus.PENDING,
    TaskStatus.COMPLETED,
    TaskStatus.IN_PROGRESS
  ])
});

type MutateTaskDialogProps = {
  children: React.ReactNode;
  event: TaskCommands.Add | TaskCommands.Update;
  task?: Task;
};

export default function MutateTaskDialog({
  children,
  event,
  task
}: MutateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useTasksDispatch();
  const { data: session } = useSession();

  const schema = task?._id ? ModifyTaskFormSchema : CreateTaskFormSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      dueDate: task ? new Date(task.dueDate) : startOfToday(),
      status: task?.status || TaskStatus.PENDING
    }
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (!session) return;
    if (!session.user.token) return;
    const { title, description, dueDate, status } = data;
    const taskApi = new TaskApi(session.user.token);

    if (event === TaskCommands.Add) {
      taskApi
        .createTask({
          title,
          description,
          dueDate,
          status,
          position: 99
        })
        .then((task) => {
          handleAddTask(dispatch, task);
          setOpen(false);
        });
      return;
    }
    if (event === TaskCommands.Update && task) {
      taskApi
        .updateTask({
          _id: task._id,
          title,
          description,
          dueDate,
          status
        })
        .then((task) => {
          handleChangeTask(dispatch, {
            id: task._id,
            task: task
          });
          setOpen(false);
        });
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <div className="grid items-center gap-4">
                  <FormItem className="flex flex-col">
                    <Label htmlFor={field.name}>Title</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Task title..."
                        className="col-span-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div className="grid items-center gap-4">
                  <FormItem className="flex flex-col">
                    <Label htmlFor={field.name}>Description</Label>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Task description..."
                        className="col-span-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <div className="grid items-center gap-4">
                  <FormItem className="flex flex-col">
                    <FormLabel htmlFor={field.name}>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TaskStatus.PENDING}>
                          {TaskStatus.PENDING}
                        </SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}>
                          {TaskStatus.IN_PROGRESS}
                        </SelectItem>
                        <SelectItem value={TaskStatus.COMPLETED}>
                          {TaskStatus.COMPLETED}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <div className="grid items-center gap-4">
                  <FormItem className="flex flex-col">
                    <Label htmlFor={field.name}>Due date</Label>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                        label="Due date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <DialogFooter>
              <Button type="submit" size="sm">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
