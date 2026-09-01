import axios from 'axios';

const api= axios.create({
  baseURL: "http://localhost:3000",
  withCredentials:true
})

export async function createSkillApi({name, level}){
  try{
    const response= await api.post("/dashboard/create-skill", {name, level})
    return response.data
  }catch(err){
      console.log(err)
  }
}

export async function updateSkillApi({name, level}){
  try{
    const response= await api.patch(`/dashboard/update-skill/${id}`, {name, level})
    return response.data
  }catch(err){
      console.log(err)
  }
}

export async function deleteSkillApi({name, level}){
  try{
    const response= await api.delete(`/dashboard/delete-skill/${id}`, {name, level})
    return response.data
  }catch(err){
      console.log(err)
  }
}

export async function getSkillsApi(){
  try{
    const response= await api.post("/dashboard/get-skills")
    return response.data
  }catch(err){
      console.log(err)
  }
}