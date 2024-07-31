import React, { useEffect, useState } from "react";
import "../styles/addTask.css";
import Swal from "sweetalert2";
function TaskModal({ isOpen, onClose, onEditClose ,onAddTask, onEditTask, taskEdit = false, task = null}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [deadline, setDeadline] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
   if(task){
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setDeadline(task.deadline);
   }else{
    setTitle("");
    setDescription("");
    setStatus("PENDING");
    setDeadline("");
   }
  }, [task]);

  const handleSubmit = (e) => {
    const newTask = { title, description, status, deadline};
    e.preventDefault();
    if (
      title.trim() !== "" &&
      description.trim() !== "" &&
      deadline.trim() !== ""
    ) {
      const now = new Date();
      const selectedDeadline = new Date(deadline);

      if (selectedDeadline < now) {
        Swal.fire({
          title: "Failure",
          text: "Deadline must be a future date",
          icon: "error",
          confirmButtonText: "Got it!",
        });
        return;
      }

      const formatDeadline = selectedDeadline
        .toISOString()
        .slice(0, 16)
        .replace("T", " ");

      console.log(formatDeadline);
      if (!taskEdit) {
        onAddTask(newTask);
        onClose();
      } else {
        onEditTask(newTask);
        onEditClose();
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{!taskEdit ? "Add Task" : "Edit Task"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-field"
              required
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline:</label>
            <input
              id="deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="button-primary">
              {!taskEdit ? "Add Task" : "Update Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="button-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
