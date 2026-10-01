import axios from 'axios'

const api= axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials:true
})

export async function updateProfileAPI(data){
  const response = await api.patch("/auth/updateProfile", data);
  return response.data;
}

export async function changePasswordAPI({currentPassword, newPassword}){
  const response = await api.patch("/auth/changePassword", { currentPassword, newPassword });
  return response.data;
}

export async function getMeAPI(){
  const response = await api.get("/auth/get-me");
  return response.data;
}