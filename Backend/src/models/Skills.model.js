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
    type:Number,
    min:0,
    max:100,
    default:50
  }
},{timestamps:true}
)

const skillModel=  mongoose.model("skill", skillSchema)

module.exports= skillModel;