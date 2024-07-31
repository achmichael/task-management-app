import TaskRepository from "../Repositories/TaskRepository.js";
import { ResponseError } from "../Config/Error.js";

class TaskById {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async execute(taskId) {
    if (!taskId) {
      throw new ResponseError(400, "Task id is required");
    }
    return await this.taskRepository.getTaskById(taskId);
  }
}

export default TaskById;
