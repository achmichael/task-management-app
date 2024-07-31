import TaskRepository from "../Repositories/TaskRepository.js";
import { ResponseError } from "../Config/Error.js";
import { TaskStatus } from '@prisma/client';

class UpdateTaskStatus{
    constructor(){
        this.taskRepository = new TaskRepository();
    }

    async execute(taskId, status){
        if(!taskId){
            throw new ResponseError(400, "Task id is required");
        }

        const existingTask = await this.taskRepository.getTaskById(taskId);

        if(!existingTask){
            throw new ResponseError(404, "Task not found");
        }
        
        const taskStatus = Object.values(TaskStatus);

        if(!taskStatus.includes(status)){
            throw new ResponseError(400, `Invalid Task Status. Valid statuses are: ${taskStatus.join(', ')}`);
        }

    
        return this.taskRepository.updateTaskStatus(taskId, status);
    }
}

export default UpdateTaskStatus;