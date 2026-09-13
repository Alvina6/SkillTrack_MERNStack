import axios from 'axios'


const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials:true  
})



export async function createGoalAPI({title, description,status, deadline }){
   try{
    const response= await api.post("/dashboard/createGoals",{title, description,status, deadline})
    return response.data
   }catch(err){
    console.log(err)
   }

}

export async function updateGoalAPI({id ,title, description,status, deadline }){
   try{
    const response= await api.patch(`/dashboard/updateGoal/${id}`,{title, description,status, deadline})
    return response.data
   }catch(err){
    console.log(err)
   }

}

export async function deleteGoalAPI(id){
   try{
    const response= await api.delete(`/dashboard/deleteGoal/${id}`)
    return response.data
   }catch(err){
    console.log(err)
   }

}

export async function getGoalsAPI(){
   try{
    const response= await api.get("/dashboard/getGoals")
    return response.data
   }catch(err){
    console.log(err)
   }

}