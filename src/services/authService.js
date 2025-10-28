// src/services/authService.js
import API from "./api";

// Register a new user
export const registerUser = async (data) => {
  const res = await API.post("/users/register", data);
  return res.data;
};

// Login and store token
export const loginUser = async (data) => {
  const res = await API.post("/users/login", data);
  console.log("res >>. login" , res)
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

// Get currently authenticated user
export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await API.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// ✅ Check if user is authenticated
export const isAuth = async () => {
  try {
    const data = await getCurrentUser();
    return !!data?.userid; // true if valid response
  } catch (err) {
    console.warn("User not authenticated:", err.message);
    return false;
  }
};

// ✅ Logout helper
export const logoutUser = () => {
  localStorage.removeItem("token");
};

export default {
  registerUser,
  loginUser,
  getCurrentUser,
  isAuth,
  logoutUser,
};
