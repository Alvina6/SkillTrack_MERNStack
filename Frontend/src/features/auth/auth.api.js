import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials:true 
})

export async function login_Api({email,password}){
    try{
      const response= await api.post("/auth/login",{email, password})
      return response.data;
    }catch(err){
      console.log(err)
       throw err 
    }
}

export async function register_api({username,email, password}){
  try{
    const response = await api.post("/auth/register",
      {username,email, password})
      return response.data
  }catch(err){
    console.log(err)
     throw err 
  }
}

export async function logout_api(){
  try{
    const response = await api.post("/auth/logout")
      return response.data
  }catch(err){
    console.log(err)
     throw err 
  }
}

export async function get_me_api(){
  try{
    const response = await api.get("/auth/get-me")
      return response.data
  }catch(err){
    console.log(err)
     throw err 
  }
}