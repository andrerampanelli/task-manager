'use client';
import { Props } from '@/app/layout';
import { Task } from '@/types/task.type';
import { createContext, Dispatch, useReducer } from 'react';
import { uniqBy } from 'lodash';

type InitialStateType = Task[];

const initialState: InitialStateType = [];

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum TaskCommands {
  Create = 'CREATE_TASK',
  Update = 'UPDATE_TASK',
  Delete = 'DELETE_TASK',
  Reorder = 'REORDER_TASKS',
  List = 'LIST_TASKS',
  Add = 'ADD_TASK'
}

type TaskPayload = {
  [TaskCommands.Create]: Partial<Task>;
  [TaskCommands.Update]: {
    id: string;
    task: Partial<Task>;
  };
  [TaskCommands.Delete]: Task;
  [TaskCommands.Reorder]: Task[];
  [TaskCommands.List]: Task[];
  [TaskCommands.Add]: Task;
};

export type TaskActions = ActionMap<TaskPayload>[keyof ActionMap<TaskPayload>];

export const tasksReducer = (state: Task[], action: TaskActions): Task[] => {
  switch (action.type) {
    case TaskCommands.Add: {
      return uniqBy([...state, action.payload], '_id');
    }
    case TaskCommands.List: {
      return uniqBy([...action.payload], '_id');
    }
    case TaskCommands.Create: {
      return [...state];
    }
    case TaskCommands.Update: {
      return [...state];
    }
    case TaskCommands.Delete: {
      return state.filter((task) => task._id !== action.payload._id);
    }
    case TaskCommands.Reorder: {
      return [...action.payload];
    }
  }
  return state;
};

export const TasksContext = createContext<InitialStateType>(initialState);
export const TasksDispatchContext = createContext<Dispatch<TaskActions>>(
  () => null
);

export const TasksProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  return (
    <TasksContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};

export function handleAddTask(
  dispatch: Dispatch<TaskActions>,
  data: TaskPayload[TaskCommands.Create]
) {
  dispatch({
    type: TaskCommands.Create,
    payload: data
  });
}

export function handleChangeTask(
  dispatch: Dispatch<TaskActions>,
  data: TaskPayload[TaskCommands.Update]
) {
  dispatch({
    type: TaskCommands.Update,
    payload: data
  });
}

export function handleDeleteTask(
  dispatch: Dispatch<TaskActions>,
  data: TaskPayload[TaskCommands.Delete]
) {
  dispatch({
    type: TaskCommands.Delete,
    payload: data
  });
}

export async function handleListTasks(
  dispatch: Dispatch<TaskActions>,
  data: Task[]
) {
  dispatch({
    type: TaskCommands.List,
    payload: data
  });
}
