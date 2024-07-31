import React, { useState } from "react";
import "../styles/eventModal.css"; // Import file CSS
import moment from "moment";
import Swal from "sweetalert2";
const EventModal = ({ setIsModalOpen, addEvent, editEvent, isEdit = false, event, deleteEvent}) => {
  const [title, setTitle] = useState(isEdit ? event.title : '');
  const [description, setDescription] = useState(isEdit && event ? event.description : '');
  const [eventDate, setEventDate] = useState(isEdit ? new Date(event.endDate) : new Date());
  const [isDelete, setIsDelete] = useState(isEdit ? isEdit : false);

  function formatDate(dateString) {
    const inputFormat = "YYYY-MM-DD";
    const outputFormat = "ddd MMM DD YYYY";

    const date = moment(dateString, inputFormat);
    if (!date.isValid()) {
      throw new Error("Invalid date format");
    }
    return date.format(outputFormat);
  }
  
  const handleDeleteEvent = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result) => {
      if(result.isConfirmed){
        deleteEvent(event.id);
        setIsModalOpen(false);
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const endDate = formatDate(eventDate);
    const newEvent = { title, description, endDate };

    if (isEdit) {
      editEvent(newEvent);
    } else{
      addEvent(newEvent);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2>{isEdit ? "Edit Event" : "Add Event"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Event Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Date Event:
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </label>
          <button type="submit">{isEdit ? "Edit Event" : "Add Event"}</button>
          {isEdit && (<button className="btn btn-danger" onClick={handleDeleteEvent}>Delete Event</button>)}
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
