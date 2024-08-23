"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasksController_1 = require("../controller/tasksController");
const router = express_1.default.Router();
// Route to get all tasks
router.get('/', tasksController_1.getAllTasks);
// Route to get a specific task by ID
router.get('/:id', tasksController_1.getTask, tasksController_1.getTaskById);
// Route to create a new task
router.post('/', tasksController_1.createTask);
// Route to update a task by ID
router.put('/:id', tasksController_1.getTask, tasksController_1.updateTask);
// Route to delete a task by ID
router.delete('/:id', tasksController_1.getTask, tasksController_1.deleteTask);
exports.default = router;
