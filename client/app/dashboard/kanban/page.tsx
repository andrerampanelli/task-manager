'use client';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { KanbanBoard } from '@/components/kanban/kanban-board';
import MutateTaskDialog from '@/components/kanban/mutate-task-dialog';
import PageContainer from '@/components/layout/page-container';
import { TaskCommands } from '@/components/layout/Task/task-provider';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Kanban', link: '/dashboard/kanban' }
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
