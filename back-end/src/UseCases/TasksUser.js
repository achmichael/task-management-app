import TaskRepository from "../Repositories/TaskRepository.js";
import { ResponseError } from "../Config/Error.js";

class TasksUser {
    constructor (){
        this.taskRepository = new TaskRepository();
    }

    async execute(userId){
        if(!userId){
            throw new ResponseError(401, "User Id is Required");
        }
        return await this.taskRepository.getTasksUser(userId);
    }
}

export default TasksUser;