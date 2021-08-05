import exprees, { Request, Response } from "express";
import * as TaskService from "./tasks.service";
import { Task, BaseTask } from "./task.interface";
import { Tasks } from "./tasks.interface";

/**
 * Router Definition
 */
export const tasksRouter = exprees.Router();

/**
 * Controller Definitions
 */

// GET All task
tasksRouter.get('/', async (req: Request, res: Response) => {

  try {
    const tasks: Tasks = await TaskService.findAll();

    res.status(200).send(tasks);
  }
  catch (err) {

    res.status(500).send(err.message);
  }

});

// GET tasks/:id
tasksRouter.get('/:id', async (req: Request, res: Response) => {

  const id: number = parseInt(req.params.id, 10);

  try {
    const task: Task = await TaskService.find(id);

    if (!task) return res.status(404).send("task not found");

    res.status(200).send(task);
  }
  catch (err) {

    res.status(500).send(err.message);
  }

});

// POST tasks
tasksRouter.post("/", async (req: Request, res: Response) => {

  const task: BaseTask = req.body;

  try {

    const newTask = await TaskService.create(task);

    res.status(201).json(newTask);
  }
  catch (err) {

    res.status(500).send(err.message);
  }
});

// PUT tasks/:id
tasksRouter.put("/:id", async (req: Request, res: Response) => {

  const id: number = parseInt(req.params.id, 10);
  const taskUpdate: Task = req.body;

  try {

    const existingTask: Task = await TaskService.find(id);

    if (existingTask) {

      const updatedTask = await TaskService.update(id, taskUpdate);
      return res.status(200).json(updatedTask);

    }

    const newTask = await TaskService.create(taskUpdate);

    res.status(201).json(newTask);
  }
  catch (err) {

    res.status(500).send(err.message);
  }
});

// PATCH tasks/:id
tasksRouter.patch("/:id", async (req: Request, res: Response) => {

  const id: number = parseInt(req.params.id, 10);
  const taskUpdate: Partial<Task> = req.body;

  try {

    const existingTask: Task = await TaskService.find(id);

    if (!existingTask) return res.status(404).send("task not found");

    await TaskService.update(id, taskUpdate);

    return res.sendStatus(204);
  }
  catch (err) {

    res.status(500).send(err.message);
  }
});


// DELETE tasks
tasksRouter.delete('/', async (req: Request, res: Response) => {

  try {

    await TaskService.removeAll();

    res.sendStatus(204);
  }
  catch (err) {

    res.status(500).send(err.message)
  }

});

// DELETE tasks/:id
tasksRouter.delete('/:id', async (req: Request, res: Response) => {

  const id: number = parseInt(req.params.id, 10);

  try {

    await TaskService.remove(id);

    res.sendStatus(204);
  }
  catch (err) {

    res.status(500).send(err.message)
  }

});
