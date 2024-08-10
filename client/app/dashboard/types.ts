import { ValueOf } from '@/types';
import { TaskStatus } from '@/types/task.type';

enum Months {
  JAN = 0,
  FEB = 1,
  MAR = 2,
  APR = 3,
  MAY = 4,
  JUN = 5,
  JUL = 6,
  AUG = 7,
  SEP = 8,
  OCT = 9,
  NOV = 10,
  DEC = 11
}

export const MonthsNames = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
};

export type CreatedByMonthType = Array<{
  month: ValueOf<typeof MonthsNames>;
  count: number;
}>;

export type TasksByStatusByMonthType = Array<{
  month: ValueOf<typeof MonthsNames>;
  statusCounts: {
    [key in TaskStatus]: number;
  };
}>;

export const initialCreatedByMonth: CreatedByMonthType = [
  { month: 'January', count: 0 },
  { month: 'February', count: 0 },
  { month: 'March', count: 0 },
  { month: 'April', count: 0 },
  { month: 'May', count: 0 },
  { month: 'June', count: 0 },
  { month: 'July', count: 0 },
  { month: 'August', count: 0 },
  { month: 'September', count: 0 },
  { month: 'October', count: 0 },
  { month: 'November', count: 0 },
  { month: 'December', count: 0 }
];

const initialTasksByStatusByMonth: TasksByStatusByMonthType = [
  {
    month: 'January',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'February',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'March',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'April',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'May',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'June',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'July',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'August',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'September',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'October',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'November',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  },
  {
    month: 'December',
    statusCounts: {
      [TaskStatus.PENDING]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0
    }
  }
];
