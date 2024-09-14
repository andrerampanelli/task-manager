import { TaskApi } from '@/services/tasks.api';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { handleListTasks } from '@/components/layout/Task/task-provider';
import { useTasks, useTasksDispatch } from '@/hooks/useTasks';

const getTasks = async (apiKey: string | undefined) => {
  if (apiKey === undefined) {
    return [];
  }
  const taskApi = new TaskApi(apiKey);
  return await taskApi.getTasks();
};

export default function TaskList() {
  const { data: session } = useSession();
  const dispatch = useTasksDispatch();
  const tasks = useTasks();
  const apiKey = useMemo(() => session?.user.token, [session?.user.token]);

  useEffect(() => {
    if (!session) return;
    if (!session.user.token) return;

    getTasks(apiKey).then((tasks) => {
      handleListTasks(dispatch, tasks);
    });
  }, [session, apiKey, dispatch]);

  return (
    <>
      <DataTable data={tasks} columns={columns} />
    </>
  );
}
