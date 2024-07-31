import React, { useEffect, useState } from "react";
import feather from "feather-icons";
function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function getStatusClass(taskStatus) {
  switch (taskStatus) {
    case "PENDING":
      return "badge bg-warning text-dark";
    case "IN_PROGRESS":
      return "badge bg-info text-white";
    case "COMPLETED":
      return "badge bg-success text-white";
    case "CANCELLED":
      return "badge bg-danger text-white";
    default:
      return "";
  }
}
function TableActivity({ tasks, onUpdateStatus, onDelete, openEditModal }) {
  const [isDeadline, setIsDeadline] = useState(false);
  //merender ulang feather.replace ketika ada perubahan pada props tasks, hal ini mencegah hilangnya icon delete ketika selesai menghapus task
  useEffect(() => {
    feather.replace();
  }, [tasks]);

  return (
    <div className="table-responsive" id="tasks-table">
      <Table
        tasks={tasks}
        onUpdateStatus={onUpdateStatus}
        onDelete={onDelete}
        openEditModal={openEditModal}
      />
    </div>
  );
}

const checkDeadline = (dl) => {
  const deadline = new Date(dl);
  const currentDate = new Date();
  if (deadline < currentDate) {
    return "Sudah melebihi Deadline";
  } else if (deadline.toDateString() === currentDate.toDateString()) {
    return "Hari ini Deadline";
  } else {
    return dl;
  }
};
function Table({ tasks, onUpdateStatus, onDelete, openEditModal }) {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks available</p>;
  }

  const expiredDeadline = (deadline) => {
      return new Date(deadline) < new Date();
  }

  return (
    <table className="table table-bordered fixed-width-table">
      <thead className="bg-primary text-white">
        <tr>
          <th className="col-no">No</th>
          <th className="col-title">Judul Tugas</th>
          <th className="col-description">Deskripsi</th>
          <th className="col-status">Status</th>
          <th className="col-deadline">Deadline</th>
          <th className="col-action">Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={`${task.id}-${index}`}>
            <td className="col-no">{index + 1}</td>
            <td className="col-title">{task.title}</td>
            <td className="col-description">{task.description}</td>
            <td className="col-status">
              <span className={getStatusClass(task.status)}>{task.status}</span>
            </td>
            <td className="col-deadline">
              {checkDeadline(task.deadline) === task.deadline
                ? formatDateTime(task.deadline)
                : checkDeadline(task.deadline)}
            </td>
            <td className="col-action d-flex align-items-center">
              <div className="btn-group" role="group">
                <button
                  className="btn rounded btn-sm btn-info"
                  onClick={() => onUpdateStatus(task.id, "IN_PROGRESS")}
                  disabled={task.status === "IN_PROGRESS" || expiredDeadline(task.deadline)}
                >
                  Proses
                </button>
                <button
                  className="btn rounded btn-sm btn-success"
                  onClick={() => onUpdateStatus(task.id, "COMPLETED")}
                  disabled={task.status === "COMPLETED" || expiredDeadline(task.deadline)}
                >
                  Selesai
                </button>
                <button
                  className="btn rounded btn-sm btn-danger"
                  onClick={() => onUpdateStatus(task.id, "CANCELLED")}
                  disabled={task.status === "CANCELLED" || expiredDeadline(task.deadline)}
                >
                  Batalkan
                </button>
                <button
                  onClick={() => openEditModal(task)}
                  className="btn btn-primary rounded py-2"
                  disabled={expiredDeadline(task.deadline)}
                >
                  <i data-feather="edit"></i>
                </button>
                <button
                  className="btn btn-danger rounded"
                  onClick={() => onDelete(task.id)}
                >
                  <i data-feather="trash-2"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableActivity;
