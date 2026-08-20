const mongoose= require("mongoose")

const blackListSchema = new mongoose.Schema({
  token :{
    type:String,
    required:[true, "token is required"],
    unique:true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }
  }
}
,{
  timestamps:true
}
)

const blackListModel = mongoose.model("BlackList", blackListSchema)

module.exports= blackListModel