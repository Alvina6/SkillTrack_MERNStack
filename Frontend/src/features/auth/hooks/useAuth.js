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
    setUser(response)
    setLoading(false)
  }catch(err){
    console.log(err)
  }
 
 }

  const handle_register = async({email,username, password})=>{
  setLoading(true)
  try{
    const response= await register_api({email, username, password})
    setUser(response)
    setLoading(false)
  }catch(err){
    console.log(err)
  }
 }

   const handle_logout = async()=>{
  setLoading(true)
  try{
    const response= await logout_api()
    setUser(null)
    setLoading(false)
  }catch(err){
    console.log(err)
  }
 }


  useEffect(()=>{
    const getAndSetUser= async()=>{
      const data = get_me_api()
      setUser(data.user)
      setLoading(false)
    }

    getAndSetUser()
  }
  ,[])

 return {user,loading, handle_login,handle_logout,handle_register}
}