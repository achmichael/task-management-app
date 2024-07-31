import TaskRepository from "../Repositories/TaskRepository.js";
import { ResponseError } from "../Config/Error.js";

class DeleteTask {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async execute(taskId) {
    if (!taskId) {
      throw new ResponseError(400, "Task ID is required");
    }
    const existingTask = await this.taskRepository.getTaskById(taskId);

    if (!existingTask) {
      throw new ResponseError(404, "Task not found");
    }
    
    return this.taskRepository.deleteTask(taskId);
  }
}

export default DeleteTask;
