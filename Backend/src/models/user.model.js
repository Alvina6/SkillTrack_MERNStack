const mongoose= require('mongoose');
const bcrypt= require("bcryptjs")
 
const userSchema= new mongoose.Schema({
  username:{
    type:String,
    required:[true, "UserName is required"],
    trim: true,
    maxlength: 100,
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
    maxLength: 72,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$(?![\s\S])/, "Please enter a valid Password"]

  }
  , fullName:{
    type:String,
    trim: true,
    default:"",
    maxLength:100,
  }
  ,bio:{
    type:String,
    trim:true,
    default: "",
    maxLength:300
  },
  headline: {
  type: String,
  trim: true,
  default: "",
  maxLength: 100,
},
  linkedinUrl: {
  type: String,
  trim: true,
  default: "",
},
githubUrl: {
  type: String,
  trim: true,
  default: "",
},
  portfolioUrl: {
    type: String,
    trim: true,
    default: "",
  },
  targetRole: {
    type: String,           // jaise "Frontend Developer"
    trim: true,
    default: "",
  },
})

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    return next()
  }
  this.password= await bcrypt.hash(this.password,10);
  // 👈 next() yahan bhi add karo, safe practice
});

userSchema.methods.comparePasswords = function(password){
  return bcrypt.compare( password, this.password)
}

const userModel= mongoose.model("user", userSchema);

module.exports= userModel