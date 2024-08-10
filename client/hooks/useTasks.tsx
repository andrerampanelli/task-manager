'use client';
import {
  TasksContext,
  TasksDispatchContext
} from '@/components/layout/Task/task-provider';
import { useContext } from 'react';

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
