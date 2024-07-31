import TaskRepository from "../Repositories/TaskRepository.js";
import { ResponseError } from "../Config/Error.js";
class AllTasks {
    constructor(){
        this.taskRepository = new TaskRepository();
    }

    async execute(){
        const tasks = await this.taskRepository.getAllTasks();
        if(!tasks){
            throw new ResponseError(400, "Tasks is not available");    
        }
        return tasks;   
    }
}

export default AllTasks;