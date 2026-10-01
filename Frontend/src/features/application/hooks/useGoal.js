import {useCallback, useState, useEffect} from 'react';
import { createGoalAPI, deleteGoalAPI, getGoalsAPI, updateGoalAPI } from '../services/goal.api';
import { getUserErrorMessage } from '../userError';



export const useGoal=()=>{

  const [goals, setGoals]= useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handle_getGoalsAPI= useCallback(async ()=>{
    try{
      const response= await getGoalsAPI();
      setGoals(response.goals || [])
    }catch(requestError){
      setError(getUserErrorMessage(requestError, "We couldn't load your goals."))
      return false
    }finally{
      setLoading(false);
    }
    return true
  },[])

  useEffect(()=>{
    handle_getGoalsAPI();
  },[handle_getGoalsAPI]);

   const handle_createGoalAPI= async (formData)=>{
    setLoading(true)
    setError("")
    try{
   await createGoalAPI(formData);
   await handle_getGoalsAPI();
    }catch(err){
      setError(getUserErrorMessage(err, "We couldn't save this goal."))
      return false
    }finally{
      setLoading(false);
    }
    return true
  }

   const handle_deleteGoalAPI= async (id)=>{
    setLoading(true)
    setError("")
    try{
   await deleteGoalAPI(id);
   await handle_getGoalsAPI();
    }catch(err){
      setError(getUserErrorMessage(err, "We couldn't delete this goal."))
      return false
    }finally{
      setLoading(false);
    }
    return true
  }

   const handle_updateGoalAPI= async (id,formData)=>{
    setLoading(true)
    setError("")
    try{
   await updateGoalAPI({id,...formData});
   await handle_getGoalsAPI();
    }catch(err){
      setError(getUserErrorMessage(err, "We couldn't update this goal."))
      return false
    }finally{
      setLoading(false);
    }
    return true
  }

  return {
    goals,
    loading,
    error,
    clearError: () => setError(""),
    addGoal:handle_createGoalAPI,
    editGoal:handle_updateGoalAPI,
    removeGoal:handle_deleteGoalAPI
  }; 
}