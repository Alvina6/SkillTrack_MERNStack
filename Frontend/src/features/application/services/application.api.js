import axios from 'axios'


const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials:true  
})


export async function createApplicationApi({company, position, jobTitle, location,status, jobURL, notes }){
   try{
    const response= await api.post("/dashboard/create-application",{company, position, jobTitle, location,status, jobURL, notes})
    return response.data
   }catch(err){
    console.log(err)
   }

}

export async function updateApplicationApi({id ,company, position, jobTitle, location,status, jobURL, notes }){
   try{
    const response= await api.patch(`/dashboard/update-application/${id}`,{company, position, jobTitle, location,status, jobURL, notes})
    return response.data
   }catch(err){
    console.log(err)
   }

}

export async function deleteApplicationApi(id){
   try{
    const response= await api.delete(`/dashboard/delete-application/${id}`)
    return response.data
   }catch(err){
    console.log(err)
   }

}

export async function getApplicationsApi(){
   try{
    const response= await api.get("/dashboard/get-applications")
    return response.data
   }catch(err){
    console.log(err)
   }

}