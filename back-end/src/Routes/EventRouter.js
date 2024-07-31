import express from "express";
import validateEvent from "../Middlewares/EventMiddleware.js";
import accessValidation from "../Middlewares/AccessValidation.js";
import {
  createEvent,
  deleteEvent,
  editEvent,
  getEventById,
  getEventsUser,
  sendNotifications,
} from "../Controllers/EventController.js";
export const eventRouter = express.Router();

eventRouter.post("/", accessValidation, validateEvent, createEvent);
eventRouter.put("/:event_id", accessValidation, validateEvent, editEvent);
eventRouter.delete("/:event_id", accessValidation, deleteEvent);
eventRouter.get("/", accessValidation, getEventsUser);
eventRouter.get("/notifications", accessValidation, sendNotifications);
eventRouter.get("/:event_id", accessValidation, getEventById);
