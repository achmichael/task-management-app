import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  fetchAllEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../api/EventApi.js";
import "../styles/calendarPage.css"; // Import file CSS
import EventModal from "../components/EventModal.jsx";
import Swal from "sweetalert2";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddEvent = async (newEvent) => {
    const result = await createEvent(newEvent);
    Swal.fire({
      title: "Event berhasil ditambahkan!",
      icon: "success",
      text: result.message,
      confirmButtonText: "Okay",
    }).then((response) => {
      if (response.isConfirmed) {
        setEvents([...events, newEvent]);
      }
    });
  };

  const handleEditEvent = (event) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setSelectedEvent(event);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const result = await deleteEvent(eventId);
      Swal.fire({
        title: "Event berhasil dihapus!",
        icon: "success",
        text: result.message,
        confirmButtonText: "Okay",
      }).then((response) => {
        if (response.isConfirmed) {
          setEvents(events.filter((event) => event.id !== eventId));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateEvent = async (updatedEvent) => {
    try {
      const result = await updateEvent(selectedEvent.id, updatedEvent);
      Swal.fire({
        title: "Event berhasil diubah!",
        icon: "success",
        text: result.message,
        confirmButtonText: "Okay",
      }).then((response) => {
        if (response.isConfirmed) {
          setEvents(
            events.map((event) =>
              event.id === selectedEvent.id
                ? { ...event, ...updatedEvent }
                : event
            )
          );
          setSelectedEvent(null);
          setIsModalOpen(false);
          setIsEdit(false);
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: result.errors,
        confirmButtonText: "Okay",
      });
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await fetchAllEvents();
        setEvents(events.data);
        console.log(events.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="page-container">
      <header className="header">
        <h1>My Calendar</h1>
        <button
          className="add-event-button"
          onClick={() => setIsModalOpen(true)}
        >
          Add Event
        </button>
      </header>
      <div className="calendar-container">
        <Calendar
          onChange={onChange}
          value={date}
          className="styled-calendar"
          tileContent={({ date, view }) => {
            if (view === "month") {
              const dayEvents = events.filter(
                (event) =>
                  new Date(event.endDate).toDateString() === date.toDateString()
              );
              return dayEvents.map((event, index) => (
                <p
                  key={index}
                  className="event"
                  onClick={() => handleEditEvent(event)}
                >
                  {event.title}
                </p>
              ));
            }
          }}
        />
      </div>
      <footer className="footer-calendar">
        <p>© 2024 My Calendar App</p>
      </footer>
      {isModalOpen && (
        <EventModal
          setIsModalOpen={setIsModalOpen}
          addEvent={handleAddEvent}
          editEvent={handleUpdateEvent}
          isEdit={isEdit}
          event={selectedEvent}
          deleteEvent={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;
