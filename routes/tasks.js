// routes/tasks.js

const express = require('express');
const router = express.Router();
const tasksController = require('../controller/tasksController');

// GET all tasks
router.get('/', tasksController.getAllTasks);

// GET a single task
router.get('/:id', tasksController.getTask, tasksController.getTaskById);

// CREATE a new task
router.post('/', tasksController.createTask);

// UPDATE a task
router.patch('/:id', tasksController.getTask, tasksController.updateTask);

// DELETE a task
router.delete('/:id', tasksController.getTask, tasksController.deleteTask);

module.exports = router;
