'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import MutateTaskDialog from '@/components/forms/mutate-task-dialog';
import PageContainer from '@/components/layout/page-container';
import { TaskCommands } from '@/components/layout/Task/task-provider';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { KanbanBoard } from './components/kanban-board';

const breadcrumbItems = [
  { title: 'Tasks', link: '/tasks' },
  { title: 'Kanban', link: '/tasks/kanban' }
];

export default function page() {
  const command = TaskCommands.Add;

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Kanban`} description="Manage tasks by dnd" />
          <MutateTaskDialog event={command}>
            <Button variant="secondary" size="sm">
              Add new task
            </Button>
          </MutateTaskDialog>
        </div>
        <KanbanBoard />
      </div>
    </PageContainer>
  );
}
