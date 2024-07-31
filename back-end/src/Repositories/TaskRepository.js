import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mysql://root:@localhost:3306/task_management",
    },
  },
});

class TaskRepository {
  async createTask(task) {
    return await prisma.task.create({
      data: task.data(),
    });
  }

  async getAllTasks() {
    return await prisma.task.findMany();
  }

  async getTaskById(taskId) {
    return await prisma.task.findUnique({
      where: {
        id: parseInt(taskId),
      },
    });
  }

  async updateTaskStatus(taskId, status) {
    return await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        status: status,
      },
    });
  }

  async editTask(taskId, task) {
    return await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: task.data(),
    });
  }

  async deleteTask(taskId) {
    return await prisma.task.delete({
      where: {
        id: parseInt(taskId),
      },
    });
  }

  async getTasksUser(userId) {
    return await prisma.task.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
  }
}

export default TaskRepository;
