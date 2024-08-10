'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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
import { SummaryData } from '@/types/task.type';

export const description = 'An interactive bar chart';

const chartConfig = {
  createdByMonth: {
    label: 'Tasks Created',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

type TasksCreatedByMonthBarGraphBarGraphProps = {
  tasksCreatedByMonth: SummaryData['tasksCreatedByMonth'];
};

export function TasksCreatedByMonthBarGraphBarGraph({
  tasksCreatedByMonth
}: TasksCreatedByMonthBarGraphBarGraphProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total tasks created for each month
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={tasksCreatedByMonth}
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
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="count"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar dataKey="count" fill={chartConfig.createdByMonth.color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
