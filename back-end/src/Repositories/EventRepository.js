import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mysql://root:@localhost:3306/task_management",
    },
  },
});
class EventRepository {
  async createEvent(event) {
    return await prisma.event.create({
      data: event.data(),
    });
  }

  async getAllEvents(user_id) {
    return await prisma.event.findMany({
      where: {
        userId: parseInt(user_id),
      },
    });
  }

  async deleteEvent(event_id) {
    return await prisma.event.delete({
      where: {
        id: parseInt(event_id),
      },
    });
  }

  async editEvent(event_id, event) {
    return await prisma.event.update({
      where: {
        id: parseInt(event_id),
      },
      data: event.data(),
    });
  }

  async getEventById(event_id) {
    return await prisma.event.findUnique({
      where: {
        id: parseInt(event_id),
      },
    });
  }
}

export default EventRepository;
