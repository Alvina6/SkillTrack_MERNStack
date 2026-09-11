import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function createSkillApi({ name, level }) {
  try {
    const response = await api.post("/dashboard/createSkills", {
      name,
      level,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateSkillApi({ id, name, level }) {
  try {
    const response = await api.patch(
      `/dashboard/updateSkill/${id}`,
      { name, level }
    );

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteSkillApi(id) {
  try {
    const response = await api.delete(
      `/dashboard/deleteSkill/${id}`
    );

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getSkillsApi() {
  try {
    const response = await api.get("/dashboard/getSkills");

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}