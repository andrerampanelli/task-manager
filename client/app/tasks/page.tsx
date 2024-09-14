'use client';
import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import TaskList from './components/TaskList';
import { Heading } from '@/components/ui/heading';
import MutateTaskDialog from '@/components/forms/mutate-task-dialog';
import { TaskCommands } from '@/components/layout/Task/task-provider';
import { Button } from '@/components/ui/button';

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <Heading title={`List tasks`} description="Manage tasks" />
          <MutateTaskDialog event={TaskCommands.Add}>
            <Button variant="secondary" size="sm">
              Add new task
            </Button>
          </MutateTaskDialog>
        </div>
        <Separator />
        <TaskList />
      </div>
    </PageContainer>
  );
}
