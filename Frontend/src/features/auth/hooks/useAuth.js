import {useContext, useEffect} from 'react'
import {AuthContext} from "../authContext.jsx"
import {login_Api,register_api,logout_api,get_me_api} from "../auth.api" 

export const useAuth=()=>{
  const context= useContext(AuthContext);
  const {loading, setLoading, user, setUser}= context;

 const handle_login = async ({email, password})=>{
  setLoading(true);
  try{
    const response = await login_Api({email, password})
    setUser(response.user)
    return response
  }catch(err){
    console.log(err)
    throw err
  }finally{
    setLoading(false)
  }
 
 }

  const handle_register = async({email,username, password})=>{
  setLoading(true)
  try{
    const response= await register_api({email, username, password})
    setUser(response.user)
    return response
  }catch(err){
    console.log(err)
    throw err
  }finally{
    setLoading(false)
  }
 }

   const handle_logout = async()=>{
  setLoading(true)
  try{
    await logout_api()
    setUser(null)
  }catch(err){
    console.log(err)
    throw err
  }finally{
    setLoading(false)
  }
 }


  useEffect(()=>{
   const getAndSetUser = async () => {
  try {
    const data = await get_me_api();   // 👈 await add karo
    setUser(data.user);
  } catch {
    setUser(null);   // agar 401 aaye, user ko null set karo (logged out state)
  } finally {
    setLoading(false);
  }

   }
    getAndSetUser()
  }
  ,[])

 return {user,loading, handle_login,handle_logout,handle_register}
}