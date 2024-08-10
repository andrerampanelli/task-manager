import { AreaGraph } from '@/components/charts/area-graph';
import { TasksByStatusByMonthAreaGraph } from '@/components/charts/task/TasksByStatusByMonthAreaGraph';
import { TasksCreatedByMonthBarGraphBarGraph } from '@/components/charts/task/TasksCreatedByMonthBarGraph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { TaskApi } from '@/services/tasks.api';
import { SummaryData } from '@/types/task.type';
import {
  InboxIcon,
  LandPlotIcon,
  LayersIcon,
  WaypointsIcon
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

export default function Graph() {
  const { data: session } = useSession();

  const [summary, setSummary] = useState<SummaryData | null>(null);
  const taskApi = useMemo(
    () => new TaskApi(session?.user.token || ''),
    [session?.user.token]
  );

  const differencePercent = useMemo(() => {
    if (summary) {
      const difference = summary.createdThisMonth - summary.createdLastMonth;

      if (summary.createdLastMonth === 0) return 100 * difference;
      const percent = (difference / summary.createdLastMonth) * 100;
      return percent.toFixed(2);
    }
    return 0;
  }, [summary]);

  useEffect(() => {
    if (!session) return;
    if (!session.user.token) return;

    const getSummaryData = async () => {
      taskApi
        .getSummaryData()
        .then((res) => {
          setSummary(res);
        })
        .catch((err) => {
          toast({
            description: 'Failed to fetch summary data'
          });
        });
    };

    getSummaryData();
  }, [session, taskApi]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total completed tasks
            </CardTitle>
            <LandPlotIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.completedTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total in progress tasks
            </CardTitle>
            <WaypointsIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.inProgressTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total pending tasks
            </CardTitle>
            <InboxIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.pendingTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks created this month
            </CardTitle>
            <LayersIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{summary?.createdThisMonth}
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-xs text-muted-foreground">
                Previous month: {summary?.createdLastMonth}
              </p>
              <p className="text-xs text-muted-foreground">
                {differencePercent}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        {summary && (
          <div className="col-span-7">
            <TasksCreatedByMonthBarGraphBarGraph
              tasksCreatedByMonth={summary.tasksCreatedByMonth}
            />
          </div>
        )}
        {summary && (
          <div className="col-span-7">
            <TasksByStatusByMonthAreaGraph
              tasksByStatusByMonth={summary.tasksByStatusByMonth}
            />
          </div>
        )}
      </div>
    </>
  );
}
