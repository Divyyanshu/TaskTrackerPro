// src/services/taskService.js
import API from "./api";

// Create new task
export const createTask = async (data) => {
  const res = await API.post("/auth/tasks/tasks", data);
  return res.data;
};

// Get all tasks by team
export const getTasksByTeam = async (teamId) => {
  const res = await API.get("/auth/tasks/tasks", { params: { teamId } });
  return res.data;
};

// Get all tasks by user (if implemented same endpoint)
export const getTasksByUser = async (userId) => {
  const res = await API.get("/auth/tasks/tasks", { params: { userId } });
  return res.data;
};

// Update task
export const updateTask = async (taskId, data) => {
  const res = await API.put(`/auth/tasks/tasks/${taskId}`, data);
  return res.data;
};

// Delete task
export const deleteTask = async (taskId) => {
  const res = await API.delete(`/auth/tasks/tasks/${taskId}`);
  return res.data;
};
