import TaskRepository from "../Repositories/TaskRepository.js";
import Task from "../Models/Task.js";
import { ResponseError } from "../Config/Error.js";

class EditTask {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async execute(taskId, task) {
    if (!taskId) {
      throw new ResponseError(400, "Task Id is required");
    }

    const existingTask = await this.taskRepository.getTaskById(taskId);

    if (!existingTask) {
      throw new ResponseError(400, "Task data is Not Found");
    }

    const updated = await this.taskRepository.editTask(taskId, task);

    return updated;
  }
}

export default EditTask;
