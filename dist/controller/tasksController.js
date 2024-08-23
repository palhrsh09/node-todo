"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTask = exports.getAllTasks = void 0;
const Task_1 = __importDefault(require("../model/Task"));
// GET all tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllTasks = getAllTasks;
// Middleware to get a single task by ID
const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let task; // Use ITaskDocument instead of ITask
    try {
        task = yield Task_1.default.findById(req.params.id);
        if (task == null) {
            res.status(404).json({ message: 'Task not found' });
            return; // Ensure to return to prevent further execution
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
        return; // Ensure to return to prevent further execution
    }
    res.locals.task = task;
    next();
});
exports.getTask = getTask;
// GET a single task
const getTaskById = (req, res) => {
    res.json(res.locals.task);
};
exports.getTaskById = getTaskById;
// CREATE a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status = 'pending' } = req.body;
    if (!title || typeof title !== 'string') {
        res.status(400).json({ message: 'Invalid title' });
        return;
    }
    const task = new Task_1.default({ title, description, status });
    try {
        const newTask = yield task.save();
        res.status(201).json(newTask);
    }
    catch (err) {
        res.status(400).json({ message: 'Bad Request' });
    }
});
exports.createTask = createTask;
// UPDATE a task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = res.locals.task; // Ensure it's ITaskDocument
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
    if (title != null)
        task.title = title;
    if (description != null)
        task.description = description;
    if (status != null)
        task.status = status;
    task.updated_at = new Date();
    try {
        const updatedTask = yield task.save();
        res.json(updatedTask);
    }
    catch (err) {
        res.status(400).json({ message: 'Bad Request' });
    }
});
exports.updateTask = updateTask;
// DELETE a task
// DELETE a task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = res.locals.task; // Ensure it's ITaskDocument
    try {
        yield Task_1.default.deleteOne({ _id: task._id }); // Use deleteOne method
        res.json({ message: 'Deleted Task' });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteTask = deleteTask;
