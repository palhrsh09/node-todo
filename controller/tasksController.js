// controllers/tasksController.js

const Task = require('../model/Task');

// GET all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET a single task
exports.getTaskById = (req, res) => {
  res.json(res.task);
};

// CREATE a new task
exports.createTask = async (req, res) => {
  const { title, description, status = 'pending' } = req.body;

  // Basic validation
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'Invalid title' });
  }

  const task = new Task({ title, description, status });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(400).json({ message: 'Bad Request' });
  }
};

// UPDATE a task
exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  // Validate inputs
  if (title !== undefined && typeof title !== 'string') {
    return res.status(400).json({ message: 'Invalid title' });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ message: 'Invalid description' });
  }

  if (status !== undefined && !['pending', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  if (title != null) {
    res.task.title = title;
  }

  if (description != null) {
    res.task.description = description;
  }

  if (status != null) {
    res.task.status = status;
  }

  res.task.updated_at = new Date();

  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(400).json({ message: 'Bad Request' });
  }
};

// DELETE a task
exports.deleteTask = async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Deleted Task' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Middleware to get a single task by ID
exports.getTask = async (req, res, next) => {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    console.error('Error finding task:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  res.task = task;
  next();
};
