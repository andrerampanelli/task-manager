'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Task, TaskStatus } from '@/types/task.type';
import { statuses } from '../data/data';
import { differenceInDays, format, startOfDay, startOfToday } from 'date-fns';

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due date" />
    ),
    cell: ({ row }) => {
      const dueDate = row.getValue<string>('dueDate');
      if (!dueDate) {
        return null;
      }
      const status = row.getValue('status');
      if (status === TaskStatus.COMPLETED) {
        return null;
      }

      const fmtDueDate = format(new Date(dueDate), 'MMM dd, yyyy');

      return (
        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          {fmtDueDate}
        </p>
      );
    }
  },
  {
    accessorKey: 'relativeDueDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Relative due date" />
    ),
    cell: ({ row }) => {
      const dueDate = row.getValue<string>('dueDate');
      if (!dueDate) {
        return null;
      }
      const status = row.getValue('status');
      if (status === TaskStatus.COMPLETED) {
        return null;
      }

      const daysToDue = differenceInDays(
        startOfDay(new Date(dueDate)),
        startOfToday()
      );

      const isDueToday = daysToDue === 0;
      const isOverdue = daysToDue < 0;

      const dueClass = isDueToday
        ? 'text-purple-800'
        : isOverdue
        ? 'text-red-800'
        : '';
      return (
        <p
          className={`${dueClass} + " dark:text-gray-400" truncate text-sm text-gray-500`}
        >
          {daysToDue} days left
        </p>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
