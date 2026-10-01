import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
});

export async function createSkillApi({ name, level }) {
  const response = await api.post("/dashboard/createSkills", { name, level });
  return response.data;
}

export async function updateSkillApi({ id, name, level }) {
  const response = await api.patch(`/dashboard/updateSkill/${id}`, { name, level });
  return response.data;
}

export async function deleteSkillApi(id) {
  const response = await api.delete(`/dashboard/deleteSkill/${id}`);
  return response.data;
}

export async function getSkillsApi() {
  const response = await api.get("/dashboard/getSkills");
  return response.data;
}