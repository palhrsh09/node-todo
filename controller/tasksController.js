// controllers/tasksController.js

const Task = require('../model/Task');

// GET all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single task
exports.getTaskById = (req, res) => {
  res.json(res.task);
};

// CREATE a new task
exports.createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || 'pending'
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE a task
exports.updateTask = async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
  }

  if (req.body.description != null) {
    res.task.description = req.body.description;
  }

  if (req.body.status != null) {
    res.task.status = req.body.status;
  }

  res.task.updated_at = new Date();

  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a task
exports.deleteTask = async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Deleted Task' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware to get a single task by ID
exports.getTask = async (req, res, next) => {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
};
