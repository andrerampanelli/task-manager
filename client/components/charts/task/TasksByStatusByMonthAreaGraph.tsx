'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { SummaryData, TaskStatus } from '@/types/task.type';

const chartConfig = {
  [TaskStatus.PENDING]: {
    label: 'Pending',
    color: 'hsl(var(--chart-1))'
  },
  [TaskStatus.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'hsl(var(--chart-2))'
  },
  [TaskStatus.COMPLETED]: {
    label: 'Completed',
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig;

type TasksByStatusByMonthAreaGraphProps = {
  tasksByStatusByMonth: SummaryData['tasksByStatusByMonth'];
};

export function TasksByStatusByMonthAreaGraph({
  tasksByStatusByMonth
}: TasksByStatusByMonthAreaGraphProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total tasks by status for each month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={tasksByStatusByMonth}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
              <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pending)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pending)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-in-progress)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-in-progress)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="pending"
              type="natural"
              fill="var(--color-pending)"
              fillOpacity={0.4}
              stroke="var(--color-pending)"
              stackId="a"
            />
            <Area
              dataKey="in-progress"
              type="natural"
              fill="var(--color-in-progress)"
              fillOpacity={0.4}
              stroke="var(--color-in-progress)"
              stackId="a"
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="var(--color-completed)"
              fillOpacity={0.4}
              stroke="var(--color-completed)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
