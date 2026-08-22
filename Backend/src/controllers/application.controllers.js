const applicationModel = require("../models/Application.model")
const userModel = require("../models/user.model")

async function createApplication(req,res){

  const user= await userModel.findById(req.user._id);
  if(!user){
    return res.status(400).json({message:"Need to login"})
  }
  const {company, position, jobTitle, location,status, jobURL, notes }= req.body;

  if(!company || !position || !jobTitle){
    return res.status(401).json({message:"Please Provide all Creditials"})
  }

  try{
    const application = await applicationModel.create({
      user:req.user._id ,company, position, jobTitle, location,status, jobURL, notes,
    })
     return res.status(200).json({message:"Application created succesfully",application})
  }catch(err){
    return res.status(400).json({message:"Error while creating"})
  }

}

async function deleteApplication(req,res){
  const user= await userModel.findById(req.user._id);
  if(!user){
    return res.status(400).json({message:"Need to login"})
  }

  try{

    const deletedApplication= await applicationModel.findOneAndDelete({_id:req.params.id,user:req.user._id})

    if(!deletedApplication){
      return res.status(404).json({ message: "Application not found" });
    }

     return res.status(200).json({message:"Application deleted succesfully",deletedApplication})

  }catch(err){
     return res.status(500).json({message: err.message })
  }

  
}

async function updateApplication(req,res){
  const user= await userModel.findById(req.user._id);
  if(!user){
    return res.status(400).json({message:"Need to login"})
  }


  try{
    const {company, position, jobTitle, location,status, jobURL, notes }= req.body;


    const upadatedAppliaction= await applicationModel.findOneAndUpdate({_id:req.params.id, user:req.user._id} ,{company, position, jobTitle, location,status, jobURL, notes },{
      new:true
    })

    if(!upadatedAppliaction){
      return res.status(404).json({ message: "Application not found" });
    }
     return res.status(200).json({message:"Application updated succesfully",upadatedAppliaction})
  }catch(err){
    return res.status(500).json({ message:err.message });
  }
}


async function getApplications(req,res){
  const user= await userModel.findById(req.user._id);
  if(!user){
    return res.status(400).json({message:"Need to login"})
  }

  try{
  
   const applications= await applicationModel.find({user:req.user._id})
     return res.status(200).json({ applications });

  }catch(err){
      return res.status(500).json({ message:err.message });
  }
  
}

module.exports={createApplication,deleteApplication,updateApplication,getApplications}