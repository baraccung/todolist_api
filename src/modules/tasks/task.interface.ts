export interface BaseTask {
  task: string;
  note: string;
  time: string;
  completed: boolean;
}

export interface Task extends BaseTask {
  id: number;
}