// src/services/teamService.js
import API from "./api";

export const createTeam = async (data) => {
  const res = await API.post("/auth/teams/team", data);
  return res.data;
};

export const getTeamsByUser = async (userId) => {
  const res = await API.get(`/auth/teams/teams/${userId}`);
  return res.data;
};

export const addUserToTeam = async (data) => {
  const res = await API.put("/auth/teams/teams", data);
  return res.data;
};

export const deleteTeam = async (teamId) => {
  const res = await API.delete(`/auth/teams/teams/${teamId}`);
  return res.data;
};
