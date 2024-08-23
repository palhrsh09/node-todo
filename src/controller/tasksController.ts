import { Request, Response, NextFunction } from 'express';
import Task, { ITask } from '../model/Task';
import { Document } from 'mongoose'; // Import Document type from mongoose

// Type extending ITask and Document to include Mongoose document methods
interface ITaskDocument extends ITask, Document {}

// GET all tasks
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Middleware to get a single task by ID
export const getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let task: ITaskDocument | null; // Use ITaskDocument instead of ITask
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      res.status(404).json({ message: 'Task not found' });
      return; // Ensure to return to prevent further execution
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
    return; // Ensure to return to prevent further execution
  }

  res.locals.task = task;
  next();
};

// GET a single task
export const getTaskById = (req: Request, res: Response): void => {
  res.json(res.locals.task);
};

// CREATE a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, status = 'pending' } = req.body;

  if (!title || typeof title !== 'string') {
    res.status(400).json({ message: 'Invalid title' });
    return;
  }

  const task = new Task({ title, description, status });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

// UPDATE a task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const task: ITaskDocument = res.locals.task; // Ensure it's ITaskDocument

  const { title, description, status } = req.body;

  if (title !== undefined && typeof title !== 'string') {
    res.status(400).json({ message: 'Invalid title' });
    return;
  }

  if (description !== undefined && typeof description !== 'string') {
    res.status(400).json({ message: 'Invalid description' });
    return;
  }

  if (status !== undefined && !['pending', 'completed'].includes(status)) {
    res.status(400).json({ message: 'Invalid status' });
    return;
  }

  if (title != null) task.title = title;
  if (description != null) task.description = description;
  if (status != null) task.status = status;
  task.updated_at = new Date();

  try {
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

// DELETE a task
// DELETE a task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const task: ITaskDocument = res.locals.task; // Ensure it's ITaskDocument
  try {
    await Task.deleteOne({ _id: task._id }); // Use deleteOne method
    res.json({ message: 'Deleted Task' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
