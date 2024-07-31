const token = localStorage.getItem("jwt");

const fetchTasks = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/user/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors);
    }
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addTask = async (newTask) => {
  const response = await fetch("http://localhost:3000/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newTask),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.errors);
  }
  return result;
};

const updateTaskStatus = async (taskId, newStatus) => {
  const response = await fetch(
    `http://localhost:3000/api/user/tasks/${taskId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.errors);
  }
  return result;
};

const deleteTask = async (taskId) => {
  const response = await fetch(
    `http://localhost:3000/api/user/tasks/${taskId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.errors);
  }
  return result;
};

const editTask = async (taskId, taskData) => {
  const response = await fetch(
    `http://localhost:3000/api/user/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.errors);
  }
  return result;
};

export { fetchTasks, addTask, updateTaskStatus, deleteTask, editTask };
