import {
  fetchTasks,
  addTask,
  deleteTask,
  editTask,
  updateTaskStatus,
} from "../api/TaskApi.js";
import { sendEventNotifications } from "../api/EventApi.js";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import TableActivity from "../components/Table.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Action from "../components/Action.jsx";
import DashboardContent from "../components/DashboardContent.jsx";
import TaskModal from "../components/TaskModal.jsx";
import Loader from "../components/Loader.jsx";
import feather from "feather-icons";
import Swal from "sweetalert2";
import "../styles/dashboard.css";
import "../index.css";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [task, setTask] = useState("");
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  const checkTaskDeadline = async (tasks) => {
    const currentDate = new Date();
    const notifications = await tasks
      .map((task) => {
        const deadline = new Date(task.deadline);

        if (deadline < currentDate) {
          return "Missed Deadline";
        } else if (deadline.toDateString() === currentDate.toDateString()) {
          return "Today's Deadline";
        } else if ((deadline - currentDate) / (1000 * 60 * 60 * 24) <= 2) {
          return "Approaching Deadline";
        } else {
          return null;
        }
      })
      .filter((notification) => notification !== null);
    setNotifications(notifications);
  };

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Add delay to simulate loading
        const tasksData = await fetchTasks();
        setTasks(tasksData);
        checkTaskDeadline(tasksData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const sendNotifications = async () => {
      try {
        const result = await sendEventNotifications();
        console.log(result.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTasks();
    sendNotifications();
  }, []);

  useEffect(() => {
    const token =
      localStorage.getItem("oauth_token") || localStorage.getItem("jwt");
    const decoded = jwtDecode(token);
    setUsername(decoded.name || decoded.data.email);
    document.body.className = mode;
    feather.replace();
  }, [mode]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setTask(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredTasks(tasks); // Mengembalikan semua tugas jika input kosong
    } else {
      searchTask(searchTerm);
    }
  };

  const handleAddTask = async (newTask) => {
    const result = await addTask(newTask);
    Swal.fire({
      title: "Task berhasil ditambahkan!",
      icon: "success",
      text: result.message,
      confirmButtonText: "Okay",
    }).then((response) => {
      if (response.isConfirmed) {
        //membuat array baru (reset value array tasks) dengan mengambil semua elemen array lama yakni tasks dengan menambahkan elemen baru pada elemen terakhir
        setTasks([...tasks, newTask]);
      }
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedTask(null);
  };

  const openEditModal = (task) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setSelectedTask(task);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setSelectedTask(null);
  };

  const searchTask = (query) => {
    const filtered = tasks.filter((element) =>
      element.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleUpdateStatus = async (task_id, newStatus) => {
    try {
      const result = await updateTaskStatus(task_id, newStatus);
      const updatedTasks = tasks.map((task) =>
        task.id === task_id ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      Swal.fire({
        title: "Status task berhasil diubah!",
        icon: "success",
        text: result.message,
        confirmButtonText: "Okay",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      const result = await deleteTask(taskId);
      Swal.fire({
        title: "Task berhasil dihapus!",
        icon: "success",
        text: result.message,
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(updatedTasks);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = async (taskId, updatedTask) => {
    try {
      const result = await editTask(taskId, updatedTask);
      Swal.fire({
        title: "Task berhasil diubah!",
        icon: "success",
        text: result.message,
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedTasks = tasks.map((task) =>
            //pertama {...task} membuat salinan semua properti dari objek task
            // Kedua {...updatedTask} menggantikan (jika sudah ada properti yang sama dari objek sebelumnya) atau menambahkan (jika belum ada properti dari objek sebelumnya) properti dari objek task dengan objek baru updatedTask
            task.id === taskId ? { ...task, ...updatedTask } : task
          );
          setTasks(updatedTasks);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`App ${isModalOpen ? "blur-background" : ""}`}>
      <main className="content">
        <Navbar toggleMenu={toggleMenu} toggleMode={toggleMode} mode={mode} />
        <div className="dashboard-container">
          <Sidebar isOpen={isOpen} />
          <div className="main-content">
            <DashboardHeader
              username={username}
              notifications={notifications}
            />
            <DashboardContent />
            <Action openModal={openModal} handleSearch={handleSearch} />
            <TableActivity
              tasks={filteredTasks.length > 0 ? filteredTasks : tasks}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleTaskDelete}
              openEditModal={openEditModal}
            />
          </div>
        </div>
      </main>
      <Footer />
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onEditClose={closeEditModal}
        onAddTask={(taskData) => handleAddTask(taskData)}
        onEditTask={(taskData) => handleEditTask(selectedTask.id, taskData)}
        taskEdit={isEdit}
        task={selectedTask}
      />
    </div>
  );
}

export default Dashboard;
