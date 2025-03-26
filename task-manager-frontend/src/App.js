import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addOrUpdateTask = async () => {
    if (!newTask) return;

    try {
      if (editingTaskId) {
        await axios.patch(`${API_URL}/${editingTaskId}`, {
          title: newTask,
          description: newDescription,
        });
        setEditingTaskId(null);
      } else {
        await axios.post(API_URL, { title: newTask, description: newDescription });
      }
      setNewTask("");
      setNewDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const editTask = (task) => {
    setNewTask(task.title);
    setNewDescription(task.description);
    setEditingTaskId(task._id);
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="task-input">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task title"
        />
        <input
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter task description"
        />
        <button  className="add-task btn" onClick={addOrUpdateTask}>
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task._id, task.completed)}
            />
            <span className={task.completed ? "completed" : ""}>
              <strong>{task.title}</strong> - {task.description}
            </span>
            <button className="edit-btn" onClick={() => editTask(task)}>🖉</button>
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
