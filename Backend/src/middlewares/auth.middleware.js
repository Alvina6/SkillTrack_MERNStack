const jwt= require("jsonwebtoken")
const blackListModel = require("../models/blacklist.model")

async function authMiddleware(req,res,next){
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({"message":"user not found"})
  }

  try{
  const isBlackListed= await blackListModel.findOne({token})

  if(isBlackListed){
    return res.status(401).json({"message":"user not found"})
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
  req.user= decoded;

  next();
  }catch(err){
    console.error(err);
    return res.status(401).json({"message":"Invalid or expired token"})
  }
}

module.exports= {authMiddleware};