const blackListModel = require("../models/blacklist.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { getUnmetPasswordRequirements } = require("../utils/passwordPolicy");

function getAuthCookieOptions() {
  const sameSite = process.env.AUTH_COOKIE_SAME_SITE || "lax";

  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || sameSite === "none",
    sameSite,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

function setAuthCookie(res, token) {
  res.cookie("token", token, getAuthCookieOptions());
}

function clearAuthCookie(res) {
  const { maxAge, ...options } = getAuthCookieOptions();
  res.clearCookie("token", options);
}

async function register(req,res){
  const { username: submittedUsername, email: submittedEmail, password } = req.body || {};
  const username = typeof submittedUsername === "string" ? submittedUsername.trim() : "";
  const email = typeof submittedEmail === "string" ? submittedEmail.trim().toLowerCase() : "";

  if(!username || !email || !password){
    return res.status(400).json({ message: "Please provide your name, email, and password." });
  }

  if (username.length > 100) {
    return res.status(400).json({
      message: "Name must be 100 characters or fewer.",
    });
  }

  const unmetPasswordRequirements = getUnmetPasswordRequirements(password);

  if (unmetPasswordRequirements.length > 0) {
    return res.status(400).json({
      message: "Password does not meet the requirements.",
      requirements: unmetPasswordRequirements,
    });
  }

  try{
    const userExist = await userModel.findOne({ email });

    if(userExist){
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user= await userModel.create({
      email:email,
      username:username,
      password:password,
    })

    const token = jwt.sign({
      _id:user._id
    }, process.env.JWT_SECRET,{expiresIn:"7d"})

    setAuthCookie(res, token);

    return res.status(201).json({
      message: "User registered successfully",
      user:{
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  }catch(err){ 
  if (err.code === 11000) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Please check your name and email and try again." });
  }
  console.error("Register failed:", err);

  return res.status(500).json({ message: "We couldn't create your account. Please try again." });
  }
}


async function login(req,res){
 const { email: submittedEmail, password } = req.body || {};
 const email = typeof submittedEmail === "string" ? submittedEmail.trim().toLowerCase() : "";

  if(!email || typeof password !== "string" || !password){
    return res.status(400).json({ message: "Please provide your email and password." });
  }
try{
  const user = await userModel.findOne({email})
  if(!user){
  return res.status(401).json({ message: "Invalid email or password." });
  }

  const isCorrectPassword = await user.comparePasswords(password)

  if(!isCorrectPassword){
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign({
      _id:user._id
    }, process.env.JWT_SECRET,{expiresIn:"7d"})

    setAuthCookie(res, token);

    return res.status(200).json({
      message: "Login successful",
      user:{
        id:user._id,
        email:user.email,
        username: user.username
      }
    });

}catch(err){
  console.error("Login failed:", err);
  return res.status(500).json({ message: "We couldn't sign you in. Please try again." });
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

  clearAuthCookie(res);

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
    id: user._id,
    email: user.email,
    username: user.username,
    fullName: user.fullName,
    headline: user.headline,
    bio: user.bio,
    linkedinUrl: user.linkedinUrl,
    githubUrl: user.githubUrl,
    portfolioUrl: user.portfolioUrl,
    targetRole: user.targetRole,
   }})

}
async function updateProfile(req, res) {
  try {
    const { username, email, fullName, headline, bio, linkedinUrl, githubUrl, portfolioUrl, targetRole } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      { username, email, fullName, headline, bio, linkedinUrl, githubUrl, portfolioUrl, targetRole },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const safeUser = updatedUser.toObject();
    delete safeUser.password;

    return res.status(200).json({
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (err) {
    console.error("Profile update failed:", err);
    return res.status(500).json({ message: "We couldn't update your profile. Please try again." });
  }
}

async function changePassword(req,res){
  try{
    const { currentPassword, newPassword } = req.body || {};

    if (typeof currentPassword !== "string" || !currentPassword || typeof newPassword !== "string" || !newPassword) {
      return res.status(400).json({ message: "Please provide both passwords." });
    }

    const unmetPasswordRequirements = getUnmetPasswordRequirements(newPassword);
    if (unmetPasswordRequirements.length > 0) {
      return res.status(400).json({
        message: "New password does not meet the requirements.",
        requirements: unmetPasswordRequirements,
      });
    }
    const user= await userModel.findById(req.user._id);

    if(!user){
      return res.status(404).json({"message":"user not found"})
    }

    const isCorrect= await user.comparePasswords(currentPassword)
    if(!isCorrect){
      return res.status(401).json({ message: "Current password is incorrect" });
    }

     user.password = newPassword;
    await user.save();

     return res.status(200).json({ message: "Password changed successfully" });
  }catch(err){
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "New password does not meet the requirements." });
    }
    console.error("Password change failed:", err);
    return res.status(500).json({ message: "We couldn't change your password. Please try again." });
  }
}

module.exports= {register, login, logout,get_me, updateProfile,changePassword}