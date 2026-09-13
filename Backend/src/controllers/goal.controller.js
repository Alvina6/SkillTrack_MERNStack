const goalModel= require("../models/Goals")

async function createGoal(req,res){
  const {title,description, status,deadline}= req.body;

  if(!title){
    return res.status(401).json({message:"Please Provide all Creditials"})
  }

  try{
    const goal= await goalModel.create({user:req.user._id,title,description,status,deadline})
     return res.status(200).json({message:"goal added succesfully",goal})
  }catch(err){
    res.status(400).json({message:"Error while creating"})
  }
}

async function deleteGoal(req,res){
  try {
    const deletedGoal= await goalModel.findOneAndDelete({_id:req.params.id, user: req.user._id})
    if(!deletedGoal){
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json({message:"Goal deleted succesfully",deletedGoal})
  } catch (err) {
         return res.status(500).json({message: err.message })
  }
}

async function updateGoal(req,res){
  try {
    const {title, description, status, deadline}= req.body
    const updatedGoal= await goalModel.findOneAndUpdate({_id: req.params.id, user:req.user._id},{title, description, status, deadline},{new:true})
    if(!updatedGoal){
      return res.status(404).json({ message: "Goal not found" })
    }

     return res.status(200).json({message:"Goal updated succesfully",updatedGoal})
  } catch (error) {
     return res.status(500).json({ message:err.message });
  }
}

async function getGoals(req,res){
  try{
    const goals= await goalModel.find({user:req.user._id})
     return res.status(200).json({ goals });
  }catch(err){
      return res.status(500).json({ message:err.message });
  }
}

module.exports= {createGoal,deleteGoal,updateGoal,getGoals}