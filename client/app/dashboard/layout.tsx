import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { TasksProvider } from '@/components/layout/Task/task-provider';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <TasksProvider>
        <Sidebar />
        <main className="w-full flex-1 overflow-hidden">
          <Header />
          {children}
        </main>
      </TasksProvider>
      <Toaster />
    </div>
  );
}
