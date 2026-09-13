import {useState, useEffect} from 'react';
import { createGoalAPI, deleteGoalAPI, getGoalsAPI, updateGoalAPI } from '../services/goal.api';



export const useGoal=()=>{

  const [goals, setGoals]= useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    handle_getGoalsAPI();
  },[]);

  const handle_getGoalsAPI= async ()=>{
    setLoading(true)
    try{
      const response= await getGoalsAPI();
      setGoals(response.goals)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false);
    }
  }

   const handle_createGoalAPI= async (formData)=>{
    setLoading(true)
    try{
   await createGoalAPI(formData);
   await handle_getGoalsAPI();
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false);
    }
  }

   const handle_deleteGoalAPI= async (id)=>{
    setLoading(true)
    try{
   await deleteGoalAPI(id);
   await handle_getGoalsAPI();
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false);
    }
  }

   const handle_updateGoalAPI= async (id,formData)=>{
    setLoading(true)
    try{
   await updateGoalAPI({id,...formData});
   await handle_getGoalsAPI();
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false);
    }
  }

  return {
    goals,
    loading,
    addGoal:handle_createGoalAPI,
    editGoal:handle_updateGoalAPI,
    removeGoal:handle_deleteGoalAPI
  }; 
}