import {
  CreateEvent,
  DeleteEvent,
  EditEvent,
  GetEventById,
  GetEventsUser,
} from "../UseCases/CaseEvent.js";
import EventNotification from "../UseCases/EventNotifications.js";
import EventRepository from "../Repositories/EventRepository.js";
import Event from "../Models/Event.js";

const createEvent = async (req, res, next) => {
  const { title, description ,endDate } = req.body;

  const event = new Event(
    title,
    description,
    undefined,
    endDate,
    req.user.data.user_id
  );

  const createEvent = new CreateEvent();
  try {
    const result = await createEvent.execute(event);
    res.status(201).json({ data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  const event_id = req.params.event_id;

  if (!event_id) {
    return next(new ResponseError(404, "Event Id Is Required"));
  }

  const eventRepository = new EventRepository();

  const existingEvent = await eventRepository.getEventById(event_id);

  if (!existingEvent) {
    return next(new ResponseError(404, "Event Not Found"));
  }

  const deleter = new DeleteEvent();
  try {
    await deleter.execute(event_id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getEventsUser = async (req, res, next) => {
  const user_id = req.user.data.user_id;

  if (!user_id) {
    return next(new ResponseError(404, "User Id Is Required"));
  }

  const getEvents = new GetEventsUser();

  try {
    const events = await getEvents.execute(user_id);

    res.status(200).json({ data: events });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const editEvent = async (req, res, next) => {
  const event_id = req.params.event_id;
  if (!event_id) {
    return next(new ResponseError(404, "Event Id Is Required"));
  }
  const { title, description, endDate } = req.body;

  const event = new Event(
    title,
    description,
    undefined,
    endDate,
    req.user.data.user_id
  );

  const editEvent = new EditEvent();
  try {
    await editEvent.execute(event_id, event);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  const event_id = req.params.event_id;
  if (!event_id) {
    return next(new ResponseError(404, "Event Id Is Required"));
  }
  const getEvent = new GetEventById();
  try {
    const event = await getEvent.execute(event_id);
    res.status(200).json({ data: event });
  } catch (error) {
    next(error);
  }
};

const sendNotifications = async (req, res, next) => {
  
  const sendNotifications = new EventNotification();

  try{
    await sendNotifications.execute(req);
    res.status(200).json({ message: "Notifications sent successfully" });
  }catch(error){
    console.log(error);
    next(error);
  }
}

export { createEvent, deleteEvent, getEventsUser, editEvent, getEventById, sendNotifications };
