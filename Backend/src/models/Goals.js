const mongoose= require("mongoose")

const GoalsSchema= new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required:true
  },

  title:{
    type: String,
    required:[true, "Goal title is required"],
    trim:true
  },
  description:{
    type:String,
    trim: true,
    default: ""
  },
  status:{
    type:String,
    enum:["Not Started", "In Progress", "Completed"],
    default:"Not Started"
  },
  deadline:{
    type:Date
  }

},{
  timestamps:true
})

const goalModel= mongoose.model("goal",GoalsSchema)

module.exports= goalModel