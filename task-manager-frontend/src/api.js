import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

// GET all tasks
export const getTasks = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data || error.message);
    throw error;
  }
};

// POST  
export const addTask = async (title, description) => {
  try {
    return await axios.post(API_URL, { title, description });
  } catch (error) {
    console.error("Error adding task:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH  
export const updateTask = async (id, updates) => {
  if (!id) {
    console.error("Error: Task ID is required for update");
    return;
  }
  try {
    return await axios.patch(`${API_URL}/${id}`, updates);
  } catch (error) {
    console.error("Error updating task:", error.response?.data || error.message);
    throw error;
  }
};

// DELETE a task
export const deleteTask = async (id) => {
  if (!id) {
    console.error("Error: Task ID is required for deletion");
    return;
  }
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error.message);
    throw error;
  }
};
