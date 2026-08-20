const mongoose= require('mongoose');
const bcrypt= require("bcryptjs")
 
const userSchema= new mongoose.Schema({
  username:{
    type:String,
    required:[true, "UserName is required"],
    minLength:6,
  }
  , email:{
    type:String,
    required:[true, "email is required"],
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"]

  }
  ,password:{
     type:String,
    required:[true, "password is required"],
    minLength: 8,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Please enter a valid Password"]

  }
})

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    return next()
  }
  this.password= await bcrypt.hash(this.password,10);
  
})

userSchema.methods.comparePasswords = function(password){
  return bcrypt.compare( password, this.password)
}

const userModel= mongoose.model("user", userSchema);

module.exports= userModel