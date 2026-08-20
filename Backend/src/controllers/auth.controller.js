const blackListModel = require("../models/blacklist.model");
const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')

async function register(req,res){
  const {username, email, password}= req.body;

  if(!username || !email || !password){
    return res.status(400).json(
      {"message":"please provide the credentials"}
    )
  }
  try{
    const userExist = await userModel.findOne(
      {email:email}
    )

    if(userExist){
      return res.status(409).json(
        {"message":"user already exsist"}
      )
    }

    const user= await userModel.create({
      email:email,
      username:username,
      password:password,
    })

    const token = jwt.sign({
      _id:user._id
    }, process.env.JWT_SECRET,{expiresIn:"7d"})

    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

    return res.status(201).json({
      message: "User registered successfully",
      user:{
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  }catch(err){ 
  console.log("REGISTER ERROR:", err);

  return res.status(500).json({ 
    message: "error while registering",
    error: err.message
  }); 
  }
}


async function login(req,res){
 const {email, password}= req.body;

 
  if(!email || !password){
    return res.status(400).json(
      {"message":"please provide the credentials"}
    )
  }
try{
  const user = await userModel.findOne({email})
  if(!user){
   return res.status(401).json({
      "message":"user not exsist"
    })
  }

  const isCorrectPassword = await user.comparePasswords(password)

  if(!isCorrectPassword){
    return res.status(401).json(
      {"message":"Incorrect email or password"}
    )
  }

  const token = jwt.sign({
      _id:user._id
    }, process.env.JWT_SECRET,{expiresIn:"7d"})

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Login successful",
      user:{
        id:user._id,
        email:user.email,
        username: user.username
      },
      token
    });

}catch(err){
  return res.status(500).json({"message":"server not running" ,err})
}
  }


async function logout(req,res){
  const token = req.cookies.token

  if(!token){
    return res.status(400).json({"message":"user already logged out"})
  }
try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await blackListModel.create({
    token:token,
      expiresAt: new Date(decoded.exp * 1000)
  })

  res.clearCookie("token")

  return res.status(200).json({"message":"user succesfully log out"})

}catch(err){
 return res.status(400).json({"message":"invalid token"})
}
}
async function get_me(req,res){
  
  const user = await userModel.findById(req.user._id)

  if(!user){
   return res.status(401).json({"message":"user not found"})
  }
 
   return res.status(200).json({user:{
    id:user._id,
    email:user.email,
    username:user.username
   }})

}

module.exports= {register, login, logout,get_me}