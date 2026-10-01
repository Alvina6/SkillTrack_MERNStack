import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
});

export async function login_Api({email,password}){
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

export async function register_api({username,email, password}){
  const response = await api.post("/auth/register", { username, email, password });
  return response.data;
}

export async function logout_api(){
  const response = await api.post("/auth/logout");
  return response.data;
}

export async function get_me_api(){
  const response = await api.get("/auth/get-me");
  return response.data;
}