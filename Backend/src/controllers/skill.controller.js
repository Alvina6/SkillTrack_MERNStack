const skillModel= require("../models/Skills.model")
const userModel = require("../models/user.model")

async function createSkill(req,res){
  const user= await userModel.findById(req.user._id);
    if(!user){
      return res.status(400).json({message:"Need to login"})
    }
    const{name, level}= req.body;

    if(!name){
          return res.status(401).json({message:"Please Provide all Creditials"})
    }

    try{
      const skill= await skillModel.create({user: req.user._id, name,level
      })
        return res.status(200).json({message:"skills added succesfully",skill})
    }catch(err){
 return res.status(400).json({message:"Error while creating"})
    }
}

async function deleteSkill(req,res){
  const user= await userModel.findById(req.user._id);
  if(!user){
    return res.status(400).json({message:"Need to login"})
  }
  try{
    const deleteSkill= await skillModel.findOneAndDelete({_id:req.params.id, user:req.user._id})
    if(!deleteSkill){
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({message:"Skills deleted succesfully",deleteSkill})
  }catch(err){
     return res.status(500).json({message: err.message })
  }
}

async function updateSkill(req,res){
   const user= await userModel.findById(req.user._id);
  if(!user){
    return res.status(400).json({message:"Need to login"})
  }
 try{
     const{name, level}= req.body;
  const updateSkill= await skillModel.findOneAndUpdate({_id:req.params.id, user:req.user._id},{name, level},{new:true})
   if(!updateSkill){
      return res.status(404).json({ message: "skill not found" });
    }
     return res.status(200).json({message:"Skills updated succesfully",updateSkill})
 }catch(err){
    return res.status(500).json({ message:err.message });
  }

}

async function getSkills(req,res){
  const user= await userModel.findById(req.user._id);
  if(!user){
    return res.status(400).json({message:"Need to login"})
  }

  try{
  
   const skills= await skillModel.find({user:req.user._id})
     return res.status(200).json({ skills });

  }catch(err){
      return res.status(500).json({ message:err.message });
  }
  
}

module.exports= {createSkill,getSkills,updateSkill,deleteSkill}