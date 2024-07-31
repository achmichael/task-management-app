import TaskRepository from "../Repositories/TaskRepository.js";
import CreateTask from "../UseCases/AddTask.js";
import TaskById from "../UseCases/TaskById.js";
import AllTasks from "../UseCases/AllTasks.js";
import EditTask from "../UseCases/EditTask.js";
import Task from "../Models/Task.js";
import DeleteTask from "../UseCases/DeleteTask.js";
import TasksUser from "../UseCases/TasksUser.js";
import UpdateTaskStatus from "../UseCases/UpdateTaskStatus.js";

const addTask = async (req, res, next) => {
  const taskRepository = new TaskRepository();
  const createTask = new CreateTask(taskRepository);
  //Optional Chaining untuk mencegah error jika objek bersarang mempunyai nilai null, ini digunakan ketika pada objek tersebut memiliki properti tidak terdefinisikan atau null
  const userId = req.user?.data?.user_id;

  const taskData = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    deadline: req.body.deadline,
  };
  try {
    const addedTask = await createTask.execute(taskData, userId);

    res.status(201).json({
      message: "Task Created Successfully",
      data: addedTask,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  const tasks = new AllTasks();

  try {
    const allTasks = await tasks.execute();
    res.status(200).json({ data: allTasks });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const editTask = async (req, res, next) => {
  const editTask = new EditTask();

  const { title, description, status, deadline } = req.body;

  const userId = req.user.data.user_id;

  const taskId = req.params.task_id;

  const task = new Task(title, description, status, deadline, userId);

  try {
    await editTask.execute(taskId, task);
    res.status(200).json({
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.task_id;
  const deleteTask = new DeleteTask();
  try {
    await deleteTask.execute(taskId);
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const taskById = async (req, res, next) => {
  const taskId = req.params.task_id;

  const getTaskById = new TaskById();

  try {
    const task = await getTaskById.execute(taskId);
    res.status(200).json({ data: task });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const tasksUser = async (req, res, next) => {

  const userId = req.user.data.user_id;

  const getTasks = new TasksUser();

  try {
    const tasks = await getTasks.execute(userId);
    res.status(200).json({ data: tasks });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  const taskId = req.params.task_id;

  const updateStatus = new UpdateTaskStatus();

  const { status } = req.body;

  try{
    await updateStatus.execute(taskId, status);
    res.status(200).json({ message: "Task status updated successfully" });
  }catch(error){
    next(error);
  }

}
export { addTask, getTasks, editTask, deleteTask, taskById, tasksUser, updateTaskStatus };
