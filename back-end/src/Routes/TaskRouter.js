import express from "express";
import { validateTask } from "../Middlewares/TaskMiddleware.js";
import {
  addTask,
  deleteTask,
  editTask,
  getTasks,
  taskById,
} from "../Controllers/TaskController.js";
import accessValidation from "../Middlewares/AccessValidation.js";
export const taskRouter = express.Router();
taskRouter.post("/", accessValidation, validateTask, addTask);
taskRouter.get("/", getTasks);
taskRouter.get('/:task_id', taskById);
taskRouter.put('/:task_id', accessValidation, validateTask, editTask);
taskRouter.delete("/:task_id", accessValidation, deleteTask);
