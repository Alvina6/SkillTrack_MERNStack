import axios from 'axios'


const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials:true  
})


export async function createApplicationApi({company, position, jobTitle, location,status, jobURL, notes }){
   const response = await api.post("/dashboard/create-application", { company, position, jobTitle, location, status, jobURL, notes });
   return response.data;

}

export async function updateApplicationApi({id ,company, position, jobTitle, location,status, jobURL, notes }){
   const response = await api.patch(`/dashboard/update-application/${id}`, { company, position, jobTitle, location, status, jobURL, notes });
   return response.data;

}

export async function deleteApplicationApi(id){
   const response = await api.delete(`/dashboard/delete-application/${id}`);
   return response.data;

}

export async function getApplicationsApi(){
   const response = await api.get("/dashboard/get-applications");
   return response.data;

}