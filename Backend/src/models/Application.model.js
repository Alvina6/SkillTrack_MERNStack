const mongoose= require("mongoose");


const ApplicationSchema= new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  company:{
    type: String,
    required:[true, "Comapny is required"],
    trim: true
  },
  position:{
    type:String,
    required:[true, "Position is required"],
    trim: true
  },
  jobTitle:{
    type:String,
    required:[true, "Job title is required"],
    trim:true
  },
  status:{
    type:String,
    enum:["Applied", "In Review", "Interview", "Offer", "Rejected", "Accepted"],
    default:"Applied",
  },
  location:{
    type:String,
    trim: true,
    default:""
  },
  appliedDate:{
    type:Date,
    default:Date.now
  },
  jobURL:{
    type:String,
    trim: true,
    default:""
  },
  notes:{
    type:String,
    trim: true,
    default:"" 
  }
},{
  timestamps:true,
})

const applicationModel = mongoose.model("application",ApplicationSchema)

module.exports= applicationModel;