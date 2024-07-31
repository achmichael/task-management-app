import EventRepository from "../Repositories/EventRepository.js";

class CreateEvent {
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(event) {
    return await this.eventRepository.createEvent(event);
  }
}

class GetEventsUser {
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(user_id) {
    return await this.eventRepository.getAllEvents(user_id);
  }
}

class DeleteEvent {
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(event_id) {
    return await this.eventRepository.deleteEvent(event_id);
  }
}

class EditEvent {
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(event_id, event_updated) {
    return await this.eventRepository.editEvent(event_id, event_updated);
  }
}

class GetEventById {
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(event_id) {
    return await this.eventRepository.getEventById(event_id);
  }
}

export { CreateEvent, DeleteEvent, GetEventById, EditEvent, GetEventsUser };
