'use client';
import PageContainer from '@/components/layout/page-container';
import Graphs from './graphs';
import { Separator } from '@/components/ui/separator';

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Separator />
        <Graphs />
      </div>
    </PageContainer>
  );
}
