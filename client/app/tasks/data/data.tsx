import { TaskStatus } from '@/types/task.type';
import { CheckCircledIcon, StopwatchIcon } from '@radix-ui/react-icons';
import { CircleIcon } from 'lucide-react';

export const statuses = [
  {
    value: TaskStatus.PENDING,
    label: 'Pending',
    icon: CircleIcon
  },
  {
    value: TaskStatus.IN_PROGRESS,
    label: 'In progress',
    icon: StopwatchIcon
  },
  {
    value: TaskStatus.COMPLETED,
    label: 'Completed',
    icon: CheckCircledIcon
  }
];
