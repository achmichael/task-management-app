import Task from "../Models/Task.js";
import { ResponseError } from "../Config/Error.js";

class CreateTask{
    constructor(taskRepository){
        this.taskRepository = taskRepository;
    }

    async execute(taskData, userId){
        
        if(!userId){
            throw new ResponseError(401, "Unauthorized");
        }

        const { title, description, status, deadline } = taskData;

        const selectedDeadline = new Date(deadline);
        const formatDeadline = selectedDeadline
        .toISOString()
        .slice(0, 16)
        .replace("T", " ");
      
        const task = new Task(title, description, status, formatDeadline, userId);
        return await this.taskRepository.createTask(task);
    }
}

export default CreateTask;