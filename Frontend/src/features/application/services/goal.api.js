import axios from 'axios'


const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials:true  
})



export async function createGoalAPI({title, description,status, deadline }){
   const response = await api.post("/dashboard/createGoals", { title, description, status, deadline });
   return response.data;
}

export async function updateGoalAPI({id ,title, description,status, deadline }){
   const response = await api.patch(`/dashboard/updateGoal/${id}`, { title, description, status, deadline });
   return response.data;
}

export async function deleteGoalAPI(id){
   const response = await api.delete(`/dashboard/deleteGoal/${id}`);
   return response.data;
}

export async function getGoalsAPI(){
   const response = await api.get("/dashboard/getGoals");
   return response.data;
}