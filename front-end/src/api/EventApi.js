const token = localStorage.getItem("jwt");
const baseUrl = "http://localhost:3000/api/user/events";
const fetchAllEvents = async () => {
  try {
    const response = await fetch(`${baseUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors);
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createEvent = async (newEvent) => {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEvent),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors);
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateEvent = async (event_id, updatedEvent) => {
  try {
    const response = await fetch(`${baseUrl}/${event_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedEvent),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors);
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteEvent = async (event_id) => {
  try {
    const response = await fetch(`${baseUrl}/${event_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors);
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const sendEventNotifications = async () => {
  try{
    const response = await fetch(`${baseUrl}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const result = await response.json();

    if(!response.ok){
      throw new Error(result.errors);
    }

    return result;
  }catch(error){
    console.error(error);
    throw error;
  }
}

export { createEvent, fetchAllEvents, updateEvent, deleteEvent, sendEventNotifications};
