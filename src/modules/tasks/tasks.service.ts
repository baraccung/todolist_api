/**
 * Data Model Interfaces
 */

import { Tasks } from "./tasks.interface";
import { Task, BaseTask } from "./task.interface";

/**
 * In-Memory Store
 */

let tasks: Tasks = {
  1: {
    id: 1,
    task: "Buy Breakfast",
    note: "some veggie might be good",
    time: "08:00",
    completed: false
  },
  2: {
    id: 2,
    task: "Meeting",
    note: "Work Work Work",
    time: "13:00",
    completed: false
  },
  3: {
    id: 3,
    task: "Buy Groceries",
    note: "food, some drink and snacks.. we run out shampoo too",
    time: "16:00",
    completed: false
  }
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Task[]> => Object.values(tasks);

export const find = async (id: number): Promise<Task> => tasks[id];

export const create = async (newItem: BaseTask): Promise<Task> => {
  const id = new Date().valueOf();

  tasks[id] = {
    id,
    ...newItem,
  };

  return tasks[id];
};

// export const update = async (
//   id: number,
//   taskUpdate: BaseTask
// ): Promise<Task | null> => {
//   const item = await find(id);

//   if (!item) return null;

//   tasks[id] = { id, ...taskUpdate };

//   return tasks[id];
// };

export const update = async (
  id: number,
  taskUpdate: Partial<Task>
): Promise<Task | null> => {

  const item = await find(id);

  if (!item) return null;

  tasks[id] = { ...tasks[id], ...taskUpdate };

  return tasks[id];

}

export const remove = async (id: number): Promise<null | void> => {
  const task = await find(id);

  if (!task) {
    return null;
  }

  delete tasks[id];
};

export const removeAll = async (): Promise<void> => {

  console.log(tasks);
  for (const [key, value] of Object.entries(tasks)) {
    delete tasks[parseInt(key, 10)]
  }
  console.log('after', tasks);

};