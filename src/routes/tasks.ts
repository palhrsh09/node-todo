import express from 'express';
import { getAllTasks, getTask, getTaskById, createTask, updateTask, deleteTask } from '../controller/tasksController';

const router = express.Router();

// Route to get all tasks
router.get('/', getAllTasks);

// Route to get a specific task by ID
router.get('/:id', getTask, getTaskById);

// Route to create a new task
router.post('/', createTask);

// Route to update a task by ID
router.put('/:id', getTask, updateTask);

// Route to delete a task by ID
router.delete('/:id', getTask, deleteTask);

export default router;
