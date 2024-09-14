'use client';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { hasDraggableData } from '@/lib/utils';
import {
  Announcements,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import type { Column } from './board-column';
import { BoardColumn, BoardContainer } from './board-column';
import { TaskCard } from './task-card';
import { Task, TaskStatus } from '@/types/task.type';
import { useTasks, useTasksDispatch } from '@/hooks/useTasks';
import { useSession } from 'next-auth/react';
import { TaskApi } from '@/services/tasks.api';
import { handleListKanbanTasks } from '@/components/layout/Task/task-provider';
import { toast } from '@/components/ui/use-toast';

const defaultCols = [
  {
    id: TaskStatus.PENDING,
    title: 'Pending'
  },
  {
    id: TaskStatus.IN_PROGRESS,
    title: 'In progress'
  },
  {
    id: TaskStatus.COMPLETED,
    title: 'Completed'
  }
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]['id'];

export function KanbanBoard() {
  const { data: session } = useSession();
  const columns = defaultCols;
  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const tasks = useTasks();
  const dispatch = useTasksDispatch();
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [isMounted, setIsMounted] = useState<Boolean>(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const taskApi = useMemo(
    () => new TaskApi(session?.user.token || ''),
    [session?.user.token]
  );

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  useEffect(() => {
    if (!session) return;
    if (!session.user.token) return;

    const fetchTasks = async () => {
      const tasks = await taskApi.getKanbanTasks();
      handleListKanbanTasks(dispatch, tasks);
    };

    fetchTasks();
  }, [dispatch, session, taskApi]);

  if (!isMounted) return;

  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
    const tasksInColumn = tasks.filter((task) => task.status === columnId);
    const taskPosition = tasksInColumn.findIndex((task) => task._id === taskId);
    const column = columns.find((col) => col.id === columnId);
    return {
      tasksInColumn,
      taskPosition,
      column
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === 'Task') {
        pickedUpTaskColumn.current = active.data.current.task.status;
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current as ColumnId
        );
        return `Picked up Task ${active.data.current.task.title} at position: ${
          taskPosition + 1
        } of ${tasksInColumn.length} in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === 'Task' &&
        over.data.current?.type === 'Task'
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.status
        );
        if (over.data.current.task.status !== pickedUpTaskColumn.current) {
          return `Task ${
            active.data.current.task.title
          } was moved over column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was moved over position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = null;
        return;
      }
      if (
        active.data.current?.type === 'Task' &&
        over.data.current?.type === 'Task'
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.status
        );
        if (
          over.data.current.task.status !== pickedUpTaskColumn.current &&
          column
        ) {
          taskApi
            .updateTask({
              _id: active.data.current.task._id,
              status: column.id,
              position: taskPosition
            })
            .then((data) => {
              return `Task was dropped into column ${
                column.title
              } in position ${taskPosition + 1} of ${tasksInColumn.length}`;
            })
            .catch((error) => {
              toast({
                description: 'An error occurred while reordering tasks'
              });
            });
        }
        return `Task was dropped into position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpTaskColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    }
  };

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === 'Column') {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === 'Task') {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === 'Column';
    if (!isActiveAColumn) return;
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === 'Task';
    const isOverATask = activeData?.type === 'Task';

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex((t) => t._id === activeId);
      const overIndex = tasks.findIndex((t) => t._id === overId);
      const activeTask = tasks[activeIndex];
      const overTask = tasks[overIndex];
      if (activeTask && overTask && activeTask.status !== overTask.status) {
        activeTask.status = overTask.status;
        activeTask.position = overTask.position;
        const order = arrayMove(tasks, activeIndex, overIndex - 1).map(
          (t) => t._id
        );

        taskApi
          .reorderTasks(order)
          .then((data) => {
            handleListKanbanTasks(dispatch, data);
          })
          .catch((error) => {
            toast({
              description: 'An error occurred while reordering tasks'
            });
          });
      }

      activeTask.position = overTask?.position || 0;
      const order = arrayMove(tasks, activeIndex, overIndex).map((t) => t._id);
      taskApi
        .reorderTasks(order)
        .then((data) => {
          handleListKanbanTasks(dispatch, data);
        })
        .catch((error) => {
          toast({
            description: 'An error occurred while reordering tasks'
          });
        });
    }

    const isOverAColumn = overData?.type === 'Column';

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex((t) => t._id === activeId);
      const activeTask = tasks[activeIndex];
      if (activeTask) {
        activeTask.status = overId as ColumnId;
        activeTask.position = activeIndex;
        const order = arrayMove(tasks, activeIndex, activeIndex).map(
          (t) => t._id
        );
        taskApi
          .reorderTasks(order)
          .then((data) => {
            handleListKanbanTasks(dispatch, data);
          })
          .catch((error) => {
            toast({
              description: 'An error occurred while reordering tasks'
            });
          });
      }
    }
  }

  return (
    <DndContext
      accessibility={{
        announcements
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns?.map((col, index) => (
            <Fragment key={col.id}>
              <BoardColumn
                column={col}
                tasks={tasks.filter((task) => task.status === col.id)}
              />
            </Fragment>
          ))}
        </SortableContext>
      </BoardContainer>

      {'document' in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasks.filter((task) => task.status === activeColumn.id)}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
