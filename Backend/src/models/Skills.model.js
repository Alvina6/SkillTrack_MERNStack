const mongoose= require("mongoose")

const skillSchema= new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  name:{
    type:String,
    required:[true,"skills are required"],
    trim:true,
  },
  level:{
    type:String,
    enum:["Beginner", "Intermediate", "Advanced"],
    default:"Beginner"
    
  }
},{timestamps:true}
)

const skillModel=  mongoose.model("skill", skillSchema)

module.exports= skillModel;